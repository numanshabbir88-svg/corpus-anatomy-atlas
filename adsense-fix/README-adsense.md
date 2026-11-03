# Corpus Anatomy Atlas — AdSense Approval Fix Package

In files ka maqsad: Google AdSense approval ke liye zaroori pages aur content taiyar karna, taake aapki site reject na ho.

Aapne jo issues bataye thay, un sab ka fix yahan hai:

| Issue | Fix File |
|-------|----------|
| Sirf 2 blog articles hain | `blog/` mein 4+ nayi original articles |
| Contact page nahi hai | `contact.html` |
| Privacy Policy inconsistent / tracking-ad disclosure nahi hai | `privacy-policy.html` |
| Medical accuracy / references nahi hain | Har article mein references + disclaimer |
| Similar templates / repeated explanations | Har article mein unique, original content |
| ads.txt / robots.txt / sitemap missing | `ads.txt`, `robots.txt`, `sitemap.xml` |

## Kaise use karein

1. Ye saari files download karein.
2. Apne project ke root mein `blog/` folder aur `contact.html`, `privacy-policy.html`, `ads.txt`, `robots.txt`, `sitemap.xml` paste karein.
3. Apne navbar mein in links ko jodein: Blog, Contact Us, Privacy Policy.
4. Har article ke end mein medical disclaimer aur reference section zaroor rakhein.
5. Site ko locally test karein, phir Netlify par push karein.

## AdSense approval ke zaroori points (Checklist)

- [ ] Kam se kam 10-15 high-quality, original articles hon (abhi 2 hain, in mein 4 nayi jod rahe hain; aap aur bhi jod sakte hain)
- [ ] Har article unique ho, copy-paste na ho
- [ ] Privacy Policy mein Google AdSense, cookies, third-party ads ka zikr ho
- [ ] Contact Us page mein real email / contact form ho
- [ ] Health content par medical disclaimer ho ("I am not a doctor...")
- [ ] `ads.txt` file root mein ho (AdSense publisher ID bhar lein)
- [ ] Site mobile-friendly ho aur tezi se load ho

## File List

```
adsense-fix/
├── README-adsense.md           # yeh file
├── privacy-policy.html         # AdSense-compliant Privacy Policy
├── contact.html                # Contact Us page
├── blog.html                   # Blog listing / index page
├── ads.txt                     # AdSense verification (apni ID daalein)
├── robots.txt                  # Search engine crawling
├── sitemap.xml                 # SEO sitemap
└── blog/
    ├── index.html              # Blog index (redirect/alias)
    ├── hair-anatomy-complete-guide.html   # Original article #1
    ├── heart-anatomy-complete-guide.html  # Original article #2
    ├── anatomical-planes-directions.html  # Original article #3
    └── medical-disclaimer.html            # Standalone medical disclaimer
```

**Important:** `ads.txt` mein apni real Google AdSense publisher ID daalein bina uske ads nahi chalenge.
