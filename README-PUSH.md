# Corpus Anatomy Atlas — batch 1 → 3 delivery

Sab kuch `numanshabbir88-svg/corpus-anatomy-atlas` ke `origin/main` (commit `9b68b47`) ke upar bana hai.
Mere paas 5 commits hain, HEAD = `bac8340`. Working tree clean hai.


## Option D — zip seedha repo folder mein extract (sabse simple, no terminal)

1. `corpus-atlas-updates.zip` download karein.
2. Apne clone ka root folder kholen aur zip ko **wahin extract** karein (overwrite: **Yes / Replace**).
   - Files repo ke same paths par hain: `app.js`, `part-pins.js`, `index.html`, `styles.css`, `micro-lens.js`, `preview.js`, `build_seo.py`, `seo-keyword-map.csv`, `learn/…`
3. `git status` — 15 files (14 modified + `part-pins.js` naya) dikhni chahiye.
4. `git add -A && git commit -m "Thin leader-line pointers + label layout polish" && git push origin main`
5. `_patches/` aur `README-PUSH.md` sirf reference ke liye hain — commit na karein (galti se add ho jayen to `git rm -r --cached _patches README-PUSH.md`).

---

## Option A — single patch (sabse aasan, recommended)

```bash
cd corpus-anatomy-atlas
git checkout main && git pull
git apply --check ../corpus-batch-1-3.patch   # pehle test
git apply ../corpus-batch-1-3.patch
git add -A
git commit -m "Thin leader-line pointers + label layout polish across every plate"
git push origin main
```

## Option B — 5 original commits (history waisi hi rahegi)

```bash
cd corpus-anatomy-atlas
git checkout main && git pull
git am ../patches/000*.patch
git push origin main
```

## Option C — files directly replace karke (GitHub web UI)

`files/` folder ke andar repo ke same paths hain. Inko repo mein copy karke commit karein:

| file | kya hai |
|---|---|
| `part-pins.js` | **naya file** — 593 pins + 41 second-plate pointers + lens rows |
| `app.js` | label placement engine (`declutterLabels`), `partPlate()`, dense/vdense classes |
| `styles.css` | leader 1.1px hairline, label boxes, dense type scale |
| `micro-lens.js` | microscope lens rows |
| `preview.js` | plate preview modal |
| `index.html` | `part-pins.js` script tag + cache-bust **`?v=59`** |
| `build_seo.py` | `part-pins.js` in FILES, lens section fix |
| `seo-keyword-map.csv` | SEO keyword map refresh |
| `learn/*/index.html` | 8 regenerated SEO pages (brain, brainstemdeep, cerebraldeep, cleavageblastocyst, heart, implantation, tissuefoundations) |

> Note: `learn/…` pages build_seo.py se bante hain; agar aap khud `python3 build_seo.py` chalate hain to wo phir se generate ho jayenge — dono theek hai.

---

## Push ke baad 1 minute ka check

1. Hard refresh (Ctrl/Cmd + Shift + R) — cache-bust `?v=59` hai, purana CSS cache nahi aayega.
2. `#/heart` kholen → 21 thin leader lines, labels gutter mein, koi overlap nahi.
3. `#/laborthirdstage` → 17 labels (pehle is plate par ek bhi nahi tha).
4. Mobile 390 px → labels ki jagah dots + "Structure labels" list.

---

## Kya cover hua (audit numbers)

- **72 / 73 plates** par thin leader + label — 1189 leader lines, median 18 per plate (max 28).
- **1465 / 1586 parts (92.4 %)** par pointer.
- Bacha hua **121 = study-note rows** (dentition tooth numbers, fertilisation phases, trimester ages) — inki koi shakl image par bani hi nahi, isliye inko false pin nahi diya.
- Health: 74-chapter sweep → 0 JS error, 0 broken image; SEO build **PASS 79 pages**.

## Batch 4 (nahi kiya)

Male/Female hub ke écorché reference figure par muscle labels — sample aap ko dikhaya tha, aap ne kaha "bas theek hai", isliye wo **include nahi** hai. Kabhi bhi bolen to laga dunga.
