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
add('dej','Dentinoenamel junction','Junctio dentinoenamelis','Tissue boundary','Scalloped microscopic interface uniting the hard, brittle outer enamel cap with the resilient underlying coronal dentin.','Mechanically interlocks two differentially mineralized tissues and arrests micro-cracks before they propagate into deep dentin.','Caries penetrating the dentinoenamel junction spread laterally along this interface and progress more rapidly through the underlying dentinal tubules.');
add('pulp','Pulp chamber','Cavitas pulpae','Soft tissue','Central space in the crown holding vascular, neural and connective dental pulp; its roof lies under occlusal dentin.','Supports tooth vitality, defense and dentin formation.','Deep caries or thermal trauma can trigger reversible or irreversible pulpitis within this rigid, low-compliance chamber.',[486,409]);
add('pulp-horns','Pulp horns','Cornua pulpae','Soft tissue','Coronal extensions of the vital pulp chamber projecting upward beneath the major cusps of premolars and molars.','Extend odontoblastic processes and neurovascular supply into the sub-cuspal coronal dentin.','Prominent pulp horns in children and young adults are vulnerable to iatrogenic exposure during deep cavity preparation.');
add('root','Tooth root','Radix dentis','Gross structure','Portion anchored below the crown in an alveolar socket; molar roots may be multiple but number and canal shape vary.','Anchors the tooth through periodontal ligament and cementum.','Mandibular molars typically possess mesial and distal roots, whereas maxillary molars typically possess mesiobuccal, distobuccal, and palatal roots.',[422,666]);
add('root-canal','Root canal','Canalis radicis dentis','Pulp pathway','Narrow continuation of the pulp space inside each root, opening toward its apex.','Conveys pulpal nerve and blood supply through the root.','Accessory canals and mesiobuccal (MB2) canal variations are critical anatomical landmarks during endodontic root-canal therapy.',[464,628]);
add('apex','Apical foramen','Foramen apicis dentis','Root opening','Primary neurovascular aperture at or near the anatomical root apex where arterioles, venules, lymphatics, and sensory nerve fibers enter the root canal.','Connects the internal radicular dental pulp with the periapical periodontal ligament and alveolar bone vascular bed.','Extension of pulpal necrosis through the apical foramen produces periapical periodontitis and radiolucent periapical lesions.');
add('cementum','Cementum','Cementum','Root tissue','Thin, avascular, bone-like mineralized connective tissue covering the external surface of root dentin from the cervical margin to the apex.','Anchors the principal Sharpey fibers of the periodontal ligament to the tooth root surface.','Gingival recession exposes cervical cementum, which abrades rapidly and predisposes the root surface to cervical caries and hypersensitivity.');
add('periodontal','Periodontal ligament','Ligamentum periodontale','Periodontium','Dense collagenous connective-tissue sling (~0.15–0.38 mm wide) spanning between root cementum and the lamina dura of the alveolar socket.','Suspends the tooth in a gomphosis joint, transforms compressive occlusal loads into tensile bone stress, and provides rich mechanoreceptive proprioception.','Chronic periodontitis destroys periodontal ligament fibers and alveolar bone, causing clinical attachment loss and tooth mobility.');
add('alveolar','Alveolar bone','Os alveolare','Supporting bone','Jawbone forming the root socket around the periodontal ligament; the trabecular texture is shown beside roots.','Supports roots and remodels with function.','Alveolar bone is part of the maxilla or mandible and undergoes physiological remodeling in response to orthodontic forces or resorbs following tooth extraction.',[298,672]);
add('gingiva','Gingiva','Gingiva','Periodontium','Pink gum tissue encircling the neck of the tooth and covering the alveolar process.','Forms a protective soft-tissue collar around the tooth.','Healthy attached gingiva resists masticatory friction and seals the junctional epithelium against subgingival plaque invasion.',[321,377]);
add('cej','Cementoenamel junction','Junctio cementoenamelis','Boundary','Cervical anatomical line around the circumference of the tooth neck where coronal enamel meets radicular cementum.','Demarcates the fixed anatomical boundary between the anatomical crown and the tooth root.','Serve as the primary fixed reference point for measuring clinical attachment loss during periodontal probing.');
add('occlusal','Occlusal surface','Facies occlusalis','Chewing surface','Cusp-bearing chewing surface of posterior teeth such as premolars and molars.','Crushes and grinds food in contact with opposing teeth.','Deep developmental pits and fissures on the occlusal table are the most frequent anatomical sites for primary dental caries.',[530,130]);
add('cusps','Molar cusps','Cuspides dentis','Crown relief','Raised occlusal peaks separated by developmental grooves; arrangement differs by maxillary or mandibular molar and by tooth.','Distribute chewing contacts across a broad posterior crown.','Supporting (centric) cusps — the palatal cusps of maxillary posteriors and buccal cusps of mandibular posteriors — maintain vertical dimension of occlusion.',[435,153]);
add('furcation','Root furcation','Furcatio radicum','Root anatomy','Region where the two depicted roots diverge below the crown; not present in single-root teeth.','Separates root surfaces in a multi-root tooth.','Periodontal disease can expose furcations, especially around molars, creating complex concavities for debridement.',[519,536]);
add('proximal','Mesial and distal surfaces','Facies mesialis et distalis','Orientation','Mesial faces toward the anterior dental-arch midline along the curve of the jaw; distal faces posteriorly away from the dental midline.','Form interproximal contact areas that stabilize the dental arch and protect the interdental gingival papilla from food impaction.','Interproximal caries frequently initiate just cervical to the mesial or distal contact point and are best detected on bitewing radiographs.');
add('facial','Facial and lingual surfaces','Facies facialis et lingualis','Orientation','Facial (labial on anterior teeth, buccal on posterior teeth) faces the lip or cheek; lingual faces the tongue (termed palatal on the maxillary arch).','Define the buccolingual axial contour that deflects food across the free gingiva during mastication.','Cervical abrasion and non-carious abfraction lesions most commonly affect the facial cervical third of premolars and canines.');
add('v2','Superior alveolar nerve branches (V2)','Nervi alveolares superiores','Maxillary sensation','Posterior, middle (when present), and anterior superior alveolar branches arising from the maxillary division of the trigeminal nerve (CN V2).','Form the superior dental plexus within the maxillary alveolar process to innervate upper dental pulps, periodontal ligaments, and buccal gingiva.','Posterior, middle, and anterior superior alveolar nerve blocks selectively anesthetize maxillary molars, premolars, and anterior teeth.');
add('v3','Inferior alveolar nerve (V3)','Nervus alveolaris inferior','Mandibular sensation','Major sensory branch of the mandibular division of the trigeminal nerve (CN V3) traversing the mandibular canal beneath the lower root apices.','Gives off dental and interdental branches to all ipsilateral mandibular teeth before exiting the mental foramen as the mental nerve.','An inferior alveolar nerve block in the pterygomandibular space anesthetizes all ipsilateral mandibular teeth and the lower lip via the mental branch.');
add('apical-bundle','Apical neurovascular bundle','Fasciculus neurovascularis apicalis','Vessels and nerves','Arterioles, venules, lymphatics, and myelinated/unmyelinated trigeminal sensory axons coursing through the periapical bone to enter the apical foramen.','Sustains odontoblast metabolism and transmits hydrodynamic dentinal and pulpal nociceptive signals.','Close proximity of mandibular molar root apices to the inferior alveolar neurovascular bundle is evaluated prior to third-molar extraction.',[590,836]);
add('primary-vs-permanent','Primary and permanent dentitions','Dentes decidui et permanentes','Dentition','Humans are diphyodont: 20 deciduous (primary) teeth erupt in childhood (2 incisors, 1 canine, 2 molars per quadrant), succeeded by 32 permanent teeth (2 incisors, 1 canine, 2 premolars, 3 molars per quadrant).','Primary teeth guide jaw growth, maintain arch space for succedaneous premolars, and support mastication and phonation during childhood.','Premature loss of a primary molar without space maintenance allows mesial drift of the first permanent molar and impaction of the underlying premolar.');
add('numbers','Universal and FDI tooth designation','Numeratio dentium','Orientation','Universal numbering assigns #1–32 clockwise from the upper right third molar to the lower right third molar (and A–T for primary teeth); FDI uses a two-digit quadrant-and-position code (11–48 permanent, 51–85 primary).','Provides unambiguous international and clinical communication of exact tooth quadrant, arch, and mesiodistal position.','Dental charts are always oriented facing the patient, so the patient’s right quadrants (FDI 1 and 4; Universal #1–8 and #25–32) lie on the viewer’s left.');
const permanentPattern=['third molar','second molar','first molar','second premolar','first premolar','canine','lateral incisor','central incisor'];
const primaryPattern=['second molar','first molar','canine','lateral incisor','central incisor'];
const classOf=type=>type.includes('incisor')?'incisor':type==='canine'?'canine':type.includes('premolar')?'premolar':'molar';
const classFile={incisor:'tooth-incisor.png',canine:'tooth-canine.png',premolar:'tooth-premolar.png',molar:'tooth-molar-section.png'};
const role={incisor:'Uses its wedge-shaped incisal edge to shear and incise food boluses during anterior biting.',canine:'Uses its prominent pointed cusp and deep single root to pierce, grip, and guide lateral mandibular excursions.',premolar:'Combines a piercing buccal cusp with a crushing occlusal table to tear and grind food between canines and molars.',molar:'Employs a broad multi-cusp occlusal table and multi-rooted anchorage to pulverize and grind food during mastication.'};
const detail={
 'central incisor':'Mesial-most anterior cutting tooth adjacent to the dental midline, featuring a broad labial crown, lingual cingulum, and single conical root.',
 'lateral incisor':'Anterior cutting tooth positioned between the central incisor and canine, displaying a narrower mesiodistal crown and single root.',
 'canine':'Cornerstone tooth at the dental arch angle possessing a thick labiolingual crown, prominent single cusp ridge, and the longest single root in the arch.',
 'first premolar':'Anterior-most bicuspid tooth distal to the canine; maxillary first premolars frequently bifurcate into two roots whereas mandibular first premolars have a dominant buccal cusp.',
 'second premolar':'Posterior bicuspid tooth mesial to the first molar, typically bearing a single root and a well-developed occlusal developmental groove pattern.',
 'first molar':'Largest and strongest posterior grinding tooth, erupting around age 6 as the cornerstone of adult occlusion with multi-cusp morphology and diverged roots.',
 'second molar':'Posterior grinding molar distal to the first molar, reinforcing the posterior masticatory table with four or five cusps and two (mandibular) or three (maxillary) roots.',
 'third molar':'Most distal permanent molar (wisdom tooth) erupting in late adolescence or early adulthood with variable crown cusp pattern and often fused or curved roots.',
 'primary first molar':'First deciduous posterior grinding tooth located distal to the primary canine; succeeded upon exfoliation by the permanent first premolar.',
 'primary second molar':'Broad deciduous posterior molar closely resembling the permanent first molar in crown morphology; preserves arch space for the permanent second premolar.'
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
 `${side[0].toUpperCase()+side.slice(1)} ${jaw} ${type}, Universal #${num} (FDI ${fdi}). ${detail[type]} Illustrated on the dedicated ${clazz} tooth-class plate.`,
 role[clazz]+' '+(jaw==='maxillary'?'Anchored within the alveolar process of the maxilla via a periodontal ligament gomphosis.':'Anchored within the alveolar process of the mandible via a periodontal ligament gomphosis.'),
 `Pulpal and periodontal sensory innervation travels via ${supply}; periapical pathology or regional nerve block localization follows its ${jaw} alveolar root topography.`,null,classFile[clazz]);
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
 `${side[0].toUpperCase()+side.slice(1)} ${jaw} primary ${type}, Universal ${letter} (FDI ${fdi}). ${description} Illustrated on the dedicated ${clazz} tooth-class plate.`,
 role[clazz]+' As a deciduous tooth, it supports childhood mastication, speech articulation, and alveolar arch guidance for its permanent successor.',
 `Pulpal sensory fibers travel via ${jaw==='maxillary'?'CN V2 superior alveolar':'CN V3 inferior alveolar'} branches; physiological root resorption precedes exfoliation and eruption of the permanent successor.`,null,classFile[clazz]);
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
