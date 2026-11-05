# Anatomy Atlas FAQ review audit

## Structural results

- Curated FAQ records: **370**.
- Normalized unique questions: **370/370**.
- Normalized unique exact answers: **370/370**.
- Answer lengths: **63–247 characters**; **9** are at most 75 characters and **14** exceed 220 characters.
- Longest: `Where are the main organs in the male body?` (247 characters). Shortest: `What is the function of the deep penile arteries?` (63 characters).
- Answers beginning with the editorial filler “Functionally”: **0**.
- All answers are non-empty and at most 300 characters; the source cleanup script now also enforces normalized question and answer uniqueness.

## Editorial pass

The source pass rewrote mismatched or awkward questions, replaced fragment-like and overlong answers with concise topic-specific text, removed repeated source-field tails, corrected the sperm-outflow sequence through straight tubules into the rete testis, and separated closely related prompts (for example, hepatic blood flow versus bile-duct location, and testis organization versus interstitial-cell function). The current similarity scan produced the pairs below; each has an explicit distinction recorded.

This is an editorial consistency pass over local Atlas content. It is **not** a qualified anatomical peer review or a claim of independently verified clinical accuracy.

## Similarity triage

The scanner flags answer token overlap at Jaccard ≥ 0.30 or containment ≥ 0.70. Similarity is not proof of duplication; the reviewer checks whether the answers request or supply the same fact.

| Similarity (Jaccard / containment) | Questions | Distinction |
|---:|---|---|
| 0.67 / 0.80 | `What is the anterior cruciate ligament?` / `Where is the posterior cruciate ligament located?` | Distinct ligaments with different femoral and tibial attachments; the lexical overlap reflects paired knee structures. |
| 0.36 / 0.56 | `Which male structures need a deeper view than the body map?` / `Which female structures need a deeper pelvic or breast view?` | Intentional parallel overview-scope questions; the male and female examples name different regional structures. |
| 0.35 / 0.60 | `How does blood flow through a hepatic lobule?` / `What is the function of the central vein?` | Complementary: one traces sinusoidal flow; the other defines the central vein as the lobule’s drainage point. |
| 0.35 / 0.53 | `When does the first stage of labor begin and end?` / `When does the second stage of labor start and finish?` | Sequential stages with distinct boundaries: progressive cervical change to full dilation, then full dilation to birth. |
| 0.33 / 0.55 | `How does blood flow through a hepatic lobule?` / `Where is the interlobular bile duct located?` | Complementary blood and biliary anatomy: sinusoidal blood flow versus the location of bile ducts in portal tracts. |
| 0.33 / 0.54 | `When does the second stage of labor start and finish?` / `When does the third stage of labor begin and end?` | Sequential stages with distinct boundaries: birth ends stage two; placental delivery ends stage three. |
| 0.32 / 0.50 | `Where are the ovaries located on the female body map?` / `Which organs are located in the female pelvis?` | One answer locates the ovaries on a body map; the other inventories pelvic contents. The overlapping terms are not the same requested fact. |
| 0.31 / 0.50 | `Where is the brain shown on the male body map?` / `Where are the lungs in the male body map?` | Different structures in different body regions; the common wording refers to separate map locations. |

## Scope caveat

No deployment occurred. The locally generated `bot-knowledge.json` and `site/` are built from the edited FAQ chapter sources. The final anatomy content still merits review by a qualified anatomy educator before publication.
