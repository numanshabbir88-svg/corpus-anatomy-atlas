# Corpus release QA — 2026-10-18

*Historical snapshot (58 chapters). For current 60-chapter counts and dental checks see `CORPUS-DENTAL-UPDATE-NOTES.md`.*

## Is debugging pass mein kya fix hua

1. Invalid interactive hashes (`#/__proto__`, `#/constructor`) pehle atlas ko loading screen par chhor dete thay. Ab unknown routes par **Page not found** render hota hai.
2. Invalid chapter parameter (`#/quiz?o=notachapter`) pehle JavaScript error deta tha. Ab general quiz safely open hota hai; valid chapter-specific quiz barqarar hai.
3. Browser CSS/JS cache ko deploy ke baad purani files dikhane se bachane ke liye asset query version `v=33` aur Netlify JS/CSS `max-age=0, must-revalidate` set kiya. Anatomy imagery cache barqarar hai.
4. Snapshot mein `site/` output builder se purana tha; fresh build karke verify kiya. Deploy ZIP **source** hai, generated `site/` ZIP mein nahin; Netlify hamesha clean output build karta hai.

## Automated checks

- Python builder + release verifier: 63 HTML pages, 58 illustrated guides, har guide mein 5 Q&A aur 3–4 related links, saare local assets/links valid, article graph mein orphan nahin.
- Browser QA 1440px aur 390px: 58 reading pages, 58 interactive anatomy chapter routes, main atlas, male/female, skeleton, muscle, diagram animation, pins, 206 bone entries, 45 joint families, search images, layer explorer, body map aur 12-question quiz — no captured JavaScript errors, failed requests ya horizontal overflow.
- Netlify production-style environment simulation: real URL milne par 62 sitemap URLs, canonicals aur indexable pages; deploy-preview context noindex/no sitemap. About aur Privacy par public publisher email verified.
- Final ZIP extract karke **fresh** production build + verifier run karna release process ka hissa hai.

## Jo abhi guarantee nahin

Actual public Netlify URL par verification, Search Console indexing/rankings, Meta AI citations, medical expert review, publisher compliance aur AdSense approval is offline QA ka hissa nahin hain. Deploy ke baad `NETLIFY-GIT-DEPLOY.md` ka live-URL checklist follow karein.
