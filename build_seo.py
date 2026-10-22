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
CONTENT_UPDATED = "2026-10-19"  # Static hub/policy baseline; chapters have their own updated dates in seo/chapters/.
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
FILES=['organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js','skull-chapter.js','dental-chapter.js','foundations-chapters.js','reproduction-stages.js','repro-image-enrichment.js','micro-lens.js']
load=''.join((ROOT/f).read_text()+'\n' for f in FILES)
js=f"const vm=require('vm');const data=vm.runInNewContext({json.dumps(load)}+';({{ORGANS,SYSTEMS,MICRO_LENS}})');process.stdout.write(JSON.stringify(data));"
data=json.loads(subprocess.run(['node','-'],input=js,text=True,capture_output=True,check=True,cwd=ROOT).stdout)
ORGANS=data['ORGANS']; SYSTEMS=data['SYSTEMS']; MICRO_LENS=data['MICRO_LENS']
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
assert all(p.get('contextOnly') for p in ORGANS['anatomicallanguage']['parts'].values())
assert {pid for pid,p in ORGANS['tissuefoundations']['parts'].items() if not p.get('contextOnly')} == {'epithelium','basallamina'}
LIFE=['spermanatomy','oocyteanatomy','fertilization','cleavageblastocyst','implantation','placentaanatomy','embryodevelopment','fetaldevelopment','laborfirststage','laborsecondstage','laborthirdstage']
assert len(LIFE)==11 and all(len(ORGANS[slug]['parts'])==20 and len(ORGANS[slug]['quiz'])==3 for slug in LIFE)
assert all(not ORGANS[slug]['photo']['hot'] for slug in LIFE[2:])
assert set(ORGANS['spermanatomy']['photo']['hot'])=={'head','midpiece','flagellum'}
assert set(ORGANS['oocyteanatomy']['photo']['hot'])=={'zona','corona','polar'}
assert [ORGANS[slug]['photo']['file'] for slug in LIFE[-3:]]==['repro-labor-stage-one.png','repro-labor-stage-two.png','repro-labor-stage-three.png']
assert ORGANS['fetaldevelopment']['photo']['file']=='repro-fetus-second-trimester.png'
assert sum(len(ORGANS[slug]['visualGallery']) for slug in LIFE)==29
assert all(len(ORGANS[slug]['parts'])==20 and all(p.get('referencePlate') or p.get('microLens') or pid in ORGANS[slug]['photo']['hot'] for pid,p in ORGANS[slug]['parts'].items()) for slug in LIFE)



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
    links=[('Study guides',root+'learn/','learn'),('Interactive atlas',root+'index.html','atlas'),('Body map',root+'index.html#/map','map'),('Quiz',root+'index.html#/quiz','quiz'),('About us',root+'about.html','about')]
    nav=''.join(f'<a href="{E(link)}" {"aria-current=page" if key==current else ""}>{E(label)}</a>' for label,link,key in links)
    return f'<a class="skip" href="#content">Skip to content</a><header class="site-head"><div class="shell head-inner"><a class="brand" href="{root}index.html" aria-label="Corpus Anatomy Atlas home"><span class="brand-mark">♥</span><span class="brand-name">Corpus<small>Anatomy Atlas</small></span></a><nav class="head-nav" aria-label="Main navigation">{nav}</nav></div></header>'

def footer(depth=0):
    root='../'*depth or './'
    links=[('Study guides','learn/'),('Interactive atlas','index.html'),('About & editorial policy','about.html'),('Privacy','privacy.html')]
    return f'<footer class="site-foot"><div class="shell foot-inner"><div><strong>Corpus Anatomy Atlas</strong><p>Illustrated anatomy for learning, not a diagnostic or surgical reference. Digital renders explain regions; they are not clinical photographs or substitutes for histology slides.</p></div><nav class="foot-links" aria-label="Footer">'+''.join(f'<a href="{root+path}">{E(name)}</a>' for name,path in links)+'</nav></div></footer>'

