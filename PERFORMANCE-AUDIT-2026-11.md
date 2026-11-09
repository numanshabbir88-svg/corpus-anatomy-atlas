# Corpus Anatomy Atlas — mobile performance pass (2026-11)

Scope: the mobile PageSpeed Insights report (Performance 58 / Best Practices 73, LCP 7.7 s,
CLS 0.351, TBT 100 ms). Every change below is targeted; no page was redesigned, no anatomy
content, chapter, route, structured data or AdSense behaviour was removed, and the chatbot is
still the same script with the same capabilities.

> **No Lighthouse/PageSpeed score is claimed in this document.** Nothing here was measured
> with a post-change PageSpeed run — a new test is still required (see "Still to verify").

---

## 1. Cumulative layout shift (target ≤ 0.1)

**Root cause found.** The homepage served a small `<div class="load-state">` placeholder and
`app.js` later replaced the whole of `<main>` with the hero + 7 sections. Everything above the
fold was therefore re-created by JavaScript roughly 5–7 s into the load, which moved the entire
viewport — that single swap accounts for the reported 0.351.

| Fix | File |
| --- | --- |
| The homepage hero is now static HTML inside `<main>` (`#homeHero`). `app.js` renders only the content **below** it into `#appBody`, so the hero is never re-created and nothing above the fold moves — and the page-in fade (`#app.vin`) is applied to the injected content instead of the whole hero, so what the visitor is already looking at does not re-animate. | `index.html`, `app.js` (`HOME_HERO`, `viewHomeBody()`, `render()`), `styles.css` (`#app.vin,#appBody.vin`) |
| `#appBody.app-pending` reserves `70vh` until the datasets finish, so the footer is never inside the first viewport and never gets pushed down. | `styles.css`, `index.html` |
| Section entry points (`/body-map/`, `/all-organs/`, …) keep their loading shell, now `78vh` instead of `48vh`, for the same reason. | `styles.css` (`.load-state`), `build_seo.py` |
| Every injected chapter plate reserves its intrinsic box: `img-dims.js` publishes the real WebP dimensions (generated from the files), `reserveImageBoxes()` writes `width`/`height` before the bitmap arrives, and `.photo-wrap img` gained `height:auto` so the box scales instead of distorting. | `img-dims.js` (new), `app.js`, `styles.css`, `build_seo.py` |
| The hero uses a fixed `aspect-ratio` box, so even the first paint of the face plate cannot resize. | `styles.css` (`.face-live-wrap`) |
| Empty Auto-ads slots reserve a standard rectangle (`ins.adsbygoogle:empty`), so a late ad cannot push content. AdSense itself is untouched. | `styles.css`, `editorial.css` |

## 2. Largest contentful paint (target ≤ 2.5 s)

**LCP element:** the hero heading and the 1040×580 face plate (`img/medium/hero-human-face.webp`,
17 KB). Both were previously created by JavaScript, i.e. LCP could not happen until ~1.7 MB of
deferred datasets had been downloaded, parsed and executed.

* Hero markup (heading, CTA, face plate) now ships in the HTML document → first paint no longer
  waits for JavaScript.
* The preload still matches the rendered URL (`/img/medium/hero-human-face.webp?v=1`), so the
  image is discovered in the first few hundred bytes of HTML.
* The LCP image is **not** lazy-loaded (`fetchpriority="high"`, `decoding="async"`); the eyelid
  overlay frame is `fetchpriority="low"` and is not preloaded, so it cannot compete with LCP.
* Nothing else was preloaded. Below-the-fold images remain `loading="lazy"`.

Honest expectation: this removes the JavaScript dependency from LCP, which was the dominant
cost (7.7 s → first-paint range). The exact new value has to be measured.

## 3. JavaScript

* **Chatbot split out of the critical path** — new `bot-loader.js` (1.5 KB) requests
  `corpus-bot.css` and then `corpus-bot.js` (~146 KB) at the first idle moment (backed by a
  timeout) or on the first scroll/tap/key press. The stylesheet is applied before the script
  runs, so the widget can never appear unstyled. Same script, same version, same features; it
  loads `bot-knowledge.json` on the first question exactly as before.
