CORPUS ANATOMY ATLAS

NETLIFY DEPLOY: Start with NETLIFY-GIT-DEPLOY.md. Extract the final ZIP and put its contents at the ROOT of your GitHub repository; do not upload the source ZIP to Netlify Drop. Netlify runs the build and publishes site/ automatically.

Open index.html in a modern browser after extracting this folder. All CSS, JavaScript and images are stored locally in the folder; no account or external library is required. For a local compressed preview, run `python3 server.py --port 3000` inside the corpus folder and open http://localhost:3000 in your own browser.

Contents: 58 anatomy chapters with at least 20 documented parts per chapter (1,179 chapter entries total), 159 quiz questions, a 206-bone atlas, 45 joint families and 312 muscle records. The male and female section hubs are #/male and #/female; their reproductive-system overview chapters are #/maleoverview and #/femaleoverview.

In chapter pages, numbered pins and schematic labels mark only structures represented on that regional image. Gold-bordered “Study note” entries add deeper anatomy without claiming an exact pin or histology photo. Search works for both pinned structures and study notes.

Educational reference only. Digital renders are not patient photographs or diagnostic images. See chapter source links and the site footer for reference context.

Bandwidth: the site displays compact WebP plates and smaller thumbnails, loads most images only when needed, and caches assets in the optional local server. The original JPG/PNG plates are also retained in img/ for reference. Full anatomy text, chapters and quizzes are still available offline.

Search-readable study pages are in learn/. Every one of the 58 chapter pages has five visible, chapter-specific questions and answers (290 total), breadcrumbs, and 3–4 relevant related-guide links. All chapters receive at least one related-guide link from another article. Edit title, intro/meta description, Q&A and editorial update date in seo/chapters/<chapter>.json; see seo/README.md. Git-connected Netlify rebuilds and publishes automatically on commit. A drag-and-drop site needs another manual upload after every content edit. Static indexed HTML cannot change on the live site without a new publication. The reading edition includes an illustrated featured-guide layout, system shortcuts, light accessible motion and an article reading indicator. For a real deployment, run python3 build_seo.py && python3 verify_seo.py with a valid HTTPS SITE_URL (or use the Netlify build configuration). See SEO-DEPLOY-CHECKLIST.md. The generated site/ directory is the lean production publish folder. Canonicals and the 62-URL sitemap are deliberately not given a fake address in the noindex local preview. A free Netlify site address is sufficient for publishing; buying a custom domain is optional.