def document(title,description,path,body,depth=0,image='',extra=''):
    root='../'*depth or './'
    head=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#125e58"><title>{E(title)} | Corpus</title>{meta(title,description,path,image)}{extra}<link rel="icon" href="{root}favicon.svg"><link rel="stylesheet" href="{root}editorial.css?v=48"></head><body>'
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

def part_plate(o,pid,p):
    """Choose a plate that actually depicts the part; return no pointer for unverified structures."""
    lens_id=p.get('microLens')
    if lens_id in MICRO_LENS:
        lens=MICRO_LENS[lens_id]
        return lens['file'],p.get('microPoint'),'scope',p.get('deepRef') or ''
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
    point=(raw if not plate['parts'][part].get('contextOnly') and isinstance(raw,list)
           and len(raw)==2 and all(isinstance(v,(int,float)) and not isinstance(v,bool)
                                   and 0<=v<=1000 for v in raw) else None)
    return plate['photo']['file'],point,'detail' if ref else 'region',ref

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
        position=(f' data-point-x="{point[0]}" data-point-y="{point[1]}"' if placed else '')
        reference=f' data-reference-href="/learn/{E(ref)}/"' if ref else ''
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
          f'data-preview-kind="{kind}" data-preview-context="{str(not placed).lower()}"{position}{reference}{scope} '
          f'aria-label="Enlarge anatomy image for {E(p["n"])}">'
          f'<img src="{E(thumbnail)}" alt="{E(alt)}" {dimensions("thumb/"+file+".webp")} loading="lazy" decoding="async" '
          f'style="object-position:{(point[0]/10 if placed else 50):.1f}% {(point[1]/10 if placed else 50):.1f}%"></button>')
        gallery_note=next((a['note'] for a in o.get('visualGallery',[]) if Path(a['file']).stem==Path(source).stem),'A related regional anatomy model; the individual event or cell is not separately identifiable in this picture.') if o.get('visualGallery') else ''
        context_note=f'<p class="repro-part-caption"><b>Picture context</b> {E(gallery_note)}</p>' if gallery_note else ''
        chunks.append(f'<section class="part" id="part-{E(pid)}"><div class="part-head">{thumbnail_html}<span class="number">{n:02d}</span><h3>{E(p["n"])}</h3></div>{label}<p>{E(p.get("d",""))}</p><div class="detail"><p><b>What it does</b>{E(p.get("f",""))}</p><p><b>Clinical connection</b>{E(p.get("c",""))}</p>{context_note}</div></section>')
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
    return '<section id="dental-chart" class="content-section dental-reading"><div class="eyebrow">Dentistry · tooth map</div><h2>Every position, not a false photo pin</h2><p class="section-lead">The charts name all 32 conventional permanent and 20 primary positions. Class images are representative adult models, not a unique picture of each tooth or a primary crown. Root and nerve anatomy varies.</p><div class="tooth-charts">'+''.join(panels)+'</div><h3 class="tooth-model-heading">Four representative tooth classes</h3><div class="tooth-type-grid">'+''.join(models)+'</div><p><a href="../skullface/">Skull and jaw bones →</a> · <a href="../trigeminalnerve/">Tooth sensation CN V →</a> · <a href="../facialnerve/">Expression CN VII →</a></p></section>'

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
        cards.append(f'<a class="repro-stage {"selected" if slug==key else ""}" href="../{E(slug)}/"{current}><img src="../../img/thumb/{E(file)}" {dimensions("thumb/"+file)} alt="Regional educational context for {E(label)}" loading="lazy" decoding="async"><span><small>{i:02d} / 11</small><strong>{E(label)}</strong></span></a>')
    return '<section id="repro-path" class="content-section repro-reading"><div class="eyebrow">Gametes to birth · separate chapters</div><h2>Follow every stage independently</h2><p class="section-lead">Sperm and egg are separate branches before fertilization. Obstetric gestational weeks are usually counted from the last menstrual period, roughly two weeks before conception. Digital labor-stage illustrations model separate moments, not clinical birth photographs or patient measurements.</p><nav class="repro-timeline" aria-label="Conception and childbirth study pathway">'+''.join(cards)+'</nav></section>'

