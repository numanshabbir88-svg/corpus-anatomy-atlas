#!/usr/bin/env python3
"""Build the 5,000-record server-side Atlas Q&A brain.

The generated module is bundled with the Netlify Function and is never copied
into static website pages. Candidate facts come only from the reviewed local
Atlas data; this structural builder does not claim expert medical validation.
"""
from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'bot-knowledge.json'
OUT = ROOT / 'netlify' / 'functions' / 'atlas-qa-brain.mjs'
TARGET_COUNT = 5000
MAX_ANSWER_CHARS = 300
MIN_FACT_TOKENS_FOR_FAQ_OVERLAP = 7
LEAD_MARKER = re.compile(r'^(?:Functionally|Structurally|Physiologically|Clinically|Anatomically),\s*', re.I)


def text(value: object) -> str:
    return re.sub(r'\s+', ' ', str(value or '')).strip()


def normalized(value: object) -> str:
    value = unicodedata.normalize('NFKD', str(value or '')).encode('ascii', 'ignore').decode('ascii')
    return ' '.join(re.findall(r'[a-z0-9]+', value.lower()))


def normalize_question(value: str) -> str:
    return normalized(value)


def slugify(value: object) -> str:
    return '-'.join(normalized(value).split()) or 'topic'


def concise_source_fact(value: object) -> str:
    """Remove only a leading editorial label; never cut a source fact mid-sentence."""
    return LEAD_MARKER.sub('', text(value)).strip()


def local_image(path: object) -> str | None:
    value = text(path)
    if not re.fullmatch(r'img/(?:webp|medium|thumb)/[A-Za-z0-9_.-]+', value):
        return None
    if not (ROOT / value).is_file():
        return None
    return '/' + value


def hot_coords(value: object) -> list[int] | None:
    if not isinstance(value, list) or len(value) < 2:
        return None
    try:
        coords = [int(value[0]), int(value[1])]
    except (TypeError, ValueError):
        return None
    return coords if all(0 <= coord <= 1000 for coord in coords) else None


def topic_specific_images(parts: list[dict]) -> set[tuple[str, tuple[int, int]]]:
    """Only allow a local image when its pinpoint identifies one named topic.

    Shared region-level pins (for example every bone on one skeleton plate) do
    not qualify; those answers receive the internal Atlas link without an image.
    """
    names_by_pin: dict[tuple[str, tuple[int, int]], set[str]] = defaultdict(set)
    for item in parts:
        image = local_image(item.get('img'))
        coords = hot_coords(item.get('hot'))
        name = normalized(item.get('n'))
        if image and coords and name:
            names_by_pin[(image, tuple(coords))].add(name)
    return {pin for pin, names in names_by_pin.items() if len(names) == 1}


def source_part_key(item: dict) -> tuple[str, str, str, str]:
    return tuple(normalized(item.get(field)) for field in ('n', 'd', 'f', 'c'))  # type: ignore[return-value]


def canonical_parts(parts: list[dict]) -> list[dict]:
    """Collapse exact repeated structure records, preferring the primary entry."""
    chosen: dict[tuple[str, str, str, str], dict] = {}

    def preference(item: dict) -> tuple[int, int, str, str]:
        part_id = text(item.get('id'))
        is_context = part_id.startswith('ctx_')
        has_pin = bool(hot_coords(item.get('hot')) and local_image(item.get('img')))
        return (1 if is_context else 0, 0 if has_pin else 1, text(item.get('ck')), part_id)

    for item in parts:
        key = source_part_key(item)
        prior = chosen.get(key)
        if prior is None or preference(item) < preference(prior):
            chosen[key] = item
    return sorted(chosen.values(), key=lambda item: (text(item.get('ck')), text(item.get('id')), text(item.get('n'))))


def faq_fact_overlap(fact: str, faq_answers: list[str]) -> bool:
    """Return true only for an exact, substantial source-fact overlap with an FAQ."""
    fact_norm = normalized(fact)
    fact_tokens = fact_norm.split()
    if not fact_norm:
        return False
    padded_fact = ' ' + fact_norm + ' '
    for faq in faq_answers:
        faq_norm = normalized(faq)
        if fact_norm == faq_norm:
            return True
        if len(fact_tokens) >= MIN_FACT_TOKENS_FOR_FAQ_OVERLAP and padded_fact in (' ' + faq_norm + ' '):
            return True
    return False


