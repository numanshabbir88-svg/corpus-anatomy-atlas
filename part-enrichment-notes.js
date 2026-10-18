/* Hand-edited supplementary anatomy notes. A record has a specific anatomic description,
   function/relationship and a clinically relevant distinction; it is NOT an image pin. */
const PART_NOTES={
 bladder:[
 'Bladder body|Distensible muscular reservoir between superior dome and base.|Stores urine at low pressure until voiding.|Overdistention can impair detrusor contraction.',
 'Bladder fundus|Posterior basal surface facing rectum in men and anterior vagina in women.|Forms stable posterior surface as dome expands.|Sex-specific adjacent anatomy matters in pelvic surgery.',
 'Ureterovesical junction|Oblique intramural path where ureter enters bladder wall.|Compresses during filling to reduce vesicoureteral reflux.|Short intramural course predisposes to reflux.',
 'Interureteric ridge|Raised mucosal fold connecting the two ureteric openings.|Marks upper margin of bladder trigone.|Useful landmark during cystoscopy.',
 'Urothelial umbrella cells|Large superficial epithelial cells lining distensible urinary tract.|Form an impermeable apical barrier as the bladder stretches.|Loss of barrier can increase mucosal irritation.',
 'Lamina propria of bladder|Connective tissue layer beneath urothelium containing vessels and nerves.|Supports the bladder mucosa.|Depth of tumor invasion is critical for staging.',
 'Bladder mucosal rugae|Folds of mucosa in an empty bladder outside the smooth trigone.|Unfold as bladder fills.|Trigone remains comparatively smooth.',
 'Superior vesical arteries|Patent proximal branches of umbilical artery from internal iliac artery.|Supply superior bladder and distal ureter.|Collateral pelvic vessels can affect operative bleeding.',
 'Vesical venous plexus|Network of veins around bladder draining toward internal iliac veins.|Returns blood from bladder wall.|Communicates with nearby pelvic venous plexuses.',
 'Median umbilical ligament|Fibrous postnatal remnant of urachus extending from bladder apex toward umbilicus.|Tethers bladder dome anteriorly.|Persistent urachal tissue may form a cyst or sinus.',
 'Perivesical fascia|Loose connective tissue surrounding bladder in extraperitoneal space.|Permits bladder filling and separates surgical planes.|Inflammation may extend along extraperitoneal tissue.'
 ],
 spinalcord:[
 'Anterior median fissure|Deep longitudinal ventral groove of cord containing the anterior spinal arterial course.|Separates right and left anterior funiculi.|Helps orient cord cross-sections.',
 'Posterior median sulcus|Shallow dorsal midline groove separating posterior columns.|Marks posterior sensory pathway division.|A lesion here can affect dorsal-column modalities.',
 'Fasciculus gracilis|Medial ascending dorsal-column tract carrying lower-body touch and proprioception.|Projects to gracile nucleus in medulla.|Posterior-column injury impairs vibration and joint-position sense.',
 'Fasciculus cuneatus|Lateral dorsal-column tract above about T6 carrying upper-body sensory input.|Projects to cuneate nucleus in medulla.|Absent below upper thoracic levels.',
 'Lateral corticospinal tract|Descending motor fibers in lateral funiculus after pyramidal decussation.|Controls skilled voluntary movement, especially distal limbs.|Damage produces ipsilateral upper-motor-neuron signs below cord lesion.',
 'Anterolateral pathway|Ascending axons carrying pain, temperature and crude touch after segmental crossing.|Transmits nociceptive signals to higher centers.|Cord hemisection produces contralateral pain-temperature loss below lesion.',
 'Anterior spinal artery|Single midline vessel supplying much of anterior two-thirds of cord.|Perfuses anterior horns and many descending tracts.|Infarction can spare dorsal-column sensation.',
 'Posterior spinal arteries|Paired longitudinal vessels supplying dorsal cord regions.|Support posterior columns and dorsal horns.|Segmental arterial input varies by level.',
 'Conus medullaris|Tapered end of adult spinal cord, usually near L1–L2 vertebral level.|Contains terminal sacral cord segments.|Compression may cause saddle sensory and sphincter symptoms.',
 'Filum terminale|Pial strand descending from conus to coccygeal anchoring tissues.|Stabilizes caudal cord within dural sac.|A thickened tethering filum can restrict cord movement.',
 'Cauda equina|Bundle of descending lumbar, sacral and coccygeal nerve roots below conus.|Conveys motor, sensory and autonomic fibers to lower body.|Compression is a neurosurgical emergency.'
 ],
 maleprostate:[
 'Prostatic capsule|Fibromuscular covering closely investing the gland.|Contains glandular tissue and separates outer surgical planes.|Extra-capsular spread changes cancer staging.',
 'Anterior fibromuscular stroma|Non-glandular anterior component of prostate rich in muscle and connective tissue.|Provides structural support to prostatic urethra.|Distinct from gland-bearing peripheral and transition zones.',
 'Prostatic ducts|Small ducts from prostatic acini opening mainly into prostatic sinuses.|Convey prostatic fluid into urethra.|Inflammation may involve duct openings.',
 'Prostatic neurovascular bundle|Pelvic autonomic fibers and vessels along posterolateral prostate.|Carries cavernous nerves important for erection.|May be at risk during radical prostatectomy.',
 'Prostatic venous plexus|Veins around capsule, communicating with deep dorsal penile and vesical veins.|Drain gland and adjacent bladder neck.|Pelvic venous channels may bleed during surgery.',
 'Inferior vesical arterial branches|Variable internal iliac-derived vessels supplying male bladder base and prostate.|Deliver blood to prostatic parenchyma.|Branching pattern varies among patients.'
 ],
 ear:[
 'Tympanic annulus|Fibrocartilaginous ring anchoring the peripheral tympanic membrane in its sulcus.|Fixes the membrane while its central portion vibrates.|Posterior-superior quadrant requires care during ear procedures.',
 'Pars flaccida|Small slack superior portion of the tympanic membrane above the malleolar folds.|Moves differently from the taut pars tensa.|Retraction pockets here can precede cholesteatoma.',
 'Pars tensa|Large tense fibrous part of the tympanic membrane attached to the malleus handle.|Transmits sound vibration to the ossicles.|Perforation can impair conductive hearing.',
 'Oval window|Membrane-covered opening between stapes footplate and scala vestibuli.|Transmits ossicular motion into cochlear fluid.|Stapes fixation can cause conductive hearing loss.',
 'Round window|Flexible membrane at the basal cochlear scala tympani.|Allows pressure displacement as the stapes drives cochlear fluid.|Its position matters in cochlear surgery.',
 'Organ of Corti|Sensory epithelium on basilar membrane containing inner and outer hair cells.|Transduces basilar-membrane motion into auditory nerve signals.|Hair-cell damage causes sensorineural hearing loss.',
 'Basilar membrane|Graded elastic membrane separating scala media from scala tympani.|Supports frequency-dependent cochlear vibration.|Basal region responds strongly to high frequencies.',
 'Stria vascularis|Specialized vascular epithelium on lateral wall of cochlear duct.|Maintains potassium-rich endolymph and its electrical potential.|Disruption compromises hair-cell transduction.',
 'Macula of utricle|Otolith-bearing sensory patch in utricle oriented mainly for horizontal acceleration.|Detects linear head acceleration and gravity component.|Vestibular dysfunction can cause imbalance.',
 'Crista ampullaris|Hair-cell sensory ridge in each semicircular-duct ampulla beneath cupula.|Detects angular head acceleration.|Testing canal function helps localize vestibular disease.'
 ],
 pancreas:[
 'Uncinate process|Hook-shaped pancreatic head extension passing posterior to superior mesenteric vessels.|Completes deep head contour around the mesenteric root.|A mass may involve mesenteric vessels.',
 'Pancreaticoduodenal groove|Anatomical interface where pancreatic head contacts the duodenal curve.|Relates gland secretions to duodenal entry.|Inflammation here can affect both organs.',
 'Minor duodenal papilla|Small mucosal opening receiving the accessory pancreatic duct when patent.|Provides an accessory pancreatic drainage route.|Drainage pattern varies with duct fusion.',
 'Major duodenal papilla|Mucosal projection receiving ampulla or pancreatic and bile duct openings.|Delivers bile and pancreatic juice to descending duodenum.|Gallstones at this level may obstruct both ducts.',
 'Sphincter of Oddi|Smooth-muscle complex surrounding terminal biliary and pancreatic outflow.|Controls flow into duodenum and limits reflux.|Dysfunction can mimic obstructive pain.',
 'Exocrine acinus|Cluster of enzyme-secreting serous cells surrounding a small lumen.|Releases digestive enzyme precursors into duct system.|Acinar injury contributes to pancreatitis.',
 'Centroacinar cells|Pale cells at acinus-to-intercalated-duct transition.|Start ductal bicarbonate-rich secretion.|They distinguish pancreatic from salivary acini histologically.',
 'Intercalated duct|Smallest exocrine duct receiving secretion from acinar lumen.|Conveys and modifies pancreatic juice.|Duct obstruction impairs exocrine drainage.',
 'Beta cells|Pancreatic islet endocrine cells concentrated variably within islets.|Secrete insulin in response to glucose.|Loss or dysfunction contributes to diabetes.',
 'Alpha cells|Islet endocrine cells intermingled with other endocrine populations.|Release glucagon during falling glucose.|Glucagon raises hepatic glucose availability.',
 'Delta cells|Islet cells producing somatostatin.|Modulate neighboring endocrine and exocrine secretion.|Islet composition is not fixed across the gland.',
 'Pancreatic stellate cells|Periacinar and periductal mesenchymal cells activated by injury.|Regulate extracellular matrix turnover.|Persistent activation contributes to pancreatic fibrosis.'
 ],
 spleen:[
 'Periarteriolar lymphoid sheath|T-cell-rich white-pulp cylinder surrounding a central arteriole.|Samples blood-borne antigens with nearby immune cells.|Disrupted white pulp weakens adaptive responses.',
 'B-cell follicle|Lymphoid nodule adjacent to central arterioles in white pulp.|Supports B-cell activation and antibody maturation.|A germinal center appears after antigenic stimulation.',
 'Marginal zone|Interface between white and red pulp with specialized macrophages and B cells.|Traps circulating antigens, including encapsulated bacteria.|Loss of splenic function increases sepsis risk.',
 'Splenic cords|Cell-rich Billroth cords of red pulp between sinusoids.|Filter circulating erythrocytes and platelets.|Abnormal red-cell deformability leads to trapping.',
 'Sinusoidal slits|Gaps between elongated endothelial stave cells in splenic sinusoids.|Allow deformable red cells to re-enter circulation.|Rigid or senescent red cells may fail to pass.',
 'Central arteriole|Arteriole coursing eccentrically through white pulp.|Brings blood to immune surveillance regions.|It is central to a follicle-associated sheath, not the whole spleen.',
 'Penicillar arterioles|Small branches departing splenic white pulp toward red pulp.|Feed terminal capillaries and splenic cords.|Their organization underlies blood filtration.',
 'Trabecular artery|Arterial branch traveling within a splenic connective-tissue trabecula.|Distributes inflow deeper through parenchyma.|Traumatic rupture can bleed briskly.',
 'Trabecular vein|Venous channel within trabecular connective tissue.|Returns blood toward splenic vein at hilum.|Distinct from sinusoidal microvessels.',
 'Splenic macrophages|Phagocytes abundant in marginal zone and red pulp.|Clear old erythrocytes and opsonized organisms.|Asplenia impairs clearance of encapsulated pathogens.',
 'Splenic lymphatic outflow|Lymphatic vessels largely associated with capsule and trabeculae.|Drain tissue fluid toward pancreaticosplenic nodes.|Splenic blood filtering differs from node lymph filtering.',
 'Gastrosplenic ligament|Peritoneal fold between stomach and spleen containing short gastric vessels.|Suspends spleen and carries vessels to gastric fundus.|Vessels may be injured during splenic mobilization.'
 ],
 thyroid:[
 'Thyroid follicular cell|Simple cuboidal epithelial cell bordering a colloid-filled follicle.|Synthesizes thyroglobulin and releases T3/T4 after processing.|Cell height reflects activity but is not a stand-alone diagnosis.',
 'Thyroglobulin-rich colloid|Extracellular storage material in follicular lumen.|Stores iodinated precursor for thyroid hormones.|Follicle appearance changes with stimulation.',
 'Parafollicular C cell|Endocrine cell between follicles or in follicular epithelium.|Releases calcitonin.|Medullary thyroid carcinoma arises from C-cell lineage.',
 'Superior thyroid artery|External carotid branch approaching upper thyroid pole.|Supplies superior gland and adjacent tissues.|External branch of superior laryngeal nerve is nearby.',
 'Inferior thyroid artery|Thyrocervical trunk branch supplying posterior-inferior thyroid.|Feeds gland and usually parathyroid region.|Its relation to recurrent laryngeal nerve varies.',
 'Superior thyroid vein|Venous drainage from upper thyroid to internal jugular vein.|Returns blood from superior thyroid pole.|Veins need control in neck surgery.',
 'Middle thyroid vein|Short vein from lateral gland to internal jugular vein.|Drains lateral thyroid surface.|May be encountered early in gland mobilization.',
 'Inferior thyroid veins|Variable veins from lower poles entering brachiocephalic venous system.|Drain lower thyroid and isthmus region.|Anterior tracheal venous plexus can bleed.',
 'Recurrent laryngeal nerve|Vagal branch ascending in tracheoesophageal groove toward larynx.|Motor supply to most intrinsic laryngeal muscles.|At risk near posterior thyroid and inferior thyroid artery.',
 'External superior laryngeal nerve|Superior laryngeal branch accompanying superior pole vascular region.|Motor to cricothyroid for pitch adjustment.|Injury can impair high-pitched phonation.',
 'Thyroid capsule|Connective-tissue sheath closely adherent to thyroid parenchyma.|Supports lobules and vascular entry.|Surgical planes differ from outer pretracheal fascia.',
 'Berry ligament|Dense posteromedial attachment of thyroid to cricoid and upper trachea.|Anchors gland during swallowing.|Recurrent laryngeal nerve runs close to this region.'
 ],
 autonomic:[
 'Superior cervical ganglion|Upper sympathetic-chain ganglion near C2–C3 levels.|Sends postganglionic fibers toward head via carotid plexuses.|Cervical disruption can cause Horner syndrome.',
 'Stellate ganglion|Often fused inferior cervical and first thoracic sympathetic ganglia.|Contributes sympathetic supply to upper limb and neck.|Blockade affects ipsilateral sympathetic tone.',
 'Greater splanchnic nerve|Preganglionic sympathetic fibers usually from T5–T9 to celiac ganglion.|Carries thoracic visceral sympathetic outflow.|Not the same as pelvic splanchnic parasympathetic nerves.',
 'Lumbar splanchnic nerves|Sympathetic branches from lumbar trunk to prevertebral plexuses.|Reach abdominal and pelvic viscera.|Course differs from somatic lumbar spinal nerves.',
 'Inferior hypogastric plexus|Paired pelvic autonomic networks lateral to rectum, bladder and reproductive organs.|Distribute sympathetic and parasympathetic fibers to pelvic organs.|Pelvic surgery can damage visceral function.',
 'Pterygopalatine ganglion|Parasympathetic relay for facial-nerve fibers carried toward lacrimal and nasal glands.|Supports glandular secretion.|Its postganglionic fibers hitchhike on trigeminal branches.',
 'Ciliary ganglion|Small orbital parasympathetic ganglion associated with oculomotor nerve.|Postganglionic fibers constrict pupil and accommodate lens.|Lesion can produce poorly reactive pupil.',
 'Otic ganglion|Parasympathetic relay for glossopharyngeal fibers destined for parotid gland.|Supports parotid salivary secretion.|Auriculotemporal V3 carries postganglionic fibers onward.'
 ],
 breast:[
 'Terminal duct lobular unit|Small duct and associated glandular acini forming a functional breast unit.|Produces milk in lactation and drains into larger duct tree.|Many breast lesions arise in this region.',
 'Lobular acini|Secretory epithelial units surrounded by myoepithelial cells.|Synthesize milk constituents under hormonal control.|Architecture changes across life and pregnancy.',
 'Myoepithelial cells|Contractile cells between secretory epithelium and basement membrane.|Respond to oxytocin to expel milk.|Their presence aids histologic distinction in lesions.',
 'Ductal myoepithelium|Contractile layer surrounding many ducts beneath epithelial cells.|Helps milk movement and maintains duct boundary.|Loss of myoepithelial layer is important in invasion assessment.',
 'Retromammary space|Loose plane between posterior breast and pectoral fascia.|Permits some mobility over thoracic wall.|Fixation to deep tissue can change breast movement.',
 'Pectoral fascia|Deep investing fascia over pectoralis major beneath breast tissue.|Forms posterior relation of mammary gland.|Chest-wall involvement differs from superficial skin change.',
 'Subareolar lymphatic plexus|Lymphatic network associated with nipple–areola region and breast drainage.|Routes lymph toward axillary and parasternal basins.|Breast drainage is variable; no single route fits all.',
 'Internal mammary nodes|Parasternal nodes along internal thoracic vessels.|Receive part of medial breast lymphatic drainage.|Relevant to regional staging.',
 'Lateral thoracic artery|Axillary branch contributing blood to lateral breast and chest wall.|Supplies lateral glandular tissue.|Vascular pattern differs by individual.',
 'Intercostal perforators|Branches of internal thoracic and intercostal vessels crossing chest wall.|Supply medial and deep breast regions.|Important for reconstructive blood supply.'
 ],
 muscle:[
 'Rotator cuff muscle group|Supraspinatus, infraspinatus, teres minor and subscapularis surround shoulder joint.|Center humeral head during motion.|Tendon tears can weaken elevation or rotation.',
 'Pelvic diaphragm|Levator ani and coccygeus form muscular pelvic-floor support.|Supports pelvic viscera and continence.|Weakness contributes to pelvic-floor dysfunction.',
 'Transversus abdominis|Deep horizontal-fiber abdominal wall muscle beneath obliques.|Compresses abdominal contents and stabilizes trunk.|Aponeurosis contributes to rectus sheath.',
 'Diaphragm central tendon|Strong aponeurotic center receiving diaphragm muscle fibers.|Transmits inspiratory muscle force and supports pericardium.|Phrenic nerve injury can impair diaphragm movement.',
 'Plantar intrinsic muscles|Small layered muscles of sole acting on toes and foot arches.|Fine-tune stance and toe movement.|Neuropathy may alter toe posture and balance.'
 ],
 lymph:[
 'Afferent lymphatic vessels|Vessels entering lymph-node capsule and subcapsular sinus.|Deliver tissue lymph for immune filtration.|Obstruction can cause regional swelling.',
 'Subcapsular sinus|Lymph-filled space immediately deep to lymph-node capsule.|Distributes afferent lymph along node surface.|First site encountered by many arriving cells and antigens.',
 'Lymph-node cortex|Outer region containing B-cell follicles and germinal centers.|Supports B-cell activation.|Reactive follicles can enlarge nodes.',
 'Lymph-node paracortex|T-cell-rich zone between follicles and medulla.|Receives lymphocytes through high endothelial venules.|Can expand in cell-mediated immune responses.',
 'High endothelial venule|Specialized postcapillary venule in node paracortex.|Permits circulating lymphocytes to enter node.|Distinct from afferent lymphatic entry.',
 'Medullary cords|Cell-rich strands within lymph-node medulla containing plasma cells and macrophages.|Support antibody output and immune filtering.|Separated by medullary sinuses.',
 'Efferent lymphatic vessel|Vessel leaving a node at hilum after lymph traverses sinuses.|Carries filtered lymph to downstream nodes or ducts.|Fewer efferents than afferents help slow lymph transit.',
 'Intestinal lacteal|Blind-ended lymphatic capillary within small-intestinal villus.|Absorbs chylomicron-rich dietary lipid.|Fat enters lymph before returning to systemic blood.'
 ],
 vascular:[
 'Endothelium|Single-cell lining of blood-vessel lumen on basement membrane.|Controls barrier, clotting and vascular tone signals.|Endothelial damage promotes thrombosis.',
 'Tunica media|Middle arterial or venous wall layer rich in smooth muscle, varying by vessel.|Changes vessel caliber and blood distribution.|Medial degeneration can weaken large arteries.',
 'Tunica adventitia|Outer connective-tissue layer containing nerves and, in large vessels, vasa vasorum.|Anchors and nourishes the vessel wall.|May be involved in vascular inflammation.',
 'Vasa vasorum|Small vessels supplying outer wall of large arteries and veins.|Nourish tissue beyond diffusion range from lumen.|Aortic wall disease can involve this network.',
 'Capillary pericytes|Mural cells wrapped around some microvessels and capillaries.|Help stabilize small vessels and regulate repair.|Microvascular damage affects tissue perfusion.'
 ],
 endocrine:[
 'Anterior pituitary somatotrophs|Adenohypophyseal cells secreting growth hormone.|Drive growth and metabolic signaling via GH and IGF-1.|Pituitary tumors may overproduce GH.',
 'Anterior pituitary corticotrophs|Pituitary cells making ACTH from POMC precursor.|Stimulate adrenal cortisol production.|ACTH deficiency causes secondary adrenal insufficiency.',
 'Posterior pituitary axon terminals|Hypothalamic nerve endings within neurohypophysis.|Release ADH and oxytocin made in hypothalamus.|Posterior pituitary stores rather than synthesizes these hormones.',
 'Adrenal zona glomerulosa|Outermost adrenal cortical layer beneath capsule.|Produces aldosterone under angiotensin II and potassium control.|Excess can cause hypertension with hypokalemia.',
 'Adrenal zona fasciculata|Middle and largest adrenal cortical zone.|Produces glucocorticoids including cortisol.|ACTH excess can enlarge this zone.',
 'Adrenal zona reticularis|Inner adrenal cortical network adjacent to medulla.|Produces adrenal androgen precursors.|Androgen excess has different effects across ages.',
 'Thyroid follicular cells|Cells encircling extracellular colloid in thyroid follicles.|Synthesize and release T4/T3 after iodination and processing.|TSH regulates their activity.',
 'Parathyroid chief cells|Small endocrine cells of parathyroid glands.|Secrete PTH in response to falling ionized calcium.|Adenoma can cause hypercalcemia.',
 'Pancreatic beta cells|Insulin-producing cells of endocrine pancreatic islets.|Lower circulating glucose by promoting uptake/storage.|Beta-cell loss causes insulin deficiency.'
 ],
 shoulder:[
 'Humeral head|Rounded proximal humeral articular surface meeting glenoid cavity.|Provides large range of glenohumeral motion.|Dislocation can injure nearby axillary nerve.',
 'Glenoid fossa|Shallow scapular socket deepened by its labrum.|Receives humeral head in shoulder joint.|Shallow socket increases mobility but needs soft-tissue stability.',
 'Coracoid process|Anterior hook-like scapular projection for tendon and ligament attachments.|Anchors short biceps head, coracobrachialis and stabilizing ligaments.|Landmark for anterior shoulder procedures.',
 'Acromion|Lateral continuation of scapular spine forming shoulder roof.|Articulates with clavicle and overlies cuff.|Shape can affect subacromial clearance.',
 'Acromioclavicular joint|Plane synovial joint between acromion and distal clavicle.|Allows scapular motion relative to clavicle.|Ligament injury causes AC separation.',
 'Coracoclavicular ligaments|Conoid and trapezoid components linking coracoid to clavicle.|Suspend scapula from clavicle.|Rupture increases vertical AC instability.',
 'Coracoacromial ligament|Fibrous arch spanning coracoid and acromion.|Forms protective roof above humeral head.|Can contribute to narrowed subacromial outlet.',
 'Coracohumeral ligament|Fibrous reinforcement from coracoid toward greater/lesser tubercles.|Helps resist inferior translation with arm at side.|Capsular contracture can limit motion.',
 'Rotator interval|Capsular region between supraspinatus and subscapularis tendons.|Contains superior glenohumeral and coracohumeral restraints.|Relevant in adhesive capsulitis.',
 'Axillary recess|Inferior capsular fold of glenohumeral joint.|Unfolds during overhead abduction.|Contracture limits elevation.',
 'Quadrangular space|Passage bordered by teres muscles, long triceps head and humerus.|Conveys axillary nerve and posterior circumflex humeral artery.|Entrapment can affect deltoid sensation/motor supply.',
 'Scapular stabilizers|Serratus anterior, trapezius and rhomboids coordinate scapular positioning.|Place glenoid for efficient arm motion.|Weakness may produce scapular winging or dyskinesis.'
 ],
 larynx:[
 'Superior nasal concha|Small upper lateral nasal projection of ethmoid bone.|Increases mucosal surface and directs airflow toward olfactory region.|Not the inferior concha, which is a separate bone.',
 'Olfactory epithelium|Specialized mucosa near roof of nasal cavity and superior concha.|Detects odorants through olfactory neurons.|Damage can impair smell.',
 'Pharyngeal tonsil|Lymphoid tissue of nasopharyngeal roof/posterior wall.|Provides mucosal immune surveillance.|Enlargement may obstruct nasal breathing.',
 'Palatine tonsil|Lymphoid organ in tonsillar fossa of oropharynx.|Samples swallowed and inhaled antigens.|Nearby tonsillar vessels matter in surgery.',
 'Pyriform recess|Mucosal gutter lateral to laryngeal inlet in hypopharynx.|Channels swallowed material around larynx.|Foreign bodies can lodge here.',
 'Arytenoid cartilages|Paired pyramidal cartilages articulating with cricoid lamina.|Move vocal processes to open/close glottis.|Recurrent laryngeal nerve injury limits movement.',
 'Corniculate cartilages|Small cartilages atop arytenoid apices.|Support aryepiglottic folds.|Useful endoscopic landmarks.',
 'Vestibular folds|Superior laryngeal mucosal folds above true vocal folds.|Help protect lower airway.|Not the principal sound-producing folds.',
 'Posterior cricoarytenoid|Intrinsic laryngeal muscle from posterior cricoid to arytenoid.|Only muscle that abducts true vocal folds.|Bilateral dysfunction threatens airway patency.',
 'Cricothyroid muscle|Muscle between cricoid and thyroid cartilages.|Tenses vocal folds to increase pitch.|Supplied by external branch of superior laryngeal nerve.',
 'Recurrent laryngeal nerve|Vagal nerve ascending beside trachea and esophagus into larynx.|Supplies most intrinsic laryngeal muscles and sensation below folds.|Vulnerable in thyroid and mediastinal disease.'
 ],
 marrow:[
 'Common myeloid progenitor|Marrow precursor downstream of haematopoietic stem cell.|Gives rise to granulocyte, monocyte, erythroid and megakaryocyte lineages.|Lineage abnormalities appear in myeloid neoplasms.',
 'Common lymphoid progenitor|Marrow precursor producing lymphocyte lineages.|Seeds B, T and natural-killer cell development.|B-cell maturation largely begins in marrow.',
 'Erythroblast island|Cluster of erythroid precursors around a central macrophage.|Supports red-cell development and iron handling.|Marrow stress can alter erythroid proliferation.',
 'Reticulocyte|Young enucleated erythrocyte retaining residual RNA.|Matures into circulating red blood cell.|Count gauges marrow response to anemia.',
 'Megakaryocyte|Very large polyploid marrow cell beside sinusoidal spaces.|Sheds platelets into circulation.|Low production can cause thrombocytopenia.',
 'Neutrophil precursor series|Granulocytic maturation pathway from myeloblast through bands to segmented cells.|Produces rapid innate phagocytes.|Left shift reflects release of immature forms.',
 'Marrow stromal cells|Nonhematopoietic support cells including fibroblastic and mesenchymal populations.|Provide niche signals and matrix.|Niche disruption affects hematopoiesis.',
 'Osteoclast|Multinucleated cell resorbing bone along endosteal surfaces.|Renews mineralized matrix with osteoblasts.|Overactivity contributes to bone loss.',
 'Osteocyte|Former osteoblast embedded within mineralized lacuna.|Senses mechanical load and coordinates remodeling.|Not a circulating blood cell.',
 'Nutrient artery|Vessel entering bone shaft to supply medullary space and inner cortex.|Provides oxygen to marrow and bone.|Vascular injury can compromise bone viability.',
 'Haversian canal|Central canal of compact-bone osteon containing vessels and nerves.|Supplies concentric lamellae.|Different from porous trabecular marrow spaces.',
 'Marrow adipocyte|Fat-storing stromal cell in yellow and mixed marrow.|Contributes to marrow metabolic environment.|Marrow fat increases with age in many sites.',
 'Sinusoidal endothelium|Specialized discontinuous lining of marrow venous sinuses.|Allows mature blood cells to enter bloodstream.|Barrier injury alters blood-cell egress.'
 ],
 gynuterus:[
 'Endometrial glands|Simple tubular glands extending through uterine mucosa into stroma.|Change secretion and shape during menstrual cycle.|Gland pattern helps date endometrium histologically.',
 'Endometrial stroma|Cell-rich connective tissue supporting endometrial glands and spiral vessels.|Decidualizes with progesterone during pregnancy.|Breakdown of functionalis contributes to menses.',
 'Straight basal arteries|Branches reaching basalis without long coiling of spiral arteries.|Perfuse persistent basal endometrium.|Basalis survives normal menstrual shedding.',
 'Uterine venous plexus|Thin-walled veins draining uterine walls into internal iliac tributaries.|Returns blood from myometrium and endometrium.|Pregnancy markedly enlarges venous channels.',
 'Fundal serosal surface|Peritoneal covering over uterine fundus continuous with pelvic peritoneum.|Reduces friction with neighboring bowel.|Serosa is absent on some lower cervical surfaces.',
 'Junctional zone|Inner myometrial layer adjacent to endometrium, visible on appropriate MRI.|Coordinates uterine contractility and endometrial interface.|Alteration can be associated with adenomyosis.'
 ],
 gyncervix:[
 'Endocervical crypts|Branched folds and glandlike clefts of mucus-secreting cervical epithelium.|Increase secretory surface.|Obstruction may form nabothian cysts.',
 'Nabothian cyst|Mucus retention cyst beneath ectocervical surface after gland outlet blockage.|Reflects benign epithelial remodeling.|Common incidental finding, not automatically malignancy.',
 'Cervical canal mucus plug|Viscous secretion occupying canal, with composition changing across cycle and pregnancy.|Creates selective barrier and modulates sperm passage.|Appearance alone does not establish ovulation or infection.',
 'Anterior cervical lip|Anterior rim of cervix bordering external os.|Landmark during speculum examination.|Contour changes with parity and age.',
 'Posterior cervical lip|Posterior rim of cervix bordering external os.|Defines relation to posterior vaginal fornix.|Posterior fornix lies close to rectouterine pouch.',
 'Cervical arterial branches|Branches of uterine and vaginal arteries entering lateral cervical stroma.|Perfuse cervical epithelium and muscular tissue.|Lateral cervix lies near descending ureter.',
 'Parametrial connective tissue|Fibrous tissue beside cervix enclosing vessels, nerves and lymphatics.|Connects cervix to pelvic sidewall.|Disease extension and surgery use this plane.',
 'Cervical lymphatic channels|Networks draining toward obturator, internal/external iliac and sacral basins.|Carry tissue fluid and immune cells.|Routes matter in staging cervical disease.'
 ],
 gynadnexa:[
 'Theca interna|Vascular steroidogenic layer surrounding developing ovarian follicle.|Supplies androgen precursors under LH stimulation.|Works with granulosa aromatase in estrogen synthesis.',
 'Granulosa cell layer|Follicular epithelial cells surrounding oocyte and antrum.|Nourish oocyte and aromatize thecal androgen.|Following ovulation contribute to corpus luteum.',
 'Zona pellucida|Glycoprotein coat immediately surrounding oocyte.|Supports sperm binding and early embryo protection.|Persists through initial cleavage stages.',
 'Tubal muscularis|Circular and longitudinal smooth-muscle layers of uterine tube wall.|Moves luminal contents with ciliary activity.|Inflammation/scarring can impair transport.'
 ],
 gynvagina:[
 'Basal epithelial layer|Deep proliferative stratum of vaginal stratified squamous mucosa.|Renews superficial epithelium.|Atrophy changes epithelial thickness and fragility.',
 'Intermediate epithelial cells|Glycogen-rich cells in hormonally responsive vaginal epithelium.|Contribute substrate supporting normal microbiota.|Cytology changes with estrogen exposure.',
 'Vaginal venous plexus|Intercommunicating veins in lateral and deep vaginal walls.|Drains to internal iliac venous tributaries.|Engorgement varies with hormonal and vascular state.',
 'Vaginal arterial supply|Vaginal, uterine and internal pudendal branches with regional variation.|Nourishes canal and neighboring structures.|Collateral supply influences operative bleeding.',
 'Perineal membrane|Dense fibrous sheet under deep perineal compartment anterior to vaginal opening.|Supports urogenital structures and muscle attachments.|Plane matters in pelvic-floor surgery.',
 'Posterior vaginal adventitia|Connective tissue plane between vaginal wall and rectovaginal septum.|Supports separation from rectum.|Defects can contribute to posterior compartment prolapse.'
 ],
 gynsupport:[
 'Arcus tendineus fascia pelvis|Fascial thickening from pubis toward ischial spine along obturator internus fascia.|Supports lateral vaginal fascial attachments.|Detachment can contribute to paravaginal defects.',
 'Perineal body central tendon|Fibromuscular node between distal vagina and anal canal.|Anchors perineal muscles and pelvic-floor fibers.|Disruption may weaken distal pelvic support.',
 'Obturator internus fascia|Fascial layer over pelvic sidewall muscle contributing to support attachments.|Provides anchoring plane for pelvic fascia.|Lateral dissection risks nearby neurovascular structures.'
 ],
 maletestis:[
 'Straight seminiferous tubules|Short connecting segments between coiled seminiferous tubules and rete testis.|Move sperm and luminal fluid toward rete.|Outflow blockage can cause upstream dilation.',
 'Basal lamina of tubule|Basement membrane surrounding seminiferous epithelium and peritubular cells.|Supports germ and Sertoli cell arrangement.|Remodels in some infertility disorders.',
 'Spermatogonia|Basal germ cells next to tubular basement membrane.|Begin spermatogenic lineage by division.|Germ-cell depletion impairs sperm production.',
 'Primary spermatocytes|Meiotic germ cells moving toward adluminal compartment.|Undergo first meiotic division.|Typically prominent in active seminiferous tubules.',
 'Spermatids|Postmeiotic haploid cells undergoing head and flagellum remodeling.|Become spermatozoa after spermiogenesis.|Maturation abnormalities affect sperm morphology.'
 ],
 clitoralcomplex:[
 'Dorsal venous channel|Venous return along dorsal clitoral complex adjacent to dorsal arterial and sensory structures.|Drains engorged distal tissue.|Vascular arrangement varies between individuals.',
 'Crural cavernous sinusoids|Endothelium-lined vascular spaces within paired proximal clitoral corpora.|Expand as smooth muscle relaxes.|Distinct from highly innervated glans tissue.',
 'Bulbous venous plexus|Communicating venous spaces associated with paired vestibular bulbs.|Contributes to bulb engorgement.|Bulbs are anatomically distinct from clitoral cavernosa.',
 'Clitoral septal tissue|Connective partition between paired corpora within clitoral body.|Separates and supports erectile columns.|Anatomic continuity is not identical to penile septum.'
 ],
 penileerectile:[
 'Cavernosal septum|Fibrous partition between right and left corpora cavernosa, incomplete distally in places.|Connects paired erectile bodies.|Intercavernosal communication varies.',
 'Emissary veins|Veins traversing tunica albuginea to drain cavernous spaces.|Link sinusoidal blood to deeper venous outflow.|Compression during tumescence reduces drainage.',
 'Bulbourethral arterial branch|Internal pudendal-derived branch toward proximal spongiosum and bulb.|Supplies bulb and surrounding urethral tissue.|Branching pattern varies with individual anatomy.',
 'Ischiocavernosus muscle|Superficial perineal muscle covering each penile crus.|Compresses crus and supports rigidity.|Pudendal motor branches supply it.'
 ],
 facialnerve:[
 'Facial colliculus|Dorsal pontine prominence formed partly by facial nerve fibers looping around abducens nucleus.|Marks internal VII course in fourth-ventricle floor.|Pontine lesion may combine VI and VII signs.',
 'Digastric branch of VII|Early motor branch after stylomastoid exit toward posterior belly of digastric.|Supports jaw opening and hyoid elevation.|Branches before intraparotid terminal divisions.',
 'Stylohyoid branch|Motor branch of facial nerve to stylohyoid muscle.|Elevates and retracts hyoid during swallowing.|Arises proximal to main facial expression branches.',
 'Submandibular ganglion pathway|Chorda tympani fibers travel with lingual V3 to submandibular ganglion.|Postganglionic fibers stimulate submandibular/sublingual secretion.|Taste fibers pass through without synapsing there.'
 ],
 trigeminalnerve:[
 'Principal sensory nucleus|Pontine trigeminal nucleus receiving fine touch and pressure signals from face.|Relays discriminative facial sensation toward thalamus.|Brainstem lesions can dissociate sensory modalities.',
 'Spinal trigeminal nucleus|Nucleus extending through lower pons, medulla and upper cord.|Processes facial pain and temperature input.|Lateral medullary injury may impair ipsilateral facial pain sense.',
 'Mesencephalic trigeminal nucleus|Midbrain population containing primary sensory cell bodies for jaw proprioception.|Feeds jaw reflex and proprioceptive circuits.|Unusual primary sensory neurons reside inside CNS.',
 'Trigeminal motor nucleus|Pontine motor nucleus projecting through V3.|Drives muscles of mastication and selected first-arch muscles.|Unilateral weakness causes jaw deviation toward lesion.'
 ],
 retina:[
 'Horizontal cells|Interneurons in outer retina connecting photoreceptor–bipolar synapses.|Shape lateral inhibition and contrast.|Not direct optic-nerve output cells.',
 'Amacrine cells|Diverse interneurons at inner plexiform synapses.|Modulate timing and spatial patterns of ganglion-cell output.|Different classes serve different retinal computations.'
 ],
 nephron:[
 'Glomerular endothelial fenestrae|Small pores in capillary endothelial cells facing filtration barrier.|Pass plasma water while excluding blood cells.|Endothelial injury can contribute to filtration defects.',
 'Connecting tubule|Short distal nephron segment linking distal convoluted tubule to collecting system.|Adjusts electrolyte handling before shared collecting duct.|Anatomically distinct from the collecting duct itself.'
 ],
 brachialplexus:[
 'Dorsal scapular nerve|Root-level C5 branch traveling toward rhomboids and levator scapulae.|Retracts/elevates scapula with its target muscles.|Injury may alter scapular stability.',
 'Medial pectoral nerve|Branch from medial cord entering pectoralis minor and major.|Contributes to pectoral muscle activation.|Not a cutaneous sensory nerve of medial chest.'
 ],
 cerebraldeep:[
 'External capsule|Thin white-matter sheet lateral to putamen and medial to claustrum.|Carries association and corticocortical fibers.|Distinct from the internal capsule near thalamus.'
 ],
 meningescsf:[
 'Sigmoid sinus|Curved dural venous channel continuing transverse sinus to jugular bulb.|Drains cranial venous blood into internal jugular vein.|Mastoid disease can be adjacent to its wall.',
 'Bridging cerebral veins|Veins crossing subarachnoid and dural border region toward dural sinuses.|Drain superficial cerebral cortex.|Tearing can lead to subdural hematoma.'
 ],
 brainstemdeep:[
 'Nucleus tractus solitarii|Dorsal medullary sensory nucleus receiving visceral and taste afferents.|Integrates cardiorespiratory reflex and taste pathways.|Medullary lesions disrupt autonomic reflexes.'
 ],
 pulmonaryacinus:[
 'Alveolar entrance ring|Elastic fibers and small smooth-muscle elements border some alveolar openings along ducts.|Helps maintain geometry of distal airways.|Loss of elastic support promotes airspace enlargement.',
 'Alveolar epithelial tight junctions|Sealing contacts between adjacent alveolar epithelial cells.|Maintain fluid barrier despite thin gas-exchange surface.|Barrier failure contributes to alveolar edema.',
 'Pulmonary interstitium|Thin connective compartment between epithelium and capillary endothelium.|Supports cells, matrix and diffusion interface.|Fibrosis thickens gas-exchange barrier.'
 ],
 hepaticlobule:[
 'Limiting plate|Peripheral row of hepatocytes bordering portal connective tissue.|Defines interface between lobule and portal tract.|Portal inflammation may breach this interface.',
 'Peribiliary capillary plexus|Fine arterial-derived vessels surrounding intrahepatic bile ducts.|Nourish cholangiocytes and duct walls.|Ischemic injury can damage bile ducts.',
 'Lymphatic channels of portal tract|Small drainage vessels accompanying portal structures.|Return interstitial fluid toward hepatic lymphatic outflow.|Lymph production rises with sinusoidal congestion.'
 ],
 intestinalwall:[
 'Brunner glands|Mucus-rich glands in duodenal submucosa, especially proximal duodenum.|Release alkaline secretion protecting from gastric acid.|Do not expect them throughout jejunum and ileum.',
 'Peyer patches|Aggregated lymphoid follicles particularly prominent in ileal mucosa/submucosa.|Sample luminal antigens via overlying specialized epithelium.|Normal density varies along small intestine.'
 ]
};
