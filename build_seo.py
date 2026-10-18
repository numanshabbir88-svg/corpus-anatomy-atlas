#!/usr/bin/env python3
"""Build a crawlable reading edition alongside the original interactive atlas.
Set SITE_URL (or Netlify's URL) on a real deployment for canonicals and sitemap.
No keyword-stuffed pages, fabricated credentials, ad code, or placeholder publisher IDs.
"""
from __future__ import annotations
from collections import defaultdict
from html import escape as h
from pathlib import Path
from urllib.parse import urlparse
import csv, json, os, re, shutil, subprocess, sys
from datetime import date

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'site'
CONTENT_UPDATED = "2026-10-18"  # Static hub/policy baseline; chapters have their own updated dates in seo/chapters/.
# Netlify previews/branch builds stay noindex; only production receives canonicals and sitemap.
CONTEXT = os.environ.get('CONTEXT', '')
BASE = (os.environ.get('SITE_URL') or os.environ.get('URL') or os.environ.get('RENDER_EXTERNAL_URL') or '').rstrip('/') if CONTEXT in ('', 'production') else ''
# User-provided public publisher email; Netlify CONTACT_EMAIL can override it later.
CONTACT = (os.environ.get('CONTACT_EMAIL') or 'numanshabbir88@gmail.com').strip()
PUB = os.environ.get('ADSENSE_PUBLISHER_ID','').strip() if CONTEXT in ('', 'production') else ''
if BASE:
    parsed = urlparse(BASE)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.path not in ('','/') or parsed.query or parsed.fragment:
        raise SystemExit('SITE_URL must be a public HTTPS origin, for example https://your-site.netlify.app')
if CONTACT and not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', CONTACT):
    raise SystemExit('CONTACT_EMAIL must be a valid public contact email')
if PUB and not re.fullmatch(r'pub-\d{16}',PUB):
    raise SystemExit('ADSENSE_PUBLISHER_ID must match your real AdSense pub- plus 16 digits')
FILES=['organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js']
load=''.join((ROOT/f).read_text()+'\n' for f in FILES)
js=f"const vm=require('vm');const data=vm.runInNewContext({json.dumps(load)}+';({{ORGANS,SYSTEMS}})');process.stdout.write(JSON.stringify(data));"
data=json.loads(subprocess.run(['node','-'],input=js,text=True,capture_output=True,check=True,cwd=ROOT).stdout)
ORGANS=data['ORGANS']; SYSTEMS=data['SYSTEMS']
assert len(ORGANS)==58 and all(len(o['parts'])>=20 for o in ORGANS.values())
# Per-chapter SEO editing lives in simple JSON files, not in generated HTML.
SEO_DIR = ROOT / 'seo' / 'chapters'
if {p.stem for p in SEO_DIR.glob('*.json')} != set(ORGANS):
    raise SystemExit('seo/chapters must contain exactly one JSON file per anatomy chapter')
GUIDES={}
for slug in ORGANS:
    item=json.loads((SEO_DIR/f'{slug}.json').read_text(encoding='utf-8'))
    if set(item) != {'title','description','updated','questions'} or not all(isinstance(item[k],str) and item[k].strip() for k in ['title','description']):
        raise SystemExit(f'Invalid title or description in seo/chapters/{slug}.json')
    try: date.fromisoformat(item['updated'])
    except (TypeError, ValueError): raise SystemExit(f'{slug}: updated must be a real YYYY-MM-DD editorial date')
    questions=item['questions']
    if not isinstance(questions,list) or len(questions)!=5 or len({x.get('question','').casefold() for x in questions if isinstance(x,dict)})!=5:
        raise SystemExit(f'{slug}: exactly five distinct questions are required')
    for entry in questions:
        if not isinstance(entry,dict) or set(entry)!={'question','answer'} or not isinstance(entry['question'],str) or len(entry['question'].strip())<12 or not isinstance(entry['answer'],str) or len(entry['answer'].strip())<30:
            raise SystemExit(f'{slug}: each question and answer must be substantive text')
    GUIDES[slug]=item

