# Atlas assistant: local Q&A brain and external-search status

## Implemented in this source tree

- AdSense Auto ads are **wired into the production build but not deployed**. The production generator inserts the supplied `ca-pub-5783924977074679` loader in public HTML and emits `ads.txt` for `pub-5783924977074679`; previews remain ad-free. Netlify's CSP nonce plugin is pinned/configured. The owner selected Google CMP; the AdSense overview shows one active European-regulations message, with a separate “Untitled” editor draft to check. See `ADSENSE_SETUP_CHECKLIST.md` for the owner's post-push connect/review steps. No account credentials or payment documents should be shared.
- `build_ai_knowledge.py` builds **exactly 5,000 new Atlas-grounded Q&A records**, separate from the existing **370 curated FAQs**.
- The build output is `netlify/functions/atlas-qa-brain.mjs`. It is imported by the Netlify Function and is **not copied into the static `site/` output**. Netlify's build command regenerates it before the SEO/site build.
- Current record distribution: 1,354 definitions, 1,394 structure-function answers, 1,234 concise clinical notes, 234 muscle actions, 91 muscle locations, 217 muscle origins, 214 muscle insertions, 146 muscle innervations, 54 bone counts, 31 tendon attachments, and 31 tendon functions. Exact repeated fact strings within each kind are deduplicated before selection; all 5,000 records trace to local source fields/counts, but they have not each been independently reviewed by an anatomy expert.
- Retrieval order is explicitly **5,000-item server-side Atlas Q&A first, then the existing website Atlas knowledge including the 370 curated FAQs**, then the optional external-search branch. A local image is attached only when the asset exists and the source hotspot is unique to one named structure; this is a programmatic specificity check, not expert review. If no eligible pinpoint exists, the answer uses its internal Atlas topic link without art; it does not substitute generated anatomy art.
- `AI_QA_AUDIT.md` records the provenance/repetition audit: 5,000/5,000 traced records; the 4,341-item non-clinical candidate pool had 210 repeated source-fact groups (574 extra records) and one duplicate-question collision filtered out; the selected set has no exact repeated source facts within a kind, no substantial contiguous source-fact overlap with curated FAQ answers, and 9 lexical near-duplicate candidates dispositioned as complementary/mirrored anatomy rather than confirmed errors.
- The function has a no-key local mode. On an unmatched question, it returns a non-guessing response and, when a topic is reasonably related, an internal Atlas link. It does not send that question to Google or another external search service in the current configuration.
- Function tests cover 5,000 unique generated questions/answers/source IDs, FAQ separation, local retrieval with a topic-specific Atlas pin, routing for muscle/tendon/bone/anatomy intents, no-key out-of-set behavior, same-origin restriction, response cleanup, and rate limiting.

## Current limitations and user requirements still open

### External information / keyless crawling

External web search is **not currently implemented or verified**. No `GROQ_API_KEY`, `.env` file, or `gsk_` credential was found, and no keys were changed. The previous Groq Browser Search code remains an optional candidate path only; there has been no live provider call, and it does not satisfy a request for Google specifically.

The Google Custom Search JSON API is not an available new-customer solution and is scheduled for discontinuation on 2027-01-01. Directly scraping Google result pages is not being used. A practical no-key alternative would be a scheduled crawler over an explicitly approved allowlist of authoritative public sites, respecting each site's terms and crawl rules; that would be a maintained snapshot, not arbitrary live Google search. Otherwise, an approved search provider and a server-side credential are needed for live broad web search. User-facing answers should continue to hide external source names/links and show only relevant internal Atlas links.

### Accuracy, endpoints, and costs

- The requested **roughly 95% correctness** goal is not measured or promised. The 5,000 records are Atlas-derived but generated from source fields, and both retrieval coverage and factual quality need review. A correct retrieval score is not the same thing as medical/anatomical correctness.
- The existing `ai-fallback-benchmark.json` has 30 human-scored cases for the optional external answer path. `scripts/run-ai-fallback-benchmark.mjs` collects results from a deployed function; it does not calculate correctness automatically. No provider-backed benchmark run has occurred.
- Distribution across **4–5 independent model/API endpoints** is not implemented. No provider has been selected, and there is no verified free public-traffic quota or 4–5 endpoint capacity. Do not rotate accounts or keys to evade limits.
- The local function's in-memory per-IP limit is best-effort, per instance, and is not a durable global quota or cost-control system.

## Request flow

1. Handle greetings/conversation locally.
2. Send the anatomy question to `/.netlify/functions/ai-fallback` on the same site in Q&A-only mode. This searches the bundled 5,000-record server-side brain first; that file is not part of the static website output.
3. If the 5,000-item brain has no sufficiently strong match, search the existing client-side Atlas knowledge next, including the 370 curated FAQs and the site's other structured anatomy content.
4. If both Atlas layers miss, the function may use its optional external-search branch only when an owner-managed provider credential is deliberately configured. No provider is configured now, so no external search request is made and the assistant does not guess.
5. A local hit returns the Atlas answer and internal topic URL. A reviewed local image is included only with source hotspot coordinates that pinpoint the related structure; otherwise the answer uses text context and the internal Atlas topic link.
6. If a provider is deliberately enabled in the future, external source names/links must remain hidden in the widget; only relevant internal Atlas links may be shown. The server may retain only the documented audit metadata.

## Build and verification

Netlify build command:

```sh
python3 build_seo.py && python3 build_ai_knowledge.py && python3 verify_seo.py
```

`build_seo.py` runs first because the generator reads the resulting `bot-knowledge.json`. The FAQ correction/review pass is maintained separately and should be run on source edits before the rebuild.

Local checks:

```sh
python3 scripts/recheck_atlas_faqs.py
python3 build_seo.py
python3 build_ai_knowledge.py
python3 scripts/audit_ai_knowledge.py
node --check netlify/functions/ai-fallback.mjs
node --check netlify/functions/atlas-qa-brain.mjs
node --test tests/ai-fallback.test.mjs
python3 verify_seo.py
```

The generated Q&A brain must remain under `netlify/functions/`; do not copy it into `site/` or a browser-loaded JavaScript bundle. The repository itself is public, so committing the generated module to that public repository would still make the data repository-visible even though it is absent from the static website output.

## Before enabling public external search

- Decide between an approved search provider (with owner-managed server credentials) and a scheduled allowlisted crawler. Do not scrape Google SERPs or imply that keyless Google search is already available.
- Confirm provider terms, eligibility, quotas, costs, logging, privacy disclosures, and a spend/traffic cap.
- Implement and test the requested 4–5 endpoint router only after providers and legitimate quotas are selected. Do not use extra accounts or keys to evade provider limits.
- Run the 30-case benchmark plus a reviewed sample of the local Q&A set. Report sample size, retrieval success, factual score, and safety failures separately. Do not claim 95% unless a sufficiently designed review supports it.
- Validate that external answers include no source names/URLs, local answers include only internal Atlas links, and unavailable images are never replaced by generated or hotlinked anatomy art.
