# Corpus: launch, search aur AdSense checklist

## Abhi kya bana hai
- `learn/` mein 74 **real HTML study pages** hain; har page mein chapter ka intro, digital or regional context illustration, 20+ substantive anatomy/development entries, function, clinical context, related links aur further reading hai. Existing interactive atlas `index.html` alag se barqarar hai.
- `editorial.css` reading edition ko polished, responsive layout deta hai: featured illustrated guide, body-system jump navigation, clear chapter typography, subtle reduced-motion-aware entrance effects aur article reading indicator (`reading.js`). Images ki width/height layout shift se bachati hai. `seo-keyword-map.csv` English worldwide search intent ki planning list hai; yeh search-volume estimate ya ranking promise **nahin** hai. Keyword-stuffed meta tags nahin lagaye.
- `seo/chapters/` mein 74 editable JSON files hain: page title, meta/visible description, chapter-specific 5 Q&A aur real update date. Total **370 visible Q&A** crawlable HTML mein generate hotay hain. Hub se sab 74 articles link hain; har article mein breadcrumbs, atlas link, deep-chapter references aur **3–4 related chapter cards** hain (koi orphan article nahin). `seo/README.md` mein GitHub se edit aur automatic Netlify deploy ka step-by-step tareeqa hai. `about.html`, `privacy.html`, `404.html` aur linked navigation maujood hain. No ad script or fake medical reviewer.
- Foundations ke liye 3 naye English guides: terminology/planes, cavities/abdominal regions, aur cell/four tissue families; visual microscopic examples generated digital models hain, real histology nahin. Coverage audit `COVERAGE-ROADMAP.md` mein hai; baqi topics stages mein pending hain.
- Dental students ke liye `/learn/dentition/` mein 32 permanent + 20 primary tooth positions (Universal/FDI), tooth tissues aur V2/V3 nerve pathways ka chart, 76 named entries aur 5 visible Q&A hain. Class images position charts nahin; adult-type representative illustrations hain.
- Skull/facial-bones ka dedicated guide `/learn/skullface/` mein 14 facial + 8 cranial bones ko separate naam, explanation, function aur clinical note deta hai; `/learn/facialnerve/` existing CN VII chapter se cross-linked hai. Surface markers sirf clearly identifiable features par hain.
- `build_seo.py` production ke liye `site/` banata hai. Is mein compact WebP imagery hai; source `img/` mein original images bhi mehfooz hain.

## Netlify — sab se seedha raasta
1. `corpus/` ko Git repository ki root ke taur par Netlify se connect karein (ya repo root par `corpus` base directory set karein). `netlify.toml` build command aur publish folder set karta hai.
2. User-provided public contact `numanshabbir88@gmail.com` default se About/Privacy mein aa raha hai; isay badalna ho to Netlify environment mein `CONTACT_EMAIL` set karein. Deploy par Netlify ka `URL` variable automatically site origin deta hai; build us se canonical URLs, `robots.txt` aur `sitemap.xml` banata hai.
3. Netlify se milne wala permanent HTTPS address khol kar `/learn/`, `/learn/heart/`, `/about.html`, `/privacy.html`, `/robots.txt`, `/sitemap.xml` check karein. Baad mein custom domain set ho to rebuild karein taa-ke URLs nayi domain par aa jaayen.
4. Agar manually drag-and-drop karna ho, pehle actual live HTTPS URL ke saath `SITE_URL=https://YOUR-REAL-URL CONTACT_EMAIL=... python3 build_seo.py` chalayein; phir **sirf `site/` ka content** upload karein. Example/placeholder URL kabhi production par upload na karein.

## Render static site
Build command `python3 build_seo.py && python3 verify_seo.py`, publish directory `site`. Render ka stable free HTTPS URL milne par `SITE_URL` aur public `CONTACT_EMAIL` environment mein set karein, phir redeploy. Static site ka root path hi publish hona chahiye, `corpus/site` ka URL prefix nahin.

## On-page SEO badalne ka workflow
- **Git se Netlify connect ho:** `seo/chapters/<slug>.json` ka title, description, 5 Q&A aur real `updated` date GitHub website par edit karke commit karein. Agar JSON syntax mushkil lage to source-only offline form `seo/editor.html` se edited file download karke repository mein replace/commit karein. Netlify automatically **naya deploy** karta hai; manual ZIP upload nahin chahiye. Static HTML ko live badalne ke liye nayi publication phir bhi hoti hai.
- **Drag-and-drop upload ho:** changes local source mein edit, `python3 build_seo.py && python3 verify_seo.py` run, phir `site/` dobara upload karein. `seo/README.md` mein details hain. 5 questions search-intent editorial ideas hain, verified high-volume keyword data nahin.
- FAQ answers HTML mein hamesha visible hain; JS loading ya hidden SEO-only text nahin. Google ne FAQ rich results May 2026 mein khatam kiye, is liye FAQPage rich snippet ya AI citation ka promise nahin. Public robots.txt Meta crawler ko block nahin karta, lekin Meta AI ke jawab mein source aana kisi tool se guarantee nahin hota.

## Google Search ke liye launch ke baad
- Search Console mein actual domain/URL property verify karein, `sitemap.xml` submit karein, aur URL Inspection se 2–3 article pages test karein. Search Console ya ranking data abhi connect nahin hai.
- Medical/anatomy content ki accuracy, image rights, related-source links aur sensitive illustrations ko human subject expert se review karwaein. Pages ko as-is upload karne se indexation ya ranking guarantee nahin milti.
- Har chapter ki haqiqi content update par usi `seo/chapters/<slug>.json` ki `updated` date badlein. Hub/policy pages mein real editorial update ho to `build_seo.py` ka `CONTENT_UPDATED` badlein; har automatic deploy par jhooti fresh date na dikhayen.
- Useful updates, genuine corrections, original explanations aur clean internal links ko priority dein. Fake keywords, fabricated medical credentials, copied text ya bulk low-value pages se bachein.

## AdSense apply karne se pehle
- Real owner/publisher ka public contact email aur valid privacy disclosures final karein. Site live, public aur complete honi chahiye. Publisher account applicant Google ki age/eligibility requirements poori kare.
- Account milne par sirf **real** `pub-...` ID ko `ADSENSE_PUBLISHER_ID` environment variable mein set karein; build root `/ads.txt` produce karega. Verification code account ke exact instructions ke mutabiq lagayen. Is preview mein ad code **nahin** hai.
- Ads shuru karne se pehle privacy policy ko actual ad vendors, cookies aur data uses ke mutabiq update karein. EEA/UK/Switzerland users ko personalized ads ke liye Google-certified TCF CMP ki zarurat ho sakti hai. Blank/fake cookie banner compliance nahin hota.
- Medical reproductive illustrations (breast/genital anatomy included) publisher policy mein sensitive inventory ho sakti hain. Un pages par ad placement ka alag policy review karein; restricted demand ya no ads possible hain. Educational content ko falsely explicit ya ad-safe guarantee na samjhein.
- AdSense approval ka faisla Google karta hai; layout, SEO ya `ads.txt` approval guarantee nahin karte.

## Reference policies
- Search-friendly URLs instead of hash-only views: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- People-first health content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AdSense site readiness: https://support.google.com/adsense/answer/7299563
- AdSense eligibility: https://support.google.com/adsense/answer/9724
- Privacy disclosures: https://support.google.com/adsense/answer/1348695
- EEA/UK/Swiss CMP: https://support.google.com/adsense/answer/13554116
- Sexual-content inventory restrictions: https://support.google.com/adsense/answer/10437795