def exact_part_image(item: dict, allowed_pins: set[tuple[str, tuple[int, int]]], topic: str) -> tuple[str | None, list[int] | None]:
    image = local_image(item.get('img'))
    coords = hot_coords(item.get('hot'))
    if not image or not coords or (image, tuple(coords)) not in allowed_pins:
        return None, None
    # The pin is already unique to a single normalized topic. Keep a final name
    # sanity check so a bad source coordinate never leaks a broad image.
    if not normalized(topic):
        return None, None
    return image, coords


def make_record(
    *, kind: str, question: str, answer: str, topic: str, aliases: list[str],
    atlas_url: str, source_id: str, image_path: str | None = None,
    hot: list[int] | None = None, fact_key: str | None = None,
    source_fact: str | None = None,
) -> dict | None:
    question = text(question)
    answer = text(answer)
    topic = text(topic)
    if not question or not answer or not topic or not atlas_url.startswith('/learn/'):
        return None
    if len(answer) > MAX_ANSWER_CHARS:
        return None
    if image_path and (not image_path.startswith(('/img/webp/', '/img/medium/', '/img/thumb/')) or not hot):
        return None
    return {
        'kind': kind,
        'question': question,
        'answer': answer,
        'topic': topic,
        'aliases': [text(alias) for alias in aliases if text(alias)],
        'atlasUrl': atlas_url,
        'imagePath': image_path,
        'hot': hot,
        'sourceId': source_id,
        '_factKey': fact_key or normalized(answer),
        '_sourceFact': text(source_fact) if source_fact is not None else '',
    }


def best_display_names(rows: list[dict], field_name: str = 'n', group_field: str = 'ct') -> dict[int, str]:
    counts = Counter(text(row.get(field_name)).casefold() for row in rows)
    return {
        id(row): f"{text(row.get(field_name))} ({text(row.get(group_field))})" if counts[text(row.get(field_name)).casefold()] > 1 else text(row.get(field_name))
        for row in rows
    }


def source_part_candidates(
    parts: list[dict], faqs: list[dict], allowed_pins: set[tuple[str, tuple[int, int]]],
) -> dict[str, list[dict]]:
    display_names = best_display_names(parts)
    faq_answers = [text(item.get('a')) for item in faqs]
    results: dict[str, list[dict]] = {'definition': [], 'function': [], 'clinical': []}
    seen_fact_by_kind: dict[str, set[str]] = defaultdict(set)
    seen_question_by_kind: dict[str, set[str]] = defaultdict(set)
    seen_ids: set[str] = set()

    labels = {'definition': 'definition', 'function': 'function', 'clinical': 'clinical note'}
    field_names = {'definition': 'd', 'function': 'f', 'clinical': 'c'}
    for item in parts:
        name = text(item.get('n'))
        chapter = text(item.get('ct'))
        if not name or not chapter:
            continue
        display = display_names[id(item)]
        slug = text(item.get('slug')) or text(item.get('ck'))
        part_id = text(item.get('id'))
        if not slug:
            continue
        atlas_url = f'/learn/{slug}/#part-{part_id}' if part_id else f'/learn/{slug}/'
        aliases = [name, text(item.get('l')), text(item.get('t')), chapter]
        image, hot = exact_part_image(item, allowed_pins, name)

        for kind, field in field_names.items():
            raw = concise_source_fact(item.get(field))
            fact_norm = normalized(raw)
            if not raw or not fact_norm or faq_fact_overlap(raw, faq_answers):
                continue
            # Repeated exact fields on different records represent the same source
            # fact; keep one canonical record rather than padding with rewordings.
            if fact_norm in seen_fact_by_kind[kind]:
                continue
            label = labels[kind]
            answer = f'{display} — {label}: {raw}'
            question = {
                'definition': f'What is {display}?',
                'function': f'What does {display} do?',
                'clinical': f'What is the clinical significance of {display}?',
            }[kind]
            question_norm = normalize_question(question)
            if question_norm in seen_question_by_kind[kind]:
                continue
            source_id = f"part:{item.get('ck')}:{part_id}:{kind}"
            if source_id in seen_ids:
                continue
            record = make_record(
                kind=kind,
                question=question,
                answer=answer,
                topic=name,
                aliases=aliases,
                atlas_url=atlas_url,
                source_id=source_id,
                image_path=image,
                hot=hot,
                fact_key=f'part:{kind}:{fact_norm}',
                source_fact=raw,
            )
            if record:
                results[kind].append(record)
                seen_fact_by_kind[kind].add(fact_norm)
                seen_question_by_kind[kind].add(question_norm)
                seen_ids.add(source_id)
    return results


