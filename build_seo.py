#!/usr/bin/env python3
"""Build the crawlable reading edition and production-only AdSense integration.
Set SITE_URL (or rely on Netlify's URL) on production for canonicals, sitemap, Auto ads and ads.txt.
The publisher/client ID is public; no account secrets or credentials belong in this project.
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
CONTENT_UPDATED = "2026-10-19"  # Static content baseline; chapters have their own updated dates in seo/chapters/.
PRIVACY_UPDATED = "2026-11-04"
# Netlify previews/branch builds stay noindex; only production receives canonicals and sitemap.
CONTEXT = os.environ.get('CONTEXT', '')
BASE = (os.environ.get('SITE_URL') or os.environ.get('URL') or os.environ.get('RENDER_EXTERNAL_URL') or '').rstrip('/') if CONTEXT in ('', 'production') else ''
# User-provided public publisher email; Netlify CONTACT_EMAIL can override it later.
CONTACT = (os.environ.get('CONTACT_EMAIL') or 'numanshabbir88@gmail.com').strip()
# Public publisher ID supplied by the site owner. A Netlify production env var may override it.
DEFAULT_PUBLISHER_ID = 'pub-5783924977074679'
PUB = (os.environ.get('ADSENSE_PUBLISHER_ID') or DEFAULT_PUBLISHER_ID).strip() if CONTEXT in ('', 'production') else ''
ADSENSE_ENABLED = bool(PUB and BASE and CONTEXT in ('', 'production'))
ADSENSE_TAG = (f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-{PUB}" crossorigin="anonymous"></script>' if ADSENSE_ENABLED else '')
if BASE:
    parsed = urlparse(BASE)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.path not in ('','/') or parsed.query or parsed.fragment:
        raise SystemExit('SITE_URL must be a public HTTPS origin, for example https://your-site.netlify.app')
if CONTACT and not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', CONTACT):
    raise SystemExit('CONTACT_EMAIL must be a valid public contact email')
if PUB and not re.fullmatch(r'pub-\d{16}',PUB):
    raise SystemExit('ADSENSE_PUBLISHER_ID must match your real AdSense pub- plus 16 digits')
FILES=['organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js','skull-chapter.js','dental-chapter.js','foundations-chapters.js','reproduction-stages.js','repro-image-enrichment.js','micro-lens.js','part-pins.js','muscle-atlas.js']
load=''.join((ROOT/f).read_text()+'\n' for f in FILES)
# The public reading edition uses the same curated pin map as the interactive atlas.
# part-pins.js expects a browser-like window solely for its diagnostic report.
js=f"const vm=require('vm');const data=vm.runInNewContext({json.dumps(load)}+';({{ORGANS,SYSTEMS,MICRO_LENS,MUSCLE_GROUPS,TENDON_ENTRIES}})',{{window:{{}},console}});process.stdout.write(JSON.stringify(data));"
data=json.loads(subprocess.run(['node','-'],input=js,text=True,capture_output=True,check=True,cwd=ROOT).stdout)
ORGANS=data['ORGANS']; SYSTEMS=data['SYSTEMS']; MICRO_LENS=data['MICRO_LENS']
MUSCLE_GROUPS=data.get('MUSCLE_GROUPS',[]); TENDON_ENTRIES=data.get('TENDON_ENTRIES',[])
assert len(ORGANS)==74 and all(len(o['parts'])>=20 for o in ORGANS.values())
assert sum(group['n'] for group in ORGANS['skeleton']['bones206']) == 206
assert len(ORGANS['skullface']['parts']) == 30
assert sum('Facial ·' in p['t'] for p in ORGANS['skullface']['parts'].values()) == 14
assert sum('Cranial ·' in p['t'] for p in ORGANS['skullface']['parts'].values()) == 8
assert 'stylomastoidforamen' not in ORGANS['facialnerve']['photo']['hot']
assert len(ORGANS['dentition']['dental']['permanent']) == 32
assert len(ORGANS['dentition']['dental']['primary']) == 20
assert len(ORGANS['dentition']['parts']) == 76
assert [t['fdi'] for t in ORGANS['dentition']['dental']['permanent'] if t['number'] in (1,8,9,16,17,24,25,32)] == [18,11,21,28,38,31,41,48]
assert [t['letter'] for t in ORGANS['dentition']['dental']['primary']] == list('ABCDEFGHIJKLMNOPQRST')
assert len(ORGANS['anatomicallanguage']['parts']) == 24
assert len(ORGANS['bodyregions']['parts']) == 28
assert len(ORGANS['tissuefoundations']['parts']) == 28
assert len(ORGANS['bodyregions']['regionMaps']['quadrants']) == 4
assert len(ORGANS['bodyregions']['regionMaps']['nine']) == 9
assert {'epithelium','basallamina'} <= set(ORGANS['tissuefoundations']['parts'])
LIFE=['spermanatomy','oocyteanatomy','fertilization','cleavageblastocyst','implantation','placentaanatomy','embryodevelopment','fetaldevelopment','laborfirststage','laborsecondstage','laborthirdstage']
assert len(LIFE)==11 and all(len(ORGANS[slug]['parts'])==20 and len(ORGANS[slug]['quiz'])==3 for slug in LIFE)
assert {'head','midpiece','flagellum'} <= set(ORGANS['spermanatomy']['photo']['hot'])
assert {'zona','corona','polar'} <= set(ORGANS['oocyteanatomy']['photo']['hot'])
assert [ORGANS[slug]['photo']['file'] for slug in LIFE[-3:]]==['repro-labor-stage-one.png','repro-labor-stage-two.png','repro-labor-stage-three.png']
assert ORGANS['fetaldevelopment']['photo']['file']=='repro-fetus-second-trimester.png'
assert sum(len(ORGANS[slug]['visualGallery']) for slug in LIFE)==29
assert all(len(ORGANS[slug]['parts'])==20 and all(p.get('referencePlate') or p.get('microLens') or pid in ORGANS[slug]['photo']['hot'] for pid,p in ORGANS[slug]['parts'].items()) for slug in LIFE)
# Every usable chapter coordinate must point to a real documented part.
for _key,_o in ORGANS.items():
    for _pid,_xy in (_o.get('photo') or {}).get('hot',{}).items():
        if isinstance(_xy,list) and len(_xy)==2 and all(isinstance(v,(int,float)) and 0<=v<=1000 for v in _xy):
            assert _pid in _o['parts'], f'{_key}: pointer without a part: {_pid}'



# Per-chapter SEO editing lives in simple JSON files, not in generated HTML.
SEO_DIR = ROOT / 'seo' / 'chapters'
if {p.stem for p in SEO_DIR.glob('*.json')} != set(ORGANS):
    raise SystemExit('seo/chapters must contain exactly one JSON file per anatomy chapter')
GUIDES={}
for slug in ORGANS:
    item=json.loads((SEO_DIR/f'{slug}.json').read_text(encoding='utf-8'))
    if not ({'title','description','updated','questions'} <= set(item)) or not all(isinstance(item[k],str) and item[k].strip() for k in ['title','description']):
        raise SystemExit(f'Invalid title or description in seo/chapters/{slug}.json')
    if len(item['title']) != 55:
        raise SystemExit(f'{slug}: SEO title must be exactly 55 characters, got {len(item["title"])}')
    if len(item['description']) != 155:
        raise SystemExit(f'{slug}: meta description must be exactly 155 characters, got {len(item["description"])}')
    try: date.fromisoformat(item['updated'])
    except (TypeError, ValueError): raise SystemExit(f'{slug}: updated must be a real YYYY-MM-DD editorial date')
    questions=item['questions']
    if not isinstance(questions,list) or len(questions)!=5 or len({x.get('question','').casefold() for x in questions if isinstance(x,dict)})!=5:
        raise SystemExit(f'{slug}: exactly five distinct questions are required')
    for entry in questions:
        if not isinstance(entry,dict) or set(entry)!={'question','answer'} or not isinstance(entry['question'],str) or len(entry['question'].strip())<12 or not isinstance(entry['answer'],str) or len(entry['answer'].strip())<30:
            raise SystemExit(f'{slug}: each question and answer must be substantive text')
    GUIDES[slug]=item
def S(k): return GUIDES.get(k,{}).get('slug', k)
SLUG_MAP = {S(k): k for k in GUIDES}

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
'spermanatomy':'human sperm cell anatomy and spermatogenesis','oocyteanatomy':'human egg cell anatomy oocyte ovulation','fertilization':'sperm meets egg in uterine tube','cleavageblastocyst':'zygote cleavage morula blastocyst','implantation':'blastocyst implantation endometrium','placentaanatomy':'placenta anatomy chorionic villi maternal fetal exchange','embryodevelopment':'embryonic development germ layers','fetaldevelopment':'fetal development pregnancy trimesters','laborfirststage':'first stage labor cervix dilation','laborsecondstage':'second stage labor birth baby','laborthirdstage':'third stage labor placenta birth','anatomicallanguage':'anatomical directions planes and movement','bodyregions':'body cavities abdominal quadrants and nine regions','tissuefoundations':'four basic tissue types and cell anatomy','dentition':'tooth anatomy for dental students','skullface':'skull and facial bones anatomy','facialnerve':'facial nerve anatomy','trigeminalnerve':'trigeminal nerve anatomy'}
SOURCES={
'heart':'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy',
'skeleton':'https://openstax.org/books/anatomy-and-physiology-2e/pages/6-3-bone-structure',
'skullface':'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull',
'dentition':'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-3-the-mouth-pharynx-and-esophagus',
'anatomicallanguage':'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology',
'bodyregions':'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology',
'tissuefoundations':'https://openstax.org/books/anatomy-and-physiology-2e/pages/4-1-types-of-tissues',
'muscle':'https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle',
'nervousmale':'https://www.ncbi.nlm.nih.gov/books/NBK554736/',
'nervousfemale':'https://www.ncbi.nlm.nih.gov/books/NBK554736/',
'gynvulva':'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system',
'pulmonaryacinus':'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs',
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
EXTRA_RELATIONS={'lungs':['larynx'], 'skeleton':['skullface','marrow'], 'thyroid':['endocrine'], 'larynx':['cranialnerves']}
SENSITIVE={'breast','gynvulva','gynvagina','gyncervix','gynadnexa','gynuterus','gynsupport','femalepelvis','maleprostate','maletestis','malepelvis','clitoralcomplex','penileerectile','male','female'}

def E(value): return h(str(value or ''),quote=True)
def url(path): return BASE + path if BASE else ''
def canonical(path): return f'<link rel="canonical" href="{E(url(path))}">' if BASE else '<meta name="robots" content="noindex,follow">'
def meta(title,desc,path,image='',keywords=''):
    desc=' '.join(desc.split()) if len(' '.join(desc.split()))==155 else ' '.join(desc.split())[:157].rstrip(' ,;:.')+'.'
    kw_str=keywords or 'human anatomy, interactive anatomy atlas, organ systems, medical anatomy study guides, Corpus Anatomy Atlas'
    pub_tags=f'<meta name="keywords" content="{E(kw_str)}"><meta name="author" content="Corpus Anatomy Atlas"><meta name="publisher" content="Corpus Anatomy Atlas">'
    if BASE: pub_tags+=f'<link rel="publisher" href="{E(BASE)}/">'
    if path == '/404.html':
        return f'<meta name="description" content="{E(desc)}">{pub_tags}<meta name="robots" content="noindex,follow">'
    tags=f'<meta name="description" content="{E(desc)}">{pub_tags}<meta name="robots" content="index,follow,max-image-preview:large">' if BASE else f'<meta name="description" content="{E(desc)}">{pub_tags}'
    tags+=canonical(path)+f'<meta property="og:type" content="website"><meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(desc)}"><meta name="twitter:card" content="summary_large_image">'
    if BASE: tags+=f'<meta property="og:url" content="{E(url(path))}">'
    if BASE and image: tags+=f'<meta property="og:image" content="{E(url(image))}">'
    return tags

def schema(path,crumbs,questions=None):
    if not BASE: return ''
    b=[{'@type':'ListItem','position':i+1,'name':name,'item':url(link)} for i,(name,link) in enumerate(crumbs)]
    objects=[{'@context':'https://schema.org','@type':'WebPage','name':crumbs[-1][0], 'url':url(path)},
             {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':b}]
    if questions:
        objects.append({'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q['question'],'acceptedAnswer':{'@type':'Answer','text':q['answer']}} for q in questions]})
    return '<script type="application/ld+json">'+json.dumps(objects,separators=(',',':')).replace('<','\\u003c')+'</script>'

def header(depth=0,current=''):
    root='../'*depth or './'
    links=[('Study guides',root+'learn/','learn'),('Blog',root+'blog/','blog'),('Interactive atlas',root,'atlas'),('Body map',root+'body-map/','map'),('Quiz',root+'anatomy-quiz/','quiz'),('About us',root+'about.html','about')]
    nav=''.join(f'<a href="{E(link)}" {"aria-current=page" if key==current else ""}>{E(label)}</a>' for label,link,key in links)
    return f'<a class="skip" href="#content">Skip to content</a><header class="site-head"><div class="shell head-inner"><a class="brand" href="{root}" aria-label="Corpus Anatomy Atlas home"><span class="brand-mark">♥</span><span class="brand-name">Corpus<small>Anatomy Atlas</small></span></a><nav class="head-nav" aria-label="Main navigation">{nav}</nav></div></header>'

def footer(depth=0):
    root='../'*depth or './'
    links=[('Study guides','learn/'),('Blog','blog/'),('Interactive atlas',''),('Body map','body-map/'),('All organs','all-organs/'),('About & editorial policy','about.html'),('Privacy policy','privacy-policy/')]
    return f'<footer class="site-foot"><div class="shell foot-inner"><div><strong>Corpus Anatomy Atlas</strong><p>Illustrated anatomy for learning, not a diagnostic or surgical reference. Digital renders explain regions; they are not clinical photographs or substitutes for histology slides.</p></div><nav class="foot-links" aria-label="Footer">'+''.join(f'<a href="{root+path}">{E(name)}</a>' for name,path in links)+'</nav></div></footer>'

def document(title,description,path,body,depth=0,image='',extra='',keywords=''):
    root='../'*depth or './'
    full_title=title if len(title)==55 else f'{title} | Corpus'
    head=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#125e58"><title>{E(full_title)}</title>{meta(full_title,description,path,image,keywords)}{extra}<link rel="icon" href="{root}favicon.svg"><link rel="stylesheet" href="{root}editorial.css?v=63"><link rel="stylesheet" href="{root}corpus-bot.css?v=18"></head><body>'
    return head+header(depth)+body+footer(depth)+f'<script defer src="{root}corpus-bot.js?v=19"></script></body></html>'

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

def valid_hot(point):
    return (isinstance(point,list) and len(point)==2
            and all(isinstance(v,(int,float)) and not isinstance(v,bool) and 0<=v<=1000 for v in point))

def part_plate(o,pid,p):
    """Mirror the interactive atlas: prefer a real point on the chosen plate over a generic reference."""
    pin=p.get('pinPlate') or {}
    if pin.get('file') and valid_hot(pin.get('hot')):
        return pin['file'],pin['hot'],'detail',pin.get('reference') or p.get('deepRef') or ''
    lens_id=p.get('microLens')
    if lens_id in MICRO_LENS:
        lens=MICRO_LENS[lens_id]
        point=p.get('microPoint')
        return lens['file'],point if valid_hot(point) else None,'scope',p.get('deepRef') or ''
    own=(o.get('photo') or {}).get('hot',{}).get(pid)
    if valid_hot(own) and not p.get('contextOnly'):
        return o['photo']['file'],own,'region',''
    if p.get('referencePlate'):
        return p['referencePlate'],None,'region',''
    plate=o;part=pid;ref=''
    source=p.get('deepRef')
    if p.get('contextOnly') and source in ORGANS and ORGANS[source].get('photo'):
        prefix=f'ctx_{source}_'
        candidate=pid[len(prefix):] if pid.startswith(prefix) else ''
        target=ORGANS[source]
        if candidate in target['parts'] and target['parts'][candidate]['n']==p['n']:
            plate=target;part=candidate;ref=source
    raw=(plate.get('photo') or {}).get('hot',{}).get(part)
    point=(raw if valid_hot(raw) and not plate['parts'][part].get('contextOnly') else None)
    return plate['photo']['file'],point,'detail' if ref else 'region',ref

def photo_annotations(o,image):
    """Static leader lines and labels using the same 0–1000 hot points as the SPA."""
    photo=o.get('photo') or {}
    pins=[]
    for pid,xy in photo.get('hot',{}).items():
        if pid in o['parts'] and valid_hot(xy):
            pins.append((len(pins)+1,pid,o['parts'][pid].get('n',pid),xy[0],xy[1]))
    if not pins:
        return '',0,''
    sides={'l':[],'r':[]}
    for row in pins:
        sides['l' if row[3]<500 else 'r'].append(row)
    paths=[];labels=[]
    full=f'../../img/webp/{Path(image).stem}.webp'
    for side in ('l','r'):
        rows=sorted(sides[side],key=lambda row:row[4])
        n=len(rows)
        if not n: continue
        gap=min(84,900/(n-1)) if n>1 else 0
        slots=[max(42,min(958,row[4])) for row in rows]
        for i in range(1,n): slots[i]=max(slots[i],slots[i-1]+gap)
        if slots[-1]>958:
            slots[-1]=958
            for i in range(n-2,-1,-1): slots[i]=min(slots[i],slots[i+1]-gap)
        if slots[0]<42:
            shift=42-slots[0]
            slots=[y+shift for y in slots]
        endpoint=245 if side=='l' else 755
        for (num,pid,name,x,y),slot in zip(rows,slots):
            paths.append(f'<path class="plate-leader" d="M {x:g} {y:g} L {endpoint} {slot:.1f}"/><circle class="plate-anchor" cx="{x:g}" cy="{y:g}" r="4"/><text class="plate-mobile-marker" x="{x:g}" y="{y-8:g}" text-anchor="middle">{num:02d}</text>')
            labels.append(f'<span class="plate-callout {"left" if side=="l" else "right"}" '
                f'title="{E(name)}" style="top:{slot/10:.2f}%">{E(name)}</span>')
    mobile_key='<ol class="plate-mobile-key" aria-label="Numbered structure labels">'+''.join(f'<li><b>{num:02d}</b>{E(name)}</li>' for num,_,name,_,_ in pins)+'</ol>'
    return f'<svg class="plate-annotations" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">{"".join(paths)}</svg>{"".join(labels)}',len(pins),mobile_key

def photo_figure(o,image,stage_note=''):
    relative=f'../../img/medium/{Path(image).stem}.webp?v=1'
    overlay,count,mobile_key=photo_annotations(o,image)
    dimensions_html=dimensions(f'medium/{Path(image).stem}.webp')
    alt=f'Digital educational or regional anatomy illustration for {o["title"]}; {stage_note}'
    if count:
        caption=f'Thin leader lines label {count} visible structures on this teaching plate. {stage_note}'.strip()
    else:
        caption=f'Regional teaching illustration; individual structures are not separately pinned on this image. {stage_note}'.strip()
    return (f'<figure class="plate"><div class="plate-visual{" annotated" if count else ""}">'
            f'<img src="{E(relative)}" alt="{E(alt)}" {dimensions_html} loading="eager" fetchpriority="high" decoding="async">'
            f'{overlay}</div>{mobile_key}<figcaption>{E(caption)}</figcaption></figure>')

def part_block(items,o,start=1):
    chunks=[]
    for n,(pid,p) in enumerate(items,start):
        term=p.get('l','')
        label='' if not term or term==p['n'] else f'<small>{E(term)}</small>'
        source,point,kind,ref=part_plate(o,pid,p)
        file=Path(source).stem
        thumbnail=f'../../img/thumb/{file}.webp'
        full=f'../../img/webp/{file}.webp'
        placed=point is not None
        context_only=bool(p.get('contextOnly'))
        position=(f' data-point-x="{point[0]}" data-point-y="{point[1]}"' if placed else '')
        reference=f' data-reference-href="/learn/{E(S(ref))}/"' if ref else ''
        if context_only:
            context_status=('Micro pointer' if kind=='scope' else 'Reference pointer') if placed else 'Context only · no exact point'
            context_badge=('Tissue reference · pointer shown' if kind=='scope' else 'Reference plate · pointer shown') if placed else 'Context only · not individually marked'
            if placed:
                context_pointer_note='The pointer marks this feature on a related teaching plate only; it is not a pin on the chapter overview.'
            elif kind=='scope':
                context_pointer_note='Context only: this tissue-scale illustration does not individually distinguish the named feature; no pointer is drawn.'
            elif p.get('referencePlate'):
                context_pointer_note='Reference only: this related illustration does not separately mark the named feature; no exact pointer is drawn.'
            else:
                context_pointer_note='Context only: no supplied image shows the named entry as a distinct, identifiable feature; no pointer is drawn.'
            context_attrs=(f' data-context-only="true" data-context-label="{E(context_badge)}" '
                           f'data-preview-note="{E(context_pointer_note)}"')
            context_status_html=f'<span class="part-context-status">{E(context_status)}</span>'
            context_section_attr=' data-context-only="true"'
        else:
            context_attrs=''
            context_status_html=''
            context_section_attr=''
        alt=(f'Tissue-level educational cutaway for {p["n"]}' if kind=='scope' and placed else
             f'Relevant tissue-level illustration for {p["n"]}; individual structure not singled out' if kind=='scope' else
             f'Digital alveolar teaching illustration showing {p["n"]}' if kind=='micro' else
             f'Detail on the {ORGANS[ref]["title"]} teaching plate: {p["n"]}' if placed and ref else
             f'Visible structure on the {o["title"]} teaching plate: {p["n"]}' if placed else
             f'Regional reference plate for {ORGANS[ref]["title"] if ref else o["title"]}; {p["n"]} is not separately marked')
        scope=(f' data-overview-src="../../img/webp/{E(Path(o["photo"]["file"]).stem)}.webp" '
               f'data-lens-title="{E(MICRO_LENS[p["microLens"]]["title"])}" '
               f'data-source-url="{E(MICRO_LENS[p["microLens"]]["source"])}"'
               + (f' data-origin-x="{p["microOrigin"][0]}" data-origin-y="{p["microOrigin"][1]}"' if p.get('microOrigin') else '')
               if kind=='scope' else '')
        thumbnail_html=(f'<button type="button" class="reading-mini-trigger" data-plate-preview '
          f'data-plate-src="{E(full)}" data-part-name="{E(p["n"])}" '
          f'data-preview-kind="{kind}" data-preview-context="{str(not placed).lower()}"{position}{reference}{scope}{context_attrs} '
          f'aria-label="{"Open context-only reference for " if context_only and not placed else "Enlarge anatomy image for "}{E(p["n"])}">'
          f'<img src="{E(thumbnail)}" alt="{E(alt)}" {dimensions("thumb/"+file+".webp")} loading="lazy" decoding="async" '
          f'style="object-position:{(point[0]/10 if placed else 50):.1f}% {(point[1]/10 if placed else 50):.1f}%"></button>')
        gallery_note=next((a['note'] for a in o.get('visualGallery',[]) if Path(a['file']).stem==Path(source).stem),'Marked with a precision pointer on the corresponding developmental or regional anatomy plate.') if o.get('visualGallery') else ''
        context_note=f'<p class="repro-part-caption"><b>Illustrated plate</b> {E(gallery_note)}</p>' if gallery_note else ''
        title_group=f'<div class="part-title-wrap"><h3>{E(p["n"])}</h3>{context_status_html}</div>'
        chunks.append(f'<section class="part"{context_section_attr} id="part-{E(pid)}"><div class="part-head">{thumbnail_html}<span class="number">{n:02d}</span>{title_group}</div>{label}<p>{E(p.get("d",""))}</p><div class="detail"><p><b>What it does</b>{E(p.get("f",""))}</p><p><b>Clinical connection</b>{E(p.get("c",""))}</p>{context_note}</div></section>')
    return ''.join(chunks)

def lens_section(o,key=''):
    # A chapter that already renders its own tissue gallery (foundations) keeps the
    # microscope plates there, so the same picture is not repeated as a lens tile.
    if key=='tissuefoundations': return ''
    first={}
    for pid,p in o['parts'].items():
        if p.get('microLens') and p['microLens'] not in first:
            first[p['microLens']]=(pid,p)
    if not first: return ''
    cards=[]
    for lens_id,(pid,p) in sorted(first.items(),key=lambda item: 0 if item[0]=='alveolar' else 1):
        lens=MICRO_LENS[lens_id]
        file=Path(lens['file']).stem
        coords=p.get('microPoint')
        placed=coords is not None
        point=f' data-point-x="{coords[0]}" data-point-y="{coords[1]}"' if placed else ''
        origin=p.get('microOrigin')
        spot=f' data-origin-x="{origin[0]}" data-origin-y="{origin[1]}"' if origin else ''
        cards.append(f'<article class="lens-tile"><button type="button" class="reading-mini-trigger lens-tile-trigger" data-plate-preview '
                     f'data-part-name="{E(p["n"])}" data-preview-kind="scope" data-preview-context="{str(not placed).lower()}"{point}{spot} '
                     f'data-plate-src="../../img/webp/{E(file)}.webp" '
                     f'data-overview-src="../../img/webp/{E(Path(o["photo"]["file"]).stem)}.webp" '
                     f'data-lens-title="{E(lens["title"])}" data-source-url="{E(lens["source"])}" '
                     f'aria-label="Enlarge organ-to-lens view of {E(p["n"])}">'
                     f'<img src="../../img/thumb/{E(file)}.webp" {dimensions("thumb/"+file+".webp")} '
                     f'alt="Representative tissue cutaway for {E(p["n"])}" loading="lazy" decoding="async"></button>'
                     f'<div class="lens-tile-copy"><small>ORGAN → UNDER THE LENS</small><h3>{E(lens["title"])}</h3>'
                     f'<p>Tap to compare the organ region with a tissue-level teaching illustration.</p>'
                     f'<a href="#part-{E(pid)}">Read about {E(p["n"])} ↓</a></div></article>')
    return f'<section id="under-the-lens" class="content-section lens-reading"><div class="eyebrow">Microscopic-scale anatomy</div><h2>From organ to tissue</h2><p class="section-lead">These are educational cutaways, not literal magnifications of an organ pixel or laboratory slides. A ring marks the approximate tissue region; part-specific lines appear only where identifiable.</p><div class="lens-tiles">{"".join(cards)}</div></section>'

def dental_section(o):
    teeth=o.get('dental')
    if not teeth: return ''
    panels=[]
    for array,title,primary in [(teeth['permanent'],'Permanent · Universal #1–32 / FDI',False),(teeth['primary'],'Primary · Universal A–T / FDI',True)]:
        half=len(array)//2
        rows=[('Upper jaw · maxilla',array[:half]),('Lower jaw · mandible',list(reversed(array[half:])))]
        row_html=''
        for label,items in rows:
            links=''.join(f'<a class="tooth-position" href="#part-{E(t["id"])}" title="{E(t["n"])} · FDI {t["fdi"]}" aria-label="Read {E(t["n"])} FDI {t["fdi"]}"><b>{"#"+str(t["number"]) if "number" in t else E(t["letter"])}</b><small>{t["fdi"]}</small></a>' for t in items)
            row_html+=f'<div class="tooth-chart-line"><strong>{E(label)}</strong><div class="tooth-chart-row">{links}</div></div>'
        panels.append(f'<div class="tooth-chart-panel {"primary" if primary else "permanent"}"><h3>{E(title)}</h3><p>Viewed facing the patient: patient right appears on your left. Each code opens its named entry; on phones each jaw wraps into two patient-side rows. This is a positional chart, not a photo pin.</p>{row_html}</div>')
    models=[]
    for name,title in [('tooth-incisor','Cutting incisor'),('tooth-canine','Single-cusp canine'),('tooth-premolar','Crushing premolar'),('tooth-molar-section','Sectioned molar')]:
        models.append(f'<article class="tooth-type-card"><button type="button" class="reading-mini-trigger tooth-type-trigger" data-plate-preview data-preview-kind="region" data-preview-context="true" data-part-name="{E(title)} · representative model" data-plate-src="../../img/webp/{name}.webp" aria-label="Enlarge {E(title)} example"><img src="../../img/thumb/{name}.webp" {dimensions("thumb/"+name+".webp")} alt="Digital representative {E(title)} model" loading="lazy" decoding="async"></button><strong>{E(title)}</strong></article>')
    return '<section id="dental-chart" class="content-section dental-reading"><div class="eyebrow">Dentistry · tooth map</div><h2>Every position, not a false photo pin</h2><p class="section-lead">The charts name all 32 conventional permanent and 20 primary positions. Class images are representative adult models, not a unique picture of each tooth or a primary crown. Root and nerve anatomy varies.</p><div class="tooth-charts">'+''.join(panels)+'</div><h3 class="tooth-model-heading">Four representative tooth classes</h3><div class="tooth-type-grid">'+''.join(models)+f'</div><p><a href="../{E(S("skullface"))}/">Skull and jaw bones →</a> · <a href="../{E(S("trigeminalnerve"))}/">Tooth sensation CN V →</a> · <a href="../{E(S("facialnerve"))}/">Expression CN VII →</a></p></section>'

def foundation_section(key,o):
    if key=='bodyregions':
        panels=[]
        for group,title,cols in [('quadrants','Four quadrants',2),('nine','Nine regions',3)]:
            cells=''.join(f'<a href="#part-{E(pid)}">{E(label)}</a>' for pid,label in o['regionMaps'][group])
            panels.append(f'<article class="foundation-panel"><h3>{title}</h3><div class="foundation-chart {"four" if cols==2 else "nine"}">{cells}</div></article>')
        return '<section id="region-chart" class="content-section foundation-reading"><div class="eyebrow">Clinical orientation · not organ localization</div><h2>Map abdominal surface regions</h2><p class="section-lead">Viewed facing the patient: patient right is on your left. The divisions are conceptual and not exact organ boundaries. Select a region to read its entry.</p><div class="foundation-pair">'+''.join(panels)+'</div></section>'
    if key=='tissuefoundations':
        cards=[]
        for name,file,note in [('Epithelial','foundation-epithelium','Simple columnar example'),('Connective','foundation-connective','Loose areolar example'),('Muscle','foundation-skeletal-muscle','Skeletal muscle example'),('Nervous','foundation-neural','Multipolar neuron model')]:
            cards.append(f'<article class="foundation-panel"><button type="button" class="reading-mini-trigger foundation-image" data-plate-preview data-plate-src="../../img/webp/{file}.webp" data-part-name="{name} tissue · teaching cutaway" data-preview-kind="region" data-preview-context="true" aria-label="Enlarge {name} tissue teaching model"><img src="../../img/thumb/{file}.webp" {dimensions("thumb/"+file+".webp")} alt="Digital {name.lower()} tissue teaching cutaway" loading="lazy" decoding="async"></button><h3>{name}</h3><p>{note}</p></article>')
        return '<section id="tissue-gallery" class="content-section foundation-reading"><div class="eyebrow">Cell and tissue scale</div><h2>Four different tissue families</h2><p class="section-lead">Digital microscopic-scale teaching cutaways, not real histology slides. Each plate shows a particular example, not every subtype.</p><div class="foundation-tissue-grid">'+''.join(cards)+'</div></section>'
    return ''

LIFE_PATH=['spermanatomy','oocyteanatomy','fertilization','cleavageblastocyst','implantation','placentaanatomy','embryodevelopment','fetaldevelopment','laborfirststage','laborsecondstage','laborthirdstage']
LIFE_LABELS=['Sperm cell','Egg / oocyte','Fertilization','Early divisions','Implantation','Placenta','Embryo','Fetus','Labor 1 · cervix','Labor 2 · baby','Labor 3 · placenta']
def reproduction_section(key):
    if key not in LIFE_PATH: return ''
    cards=[]
    for i,(slug,label) in enumerate(zip(LIFE_PATH,LIFE_LABELS),1):
        file=Path(ORGANS[slug]['photo']['file']).stem+'.webp'
        current=' aria-current="page"' if slug==key else ''
        cards.append(f'<a class="repro-stage {"selected" if slug==key else ""}" href="../{E(S(slug))}/"{current}><img src="../../img/thumb/{E(file)}" {dimensions("thumb/"+file)} alt="Regional educational context for {E(label)}" loading="lazy" decoding="async"><span><small>{i:02d} / 11</small><strong>{E(label)}</strong></span></a>')
    return '<section id="repro-path" class="content-section repro-reading"><div class="eyebrow">Gametes to birth · separate chapters</div><h2>Follow every stage independently</h2><p class="section-lead">Sperm and egg are separate branches before fertilization. Obstetric gestational weeks are usually counted from the last menstrual period, roughly two weeks before conception. Digital labor-stage illustrations model separate moments, not clinical birth photographs or patient measurements.</p><nav class="repro-timeline" aria-label="Conception and childbirth study pathway">'+''.join(cards)+'</nav></section>'

def repro_gallery(o):
    if not o.get('visualGallery'): return ''
    cards=[]
    for n,a in enumerate(o['visualGallery'],1):
        stem=Path(a['file']).stem;thumb=f'../../img/thumb/{stem}.webp';full=f'../../img/webp/{stem}.webp'
        cards.append(f'<figure class="repro-gallery-card"><button type="button" class="repro-gallery-trigger" data-plate-preview data-plate-src="{E(full)}" data-part-name="{E(a["title"])}" data-preview-kind="region" data-preview-context="true" data-preview-note="{E(a["note"])}" aria-label="Enlarge {E(a["title"])}"><img src="{E(thumb)}" {dimensions("thumb/"+stem+".webp")} alt="Digital educational illustration: {E(a["title"])}" loading="lazy" decoding="async"><span aria-hidden="true">⤢</span></button><figcaption><small>{n:02d} / {len(o["visualGallery"])}</small><strong>{E(a["title"])}</strong><p>{E(a["note"])}</p></figcaption></figure>')
    return '<section id="repro-gallery" class="content-section repro-gallery"><div class="eyebrow">Stage-specific picture library</div><h2>See the anatomy at the right scale</h2><p class="section-lead">Tap an image to enlarge and tap again to close. These are digital educational models, not microscope photos, measured ultrasounds, clinical birth images or exact developmental clocks.</p><div class="repro-gallery-grid">'+''.join(cards)+'</div></section>'

def article(key,o):
    seo_slug=S(key)
    title=GUIDES[key]['title']
    desc=GUIDES[key]['description']
    h1_title=GUIDES[key].get('h1') or title
    lead_text=GUIDES[key].get('lead') or desc
    overview_paras=GUIDES[key].get('overview') or [o['summary']]
    system=SYSTEMS[o['system']]['name']
    image=o.get('photo',{}).get('file','')
    img='/img/webp/'+Path(image).stem+'.webp' if image else ''
    items=list(o['parts'].items());pinned=[x for x in items if not x[1].get('contextOnly')];deep=[x for x in items if x[1].get('contextOnly')]
    crumb=[('Home','/'),('Study guides','/learn/'),(o['title'],f'/learn/{seo_slug}/')]
    opening=f'<nav class="crumb shell" aria-label="Breadcrumb"><a href="../../">Home</a><i>/</i><a href="../">Study guides</a><i>/</i><span>{E(o["title"])}</span></nav><section class="shell hero article-hero"><div class="eyebrow">{E(system)} · illustrated anatomy</div><h1>{E(h1_title)}</h1><p>{E(lead_text)}</p><div class="action-row"><a class="button" href="../../{E(seo_slug)}/">Open interactive atlas ↗</a><a class="button alt" href="#parts">Read the structures ↓</a></div><p class="byline">Corpus educational reference · {len(items)} documented study entries · Updated {GUIDES[key]["updated"]}</p></section>'
    stage_note=o.get('photo',{}).get('notes','') if key in LIFE_PATH else ''
    photo=photo_figure(o,image,stage_note) if img else ''
    facts=[('Body system',system),('Location',o.get('region','')),('Blood supply',o.get('blood','')),('Innervation',o.get('nerve',''))]
    facts_html='<div class="facts">'+''.join(f'<div class="fact"><b>{E(k)}</b><span>{E(v)}</span></div>' for k,v in facts)+'</div>'
    pinned_html=(f'<section id="parts" class="content-section"><div class="eyebrow">Illustrated structures</div><h2>Read the anatomy, part by part</h2><p class="section-lead">These {len(pinned)} structures describe anatomy related to the chapter’s regional illustration. Each entry separates location, function and a clinical point.</p><div class="part-list">{part_block(pinned,o)}</div></section>' if pinned else '')
    deep_refs=list(dict.fromkeys(p.get('deepRef') for _,p in deep if p.get('deepRef') in ORGANS and p.get('deepRef')!=key))
    deep_links=('Related deep chapters: '+', '.join(f'<a href="../{E(S(ref))}/">{E(ORGANS[ref]["title"])}</a>' for ref in deep_refs[:5])+'.') if deep_refs else ''
    deep_label='Stage anatomy and developmental milestones' if key in LIFE_PATH else ('Terminology and study entries' if o['system']=='foundations' else 'Deeper structures and tissue layers')
    deep_intro=(f'These {len(deep)} anatomy and development entries explain each stage without placing false pointers on an illustrative context plate.' if key in LIFE_PATH else (f'These {len(deep)} reference concepts are explained without pretending they are visible features on a body photograph.' if o['system']=='foundations' and not pinned else f'These {len(deep)} additional entries give anatomical context. They are deliberately not assigned a photographic pin on the regional image.'))
    deep_html=(f'<section id="{("deep" if pinned else "parts")}" class="content-section"><div class="eyebrow">Beyond the visible plate</div><h2>{deep_label}</h2><p class="section-lead">{deep_intro}</p>{f"<p class=note>{deep_links}</p>" if deep_links else ""}<div class="part-list">{part_block(deep,o,len(pinned)+1)}</div></section>' if deep else '')
    micro_html=lens_section(o,key)
    dental_html=dental_section(o)
    foundation_html=foundation_section(key,o)
    reproduction_html=reproduction_section(key)
    repro_gallery_html=repro_gallery(o)
    skull_html=''
    if key=='skullface':
        skull_cards=[]
        for file,view_title,view_description in (
            ('skull-face-anterior','Anterior skull · surface bones','Front view identifies the frontal bone, orbits, nasal bones, zygomatic arches, maxillae, and mandible with precision anatomical markers.'),
            ('skull-face-medial','Medial skull · sagittal cutaway','Sagittal section reveals the sphenoid body, ethmoid perpendicular plate, vomer, palatine bones, inferior nasal concha, and internal cranial vault.')):
            skull_cards.append(f'<article class="skull-guide-card"><button type="button" class="reading-mini-trigger skull-view-trigger" data-plate-preview data-preview-kind="region" data-preview-context="true" data-part-name="{E(view_title)}" data-plate-src="../../img/webp/{file}.webp" aria-label="Enlarge {E(view_title)}"><img src="../../img/thumb/{file}.webp" {dimensions("thumb/"+file+".webp")} alt="{E(view_title)} educational digital skull illustration" loading="lazy" decoding="async"></button><div><h3>{E(view_title)}</h3><p>{E(view_description)}</p></div></article>')
        skull_html='<section id="skull-views" class="content-section skull-reading"><div class="eyebrow">Skull perspectives</div><h2>14 facial + 8 cranial bones</h2><p class="section-lead">Compare the anterior facial skeleton and the medial sagittal cutaway to trace all 22 skull bones, sutures, nasal septum components, and associated hyoid and middle-ear ossicles.</p><div class="skull-reading-grid">'+''.join(skull_cards)+f'</div><p><a href="../{E(S("skeleton"))}/">See all 206 adult bones →</a> · <a href="../{E(S("facialnerve"))}/">Facial nerve CN VII →</a> · <a href="../{E(S("trigeminalnerve"))}/">Facial sensation CN V →</a></p></section>'
    related=list(dict.fromkeys(r for r in EXTRA_RELATIONS.get(key,[])+o.get('related',[]) if r in ORGANS and r!=key))[:4]
    related_cards=''.join(
        f'<a class="related-card" href="../{E(S(ref))}/">'
        f'<img src="../../img/thumb/{E(Path(ORGANS[ref]["photo"]["file"]).stem)}.webp" '
        f'{dimensions("thumb/"+Path(ORGANS[ref]["photo"]["file"]).stem+".webp")} '
        f'alt="Digital educational or regional context image for {E(ORGANS[ref]["title"])}" loading="lazy" decoding="async">'
        f'<span><strong>{E(ORGANS[ref]["title"])}</strong><small>{E(ORGANS[ref].get("blurb",""))}</small></span>'
        f'<b aria-hidden="true">↗</b></a>' for ref in related)
    related_html=f'<section id="related" class="content-section related-section"><div class="eyebrow">Keep exploring</div><h2>Related anatomy guides</h2><p class="section-lead">Follow these connected structures and body systems in the illustrated atlas.</p><div class="related-grid">{related_cards}</div></section>'
    source_urls=[]
    for source in [STANDARD,SOURCES.get(key)]+list((o.get('study') or {}).get('sources',[]))+[MICRO_LENS[p['microLens']]['source'] for p in o['parts'].values() if p.get('microLens') in MICRO_LENS]:
        if source and source not in source_urls: source_urls.append(source)
    source_list=''.join(f'<li><a href="{E(link)}" target="_blank" rel="noopener noreferrer">{E(urlparse(link).netloc.replace("www.",""))} ↗</a></li>' for link in source_urls)
    faq_items=''.join(f'<div class="qa-item"><h3>{E(row["question"])}</h3><p>{E(row["answer"])}</p></div>' for row in GUIDES[key]['questions'])
    faq_html=f'<section id="questions" class="content-section questions"><div class="eyebrow">Questions people ask</div><h2>Five questions about {E(o["title"])}</h2><p class="section-lead">Short answers grounded in the structures described above. Use the illustrated guide for anatomical context.</p><div class="qa-list">{faq_items}</div></section>'
    notes=f'<section id="sources" class="content-section sources"><div class="eyebrow">Reference desk</div><h2>Further reading</h2><p class="section-lead">General anatomy references and related source chapters for continued study. These links do not make the digital illustrations clinical images or certify every anatomical variant.</p><ul>{source_list}</ul><p class="disclaimer">This educational page is not medical advice and has not undergone formal clinical peer review. Spotted an error? <a href="../../about.html#contact">Contact the editor</a>.</p></section>'
    connect=f'<div class="end-link"><div><strong>See the structures in context</strong><p>{"Open the regional digital plate, study entries and a short self-test. Visible markers occur only for identifiable sperm and oocyte structures." if key in LIFE_PATH else "Open the realistic interactive plate, label lines, focus view and self-test."}</p></div><a class="button" href="../../{E(seo_slug)}/">Open interactive view →</a></div>'
    sidebar=f'<aside class="sidebar" aria-label="On this page"><div class="side-card"><h2>In this guide</h2><a href="#overview">Overview</a><a href="#parts">{("Illustrated structures ("+str(len(pinned))+")") if pinned else ("Study entries ("+str(len(deep))+")")}</a>'+(f'<a href="#deep">Deep study notes ({len(deep)})</a>' if deep and pinned else '')+('<a href="#under-the-lens">Under the lens</a>' if micro_html else '')+('<a href="#skull-views">Skull perspectives</a>' if skull_html else '')+('<a href="#dental-chart">Tooth charts</a>' if dental_html else '')+('<a href="#region-chart">Region charts</a>' if key=='bodyregions' else '')+('<a href="#tissue-gallery">Four tissue images</a>' if key=='tissuefoundations' else '')+('<a href="#repro-path">Conception to birth path</a>' if reproduction_html else '')+('<a href="#repro-gallery">Picture library</a>' if repro_gallery_html else '')+'<a href="#questions">Five questions &amp; answers</a><a href="#related">Related guides</a><a href="#sources">Further reading</a></div><div class="side-card"><div class="count">20+</div><p>Documented anatomy and developmental entries in every Corpus chapter. Images are orientation aids, not clinical evidence.</p></div></aside>'
    overview_gap=' style="margin-top:14px"'
    overview_html=''.join(f'<p class="intro-text"{overview_gap if idx>0 else ""}>{E(para)}</p>' for idx,para in enumerate(overview_paras))
    rel_inline=', '.join(f'<a href="../{E(S(ref))}/">{E(ORGANS[ref]["title"])}</a>' for ref in related[:3])
    overview_rel=(f'<p class="note" style="margin-top:14px">Connected study pathways in this atlas: {rel_inline}.</p>' if rel_inline else '')
    body='<div class="reading-track" aria-hidden="true"><span id="reading-progress"></span></div>'+opening+f'<div class="shell article-grid"><main id="content">{photo}<section id="overview"><div class="eyebrow">Overview</div><h2>How this part of the body works</h2>{overview_html}{overview_rel}{facts_html}</section>{micro_html}{skull_html}{dental_html}{foundation_html}{reproduction_html}{repro_gallery_html}{pinned_html}{deep_html}{faq_html}{related_html}{notes}{connect}</main>{sidebar}</div>'
    article_json=schema(f'/learn/{seo_slug}/',crumb,GUIDES[key]['questions'])
    kw_obj=GUIDES[key].get('keywords',{})
    kw_str=', '.join(dict.fromkeys([kw_obj.get('primary','')]+list(kw_obj.get('secondary',[]))+list(kw_obj.get('semantic',[]))[:4]))
    return document(title,desc,f'/learn/{seo_slug}/',body,depth=2,image=img,extra=article_json,keywords=kw_str).replace('<script defer src="../../corpus-bot.js?v=19"></script></body>','<script defer src="../../reading.js?v=33"></script><script defer src="../../preview.js?v=49"></script><script defer src="../../corpus-bot.js?v=19"></script></body>')

# Build every chapter from the exact atlas data. No automatic keyword stuffing or fabricated bylines.
learn=ROOT/'learn'
if (OUT / 'privacy.html').exists(): (OUT / 'privacy.html').unlink()
if (OUT / 'blog').exists(): shutil.rmtree(OUT / 'blog')
if learn.exists(): shutil.rmtree(learn)
for key,o in ORGANS.items(): write(learn/S(key)/'index.html',article(key,o))
groups=defaultdict(list)
for key,o in ORGANS.items():groups[o['system']].append((key,o))
order=['foundations','development','circulatory','respiratory','nervous','digestive','urinary','sensory','skeletal','muscular','female','male','endocrine','lymphatic','integumentary']
sections=[]
for syskey in order:
    if syskey not in groups: continue
    cards=''.join(f'<a class="hub-card" href="{E(S(key))}/"><img src="../img/thumb/{E(Path(o["photo"]["file"]).stem)}.webp" {dimensions("thumb/"+Path(o["photo"]["file"]).stem+".webp")} loading="lazy" decoding="async" alt="Illustration of {E(o["title"])}"><span class="copy"><small>{len(o["parts"])} documented parts</small><strong>{E(o["title"])}</strong><em>{E(o["blurb"])}</em></span></a>' for key,o in groups[syskey])
    sections.append(f'<section id="{E(syskey)}"><h2 class="group-title">{E(SYSTEMS[syskey]["name"])}</h2><div class="hub-grid">{cards}</div></section>')
system_links=''.join(f'<a href="#{E(syskey)}">{E(SYSTEMS[syskey]["name"])} <small>{len(groups[syskey])}</small></a>' for syskey in order if syskey in groups)
hub_body=(
    '<main id="content"><section class="shell hub-hero">'
    '<div class="hub-intro"><div class="eyebrow">Corpus / illustrated study guides</div>'
    '<h1>Human Anatomy Study Guides: 74 Illustrated Body Systems</h1>'
    f'<p>How do all {len(ORGANS)} regional and systemic chapters fit together inside one living body? Browse our complete library of illustrated human anatomy study guides below—each chapter pairs an interactive anatomical plate with three-paragraph physiological overviews, {sum(len(o["parts"]) for o in ORGANS.values()):,} documented part records, Latin terminology, clinical context, and five frequently asked study questions.</p>'
    '<div class="action-row"><a class="button" href="#all-guides">Explore study guides <span aria-hidden="true">↗</span></a>'
    '<a class="button alt" href="../body-map/">Open the body map</a></div>'
    f'<p class="byline">{len(ORGANS)} chapters <span aria-hidden="true">·</span> {sum(len(o["parts"]) for o in ORGANS.values()):,} documented parts <span aria-hidden="true">·</span> 15 integrated study groups</p></div>'
    f'<a class="hero-feature" href="{E(S("heart"))}/" aria-label="Read the featured heart anatomy study guide">'
    f'<span class="feature-top">Featured guide <span>01 / {len(ORGANS)}</span></span>'
    f'<span class="feature-visual"><img src="../img/thumb/heart.webp" {dimensions("thumb/heart.webp")} alt="Digital cross-section illustration of the human heart" fetchpriority="high" decoding="async"></span>'
    '<span class="feature-bottom"><span><strong>Inside the human heart</strong><small>Chambers · valves · coronary blood flow</small></span><b aria-hidden="true">↗</b></span></a></section>'
    '<div class="shell" id="all-guides"><nav class="system-index" aria-label="Browse guides by body system"><div class="system-index-head">'
    '<span class="eyebrow">Structured curriculum</span><h2>Browse all 74 guides by body system</h2><p>Jump directly to foundational terminology, embryonic and fetal development, or any major organ system below.</p>'
    '</div><div class="system-links">'+system_links+'</div></nav>'+''.join(sections)+'</div></main>'
)
# A planning map: natural search intent, not traffic or ranking claims.
with (ROOT/'seo-keyword-map.csv').open('w',newline='',encoding='utf-8') as fh:
    writer=csv.writer(fh,lineterminator='\n')
    writer.writerow(['chapter','url','primary_keyword','secondary_keywords','long_tail_keywords','semantic_terms','page_title_55','meta_description_155'])
    for key,o in ORGANS.items():
        kw=GUIDES[key].get('keywords',{})
        parts=([p['n'] for p in o['parts'].values() if not p.get('contextOnly')] or [p['n'] for p in o['parts'].values()])[:3]
        writer.writerow([
            key,
            f'/learn/{S(key)}/',
            kw.get('primary',PRIMARY.get(key,o['title'].replace(' — ', ' ').replace(' · ', ' ').lower()+' anatomy')),
            '; '.join(kw.get('secondary',parts)),
            '; '.join(kw.get('longTail',[])),
            '; '.join(kw.get('semantic',parts)),
            GUIDES[key]['title'],
            GUIDES[key]['description']
        ])

write(learn/'index.html',document('Human Anatomy Study Guides: 74 Illustrated Body Systems','Browse all 74 illustrated human anatomy study guides covering foundational terminology, organs, bones, muscles, nerves, microanatomy, and embryonic stages.','/learn/',hub_body,depth=1,extra=schema('/learn/',[('Home','/'),('Study guides','/learn/')])))

# ---------- Build Blog Hub (/blog/) & Individual Blog Articles (/blog/<slug>/) ----------
BLOG_DIR = ROOT / 'seo' / 'blogs'
BLOG_OUT = ROOT / 'blog'
if BLOG_OUT.exists(): shutil.rmtree(BLOG_OUT)
BLOG_POSTS = []
if BLOG_DIR.exists():
    for bp in sorted(BLOG_DIR.glob('*.json')):
        BLOG_POSTS.append(json.loads(bp.read_text(encoding='utf-8')))
BLOG_POSTS.sort(key=lambda item: (item.get('updated',''), item.get('slug','')), reverse=True)

# AdSense-facing editorial guardrails: ship a complete, substantive, reference-linked
# library rather than counting placeholder or near-empty pages as articles.
if len(BLOG_POSTS) != 15:
    raise SystemExit(f'Expected exactly 15 published blog articles, found {len(BLOG_POSTS)}')
_seen_blog_slugs = set()
for _post in BLOG_POSTS:
    _slug = _post.get('slug', '')
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', _slug) or _slug in _seen_blog_slugs:
        raise SystemExit(f'Invalid or duplicate blog slug: {_slug!r}')
    _seen_blog_slugs.add(_slug)
    if not 35 <= len(_post.get('title', '')) <= 55 or not 120 <= len(_post.get('description', '')) <= 160:
        raise SystemExit(f'{_slug}: use a clear 35–55 character title and a 120–160 character description')
    try:
        date.fromisoformat(_post.get('updated', ''))
    except (TypeError, ValueError):
        raise SystemExit(f'{_slug}: updated must be an editorial date in YYYY-MM-DD format')
    if _post.get('relatedOrgan') not in ORGANS:
        raise SystemExit(f'{_slug}: relatedOrgan must match a real atlas chapter')
    if len(_post.get('questions') or []) != 5:
        raise SystemExit(f'{_slug}: exactly five original, visible question-and-answer pairs are required')
    if len(_post.get('takeaways') or []) < 3 or len(_post.get('sections') or []) < 2:
        raise SystemExit(f'{_slug}: key takeaways and multiple substantive sections are required')
    _article_text = ' '.join([
        _post.get('title', ''), _post.get('h1', ''), _post.get('description', ''),
        *(_post.get('takeaways') or []),
        *[s.get('heading', '') + ' ' + ' '.join(s.get('paragraphs') or []) + ' ' + ' '.join(s.get('bullets') or []) for s in (_post.get('sections') or [])],
        *[q.get('question', '') + ' ' + q.get('answer', '') for q in (_post.get('questions') or [])]
    ])
    if len(re.findall(r"\b[\w’'-]+\b", _article_text)) < 500:
        raise SystemExit(f'{_slug}: article needs at least 500 substantive words, excluding shared page chrome')
    _hero_stem = Path(_post.get('heroImage', '')).stem
    for _folder in ('webp', 'medium', 'thumb'):
        if not (ROOT / 'img' / _folder / f'{_hero_stem}.webp').is_file():
            raise SystemExit(f'{_slug}: missing {_folder} WebP hero asset for {_hero_stem}')
    _sources = _post.get('sources') or []
    if len(_sources) < 2:
        raise SystemExit(f'{_slug}: include at least two named references')
    for _source in _sources:
        _url = urlparse(_source.get('url', ''))
        if not _source.get('title') or _url.scheme != 'https' or not _url.netloc:
            raise SystemExit(f'{_slug}: every reference needs a title and HTTPS URL')

def build_blog_article(post):
    slug = post['slug']
    title = post['title']
    h1_title = post.get('h1') or title
    desc = post['description']
    cat = post.get('category', 'Anatomy · Study Article')
    updated = post.get('updated', CONTENT_UPDATED)
    read_time = post.get('readTime', '6 min read')
    rel_key = post.get('relatedOrgan', 'heart')
    if rel_key not in ORGANS: rel_key = 'heart'
    rel_organ = ORGANS[rel_key]
    hero_stem = Path(post.get('heroImage', 'heart.webp')).stem
    hero_dims = dimensions(f'medium/{hero_stem}.webp')
    hero_alt = post.get('heroAlt') or f'Anatomical illustration for {h1_title}'
    hero_cap = post.get('heroCaption') or f'Educational anatomy illustration accompanying {h1_title}.'

    crumb = f'<nav class="crumb shell" aria-label="Breadcrumb"><a href="../../">Home</a><i>/</i><a href="../">Blog</a><i>/</i><span>{E(h1_title)}</span></nav>'
    hero_sec = (
        f'<section class="shell hero article-hero"><div class="eyebrow">{E(cat)} · {E(read_time)}</div>'
        f'<h1>{E(h1_title)}</h1><p>{E(desc)}</p>'
        f'<div class="action-row"><a class="button" href="../../learn/{E(S(rel_key))}/">Open {E(rel_organ["title"])} study guide →</a>'
        f'<a class="button alt" href="../../{E(S(rel_key))}/">Interactive 3D/2D plate ↗</a></div>'
        f'<p class="byline">Corpus editorial reference · Updated {E(updated)}</p></section>'
    )
    hero_fig = (
        f'<figure class="plate"><div class="plate-visual">'
        f'<img src="../../img/medium/{E(hero_stem)}.webp?v=1" alt="{E(hero_alt)}" {hero_dims} loading="eager" fetchpriority="high" decoding="async">'
        f'</div><figcaption>{E(hero_cap)}</figcaption></figure>'
    )
    takeaways = post.get('takeaways') or []
    takeaways_html = ''
    if takeaways:
        items = ''.join(f'<li>{E(t)}</li>' for t in takeaways)
        takeaways_html = f'<section id="key-takeaways" class="blog-takeaways"><h2>Key takeaways</h2><ul>{items}</ul></section>'

    sec_html_list = []
    toc_links = []
    if takeaways:
        toc_links.append('<a href="#key-takeaways">Key takeaways</a>')
    for idx, s in enumerate(post.get('sections') or [], 1):
        sid = re.sub(r'[^a-z0-9-]+', '-', (s.get('id') or f'section-{idx}').lower()).strip('-') or f'section-{idx}'
        sh2 = s.get('heading', f'Section {idx}')
        toc_links.append(f'<a href="#{E(sid)}">{E(sh2)}</a>')
        sh3_html = f'<h3>{E(s["subheading"])}</h3>' if s.get('subheading') else ''
        paras_html = ''.join(f'<p>{E(p)}</p>' for p in (s.get('paragraphs') or []))
        bullets_html = ''
        if s.get('bullets'):
            bullets_html = '<ul>' + ''.join(f'<li>{E(b)}</li>' for b in s['bullets']) + '</ul>'
        img_html = ''
        if s.get('image'):
            s_stem = Path(s['image']).stem
            s_dims = dimensions(f'medium/{s_stem}.webp')
            s_alt = s.get('imageAlt') or f'Anatomical illustration for {sh2}'
            s_cap = s.get('imageCaption') or f'Educational anatomy plate for {sh2}.'
            img_html = f'<figure class="blog-sec-fig"><img src="../../img/medium/{E(s_stem)}.webp?v=1" alt="{E(s_alt)}" {s_dims} loading="lazy" decoding="async"><figcaption>{E(s_cap)}</figcaption></figure>'
        tbl_html = ''
        if s.get('table') and s['table'].get('headers') and s['table'].get('rows'):
            th = ''.join(f'<th>{E(h_col)}</th>' for h_col in s['table']['headers'])
            tr = ''.join('<tr>' + ''.join(f'<td>{E(c_col)}</td>' for c_col in row) + '</tr>' for row in s['table']['rows'])
            tbl_html = f'<div class="blog-table-wrap"><table class="blog-table"><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'
        sec_html_list.append(f'<section id="{E(sid)}" class="blog-sec"><h2>{E(sh2)}</h2>{sh3_html}{paras_html}{bullets_html}{img_html}{tbl_html}</section>')

    q_list = post.get('questions') or []
    faq_html = ''
    if q_list:
        toc_links.append('<a href="#questions">Frequently asked questions</a>')
        q_items = ''.join(f'<div class="qa-item"><h3>{E(q["question"])}</h3><p>{E(q["answer"])}</p></div>' for q in q_list)
        faq_html = f'<section id="questions" class="content-section questions"><div class="eyebrow">Questions people ask</div><h2>Frequently asked questions</h2><div class="qa-list">{q_items}</div></section>'

    sources = post.get('sources') or []
    source_html = ''
    if sources:
        toc_links.append('<a href="#sources">References and further reading</a>')
        source_links = ''.join(
            f'<li><a href="{E(item["url"])}" target="_blank" rel="noopener noreferrer">{E(item["title"])} ↗</a></li>'
            for item in sources
        )
        source_html = (
            f'<section id="sources" class="content-section sources"><div class="eyebrow">Editorial scope &amp; references</div>'
            f'<h2>References and further reading</h2>'
            f'<p class="disclaimer">This page is an anatomy-learning reference, not medical advice, diagnosis or treatment guidance. Individual anatomy and clinical questions require qualified professional context. Content was reviewed for this edition on {E(updated)}. <a href="../../about.html#contact">Send an editorial correction</a>.</p>'
            f'<ul>{source_links}</ul></section>'
        )

    rel_thumb = Path(rel_organ['photo']['file']).stem
    rel_dims = dimensions(f'thumb/{rel_thumb}.webp')
    connect_html = (
        f'<section id="related-atlas" class="content-section related-section">'
        f'<div class="eyebrow">Connected atlas chapter</div><h2>Study {E(rel_organ["title"])} in the interactive atlas</h2>'
        f'<div class="related-grid"><a class="related-card" href="../../learn/{E(S(rel_key))}/">'
        f'<img src="../../img/thumb/{E(rel_thumb)}.webp" {rel_dims} alt="Illustration of {E(rel_organ["title"])}" loading="lazy" decoding="async">'
        f'<span><strong>{E(rel_organ["title"])} ({E(rel_organ["latin"])})</strong><small>{E(rel_organ["blurb"])}</small></span><b aria-hidden="true">↗</b></a></div>'
        f'<p class="disclaimer" style="margin-top:16px">Educational reference only: this article is written for anatomy study and is not medical, diagnostic or treatment advice. <a href="../../about.html#contact">Contact the editorial desk</a>.</p>'
        f'</section>'
    )
    toc_links.append('<a href="#related-atlas">Connected atlas chapter</a>')
    sidebar = f'<aside class="sidebar" aria-label="On this page"><div class="side-card"><h2>In this article</h2>{"".join(toc_links)}</div><div class="side-card"><div class="count">Atlas</div><p>Connected to {len(ORGANS)} interactive chapters and {sum(len(o["parts"]) for o in ORGANS.values()):,} documented anatomical structures.</p></div></aside>'
    body = f'<div class="reading-track" aria-hidden="true"><span id="reading-progress"></span></div>{crumb}{hero_sec}<div class="shell article-grid"><main id="content">{hero_fig}{takeaways_html}{"".join(sec_html_list)}{faq_html}{source_html}{connect_html}</main>{sidebar}</div>'
    schema_objs = [
        {'@context':'https://schema.org','@type':'BlogPosting','headline':h1_title,'description':desc,'datePublished':updated,'dateModified':updated,'url':url(f'/blog/{slug}/')},
        {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':'Home','item':url('/')},
            {'@type':'ListItem','position':2,'name':'Blog','item':url('/blog/')},
            {'@type':'ListItem','position':3,'name':h1_title,'item':url(f'/blog/{slug}/')}
        ]}
    ]
    if q_list:
        schema_objs.append({
            '@context':'https://schema.org','@type':'FAQPage',
            'mainEntity':[{'@type':'Question','name':q['question'],'acceptedAnswer':{'@type':'Answer','text':q['answer']}} for q in q_list]
        })
    extra_json = '<script type="application/ld+json">' + json.dumps(schema_objs, separators=(',',':')).replace('<','\\u003c') + '</script>'
    return document(title, desc, f'/blog/{slug}/', body, depth=2, image=f'/img/webp/{hero_stem}.webp', extra=extra_json).replace('<script defer src="../../corpus-bot.js?v=19"></script></body>','<script defer src="../../reading.js?v=33"></script><script defer src="../../corpus-bot.js?v=19"></script></body>')

for post in BLOG_POSTS:
    write(BLOG_OUT / post['slug'] / 'index.html', build_blog_article(post))

blog_cards = ''.join(
    f'<a class="hub-card" href="{E(p["slug"])}/">'
    f'<img src="../img/thumb/{E(Path(p.get("heroImage","heart.webp")).stem)}.webp" {dimensions("thumb/"+Path(p.get("heroImage","heart.webp")).stem+".webp")} loading="lazy" decoding="async" alt="{E(p.get("heroAlt") or p["title"])}">'
    f'<span class="copy"><small>{E(p.get("category","Study Guide"))} · {E(p.get("readTime","6 min read"))}</small><strong>{E(p.get("displayTitle") or p["title"])}</strong><em>{E(p["description"])}</em></span></a>'
    for p in BLOG_POSTS
)
blog_hub_body = (
    '<main id="content"><section class="shell hub-hero">'
    '<div class="hub-intro"><div class="eyebrow">Corpus / anatomy blog &amp; study articles</div>'
    '<h1>In-depth anatomy articles, reference tables and exam guides.</h1>'
    '<p>Explore detailed, source-linked anatomy articles with clear explanations, study diagrams and practical reference tables—each connected to an illustrated chapter in the interactive atlas.</p>'
    '<div class="action-row"><a class="button" href="#articles-list">Browse articles <span aria-hidden="true">↓</span></a>'
    '<a class="button alt" href="../learn/">All 74 study guides →</a></div>'
    f'<p class="byline">{len(BLOG_POSTS)} published articles <span aria-hidden="true">·</span> Connected to {len(ORGANS)} interactive chapters</p></div>'
    + (
        f'<a class="hero-feature" href="{E(BLOG_POSTS[0]["slug"])}/" aria-label="Read featured article: {E(BLOG_POSTS[0].get("displayTitle") or BLOG_POSTS[0]["title"])}">'
        f'<span class="feature-top">Featured article <span>{E(BLOG_POSTS[0].get("readTime","8 min read"))}</span></span>'
        f'<span class="feature-visual"><img src="../img/thumb/{E(Path(BLOG_POSTS[0].get("heroImage","cranial.webp")).stem)}.webp" {dimensions("thumb/"+Path(BLOG_POSTS[0].get("heroImage","cranial.webp")).stem+".webp")} alt="{E(BLOG_POSTS[0].get("heroAlt") or BLOG_POSTS[0]["title"])}" fetchpriority="high" decoding="async"></span>'
        f'<span class="feature-bottom"><span><strong>{E(BLOG_POSTS[0].get("displayTitle") or BLOG_POSTS[0]["title"])}</strong><small>{E(BLOG_POSTS[0].get("category","Study Guide"))}</small></span><b aria-hidden="true">↗</b></span></a>'
        if BLOG_POSTS else ''
    )
    + '</section>'
    f'<div class="shell" id="articles-list" style="padding-bottom:64px"><section><h2 class="group-title">Latest anatomy study articles</h2><div class="hub-grid">{blog_cards}</div></section></div></main>'
)
write(BLOG_OUT / 'index.html', document('Human Anatomy Blog: Study Articles & Clinical Exam Maps', 'Read in-depth human anatomy study articles, cranial nerve tables, heart conduction guides, and clinical study notes connected to our 74 illustrated guides.', '/blog/', blog_hub_body, depth=1, extra=schema('/blog/', [('Home','/'),('Blog','/blog/')])))

contact_html=(f'<a href="mailto:{E(CONTACT)}">{E(CONTACT)}</a>' if CONTACT else 'A public publisher contact address has not yet been provided. The publisher must add one before a monetization application.')
about=f'''<main id="content" class="shell about-profile">
<section class="about-intro" aria-labelledby="about-title"><div class="about-intro-copy">
<div class="eyebrow">About us · Corpus Anatomy Atlas</div>
<h1 id="about-title">About Corpus Anatomy Atlas: Editorial Policy &amp; Approach</h1>
<p class="about-lead">Corpus Anatomy Atlas is a free, open-access educational reference built to help students, educators, and curious readers visualize how the human body is organized—from surface landmarks and gross organ systems down to microscopic functional units like the nephron, hepatic lobule, pulmonary acinus, and retinal layers.</p>
<div class="about-actions"><a class="button" href="./anatomy-quiz/">Try the interactive quiz →</a><a class="button alt" href="./learn/">Explore all 74 study guides →</a></div></div>
<aside class="about-identity" aria-label="Our purpose"><span class="about-identity-mark" aria-hidden="true">♥</span><small>OUR EDUCATIONAL MISSION</small><h2>See the structure.<br>Understand the mechanism.</h2><p>Every chapter connects visual spatial relationships with Latin nomenclature, physiological function, and clinical reasoning.</p><span class="about-identity-foot">Free to explore · 74 chapters · 1,586 structures</span></aside></section>
<div class="about-numbers" aria-label="Atlas highlights"><span><b>{len(ORGANS)}</b> study chapters</span><span><b>206</b> named adult bones</span><span><b>312</b> skeletal muscles</span></div>
<section class="about-method" aria-labelledby="method-heading"><div class="eyebrow">How to study with Corpus</div><h2 id="method-heading">Three connected steps from visual orientation to active recall.</h2><div class="about-method-grid"><article><span>01 / ORIENT</span><h3>Locate landmarks on the anatomical plate.</h3><p>Start with the interactive body map or open any chapter plate. Thin leader lines identify structures that are directly visible in that view, while deeper or microscopic structures are clearly separated as context notes.</p></article><article><span>02 / UNDERSTAND</span><h3>Connect gross anatomy to physiology and microanatomy.</h3><p>Each guide explains regional boundaries, blood supply, innervation, physiological mechanisms, and clinical relevance—supported by 40 dedicated microscopic tissue cutaways.</p></article><article><span>03 / RECALL</span><h3>Test yourself with visual and clinical questions.</h3><p>Reinforce what you have studied using five chapter-specific frequently asked questions, multiple-choice clinical prompts, and spot-the-structure visual rounds.</p></article></div></section>
<section class="about-editorial" aria-labelledby="standards-heading"><div><div class="eyebrow">Editorial standards &amp; sources</div><h2 id="standards-heading">Scientific accuracy grounded in public anatomical references.</h2></div><div><p>All anatomical descriptions, directional terminology, and physiological explanations in Corpus Anatomy Atlas are cross-checked against standard open educational and government references, including <strong>OpenStax Anatomy and Physiology</strong>, <strong>NCBI Bookshelf (StatPearls)</strong>, and <strong>MedlinePlus</strong>. Our illustrations are educational models created to clarify spatial relationships and are not clinical scans, histology slides, or patient photographs.</p><p>We distinguish clearly between structures directly pinned on an overview plate and deeper unpictured structures included for complete systemic understanding.</p></section>
<section class="about-contact" id="contact"><div><div class="eyebrow">Corrections &amp; editorial contact</div><h2>Help us keep the atlas accurate and clear.</h2><p>If you spot a typographical error, an anatomical label that could be clearer, or an accessibility improvement, please write to {contact_html} with the chapter name and structure so we can review and update the guide.</p></div><a class="button" href="mailto:{E(CONTACT)}">Email the editor ↗</a></section>
<section class="about-boundaries" aria-labelledby="boundaries-heading"><h2 id="boundaries-heading">An educational reference, not medical advice.</h2><p>Corpus Anatomy Atlas is designed strictly for anatomical and physiological education. It is not a diagnostic tool, treatment guide, or substitute for professional medical care; personal health questions should always be directed to a qualified healthcare clinician.</p></section>
</main>''' 

write(ROOT/'about.html',document('About Corpus Anatomy Atlas: Editorial Policy & Approach','Learn how Corpus Anatomy Atlas builds illustrated human anatomy study guides, tissue-scale cutaways, interactive maps, and transparent editorial standards.','/about.html',about,extra=schema('/about.html',[('Home','/'),('About','/about.html')])))
privacy=f'''<main id="content" class="shell policy"><div class="eyebrow">Privacy &amp; data transparency</div><h1>Privacy Policy &amp; Cookie Disclosure</h1><p>Last updated {PRIVACY_UPDATED}. Editorial &amp; privacy contact: {contact_html}</p><h2>How Corpus Anatomy Atlas works in your browser</h2><p>Corpus Anatomy Atlas is an open educational website that requires no user registration, login account, or personal profile. Interactive anatomical diagrams, instant search across our 74 study guides, and self-test quizzes run directly inside your web browser. Standard web hosting logs (such as IP address, browser user-agent, timestamp, and requested page URL) are processed by our hosting provider to deliver pages reliably and protect site security.</p><h2>Atlas Q&amp;A, optional AI answers, and external search</h2><p>The assistant searches Atlas material first, including a server-side module of 5,000 Atlas-grounded Q&amp;A records that is not copied into static website pages. A question answered by this local Atlas knowledge base is processed by the site's function and is not sent to an external search provider. External web search is currently not enabled because no provider credential is configured; an out-of-set question is not used to scrape Google or arbitrary websites, and the assistant may say it cannot verify an answer. If an optional server-side AI/search provider is enabled in the future, the question and selected response language may be sent to that provider under its terms and retention rules. For non-English requests, the assistant may also send the question or answer text to a translation service for translation under that service's own terms. Please do not submit names, identifying details, or sensitive personal/medical information. Provider credentials, if configured, are kept on the server and are not included in public JavaScript. The site does not intentionally write the question or generated answer to its function audit log; when an external provider is used, the server may record an audit ID, timestamp, model name, and public source titles/URLs returned by the provider. Hosting and security logs may separately include network information such as an IP address. External source names and links are not displayed in assistant answers; internal Atlas links are shown when relevant. The assistant uses reviewed Atlas images only and does not create new anatomy illustrations for answers. AI-generated answers can be incomplete or wrong and are for general education, not diagnosis or treatment.</p><h2>Cookies &amp; Google AdSense advertising disclosure</h2><p>Third-party vendors, including Google, use cookies (such as the Google DoubleClick DART cookie and AdSense cookies) to serve ads based on a user's prior visits to this website or other websites on the internet. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the internet.</p><p>Users may opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com/" rel="noopener noreferrer">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer">www.aboutads.info</a>. To learn more about how Google processes data in advertising products, please review <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>. Where required by applicable law (including for visitors in the European Economic Area, the United Kingdom, and Switzerland), consent choices are presented via a Google-certified consent management platform (CMP).</p><h2>External educational references</h2><p>Our study guides include further-reading links to trusted public educational resources such as OpenStax Anatomy and Physiology, NCBI Bookshelf, and MedlinePlus. When you follow an external link, that destination website is governed by its own privacy policy and cookie practices.</p><h2>Contact for privacy questions</h2><p>If you have any questions about this privacy policy or data practices on Corpus Anatomy Atlas, please contact {contact_html}.</p></main>'''
if (ROOT/'privacy.html').exists(): (ROOT/'privacy.html').unlink()
write(ROOT/'privacy-policy'/'index.html',document('Privacy Policy & Cookie Disclosure | Corpus Atlas Guide','Read the Corpus Anatomy Atlas privacy policy covering browser-based tools, optional AI search, hosting logs, external references, and advertising.','/privacy-policy/',privacy,depth=1,extra=schema('/privacy-policy/',[('Home','/'),('Privacy Policy','/privacy-policy/')])))
not_found='<main id="content" class="shell policy"><div class="eyebrow">404 · Page not found</div><h1>Page Not Found: Browse All Human Anatomy Guides</h1><p>The anatomy page or study guide URL you requested could not be found or may have moved to a new chapter address. Use the links below to browse all 74 illustrated human anatomy study guides or return to the interactive body map.</p><p><a class="button" href="/learn/">Browse all 74 study guides →</a> <a class="button alt" href="/">Return to interactive atlas →</a></p></main>'
write(ROOT/'404.html',document('Page Not Found: Browse All Human Anatomy Guides | Atlas','The requested human anatomy page could not be found. Return to the interactive Corpus Anatomy Atlas or browse our 74 illustrated organ system study guides.','/404.html',not_found))

# Keep the existing app as the interactive edition, linked to the search-readable edition.
html=(ROOT/'index.html').read_text()
html=re.sub(r'<link rel="canonical" href="[^"]*">','',html)
html=re.sub(r'<link rel="publisher" href="[^"]*">','',html)
html=re.sub(r'<meta property="og:url" content="[^"]*">','',html)
html=re.sub(r'<meta name="robots" content="[^"]*">','',html)
if BASE:
    html=html.replace('</head>',f'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="publisher" href="{E(BASE)}/"><link rel="canonical" href="{E(BASE)}/"><meta property="og:url" content="{E(BASE)}/"></head>')
else:
    html=html.replace('</head>','<meta name="robots" content="noindex,follow"></head>')
write(ROOT/'index.html',html)

# Generate dedicated hashless SPA section shells with exact 55-char titles, 155-char descriptions & self-referencing canonicals
SPA_SECTIONS = {
    'body-map': (
        'Interactive Human Body Map — Anterior & Posterior Atlas',
        'Click any organ on the interactive anterior and posterior human body map to inspect realistic 3D anatomical renders, regional landmarks, and study lessons.',
        'interactive human body map, anterior and posterior body atlas, 3D human organs map, surface anatomy landmarks, clickable human body diagram',
        'Interactive Human Body Map: Anterior & Posterior Organs'
    ),
    'all-organs': (
        'All 74 Human Organs & Anatomy Chapters — Complete Index',
        'Browse all 74 illustrated human anatomy chapters by body system or search 1,586 anatomical structures with Latin terms, functions, and clinical correlates.',
        'all human organs list, 74 human anatomy chapters, human organ systems directory, anatomical structures index, Latin anatomy terms',
        'All 74 Human Organs & Illustrated Anatomy Study Chapters'
    ),
    'male-anatomy': (
        'Male Human Anatomy — Full-Body Surface, Organs & Pelvis',
        'Study male human anatomy across full-body surface landmarks, internal thoracic and abdominal organs, male pelvic floor muscles, and reproductive functions.',
        'male human anatomy, male surface anatomy, male internal organs, male pelvic floor muscles, male reproductive anatomy, male ecorche',
        'Male Human Anatomy: Surface Landmarks, Organs & Pelvis'
    ),
    'female-anatomy': (
        'Female Human Anatomy — Surface, Organs & Pelvic Regions',
        'Explore female human anatomy with full-body surface landmarks, internal organs, mammary and pelvic floor structures, reproductive organs, and study guides.',
        'female human anatomy, female surface anatomy, female internal organs, female pelvic floor anatomy, female reproductive system, mammary anatomy',
        'Female Human Anatomy: Surface, Organs & Pelvic Regions'
    ),
    'anatomy-quiz': (
        'Interactive Human Anatomy Quiz — Self-Test & Spot Exams',
        'Test your human anatomy mastery with 446 multiple-choice and visual spot-identification exam questions covering all organ systems, bones, muscles & nerves.',
        'interactive human anatomy quiz, anatomy spot exam questions, medical student anatomy self-test, organ identification quiz, skeletal and muscular quiz',
        'Interactive Human Anatomy Quiz & Visual Spot Exam'
    ),
    'deep-anatomy-study-path': (
        'Deep Human Anatomy Study Path — Microanatomy & Circuits',
        'Master 17 advanced microanatomy and neurovascular chapters covering the skull, teeth, nephron, retina, cranial nerves, meninges, alveoli, and liver lobule.',
        'deep human anatomy, microscopic anatomy study guide, nephron filtration, retinal layers, brachial plexus, cranial nerves V and VII, hepatic lobule',
        'Deep Human Anatomy Study Path: Microanatomy & Circuits'
    ),
    'body-systems': (
        '12 Human Body Systems — Complete Organ System Reference',
        'Explore all 12 human body systems including cardiovascular, respiratory, nervous, digestive, renal, endocrine, musculoskeletal, and reproductive divisions.',
        '12 human body systems, human organ systems overview, cardiovascular and respiratory systems, nervous and endocrine systems, musculoskeletal anatomy',
        '12 Human Body Systems: Complete Organ System Reference'
    ),
    'anatomical-layers': (
        'Human Anatomical Layers Explorer — Skin, Muscle & Bones',
        'Peel through five aligned human anatomical layers from surface skin to superficial muscles, 206 skeletal bones, peripheral nerves, and major blood vessels.',
        'human anatomical layers explorer, peelable human body layers, skin muscle skeleton nerves vessels, interactive dissection layers, male and female anatomy layers',
        'Human Anatomical Layers Explorer: Peel Skin, Muscle & Bone'
    ),
    'gynecology-study-path': (
        'Gynecology & Female Pelvic Anatomy — 6-Part Study Guide',
        'Follow a structured 6-chapter female pelvic anatomy study path covering the uterus, cervix, ovaries, fallopian tubes, vagina, vulva, and pelvic floor care.',
        'gynecology anatomy study guide, female pelvic anatomy, uterus and cervix histology, ovaries and fallopian tubes, pelvic floor ligaments',
        'Gynecology & Female Pelvic Anatomy: 6-Chapter Study Path'
    ),
}

for _sec_slug, (_sec_title, _sec_desc, _sec_kw, _sec_h1) in SPA_SECTIONS.items():
    _sec_html = html
    _sec_html = re.sub(r'<title>[^<]*</title>', f'<title>{E(_sec_title)}</title>', _sec_html, count=1)
    _sec_html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{E(_sec_desc)}">', _sec_html, count=1)
    _sec_html = re.sub(r'<meta name="keywords" content="[^"]*">', f'<meta name="keywords" content="{E(_sec_kw)}">', _sec_html, count=1)
    _sec_html = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{E(_sec_title)}">', _sec_html, count=1)
    _sec_html = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{E(_sec_desc)}">', _sec_html, count=1)
    _sec_html = re.sub(r'<h1>[^<]*</h1>', f'<h1>{E(_sec_h1)}</h1>', _sec_html, count=1)
    if BASE:
        _sec_url = f'{BASE}/{_sec_slug}/'
        _sec_html = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{E(_sec_url)}">', _sec_html, count=1)
        _sec_html = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{E(_sec_url)}">', _sec_html, count=1)
    write(ROOT / _sec_slug / 'index.html', _sec_html)

# Generate unified bot-knowledge.json for instant sitewide Corpus AI answers.
_kb_chapters=[]; _kb_parts=[]; _kb_faqs=[]
for _k,_o in ORGANS.items():
    _sys_name=SYSTEMS.get(_o.get('system',''),{}).get('name',_o.get('system',''))
    _photo_file=Path((_o.get('photo') or {}).get('file','heart.jpg')).stem + '.webp'
    _hot_map=(_o.get('photo') or {}).get('hot') or {}
    _ov_list=GUIDES[_k].get('overview') or [_o.get('summary','')]
    _top_parts=[{'id':_pid,'n':_p.get('n',''),'l':_p.get('l','')} for _pid,_p in list(_o.get('parts',{}).items())[:8]]
    _kb_chapters.append({
        'k':_k,
        'slug':S(_k),
        't':_o.get('title',''),
        'l':_o.get('latin',''),
        's':_sys_name,
        'r':_o.get('region',''),
        'b':_o.get('blood',''),
        'n':_o.get('nerve',''),
        'bl':_o.get('blurb',''),
        'sum':_o.get('summary',''),
        'ov':_ov_list,
        'img':'img/webp/'+_photo_file,
        'top':_top_parts
    })
    for _pid,_p in _o.get('parts',{}).items():
        _p_src,_p_pt,_p_kind,_p_ref=part_plate(_o,_pid,_p)
        _p_file=Path(_p_src).stem + '.webp'
        _ml_key=_p.get('microLens')
        _ml_info=MICRO_LENS.get(_ml_key) if _ml_key else None
        _kb_parts.append({
            'ck':_k,
            'slug':S(_k),
            'ct':_o.get('title',''),
            'cl':_o.get('latin',''),
            'sys':_sys_name,
            'reg':_o.get('region',''),
            'bld':_o.get('blood',''),
            'nrv':_o.get('nerve',''),
            'id':_pid,
            'n':_p.get('n',''),
            'l':_p.get('l',''),
            't':_p.get('t',''),
            'd':_p.get('d',''),
            'f':_p.get('f',''),
            'c':_p.get('c',''),
            'img':'img/webp/'+_p_file,
            'hot':_p_pt if isinstance(_p_pt,list) and len(_p_pt)==2 else [500,500],
            'mlTitle':_ml_info.get('title','') if _ml_info else '',
            'mlNote':_ml_info.get('caption','') if _ml_info else ''
        })
    for _q in GUIDES[_k].get('questions',[]):
        _kb_faqs.append({'ck':_k,'slug':S(_k),'ct':_o.get('title',''),'q':_q['question'],'a':_q['answer'],'img':'img/webp/'+_photo_file})
_kb_bones=[{'g':_g.get('g',''),'n':_it[0],'cnt':_it[1],'img':'img/webp/skeleton.webp','hot':_g.get('hot')} for _g in ORGANS.get('skeleton',{}).get('bones206',[]) for _it in _g.get('items',[])]
_kb_muscles=[{'g':_g.get('title',''),'n':_m.get('n',''),'loc':_m.get('loc',''),'o':_m.get('origin',''),'i':_m.get('insertion',''),'nv':_m.get('nerve',''),'a':_m.get('action',''),'img':'img/webp/'+Path(_g.get('img','muscle.jpg')).stem+'.webp','hot':_g.get('hot')} for _g in MUSCLE_GROUPS for _m in _g.get('items',[])]
_kb_tendons=[{'n':_t.get('n',''),'at':_t.get('attach',''),'a':_t.get('action',''),'img':'img/webp/muscles-arm-hand.webp'} for _t in TENDON_ENTRIES]
write(ROOT/'bot-knowledge.json',json.dumps({'chapters':_kb_chapters,'parts':_kb_parts,'faqs':_kb_faqs,'bones':_kb_bones,'muscles':_kb_muscles,'tendons':_kb_tendons},ensure_ascii=False,separators=(',',':')))

# Rebuild the lean publish folder; all original source assets stay in img/ and are never deleted.
if OUT.exists(): shutil.rmtree(OUT)
OUT.mkdir()
for file in ['index.html','editorial.css','reading.js','preview.js','styles.css','corpus-bot.css','corpus-bot.js','bot-knowledge.json','organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js','skull-chapter.js','dental-chapter.js','foundations-chapters.js','reproduction-stages.js','repro-image-enrichment.js','micro-lens.js','part-pins.js','muscle-atlas.js','app.js','about.html','404.html','blog-studio.html']:
    shutil.copy2(ROOT/file,OUT/file)
shutil.copytree(learn,OUT/'learn')
shutil.copytree(BLOG_OUT,OUT/'blog')
shutil.copytree(ROOT/'privacy-policy',OUT/'privacy-policy')
for _sec_slug in SPA_SECTIONS:
    shutil.copytree(ROOT/_sec_slug,OUT/_sec_slug)
for kind in ['webp','thumb','medium']: shutil.copytree(ROOT/'img'/kind,OUT/'img'/kind)
write(OUT/'favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#125e58"/><path d="M16 26C8 20 5 16 5 12c0-6 7-8 11-3 4-5 11-3 11 3 0 4-3 8-11 14Z" fill="#e47b72"/></svg>')
write(ROOT/'favicon.svg',(OUT/'favicon.svg').read_text())
ROBOTS_AGENTS = [
    # Google AdSense & Search Crawlers
    'Mediapartners-Google',
    'AdsBot-Google',
    'AdsBot-Google-Mobile',
    'Googlebot',
    'Googlebot-Image',
    'Bingbot',
    'Applebot',
    'DuckDuckBot',
    # AI Search, Assistants & LLM Crawlers (Full AI Crawlability)
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'Google-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'Applebot-Extended',
    'Meta-ExternalAgent',
    'FacebookBot',
    'CCBot',
    'Amazonbot',
    'YouBot',
    'Cohere-ai',
    '*',
]
robots_body = (
    '# Corpus Anatomy Atlas — Search Engine, Google AdSense & AI Crawler Policy\n'
    + '\n'.join(f'User-agent: {ua}\nAllow: /\n' for ua in ROBOTS_AGENTS)
    + (f'\nSitemap: {BASE}/sitemap.xml\n' if BASE else '')
)
write(OUT/'robots.txt', robots_body)
write(ROOT/'robots.txt', robots_body)

llms_lines = [
    '# Corpus Anatomy Atlas',
    '',
    '> Open educational human anatomy atlas featuring 74 illustrated study chapters, 1,586 documented anatomical structures, 40 microscopic tissue lenses, a 206-bone skeletal inventory, and 312 muscles.',
    '',
    '## Core Sections',
    f'- [Interactive Atlas Home]({BASE or ""}/): Interactive body map, layered human anatomy showcase, and Corpus AI Assistant.',
    f'- [Interactive Body Map]({BASE or ""}/body-map/): Anterior and posterior clickable human organ map.',
    f'- [All 74 Organs & Chapters]({BASE or ""}/all-organs/): Complete searchable index of 74 chapters and 1,586 structures.',
    f'- [Male Anatomy]({BASE or ""}/male-anatomy/): Full-body male surface landmarks, internal organs, and pelvic floor.',
    f'- [Female Anatomy]({BASE or ""}/female-anatomy/): Full-body female surface landmarks, internal organs, and pelvic floor.',
    f'- [Interactive Anatomy Quiz]({BASE or ""}/anatomy-quiz/): 446 multiple-choice and visual spot-identification questions.',
    f'- [Deep Anatomy Study Path]({BASE or ""}/deep-anatomy-study-path/): 17 advanced microanatomy and neurovascular chapters.',
    f'- [Anatomy Study Guides Hub]({BASE or ""}/learn/): Full index of 74 long-form anatomical & physiological study guides.',
    f'- [Anatomy Blog & Study Articles]({BASE or ""}/blog/): In-depth educational articles, cranial nerve tables, and physiological guides.',
    f'- [About & Editorial Policy]({BASE or ""}/about.html): Educational scope, citation standards, and contact information.',
    f'- [Privacy Policy]({BASE or ""}/privacy-policy/): Privacy and cookie disclosure.',
    '',
    '## Published Blog Articles',
]
for _bp in BLOG_POSTS:
    llms_lines.append(f'- [{_bp["title"]}]({BASE or ""}/blog/{_bp["slug"]}/): {_bp["description"]}')
llms_lines.append('')
llms_lines.append('## All 74 Anatomy Study Guides')
for _k, _o in ORGANS.items():
    llms_lines.append(f'- [{_o.get("title", _k)} ({_o.get("latin", "")})]({BASE or ""}/learn/{S(_k)}/): {_o.get("blurb", "")}')
llms_txt = '\n'.join(llms_lines) + '\n'
write(OUT/'llms.txt', llms_txt)
write(ROOT/'llms.txt', llms_txt)

if BASE:
    paths=['/']+[f'/{s}/' for s in SPA_SECTIONS]+['/learn/','/blog/']+[f'/blog/{p["slug"]}/' for p in BLOG_POSTS]+[f'/learn/{S(key)}/' for key in ORGANS]+['/about.html','/privacy-policy/']
    blog_dates={p['slug']:p.get('updated',CONTENT_UPDATED) for p in BLOG_POSTS}
    def last_modified(path):
        slug=path.strip('/').split('/')[-1]
        if path.startswith('/learn/') and slug in SLUG_MAP: return GUIDES[SLUG_MAP[slug]]['updated']
        if path.startswith('/blog/') and slug in blog_dates: return blog_dates[slug]
        return CONTENT_UPDATED
    xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{E(url(path))}</loc><lastmod>{last_modified(path)}</lastmod></url>\n' for path in paths)+'</urlset>\n'
    write(OUT/'sitemap.xml',xml)
    write(ROOT/'sitemap.xml',xml)
adsense_pages = 0
if ADSENSE_ENABLED:
    # Put the owner-provided Auto ads loader in the shared <head> of every public HTML page.
    # Netlify's CSP nonce plugin adds a fresh per-request nonce to each script element.
    for page in OUT.rglob('*.html'):
        if page.name in {'404.html', 'blog-studio.html'}:
            continue
        page_html = page.read_text(encoding='utf-8')
        if 'adsbygoogle.js?client=' in page_html:
            if f'adsbygoogle.js?client=ca-{PUB}' not in page_html:
                raise SystemExit(f'{page.relative_to(OUT)} contains a different AdSense client ID')
            continue
        if not re.search(r'</head\s*>', page_html, flags=re.I):
            raise SystemExit(f'{page.relative_to(OUT)} has no </head> for the AdSense loader')
        page_html = re.sub(r'</head\s*>', ADSENSE_TAG + '</head>', page_html, count=1, flags=re.I)
        page.write_text(page_html, encoding='utf-8')
        adsense_pages += 1
    if not adsense_pages:
        raise SystemExit('AdSense is enabled for production, but no public HTML pages received the loader')
    write(OUT/'ads.txt',f'google.com, {PUB}, DIRECT, f08c47fec0942fa0\n')
write(OUT/'_headers','/img/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*.js\n  Cache-Control: public, max-age=31536000, immutable\n\n/*.css\n  Cache-Control: public, max-age=31536000, immutable\n')
print(f'Built {len(ORGANS)} crawlable study pages + {len(SPA_SECTIONS)} hashless SPA routes in {OUT}.')
print('Canonical/sitemap:',BASE or 'pending SITE_URL on production deployment')
print('Public contact:',CONTACT or 'pending CONTACT_EMAIL before monetization')
print('Auto ads:',f'loader added to {adsense_pages} public HTML pages' if ADSENSE_ENABLED else 'production-only; not added to this preview/local build')
print('ads.txt:',f'generated for {PUB}' if ADSENSE_ENABLED else 'production-only; not generated in this preview/local build')