TITLE={
'heart':'Heart anatomy: chambers, valves and blood flow','lungs':'Lung anatomy: lobes, bronchi and alveoli',
'brain':'Brain anatomy: regions, ventricles and pathways','kidney':'Kidney anatomy: cortex, medulla and nephrons',
'liver':'Liver anatomy: lobes, vessels and bile ducts','gut':'Digestive tract anatomy: stomach and intestines',
'eye':'Eye anatomy: layers, lens and visual pathway','ear':'Ear anatomy: hearing and balance structures',
'pancreas':'Pancreas anatomy: ducts, acini and islets','spleen':'Spleen anatomy: red pulp and white pulp',
'thyroid':'Thyroid gland anatomy: follicles, vessels and nerves','bladder':'Urinary bladder anatomy: wall, trigone and blood supply',
'spinalcord':'Spinal cord anatomy: grey matter, tracts and roots','skeleton':'Human skeleton: bones, joints and inner anatomy',
'muscle':'Muscular system anatomy: muscle groups and tendons','breast':'Breast anatomy: lobules, ducts and supporting tissue',
'gynuterus':'Uterus anatomy: endometrium, myometrium and cavity','gyncervix':'Cervix anatomy: epithelium and transformation zone',
'gynadnexa':'Ovary and fallopian tube anatomy','gynvagina':'Vaginal anatomy: wall layers and fornices',
'gynvulva':'Vulva anatomy: external structures and blood supply','maletestis':'Testis and epididymis: microscopic anatomy',
'maleprostate':'Prostate anatomy: zones, ducts and urethra','retina':'Retina anatomy: photoreceptors and neural layers',
'nephron':'Nephron anatomy: filtration and tubular segments','brachialplexus':'Brachial plexus anatomy: roots to terminal nerves',
'cerebraldeep':'Cerebral cortex and deep brain pathways','brainstemdeep':'Brainstem and cerebellum anatomy',
'pulmonaryacinus':'Pulmonary acinus: alveoli and gas-exchange barrier','hepaticlobule':'Hepatic lobule: portal triad and sinusoidal anatomy',
'intestinalwall':'Small intestine wall: villi, crypts and enteric nerves'}
PRIMARY={
'male':'male reproductive system anatomy','female':'female reproductive system anatomy',
'clitoralcomplex':'clitoral anatomy','penileerectile':'penile erectile tissue anatomy',
'maletestis':'testis microanatomy','gynvulva':'vulva anatomy',
'meningescsf':'meninges and cerebrospinal fluid anatomy',
'cranialnerves':'12 cranial nerves anatomy','autonomic':'autonomic nervous system anatomy',
'facialnerve':'facial nerve anatomy','trigeminalnerve':'trigeminal nerve anatomy'}
SOURCES={
'brain':'https://www.ncbi.nlm.nih.gov/books/NBK10926/',
'brainstemdeep':'https://www.ncbi.nlm.nih.gov/books/NBK442010/',
'autonomic':'https://www.ncbi.nlm.nih.gov/books/NBK538516/',
'trigeminalnerve':'https://www.ncbi.nlm.nih.gov/books/NBK482283/',
'maletestis':'https://www.ncbi.nlm.nih.gov/books/NBK470201/',
'female':'https://www.ncbi.nlm.nih.gov/books/NBK607451/',
'gynuterus':'https://www.ncbi.nlm.nih.gov/books/NBK607451/',
'lungs':'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system',
'gut':'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-1-overview-of-the-digestive-system',
'intestinalwall':'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-1-overview-of-the-digestive-system'}
STANDARD='https://openstax.org/details/books/anatomy-and-physiology-2e'
# A few bridge links complete the atlas graph without changing anatomical source data.
EXTRA_RELATIONS={'lungs':['larynx'], 'skeleton':['marrow'], 'thyroid':['endocrine'], 'larynx':['cranialnerves']}
SENSITIVE={'breast','gynvulva','gynvagina','gyncervix','gynadnexa','gynuterus','gynsupport','femalepelvis','maleprostate','maletestis','malepelvis','clitoralcomplex','penileerectile','male','female'}