def muscle_candidates(source: dict) -> list[dict]:
    rows = source.get('muscles', [])
    display_names = best_display_names(rows, field_name='n', group_field='g')
    field_specs = [
        ('a', 'muscle_action', 'Action', 'What action does {topic} perform?'),
        ('loc', 'muscle_location', 'Location', 'Where is {topic} located?'),
        ('o', 'muscle_origin', 'Origin', 'Where does {topic} originate?'),
        ('i', 'muscle_insertion', 'Insertion', 'Where does {topic} insert?'),
        ('nv', 'muscle_innervation', 'Nerve supply', 'Which nerve supplies {topic}?'),
    ]
    results: list[dict] = []
    seen_ids: set[str] = set()
    for index, item in enumerate(rows):
        name = text(item.get('n'))
        group = text(item.get('g'))
        if not name:
            continue
        display = display_names[id(item)]
        source_slug = slugify(name)
        for field, kind, label, template in field_specs:
            raw = concise_source_fact(item.get(field))
            if not raw:
                continue
            source_id = f'muscle:{kind}:{source_slug}'
            if source_id in seen_ids:
                source_id += f':{index}'
            answer = f'{display} — {label}: {raw}'
            record = make_record(
                kind=kind,
                question=template.format(topic=display),
                answer=answer,
                topic=name,
                aliases=[name, group],
                atlas_url='/learn/muscular-system-anatomy/',
                source_id=source_id,
                # The available muscle plates use regional, shared hotspots rather
                # than an individual-muscle pinpoint; return the link without art.
                image_path=None,
                hot=None,
                # Identical field text across different muscles is a repeated
                # fact, not a new record; filter_unique keeps only the first.
                fact_key=f'muscle:{kind}:{normalized(raw)}',
                source_fact=raw,
            )
            if record:
                results.append(record)
                seen_ids.add(source_id)
    return results


def tendon_candidates(source: dict) -> list[dict]:
    results: list[dict] = []
    seen_ids: set[str] = set()
    for index, item in enumerate(source.get('tendons', [])):
        name = text(item.get('n'))
        if not name:
            continue
        slug = slugify(name)
        for field, kind, label, question in (
            ('at', 'tendon_attachment', 'Attachment', f'Where does {name} attach?'),
            ('a', 'tendon_function', 'Function', f'What does {name} do?'),
        ):
            raw = concise_source_fact(item.get(field))
            if not raw:
                continue
            source_id = f'tendon:{kind}:{slug}'
            if source_id in seen_ids:
                source_id += f':{index}'
            record = make_record(
                kind=kind,
                question=question,
                answer=f'{name} — {label}: {raw}',
                topic=name,
                aliases=[name],
                atlas_url='/learn/muscular-system-anatomy/',
                source_id=source_id,
                # Tendon illustrations are regional references without a reviewed
                # tendon-specific pinpoint, so only the internal Atlas link is used.
                image_path=None,
                hot=None,
                fact_key=f'tendon:{kind}:{normalized(raw)}',
                source_fact=raw,
            )
            if record:
                results.append(record)
                seen_ids.add(source_id)
    return results


def bone_plural_answer(name: str, count: int) -> str:
    key = name.casefold()
    special = {
        'ribs': f'There are {count} ribs in the adult skeleton, arranged in 12 pairs.',
        'metacarpals': f'There are {count} metacarpals, five in each hand.',
        'metatarsals': f'There are {count} metatarsals, five in each foot.',
        'phalanges (hand)': f'There are {count} hand phalanges, 14 in each hand.',
        'phalanges (foot)': f'There are {count} foot phalanges, 14 in each foot.',
        'cervical vertebrae': f'There are {count} cervical vertebrae.',
        'thoracic vertebrae': f'There are {count} thoracic vertebrae.',
        'lumbar vertebrae': f'There are {count} lumbar vertebrae.',
        'malleus': 'There are two mallei, one in each middle ear.',
        'incus': 'There are two incudes, one in each middle ear.',
        'stapes': 'There are two stapes, one in each middle ear.',
        'hip bone': 'There are two hip bones, one on each side of the pelvis.',
        'femur': 'There are two femora, one in each lower limb.',
        'patella': 'There are two patellae, one in each knee.',
        'scaphoid': 'There are two scaphoid bones, one in each wrist.',
        'lunate': 'There are two lunate bones, one in each wrist.',
        'triquetrum': 'There are two triquetral bones, one in each wrist.',
        'pisiform': 'There are two pisiform bones, one in each wrist.',
        'trapezium': 'There are two trapezium bones, one in each wrist.',
        'trapezoid': 'There are two trapezoid bones, one in each wrist.',
        'capitate': 'There are two capitate bones, one in each wrist.',
        'hamate': 'There are two hamate bones, one in each wrist.',
        'talus': 'There are two tali, one in each foot.',
        'calcaneus': 'There are two calcanei, one in each foot.',
        'navicular': 'There are two navicular bones, one in each foot.',
        'cuboid': 'There are two cuboid bones, one in each foot.',
        'medial cuneiform': 'There are two medial cuneiform bones, one in each foot.',
        'intermediate cuneiform': 'There are two intermediate cuneiform bones, one in each foot.',
        'lateral cuneiform': 'There are two lateral cuneiform bones, one in each foot.',
        'clavicle': 'There are two clavicles, one on each side of the chest.',
        'scapula': 'There are two scapulae, one on each side of the upper back.',
        'humerus': 'There are two humeri, one in each upper limb.',
        'radius': 'There are two radii, one in each forearm.',
        'ulna': 'There are two ulnae, one in each forearm.',
        'tibia': 'There are two tibiae, one in each leg.',
        'fibula': 'There are two fibulae, one in each leg.',
        'maxilla': 'There are two maxillae, one on each side of the upper jaw.',
        'zygomatic': 'There are two zygomatic bones, one on each side of the face.',
        'nasal': 'There are two nasal bones, one on each side of the bridge of the nose.',
        'lacrimal': 'There are two lacrimal bones, one in each medial orbit.',
        'palatine': 'There are two palatine bones, one on each side of the hard palate.',
        'inferior nasal concha': 'There are two inferior nasal conchae, one in each nasal cavity.',
        'parietal': 'There are two parietal bones, one on each side of the skull.',
        'temporal': 'There are two temporal bones, one on each side of the skull.',
    }
    if key in special:
        return special[key]
    if count == 1:
        return f'There is one {name.lower()} bone in the adult skeleton.'
    return f'There are {count} {name.lower()} bones in the adult skeleton.'


