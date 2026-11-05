#!/usr/bin/env node
/**
 * Sequential, small-batch evaluator for the optional Netlify AI fallback.
 * It does not score correctness automatically; use expected_points in the JSON
 * benchmark and have a reviewer score the returned answers.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const benchmarkPath = path.join(here, '..', 'ai-fallback-benchmark.json');
const benchmark = JSON.parse(await fs.readFile(benchmarkPath, 'utf8'));
const args = process.argv.slice(2);
const baseUrl = (args.find((arg) => !arg.startsWith('--')) || process.env.AI_FALLBACK_BASE_URL || '').replace(/\/+$/, '');
if (!baseUrl) {
  console.error('Usage: node scripts/run-ai-fallback-benchmark.mjs https://your-site.netlify.app [--offset=0] [--limit=10] [--delay-ms=3600]');
  process.exit(2);
}

function option(name, fallback) {
  const item = args.find((arg) => arg.startsWith(`--${name}=`));
  if (!item) return fallback;
  const value = Number.parseInt(item.slice(name.length + 3), 10);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

const offset = option('offset', 0);
const limit = Math.min(option('limit', 10), 15); // Stay within the function's provisional 18/min per-IP limit.
const delayMs = Math.max(option('delay-ms', 3600), 3500);
const selected = benchmark.cases.slice(offset, offset + limit);
if (!selected.length) {
  console.error(`No benchmark cases at offset ${offset}. There are ${benchmark.cases.length} cases.`);
  process.exit(2);
}

const endpoint = `${baseUrl}/.netlify/functions/ai-fallback`;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const results = [];

for (let i = 0; i < selected.length; i += 1) {
  const test = selected[i];
  const startedAt = new Date().toISOString();
  let result;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: test.question, language: 'en' }),
    });
    const payload = await response.json().catch(() => ({}));
    result = {
      id: test.id,
      scope: test.scope,
      question: test.question,
      expected_points: test.expected_points,
      reference_urls: test.reference_urls,
      started_at: startedAt,
      status: response.status,
      audit_id: payload.auditId || null,
      answer: payload.answer || null,
      error: payload.error || null,
    };
    results.push(result);
    console.log(JSON.stringify(result));
    if ([429, 503, 504].includes(response.status)) {
      console.error(`Stopping batch after ${response.status}; do not retry rapidly. Check provider configuration, Retry-After, and function logs.`);
      break;
    }
  } catch (error) {
    result = {
      id: test.id,
      scope: test.scope,
      question: test.question,
      started_at: startedAt,
      status: 0,
      error: String(error && error.message ? error.message : error),
    };
    results.push(result);
    console.log(JSON.stringify(result));
    break;
  }
  if (i < selected.length - 1) await delay(delayMs);
}

const successful = results.filter((item) => item.status === 200 && item.answer);
console.error(`Completed ${results.length}/${selected.length} selected requests; ${successful.length} returned an answer. No correctness score is calculated automatically.`);
