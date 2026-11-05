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
