/* Curated tissue-level illustrations. A lens is a conceptual transition from an organ plate,
   never a physical microscope photograph or a claim that a particular cell can be found
   at the corresponding pixel of a gross-anatomy image. Only verified visible structures
   receive a part-specific pointer inside the lens. */
const MICRO_LENS = {
 alveolar:{file:'alveolar-cell-detail.webp',title:'Alveolar cell lining',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs'},
 acinus:{file:'pulmonary-acinus.jpg',title:'Pulmonary acinus cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs'},
 filtration:{file:'renal-filtration-closeup.webp',title:'Glomerular filtration barrier',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/25-4-microscopic-anatomy-of-the-kidney'},
 nephron:{file:'nephron-deep.jpg',title:'Nephron and glomerulus cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/25-4-microscopic-anatomy-of-the-kidney'},
 lobule:{file:'hepatic-lobule.jpg',title:'Hepatic lobule cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder'},
 intestine:{file:'intestinal-wall-deep.jpg',title:'Intestinal wall and villi',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-5-the-small-and-large-intestines'},
 cornea:{file:'eye-layers-deep.jpg',title:'Eye coats and corneal layers',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception'},
 retina:{file:'retina-deep.jpg',title:'Layered retina cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception'},
 corti:{file:'cochlea-organ-corti-closeup.webp',title:'Cochlear hair-cell organ',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception'},
 pancreas:{file:'pancreas-micro-closeup.webp',title:'Pancreatic acini and endocrine islet',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas'},
 thyroid:{file:'thyroid-follicle-closeup.webp',title:'Thyroid follicles and colloid',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/17-4-the-thyroid-gland'},
 bladder:{file:'urothelium-closeup.webp',title:'Bladder urothelium and wall',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/25-2-gross-anatomy-of-urine-transport'},
 skin:{file:'skin-layers-deep.jpg',title:'Epidermal and dermal layers',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/5-1-layers-of-the-skin'},
 breast:{file:'breast-lobule-closeup.webp',title:'Mammary terminal duct and acini',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-6-lactation'},
 lymph:{file:'lymph-node-closeup.webp',title:'Lymph node tissue cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/21-1-anatomy-of-the-lymphatic-and-immune-systems'},
 marrow:{file:'marrow-cells-closeup.webp',title:'Marrow-cell teaching inset',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/18-2-production-of-the-formed-elements'},
 endometrium:{file:'endometrium-closeup.webp',title:'Endometrial glands and stroma',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system'},
 ovary:{file:'ovarian-follicle-closeup.webp',title:'Ovarian follicle cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system'},
 testis:{file:'seminiferous-tubule-closeup.webp',title:'Seminiferous tubule epithelium',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system'}
};
const MICRO_ORIGINS={
 lungs:[625,467],pulmonaryacinus:[480,700],kidney:[188,222],nephron:[360,275],
 liver:[281,389],gut:[475,556],eye:[563,556],ear:[675,500],pancreas:[438,422],
 thyroid:[413,533],bladder:[563,333],skin:[313,367],skinlayers:[200,320],
 breast:[450,450],lymph:[420,262],marrow:[350,300],gynuterus:[473,180],
 gynadnexa:[302,330],maletestis:[400,550],endocrine:null
};
(function(){
 const names=(chapter,lens,list,points={})=>{
  const o=ORGANS[chapter];if(!o)return;
  for(const p of Object.values(o.parts))if(list.includes(p.n)){
   p.microLens=lens;
   p.microOrigin=MICRO_ORIGINS[chapter]||null;
   if(points[p.n])p.microPoint=points[p.n];
  }
 };
 const alveoli=['Type I pneumocyte','Type II pneumocyte','Alveolar macrophage'];
 const alveolarPoints={'Type I pneumocyte':[390,643],'Type II pneumocyte':[647,431],'Alveolar macrophage':[303,377]};
 for(const chapter of ['lungs','pulmonaryacinus'])names(chapter,'alveolar',alveoli,alveolarPoints);
 names('pulmonaryacinus','alveolar',['Alveolar epithelial tight junctions','Pulmonary interstitium']);
 names('lungs','acinus',['Terminal bronchiole','Respiratory bronchiole','Alveolar duct','Alveolar sac','Alveolus']);
 names('kidney','filtration',['Glomerular capillaries','Filtration basement membrane'],{'Glomerular capillaries':[505,440],'Filtration basement membrane':[455,214]});
 names('kidney','nephron',['Afferent arteriole','Efferent arteriole','Bowman capsule']);
 names('nephron','filtration',['Glomerular capillaries','Glomerular endothelial fenestrae','Bowman capsule'],{'Glomerular capillaries':[505,440],'Glomerular endothelial fenestrae':[520,270]});
 names('liver','lobule',['Portal venule','Hepatic arteriole','Interlobular bile duct','Portal tract','Central vein','Hepatic sinusoid','Sinusoidal endothelium']);
 names('gut','intestine',['Villus','Crypt of Lieberkühn','Enterocyte','Brush border','Goblet cell','Paneth cell']);
 names('intestinalwall','intestine',['Brunner glands','Peyer patches']);
 names('eye','cornea',['Corneal epithelium','Bowman layer','Corneal stroma','Descemet membrane']);
 names('eye','retina',['Internal limiting membrane','Nerve fiber layer','Ganglion cell layer']);
 names('retina','retina',['Horizontal cells','Amacrine cells']);
 names('eyeanatomy','retina',['Internal limiting membrane']);
 names('ear','corti',['Organ of Corti','Basilar membrane'],{'Organ of Corti':[605,485],'Basilar membrane':[545,714]});
 names('pancreas','pancreas',['Exocrine acinus','Centroacinar cells','Intercalated duct','Beta cells','Alpha cells','Delta cells','Pancreatic stellate cells'],{'Exocrine acinus':[224,368]});
 names('thyroid','thyroid',['Thyroid follicular cell','Thyroglobulin-rich colloid','Parafollicular C cell'],{'Thyroid follicular cell':[505,437],'Thyroglobulin-rich colloid':[502,280]});
 names('bladder','bladder',['Urothelial umbrella cells','Lamina propria of bladder','Bladder mucosal rugae'],{'Urothelial umbrella cells':[532,211],'Lamina propria of bladder':[550,542]});
 const skinNames=['Stratum basale','Stratum spinosum','Stratum granulosum','Stratum lucidum','Basement membrane zone','Dermal papillae','Papillary dermis','Reticular dermis','Hypodermis','Stratum basale & spinosum'];
 const skinPoints={'Stratum basale':[502,302],'Dermal papillae':[244,332],'Papillary dermis':[465,430],'Reticular dermis':[475,598],'Hypodermis':[475,836]};
 for(const chapter of ['skin','skinlayers'])names(chapter,'skin',skinNames,skinPoints);
 names('breast','breast',['Terminal duct lobular unit','Lobular acini','Myoepithelial cells','Ductal myoepithelium','Lobules (glandular)'],{'Terminal duct lobular unit':[561,377],'Lobular acini':[723,452]});
 names('lymph','lymph',['Afferent lymphatic vessels','Subcapsular sinus','Lymph-node cortex','Lymph-node paracortex','High endothelial venule','Medullary cords','Efferent lymphatic vessel'],{'Lymph-node cortex':[380,299],'Medullary cords':[550,540]});
 names('lymph','intestine',['Intestinal lacteal']);
 names('endocrine','thyroid',['Thyroid follicular cells']);
 names('endocrine','pancreas',['Pancreatic beta cells']);
 names('marrow','marrow',['Common myeloid progenitor','Common lymphoid progenitor','Erythroblast island','Reticulocyte','Megakaryocyte','Neutrophil precursor series','Marrow stromal cells','Marrow adipocyte','Sinusoidal endothelium']);
 names('gynuterus','endometrium',['Endometrial glands','Endometrial stroma','Endometrium — functionalis','Endometrium — basalis'],{'Endometrial glands':[385,440],'Endometrial stroma':[625,400]});
 names('gynadnexa','ovary',['Theca interna','Granulosa cell layer','Zona pellucida','Growing follicles','Dominant antral follicle'],{'Theca interna':[748,558],'Granulosa cell layer':[518,673],'Zona pellucida':[505,402]});
 names('maletestis','testis',['Straight seminiferous tubules','Basal lamina of tubule','Spermatogonia','Primary spermatocytes','Spermatids','Seminiferous tubules','Sertoli cells / blood–testis barrier','Leydig cells'],{'Basal lamina of tubule':[522,64],'Spermatogonia':[441,94],'Spermatids':[527,405]});
 // The endocrine body-map plate has several organ positions, not one universal sample.
 for(const p of Object.values(ORGANS.endocrine.parts)){
  if(p.microLens==='thyroid')p.microOrigin=[500,190];
  if(p.microLens==='pancreas')p.microOrigin=[505,458];
 }
})();

/* New conception-to-birth microscopic SCALE cutaways, not photomicrographs.
   No ring on an unrelated gross image: an external sperm or developing body cannot
   reveal an exact individual tubule, neural fold or placental exchange cell. */
Object.assign(MICRO_LENS,{
 reprotestis:{file:'repro-testis-micro.png',title:'Seminiferous tubule · germ-cell lineage',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system'},
 reproovary:{file:'repro-ovary-micro.png',title:'Dominant ovarian follicle · tissue cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system'},
 reprofusion:{file:'repro-cortical-reaction.png',title:'Membrane fusion and cortical response · conceptual',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-1-fertilization'},
 reproneural:{file:'repro-neurulation-micro.png',title:'Neural folds and early germ layers',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'},
 reprovillus:{file:'repro-placental-villus-micro.png',title:'Chorionic villus · blood compartments',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'}
});
(function(){
 const place=(key,lens,ids,points={})=>{
  const o=ORGANS[key];for(const id of ids.split(' ')){
   const p=o.parts[id];if(!p)throw Error('Missing reproduction lens part '+key+'.'+id);
   p.microLens=lens;p.microOrigin=null;
   if(points[id])p.microPoint=points[id];
  }
 };
 place('spermanatomy','reprotestis','spermatogonium primary secondary spermatid spermiogenesis sertoli leydig tubule');
 place('oocyteanatomy','reproovary','oogonium primary meiosisi granulosa theca antrum follicle lh corpusluteum',{antrum:[340,570]});
 place('fertilization','reprofusion','coronapassage zonabinding membranefusion cortical meiosisii');
 place('placentaanatomy','reprovillus','villi fetalcapillary intervillous placentalbarrier gasexchange',{fetalcapillary:[385,320],intervillous:[270,560]});
 place('embryodevelopment','reproneural','disc primitive gastrulation ectoderm mesoderm endoderm notochord neuralplate neuraltube somites folding gut',{somites:[300,365]});
 place('laborthirdstage','reprovillus','intervillous vessels');
})();

/* ---------------------------------------------------------------------------
   Second pass (2026-10): tissue lenses for chapters that previously had none.
   Every file below already ships with the atlas (the foundations teaching
   plates and the existing reproduction renders), so this adds zero image
   weight and claims nothing that the plate does not visibly show.
   --------------------------------------------------------------------------- */
Object.assign(MICRO_LENS,{
 tissuecell:{file:'foundation-cell-organelles.webp',title:'Cell and organelles',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/3-1-the-cellular-level-of-organization'},
 tissueconnective:{file:'foundation-connective.webp',title:'Loose areolar connective tissue',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/4-3-connective-tissue-supports-and-protects'},
 tissueskeletal:{file:'foundation-skeletal-muscle.webp',title:'Skeletal muscle fibres',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle'},
 tissuecardiac:{file:'foundation-cardiac-muscle.webp',title:'Cardiac muscle tissue',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity'},
 tissuesmooth:{file:'foundation-smooth-muscle.webp',title:'Smooth muscle tissue',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/10-8-smooth-muscle'},
 tissueneural:{file:'foundation-neural.webp',title:'Neuron and glial support',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue'},
 reprozygote:{file:'repro-zygote-diagram.webp',title:'Zygote · first cleavage plan',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-1-fertilization'},
 reprotwo:{file:'repro-two-cell-diagram.webp',title:'Two-cell stage cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'},
 reprofour:{file:'repro-four-cell-diagram.webp',title:'Four-cell stage cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'},
 reproeight:{file:'repro-eight-cell-diagram.webp',title:'Eight-cell stage cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'},
 repromorula:{file:'repro-morula-diagram.webp',title:'Morula cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'},
 reproblastocyst:{file:'repro-blastocyst.webp',title:'Blastocyst cutaway',source:'https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development'}
});
Object.assign(MICRO_ORIGINS,{tissuefoundations:[500,380],brain:[500,420],cerebraldeep:[500,420],brainstemdeep:[500,420],heart:[500,420],cleavageblastocyst:[500,420]});
(function(){
 const place=(chapter,lens,names,points={})=>{
  const o=ORGANS[chapter];if(!o)return;
  for(const p of Object.values(o.parts)){
   if(!names.includes(p.n))continue;
   p.microLens=lens;
   if(MICRO_ORIGINS[chapter]&&!p.microOrigin)p.microOrigin=MICRO_ORIGINS[chapter];
   if(points[p.n])p.microPoint=points[p.n];
  }
 };
 place('tissuefoundations','tissuecell',['Human cell','Plasma membrane','Cytoplasm and cytosol','Nucleus','Mitochondria','Ribosomes and rough ER','Golgi apparatus']);
 place('tissuefoundations','tissueconnective',['Extracellular matrix','Fibroblast','Collagen fibers','Connective-tissue capillary','Connective tissue']);
 place('tissuefoundations','tissueskeletal',['Skeletal muscle fiber','Endomysium','Muscle tissue']);
 place('tissuefoundations','tissuecardiac',['Cardiac muscle']);
 place('tissuefoundations','tissuesmooth',['Smooth muscle']);
 place('tissuefoundations','tissueneural',['Nervous tissue','Neuron cell body and dendrites','Axon','Myelin sheath and nodes','Glial support cells']);
 place('brain','tissueneural',['Cortical gray matter']);
 place('cerebraldeep','tissueneural',['Cortical gray matter','Layer I · molecular','Layer II · external granular','Layer III · external pyramidal','Layer IV · internal granular','Layer V · internal pyramidal','Layer VI · multiform']);
 place('brainstemdeep','tissueneural',['Purkinje cell','Cerebellar cortex','Deep cerebellar nuclei']);
 place('heart','tissuecardiac',['Myocardium','Bundle of His & bundle branches']);
 place('cleavageblastocyst','reprozygote',['Zygote']);
 place('cleavageblastocyst','reprotwo',['First cleavage','Blastomere']);
 place('cleavageblastocyst','reprofour',['Four-cell stage']);
 place('cleavageblastocyst','reproeight',['Eight-cell stage']);
 place('cleavageblastocyst','repromorula',['Morula','Compaction']);
 place('implantation','reproblastocyst',['Hatched blastocyst']);
 place('implantation','reprovillus',['Cytotrophoblast','Syncytiotrophoblast']);
})();
