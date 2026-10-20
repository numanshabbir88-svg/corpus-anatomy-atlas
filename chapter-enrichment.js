/* Corpus chapter depth layer: existing regional material is preserved. Contextual additions are
   documented in the part list, not mis-pinned to a photographic pixel or gross diagram. */
(function(){
const BORROW={
 lungs:['pulmonaryacinus'],brain:['cerebraldeep','meningescsf','brainstemdeep'],kidney:['nephron'],liver:['hepaticlobule'],gut:['intestinalwall'],eye:['eyeanatomy','retina'],skin:['skinlayers'],ear:[],pancreas:[],spleen:[],thyroid:[],bladder:[],spinalcord:[],
 male:['maletestis','maleprostate','penileerectile'],female:['gynuterus','gyncervix','gynadnexa','gynvagina','gynvulva'],
 malebody:['cerebraldeep','pulmonaryacinus','nephron','hepaticlobule','skinlayers'],femalebody:['cerebraldeep','pulmonaryacinus','nephron','hepaticlobule','skinlayers'],
 nervous:['cerebraldeep','brainstemdeep','brachialplexus'],nervousmale:['brachialplexus','cerebraldeep','meningescsf'],nervousfemale:['brachialplexus','cerebraldeep','meningescsf'],cranialnerves:['facialnerve','trigeminalnerve'],autonomic:[],breast:[],muscle:[],lymph:[],vascular:[],endocrine:[],joints:['shoulder'],shoulder:[],larynx:[],marrow:[],
 malepelvis:['penileerectile','maleprostate'],femalepelvis:['gynsupport','clitoralcomplex'],
 gynuterus:[],gyncervix:[],gynadnexa:[],gynvagina:[],gynvulva:['clitoralcomplex'],gynsupport:[],maletestis:[],maleprostate:[],
 clitoralcomplex:[],penileerectile:[],skinlayers:['skin'],facialnerve:[],trigeminalnerve:[],eyeanatomy:['retina'],retina:[],nephron:[],brachialplexus:[],cerebraldeep:[],meningescsf:[],brainstemdeep:[],pulmonaryacinus:[],hepaticlobule:[],intestinalwall:[]
};
const norm=s=>s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'');
function put(o,k,from,part){
 const p={...part,contextOnly:true,deepRef:from,at:null,s:'l'};
 o.parts[k]=p;return p;
}
for(const [key,sources] of Object.entries(BORROW)){
 const o=ORGANS[key];if(!o)continue;
 const names=new Set(Object.values(o.parts).map(p=>norm(p.n)));
 const pools=sources.map(src=>({src,entries:Object.entries(ORGANS[src]?.parts||{}).filter(([,p])=>!p.contextOnly),cursor:0}));
 let progressed=true;
 while(Object.keys(o.parts).length<20&&progressed){
  progressed=false;
  for(const pool of pools){
   while(pool.cursor<pool.entries.length){
    const [pid,p]=pool.entries[pool.cursor++];
    if(names.has(norm(p.n)))continue;
    const id=`ctx_${pool.src}_${pid}`;
    put(o,id,pool.src,p);names.add(norm(p.n));progressed=true;break;
   }
   if(Object.keys(o.parts).length>=20)break;
  }
 }

}
// Hand-edited anatomy records fill chapters without claiming a pixel-accurate photo hotspot.
for(const [key,notes] of Object.entries(PART_NOTES)){
 const o=ORGANS[key];if(!o)continue;
 const existing=new Set(Object.values(o.parts).map(p=>norm(p.n)));
 for(const [i,line] of notes.entries()){
  const [n,d,f,c]=line.split('|');
  if(!n||!d||!f||!c)throw Error(`Incomplete anatomy note: ${key} ${i}`);
  if(existing.has(norm(n)))continue;
  const pid=`detail_${key}_${i}`;
  o.parts[pid]={n,l:n,t:'Deep structure',d,f,c,contextOnly:true,at:null,s:'l'};
  existing.add(norm(n));
 }
}
})();

