# Corpus Anatomy Atlas — Fix Package

Ye package aapki website (`https://corpus-anatomy-atlas.netlify.app/`) ke 4 masail ko fix karta hai. In files ko download karein, apne source code mein apply karein, aur phir apne Netlify par push karein. Main ne kuch bhi push nahi kiya (aapne kaha tha).

## Masail aur unke fixes

| # | Masala | Fix file |
|---|--------|----------|
| 1 | AI bot sahi jawab nahi deta (bal "single hair" par "human body" ka generic jawab deta hai) | `ai-improvement-plan.md` + `ai-assistant-improved.js` |
| 2 | Image par click karne par khulti hai, lekin ✕ (cross) par click karne par wapis nahi jati (band nahi hoti) | `modal-close-fix.js` |
| 3 | Har page par navbar alag alag hai aur rang badalta raha hai (home page ka navbar hi har page par hona chahiye) | `consistent-navbar.html` + `navbar.css` |
| 4 | Footer sirf home page par hai, baki pages par nahi | `site-footer.html` + `footer.css` |

---

## Kaise use karein (How to apply)

1. Is folder ki saari files download karein.
2. Apne project ka source code kholein.
3. Har fix ko neeche diye gaye tarike se apne code mein daalein.
4. Apni site ko locally test karein, phir Netlify par push karein.

---

## 1. AI Improvement Plan (50x better)

Dekhein `ai-improvement-plan.md` — wahan complete plan hai ke AI ko kaise behtar banayein (RAG, system prompt, hair/follicle-specific knowledge base, intent recognition, etc.).

### Short example: "what is inside a single hair"
**Galat (current):** Generic "Human body / physical substance of the human organ…" jawab + anatomy illustration.
**Sahi (target):** Hair ki anatomy — hair shaft, hair follicle, hair root, hair bulb, dermal papilla, medulla, cortex, cuticle, keratin, melanin, sebaceous gland, arrector pili muscle — aur ye sab kaam kaise karte hain.

## 2. Modal / Cross (✕) Close Fix

Dekhein `modal-close-fix.js`. Ye script:
- Modal ka ✕ button dhundkar us par click listener lagata hai
- Backdrop (peeche ka dark area) par click karne par bhi modal band karta hai
- `ESC` key dabane par modal band karta hai
- `document.body` se `overflow: hidden` hata deta hai taake page phir scroll ho sake

## 3. Consistent Navbar (Same on all pages)

Dekhein `consistent-navbar.html` aur `navbar.css`.

Home page ka navbar (image 3) hi har page par use karein:
- Links: Home, Body map, Chapters, Male, Female, Learn, Blog, Quiz, About us
- Logo + Search bar + waveform icon
- Active link ka rang har page par same rahe (current path ke hisay se highlight karein)
- Rang/font/background har page par ek jaise hon

## 4. Footer on all pages

Dekhein `site-footer.html` aur `footer.css`.

Home page ka footer sabhi pages (Learn, Body map, Quiz, Chapter pages, etc.) par copy karein, taake design consistent rahe.

---

## File List

```
corpus-fixes/
├── README.md               # yeh file
├── ai-improvement-plan.md  # AI ko 50x behtar banane ka detail plan
├── ai-assistant-improved.js # Improved AI assistant frontend example
├── modal-close-fix.js      # ✕ cross close + backdrop + ESC fix
├── consistent-navbar.html  # Same navbar on every page (example)
├── navbar.css              # Navbar styling (consistent colors)
├── site-footer.html        # Footer for all pages (example)
└── footer.css              # Footer styling
```

---

**Note:** Main ne koi file Git/Netlify par push nahi ki. Aap ye files download karein, apne code mein apply karein, aur khud push karein. Kisi bhi step mein madad chahiye to batayein.