* **Search index built lazily** — the index over 74 chapters, 1 586 parts, 206 bones,
  312 muscles and 32 tendons was built during every page load; it is now built on the first
  search interaction (`getIndex()`).
* **Forced reflow removed** in the dense-plate label solver: label boxes are measured in one
  read pass instead of one `getBoundingClientRect()` per leader while writing the previous one.
* **Production minification with source maps** — `build_seo.py` minifies the published copies of
  22 first-party JS/CSS files with esbuild (`--minify --sourcemap --sources-content`) and keeps
  the readable sources in the repository. Example: `app.js` 135 KB → 117 KB, `organs.js`
  549 KB → 437 KB. If esbuild is not installed the build prints a notice and publishes the
  unminified files, so a deploy can never fail because of it.
* **Investigated, intentionally not changed:** `organs.js`, `part-pins.js`,
  `muscle-atlas.js`, `skull-chapter.js`, `dental-chapter.js`, `foundations-chapters.js`,
  `reproduction-stages.js`, `brain-and-micro-chapters.js`, `deep-chapters.js`,
  `part-enrichment-notes.js`, `chapter-enrichment.js`, `micro-lens.js`. They all *mutate* the
  shared `ORGANS` / `SYSTEMS` globals that the homepage itself needs (chapter counts, 1 586
  structure total, chapter tiles) and `part-pins.js` also publishes `window.SEO_SLUGS` /
  `window.SLUG_TO_KEY`, which `app.js` uses for routing. Splitting them per route would mean
  rewriting the shared dataset and the router; that is a larger refactor than this pass, and
  doing it half-way would break routes. Nothing was deleted.

## 4. CSS / render-blocking resources

* `styles.css` and `editorial.css` are still blocking (they style the first screen) but are now
  minified, and `corpus-bot.css` is no longer render-blocking: it is requested by
  `bot-loader.js` together with the chatbot. Blocking CSS on the homepage: 117 KB → 98 KB.
* No web fonts are used anywhere in the project (the type stack is system fonts), so there is no
  font-swap layout shift and nothing to add `font-display` to.
* Design tokens, layout, colours, spacing and animations are unchanged.

## 5. Images and caching

* `img-dims.js` publishes real intrinsic sizes; chapter plates now reserve their box (CLS) while
  still loading lazily.
* Images were already WebP with `width`/`height` on the editorial pages; the largest hero asset
  is 17 KB, so no re-encoding was needed and no AVIF fallback chain was introduced.
* Cache policy (`netlify.toml` + generated `_headers`): versioned `/img/*`, `/*.js`, `/*.css`
  and the new `*.map` files are `immutable, max-age=31536000`; `bot-knowledge.json` (unversioned,
  regenerated each deploy) gets `max-age=86400, stale-while-revalidate=604800`; `llms.txt`,
  `robots.txt`, `sitemap.xml` get an hour; `*.html` is `max-age=0, must-revalidate` so a deploy
  is visible immediately. HTML is never `immutable`.
* Cache-busting versions were bumped with the content: `styles.css?v=74`, `app.js?v=80`,
  `editorial.css?v=64`, `corpus-bot.js?v=20` (requested by `bot-loader.js`), `img-dims.js?v=1`,
  `bot-loader.js?v=1`.

## 6. Best Practices findings

* **Deprecated `unload` listener** — this comes from the Google/DoubleClick Ads script
  (`pagead2.googlesyndication.com`), not from first-party code. AdSense was left exactly as it
  was; the warning cannot be removed without removing ads.
* **Browser errors logged to console** — no first-party console error could be reproduced:
  the built site was executed headlessly (jsdom) on the homepage, section pages, a chapter page,
  an editorial page, the blog hub and the quiz, plus a pin click, a quiz answer and a full
  chatbot question. Zero first-party exceptions/console errors. The remaining console entries in
  the report are consistent with the third-party AdSense loader and must be confirmed in a real
  browser's DevTools console (see "Still to verify").
* **Missing source maps** — now emitted for every minified first-party JS/CSS file
  (`//# sourceMappingURL=…` plus inlined `sourcesContent`), so stack traces map to the readable
  sources in the repository.
