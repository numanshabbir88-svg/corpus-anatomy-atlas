import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import handler from '../netlify/functions/ai-fallback.mjs';
import { ATLAS_QA } from '../netlify/functions/atlas-qa-brain.mjs';

const atlasKnowledge = JSON.parse(readFileSync(new URL('../bot-knowledge.json', import.meta.url), 'utf8'));
const normalizeQuestion = (value) => String(value || '').normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().match(/[a-z0-9]+/g)?.join(' ') || '';

function makeRequest({ method = 'POST', origin = 'https://atlas.test', body = { question: 'What is a test question?', language: 'en' } } = {}) {
  const headers = { host: 'atlas.test', origin };
  if (method === 'POST') headers['content-type'] = 'application/json';
  return new Request('https://atlas.test/.netlify/functions/ai-fallback', {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  });
}

const originalKey = process.env.GROQ_API_KEY;
const originalFetch = globalThis.fetch;
const originalInfo = console.info;

test.after(() => {
  if (originalKey === undefined) delete process.env.GROQ_API_KEY;
  else process.env.GROQ_API_KEY = originalKey;
  globalThis.fetch = originalFetch;
  console.info = originalInfo;
});

test('rejects methods other than POST', async () => {
  delete process.env.GROQ_API_KEY;
  const response = await handler(makeRequest({ method: 'GET' }), { ip: 'test-method' });
  assert.equal(response.status, 405);
  assert.equal((await response.json()).error, 'method_not_allowed');
});

