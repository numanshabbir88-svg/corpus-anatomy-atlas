/* Corpus dental anatomy: named Universal + FDI positions, representative tooth-class
   renders and an explicitly conceptual molar cutaway. No per-tooth pin on a generic image. */
(function(){
const PARTS={},HOT={};
const add=(id,n,l,t,d,f,c,hot=null,ref=null)=>{
 PARTS[id]={n,l,t,d,f,c,contextOnly:!hot,s:hot&&hot[0]<500?'l':'r',at:hot?[140+hot[0]*1.32,hot[1]*.88]:undefined,referencePlate:ref||undefined};
 if(hot)HOT[id]=hot;
};
add('crown','Anatomical crown','Corona dentis','Gross structure','Part of the tooth covered by enamel, even if gingiva later covers a small portion. The clinical crown is the portion exposed in the mouth.','Offers a cutting or grinding surface depending on tooth class.','Do not confuse anatomical crown with clinical crown.',[523,229]);
add('enamel','Enamel','Enamelum','Hard tissue','Highly mineralized outer cover of the crown, shown white above the gum; enamel does not normally cover the root.','Protects deeper dentin from wear and acid, though it can demineralize.','Once mature enamel is lost, it does not regrow as an intact enamel layer.',[578,245]);
add('dentin','Dentin','Dentinum','Hard tissue','Yellowish tissue beneath crown enamel and root cementum; surrounds pulp throughout the tooth.','Supports the crown and houses dentinal tubules.','Exposed dentin can be sensitive and is more vulnerable than enamel.',[514,328]);
add('dej','Dentinoenamel junction','Junctio dentinoenamelis','Tissue boundary','Scalloped interface between the crown enamel shell and underlying dentin.','Bonds two different mineralized tissues and transfers forces.','This interface is a boundary, not a separate layer visible in every digital plate.');
add('pulp','Pulp chamber','Cavitas pulpae','Soft tissue','Central space in the crown holding vascular, neural and connective dental pulp; its roof lies under occlusal dentin.','Supports tooth vitality, defense and dentin formation.','Deep caries can inflame pulp; a digital cutaway cannot diagnose pulp disease.',[486,409]);
add('pulp-horns','Pulp horns','Cornua pulpae','Soft tissue','Small coronal projections of the pulp chamber toward the cusp tips, variable with tooth type and age.','Bring living pulp close to coronal dentin.','Young permanent teeth often have more prominent pulp horns; do not pin them without a clear boundary.');
add('root','Tooth root','Radix dentis','Gross structure','Portion anchored below the crown in an alveolar socket; molar roots may be multiple but number and canal shape vary.','Anchors the tooth through periodontal ligament and cementum.','A generic two-root cutaway cannot represent the root anatomy of every tooth.',[422,666]);
add('root-canal','Root canal','Canalis radicis dentis','Pulp pathway','Narrow continuation of the pulp space inside each root, opening toward its apex.','Conveys pulpal nerve and blood supply through the root.','Extra canals and variation matter in clinical endodontics; this illustration is only a model.',[464,628]);
add('apex','Apical foramen','Foramen apicis dentis','Root opening','Tiny opening near a root tip where neurovascular tissues enter or leave the canal.','Connects root pulp with tissues outside the tooth.','Not all accessory foramina can be identified on this rendering.');
add('cementum','Cementum','Cementum','Root tissue','Thin mineralized covering of root dentin below the cervical region, not a white enamel coat.','Provides attachment for periodontal ligament fibers.','It is too thin to accurately mark as an individual pixel band in this model.');
add('periodontal','Periodontal ligament','Ligamentum periodontale','Periodontium','Fibrous interface between root cementum and the alveolar socket wall.','Suspends the tooth and helps absorb chewing forces.','A widened periodontal space on a radiograph needs clinical interpretation.');
add('alveolar','Alveolar bone','Os alveolare','Supporting bone','Jawbone forming the root socket around the periodontal ligament; the trabecular texture is shown beside roots.','Supports roots and remodels with function.','Alveolar bone is part of the maxilla or mandible, not another tooth layer.',[298,672]);
add('gingiva','Gingiva','Gingiva','Periodontium','Pink gum tissue encircling the neck of the tooth and covering the alveolar process.','Forms a protective soft-tissue collar around the tooth.','Inflammation and recession need an actual dental examination, not this model.',[321,377]);
add('cej','Cementoenamel junction','Junctio cementoenamelis','Boundary','Cervical transition where crown enamel meets root cementum near the gingival margin.','Separates anatomical crown from root.','The visible gum line is not always at the anatomical cementoenamel junction.');
add('occlusal','Occlusal surface','Facies occlusalis','Chewing surface','Cusp-bearing chewing surface of posterior teeth such as premolars and molars.','Crushes and grinds food in contact with opposing teeth.','An incisor has an incisal edge rather than a broad posterior occlusal table.',[530,130]);
add('cusps','Molar cusps','Cuspides dentis','Crown relief','Raised occlusal peaks separated by developmental grooves; arrangement differs by maxillary or mandibular molar and by tooth.','Distribute chewing contacts across a broad posterior crown.','Do not use this particular cutaway to count cusps of another molar.',[435,153]);
add('furcation','Root furcation','Furcatio radicum','Root anatomy','Region where the two depicted roots diverge below the crown; not present in single-root teeth.','Separates root surfaces in a multi-root tooth.','Periodontal disease can expose furcations, especially around molars.',[519,536]);
add('proximal','Mesial and distal surfaces','Facies mesialis et distalis','Orientation','Mesial faces the midline of the dental arch; distal faces away from it. They are relative tooth surfaces, not fixed left/right labels.','Define contact relationships between neighboring teeth.','Avoid swapping mesial and distal when changing the jaw or side.');
add('facial','Facial and lingual surfaces','Facies facialis et lingualis','Orientation','Facial surface faces lip or cheek; lingual faces tongue (called palatal on the upper arch).','Orient individual teeth in the dental arch.','Naming tooth surfaces is separate from numbering a tooth.');
add('v2','Superior alveolar nerve branches (V2)','Nervi alveolares superiores','Maxillary sensation','Posterior, often middle, and anterior superior alveolar branches of the maxillary division supply upper teeth; their branching varies.','Carry pulpal and periodontal sensory fibers from maxillary teeth.','The middle superior alveolar nerve is variable and may be absent; no individual V2 branch is identifiable on the generic tooth image.');
add('v3','Inferior alveolar nerve (V3)','Nervus alveolaris inferior','Mandibular sensation','Mandibular division branch entering the mandibular foramen and canal; dental branches serve lower teeth.','Carries sensory fibers from mandibular teeth; its terminal mental branch supplies chin and lower lip.','CN VII facial motor branches do not supply pulpal sensation to the teeth.');
add('apical-bundle','Apical neurovascular bundle','Fasciculus neurovascularis apicalis','Vessels and nerves','Small red and yellow vessels/fibers travel through the jaw near the root tips into the pulp canals.','Maintain pulp blood supply and relay tooth sensation.','The digital model depicts a general path, not a precise named nerve or artery.',[590,836]);
add('primary-vs-permanent','Primary and permanent dentitions','Dentes decidui et permanentes','Dentition','The usual primary dentition has 20 teeth; the conventional full permanent dentition has 32 including third molars.','Primary teeth support chewing, speech and the developing dental arches.','Congenitally absent, unerupted and removed third molars make individual adult counts variable.');
add('numbers','Universal and FDI tooth designation','Numeratio dentium','Orientation','Universal 1–32 names permanent teeth and A–T primary teeth in US practice; two-digit FDI identifies quadrant and position internationally.','Lets students locate a tooth unambiguously before describing its anatomy.','The chart is viewed facing the patient: the patient’s right appears at the viewer’s left.');
const permanentPattern=['third molar','second molar','first molar','second premolar','first premolar','canine','lateral incisor','central incisor'];
const primaryPattern=['second molar','first molar','canine','lateral incisor','central incisor'];
const classOf=type=>type.includes('incisor')?'incisor':type==='canine'?'canine':type.includes('premolar')?'premolar':'molar';
const classFile={incisor:'tooth-incisor.png',canine:'tooth-canine.png',premolar:'tooth-premolar.png',molar:'tooth-molar-section.png'};
const role={incisor:'Uses its incisal edge to cut food.',canine:'Uses a pointed cusp to grip and tear food.',premolar:'Has a broader crown for crushing and chewing.',molar:'Has a broad cusp-bearing crown for grinding food.'};
const detail={
 'central incisor':'Most medial cutting tooth near the midline; a typically single-root anterior tooth.',
 'lateral incisor':'Cutting tooth between central incisor and canine; usually a single root, with morphology variable.',
 'canine':'Corner-of-arch tooth with a prominent cusp and usually one relatively long root.',
 'first premolar':'First transitional tooth behind the canine; usually two or more cusps and variable roots, especially in the maxilla.',
 'second premolar':'Posterior premolar with a broader chewing surface; cusp and canal anatomy differs between upper and lower jaws.',
 'first molar':'Typically the first permanent posterior molar to erupt; multiple cusps and complex roots require tooth-specific assessment.',
 'second molar':'Posterior multi-cusp tooth behind the first molar; roots and crown anatomy vary across jaws.',
 'third molar':'Most posterior permanent molar; development, eruption, presence and root configuration are highly variable.',
 'primary first molar':'First primary posterior molar; a childhood molar, not a premolar.',
 'primary second molar':'Second primary posterior molar; helps preserve space for its successor premolar.'
};
const order=[],baby=[];
for(let num=1;num<=32;num++){
 const q=Math.floor((num-1)/8),pos=(num-1)%8;
 const type=q%2===0?permanentPattern[pos]:permanentPattern[7-pos];
 const jaw=q<2?'maxillary':'mandibular',side=(q===0||q===3)?'right':'left',clazz=classOf(type);
 const fdi=(q+1)*10+(q%2===0?8-pos:pos+1);
 const id=`u${String(num).padStart(2,'0')}`;
 const supply=jaw==='maxillary'?'CN V2 superior alveolar branches':'CN V3 inferior alveolar branches';
 const n=`Permanent ${jaw} ${side} ${type} · #${num}`;
 add(id,n,`FDI ${fdi}`,'Permanent tooth · '+clazz,
 `${side[0].toUpperCase()+side.slice(1)} ${jaw} ${type}, Universal #${num} (FDI ${fdi}). ${detail[type]} This position is a dental-arch location, not a pin on the representative molar section.`,
 role[clazz]+' '+(jaw==='maxillary'?'It is anchored in the maxilla.':'It is anchored in the mandible.'),
 `Pulp and periodontal sensation chiefly follow ${supply}; root count and individual anatomy vary. This model is not a treatment plan.`,null,classFile[clazz]);
 order.push({id,number:num,fdi,type,jaw,side,clazz,n});
}
const alphabet='ABCDEFGHIJKLMNOPQRST';
for(let i=0;i<20;i++){
 const q=Math.floor(i/5),pos=i%5,type=q%2===0?primaryPattern[pos]:primaryPattern[4-pos];
 const jaw=q<2?'maxillary':'mandibular',side=(q===0||q===3)?'right':'left',clazz=classOf(type),letter=alphabet[i];
 const fdi=(q+5)*10+(q%2===0?5-pos:pos+1),id='p'+letter.toLowerCase();
 const n=`Primary ${jaw} ${side} ${type} · ${letter}`;
 const description=type.includes('molar')?detail['primary '+type]:detail[type];
 add(id,n,`FDI ${fdi}`,'Primary tooth · '+clazz,
 `${side[0].toUpperCase()+side.slice(1)} ${jaw} primary ${type}, Universal ${letter} (FDI ${fdi}). ${description} This is a chart position, not an individually depicted tooth.`,
 role[clazz]+' As a primary tooth, it supports function while the permanent dentition develops.',
 `The pulpal sensory pathway follows ${jaw==='maxillary'?'V2 superior alveolar':'V3 inferior alveolar'} branches; eruption and root resorption vary.`,null,classFile[clazz]);
 baby.push({id,letter,fdi,type,jaw,side,clazz,n});
}
const dots=Object.entries(HOT).map(([id,[x,y]])=>`<circle class="part" data-id="${id}" cx="${140+x*1.32}" cy="${y*.88}" r="7" fill="#e7ba85" fill-opacity=".85" stroke="#163d36" stroke-width="2"/>`).join('');
ORGANS.dentition={title:'Teeth · dental anatomy',latin:'Dentes permanentes et decidui',system:'digestive',
 region:'Alveolar sockets of upper maxillae and lower mandible, within the oral cavity',
 size:'32 conventional permanent tooth positions and 20 primary positions; actual dentition varies',
 blood:'Superior and inferior alveolar arterial branches serve tooth pulps and supporting tissues',
 nerve:'CN V2 superior alveolar branches: upper teeth; CN V3 inferior alveolar branches: lower teeth',
 blurb:'Follow crown-to-root layers, 32 permanent and 20 primary tooth positions, class shapes, FDI/Universal numbers and dental sensory nerves.',
 summary:'Dental anatomy links each named tooth position to a tooth class and a representative cross-section. The crown bears enamel over dentin; roots bear cementum and anchor in the jaw through the periodontal ligament. Pulp contains nerves and vessels that communicate through root canals and apical foramina. Incisors cut, canines grip, premolars crush, and molars grind, although roots and cusps vary. A full permanent arch has 32 positions including third molars; primary dentition has 20, without premolars. This chart uses Universal and FDI numbering while explicitly distinguishing patient right from viewer left. Upper dental sensation primarily follows maxillary CN V2 superior alveolar branches, and lower dental sensation mandibular CN V3 inferior alveolar branches; facial nerve CN VII moves expression muscles but does not supply pulp sensation. Plates are representative digital teaching illustrations, not a clinical scan, histology, or a unique rendering for every numbered tooth.',
 vb:[1600,900],legend:[['#dcb883','Identifiable tissue on representative molar'],['#8abeb6','Named arch position · conceptual chart']],
 parts:PARTS,
 art:'<rect width="1600" height="900" fill="#142421"/><image href="img/tooth-molar-section.png" x="140" y="0" width="1320" height="900" preserveAspectRatio="xMidYMid meet"/>'+dots,
 inlineLabels:false,anims:[{id:'pulse',label:'Selected tissue highlight',cls:'throb'}],
 photo:{file:'tooth-molar-section.png',credit:'Conceptual digital mandibular molar section · not histology, radiograph or a rendering of every numbered tooth',hot:HOT},
 quiz:[
 {q:'Which tissue covers a healthy tooth crown?',opts:['Cementum','Enamel','Periodontal ligament','Pulp'],a:1,why:'Enamel covers crown dentin, whereas cementum covers root dentin.'},
 {q:'Which trigeminal division supplies the upper teeth?',opts:['CN VII','CN V1','CN V2 via superior alveolar branches','CN V3 via inferior alveolar nerve'],a:2,why:'Superior alveolar sensory branches of maxillary CN V2 supply upper teeth.'},
 {q:'How many positions are in conventional primary dentition?',opts:['16','20','28','32'],a:1,why:'The primary set has 20 positions; the complete permanent set has 32, including third molars.'}
 ],related:['skullface','trigeminalnerve','facialnerve','gut'],
 study:{lead:'Use the Universal and FDI arch charts below, then explore the tissue section. Per-tooth images represent a class, not unique patient anatomy.',cards:[['Four tooth classes','Incisors cut; canines grip; premolars crush; molars grind. The permanent pattern per quadrant is two incisors, one canine, two premolars and three molars.'],['What the cutaway actually shows','A representative mandibular molar and its supporting tissues. Clear enamel, dentin, pulp, gum and alveolar bone have pins; a specific tooth number never gets a false pin on this model.'],['Nerve distinction','Upper tooth sensation generally uses V2 superior alveolar branches; lower teeth use V3 inferior alveolar fibers. CN VII moves facial-expression muscles, not dental pulp.']],sources:['https://openstax.org/books/anatomy-and-physiology-2e/pages/23-3-the-mouth-pharynx-and-esophagus','https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/ada_utds_value_set_v1_2022_aug.pdf','https://www.ncbi.nlm.nih.gov/books/NBK580480/']},
 dental:{permanent:order,primary:baby}
};
ORGANS.skullface.related=['dentition',...ORGANS.skullface.related.filter(x=>x!=='dentition')];
ORGANS.trigeminalnerve.related=['dentition',...ORGANS.trigeminalnerve.related.filter(x=>x!=='dentition')];
ORGANS.gut.related=['dentition',...ORGANS.gut.related.filter(x=>x!=='dentition')];
})();