def bone_candidates(source: dict) -> list[dict]:
    results: list[dict] = []
    for index, item in enumerate(source.get('bones', [])):
        name = text(item.get('n'))
        group = text(item.get('g'))
        try:
            count = int(item.get('cnt', 0))
        except (TypeError, ValueError):
            continue
        if not name or count < 1:
            continue
        is_skull = group.lower().startswith('skull')
        page = '/learn/skull-and-facial-bones/' if is_skull else '/learn/human-skeleton-anatomy/'
        question = f'What is the adult count for {name}?' if count != 1 else f'How many {name} bones are in the adult skeleton?'
        answer = bone_plural_answer(name, count)
        results.append({
            'kind': 'bone_count',
            'question': question,
            'answer': answer,
            'topic': name,
            'aliases': [name, group],
            'atlasUrl': page,
            'imagePath': None,
            'hot': None,
            'sourceId': f'bone-count:{slugify(name)}:{index}',
            '_factKey': f'bone:{normalize_question(name)}:{count}:{normalize_question(group)}',
            '_sourceFact': answer,
        })
    return results


def filter_unique(
    candidates: list[dict], faq_questions: set[str], initial_questions: set[str] | None = None,
    faq_answers: list[str] | None = None,
) -> list[dict]:
    used_questions = set(initial_questions or ())
    used_answers: set[str] = set()
    used_sources: set[str] = set()
    used_fact_keys: set[str] = set()
    kept: list[dict] = []
    for item in candidates:
        q_norm = normalize_question(item['question'])
        a_norm = normalize_question(item['answer'])
        fact_key = str(item.get('_factKey') or a_norm)
        source_fact = text(item.get('_sourceFact'))
        if faq_answers and source_fact and faq_fact_overlap(source_fact, faq_answers):
            continue
        if not q_norm or not a_norm or q_norm in faq_questions or q_norm in used_questions:
            continue
        if a_norm in used_answers or item['sourceId'] in used_sources or fact_key in used_fact_keys:
            continue
        item['question'] = text(item['question'])
        item['answer'] = text(item['answer'])
        item.pop('_factKey', None)
        item.pop('_sourceFact', None)
        kept.append(item)
        used_questions.add(q_norm)
        used_answers.add(a_norm)
        used_sources.add(item['sourceId'])
        used_fact_keys.add(fact_key)
    return kept


