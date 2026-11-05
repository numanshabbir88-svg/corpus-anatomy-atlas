#!/usr/bin/env python3
"""Check the curated FAQ output and document reviewed overlap candidates."""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE = ROOT / 'bot-knowledge.json'
REPORT = ROOT / 'FAQ_REVIEW_AUDIT.md'

STOP = set('the a an and or to in of on at by with for from is are was were be this that it as into through after before around about then so can not no most same one two three'.split())
# Human disposition for each pair surfaced by the current high-level lexical scan.
DISPOSITION = {
    frozenset(('What is the anterior cruciate ligament?', 'Where is the posterior cruciate ligament located?')):
        'Distinct ligaments with different femoral and tibial attachments; the lexical overlap reflects paired knee structures.',
    frozenset(('Which male structures need a deeper view than the body map?', 'Which female structures need a deeper pelvic or breast view?')):
        'Intentional parallel overview-scope questions; the male and female examples name different regional structures.',
    frozenset(('How does blood flow through a hepatic lobule?', 'What is the function of the central vein?')):
        'Complementary: one traces sinusoidal flow; the other defines the central vein as the lobule’s drainage point.',
    frozenset(('When does the first stage of labor begin and end?', 'When does the second stage of labor start and finish?')):
        'Sequential stages with distinct boundaries: progressive cervical change to full dilation, then full dilation to birth.',
    frozenset(('How does blood flow through a hepatic lobule?', 'Where is the interlobular bile duct located?')):
        'Complementary blood and biliary anatomy: sinusoidal blood flow versus the location of bile ducts in portal tracts.',
    frozenset(('When does the second stage of labor start and finish?', 'When does the third stage of labor begin and end?')):
        'Sequential stages with distinct boundaries: birth ends stage two; placental delivery ends stage three.',
    frozenset(('Where are the ovaries located on the female body map?', 'Which organs are located in the female pelvis?')):
        'One answer locates the ovaries on a body map; the other inventories pelvic contents. The overlapping terms are not the same requested fact.',
    frozenset(('Where is the brain shown on the male body map?', 'Where are the lungs in the male body map?')):
        'Different structures in different body regions; the common wording refers to separate map locations.',
}


def norm(value: object) -> str:
    value = unicodedata.normalize('NFKD', str(value or '')).encode('ascii', 'ignore').decode('ascii')
    return ' '.join(re.findall(r'[a-z0-9]+', value.lower()))


def tokens(value: object) -> set[str]:
    return {word for word in norm(value).split() if len(word) > 2 and word not in STOP}


