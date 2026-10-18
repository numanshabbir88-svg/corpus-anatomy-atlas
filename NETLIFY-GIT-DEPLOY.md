# Corpus ko Netlify par GitHub se publish karein

**Is ZIP ko Netlify Drop mein drag-and-drop mat karein.** Yeh Git-connected **source package** hai. Netlify build ke baad khud `site/` publish karta hai. Domain khareedna zaroori nahin; pehle free `*.netlify.app` address use karein.

## Pehli dafa publish karna

1. ZIP extract karein. Extracted files mein `netlify.toml`, `build_seo.py`, `index.html`, `seo/` aur `img/` **repository root par** hone chahiye. ZIP ke andar koi extra `corpus/` nesting nahin hai.
2. GitHub par nayi repository bana kar extracted files upload/commit karein. Files zyada hain, is liye GitHub Desktop ya `git` se repo push karna web par hundreds of files manually upload karne se behtar hai. Generated `site/` source repo mein upload nahin karna; `.gitignore` isay exclude karta hai.
3. Netlify mein **Add new project → Import an existing project → GitHub**. Apni repository aur production branch select karein. Root/base directory repo root rakhein. `netlify.toml` build command `python3 build_seo.py && python3 verify_seo.py` aur publish folder `site` deta hai. Agar UI mein fields pooche to isi command aur `site` ko confirm karein.
4. Deploy log mein `SEO audit PASS: 63 pages, 62 sitemap URLs ... public mode` dekh kar deploy complete hone dein. Netlify apna free HTTPS site address dega. Production build mein Netlify ka `URL` variable canonical URLs aur 62-URL sitemap generate karega. Branch/PR previews jaan-boojh kar `noindex` rehte hain.
5. Apne **main production** address par `/`, `/learn/`, `/learn/heart/`, `/about.html`, `/privacy.html`, `/robots.txt`, `/sitemap.xml` khol kar check karein. Heart page ke source mein `noindex` nahin hona chahiye; canonical aur sitemap loc *isi* main address par hone chahiye. Agar build fail ho ya `sitemap.xml` na mile, deploy ko SEO-ready samajh kar Search Console mein submit na karein.
6. Google Search Console mein apne *actual* `https://name.netlify.app/` URL-prefix property verify karein, phir `https://name.netlify.app/sitemap.xml` submit karein. Crawl, ranking ya AI citation automatic/guaranteed nahin. Public contact email, medical editorial review aur AdSense application alag pending kaam hain.

## Baad mein content/SEO badalna

`seo/chapters/<slug>.json` edit karein ya offline `seo/editor.html` se updated JSON banayein, phir GitHub repo mein commit/push karein. Netlify **automatically naya deploy** karega; URL same rahega. Real content badalne par chapter ki `updated` date badlein. Search Console par important page ko inspect kar sakte hain. URL slug mat badlein; badalna zaroori ho to purane URL se naye par 301 redirect plan karein. Rozana artificial dates ya bulk low-value questions na dalain.

## Limits / abhi pending

- Local file preview jaan-boojh kar `noindex` hai. Sirf production Netlify `CONTEXT=production` aur real URL build indexable HTML + sitemap deta hai.
- 58 chapters, 290 question-answer pairs aur anatomy atlas ka technical audit hua hai; named clinical expert review, keyword-volume measurement, live Search Console verification aur AdSense approval **nahin** hua.
- `numanshabbir88@gmail.com` About aur Privacy mein public contact ke taur par set hai. Publisher inbox aur policy text ko live hone par verify kare; badalna ho to Netlify mein `CONTACT_EMAIL` set karke redeploy kare. Ads sirf account aur policy approval ke baad, real publisher ID ke saath.

Details: `SEO-DEPLOY-CHECKLIST.md`, `seo/README.md`.