* **Chrome DevTools issues panel** — the CSP/security headers were not weakened; no
  `'unsafe-eval'`, no new third-party origins. Nothing was added that would raise a new issue
  type.

## 7. Agentic Browsing — invalid ARD manifest

The site publishes no agent-callable resources (no MCP tools, A2A agents or skills), so it must
not publish a catalog. The "invalid manifest" came from the SPA catch-all: `/.well-known/ai-catalog.json`
(and `/.well-known/ard.json`) answered with `index.html` and HTTP 200, so the auditor parsed HTML
as a manifest. `netlify.toml` now answers `/.well-known/*` with a real 404 **before** the SPA
rewrite, which makes the audit "not applicable" instead of failing. No invented manifest fields
and no unverified manifest file were added.

## 8. Live face animation (blink)

The blink overlay used a fixed 5 s metronome. It is now a calm 8 s CSS cycle (`faceEyeBlink`),
re-timed by `setupFaceBlink()` to 6.4–10.4 s on every blink, with roughly one cycle in four
becoming a quick double blink (`faceEyeBlinkDouble`) — so the face reads as a living person
rather than a clock. `prefers-reduced-motion` and the existing "Reduce motion" button both stop
it. The no-op `faceCinemaTopDown` filter animation (identical keyframes at both ends, continuous
filter work on the hero) was removed; nothing changes visually.

---

## Files changed

| File | Why |
| --- | --- |
| `index.html` | Static hero + `#appBody`, LCP image priority hints, `img-dims.js`, bumped versions, chatbot via `bot-loader.js`, `corpus-bot.css` no longer blocking. |
| `app.js` | `HOME_HERO` + `viewHomeBody()` split, static-hero hydration, `reserveImageBoxes()`, lazy search index, `setupFaceBlink()`, batched label measurement. |
| `styles.css` | Hero aspect-ratio box, 8 s/double blink keyframes + `body.nomotion` support, `.photo-wrap img{height:auto}`, `#appBody` reservation, `ins.adsbygoogle` reservation, `.load-state` height. |
| `editorial.css` | `ins.adsbygoogle` reservation for Auto-ads slots on reading pages. |
| `bot-loader.js` *(new)* | Loads `corpus-bot.css` then `corpus-bot.js` off the critical path; same script, guaranteed styled. |
| `img-dims.js` *(new, generated)* | Intrinsic sizes of every `img/medium` plate, used to reserve image boxes. |
| `build_seo.py` | Section shells no longer inherit the home hero; chatbot loader in generated pages; `editorial.css?v=64`; generates `img-dims.js`; minifies published JS/CSS with source maps (esbuild, with fallback); new cache-header policy. |
| `netlify.toml` | `.well-known/*` 404 before the SPA rewrite (ARD), cache headers for versioned assets / unversioned JSON / HTML. |
| `_headers` | Same cache policy for the repo copy. |
| `package.json`, `package-lock.json` | `esbuild` devDependency (minification + source maps) and a `test` script. |
| `.gitignore` | Ignore `/node_modules/`. |
| `tests/home-hero.test.mjs` *(new)* | Guards the static hero ↔ `HOME_HERO` sync, LCP image rules, image dimensions, chatbot loader, blink timing, `IMG_DIMS`. |
| Regenerated pages (`index.html` shells, `learn/`, `blog/`, `about.html`, `404.html`, `privacy-policy/`, `llms.txt`, `robots.txt`) | Output of the unchanged build command, produced in production mode. |

Nothing was deleted: `organs.js`, `part-pins.js`, `corpus-bot.js` and every other dataset are
still present and still loaded where they are needed.

## Verification performed here

* `python3 build_seo.py && python3 build_ai_knowledge.py && python3 verify_seo.py` — passes
  (`SEO audit PASS: 105 pages … public mode`, `AdSense build check PASS`, `Atlas Q&A audit PASS`),
  both in preview mode and with `SITE_URL` set.