def main() -> None:
    data = json.loads(KNOWLEDGE.read_text(encoding='utf-8'))
    faqs = data.get('faqs', [])
    q_norm = [norm(item.get('q')) for item in faqs]
    a_norm = [norm(item.get('a')) for item in faqs]
    answers = [str(item.get('a') or '') for item in faqs]

    if len(faqs) != 370:
        raise SystemExit(f'Expected 370 FAQs; found {len(faqs)}')
    if len(set(q_norm)) != len(faqs):
        raise SystemExit('FAQ questions are not normalized-unique')
    if len(set(a_norm)) != len(faqs):
        raise SystemExit('FAQ answer strings are not normalized-unique')
    if any(not answer for answer in answers):
        raise SystemExit('FAQ has an empty answer')
    if any(len(answer) > 300 for answer in answers):
        raise SystemExit('FAQ answer exceeds 300 characters')

    pairs = []
    for index, left in enumerate(faqs):
        left_tokens = tokens(left.get('a'))
        for right in faqs[index + 1:]:
            right_tokens = tokens(right.get('a'))
            if len(left_tokens) < 8 or len(right_tokens) < 8:
                continue
            intersection = len(left_tokens & right_tokens)
            jaccard = intersection / len(left_tokens | right_tokens)
            containment = intersection / min(len(left_tokens), len(right_tokens))
            if jaccard >= 0.30 or containment >= 0.70:
                key = frozenset((str(left.get('q')), str(right.get('q'))))
                pairs.append((jaccard, containment, left, right, DISPOSITION.get(key, 'NEEDS MANUAL REVIEW')))
    pairs.sort(key=lambda pair: (pair[0], pair[1]), reverse=True)

    unknown = [pair for pair in pairs if pair[4] == 'NEEDS MANUAL REVIEW']
    if unknown:
        print('Unreviewed FAQ similarity candidates:')
        for _, _, left, right, _ in unknown:
            print(f'- {left.get("q")} <> {right.get("q")}')

    max_item = max(faqs, key=lambda item: len(str(item.get('a') or '')))
    min_item = min(faqs, key=lambda item: len(str(item.get('a') or '')))
    functionally = sum(str(item.get('a') or '').startswith('Functionally') for item in faqs)
    lines = [
        '# Anatomy Atlas FAQ review audit',
        '',
        '## Structural results',
        '',
        f'- Curated FAQ records: **{len(faqs)}**.',
        f'- Normalized unique questions: **{len(set(q_norm))}/{len(faqs)}**.',
        f'- Normalized unique exact answers: **{len(set(a_norm))}/{len(faqs)}**.',
        f'- Answer lengths: **{min(map(len, answers))}–{max(map(len, answers))} characters**; **{sum(len(answer) <= 75 for answer in answers)}** are at most 75 characters and **{sum(len(answer) > 220 for answer in answers)}** exceed 220 characters.',
        f'- Longest: `{max_item.get("q")}` ({len(str(max_item.get("a") or ""))} characters). Shortest: `{min_item.get("q")}` ({len(str(min_item.get("a") or ""))} characters).',
        f'- Answers beginning with the editorial filler “Functionally”: **{functionally}**.',
        '- All answers are non-empty and at most 300 characters; the source cleanup script now also enforces normalized question and answer uniqueness.',
        '',
        '## Editorial pass',
        '',
        'The source pass rewrote mismatched or awkward questions, replaced fragment-like and overlong answers with concise topic-specific text, removed repeated source-field tails, corrected the sperm-outflow sequence through straight tubules into the rete testis, and separated closely related prompts (for example, hepatic blood flow versus bile-duct location, and testis organization versus interstitial-cell function). The current similarity scan produced the pairs below; each has an explicit distinction recorded.',
        '',
        'This is an editorial consistency pass over local Atlas content. It is **not** a qualified anatomical peer review or a claim of independently verified clinical accuracy.',
        '',
        '## Similarity triage',
        '',
        'The scanner flags answer token overlap at Jaccard ≥ 0.30 or containment ≥ 0.70. Similarity is not proof of duplication; the reviewer checks whether the answers request or supply the same fact.',
        '',
        '| Similarity (Jaccard / containment) | Questions | Distinction |',
        '|---:|---|---|',
    ]
    for jaccard, containment, left, right, disposition in pairs:
        q1 = str(left.get('q')).replace('|', '\\|')
        q2 = str(right.get('q')).replace('|', '\\|')
        lines.append(f'| {jaccard:.2f} / {containment:.2f} | `{q1}` / `{q2}` | {disposition} |')
    if not pairs:
        lines.append('| — | No pairs crossed the lexical threshold. | — |')
    lines.extend([
        '',
        '## Scope caveat',
        '',
        'No deployment occurred. The locally generated `bot-knowledge.json` and `site/` are built from the edited FAQ chapter sources. The final anatomy content still merits review by a qualified anatomy educator before publication.',
        '',
    ])
    REPORT.write_text('\n'.join(lines), encoding='utf-8')
    if unknown:
        raise SystemExit(f'{len(unknown)} similarity candidates need manual review; see {REPORT.relative_to(ROOT)}')
    print(f'FAQ audit PASS: {len(faqs)} unique question/answer pairs; {len(pairs)} similarity candidates dispositioned; no >300-character or empty answers.')
    print(f'Report: {REPORT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