// Editorial corrections: use an external vulvar surface plate and replace overview padding
// with meaningful, sex-specific regional structures. Unseen structures remain unpinned.
(function(){
 const make=(name,description,functionText,clinical)=>({n:name,l:name,t:'Study structure',d:description,f:functionText,c:clinical,contextOnly:true,at:null,s:'l'});
 const macrophage=ORGANS.pulmonaryacinus.parts.alveolarmacrophage;
 ORGANS.lungs.parts.ctx_pulmonaryacinus_alveolarmacrophage={...macrophage,contextOnly:true,deepRef:'pulmonaryacinus',at:null,s:'l'};
 const vulva=ORGANS.gynvulva;
 vulva.photo.file='vulva-surface-clean.jpg';
 vulva.photo.credit='Retouched external-anatomy teaching illustration; not a clinical photograph';
 vulva.vb=[1000,1000];
 vulva.summary='The vulva is the external genital region, not the internal vaginal canal. This cleaned surface teaching illustration shows the mons, labia, clitoral glans, vestibule and separate urethral and vaginal openings. Deeper glands, nerves and clitoral erectile tissue are described without a misleading surface pointer.';
 const visible={mons:[510,187],major:[360,482],minor:[454,534],clit:[502,322],vest:[501,484],urethralmeatus:[503,451],intro2:[500,589],fourchette:[502,735]};
 vulva.photo.hot=visible;
 for(const [id,p] of Object.entries(vulva.parts)){
  if(visible[id]){p.contextOnly=false;p.at=visible[id];p.s=visible[id][0]<500?'l':'r'}
  else{p.contextOnly=true;p.at=null}
 }
 for(const id of Object.keys(vulva.parts))if(id.startsWith('ctx_clitoralcomplex_'))delete vulva.parts[id];
 vulva.parts.detail_vulva_pudendal=make('Perineal branches of pudendal nerve','Somatic branches from the pudendal nerve reach the posterior labia and perineal skin.','Carry sensation from the posterior vulva and motor fibers to some perineal muscles.','Sensation in the anterior labia also involves ilioinguinal and genitofemoral branches; a surface drawing cannot show the nerve course.');
 vulva.parts.detail_vulva_clitoralnerve=make('Dorsal nerve of the clitoris','Terminal pudendal branch traveling toward the clitoral body and glans.','Conveys much of the somatic sensation of the clitoris.','Distinct from the autonomic cavernous pathways involved in erectile blood flow.');
 vulva.parts.detail_vulva_glandduct=make('Greater vestibular gland ducts','Paired ducts open near the posterior part of the vestibule, lateral to the vaginal opening.','Convey gland secretions to the vestibular surface.','Duct obstruction can result in a Bartholin gland cyst; tiny duct openings are not resolved on this plate.');
 vulva.parts.detail_vulva_vessels=make('External pudendal vessels','Superficial branches approach the anterior vulvar skin from the femoral arterial system.','Contribute to the skin blood supply alongside internal pudendal branches.','Vulvar blood supply is shared among several vessel territories; no specific artery is outlined on this surface image.');

 const shared=[
 ['pelvicsplanchnic','Pelvic splanchnic nerves','Parasympathetic fibers from sacral levels S2–S4 travel to pelvic autonomic plexuses.','Reach bladder, rectal and reproductive pelvic organ targets.','Do not confuse these autonomic fibers with somatic pudendal branches.'],
 ['inferiorhypogastric','Inferior hypogastric plexus','Paired networks on the lateral walls of the rectum combine sympathetic and parasympathetic fibers.','Distribute autonomic pathways to pelvic organs.','Operations near these plexuses can affect urinary or sexual function.'],
 ['hypogastric','Hypogastric nerves','Descending autonomic connections between the superior and inferior hypogastric plexuses.','Convey predominantly sympathetic pathways into the pelvis.','Do not equate them with the somatic pudendal nerve.'],
 ['pudendal','Pudendal nerve','Paired somatic S2–S4 nerve passes through the pudendal canal toward the perineum.','Supplies external genital and perineal sensation plus motor branches to sphincters.','Its terminal genital branch differs between male and female anatomy.']
 ];
 const sexNotes={
 nervousmale:[
 ['prostaticplexus','Prostatic plexus','Autonomic branches of the inferior hypogastric plexus course along the prostate.','Distribute fibers to the prostate and continue toward penile erectile tissue.','Nerve-sparing prostate surgery considers this relationship.'],
 ['cavernousnerves','Cavernous nerves of penis','Small autonomic branches run from the prostatic plexus toward penile erectile tissue.','Regulate erectile smooth muscle and arterial inflow.','Different from the dorsal penile nerve, which primarily conveys somatic sensation.'],
 ['dorsalpenis','Dorsal nerve of penis','Terminal pudendal branch runs on the dorsal aspect of the penis toward the glans.','Conveys much of the somatic sensation from the penis and glans.','Distinguish sensory dorsal nerve from autonomic cavernous nerves.'],
 ['perinealmale','Perineal nerve and posterior scrotal branches','Pudendal perineal branch enters the superficial perineal region and divides into muscular and cutaneous branches.','Supplies perineal muscles and posterior scrotal skin.','Anterior scrotal skin also receives ilioinguinal and genitofemoral contributions.']
 ],
 nervousfemale:[
 ['uterovaginal','Uterovaginal plexus','Pelvic autonomic network associated with the cervix and upper vagina.','Distributes fibers toward the uterus, cervix and upper vagina.','A distinct pathway from pudendal sensory branches serving the lower vagina and vulva.'],
 ['dorsalclitoris','Dorsal nerve of clitoris','Terminal sensory branch of the pudendal nerve runs toward the clitoral glans.','Conveys much of the clitoral somatic sensation.','Distinguish it from autonomic pathways involved in erectile tissue responses.'],
 ['posteriorlabial','Posterior labial nerves','Cutaneous branches of the pudendal perineal nerve enter the posterior labial region.','Supply sensation to posterior vulvar skin.','Anterior labial skin has additional ilioinguinal and genitofemoral innervation.'],
 ['vaginalplexus','Vaginal autonomic branches','Branches from the pelvic plexus reach the upper vaginal wall.','Carry autonomic innervation and visceral sensory pathways.','The lower vaginal opening has a larger somatic contribution from pudendal branches.']
 ]
 };
 for(const key of ['nervousmale','nervousfemale']){
  const o=ORGANS[key];
  for(const id of Object.keys(o.parts))if(id.startsWith('ctx_'))delete o.parts[id];
  for(const [id,...fields] of [...shared,...sexNotes[key]])o.parts['detail_'+key+'_'+id]=make(...fields);
  o.summary=(key==='nervousmale'?'This male figure orients the shared brain, spinal and peripheral nerve plan. The additional study structures focus on nerves to the prostate, penis and perineum.':'This female figure orients the shared brain, spinal and peripheral nerve plan. The additional study structures focus on nerves to the uterus, vagina, clitoris and vulva.')+' Deep pelvic branches are not individually depicted on the full-body image.';
 }
 const bodyNotes={
 malebody:[
 ['kidneys','Kidneys','Paired retroperitoneal organs on either side of the upper lumbar spine.','Filter plasma and regulate fluid, electrolytes and blood pressure.','The right kidney commonly sits slightly lower than the left.'],
 ['pancreas','Pancreas','Elongated gland behind the stomach from duodenum toward spleen.','Produces digestive enzymes and endocrine hormones.','Deep retroperitoneal relationships matter in abdominal imaging.'],
 ['spleen','Spleen','Immune organ in the left upper abdomen below the diaphragm.','Filters blood and supports immune responses.','Blunt left-sided trauma can damage this vascular organ.'],
 ['adrenals','Adrenal glands','Small endocrine glands positioned above each kidney.','Secrete corticosteroids and catecholamines.','Their deep position cannot be verified from the surface figure.'],
 ['prostate','Prostate','Gland below the bladder surrounding the proximal urethra.','Adds secretions to semen.','The prostate is not a visible surface organ.'],
 ['seminalvesicles','Seminal vesicles','Paired glands behind the bladder and above the prostate.','Supply fluid contributing to semen.','Adjacent anatomy is better studied in a focused male pelvic plate.'],
 ['epididymis','Epididymis','Long coiled duct lying along the posterior side of each testis.','Allows sperm maturation and storage.','Scrotal position does not reveal the individual microscopic duct coils.'],
 ['diaphragm','Diaphragm','Dome-shaped muscle separating thoracic and abdominal cavities.','Principal muscle for quiet inspiration.','Only a cross-section can show its full internal attachment pattern.'],
 ['spinalcord','Spinal cord','Central nervous tissue inside the vertebral canal.','Relays sensory and motor signals to and from the brain.','A whole-body surface figure cannot resolve spinal tracts.'],
 ['aorta','Aorta','Largest arterial trunk descends from the heart into the abdomen.','Supplies oxygenated blood through its branches.','Deep arterial branches require dedicated vascular diagrams.']
 ],
 femalebody:[
 ['kidneys','Kidneys','Paired retroperitoneal organs beside the upper lumbar spine.','Filter plasma and regulate fluid, electrolytes and blood pressure.','Both kidneys belong in the body overview regardless of sex.'],
 ['pancreas','Pancreas','Elongated gland behind the stomach from duodenum toward spleen.','Provides digestive enzymes and endocrine hormones.','Not separately discernible on this whole-body illustration.'],
 ['spleen','Spleen','Vascular immune organ in the left upper abdomen.','Filters blood and supports immune responses.','A focused organ plate provides clearer boundaries.'],
 ['adrenals','Adrenal glands','Endocrine glands positioned on the superior aspects of the kidneys.','Release corticosteroids and catecholamines.','Their deep position cannot be localized on a surface view.'],
 ['cervix','Cervix','Lower part of the uterus projecting into the upper vagina.','Connects uterine cavity with the vaginal canal.','The transformation zone requires dedicated cervical study, not a surface label.'],
 ['tubes','Uterine tubes','Paired tubes extend from the uterine horns toward the ovaries.','Carry the oocyte; fertilization commonly occurs in the ampulla.','Internal tubal details are not visible on a body silhouette.'],
 ['vagina','Vagina','Muscular canal from the cervix to the vaginal opening.','Forms an outlet for menstrual flow and a birth canal.','The vagina is internal; the vulva names external genital structures.'],
 ['diaphragm','Diaphragm','Dome-shaped muscle separating thorax and abdomen.','Principal muscle for quiet inspiration.','Individual muscle attachments require a deeper plate.'],
 ['spinalcord','Spinal cord','Central nervous tissue within the vertebral canal.','Relays motor, sensory and autonomic signals.','Spinal tracts are microscopic and cannot be resolved on this overview.']
 ]
 };
 for(const key of ['malebody','femalebody']){
  const o=ORGANS[key];
  for(const id of Object.keys(o.parts))if(id.startsWith('ctx_'))delete o.parts[id];
  for(const [id,...fields] of bodyNotes[key])o.parts['detail_'+key+'_'+id]=make(...fields);
 }
})();