def repro_gallery(o):
    if not o.get('visualGallery'): return ''
    cards=[]
    for n,a in enumerate(o['visualGallery'],1):
        stem=Path(a['file']).stem;thumb=f'../../img/thumb/{stem}.webp';full=f'../../img/webp/{stem}.webp'
        cards.append(f'<figure class="repro-gallery-card"><button type="button" class="repro-gallery-trigger" data-plate-preview data-plate-src="{E(full)}" data-part-name="{E(a["title"])}" data-preview-kind="region" data-preview-context="true" data-preview-note="{E(a["note"])}" aria-label="Enlarge {E(a["title"])}"><img src="{E(thumb)}" {dimensions("thumb/"+stem+".webp")} alt="Digital educational illustration: {E(a["title"])}" loading="lazy" decoding="async"><span aria-hidden="true">⤢</span></button><figcaption><small>{n:02d} / {len(o["visualGallery"])}</small><strong>{E(a["title"])}</strong><p>{E(a["note"])}</p></figcaption></figure>')
    return '<section id="repro-gallery" class="content-section repro-gallery"><div class="eyebrow">Stage-specific picture library</div><h2>See the anatomy at the right scale</h2><p class="section-lead">Tap an image to enlarge and tap again to close. These are digital educational models, not microscope photos, measured ultrasounds, clinical birth images or exact developmental clocks.</p><div class="repro-gallery-grid">'+''.join(cards)+'</div></section>'

