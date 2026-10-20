#!/usr/bin/env python3
"""Audit the built static site and its sitemap before publication.

Local builds intentionally have no sitemap and are noindex. Production builds
use the actual SITE_URL (or host-provided URL) for all canonical locations.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent / 'site'
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
        self.qa_count = 0
        self.related = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'section' and 'part' in a.get('class','').split(): self.part_count += 1
        if tag == 'button' and 'data-plate-preview' in a: self.previews.append(a)
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
    def handle_data(self, data):
        if self.in_title: self.title += data

def report(message): ERRORS.append(message)

def local_target(page, reference):
    parsed = urlparse(reference)
    if parsed.scheme or parsed.netloc or reference.startswith(('mailto:','tel:','data:')): return None
    path = unquote(parsed.path)
    if not path: return None
    target = ROOT / path.lstrip('/') if path.startswith('/') else page.parent / path
    target = target.resolve()
    if not target.is_relative_to(ROOT.resolve()):
        report(f'{page.relative_to(ROOT)}: link outside output: {reference}')
        return None
    if path.endswith('/'): target /= 'index.html'
    return target

if len(PAGES) != 79: report(f'Expected 79 HTML files, found {len(PAGES)}')
seen_titles = set()
related_graph = {}
for page in PAGES:
    parser = Page()
    parser.feed(page.read_text(encoding='utf-8'))
    name = str(page.relative_to(ROOT))
    if parser.h1 != 1: report(f'{name}: {parser.h1} h1 headings')
    if name.startswith('learn/') and name != 'learn/index.html':
        if parser.qa_count != 5: report(f'{name}: expected 5 visible question-answer blocks, got {parser.qa_count}')
        if parser.part_count < 20: report(f'{name}: expected at least 20 documented structures')
        for button in parser.previews:
            located = button.get('data-preview-context') == 'false'
            has_point = button.get('data-point-x') is not None and button.get('data-point-y') is not None
            if located != has_point: report(f'{name}: mismatch between preview pointer and stated visibility for {button.get("data-part-name")}')
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
    seen_titles.add(parser.title)
    if len(parser.description) != 1 or not parser.description[0]: report(f'{name}: missing/duplicate description')
    for ref in parser.refs:
        target = local_target(page, ref)
        if target is not None and not target.is_file(): report(f'{name}: broken local reference {ref}')
        if ref.startswith('#') and len(ref)>1 and ref[1:] not in parser.ids and not ref.startswith('#/'):
            report(f'{name}: missing local section {ref}')
    for image in parser.images:
        if not image.get('alt') or not image.get('width') or not image.get('height'):
            report(f'{name}: image lacks alt or reserved dimensions: {image.get("src")}')
    if name == '404.html':
        if 'noindex' not in ' '.join(parser.robots): report('404.html must be noindex')
        continue
    public_path = '/' if name == 'index.html' else '/' + name.replace('index.html','') if name.endswith('/index.html') else '/' + name
    if BASE:
        if parser.canonical != [BASE + public_path]: report(f'{name}: incorrect canonical {parser.canonical}')
        if any('noindex' in x for x in parser.robots): report(f'{name}: production page is noindex')
    elif 'noindex' not in ' '.join(parser.robots) or parser.canonical:
        report(f'{name}: preview should be noindex with no canonical')

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
            if len(urls) != 78 or len(set(urls)) != 78: report(f'Sitemap must contain 78 unique URLs, found {len(urls)}')
            for address in urls:
                if not address or not address.startswith(BASE + '/'): report(f'Sitemap URL has incorrect origin: {address}'); continue
                path = urlparse(address).path
                if not local_target(ROOT / 'index.html', path).is_file(): report(f'Sitemap URL has no page: {address}')
            expected = {BASE + '/' if p.name == 'index.html' and p.parent == ROOT else BASE + '/' + str(p.relative_to(ROOT)).replace('index.html','') if p.name == 'index.html' else BASE + '/' + str(p.relative_to(ROOT)) for p in PAGES if p.name != '404.html'}
            if set(urls) != expected: report('Sitemap does not match indexable pages')
        except ET.ParseError as exc: report(f'Sitemap XML invalid: {exc}')
    if f'Sitemap: {BASE}/sitemap.xml' not in robots: report('robots.txt sitemap directive missing')
else:
    if sitemap.exists(): report('Preview has a sitemap without a real public URL')
    if 'Sitemap:' in robots: report('Preview robots.txt has an invalid sitemap directive')


# Targeted regression checks: never replace a microscopic close-up with a gross lung plate,
# and never return the sagittal vaginal image to the external vulva chapter.
for slug in ('lungs','pulmonaryacinus'):
    path=ROOT/'learn'/slug/'index.html'
    parser=Page();parser.feed(path.read_text(encoding='utf-8'))
    for cell in ('Type I pneumocyte','Type II pneumocyte','Alveolar macrophage'):
        matches=[b for b in parser.previews if b.get('data-part-name')==cell and b.get('class')=='reading-mini-trigger']
        if len(matches)!=1 or matches[0].get('data-preview-kind')!='scope' or not matches[0].get('data-plate-src','').endswith('/alveolar-cell-detail.webp') or matches[0].get('data-preview-context')!='false' or not matches[0].get('data-overview-src','').endswith('/'+('lungs' if slug=='lungs' else 'pulmonary-acinus')+'.webp'):
            report(f'{slug}: missing honest illustrated close-up and pointer for {cell}')
# All microscope links must point to shipped optimized assets and carry an honest organ reference.
for slug in ('lungs','kidney','thyroid','pancreas','skin','breast','lymph','gynuterus','gynadnexa','maletestis'):
    page=(ROOT/'learn'/slug/'index.html').read_text(encoding='utf-8')
    if 'id="under-the-lens"' not in page: report(f'{slug}: under-the-lens section missing')
    if 'data-preview-kind="scope"' not in page: report(f'{slug}: tissue-level previews missing')
# A distinct, accurately counted skull chapter must not add bones to the 206 atlas or
# falsely point at hidden palatine/vomer bones or the intratemporal CN VII foramen.
skull_parser=Page();skull_parser.feed((ROOT/'learn/skullface/index.html').read_text(encoding='utf-8'))
if not skull_parser.title.startswith('Skull and facial bones: all 22 adult skull bones |') or skull_parser.part_count != 30 or skull_parser.qa_count != 5:
    report('Skull guide: title, 30 substantive entries or five Q&A missing')
if not any('../facialnerve/' in link for link in skull_parser.related):
    report('Skull guide: independent facial nerve chapter link missing')
for name in ('Right maxilla','Left maxilla','Right zygomatic bone','Left zygomatic bone','Right nasal bone','Left nasal bone','Mandible','Vomer','Right palatine bone','Left palatine bone','Right inferior nasal concha','Left inferior nasal concha','Frontal bone'):
    matches=[b for b in skull_parser.previews if b.get('data-part-name')==name]
    if len(matches)!=1: report(f'Skull guide: {name} is missing or duplicated')
    elif name in ('Vomer','Right palatine bone','Left palatine bone','Right inferior nasal concha','Left inferior nasal concha'):
        if matches[0].get('data-preview-context')!='true' or not matches[0].get('data-plate-src','').endswith('/skull-face-medial.webp'):
            report(f'Skull guide: hidden bone {name} has a false front-view pointer')
    elif matches[0].get('data-preview-context')!='false':
        report(f'Skull guide: obvious anterior bone {name} lacks its visible marker')
facial_parser=Page();facial_parser.feed((ROOT/'learn/facialnerve/index.html').read_text(encoding='utf-8'))
for button in facial_parser.previews:
    if button.get('data-part-name')=='Stylomastoid foramen' and button.get('data-preview-context')!='true':
        report('Facial nerve: hidden bony foramen has a false plate pointer')
# A complete dental positional chart, honest class imagery, and correct sensory pathways.
dental_parser=Page();dental_html=(ROOT/'learn/dentition/index.html').read_text(encoding='utf-8');dental_parser.feed(dental_html)
if not dental_parser.title.startswith('Tooth anatomy: 32 permanent and 20 primary teeth |') or dental_parser.part_count!=76 or dental_parser.qa_count!=5:
    report('Dentition guide: title, 76 entries or five Q&A missing')
if len(re.findall(r'class="tooth-position"',dental_html))!=52:
    report('Dentition guide: expected 32 permanent and 20 primary chart positions')
for tooth,plate in [('Permanent maxillary right central incisor · #8','tooth-incisor.webp'),('Permanent mandibular right first molar · #30','tooth-molar-section.webp'),('Primary maxillary right second molar · A','tooth-molar-section.webp')]:
    matches=[b for b in dental_parser.previews if b.get('data-part-name')==tooth]
    if len(matches)!=1 or matches[0].get('data-preview-context')!='true' or not matches[0].get('data-plate-src','').endswith('/'+plate):
        report(f'Dentition guide: missing class image or false pinpoint for {tooth}')
if not all(term in dental_html for term in ('Superior alveolar nerve branches (V2)','Inferior alveolar nerve (V3)','FDI 18','FDI 48')):
    report('Dentition guide: dental nerve or FDI orientation missing')
# The hub must expose every foundation guide and About must reflect the real guide count.
foundation_hub=(ROOT/'learn/index.html').read_text(encoding='utf-8')
if any(f'href="{slug}/"' not in foundation_hub for slug in ('anatomicallanguage','bodyregions','tissuefoundations')):
    report('Study hub omitted a foundation guide')
if '<b>74</b> study chapters' not in (ROOT/'about.html').read_text(encoding='utf-8'):
    report('About chapter count is stale')
# Foundation batch: truthful plane references, patient-facing regions and micro-scale imagery.
for slug,n in [('anatomicallanguage',24),('bodyregions',28),('tissuefoundations',28)]:
    page=(ROOT/'learn'/slug/'index.html').read_text(encoding='utf-8');probe=Page();probe.feed(page)
    if probe.part_count!=n or probe.qa_count!=5: report(f'{slug}: parts/Q&A coverage changed')
    if slug=='anatomicallanguage' and any(b.get('data-preview-context')=='false' for b in probe.previews):report('Reference planes have a false image pointer')
    if slug=='bodyregions' and (len(re.findall(r'class="foundation-chart ',page))!=2 or len(re.findall(r'<a href="#part-[a-z]+"',page))<13):report('Patient-facing region maps are incomplete')
    if slug=='tissuefoundations':
        for name,asset in [('Mitochondria','foundation-cell-organelles.webp'),('Cardiac muscle','foundation-cardiac-muscle.webp'),('Smooth muscle','foundation-smooth-muscle.webp'),('Connective tissue','foundation-connective.webp')]:
            match=[b for b in probe.previews if b.get('data-part-name')==name]
            if len(match)!=1 or not match[0].get('data-plate-src','').endswith('/'+asset) or match[0].get('data-preview-context')!='true':report(f'{slug}: irrelevant or falsely pinned microscopy for {name}')
        if len(re.findall(r'class="reading-mini-trigger foundation-image"',page))!=4:report('Four-tissue illustrated study cards missing')
about=(ROOT/'about.html').read_text(encoding='utf-8')
if 'id="contact"' not in about or 'mailto:numanshabbir88@gmail.com' not in about:
    report('About us: public contact and corrections address missing')
if '<a href="about.html">About us</a>' not in (ROOT/'index.html').read_text(encoding='utf-8'):
    report('Homepage: About us is not in the top navigation')
vulva_html=(ROOT/'learn/gynvulva/index.html').read_text(encoding='utf-8')
if 'img/webp/vulva-surface-clean.webp' not in vulva_html or 'img/webp/gyn-vagina.webp' in vulva_html:
    report('Vulva: external surface image is missing or replaced by internal sagittal image')
if 'ctx_clitoralcomplex_' in vulva_html:
    report('Vulva: duplicate clitoral study entries returned')

if ERRORS:
    print('SEO audit FAIL (' + str(len(ERRORS)) + ' issues)')
    for error in ERRORS[:40]: print(' -', error)
    sys.exit(1)
print(f'SEO audit PASS: {len(PAGES)} pages, {78 if BASE else 0} sitemap URLs, valid local links, {"public" if BASE else "noindex preview"} mode.')
