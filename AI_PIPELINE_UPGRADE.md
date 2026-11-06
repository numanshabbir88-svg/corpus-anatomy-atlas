# Corpus AI retrieval and question-understanding upgrade

## Audit findings

The assistant is a deferred browser widget (`bot-loader.js` → `corpus-bot.js`) backed by `bot-knowledge.json`, plus a same-origin Netlify function (`netlify/functions/ai-fallback.mjs`) and a build-generated, server-only 5,000-record Atlas Q&A corpus (`build_ai_knowledge.py`). The browser searches verified first-party Atlas records first (74 chapters, 1,586 documented parts, 370 FAQs, muscles, tendons, bones and curated references), then the generated Atlas Q&A service; only after both local layers miss can the optional web-grounded provider run.

The existing client search relied on stop-word stripping, a large synonym map, exact/prefix word checks and hand-weighted scores. It did not expose a distinct question-task classification, used only a single `LAST_TOPIC` reference, and several generic aliases in the server Q&A index could outscore the record's actual topic. There are no existing embeddings or vector-search service in this repository. The upgrade therefore adds a local BM25-style lexical signal and metadata reranking rather than introducing a vector database, paid service, or fabricated embeddings.

## Changes

- Expanded client intent parsing for definition, function, location, anatomy, comparison, process, classification, examples, relationship, clinical, broad/specific, multi-part and follow-up cues. Roman Urdu vocabulary remains supported through the existing synonym map and now shares plural normalization and more forgiving topic matching.
- Added one-edit typo tolerance for longer anatomy terms, conservative plural normalization, BM25-style term-frequency/IDF evidence over Atlas fields, and metadata reranking that favors chapter-level evidence for broad/system questions and exact named structures for specific lookups.
- Added a vessel comparison that is grounded in the existing Heart and Vascular System Atlas summaries. It explicitly notes pulmonary artery/vein oxygenation exceptions and links to both Atlas chapters.
- Resolved follow-up pronouns against the last Atlas result before asking the server or local index; a clearly named topic in the new question is left unchanged. Atlas Q&A, local Atlas records, curated records and external web research now have distinct on-screen provenance labels.
- Tightened server Q&A candidate selection: the primary record topic weighs more than generic aliases; unrelated query concepts must also be covered; unsupported comparison/classification questions and topic mismatches are declined instead of receiving a coincidental single-structure answer. Added plural handling, one-edit typo recovery, Roman Urdu anatomy synonyms and task-word intent handling.
- Kept external retrieval behind the existing optional provider and source audit path. No restricted reference material or new external content corpus was ingested.

## Retrieval flow and limitations

The runtime is now source-first: existing Atlas records are searched with synonym/typo normalization, BM25-style lexical evidence and metadata reranking; generated Atlas Q&A with topic-coverage and intent-aware ranking is the second tier, followed by optional web-grounded retrieval. It is not vector-semantic RAG: there are no pre-existing embeddings to reuse, and adding an embedding model/service would add unsupported infrastructure. There is no claim of calibrated probabilistic confidence; the UI calls its labels match strength, not medical certainty. When the curated brain cannot support a topic, its strict mode returns a miss so the browser can try the Atlas KB; if neither local layer nor the optional provider can verify an answer, it declines.

The implemented comparison path currently handles the vessel-class pair for which the Atlas provides direct comparative evidence. Broad muscle-category questions are routed away from single-muscle Q&A aliases so the client can answer from the muscular-system chapter. Other comparison pairs and additional Roman Urdu vocabulary should be added only with explicit evaluation cases and Atlas-supported evidence. Conversation state remains per-page-session and limited to the latest relevant Atlas topic.

## Verification

- `node --check corpus-bot.js`
- `node --check netlify/functions/ai-fallback.mjs`
- `python3 build_ai_knowledge.py` (generates the ignored server-only Q&A module)
- `npm test` — 18 tests pass, including typo recovery, Roman Urdu routing and refusal of a mismatched heart-chambers lookup.