* `node --test tests/home-hero.test.mjs` — 8/8 pass.
* Headless execution of the built site (jsdom) for `/`, `/body-map/`, `/all-organs/`,
  `/anatomy-quiz/`, `/heart-anatomy/`, `/muscular-system-anatomy/`, `/learn/heart-anatomy/`,
  `/blog/`, `/about.html`: no first-party errors; homepage text and image count identical to the
  pre-change build (8 812 characters / 27 images); static hero present; `#appBody` filled; search
  returns 9 results; chapter pins clickable with 21 labels/leaders; quiz renders; chatbot opens
  and answers "What is the left ventricle?" from the local knowledge base.
* AdSense: the loader is still injected by the build into every public page and `ads.txt` is still
  generated — verified by `verify_seo.py` in production mode.

## Still to verify manually (needs a real browser / PageSpeed run)

1. Run PageSpeed Insights mobile on the deployed build and compare LCP/CLS. Do not treat the
   numbers above as a score.
2. Confirm the new CLS in DevTools Performance → Experience on a cold mobile profile, with ads
   enabled (ad-driven shift cannot be simulated here).
3. Check the DevTools console on a production page: confirm any remaining error is third-party
   (AdSense) and not first-party.
4. Confirm `/.well-known/ai-catalog.json` returns 404 (not the app shell) on the Netlify deploy.
5. Confirm the chatbot launcher appears within ~1–2 s and that a question still answers
   (it now starts from the idle callback instead of immediately).
6. Confirm the blink rhythm looks natural and that "Reduce motion" stops it.

---

# Pass 2 — measured with a real browser (2026-11-05)

Pass 1 was verified by static analysis and jsdom only. This pass added a **real headless Chromium**
(`HeadlessChrome 153`) inside the sandbox, so every number below comes from an actual browser:

* **"Throttled"** columns: Chrome DevTools Protocol *real* network+CPU throttling (Moto-G-class:
  412×823 @1.75 DPR, 1.6 Mbps down / 750 kbps up, 150 ms RTT, CPU 4×) — the same profile PSI uses.
* **"Lighthouse"** columns: Lighthouse itself against a local server that gzips like Netlify does
  (`styles.css` 92.5 KB → 20.4 KB on the wire), so render-blocking and transfer costs are realistic.
* Both the pre-change build (`main`, deployed) and the new build were served and measured the same way.

> These are **local emulations, not a PageSpeed Insights run**. PSI additionally loads AdSense from
> Google's servers and sees real internet latency, neither of which is reachable from this sandbox.
> Treat the delta as directional evidence; the score claim still needs a PSI run on the deployed build.

## Results

### Home page — throttled mobile (real CDP throttling)

| Metric | Before (deployed) | After | Δ |
| --- | --- | --- | --- |
| First Contentful Paint | 1 068 ms | **840 ms** | −21 % |
| Largest Contentful Paint | 1 068 ms | **840 ms** | −21 % |
| Cumulative Layout Shift | 0 | **0** | — |
| Total Blocking Time | 103 ms | **82 ms** | −20 % |
| Long tasks | 2 | 1 | −1 |

With the previous *uncompressed* local server the same page measured 2 956 ms → 908 ms FCP, i.e. the
old build wasted almost 2 s of main-thread time before the first paint on a slow connection.

### Home page — Lighthouse (mobile / desktop)

| | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Performance | 100 | 100 | 100 | 100 |
| Accessibility | 94 | **100** | 95 | **100** |
| Best Practices | 96 | 96 | 96 | 96 |
| SEO | 100 | 100 | 100 | 100 |
| FCP / LCP | 0.9 s | 0.9 s | 0.3 s | 0.3 s |
| TBT | 30 ms | 10 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Reduce unused JS | 124 KiB | **28 KiB** | 124 KiB | **28 KiB** |
| Improve image delivery | 27 KiB | **5 KiB** | 27 KiB | **6 KiB** |

Lighthouse is saturated locally (Performance 100 both builds), so the meaningful numbers are the
throttled ones and the audit savings. Best Practices stays at 96 because the only failing audit is
`errors-in-console`, produced by the AdSense request this sandbox cannot complete; that is third-party.

## What changed in pass 2

1. **`data-loader.js` (new)** — the 14 datasets plus `app.js` are no longer parser-inserted
   `<script defer>` tags. They are appended **after the browser has committed its first frame**
   (double `requestAnimationFrame`, with a `load` fallback for background tabs), with `async=false`
   so execution order is byte-for-byte what it was. This is the change that moved FCP/LCP from
   ~1.1 s to 0.84 s throttled (and from ~3 s to ~0.9 s when assets are uncompressed), because ~1.3 MB
   of JS no longer competes with the hero for the main thread before the first paint.
