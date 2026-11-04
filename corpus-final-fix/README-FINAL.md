# Corpus Anatomy Atlas — Final Fix Package (Push Ready)

Assalam-o-alaikum! Ye package aapki website (`https://corpus-anatomy-atlas.netlify.app/`) ke **sabhi masail** ko fix karne ke liye hai. In files ko download karein, apne GitHub repo (`https://github.com/numanshabbir88-svg/corpus-anatomy-atlas.git`) mein copy karein, aur phir `git push` karein.

Main ne **kuch bhi push nahi kiya** — aap khud push karein.

---

## Masail aur unke Fixes

| # | Masala | Fix File |
|---|--------|----------|
| 1 | Navbar har page par alag hai (home page wala hi har page par hona chahiye) | `navbar-fix.html` + `navbar-fix.css` |
| 2 | Image badi hoti hai lekin ✕ cross se wapis nahi jati | `modal-close-fix.js` |
| 3 | Footer sirf home page par hai | `footer-fix.html` + `footer-fix.css` |
| 4 | Blog page par sirf 2 articles dikhte hain | `blog.html` + `blog/` folder (13 articles) |
| 5 | Mobile par blog pages responsive nahi hain | CSS mein media queries shamil hain |
| 6 | Privacy Policy / Contact / AdSense pages nahi hain | `privacy-policy.html`, `contact.html`, `ads.txt` |

---

## File Structure (Download karne ke baad)

```
corpus-final-fix/
├── README-FINAL.md           # Yeh file
├── navbar-fix.html           # Navbar ka example (har page par use karein)
├── navbar-fix.css            # Navbar styling (same on all pages)
├── modal-close-fix.js        # ✕ Cross close + backdrop + ESC fix
├── footer-fix.html           # Footer (har page ke </body> se pehle lagayein)
├── footer-fix.css            # Footer styling
├── blog.html                 # Blog listing page (13 articles)
├── contact.html              # Contact Us page
├── privacy-policy.html       # AdSense-compliant Privacy Policy
├── ads.txt                   # AdSense verification (apni ID daalein)
├── robots.txt                # Search engine crawling
├── sitemap.xml               # SEO sitemap
└── blog/
    ├── index.html            # Blog index (redirect)
    ├── hair-anatomy-complete-guide.html
    ├── heart-anatomy-complete-guide.html
    ├── anatomical-planes-directions.html
    ├── cranial-nerves-complete-guide.html
    ├── human-skeleton-complete-guide.html
    ├── human-eye-anatomy-guide.html
    ├── human-brain-anatomy-guide.html
    ├── human-lungs-respiratory-guide.html
    ├── human-kidney-urinary-guide.html
    ├── human-digestive-system-guide.html
    ├── human-muscular-system-guide.html
    ├── human-skin-integumentary-guide.html
    ├── male-reproductive-system-guide.html
    └── medical-disclaimer.html
```

---

## Kaise Use Karein (Step-by-Step)

### Step 1: Download aur Extract
Ye ZIP file download karein aur extract karein. Aapko `corpus-final-fix/` folder milega.

### Step 2: Apne GitHub Repo Mein Copy Karein
Apne local repo (`https://github.com/numanshabbir88-svg/corpus-anatomy-atlas.git`) mein in files ko copy karein:

- Root folder mein: `navbar-fix.html`, `navbar-fix.css`, `modal-close-fix.js`, `footer-fix.html`, `footer-fix.css`, `blog.html`, `contact.html`, `privacy-policy.html`, `ads.txt`, `robots.txt`, `sitemap.xml`
- `blog/` folder mein: sabhi 13 article HTML files

### Step 3: Navbar Har Page Par Lagayein
Apne **har page** (Home, Learn, Blog, Quiz, Body map, etc.) ka navbar `navbar-fix.html` se copy karein. 

**Zaroori:** Sirf current page ke link par `corpus-navbar__link--active` class lagayein, baaki links same rahein.

Navbar-fix.css apne `<head>` mein include karein:
```html
<link rel="stylesheet" href="navbar-fix.css">
```

### Step 4: Modal Close Fix (Image Wapis Jane Ka)
`modal-close-fix.js` apne har page ke `<body>` ke end mein include karein:
```html
<script src="modal-close-fix.js"></script>
```

Ye script se:
- ✕ cross button se image/modal band hogi
- Peeche ke dark backdrop par click karne par bhi band hogi
- ESC key dabane par band hogi

### Step 5: Footer Har Page Par Lagayein
`footer-fix.html` apne **har page ke `</body>` se pehle** lagaein. 
`footer-fix.css` apne `<head>` mein include karein:
```html
<link rel="stylesheet" href="footer-fix.css">
```

### Step 6: ads.txt Mein Apni ID Dalein
`ads.txt` kholein aur ye line badlein:
```
google.com, pub-REPLACE_WITH_YOUR_PUBLISHER_ID, DIRECT, f08c47fec0942fa0
```
`pub-REPLACE_WITH_YOUR_PUBLISHER_ID` ko apni **real Google AdSense publisher ID** se badlein.

### Step 7: Push Karein
```bash
git add .
git commit -m "Fix: navbar, footer, modal close, blog articles, AdSense pages"
git push origin main
```

---

## 13 Blog Articles (Har Article Mein 5 Q&A)

1. hair-anatomy-complete-guide.html — Inside a Single Hair
2. heart-anatomy-complete-guide.html — Human Heart
3. anatomical-planes-directions.html — Anatomical Planes
4. cranial-nerves-complete-guide.html — 12 Cranial Nerves
5. human-skeleton-complete-guide.html — Human Skeleton (206 bones)
6. human-eye-anatomy-guide.html — Human Eye
7. human-brain-anatomy-guide.html — Human Brain
8. human-lungs-respiratory-guide.html — Human Lungs
9. human-kidney-urinary-guide.html — Human Kidney
10. human-digestive-system-guide.html — Digestive System
11. human-muscular-system-guide.html — Muscular System
12. human-skin-integumentary-guide.html — Human Skin
13. male-reproductive-system-guide.html — Male Reproductive System

Har article mein:
- Unique, original content
- Medical disclaimer
- References section
- 5 FAQ (Frequently Asked Questions)
- Mobile responsive design

---

## Mobile Responsiveness
Saare CSS files mein media queries shamil hain (max-width: 768px aur 640px), taake blog pages mobile par sahi dikhein.

---

## AdSense Approval Checklist (Ab Complete)
- [x] 13 original, high-quality articles
- [x] Har article unique, repeat nahi hai
- [x] Contact Us page present hai
- [x] Privacy Policy mein AdSense/cookies/tracking disclosure hai
- [x] Har health article par medical disclaimer hai
- [x] ads.txt, robots.txt, sitemap.xml present hain
- [x] Mobile responsive design

---

**Note:** Main ne GitHub ya Netlify par kuch bhi push nahi kiya. Aap in files ko download karke apne repo mein push karein. Koi madad chahiye to batayein.
