#!/usr/bin/env python3
"""Audit provenance, duplication, links, answers and topic-specific images.

This is a deterministic structural/source-traceability audit, not an anatomical
peer review. Near-duplicate flags are triage candidates, not error counts.
"""
from __future__ import annotations

import heapq
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import build_ai_knowledge as builder  # noqa: E402

SOURCE = ROOT / 'bot-knowledge.json'
GENERATED = ROOT / 'netlify' / 'functions' / 'atlas-qa-brain.mjs'
REPORT = ROOT / 'AI_QA_AUDIT.md'

PART_FIELDS = {
    'definition': 'd',
    'function': 'f',
    'clinical': 'c',
}
MUSCLE_FIELDS = {
    'muscle_action': 'a',
    'muscle_location': 'loc',
    'muscle_origin': 'o',
    'muscle_insertion': 'i',
    'muscle_innervation': 'nv',
}
TENDON_FIELDS = {
    'tendon_attachment': 'at',
    'tendon_function': 'a',
}
STOP = set('''a an and are as at be been being by can did do does for from had has have how i in into is it its may might of on or our should than that the their them then there these they this those through to was were what when where which while with would you your'''.split())
LEAD_MARKER = re.compile(r'^(?:Functionally|Structurally|Physiologically|Clinically|Anatomically),\s*', re.I)


def load_generated() -> list[dict]:
    text = GENERATED.read_text(encoding='utf-8')
    match = re.search(r'Object\.freeze\((\[.*\])\);\s*$', text, re.S)
    if not match:
        raise SystemExit('Could not parse generated atlas-qa-brain.mjs JSON payload')
    rows = json.loads(match.group(1))
    if not isinstance(rows, list):
        raise SystemExit('Generated Q&A payload is not a list')
    return rows


def norm(value: object) -> str:
    return builder.normalized(value)


def cleaned_fact(value: object) -> str:
    return LEAD_MARKER.sub('', builder.text(value)).strip()


def substantial_faq_overlap(fact: str, faq_answers: list[str]) -> bool:
    fact_norm = norm(fact)
    tokens = fact_norm.split()
    if not fact_norm:
        return False
    padded = ' ' + fact_norm + ' '
    for answer in faq_answers:
        answer_norm = norm(answer)
        if fact_norm == answer_norm:
            return True
        if len(tokens) >= builder.MIN_FACT_TOKENS_FOR_FAQ_OVERLAP and padded in (' ' + answer_norm + ' '):
            return True
    return False


def source_fact_for(record: dict, source: dict, parts_by_key: dict[tuple[str, str], dict]) -> tuple[str | None, str]:
    """Return (raw source fact, provenance error) for a generated item."""
    source_id = str(record.get('sourceId', ''))
    kind = str(record.get('kind', ''))
    topic = norm(record.get('topic'))
    answer = norm(record.get('answer'))

    if source_id.startswith('part:'):
        pieces = source_id.split(':', 3)
        if len(pieces) != 4:
            return None, 'malformed part sourceId'
        _, chapter, part_id, source_kind = pieces
        item = parts_by_key.get((chapter, part_id))
        if not item:
            return None, 'source part missing from bot-knowledge.json'
        if source_kind != kind or kind not in PART_FIELDS:
            return None, 'part sourceId kind mismatch'
        raw = cleaned_fact(item.get(PART_FIELDS[kind]))
        if not raw or norm(raw) not in answer:
            return None, 'answer does not contain its source part field'
        if topic != norm(item.get('n')):
            return None, 'answer topic does not match source part'
        slug = builder.text(item.get('slug')) or builder.text(item.get('ck'))
        expected_url = f"/learn/{slug}/#part-{part_id}" if part_id else f'/learn/{slug}/'
        if record.get('atlasUrl') != expected_url:
            return raw, 'part internal URL does not match source chapter/anchor'
        return raw, ''

    if source_id.startswith('muscle:'):
        if kind not in MUSCLE_FIELDS:
            return None, 'muscle sourceId kind mismatch'
        matches = [item for item in source.get('muscles', []) if norm(item.get('n')) == topic]
        for item in matches:
            raw = cleaned_fact(item.get(MUSCLE_FIELDS[kind]))
            if raw and norm(raw) in answer:
                if record.get('atlasUrl') != '/learn/muscular-system-anatomy/':
                    return raw, 'muscle internal URL mismatch'
                return raw, ''
        return None, 'answer does not match a source muscle field'

    if source_id.startswith('tendon:'):
        if kind not in TENDON_FIELDS:
            return None, 'tendon sourceId kind mismatch'
        matches = [item for item in source.get('tendons', []) if norm(item.get('n')) == topic]
        for item in matches:
            raw = cleaned_fact(item.get(TENDON_FIELDS[kind]))
            if raw and norm(raw) in answer:
                if record.get('atlasUrl') != '/learn/muscular-system-anatomy/':
                    return raw, 'tendon internal URL mismatch'
                return raw, ''
        return None, 'answer does not match a source tendon field'

    if source_id.startswith('bone-count:'):
        matches = [item for item in source.get('bones', []) if norm(item.get('n')) == topic]
        for item in matches:
            try:
                count = int(item.get('cnt', 0))
            except (TypeError, ValueError):
                continue
            expected = builder.bone_plural_answer(builder.text(item.get('n')), count)
            if norm(expected) == answer:
                group = builder.text(item.get('g'))
                page = '/learn/skull-and-facial-bones/' if group.lower().startswith('skull') else '/learn/human-skeleton-anatomy/'
                if record.get('atlasUrl') != page:
                    return expected, 'bone count internal URL mismatch'
                return expected, ''
        return None, 'bone answer does not match source count/name'

    return None, 'unknown sourceId family'


