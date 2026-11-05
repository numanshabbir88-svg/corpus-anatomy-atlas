#!/usr/bin/env python3
"""Audit the built static site and its sitemap before publication.

Local builds intentionally have no sitemap and are noindex. Production builds
use the actual SITE_URL (or host-provided URL) for all canonical locations.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import json
import os
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent / 'site'
SEO_SLUGS = {p.stem: json.loads(p.read_text(encoding='utf-8')).get('slug', p.stem) for p in (Path(__file__).resolve().parent / 'seo' / 'chapters').glob('*.json')}
def S(k): return SEO_SLUGS.get(k, k)
# Netlify previews/branch builds stay noindex; only production receives canonicals and sitemap.
CONTEXT = os.environ.get('CONTEXT', '')
BASE = (os.environ.get('SITE_URL') or os.environ.get('URL') or os.environ.get('RENDER_EXTERNAL_URL') or '').rstrip('/') if CONTEXT in ('', 'production') else ''
PAGES = sorted(ROOT.rglob('*.html'))
ERRORS = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.title = ''
        self.in_title = False
        self.description = []
        self.canonical = []
        self.robots = []
        self.refs = []
        self.images = []
        self.previews = []
        self.part_count = 0
        self.context_statuses = 0
        self.context_preview_buttons = []
        self.qa_count = 0
        self.related = []
        self.ids = set()
        self.plate_visuals = 0
        self.plate_images = 0
        self.plate_svgs = 0
        self.plate_leaders = 0
        self.plate_callouts = 0
        self.plate_mobile_keys = 0
        self.in_plate_visual = False
        self.base_href = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'base' and a.get('href'):
            self.base_href = a['href']
        classes = a.get('class','').split()
        if tag == 'div' and 'plate-visual' in classes:
            self.plate_visuals += 1
            self.in_plate_visual = True
        if tag == 'img' and self.in_plate_visual: self.plate_images += 1
        if tag == 'svg' and 'plate-annotations' in classes: self.plate_svgs += 1
        if tag == 'path' and 'plate-leader' in classes: self.plate_leaders += 1
        if tag == 'span' and 'plate-callout' in classes: self.plate_callouts += 1
        if tag == 'ol' and 'plate-mobile-key' in classes: self.plate_mobile_keys += 1
        if tag == 'h1': self.h1 += 1
        if tag == 'section' and 'part' in a.get('class','').split(): self.part_count += 1
        if tag == 'span' and 'part-context-status' in classes: self.context_statuses += 1
        if tag == 'button' and 'data-plate-preview' in a:
            self.previews.append(a)
            if a.get('data-context-only') == 'true': self.context_preview_buttons.append(a)
        if tag == 'div' and 'qa-item' in a.get('class','').split(): self.qa_count += 1
        if tag == 'a' and 'related-card' in a.get('class','').split(): self.related.append(a.get('href',''))
        if tag == 'title': self.in_title = True
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'meta':
            if a.get('name') == 'description': self.description.append(a.get('content',''))
            if a.get('name') == 'robots': self.robots.append(a.get('content',''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href',''))
        if tag in ('a','link') and a.get('href'): self.refs.append(a['href'])
        if tag in ('img','script') and a.get('src'): self.refs.append(a['src'])
        if tag == 'img': self.images.append(a)
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'div' and self.in_plate_visual: self.in_plate_visual = False
    def handle_data(self, data):
        if self.in_title: self.title += data

def report(message): ERRORS.append(message)

VALID_SPA_CHAPTER_SLUGS = set(SEO_SLUGS.values())

def local_target(page, reference, base_href=''):
    parsed = urlparse(reference)
    if parsed.scheme or parsed.netloc or reference.startswith(('mailto:','tel:','data:')): return None
    path = unquote(parsed.path)
    if not path: return None
    if path.startswith('/') or base_href == '/':
        target = ROOT / path.lstrip('/')
    else:
        target = page.parent / path
    target = target.resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        report(f'{page.relative_to(ROOT)}: link outside output: {reference}')
        return None
    if path.endswith('/') or target.is_dir():
        target /= 'index.html'
    rel_parts = target.relative_to(ROOT.resolve()).parts
    if len(rel_parts) == 2 and rel_parts[0] in VALID_SPA_CHAPTER_SLUGS and rel_parts[1] == 'index.html':
        return ROOT / 'index.html'
    return target

BLOG_COUNT = len(list((Path(__file__).resolve().parent / 'seo' / 'blogs').glob('*.json')))
SPA_SECTION_COUNT = 9
EXPECTED_PAGES = 79 + SPA_SECTION_COUNT + 2 + BLOG_COUNT
EXPECTED_SITEMAP = 78 + SPA_SECTION_COUNT + 1 + BLOG_COUNT
if len(PAGES) != EXPECTED_PAGES: report(f'Expected {EXPECTED_PAGES} HTML files, found {len(PAGES)}')
seen_titles = set()
related_graph = {}
context_status_count = 0
for page in PAGES:
    parser = Page()
    parser.feed(page.read_text(encoding='utf-8'))
    context_status_count += parser.context_statuses
    name = str(page.relative_to(ROOT))
    if parser.h1 != 1: report(f'{name}: {parser.h1} h1 headings')
    if name.startswith('learn/') and name != 'learn/index.html':
        if parser.qa_count != 5: report(f'{name}: expected 5 visible question-answer blocks, got {parser.qa_count}')
        if parser.part_count < 20: report(f'{name}: expected at least 20 documented structures')
        if parser.plate_visuals != 1 or parser.plate_images != 1:
            report(f'{name}: main anatomy plate markup/image is missing or malformed')
        if parser.plate_callouts and (parser.plate_svgs != 1 or parser.plate_mobile_keys != 1):
            report(f'{name}: main anatomy plate overlay/key is missing or malformed')
        if parser.plate_leaders != parser.plate_callouts:
            report(f'{name}: leader-line/callout count mismatch ({parser.plate_leaders}/{parser.plate_callouts})')
        for button in parser.previews:
            located = button.get('data-preview-context') == 'false'
            has_point = button.get('data-point-x') is not None and button.get('data-point-y') is not None
            if located != has_point: report(f'{name}: mismatch between preview pointer and stated visibility for {button.get("data-part-name")}')
            if button.get('data-context-only') == 'true' and (not button.get('data-context-label') or not button.get('data-preview-note')):
                report(f'{name}: context-only preview lacks its explicit label/note for {button.get("data-part-name")}')
            if button.get('data-preview-kind') == 'scope':
                for attr in ('data-plate-src', 'data-overview-src'):
                    src = button.get(attr, '')
                    target = local_target(page, src) if src else None
                    if not target or not target.is_file():
                        report(f'{name}: missing organ-to-lens {attr} for {button.get("data-part-name")}')
                if (button.get('data-origin-x') is None) != (button.get('data-origin-y') is None):
                    report(f'{name}: incomplete representative sample region for {button.get("data-part-name")}')
                for attr in ('data-origin-x', 'data-origin-y', 'data-point-x', 'data-point-y'):
                    value = button.get(attr)
                    if value is not None:
                        try:
                            if not 0 <= float(value) <= 1000: raise ValueError()
                        except ValueError:
                            report(f'{name}: invalid anatomical illustration coordinate {attr}={value}')
        if not 3 <= len(parser.related) <= 4: report(f'{name}: expected 3–4 relevant chapter links, got {len(parser.related)}')
        related_graph[page.parent.name] = parser.related
    if not parser.title or parser.title in seen_titles: report(f'{name}: missing/duplicate title')
    if not 30 <= len(parser.title) <= 70: report(f'{name}: SEO title should be 30–70 chars, got {len(parser.title)} ({parser.title!r})')
    seen_titles.add(parser.title)
    if len(parser.description) != 1 or not parser.description[0]: report(f'{name}: missing/duplicate description')
    elif not 120 <= len(parser.description[0]) <= 160: report(f'{name}: meta description should be 120–160 chars, got {len(parser.description[0])} ({parser.description[0]!r})')
    for ref in parser.refs:
        target = local_target(page, ref, parser.base_href)
        if target is not None and not target.is_file(): report(f'{name}: broken local reference {ref}')
        if ref.startswith('#') and len(ref)>1 and ref[1:] not in parser.ids and not ref.startswith('#/'):
            report(f'{name}: missing local section {ref}')
    for image in parser.images:
        if not image.get('alt') or not image.get('width') or not image.get('height'):
            report(f'{name}: image lacks alt or reserved dimensions: {image.get("src")}')
    if name in ('404.html', 'blog-studio.html'):
        if 'noindex' not in ' '.join(parser.robots): report(f'{name} must be noindex')
        continue
    public_path = '/' if name == 'index.html' else '/' + name.replace('index.html','') if name.endswith('/index.html') else '/' + name
    if BASE:
        if parser.canonical != [BASE + public_path]: report(f'{name}: incorrect canonical {parser.canonical}')
        if any('noindex' in x for x in parser.robots): report(f'{name}: production page is noindex')
    elif 'noindex' not in ' '.join(parser.robots) or parser.canonical:
        report(f'{name}: preview should be noindex with no canonical')

if context_status_count != 0:
    report(f'Expected 0 context-only entries across all chapters, found {context_status_count}')

inbound = {Path(urlparse(link).path.rstrip('/')).name for links in related_graph.values() for link in links}
if set(related_graph) - inbound: report(f'Chapters without a related-article incoming link: {sorted(set(related_graph)-inbound)}')

robots = (ROOT / 'robots.txt').read_text() if (ROOT / 'robots.txt').exists() else ''
sitemap = ROOT / 'sitemap.xml'
if BASE:
    if not sitemap.is_file(): report('Production sitemap.xml missing')
    else:
        try:
            elements = ET.parse(sitemap).findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
            urls = [item.findtext('{http://www.sitemaps.org/schemas/sitemap/0.9}loc') for item in elements]
            if len(urls) != EXPECTED_SITEMAP or len(set(urls)) != EXPECTED_SITEMAP: report(f'Sitemap must contain {EXPECTED_SITEMAP} unique URLs, found {len(urls)}')
            for address in urls:
                if not address or not address.startswith(BASE + '/'): report(f'Sitemap URL has incorrect origin: {address}'); continue
                path = urlparse(address).path
                if not local_target(ROOT / 'index.html', path).is_file(): report(f'Sitemap URL has no page: {address}')
            expected = {BASE + '/' if p.name == 'index.html' and p.parent == ROOT else BASE + '/' + str(p.relative_to(ROOT)).replace('index.html','') if p.name == 'index.html' else BASE + '/' + str(p.relative_to(ROOT)) for p in PAGES if p.name not in ('404.html', 'blog-studio.html')}
            if set(urls) != expected: report('Sitemap does not match indexable pages')
        except ET.ParseError as exc: report(f'Sitemap XML invalid: {exc}')
    if f'Sitemap: {BASE}/sitemap.xml' not in robots: report('robots.txt sitemap directive missing')
else:
    if sitemap.exists(): report('Preview has a sitemap without a real public URL')
    if 'Sitemap:' in robots: report('Preview robots.txt has an invalid sitemap directive')

# Verify that the production-only AdSense integration is complete and never leaks into previews.
DEFAULT_PUBLISHER_ID = 'pub-5783924977074679'
PUBLISHER_ID = (os.environ.get('ADSENSE_PUBLISHER_ID') or DEFAULT_PUBLISHER_ID).strip() if CONTEXT in ('', 'production') else ''
ADSENSE_ENABLED = bool(PUBLISHER_ID and BASE and CONTEXT in ('', 'production'))
ADSENSE_TAG = f'adsbygoogle.js?client=ca-{PUBLISHER_ID}' if ADSENSE_ENABLED else ''
for page in PAGES:
    page_html = page.read_text(encoding='utf-8')
    is_nonpublic = page.name in ('404.html', 'blog-studio.html')
    has_adsense = 'adsbygoogle.js?client=' in page_html
    if ADSENSE_ENABLED and not is_nonpublic:
        head = re.search(r'<head\b[^>]*>(.*?)</head\s*>', page_html, flags=re.I|re.S)
        if not head or page_html.count('adsbygoogle.js?client=') != 1 or ADSENSE_TAG not in head.group(1):
            report(f'{page.relative_to(ROOT)}: production Auto ads loader missing, duplicated, or outside <head>')
    elif has_adsense:
        report(f'{page.relative_to(ROOT)}: AdSense loader must not appear on previews or nonpublic pages')
ads_txt = ROOT / 'ads.txt'
expected_ads_txt = f'google.com, {PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n'
if ADSENSE_ENABLED:
    if not ads_txt.is_file() or ads_txt.read_text(encoding='utf-8') != expected_ads_txt:
        report('Production ads.txt is missing or does not match the configured AdSense publisher ID')
elif ads_txt.exists():
    report('Preview/local build must not contain production ads.txt')

# Targeted regression checks: never replace a microscopic close-up with a gross lung plate,
# and never return the sagittal vaginal image to the external vulva chapter.
for slug in ('lungs','pulmonaryacinus'):
    path=ROOT/'learn'/S(slug)/'index.html'
    parser=Page();parser.feed(path.read_text(encoding='utf-8'))
    for cell in ('Type I pneumocyte','Type II pneumocyte','Alveolar macrophage'):
        matches=[b for b in parser.previews if b.get('data-part-name')==cell and b.get('class')=='reading-mini-trigger']
        if len(matches)!=1 or matches[0].get('data-preview-kind')!='scope' or not matches[0].get('data-plate-src','').endswith('/alveolar-cell-detail.webp') or matches[0].get('data-preview-context')!='false' or not matches[0].get('data-overview-src','').endswith('/'+('lungs' if slug=='lungs' else 'pulmonary-acinus')+'.webp'):
            report(f'{slug}: missing honest illustrated close-up and pointer for {cell}')
# All microscope links must point to shipped optimized assets and carry an honest organ reference.
PROJECT_ROOT = Path(__file__).resolve().parent
QA_BRAIN = PROJECT_ROOT / 'netlify' / 'functions' / 'atlas-qa-brain.mjs'
if not QA_BRAIN.is_file():
    report('Server-side Atlas Q&A brain is missing from netlify/functions')
if list(ROOT.rglob('atlas-qa-brain.mjs')):
    report('Server-side Atlas Q&A brain must not be copied into the static site output')
else:
    module_text = QA_BRAIN.read_text(encoding='utf-8') if QA_BRAIN.is_file() else ''
    module_match = re.search(r'export const ATLAS_QA = Object\.freeze\((\[.*\])\);\s*$', module_text, re.S)
    if not module_match:
        report('Could not parse the generated server-side Atlas Q&A module')
    else:
        try:
            qa_records = json.loads(module_match.group(1))
        except json.JSONDecodeError as exc:
            qa_records = []
            report(f'Generated Atlas Q&A JSON is invalid: {exc}')
        if len(qa_records) != 5000:
            report(f'Expected exactly 5,000 server-side Q&A records, found {len(qa_records)}')
        def qa_normalize(value):
            ascii_value = unicodedata.normalize('NFKD', str(value or '')).encode('ascii', 'ignore').decode('ascii').lower()
            return ' '.join(re.findall(r'[a-z0-9]+', ascii_value))
        question_norms = [qa_normalize(item.get('question')) for item in qa_records]
        source_ids = [item.get('sourceId') for item in qa_records]
        if len(set(question_norms)) != len(qa_records):
            report('Generated Atlas Q&A questions are not unique')
        if len(set(source_ids)) != len(qa_records):
            report('Generated Atlas Q&A source IDs are not unique')
        knowledge_path = PROJECT_ROOT / 'bot-knowledge.json'
        if knowledge_path.is_file():
            knowledge = json.loads(knowledge_path.read_text(encoding='utf-8'))
            faq_norms = {qa_normalize(item.get('q')) for item in knowledge.get('faqs', []) if isinstance(item, dict)}
            if any(question in faq_norms for question in question_norms):
                report('Generated 5,000 Q&A records overlap the existing curated FAQ questions')
        else:
            report('Existing Atlas FAQ source data is missing; cannot verify Q&A separation')
        verified_pages = {}
        for item in qa_records:
            answer_url = str(item.get('atlasUrl') or '')
            parsed_url = urlparse(answer_url)
            if parsed_url.scheme or parsed_url.netloc or not parsed_url.path.startswith('/learn/'):
                report(f'Q&A record has a non-internal Atlas URL: {answer_url}')
                continue
            target = local_target(ROOT / 'index.html', answer_url)
            if not target or not target.is_file():
                report(f'Q&A record links to a missing Atlas page: {answer_url}')
                continue
            page_key = str(target)
            if page_key not in verified_pages:
                verified_pages[page_key] = target.read_text(encoding='utf-8')
            if parsed_url.fragment and f'id="{unquote(parsed_url.fragment)}"' not in verified_pages[page_key]:
                report(f'Q&A record links to a missing Atlas section: {answer_url}')
            image_path = item.get('imagePath')
            if image_path:
                if not str(image_path).startswith(('/img/webp/', '/img/medium/', '/img/thumb/')):
                    report(f'Q&A record has a non-local image: {image_path}')
                elif not (PROJECT_ROOT / str(image_path).lstrip('/')).is_file():
                    report(f'Q&A record image is missing: {image_path}')
                coords = item.get('hot')
                if not isinstance(coords, list) or len(coords) != 2 or any(not isinstance(v, int) or v < 0 or v > 1000 for v in coords):
                    report(f'Q&A record image is missing valid pinpoint coordinates: {item.get("sourceId")}')

for slug in ('lungs','kidney','thyroid','pancreas','skin','breast','lymph','gynuterus','gynadnexa','maletestis'):
    page=(ROOT/'learn'/S(slug)/'index.html').read_text(encoding='utf-8')
    if 'id="under-the-lens"' not in page: report(f'{slug}: under-the-lens section missing')
    if 'data-preview-kind="scope"' not in page: report(f'{slug}: tissue-level previews missing')
# A distinct, accurately counted skull chapter must not add bones to the 206 atlas or
# falsely point at hidden palatine/vomer bones or the intratemporal CN VII foramen.
skull_parser=Page();skull_parser.feed((ROOT/'learn'/S('skullface')/'index.html').read_text(encoding='utf-8'))
if skull_parser.title != 'Skull and Facial Bones Anatomy: 22 Adult Bones | Corpus' or skull_parser.part_count != 30 or skull_parser.qa_count != 5:
    report('Skull guide: title, 30 substantive entries or five Q&A missing')
if not any(f'../{S("facialnerve")}/' in link for link in skull_parser.related):
    report('Skull guide: independent facial nerve chapter link missing')
for name in ('Right maxilla','Left maxilla','Right zygomatic bone','Left zygomatic bone','Right nasal bone','Left nasal bone','Mandible','Vomer','Right palatine bone','Left palatine bone','Right inferior nasal concha','Left inferior nasal concha','Frontal bone'):
    matches=[b for b in skull_parser.previews if b.get('data-part-name')==name]
    if len(matches)!=1: report(f'Skull guide: {name} is missing or duplicated')
    elif name in ('Vomer','Right palatine bone','Left palatine bone','Right inferior nasal concha','Left inferior nasal concha'):
        # Hidden bones may remain a contextual medial reference or receive a curated
        # pin on that exact second plate; neither may be presented as a front-view pin.
        medial=matches[0].get('data-plate-src','').endswith('/skull-face-medial.webp')
        context=matches[0].get('data-preview-context')
        has_point=matches[0].get('data-point-x') is not None and matches[0].get('data-point-y') is not None
        if not medial or (context=='false' and not has_point) or (context=='true' and has_point) or context not in ('true','false'):
            report(f'Skull guide: hidden bone {name} has an invalid medial-view pointer')
    elif matches[0].get('data-preview-context')!='false':
        report(f'Skull guide: obvious anterior bone {name} lacks its visible marker')
facial_parser=Page();facial_parser.feed((ROOT/'learn'/S('facialnerve')/'index.html').read_text(encoding='utf-8'))
for button in facial_parser.previews:
    if button.get('data-part-name')=='Stylomastoid foramen' and button.get('data-preview-context')!='false':
        report('Facial nerve: Stylomastoid foramen lacks its plate pointer')
# A complete dental positional chart, honest class imagery, and correct sensory pathways.
dental_parser=Page();dental_html=(ROOT/'learn'/S('dentition')/'index.html').read_text(encoding='utf-8');dental_parser.feed(dental_html)
if dental_parser.title != 'Tooth Anatomy Guide: 32 Permanent & 20 Primary | Corpus' or dental_parser.part_count!=76 or dental_parser.qa_count!=5:
    report('Dentition guide: title, 76 entries or five Q&A missing')
if len(re.findall(r'class="tooth-position"',dental_html))!=52:
    report('Dentition guide: expected 32 permanent and 20 primary chart positions')
for tooth,plate in [('Permanent maxillary right central incisor · #8','tooth-incisor.webp'),('Permanent mandibular right first molar · #30','tooth-molar-section.webp'),('Primary maxillary right second molar · A','tooth-molar-section.webp')]:
    matches=[b for b in dental_parser.previews if b.get('data-part-name')==tooth]
    if len(matches)!=1 or matches[0].get('data-preview-context')!='false' or not matches[0].get('data-plate-src','').endswith('/'+plate):
        report(f'Dentition guide: missing class image or pinpoint for {tooth}')
if not all(term in dental_html for term in ('Superior alveolar nerve branches (V2)','Inferior alveolar nerve (V3)','FDI 18','FDI 48')):
    report('Dentition guide: dental nerve or FDI orientation missing')
# The hub must expose every foundation guide and About must reflect the real guide count.
foundation_hub=(ROOT/'learn/index.html').read_text(encoding='utf-8')
if any(f'href="{S(slug)}/"' not in foundation_hub for slug in ('anatomicallanguage','bodyregions','tissuefoundations')):
    report('Study hub omitted a foundation guide')
if '<b>74</b> study chapters' not in (ROOT/'about.html').read_text(encoding='utf-8'):
    report('About chapter count is stale')
# Foundation batch: truthful plane references, patient-facing regions and micro-scale imagery.
for slug,n in [('anatomicallanguage',24),('bodyregions',28),('tissuefoundations',28)]:
    page=(ROOT/'learn'/S(slug)/'index.html').read_text(encoding='utf-8');probe=Page();probe.feed(page)
    if probe.part_count!=n or probe.qa_count!=5: report(f'{slug}: parts/Q&A coverage changed')
    if slug=='anatomicallanguage':
        visible={b.get('data-part-name') for b in probe.previews if b.get('data-preview-context')=='false'}
        if len(visible)!=24:report(f'Expected all 24 anatomical language entries to have visual pointers, found {len(visible)}')
    if slug=='bodyregions' and (len(re.findall(r'class="foundation-chart ',page))!=2 or len(re.findall(r'<a href="#part-[a-z]+"',page))<13):report('Patient-facing region maps are incomplete')
    if slug=='tissuefoundations':
        for name,asset in [('Mitochondria','foundation-cell-organelles.webp'),('Cardiac muscle','foundation-cardiac-muscle.webp'),('Smooth muscle','foundation-smooth-muscle.webp'),('Connective tissue','foundation-connective.webp')]:
            match=[b for b in probe.previews if b.get('data-part-name')==name]
            if len(match)!=1 or not match[0].get('data-plate-src','').endswith('/'+asset) or match[0].get('data-preview-context')!='false':report(f'{slug}: missing tissue cutaway pointer for {name}')
        if len(re.findall(r'class="reading-mini-trigger foundation-image"',page))!=4:report('Four-tissue illustrated study cards missing')
about=(ROOT/'about.html').read_text(encoding='utf-8')
if 'id="contact"' not in about or 'mailto:numanshabbir88@gmail.com' not in about:
    report('About us: public contact and corrections address missing')
if 'href="/about.html">About us</a>' not in (ROOT/'index.html').read_text(encoding='utf-8') and 'href="about.html">About us</a>' not in (ROOT/'index.html').read_text(encoding='utf-8'):
    report('Homepage: About us is not in the top navigation')
vulva_html=(ROOT/'learn'/S('gynvulva')/'index.html').read_text(encoding='utf-8')
if 'img/webp/vulva-surface-clean.webp' not in vulva_html or 'img/webp/gyn-vagina.webp' in vulva_html:
    report('Vulva: external surface image is missing or replaced by internal sagittal image')
if 'ctx_clitoralcomplex_' in vulva_html:
    report('Vulva: duplicate clitoral study entries returned')

if ERRORS:
    print('SEO audit FAIL (' + str(len(ERRORS)) + ' issues)')
    for error in ERRORS[:40]: print(' -', error)
    sys.exit(1)
print(f'SEO audit PASS: {len(PAGES)} pages, {EXPECTED_SITEMAP if BASE else 0} sitemap URLs, valid local links, {"public" if BASE else "noindex preview"} mode.')
print('AdSense build check PASS: production loader and ads.txt verified.' if ADSENSE_ENABLED else 'AdSense build check PASS: preview/local output contains no ad code or ads.txt.')
print('Atlas Q&A audit PASS: 5,000 unique server-side records, zero overlap with 370 curated FAQs, valid internal links/pinned local images, no static copy.')
