import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const indexHtml = read('index.html');
const appJs = read('app.js');

/** The hero block shipped as static HTML in index.html. */
function staticHero(html) {
  const start = html.indexOf('<section class="hero wrap" id="homeHero">');
  assert.ok(start > -1, 'index.html must ship the home hero as static markup (#homeHero)');
  const end = html.indexOf('</section>', start) + '</section>'.length;
  return html.slice(start, end);
}

/** The same block as the HOME_HERO template in app.js. */
function templateHero(js) {
  const start = js.indexOf('const HOME_HERO = `') + 'const HOME_HERO = `'.length;
  assert.ok(start > 'const HOME_HERO = `'.length - 1, 'app.js must define HOME_HERO');
  const end = js.indexOf('`;', start);
  return js.slice(start, end);
}

test('home hero markup is identical in index.html and app.js', () => {
  const fromHtml = staticHero(indexHtml);
  const fromJs = templateHero(appJs).trim();
  assert.equal(fromHtml, fromJs, 'keep the static #homeHero and HOME_HERO in sync');
});

test('the static hero carries no unresolved template expressions', () => {
  const hero = staticHero(indexHtml);
  assert.ok(!hero.includes('${'), 'static hero must not contain template literals');
  assert.ok(hero.includes('<h1>'), 'static hero must contain the LCP heading');
});

test('the LCP image is not lazy-loaded and is preloaded once', () => {
  const hero = staticHero(indexHtml);
  const lcp = hero.match(/<img class="face-live-img"[^>]*>/);
  assert.ok(lcp, 'hero image missing');
  assert.ok(!/loading="lazy"/.test(lcp[0]), 'the LCP image must not be lazy-loaded');
  assert.match(lcp[0], /width="\d+"/);
  assert.match(lcp[0], /height="\d+"/);
  const preloads = indexHtml.match(/hero-human-face\.webp\?v=1/g) || [];
  assert.ok(preloads.length >= 1, 'hero image must be preloaded');
  assert.ok(
    !/<link rel="preload" as="image" href="[^"]*hero-human-face-blink/.test(indexHtml),
    'the eyelid overlay must not be preloaded'
  );
});

test('every image in the SPA shell reserves its box and has alt text', () => {
  const images = indexHtml.match(/<img\b[^>]*>/g) || [];
  assert.ok(images.length > 0);
  for (const image of images) {
    assert.match(image, /alt="[^"]+"/, `missing alt: ${image}`);
    assert.match(image, /width="\d+"/, `missing width: ${image}`);
    assert.match(image, /height="\d+"/, `missing height: ${image}`);
  }
});

test('the homepage no longer re-renders the hero through JavaScript', () => {
  assert.match(appJs, /const homeBody=!key\?document\.getElementById\('appBody'\):null;/);
  assert.match(appJs, /homeBody\.innerHTML=viewHomeBody\(\)/);
});

test('the chatbot is loaded through the deferred loader, not in the shell', () => {
  assert.ok(indexHtml.includes('bot-loader.js'), 'the SPA shell must use bot-loader.js');
  assert.ok(!/<script[^>]*corpus-bot\.js/.test(indexHtml), 'corpus-bot.js must not be a shell script');
  const loader = read('bot-loader.js');
  assert.ok(loader.includes('corpus-bot.js?v='), 'loader must request corpus-bot.js');
  assert.ok(loader.includes('corpus-bot.css?v='), 'loader must request the chat stylesheet');
});

test('the blink overlay is slower than the old 5s metronome and keeps reduced-motion support', () => {
  const css = read('styles.css');
  const rule = css.match(/\.photo-wrap \.face-live-blink-img\{[^}]*\}/);
  assert.ok(rule, 'blink overlay rule missing');
  const seconds = Number((rule[0].match(/(\d+(?:\.\d+)?)s linear infinite/) || [])[1]);
  assert.ok(seconds >= 8, `blink cycle should be at least 8s, got ${seconds}s`);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.face-live-blink-img\{animation:none/);
  assert.match(css, /@keyframes faceEyeBlinkDouble\{/);
  assert.match(appJs, /function setupFaceBlink\(\)/);
});

test('image dimensions are published for the plate reservation helper', () => {
  const dims = read('img-dims.js');
  assert.match(dims, /^window\.IMG_DIMS=\{/m);
  assert.ok(dims.includes('"img/medium/hero-human-face.webp"'));
  assert.match(appJs, /function reserveImageBoxes\(root\)/);
});