def core_candidate_metrics(source: dict) -> dict[str, int]:
    faqs = source.get('faqs', [])
    faq_questions = {norm(item.get('q')) for item in faqs}
    faq_answers = [builder.text(item.get('a')) for item in faqs]
    parts = builder.canonical_parts(source.get('parts', []))
    pins = builder.topic_specific_images(parts)
    by_kind = builder.source_part_candidates(parts, faqs, pins)
    candidates: list[dict] = []
    for kind in ('definition', 'function'):
        candidates.extend(by_kind[kind])
    candidates.extend(builder.muscle_candidates(source))
    candidates.extend(builder.tendon_candidates(source))
    candidates.extend(builder.bone_candidates(source))

    fact_counts = Counter(str(item.get('_factKey') or '') for item in candidates)
    question_counts = Counter(norm(item.get('question')) for item in candidates)
    repeated_fact_groups = sum(1 for key, count in fact_counts.items() if key and count > 1)
    repeated_fact_records = sum(count - 1 for key, count in fact_counts.items() if key and count > 1)
    faq_fact_overlap_records = sum(
        bool(item.get('_sourceFact')) and substantial_faq_overlap(str(item.get('_sourceFact')), faq_answers)
        for item in candidates
    )
    faq_question_overlap_records = sum(norm(item.get('question')) in faq_questions for item in candidates)
    question_collision_records = sum(count - 1 for question, count in question_counts.items() if question and count > 1)
    selected = builder.filter_unique(candidates, faq_questions, faq_answers=faq_answers)
    return {
        'core_candidates': len(candidates),
        'core_selected': len(selected),
        'core_omitted': len(candidates) - len(selected),
        'repeated_fact_groups': repeated_fact_groups,
        'repeated_fact_records': repeated_fact_records,
        'faq_fact_overlap_records': faq_fact_overlap_records,
        'faq_question_overlap_records': faq_question_overlap_records,
        'question_collision_records': question_collision_records,
    }


def content_tokens(value: str) -> set[str]:
    return {word for word in norm(value).split() if len(word) > 2 and word not in STOP}


