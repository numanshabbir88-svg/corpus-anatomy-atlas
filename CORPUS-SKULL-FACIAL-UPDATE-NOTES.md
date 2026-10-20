# Corpus — skull, facial bones and CN VII update

**Is ZIP ko existing GitHub repository ki root mein extract karein aur files overwrite karein.** Purani images ya chapters delete na karein. GitHub Desktop se changes commit aur Push origin karein; connected Netlify automatically `build_seo.py && verify_seo.py` run karega. Live deployment aur expert medical review abhi confirm nahin hue.

## Naya kya hai
- Dedicated `#/skullface` aur `/learn/skullface/` chapter: **14 facial + 8 cranial = 22 adult skull bones**, sab ka naam, location, function aur clinical context; total 30 substantive entries aur five reading-guide Q&As. Yeh 206-bone atlas ki inventory ko **duplicate** nahin karta.
- Two realistic digital teaching illustrations: front skull with fine clickable labels **sirf clearly visible bones par**, plus separate medial cutaway for unpinned deep bones. Images scans ya actual specimens nahin hain; conceptual detail ko verified histology na samjhein.
- `#/facialnerve` aur `/learn/facialnerve/` pehle se **alag chapter** thay. Ab Skull chapter se clear links hain aur CN VII side-view plate par six extracranial branch pointers audit karke correct hue. Hidden stylomastoid foramen par false pointer hata diya. CN V facial skin sensation aur CN VII expression motor ka farq maintained hai.
- Existing skeleton ka 206-bone atlas, body map, 23-chapter organ-to-tissue views, Vulva/Lung fixes aur About page retained.
- Site totals: **59 chapters**, **1,210 named chapter entries**, **162 interactive quiz questions**, **295 static Q&As**, **64 HTML pages**, **63 production sitemap URLs**.

## Checks
Production aur deploy-preview SEO audits pass. Skull, CN VII, skeleton, FAQ, deep-bone no-pointer behavior, zoom/modal, focus on real photos, 206-bone count, existing micro-lens chapters, Vulva aur body map desktop/mobile 1440/390/320px par local browser tests pass. Koi live Netlify deploy ya formal clinician sign-off claim nahin.
