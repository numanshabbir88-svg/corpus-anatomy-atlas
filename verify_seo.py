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
        self.qa_count = 0
        self.related = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
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

if len(PAGES) != 63: report(f'Expected 63 HTML files, found {len(PAGES)}')
seen_titles = set()
related_graph = {}
for page in PAGES:
    parser = Page()
    parser.feed(page.read_text(encoding='utf-8'))
    name = str(page.relative_to(ROOT))
    if parser.h1 != 1: report(f'{name}: {parser.h1} h1 headings')
    if name.startswith('learn/') and name != 'learn/index.html':
        if parser.qa_count != 5: report(f'{name}: expected 5 visible question-answer blocks, got {parser.qa_count}')
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
            if len(urls) != 62 or len(set(urls)) != 62: report(f'Sitemap must contain 62 unique URLs, found {len(urls)}')
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

if ERRORS:
    print('SEO audit FAIL (' + str(len(ERRORS)) + ' issues)')
    for error in ERRORS[:40]: print(' -', error)
    sys.exit(1)
print(f'SEO audit PASS: {len(PAGES)} pages, {62 if BASE else 0} sitemap URLs, valid local links, {"public" if BASE else "noindex preview"} mode.')