test('builds exactly 5,000 unique Q&A records separate from the existing FAQ list', () => {
  const generatedQuestions = ATLAS_QA.map((item) => normalizeQuestion(item.question));
  const generatedAnswers = ATLAS_QA.map((item) => normalizeQuestion(item.answer));
  const faqQuestions = new Set(atlasKnowledge.faqs.map((item) => normalizeQuestion(item.q)));
  assert.equal(ATLAS_QA.length, 5000);
  assert.equal(new Set(generatedQuestions).size, 5000);
  assert.equal(new Set(generatedAnswers).size, 5000);
  assert.equal(new Set(ATLAS_QA.map((item) => item.sourceId)).size, 5000);
  assert.ok(generatedQuestions.every((question) => !faqQuestions.has(question)));
  assert.ok(ATLAS_QA.every((item) => item.answer && item.answer.length <= 300 && item.atlasUrl && item.sourceId));
  assert.ok(ATLAS_QA.every((item) => !item.imagePath || (/^\/img\/(webp|medium|thumb)\//.test(item.imagePath) && Array.isArray(item.hot) && item.hot.length === 2)));
});

test('serves an Atlas Q&A match without an API key or upstream request', async () => {
  delete process.env.GROQ_API_KEY;
  let called = false;
  globalThis.fetch = async () => { called = true; throw new Error('should not call'); };
  const response = await handler(makeRequest({ body: { question: 'What is the Superior vena cava?', language: 'en' } }), { ip: 'test-local-qa' });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.source, 'atlas_qa');
  assert.equal(payload.topic, 'Superior vena cava');
  assert.ok(payload.answer.includes('large vein'));
  assert.match(payload.atlasUrl, /^\/learn\/heart-anatomy\/#part-svc$/);
  assert.equal(payload.imagePath, '/img/webp/heart.webp');
  assert.deepEqual(payload.hot, [120, 155]);
  assert.equal(called, false);
});

test('routes generated muscle, tendon, bone, and anatomy intents to the matching local record', async () => {
  delete process.env.GROQ_API_KEY;
  const kinds = [
    'definition', 'function', 'clinical', 'muscle_action', 'muscle_location',
    'muscle_origin', 'muscle_insertion', 'muscle_innervation',
    'tendon_attachment', 'tendon_function', 'bone_count',
  ];
  for (const kind of kinds) {
    const record = ATLAS_QA.find((item) => item.kind === kind);
    assert.ok(record, `missing generated kind ${kind}`);
    const response = await handler(makeRequest({ body: { question: record.question, language: 'en' } }), { ip: `test-kind-${kind}` });
    const payload = await response.json();
    assert.equal(response.status, 200, `${kind} status`);
    assert.equal(payload.source, 'atlas_qa', `${kind} source`);
    assert.equal(payload.kind, kind, `${kind} selected result`);
    assert.equal(payload.topic, record.topic, `${kind} topic`);
  }
});

test('does not guess or web-search when an out-of-brain query has no key', async () => {
  delete process.env.GROQ_API_KEY;
  let called = false;
  globalThis.fetch = async () => { called = true; throw new Error('should not call'); };
  const response = await handler(makeRequest({ body: { question: 'How do I bake sourdough bread?', language: 'en' } }), { ip: 'test-no-key' });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.source, 'no_answer');
  assert.equal(payload.reason, 'web_search_not_configured');
  assert.equal(called, false);
});

test('Q&A-only mode returns a miss without invoking an optional provider', async () => {
  process.env.GROQ_API_KEY = 'unit-test-only';
  let called = false;
  globalThis.fetch = async () => { called = true; throw new Error('Q&A-only mode must not call upstream'); };
  const response = await handler(makeRequest({ body: { question: 'How do I bake sourdough bread?', language: 'en', qaOnly: true } }), { ip: 'test-qa-only' });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.source, 'no_answer');
  assert.equal(payload.reason, 'atlas_qa_miss');
  assert.equal(called, false);
});

test('rejects a cross-origin browser request', async () => {
  process.env.GROQ_API_KEY = 'unit-test-only';
  const response = await handler(makeRequest({ origin: 'https://attacker.test' }), { ip: 'test-origin' });
  assert.equal(response.status, 403);
  assert.equal((await response.json()).error, 'origin_not_allowed');
});

test('returns a sanitized answer and records source metadata only in server logs', async () => {
  process.env.GROQ_API_KEY = 'unit-test-only';
  process.env.GROQ_SEARCH_MODEL = 'openai/gpt-oss-20b';
  let authorization = '';
  let auditLine = '';
  globalThis.fetch = async (_url, options) => {
    authorization = options.headers.authorization;
    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: 'A concise educational answer. According to the CDC, this has support. \n\nSource: https://example.org/reference',
          executed_tools: [{ search_results: { results: [{ title: 'Example Reference', url: 'https://example.org/reference#section', content: 'Private source snippet text', score: 0.92 }] } }],
        },
      }],
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  console.info = (line) => { auditLine = String(line); };

  const response = await handler(makeRequest({ body: { question: 'Private test question text', language: 'en' } }), { ip: 'test-success' });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.answer, 'A concise educational answer. this has support.');
  assert.doesNotMatch(payload.answer, /\bCDC\b|https?:\/\//i);
  assert.ok(payload.auditId);
  assert.equal(Object.hasOwn(payload, 'sources'), false);
  assert.equal(authorization, 'Bearer unit-test-only');
  assert.match(auditLine, /AI_FALLBACK_AUDIT/);
  assert.match(auditLine, /Example Reference/);
  assert.match(auditLine, /https:\/\/example\.org\/reference/);
  assert.doesNotMatch(auditLine, /Private test question text/);
  assert.doesNotMatch(auditLine, /A concise educational answer/);
  assert.doesNotMatch(auditLine, /Private source snippet text/);
});

test('enforces the provisional per-IP request ceiling', async () => {
  process.env.GROQ_API_KEY = 'unit-test-only';
  globalThis.fetch = async () => new Response(JSON.stringify({ choices: [{ message: { content: 'Answer.' } }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
  console.info = () => {};
  let lastResponse;
  for (let i = 0; i < 19; i += 1) {
    lastResponse = await handler(makeRequest({ body: { question: `Question number ${i}?`, language: 'en' } }), { ip: 'test-rate-limit' });
  }
  assert.equal(lastResponse.status, 429);
  assert.ok(Number(lastResponse.headers.get('retry-after')) >= 1);
});
