# Atlas Q&A provenance and repetition audit

## Scope and limits

This report verifies the generated module against the local `bot-knowledge.json` inputs. It checks source-field traceability, exact question/answer uniqueness, FAQ overlap, internal links, local pinpoint eligibility, and lexical repetition candidates. It does **not** establish clinical accuracy or replace review by a qualified anatomy educator.

## Build counts

- Generated records: **5,000**; curated FAQs kept separate: **370**.
- Exact normalized duplicate generated questions: **0**; duplicate answer strings: **0**; duplicate source IDs: **0**.
- Generated question overlap with curated FAQ questions: **0**; exact generated-answer/FAQ-answer overlaps: **0**.
- Answers over 300 characters: **0**; generated answer text backed by traceable local facts: **5,000/5,000**.
- Exact duplicate part records collapsed before generation: **143** of **1,586** source part rows.
- Non-clinical core candidates: **4,341** built; **3,766** retained and **575** omitted before clinical-note fill. The candidate pool contained **210** repeated source-fact groups (**574** extra records); FAQ fact-overlap flags: **0**; FAQ question overlaps: **0**; duplicate-question flags: **1**.
- Generated records with a programmatically verified, topic-unique local image pin: **3820**; all remaining records use internal Atlas links only.
- Traceable source-fact text inspected: **305,247 characters**.

### Records by kind

| Kind | Count |
|---|---:|
| `bone_count` | 54 |
| `clinical` | 1,234 |
| `definition` | 1,354 |
| `function` | 1,394 |
| `muscle_action` | 234 |
| `muscle_innervation` | 146 |
| `muscle_insertion` | 214 |
| `muscle_location` | 91 |
| `muscle_origin` | 217 |
| `tendon_attachment` | 31 |
| `tendon_function` | 31 |

## Automated checks

- Traceability errors: **0**.
- Substantial exact source-fact overlaps with curated FAQ answers: **0**.
- Image/pin eligibility errors: **0**.

## Repetition triage

Exact duplicate source facts within the same Q&A kind are listed as counts below. Near-duplicate flags use token-set Jaccard ≥ 0.82 or containment ≥ 0.92 on source facts within the same kind, excluding identical topics. They are candidates for manual review, not confirmed duplicate information.

- Exact repeated source-fact groups within the same kind: **0**.

| Kind | Similarity (Jaccard / containment) | Topics | Questions | Source-fact snippets |
|---|---:|---|---|---|
| `function` | 0.91 / 0.95 | Permanent maxillary right third molar · #1 / Permanent mandibular left third molar · #17 | What does Permanent maxillary right third molar · #1 do? / What does Permanent mandibular left third molar · #17 do? | Employs a broad multi-cusp occlusal table and multi-rooted anchorage to pulverize and grind food during mastication. Anchored with / Employs a broad multi-cusp occlusal table and multi-rooted anchorage to pulverize and grind food during mastication. Anchored with |
| `function` | 0.91 / 0.95 | Permanent maxillary right second premolar · #4 / Permanent mandibular left second premolar · #20 | What does Permanent maxillary right second premolar · #4 do? / What does Permanent mandibular left second premolar · #20 do? | Combines a piercing buccal cusp with a crushing occlusal table to tear and grind food between canines and molars. Anchored within  / Combines a piercing buccal cusp with a crushing occlusal table to tear and grind food between canines and molars. Anchored within  |
| `function` | 0.91 / 0.95 | Permanent maxillary right canine · #6 / Permanent mandibular left canine · #22 | What does Permanent maxillary right canine · #6 do? / What does Permanent mandibular left canine · #22 do? | Uses its prominent pointed cusp and deep single root to pierce, grip, and guide lateral mandibular excursions. Anchored within the / Uses its prominent pointed cusp and deep single root to pierce, grip, and guide lateral mandibular excursions. Anchored within the |
| `function` | 0.91 / 0.95 | Permanent maxillary right lateral incisor · #7 / Permanent mandibular left lateral incisor · #23 | What does Permanent maxillary right lateral incisor · #7 do? / What does Permanent mandibular left lateral incisor · #23 do? | Uses its wedge-shaped incisal edge to shear and incise food boluses during anterior biting. Anchored within the alveolar process o / Uses its wedge-shaped incisal edge to shear and incise food boluses during anterior biting. Anchored within the alveolar process o |
| `muscle_action` | 0.90 / 1.00 | Rhomboid major / Rhomboid minor | What action does Rhomboid major perform? / What action does Rhomboid minor perform? | retracts scapula and rotates it to depress glenoid cavity , fixes scapula to thoracic wall / retracts (adducts) scapula and rotates it to depress glenoid cavity , fixes scapula to thoracic wall |
| `clinical` | 0.88 / 0.94 | Primary maxillary right second molar · A / Primary mandibular left second molar · K | What is the clinical significance of Primary maxillary right second molar · A? / What is the clinical significance of Primary mandibular left second molar · K? | Pulpal sensory fibers travel via CN V2 superior alveolar branches; physiological root resorption precedes exfoliation and eruption / Pulpal sensory fibers travel via CN V3 inferior alveolar branches; physiological root resorption precedes exfoliation and eruption |
| `muscle_action` | 0.80 / 1.00 | External abdominal oblique / Transversus abdominis | What action does External abdominal oblique perform? / What action does Transversus abdominis perform? | flexes trunk to same side, rotates trunk to opposite side, expiration , compresses abdominal organs / rotates trunk to same side, compresses abdominal organs , expiration |
| `muscle_location` | 0.80 / 1.00 | Gracilis / Adductor minimus | Where is Gracilis located? / Where is Adductor minimus located? | Lower limb, Thigh/Hip, Medial compartment (adductor muscles) / Lower limb, Thigh/Hip, Medial compartment (adductor muscles), part of adductor magnus |
| `muscle_origin` | 0.60 / 1.00 | Internal abdominal oblique / Transversus abdominis | Where does Internal abdominal oblique originate? / Where does Transversus abdominis originate? | anterior two-thirds of iliac crest , iliopectineal arch , thoracolumbar fascia / internal surface of costal cartilage of ribs 7–12, thoracolumbar fascia , anterior two-thirds of iliac crest , iliopectineal arch |

### Reviewer disposition of the current candidates

- The dental function pairs are homologous tooth classes; the shared mastication role is accompanied by maxillary-versus-mandibular anchorage context. The primary-molar clinical pair distinguishes V2 superior-alveolar from V3 inferior-alveolar sensory branches.
- Rhomboid major/minor and abdominal oblique/transversus action pairs share general scapular or abdominal-wall actions but differ in the specific movement emphasized.
- Gracilis/adductor-minimus location and internal-oblique/transversus origin pairs share regional landmarks but retain different muscle/topic details.
- These nine are retained as complementary/mirrored entries, not counted as exact duplicates. The lexical scan is conservative and the source descriptions still warrant expert review.

## Provenance notes

- Part definitions, functions and clinical notes are copied from the corresponding local part fields, after removing only a leading editorial marker. Long source facts are omitted rather than cut off mid-sentence.
- Muscle and tendon facts retain their source field and topic in `sourceId`; available group-level art is not attached because it lacks a reviewed individual-structure pin.
- Bone-count answers are deterministically phrased from the local name/count records; regional skeleton art is not attached because its hotspots are not bone-specific.
- The module is bundled only in the serverless Q&A function; `verify_seo.py` confirms there is no static-site copy.
- No external medical sources were added by this builder. Anatomical authenticity remains subject to qualified human review.
