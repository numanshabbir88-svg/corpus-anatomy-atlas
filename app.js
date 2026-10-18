/* ============================================================
   CORPUS — app: router, views, diagram engine, quiz, body map
   ============================================================ */
(function(){
'use strict';
const app = document.getElementById('app');
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const ORG = () => Object.entries(ORGANS);
const hasOrgan = key => Object.prototype.hasOwnProperty.call(ORGANS,key);
const liveIds = () => ORG().map(([k])=>k);
const routeFor = k => '#/'+(k==='male'||k==='female'?k+'overview':k);
// Same anatomical plates, served as compact WebP; original files remain in img/.
const imgSrc=(file,small=false)=>'img/'+(small?'thumb':'webp')+'/'+String(file).replace(/\.(jpe?g|png|webp)$/i,'.webp');
const svgMedia=art=>art.replace(/img\/([\w.-]+\.(?:jpe?g|png))/gi,(_,file)=>imgSrc(file));

/* ---------- tiny helpers ---------- */
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function mulberry(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffle(a,rng=Math.random){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function countUp(el,to,dur=900){const t0=performance.now();const step=t=>{const p=Math.min(1,(t-t0)/dur);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}

/* ---------- stats ---------- */
const STATS = (()=>{
  let structures=0, questions=0;
  ORG().forEach(([k,o])=>{structures+=Object.keys(o.parts).length;questions+=o.quiz.length});
  return {organs:ORG().length, structures, systems:Object.keys(SYSTEMS).length, questions};
})();

/* ---------- SVG builders ---------- */
function labelLayer(o){
  const vb=o.vb, W=vb[0], H=vb[1];
  const sides={l:[],r:[]};
  Object.entries(o.parts).forEach(([id,p])=>{ if(p.contextOnly||!p.at) return; (sides[p.s==='r'?'r':'l']).push({id,p}); });
  let out='';
  for(const side of ['l','r']){
    const list=sides[side].slice().sort((a,b)=>a.p.at[1]-b.p.at[1]);
    const n=list.length; if(!n) continue;
    const gap=Math.max(20,Math.min(32,(H-46)/n));
    const ys=list.map(x=>x.p.at[1]);
    for(let i=1;i<n;i++) ys[i]=Math.max(ys[i],ys[i-1]+gap);
    const bottom=H-16;
    if(ys[n-1]>bottom){ ys[n-1]=bottom; for(let i=n-2;i>=0;i--) ys[i]=Math.min(ys[i],ys[i+1]-gap); }
    for(let i=0;i<n;i++) ys[i]=Math.max(ys[i],16+i*0);
    list.forEach((it,i)=>{
      const y=ys[i], [ax,ay]=it.p.at;
      const name=it.p.n;
      const w=name.length*6.75+4;
      if(side==='l'){
        out+=`<g class="hoverlab" data-id="${it.id}">
          <text class="lbl" x="10" y="${y+4}">${esc(name)}</text>
          <path class="leader" d="M${10+w} ${y} C ${10+w+18} ${y}, ${ax-26} ${ay}, ${ax-4} ${ay}"/>
          <circle class="anchor" cx="${ax}" cy="${ay}" r="2.6"/></g>`;
      }else{
        out+=`<g class="hoverlab" data-id="${it.id}">
          <text class="lbl" x="${W-10}" y="${y+4}" text-anchor="end">${esc(name)}</text>
          <path class="leader" d="M${W-10-w} ${y} C ${W-10-w-18} ${y}, ${ax+26} ${ay}, ${ax+4} ${ay}"/>
          <circle class="anchor" cx="${ax}" cy="${ay}" r="2.6"/></g>`;
      }
    });
  }
  return `<g class="lbl-layer">${out}</g>`;
}
function svgFor(o,{labels=true,cls=''}={}){
  return `<svg class="dg ${cls}" viewBox="0 0 ${o.vb[0]} ${o.vb[1]}" role="img" aria-label="${esc(o.title)} diagram" ${labels?'':'data-nolbl="1"'}>
    ${svgMedia(o.art)}
    <g class="anim-layer"></g>
    ${labels&&!o.inlineLabels?labelLayer(o):''}
  </svg>`;
}
function thumbSVG(o){
  const art=svgMedia(o.art.split('<rect class="inset-box"')[0]);   // insets belong to the full page, not cards
  return `<svg class="dg" viewBox="${(o.vb[0]/2-o.vb[0]*0.36).toFixed(0)} ${(o.vb[1]/2-o.vb[1]*0.40).toFixed(0)} ${(o.vb[0]*0.72).toFixed(0)} ${(o.vb[1]*0.80).toFixed(0)}" aria-hidden="true">${art}</svg>`;
}

/* ---------- brain sulci (procedural) ---------- */
function decorateBrain(svg){
  const g=svg.querySelector('#b-sulci'); if(!g) return;
  const r=mulberry(7);
  let d='';
  for(let i=0;i<52;i++){
    let x=116+r()*436, y=52+r()*236, a=r()*6.283;
    let path=`M${x.toFixed(1)} ${y.toFixed(1)}`;
    for(let k=0;k<6;k++){a+=(r()-.5)*2.0;x+=Math.cos(a)*14;y+=Math.sin(a)*11;path+=` Q${(x+(r()-.5)*12).toFixed(1)} ${(y+(r()-.5)*12).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`}
    d+=`<path d="${path}" stroke-width="${(1.3+r()*1.7).toFixed(1)}"/>`;
  }
  g.innerHTML=d;
}

/* ---------- views ---------- */
function viewHome(){
  const featured=['heart','brain','lungs','kidney','skeleton','muscle','eye','skin','gut','breast','gynuterus','maleprostate'];
  const tiles=featured.map((k,i)=>tile(k,ORGANS[k],i)).join('');
  const sysChips=Object.entries(SYSTEMS).map(([k,s])=>{
    const n=ORG().filter(([,o])=>o.system===k).length;
    return `<a class="chip" href="#/organs?sys=${k}">${s.name}<i>${n}</i></a>`;
  }).join('');
  return `
  <section class="hero wrap">
    <div class="hero-grid">
      <div class="rv in">
        <div class="eyebrow">Your anatomy, made easier</div>
        <h1>Explore the body <span class="accent">one part at a time<svg viewBox="0 0 300 12" preserveAspectRatio="none"><path d="M4 8 C60 2 120 10 176 5 C220 2 262 8 296 5"/></svg></span>.</h1>
        <p class="lead">Start with a picture. Tap a part to see its name and what it does. When you feel ready, explore the deeper notes and try a quiz.</p>
        <div class="hero-cta">
          <a class="btn primary" href="#/map">${icon('map')} Start with the body map</a>
          <a class="btn" href="#/organs">Browse chapters</a>
          <a class="btn" href="#/quiz">Try a quiz</a>
        </div>
        <div class="hero-note">${icon('shield')} Realistic pictures · optional animated diagrams · no account needed</div>
      </div>
      <div class="showcase rv in" data-d="1">
        <div class="showcase-top">
          <span class="pill live">Live diagram</span>
          <div class="showcase-tabs" id="scTabs">
            <button class="sc-tab on" data-sc="heart">Heart</button>
            <button class="sc-tab" data-sc="lungs">Lungs</button>
            <button class="sc-tab" data-sc="brain">Brain</button>
            <button class="sc-tab" data-sc="kidney">Kidney</button>
          </div>
        </div>
        <div class="sc-stage" id="scStage"></div>
        <div class="sc-foot">
          <div><b id="scName">Heart</b> <span class="latin" id="scLatin">Cor</span><div id="scHint" style="font-size:11.5px;margin-top:2px">click any structure to read about it</div></div>
          <a class="btn sm sc-open" id="scOpen" href="#/heart">Open + animations ${icon('arrow')}</a>
          <svg class="ecg" viewBox="0 0 300 44" preserveAspectRatio="none"><path d="M0 26 L36 26 L46 26 L52 10 L58 38 L64 20 L70 26 L110 26 L120 26 L126 12 L132 36 L138 22 L144 26 L188 26 L198 26 L204 10 L210 38 L216 20 L222 26 L262 26 L272 26 L278 14 L284 34 L290 24 L300 26"/></svg>
        </div>
      </div>
    </div>
    <div class="stats rv" data-d="2">
      <div class="stat"><b data-count="${STATS.organs}">0</b><span>Interactive organs</span></div>
      <div class="stat"><b data-count="${STATS.structures}">0</b><span>Documented parts</span></div>
      <div class="stat"><b data-count="${STATS.systems}">0</b><span>Body systems</span></div>
      <div class="stat"><b data-count="${STATS.questions}">0</b><span>Self-test questions</span></div>
    </div>
  </section>

  <section class="sec wrap start-paths" style="padding-top:32px;padding-bottom:12px">
    <div class="sec-h rv"><div><div class="eyebrow">A good place to begin</div><h2>Choose your way in</h2><p>You can change paths any time. Nothing here needs a medical background.</p></div></div>
    <div class="start-grid">
      <a href="#/map" class="start-card rv"><span class="start-icon">01</span><span><strong>Not sure what to look for?</strong><small>Find it on the body map.</small></span><b>Explore →</b></a>
      <a href="#/organs" class="start-card rv" data-d="1"><span class="start-icon">02</span><span><strong>Know the body part?</strong><small>Browse pictures and short explanations.</small></span><b>Browse →</b></a>
      <a href="#/male" class="start-card rv" data-d="2"><span class="start-icon">03</span><span><strong>Compare male &amp; female</strong><small>Separate, easy-to-follow study sections.</small></span><b>Compare →</b></a>
    </div>
  </section>

  <section class="sec wrap" style="padding-top:34px">
    <div class="sec-h rv"><div><div class="eyebrow">Browse by system</div><h2>${STATS.systems} systems, one body</h2></div>
      <a class="btn sm" href="#/systems">All systems ${icon('arrow')}</a></div>
    <div class="sysbar rv" data-d="1">${sysChips}</div>
  </section>

  <section class="sec wrap" style="padding-top:8px;padding-bottom:8px"><a class="deep-promo rv" href="#/deep"><img src="img/thumb/eye-layers-deep.webp" alt="Realistic cross-section of the eye" loading="lazy"><span><small>NEW · CLINICAL ANATOMY PATH</small><strong>Beyond the overview: ${DEEP_PATH.reduce((n,k)=>n+Object.keys(ORGANS[k].parts).length,0)} deeper structures</strong><em>Clitoral and penile erectile tissue · skin strata · facial and trigeminal nerves · eye and retina · brain, nephron, alveoli, liver and intestine</em></span><b>Explore ${DEEP_PATH.length} chapters ↗</b></a></section>

  <section class="sec wrap" style="padding-top:8px">
    <div class="sec-h rv"><div><div class="eyebrow">A few favorites</div><h2>Popular chapters</h2><p>Start anywhere. Each chapter begins with a picture; the deeper details are there when you want them.</p></div>
      <a class="btn sm" href="#/organs">All ${STATS.organs} organs ${icon('arrow')}</a></div>
    <div class="grid">${tiles}</div>
    <div class="all-chapters-link"><a class="btn primary" href="#/organs">Browse all ${STATS.organs} chapters ${icon('arrow')}</a></div>
  </section>

  <section class="sec wrap">
    <div class="sec-h rv"><div><div class="eyebrow">How it works</div><h2>Three steps to actually remembering it</h2></div></div>
    <div class="steps">
      <div class="card step rv"><div class="n">1</div><h3>See it move</h3><p>Switch on the cardiac cycle, breathing, peristalsis or a nerve impulse. Motion fixes anatomy in memory far better than a static plate.</p></div>
      <div class="card step rv" data-d="1"><div class="n">2</div><h3>Go deeper</h3><p>Click an illustrated pin or open an unpinned study note for anatomic detail, function and a clinical pearl.</p></div>
      <div class="card step rv" data-d="2"><div class="n">3</div><h3>Prove it</h3><p>Finish with the built-in quiz: multiple choice plus spot-the-structure rounds drawn straight from the diagram you just studied.</p></div>
    </div>
  </section>

  <section class="sec wrap" style="padding-bottom:20px">
    <div class="banner rv">
      <svg class="deco" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 178 C46 140 16 110 16 76 C16 48 38 28 64 28 C80 28 94 36 100 50 C106 36 120 28 136 28 C162 28 184 48 184 76 C184 110 154 140 100 178 Z" fill="none" stroke="#e8f4f1" stroke-width="6"/></svg>
      <div class="eyebrow" style="color:#8fd8c8">Interactive body map</div>
      <h2>Find any organ on the body in two clicks</h2>
      <p>An anterior and posterior silhouette with every organ in its real position. Hover to preview, click to open the full diagram — the quickest way in when you don't know the name yet.</p>
      <a class="btn primary" href="#/map">Open the body map ${icon('arrow')}</a>
    </div>
  </section>`;
}

function tile(k,o,i){
  const sys=SYSTEMS[o.system];
  return `<a class="tile rv" data-d="${i%4}" href="${routeFor(k)}">
    <span class="badge pill live">Live</span>
    <div class="thumb">${o.photo?`<img src="${imgSrc(o.photo.file,true)}" alt="" loading="lazy">`:thumbSVG(o)}</div>
    <div class="tile-body">
      <h3>${esc(o.title)}</h3>
      <div class="latin">${esc(o.latin)}</div>
      <p class="blurb">${esc(o.blurb)}</p>
      <div class="tile-foot">
        <span style="color:${sys.color}">●</span> ${sys.name}
        <span style="margin-left:6px">· ${Object.keys(o.parts).length} parts</span>
        <span class="arrow">${icon('arrow')}</span>
      </div>
    </div>
  </a>`;
}

function viewOrgans(params){
  const sys=params.get('sys')||'';
  const chips=Object.entries(SYSTEMS).map(([k,s])=>`<button class="chip ${k===sys?'on':''}" data-sys="${k}">${s.name}<i>${ORG().filter(([,o])=>o.system===k).length}</i></button>`).join('');
  const tiles=ORG().map(([k,o],i)=>tile(k,o,i)).join('');
  const planned=PLANNED.map(([n,l,d])=>`<div class="tile off rv"><div class="thumb"><span style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:800">planned</span></div>
    <div class="tile-body"><h3>${esc(n)}</h3><div class="latin">${esc(l)}</div><p class="blurb">${esc(d)}</p>
    <div class="tile-foot"><span>Awaiting illustration</span></div></div></div>`).join('');
  return `
  <section class="hero wrap" style="padding-bottom:10px">
    <div class="eyebrow">Organ library</div>
    <h1 style="font-size:clamp(34px,4.6vw,50px);margin-top:12px">All organs &amp; systems</h1>
    <p class="lead" style="margin-top:12px">${STATS.organs} illustrated organs with ${STATS.structures} documented anatomy parts. Filter by system, or search by name, Latin term or structure. <a href="#/deep">Explore the deep anatomy study path →</a></p>
  </section>
  <section class="wrap" style="padding:18px 26px 8px">
    <div class="filters rv">
      <label class="finput">${icon('search')}<input id="flib" type="search" placeholder="Filter organs…" aria-label="Filter organs"></label>
      <div class="chips" id="sysChips"><button class="chip ${sys?'':'on'}" data-sys="">All<i>${STATS.organs}</i></button>${chips}</div>
    </div>
    <div class="grid" id="orgGrid">${tiles}${planned}</div>
    <p id="noRes" class="lead" style="display:none;padding:30px 0">Nothing matches that filter yet — try another system or clear the search.</p>
  </section>`;
}

function miniChip(o,id){if(!o.photo)return '';const h=o.photo.hot?.[id]||[500,500];const context=o.parts[id]?.contextOnly||!o.photo.hot?.[id];return `<span class="mini${context?' reference':''}" ${context?'title="Regional reference plate — not a localized crop of this structure"':''} style="background-image:url(${imgSrc(o.photo.file,true)});${context?'':`background-position:${(h[0]/10).toFixed(1)}% ${(h[1]/10).toFixed(1)}%`}"></span>`}
function boneSection(o){
 const tot=o.bones206.reduce((a,g)=>a+g.n,0);
 return `
 <section class="sec wrap" id="bone-atlas" style="padding-top:34px">
  <div class="sec-h rv"><div><div class="eyebrow">Complete osteology</div><h2>All ${tot} adult bones, individually named</h2><p>Open a region to see every individual bone: left and right sides, each rib and vertebra, and every hand and foot phalanx. The standard adult count includes 6 ear ossicles and excludes variable sesamoid bones.</p></div></div>
  <div class="bgroups">${o.bones206.map((g,gi)=>`<details class="bonegrp rv" id="bg-${gi}"><summary><span class="bgname">${esc(g.g)}</span><i class="bgcount">${g.n} bones</i></summary><div class="bones">${g.named.map((group,ci)=>`<div class="bonesub"><h3>${esc(group.group)} <small>${group.bones.length}</small></h3><div class="bonelist">${group.bones.map((bn,bi)=>`<span class="bone" id="bn-${gi}-${ci}-${bi}">${esc(bn)}</span>`).join('')}</div></div>`).join('')}</div></details>`).join('')}</div>
 </section>`;
}
function jointSection(o){
 return `
 <section class="sec wrap" id="joint-atlas" style="padding-top:34px">
  <div class="sec-h rv"><div><div class="eyebrow">Articulation atlas</div><h2>${o.joints.length} joint families, inside and out</h2><p>From cranial sutures to toe articulations — paired joints and small serial joints are grouped by type. Each card gives the movement, inner structures and a clinical note; tap its image to enlarge the anatomical plate.</p></div></div>
  <div class="jgrid">${o.joints.map((j,i)=>`<article class="jcard rv" id="jc-${i}">
    <button class="jimg" type="button" data-jimg="${j.img}" data-jname="${esc(j.n)}" aria-label="Enlarge image of ${esc(j.n)}" style="background-image:url(${imgSrc(j.img,true)});background-position:${(j.hot[0]/10).toFixed(1)}% ${(j.hot[1]/10).toFixed(1)}%"><span>⤢ Enlarge</span></button>
    <div class="jbody">
      <h4>${esc(j.n)}<span class="latin">${esc(j.l)}</span></h4>
      <span class="pill plan">${esc(j.type)}</span>
      <p class="kv"><b>Movement</b>${esc(j.mv)}</p>
      <p class="kv"><b>Inner anatomy</b>${j.inner.map(x=>esc(x)).join(' · ')}</p>
      <p class="kv"><b>Clinical</b>${esc(j.cl)}</p>
    </div></article>`).join('')}</div>
 </section>`;
}
function bindJointImages(){
 $$('[data-skel-jump]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.skelJump)?.scrollIntoView({behavior:'smooth',block:'start'})));
 $$('.jimg').forEach(btn=>btn.addEventListener('click',()=>{
  const overlay=document.createElement('dialog');overlay.className='jlight';
  overlay.innerHTML=`<button class="jclose" type="button" aria-label="Close image">×</button><img src="${imgSrc(btn.dataset.jimg)}" alt="Anatomical cut-away plate of ${btn.dataset.jname}"><p>${btn.dataset.jname} · Anatomical cut-away render</p>`;
  document.body.append(overlay);
  overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('.jclose'))overlay.close()});
  overlay.addEventListener('close',()=>overlay.remove());overlay.showModal();
 }));
}
/* ---------- full-body muscle & tendon atlas ---------- */
function muscleAtlasSection(){
 const n=MUSCLE_GROUPS.reduce((a,g)=>a+g.items.length,0);
 const groups=MUSCLE_GROUPS.map((g,i)=>`<details class="mat-group rv" id="mat-${g.id}" ${i===0?'open':''}>
  <summary class="mat-head"><img src="${imgSrc(g.img,true)}" alt="${esc(g.title)} regional medical render" loading="lazy"><span><small>${String(i+1).padStart(2,'0')} · ${esc(g.sub)}</small><strong>${esc(g.title)}</strong><em>${g.items.length} named records · ${esc(g.lead)}</em></span><b>${g.items.length}</b></summary>
  <div class="mat-list">${g.items.map(m=>`<details class="mat-entry" id="mus-${m.id}"><summary><span class="mat-mini" style="background-image:url(${imgSrc(g.img,true)});background-position:${(g.hot[0]/10).toFixed(1)}% ${(g.hot[1]/10).toFixed(1)}%"></span><strong>${esc(m.n)}</strong><i>${esc(m.loc.split(',').slice(0,2).join(' · '))}</i></summary><div class="mat-detail"><img src="${imgSrc(g.img)}" alt="Regional illustration for ${esc(m.n)}" loading="lazy"><div><p><b>Location</b>${esc(m.loc)}</p>${m.kind==='smooth'?'<p><b>Muscle type</b>Involuntary smooth-muscle tissue; not a separately counted skeletal muscle.</p>':''}${m.action?`<p><b>Action</b>${esc(m.action)}</p>`:''}${m.origin?`<p><b>Origin</b>${esc(m.origin)}</p>`:''}${m.insertion?`<p><b>Insertion</b>${esc(m.insertion)}</p>`:''}${m.nerve?`<p><b>Innervation</b>${esc(m.nerve)}</p>`:''}<small>Regional reference render; this individual muscle is not separately highlighted.</small></div></div></details>`).join('')}</div>
 </details>`).join('');
 const tgroup=['shoulder-arm','forearm','hand','hip','thigh','leg','foot'];
 const tendons=tgroup.map(id=>{const g=MUSCLE_GROUPS.find(x=>x.id===id),items=TENDON_ENTRIES.filter(x=>x.g===id);return `<div class="mat-tendon-set"><h3>${esc(g.title)} <span>${items.length}</span></h3><div class="mat-tendon-list">${items.map(t=>`<details id="tendon-${t.id}" class="mat-tendon"><summary><span class="mat-mini" style="background-image:url(${imgSrc(g.img,true)});background-position:${(g.hot[0]/10).toFixed(1)}% ${(g.hot[1]/10).toFixed(1)}%"></span><strong>${esc(t.n)}</strong></summary><div class="mat-tendon-detail"><b>Attachment</b> ${esc(t.attach)}<br><b>Function / note</b> ${esc(t.action)}<div class="mat-tendon-thumb"><img src="${imgSrc(g.img,true)}" alt="Regional tendon anatomy: ${esc(t.n)}" loading="lazy"></div></div></details>`).join('')}</div></div>`}).join('');
 return `<section class="sec wrap mat-atlas" id="muscle-atlas">
  <div class="sec-h rv"><div><div class="eyebrow">Full-body muscle reference</div><h2>Muscles, deep layers &amp; tendons</h2><p>${n} named muscle records across ${MUSCLE_GROUPS.length} anatomical regions, plus ${TENDON_ENTRIES.length} named tendon and fascia pathways. This includes skeletal-muscle names and a separate reproductive smooth-muscle supplement. Heads, bellies and bilateral instances are counted differently between atlases; these are records, not a claimed fixed number of muscles in one person.</p></div></div>
  <div class="mat-stats rv"><span><b>${n}</b> muscle records</span><span><b>${MUSCLE_GROUPS.length}</b> regions</span><span><b>${TENDON_ENTRIES.length}</b> tendon pathways</span><span><b>2</b> pelvic-floor views</span></div>
  <div class="mat-fullbody rv"><div class="mat-fulltop"><span>Male & female écorché</span><p>Same realistic render quality as the rest of the atlas. Surface views identify body form; deep reproductive and pelvic muscles are shown in the dedicated plates below.</p></div><div class="mat-figures"><a href="#/muscle?g=male-pelvis"><img src="img/webp/male-ecorche-reference.webp" alt="Male full-body muscular écorché with rib cage and male pelvis"><span>Male full-body muscle view <b>Explore male pelvic muscles →</b></span></a><a href="#/muscle?g=female-pelvis"><img src="img/webp/female-ecorche-v2.webp" alt="Female full-body muscular écorché with breast and female pelvis"><span>Female full-body muscle view <b>Explore female pelvic muscles →</b></span></a></div></div>
  <div class="mat-menu rv"><h3>Jump to a region</h3><div>${MUSCLE_GROUPS.map(g=>`<button type="button" data-mat-jump="${g.id}">${esc(g.title)} <small>${g.items.length}</small></button>`).join('')}<button type="button" data-mat-tendon="1">Tendon atlas <small>${TENDON_ENTRIES.length}</small></button></div></div>
  <div class="mat-spot rv"><div><span class="eyebrow">Sex-specific deep anatomy</span><h3>Reproductive &amp; pelvic muscles, separately</h3><p>Male: puboprostatic fibers, bulbospongiosus, ischiocavernosus, urethral sphincter, plus dartos and prostatic smooth muscle. Female: pubovaginal fibers, compressor urethrae, urethrovaginal sphincter, bulbospongiosus, plus uterine myometrium. Both share levator ani, coccygeus and anal sphincters.</p><div><button data-mat-jump="male-pelvis" class="btn sm">Male pelvic floor →</button><button data-mat-jump="female-pelvis" class="btn sm">Female pelvic floor →</button><button data-mat-jump="male-repro-smooth" class="btn sm">Male organ-wall muscle →</button><button data-mat-jump="female-repro-smooth" class="btn sm">Female organ-wall muscle →</button></div></div><img src="img/webp/muscles-pelvic-female.webp" alt="Female pelvic floor realistic anatomical render" loading="lazy"></div>
  <div class="sec-h rv"><div><div class="eyebrow">Regional atlas</div><h2>${MUSCLE_GROUPS.length} anatomical regions</h2><p>Open any region, then a muscle for its attachments, action, nerve supply and contextual render. The image shows the region, not a separate labeled photograph of every deep fiber.</p></div></div>
  <div class="mat-groups">${groups}</div>
  <section id="mat-tendons" class="mat-tendons"><div class="sec-h rv"><div><div class="eyebrow">Tendon & fascial pathways</div><h2>${TENDON_ENTRIES.length} named tendons</h2><p>From the rotator cuff through the flexor tendons of the hand to Achilles and the plantar aponeurosis. Tendon attachments and actions are listed with a matching realistic regional plate.</p></div></div><div class="mat-tendon-hero"><img src="img/webp/muscles-arm-hand.webp" alt="Realistic upper-limb muscle-to-tendon illustration" loading="lazy"><span>Muscle-to-bone force transmission · 32 named tendon pathways</span></div><div class="mat-tendon-grid">${tendons}</div></section>
  <p class="mat-source">Muscle-name, attachment and action data adapted from <a href="https://en.wikipedia.org/wiki/List_of_skeletal_muscles_of_the_human_body" target="_blank" rel="noopener noreferrer">List of skeletal muscles of the human body</a> (Wikipedia contributors, CC BY-SA 4.0); edited, regrouped and expanded with sex-specific perineal, reproductive smooth-muscle and tendon entries for Corpus. Pelvic floor organization cross-checked against <a href="https://teachmeanatomy.info/pelvis/muscles/pelvic-floor/" target="_blank" rel="noopener noreferrer">TeachMeAnatomy</a>. Regional images are digital educational illustrations, not exact pin-localizations or clinical photographs.</p>
 </section>`;
}
function bindMuscleAtlas(){
 const jump=(el)=>{if(!el)return;if(el.tagName==='DETAILS')el.open=true;el.scrollIntoView({behavior:'smooth',block:'start'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1800)};
 $$('[data-mat-jump]').forEach(b=>b.addEventListener('click',()=>jump(document.getElementById('mat-'+b.dataset.matJump))));
 $$('[data-mat-tendon]').forEach(b=>b.addEventListener('click',()=>jump(document.getElementById('mat-tendons'))));
}

function reproductiveMuscleSection(key){
 const male=key==='male',sex=male?'male':'female';
 return `<section class="sec wrap repro-muscle"><div class="mat-spot rv"><div><span class="eyebrow">Reproductive anatomy · deep muscles</span><h3>${male?'Male':'Female'} pelvic floor &amp; perineum</h3><p>${male?'Puboprostatic fibers, bulbospongiosus, ischiocavernosus and the external urethral sphincter act alongside shared levator ani, coccygeus and anal sphincters.':'Pubovaginal fibers, compressor urethrae, urethrovaginal sphincter, bulbospongiosus and ischiocavernosus act alongside shared levator ani, coccygeus and anal sphincters.'} View the realistic regional plate and open each muscle for its attachments, action and innervation.</p><div><a class="btn sm" href="#/muscle?g=${sex}-pelvis">Explore ${sex} pelvic muscles →</a><a class="btn sm" href="#/muscle?g=pelvic-common">Shared pelvic floor →</a><a class="btn sm" href="#/muscle?g=${sex}-repro-smooth">Organ-wall smooth muscle →</a></div></div><img src="img/muscles-pelvic-${sex}.jpg" alt="${male?'Male':'Female'} pelvic floor regional medical render" loading="lazy"></div></section>`;
}
/* ---------- clinical reproductive anatomy study layer ---------- */
const DEEP_PATH=['clitoralcomplex','penileerectile','skinlayers','facialnerve','trigeminalnerve','eyeanatomy','retina','nephron','brachialplexus','cerebraldeep','meningescsf','brainstemdeep','pulmonaryacinus','hepaticlobule','intestinalwall'];
function viewDeep(){
 const count=DEEP_PATH.reduce((n,k)=>n+Object.keys(ORGANS[k].parts).length,0);
 return `<section class="deep-hero"><div class="deep-hero-plate"><img src="img/webp/eye-layers-deep.webp" alt="" aria-hidden="true"></div><div class="wrap deep-head"><div class="eyebrow">Corpus · research-led deep anatomy</div><h1>Look beneath<br><em>the surface.</em></h1><p>${DEEP_PATH.length} focused new chapters, ${count} detailed structures and ${DEEP_PATH.length*2} new self-test questions. Explore erectile tissue, skin strata, facial sensation and motor branches, ocular coats, retinal circuits, nephron, arm nerves, deeper brain anatomy, alveoli, liver and intestine. Images orient; written entries explain the anatomy.</p><div class="hero-cta"><a class="btn primary" href="#/clitoralcomplex">Begin the deep atlas →</a><a class="btn" href="#/skinlayers">See skin layers</a></div><small>Educational models are not patient images, microscopic slides or surgical maps.</small></div></section>
 <section class="sec wrap brain-feature"><div class="sec-h"><div><div class="eyebrow">New · brain deep dive</div><h2>Inside the control center</h2><p>Follow cortex and white-matter connections, protective membranes and CSF, then the brainstem–cerebellar circuitry.</p></div><a class="btn sm" href="#/brain">Brain overview →</a></div><div class="brain-feature-grid">${['cerebraldeep','meningescsf','brainstemdeep'].map((k,i)=>`<a class="brain-feature-tile rv" data-d="${i}" href="${routeFor(k)}"><img src="${imgSrc(ORGANS[k].photo.file,true)}" alt="${esc(ORGANS[k].title)} medical illustration" loading="lazy"><span><small>0${i+1} · ${Object.keys(ORGANS[k].parts).length} structures</small><strong>${esc(ORGANS[k].title)}</strong><em>Explore chapter ↗</em></span></a>`).join('')}</div></section>
 <section class="sec wrap"><div class="sec-h"><div><div class="eyebrow">Choose a study chapter</div><h2>${DEEP_PATH.length} pathways into hidden anatomy</h2><p>Each has a realistic regional plate, interactive structure map, clinically oriented notes, source links and quiz.</p></div></div><div class="gyn-grid">${DEEP_PATH.map((k,i)=>{const o=ORGANS[k];return `<a class="gyn-tile rv" data-d="${i%4}" href="${routeFor(k)}"><div class="gyn-tile-pic"><img src="${imgSrc(o.photo.file,true)}" alt="${esc(o.title)} anatomical illustration" loading="lazy"><b>${String(i+1).padStart(2,'0')}</b></div><div><span>${Object.keys(o.parts).length} structures · ${o.quiz.length} questions</span><h3>${esc(o.title)}</h3><p>${esc(o.blurb)}</p><strong>Open chapter ↗</strong></div></a>`}).join('')}</div></section>
 <section class="sec wrap deep-audit"><div class="sec-h"><div><div class="eyebrow">Scope audit · honest coverage</div><h2>More anatomy remains to map</h2><p>This release adds ${DEEP_PATH.length} high-priority gaps; it does not claim that every human organ, nerve branch or microscopic variant is already in the atlas.</p></div></div><div class="deep-audit-grid"><article><b>Circuits & nerves</b><p>Cervical and lumbosacral plexuses, autonomic ganglia, spinal nerve roots and peripheral cutaneous territories.</p></article><article><b>Organ microanatomy</b><p>Pulmonary acini, hepatic lobules, intestinal crypts, pancreatic islets, salivary glands and detailed lymph-node architecture.</p></article><article><b>Head & special senses</b><p>Orbital muscles and vessels, cochlear hair cells, vestibular end organs and named intracranial vascular pathways.</p></article></div></section>
 <section class="sec wrap"><div class="gyn-clinic"><div><span class="eyebrow">Continue exploring</span><h2>Overview → microanatomy</h2><p>These chapters extend, rather than replace, the existing skin, eye, cranial-nerve and sex-specific atlas pages. Search every new structure by name using the header.</p></div><div><a href="#/skin">Skin overview →</a><a href="#/eye">Eye overview →</a><a href="#/cranialnerves">Twelve cranial nerves →</a><a href="#/gyn">Gynecology path →</a></div></div></section>`;
}
const GYN_PATH=['gynuterus','gyncervix','gynadnexa','gynvagina','gynvulva','gynsupport'];
function studySection(o,key){
 if(!o.study)return '';
 const cards=o.study.cards.map(([title,text],i)=>`<article class="study-card rv" data-d="${i%4}"><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('');
 const sources=o.study.sources.map((u,i)=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${i+1}. ${esc(new URL(u).hostname.replace('www.',''))} ↗</a>`).join('');
 return `<section class="sec wrap study-wrap" id="study-map"><div class="sec-h rv"><div><div class="eyebrow">Medical-student study layer</div><h2>Clinical anatomy map</h2><p>${esc(o.study.lead)}</p></div><a class="btn sm" href="#/quiz?o=${key}">Test this chapter →</a></div><div class="study-grid">${cards}</div>
 ${key==='gynvulva'?`<figure class="vulva-ref rv"><img src="img/webp/vulva-reference.webp" alt="Labeled surface anatomy of the vulva: mons pubis, clitoral hood and glans, urethral opening, vaginal opening, labia majora and minora, perineum" loading="lazy"><figcaption><strong>Surface anatomy companion</strong> · Diagram by RWhitwam, <a href="https://commons.wikimedia.org/wiki/File:Female_external_genitalia,_or_vulva.svg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. PNG preview displayed unmodified. Paired with the realistic sagittal render above.</figcaption></figure>`:''}
 <div class="study-sources"><b>Further reading · anatomy references</b>${sources}</div>
 <p class="study-caveat">Educational anatomy only. Digital plates simplify anatomy and may not represent every tissue or surgical variant; clinical decisions require current local guidelines and supervised training.</p>
 </section>`;
}
function viewGyn(){
 const count=GYN_PATH.reduce((n,k)=>n+Object.keys(ORGANS[k].parts).length,0);
 return `<section class="gyn-hero"><div class="wrap gyn-hero-inner"><div><div class="eyebrow">Clinical anatomy · gynecology study path</div><h1>Learn the pelvis<br><em>from layer to landmark.</em></h1><p>Six focused chapters, ${count} documented parts, realistic regional renders, exam-oriented relations and a quiz for each chapter. Start with the uterus, then follow the tube, cervix, vaginal canal, external genitalia and supporting planes.</p><div class="hero-cta"><a class="btn primary" href="#/gynuterus">Start with uterine layers →</a><a class="btn" href="#/gynsupport">See surgical landmarks</a></div><small>Anatomy reference—not a diagnosis, treatment guide or screening protocol.</small></div><img src="img/webp/gyn-uterus.webp" alt="Realistic uterine section showing endometrium, myometrium, cervix, tubes and ovaries"></div></section>
 <section class="sec wrap gyn-path"><div class="sec-h rv"><div><div class="eyebrow">Your six-module route</div><h2>From tissue to clinical relations</h2><p>Choose a chapter; every structure is named, searchable and linked to its exam relevance. Pins mark visible structures; additional deep notes appear in chapter lists.</p></div></div><div class="gyn-grid">${GYN_PATH.map((k,i)=>{const o=ORGANS[k];return `<a class="gyn-tile rv" data-d="${i%4}" href="${routeFor(k)}"><div class="gyn-tile-pic"><img src="${imgSrc(o.photo.file,true)}" alt="${esc(o.title)} medical render" loading="lazy"><b>${String(i+1).padStart(2,'0')}</b></div><div><span>${Object.keys(o.parts).length} documented parts · ${o.quiz.length} questions</span><h3>${esc(o.title)}</h3><p>${esc(o.blurb)}</p><strong>Open chapter ↗</strong></div></a>`}).join('')}</div></section>
 <section class="sec wrap"><div class="gyn-clinic rv"><div><span class="eyebrow">High-yield anatomy checkpoints</span><h2>Where to focus</h2><p>Cervical epithelium and transformation zone · ureter under uterine artery · ovarian pedicle and para-aortic lymph · vaginal fornices · vulvar and <a href="#/clitoralcomplex">clitoral erectile anatomy</a> · pelvic support compartments.</p></div><div><a href="#/gyncervix">Cervical histology →</a><a href="#/gynadnexa">Ovary & tube →</a><a href="#/gynsupport">Surgical planes →</a><a href="#/gynvulva">Vulvar landmarks →</a></div></div></section>
 <section class="sec wrap"><div class="sec-h rv"><div><div class="eyebrow">Extend the map</div><h2>Comparative male anatomy</h2></div></div><div class="gyn-compare">${['maletestis','maleprostate','penileerectile'].map(k=>{const o=ORGANS[k];return `<a href="${routeFor(k)}" class="gyn-tile rv"><div class="gyn-tile-pic"><img src="${imgSrc(o.photo.file,true)}" alt="${esc(o.title)} clinical render" loading="lazy"></div><div><span>${Object.keys(o.parts).length} structures</span><h3>${esc(o.title)}</h3><p>${esc(o.blurb)}</p><strong>Open chapter ↗</strong></div></a>`}).join('')}</div></section>`;
}

function viewOrgan(key){
  const o=ORGANS[key];
  const ids=liveIds(); const i=ids.indexOf(key);
  const prev=ids[(i-1+ids.length)%ids.length], next=ids[(i+1)%ids.length];
  const sys=SYSTEMS[o.system];
  const facts=[['System',sys.name],['Location',o.region],['Size / weight',o.size],['Blood supply',o.blood],['Innervation',o.nerve]];
  const controls=o.anims.map(a=>`<button class="btn sm" data-anim="${a.id}" aria-pressed="false"><span class="dot"></span>${esc(a.label)}</button>`).join('');
  const parts=Object.entries(o.parts).map(([id,p],idx)=>`
    <div class="part rv${p.contextOnly?' context-entry':''}" data-d="${idx%4}" data-pid="${id}">
      <button class="part-h" aria-expanded="false">${miniChip(o,id)}<span class="swatch" style="--c:${sys.color}"></span><strong>${esc(p.n)}</strong><span class="pill plan">${p.contextOnly?'Study note':esc(p.t)}</span></button>
      <div class="part-b">
        <p class="latin">${esc(p.l)}</p>
        <p>${esc(p.d)}</p>
        <p class="kv"><b>Function</b>${esc(p.f)}</p>
        <p class="kv"><b>Clinical</b>${esc(p.c)}</p>
        ${p.contextOnly?`<p class="context-caption">${p.deepRef?`Text adapted from <a href="${routeFor(p.deepRef)}">${esc(ORGANS[p.deepRef].title)} chapter →</a>. `:'Anatomy study note. '}Regional illustration is a reference, not a pin for this microscopic or deep structure.</p>`:''}
      </div>
    </div>`).join('');
  return `
  <nav class="crumb wrap" aria-label="Breadcrumb"><a href="#/">Home</a>${icon('chev')}<a href="#/organs">Organs</a>${icon('chev')}<a href="#/organs?sys=${o.system}">${sys.name}</a>${icon('chev')}<span>${esc(o.title)}</span></nav>
  <header class="organ-head wrap">
    <div>
      <div class="eyebrow">Organ · ${sys.name}</div>
      <h1 style="margin-top:10px">${esc(o.title)}<span class="latin">${esc(o.latin)}</span></h1>
      <p class="lead">${esc(o.blurb)}</p>
      ${o.study?`<div class="study-shortcuts"><button class="btn sm" data-study-jump="study-map">${key==='gynvulva'?'Surface anatomy reference':'Clinical anatomy map'} ↓</button><a class="btn sm" href="${key==='clitoralcomplex'?'#/gyn':key==='penileerectile'?'#/male':'#/deep'}">${key==='clitoralcomplex'?'Gynecology study path':key==='penileerectile'?'Male anatomy':'Deep anatomy path'} →</a></div>`:''}
      ${o.bones206?`<div class="skel-shortcuts"><button class="btn sm" data-skel-jump="bone-atlas">206 individual bones ↓</button><button class="btn sm" data-skel-jump="joint-atlas">${o.joints.length} joint families ↓</button></div>`:''}
    </div>
    <div class="pager">
      <a class="btn sm" href="${routeFor(prev)}" title="${esc(ORGANS[prev].title)}">${icon('left')} ${esc(ORGANS[prev].title.split(' ')[0])}</a>
      <a class="btn sm" href="${routeFor(next)}" title="${esc(ORGANS[next].title)}">${esc(ORGANS[next].title.split(' ')[0])} ${icon('arrow')}</a>
    </div>
  </header>
  <div class="viewer wrap">
    <div class="card stage-card rv">
      <div class="ctrl simple-ctrl">
        ${o.photo?`<button class="btn sm on" data-stage="photo" aria-pressed="true">${icon('eye')} Picture</button><button class="btn sm" data-stage="schema" aria-pressed="false">${icon('play')} Animated diagram</button>`:''}
        <details class="toolbox"><summary>More tools</summary><div class="toolbox-items">
          <span class="animset">${controls}</span>
          <button class="btn sm on" data-labels aria-pressed="true">${icon('tag')} Labels</button>
          <span class="zoom-controls"><button class="btn sm" data-zoom="-1" aria-label="Zoom out">−</button>
          <span class="zoomval" id="zval">100%</span>
          <button class="btn sm" data-zoom="1" aria-label="Zoom in">+</button>
          <button class="btn sm" data-zoom="0" aria-label="Reset zoom">${icon('reset')}</button></span>
        </div></details>
      </div>
      <p class="stage-tip">Tap a number to learn that part. Deeper notes are listed below.</p>
      <div class="diagram-scroll" id="dscroll"><div class="diagram" id="diagram"></div></div>
      <div class="stage-foot">
        <div class="legend">${o.legend.map(([c,l])=>`<i style="--c:${c}">${esc(l)}</i>`).join('')}</div>
        ${o.photo?`<span class="credit">${esc(o.photo.credit)}</span>`:''}
      </div>
      <div class="stage-foot" style="margin-top:8px">
        <span>${icon('info')} Pins mark visible structures only; deeper unpinned study notes are in the list below · <kbd>L</kbd> labels · <kbd>A</kbd> animate</span>
      </div>
    </div>
    <aside class="card info rv" data-d="1" id="info">
      <span class="pill" id="iType">Overview</span>
      <h3 id="iName">${esc(o.title)}</h3>
      <div class="latin" id="iLatin">${esc(o.latin)}</div>
      <p class="desc" id="iDesc">${esc(o.blurb)} Select a pin or open a study note below for anatomy, function and clinical context. Unpinned notes are not highlighted on the image.</p>
      <div class="box"><b>Function</b><span id="iFn">${esc(o.region)}</span></div>
      <div class="box clin"><b>Clinical pearl</b><span id="iRel">${esc(o.parts[Object.keys(o.parts)[0]].c)}</span></div>
      ${o.extra&&o.extra.rate&&o.anims.some(a=>a.cls)?`
      <div class="rate"><label for="rateIn">${esc(o.extra.rate.label)}</label>
        <input id="rateIn" type="range" min="${o.extra.rate.min}" max="${o.extra.rate.max}" value="${o.extra.rate.val}">
        <output id="rateOut">${o.extra.rate.val}${esc(o.extra.rate.unit)}</output></div>`:''}
      <div class="hint">${icon('bulb')} Tap a numbered pin to read about it, or switch to Animated diagram to see it move.</div>
      <div class="info-nav">
        <a class="btn sm" href="#/quiz?o=${key}">${icon('quiz')} Quiz me on this</a>
        <a class="btn sm" href="#/map">${icon('map')} Find on body map</a>
      </div>
    </aside>
  </div>
  <details class="chapter-overview wrap"><summary>Read the full overview <span>A longer explanation of this chapter</span></summary><p>${esc(o.summary)}</p></details>
  <details class="quick-facts wrap"><summary>Quick facts <span>Location, blood supply &amp; more</span></summary>
    <div class="facts">${facts.map(([b,v])=>`<div class="fact"><b>${b}</b><span>${esc(v)}</span></div>`).join('')}</div>
  </details>
  <section class="sec wrap" style="padding-top:34px">
    <div class="sec-h rv"><div><div class="eyebrow">Learn more</div><h2>Parts of the ${esc(o.title.toLowerCase())}</h2><p>Open a part for what it does and why it matters. All ${Object.keys(o.parts).length} entries are here, including ${Object.values(o.parts).filter(p=>p.contextOnly).length} deeper study notes that are not pinned to the picture.</p></div></div>
    <div class="parts">${parts}</div>
  </section>
  ${key==='muscle'?muscleAtlasSection():''}
  ${key==='male'||key==='female'?reproductiveMuscleSection(key):''}
  ${o.study?studySection(o,key):''}
  ${o.bones206?boneSection(o):''}
  ${o.joints?jointSection(o):''}
  <section class="sec wrap" style="padding-top:0">
    <div class="sec-h rv"><div><div class="eyebrow">Keep going</div><h2>Related organs</h2></div></div>
    <div class="related">${(o.related||[]).map(r=>ORGANS[r]?`<a class="rel" href="${routeFor(r)}"><span class="rt">${ORGANS[r].photo?`<img src="${imgSrc(ORGANS[r].photo.file,true)}" alt="" loading="lazy">`:thumbSVG(ORGANS[r])}</span><span><strong>${esc(ORGANS[r].title)}</strong><span>${esc(ORGANS[r].latin)}</span></span></a>`:'').join('')}</div>
  </section>`;
}

function viewMap(){
  return `
  <section class="hero wrap" style="padding-bottom:14px">
    <div class="eyebrow">Interactive body map</div>
    <h1 style="font-size:clamp(34px,4.6vw,50px);margin-top:12px">Where is it, really?</h1>
    <p class="lead" style="margin-top:12px">Hover a glowing region to identify it, click to read about it and jump to its full diagram. Switch between anterior and posterior views.</p>
  </section>
  <div class="map-wrap wrap">
    <div class="map-card rv">
      <div class="ctrl" style="margin-bottom:10px">
        <button class="btn sm on" data-view="anterior" aria-pressed="true">Anterior</button>
        <button class="btn sm" data-view="posterior" aria-pressed="false">Posterior</button>
        <span class="spacer"></span>
        <button class="btn sm" data-mapreset>Clear selection</button>
      </div>
      <div id="mapStage"></div>
    </div>
    <aside class="card info map-side rv" data-d="1" id="mapSide">
      <span class="pill">Body map</span>
      <h3 id="mName">Select a region</h3>
      <div class="latin" id="mLatin">Anterior view · 17 regions</div>
      <p class="desc" id="mDesc">Every glowing shape is an organ in its true position. Hover to see its name; click to open its entry here.</p>
      <div class="box"><b>System</b><span id="mSys">—</span></div>
      <div class="info-nav"><a class="btn sm primary" id="mOpen" href="#/heart" style="display:none">Open full diagram ${icon('arrow')}</a></div>
      <div class="hint" style="margin-top:16px">${icon('bulb')} Positions are schematic but topologically correct: right side of the body appears on your left, as in clinical imaging.</div>
    </aside>
  </div>`;
}

function viewSystems(){
  const cards=Object.entries(SYSTEMS).map(([k,s],i)=>{
    const members=ORG().filter(([,o])=>o.system===k);
    return `<div class="card step rv" data-d="${i%4}" style="display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;align-items:center;gap:10px"><span class="pill" style="background:${s.color}18;color:${s.color};border-color:${s.color}40">${s.name}</span><span style="font-size:11px;color:var(--mute-2);font-weight:700">${members.length} organ${members.length===1?'':'s'}</span></div>
      <p style="font-size:13.8px;color:var(--mute)">${esc(s.d)}</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:auto">
        ${members.map(([id,o])=>`<a class="chip" style="text-decoration:none" href="${routeFor(id)}">${esc(o.title)}</a>`).join('')}
      </div>
    </div>`;
  }).join('');
  return `
  <section class="hero wrap" style="padding-bottom:16px">
    <div class="eyebrow">Organisation</div>
    <h1 style="font-size:clamp(34px,4.6vw,50px);margin-top:12px">Body systems</h1>
    <p class="lead" style="margin-top:12px">Organs never work alone. Each system below groups the illustrated organs by shared function, with the ones still on the drawing board listed separately.</p>
  </section>
  <section class="wrap" style="padding-bottom:30px"><div class="steps" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">${cards}</div></section>
  <section class="sec wrap" style="padding-top:0">
    <div class="sec-h rv"><div><div class="eyebrow">Roadmap</div><h2>Coming to the atlas</h2><p>Planned entries — same treatment: hand-drawn labelled diagram, animations, clinical notes and quiz.</p></div></div>
    <div class="grid">${PLANNED.map(([n,l,d])=>`<div class="tile off rv"><div class="thumb"><span style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:800">planned</span></div><div class="tile-body"><h3>${esc(n)}</h3><div class="latin">${esc(l)}</div><p class="blurb">${esc(d)}</p></div></div>`).join('')}</div>
  </section>`;
}

function viewAbout(){
  return `
  <section class="hero wrap" style="padding-bottom:8px">
    <div class="eyebrow">About Corpus</div>
    <h1 style="font-size:clamp(34px,4.6vw,50px);margin-top:12px">An atlas you can argue with</h1>
  </section>
  <section class="wrap" style="padding-bottom:40px">
    <div class="two">
      <div class="prose rv">
        <p><b>Corpus began as a single heart diagram</b> and grew into a full teaching atlas: ${STATS.organs} organs, ${STATS.structures} documented anatomy parts, ${STATS.questions} exam-style questions, an interactive body map and a quiz engine — all in one offline-capable web page.</p>
        <p>Every illustration is <b>hand-authored vector art</b>, drawn in a consistent schematic style: anterior or sectioned views, standard orientation (the body's right on your left), colour-coded vessels and tissues, with leader-line labels laid out automatically so they never collide.</p>
        <p>The animations are not decoration. The cardiac cycle contracts atria then ventricles in the correct sequence; breathing expands the lungs while the diaphragm descends; peristalsis travels aborally; nerve signals run along real pathways. If a motion would mislead, it isn't there.</p>
        <h3>What Corpus is for</h3>
        <ul>
          <li><b>First exposure:</b> meet an organ's geography before a textbook chapter.</li>
          <li><b>Revision:</b> label-on/label-off mode doubles as flashcards.</li>
          <li><b>Teaching:</b> project a diagram, toggle the animation, ask the built-in questions.</li>
          <li><b>Clinical linking:</b> every documented anatomy part carries a clinical pearl.</li>
        </ul>
        <h3>What Corpus is not</h3>
        <ul>
          <li>Not a radiological or surgical reference — proportions are deliberately schematic.</li>
          <li>Not medical advice, and not a substitute for Gray's, Netter's or your curriculum.</li>
          <li>Not tracked, not gated: no accounts, no analytics, no network calls.</li>
        </ul>
      </div>
      <div class="rv" data-d="1">
        <div class="callout" style="margin-bottom:14px"><h3>Design notes</h3><p>Paper-and-ink palette, serif display type, dark viewing stage for the diagrams. Labels auto-layout in two columns with collision avoidance; zoom is pure vector scaling.</p></div>
        <div class="callout" style="margin-bottom:14px;border-color:var(--rust)"><h3>Accessibility</h3><p>Keyboard-navigable structures, ARIA labels, focus rings, reduced-motion support (button and OS preference), and print-friendly diagrams.</p></div>
        <div class="callout" style="border-color:var(--gold)"><h3>Shortcuts</h3><p><kbd>/</kbd> search · <kbd>L</kbd> labels · <kbd>A</kbd> animate · <kbd>←</kbd>/<kbd>→</kbd> previous/next organ · <kbd>Esc</kbd> clear selection.</p></div>
      </div>
    </div>
  </section>`;
}


/* ---------- male / female section hubs ---------- */
const SILP=`M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z`;
function viewSection(g){
  const male=g==='male';
  const ids=male?['malebody','male','maletestis','maleprostate','penileerectile','malepelvis','nervousmale','vascular','muscle','skeleton','lymph']
                :['femalebody','female','gynuterus','gyncervix','gynadnexa','gynvagina','gynvulva','clitoralcomplex','gynsupport','femalepelvis','breast','nervousfemale','vascular','muscle','skeleton','lymph'];
  const cards=ids.map((k,i)=>{const o=ORGANS[k];return `<a class="tile rv" data-d="${i%4}" href="${routeFor(k)}">
      <span class="badge pill live">Live</span>
      <div class="thumb">${o.photo?`<img src="${imgSrc(o.photo.file,true)}" alt="" loading="lazy">`:thumbSVG(o)}</div>
      <div class="tile-body"><h3>${esc(o.title)}</h3><div class="latin">${esc(o.latin)}</div>
      <p class="blurb">${esc(o.blurb)}</p>
      <div class="tile-foot"><span>${Object.keys(o.parts).length} parts</span><span class="arrow">${icon('arrow')}</span></div></div></a>`}).join('');
  const dots=(male?[[210,50],[210,150],[200,190],[222,190],[210,250],[190,300],[230,300],[210,360],[180,430],[240,430],[210,520],[190,640],[230,640]]
                  :[[210,50],[210,150],[196,190],[224,190],[210,250],[186,236],[234,236],[210,360],[180,430],[240,430],[210,500],[190,640],[230,640]])
    .map(([x,y],i)=>`<circle class="sdot" cx="${x}" cy="${y}" r="7" style="animation-delay:${(0.5+i*0.14).toFixed(2)}s"/>`).join('');
  return `
  <section class="sec-intro" style="--accent:${male?'#2b7f8f':'#a34a6a'}">
    <div class="wrap intro-grid">
      <div class="intro-copy rv in">
        <div class="eyebrow">${male?'Male anatomy':'Female anatomy'} · full section</div>
        <h1>${male?'The male body, system by system':'The female body, system by system'}</h1>
        <p class="lead">${male?'From the glass-body overview to the reproductive tract, the male nervous system and the vascular map — every page below is a full chapter with its own realistic render, documented parts and quiz.':'From the glass-body overview to breasts, uterus and ovaries, the female nervous system and the vascular map — every page below is a full chapter with its own realistic render, documented parts and quiz.'}</p>
        <div class="intro-facts">
          <span class="pill live">${ids.length} chapters</span>
          <span class="pill">${ids.reduce((n,k)=>n+Object.keys(ORGANS[k].parts).length,0)} documented parts</span>
          <span class="pill gold">Animated intro</span>
        </div>
        <div class="hero-cta" style="margin-top:18px">
          <a class="btn primary" href="#/${male?'malebody':'femalebody'}">Start: body overview</a>
          <a class="btn" href="${routeFor(male?'male':'female')}">Reproductive system</a>
          <a class="btn" href="#/${male?'nervousmale':'nervousfemale'}">Nervous system</a>
          <a class="btn" href="#/muscle?g=${male?'male-pelvis':'female-pelvis'}">Pelvic muscles</a>
          ${!male?'<a class="btn" href="#/gyn">Gynecology study path</a>':''}<a class="btn" href="#/deep">Deep anatomy chapters</a>
        </div>
      </div>
      <div class="intro-fig rv in" data-d="1">
        <svg viewBox="0 0 420 760" aria-hidden="true">
          <defs><linearGradient id="sw-${g}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="transparent"/><stop offset=".5" stop-color="${male?'rgba(110,231,183,.35)':'rgba(232,146,180,.35)'}"/><stop offset="1" stop-color="transparent"/>
          </linearGradient></defs>
          <path class="draw" d="${SILP}" fill="rgba(255,255,255,.03)" stroke="${male?'#8fd8c8':'#e892b4'}" stroke-width="2.4"/>
          <rect class="sweep" x="0" y="0" width="420" height="150" fill="url(#sw-${g})" opacity=".55"/>
          <g fill="${male?'#8ff0d8':'#f3b7cb'}">${dots}</g>
        </svg>
      </div>
    </div>
  </section>
  <section class="sec wrap sex-figure-section"><div class="sex-figure-card rv"><div class="sex-figure-image"><img src="${imgSrc(male?'male-ecorche-reference.png':'female-ecorche-v2.jpg')}" alt="Full-body ${male?'male':'female'} anterior écorché medical illustration on a black background, showing muscles, skeletal thorax, arms, pelvis and legs" loading="lazy"></div><div class="sex-figure-copy"><div class="eyebrow">${male?'Male reference figure':'Female counterpart · matched view'}</div><h2>${male?'The reference, anatomically layered.':'The female figure, at the same depth.'}</h2><p>${male?'This is the supplied male reference figure used to set the visual standard. Compare it with the female view: both retain the frontal stance and black-background écorché look.':'A new female écorché created to match the supplied male reference: same frontal full-body stance, exposed muscular groups and partial rib-cage window, with female proportions and breast tissue represented separately.'} These are illustrative teaching plates, not photographs or a claim that every individual muscle is anatomically visible at once.</p><div class="hero-cta"><a class="btn primary" href="#/muscle">Explore named muscles →</a><a class="btn" href="#/explorer">Peel anatomical layers →</a><a class="btn" href="#/${male?'female':'male'}">Compare ${male?'female':'male'} →</a></div></div></div></section>
  <section class="sec wrap" style="padding-top:26px">
    <div class="sec-h rv"><div><div class="eyebrow">Chapters</div><h2>${male?'Male':'Female'} anatomy chapters</h2><p>Each chapter opens with a realistic render and numbered pins for visible anatomy; the schematic tab adds motion, while unpinned deep notes explain hidden layers.</p></div>
    <a class="btn sm" href="#/organs">All organs ${icon('arrow')}</a></div>
    <div class="grid">${cards}</div>
  </section>
  <section class="sec wrap" style="padding-top:0">
    <div class="callout rv"><h3>Male vs female — the differences that matter</h3>
    <p>Beyond the reproductive tracts: pelvic shape (wide, shallow vs narrow, tall), laryngeal prominence and voice pitch, muscle-mass and fat-distribution patterns, breast development, skull and brow morphology, and hormone-driven physiology from bone density to red-cell mass. Study the two body-overview pages side by side to see them at a glance.</p></div>
  </section>`;
}

/* ---------- quiz engine ---------- */
const QUIZ={mode:null,queue:[],idx:0,score:0,picked:null,done:false,organ:null};
function buildQueue(organKey){
  const items=[];
  const pool=organKey?[organKey]:liveIds();
  pool.forEach(k=>{ORGANS[k].quiz.forEach(q=>items.push({type:'mc',k,q}))});
  pool.forEach(k=>{
    const ids=Object.keys(ORGANS[k].parts).filter(id=>!ORGANS[k].parts[id].contextOnly);
    shuffle(ids).slice(0,organKey?4:2).forEach(pid=>items.push({type:'id',k,pid}));
  });
  return shuffle(items).slice(0,organKey?8:12);
}
function viewQuiz(params){
  const requested=params.get('o');
  QUIZ.organ=hasOrgan(requested)?requested:null;
  return `<section class="hero wrap quiz" style="padding-bottom:16px">
    <div class="eyebrow">Self-test</div>
    <h1 style="font-size:clamp(30px,4vw,44px);margin-top:12px">${QUIZ.organ?`Quiz: ${esc(ORGANS[QUIZ.organ].title)}`:'Quiz yourself'}</h1>
    <p class="lead" style="margin-top:10px">Twelve mixed questions: clinical multiple-choice plus spot-the-structure rounds using the real diagrams. Explanations after every answer.</p>
  </section>
  <section class="wrap quiz" id="quizBox"></section>`;
}
function quizStart(){
  QUIZ.queue=buildQueue(QUIZ.organ);QUIZ.idx=0;QUIZ.score=0;QUIZ.done=false;
  renderQ();
}
function renderQ(){
  const box=$('#quizBox'); if(!box) return;
  if(QUIZ.done){return quizResults()}
  const it=QUIZ.queue[QUIZ.idx];
  const o=ORGANS[it.k];
  QUIZ.picked=null;
  let qtext, opts, explain;
  if(it.type==='mc'){
    qtext=it.q.q; opts=it.q.opts; explain=it.q.why; QUIZ.answer=it.q.a;
  }else{
    const p=o.parts[it.pid];
    qtext=`Identify the highlighted structure in the ${o.title.toLowerCase()} diagram.`;
    const others=shuffle(Object.keys(o.parts).filter(x=>x!==it.pid)).slice(0,3).map(x=>o.parts[x].n);
    opts=shuffle([p.n,...others]); QUIZ.answer=opts.indexOf(p.n); explain=`${p.n} (${p.l}) — ${p.f}`;
  }
  QUIZ.explain=explain; QUIZ.opts=opts;
  box.innerHTML=`<div class="card qcard rv in">
    <div class="qbar"><span class="qmeta">Q ${QUIZ.idx+1} / ${QUIZ.queue.length}</span><div class="prog"><i style="width:${(QUIZ.idx/QUIZ.queue.length)*100}%"></i></div><span class="qmeta">score ${QUIZ.score}</span></div>
    ${it.type==='id'?`<div class="diagram-scroll" style="max-height:340px;margin-bottom:20px"><div class="diagram">${svgFor(o)}</div></div>`:''}
    <h2 class="qtext">${esc(qtext)}</h2>
    <div class="opts" role="group" aria-label="Answers">${opts.map((t,i)=>`<button class="opt" data-i="${i}"><span class="key">${'ABCD'[i]}</span><span>${esc(t)}</span></button>`).join('')}</div>
    <div class="qexpl" id="qexpl"><b>Why</b><span>${esc(explain)}</span></div>
    <div class="qfoot"><button class="btn primary" id="qnext" disabled>${QUIZ.idx===QUIZ.queue.length-1?'See results':'Next question'} ${icon('arrow')}</button>
    <button class="btn" id="qquit">End quiz</button></div>
  </div>`;
  if(it.type==='id'){
    const svg=$('.diagram svg',box);
    svg.classList.add('dim');
    $$(`[data-id="${it.pid}"]`,svg).forEach(e=>e.classList.add('sel'));
    svg.querySelector('.lbl-layer')?.remove();
  }
  $$('.opt',box).forEach(b=>b.addEventListener('click',()=>{
    if(QUIZ.picked!==null) return;
    QUIZ.picked=+b.dataset.i;
    const right=QUIZ.picked===QUIZ.answer;
    if(right) QUIZ.score++;
    $$('.opt',box).forEach((el,i)=>{el.disabled=true; if(i===QUIZ.answer)el.classList.add('right'); else if(i===QUIZ.picked)el.classList.add('wrong')});
    $('#qexpl').classList.add('on');
    $('#qnext').disabled=false;
    $('.qbar .prog i',box).style.width=((QUIZ.idx+1)/QUIZ.queue.length*100)+'%';
  }));
  $('#qnext').addEventListener('click',()=>{QUIZ.idx++; if(QUIZ.idx>=QUIZ.queue.length)QUIZ.done=true; renderQ()});
  $('#qquit').addEventListener('click',()=>{QUIZ.done=true;renderQ()});
}
function quizResults(){
  const box=$('#quizBox');
  const pct=Math.round(QUIZ.score/QUIZ.queue.length*100);
  const circ=2*Math.PI*56;
  box.innerHTML=`<div class="card qcard rv in" style="text-align:center">
    <div class="eyebrow" style="justify-content:center">Result</div>
    <svg class="score-ring" viewBox="0 0 132 132" style="margin-top:16px">
      <circle cx="66" cy="66" r="56" stroke="var(--paper-2)"/>
      <circle cx="66" cy="66" r="56" stroke="${pct>=70?'#2f8f5b':pct>=40?'var(--gold)':'var(--rust)'}" stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-pct/100)}" transform="rotate(-90 66 66)"/>
      <text x="66" y="62" text-anchor="middle" style="font:600 30px var(--serif);fill:var(--ink)">${pct}%</text>
      <text x="66" y="84" text-anchor="middle" style="font:700 11px var(--sans);fill:var(--mute)">${QUIZ.score} / ${QUIZ.queue.length}</text>
    </svg>
    <h2 style="font-size:26px">${pct>=80?'Outstanding — that is exam-ready.':pct>=60?'Solid. One more pass and it sticks.':pct>=40?'Getting there — revisit the diagrams.':'Worth another lap of the atlas.'}</h2>
    <p class="lead" style="margin:10px auto 0">${pct>=60?'Re-run the quiz for a fresh random set, or try the identification-only mode on a single organ.':'Open any organ, switch labels off, and try naming every structure before switching them back on.'}</p>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap">
      <button class="btn primary" id="qagain">${icon('reset')} Try again</button>
      <a class="btn" href="#/organs">Back to organs</a>
      <a class="btn" href="#/">Home</a>
    </div>
  </div>`;
  $('#qagain').addEventListener('click',quizStart);
}

/* ---------- body map ---------- */
const SILHOUETTE=`M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z`;
function mapSVG(view){
  const items=BODYMAP[view];
  const shapes=items.map((h,i)=>{
    const o=ORGANS[h.id]; const c=SYSTEMS[o.system].color;
    return `<ellipse class="hot" data-id="${h.id}" data-i="${i}" cx="${h.x}" cy="${h.y}" rx="${h.r}" ry="${h.r*0.82}" fill="${c}" fill-opacity=".78" stroke="#dff2ee" stroke-width="1.4"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${BODYMAP.vb[0]} ${BODYMAP.vb[1]}" role="img" aria-label="Body map, ${view} view">
    <defs><linearGradient id="bm-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17332f"/><stop offset="1" stop-color="#0a1615"/></linearGradient></defs>
    <rect width="${BODYMAP.vb[0]}" height="${BODYMAP.vb[1]}" fill="url(#bm-bg)" rx="24"/>
    <g opacity=".5" fill="none" stroke="#7fa39c" stroke-width="1">
      ${Array.from({length:18},(_,i)=>`<path d="M0 ${(i+1)*40} H${BODYMAP.vb[0]}"/>`).join('')}
    </g>
    <path d="${SILHOUETTE}" fill="#0f2321" stroke="#3d6b64" stroke-width="2"/>
    <path d="${SILHOUETTE}" fill="none" stroke="#8fd8c8" stroke-width="1" opacity=".35"/>
    <g class="hots">${shapes}</g>
    <g id="mapTip"></g>
  </svg>`;
}
function bindMap(){
  const stage=$('#mapStage'); if(!stage) return;
  let view='anterior';
  const draw=()=>{stage.innerHTML=mapSVG(view);wire()};
  const wire=()=>{
    const svg=$('svg',stage);
    $$('.hot',svg).forEach(el=>{
      el.addEventListener('mouseenter',()=>{
        const o=ORGANS[el.dataset.id];
        $('#mapTip').innerHTML=`<text class="map-tip" x="${el.getAttribute('cx')}" y="${+el.getAttribute('cy')-el.getAttribute('ry')-8}" text-anchor="middle">${esc(o.title)}</text>`;
      });
      el.addEventListener('mouseleave',()=>{$('#mapTip').innerHTML=''});
      el.addEventListener('click',()=>{
        $$('.hot',svg).forEach(h=>h.classList.remove('sel'));
        el.classList.add('sel'); svg.classList.add('map-dim');
        const o=ORGANS[el.dataset.id], s=SYSTEMS[o.system];
        $('#mName').textContent=o.title; $('#mLatin').textContent=o.latin;
        $('#mDesc').textContent=o.blurb;
        $('#mSys').textContent=s.name;
        const open=$('#mOpen'); open.style.display=''; open.href=routeFor(el.dataset.id);
      });
    });
  };
  draw();
  $$('[data-view]').forEach(b=>b.addEventListener('click',()=>{
    view=b.dataset.view;
    $$('[data-view]').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
    $('#mapSide').classList.remove('map-dim');
    $('#mName').textContent='Select a region';$('#mLatin').textContent=(view==='anterior'?'Anterior':'Posterior')+' view';
    $('#mDesc').textContent='Every glowing shape is an organ in its true position. Hover to see its name; click to open its entry here.';
    $('#mSys').textContent='—';$('#mOpen').style.display='none';
    draw();
  }));
  $('[data-mapreset]').addEventListener('click',()=>{
    const svg=$('svg',stage); svg.classList.remove('map-dim');
    $$('.hot',svg).forEach(h=>h.classList.remove('sel'));
    $('#mName').textContent='Select a region';$('#mOpen').style.display='none';$('#mSys').textContent='—';
  });
}

/* ---------- diagram interactions ---------- */
function bindOrgan(key){
  const o=ORGANS[key];
  const scroll=$('#dscroll'), diagram=$('#diagram');
  const iType=$('#iType'),iName=$('#iName'),iLatin=$('#iLatin'),iDesc=$('#iDesc'),iFn=$('#iFn'),iRel=$('#iRel');
  let zoom=1, view=o.photo?'photo':'schema', labelsOn=!matchMedia('(max-width:620px)').matches;
  const animsOn=new Set();
  let svg=null;

  const setZoom=z=>{zoom=Math.min(3,Math.max(1,z));diagram.style.width=(zoom*100)+'%';$('#zval').textContent=Math.round(zoom*100)+'%'};
  $$('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{
    const d=+b.dataset.zoom; setZoom(d===0?1:zoom+(d>0?0.25:-0.25));
  }));

  /* ----- stage renderers ----- */
  function photoWrap(){
    const p=o.photo;
    const ids=Object.keys(p.hot).filter(pid=>o.parts[pid]);
    const dense={};
    ids.forEach((a,i)=>ids.forEach((b,j)=>{
      if(j<=i) return;
      const [x1,y1]=p.hot[a],[x2,y2]=p.hot[b];
      if(Math.hypot(x1-x2,(y1-y2)*.9)<95){dense[a]=1;dense[b]=1}
    }));
    const pins=ids.map((pid,i)=>`<button class="pin${dense[pid]?' dense':''}" data-id="${pid}" style="left:${(p.hot[pid][0]/10).toFixed(2)}%;top:${(p.hot[pid][1]/10).toFixed(2)}%" aria-label="${esc(o.parts[pid].n)}"><i>${i+1}</i><span class="pchip">${i+1} · ${esc(o.parts[pid].n)}</span></button>`).join('');
    const key=`<details class="pinkey"><summary>Pin key — ${ids.length} structures</summary><ol>${ids.map((pid,i)=>`<li><b>${i+1}</b>${esc(o.parts[pid].n)}</li>`).join('')}</ol></details>`;
    return `<div class="photo-wrap"><img src="${imgSrc(p.file)}" alt="${esc(o.title)} — realistic anatomical render" draggable="false">
      <div class="pins${labelsOn?' lbls':''}">${pins}</div></div>${key}`;
  }
  function buildSvg(){
    diagram.innerHTML=svgFor(o);
    svg=$('svg',diagram);
    decorateBrain(svg);
    animsOn.forEach(id=>{
      const a=o.anims.find(x=>x.id===id); if(!a) return;
      if(a.cls) svg.classList.add(a.cls);
      if(a.layer&&!svg.querySelector('[data-animlayer="'+id+'"]'))
        $('.anim-layer',svg).insertAdjacentHTML('beforeend',a.layer.replace('<g class="flow-layer"','<g data-animlayer="'+id+'" class="flow-layer"'));
    });
    if(!labelsOn) svg.classList.add('nolbl');
    $$('.part[data-id]',svg).forEach(el=>{
      el.setAttribute('tabindex','0'); el.setAttribute('role','button');
      el.setAttribute('aria-label',o.parts[el.dataset.id]?.n||'structure');
      el.addEventListener('click',()=>select(el.dataset.id));
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(el.dataset.id)}});
    });
    $$('.hoverlab',svg).forEach(el=>el.addEventListener('click',()=>select(el.dataset.id)));
  }
  function renderStage(){
    if(view==='photo'&&o.photo){ diagram.innerHTML=photoWrap(); svg=null;
      $$('.pin',diagram).forEach(b=>b.addEventListener('click',()=>select(b.dataset.id)));
    } else buildSvg();
    syncSel();
  }
  $$('[data-stage]').forEach(b=>b.addEventListener('click',()=>{
    view=b.dataset.stage;
    $$('[data-stage]').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
    renderStage();
  }));

  /* ----- selection ----- */
  let selId=null;
  function syncSel(){
    if(svg){
      svg.classList.toggle('dim',!!selId&&!o.parts[selId]?.contextOnly);
      $$('.part.sel',svg).forEach(e=>e.classList.remove('sel'));
      if(selId) $$(`.part[data-id="${selId}"]`,svg).forEach(e=>e.classList.add('sel'));
      $$('.hoverlab',svg).forEach(e=>e.classList.toggle('on',e.dataset.id===selId));
    }
    const pins=$('.pins',diagram);
    if(pins){
      pins.classList.toggle('dimmed',!!selId&&!o.parts[selId]?.contextOnly);
      $$('.pin',pins).forEach(p=>p.classList.toggle('sel',p.dataset.id===selId));
    }
    $$('.parts .part').forEach(row=>row.classList.toggle('sel',row.dataset.pid===selId));
  }
  function select(id){
    selId=id; syncSel();
    const p=o.parts[id]; if(!p) return;
    iType.textContent=p.contextOnly?'Study note · unpinned':p.t; iName.textContent=p.n; iLatin.textContent=p.l;
    iDesc.textContent=(p.contextOnly?'Not localized on this image. ':'')+p.d; iFn.textContent=p.f; iRel.textContent=p.c;
  }
  function clearSel(){
    selId=null; syncSel();
    iType.textContent='Overview'; iName.textContent=o.title; iLatin.textContent=o.latin;
    iDesc.textContent=o.blurb+' Select a pin or open a study note below for anatomy, function and clinical context. Unpinned notes are not highlighted on the image.';
    iFn.textContent=o.region; iRel.textContent=o.parts[Object.keys(o.parts)[0]].c;
    $$('.parts .part').forEach(row=>row.classList.remove('sel'));
  }

  /* ----- anims ----- */
  $$('[data-anim]').forEach(btn=>{
    const a=o.anims.find(x=>x.id===btn.dataset.anim);
    btn.addEventListener('click',()=>{
      const on=btn.getAttribute('aria-pressed')!=='true';
      btn.setAttribute('aria-pressed',on); btn.classList.toggle('on',on);
      if(on){ animsOn.add(a.id); if(view!=='schema'){ view='schema'; $$('[data-stage]').forEach(x=>{const is=x.dataset.stage==='schema';x.classList.toggle('on',is);x.setAttribute('aria-pressed',is)}); renderStage(); return; } }
      else animsOn.delete(a.id);
      if(!svg) return;
      if(a.cls) svg.classList.toggle(a.cls,on);
      if(a.layer){
        let g=svg.querySelector('[data-animlayer="'+a.id+'"]');
        if(on&&!g){ $('.anim-layer',svg).insertAdjacentHTML('beforeend',a.layer.replace('<g class="flow-layer"','<g data-animlayer="'+a.id+'" class="flow-layer"')); }
        g=svg.querySelector('[data-animlayer="'+a.id+'"]');
        if(g) g.style.display=on?'':'none';
      }
    });
  });
  const lblBtn=$('[data-labels]');
  if(!labelsOn){lblBtn.classList.remove('on');lblBtn.setAttribute('aria-pressed','false')}
  lblBtn.addEventListener('click',()=>{
    labelsOn=lblBtn.getAttribute('aria-pressed')!=='true';
    lblBtn.setAttribute('aria-pressed',labelsOn); lblBtn.classList.toggle('on',labelsOn);
    if(svg) svg.classList.toggle('nolbl',!labelsOn);
    const pins=$('.pins',diagram); if(pins) pins.classList.toggle('lbls',labelsOn);
  });

  $$('.parts .part').forEach(row=>{
    const h=$('.part-h',row);
    h.addEventListener('click',()=>{
      const open=row.classList.toggle('open');
      h.setAttribute('aria-expanded',open);
      select(row.dataset.pid);
    });
  });

  const rate=$('#rateIn');
  if(rate){
    const out=$('#rateOut');
    const apply=()=>{
      const v=+rate.value; out.textContent=v+o.extra.rate.unit;
      const dur=(o.extra.rate.scale||60)/v;
      if(svg) svg.style.setProperty(o.anims.find(a=>a.cls)?.cls==='breathe'?'--breath':'--beat',dur.toFixed(2)+'s');
    };
    rate.addEventListener('input',apply); apply();
  }
  document.addEventListener('keydown',organKeys);
  function organKeys(e){
    if(e.target.matches('input,textarea')) return;
    if(e.key==='l'||e.key==='L') lblBtn.click();
    if(e.key==='a'||e.key==='A') $$('[data-anim]')[0]?.click();
    if(e.key==='Escape') clearSel();
    if(e.key==='ArrowRight') location.hash=routeFor(liveIds()[(liveIds().indexOf(key)+1)%liveIds().length]);
    if(e.key==='ArrowLeft') location.hash=routeFor(liveIds()[(liveIds().indexOf(key)-1+liveIds().length)%liveIds().length]);
  }
  window.__organCleanup=()=>document.removeEventListener('keydown',organKeys);
  renderStage();
}

/* ---------- home showcase ---------- */
function bindShowcase(){
  const stage=$('#scStage'); if(!stage) return;
  let timer=null, cur='heart';
  const stop=()=>{if(timer){clearInterval(timer);timer=null}};
  const load=(k)=>{
    stop(); cur=k;
    const o=ORGANS[k];
    if(o.photo){
      const ids=Object.keys(o.photo.hot).filter(pid=>o.parts[pid]).slice(0,9);
      stage.innerHTML=`<div class="photo-wrap"><img src="${imgSrc(o.photo.file,true)}" alt="${esc(o.title)} — realistic render">
        <div class="pins">${ids.map((pid,i)=>`<button class="pin" data-id="${pid}" style="left:${(o.photo.hot[pid][0]/10).toFixed(2)}%;top:${(o.photo.hot[pid][1]/10).toFixed(2)}%"><i>${i+1}</i><span class="pchip">${esc(o.parts[pid].n)}</span></button>`).join('')}</div></div>`;
      const pins=$$('.pin',stage); let idx=-1;
      const step=()=>{
        if(!document.body.contains(stage)){stop();return}
        idx=(idx+1)%pins.length; pins.forEach((p,i)=>p.classList.toggle('sel',i===idx));
        const h=$('#scHint'); if(h) h.textContent=(idx+1)+'. '+o.parts[pins[idx].dataset.id].n+' — click to preview';};
      step(); timer=setInterval(step,2300);
      pins.forEach(p=>p.addEventListener('click',()=>{stop();pins.forEach(x=>x.classList.toggle('sel',x===p));
        $('#scHint').textContent=o.parts[p.dataset.id].n+' — '+o.parts[p.dataset.id].t;}));
    }else{
      stage.innerHTML=svgFor(o); decorateBrain($('svg',stage));
      const a=o.anims[0]; if(a){if(a.cls)$('svg',stage).classList.add(a.cls); if(a.layer) $('.anim-layer',$('svg',stage)).insertAdjacentHTML('beforeend',a.layer);}
      $('#scHint').textContent='click any structure to read about it';
    }
    $('#scName').textContent=o.title; $('#scLatin').textContent=o.latin;
    $('#scOpen').href=routeFor(k);
  };
  load('heart');
  $$('#scTabs .sc-tab').forEach(b=>b.addEventListener('click',()=>{
    $$('#scTabs .sc-tab').forEach(x=>x.classList.toggle('on',x===b));
    load(b.dataset.sc);
  }));
}
/* ---------- organs filter ---------- */
function bindOrgansFilter(){
  const grid=$('#orgGrid'); if(!grid) return;
  const input=$('#flib');
  const tiles=$$('.tile',grid).filter(t=>t.matches('a.tile'));
  const apply=()=>{
    const sys=$('#sysChips .chip.on')?.dataset.sys||'';
    const q=input.value.trim().toLowerCase();
    let shown=0;
    tiles.forEach(t=>{
      const slug=t.getAttribute('href').slice(2);
      const k=slug==='maleoverview'?'male':slug==='femaleoverview'?'female':slug;
      const o=ORGANS[k];
      const okSys=!sys||o.system===sys;
      const hay=(o.title+' '+o.latin+' '+o.blurb+' '+Object.values(o.parts).map(p=>p.n).join(' ')).toLowerCase();
      const okQ=!q||hay.includes(q);
      const show=okSys&&okQ;
      t.style.display=show?'':'none'; if(show)shown++;
    });
    $$('.tile.off',grid).forEach(t=>t.style.display=(!sys&&!q)?'':'none');
    $('#noRes').style.display=shown?'none':'block';
  };
  input.addEventListener('input',apply);
  $$('#sysChips .chip').forEach(c=>c.addEventListener('click',()=>{
    $$('#sysChips .chip').forEach(x=>x.classList.toggle('on',x===c)); apply();
  }));
  apply();
}

/* ---------- search ---------- */
const INDEX=(()=>{
  const rows=[];
  ORG().forEach(([k,o])=>{
    const h0=o.photo&&Object.values(o.photo.hot)[0];
    rows.push({k,label:o.title,sub:o.latin+' · organ',hay:(o.title+' '+o.latin+' '+o.blurb+' '+o.summary+' '+(o.study?.cards||[]).map(c=>c.join(' ')).join(' ')).toLowerCase(),detail:o.summary,href:routeFor(k),im:o.photo?[o.photo.file,(h0||[500,400])[0],(h0||[500,400])[1]]:null});
    Object.entries(o.parts).forEach(([pid,p])=>{const hh=!p.contextOnly&&o.photo&&o.photo.hot&&o.photo.hot[pid];rows.push({k,label:p.n,sub:o.title+' · '+(p.contextOnly?'Deep study note':p.t),hay:(p.n+' '+p.l+' '+o.title+' '+p.t+' '+p.d+' '+p.f+' '+p.c).toLowerCase(),detail:p.d+' '+p.f,href:routeFor(k),part:pid,im:o.photo?[o.photo.file,(hh||[500,500])[0],(hh||[500,500])[1],!!p.contextOnly]:null})});
  });
  rows.push({k:'muscle',label:'Female muscle écorché',sub:'Matched full-body female figure · Muscle atlas',hay:'female muscle female muscular full body anatomy ecorche sketch figure',href:'#/female',im:['female-ecorche-v2.jpg',500,440]});
  rows.push({k:'muscle',label:'Male muscle écorché',sub:'Supplied full-body male reference · Muscle atlas',hay:'male muscle male muscular full body anatomy ecorche sketch figure',href:'#/male',im:['male-ecorche-reference.png',500,440]});
  const sk=ORGANS.skeleton;
  if(sk&&sk.bones206) sk.bones206.forEach((g,gi)=>g.named.forEach((grp,ci)=>grp.bones.forEach((bn,bi)=>rows.push({k:'skeleton',label:bn,sub:'Bone · '+g.g,hay:(bn+' '+grp.group+' bone '+g.g+' skeleton osteology').toLowerCase(),href:'#/skeleton?bone='+gi+'.'+ci+'.'+bi,im:['skeleton.jpg',g.hot[0],g.hot[1]]}))));
  if(sk&&sk.joints) sk.joints.forEach((j,ji)=>rows.push({k:'skeleton',label:j.n,sub:'Joint · '+j.type,hay:(j.n+' '+j.l+' '+j.type+' joint articulation').toLowerCase(),href:'#/skeleton?j='+ji,im:[j.img,j.hot[0],j.hot[1]]}));
  MUSCLE_GROUPS.forEach(g=>g.items.forEach(m=>rows.push({k:'muscle',label:m.n,sub:g.title+' · Muscle',hay:(m.n+' '+g.title+' '+m.loc+' '+m.action+' '+m.nerve+' muscle').toLowerCase(),href:'#/muscle?m='+m.id,im:[g.img,g.hot[0],g.hot[1]]})));
  TENDON_ENTRIES.forEach(t=>{const g=MUSCLE_GROUPS.find(x=>x.id===t.g);rows.push({k:'muscle',label:t.n,sub:g.title+' · Tendon',hay:(t.n+' '+g.title+' '+t.action+' tendon').toLowerCase(),href:'#/muscle?t='+t.id,im:[g.img,g.hot[0],g.hot[1]]})});
  return rows;
})();
function bindSearch(){
  const box=$('#search'), input=$('#q'), res=$('#qres');
  let cur=-1, items=[];
  const mobileBtn=$('#mobileSearchBtn');
  const closeMobile=()=>{box.classList.remove('open');mobileBtn?.setAttribute('aria-expanded','false')};
  mobileBtn?.addEventListener('click',()=>{const on=!box.classList.contains('open');box.classList.toggle('open',on);mobileBtn.setAttribute('aria-expanded',on);if(on)input.focus();else input.blur()});
  const hide=()=>{res.classList.remove('on');input.setAttribute('aria-expanded','false')};
  const show=(q)=>{
    const s=q.trim().toLowerCase();
    if(s.length<2){hide();return}
    items=INDEX.filter(r=>r.hay.includes(s)).sort((a,b)=>{const rank=r=>r.label.toLowerCase()===s?0:r.label.toLowerCase().startsWith(s)?1:r.label.toLowerCase().includes(s)?2:r.sub.toLowerCase().includes(s)?3:4;return rank(a)-rank(b)}).slice(0,9);
    cur=-1;
    if(!items.length){res.innerHTML='<div class="none">No matches for “'+esc(q)+'”.</div>';res.classList.add('on');return}
    res.innerHTML=items.map((r,i)=>`<a role="option" data-i="${i}" href="${r.href}">${r.im?`<span class="thumb${r.im[3]?' reference':''}" style="background-image:url(${imgSrc(r.im[0],true)});${r.im[3]?'':`background-position:${(r.im[1]/10).toFixed(1)}% ${(r.im[2]/10).toFixed(1)}%`}"></span>`:'<span class="thumb" style="background-image:none"></span>'}<span class="tx"><b>${esc(r.label)}</b><span>${esc(r.sub)}</span>${r.detail&&r.detail.toLowerCase().includes(s)&&!r.label.toLowerCase().includes(s)?`<small class="match-context">…${esc(r.detail.slice(Math.max(0,r.detail.toLowerCase().indexOf(s)-25),r.detail.toLowerCase().indexOf(s)+s.length+45))}…</small>`:''}</span></a>`).join('');
    res.classList.add('on'); input.setAttribute('aria-expanded','true');
    $$('a',res).forEach(a=>a.addEventListener('mousedown',e=>{e.preventDefault();go(items[+a.dataset.i])}));
  };
  const go=(r)=>{hide();closeMobile();input.blur();input.value='';location.hash=r.href;
    if(r.part) setTimeout(()=>{document.querySelector(`.parts .part[data-pid="${r.part}"] .part-h`)?.click();document.querySelector(`.parts .part[data-pid="${r.part}"]`)?.scrollIntoView({behavior:'smooth',block:'center'})},120);
  };
  input.addEventListener('input',()=>show(input.value));
  input.addEventListener('focus',()=>{if(input.value)show(input.value)});
  input.addEventListener('keydown',e=>{
    const a=$$('a',res);
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      if(!a.length)return; e.preventDefault();
      cur=(cur+(e.key==='ArrowDown'?1:-1)+a.length)%a.length;
      a.forEach((x,i)=>x.classList.toggle('cur',i===cur));
    }else if(e.key==='Enter'&&cur>=0&&items[cur]){e.preventDefault();go(items[cur])}
    else if(e.key==='Escape'){hide();input.blur();closeMobile()}
  });
  document.addEventListener('click',e=>{if(!box.contains(e.target)&&!mobileBtn?.contains(e.target)){hide();closeMobile()}});
}

/* ---------- icons ---------- */
function icon(n){
  const p={
    arrow:'<path d="M5 12h13M13 6l6 6-6 6"/>',
    left:'<path d="M19 12H6M11 6l-6 6 6 6"/>',
    chev:'<path d="M9 6l6 6-6 6"/>',
    play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
    quiz:'<path d="M9 9a3 3 0 1 1 4.6 2.5c-1 .7-1.6 1.3-1.6 2.5M12 17.5v.5"/><circle cx="12" cy="12" r="9"/>',
    tag:'<path d="M3 12l9-9h9v9l-9 9z"/><circle cx="16.5" cy="7.5" r="1.4"/>',
    reset:'<path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 10.5V17M12 7.2v.3"/>',
    bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.8.7-1 1.5-1 2.5h-6c0-1-.2-1.8-1-2.5A6 6 0 0 1 12 3z"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    search:'<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 20 20"/>',
    eye:'<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>'
  }[n]||'';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

/* ---------- layered explorer (male/female, peel-fade-isolate) ---------- */
const LAYERS=[
 {id:'skin',name:'Skin & surface',blurb:'Intact surface anatomy with the regional landmarks a clinician inspects first — head, neck, thorax, abdomen, pelvis and limbs.',m:{img:'malebody.jpg',org:'malebody'},f:{img:'femalebody.jpg',org:'femalebody'}},
 {id:'muscles',name:'Muscular system',blurb:'Écorché view: every superficial muscle group from trapezius to Achilles, drawn on the male and female figure so sex differences in mass and pelvis read clearly.',m:{img:'layer-male-muscle.jpg',org:'muscle',hot:{scm:[501,130],trap:[497,150],deltoid:[555,182],pecmajor:[470,215],biceps:[447,293],forearm:[426,417],serratus:[470,319],rectab:[497,371],obliques:[474,384],quads:[477,560],adductors:[497,540],patellart:[477,671],tibant:[489,768],achilles:[497,911]}},f:{img:'layer-female-muscle-v2.jpg',org:'muscle',hot:{scm:[504,144],trap:[504,173],deltoid:[462,207],pecmajor:[484,260],biceps:[459,300],forearm:[444,433],serratus:[485,313],rectab:[504,373],obliques:[486,387],quads:[493,560],adductors:[508,547],patellart:[493,643],tibant:[493,740]}}},
 {id:'skeleton',name:'Skeletal system',blurb:'The frame beneath the muscle: skull, column, thoracic cage, pelvic ring and the long bones — with the ligament sets that bind them.',m:{img:'layer-skeleton-m.jpg',org:'skeleton',hot:{skull:[500,90],clavicle:[485,202],sternum:[500,300],ribs:[485,322],vertebrae:[500,402],pelvis:[500,542],scapula:[476,242],humerus:[470,352],radius:[465,472],ulna:[471,487],carpals:[463,562],femur:[488,662],patella:[489,762],tibia:[489,832],fibula:[496,832],tarsals:[491,932],spinalig:[500,402],hiplig:[500,542],anklig:[491,932]}},f:{img:'female-skeleton.jpg',org:'skeleton',hot:{skull:[501,104],clavicle:[490,234],sternum:[501,286],ribs:[476,312],vertebrae:[501,391],pelvis:[497,482],humerus:[446,326],radius:[419,443],ulna:[426,456],carpals:[401,547],femur:[479,612],patella:[477,729],tibia:[477,807],fibula:[484,814],tarsals:[477,911],spinalig:[501,391],hiplig:[497,521],anklig:[477,898]}}},
 {id:'nerves',name:'Nervous system',blurb:'Brain, cord, plexuses and the named peripheral nerves — separate male and female plates, each pin opening the full nerve record.',m:{img:'nervous-male.jpg',org:'nervousmale'},f:{img:'nervous-female.jpg',org:'nervousfemale'}},
 {id:'vessels',name:'Vascular system',blurb:'Arterial tree and venous return from aortic arch to pedal arch, with the great veins and the portal system in between.',m:{img:'vascular.jpg',org:'vascular'},f:{img:'vascular.jpg',org:'vascular'}}
];
function viewExplorer(){
 return `
 <header class="wrap" style="padding:34px 26px 4px">
   <div class="eyebrow">Layered explorer</div>
   <h1 style="margin-top:10px">Peel the body, layer by layer</h1>
   <p class="lead">Five anatomical layers — surface, muscle, skeleton, nerves and vessels — stacked on male and female figures. Fade any layer, isolate it, or switch sex: numbered pins open the full structure record.</p>
 </header>
 <div class="expl wrap">
   <aside class="ex-side rv">
     <div class="ex-sex" role="group" aria-label="Choose figure">
       <button data-sex="male" class="on">Male figure</button><button data-sex="female">Female figure</button>
     </div>
     <div id="layerList"></div>
     <div class="ex-ctrl">
       <button class="btn sm" id="exAll">${icon('reset')} Show all layers</button>
       <button class="btn sm" id="exTop">${icon('eye')} Top layer only</button>
     </div>
     <p class="ex-note">Layers composite with screen blending — dark tissue drops out and brighter anatomy shows through, like peeling a dissection plane by plane.</p>
   </aside>
   <div class="ex-stage rv"><div id="exStack"></div><div class="pins" id="exPins"></div></div>
   <aside class="ex-info rv" id="exInfo"></aside>
 </div>`;
}
function bindExplorer(){
  const state={sex:'male',vis:LAYERS.map(()=>true),op:LAYERS.map(()=>100),sel:null};
  const stack=$('#exStack'),pins=$('#exPins'),info=$('#exInfo'),list=$('#layerList');
  list.innerHTML=LAYERS.map((L,i)=>`<div class="lrow">
    <label class="lchk"><input type="checkbox" checked data-l="${i}"><span class="lname">${L.name}</span></label>
    <input type="range" min="0" max="100" value="100" data-o="${i}" aria-label="${L.name} opacity">
    <button class="iso" data-iso="${i}" title="Isolate ${L.name}" aria-label="Isolate ${L.name}">${icon('eye')}</button></div>`).join('');
  const side=()=>state.sex==='male'?'m':'f';
  const hotOf=L=>{const S=L[side()];return S.hot||(ORGANS[S.org].photo?ORGANS[S.org].photo.hot:{})};
  const topLayer=()=>{for(let i=LAYERS.length-1;i>=0;i--)if(state.vis[i]&&state.op[i]>25)return i;return -1};
  function showInfo(t){
    if(t<0){info.innerHTML='<p class="lead">All layers are hidden — switch one on to resume the dissection.</p>';return}
    const L=LAYERS[t],S=L[side()],o=ORGANS[S.org];
    if(state.sel&&o.parts[state.sel]){const p=o.parts[state.sel];
      info.innerHTML=`<div class="eyebrow">${L.name} · ${state.sex} figure</div><h3>${esc(p.n)}</h3><p class="latin">${esc(p.l)}</p><p>${esc(p.d)}</p><p class="kv"><b>Function</b>${esc(p.f)}</p><p class="kv"><b>Clinical</b>${esc(p.c)}</p><a class="btn sm" href="${routeFor(S.org)}">Open full chapter: ${esc(o.title)} ${icon('arrow')}</a>`;
      return;
    }
    const ids=Object.keys(hotOf(L)).filter(id=>o.parts[id]);
    info.innerHTML=`<div class="eyebrow">Layer ${t+1} of ${LAYERS.length} · ${state.sex}</div><h3>${L.name}</h3><p>${L.blurb}</p><p class="ex-counts"><b>${ids.length}</b> pinned structures on the visible top layer</p><ul class="ex-list">${ids.map((id,n)=>`<li><button data-id="${id}"><i>${n+1}</i>${esc(o.parts[id].n)}</button></li>`).join('')}</ul>`;
    $$('button[data-id]',info).forEach(b=>b.addEventListener('click',()=>{state.sel=b.dataset.id;draw()}));
  }
  function draw(){
    stack.innerHTML=LAYERS.map((L,i)=>{const S=L[side()];
      return `<img src="${imgSrc(S.img)}" alt="${L.name} layer" data-li="${i}" style="opacity:${(state.op[i]/100).toFixed(2)};display:${state.vis[i]?'':'none'};mix-blend-mode:screen">`}).join('');
    const t=topLayer();
    if(t>=0){const L=LAYERS[t],S=L[side()],o=ORGANS[S.org],hot=hotOf(L);
      const ids=Object.keys(hot).filter(id=>o.parts[id]);
      pins.innerHTML=ids.map((id,n)=>`<button class="pin${state.sel===id?' sel':''}" data-id="${id}" style="left:${(hot[id][0]/10).toFixed(2)}%;top:${(hot[id][1]/10).toFixed(2)}%" aria-label="${esc(o.parts[id].n)}"><i>${n+1}</i><span class="pchip">${n+1} · ${esc(o.parts[id].n)}</span></button>`).join('');
      $$('.pin',pins).forEach(b=>b.addEventListener('click',()=>{state.sel=state.sel===b.dataset.id?null:b.dataset.id;draw()}));
    } else pins.innerHTML='';
    showInfo(t);
  }
  $$('#layerList input[type=checkbox]').forEach(c=>c.addEventListener('change',()=>{state.vis[+c.dataset.l]=c.checked;state.sel=null;draw()}));
  $$('#layerList input[type=range]').forEach(r=>r.addEventListener('input',()=>{state.op[+r.dataset.o]=+r.value;state.sel=null;draw()}));
  $$('#layerList .iso').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.iso;state.vis=LAYERS.map((_,j)=>j===i);state.op=LAYERS.map(()=>100);
    $$('#layerList input[type=checkbox]').forEach((c,j)=>c.checked=state.vis[j]);$$('#layerList input[type=range]').forEach(r=>r.value=100);state.sel=null;draw()}));
  $('#exAll').addEventListener('click',()=>{state.vis=LAYERS.map(()=>true);state.op=LAYERS.map(()=>100);
    $$('#layerList input[type=checkbox]').forEach(c=>c.checked=true);$$('#layerList input[type=range]').forEach(r=>r.value=100);state.sel=null;draw()});
  $('#exTop').addEventListener('click',()=>{state.vis=LAYERS.map((_,j)=>j===LAYERS.length-1);
    $$('#layerList input[type=checkbox]').forEach((c,j)=>c.checked=state.vis[j]);state.sel=null;draw()});
  $$('.ex-sex button').forEach(b=>b.addEventListener('click',()=>{state.sex=b.dataset.sex;$$('.ex-sex button').forEach(x=>x.classList.toggle('on',x===b));state.sel=null;draw()}));
  draw();
}

/* ---------- router ---------- */
let cleanup=null;
function render(){
  if(window.__organCleanup){window.__organCleanup();window.__organCleanup=null}
  const raw=(location.hash||'#/').replace(/^#/,'');
  const [path,qs]=raw.split('?');
  const params=new URLSearchParams(qs||'');
  const seg=path.split('/').filter(Boolean);
  const key=seg[0];
  const organKey=key==='maleoverview'?'male':key==='femaleoverview'?'female':key;
  const validOrgan=hasOrgan(organKey);
  $$('#nav a').forEach(a=>{
    const t=a.dataset.nav;
    let on=false;
    if(t==='#/') on=!key;
    else if(t==='#/organs') on=key==='organs'||(!!key&&validOrgan);
    else if(t==='#/male') on=key==='male';
    else if(t==='#/female') on=key==='female';
    else on=t==='#/'+key;
    a.classList.toggle('on',on);
  });
  $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded','false');

  if(!key) app.innerHTML=viewHome();
  else if(key==='organs') app.innerHTML=viewOrgans(params);
  else if(key==='map') app.innerHTML=viewMap();
  else if(key==='systems') app.innerHTML=viewSystems();
  else if(key==='male') app.innerHTML=viewSection('male');
  else if(key==='female') app.innerHTML=viewSection('female');
  else if(key==='gyn') app.innerHTML=viewGyn();
  else if(key==='deep') app.innerHTML=viewDeep();
  else if(key==='quiz'){app.innerHTML=viewQuiz(params); quizStart()}
  else if(key==='explorer'){app.innerHTML=viewExplorer(); bindExplorer()}
  else if(key==='about') app.innerHTML=viewAbout();
  else if(validOrgan) app.innerHTML=viewOrgan(organKey);
  else app.innerHTML=`<section class="notfound wrap"><h1>Page not found</h1><p class="lead" style="margin:12px auto 22px">“${esc(key)}” isn't a route in this atlas.</p><a class="btn primary" href="#/">Return home</a></section>`;

  /* post-render bindings */
  if(!key){bindShowcase(); $$('[data-count]').forEach(el=>countUp(el,+el.dataset.count));}
  if(key==='organs') bindOrgansFilter();
  if(key==='map') bindMap();
  if(validOrgan && key!=='male' && key!=='female') bindOrgan(organKey);
  if(key==='skeleton')bindJointImages();
  if(key==='muscle')bindMuscleAtlas();
  $$('[data-study-jump]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.studyJump)?.scrollIntoView({behavior:'smooth',block:'start'})));
  const jx=params.get('j'),bx=params.get('b'),bone=params.get('bone');
  if(jx!==null||bx!==null||bone!==null){
    const group=bone!==null?bone.split('.')[0]:bx;
    if(group!==null)document.getElementById('bg-'+group)?.setAttribute('open','');
    const el=document.getElementById(jx!==null?'jc-'+jx:bone!==null?'bn-'+bone.split('.').join('-'):'bg-'+bx);
    if(el){setTimeout(()=>{el.scrollIntoView({block:'center'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1800)},200)}}
  if(key==='muscle'&&(params.has('m')||params.has('t')||params.has('g'))){
    let target;
    if(params.has('m')){const id=params.get('m');target=document.getElementById('mus-'+id);target?.closest('.mat-group')?.setAttribute('open','');}
    if(params.has('t'))target=document.getElementById('tendon-'+params.get('t'));
    if(params.has('g'))target=document.getElementById('mat-'+params.get('g'));
    if(target){if(target.tagName==='DETAILS')target.open=true;setTimeout(()=>{target.scrollIntoView({block:'center'});target.classList.add('flash');setTimeout(()=>target.classList.remove('flash'),1800)},220)}
  }
  app.classList.remove('vin'); void app.offsetWidth; app.classList.add('vin');
  reveal();
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',render);

/* ---------- reveal on scroll ---------- */
let io=null;
function reveal(){
  if(io) io.disconnect();
  const els=$$('.rv');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('nomotion')){els.forEach(e=>e.classList.add('in'));return}
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(e=>io.observe(e));
}

/* ---------- chrome ---------- */
function chrome(){
  $('#yr').textContent=new Date().getFullYear();
  $('#burger').addEventListener('click',()=>{
    const open=$('#nav').classList.toggle('open');
    $('#burger').setAttribute('aria-expanded',open);
  });
  const mb=$('#motionBtn');
  const setMotion=off=>{document.body.classList.toggle('nomotion',off);mb.setAttribute('aria-pressed',off);mb.title=off?'Restore motion':'Reduce motion'};
  mb.addEventListener('click',()=>setMotion(!document.body.classList.contains('nomotion')));
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) setMotion(true);
  const tt=$('#totop');
  addEventListener('scroll',()=>{
    tt.classList.toggle('on',scrollY>700);
    const h=document.documentElement;
    $('#readbar').style.width=(scrollY/(h.scrollHeight-innerHeight||1)*100)+'%';
  },{passive:true});
  tt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  bindSearch();
  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&!(e.target.matches('input,textarea'))){e.preventDefault();$('#q').focus()}
  });
}
chrome();
render();
})();