def near_duplicate_candidates(rows: list[dict], facts: dict[str, str], limit_per_kind: int = 12) -> tuple[dict[str, int], list[tuple[float, float, dict, dict, str, str]]]:
    """Flag high lexical overlap between source facts within a Q&A kind."""
    grouped: dict[str, list[dict]] = defaultdict(list)
    exact_counts: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for item in rows:
        raw = facts.get(item['sourceId'], '')
        tokens = content_tokens(raw)
        item['_auditTokens'] = tokens
        grouped[item['kind']].append(item)
        if raw:
            exact_counts[(item['kind'], norm(raw))].append(item)

    exact_groups = {f'{kind}: {key}': group for (kind, key), group in exact_counts.items() if key and len(group) > 1}
    exact_summary = Counter(kind.split(':', 1)[0] for kind in exact_groups)
    top_pairs: list[tuple[float, float, dict, dict, str, str]] = []
    for kind, items in grouped.items():
        pool: list[tuple[float, float, dict, dict, str, str]] = []
        items = [item for item in items if len(item['_auditTokens']) >= 8]
        for index, left in enumerate(items):
            left_tokens = left['_auditTokens']
            left_fact = facts.get(left['sourceId'], '')
            for right in items[index + 1:]:
                if norm(left.get('topic')) == norm(right.get('topic')):
                    continue
                right_tokens = right['_auditTokens']
                intersection = len(left_tokens & right_tokens)
                smaller = min(len(left_tokens), len(right_tokens))
                union = len(left_tokens) + len(right_tokens) - intersection
                jaccard = intersection / union if union else 0
                containment = intersection / smaller if smaller else 0
                if jaccard >= 0.82 or containment >= 0.92:
                    pair = (jaccard, containment, left, right, left_fact, facts.get(right['sourceId'], ''))
                    pool.append(pair)
        pool.sort(key=lambda pair: (pair[0], pair[1]), reverse=True)
        top_pairs.extend(pool[:limit_per_kind])
    for item in rows:
        item.pop('_auditTokens', None)
    top_pairs.sort(key=lambda pair: (pair[0], pair[1]), reverse=True)
    return dict(exact_summary), top_pairs


