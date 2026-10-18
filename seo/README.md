# Corpus on-page SEO editing (58 chapters)

Is folder mein `chapters/heart.json` jaisi **58 editable files** hain. Har file mein page ka `title`, visible intro + meta `description`, `updated` editorial date, aur **5 visible questions/answers** hain. Build in data ko real HTML pages mein likhta hai; koi client-side API, login, ya JavaScript FAQ loading nahin hai.

## Netlify par live hone ke baad ka asaan tareeqa

1. `corpus/` folder ko GitHub (ya Netlify-supported Git provider) ki repository se connect karein. Netlify `netlify.toml` ka build automatically chalata hai.
2. Sirf jis chapter ko edit karna ho, uski file kholein, maslan `seo/chapters/heart.json`. GitHub website par pencil/Edit se title, description, ek question ya uska answer badlein. **Ya** source ka `seo/editor.html` apne browser mein open karke chapter JSON load karein, form se edit karke updated JSON download karein; phir repository mein usi naam ki purani file replace karein. Editor offline hai, login ya auto-save nahin karta. Direct JSON editing mein quotes, commas aur exactly 5 question/answer items barqarar rakhein.
3. Medical claim aur linked anatomy parts ko human expert se verify karein. Genuine editorial change par us chapter ki `updated` date ko **asal** `YYYY-MM-DD` mein badlein; date ko bina content change ke artificial freshness ke liye na badlein.
4. GitHub par **Commit changes** karein. Git-connected Netlify apne aap naya build + deploy karta hai; aap ko manually ZIP dobara upload karne ki zaroorat nahin. Build mein `verify_seo.py` links, pages aur 5 Q&A blocks check karta hai. Netlify ke Deploys tab se result aur live page dekhein.
5. Agar Git connect nahi kiya aur sirf drag-and-drop se site upload ki hai, to har static-content change ke baad `python3 build_seo.py && python3 verify_seo.py` chala kar `site/` ko **dobara upload** karna hoga. Static HTML ko bina nayi publication ke server par badla nahi ja sakta.

Example: `seo/chapters/heart.json` ki `questions` mein ek item ka `question` aur `answer` edit karein. Save/commit ke baad generated `/learn/heart/` page par wohi jawab HTML mein show hoga. Code, template aur atlas files edit karna zaroori nahin. Sitemap ka heart URL aur uska `lastmod` chapter ki `updated` date se aayega; Netlify ka real free HTTPS URL canonical aur sitemap origin deta hai.

Questions educational search intent ko dhyan mein rakh kar likhe gaye hain; **Google query-volume research ka measured dataset nahin**. On-page copy sirf anatomy page se milte facts rakhe. Keyword stuffing, repetitive low-value pages, fabricated reviewers, exact clinical diagnoses, aur AI citation promises se bachein. Jawab full, visible HTML mein hain. Is project mein `FAQPage` rich-result schema jaan-boojh kar nahin lagaya: Google ne FAQ rich results May 2026 se band kar diye. Google AI ke liye special schema ya `llms.txt` ki requirement nahin; indexing aur useful text important hain. Public `robots.txt` crawlers ko block nahin karta, magar Google ya Meta AI kab, kya crawl/cite karein iski guarantee nahin.

Official references:
- Netlify automatic Git deployments: https://docs.netlify.com/deploy/create-deploys/
- Google AI features and search fundamentals: https://developers.google.com/search/docs/appearance/ai-features
- Google FAQ rich result retirement: https://developers.google.com/search/updates
- Meta crawler controls: https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers
