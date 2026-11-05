# AdSense setup checklist for Corpus Anatomy Atlas

**Status as of 2026-11-05:** You selected `https://corpus-anatomy-atlas.netlify.app`, supplied the Auto ads client ID `ca-pub-5783924977074679` (publisher ID `pub-5783924977074679`), and activated Google's CMP. Your latest AdSense screenshot shows **Ads settings confirmed** while **Connect your site to AdSense** is still required. The source build is now wired to add the Auto ads loader to all 103 public HTML pages and generate root `/ads.txt` on production builds only; branch/deploy previews remain ad-free. Netlify's per-request CSP nonce plugin is configured so the ad loader works with the site's CSP. These changes are packaged but have **not** been pushed or deployed by me. You will deploy from your own repo, then connect/verify the site in AdSense; approval is still Google's decision.

## Setup details already received

The following user-provided setup values and choices are recorded; no login details are needed:

1. **Production site URL — received:** `https://corpus-anatomy-atlas.netlify.app`. Google allows certain subdomains on platforms included in the Public Suffix List; Netlify documents that `netlify.app` is on that list. This makes the Netlify URL a reasonable one to submit, but Google still performs its own site-ownership and policy review, so approval is not guaranteed. [AdSense site rules](https://support.google.com/adsense/answer/12170421?hl=en) · [Netlify security checklist](https://docs.netlify.com/resources/checklists/security-checklist/)
2. **Publisher ID for `ads.txt` — received and wired:** `pub-5783924977074679`. The corresponding script client ID is `ca-pub-5783924977074679`. The build uses the supplied public ID by default (a production `ADSENSE_PUBLISHER_ID` environment variable can override it) and writes the `pub-...` format in root `ads.txt`. Google's ads.txt format uses the publisher ID from your account. [Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en) · [Ads.txt FAQs](https://support.google.com/adsense/answer/9785052)
3. **Ad delivery choice — Auto ads:** the supplied snippet selects Auto ads, so no manual slot IDs are needed unless you later choose specific ad units and placements. We do not need your Google password.
4. **Consent-message choice — Google Privacy & Messaging selected:** you report that you activated Google's CMP, and the AdSense Privacy & messaging overview screenshot shows **1 active** European-regulations message. The other screenshot shows an editor titled “Untitled European regulations message” with a **Publish** button; that particular draft may not be published yet. Check the overview's active count after leaving the editor, and publish the draft only if it is the message you intend to use (avoid accidental duplicates). If personalized ads are served to visitors in the EEA, UK, or Switzerland, Google requires a certified CMP integrated with the IAB TCF. [Google consent requirements](https://support.google.com/adsense/answer/13554116?hl=en)

The builder validates the `pub-` plus 16 digits format and, on a production build, writes this root `/ads.txt` line (using the supplied ID by default or a Netlify environment override):

```text
google.com, pub-5783924977074679, DIRECT, f08c47fec0942fa0
```

Google's guidance says ads.txt is recommended, not mandatory; if used, its publisher ID must match the AdSense account. [Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)

## Auto ads code supplied and integrated into the production build

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5783924977074679" crossorigin="anonymous"></script>
```

`build_seo.py` inserts this loader in the `<head>` of every public HTML page when building for the production origin. Branch/deploy previews and local builds without a production URL do not receive it. The Google publisher ID is public, not a login credential. Source is ready, but the website will not contain the updated code until you push/deploy it.

## What you do inside AdSense (keep private)

- Create the account using your own accurate payee, country, and contact details. Google requires applicants to be at least 18 and requires original, policy-compliant content. [Eligibility requirements](https://support.google.com/adsense/answer/9724?hl=en)
- After your Netlify deploy is live, open AdSense Home and click **Let's go** on **Connect your site to AdSense**. The Auto ads loader will already be in the production `<head>`; choose the AdSense code-snippet verification method, click **Verify**, then **Request review** (do not paste a second copy). Ads cannot serve until the site is approved; Google's review timing varies. [Connect/review a site](https://support.google.com/adsense/answer/7584263) · [Add/review a site](https://support.google.com/adsense/answer/12169212?hl=en)
- **Google CMP status:** selected/activated in your AdSense account; overview shows one active European-regulations message. Manage it under **Privacy & messaging → European regulations**. Before publishing anything else, check whether the “Untitled European regulations message” editor shown in your screenshot is just an unpublished draft; the active message may already be sufficient. This is an account-side setting, not a code or ID you need to send me. [Connect your site and select a CMP](https://support.google.com/adsense/answer/7584263)
- The project already contains a privacy-policy page. Its expected public URL is `https://corpus-anatomy-atlas.netlify.app/privacy-policy/` once that version is deployed; enter it when the AdSense consent-message setup asks for your privacy-policy URL. It is not verified live in this workspace.
- Complete payment profile, tax information, identity/address verification, and bank/payment method **inside your AdSense/Google Payments account only** when Google requests them. Do not send me tax forms, tax IDs, bank details, government-ID images, PINs, passwords, 2-step codes, or recovery codes. [Payment setup](https://support.google.com/adsense/answer/1709858?hl=en) · [Tax information](https://support.google.com/adsense/answer/14131950?hl=en)

## Before connecting the site in AdSense

- The build includes the supplied public publisher ID by default. If a Netlify **production** `ADSENSE_PUBLISHER_ID` variable already exists, make sure it is exactly `pub-5783924977074679`; otherwise unset it to use the source default. This ID is public, not a secret. Netlify supplies the production URL; an explicit `SITE_URL=https://corpus-anatomy-atlas.netlify.app` may pin the canonical origin.
- **Auto ads code is integrated in the production build, not yet live.** It is inserted into the shared `<head>` of all 103 public HTML pages; branch/deploy previews remain ad-free.
- `netlify.toml` configures the pinned Netlify CSP nonce plugin, and the existing CSP now includes the Google domains needed for Auto ads and Privacy & Messaging. After the deploy, check the Netlify build log for the plugin and inspect the browser console for CSP violations. Google recommends strict nonce-based CSP for AdSense because its script domains can change. [AdSense CSP guide](https://support.google.com/adsense/answer/16283098?hl=en)
- The current privacy page includes an AdSense disclosure and the Google CMP is selected; check that the public page and the active consent message are correct before submitting the site.
- After you push and the production site is publicly reachable, verify `/ads.txt` returns `google.com, pub-5783924977074679, DIRECT, f08c47fec0942fa0`, then complete AdSense's ownership verification and request review. Site approval and ad serving are not guaranteed.

## Your next steps after pushing

1. Let Netlify's production build finish; confirm the log says Auto ads loader added and `ads.txt` generated.
2. Open `https://corpus-anatomy-atlas.netlify.app/ads.txt` and confirm the publisher line.
3. In the AdSense Home screen shown in your screenshot, click **Let's go** under **Connect your site to AdSense**. Choose code-snippet verification—the code is already in the production `<head>`—then **Verify** and **Request review**. Do not paste a second copy.
4. The overview currently shows one active European-regulations message. The separate “Untitled” editor has a Publish button; publish it only if it is the intended message, to avoid an accidental duplicate.

Already received: production URL, publisher/client IDs, Auto ads snippet, and Google CMP selection. Manual slot IDs are not needed for Auto ads. No deployment or Git push has been made by me; you control your GitHub and AdSense accounts.
