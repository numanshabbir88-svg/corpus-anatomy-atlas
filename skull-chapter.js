/* Adult skull study chapter. 22 skull bones = 8 cranial + 14 facial.
   Deep or rear bones get context illustrations only: no false pointers on an anterior plate. */
(function(){
const rows=[];
const bone=(id,n,latin,region,description,role,clinical,point=null,medial=false)=>rows.push({id,n,l:latin,t:region,d:description,f:role,c:clinical,point,medial});
bone('frontal','Frontal bone','Os frontale','Cranial · unpaired','Forms the forehead, roof of the orbits and much of the anterior cranial floor.','Protects frontal brain and supports the upper orbit.','The frontal sinus lies within the bone; fracture patterns can involve the anterior cranial floor.',[500,215]);
bone('rparietal','Right parietal bone','Os parietale dextrum','Cranial · paired','Right upper side of the cranial vault; meets the frontal, opposite parietal, occipital and temporal bones.','Protects the superior and lateral cerebrum.','Sutures remain identifiable in adult skulls; a head injury needs clinical assessment.');
bone('lparietal','Left parietal bone','Os parietale sinistrum','Cranial · paired','Left upper side of the cranial vault, meeting the opposite parietal along the sagittal suture.','Encloses and protects the upper brain.','Do not mistake a normal suture line for a fracture without clinical imaging.');
bone('rtemporal','Right temporal bone','Os temporale dextrum','Cranial · paired','Right lower side and base of the skull, surrounding the external acoustic opening and internal ear spaces.','Houses hearing and balance structures; helps form the jaw joint.','CN VII passes through its facial canal and exits at the stylomastoid foramen.');
bone('ltemporal','Left temporal bone','Os temporale sinistrum','Cranial · paired','Left lower side and skull base, including squamous, mastoid and petrous regions.','Supports the jaw joint and shields the inner ear.','Temporal-bone injury may involve hearing or the facial nerve.');
bone('occipital','Occipital bone','Os occipitale','Cranial · unpaired','Posterior skull and base, surrounding the foramen magnum and meeting the parietal bones at the lambdoid suture.','Protects the rear brain and allows the spinal cord to pass through the skull base.','The occipital condyles articulate with the atlas (C1).');
bone('sphenoid','Sphenoid bone','Os sphenoidale','Cranial · unpaired','Central skull-base bone spanning the middle cranial fossa behind the orbits.','Connects many skull bones and contributes to the orbit.','The optic canal and several nerve passages relate to the sphenoid.',null,true);
bone('ethmoid','Ethmoid bone','Os ethmoidale','Cranial · unpaired','Between the orbits; forms the upper nasal septum, parts of the orbit and nasal roof.','Supports the olfactory region and separates the upper nasal cavity from the cranial cavity.','Its middle and superior nasal conchae are parts of the ethmoid, not independent facial bones.',null,true);
bone('rmaxilla','Right maxilla','Maxilla dextra','Facial · paired','Right upper jaw below the orbit, housing upper-tooth sockets and much of the maxillary sinus.','Forms upper jaw, orbit floor and anterior hard palate.','The infraorbital nerve (CN V2) exits through its infraorbital foramen.',[447,620]);
bone('lmaxilla','Left maxilla','Maxilla sinistra','Facial · paired','Left upper jaw below the orbit; meets the opposite maxilla at the anterior midline.','Holds upper teeth and forms the left anterior hard palate.','Dental roots and maxillary sinus lie close together.',[553,620]);
bone('rzygoma','Right zygomatic bone','Os zygomaticum dextrum','Facial · paired','Right cheekbone forming the lateral rim and part of the floor of the orbit.','Supports cheek contour and the bony orbit.','Zygomatic fractures may affect the orbital rim and cheek projection.',[312,500]);
bone('lzygoma','Left zygomatic bone','Os zygomaticum sinistrum','Facial · paired','Left cheekbone forming the outer orbital rim and meeting the temporal bone at the arch.','Protects the outer orbit and supports facial shape.','An orbital rim injury can involve the neighboring maxilla.',[688,500]);
bone('rnasal','Right nasal bone','Os nasale dextrum','Facial · paired','Small right bone at the bony bridge of the nose, above the nasal opening.','Forms the upper nasal bridge, not the flexible nose tip.','Fractures often involve nasal bones but the lower nose is mainly cartilage.',[482,421]);
bone('lnasal','Left nasal bone','Os nasale sinistrum','Facial · paired','Small left bone joining the opposite nasal bone along the midline of the bridge.','Supports the upper nose and meets the frontal bone.','An injured nasal bridge can be accompanied by septal injury.',[518,421]);
bone('rlacrimal','Right lacrimal bone','Os lacrimale dextrum','Facial · paired','Small plate deep in the right anterior medial orbit, beside the tear-drainage channel.','Forms part of the medial orbital wall and lacrimal fossa.','Not reliably distinguishable on a straight-on external skull view.',null,true);
bone('llacrimal','Left lacrimal bone','Os lacrimale sinistrum','Facial · paired','Small bone of the left anterior medial orbital wall, near the nasolacrimal canal.','Helps support the tear-drainage pathway.','A diagram of the orbit is needed to isolate it from adjacent bones.',null,true);
bone('rpalatine','Right palatine bone','Os palatinum dextrum','Facial · paired','Deep behind the right maxilla; its horizontal plate forms the posterior part of the hard palate.','Separates oral and nasal cavities at the back of the bony palate.','The posterior quarter of the hard palate is formed by paired palatine bones.',null,true);
bone('lpalatine','Left palatine bone','Os palatinum sinistrum','Facial · paired','Deep behind the left maxilla, contributing to the posterior hard palate and nasal wall.','Helps form the bony roof of the mouth and a small part of the orbit.','Not a surface cheekbone; a section or inferior view is needed.',null,true);
bone('rconcha','Right inferior nasal concha','Concha nasalis inferior dextra','Facial · paired','Independent curved bone projecting from the lower right lateral wall of the nasal cavity.','Helps direct inspired air across the moist nasal lining.','The middle and superior conchae instead belong to the ethmoid bone.',null,true);
bone('lconcha','Left inferior nasal concha','Concha nasalis inferior sinistra','Facial · paired','Independent curved bone along the lower left wall of the nasal cavity.','Expands mucosal contact area for warming and humidifying air.','Nasal congestion is not explained by the bone shape alone.',null,true);
bone('vomer','Vomer','Vomer','Facial · unpaired','Thin midline bone forming the lower and posterior bony nasal septum, deep within the nasal cavity.','Helps divide left and right nasal passages.','The upper septum is ethmoid; the anterior septum also contains cartilage.',null,true);
bone('mandible','Mandible','Mandibula','Facial · unpaired','Single adult lower jaw consisting of a body and paired ascending rami.','Houses lower teeth and moves at the temporomandibular joints for chewing and speech.','The only normally mobile bone of the adult skull; the hyoid is a separate neck bone.',[500,851]);
const landmark=(id,n,d,f,c,point=null,medial=false)=>rows.push({id,n,l:n,t:'Landmark · not an extra bone',d,f,c,point,medial});
landmark('orbit','Bony orbit','The paired skull sockets are assembled from seven bones; not separate bones themselves.','Surround and protect the eyes and provide attachment sites.','Orbital fractures can affect eye movement and sensation.',null,true);
landmark('infraorbital','Infraorbital foramen','Opening in each maxilla beneath the lower orbital rim.','Transmits the infraorbital nerve (CN V2) and vessels.','A cheek or upper-lip sensory change after midface trauma may involve V2.');
landmark('mental','Mental foramen','Opening on each side of the anterior mandibular body below the premolar region.','Transmits the mental nerve (CN V3 branch) and vessels.','The mental nerve gives sensation to lower lip and chin.');
landmark('palate','Hard palate','Anterior three quarters are maxillary palatine processes; posterior quarter is palatine bone.','Separates nasal and oral cavities during breathing and feeding.','The bony palate is a structure made by bones, not a 23rd skull bone.',null,true);
landmark('septum','Bony nasal septum','Upper section is the perpendicular plate of ethmoid; lower/posterior section is the vomer.','Separates left and right nasal cavities.','Septal cartilage adds the anterior mobile portion.',null,true);
landmark('zygoarch','Zygomatic arch','Bony bridge built from zygomatic and temporal bone projections on each side.','Provides attachment for masseter and forms cheek contour.','The arch is a joint construction, not a separate facial bone.',null,true);
landmark('tmj','Temporomandibular joint','Articulation between each mandibular condyle and temporal bone.','Permits mouth opening, closing and gliding.','Facial expression is mainly CN VII motor; jaw closing muscles are supplied by CN V3.',null,true);
landmark('suture','Coronal and sagittal sutures','Fibrous seams joining frontal to parietal, and right to left parietal bones.','Stabilize the cranial vault.','Sutures are not additional counted bones.');
const parts={},hot={};
for(const r of rows){
 const {id,point,medial,...content}=r;
 parts[id]={...content,contextOnly:!point,referencePlate:medial?'skull-face-medial.jpg':undefined,s:point&&point[0]<500?'l':'r',at:point?[140+point[0]*1.32,point[1]*.88]:undefined};
 if(point)hot[id]=point;
}
const dots=Object.entries(hot).map(([id,[x,y]])=>`<circle class="part" data-id="${id}" cx="${140+x*1.32}" cy="${y*.88}" r="8" fill="#e4ba80" fill-opacity=".72" stroke="#123635" stroke-width="2"/>`).join('');
ORGANS.skullface={
 title:'Skull & facial bones',latin:'Ossa cranii et faciei',system:'skeletal',
 region:'Head: 8 cranial bones around the brain and 14 facial bones supporting jaws, orbits and nose',
 size:'22 adult skull bones · 14 facial + 8 cranial; hyoid and six ear ossicles counted separately in the 206-bone atlas',
 blood:'External carotid branches supply much of face; internal carotid/ophthalmic contributions supply orbit and forehead',
 nerve:'CN V carries most facial skin sensation; CN VII moves expression muscles; CN V3 moves major chewing muscles',
 blurb:'Name every one of the 14 facial and 8 cranial bones, with accurate visible labels and deeper views for hidden structures.',
 summary:'An adult skull has 22 bones: 14 facial (six paired types and the unpaired vomer and mandible) and 8 cranial. The maxillae anchor upper teeth, the mandible is the mobile lower jaw, and the palatine bones lie deep at the back of the hard palate. Ethmoid contributes to the upper bony nasal septum but is counted as a cranial bone; the inferior nasal conchae are separate paired facial bones. A front view cannot reliably identify every deep or posterior bone; those entries use an unpinned sectional reference. The hyoid and the six ear ossicles belong in the wider 206-bone adult skeleton count but not the 22 skull bones.',
 vb:[1600,900],legend:[['#d7b98a','Visibly identifiable bone'],['#9acac0','Deep study note · no false pointer']],parts,
 art:'<rect width="1600" height="900" fill="#142421"/><image href="img/skull-face-anterior.png" x="140" y="0" width="1320" height="900" preserveAspectRatio="xMidYMid meet"/>'+dots,
 inlineLabels:false,anims:[{id:'pulse',label:'Selected bone highlight',cls:'throb'}],
 photo:{file:'skull-face-anterior.png',credit:'Digital skull illustration · front view; hidden bones are intentionally unpinned',hot},
 quiz:[
  {q:'How many bones form the adult skull?',opts:['14: all facial','22: 8 cranial + 14 facial','29: including hyoid and ossicles','206: only skull'],a:1,why:'The adult skull contains 8 cranial and 14 facial bones; the hyoid and six ossicles are counted separately.'},
  {q:'Which nasal conchae are independent facial bones?',opts:['Upper and middle','Only middle','Inferior right and left','All three pairs'],a:2,why:'The paired inferior nasal conchae are independent; superior and middle conchae are portions of the ethmoid.'},
  {q:'Which nerve moves facial expression muscles?',opts:['Trigeminal CN V','Facial CN VII','Optic CN II','Hypoglossal CN XII'],a:1,why:'CN VII supplies facial-expression muscles; CN V carries most facial skin sensation.'}
 ],related:['skeleton','facialnerve','trigeminalnerve','cranialnerves'],
 study:{lead:'Follow the clear front-view landmarks; open the medial cutaway for deep parts without claiming a hidden bone is visible on the front image.',cards:[['Bone inventory','22 adult skull bones: 8 cranial and 14 facial. The hyoid and six ear ossicles remain in the larger adult skeleton count, not the 22 skull count.'],['What you can actually see','Front-view lines mark obvious forehead, upper jaw, cheekbone, nasal bridge and mandible; deep palatine, lacrimal, conchal and septal bones have no false front-view pins.'],['Bones are not facial nerves','The facial nerve (CN VII) moves expression muscles. The trigeminal nerve (CN V) supplies most facial skin sensation and jaw-closing muscle motor fibers via V3.']],sources:['https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull','https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system','https://www.ncbi.nlm.nih.gov/books/NBK554569/']}
};
// Audit the real CN VII side plate: only clearly depicted extracranial branches get pins.
// The stylomastoid bony foramen sits behind the ear in this view and is not individually visible.
const facial=ORGANS.facialnerve;
facial.photo.hot={
 parotidplexus:[525,510], temporalbranch:[617,205], zygomaticbranch:[662,417],
 buccalbranch:[703,554], marginalmandibularbranch:[710,693], cervicalbranch:[592,839]
};
facial.parts.stylomastoidforamen.contextOnly=true;
facial.photo.credit='Digital regional illustration · six identifiable extracranial nerve regions; the intratemporal course is described in text, not falsely pinned';
ORGANS.skeleton.related=['skullface',...ORGANS.skeleton.related.filter(x=>x!=='skullface')];
ORGANS.facialnerve.related=['skullface',...ORGANS.facialnerve.related.filter(x=>x!=='skullface')];
ORGANS.trigeminalnerve.related=['skullface',...ORGANS.trigeminalnerve.related.filter(x=>x!=='skullface')];
})();