def clinical_priority(item: dict) -> tuple[int, int, str]:
    answer_len = len(text(item.get('answer')))
    # Prefer a compact, complete source note over very terse or overlong prose.
    if 70 <= answer_len <= 220:
        band = 0
    elif 50 <= answer_len <= 250:
        band = 1
    else:
        band = 2
    return (band, abs(answer_len - 145), str(item.get('sourceId', '')))


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding='utf-8'))
    faqs = [item for item in source.get('faqs', []) if isinstance(item, dict)]
    faq_questions = {normalize_question(text(item.get('q'))) for item in faqs}
    faq_answers = [text(item.get('a')) for item in faqs]

    source_parts = source.get('parts', [])
    parts = canonical_parts(source_parts)
    approved_pins = topic_specific_images(parts)
    by_kind = source_part_candidates(parts, faqs, approved_pins)

    base: list[dict] = []
    for kind in ('definition', 'function'):
        base.extend(by_kind[kind])
    base.extend(muscle_candidates(source))
    base.extend(tendon_candidates(source))
    base.extend(bone_candidates(source))
    clinical = sorted(by_kind['clinical'], key=clinical_priority)

    # The 5,000-item brain preserves the complete unique definitions/functions
    # and the separate muscle/tendon/bone facts, then fills with concise clinical
    # notes from the same Atlas source records.
    if len(base) > TARGET_COUNT:
        raise SystemExit(f'Non-clinical core exceeds {TARGET_COUNT}: {len(base)}')
    selected = filter_unique(base, faq_questions, faq_answers=faq_answers)
    core_dropped = len(base) - len(selected)

    need = TARGET_COUNT - len(selected)
    selected_sources = {item['sourceId'] for item in selected}
    selected_questions = {normalize_question(item['question']) for item in selected}
    clinical = [item for item in clinical if item['sourceId'] not in selected_sources]
    clinical = filter_unique(clinical, faq_questions, selected_questions, faq_answers)
    if len(clinical) < need:
        raise SystemExit(f'Not enough distinct concise clinical facts: need {need}, found {len(clinical)}')
    selected.extend(clinical[:need])
    if len(selected) != TARGET_COUNT:
        raise SystemExit(f'Expected exactly {TARGET_COUNT}, got {len(selected)}')

    # Final validation: source IDs, questions, answers, internal links, local
    # topic-specific images and answer length are all checked before serialization.
    question_norms = [normalize_question(item['question']) for item in selected]
    answer_norms = [normalize_question(item['answer']) for item in selected]
    source_ids = [item['sourceId'] for item in selected]
    if len(set(question_norms)) != TARGET_COUNT:
        raise SystemExit('Generated questions are not unique')
    if len(set(answer_norms)) != TARGET_COUNT:
        raise SystemExit('Generated answer strings are not unique')
    if len(set(source_ids)) != TARGET_COUNT:
        raise SystemExit('Generated source IDs are not unique')
    if any(question in faq_questions for question in question_norms):
        raise SystemExit('Generated questions overlap the existing curated FAQ questions')
    for item in selected:
        if not item.get('answer') or len(item['answer']) > MAX_ANSWER_CHARS:
            raise SystemExit(f'Invalid or overlong answer in {item.get("sourceId")}')
        if not str(item.get('atlasUrl') or '').startswith('/learn/'):
            raise SystemExit(f'Q&A record lacks an internal Atlas link: {item.get("sourceId")}')
        if item.get('imagePath'):
            image = str(item['imagePath'])
            coords = item.get('hot')
            if not image.startswith(('/img/webp/', '/img/medium/', '/img/thumb/')) or not isinstance(coords, list) or len(coords) != 2:
                raise SystemExit(f'Image lacks a valid local topic pinpoint: {item.get("sourceId")}')
            if any(not isinstance(coord, int) or not 0 <= coord <= 1000 for coord in coords):
                raise SystemExit(f'Invalid pinpoint coordinates in {item.get("sourceId")}')

    OUT.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(selected, ensure_ascii=False, separators=(',', ':'))
    OUT.write_text(
        '// Generated by build_ai_knowledge.py from bot-knowledge.json.\n'
        '// This module is bundled with the Netlify Function and is not copied into /site.\n'
        'export const ATLAS_QA = Object.freeze(' + serialized + ');\n',
        encoding='utf-8',
    )
    counts = Counter(item['kind'] for item in selected)
    distinct_part_rows = len(parts)
    print(f'Generated {len(selected)} server-side Q&A records at {OUT.relative_to(ROOT)}')
    print('Kind counts:', ', '.join(f'{kind}={count}' for kind, count in sorted(counts.items())))
    print(f'FAQs kept separate: {len(faqs)}; exact duplicate part rows collapsed: {len(source_parts) - distinct_part_rows}; repeated-fact, FAQ-overlap or question-collision core candidates omitted: {core_dropped}')
    print('Images: only local plates with a pinpoint unique to one named source structure; otherwise internal Atlas links only.')
    print(f'All answers <= {MAX_ANSWER_CHARS} characters; zero duplicate normalized question/answer strings; static site output unchanged.')


if __name__ == '__main__':
    main()