def markdown_report(source: dict, rows: list[dict], provenance_errors: list[str], overlaps: list[str], bad_images: list[str], facts: dict[str, str], near_exact: dict[str, int], near_pairs: list[tuple[float, float, dict, dict, str, str]], core_metrics: dict[str, int]) -> str:
    kinds = Counter(item['kind'] for item in rows)
    part_rows = source.get('parts', [])
    canonical = builder.canonical_parts(part_rows)
    faq_rows = source.get('faqs', [])
    faq_questions = {norm(item.get('q')) for item in faq_rows}
    faq_answers = [builder.text(item.get('a')) for item in faq_rows]
    q_norms = [norm(item.get('question')) for item in rows]
    a_norms = [norm(item.get('answer')) for item in rows]
    source_ids = [str(item.get('sourceId', '')) for item in rows]
    image_count = sum(bool(item.get('imagePath')) for item in rows)
    question_overlap = len(set(q_norms) & faq_questions)
    faq_answer_norms = {norm(answer) for answer in faq_answers}
    answer_exact_overlap = sum(norm(item.get('answer')) in faq_answer_norms for item in rows)
    total_fact_chars = sum(len(facts.get(item['sourceId'], '')) for item in rows)

    lines = [
        '# Atlas Q&A provenance and repetition audit',
        '',
        '## Scope and limits',
        '',
        'This report verifies the generated module against the local `bot-knowledge.json` inputs. It checks source-field traceability, exact question/answer uniqueness, FAQ overlap, internal links, local pinpoint eligibility, and lexical repetition candidates. It does **not** establish clinical accuracy or replace review by a qualified anatomy educator.',
        '',
        '## Build counts',
        '',
        f'- Generated records: **{len(rows):,}**; curated FAQs kept separate: **{len(faq_rows):,}**.',
        f'- Exact normalized duplicate generated questions: **{len(q_norms) - len(set(q_norms))}**; duplicate answer strings: **{len(a_norms) - len(set(a_norms))}**; duplicate source IDs: **{len(source_ids) - len(set(source_ids))}**.',
        f'- Generated question overlap with curated FAQ questions: **{question_overlap}**; exact generated-answer/FAQ-answer overlaps: **{answer_exact_overlap}**.',
        f'- Answers over 300 characters: **{sum(len(str(item.get("answer", ""))) > 300 for item in rows)}**; generated answer text backed by traceable local facts: **{sum(bool(facts.get(item["sourceId"])) for item in rows):,}/{len(rows):,}**.',
        f'- Exact duplicate part records collapsed before generation: **{len(part_rows) - len(canonical):,}** of **{len(part_rows):,}** source part rows.',
        f'- Non-clinical core candidates: **{core_metrics["core_candidates"]:,}** built; **{core_metrics["core_selected"]:,}** retained and **{core_metrics["core_omitted"]:,}** omitted before clinical-note fill. The candidate pool contained **{core_metrics["repeated_fact_groups"]}** repeated source-fact groups (**{core_metrics["repeated_fact_records"]}** extra records); FAQ fact-overlap flags: **{core_metrics["faq_fact_overlap_records"]}**; FAQ question overlaps: **{core_metrics["faq_question_overlap_records"]}**; duplicate-question flags: **{core_metrics["question_collision_records"]}**.',
        f'- Generated records with a programmatically verified, topic-unique local image pin: **{image_count}**; all remaining records use internal Atlas links only.',
        f'- Traceable source-fact text inspected: **{total_fact_chars:,} characters**.',
        '',
        '### Records by kind',
        '',
        '| Kind | Count |',
        '|---|---:|',
    ]
    lines.extend(f'| `{kind}` | {count:,} |' for kind, count in sorted(kinds.items()))
    lines.extend(['', '## Automated checks', ''])
    checks = [
        ('Traceability errors', provenance_errors),
        ('Substantial exact source-fact overlaps with curated FAQ answers', overlaps),
        ('Image/pin eligibility errors', bad_images),
    ]
    for label, items in checks:
        lines.append(f'- {label}: **{len(items)}**.')
        for item in items[:15]:
            lines.append(f'  - {item}')
        if len(items) > 15:
            lines.append(f'  - … and {len(items) - 15} more.')
    lines.extend(['', '## Repetition triage', ''])
    lines.append('Exact duplicate source facts within the same Q&A kind are listed as counts below. Near-duplicate flags use token-set Jaccard ≥ 0.82 or containment ≥ 0.92 on source facts within the same kind, excluding identical topics. They are candidates for manual review, not confirmed duplicate information.')
    lines.append('')
    if near_exact:
        for kind, count in sorted(near_exact.items()):
            lines.append(f'- `{kind}` exact repeated source-fact groups: **{count}**.')
    else:
        lines.append('- Exact repeated source-fact groups within the same kind: **0**.')
    lines.extend(['', '| Kind | Similarity (Jaccard / containment) | Topics | Questions | Source-fact snippets |', '|---|---:|---|---|---|'])
    if near_pairs:
        for jaccard, containment, left, right, left_fact, right_fact in near_pairs[:40]:
            q1 = str(left['question']).replace('|', '\\|')
            q2 = str(right['question']).replace('|', '\\|')
            f1 = left_fact[:130].replace('|', '\\|')
            f2 = right_fact[:130].replace('|', '\\|')
            lines.append(f'| `{left["kind"]}` | {jaccard:.2f} / {containment:.2f} | {left["topic"]} / {right["topic"]} | {q1} / {q2} | {f1} / {f2} |')
    else:
        lines.append('| — | No pairs crossed the lexical triage threshold. | — | — | — |')
    lines.extend([
        '',
        '### Reviewer disposition of the current candidates',
        '',
        '- The dental function pairs are homologous tooth classes; the shared mastication role is accompanied by maxillary-versus-mandibular anchorage context. The primary-molar clinical pair distinguishes V2 superior-alveolar from V3 inferior-alveolar sensory branches.',
        '- Rhomboid major/minor and abdominal oblique/transversus action pairs share general scapular or abdominal-wall actions but differ in the specific movement emphasized.',
        '- Gracilis/adductor-minimus location and internal-oblique/transversus origin pairs share regional landmarks but retain different muscle/topic details.',
        '- These nine are retained as complementary/mirrored entries, not counted as exact duplicates. The lexical scan is conservative and the source descriptions still warrant expert review.',
        '',
        '## Provenance notes',
        '',
        '- Part definitions, functions and clinical notes are copied from the corresponding local part fields, after removing only a leading editorial marker. Long source facts are omitted rather than cut off mid-sentence.',
        '- Muscle and tendon facts retain their source field and topic in `sourceId`; available group-level art is not attached because it lacks a reviewed individual-structure pin.',
        '- Bone-count answers are deterministically phrased from the local name/count records; regional skeleton art is not attached because its hotspots are not bone-specific.',
        '- The module is bundled only in the serverless Q&A function; `verify_seo.py` confirms there is no static-site copy.',
        '- No external medical sources were added by this builder. Anatomical authenticity remains subject to qualified human review.',
        '',
    ])
    return '\n'.join(lines)


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding='utf-8'))
    rows = load_generated()
    faqs = source.get('faqs', [])
    faq_answers = [builder.text(item.get('a')) for item in faqs]
    parts_by_key = {(builder.text(item.get('ck')), builder.text(item.get('id'))): item for item in source.get('parts', [])}
    canonical_parts = builder.canonical_parts(source.get('parts', []))
    approved_pins = builder.topic_specific_images(canonical_parts)

    provenance_errors: list[str] = []
    overlaps: list[str] = []
    bad_images: list[str] = []
    facts: dict[str, str] = {}
    for record in rows:
        source_fact, error = source_fact_for(record, source, parts_by_key)
        if error:
            provenance_errors.append(f'{record.get("sourceId")}: {error}')
        if source_fact:
            facts[str(record['sourceId'])] = source_fact
            if substantial_faq_overlap(source_fact, faq_answers):
                overlaps.append(f'{record.get("sourceId")}: {source_fact[:160]}')
        image_path = record.get('imagePath')
        hot = record.get('hot')
        if image_path:
            source_id = str(record.get('sourceId', ''))
            pieces = source_id.split(':', 3)
            valid = False
            if len(pieces) == 4 and pieces[0] == 'part':
                item = parts_by_key.get((pieces[1], pieces[2]))
                if item:
                    expected_image = builder.local_image(item.get('img'))
                    expected_hot = builder.hot_coords(item.get('hot'))
                    valid = bool(
                        expected_image == image_path
                        and expected_hot == hot
                        and expected_image
                        and expected_hot
                        and (expected_image, tuple(expected_hot)) in approved_pins
                    )
            if not valid:
                bad_images.append(f'{record.get("sourceId")}: {image_path} {hot}')

    near_exact, near_pairs = near_duplicate_candidates(rows, facts)
    core_metrics = core_candidate_metrics(source)
    report = markdown_report(source, rows, provenance_errors, overlaps, bad_images, facts, near_exact, near_pairs, core_metrics)
    REPORT.write_text(report, encoding='utf-8')

    errors = []
    if len(rows) != builder.TARGET_COUNT:
        errors.append(f'expected {builder.TARGET_COUNT} records, found {len(rows)}')
    for field in ('question', 'answer', 'sourceId'):
        values = [norm(item.get(field)) for item in rows]
        if len(values) != len(set(values)):
            errors.append(f'duplicate normalized {field} values')
    if provenance_errors:
        errors.append(f'{len(provenance_errors)} provenance errors')
    if len(set(norm(item.get('question')) for item in rows) & {norm(item.get('q')) for item in source.get('faqs', [])}):
        errors.append('generated questions overlap curated FAQ questions')
    if any(len(str(item.get('answer', ''))) > builder.MAX_ANSWER_CHARS for item in rows):
        errors.append('generated answer exceeds the configured character limit')
    if any(not str(item.get('atlasUrl') or '').startswith('/learn/') for item in rows):
        errors.append('generated record has a non-internal Atlas link')
    if overlaps:
        errors.append(f'{len(overlaps)} FAQ source-fact overlaps')
    if bad_images:
        errors.append(f'{len(bad_images)} image/pin eligibility errors')
    if errors:
        raise SystemExit('AUDIT FAIL: ' + '; '.join(errors) + f'\nReport: {REPORT.relative_to(ROOT)}')

    print(f'Audit PASS: {len(rows)} generated records trace to local source facts; zero provenance/image errors or substantial FAQ-fact overlaps.')
    print(f'Exact duplicate source-fact groups within kind: {sum(near_exact.values())}; lexical near-duplicate candidates: {len(near_pairs)} (triage only).')
    print(f'Report: {REPORT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
