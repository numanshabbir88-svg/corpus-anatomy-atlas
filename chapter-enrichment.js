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