def article(key,o):
    title=GUIDES[key]['title']
    desc=GUIDES[key]['description']
    system=SYSTEMS[o['system']]['name']
    image=o.get('photo',{}).get('file','')
    img='/img/webp/'+Path(image).stem+'.webp' if image else ''
    items=list(o['parts'].items());pinned=[x for x in items if not x[1].get('contextOnly')];deep=[x for x in items if x[1].get('contextOnly')]
    crumb=[('Home','/'),('Study guides','/learn/'),(o['title'],f'/learn/{key}/')]
    opening=f'<nav class="crumb shell" aria-label="Breadcrumb"><a href="../../index.html">Home</a><i>/</i><a href="../">Study guides</a><i>/</i><span>{E(o["title"])}</span></nav><section class="shell hero article-hero"><div class="eyebrow">{E(system)} · illustrated anatomy</div><h1>{E(title)}</h1><p>{E(desc)}</p><div class="action-row"><a class="button" href="../../index.html#/{key if key not in ("male","female") else key+"overview"}">Open interactive atlas ↗</a><a class="button alt" href="#parts">Read the structures ↓</a></div><p class="byline">Corpus educational reference · {len(items)} documented study entries · Updated {GUIDES[key]["updated"]}</p></section>'
    stage_note=o.get('photo',{}).get('notes','') if key in LIFE_PATH else ''
    photo=(f'<figure class="plate"><img src="../../{E(img.lstrip("/"))}" alt="Digital educational or regional anatomy illustration for {E(o["title"])}; {E(stage_note)}" {dimensions("webp/"+Path(image).stem+".webp")} loading="eager" fetchpriority="high" decoding="async"><figcaption>Regional teaching illustration. {E(stage_note)} Preview a part for a more relevant close-up when available; only identifiable structures receive a pointer.</figcaption></figure>' if img else '')
    facts=[('Body system',system),('Location',o.get('region','')),('Blood supply',o.get('blood','')),('Innervation',o.get('nerve',''))]
    facts_html='<div class="facts">'+''.join(f'<div class="fact"><b>{E(k)}</b><span>{E(v)}</span></div>' for k,v in facts)+'</div>'
    pinned_html=(f'<section id="parts" class="content-section"><div class="eyebrow">Illustrated structures</div><h2>Read the anatomy, part by part</h2><p class="section-lead">These {len(pinned)} structures describe anatomy related to the chapter’s regional illustration. Each entry separates location, function and a clinical point.</p><div class="part-list">{part_block(pinned,o)}</div></section>' if pinned else '')
    deep_refs=list(dict.fromkeys(p.get('deepRef') for _,p in deep if p.get('deepRef') in ORGANS and p.get('deepRef')!=key))
    deep_links=('Related deep chapters: '+', '.join(f'<a href="../{E(ref)}/">{E(ORGANS[ref]["title"])}</a>' for ref in deep_refs[:5])+'.') if deep_refs else ''
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
            ('skull-face-anterior','Anterior skull · surface bones','Visible forehead, upper and lower jaws, cheeks and bony nasal bridge. Deep parts do not get front-view pointers.'),
            ('skull-face-medial','Medial skull · deeper context','Educational sagittal cutaway for the bony palate, septum and skull base; not a clinical scan.')):
            skull_cards.append(f'<article class="skull-guide-card"><button type="button" class="reading-mini-trigger skull-view-trigger" data-plate-preview data-preview-kind="region" data-preview-context="true" data-part-name="{E(view_title)}" data-plate-src="../../img/webp/{file}.webp" aria-label="Enlarge {E(view_title)}"><img src="../../img/thumb/{file}.webp" {dimensions("thumb/"+file+".webp")} alt="{E(view_title)} educational digital skull illustration" loading="lazy" decoding="async"></button><div><h3>{E(view_title)}</h3><p>{E(view_description)}</p></div></article>')
        skull_html='<section id="skull-views" class="content-section skull-reading"><div class="eyebrow">Skull perspectives</div><h2>14 facial + 8 cranial bones</h2><p class="section-lead">The illustrations are teaching models, not patient scans. A deep or hidden bone never gets a front-view pin. The hyoid and six ear ossicles are counted in the 206-bone skeleton, but not among the 22 skull bones.</p><div class="skull-reading-grid">'+''.join(skull_cards)+'</div><p><a href="../skeleton/">See all 206 adult bones →</a> · <a href="../facialnerve/">Facial nerve CN VII →</a> · <a href="../trigeminalnerve/">Facial sensation CN V →</a></p></section>'
    related=list(dict.fromkeys(r for r in EXTRA_RELATIONS.get(key,[])+o.get('related',[]) if r in ORGANS and r!=key))[:4]
    related_cards=''.join(
        f'<a class="related-card" href="../{E(ref)}/">'
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
    connect=f'<div class="end-link"><div><strong>See the structures in context</strong><p>{"Open the regional digital plate, study entries and a short self-test. Visible markers occur only for identifiable sperm and oocyte structures." if key in LIFE_PATH else "Open the realistic interactive plate, label lines, focus view and self-test."}</p></div><a class="button" href="../../index.html#/{key if key not in ("male","female") else key+"overview"}">Open interactive view →</a></div>'
    sidebar=f'<aside class="sidebar" aria-label="On this page"><div class="side-card"><h2>In this guide</h2><a href="#overview">Overview</a><a href="#parts">{("Illustrated structures ("+str(len(pinned))+")") if pinned else ("Study entries ("+str(len(deep))+")")}</a>'+(f'<a href="#deep">Deep study notes ({len(deep)})</a>' if deep and pinned else '')+('<a href="#under-the-lens">Under the lens</a>' if micro_html else '')+('<a href="#skull-views">Skull perspectives</a>' if skull_html else '')+('<a href="#dental-chart">Tooth charts</a>' if dental_html else '')+('<a href="#region-chart">Region charts</a>' if key=='bodyregions' else '')+('<a href="#tissue-gallery">Four tissue images</a>' if key=='tissuefoundations' else '')+('<a href="#repro-path">Conception to birth path</a>' if reproduction_html else '')+('<a href="#repro-gallery">Picture library</a>' if repro_gallery_html else '')+'<a href="#questions">Five questions &amp; answers</a><a href="#related">Related guides</a><a href="#sources">Further reading</a></div><div class="side-card"><div class="count">20+</div><p>Documented anatomy and developmental entries in every Corpus chapter. Images are orientation aids, not clinical evidence.</p></div></aside>'
    body='<div class="reading-track" aria-hidden="true"><span id="reading-progress"></span></div>'+opening+f'<div class="shell article-grid"><main id="content">{photo}<section id="overview"><div class="eyebrow">Overview</div><h2>How this part of the body works</h2><p class="intro-text">{E(o["summary"])}</p>{facts_html}</section>{micro_html}{skull_html}{dental_html}{foundation_html}{reproduction_html}{repro_gallery_html}{pinned_html}{deep_html}{faq_html}{related_html}{notes}{connect}</main>{sidebar}</div>'
    article_json=schema(f'/learn/{key}/',crumb)
    return document(title,desc,f'/learn/{key}/',body,depth=2,image=img,extra=article_json).replace('</body>','<script defer src="../../reading.js?v=33"></script><script defer src="../../preview.js?v=48"></script></body>')

# Build every chapter from the exact atlas data. No automatic keyword stuffing or fabricated bylines.
learn=ROOT/'learn'
for key,o in ORGANS.items(): write(learn/key/'index.html',article(key,o))
groups=defaultdict(list)
for key,o in ORGANS.items():groups[o['system']].append((key,o))
order=['foundations','development','circulatory','respiratory','nervous','digestive','urinary','sensory','skeletal','muscular','female','male','endocrine','lymphatic','integumentary']
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
    f'<p>Start with the illustration. Stay for the details: {len(ORGANS)} guides connect each body system to named structures, what they do, and why they matter.</p>'
    '<div class="action-row"><a class="button" href="#all-guides">Explore study guides <span aria-hidden="true">↗</span></a>'
    '<a class="button alt" href="../index.html#/map">Open the body map</a></div>'
    f'<p class="byline">{len(ORGANS)} chapters <span aria-hidden="true">·</span> {sum(len(o["parts"]) for o in ORGANS.values()):,} documented parts <span aria-hidden="true">·</span> One connected atlas</p></div>'
    '<a class="hero-feature" href="heart/" aria-label="Read the featured heart anatomy study guide">'
    f'<span class="feature-top">Featured guide <span>01 / {len(ORGANS)}</span></span>'
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
        parts=([p['n'] for p in o['parts'].values() if not p.get('contextOnly')] or [p['n'] for p in o['parts'].values()])[:3]
        writer.writerow([key,PRIMARY.get(key,o['title'].replace(' — ', ' ').replace(' · ', ' ').lower()+' anatomy'),'; '.join(parts),GUIDES[key]['title'],GUIDES[key]['description']])

write(learn/'index.html',document('Human anatomy study guides',f'Explore {len(ORGANS)} illustrated human anatomy study guides, from terminology and tissues to the heart, bones, brain and reproductive anatomy.','/learn/',hub_body,depth=1,extra=schema('/learn/',[('Home','/'),('Study guides','/learn/')])))

contact_html=(f'<a href="mailto:{E(CONTACT)}">{E(CONTACT)}</a>' if CONTACT else 'A public publisher contact address has not yet been provided. The publisher must add one before a monetization application.')
about=f'''<main id="content" class="shell about-profile">
<section class="about-intro" aria-labelledby="about-title"><div class="about-intro-copy">
<div class="eyebrow">About us · Corpus Anatomy Atlas</div>
<h1 id="about-title">Anatomy, made clear and worth exploring.</h1>
<p class="about-lead">Corpus is a free, English-language learning atlas connecting lifelike digital anatomy, carefully named structures and self-tests. Start with the whole body, move into an illustrated chapter, then examine tissue-level teaching cutaways where available.</p>
<div class="about-actions"><a class="button" href="./index.html#/quiz">Try the quiz →</a><a class="button alt" href="./learn/">Explore study guides →</a></div></div>
<aside class="about-identity" aria-label="Our purpose"><span class="about-identity-mark" aria-hidden="true">♥</span><small>OUR PURPOSE</small><h2>See the structure.<br>Understand the context.</h2><p>Accessible visual learning, from the body map to a cell-scale illustration, without claiming that a teaching render is a real patient image.</p><span class="about-identity-foot">Free to explore · no account required</span></aside></section>
<div class="about-numbers" aria-label="Atlas highlights"><span><b>{len(ORGANS)}</b> study chapters</span><span><b>206</b> named adult bones</span><span><b>0</b> accounts required</span></div>
<section class="about-method" aria-labelledby="method-heading"><div class="eyebrow">How to use the atlas</div><h2 id="method-heading">A useful path from picture to understanding.</h2><div class="about-method-grid"><article><span>01 / LOOK</span><h3>Begin with a real-looking teaching illustration.</h3><p>Navigate the body map or choose a chapter. Fine labels point to depicted structures only; a hidden cell never gets a false pin on an organ image.</p></article><article><span>02 / LEARN</span><h3>Read the anatomy at the right scale.</h3><p>Each guide explains location, function and clinical context. Selected digital tissue cutaways help bridge organ and microanatomy without pretending to be a literal microscope zoom.</p></article><article><span>03 / TEST</span><h3>Check what you remember.</h3><p>Use chapter-based questions and picture-focused quizzes for self-study. They are learning aids, not a qualification or clinical assessment.</p></article></div></section>
<section class="about-editorial" aria-labelledby="standards-heading"><div><div class="eyebrow">Editorial standards</div><h2 id="standards-heading">Accurate context matters more than decoration.</h2></div><div><p>Chapters provide further-reading links to anatomy references. Some wording and illustrations are software-assisted and edited for educational clarity. Digital renders are <strong>not</strong> patient photographs, histology slides, diagnostic scans or representations of every anatomical variant. We disclose when an image supplies regional context instead of a directly visible detail.</p><p>No named clinician has formally peer-reviewed the complete atlas, and no professional medical credentials are implied. Corrections are welcome.</p></div></section>
<section class="about-contact" id="contact"><div><div class="eyebrow">Corrections &amp; contact</div><h2>Help make the atlas clearer.</h2><p>If you notice a factual mistake, a mismatched illustration or an accessibility issue, write to {contact_html}. Include the chapter, structure and a short description so it can be checked.</p></div><a class="button" href="mailto:{E(CONTACT)}">Email the editor ↗</a></section>
<section class="about-boundaries" aria-labelledby="boundaries-heading"><h2 id="boundaries-heading">A learning resource, not medical advice.</h2><p>Corpus is not a diagnosis, treatment plan or surgical reference; individual health decisions require qualified professionals. There is no account registration or advertising code on the site today. Any future advertising needs a separate privacy and policy review. We do not promise search indexing, rankings, clinical approval or AI citations.</p></section>
</main>''' 

write(ROOT/'about.html',document('About us and editorial approach','About Corpus Anatomy Atlas: free illustrated anatomy chapters, interactive body map, tissue-level cutaways, study quizzes and a contact for corrections.','/about.html',about,extra=schema('/about.html',[('Home','/'),('About','/about.html')])))
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
for file in ['index.html','editorial.css','reading.js','preview.js','styles.css','organs.js','brain-and-micro-chapters.js','deep-chapters.js','part-enrichment-notes.js','chapter-enrichment.js','skull-chapter.js','dental-chapter.js','foundations-chapters.js','reproduction-stages.js','repro-image-enrichment.js','micro-lens.js','part-pins.js','muscle-atlas.js','app.js','about.html','privacy.html','404.html']:
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