2. **Hero image variants** — `hero-human-face-720.webp` and `hero-human-face-blink-720.webp`
   (720 px wide, ~12 KB each, generated once from the originals; the 1024 px files stay for retina).
   The hero `<img>` now carries `srcset` + `sizes="(max-width: 720px) 92vw, 560px"`, and the preload
   uses `imagesrcset`/`imagesizes` so the preload and the chosen candidate stay identical
   (verified: exactly two hero requests on mobile, both 720 w, no double download).
   Image-delivery savings: 27 KiB → 5 KiB.
3. **Accessibility (94/95 → 100 on both form factors), no design change**:
   `p.keys > kbd` and `.search kbd` inherited `--mute` (#697a77) on a near-white card = **4.15:1**;
   they now use `#5c6d6a` = **5.0–5.4:1**. Footer column headings were `<h4>` after `<h2>` (skipped a
   level) and are now `<h3>`, with `.ftr h3,.ftr h4` sharing the existing style. The logo link had
   `aria-label="Corpus home"` while its visible text is "Corpus Anatomy Atlas" (a
   `label-content-name-mismatch`); the redundant label was removed so the name is the visible text.
4. **Cache-busting**: `styles.css?v=75` (content changed). `data-loader.js?v=1` is new and versioned.

## Verified after the change

* `python3 build_seo.py && python3 build_ai_knowledge.py && python3 verify_seo.py` → all PASS
  (`SEO audit PASS: 105 pages, 103 sitemap URLs`, `AdSense build check PASS`, `Atlas Q&A PASS`).
* `npm test` → **20/20** (3 new guards: data-loader wiring on all 10 pages, execution order and
  first-frame start, hero srcset + preload parity + the 720 w files existing).
* Real browser functional run on the built site: home renders 7 sections / 21 cards with no
  horizontal overflow; in-app (pushState) navigation to `/body-map/` works; `/heart-anatomy/` renders
  the plate with 27 SVG pin circles; `/anatomy-quiz/` renders; search returns 9 hits; the chatbot
  launcher appears, opens, and answers "What is the left ventricle?" from the local knowledge base;
  **zero first-party console errors** (only the sandbox-blocked AdSense request and the dev server's
  missing POST endpoint, both absent on Netlify).

## Still open (not fixed — needs either your decision or an environment I do not have)

1. **CLS = 1 in your report vs 0 measured here.** Both builds measure CLS 0 with zero layout-shift
   entries on mobile and desktop, so the 1 is not reproducible without AdSense actually filling.
   Please send me the **"Layout shift culprits" element snippets** from that report (or a screenshot of
   that audit) and I will target the exact nodes. The likeliest candidates are an Auto-ads container or
   the Google CMP dialog, both third-party.
2. **Unused CSS / render-blocking (≈17 KiB unused, ~300 ms)**: `styles.css` is one 92 KB file; a page
   uses only a fraction. The safe fix is build-time per-page CSS bundles (home vs chapter vs quiz vs
   editorial) generated from Chrome's CSS coverage — done properly this needs a rule-level splitter and
   a regression pass on every page type. I did not want to half-split it and risk an unstyled state.
3. **`part-pins.js` (465 KB raw / 113 KB gz)** is the single biggest first-party asset and is only
   needed by chapter plates. It does **not** affect the chapter/part counts on the home page
   (verified: 74 chapters / 1 586 parts both with and without it), so it can be split per chapter and
   fetched on demand — but the SPA router must then await it before rendering a plate, otherwise
   in-app navigation to a chapter would show a plate without pins. That is a router change, i.e. the
   one place where a mistake would break a working feature, so it is proposed rather than done.
4. **`app.js` is 75 % unused on the home route** (chapter/quiz/map renderers ship on every page).
   Splitting it by route has the same router dependency as (3) and is the natural follow-up.
5. **PSI/field verification** — needs the deployed build; this sandbox cannot reach Netlify or Google.
