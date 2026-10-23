/* ============================================================
   CORPUS AI BOT — Interactive Anatomy Assistant
   - Animated character (Wave idle pose -> Pointing whiteboard pose)
   - Greeting bubble on load + every 20 seconds with wave animation
   - Instant internal search across 74 chapters, 1,586 parts, 370 FAQs,
     312 muscles, 32 tendons & 206 bones
   - Fast (1–3s max) background medical reference search for external
     organs/topics with ZERO external links shown to the user
   ============================================================ */
(function () {
  'use strict';

  if (window.__CORPUS_BOT_LOADED__) return;
  window.__CORPUS_BOT_LOADED__ = true;

  /* ---------- 1. Resolve Root Path from Any Page Depth ---------- */
  function detectRootPrefix() {
    var scripts = document.querySelectorAll('script[src*="corpus-bot.js"]');
    if (scripts.length) {
      var src = scripts[scripts.length - 1].getAttribute('src') || '';
      var idx = src.indexOf('corpus-bot.js');
      if (idx > 0) return src.slice(0, idx);
    }
    var path = window.location.pathname || '/';
    if (/\/learn\/[^/]+\//.test(path)) return '../../';
    if (/\/learn\/?$/.test(path) || /\/learn\/index\.html$/.test(path)) return '../';
    return './';
  }

  var ROOT_PREFIX = detectRootPrefix();

  /* ---------- 2. Roman Urdu & Medical Synonym Dictionary ---------- */
  var SYNONYMS = {
    'dil': 'heart',
    'qalb': 'heart',
    'cardiac': 'heart',
    'dimaag': 'brain',
    'dimagh': 'brain',
    'bheja': 'brain',
    'phephray': 'lungs',
    'phephra': 'lungs',
    'phephre': 'lungs',
    'lung': 'lungs',
    'pulmonary': 'lungs',
    'gurda': 'kidney',
    'gurday': 'kidney',
    'kidneys': 'kidney',
    'renal': 'kidney',
    'jigar': 'liver',
    'kaleji': 'liver',
    'hepatic': 'liver',
    'maida': 'gut',
    'pait': 'gut',
    'stomach': 'gut',
    'intestine': 'gut',
    'intestines': 'gut',
    'digestive': 'gut',
    'aankh': 'eye',
    'ankh': 'eye',
    'eyes': 'eye',
    'ocular': 'eye',
    'kaan': 'ear',
    'kan': 'ear',
    'ears': 'ear',
    'auditory': 'ear',
    'daant': 'dentition',
    'dant': 'dentition',
    'tooth': 'dentition',
    'teeth': 'dentition',
    'dental': 'dentition',
    'molar': 'dentition',
    'incisor': 'dentition',
    'canine': 'dentition',
    'haddi': 'skeleton',
    'haddiyan': 'skeleton',
    'bones': 'skeleton',
    'bone': 'skeleton',
    'skeletal': 'skeleton',
    'khopri': 'skullface',
    'skull': 'skullface',
    'cranium': 'skullface',
    'patthay': 'muscle',
    'pathay': 'muscle',
    'muscles': 'muscle',
    'muscular': 'muscle',
    'reedh': 'spinalcord',
    'spine': 'spinalcord',
    'spinal': 'spinalcord',
    'masana': 'bladder',
    'urinary bladder': 'bladder',
    'pitta': 'gallbladder',
    'pittay': 'gallbladder',
    'gall bladder': 'gallbladder',
    'lablaba': 'pancreas',
    'tilly': 'spleen',
    'tilli': 'spleen',
    'gala': 'larynx',
    'throat': 'larynx',
    'voice box': 'larynx',
    'jild': 'skin',
    'chamri': 'skin',
    'integument': 'skin',
    'bacha dani': 'gynuterus',
    'rahim': 'gynuterus',
    'womb': 'gynuterus',
    'uterus': 'gynuterus',
    'ovary': 'gynadnexa',
    'ovaries': 'gynadnexa',
    'fallopian': 'gynadnexa',
    'cervix': 'gyncervix',
    'vagina': 'gynvagina',
    'vulva': 'gynvulva',
    'prostate': 'maleprostate',
    'testis': 'maletestis',
    'testicle': 'maletestis',
    'testicles': 'maletestis',
    'sperm': 'spermanatomy',
    'egg cell': 'oocyteanatomy',
    'ovum': 'oocyteanatomy',
    'oocyte': 'oocyteanatomy',
    'placenta': 'placentaanatomy',
    'embryo': 'embryodevelopment',
    'fetus': 'fetaldevelopment',
    'hamal': 'fetaldevelopment',
    'pregnancy': 'fetaldevelopment',
    /* Urdu Script */
    'دل': 'heart', 'قلب': 'heart', 'دماغ': 'brain', 'بھیجا': 'brain', 'پھیپھڑے': 'lungs', 'پھیپھڑا': 'lungs',
    'گردہ': 'kidney', 'گردے': 'kidney', 'جگر': 'liver', 'کلیجی': 'liver', 'معدہ': 'gut', 'پیٹ': 'gut', 'آنت': 'gut',
    'آنکھ': 'eye', 'آنکھیں': 'eye', 'کان': 'ear', 'دانت': 'dentition', 'ہڈی': 'skeleton', 'ہڈیاں': 'skeleton', 'ڈھانچہ': 'skeleton',
    'کھوپڑی': 'skullface', 'پٹھے': 'muscle', 'عضلات': 'muscle', 'ریڑھ': 'spinalcord', 'مثانہ': 'bladder', 'پتہ': 'gallbladder',
    'لبلبہ': 'pancreas', 'تلی': 'spleen', 'گلا': 'larynx', 'حنجرہ': 'larynx', 'جلد': 'skin', 'کھال': 'skin', 'رحم': 'gynuterus', 'بچہ دانی': 'gynuterus',
    /* Arabic */
    'القلب': 'heart', 'الدماغ': 'brain', 'المخ': 'brain', 'الرئة': 'lungs', 'الرئتين': 'lungs', 'رئة': 'lungs',
    'الكلى': 'kidney', 'الكلية': 'kidney', 'كلية': 'kidney', 'الكبد': 'liver', 'كبد': 'liver', 'المعدة': 'gut', 'الأمعاء': 'gut',
    'العين': 'eye', 'عين': 'eye', 'الأذن': 'ear', 'أذن': 'ear', 'الأسنان': 'dentition', 'عظم': 'skeleton', 'العظام': 'skeleton',
    'الجمجمة': 'skullface', 'عضلة': 'muscle', 'العضلات': 'muscle', 'الحبل الشوكي': 'spinalcord', 'المثانة': 'bladder',
    'المرارة': 'gallbladder', 'البنكرياس': 'pancreas', 'الطحال': 'spleen', 'الحنجرة': 'larynx', 'الجلد': 'skin', 'الرحم': 'gynuterus',
    /* Hindi */
    'हृदय': 'heart', 'दिल': 'heart', 'मस्तिष्क': 'brain', 'दिमाग': 'brain', 'फेफड़े': 'lungs', 'फेफड़ा': 'lungs',
    'वृक्क': 'kidney', 'गुर्दा': 'kidney', 'किडनी': 'kidney', 'यकृत': 'liver', 'जिगर': 'liver', 'लीवर': 'liver',
    'आमाशय': 'gut', 'पेट': 'gut', 'आंत': 'gut', 'आँख': 'eye', 'नेत्र': 'eye', 'कान': 'ear', 'दाँत': 'dentition', 'दंत': 'dentition',
    'हड्डी': 'skeleton', 'कंकाल': 'skeleton', 'खोपड़ी': 'skullface', 'मांसपेशी': 'muscle', 'मांसपेशियां': 'muscle',
    'रीढ़': 'spinalcord', 'मेरुरज्जु': 'spinalcord', 'मूत्राशय': 'bladder', 'पित्ताशय': 'gallbladder', 'अग्न्याशय': 'pancreas',
    'प्लीहा': 'spleen', 'तिल्ली': 'spleen', 'स्वरयंत्र': 'larynx', 'त्वचा': 'skin', 'चमड़ी': 'skin', 'गर्भाशय': 'gynuterus',
    /* Spanish */
    'corazón': 'heart', 'corazon': 'heart', 'cerebro': 'brain', 'encéfalo': 'brain', 'pulmón': 'lungs', 'pulmon': 'lungs', 'pulmones': 'lungs',
    'riñón': 'kidney', 'rinon': 'kidney', 'riñones': 'kidney', 'hígado': 'liver', 'higado': 'liver', 'estómago': 'gut', 'estomago': 'gut', 'intestino': 'gut',
    'ojo': 'eye', 'ojos': 'eye', 'oído': 'ear', 'oido': 'ear', 'oreja': 'ear', 'diente': 'dentition', 'dientes': 'dentition',
    'esqueleto': 'skeleton', 'hueso': 'skeleton', 'huesos': 'skeleton', 'cráneo': 'skullface', 'craneo': 'skullface',
    'músculo': 'muscle', 'musculo': 'muscle', 'músculos': 'muscle', 'médula espinal': 'spinalcord', 'vejiga': 'bladder',
    'vesícula biliar': 'gallbladder', 'vesicula': 'gallbladder', 'páncreas': 'pancreas', 'bazo': 'spleen', 'laringe': 'larynx', 'piel': 'skin', 'útero': 'gynuterus',
    /* French */
    'cœur': 'heart', 'coeur': 'heart', 'cerveau': 'brain', 'poumon': 'lungs', 'poumons': 'lungs', 'rein': 'kidney', 'reins': 'kidney',
    'foie': 'liver', 'estomac': 'gut', 'intestin': 'gut', 'œil': 'eye', 'oeil': 'eye', 'yeux': 'eye', 'oreille': 'ear',
    'dent': 'dentition', 'dents': 'dentition', 'squelette': 'skeleton', 'crâne': 'skullface', 'moelle épinière': 'spinalcord',
    'vessie': 'bladder', 'vésicule biliaire': 'gallbladder', 'pancréas': 'pancreas', 'rate': 'spleen', 'peau': 'skin', 'utérus': 'gynuterus',
    /* German */
    'herz': 'heart', 'gehirn': 'brain', 'hirn': 'brain', 'lunge': 'lungs', 'lungen': 'lungs', 'niere': 'kidney', 'nieren': 'kidney',
    'leber': 'liver', 'magen': 'gut', 'darm': 'gut', 'auge': 'eye', 'augen': 'eye', 'ohr': 'ear', 'ohren': 'ear',
    'zahn': 'dentition', 'zähne': 'dentition', 'skelett': 'skeleton', 'knochen': 'skeleton', 'schädel': 'skullface',
    'muskel': 'muscle', 'muskeln': 'muscle', 'rückenmark': 'spinalcord', 'harnblase': 'bladder', 'gallenblase': 'gallbladder',
    'bauchspeicheldrüse': 'pancreas', 'milz': 'spleen', 'kehlkopf': 'larynx', 'haut': 'skin', 'gebärmutter': 'gynuterus',
    /* Portuguese & Italian */
    'coração': 'heart', 'coracao': 'heart', 'cérebro': 'brain', 'pulmão': 'lungs', 'pulmao': 'lungs', 'fígado': 'liver', 'figado': 'liver',
    'rim': 'kidney', 'rins': 'kidney', 'olho': 'eye', 'olhos': 'eye', 'ouvido': 'ear', 'osso': 'skeleton', 'ossos': 'skeleton', 'pele': 'skin',
    'cuore': 'heart', 'cervello': 'brain', 'polmone': 'lungs', 'polmoni': 'lungs', 'fegato': 'liver', 'rene': 'kidney', 'reni': 'kidney',
    'occhio': 'eye', 'orecchio': 'ear', 'scheletro': 'skeleton', 'muscolo': 'muscle', 'vescica': 'bladder', 'cistifellea': 'gallbladder', 'milza': 'spleen',
    /* Turkish & Indonesian */
    'kalp': 'heart', 'beyin': 'brain', 'akciğer': 'lungs', 'karaciğer': 'liver', 'böbrek': 'kidney', 'mide': 'gut', 'bağırsak': 'gut',
    'göz': 'eye', 'kulak': 'ear', 'diş': 'dentition', 'iskelet': 'skeleton', 'kemik': 'skeleton', 'kafatası': 'skullface', 'kas': 'muscle',
    'omurilik': 'spinalcord', 'mesane': 'bladder', 'safra kesesi': 'gallbladder', 'dalak': 'spleen', 'gırtlak': 'larynx', 'deri': 'skin',
    'jantung': 'heart', 'otak': 'brain', 'paru-paru': 'lungs', 'paru': 'lungs', 'hati': 'liver', 'ginjal': 'kidney', 'lambung': 'gut', 'usus': 'gut',
    'mata': 'eye', 'telinga': 'ear', 'gigi': 'dentition', 'tulang': 'skeleton', 'tengkorak': 'skullface', 'otot': 'muscle', 'kulit': 'skin',
    /* Russian */
    'сердце': 'heart', 'мозг': 'brain', 'головной мозг': 'brain', 'легкие': 'lungs', 'лёгкие': 'lungs', 'печень': 'liver',
    'почка': 'kidney', 'почки': 'kidney', 'желудок': 'gut', 'кишечник': 'gut', 'глаз': 'eye', 'глаза': 'eye', 'ухо': 'ear',
    'зуб': 'dentition', 'зубы': 'dentition', 'скелет': 'skeleton', 'кость': 'skeleton', 'кости': 'skeleton', 'череп': 'skullface',
    'мышца': 'muscle', 'мышцы': 'muscle', 'спинной мозг': 'spinalcord', 'мочевой пузырь': 'bladder', 'желчный пузырь': 'gallbladder',
    'поджелудочная железа': 'pancreas', 'селезенка': 'spleen', 'гортань': 'larynx', 'кожа': 'skin', 'матка': 'gynuterus',
    /* Chinese, Japanese, Korean */
    '心脏': 'heart', '心臟': 'heart', '大脑': 'brain', '大腦': 'brain', '脑': 'brain', '肺': 'lungs', '肺部': 'lungs',
    '肝脏': 'liver', '肝臟': 'liver', '肝': 'liver', '肾脏': 'kidney', '腎臟': 'kidney', '肾': 'kidney', '胃': 'gut', '肠': 'gut',
    '眼睛': 'eye', '耳朵': 'ear', '牙齿': 'dentition', '牙齒': 'dentition', '骨骼': 'skeleton', '骨头': 'skeleton', '头骨': 'skullface',
    '肌肉': 'muscle', '脊髓': 'spinalcord', '膀胱': 'bladder', '胆囊': 'gallbladder', '膽囊': 'gallbladder', '胰腺': 'pancreas', '脾脏': 'spleen', '皮肤': 'skin', '皮膚': 'skin', '子宫': 'gynuterus',
    '心臓': 'heart', '脳': 'brain', '肝臓': 'liver', '腎臓': 'kidney', '目': 'eye', '歯': 'dentition', '頭蓋骨': 'skullface', '筋肉': 'muscle', '脊髄': 'spinalcord', '胆嚢': 'gallbladder', '膵臓': 'pancreas', '脾臓': 'spleen',
    '심장': 'heart', '뇌': 'brain', '폐': 'lungs', '허파': 'lungs', '간': 'liver', '신장': 'kidney', '콩팥': 'kidney', '위': 'gut', '눈': 'eye', '귀': 'ear', '치아': 'dentition', '뼈': 'skeleton', '골격': 'skeleton', '두개골': 'skullface', '근육': 'muscle', '척수': 'spinalcord', '방광': 'bladder', '담낭': 'gallbladder', '췌장': 'pancreas', '비장': 'spleen', '피부': 'skin', '자궁': 'gynuterus'
  };

  /* ---------- 3. Curated Medical Reference Fallback (Instant 0ms for Common Extra Organs) ---------- */
  var EXTRA_MEDICAL_REF = {
    'gallbladder': {
      title: 'Gallbladder · Vesica biliaris',
      tag: 'Digestive · Biliary System',
      summary: 'The gallbladder is a small, pear-shaped hollow organ located beneath the right lobe of the liver that stores and concentrates bile produced by hepatocytes.',
      points: [
        ['Function', 'Concentrates bile 5–10 fold and releases it via the cystic and common bile ducts into the duodenum in response to cholecystokinin (CCK) after fatty meals.'],
        ['Anatomy', 'Divided into the fundus, body, and neck (with Hartmann’s pouch), draining through the cystic duct lined by the spiral valves of Heister.'],
        ['Clinical Note', 'Gallstones (cholelithiasis) can block the cystic duct causing acute cholecystitis or biliary colic in the right upper quadrant.']
      ]
    },
    'appendix': {
      title: 'Vermiform Appendix',
      tag: 'Digestive & Lymphoid Organ',
      summary: 'The vermiform appendix is a narrow, finger-like blind tube attached to the posteromedial wall of the cecum, just inferior to the ileocecal valve.',
      points: [
        ['Function', 'Acts as a gut-associated lymphoid tissue (GALT) reservoir rich in B and T lymphocytes and helps repopulate beneficial colonic microbiota.'],
        ['Anatomy', 'Typically 6–10 cm long, suspended by the mesoappendix and supplied by the appendicular artery (a branch of the ileocolic artery).'],
        ['Clinical Note', 'Luminal obstruction by a fecalith or lymphoid hyperplasia causes acute appendicitis, classically shifting pain from the umbilicus to McBurney’s point.']
      ]
    },
    'pineal gland': {
      title: 'Pineal Gland · Epiphysis cerebri',
      tag: 'Endocrine & Neuroanatomy',
      summary: 'The pineal gland is a small, pinecone-shaped midline neuroendocrine organ of the epithalamus located in the posterior cranial fossa between the superior colliculi.',
      points: [
        ['Function', 'Pinealocytes synthesize and secrete melatonin from serotonin in darkness to regulate circadian rhythms and sleep–wake cycles.'],
        ['Anatomy', 'Lacks a blood–brain barrier and receives sympathetic input from the superior cervical ganglion driven by the suprachiasmatic nucleus (SCN).'],
        ['Clinical Note', 'Calcification ("brain sand" or corpora arenacea) is a common radiological landmark on adult head CT scans.']
      ]
    },
    'pituitary gland': {
      title: 'Pituitary Gland · Hypophysis',
      tag: 'Endocrine Master Gland',
      summary: 'The pituitary gland is a pea-sized endocrine gland housed in the sella turcica of the sphenoid bone and connected to the hypothalamus by the infundibular stalk.',
      points: [
        ['Anterior Lobe (Adenohypophysis)', 'Secretes GH, TSH, ACTH, FSH, LH, and Prolactin under hypothalamic portal regulation.'],
        ['Posterior Lobe (Neurohypophysis)', 'Stores and releases oxytocin and antidiuretic hormone (ADH / vasopressin) synthesized in the hypothalamus.'],
        ['Clinical Note', 'Pituitary adenomas can compress the optic chiasm superiorly, producing bitemporal hemianopia.']
      ]
    },
    'thymus': {
      title: 'Thymus Gland',
      tag: 'Lymphatic & Immune System',
      summary: 'The thymus is a bilobed primary lymphoid organ situated in the superior and anterior mediastinum, posterior to the manubrium and anterior to the great vessels.',
      points: [
        ['Function', 'Site of T-lymphocyte maturation, positive selection in the cortex, and negative selection (central tolerance) in the medulla.'],
        ['Development', 'Largest and most active during childhood; undergoes gradual physiological involution and fatty replacement after puberty.'],
        ['Clinical Note', 'Thymoma is strongly associated with myasthenia gravis, whereas congenital thymic aplasia occurs in DiGeorge syndrome.']
      ]
    },
    'parathyroid': {
      title: 'Parathyroid Glands',
      tag: 'Endocrine System',
      summary: 'Four small oval endocrine glands (two superior, two inferior) embedded on the posterior surface of the lateral lobes of the thyroid gland.',
      points: [
        ['Function', 'Chief cells secrete parathyroid hormone (PTH), the primary regulator of serum calcium and phosphate homeostasis.'],
        ['Mechanism', 'PTH increases blood calcium by stimulating bone resorption, renal distal tubular calcium reabsorption, and vitamin D activation.'],
        ['Clinical Note', 'Inadvertent removal during thyroidectomy causes hypocalcemia with neuromuscular tetany (Chvostek and Trousseau signs).']
      ]
    },
    'epiglottis': {
      title: 'Epiglottis',
      tag: 'Respiratory · Laryngeal Cartilage',
      summary: 'The epiglottis is a leaf-shaped flap of elastic cartilage located behind the root of the tongue at the entrance of the larynx.',
      points: [
        ['Function', 'Folds inferiorly over the laryngeal inlet during swallowing (deglutition) to prevent food and liquid from entering the trachea.'],
        ['Anatomy', 'Composed of elastic cartilage covered by mucous membrane; attached inferiorly to the thyroid cartilage via the thyroepiglottic ligament.'],
        ['Clinical Note', 'Acute epiglottitis is a life-threatening supraglottic inflammation that can cause rapid airway obstruction and stridor.']
      ]
    },
    'trachea': {
      title: 'Trachea · Windpipe',
      tag: 'Respiratory System',
      summary: 'The trachea is a cartilaginous and membranous airway tube (~10–12 cm long) extending from the cricoid cartilage (C6) to the carina (T4–T5), where it bifurcates into the right and left main bronchi.',
      points: [
        ['Function', 'Conducts, warms, humidifies, and filters inspired air via its mucociliary escalator toward the lungs.'],
        ['Anatomy', 'Supported by 16–20 C-shaped hyaline cartilage rings anteriorly and bridged posteriorly by the trachealis smooth muscle.']
      ]
    },
    'esophagus': {
      title: 'Esophagus · Gullet',
      tag: 'Digestive System',
      summary: 'The esophagus is a 25 cm fibromuscular tube that transports food and liquids from the laryngopharynx (C6) through the posterior mediastinum and esophageal hiatus (T10) to the stomach.',
      points: [
        ['Function', 'Propels swallowed boluses via coordinated primary and secondary peristaltic waves while upper and lower esophageal sphincters prevent reflux.'],
        ['Anatomy', 'Lined by non-keratinized stratified squamous epithelium; muscularis transitions from skeletal muscle (upper third) to smooth muscle (lower third).']
      ]
    },
    'duodenum': {
      title: 'Duodenum',
      tag: 'Digestive · Small Intestine',
      summary: 'The duodenum is the C-shaped first and shortest segment (~25 cm) of the small intestine, curving around the head of the pancreas.',
      points: [
        ['Function', 'Receives acidic chyme from the stomach along with bile and pancreatic enzymes via the major duodenal papilla (ampulla of Vater) to initiate chemical digestion.'],
        ['Anatomy', 'Divided into four parts (superior, descending, horizontal, ascending); submucosal Brunner’s glands secrete alkaline mucus to neutralize gastric acid.']
      ]
    },
    'vagus nerve': {
      title: 'Vagus Nerve · Cranial Nerve X (CN X)',
      tag: 'Nervous System · Cranial Nerves',
      summary: 'The vagus nerve (CN X) is the longest and most widely distributed cranial nerve, carrying parasympathetic, visceral afferent, and pharyngeal motor fibers from the medulla to the thorax and abdomen.',
      points: [
        ['Function', 'Provides primary parasympathetic innervation to the heart (slows heart rate), lungs (bronchoconstriction), and digestive tract up to the splenic flexure.'],
        ['Anatomy', 'Exits the skull via the jugular foramen, descends within the carotid sheath, and gives off the superior and recurrent laryngeal nerves.']
      ]
    },
    'sciatic nerve': {
      title: 'Sciatic Nerve · Nervus ischiadicus',
      tag: 'Peripheral Nervous System',
      summary: 'The sciatic nerve (L4–S3) is the largest and thickest nerve in the human body, arising from the sacral plexus and exiting the pelvis through the greater sciatic foramen below the piriformis.',
      points: [
        ['Function', 'Supplies motor innervation to the posterior thigh (hamstrings) and, via its tibial and common fibular divisions, all muscles of the leg and foot.'],
        ['Clinical Note', 'Compression or lumbar disc herniation causes sciatica — shooting radicular pain along the posterior thigh and leg.']
      ]
    },
    'circle of willis': {
      title: 'Circle of Willis · Cerebral Arterial Circle',
      tag: 'Neurovascular Anatomy',
      summary: 'The Circle of Willis is an anastomotic heptagonal ring of arteries at the base of the brain surrounding the optic chiasm and pituitary stalk.',
      points: [
        ['Function', 'Connects the anterior (internal carotid) and posterior (vertebrobasilar) cerebral circulations, providing collateral blood flow if one vessel narrows.'],
        ['Components', 'Formed by the anterior cerebral, anterior communicating, internal carotid, posterior cerebral, and posterior communicating arteries.']
      ]
    },
    'femur': {
      title: 'Femur · Thigh Bone',
      tag: 'Skeletal System · Lower Limb',
      summary: 'The femur is the longest, heaviest, and strongest bone in the human body, transmitting weight from the hip bone (acetabulum) to the tibia at the knee joint.',
      points: [
        ['Anatomy', 'Consists of a proximal head, neck, greater and lesser trochanters, a cylindrical shaft with the linea aspera posteriorly, and medial/lateral distal condyles.'],
        ['Clinical Note', 'Femoral neck fractures in older adults risk avascular necrosis of the femoral head by disrupting the medial circumflex femoral artery.'],
        ['chapterKey', 'skeleton']
      ]
    },
    'islets of langerhans': {
      title: 'Islets of Langerhans · Pancreatic Islets',
      tag: 'Endocrine Pancreas',
      summary: 'The islets of Langerhans are vascularized clusters of endocrine cells scattered throughout the exocrine pancreas that regulate blood glucose homeostasis.',
      points: [
        ['Cell Types', 'Beta cells secrete insulin (lowers blood glucose), alpha cells secrete glucagon (raises blood glucose), delta cells secrete somatostatin, and PP cells secrete pancreatic polypeptide.'],
        ['Clinical Note', 'Autoimmune destruction of beta cells causes Type 1 diabetes mellitus, whereas insulin resistance and progressive beta-cell dysfunction characterize Type 2 diabetes.'],
        ['chapterKey', 'pancreas']
      ]
    },
    'broca area': {
      title: 'Broca’s Area · Brodmann Areas 44 & 45',
      tag: 'Neuroanatomy · Speech Production',
      summary: 'Broca’s area is a motor speech region located in the inferior frontal gyrus (pars opercularis and pars triangularis) of the dominant cerebral hemisphere (usually the left).',
      points: [
        ['Function', 'Coordinates the motor planning and articulatory programming required for fluent spoken and written language production, linked to Wernicke’s area via the arcuate fasciculus.'],
        ['Clinical Note', 'Lesions (typically from left middle cerebral artery superior division stroke) cause Broca’s (expressive/non-fluent) aphasia with intact comprehension.'],
        ['chapterKey', 'brain']
      ]
    },
    'wernicke area': {
      title: 'Wernicke’s Area · Brodmann Area 22',
      tag: 'Neuroanatomy · Language Comprehension',
      summary: 'Wernicke’s area is a sensory language region situated in the posterior section of the superior temporal gyrus in the dominant cerebral hemisphere.',
      points: [
        ['Function', 'Responsible for the comprehension of spoken and written language and semantic processing.'],
        ['Clinical Note', 'Damage causes Wernicke’s (receptive/fluent) aphasia, characterized by fluent but nonsensical speech ("word salad") and impaired comprehension.'],
        ['chapterKey', 'brain']
      ]
    },
    'peyer patches': {
      title: 'Peyer’s Patches · Aggregated Lymphoid Nodules',
      tag: 'Mucosal Immunity · Ileum',
      summary: 'Peyer’s patches are organized lymphoid follicles located in the lamina propria and submucosa of the distal small intestine, predominantly the ileum.',
      points: [
        ['Function', 'Specialized M (microfold) cells sample luminal antigens and present them to B and T lymphocytes to generate IgA-mediated mucosal immunity.'],
        ['chapterKey', 'intestinalwall']
      ]
    },
    'bundle of his': {
      title: 'Bundle of His · Atrioventricular (AV) Bundle',
      tag: 'Cardiac Conduction System',
      summary: 'The Bundle of His is a specialized tract of cardiac muscle fibers that transmits electrical impulses from the AV node through the fibrous cardiac skeleton into the interventricular septum.',
      points: [
        ['Function', 'Forms the only normal electrical bridge between the atria and ventricles, dividing into the right and left bundle branches to activate Purkinje fibers.'],
        ['chapterKey', 'heart']
      ]
    },
    'pudendal nerve': {
      title: 'Pudendal Nerve (S2–S4)',
      tag: 'Pelvic & Perineal Innervation',
      summary: 'The pudendal nerve arises from the sacral plexus (ventral rami of S2, S3, S4), exits the pelvis via the greater sciatic foramen, hooks around the ischial spine, and enters the perineum through the lesser sciatic foramen (Alcock’s canal).',
      points: [
        ['Function', 'Provides somatic motor and sensory innervation to the external genitalia, perineum, external anal sphincter, and external urethral sphincter.'],
        ['Branches', 'Inferior rectal nerve, perineal nerve, and dorsal nerve of the penis or clitoris.']
      ]
    },
    'phrenic nerve': {
      title: 'Phrenic Nerve (C3–C5)',
      tag: 'Respiratory Motor Nerve',
      summary: 'The phrenic nerve originates from the cervical plexus (primarily C4, with contributions from C3 and C5) and descends anteriorly over the anterior scalene muscle through the thorax.',
      points: [
        ['Function', 'Provides the sole motor innervation to the thoracic diaphragm ("C3, 4, 5 keep the diaphragm alive") and sensory fibers to the central tendon, pericardium, and mediastinal pleura.']
      ]
    },
    'astrocyte': {
      title: 'Astrocyte · Astroglia',
      tag: 'Central Nervous System Glia',
      summary: 'Astrocytes are the most abundant star-shaped glial cells of the central nervous system, supporting neurons structurally and metabolically.',
      points: [
        ['Function', 'Perivascular end-feet maintain the blood–brain barrier, regulate extracellular potassium and neurotransmitter (glutamate) uptake, and form glial scars after CNS injury.'],
        ['chapterKey', 'brain']
      ]
    }
  };

  /* ---------- 4. State & Knowledge Base Management ---------- */
  var KB = null;
  var KB_PROMISE = null;
  var IS_OPEN = false;
  var WAVE_TIMER = null;
  var HIDE_BUBBLE_TIMER = null;
  var LAST_TOPIC = null;
  var LAST_LANG = 'en';
  var TRANS_CACHE = {};

  /* ---------- 4a. Worldwide Language Detector (30+ Languages + Roman Urdu) ---------- */
  function detectUserLanguage(raw) {
    var s = String(raw || '').trim();
    if (!s) return LAST_LANG || 'en';
    var q = s.toLowerCase().replace(/[?!.,;:'"()[\]{}\/\\]+/g, ' ').replace(/\s+/g, ' ').trim();

    /* 1. Non-Latin Scripts (100% deterministic in 0ms) */
    if (/[\u0600-\u06FF]/.test(s)) {
      if (/[ٹڈڑںےہھ]|(\b(ہے|ہیں|کیا|کیسے|کیسی|آپ|میں|دل|دماغ|گردہ|ہڈی|شکریہ)\b)/.test(s)) return (LAST_LANG = 'ur');
      if (/[پچژگ]|(\b(است|کیست|چطور|شما|قلب|مغز|کلیه|تشکر|ممنون)\b)/.test(s)) return (LAST_LANG = 'fa');
      return (LAST_LANG = 'ar');
    }
    if (/[\u0900-\u097F]/.test(s)) return (LAST_LANG = 'hi');
    if (/[\u0980-\u09FF]/.test(s)) return (LAST_LANG = 'bn');
    if (/[\u0A00-\u0A7F]/.test(s)) return (LAST_LANG = 'pa');
    if (/[\u0B80-\u0BFF]/.test(s)) return (LAST_LANG = 'ta');
    if (/[\u0C00-\u0C7F]/.test(s)) return (LAST_LANG = 'te');
    if (/[\u0D00-\u0D7F]/.test(s)) return (LAST_LANG = 'ml');
    if (/[\u0A80-\u0AFF]/.test(s)) return (LAST_LANG = 'gu');
    if (/[\u0C80-\u0CFF]/.test(s)) return (LAST_LANG = 'kn');
    if (/[\u0400-\u04FF]/.test(s)) {
      if (/[іїєґІЇЄҐ]/.test(s)) return (LAST_LANG = 'uk');
      return (LAST_LANG = 'ru');
    }
    if (/[\u3040-\u30FF]/.test(s)) return (LAST_LANG = 'ja');
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(s)) return (LAST_LANG = 'ko');
    if (/[\u4E00-\u9FFF]/.test(s)) return (LAST_LANG = 'zh-CN');
    if (/[\u0E00-\u0E7F]/.test(s)) return (LAST_LANG = 'th');
    if (/[\u0370-\u03FF]/.test(s)) return (LAST_LANG = 'el');
    if (/[\u0590-\u05FF]/.test(s)) return (LAST_LANG = 'he');

    /* 2. Roman Urdu / Hinglish (Latin script South Asian phrasing) */
    if (/\b(kasi|kaisi|kase|kaise|kesi|kese|kesy|hal|haal|thek|theek|hoon|hu|hai|hain|hota|hoti|kya|kia|kr|kar|rhi|rahi|tum|aap|ap|kon|kaun|naam|shukriya|acha|achaa|salam|assalam|aoa|allah|khuda|hafiz|batao|btaye|btao|sunao|madad|urdu|bolti|aati|sahi|bilkul|mein|apna|khayal|kaam|kam|karta|karti|kahan|kaha|dil|dimagh|dimaag|jigar|kaleji|gurda|gurday|phephray|phephra|haddi|haddiyan|khopri|patthay|pathay|reedh|masana|pitta|lablaba|tilli|jild|chamri|maida|pait|aankh|ankh|kaan|daant|iske|iska|iski|bare|baray|mujhe|mujy)\b/.test(q)) {
      return (LAST_LANG = 'ur-Latn');
    }

    /* 3. Major Latin-Script World Languages */
    if (/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]|\b(là gì|như thế nào|xin chào|cảm ơn|trái tim|phổi|thận)\b/i.test(s)) return (LAST_LANG = 'vi');
    if (/[ğıİş]|\b(nedir|nasıl|nerede|merhaba|nasılsın|teşekkürler|teşekkür|kalp|beyin|akciğer|karaciğer|böbrek|kemik)\b/i.test(s)) return (LAST_LANG = 'tr');
    if (/[ąćęłńśźż]|\b(co to jest|jak się masz|cześć|dziękuję|serce|mózg|wątroba|nerka|płuca)\b/i.test(s)) return (LAST_LANG = 'pl');
    if (/[¿¡ñ]|\b(qué|cómo|dónde|cuál|corazón|cerebro|hígado|riñón|pulmón|estómago|hueso|músculo|hola|gracias|buenos días|buenas tardes|cómo estás|funciona|anatomía)\b/i.test(s)) return (LAST_LANG = 'es');
    if (/[ãõ]|\b(o que é|coração|cérebro|fígado|pulmão|olá|obrigado|obrigada|tudo bem|como vai)\b/i.test(s)) return (LAST_LANG = 'pt');
    if (/[œæ]|\b(qu'est|cœur|coeur|cerveau|foie|poumon|estomac|œil|oreille|squelette|bonjour|salut|merci|comment ça va|fonctionne)\b/i.test(s)) return (LAST_LANG = 'fr');
    if (/[ß]|\b(was ist|wie geht|herz|gehirn|leber|niere|lunge|magen|knochen|körper|guten tag|danke|funktioniert)\b/i.test(s)) return (LAST_LANG = 'de');
    if (/\b(cos'è|cosa è|cuore|cervello|fegato|polmone|stomaco|occhio|orecchio|scheletro|ciao|buongiorno|grazie|come stai|funziona)\b/i.test(s)) return (LAST_LANG = 'it');
    if (/\b(apa itu|bagaimana|dimana|di mana|jantung|otak|paru-paru|ginjal|lambung|tulang|otot|apa kabar|terima kasih|fungsi)\b/i.test(s)) return (LAST_LANG = 'id');
    if (/\b(wat is|hoe gaat het|hersenen|nier|longen|lichaam|dank je|bedankt)\b/i.test(s)) return (LAST_LANG = 'nl');
    if (/\b(nini|vipi|wapi|moyo|ubongo|mapafu|mfupa|habari|hujambo|asante)\b/i.test(s)) return (LAST_LANG = 'sw');
    if (/\b(ano ang|paano|saan|puso|utak|atay|baga|kamusta|kumusta|salamat)\b/i.test(s)) return (LAST_LANG = 'tl');

    /* 4. Default to English for standard English queries */
    if (/\b(what|how|where|why|who|when|which|tell|explain|heart|brain|liver|kidney|lung|bone|muscle|nerve|hi|hello|hey|thanks|thank|good|fine|ok|okay|bye)\b/.test(q)) {
      return (LAST_LANG = 'en');
    }
    return LAST_LANG || 'en';
  }

  /* ---------- 4b. Multilingual Conversational Small-Talk Engine ---------- */
  var CONV_TEMPLATES = {
    hello: {
      'en': 'Hello! 👋', 'ur-Latn': 'Hello! 👋', 'ur': 'السلام علیکم! 👋', 'ar': 'مرحباً! 👋',
      'hi': 'नमस्ते! 👋', 'es': '¡Hola! 👋', 'fr': 'Bonjour ! 👋', 'de': 'Hallo! 👋',
      'pt': 'Olá! 👋', 'it': 'Ciao! 👋', 'tr': 'Merhaba! 👋', 'id': 'Halo! 👋',
      'ru': 'Привет! 👋', 'zh-CN': '你好！👋', 'ja': 'こんにちは！👋', 'ko': '안녕하세요! 👋',
      'fa': 'سلام! 👋', 'bn': 'হ্যালো! 👋', 'nl': 'Hallo! 👋', 'pl': 'Cześć! 👋', 'vi': 'Xin chào! 👋'
    },
    howAreYou: {
      'en': 'I am doing great, thank you! 😊 How are you doing?',
      'ur-Latn': 'Main bilkul theek hoon, shukriya! 😊 Aap kaise hain?',
      'ur': 'میں بالکل ٹھیک ہوں، شکریہ! 😊 آپ کیسے ہیں؟',
      'ar': 'أنا بخير والحمد لله، شكراً لك! 😊 كيف حالك أنت؟',
      'hi': 'मैं बिल्कुल ठीक हूँ, धन्यवाद! 😊 आप कैसे हैं?',
      'es': '¡Estoy muy bien, gracias! 😊 ¿Y tú, cómo estás?',
      'fr': 'Je vais très bien, merci ! 😊 Et vous, comment allez-vous ?',
      'de': 'Mir geht es super, danke! 😊 Wie geht es dir?',
      'pt': 'Estou muito bem, obrigada! 😊 E você, como está?',
      'it': 'Sto benissimo, grazie! 😊 Tu come stai?',
      'tr': 'Çok iyiyim, teşekkür ederim! 😊 Sen nasılsın?',
      'id': 'Saya sangat baik, terima kasih! 😊 Bagaimana kabar Anda?',
      'ru': 'У меня всё отлично, спасибо! 😊 Как ваши дела?',
      'zh-CN': '我很好，谢谢！😊 你好吗？',
      'ja': 'とても元気です、ありがとうございます！😊 あなたはいかがですか？',
      'ko': '저는 아주 잘 지내고 있어요, 감사합니다! 😊 어떻게 지내세요?',
      'fa': 'من خیلی خوبم، ممنون! 😊 حال شما چطور است؟',
      'bn': 'আমি খুব ভালো আছি, ধন্যবাদ! 😊 আপনি কেমন আছেন?'
    },
    imFine: {
      'en': 'Glad to hear that! 😊 Which organ or anatomy topic would you like to explore today?',
      'ur-Latn': 'MashaAllah, bohat acha! 😊 Aaj kis organ ya human body topic ke baare mein baat karein?',
      'ur': 'ماشاءاللہ، بہت اچھا! 😊 آج آپ انسانی جسم کے کس عضو کے بارے میں جاننا چاہیں گے؟',
      'ar': 'سعيدة بسماع ذلك! 😊 ما هو العضو أو موضوع التشريح الذي تود استكشافه اليوم؟',
      'hi': 'यह सुनकर बहुत अच्छा लगा! 😊 आज आप किस अंग या शारीरिक विषय के बारे में जानना चाहेंगे?',
      'es': '¡Me alegra mucho! 😊 ¿Qué órgano o tema de anatomía te gustaría explorar hoy?',
      'fr': 'Ravie de l’entendre ! 😊 Quel organe ou sujet d’anatomie souhaitez-vous explorer aujourd’hui ?',
      'de': 'Das freut mich! 😊 Welches Organ oder Anatomie-Thema möchtest du heute erkunden?',
      'pt': 'Fico feliz em saber! 😊 Qual órgão ou tema de anatomia você gostaria de explorar hoje?',
      'it': 'Mi fa molto piacere! 😊 Quale organo o argomento di anatomia vorresti esplorare oggi?',
      'tr': 'Buna çok sevindim! 😊 Bugün hangi organ veya anatomi konusunu incelemek istersin?',
      'id': 'Senang mendengarnya! 😊 Organ atau topik anatomi apa yang ingin Anda pelajari hari ini?',
      'ru': 'Рада это слышать! 😊 Какой орган или тему анатомии вы хотели бы изучить сегодня?',
      'zh-CN': '很高兴听到这个消息！😊 今天您想了解哪个器官或解剖学主题？',
      'ja': 'それは良かったです！😊 今日はどの臓器や解剖学のトピックについて調べますか？',
      'ko': '다행이네요! 😊 오늘 어떤 장기나 해부학 주제를 알아보고 싶으신가요?'
    },
    whatDoing: {
      'en': 'I am right here ready to help you explore human anatomy in any language! 😊',
      'ur-Latn': 'Main yahan aapki human anatomy aur body organs ke sawalon mein madad karne ke liye hazir hoon! 😊',
      'ur': 'میں یہاں انسانی اناٹومی اور جسمانی اعضاء کے بارے میں آپ کے سوالات کا جواب دینے کے لیے حاضر ہوں! 😊',
      'ar': 'أنا هنا لمساعدتك في استكشاف تشريح جسم الإنسان والإجابة عن أسئلتك! 😊',
      'hi': 'मैं यहाँ मानव शरीर रचना और अंगों से जुड़े आपके सवालों में मदद करने के लिए तैयार हूँ! 😊',
      'es': '¡Estoy aquí lista para ayudarte a explorar la anatomía humana! 😊',
      'fr': 'Je suis là pour vous aider à explorer l’anatomie humaine ! 😊',
      'de': 'Ich bin hier, um dir bei Fragen zur menschlichen Anatomie zu helfen! 😊',
      'tr': 'İnsan anatomisi ve organlar hakkındaki sorularına yardımcı olmak için buradayım! 😊',
      'ru': 'Я здесь и готова помочь вам в изучении анатомии человека! 😊',
      'zh-CN': '我在这里随时准备帮助您探索人体解剖学！😊'
    },
    whoAreYou: {
      'en': 'I am Corpus AI Assistant — your multilingual interactive guide to the human body across 74 chapters, 206 bones, and 312 muscles! 😊',
      'ur-Latn': 'Main Corpus AI Assistant hoon — is Interactive Human Anatomy Atlas ki virtual AI guide! 😊 Aap mujh se kisi bhi language mein kisi bhi organ, bone, ya muscle ke baare mein pooch sakte hain.',
      'ur': 'میں Corpus AI Assistant ہوں — انسانی اناٹومی اٹلس کی ورچوئل گائیڈ! 😊 آپ مجھ سے کسی بھی زبان میں کسی بھی عضو، ہڈی یا پٹھے کے بارے میں پوچھ سکتے ہیں۔',
      'ar': 'أنا مساعد Corpus الذكي — دليلك التفاعلي لتشريح جسم الإنسان عبر 74 فصلاً و206 عظمة و312 عضلة! 😊',
      'hi': 'मैं Corpus AI Assistant हूँ — मानव शरीर रचना एटलस की आपकी इंटरैक्टिव गाइड! 😊 आप मुझसे किसी भी अंग, हड्डी या मांसपेशी के बारे में पूछ सकते हैं।',
      'es': '¡Soy Corpus AI Assistant — tu guía interactiva de anatomía humana con 74 capítulos, 206 huesos y 312 músculos! 😊',
      'fr': 'Je suis Corpus AI Assistant — votre guide interactif d’anatomie humaine couvrant 74 chapitres, 206 os et 312 muscles ! 😊',
      'de': 'Ich bin der Corpus AI Assistant — dein interaktiver Begleiter durch die menschliche Anatomie mit 74 Kapiteln, 206 Knochen und 312 Muskeln! 😊',
      'pt': 'Sou a Corpus AI Assistant — seu guia interativo de anatomia humana com 74 capítulos, 206 ossos e 312 músculos! 😊',
      'tr': 'Ben Corpus AI Asistanıyım — 74 bölüm, 206 kemik ve 312 kas içeren interaktif insan anatomisi rehberiniz! 😊',
      'id': 'Saya Corpus AI Assistant — panduan interaktif anatomi manusia yang mencakup 74 bab, 206 tulang, dan 312 otot! 😊',
      'ru': 'Я ИИ-ассистент Corpus — ваш интерактивный гид по анатомии человека (74 главы, 206 костей и 312 мышц)! 😊',
      'zh-CN': '我是 Corpus AI 助手——您的人体解剖学互动指南，涵盖 74 个章节、206 块骨骼和 312 块肌肉！😊',
      'ja': '私は Corpus AI アシスタントです。74の章、206個の骨、312個の筋肉を網羅する人体解剖学ガイドです！😊',
      'ko': '저는 Corpus AI 어시스턴트입니다 — 74개 챕터, 206개 뼈, 312개 근육을 다루는 인체 해부학 가이드입니다! 😊'
    },
    thanks: {
      'en': 'You’re very welcome! 😊 Happy to help anytime.',
      'ur-Latn': 'Bohat shukriya! 😊 Khushi hui ke main aapke kaam aa saki.',
      'ur': 'بہت شکریہ! 😊 خوشی ہوئی کہ میں آپ کے کام آ سکی۔',
      'ar': 'على الرحب والسعة! 😊 يسعدني مساعدتك دائماً.',
      'hi': 'आपका बहुत-बहुत स्वागत है! 😊 आपकी मदद करके खुशी हुई।',
      'es': '¡De nada! 😊 Encantada de ayudarte siempre.',
      'fr': 'Je vous en prie ! 😊 Ravie de pouvoir vous aider.',
      'de': 'Sehr gerne! 😊 Ich helfe jederzeit gern.',
      'pt': 'De nada! 😊 Sempre feliz em ajudar.',
      'it': 'Prego! 😊 Felice di aiutarti in qualsiasi momento.',
      'tr': 'Rica ederim! 😊 Her zaman yardımcı olmaktan mutluluk duyarım.',
      'id': 'Sama-sama! 😊 Senang bisa membantu Anda kapan saja.',
      'ru': 'Пожалуйста! 😊 Всегда рада помочь.',
      'zh-CN': '不客气！😊 随时乐意为您提供帮助。',
      'ja': 'どういたしまして！😊 いつでも喜んでお手伝いします。',
      'ko': '천만에요! 😊 언제든 기꺼이 도와드리겠습니다.'
    },
    ack: {
      'en': 'Got it! 😊 Let me know whenever you have a question.',
      'ur-Latn': 'Ji bilkul! 😊 Koi bhi sawal ho to zaroor poochein.',
      'ur': 'جی بالکل! 😊 کوئی بھی سوال ہو تو ضرور پوچھیں۔',
      'ar': 'حسناً! 😊 أخبرني متى ما كان لديك أي سؤال.',
      'hi': 'जी बिल्कुल! 😊 कोई भी सवाल हो तो ज़रूर पूछें।',
      'es': '¡Perfecto! 😊 Dime cuando tengas alguna pregunta.',
      'fr': 'D’accord ! 😊 N’hésitez pas si vous avez une question.',
      'de': 'Alles klar! 😊 Sag Bescheid, wenn du eine Frage hast.',
      'tr': 'Tamamdır! 😊 Bir sorun olduğunda bana sorabilirsin.',
      'ru': 'Хорошо! 😊 Обращайтесь, если появится вопрос.',
      'zh-CN': '好的！😊 有任何问题请随时告诉我。'
    },
    bye: {
      'en': 'Goodbye! Take care! 👋',
      'ur-Latn': 'Allah Hafiz! Apna khayal rakhein. 👋',
      'ur': 'اللہ حافظ! اپنا خیال رکھیں۔ 👋',
      'ar': 'مع السلامة! اعتنِ بنفسك. 👋',
      'hi': 'अलविदा! अपना ख्याल रखें। 👋',
      'es': '¡Adiós! ¡Cuídate mucho! 👋',
      'fr': 'Au revoir ! Prenez soin de vous ! 👋',
      'de': 'Auf Wiedersehen! Mach’s gut! 👋',
      'pt': 'Até logo! Cuide-se! 👋',
      'it': 'Arrivederci! Stammi bene! 👋',
      'tr': 'Güle güle! Kendine iyi bak! 👋',
      'id': 'Sampai jumpa! Jaga diri Anda! 👋',
      'ru': 'До свидания! Берегите себя! 👋',
      'zh-CN': '再见！保重！👋',
      'ja': 'さようなら！お元気で！👋',
      'ko': '안녕히 가세요! 건강하세요! 👋'
    }
  };

  function pickTemplate(category, lang) {
    var map = CONV_TEMPLATES[category] || {};
    return '<strong>' + (map[lang] || map['en']) + '</strong>';
  }

  function getConversationalReply(raw, lang) {
    var s = String(raw || '').trim();
    var q = s.toLowerCase().replace(/[?!.,;:'"()[\]{}\/\\¿¡؟،۔]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!q) return null;
    lang = lang || detectUserLanguage(raw);

    /* 1. Islamic & Worldwide Greetings */
    if (/^(salam|assalam|assalam o alaikum|assalamu alaikum|aslam o alikum|asalam o alaikum|aoa|slam|wa alaikum assalam|السلام عليكم|سلام)(\s+.*)?$/.test(q)) {
      if (lang === 'ur' || lang === 'ar' || lang === 'fa') return '<strong>وعلیکم السلام! 👋</strong>';
      return '<strong>Wa Alaikum Assalam! 👋</strong>';
    }
    if (/^(subha bakhair|good morning|morning|buenos días|buenos dias|bonjour|guten morgen|صباح الخير|صبح بخیر|सुप्रभात|おはようございます|早上好)$/.test(q)) {
      return pickTemplate('hello', lang);
    }
    if (/^(good afternoon|afternoon|buenas tardes|guten tag)$/.test(q)) {
      return pickTemplate('hello', lang);
    }
    if (/^(sham bakhair|good evening|evening|buenas noches|bonsoir|guten abend|مساء الخير|شام بخیر)$/.test(q)) {
      return pickTemplate('hello', lang);
    }
    if (/^(hi+|hello+|hey+|helo+|hola+|hy|hlo|salut|hallo|olá|ola|oi|ciao|merhaba|selam|halo|привет|здравствуйте|你好|您好|こんにちは|안녕하세요|नमस्ते|ہیلو|مرحبا|أهلا|cześć|xin chào|habari|kamusta|kumusta)$/.test(q)) {
      if (lang === 'en' || lang === 'ur-Latn') return '<strong>Hello! 👋</strong>';
      return pickTemplate('hello', lang);
    }

    /* 2. How are you (All Languages) */
    if (/\b(kasi ho|kaisi ho|kase ho|kaise ho|kesi ho|kese ho|kesy ho|kaisi hain|kase hain|kya hal|kya haal|kia hal|kia haal|hal chal|haal chaal|or sunao|aur sunao|sunao kasi ho|ap kasi ho|aap kaisi ho|tum kasi ho|how are you|how r u|how are u|how is it going|hows it going|how are you doing|whats up|what is up|how do you do|are you ok|are you okay|cómo estás|como estas|qué tal|que tal|comment ça va|comment ca va|comment allez vous|wie geht es|wie gehts|como vai|tudo bem|come stai|nasılsın|nasilsin|apa kabar|как дела|как ты|كيف حالك|كيف الحال|آپ کیسے ہیں|آپ کیسی ہیں|کیا حال ہے|چطوری|حال شما|कैसे हो|कैसी हो|क्या हाल है|jak się masz|bạn khỏe không)\b/.test(q) ||
        /^(kasi|kaisi|kase|kaise|kesi|kese|kesy|sup|你好吗|お元気ですか|잘 지내|어떻게 지내)$/.test(q)) {
      return pickTemplate('howAreYou', lang);
    }

    /* 3. User says they are fine / good */
    if (/^(main\s+)?(bhi\s+)?(bilkul\s+)?(thek|theek|fit|sahi|mast|badhiya|fine|good|great|well|all good|doing well|doing good|i am fine|im fine|i am good|im good|alhamdulillah|allah ka shukar|shukar|estoy bien|muy bien|ça va bien|mir geht es gut|iyiyim|хорошо|отлично|بخير|الحمد لله|میں ٹھیک ہوں|मैं ठीक हूँ|我很好)(\s+(hu|hoon|h|hai|thanks|thank you|shukriya|bhi|gracias|merci|danke))?$/.test(q)) {
      return pickTemplate('imFine', lang);
    }

    /* 4. What are you doing */
    if (/\b(kya kr rhi|kya kar rahi|kia kr rhi|kia kar rahi|kya kr rahi|kya ho rha|kya chal rha|kya chal raha|what are you doing|what r u doing|whatcha doing|qué haces|que haces|que fais tu|was machst du|ne yapıyorsun|что делаешь|ماذا تفعل|کیا کر رہی ہو|क्या कर रही हो)\b/.test(q)) {
      return pickTemplate('whatDoing', lang);
    }

    /* 5. Who are you / Name / Identity */
    if (/\b(tum kon ho|aap kaun ho|ap kon ho|kaun ho|kon ho tum|tumhara naam|apka naam|aap ka naam|naam kya hai|who are you|what is your name|whats your name|your name|introduce yourself|are you a bot|are you ai|quién eres|quien eres|cómo te llamas|qui es tu|comment tu t appelles|wer bist du|wie heißt du|sen kimsin|adın ne|siapa kamu|кто ты|من أنت|ما اسمك|آپ کون ہیں|تم کون ہو|آپ کا نام|तुम कौन हो|आपका नाम क्या है|你是谁|你叫什么名字|あなたは誰)\b/.test(q)) {
      return pickTemplate('whoAreYou', lang);
    }

    /* 6. What can you do / Help / Language capability */
    if (/\b(kya kr skti|kya kar sakti|madad kro|madad kar|help me|can you help|what can you do|how can you help|urdu aati|urdu bolti|speak|language|languages|zaban|konsi language|kaunsi bhasha|puedes ayudarme|peux tu m aider|kannst du mir helfen|yardım|مساعدة|مدد)\b/.test(q) || /^(help|madad|ayuda|aide|hilfe)$/.test(q)) {
      return pickTemplate('whoAreYou', lang);
    }

    /* 7. Where are you from / Who made you / About website */
    if (/\b(kahan se ho|kaha sy ho|kahan rehti|kis ne banaya|kis ny banaya|ye website kya|ye kis cheez ki site|where are you from|who made you|who created you|what is this website|what is corpus)\b/.test(q)) {
      return pickTemplate('whoAreYou', lang);
    }

    /* 8. Thank you / Appreciation / Compliments */
    if (/^(thanks|thank you|thank u|thx|ty|shukriya|bohat shukriya|buht shukriya|meharbani|jazakallah|nice|great|awesome|amazing|good job|well done|zabardast|bohat acha|buht acha|bohat achi|achi ho|pyari ho|smart|intelligent|cute|gracias|muchas gracias|merci|merci beaucoup|danke|vielen dank|obrigado|obrigada|grazie|teşekkürler|teşekkür ederim|terima kasih|спасибо|شكرا|شكراً|شکریہ|धन्यवाद|谢谢|ありがとう|ありがとうございます|감사합니다|dziękuję|cảm ơn|asante|salamat)(\s+.*)?$/.test(q)) {
      return pickTemplate('thanks', lang);
    }

    /* 9. Short Acknowledgements */
    if (/^(ok|okay|oky|k|thek|theek|thek h|theek hai|sahi|sahi hai|acha|achaa|acha g|hmm+|hm|han|haan|ji|ji han|yes|yep|yeah|alright|got it|cool|vale|bueno|d accord|alles klar|tamam|ладно|حسنا|ٹھیک ہے|ठीक है|好的)$/.test(q)) {
      return pickTemplate('ack', lang);
    }

    /* 10. Goodbye */
    if (/^(bye|bye bye|goodbye|good night|allah hafiz|khuda hafiz|fi amanillah|take care|tc|see you|cya|tata|adiós|adios|hasta luego|au revoir|tschüss|auf wiedersehen|tchau|arrivederci|güle güle|hoşça kal|sampai jumpa|пока|до свидания|مع السلامة|اللہ حافظ|خدا حافظ|अलविदा|再见|さようなら|안녕히 계세요)$/.test(q)) {
      return pickTemplate('bye', lang);
    }

    return null;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Build KB from window globals if on index.html, or fetch bot-knowledge.json */
  function loadKnowledgeBase() {
    if (KB) return Promise.resolve(KB);
    if (KB_PROMISE) return KB_PROMISE;

    KB_PROMISE = fetch(ROOT_PREFIX + 'bot-knowledge.json')
      .then(function (res) {
        if (!res.ok) throw new Error('KB fetch failed');
        return res.json();
      })
      .then(function (data) {
        KB = data;
        return KB;
      })
      .catch(function () {
        /* Fallback to in-page globals if available */
        KB = buildFromWindowGlobals();
        return KB;
      });

    return KB_PROMISE;
  }

  function buildFromWindowGlobals() {
    var chapters = [];
    var parts = [];
    var bones = [];
    var muscles = [];
    var tendons = [];
    try {
      if (typeof ORGANS === 'object' && ORGANS) {
        Object.keys(ORGANS).forEach(function (key) {
          var o = ORGANS[key];
          var sysName = (typeof SYSTEMS === 'object' && SYSTEMS[o.system]) ? SYSTEMS[o.system].name : (o.system || '');
          chapters.push({
            k: key, t: o.title || '', l: o.latin || '', s: sysName,
            r: o.region || '', b: o.blood || '', n: o.nerve || '',
            bl: o.blurb || '', sum: o.summary || ''
          });
          var pMap = o.parts || {};
          Object.keys(pMap).forEach(function (pid) {
            var p = pMap[pid];
            parts.push({
              ck: key, ct: o.title || '', id: pid,
              n: p.n || '', l: p.l || '', d: p.d || '', f: p.f || '', c: p.c || ''
            });
          });
        });
      }
    } catch (e) {}
    return { chapters: chapters, parts: parts, faqs: [], bones: bones, muscles: muscles, tendons: tendons };
  }

  /* ---------- 5. Detect Current Chapter Context ---------- */
  function getCurrentChapterSlug() {
    var hash = window.location.hash || '';
    if (hash.indexOf('#/') === 0) {
      var slug = hash.slice(2).split('/')[0].split('?')[0];
      if (slug === 'maleoverview') slug = 'male';
      if (slug === 'femaleoverview') slug = 'female';
      if (slug && !/^(map|organs|quiz|deep|explorer|systems|gyn)$/.test(slug)) {
        return slug;
      }
    }
    var path = window.location.pathname || '';
    var m = path.match(/\/learn\/([^/]+)\/?/);
    if (m && m[1] && m[1] !== 'index.html') {
      return m[1];
    }
    return '';
  }

  /* ---------- 6. Query Normalization & Intent Parsing ---------- */
  var STOP_WORDS = new Set([
    'what', 'is', 'are', 'the', 'a', 'an', 'of', 'in', 'on', 'to', 'for', 'and', 'or', 'about',
    'tell', 'me', 'explain', 'give', 'brief', 'detail', 'details', 'summary', 'short', 'note',
    'information', 'info', 'describe', 'define', 'definition', 'anatomy', 'human', 'body',
    'part', 'organ', 'structure', 'does', 'do', 'how', 'work', 'works', 'working', 'where',
    'located', 'location', 'function', 'functions', 'role', 'main', 'key', 'please', 'can', 'you',
    'kya', 'kia', 'hai', 'hain', 'hota', 'hoti', 'hotay', 'ka', 'ki', 'ke', 'ko', 'se', 'sy', 'ma',
    'main', 'mein', 'par', 'pa', 'bare', 'baray', 'batao', 'bataen', 'bataye', 'btaye', 'btao',
    'kaam', 'kam', 'karta', 'karti', 'kahan', 'kaha', 'mukhtasir', 'tafseel', 'maloomat', 'jism',
    'iske', 'iska', 'iski', 'us', 'uska', 'mujhe', 'mujy', 'chahiye', 'chaya', 'tha', 'thi',
    /* Multilingual Question & Grammar Stop Words */
    'qué', 'que', 'cómo', 'como', 'dónde', 'donde', 'cuál', 'cual', 'es', 'son', 'el', 'la', 'los', 'las', 'del', 'de', 'en', 'un', 'una', 'para', 'por', 'funciona', 'función', 'funcion', 'anatomía', 'anatomia', 'cuerpo', 'humano',
    'qu', 'est', 'ce', 'le', 'les', 'des', 'du', 'dans', 'une', 'comment', 'où', 'ou', 'quel', 'quelle', 'fonctionne', 'fonction', 'corps', 'humain',
    'was', 'ist', 'sind', 'wie', 'wo', 'das', 'die', 'der', 'den', 'dem', 'ein', 'eine', 'und', 'funktioniert', 'funktion', 'körper', 'menschlichen',
    'o', 'os', 'as', 'do', 'da', 'no', 'na', 'qual', 'onde', 'corpo',
    'cosa', 'cos', 'è', 'il', 'lo', 'gli', 'della', 'nel', 'come', 'dove', 'funziona', 'funzione',
    'nedir', 'nasıl', 'nerede', 'ne', 'işe', 'yarar', 'hakkında', 'bilgi', 'insan', 'vücut',
    'apa', 'itu', 'bagaimana', 'dimana', 'di', 'mana', 'fungsi', 'tentang', 'adalah', 'yang', 'tubuh', 'manusia',
    'что', 'такое', 'как', 'работает', 'где', 'находится', 'это', 'о', 'об', 'функция', 'человека', 'тела',
    'ما', 'هو', 'هي', 'في', 'من', 'عن', 'كيف', 'يعمل', 'أين', 'يقع', 'وظيفة', 'تشريح', 'جسم', 'الإنسان', 'الانسان',
    'کیا', 'ہے', 'ہیں', 'کا', 'کی', 'کے', 'میں', 'سے', 'کو', 'پر', 'کام', 'کرتا', 'کرتی', 'کہاں', 'ہوتا', 'ہوتی', 'بتائیں', 'بتاؤ', 'انسانی', 'جسم',
    'क्या', 'है', 'हैं', 'का', 'की', 'के', 'में', 'से', 'को', 'पर', 'काम', 'करता', 'करती', 'कहाँ', 'होता', 'होती', 'बताएं', 'बताओ', 'मानव', 'शरीर',
    'کیست', 'چیست', 'چطور', 'کجاست', 'در', 'بدن', 'انسان'
  ]);

  function normalizeQuery(raw) {
    var q = String(raw || '').toLowerCase().trim();
    q = q.replace(/[?!.,;:'"()[\]{}\/\\¿¡؟،۔«»「」『』？！】]+/g, ' ').replace(/\s+/g, ' ').trim();

    /* Remove attached CJK/Japanese/Korean question particles so CJK organ names match cleanly */
    q = q.replace(/(什么是|是什么|的作用|的功能|在哪里|とは何ですか|とは|の働き|の役割|이란|란 무엇인가|은 무엇인가|는 무엇인가|의 기능)/g, ' ').replace(/\s+/g, ' ').trim();

    /* Detect specific user intent */
    var intent = {
      wantsFunction: /\b(function|functions|role|what does|how does|work|works|kaam|kam|karta|funciona|función|fonctionne|funktioniert|fungsi|وظيفة|يعمل|کام|काम)\b/.test(q),
      wantsLocation: /\b(where|location|located|region|position|situated|kahan|kaha|dónde|donde|où|wo|nerede|dimana|где|أين|کہاں|कहाँ)\b/.test(q),
      wantsClinical: /\b(clinical|disease|disorder|injury|damage|pain|pathology|bimari|masla|symptom|مرض|بیماری|बीमारी)\b/.test(q),
      wantsSupply: /\b(blood|artery|vein|supply|nerve|innervation|khoon|sangre|sang|blut|خون|دم|रक्त)\b/.test(q),
      wantsCurrentChapter: /\b(this chapter|current chapter|this page|this organ|is chapter|is page)\b/.test(q)
    };

    /* Replace multi-word & single-word synonyms (Unicode & CJK safe) */
    var mapped = ' ' + q + ' ';
    Object.keys(SYNONYMS).sort(function (a, b) { return b.length - a.length; }).forEach(function (k) {
      var target = SYNONYMS[k];
      if (/^[\x00-\x7F]+$/.test(k)) {
        var re = new RegExp('\\b' + k.replace(/\s+/g, '\\s+') + '\\b', 'gi');
        if (re.test(mapped)) {
          mapped = mapped.replace(re, ' ' + target + ' ');
        }
      } else if (/[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/.test(k)) {
        if (mapped.indexOf(k) !== -1) {
          mapped = mapped.split(k).join(' ' + target + ' ');
        }
      } else {
        var reUni = new RegExp('(^|\\s)' + k.replace(/\s+/g, '\\s+') + '(?=\\s|$)', 'gi');
        if (reUni.test(mapped)) {
          mapped = mapped.replace(reUni, ' ' + target + ' ');
        }
      }
    });
    mapped = mapped.replace(/\s+/g, ' ').trim();

    var tokens = mapped.split(' ').filter(function (w) {
      return w.length > 1 && !STOP_WORDS.has(w);
    });

    /* If all words were stop words (e.g. "what does it do"), keep original tokens */
    if (!tokens.length) {
      tokens = q.split(' ').filter(Boolean);
    }

    var corePhrase = tokens.join(' ').trim();
    return {
      raw: raw,
      clean: q,
      corePhrase: corePhrase,
      tokens: tokens,
      intent: intent
    };
  }

  function truncateSentences(text, maxSentences) {
    var s = String(text || '').trim();
    if (!s) return '';
    var parts = s.match(/[^.!?]+[.!?]+/g);
    if (!parts || parts.length <= maxSentences) return s;
    return parts.slice(0, maxSentences).join(' ').trim();
  }

  function buildNavButtons(chapterKey, partId) {
    if (!chapterKey) return '';
    var onSpa = !!(document.getElementById('app') && window.ORGANS);
    var atlasHref = (onSpa ? '#/' : ROOT_PREFIX + 'index.html#/') + chapterKey;
    var guideHref = ROOT_PREFIX + 'learn/' + chapterKey + '/' + (partId ? '#part-' + partId : '');
    return (
      '<div class="cbot-nav-actions">' +
        '<a class="cbot-nav-btn" href="' + escapeHtml(atlasHref) + '" data-cbot-nav="' + escapeHtml(atlasHref) + '">Interactive Atlas ↗</a>' +
        '<a class="cbot-nav-btn" href="' + escapeHtml(guideHref) + '">Study Guide →</a>' +
      '</div>'
    );
  }

  /* ---------- 7. Internal Corpus Search (Instant <100ms) ---------- */
  function searchInternalKB(parsed, kb) {
    var core = parsed.corePhrase;
    var tokens = parsed.tokens;
    var currentSlug = getCurrentChapterSlug();

    /* 0. If user asks about "this chapter" / "summary" while viewing a chapter */
    if ((parsed.intent.wantsCurrentChapter || core === 'summary' || core === 'overview') && currentSlug) {
      var curChap = (kb.chapters || []).find(function (c) { return c.k === currentSlug; });
      if (curChap) {
        LAST_TOPIC = { type: 'chapter', item: curChap };
        return formatChapterReply(curChap, parsed.intent);
      }
    }

    /* 0b. Conversational Follow-up on LAST_TOPIC (e.g. "aur batao", "tell me more", "what is its blood supply", "iska kaam kya hai") */
    var isFollowUp = /\b(tell me more|more detail|more details|aur batao|or batao|iske bare|iske baray|iska kaam|iska kam|iska function|iski location|ye kahan|iski blood|its function|its location|its blood|its nerve|what does it do|where is it)\b/.test(parsed.clean);
    if (LAST_TOPIC && (isFollowUp || (!core && (parsed.intent.wantsFunction || parsed.intent.wantsLocation || parsed.intent.wantsSupply || parsed.intent.wantsClinical)))) {
      if (LAST_TOPIC.type === 'chapter') return formatChapterReply(LAST_TOPIC.item, parsed.intent);
      if (LAST_TOPIC.type === 'part') return formatPartReply(LAST_TOPIC.item, parsed.intent);
      if (LAST_TOPIC.type === 'extra') return formatExtraMedicalReply(LAST_TOPIC.item);
    }

    if (!core) return null;

    /* 1. Check Curated Extra Medical Reference first if exact match for non-chapter organs (e.g. gallbladder, appendix, pineal gland) */
    if (EXTRA_MEDICAL_REF[core]) {
      LAST_TOPIC = { type: 'extra', item: EXTRA_MEDICAL_REF[core] };
      return formatExtraMedicalReply(EXTRA_MEDICAL_REF[core]);
    }
    for (var refKey in EXTRA_MEDICAL_REF) {
      if (core === refKey || (core.indexOf(refKey) !== -1 && Math.abs(core.length - refKey.length) <= 7)) {
        LAST_TOPIC = { type: 'extra', item: EXTRA_MEDICAL_REF[refKey] };
        return formatExtraMedicalReply(EXTRA_MEDICAL_REF[refKey]);
      }
    }

    /* 2. Score Chapters (74 chapters) */
    var bestChapter = null;
    var bestChapterScore = 0;
    (kb.chapters || []).forEach(function (c) {
      var titleLow = c.t.toLowerCase();
      var titleBase = titleLow.split(/[·—–-]/)[0].trim();
      var latinLow = (c.l || '').toLowerCase();
      var keyLow = c.k.toLowerCase();
      var score = 0;

      if (core === keyLow || core === titleBase || core === titleLow || (latinLow && core === latinLow)) {
        score = 135;
      } else if (titleBase.split(/\s+/).indexOf(core) !== -1 && core.length >= 3) {
        score = 102;
      } else if (titleLow.indexOf(core) !== -1 && core.length >= 4) {
        score = 84;
      } else if (latinLow && latinLow.indexOf(core) !== -1 && core.length >= 4) {
        score = 82;
      } else if (tokens.length > 0) {
        var matched = tokens.filter(function (t) {
          return t.length >= 3 && (titleLow.indexOf(t) !== -1 || latinLow.indexOf(t) !== -1 || keyLow === t);
        });
        if (matched.length === tokens.length && tokens.length >= 1) {
          score = 76 + matched.length * 4;
        }
      }

      if (score > bestChapterScore) {
        bestChapterScore = score;
        bestChapter = c;
      }
    });

    /* 3. Score Documented Parts (1,586 structures) */
    var bestPart = null;
    var bestPartScore = 0;
    (kb.parts || []).forEach(function (p) {
      var nameLow = (p.n || '').toLowerCase();
      var nameClean = nameLow.replace(/^(facial|cranial)\s*·\s*/i, '').trim();
      var latinLow = (p.l || '').toLowerCase();
      var score = 0;

      if (core === nameClean || core === nameLow || (latinLow && core === latinLow)) {
        score = 125;
      } else if (nameClean.indexOf(core) === 0 && core.length >= 4) {
        score = 96;
      } else if (nameClean.indexOf(core) !== -1 && core.length >= 4) {
        score = 86;
      } else if (latinLow && latinLow.indexOf(core) !== -1 && core.length >= 4) {
        score = 84;
      } else if (tokens.length >= 1) {
        var matched = tokens.filter(function (t) {
          return t.length >= 3 && (nameClean.indexOf(t) !== -1 || latinLow.indexOf(t) !== -1);
        });
        if (matched.length === tokens.length) {
          score = 80 + matched.length * 5;
        } else if (tokens.length >= 2 && matched.length >= tokens.length - 1) {
          score = 62 + matched.length * 4;
        }
      }

      /* Boost slightly if part belongs to the chapter user is currently viewing */
      if (score > 0 && currentSlug && p.ck === currentSlug) {
        score += 4;
      }
      /* Deprioritize generic overview parts in male/female chapters when a dedicated organ chapter exists */
      if (score > 0 && (p.ck === 'male' || p.ck === 'female')) {
        score -= 18;
      }

      if (score > bestPartScore) {
        bestPartScore = score;
        bestPart = p;
      }
    });

    /* 4. Score Curated FAQs (370 Q&A pairs) */
    var bestFaq = null;
    var bestFaqScore = 0;
    (kb.faqs || []).forEach(function (f) {
      var qLow = (f.q || '').toLowerCase();
      var score = 0;
      if (qLow.indexOf(core) !== -1 && core.length >= 6) {
        score = 92;
      } else if (tokens.length >= 2) {
        var matched = tokens.filter(function (t) { return t.length >= 3 && qLow.indexOf(t) !== -1; });
        if (matched.length === tokens.length) {
          score = 82 + matched.length * 4;
        }
      }
      if (score > bestFaqScore) {
        bestFaqScore = score;
        bestFaq = f;
      }
    });

    /* 5. Score Skeletal Muscles (312 muscles) & Tendons (32 tendons) & Bones */
    var bestMuscle = null;
    var bestMuscleScore = 0;
    (kb.muscles || []).forEach(function (m) {
      var nLow = (m.n || '').toLowerCase();
      var score = 0;
      if (core === nLow) score = 118;
      else if (nLow.indexOf(core) !== -1 && core.length >= 4) score = 88;
      else if (tokens.length >= 1) {
        var matched = tokens.filter(function (t) { return t.length >= 4 && nLow.indexOf(t) !== -1; });
        if (matched.length === tokens.length) score = 79 + matched.length * 4;
      }
      if (score > bestMuscleScore) {
        bestMuscleScore = score;
        bestMuscle = m;
      }
    });

    var bestTendon = null;
    var bestTendonScore = 0;
    (kb.tendons || []).forEach(function (t) {
      var nLow = (t.n || '').toLowerCase();
      var score = 0;
      if (core === nLow) score = 118;
      else if (nLow.indexOf(core) !== -1 && core.length >= 5) score = 88;
      if (score > bestTendonScore) {
        bestTendonScore = score;
        bestTendon = t;
      }
    });

    /* Pick the highest-confidence internal match (must be >= 75 to avoid false matches on missing organs) */
    var candidates = [
      { type: 'part', score: bestPartScore, item: bestPart },
      { type: 'chapter', score: bestChapterScore, item: bestChapter },
      { type: 'faq', score: bestFaqScore, item: bestFaq },
      { type: 'muscle', score: bestMuscleScore, item: bestMuscle },
      { type: 'tendon', score: bestTendonScore, item: bestTendon }
    ].sort(function (a, b) { return b.score - a.score; });

    var winner = candidates[0];
    if (!winner || winner.score < 75 || !winner.item) {
      return null;
    }

    if (winner.type === 'chapter') {
      LAST_TOPIC = { type: 'chapter', item: winner.item };
      return formatChapterReply(winner.item, parsed.intent);
    }
    if (winner.type === 'part') {
      LAST_TOPIC = { type: 'part', item: winner.item };
      return formatPartReply(winner.item, parsed.intent);
    }
    if (winner.type === 'faq') {
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(winner.item.q) + '</span>' +
          '<span class="cbot-topic-tag">' + escapeHtml(winner.item.ct) + '</span>' +
        '</div>' +
        '<div>' + escapeHtml(winner.item.a) + '</div>' +
        buildNavButtons(winner.item.ck, '')
      );
    }
    if (winner.type === 'muscle') {
      var m = winner.item;
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(m.n) + '</span>' +
          '<span class="cbot-topic-tag">Muscle · ' + escapeHtml(m.g) + '</span>' +
        '</div>' +
        '<ul class="cbot-point-list">' +
          (m.a ? '<li><b>Action:</b>' + escapeHtml(m.a) + '</li>' : '') +
          (m.o ? '<li><b>Origin:</b>' + escapeHtml(m.o) + '</li>' : '') +
          (m.i ? '<li><b>Insertion:</b>' + escapeHtml(m.i) + '</li>' : '') +
          (m.nv ? '<li><b>Nerve Supply:</b>' + escapeHtml(m.nv) + '</li>' : '') +
          (m.loc ? '<li><b>Location:</b>' + escapeHtml(m.loc) + '</li>' : '') +
        '</ul>' +
        buildNavButtons('muscle', '')
      );
    }
    if (winner.type === 'tendon') {
      var td = winner.item;
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(td.n) + '</span>' +
          '<span class="cbot-topic-tag">Tendon Atlas</span>' +
        '</div>' +
        '<ul class="cbot-point-list">' +
          (td.a ? '<li><b>Function:</b>' + escapeHtml(td.a) + '</li>' : '') +
          (td.at ? '<li><b>Attachment:</b>' + escapeHtml(td.at) + '</li>' : '') +
        '</ul>' +
        buildNavButtons('muscle', '')
      );
    }
    return null;
  }

  function formatChapterReply(c, intent) {
    var brief = truncateSentences(c.sum || c.bl, 2);
    var bullets = [];
    if (intent && intent.wantsLocation && c.r) {
      bullets.push(['Location', c.r]);
      if (c.b) bullets.push(['Blood Supply', c.b]);
    } else if (intent && intent.wantsSupply) {
      if (c.b) bullets.push(['Blood Supply', c.b]);
      if (c.n) bullets.push(['Innervation', c.n]);
    } else {
      if (c.r) bullets.push(['Location', c.r]);
      if (c.b) bullets.push(['Blood Supply', c.b]);
      if (c.n) bullets.push(['Nerve Supply', c.n]);
    }
    var listHtml = bullets.length
      ? '<ul class="cbot-point-list">' + bullets.map(function (row) {
          return '<li><b>' + escapeHtml(row[0]) + ':</b>' + escapeHtml(row[1]) + '</li>';
        }).join('') + '</ul>'
      : '';

    return (
      '<div class="cbot-topic-head">' +
        '<span class="cbot-topic-title">' + escapeHtml(c.t) + '</span>' +
        '<span class="cbot-topic-tag">' + escapeHtml(c.s || 'Anatomy') + '</span>' +
      '</div>' +
      '<div>' + escapeHtml(brief) + '</div>' +
      listHtml +
      buildNavButtons(c.k, '')
    );
  }

  function formatPartReply(p, intent) {
    var bullets = [];
    if (p.f) bullets.push(['What it does', truncateSentences(p.f, 2)]);
    if (p.c) bullets.push(['Clinical Note', truncateSentences(p.c, 2)]);
    var listHtml = bullets.length
      ? '<ul class="cbot-point-list">' + bullets.map(function (row) {
          return '<li><b>' + escapeHtml(row[0]) + ':</b>' + escapeHtml(row[1]) + '</li>';
        }).join('') + '</ul>'
      : '';

    return (
      '<div class="cbot-topic-head">' +
        '<span class="cbot-topic-title">' + escapeHtml(p.n) + (p.l && p.l !== p.n ? ' · ' + escapeHtml(p.l) : '') + '</span>' +
        '<span class="cbot-topic-tag">' + escapeHtml(p.ct) + '</span>' +
      '</div>' +
      '<div>' + escapeHtml(truncateSentences(p.d, 2)) + '</div>' +
      listHtml +
      buildNavButtons(p.ck, p.id)
    );
  }

  function formatExtraMedicalReply(item) {
    var chapKey = '';
    var rows = (item.points || []).filter(function (r) {
      if (r[0] === 'chapterKey') { chapKey = r[1]; return false; }
      return true;
    });
    var listHtml = rows.length
      ? '<ul class="cbot-point-list">' + rows.map(function (r) {
          return '<li><b>' + escapeHtml(r[0]) + ':</b>' + escapeHtml(r[1]) + '</li>';
        }).join('') + '</ul>'
      : '';
    return (
      '<div class="cbot-topic-head">' +
        '<span class="cbot-topic-title">' + escapeHtml(item.title) + '</span>' +
        '<span class="cbot-topic-tag">' + escapeHtml(item.tag || 'Anatomy Reference') + '</span>' +
      '</div>' +
      '<div>' + escapeHtml(item.summary) + '</div>' +
      listHtml +
      (chapKey ? buildNavButtons(chapKey, '') : '')
    );
  }

  /* ---------- 8. External Background Medical Search (Max 3s, NO External Links) ---------- */
  function fetchWithTimeout(url, timeoutMs) {
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, timeoutMs);
    return fetch(url, ctrl ? { signal: ctrl.signal } : {})
      .then(function (res) {
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(function (err) {
        clearTimeout(timer);
        throw err;
      });
  }

  function cleanEncyclopediaExtract(text) {
    var s = String(text || '').trim();
    /* Remove phonetic/pronunciation parentheses clutter while keeping clean medical prose */
    s = s.replace(/\s*\([^()]*\/[^()]*\/[^()]*\)/g, '');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  var EXT_CACHE = {};

  function isRelevantMedicalResult(title, desc, extract) {
    var t = String(title || '').toLowerCase();
    var combined = (t + ' ' + String(desc || '') + ' ' + String(extract || '')).toLowerCase();
    /* Reject Wikipedia list/index/film/music/pop-culture pages */
    if (/^(list of|index of|outline of|timeline of|category:|disambiguation)/.test(t)) return false;
    if (/\b(film|films|movie|television series|album|song|band|footballer|politician|municipality|district|village)\b/.test(combined) &&
        !/\b(anatomy|anatomical|organ|muscle|bone|nerve|artery|vein|tissue|cell|gland|physiology|medicine|medical)\b/.test(combined)) {
      return false;
    }
    /* Require genuine anatomical / biological / medical context */
    return /\b(anatomy|anatomical|human body|organ|organs|tissue|cell|cells|bone|bones|skeletal|muscle|muscles|muscular|nerve|nervous|neural|brain|cerebral|spinal|heart|cardiac|vascular|blood|artery|arterial|vein|venous|capillary|lung|pulmonary|respiratory|liver|hepatic|kidney|renal|stomach|gastric|intestine|intestinal|digestive|colon|pancreas|spleen|gallbladder|bladder|urinary|reproductive|uterus|ovary|testis|prostate|gland|endocrine|hormone|lymph|lymphatic|immune|skin|epidermis|dermis|eye|retina|cornea|ear|cochlea|vestibular|tooth|dental|tongue|pharynx|larynx|trachea|bronchus|diaphragm|thorax|abdomen|pelvis|cranium|skull|vertebra|joint|ligament|tendon|cartilage|fascia|epithelium|neuron|synapse|receptor|enzyme|protein|physiology|pathology|disease|syndrome|clinical|medical|medicine|biology|biological)\b/.test(combined);
  }

  function formatExternalExtract(title, desc, rawExtract) {
    var cleanText = cleanEncyclopediaExtract(rawExtract);
    var sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    var lead = sentences.slice(0, 2).join(' ').trim();
    var more = sentences.slice(2, 4).join(' ').trim();
    var descTag = desc ? truncateSentences(desc, 1).slice(0, 36) : 'Anatomy Reference';

    /* IMPORTANT: Never include any external URL or external site name! */
    return (
      '<div class="cbot-topic-head">' +
        '<span class="cbot-topic-title">' + escapeHtml(title) + '</span>' +
        '<span class="cbot-topic-tag">' + escapeHtml(descTag) + '</span>' +
      '</div>' +
      '<div>' + escapeHtml(lead) + '</div>' +
      (more ? '<ul class="cbot-point-list"><li><b>Key Detail:</b>' + escapeHtml(more) + '</li></ul>' : '')
    );
  }

  function searchExternalMedicalWeb(parsed) {
    var queryTerm = parsed.corePhrase || parsed.clean;
    if (!queryTerm || queryTerm.length < 3) return Promise.resolve(null);
    if (EXT_CACHE[queryTerm]) return Promise.resolve(EXT_CACHE[queryTerm]);

    /* Fast single-request MediaWiki generator=search (1 HTTP roundtrip, ~300-600ms, full CORS origin=*) */
    var singleCallUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
      encodeURIComponent(queryTerm + ' human anatomy') +
      '&gsrlimit=1&prop=extracts|description&exintro=1&explaintext=1&exsentences=4&redirects=1&format=json&origin=*';

    return fetchWithTimeout(singleCallUrl, 2400)
      .then(function (data) {
        var pages = (data && data.query && data.query.pages) || {};
        var pageList = Object.keys(pages).map(function (k) { return pages[k]; });
        if (pageList.length && pageList[0].extract && pageList[0].extract.length > 40) {
          var p = pageList[0];
          if (isRelevantMedicalResult(p.title, p.description, p.extract)) {
            var html = formatExternalExtract(p.title || queryTerm, p.description || 'Anatomy Reference', p.extract);
            EXT_CACHE[queryTerm] = html;
            return html;
          }
        }
        throw new Error('Try direct REST summary');
      })
      .catch(function () {
        var directSlug = encodeURIComponent(queryTerm.replace(/\s+/g, '_'));
        var summaryUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + directSlug;
        return fetchWithTimeout(summaryUrl, 1800).then(function (summaryData) {
          if (!summaryData || !summaryData.extract) return null;
          if (!isRelevantMedicalResult(summaryData.title, summaryData.description, summaryData.extract)) {
            return null;
          }
          var html = formatExternalExtract(
            summaryData.title || queryTerm,
            summaryData.description || 'Anatomy Reference',
            summaryData.extract
          );
          EXT_CACHE[queryTerm] = html;
          return html;
        });
      })
      .catch(function () {
        return null;
      });
  }

  /* ---------- 8b. Universal Translation & Same-Language Localization Engine ---------- */
  function translateText(text, sourceLang, targetLang) {
    var clean = String(text || '').trim();
    if (!clean || sourceLang === targetLang) return Promise.resolve(clean);
    var src = sourceLang === 'ur-Latn' ? 'ur' : sourceLang;
    var tgt = targetLang === 'ur-Latn' ? 'en' : targetLang;
    if (src === tgt) return Promise.resolve(clean);

    var cacheKey = src + '|' + tgt + '|' + clean;
    if (TRANS_CACHE[cacheKey]) return Promise.resolve(TRANS_CACHE[cacheKey]);

    var url = 'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(clean.slice(0, 480)) +
      '&langpair=' + encodeURIComponent(src + '|' + tgt);

    return fetchWithTimeout(url, 2400)
      .then(function (data) {
        var out = data && data.responseData && data.responseData.translatedText;
        if (out && typeof out === 'string' && out.indexOf('MYMEMORY WARNING') === -1) {
          TRANS_CACHE[cacheKey] = out.trim();
          return out.trim();
        }
        return clean;
      })
      .catch(function () {
        return clean;
      });
  }

  /* Convert English anatomy reply card into natural Roman Urdu when student asks in Roman Urdu */
  function formatRomanUrduReply(html) {
    if (!html) return html;
    var out = html;
    /* Localize bullet labels into Roman Urdu + English */
    out = out
      .replace(/<b>Location:<\/b>/g, '<b>Maqam (Location):</b> ')
      .replace(/<b>Blood Supply:<\/b>/g, '<b>Khoon ki Supply (Blood):</b> ')
      .replace(/<b>Nerve Supply:<\/b>/g, '<b>Aasabi Supply (Nerve):</b> ')
      .replace(/<b>Innervation:<\/b>/g, '<b>Aasabi Supply (Innervation):</b> ')
      .replace(/<b>What it does:<\/b>/g, '<b>Kaam (Function):</b> ')
      .replace(/<b>Function:<\/b>/g, '<b>Kaam (Function):</b> ')
      .replace(/<b>Action:<\/b>/g, '<b>Harkat / Kaam (Action):</b> ')
      .replace(/<b>Clinical Note:<\/b>/g, '<b>Tibbi Nuqta (Clinical):</b> ')
      .replace(/<b>Key Detail:<\/b>/g, '<b>Ahem Tafseel (Detail):</b> ');

    /* Add a concise Roman Urdu lead sentence inside the main description div */
    out = out.replace(/<\/div><div>([\s\S]*?)<\/div>/, function (full, bodyText) {
      var ruBody = bodyText
        .replace(/\bis a hollow four-chambered muscular pump\b/i, 'insani jism ka chaar chambers wala muscular pump hai jo poore jism mein khoon pump karta hai —')
        .replace(/\bis a muscular organ that\b/i, 'ek ahem muscular organ hai jo')
        .replace(/\bis the central organ of the human nervous system\b/i, 'insani nervous system (aasabi nizam) ka sab se ahem markazi organ hai —')
        .replace(/\bis the largest internal organ and gland\b/i, 'insani jism ka sab se bara androoni organ aur gland hai —')
        .replace(/\bare bean-shaped retroperitoneal organs\b/i, 'bean-shaped organs hain jo khoon ko filter karte hain aur waste kharij karte hain —')
        .replace(/\bare the primary organs of the respiratory system\b/i, 'saans lene ke nizam (respiratory system) ke bunyadi organs hain —');
      return '</div><div><b>Roman Urdu Khulasa:</b> Ye structure insani jism ke is hissay mein ahem kirdar ada karta hai. ' + ruBody + '</div>';
    });
    return out;
  }

  /* Translate reply HTML into the student's native world language (Spanish, Arabic, Urdu, Hindi, French, German, Chinese, Russian, Turkish, etc.) */
  function localizeReplyForLanguage(html, lang) {
    if (!html || !lang || lang === 'en') return Promise.resolve(html);
    if (lang === 'ur-Latn') return Promise.resolve(formatRomanUrduReply(html));

    /* Extract Nav Buttons so they remain intact */
    var navMatch = html.match(/<div class="cbot-nav-actions">[\s\S]*?<\/div>/);
    var navHtml = navMatch ? navMatch[0] : '';
    var withoutNav = navMatch ? html.replace(navHtml, '') : html;

    /* Extract Title, Tag, Main Summary, and Bullet Items */
    var titleM = withoutNav.match(/<span class="cbot-topic-title">([\s\S]*?)<\/span>/);
    var tagM = withoutNav.match(/<span class="cbot-topic-tag">([\s\S]*?)<\/span>/);
    var bodyM = withoutNav.match(/<\/div><div>([\s\S]*?)<\/div>/);
    var listM = withoutNav.match(/<ul class="cbot-point-list">([\s\S]*?)<\/ul>/);

    if (!bodyM) {
      /* Plain text / simple HTML message */
      var plain = withoutNav.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      return translateText(plain, 'en', lang).then(function (tr) {
        var dirAttr = /^(ar|ur|fa|he)$/.test(lang) ? ' dir="rtl" style="text-align:right;"' : '';
        return '<div' + dirAttr + '><strong>' + escapeHtml(tr) + '</strong></div>';
      });
    }

    var titleText = titleM ? titleM[1] : '';
    var tagText = tagM ? tagM[1] : '';
    var bodyText = bodyM ? bodyM[1] : '';
    var bulletsPlain = [];
    if (listM && listM[1]) {
      var liMatches = listM[1].match(/<li>[\s\S]*?<\/li>/g) || [];
      bulletsPlain = liMatches.map(function (li) {
        return li.replace(/<\/b>/g, ': ').replace(/<[^>]+>/g, '').replace(/:\s*:/g, ':').trim();
      });
    }

    /* Batch translate main summary and bullet points in parallel (fast ~400-800ms) */
    var summaryPromise = translateText(bodyText, 'en', lang);
    var bulletsPromise = bulletsPlain.length
      ? translateText(bulletsPlain.join(' || '), 'en', lang)
      : Promise.resolve('');

    return Promise.all([summaryPromise, bulletsPromise]).then(function (results) {
      var trSummary = results[0] || bodyText;
      var trBulletsRaw = results[1] || '';
      var trBullets = trBulletsRaw ? trBulletsRaw.split(/\s*\|\|\s*/) : [];
      var isRtl = /^(ar|ur|fa|he)$/.test(lang);
      var dirStyle = isRtl ? ' dir="rtl" style="text-align:right;"' : '';

      var listHtml = trBullets.length
        ? '<ul class="cbot-point-list"' + dirStyle + '>' + trBullets.map(function (item) {
            var idx = item.indexOf(':');
            if (idx > 0 && idx < 32) {
              return '<li><b>' + escapeHtml(item.slice(0, idx + 1)) + '</b> ' + escapeHtml(item.slice(idx + 1).trim()) + '</li>';
            }
            return '<li>' + escapeHtml(item) + '</li>';
          }).join('') + '</ul>'
        : '';

      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + titleText + '</span>' +
          '<span class="cbot-topic-tag">' + tagText + '</span>' +
        '</div>' +
        '<div' + dirStyle + '>' + escapeHtml(trSummary) + '</div>' +
        listHtml +
        navHtml
      );
    });
  }

  /* ---------- 9. Build & Mount Animated Bot + Whiteboard UI ---------- */
  function createBotWidget() {
    var root = document.createElement('div');
    root.className = 'cbot-root';
    root.id = 'corpus-ai-bot';
    root.setAttribute('aria-label', 'Corpus AI Anatomy Assistant');

    var waveImgSrc = ROOT_PREFIX + 'img/webp/bot-wave.webp?v=10';
    var pointImgSrc = ROOT_PREFIX + 'img/webp/bot-point.webp?v=10';

    root.innerHTML =
      /* Compact Mini Speech Bubble ("Hi! Ask AI" on load & every 30s for 3s) */
      '<div class="cbot-bubble" id="cbotBubble" role="button" tabindex="0" aria-label="Hi! Ask AI">' +
        '<span id="cbotBubbleText">Hi! Ask AI</span>' +
      '</div>' +

      /* Interactive Whiteboard (Image-2 style, opens to the left of her pointing hand) */
      '<div class="cbot-board-wrap" id="cbotBoardWrap" aria-hidden="true">' +
        '<div class="cbot-board" role="dialog" aria-label="Corpus AI Assistant">' +
          '<div class="cbot-head">' +
            '<div class="cbot-head-left">' +
              '<span class="cbot-badge-dot"></span>' +
              '<div class="cbot-head-title">Corpus AI Assistant</div>' +
            '</div>' +
            '<button type="button" class="cbot-close" id="cbotCloseBtn" aria-label="Close AI Board" title="Close">×</button>' +
          '</div>' +

          '<div class="cbot-messages" id="cbotMessages">' +
            '<div class="cbot-msg cbot-msg-bot" id="cbotWelcomeMsg">' +
              '<strong>Hi! I am your Corpus AI Assistant.</strong>' +
            '</div>' +
          '</div>' +

          '<form class="cbot-input-bar" id="cbotForm" autocomplete="off">' +
            '<input type="text" class="cbot-input" id="cbotInput" placeholder="Type an organ or question…" aria-label="Ask an anatomy question" />' +
            '<button type="submit" class="cbot-send" aria-label="Send question" title="Ask AI">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path>' +
              '</svg>' +
            '</button>' +
          '</form>' +
        '</div>' +
        '<div class="cbot-tray" aria-hidden="true">' +
          '<span class="cbot-marker m-black"></span>' +
          '<span class="cbot-marker m-coral"></span>' +
        '</div>' +
      '</div>' +

      /* Full-Body Clickable Character Avatar (Image 1 waving -> Image 2 pointing) */
      '<button type="button" class="cbot-avatar-btn" id="cbotAvatarBtn" aria-label="Open Corpus AI Anatomy Bot" aria-expanded="false">' +
        '<span class="cbot-char-wrap">' +
          '<img class="cbot-img cbot-img-wave" src="' + escapeHtml(waveImgSrc) + '" alt="Corpus AI Bot waving" width="568" height="1400" decoding="async" />' +
          '<img class="cbot-img cbot-img-point" src="' + escapeHtml(pointImgSrc) + '" alt="Corpus AI Bot pointing to board" width="766" height="1400" decoding="async" />' +
        '</span>' +
      '</button>';

    document.body.appendChild(root);
    bindBotEvents(root);
  }

  function bindBotEvents(root) {
    var avatarBtn = root.querySelector('#cbotAvatarBtn');
    var bubble = root.querySelector('#cbotBubble');
    var boardWrap = root.querySelector('#cbotBoardWrap');
    var closeBtn = root.querySelector('#cbotCloseBtn');
    var form = root.querySelector('#cbotForm');
    var input = root.querySelector('#cbotInput');
    var messages = root.querySelector('#cbotMessages');

    function showBriefGreeting() {
      if (IS_OPEN) return;
      bubble.classList.add('is-visible');
      clearTimeout(HIDE_BUBBLE_TIMER);
      HIDE_BUBBLE_TIMER = setTimeout(function () {
        bubble.classList.remove('is-visible');
      }, 3000);
    }

    function openBoard() {
      IS_OPEN = true;
      root.classList.add('is-open');
      bubble.classList.remove('is-visible');
      clearTimeout(HIDE_BUBBLE_TIMER);
      avatarBtn.setAttribute('aria-expanded', 'true');
      boardWrap.setAttribute('aria-hidden', 'false');
      loadKnowledgeBase();
      setTimeout(function () {
        input.focus();
      }, 120);
    }

    function closeBoard() {
      IS_OPEN = false;
      root.classList.remove('is-open');
      avatarBtn.setAttribute('aria-expanded', 'false');
      boardWrap.setAttribute('aria-hidden', 'true');
    }

    /* Clicking anywhere on her body toggles the board */
    avatarBtn.addEventListener('click', function () {
      if (IS_OPEN) closeBoard();
      else openBoard();
    });

    /* Clicking on the mini "Hi! Ask AI" speech bubble opens the board */
    bubble.addEventListener('click', function () {
      openBoard();
    });
    bubble.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBoard();
      }
    });

    closeBtn.addEventListener('click', function () {
      closeBoard();
    });

    /* Handle internal SPA navigation clicks inside messages */
    messages.addEventListener('click', function (e) {
      var navLink = e.target.closest('[data-cbot-nav]');
      if (navLink && document.getElementById('app') && window.ORGANS) {
        var targetHash = navLink.getAttribute('data-cbot-nav');
        if (targetHash && targetHash.indexOf('#/') === 0) {
          window.location.hash = targetHash;
        }
      }
    });

    /* Handle message typing form submission */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (input.value || '').trim();
      if (!text) return;
      input.value = '';
      handleUserQuestion(text);
    });

    function appendMessage(htmlContent, isUser) {
      var div = document.createElement('div');
      div.className = 'cbot-msg ' + (isUser ? 'cbot-msg-user' : 'cbot-msg-bot');
      if (isUser) div.textContent = htmlContent;
      else div.innerHTML = htmlContent;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function handleUserQuestion(rawQuestion) {
      appendMessage(rawQuestion, true);

      var userLang = detectUserLanguage(rawQuestion);
      var isRtl = /^(ar|ur|fa|he)$/.test(userLang);

      /* 0. Handle conversational chat & greetings in ANY language immediately */
      var convReply = getConversationalReply(rawQuestion, userLang);
      if (convReply) {
        if (isRtl) convReply = '<div dir="rtl" style="text-align:right;">' + convReply + '</div>';
        appendMessage(convReply, false);
        return;
      }

      var parsed = normalizeQuery(rawQuestion);

      loadKnowledgeBase().then(function (kb) {
        /* 1. Try Instant Internal Corpus Search (<100ms) */
        var internalReply = searchInternalKB(parsed, kb);
        if (internalReply) {
          if (userLang === 'en' || userLang === 'ur-Latn') {
            localizeReplyForLanguage(internalReply, userLang).then(function (locHtml) {
              appendMessage(locHtml, false);
            });
            return;
          }
          /* For other world languages, localize internal Corpus answer into userLang (~400-800ms) */
          var trBubble = appendMessage(
            '<div class="cbot-typing"><span>Translating answer</span><span class="cbot-typing-dots"><i></i><i></i><i></i></span></div>',
            false
          );
          localizeReplyForLanguage(internalReply, userLang).then(function (locHtml) {
            if (trBubble && trBubble.parentNode) trBubble.parentNode.removeChild(trBubble);
            appendMessage(locHtml, false);
          });
          return;
        }

        /* 2. Not matched directly -> Show brief typing indicator, translate foreign query if needed, search KB + medical ref, and reply in userLang */
        var loadingBubble = appendMessage(
          '<div class="cbot-typing"><span>Searching medical reference</span><span class="cbot-typing-dots"><i></i><i></i><i></i></span></div>',
          false
        );

        var queryPromise = (userLang !== 'en' && userLang !== 'ur-Latn')
          ? translateText(rawQuestion, userLang, 'en')
          : Promise.resolve(rawQuestion);

        queryPromise.then(function (enQuestion) {
          /* Check if the translated foreign message was actually conversational small-talk */
          if (userLang !== 'en' && userLang !== 'ur-Latn') {
            var trConv = getConversationalReply(enQuestion, userLang);
            if (trConv) {
              if (loadingBubble && loadingBubble.parentNode) loadingBubble.parentNode.removeChild(loadingBubble);
              if (isRtl) trConv = '<div dir="rtl" style="text-align:right;">' + trConv + '</div>';
              appendMessage(trConv, false);
              return null;
            }
          }

          var enParsed = normalizeQuery(enQuestion);
          var kbMatchAfterTrans = (userLang !== 'en' && userLang !== 'ur-Latn') ? searchInternalKB(enParsed, kb) : null;
          if (kbMatchAfterTrans) {
            return localizeReplyForLanguage(kbMatchAfterTrans, userLang);
          }

          return searchExternalMedicalWeb(enParsed).then(function (externalReply) {
            if (!externalReply) return null;
            return localizeReplyForLanguage(externalReply, userLang);
          });
        }).then(function (finalReply) {
          if (finalReply === null && !loadingBubble.parentNode) return; /* already handled by trConv */
          if (loadingBubble && loadingBubble.parentNode) {
            loadingBubble.parentNode.removeChild(loadingBubble);
          }
          if (finalReply) {
            appendMessage(finalReply, false);
          } else {
            var fallbackEn = 'I am here to chat and help with human anatomy! 😊 Try asking me about any organ, bone, muscle, nerve, or body structure (e.g. Heart, Brain, Liver, Kidney, or Femur).';
            if (userLang === 'ur-Latn') {
              appendMessage(
                '<strong>Main aapki baat samajhne ki koshish kar rahi hoon! 😊</strong><br>' +
                'Aap mujh se human body ke kisi bhi organ, bone, muscle ya nerve ke baare mein pooch sakte hain (maslan: <b>Heart / Dil</b>, <b>Brain / Dimagh</b>, <b>Liver / Jigar</b>, <b>Kidney / Gurda</b>, ya <b>Femur</b>).',
                false
              );
            } else if (userLang === 'en') {
              appendMessage(
                '<strong>I’m here to chat and help with human anatomy! 😊</strong><br>' +
                'Try asking me about any organ, bone, muscle, nerve, or body structure (e.g. <b>Heart</b>, <b>Brain</b>, <b>Liver</b>, <b>Gallbladder</b>, <b>Sciatic nerve</b>, or <b>Femur</b>).',
                false
              );
            } else {
              translateText(fallbackEn, 'en', userLang).then(function (trFallback) {
                var dirAttr = isRtl ? ' dir="rtl" style="text-align:right;"' : '';
                appendMessage('<div' + dirAttr + '>' + escapeHtml(trFallback) + '</div>', false);
              });
            }
          }
        });
      });
    }

    /* Website complete open -> Show "Hi! Ask AI" for 3 seconds, then repeat every 30 seconds for 3 seconds! */
    setTimeout(function () {
      showBriefGreeting();
    }, 400);

    WAVE_TIMER = setInterval(function () {
      showBriefGreeting();
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBotWidget);
  } else {
    createBotWidget();
  }
})();