def E(value): return h(str(value or ''),quote=True)
def url(path): return BASE + path if BASE else ''
def canonical(path): return f'<link rel="canonical" href="{E(url(path))}">' if BASE else '<meta name="robots" content="noindex,follow">'
def meta(title,desc,path,image=''):
    desc=' '.join(desc.split())[:157].rstrip(' ,;:.')+'.'
    if path == '/404.html':
        return f'<meta name="description" content="{E(desc)}"><meta name="robots" content="noindex,follow">'
    tags=f'<meta name="description" content="{E(desc)}"><meta name="robots" content="index,follow,max-image-preview:large">' if BASE else f'<meta name="description" content="{E(desc)}">'
    tags+=canonical(path)+f'<meta property="og:type" content="website"><meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(desc)}"><meta name="twitter:card" content="summary_large_image">'
    if BASE: tags+=f'<meta property="og:url" content="{E(url(path))}">'
    if BASE and image: tags+=f'<meta property="og:image" content="{E(url(image))}">'
    return tags

def schema(path,crumbs):
    if not BASE: return ''
    b=[{'@type':'ListItem','position':i+1,'name':name,'item':url(link)} for i,(name,link) in enumerate(crumbs)]
    objects=[{'@context':'https://schema.org','@type':'WebPage','name':crumbs[-1][0], 'url':url(path)},
             {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':b}]
    return '<script type="application/ld+json">'+json.dumps(objects,separators=(',',':')).replace('<','\\u003c')+'</script>'

def header(depth=0,current=''):
    root='../'*depth or './'
    links=[('Study guides',root+'learn/','learn'),('Interactive atlas',root+'index.html','atlas'),('Body map',root+'index.html#/map','map'),('About',root+'about.html','about')]
    nav=''.join(f'<a href="{E(link)}" {"aria-current=page" if key==current else ""}>{E(label)}</a>' for label,link,key in links)
    return f'<a class="skip" href="#content">Skip to content</a><header class="site-head"><div class="shell head-inner"><a class="brand" href="{root}index.html" aria-label="Corpus Anatomy Atlas home"><span class="brand-mark">♥</span><span class="brand-name">Corpus<small>Anatomy Atlas</small></span></a><nav class="head-nav" aria-label="Main navigation">{nav}</nav></div></header>'

def footer(depth=0):
    root='../'*depth or './'
    links=[('Study guides','learn/'),('Interactive atlas','index.html'),('About & editorial policy','about.html'),('Privacy','privacy.html')]
    return f'<footer class="site-foot"><div class="shell foot-inner"><div><strong>Corpus Anatomy Atlas</strong><p>Illustrated anatomy for learning, not a diagnostic or surgical reference. Digital renders explain regions; they are not clinical photographs or exact microscopic localizations.</p></div><nav class="foot-links" aria-label="Footer">'+''.join(f'<a href="{root+path}">{E(name)}</a>' for name,path in links)+'</nav></div></footer>'

def document(title,description,path,body,depth=0,image='',extra=''):
    root='../'*depth or './'
    head=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#125e58"><title>{E(title)} | Corpus</title>{meta(title,description,path,image)}{extra}<link rel="icon" href="{root}favicon.svg"><link rel="stylesheet" href="{root}editorial.css?v=33"></head><body>'
    return head+header(depth)+body+footer(depth)+'</body></html>'

def write(path,text):
    path.parent.mkdir(parents=True,exist_ok=True);path.write_text(text,encoding='utf-8')

def dimensions(image):
    # Read the WebP canvas header with the Python standard library; no deploy-time packages.
    raw=(ROOT / 'img' / image).read_bytes()[:32]
    if raw[:4]!=b'RIFF' or raw[8:12]!=b'WEBP':
        raise ValueError(f'Not a WebP image: {image}')
    chunk=raw[12:16]
    if chunk==b'VP8 ':
        if raw[23:26]!=b'\x9d\x01\x2a': raise ValueError(f'Invalid VP8 dimensions: {image}')
        width=int.from_bytes(raw[26:28],'little') & 0x3fff
        height=int.from_bytes(raw[28:30],'little') & 0x3fff
    elif chunk==b'VP8L':
        bits=int.from_bytes(raw[21:25],'little')
        width=(bits & 0x3fff)+1
        height=((bits >> 14) & 0x3fff)+1
    elif chunk==b'VP8X':
        width=int.from_bytes(raw[24:27],'little')+1
        height=int.from_bytes(raw[27:30],'little')+1
    else: raise ValueError(f'Unknown WebP variant: {image}')
    if not width or not height: raise ValueError(f'Empty image: {image}')
    return f'width="{width}" height="{height}"'

def part_block(items,start=1):
    chunks=[]
    for n,(pid,p) in enumerate(items,start):
        term=p.get('l','')
        label='' if not term or term==p['n'] else f'<small>{E(term)}</small>'
        chunks.append(f'<section class="part" id="part-{E(pid)}"><div class="part-head"><span class="number">{n:02d}</span><h3>{E(p["n"])}</h3></div>{label}<p>{E(p.get("d",""))}</p><div class="detail"><p><b>What it does</b>{E(p.get("f",""))}</p><p><b>Clinical connection</b>{E(p.get("c",""))}</p></div></section>')
    return ''.join(chunks)

def article(key,o):
    title=GUIDES[key]['title']
    desc=GUIDES[key]['description']
    system=SYSTEMS[o['system']]['name']
    image=o.get('photo',{}).get('file','')
    img='/img/webp/'+Path(image).stem+'.webp' if image else ''
    items=list(o['parts'].items());pinned=[x for x in items if not x[1].get('contextOnly')];deep=[x for x in items if x[1].get('contextOnly')]
    crumb=[('Home','/'),('Study guides','/learn/'),(o['title'],f'/learn/{key}/')]
    opening=f'<nav class="crumb shell" aria-label="Breadcrumb"><a href="../../index.html">Home</a><i>/</i><a href="../">Study guides</a><i>/</i><span>{E(o["title"])}</span></nav><section class="shell hero article-hero"><div class="eyebrow">{E(system)} · illustrated anatomy</div><h1>{E(title)}</h1><p>{E(desc)}</p><div class="action-row"><a class="button" href="../../index.html#/{key if key not in ("male","female") else key+"overview"}">Open interactive atlas ↗</a><a class="button alt" href="#parts">Read the structures ↓</a></div><p class="byline">Corpus educational reference · {len(items)} documented parts · Updated {GUIDES[key]["updated"]}</p></section>'
    photo=(f'<figure class="plate"><img src="../../{E(img.lstrip("/"))}" alt="Digital anatomical illustration of {E(o["title"])}" {dimensions("webp/"+Path(image).stem+".webp")} loading="eager" fetchpriority="high" decoding="async"><figcaption>Regional teaching illustration. Numbered hotspots belong to the interactive atlas; deep or microscopic study notes are not claimed to be separately visible here.</figcaption></figure>' if img else '')
    facts=[('Body system',system),('Location',o.get('region','')),('Blood supply',o.get('blood','')),('Innervation',o.get('nerve',''))]
    facts_html='<div class="facts">'+''.join(f'<div class="fact"><b>{E(k)}</b><span>{E(v)}</span></div>' for k,v in facts)+'</div>'
    pinned_html=f'<section id="parts" class="content-section"><div class="eyebrow">Illustrated structures</div><h2>Read the anatomy, part by part</h2><p class="section-lead">These {len(pinned)} structures correspond to the chapter’s regional illustration or schematic. Each entry separates location, function and a clinical point.</p><div class="part-list">{part_block(pinned)}</div></section>'
    deep_refs=list(dict.fromkeys(p.get('deepRef') for _,p in deep if p.get('deepRef') in ORGANS and p.get('deepRef')!=key))
    deep_links=('Related deep chapters: '+', '.join(f'<a href="../{E(ref)}/">{E(ORGANS[ref]["title"])}</a>' for ref in deep_refs[:5])+'.') if deep_refs else ''
    deep_html=(f'<section id="deep" class="content-section"><div class="eyebrow">Beyond the visible plate</div><h2>Deeper structures and tissue layers</h2><p class="section-lead">These {len(deep)} additional entries give anatomical context. They are deliberately not assigned a photographic pin on the regional image.</p>{f"<p class=note>{deep_links}</p>" if deep_links else ""}<div class="part-list">{part_block(deep,len(pinned)+1)}</div></section>' if deep else '')
    related=list(dict.fromkeys(r for r in EXTRA_RELATIONS.get(key,[])+o.get('related',[]) if r in ORGANS and r!=key))[:4]
    related_cards=''.join(
        f'<a class="related-card" href="../{E(ref)}/">'
        f'<img src="../../img/thumb/{E(Path(ORGANS[ref]["photo"]["file"]).stem)}.webp" '
        f'{dimensions("thumb/"+Path(ORGANS[ref]["photo"]["file"]).stem+".webp")} '
        f'alt="Illustration of {E(ORGANS[ref]["title"])}" loading="lazy" decoding="async">'
        f'<span><strong>{E(ORGANS[ref]["title"])}</strong><small>{E(ORGANS[ref].get("blurb",""))}</small></span>'
        f'<b aria-hidden="true">↗</b></a>' for ref in related)
    related_html=f'<section id="related" class="content-section related-section"><div class="eyebrow">Keep exploring</div><h2>Related anatomy guides</h2><p class="section-lead">Follow these connected structures and body systems in the illustrated atlas.</p><div class="related-grid">{related_cards}</div></section>'
    source_urls=[]
    for source in [STANDARD,SOURCES.get(key)]+list((o.get('study') or {}).get('sources',[])):
        if source and source not in source_urls: source_urls.append(source)
    source_list=''.join(f'<li><a href="{E(link)}" target="_blank" rel="noopener noreferrer">{E(urlparse(link).netloc.replace("www.",""))} ↗</a></li>' for link in source_urls)
    faq_items=''.join(f'<div class="qa-item"><h3>{E(row["question"])}</h3><p>{E(row["answer"])}</p></div>' for row in GUIDES[key]['questions'])
    faq_html=f'<section id="questions" class="content-section questions"><div class="eyebrow">Questions people ask</div><h2>Five questions about {E(o["title"])}</h2><p class="section-lead">Short answers grounded in the structures described above. Use the illustrated guide for anatomical context.</p><div class="qa-list">{faq_items}</div></section>'
    notes=f'<section id="sources" class="content-section sources"><div class="eyebrow">Reference desk</div><h2>Further reading</h2><p class="section-lead">General anatomy references and related source chapters for continued study. These links do not make the digital illustrations clinical images or certify every anatomical variant.</p><ul>{source_list}</ul><p class="disclaimer">This educational material does not provide medical advice, diagnosis or treatment. A named clinical reviewer has not been claimed for this page.</p></section>'
    connect=f'<div class="end-link"><div><strong>See the structures in context</strong><p>Open the interactive plate, pins, animated schematic and self-test.</p></div><a class="button" href="../../index.html#/{key if key not in ("male","female") else key+"overview"}">Open interactive view →</a></div>'
    sidebar=f'<aside class="sidebar" aria-label="On this page"><div class="side-card"><h2>In this guide</h2><a href="#overview">Overview</a><a href="#parts">Illustrated structures ({len(pinned)})</a>'+(f'<a href="#deep">Deep study notes ({len(deep)})</a>' if deep else '')+'<a href="#questions">Five questions &amp; answers</a><a href="#related">Related guides</a><a href="#sources">Further reading</a></div><div class="side-card"><div class="count">20+</div><p>Documented parts in every Corpus chapter. Images are orientation aids, not clinical evidence.</p></div></aside>'
    body='<div class="reading-track" aria-hidden="true"><span id="reading-progress"></span></div>'+opening+f'<div class="shell article-grid"><main id="content">{photo}<section id="overview"><div class="eyebrow">Overview</div><h2>How this part of the body works</h2><p class="intro-text">{E(o["summary"])}</p>{facts_html}</section>{pinned_html}{deep_html}{faq_html}{related_html}{notes}{connect}</main>{sidebar}</div>'
    article_json=schema(f'/learn/{key}/',crumb)
    return document(title,desc,f'/learn/{key}/',body,depth=2,image=img,extra=article_json).replace('</body>','<script defer src="../../reading.js?v=33"></script></body>')

# Build every chapter from the exact atlas data. No automatic keyword stuffing or fabricated bylines.
learn=ROOT/'learn'
for key,o in ORGANS.items(): write(learn/key/'index.html',article(key,o))
groups=defaultdict(list)
for key,o in ORGANS.items():groups[o['system']].append((key,o))
order=['circulatory','respiratory','nervous','digestive','urinary','sensory','skeletal','muscular','female','male','endocrine','lymphatic','integumentary']
sections=[]
for syskey in order:
    if syskey not in groups: continue
    cards=''.join(f'<a class="hub-card" href="{E(key)}/"><img src="../img/thumb/{E(Path(o["photo"]["file"]).stem)}.webp" {dimensions("thumb/"+Path(o["photo"]["file"]).stem+".webp")} loading="lazy" decoding="async" alt="Illustration of {E(o["title"])}"><span class="copy"><small>{len(o["parts"])} documented parts</small><strong>{E(o["title"])}</strong><em>{E(o["blurb"])}</em></span></a>' for key,o in groups[syskey])
    sections.append(f'<section id="{E(syskey)}"><h2 class="group-title">{E(SYSTEMS[syskey]["name"])}</h2><div class="hub-grid">{cards}</div></section>')
system_links=''.join(f'<a href="#{E(syskey)}">{E(SYSTEMS[syskey]["name"])} <small>{len(groups[syskey])}</small></a>' for syskey in order if syskey in groups)
hub_body=(
    '<main id="content"><section class="shell hub-hero">'
    '<div class="hub-intro"><div class="eyebrow">Corpus / illustrated study guides</div>'
    '<h1>Human anatomy, from visible form to inner structure.</h1>'
    '<p>Start with the illustration. Stay for the details: 58 guides connect each body system to named structures, what they do, and why they matter.</p>'
    '<div class="action-row"><a class="button" href="#all-guides">Explore study guides <span aria-hidden="true">↗</span></a>'
    '<a class="button alt" href="../index.html#/map">Open the body map</a></div>'
    '<p class="byline">58 chapters <span aria-hidden="true">·</span> 1,179 documented parts <span aria-hidden="true">·</span> One connected atlas</p></div>'
    '<a class="hero-feature" href="heart/" aria-label="Read the featured heart anatomy study guide">'
    '<span class="feature-top">Featured guide <span>01 / 58</span></span>'
    f'<span class="feature-visual"><img src="../img/thumb/heart.webp" {dimensions("thumb/heart.webp")} alt="Digital cross-section illustration of the human heart" fetchpriority="high" decoding="async"></span>'
    '<span class="feature-bottom"><span><strong>Inside the heart</strong><small>Chambers · valves · blood flow</small></span><b aria-hidden="true">↗</b></span></a></section>'
    '<div class="shell" id="all-guides"><nav class="system-index" aria-label="Browse guides by body system"><div class="system-index-head">'
    '<span class="eyebrow">Find your way</span><h2>Browse by body system</h2><p>Select a system or keep scrolling through every illustrated chapter.</p>'
    '</div><div class="system-links">'+system_links+'</div></nav>'+''.join(sections)+'</div></main>'
)
# A planning map: natural search intent, not traffic or ranking claims.
with (ROOT/'seo-keyword-map.csv').open('w',newline='',encoding='utf-8') as fh:
    writer=csv.writer(fh)
    writer.writerow(['chapter','primary search intent','related anatomy terms','page title','meta description'])
    for key,o in ORGANS.items():
        parts=[p['n'] for p in o['parts'].values() if not p.get('contextOnly')][:3]
        writer.writerow([key,PRIMARY.get(key,o['title'].replace(' — ', ' ').replace(' · ', ' ').lower()+' anatomy'),'; '.join(parts),GUIDES[key]['title'],GUIDES[key]['description']])

write(learn/'index.html',document('Human anatomy study guides','Explore 58 illustrated human anatomy study guides, from the heart and brain to bones, muscles, reproductive anatomy and microscopic tissue layers.','/learn/',hub_body,depth=1,extra=schema('/learn/',[('Home','/'),('Study guides','/learn/')])))

contact_html=(f'<a href="mailto:{E(CONTACT)}">{E(CONTACT)}</a>' if CONTACT else 'A public publisher contact address has not yet been provided. The publisher must add one before a monetization application.')
about=f'''<main id="content" class="shell policy"><div class="eyebrow">About this project</div><h1>An atlas built for learning.</h1><p>Corpus Anatomy Atlas pairs original interactive diagrams with educational digital anatomy illustrations and written descriptions of visible and deeper structures. The reading edition gives each chapter a stable, accessible page. The interactive edition adds numbered pins, animations, search, body maps and quizzes.</p><h2>Our editorial approach</h2><p>Entries organize anatomical location, function and clinical relevance using standard anatomy references and further-reading links. Digital illustrations orient the learner; they are not patient photographs, histology specimens or proof that every microscopic structure is visible on a single plate. Some content and illustrations were created or edited with software-assisted methods. We do not invent medical qualifications, patient cases, endorsements or research findings.</p><p>Medical and surgical guidance changes. These pages are educational summaries, not diagnosis, treatment advice or a substitute for supervised clinical training. A named licensed clinician has not been represented as having reviewed this atlas. Before public health-information promotion, the publisher should arrange subject-matter review and corrections where needed.</p><h2>Corrections and contact</h2><p>For corrections, accessibility feedback or questions about this atlas, email {contact_html}.</p><h2>Advertising</h2><p>No advertising code is active at present. Future monetization, if enabled, will be reviewed against publisher policies, especially for sensitive educational reproductive-anatomy pages. We do not promise search rankings or AdSense approval.</p></main>'''
write(ROOT/'about.html',document('About and editorial policy','Learn how Corpus Anatomy Atlas creates educational anatomy illustrations and study guides, and read its editorial and medical-content limitations.','/about.html',about,extra=schema('/about.html',[('Home','/'),('About','/about.html')])))
privacy=f'''<main id="content" class="shell policy"><div class="eyebrow">Privacy</div><h1>Privacy policy</h1><p>Last updated {CONTENT_UPDATED}. This describes the site in its current pre-advertising state. Publisher contact: {contact_html}</p><h2>What this site does today</h2><p>The atlas does not require an account. Search and quizzes run in your browser. The current site does not load analytics or advertising scripts and does not intentionally set tracking cookies. Your web host may process standard request information such as IP address, requested file and browser details to deliver and secure the site; the hosting provider's policies apply to that processing.</p><h2>External links</h2><p>Further-reading links lead to third-party sites, including anatomy references. Those sites have their own privacy practices. We do not control their content or cookies.</p><h2>If advertising is enabled later</h2><p>This site does not currently serve Google ads. Before enabling advertising, the publisher must update this page to reflect the actual vendors and technologies used. Ad providers including Google may use cookies, IP addresses, web beacons or other identifiers to provide, measure and personalize advertising. See <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">how Google uses information from sites or apps that use its services</a> and <a href="https://adssettings.google.com/" rel="noopener noreferrer">Google Ad Settings</a> for personalization controls. Where legally required, consent choices must be offered before relevant ad technologies are activated; a Google-certified CMP may be required for eligible EEA, UK and Swiss traffic.</p><h2>Questions</h2><p>For privacy enquiries: {contact_html}</p></main>'''
write(ROOT/'privacy.html',document('Privacy policy','Read how Corpus Anatomy Atlas handles browser-based features, hosting requests, external references and possible future advertising technologies.','/privacy.html',privacy,extra=schema('/privacy.html',[('Home','/'),('Privacy','/privacy.html')])))
not_found='<main id="content" class="shell policy"><div class="eyebrow">Page not found</div><h1>That page is not here.</h1><p>The address may have changed. Browse the study guides or return to the atlas.</p><p><a class="button" href="/learn/">Browse study guides →</a></p></main>'
write(ROOT/'404.html',document('Page not found','The requested anatomy page was not found. Browse the Corpus study guides.','/404.html',not_found))

# Keep the existing app as the interactive edition, linked to the search-readable edition.
html=(ROOT/'index.html').read_text()
if '<a href="learn/">Learn</a>' not in html:
    html=html.replace('<a href="#/explorer" data-nav="#/explorer">Layers</a>','<a href="learn/">Learn</a>')
if '<a href="learn/">Anatomy study guides</a>' not in html:
    html=html.replace('<a href="#/deep">Deep anatomy study path</a>','<a href="learn/">Anatomy study guides</a>\n        <a href="#/deep">Deep anatomy study path</a>')
if '<a href="#/explorer">Anatomical layers</a>' not in html:
    html=html.replace('<a href="#/map">Interactive body map</a>','<a href="#/map">Interactive body map</a>\n        <a href="#/explorer">Anatomical layers</a>')
if '<a href="about.html">About &amp; editorial policy</a>' not in html:
    html=html.replace('<a href="#/quiz">Self-test quiz</a>','<a href="#/quiz">Self-test quiz</a>\n        <a href="about.html">About &amp; editorial policy</a>\n        <a href="privacy.html">Privacy policy</a>')
html=re.sub(r'<link rel="canonical" href="[^"]*">','',html)
html=re.sub(r'<meta property="og:url" content="[^"]*">','',html)
html=html.replace('<meta name="robots" content="noindex,follow">','')
if BASE:
    html=html.replace('</head>',f'<link rel="canonical" href="{E(BASE)}/"><meta property="og:url" content="{E(BASE)}/"></head>')
else:
    html=html.replace('</head>','<meta name="robots" content="noindex,follow"></head>')
write(ROOT/'index.html',html)
# Rebuild the lean publish folder; all original source assets stay in img/ and are never deleted.
if OUT.exists(): shutil.rmtree(OUT)
OUT.mkdir()
for file in ['index.html','editorial.css','reading.js','styles.css','organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js','muscle-atlas.js','app.js','about.html','privacy.html','404.html']:
    shutil.copy2(ROOT/file,OUT/file)
shutil.copytree(learn,OUT/'learn')
for kind in ['webp','thumb']: shutil.copytree(ROOT/'img'/kind,OUT/'img'/kind)
write(OUT/'favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#125e58"/><path d="M16 26C8 20 5 16 5 12c0-6 7-8 11-3 4-5 11-3 11 3 0 4-3 8-11 14Z" fill="#e47b72"/></svg>')
write(ROOT/'favicon.svg',(OUT/'favicon.svg').read_text())
write(OUT/'robots.txt','User-agent: *\nAllow: /\n'+(f'Sitemap: {BASE}/sitemap.xml\n' if BASE else ''))
if BASE:
    paths=['/','/learn/']+[f'/learn/{key}/' for key in ORGANS]+['/about.html','/privacy.html']
    def last_modified(path):
        slug=path.strip('/').split('/')[-1]
        return GUIDES[slug]['updated'] if path.startswith('/learn/') and slug in GUIDES else CONTENT_UPDATED
    xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{E(url(path))}</loc><lastmod>{last_modified(path)}</lastmod></url>\n' for path in paths)+'</urlset>\n'
    write(OUT/'sitemap.xml',xml)
if PUB: write(OUT/'ads.txt',f'google.com, {PUB}, DIRECT, f08c47fec0942fa0\n')
write(OUT/'_headers','/img/*\n  Cache-Control: public, max-age=604800\n\n/*.js\n  Cache-Control: public, max-age=0, must-revalidate\n\n/*.css\n  Cache-Control: public, max-age=0, must-revalidate\n')
print(f'Built {len(ORGANS)} crawlable study pages in {OUT}.')
print('Canonical/sitemap:',BASE or 'pending SITE_URL on production deployment')
print('Public contact:',CONTACT or 'pending CONTACT_EMAIL before monetization')
print('ads.txt:',PUB or 'not created until real ADSENSE_PUBLISHER_ID is provided')
