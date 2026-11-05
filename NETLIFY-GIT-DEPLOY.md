# Corpus ko Netlify par GitHub se publish karein

**Is ZIP ko Netlify Drop mein drag-and-drop mat karein.** Yeh Git-connected **source package** hai. Netlify build ke baad khud `site/` publish karta hai. Domain khareedna zaroori nahin; pehle free `*.netlify.app` address use karein.

## Pehli dafa publish karna

1. ZIP extract karein. Extracted files mein `netlify.toml`, `build_seo.py`, `index.html`, `seo/` aur `img/` **repository root par** hone chahiye. ZIP ke andar koi extra `corpus/` nesting nahin hai.
2. GitHub par nayi repository bana kar extracted files upload/commit karein. Files zyada hain, is liye GitHub Desktop ya `git` se repo push karna web par hundreds of files manually upload karne se behtar hai. Generated `site/` source repo mein upload nahin karna; `.gitignore` isay exclude karta hai.
3. Netlify mein **Add new project → Import an existing project → GitHub**. Apni repository aur production branch select karein. Root/base directory repo root rakhein. `netlify.toml` build command `python3 build_seo.py && python3 build_ai_knowledge.py && python3 verify_seo.py` aur publish folder `site` deta hai. `package.json` pins Netlify's CSP nonce build plugin; Netlify should install it before the build.
4. Deploy log mein SEO audit PASS, `Auto ads: loader added to 103 public HTML pages`, `ads.txt: generated for pub-5783924977074679`, aur CSP nonce plugin bina error ke complete hua ho, yeh confirm karein. Production build uses Netlify's `URL`; branch/PR previews intentionally remain noindex and ad-free.
5. Apne **main production** address par `/`, `/learn/`, `/about.html`, `/privacy-policy/`, `/robots.txt`, `/sitemap.xml`, aur `/ads.txt` khol kar check karein. `/ads.txt` mein `google.com, pub-5783924977074679, DIRECT, f08c47fec0942fa0` hona chahiye. Page source mein Auto ads loader ek baar `<head>` mein hona chahiye. Agar build fail ho ya output missing ho, AdSense verification start na karein.
6. Google Search Console mein apne actual Netlify URL-prefix property verify karein, phir `/sitemap.xml` submit karein. Crawl, ranking, or AI citation automatic/guaranteed nahi.
7. AdSense Home par **Connect your site to AdSense → Let's go** select karein. Code-snippet verification choose karein, kyunki Auto ads loader deploy mein pehle se hai; **Verify** karke **Request review** karein. Code ko dobara paste na karein. Google CMP is account mein selected hai; approval/ads serving Google review par depend karte hain.

## Baad mein content/SEO badalna

`seo/chapters/<slug>.json` edit karein ya offline `seo/editor.html` se updated JSON banayein, phir GitHub repo mein commit/push karein. Netlify **automatically naya deploy** karega; URL same rahega. Real content badalne par chapter ki `updated` date badlein. Search Console par important page ko inspect kar sakte hain. URL slug mat badlein; badalna zaroori ho to purane URL se naye par 301 redirect plan karein. Rozana artificial dates ya bulk low-value questions na dalain.

## Limits / abhi pending

- Local file preview jaan-boojh kar `noindex` hai. Sirf production Netlify `CONTEXT=production` aur real URL build indexable HTML + sitemap deta hai.
- 74 chapters, 370 question-answer pairs aur anatomy atlas ka technical audit hua hai; named clinical expert review, keyword-volume measurement, live Search Console verification aur AdSense approval **nahin** hua.
- `numanshabbir88@gmail.com` About aur Privacy mein public contact ke taur par set hai. Publisher inbox aur policy text ko live hone par verify kare; badalna ho to Netlify mein `CONTACT_EMAIL` set karke redeploy kare. Ads sirf account aur policy approval ke baad, real publisher ID ke saath.

Details: `SEO-DEPLOY-CHECKLIST.md`, `seo/README.md`.
