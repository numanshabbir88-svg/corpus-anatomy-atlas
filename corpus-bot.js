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
    var baseEl = document.querySelector('base[href]');
    if (baseEl) {
      var bh = baseEl.getAttribute('href') || '/';
      if (bh === '/') return '/';
    }
    var scripts = document.querySelectorAll('script[src*="corpus-bot.js"]');
    if (scripts.length) {
      var src = scripts[scripts.length - 1].getAttribute('src') || '';
      var idx = src.indexOf('corpus-bot.js');
      if (idx > 0) return src.slice(0, idx);
    }
    var path = window.location.pathname || '/';
    if (/\/(learn|blog)\/[^/]+\//.test(path)) return '../../';
    if (/\/(learn|blog|privacy-policy)\/?$/.test(path) || /\/(learn|blog|privacy-policy)\/index\.html$/.test(path)) return '../';
    return '/';
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
    '심장': 'heart', '뇌': 'brain', '폐': 'lungs', '허파': 'lungs', '간': 'liver', '신장': 'kidney', '콩팥': 'kidney', '위': 'gut', '눈': 'eye', '귀': 'ear', '치아': 'dentition', '뼈': 'skeleton', '골격': 'skeleton', '두개골': 'skullface', '근육': 'muscle', '척수': 'spinalcord', '방광': 'bladder', '담낭': 'gallbladder', '췌장': 'pancreas', '비장': 'spleen', '피부': 'skin', '자궁': 'gynuterus',
    /* Microscopic, Cellular, Organelle & Minor Organ Synonyms + Common Student Typos */
    'mitochondrion': 'mitochondria',
    'mitocondria': 'mitochondria',
    'mitocondrion': 'mitochondria',
    'mithocondria': 'mitochondria',
    'powerhouse of the cell': 'mitochondria',
    'powerhouse of cell': 'mitochondria',
    'ribosomes': 'ribosome',
    'rybosome': 'ribosome',
    'rybosomes': 'ribosome',
    'rough er': 'endoplasmic reticulum',
    'smooth er': 'endoplasmic reticulum',
    'sarcoplasmic reticulum': 'endoplasmic reticulum',
    'endoplasmic': 'endoplasmic reticulum',
    'golgi body': 'golgi apparatus',
    'golgi complex': 'golgi apparatus',
    'golgi': 'golgi apparatus',
    'lysosomes': 'lysosome',
    'lyzosome': 'lysosome',
    'peroxisome': 'lysosome',
    'peroxisomes': 'lysosome',
    'sarcomeres': 'sarcomere',
    'haversian system': 'osteon',
    'haversian canal': 'osteon',
    'volkmann canal': 'osteon',
    'synaptic cleft': 'synapse',
    'motor end plate': 'neuromuscular junction',
    'nmj': 'neuromuscular junction',
    'blood-brain barrier': 'blood brain barrier',
    'bbb': 'blood brain barrier',
    'spiral organ': 'organ of corti',
    'jga': 'juxtaglomerular apparatus',
    'macula densa': 'juxtaglomerular apparatus',
    'smallest bone': 'stapes',
    'stirrup bone': 'stapes',
    'tactile corpuscle': 'meissner corpuscle',
    'meissners corpuscle': 'meissner corpuscle',
    'lamellar corpuscle': 'pacinian corpuscle',
    'golgi tendon organ': 'muscle spindle',
    'intestinal crypts': 'crypts of lieberkuhn',
    'crypt of lieberkuhn': 'crypts of lieberkuhn',
    'paneth cells': 'crypts of lieberkuhn',
    'brunners glands': 'brunner glands',
    'brunner gland': 'brunner glands',
    'carotid sinus': 'carotid body',
    'tarsal gland': 'meibomian gland',
    'tarsal glands': 'meibomian gland',
    'meibomian glands': 'meibomian gland',
    'greater vestibular gland': 'bartholin gland',
    'bartholins gland': 'bartholin gland',
    'bartholin glands': 'bartholin gland',
    'cowper gland': 'bulbourethral gland',
    'cowpers gland': 'bulbourethral gland',
    'cowper glands': 'bulbourethral gland',
    'bulbourethral glands': 'bulbourethral gland',
    'vermiform appendix': 'appendix',
    'apendix': 'appendix',
    'gallblader': 'gallbladder',
    'pineal': 'pineal gland',
    'pituitary': 'pituitary gland',
    'pituitery': 'pituitary gland',
    'hypophysis': 'pituitary gland',
    'adrenal': 'adrenal gland',
    'suprarenal gland': 'adrenal gland',
    'parathyroid gland': 'parathyroid',
    'parathyroid glands': 'parathyroid',
    'thymus gland': 'thymus',
    'windpipe': 'trachea',
    'gullet': 'esophagus',
    'oesophagus': 'esophagus',
    'esofagus': 'esophagus',
    'pancreatic islets': 'islets of langerhans',
    'alveoli': 'alveolus',
    'alvioli': 'alveolus',
    'air sacs': 'alveolus',
    'nephrons': 'nephron',
    'nodes of ranvier': 'myelin sheath and nodes',
    'node of ranvier': 'myelin sheath and nodes',
    'ranvier': 'myelin sheath and nodes',
    'schwann cell': 'myelin sheath and nodes',
    'schwann cells': 'myelin sheath and nodes'
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
    },
    'mitochondria': {
      title: 'Mitochondrion · Cellular Powerhouse',
      tag: 'Microscopic Cell Organelle',
      summary: 'Mitochondria are double-membrane-bound cytoplasmic organelles present in almost all eukaryotic human cells (especially abundant in cardiomyocytes, hepatocytes, and skeletal muscle fibers).',
      points: [
        ['Function', 'Generates the vast majority of cellular ATP via the citric acid (Krebs) cycle in the matrix and oxidative phosphorylation across the folded inner membrane (cristae).'],
        ['Unique Feature', 'Contains its own circular maternal mitochondrial DNA (mtDNA) and 70S-like ribosomes, and regulates intrinsic apoptosis via cytochrome c release.'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'ribosome': {
      title: 'Ribosome (80S Eukaryotic)',
      tag: 'Microscopic Cell Organelle',
      summary: 'Ribosomes are macromolecular ribonucleoprotein complexes composed of rRNA and proteins (40S small subunit + 60S large subunit) found free in the cytosol or bound to rough endoplasmic reticulum.',
      points: [
        ['Function', 'Translates messenger RNA (mRNA) codons into polypeptide chains (protein synthesis) using aminoacyl-tRNA.'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'endoplasmic reticulum': {
      title: 'Endoplasmic Reticulum (Rough & Smooth ER)',
      tag: 'Microscopic Cell Organelle',
      summary: 'An interconnected network of membrane-enclosed cisternae and tubules continuous with the outer nuclear membrane.',
      points: [
        ['Rough ER (RER)', 'Studded with ribosomes; synthesizes secreted, membrane-bound, and lysosomal proteins (N-linked glycosylation).'],
        ['Smooth ER (SER)', 'Synthesizes steroid hormones and lipids, detoxifies drugs via cytochrome P450 in hepatocytes, and sequesters calcium (as sarcoplasmic reticulum in muscle).'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'golgi apparatus': {
      title: 'Golgi Apparatus · Golgi Complex',
      tag: 'Microscopic Cell Organelle',
      summary: 'A stack of polarized, flattened membrane-bound cisternae (cis, medial, and trans-Golgi network) positioned near the cell nucleus and centrosome.',
      points: [
        ['Function', 'Modifies, sorts, and packages proteins and lipids received from the ER (O-linked glycosylation, mannose-6-phosphate tagging for lysosomes) into secretory or transport vesicles.'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'lysosome': {
      title: 'Lysosome',
      tag: 'Microscopic Cell Organelle',
      summary: 'Membrane-bound vesicular organelles containing over 50 acid hydrolase enzymes maintained at an acidic pH (~4.5–5.0) by vacuolar H+-ATPase pumps.',
      points: [
        ['Function', 'Degrades intracellular debris (autophagy), phagocytosed pathogens, and endocytosed macromolecules; genetic enzyme deficiencies cause lysosomal storage diseases (e.g., Tay-Sachs, Gaucher).'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'sarcomere': {
      title: 'Sarcomere · Contractile Unit of Muscle',
      tag: 'Microscopic Muscle Ultrastructure',
      summary: 'The sarcomere is the fundamental repeating microscopic contractile unit (~2.0–2.2 µm long) of striated skeletal and cardiac muscle myofibrils, spanning from one Z-disc to the next.',
      points: [
        ['Architecture', 'Composed of thick myosin filaments (A-band) interdigitating with thin actin filaments (I-band) anchored at Z-discs, stabilized by giant elastic titin and nebulin proteins.'],
        ['Mechanism', 'Calcium binding to troponin C shifts tropomyosin, allowing ATP-driven myosin head cross-bridge cycling that pulls actin filaments toward the M-line (sliding filament theory).'],
        ['chapterKey', 'muscle']
      ]
    },
    'osteon': {
      title: 'Osteon · Haversian System',
      tag: 'Microscopic Bone Unit',
      summary: 'The osteon (Haversian system) is the primary cylindrical microscopic structural unit of compact (cortical) bone, running parallel to the long axis of the bone shaft.',
      points: [
        ['Microanatomy', 'Consists of concentric calcified collagen lamellae surrounding a central Haversian canal (carrying blood vessels and nerves), interconnected transversely by Volkmann’s canals.'],
        ['Cells', 'Osteocytes reside in small cavities (lacunae) and exchange nutrients through microscopic cytoplasmic channels called canaliculi.'],
        ['chapterKey', 'skeleton']
      ]
    },
    'synapse': {
      title: 'Synapse · Chemical & Electrical Junction',
      tag: 'Microscopic Neuroanatomy',
      summary: 'A specialized microscopic junction (~20–40 nm synaptic cleft) through which a presynaptic neuron transmits electrical or chemical signals to a postsynaptic neuron, muscle, or gland cell.',
      points: [
        ['Mechanism', 'Action potentials open presynaptic voltage-gated Ca2+ channels, triggering SNARE-mediated exocytosis of neurotransmitter vesicles (glutamate, GABA, acetylcholine, dopamine) across the cleft.'],
        ['chapterKey', 'nervous']
      ]
    },
    'neuromuscular junction': {
      title: 'Neuromuscular Junction (NMJ) · Motor End Plate',
      tag: 'Microscopic Nerve–Muscle Synapse',
      summary: 'The specialized chemical synapse between the axon terminal of an alpha motor neuron and the folded sarcolemma (motor end plate) of a skeletal muscle fiber.',
      points: [
        ['Function', 'Presynaptic release of acetylcholine (ACh) activates nicotinic ACh receptors on junctional folds, generating an end-plate potential that triggers muscle contraction; ACh is rapidly cleared by acetylcholinesterase.'],
        ['Clinical Note', 'Autoantibodies against postsynaptic nicotinic receptors cause Myasthenia Gravis, whereas antibodies against presynaptic Ca2+ channels cause Lambert-Eaton syndrome.'],
        ['chapterKey', 'muscle']
      ]
    },
    'blood brain barrier': {
      title: 'Blood–Brain Barrier (BBB)',
      tag: 'Microscopic Neurovascular Barrier',
      summary: 'A highly selective microscopic permeability barrier separating circulating blood from the brain extracellular fluid in the central nervous system.',
      points: [
        ['Structure', 'Formed by non-fenestrated cerebral capillary endothelial cells joined by continuous tight junctions (zona occludens), a shared basement membrane, pericytes, and astrocyte perivascular end-feet.'],
        ['Function', 'Protects neural tissue from toxins and pathogens while allowing lipid-soluble molecules (O2, CO2) and carrier-mediated transport of glucose (GLUT1) and amino acids.'],
        ['chapterKey', 'meningescsf']
      ]
    },
    'organ of corti': {
      title: 'Organ of Corti · Spiral Organ',
      tag: 'Microscopic Auditory Receptor',
      summary: 'The organ of Corti is the microscopic sensory epithelium of hearing resting on the basilar membrane inside the cochlear duct (scala media) of the inner ear.',
      points: [
        ['Microanatomy', 'Contains one row of inner hair cells (~3,500) and three rows of outer hair cells (~12,000) whose apical stereocilia project toward the overlying gelatinous tectorial membrane.'],
        ['Function', 'Fluid waves bend stereocilia, opening mechanically gated K+ channels to transduce sound vibrations into neural signals carried by the cochlear nerve (CN VIII).'],
        ['chapterKey', 'ear']
      ]
    },
    'juxtaglomerular apparatus': {
      title: 'Juxtaglomerular Apparatus (JGA)',
      tag: 'Microscopic Renal Endocrine Unit',
      summary: 'A microscopic specialized structure at the vascular pole of the nephron where the distal convoluted tubule contacts the afferent and efferent arterioles.',
      points: [
        ['Components', 'Composed of macula densa cells (NaCl sensors in the distal tubule), juxtaglomerular granular cells (modified smooth muscle in the afferent arteriole that secrete renin), and extraglomerular mesangial (Lacis) cells.'],
        ['Function', 'Regulates glomerular filtration rate (tubuloglomerular feedback) and systemic blood pressure via the renin–angiotensin–aldosterone system (RAAS).'],
        ['chapterKey', 'nephron']
      ]
    },
    'stapes': {
      title: 'Stapes (Stirrup) · Smallest Human Bone',
      tag: 'Microscopic Middle Ear Ossicle',
      summary: 'The stapes is the smallest and lightest bone in the human body (~3 × 2.5 mm), located in the middle ear cavity between the incus and the oval window (fenestra vestibuli).',
      points: [
        ['Anatomy', 'Consists of a head (articulating with the lenticular process of the incus), neck, anterior and posterior crura, and a flat footplate sealed into the oval window by the annular ligament.'],
        ['Function', 'Transmits acoustic vibrations into the fluid-filled cochlea; stabilized against loud sounds by the tiny stapedius muscle (innervated by CN VII).'],
        ['chapterKey', 'ear']
      ]
    },
    'meissner corpuscle': {
      title: 'Meissner’s Corpuscle · Tactile Corpuscle',
      tag: 'Microscopic Cutaneous Mechanoreceptor',
      summary: 'Encapsulated, rapidly adapting mechanoreceptors located in the dermal papillae of glabrous (hairless) skin, especially dense in fingertips, palms, lips, and eyelids.',
      points: [
        ['Function', 'Detects light touch, low-frequency vibration (10–50 Hz), and dynamic slip/texture for fine two-point discrimination.'],
        ['chapterKey', 'skinlayers']
      ]
    },
    'pacinian corpuscle': {
      title: 'Pacinian Corpuscle · Lamellar Corpuscle',
      tag: 'Microscopic Deep Mechanoreceptor',
      summary: 'Large oval encapsulated mechanoreceptors with concentric onion-like Schwann-cell lamellae located in the deep dermis, hypodermis, periosteum, mesentery, and pancreas.',
      points: [
        ['Function', 'Rapidly adapting receptor that senses deep pressure and high-frequency vibration (60–400 Hz).'],
        ['chapterKey', 'skinlayers']
      ]
    },
    'muscle spindle': {
      title: 'Muscle Spindle & Golgi Tendon Organ',
      tag: 'Microscopic Proprioceptors',
      summary: 'Microscopic encapsulated sensory receptors embedded within skeletal muscles (muscle spindles) and myotendinous junctions (Golgi tendon organs).',
      points: [
        ['Muscle Spindle', 'Intrafusal fibers (nuclear bag and chain) innervated by Ia/II sensory and gamma motor neurons; detects muscle length and rate of stretch (mediates the myotatic stretch reflex).'],
        ['Golgi Tendon Organ (GTO)', 'In series with collagen fibers at tendon junctions (Ib afferent fibers); senses muscle tension and prevents overload via the inverse stretch reflex.'],
        ['chapterKey', 'muscle']
      ]
    },
    'crypts of lieberkuhn': {
      title: 'Crypts of Lieberkühn · Intestinal Glands',
      tag: 'Microscopic Mucosal Glands',
      summary: 'Tubular microscopic glands invaginating into the lamina propria at the base of the intestinal villi throughout the small and large intestines.',
      points: [
        ['Cell Types', 'Lined by intestinal stem cells (renewing epithelium every 4–5 days), antimicrobial Paneth cells (secreting lysozyme and defensins at the crypt base), mucus goblet cells, and hormone-secreting enteroendocrine cells.'],
        ['chapterKey', 'intestinalwall']
      ]
    },
    'brunner glands': {
      title: 'Brunner’s Glands · Duodenal Submucosal Glands',
      tag: 'Microscopic Digestive Glands',
      summary: 'Compound tubular mucinous glands located specifically in the submucosa of the proximal duodenum (above the hepatopancreatic ampulla).',
      points: [
        ['Function', 'Secrete alkaline, bicarbonate-rich mucus (pH 8.1–9.3) and urogastrone (EGF) to neutralize acidic gastric chyme entering from the stomach and protect the duodenal mucosa.'],
        ['chapterKey', 'intestinalwall']
      ]
    },
    'carotid body': {
      title: 'Carotid Body & Carotid Sinus',
      tag: 'Microscopic Chemoreceptor & Baroreceptor',
      summary: 'Specialized microscopic neurovascular sensory organs situated at the bifurcation of the common carotid artery into the internal and external carotid arteries.',
      points: [
        ['Carotid Body', 'Cluster of glomus (Type I) chemoreceptor cells innervated by CN IX (glossopharyngeal nerve) that senses drops in arterial PO2, rises in PCO2, and low pH to drive ventilation.'],
        ['Carotid Sinus', 'Dilated baroreceptor zone in the proximal internal carotid artery wall that senses arterial blood pressure stretch to regulate heart rate and vascular tone.'],
        ['chapterKey', 'vascular']
      ]
    },
    'interstitium': {
      title: 'The Interstitium · Fluid-Filled Tissue Spaces',
      tag: 'Microscopic Connective & Fluid Network',
      summary: 'A contiguous microscopic network of fluid-filled spaces supported by a lattice of thick collagen bundles and elastin fibers located beneath epithelial surfaces, submucosa, dermis, and perivascular fascia.',
      points: [
        ['Function', 'Acts as a compressible mechanical shock absorber for pulsating organs and serves as the primary pre-lymphatic highway draining interstitial fluid into lymphatic capillaries.'],
        ['chapterKey', 'tissuefoundations']
      ]
    },
    'mesentery': {
      title: 'Mesentery · Peritoneal Organ',
      tag: 'Abdominal & Peritoneal Anatomy',
      summary: 'A continuous double fold of peritoneum that attaches the jejunum, ileum, and colon to the posterior abdominal wall while housing their blood vessels, lymphatics, and autonomic nerves.',
      points: [
        ['Function', 'Suspends and stabilizes the intestinal tract while allowing peristaltic mobility, and serves as a major conduit for the superior and inferior mesenteric vessels and mesenteric lymph nodes.'],
        ['chapterKey', 'gut']
      ]
    },
    'meibomian gland': {
      title: 'Meibomian Glands · Tarsal Glands',
      tag: 'Microscopic Ocular Glands',
      summary: 'Specialized holocrine sebaceous glands arranged vertically within the superior (~25–40) and inferior (~20–30) tarsal plates of the eyelids.',
      points: [
        ['Function', 'Secrete meibum (the lipid outer layer of the tear film) onto the eyelid margin to prevent tear evaporation and lubricate the corneal surface; obstruction causes a chalazion.'],
        ['chapterKey', 'eye']
      ]
    },
    'bartholin gland': {
      title: 'Bartholin’s Glands · Greater Vestibular Glands',
      tag: 'Female Perineal Glands',
      summary: 'Pea-sized paired tubuloalveolar mucinous glands located in the superficial perineal pouch at the 4 and 8 o’clock positions posterolateral to the vaginal orifice.',
      points: [
        ['Function', 'Homologous to male bulbourethral (Cowper’s) glands; secrete mucus into the vaginal vestibule for lubrication.'],
        ['chapterKey', 'gynvulva']
      ]
    },
    'bulbourethral gland': {
      title: 'Bulbourethral Glands · Cowper’s Glands',
      tag: 'Male Accessory Reproductive Glands',
      summary: 'Paired pea-sized compound tubuloalveolar glands situated within the deep perineal pouch posterolateral to the membranous urethra, draining into the proximal spongy urethra.',
      points: [
        ['Function', 'Secrete clear alkaline mucoid fluid prior to ejaculation that neutralizes residual urinary acidity in the urethra and provides lubrication.'],
        ['chapterKey', 'male']
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
      'en': 'I am ready to help you study human anatomy, organ physiology, and clinical landmarks.',
      'ur-Latn': 'Main aapki human anatomy, physiology aur clinical study mein madad ke liye hazir hoon.',
      'ur': 'میں انسانی اناٹومی، فزیالوجی اور طبی مطالعے میں آپ کی مدد کے لیے حاضر ہوں۔',
      'ar': 'أنا جاهزة لمساعدتك في دراسة تشريح جسم الإنسان ووظائف الأعضاء.',
      'hi': 'मैं मानव शरीर रचना और शरीर क्रिया विज्ञान के अध्ययन में आपकी सहायता के लिए तैयार हूँ।',
      'es': 'Estoy lista para ayudarte a estudiar la anatomía y fisiología humana.',
      'fr': 'Je suis prête à vous aider à étudier l’anatomie et la physiologie humaines.',
      'de': 'Ich bin bereit, dir beim Studium der menschlichen Anatomie und Physiologie zu helfen.',
      'tr': 'İnsan anatomisi ve fizyolojisi çalışmalarınızda size yardımcı olmaya hazırım.',
      'ru': 'Я готова помочь вам в изучении анатомии и физиологии человека.',
      'zh-CN': '我随时准备帮助您学习人体解剖学与生理学。'
    },
    whoAreYou: {
      'en': 'I am Corpus AI Assistant — your interactive human anatomy & physiology study reference covering 74 chapters, 1,586 documented structures, 206 bones, and 312 muscles.',
      'ur-Latn': 'Main Corpus AI Assistant hoon — Corpus Human Anatomy Atlas ki interactive study assistant (74 chapters, 1,586 structures, 206 bones aur 312 muscles).',
      'ur': 'میں Corpus AI Assistant ہوں — انسانی اناٹومی اٹلس کی تعلیمی گائیڈ (74 ابواب، 1,586 ساختیں، 206 ہڈیاں اور 312 پٹھے)۔',
      'ar': 'أنا مساعد Corpus التشريحي — مرجعك التفاعلي لدراسة تشريح جسم الإنسان عبر 74 فصلاً و1,586 تركيباً تشريحياً و206 عظمة و312 عضلة.',
      'hi': 'मैं Corpus AI Assistant हूँ — 74 अध्यायों, 1,586 संरचनाओं, 206 हड्डियों और 312 मांसपेशियों को कवर करने वाली मानव शरीर रचना अध्ययन सहायक।',
      'es': 'Soy Corpus AI Assistant — tu referencia interactiva de anatomía humana con 74 capítulos, 1.586 estructuras, 206 huesos y 312 músculos.',
      'fr': 'Je suis Corpus AI Assistant — votre référence interactive d’anatomie humaine couvrant 74 chapitres, 1 586 structures, 206 os et 312 muscles.',
      'de': 'Ich bin der Corpus AI Assistant — dein interaktiver Studienbegleiter durch die menschliche Anatomie mit 74 Kapiteln, 1.586 Strukturen, 206 Knochen und 312 Muskeln.',
      'pt': 'Sou a Corpus AI Assistant — sua referência interativa de anatomia humana com 74 capítulos, 1.586 estruturas, 206 ossos e 312 músculos.',
      'tr': 'Ben Corpus AI Asistanıyım — 74 bölüm, 1.586 yapı, 206 kemik ve 312 kas içeren insan anatomisi çalışma rehberiniz.',
      'id': 'Saya Corpus AI Assistant — referensi studi interaktif anatomi manusia yang mencakup 74 bab, 1.586 struktur, 206 tulang, dan 312 otot.',
      'ru': 'Я Corpus AI Assistant — ваш интерактивный справочник по анатомии человека (74 главы, 1 586 структур, 206 костей и 312 мышц).',
      'zh-CN': '我是 Corpus AI 助手——您的人体解剖学学习参考指南，涵盖 74 个章节、1,586 个解剖结构、206 块骨骼和 312 块肌肉。',
      'ja': '私は Corpus AI アシスタントです。74の章、1,586の構造、206個の骨、312個の筋肉を網羅する人体解剖学リファレンスです。',
      'ko': '저는 Corpus AI 어시스턴트입니다 — 74개 챕터, 1,586개 해부학 구조, 206개 뼈, 312개 근육을 다루는 인체 해부학 학습 가이드입니다.'
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

    /* 11. Short Numerals, Card/Game Names & Non-Anatomical Conversational Tokens Guard (Fixes "uno" / "one" / "1" false positives) */
    if (/^(uno|dos|tres|cuatro|cinco|one|two|three|four|five|six|seven|eight|nine|ten|ek|do|teen|char|panch|un|deux|trois|eins|zwei|drei|bir|iki|satu|dua|واحد|اثنان|ایک|دو|एक|दो|[0-9]{1,3}|test|testing|hello test|check|checking|lol|haha|hehe|bro|sis|sir|madam|mam|yo|hmm+|uh+|um+)$/.test(q)) {
      if (lang === 'ur-Latn') {
        return '<strong>Ji farmayein!</strong> Aap human body ke kisi bhi organ, structure, bone, muscle ya nerve ka naam likhein (maslan: <b>Heart</b>, <b>Left Ventricle</b>, <b>Nephron</b>, <b>Cranial Nerves</b>, ya <b>Femur</b>) — main aapko labeled anatomical diagram aur assignment-level detail faraham karungi.';
      }
      return '<strong>Ready when you are.</strong> Enter any human organ, anatomical structure, bone, muscle, or nerve (for example: <b>Heart</b>, <b>Left Ventricle</b>, <b>Nephron</b>, <b>Brachial Plexus</b>, or <b>Femur</b>) for an illustrated diagram and complete study breakdown.';
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
          var pFile = ((o.photo && o.photo.file) || 'heart.jpg').replace(/\.(jpe?g|png|webp)$/i, '.webp');
          var hotMap = (o.photo && o.photo.hot) || {};
          var pMap = o.parts || {};
          var topArr = Object.keys(pMap).slice(0, 8).map(function (pid) {
            return { id: pid, n: pMap[pid].n || '', l: pMap[pid].l || '' };
          });
          chapters.push({
            k: key, slug: (window.SEO_SLUGS && window.SEO_SLUGS[key]) || key,
            t: o.title || '', l: o.latin || '', s: sysName,
            r: o.region || '', b: o.blood || '', n: o.nerve || '',
            bl: o.blurb || '', sum: o.summary || '',
            ov: Array.isArray(o.overview) ? o.overview : [o.summary || ''],
            img: 'img/webp/' + pFile, top: topArr
          });
          Object.keys(pMap).forEach(function (pid) {
            var p = pMap[pid];
            parts.push({
              ck: key, slug: (window.SEO_SLUGS && window.SEO_SLUGS[key]) || key,
              ct: o.title || '', cl: o.latin || '', sys: sysName,
              reg: o.region || '', bld: o.blood || '', nrv: o.nerve || '',
              id: pid, n: p.n || '', l: p.l || '', d: p.d || '', f: p.f || '', c: p.c || '',
              img: 'img/webp/' + pFile,
              hot: Array.isArray(hotMap[pid]) ? hotMap[pid] : null
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
      var hSlug = hash.slice(2).split('/')[0].split('?')[0];
      if (hSlug === 'maleoverview') hSlug = 'male';
      if (hSlug === 'femaleoverview') hSlug = 'female';
      if (window.SLUG_TO_KEY && window.SLUG_TO_KEY[hSlug]) return window.SLUG_TO_KEY[hSlug];
      if (hSlug && !/^(map|organs|quiz|deep|explorer|systems|gyn)$/.test(hSlug)) {
        return hSlug;
      }
    }
    var path = (window.location.pathname || '').replace(/\/index\.html$/i, '/');
    var m = path.match(/\/learn\/([^/]+)\/?/);
    if (m && m[1]) {
      return (window.SLUG_TO_KEY && window.SLUG_TO_KEY[m[1]]) || m[1];
    }
    var seg = path.split('/').filter(Boolean);
    if (seg.length === 1) {
      var s0 = seg[0];
      if (window.SLUG_TO_KEY && window.SLUG_TO_KEY[s0]) return window.SLUG_TO_KEY[s0];
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
    /* Image / Visual Generation & Display Stop Words */
    'show', 'with', 'image', 'images', 'picture', 'pictures', 'photo', 'photos', 'pic', 'pics',
    'diagram', 'diagrams', 'illustration', 'draw', 'generate', 'create', 'display', 'view', 'visual',
    'tasveer', 'tasvir', 'fotu', 'dikhao', 'dekhao', 'dikha', 'banao', 'imagen', 'foto', 'bild',
    'صورة', 'تصویر', 'رسم', 'चित्र', 'तस्वीर', 'दिखाओ',
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

    /* Classify the communicative task separately from the anatomy topic. */
    var intent = {
      wantsFunction: /\b(function|functions|role|what does|how does|work|works|kaam|kam|karta|funciona|función|fonctionne|funktioniert|fungsi|وظيفة|يعمل|کام|काम)\b/.test(q),
      wantsLocation: /\b(where|location|located|region|position|situated|kahan|kaha|kidhar|dónde|donde|où|wo|nerede|dimana|где|أين|کہاں)\b/.test(q),
      wantsClinical: /\b(clinical|disease|disorder|injury|damage|pain|pathology|fracture|bimari|masla|symptom|مرض|بیماری|बीमारी)\b/.test(q),
      wantsSupply: /\b(blood|artery|vein|supply|nerve|innervation|khoon|sangre|sang|blut|خون|دم|रक्त)\b/.test(q),
      wantsCurrentChapter: /\b(this chapter|current chapter|this page|this organ|is chapter|is page)\b/.test(q),
      wantsImage: /\b(image|images|picture|pictures|photo|photos|pic|pics|diagram|diagrams|illustration|draw|generate|visual|tasveer|tasvir|fotu|dikhao|dekhao|dikha|show|imagen|foto|bild|صورة|تصویر|رسم|चित्र|तस्वीर|दिखाओ)\b/.test(q),
      wantsComparison: /\b(compare|comparison|difference|different|versus|vs|contrast|farq|muqabla)\b/.test(q),
      wantsExamples: /\b(example|examples|such as|like|misal|misalen)\b/.test(q),
      wantsClassification: /\b(types|kinds|classification|classify|categories|classes)\b/.test(q),
      wantsProcess: /\b(process|mechanism|cycle|pathway|how does|how do|kaise|kaisay)\b/.test(q),
      wantsDefinition: /\b(what is|what are|define|definition|meaning|kya hota|kia hota)\b/.test(q),
      wantsAnatomy: /\b(structure|anatomy|anatomical|parts|layers|composition|made of|bana hota)\b/.test(q),
      wantsRelationship: /\b(connect|connected|relationship|related|attach|attachment|between|link)\b/.test(q),
      wantsBroad: /\b(system|overview|generally|in general|tell me about|broad|all about|major)\b/.test(q),
      wantsSpecific: false,
      wantsMultiPart: /\b(and|also|plus|as well as)\b/.test(q),
      wantsFollowUp: /\b(it|its|they|their|them|this|that|these|those|his|her|uska|iski|iske|ye|woh)\b/.test(q)
    };
    intent.type = intent.wantsComparison ? 'comparison' : intent.wantsClinical ? 'clinical' : intent.wantsExamples ? 'examples' : intent.wantsClassification ? 'classification' : intent.wantsProcess ? 'process' : intent.wantsLocation ? 'location' : intent.wantsFunction ? 'function' : intent.wantsSupply ? 'relationship' : intent.wantsAnatomy ? 'anatomy' : intent.wantsDefinition ? 'definition' : 'general';

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
    }).map(function (w) {
      if (w.length > 5 && w.slice(-3) === 'ies') return w.slice(0, -3) + 'y';
      if (w.length > 4 && w.slice(-2) === 'es') return w.slice(0, -2);
      if (w.length > 4 && w.slice(-1) === 's' && w.slice(-2) !== 'ss') return w.slice(0, -1);
      return w;
    });

    /* If all words were stop words (e.g. "what does it do"), keep original tokens */
    if (!tokens.length) {
      tokens = q.split(' ').filter(Boolean);
    }
    intent.wantsSpecific = !intent.wantsBroad && tokens.length <= 5 && !intent.wantsClassification;

    var corePhrase = tokens.join(' ').trim();
    return {
      raw: raw,
      clean: q,
      corePhrase: corePhrase,
      tokens: tokens,
      intent: intent,
      specificity: intent.wantsBroad ? 'broad' : 'specific'
    };
  }

  function truncateSentences(text, maxSentences) {
    var s = String(text || '').trim();
    if (!s) return '';
    var parts = s.match(/[^.!?]+[.!?]+/g);
    if (!parts || parts.length <= maxSentences) return s;
    return parts.slice(0, maxSentences).join(' ').trim();
  }

  var CBOT_SEO_SLUGS = {"anatomicallanguage":"anatomical-planes-and-directions","bodyregions":"body-cavities-and-regions","tissuefoundations":"cells-and-four-tissues","spermanatomy":"sperm-cell-anatomy","oocyteanatomy":"egg-cell-anatomy","fertilization":"human-fertilization","cleavageblastocyst":"cleavage-and-blastocyst","implantation":"blastocyst-implantation","placentaanatomy":"placenta-anatomy","embryodevelopment":"embryonic-development","fetaldevelopment":"fetal-development","laborfirststage":"first-stage-of-labor","laborsecondstage":"second-stage-of-labor","laborthirdstage":"third-stage-of-labor","heart":"heart-anatomy","lungs":"lung-anatomy","brain":"brain-anatomy","kidney":"kidney-anatomy","liver":"liver-anatomy","gut":"digestive-tract-anatomy","eye":"eye-anatomy","ear":"ear-anatomy","pancreas":"pancreas-anatomy","spleen":"spleen-anatomy","thyroid":"thyroid-and-parathyroid","bladder":"urinary-bladder-anatomy","skin":"skin-anatomy","spinalcord":"spinal-cord-anatomy","male":"male-reproductive-system","female":"female-reproductive-system","malebody":"male-surface-anatomy","femalebody":"female-surface-anatomy","nervous":"nervous-system-anatomy","nervousmale":"male-nervous-system","nervousfemale":"female-nervous-system","cranialnerves":"cranial-nerves-anatomy","autonomic":"autonomic-nervous-system","breast":"breast-anatomy","skeleton":"human-skeleton-anatomy","muscle":"muscular-system-anatomy","lymph":"lymphatic-system-anatomy","vascular":"vascular-system-anatomy","endocrine":"endocrine-system-anatomy","joints":"joint-classification","shoulder":"shoulder-joint-anatomy","larynx":"upper-airway-and-larynx","marrow":"bone-marrow-anatomy","malepelvis":"male-pelvis-anatomy","femalepelvis":"female-pelvis-anatomy","gynuterus":"uterus-anatomy","gyncervix":"cervix-anatomy","gynadnexa":"ovaries-and-fallopian-tubes","gynvagina":"vagina-anatomy","gynvulva":"vulva-anatomy","gynsupport":"pelvic-floor-and-ligaments","maletestis":"testis-and-epididymis","maleprostate":"prostate-gland-anatomy","clitoralcomplex":"clitoral-complex-anatomy","penileerectile":"penile-erectile-anatomy","skinlayers":"skin-layers-microanatomy","facialnerve":"facial-nerve-anatomy","trigeminalnerve":"trigeminal-nerve-anatomy","eyeanatomy":"eye-layers-and-chambers","retina":"retina-anatomy","nephron":"nephron-anatomy","brachialplexus":"brachial-plexus-anatomy","cerebraldeep":"cerebral-cortex-and-basal-ganglia","meningescsf":"meninges-and-cerebrospinal-fluid","brainstemdeep":"brainstem-and-cerebellum","pulmonaryacinus":"pulmonary-acinus-and-alveoli","hepaticlobule":"hepatic-lobule-anatomy","intestinalwall":"small-intestine-wall-anatomy","skullface":"skull-and-facial-bones","dentition":"tooth-anatomy-guide"};
  function buildNavButtons(chapterKey, partId) {
    if (!chapterKey) return '';
    var seoSlug = (window.SEO_SLUGS && window.SEO_SLUGS[chapterKey]) || CBOT_SEO_SLUGS[chapterKey] || chapterKey;
    var atlasHref = '/' + seoSlug + '/';
    var guideHref = '/learn/' + seoSlug + '/' + (partId ? '#part-' + partId : '');
    return (
      '<div class="cbot-nav-actions">' +
        '<a class="cbot-nav-btn" href="' + escapeHtml(atlasHref) + '" data-cbot-nav="' + escapeHtml(atlasHref) + '">Interactive Atlas ↗</a>' +
        '<a class="cbot-nav-btn" href="' + escapeHtml(guideHref) + '">Study Guide →</a>' +
      '</div>'
    );
  }

  /* ---------- 6b. Visual Anatomy Image Card, Target Callout Overlay & Labeled Diagram Generator ---------- */
  var EXTRA_REF_IMG_MAP = {
    'gallbladder': { img: 'img/webp/liver.webp' },
    'appendix': { img: 'img/webp/intestinal-wall-deep.webp' },
    'pineal gland': { img: 'img/webp/endocrine.webp' },
    'pituitary gland': { img: 'img/webp/endocrine.webp' },
    'thymus': { img: 'img/webp/lymph.webp' },
    'parathyroid': { img: 'img/webp/thyroid-follicle-closeup.webp' },
    'epiglottis': { img: 'img/webp/larynx.webp' },
    'trachea': { img: 'img/webp/lungs.webp' },
    'esophagus': { img: 'img/webp/gut.webp' },
    'duodenum': { img: 'img/webp/intestinal-wall-deep.webp' },
    'vagus nerve': { img: 'img/webp/cranial.webp' },
    'sciatic nerve': { img: 'img/webp/nervous.webp' },
    'circle of willis': { img: 'img/webp/vascular.webp' },
    'femur': { img: 'img/webp/skeleton.webp' },
    'islets of langerhans': { img: 'img/webp/pancreas-micro-closeup.webp' },
    'peyer patches': { img: 'img/webp/intestinal-wall-deep.webp' },
    'bundle of his': { img: 'img/webp/cardiac-conduction-system.webp' },
    'adrenal gland': { img: 'img/webp/endocrine.webp' },
    'mitochondria': { img: 'img/webp/foundation-cell-organelles.webp' },
    'ribosome': { img: 'img/webp/foundation-cell-organelles.webp' },
    'endoplasmic reticulum': { img: 'img/webp/foundation-cell-organelles.webp' },
    'golgi apparatus': { img: 'img/webp/foundation-cell-organelles.webp' },
    'lysosome': { img: 'img/webp/foundation-cell-organelles.webp' },
    'sarcomere': { img: 'img/webp/foundation-skeletal-muscle.webp' },
    'osteon': { img: 'img/webp/skeleton.webp' },
    'synapse': { img: 'img/webp/foundation-neural.webp' },
    'neuromuscular junction': { img: 'img/webp/foundation-skeletal-muscle.webp' },
    'blood brain barrier': { img: 'img/webp/meninges-csf.webp' },
    'organ of corti': { img: 'img/webp/cochlea-organ-corti-closeup.webp' },
    'juxtaglomerular apparatus': { img: 'img/webp/nephron-deep.webp' },
    'stapes': { img: 'img/webp/ear.webp' },
    'meissner corpuscle': { img: 'img/webp/skin-layers-deep.webp' },
    'pacinian corpuscle': { img: 'img/webp/skin-layers-deep.webp' },
    'muscle spindle': { img: 'img/webp/foundation-skeletal-muscle.webp' },
    'crypts of lieberkuhn': { img: 'img/webp/intestinal-wall-deep.webp' },
    'brunner glands': { img: 'img/webp/intestinal-wall-deep.webp' },
    'carotid body': { img: 'img/webp/vascular.webp' },
    'interstitium': { img: 'img/webp/foundation-connective.webp' },
    'mesentery': { img: 'img/webp/gut.webp' },
    'meibomian gland': { img: 'img/webp/eye-layers-deep.webp' },
    'bartholin gland': { img: 'img/webp/vulva-surface-clean.webp' },
    'bulbourethral gland': { img: 'img/webp/male-prostate-detail.webp' }
  };

  function buildPinOverlaySvg(hotCoords, labelText) {
    if (!Array.isArray(hotCoords) || hotCoords.length < 2) return '';
    var hx = Number(hotCoords[0]) || 500;
    var hy = Number(hotCoords[1]) || 500;
    var cleanLbl = String(labelText || '').split('·')[0].trim().slice(0, 26).replace(/[<>&"']/g, '');
    var bx = hx < 500 ? Math.min(820, hx + 170) : Math.max(180, hx - 170);
    var by = hy < 260 ? Math.min(860, hy + 150) : Math.max(110, hy - 140);
    return (
      '<svg class="cbot-pin-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" data-hx="' + hx + '" data-hy="' + hy + '" data-lbl="' + escapeHtml(cleanLbl) + '">' +
        '<line x1="' + hx + '" y1="' + hy + '" x2="' + bx + '" y2="' + by + '" stroke="#ff5a5f" stroke-width="6" stroke-linecap="round"/>' +
        '<circle class="cbot-pin-pulse" cx="' + hx + '" cy="' + hy + '" r="34" fill="rgba(255,90,95,0.28)" stroke="#ff5a5f" stroke-width="5"/>' +
        '<circle cx="' + hx + '" cy="' + hy + '" r="13" fill="#ff5a5f" stroke="#ffffff" stroke-width="5"/>' +
        '<rect x="' + (bx - 165) + '" y="' + (by - 34) + '" width="330" height="64" rx="14" fill="rgba(9,24,23,0.92)" stroke="#6ee7b7" stroke-width="4"/>' +
        '<text x="' + bx + '" y="' + (by + 9) + '" text-anchor="middle" fill="#ecfdf5" font-family="system-ui,sans-serif" font-size="36" font-weight="800">' + cleanLbl + '</text>' +
      '</svg>'
    );
  }

  function buildMediaCard(rawImgSrc, title, hotCoords) {
    /* Pilot policy: bot visuals must be existing local Atlas assets, never generated or hotlinked. */
    var sourcePath = String(rawImgSrc || '').trim().replace(/^\.?\//, '').replace(/^\/+/, '');
    if (!sourcePath || /^(https?:|data:|blob:)/i.test(sourcePath) || !/^img\/(webp|medium|thumb)\//i.test(sourcePath)) {
      return '';
    }
    var resolvedSrc = ROOT_PREFIX + sourcePath;
    /* Use a generated medium preview when available, with the original reviewed Atlas image as fallback. */
    var displaySrc = resolvedSrc.replace('img/webp/', 'img/medium/');
    if (displaySrc !== resolvedSrc && displaySrc.indexOf('?') === -1) displaySrc += '?v=1';
    var shortTitle = String(title || 'Anatomy Plate').split('·')[0].trim();
    var cardClass = 'cbot-media-card is-featured';
    var pinSvg = buildPinOverlaySvg(hotCoords, shortTitle);
    var hotAttr = (Array.isArray(hotCoords) && hotCoords.length >= 2)
      ? ' data-cbot-hx="' + Number(hotCoords[0]) + '" data-cbot-hy="' + Number(hotCoords[1]) + '"'
      : '';
    return (
      '<div class="' + cardClass + '" data-cbot-zoom-src="' + escapeHtml(resolvedSrc) + '" data-cbot-zoom-title="' + escapeHtml(title || shortTitle) + '"' + hotAttr + '>' +
        '<div class="cbot-media-stage">' +
          '<img class="cbot-media-img" src="' + escapeHtml(displaySrc) + '" alt="' + escapeHtml(shortTitle) + ' anatomy illustration" width="320" height="180" loading="lazy" />' +
          pinSvg +
        '</div>' +
        '<div class="cbot-media-cap">' +
          '<span>🔬 ' + escapeHtml(shortTitle) + (Array.isArray(hotCoords) ? ' (Pinpointed)' : '') + '</span>' +
          '<span class="cbot-media-zoom">🔍 Tap to enlarge</span>' +
        '</div>' +
      '</div>'
    );
  }

  function buildStudyToolbar() {
    return (
      '<div class="cbot-tool-row">' +
        '<button type="button" class="cbot-tool-btn" data-cbot-copy="1" title="Copy structured study notes for your assignment">📋 Copy Study Notes</button>' +
      '</div>'
    );
  }

  /* Strict word-boundary token matcher so short words ("uno", "one", "art") never match inside unrelated words */
  function escapeRegexToken(str) {
    return String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function hasWordToken(haystack, token) {
    if (!haystack || !token) return false;
    var h = String(haystack).toLowerCase();
    var t = String(token).toLowerCase().trim();
    if (t.length < 2) return false;
    var re = new RegExp('(^|[\\s\\-·(),/:;])' + escapeRegexToken(t) + '(s|es)?([\\s\\-·(),/:;]|$)', 'i');
    if (re.test(h)) return true;
    /* Allow prefix match on multi-syllable anatomical roots >= 5 chars (e.g. "ventric" -> "ventricle") */
    if (t.length >= 5) {
      var prefRe = new RegExp('(^|[\\s\\-·(),/:;])' + escapeRegexToken(t), 'i');
      if (prefRe.test(h)) return true;
      /* One-character spelling slips on longer anatomy terms; never fuzzy-match short/common words. */
      var words = h.match(/[a-z][a-z-]*/g) || [];
      for (var wi = 0; wi < words.length; wi++) {
        var w = words[wi];
        if (Math.abs(w.length - t.length) > 1 || w.length < 5) continue;
        var i = 0, j = 0, edits = 0;
        while (i < t.length && j < w.length) {
          if (t.charAt(i) === w.charAt(j)) { i++; j++; continue; }
          if (++edits > 1) break;
          if (t.length > w.length) i++;
          else if (w.length > t.length) j++;
          else { i++; j++; }
        }
        if (i < t.length || j < w.length) edits++;
        if (edits <= 1) return true;
      }
    }
    return false;
  }

  var BM25_CACHE = typeof WeakMap === 'function' ? new WeakMap() : null;
  function bm25EvidenceScore(queryTokens, fields, kb) {
    function terms(value) { return String(value || '').toLowerCase().match(/[a-z0-9]+/g) || []; }
    var index = BM25_CACHE && BM25_CACHE.get(kb);
    if (!index) {
      var docs = [];
      (kb.chapters || []).forEach(function (x) { docs.push([x.t, x.l, x.s, x.k].join(' ')); });
      (kb.parts || []).forEach(function (x) { docs.push([x.n, x.l, x.ct, x.d, x.f].join(' ')); });
      (kb.faqs || []).forEach(function (x) { docs.push([x.q, x.a, x.ct].join(' ')); });
      (kb.muscles || []).forEach(function (x) { docs.push([x.n, x.g, x.loc, x.a].join(' ')); });
      (kb.tendons || []).forEach(function (x) { docs.push([x.n, x.at, x.a].join(' ')); });
      (kb.bones || []).forEach(function (x) { docs.push([x.n, x.g].join(' ')); });
      var df = Object.create(null);
      docs.forEach(function (doc) {
        var seen = Object.create(null);
        terms(doc).forEach(function (term) { seen[term] = true; });
        Object.keys(seen).forEach(function (term) { df[term] = (df[term] || 0) + 1; });
      });
      index = { count: docs.length, df: df };
      if (BM25_CACHE) BM25_CACHE.set(kb, index);
    }
    var body = terms(fields.join(' '));
    var counts = Object.create(null);
    body.forEach(function (term) { counts[term] = (counts[term] || 0) + 1; });
    var score = 0;
    queryTokens.forEach(function (queryTerm) {
      var term = String(queryTerm).toLowerCase();
      var tf = counts[term] || 0;
      if (!tf && term.length >= 5) {
        var candidate = Object.keys(counts).find(function (w) {
          return w.length >= 5 && Math.abs(w.length - term.length) <= 1 && hasWordToken(w, term);
        });
        if (candidate) tf = Math.min(1, counts[candidate] * 0.35);
      }
      if (!tf) return;
      var df = index.df[term] || 0;
      var idf = Math.log(1 + (index.count - df + 0.5) / (df + 0.5));
      score += idf * (tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * body.length / 120));
    });
    return score;
  }

  function decorateInternalEvidence(html, score, type) {
    if (!html) return html;
    var level = score >= 105 ? 'High match' : score >= 85 ? 'Relevant match' : 'Possible match';
    return html + '<div class="cbot-evidence-note" role="note"><span>Atlas knowledge</span><span>' + level + '</span></div>';
  }

  function formatArteryVeinComparison(kb) {
    var vascular = (kb.chapters || []).find(function (c) { return c.k === 'vascular'; });
    var heart = (kb.chapters || []).find(function (c) { return c.k === 'heart'; });
    if (!vascular || !heart) return null;
    var image = vascular.img || 'img/webp/vascular.webp';
    LAST_TOPIC = { type: 'chapter', item: vascular };
    return '<div class="cbot-topic-head"><span class="cbot-topic-title">Arteries vs Veins</span><span class="cbot-topic-tag">Atlas comparison</span></div>' +
      buildMediaCard(image, 'Vascular system', null) +
      '<div class="cbot-assign-sec"><h4>Arteries</h4><p>Carry blood away from the heart. The Atlas describes the aorta as distributing oxygenated blood to the systemic circulation; pulmonary arteries are an important exception and carry deoxygenated blood to the lungs.</p></div>' +
      '<div class="cbot-assign-sec"><h4>Veins</h4><p>Return blood toward the heart. The venae cavae return deoxygenated blood to the right atrium, while pulmonary veins carry oxygenated blood from the lungs to the left atrium.</p></div>' +
      '<div class="cbot-evidence-note" role="note"><span>Corpus Anatomy Atlas · Heart &amp; Vascular System</span><span>Atlas-supported comparison</span></div>' +
      buildNavButtons('vascular', '') + buildNavButtons('heart', '');
  }

  /* ---------- 7. Internal Corpus Search (BM25-inspired lexical evidence + metadata reranking) ---------- */
  function searchInternalKB(parsed, kb) {
    var core = parsed.corePhrase;
    var tokens = parsed.tokens;
    var currentSlug = getCurrentChapterSlug();

    /* 0. If user asks about "this chapter" / "summary" while viewing a chapter */
    if ((parsed.intent.wantsCurrentChapter || core === 'summary' || core === 'overview') && currentSlug) {
      var curChap = (kb.chapters || []).find(function (c) { return c.k === currentSlug || c.slug === currentSlug; });
      if (curChap) {
        LAST_TOPIC = { type: 'chapter', item: curChap };
        return formatChapterReply(curChap, parsed.intent);
      }
    }

    /* Atlas-backed comparison: answer only when both requested vessel classes are explicit. */
    var asksArteryVeinCompare = parsed.intent.wantsComparison &&
      tokens.some(function (t) { return t === 'artery' || t === 'arterial'; }) &&
      tokens.some(function (t) { return t === 'vein' || t === 'venous'; });
    if (asksArteryVeinCompare) {
      var vesselComparison = formatArteryVeinComparison(kb);
      if (vesselComparison) return vesselComparison;
    }

    /* 0b. Conversational Follow-up on LAST_TOPIC */
    var isFollowUp = parsed.intent.wantsFollowUp && /\b(its|it|their|they|iska|iski|iske|uska|uski|ye|woh|this|that|tell me more|more detail|more details|aur batao|or batao|iske bare|iske baray)\b/.test(parsed.clean) || /\b(tell me more|more detail|more details|aur batao|or batao|iske bare|iske baray|iska kaam|iska kam|iska function|iski location|ye kahan|iski blood|its function|its location|its blood|its nerve|what does it do|where is it|what about its|what about their)\b/.test(parsed.clean);
    if (LAST_TOPIC && (isFollowUp || (!core && (parsed.intent.wantsImage || parsed.intent.wantsFunction || parsed.intent.wantsLocation || parsed.intent.wantsSupply || parsed.intent.wantsClinical)))) {
      if (LAST_TOPIC.type === 'chapter') return formatChapterReply(LAST_TOPIC.item, parsed.intent);
      if (LAST_TOPIC.type === 'part') return formatPartReply(LAST_TOPIC.item, parsed.intent);
      if (LAST_TOPIC.type === 'extra') return formatExtraMedicalReply(LAST_TOPIC.item, LAST_TOPIC.key, parsed.intent);
    }

    if (!core) return null;

    /* 1. Check Curated Extra Medical Reference first */
    var cleanQ = parsed.clean;
    if (EXTRA_MEDICAL_REF[cleanQ]) {
      LAST_TOPIC = { type: 'extra', key: cleanQ, item: EXTRA_MEDICAL_REF[cleanQ] };
      return formatExtraMedicalReply(EXTRA_MEDICAL_REF[cleanQ], cleanQ, parsed.intent);
    }
    if (EXTRA_MEDICAL_REF[core]) {
      LAST_TOPIC = { type: 'extra', key: core, item: EXTRA_MEDICAL_REF[core] };
      return formatExtraMedicalReply(EXTRA_MEDICAL_REF[core], core, parsed.intent);
    }
    for (var refKey in EXTRA_MEDICAL_REF) {
      var refRegex = new RegExp('(^|\\s)' + escapeRegexToken(refKey).replace(/\s+/g, '\\s+') + '(?=\\s|$)', 'i');
      if (cleanQ === refKey || core === refKey || refRegex.test(cleanQ) ||
          (hasWordToken(core, refKey) && Math.abs(core.length - refKey.length) <= 7)) {
        LAST_TOPIC = { type: 'extra', key: refKey, item: EXTRA_MEDICAL_REF[refKey] };
        return formatExtraMedicalReply(EXTRA_MEDICAL_REF[refKey], refKey, parsed.intent);
      }
    }

    /* 2. Score Chapters (74 chapters) */
    var bestChapter = null;
    var bestChapterScore = 0;
    (kb.chapters || []).forEach(function (c) {
      var titleLow = (c.t || '').toLowerCase();
      var titleBase = titleLow.split(/[·—–-]/)[0].trim();
      var latinLow = (c.l || '').toLowerCase();
      var keyLow = (c.k || '').toLowerCase();
      var slugLow = (c.slug || '').replace(/-/g, ' ').toLowerCase();
      var score = 0;

      if (core === keyLow || core === titleBase || core === titleLow || core === slugLow || (latinLow && core === latinLow)) {
        score = 135;
      } else if (titleBase.split(/\s+/).indexOf(core) !== -1 && core.length >= 3) {
        score = 104;
      } else if (hasWordToken(titleLow, core) && core.length >= 4) {
        score = 88;
      } else if (latinLow && hasWordToken(latinLow, core) && core.length >= 4) {
        score = 86;
      } else if (tokens.length > 0) {
        var matched = tokens.filter(function (t) {
          return t.length >= 3 && (hasWordToken(titleLow, t) || hasWordToken(latinLow, t) || keyLow === t);
        });
        if (matched.length === tokens.length && tokens.length >= 1) {
          score = 78 + matched.length * 4;
        } else if (matched.length === 1 && tokens.length >= 2) {
          var conceptTerms = ['chamber', 'structure', 'anatomy', 'part', 'layer', 'function', 'blood', 'supply', 'nerve', 'innervation', 'location', 'circulation', 'type', 'classification', 'example', 'process'];
          var queryHasConcept = tokens.some(function (t) { return conceptTerms.indexOf(t) !== -1; });
          var anchorCount = tokens.filter(function (t) { return t.length >= 3 && (hasWordToken(titleLow, t) || hasWordToken(latinLow, t) || keyLow === t); }).length;
          if (queryHasConcept && anchorCount === 1) score = 84;
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

      if (cleanQ === nameClean || cleanQ === nameLow || core === nameClean || core === nameLow || (latinLow && (core === latinLow || cleanQ === latinLow))) {
        score = 130;
      } else if (nameClean.indexOf(cleanQ) === 0 && cleanQ.length >= 4 && hasWordToken(nameClean, cleanQ)) {
        score = 102;
      } else if (nameClean.indexOf(core) === 0 && core.length >= 4 && hasWordToken(nameClean, core)) {
        score = 98;
      } else if (hasWordToken(nameClean, core) && core.length >= 4) {
        score = 88;
      } else if (latinLow && hasWordToken(latinLow, core) && core.length >= 4) {
        score = 86;
      } else if (tokens.length >= 1) {
        var matched = tokens.filter(function (t) {
          return t.length >= 3 && (hasWordToken(nameClean, t) || hasWordToken(latinLow, t));
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
      if (hasWordToken(qLow, core) && core.length >= 6) {
        score = 92;
      } else if (tokens.length >= 2) {
        var matched = tokens.filter(function (t) { return t.length >= 3 && hasWordToken(qLow, t); });
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
      if (core === nLow) score = 120;
      else if (hasWordToken(nLow, core) && core.length >= 4) score = 90;
      else if (tokens.length >= 1) {
        var matched = tokens.filter(function (t) { return t.length >= 4 && hasWordToken(nLow, t); });
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
      if (core === nLow) score = 120;
      else if (hasWordToken(nLow, core) && core.length >= 5) score = 90;
      if (score > bestTendonScore) {
        bestTendonScore = score;
        bestTendon = t;
      }
    });

    /* 6. Score All 206 Bones (54 bone groups) */
    var bestBone = null;
    var bestBoneScore = 0;
    (kb.bones || []).forEach(function (b) {
      var nLow = (b.n || '').toLowerCase();
      var gLow = (b.g || '').toLowerCase();
      var score = 0;
      if (core === nLow) score = 118;
      else if (hasWordToken(nLow, core) && core.length >= 4) score = 89;
      else if (tokens.length >= 1) {
        var matched = tokens.filter(function (t) { return t.length >= 4 && (hasWordToken(nLow, t) || hasWordToken(gLow, t)); });
        if (matched.length === tokens.length) score = 78 + matched.length * 4;
      }
      if (score > bestBoneScore) {
        bestBoneScore = score;
        bestBone = b;
      }
    });

    /* Pick the highest-confidence internal match (must be >= 75) */
    var candidates = [
      { type: 'part', score: bestPartScore, item: bestPart },
      { type: 'chapter', score: bestChapterScore, item: bestChapter },
      { type: 'faq', score: bestFaqScore, item: bestFaq },
      { type: 'muscle', score: bestMuscleScore, item: bestMuscle },
      { type: 'tendon', score: bestTendonScore, item: bestTendon },
      { type: 'bone', score: bestBoneScore, item: bestBone }
    ].map(function (candidate) {
      if (!candidate.item) return candidate;
      var rerank = candidate.score;
      var rankFields = [candidate.item.t, candidate.item.n, candidate.item.q, candidate.item.l, candidate.item.ct, candidate.item.s, candidate.item.g, candidate.item.loc, candidate.item.d, candidate.item.f, candidate.item.a, candidate.item.r, candidate.item.bl].filter(Boolean);
      rerank += Math.min(12, bm25EvidenceScore(tokens, rankFields, kb) * 3);
      /* Metadata-aware reranking: broad system queries favor chapter over a coincidental structure hit. */
      if (parsed.specificity === 'broad' && candidate.type === 'chapter') rerank += 24;
      if (parsed.specificity === 'broad' && ['muscle', 'tendon', 'bone', 'part'].indexOf(candidate.type) !== -1) rerank -= 8;
      if (parsed.intent.wantsSpecific && ['part', 'muscle', 'tendon', 'bone'].indexOf(candidate.type) !== -1) rerank += 10;
      /* Exact title/topic evidence is stronger than incidental token overlap. */
      var title = String(candidate.item.t || candidate.item.n || candidate.item.q || '').toLowerCase();
      if (parsed.clean === title || parsed.corePhrase === title) rerank += 12;
      return { type: candidate.type, score: candidate.score, rankScore: rerank, item: candidate.item };
    }).sort(function (a, b) { return (b.rankScore || b.score) - (a.rankScore || a.score); });

    var winner = candidates[0];
    if (!winner || winner.score < 75 || !winner.item) {
      return null;
    }

    if (winner.type === 'chapter') {
      LAST_TOPIC = { type: 'chapter', item: winner.item };
      return decorateInternalEvidence(formatChapterReply(winner.item, parsed.intent), winner.score, winner.type);
    }
    if (winner.type === 'part') {
      LAST_TOPIC = { type: 'part', item: winner.item };
      return decorateInternalEvidence(formatPartReply(winner.item, parsed.intent), winner.score, winner.type);
    }
    if (winner.type === 'faq') {
      var faqChap = (kb.chapters || []).find(function (c) { return c.k === winner.item.ck; });
      var faqImg = (faqChap && faqChap.img) || 'img/webp/malebody.webp';
      var faqMeta = {
        latin: (faqChap && faqChap.l) || '',
        region: (faqChap && faqChap.r) || '',
        blood: (faqChap && faqChap.b) || '',
        nerve: (faqChap && faqChap.n) || '',
        func: winner.item.a
      };
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(winner.item.q) + '</span>' +
          '<span class="cbot-topic-tag">' + escapeHtml(winner.item.ct) + '</span>' +
        '</div>' +
        buildMediaCard(faqImg, winner.item.ct, null) +
        '<div class="cbot-assign-sec"><h4>Detailed Answer &amp; Mechanism</h4><p>' + escapeHtml(winner.item.a) + '</p></div>' +
        buildStudyToolbar(winner.item.q, winner.item.ct, faqMeta) +
        buildNavButtons(winner.item.ck, '') +
        '<div class="cbot-evidence-note" role="note"><span>Atlas knowledge</span><span>' + (winner.score >= 105 ? 'High match' : 'Relevant match') + '</span></div>'
      );
    }
    if (winner.type === 'muscle') {
      var m = winner.item;
      var mMeta = {
        latin: m.g || 'Skeletal Muscle',
        region: m.loc || m.g || 'Muscular System',
        blood: 'Segmental muscular arterial branches',
        nerve: m.nv || 'Somatic motor innervation',
        func: m.a || 'Skeletal articulation and posture'
      };
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(m.n) + '</span>' +
          '<span class="cbot-topic-tag">Muscle · ' + escapeHtml(m.g) + '</span>' +
        '</div>' +
        buildMediaCard(m.img || 'img/webp/muscle.webp', m.n, null) +
        '<div class="cbot-assign-sec"><h4>Anatomical Classification</h4><p><b>' + escapeHtml(m.n) + '</b> is a documented skeletal muscle of the <b>' + escapeHtml(m.g) + '</b> compartment.</p></div>' +
        '<ul class="cbot-point-list">' +
          (m.a ? '<li><b>Primary Action:</b> ' + escapeHtml(m.a) + '</li>' : '') +
          (m.o ? '<li><b>Origin (Proximal Attachment):</b> ' + escapeHtml(m.o) + '</li>' : '') +
          (m.i ? '<li><b>Insertion (Distal Attachment):</b> ' + escapeHtml(m.i) + '</li>' : '') +
          (m.nv ? '<li><b>Nerve Supply (Innervation):</b> ' + escapeHtml(m.nv) + '</li>' : '') +
          (m.loc ? '<li><b>Anatomical Region:</b> ' + escapeHtml(m.loc) + '</li>' : '') +
        '</ul>' +
        buildStudyToolbar(m.n, 'Muscle · ' + m.g, mMeta) +
        buildNavButtons('muscle', '') +
        '<div class="cbot-evidence-note" role="note"><span>Atlas knowledge</span><span>' + (winner.score >= 105 ? 'High match' : 'Relevant match') + '</span></div>'
      );
    }
    if (winner.type === 'tendon') {
      var td = winner.item;
      var tdMeta = {
        latin: 'Tendo / Dense Regular Connective Tissue',
        region: td.at || 'Musculoskeletal Junction',
        blood: 'Peritendinous & musculotendinous vascular arcades',
        nerve: 'Golgi tendon organ proprioceptive afferents (Ib fibers)',
        func: td.a || 'Force transmission from muscle belly to bone'
      };
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(td.n) + '</span>' +
          '<span class="cbot-topic-tag">Tendon Atlas</span>' +
        '</div>' +
        buildMediaCard(td.img || 'img/webp/muscle.webp', td.n, null) +
        '<ul class="cbot-point-list">' +
          (td.a ? '<li><b>Biomechanical Function:</b> ' + escapeHtml(td.a) + '</li>' : '') +
          (td.at ? '<li><b>Bony &amp; Muscular Attachment:</b> ' + escapeHtml(td.at) + '</li>' : '') +
        '</ul>' +
        buildStudyToolbar(td.n, 'Tendon Atlas', tdMeta) +
        buildNavButtons('muscle', '') +
        '<div class="cbot-evidence-note" role="note"><span>Atlas knowledge</span><span>' + (winner.score >= 105 ? 'High match' : 'Relevant match') + '</span></div>'
      );
    }
    if (winner.type === 'bone') {
      var bn = winner.item;
      var bnMeta = {
        latin: bn.g + ' · Adult Human Skeleton',
        region: bn.g + ' division (Count in adult body: ' + String(bn.c) + ')',
        blood: 'Nutrient artery, periosteal, metaphyseal & epiphyseal vessels',
        nerve: 'Periosteal sensory & vasomotor nerve fibers',
        func: 'Structural framework, mechanical leverage, joint articulation, and mineral storage.'
      };
      return (
        '<div class="cbot-topic-head">' +
          '<span class="cbot-topic-title">' + escapeHtml(bn.n) + '</span>' +
          '<span class="cbot-topic-tag">206-Bone Atlas · ' + escapeHtml(bn.g) + '</span>' +
        '</div>' +
        buildMediaCard(bn.img || 'img/webp/skeleton.webp', bn.n, null) +
        '<div class="cbot-assign-sec"><h4>Skeletal Classification &amp; Osteology</h4><p><b>' + escapeHtml(bn.n) + '</b> belongs to the <b>' + escapeHtml(bn.g) + '</b> division of the 206-bone adult human skeleton (Documented bilateral/axial count in adult body: <b>' + escapeHtml(String(bn.c)) + '</b>). Composed of an outer dense cortical (compact) bone shell and internal trabecular (cancellous) bone lattice engineered to resist compressive and tensile loads.</p></div>' +
        buildStudyToolbar(bn.n, '206-Bone Atlas · ' + bn.g, bnMeta) +
        buildNavButtons('skeleton', '') +
        '<div class="cbot-evidence-note" role="note"><span>Atlas knowledge</span><span>' + (winner.score >= 105 ? 'High match' : 'Relevant match') + '</span></div>'
      );
    }
    return null;
  }

  function formatChapterReply(c, intent) {
    var ovArr = Array.isArray(c.ov) && c.ov.length ? c.ov : [c.sum || c.bl || ''];
    var para1 = ovArr[0] || c.sum || c.bl || '';
    var para2 = ovArr[1] || '';
    var para3 = ovArr[2] || '';
    var classificationHtml = intent && intent.wantsClassification && c.k === 'muscle'
      ? '<div class="cbot-assign-sec"><h4>Major Muscle Tissue Types</h4><ul class="cbot-point-list"><li><b>Skeletal:</b> striated muscle, usually under voluntary control, attached to the skeleton.</li><li><b>Cardiac:</b> striated, involuntary muscle forming the myocardium.</li><li><b>Smooth:</b> non-striated, involuntary muscle in many hollow-organ and vessel walls.</li></ul></div>'
      : '';

    var bullets = [];
    if (c.r) bullets.push(['Anatomical Location & Boundaries', c.r]);
    if (c.b) bullets.push(['Arterial & Venous Supply', c.b]);
    if (c.n) bullets.push(['Nerve Supply (Innervation)', c.n]);

    var listHtml = bullets.length
      ? '<ul class="cbot-point-list">' + bullets.map(function (row) {
          return '<li><b>' + escapeHtml(row[0]) + ':</b> ' + escapeHtml(row[1]) + '</li>';
        }).join('') + '</ul>'
      : '';

    var topChips = '';
    if (Array.isArray(c.top) && c.top.length) {
      topChips =
        '<div class="cbot-assign-sec"><h4>Key Documented Anatomical Structures</h4>' +
        '<div class="cbot-subparts">' +
        c.top.slice(0, 10).map(function (tp) {
          return '<span class="cbot-subchip">' + escapeHtml(tp.n) + (tp.l && tp.l !== tp.n ? ' (<i>' + escapeHtml(tp.l) + '</i>)' : '') + '</span>';
        }).join('') +
        '</div></div>';
    }

    var microHtml = '';
    if (c.mlNote) {
      microHtml = '<div class="cbot-assign-sec"><h4>' + escapeHtml(c.mlTitle || 'Histology & Microanatomy') + '</h4><p>' + escapeHtml(c.mlNote) + '</p></div>';
    }

    var chapImg = c.img || ('img/webp/' + c.k + '.webp');
    var diagMeta = {
      latin: c.l || '',
      region: c.r || '',
      blood: c.b || '',
      nerve: c.n || '',
      func: truncateSentences(para3 || para1, 1)
    };

    return (
      '<div class="cbot-topic-head">' +
        '<div><span class="cbot-topic-title">' + escapeHtml(c.t) + '</span>' +
        (c.l ? '<span class="cbot-latin-sub">' + escapeHtml(c.l) + '</span>' : '') + '</div>' +
        '<span class="cbot-topic-tag">' + escapeHtml(c.s || 'Anatomy') + '</span>' +
      '</div>' +
      buildMediaCard(chapImg, c.t, null) +
      '<div class="cbot-assign-sec"><h4>1. Anatomical Overview &amp; Gross Structure</h4><p>' + escapeHtml(para1) + '</p></div>' +
      (para2 ? '<div class="cbot-assign-sec"><h4>2. Architecture &amp; Tissue Organization</h4><p>' + escapeHtml(para2) + '</p></div>' : '') +
      (para3 ? '<div class="cbot-assign-sec"><h4>3. Physiological Mechanism &amp; Clinical Relevance</h4><p>' + escapeHtml(para3) + '</p></div>' : '') +
      classificationHtml +
      listHtml +
      topChips +
      microHtml +
      buildStudyToolbar(c.t, c.s || 'Anatomy', diagMeta) +
      buildNavButtons(c.k, '')
    );
  }

  function formatPartReply(p, intent) {
    var bullets = [];
    if (p.reg) bullets.push(['Regional Location', p.reg]);
    if (p.bld) bullets.push(['Blood Supply', p.bld]);
    if (p.nrv) bullets.push(['Innervation', p.nrv]);

    var listHtml = bullets.length
      ? '<ul class="cbot-point-list">' + bullets.map(function (row) {
          return '<li><b>' + escapeHtml(row[0]) + ':</b> ' + escapeHtml(row[1]) + '</li>';
        }).join('') + '</ul>'
      : '';
    var partImg = p.img || ('img/webp/' + p.ck + '.webp');
    var diagMeta = {
      latin: p.l || '',
      region: p.reg || p.ct || '',
      blood: p.bld || '',
      nerve: p.nrv || '',
      func: p.f || p.d || ''
    };

    return (
      '<div class="cbot-topic-head">' +
        '<div><span class="cbot-topic-title">' + escapeHtml(p.n) + '</span>' +
        (p.l && p.l !== p.n ? '<span class="cbot-latin-sub">' + escapeHtml(p.l) + '</span>' : '') + '</div>' +
        '<span class="cbot-topic-tag">' + escapeHtml(p.ct) + '</span>' +
      '</div>' +
      buildMediaCard(partImg, p.lt || p.n, p.hot) +
      '<div class="cbot-assign-sec"><h4>1. Anatomical Structure &amp; Morphology</h4><p>' + escapeHtml(p.d) + '</p></div>' +
      (p.f ? '<div class="cbot-assign-sec"><h4>2. Physiological Function &amp; Mechanism</h4><p>' + escapeHtml(p.f) + '</p></div>' : '') +
      (p.c ? '<div class="cbot-assign-sec"><h4>3. Clinical Correlation &amp; Pathology</h4><p>' + escapeHtml(p.c) + '</p></div>' : '') +
      listHtml +
      buildStudyToolbar(p.n, p.ct, diagMeta) +
      buildNavButtons(p.ck, p.id)
    );
  }

  function formatExtraMedicalReply(item, refKey, intent) {
    var chapKey = '';
    var rows = (item.points || []).filter(function (r) {
      if (r[0] === 'chapterKey') { chapKey = r[1]; return false; }
      return true;
    });
    var listHtml = rows.length
      ? '<ul class="cbot-point-list">' + rows.map(function (r) {
          return '<li><b>' + escapeHtml(r[0]) + ':</b> ' + escapeHtml(r[1]) + '</li>';
        }).join('') + '</ul>'
      : '';
    var mediaMeta = (refKey && EXTRA_REF_IMG_MAP[refKey]) || {};
    var imgSrc = mediaMeta.img || (chapKey ? 'img/webp/' + chapKey + '.webp' : 'img/webp/foundation-cell-organelles.webp');
    var diagMeta = {
      latin: item.tag || 'Anatomy Reference',
      region: (rows[0] && rows[0][1]) || 'Human Body',
      blood: (rows[1] && rows[1][1]) || 'Microvascular & regional arterial network',
      nerve: 'Autonomic / somatic regulation',
      func: item.summary || ''
    };
    return (
      '<div class="cbot-topic-head">' +
        '<span class="cbot-topic-title">' + escapeHtml(item.title) + '</span>' +
        '<span class="cbot-topic-tag">' + escapeHtml(item.tag || 'Anatomy Reference') + '</span>' +
      '</div>' +
      buildMediaCard(imgSrc, item.title, null) +
      '<div class="cbot-assign-sec"><h4>Anatomical &amp; Physiological Breakdown</h4><p>' + escapeHtml(item.summary) + '</p></div>' +
      listHtml +
      buildStudyToolbar(item.title, item.tag || 'Anatomy Reference', diagMeta) +
      '<div class="cbot-evidence-note" role="note"><span>Curated Atlas reference</span><span>Atlas topic match</span></div>' +
      (chapKey ? buildNavButtons(chapKey, '') : '')
    );
  }

  /* ---------- 8. Translation network helper ---------- */
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

  /* ---------- 8a. Site-Miss Web-Grounded AI Fallback (Netlify Function) ---------- */
  var AI_FALLBACK_CACHE = {};
  var AI_FALLBACK_COOLDOWN_UNTIL = 0;

  function cleanAIAnswerForDisplay(text) {
    var clean = String(text || '').trim();
    clean = clean.replace(/【[^】]*】/g, '');
    clean = clean.replace(/\[[^\]]+\]\((?:https?:\/\/)[^)]+\)/gi, '');
    clean = clean.replace(/https?:\/\/[^\s)]+/gi, '');
    clean = clean.replace(/\n?\s*(?:sources?|references?)\s*:\s*[\s\S]*$/i, '');
    return clean.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, 6000);
  }

  function safeInternalAtlasUrl(value) {
    var raw = String(value || '').trim();
    if (!raw || raw.indexOf('/learn/') !== 0) return '';
    try {
      var url = new URL(raw, window.location.origin);
      if (url.origin !== window.location.origin || url.pathname.indexOf('/learn/') !== 0) return '';
      return url.pathname + url.hash;
    } catch (_) {
      return '';
    }
  }

  function buildAtlasLink(url, label) {
    var safeHref = safeInternalAtlasUrl(url);
    if (!safeHref) return '';
    return '<div class="cbot-nav-actions"><a class="cbot-nav-btn" href="' + escapeHtml(safeHref) + '">' + escapeHtml(label || 'Open Atlas topic ↗') + '</a></div>';
  }

  function currentTopicLabel() {
    if (!LAST_TOPIC) return '';
    if (LAST_TOPIC.type === 'atlas') return String(LAST_TOPIC.item && LAST_TOPIC.item.topic || '');
    var item = LAST_TOPIC.item || {};
    return String(item.t || item.n || item.title || LAST_TOPIC.key || '');
  }

  function resolveFollowUpQuestion(question) {
    var raw = String(question || '').trim();
    var topic = currentTopicLabel();
    if (!raw || !topic || topic.length < 2) return raw;
    var cleanTopic = topic.toLowerCase();
    if (raw.toLowerCase().indexOf(cleanTopic) !== -1) return raw; /* named new subject: do not override */
    if (!/\b(its|it|their|they|them|this|that|uska|uski|iske|iski|iska|ye|woh)\b/i.test(raw)) return raw;
    return raw.replace(/\b(its|it|their|they|them|this|that|uska|uski|iske|iski|iska|iski|ye|woh)\b/ig, topic);
  }

  function formatAtlasQAAnswer(data, lang, question) {
    var clean = cleanAIAnswerForDisplay(data && data.answer);
    if (!clean) return null;
    if (data && data.kind === 'clinical') clean += '\n\nEducational correlation only; not a diagnosis or personal medical advice.';
    var topic = String((data && data.topic) || 'Atlas topic');
    LAST_TOPIC = { type: 'atlas', item: { topic: topic } };
    var imagePath = String((data && data.imagePath) || '');
    var hasLocalImage = /^\/?img\/(webp|medium|thumb)\/[A-Za-z0-9_.-]+$/i.test(imagePath);
    var hotCoords = Array.isArray(data && data.hot) && data.hot.length >= 2 ? data.hot : null;
    var imageHtml = hasLocalImage ? buildMediaCard(imagePath, topic, hotCoords) : '';
    var asksForImage = /\b(image|picture|photo|diagram|illustration|show|draw)\b/i.test(String(question || ''));
    var noImageNote = asksForImage && !imageHtml
      ? '<div class="cbot-body-text" style="font-size:12px;opacity:.78">No matching reviewed image is available in the Atlas; here is the text explanation and related Atlas guide.</div>'
      : '';
    var dir = /^(ar|ur|fa|he)$/.test(String(lang || '')) ? ' dir="rtl" style="text-align:right;"' : '';
    var html =
      '<div class="cbot-topic-head"><span class="cbot-topic-title">Atlas answer</span></div>' +
      imageHtml +
      '<div class="cbot-body-text"' + dir + '>' + escapeHtml(clean).replace(/\n/g, '<br>') + '</div>' +
      noImageNote +
      '<div class="cbot-evidence-note" role="note"><span>Corpus Anatomy Atlas Q&amp;A</span><span>Matched Atlas record</span></div>' +
      buildAtlasLink(data && data.atlasUrl, 'Open Atlas topic ↗');
    return localizeReplyForLanguage(html, lang);
  }

  function formatWebAIAnswer(data, lang) {
    var clean = cleanAIAnswerForDisplay(data && data.answer);
    if (!clean) return null;
    var dir = /^(ar|ur|fa|he)$/.test(String(lang || '')) ? ' dir="rtl" style="text-align:right;"' : '';
    var html =
      '<div class="cbot-topic-head"><span class="cbot-topic-title">Web-grounded answer</span></div>' +
      '<div class="cbot-body-text"' + dir + '>' + escapeHtml(clean).replace(/\n/g, '<br>') + '</div>' +
      '<div class="cbot-evidence-note" role="note"><span>External web research</span><span>Atlas search had no verified match</span></div>' +
      '<div class="cbot-body-text" style="font-size:12px;opacity:.78">For learning only; not personal medical advice.</div>' +
      buildAtlasLink(data && data.relatedAtlasUrl, 'Related Atlas guide ↗');
    return localizeReplyForLanguage(html, lang);
  }

  function formatNoAnswer(data, lang) {
    var text = data && data.reason === 'web_search_not_configured'
      ? 'I could not verify this in the Atlas Q&A yet, and external search is not enabled. I will not guess.'
      : 'I could not verify a reliable answer right now. Please try a more specific anatomy topic.';
    var html =
      '<div class="cbot-topic-head"><span class="cbot-topic-title">Not found in Atlas Q&amp;A</span></div>' +
      '<div class="cbot-body-text">' + escapeHtml(text) + '</div>' +
      buildAtlasLink(data && data.relatedAtlasUrl, 'Related Atlas guide ↗');
    return localizeReplyForLanguage(html, lang);
  }

  function requestAIWebFallback(question, lang, options) {
    var q = String(question || '').trim();
    var qaOnly = !!(options && options.qaOnly);
    if (!q || q.length < 3) return Promise.resolve(null);
    var cacheKey = String(lang || 'en') + '|' + q.toLowerCase() + (qaOnly ? '|atlas-only' : '|full');
    if (AI_FALLBACK_CACHE[cacheKey]) return Promise.resolve(AI_FALLBACK_CACHE[cacheKey]);

    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (controller) controller.abort();
    }, 20000);
    var endpoint = new URL('/.netlify/functions/ai-fallback', window.location.origin).toString();
    var localOnly = Date.now() < AI_FALLBACK_COOLDOWN_UNTIL;

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q.slice(0, 1200), language: lang || 'en', localOnly: localOnly, qaOnly: qaOnly }),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok) {
            var retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
            if (res.status === 429) {
              AI_FALLBACK_COOLDOWN_UNTIL = Date.now() + Math.max(15, Math.min(retryAfter || 60, 600)) * 1000;
            } else if (res.status === 404 || res.status === 503) {
              AI_FALLBACK_COOLDOWN_UNTIL = Date.now() + 5 * 60 * 1000;
            } else if (res.status >= 500) {
              AI_FALLBACK_COOLDOWN_UNTIL = Date.now() + 60 * 1000;
            }
            data.httpStatus = res.status;
          }
          return data;
        });
      })
      .then(function (data) {
        if (qaOnly && (!data || data.source !== 'atlas_qa')) return null;
        var html = null;
        if (data && data.source === 'atlas_qa') html = formatAtlasQAAnswer(data, lang, q);
        else if (data && data.source === 'web' && data.answer) html = formatWebAIAnswer(data, lang);
        else if (data && (data.source === 'no_answer' || data.httpStatus || data.error)) html = formatNoAnswer(data, lang);
        if (html) AI_FALLBACK_CACHE[cacheKey] = html;
        return html;
      })
      .catch(function () { return null; })
      .then(function (result) {
        clearTimeout(timer);
        return result;
      }, function (err) {
        clearTimeout(timer);
        throw err;
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
    /* Localize section & bullet labels into Roman Urdu + English */
    out = out
      .replace(/1\. Anatomical Overview &amp; Gross Structure/g, '1. Anatomical Overview (Sakht aur Khulasa)')
      .replace(/1\. Anatomical Structure &amp; Morphology/g, '1. Anatomical Structure (Sakht aur Morphology)')
      .replace(/2\. Architecture &amp; Tissue Organization/g, '2. Tissue Organization (Androoni Banawat)')
      .replace(/2\. Physiological Function &amp; Mechanism/g, '2. Physiological Function (Kaam aur Mechanism)')
      .replace(/3\. Physiological Mechanism &amp; Clinical Relevance/g, '3. Mechanism &amp; Clinical Relevance (Tibbi Ahmiyat)')
      .replace(/3\. Clinical Correlation &amp; Pathology/g, '3. Clinical Correlation (Tibbi Nuqta aur Pathology)')
      .replace(/<b>Anatomical Location &amp; Boundaries:<\/b>/g, '<b>Maqam (Anatomical Location):</b>')
      .replace(/<b>Regional Location:<\/b>/g, '<b>Maqam (Location):</b>')
      .replace(/<b>Arterial &amp; Venous Supply:<\/b>/g, '<b>Khoon ki Supply (Blood Supply):</b>')
      .replace(/<b>Blood Supply:<\/b>/g, '<b>Khoon ki Supply (Blood):</b>')
      .replace(/<b>Nerve Supply \(Innervation\):<\/b>/g, '<b>Aasabi Supply (Innervation):</b>')
      .replace(/<b>Innervation:<\/b>/g, '<b>Aasabi Supply (Innervation):</b>')
      .replace(/<b>Primary Action:<\/b>/g, '<b>Harkat / Kaam (Action):</b>')
      .replace(/<b>Key Detail:<\/b>/g, '<b>Ahem Tafseel (Detail):</b>');
    return out;
  }

  /* Translate reply HTML into the student's native world language (Spanish, Arabic, Urdu, Hindi, French, German, Chinese, Russian, Turkish, etc.) */
  function localizeReplyForLanguage(html, lang) {
    if (!html || !lang || lang === 'en') return Promise.resolve(html);
    if (lang === 'ur-Latn') return Promise.resolve(formatRomanUrduReply(html));

    /* Extract Nav Buttons and Visual Media Card so they remain intact */
    var navMatch = html.match(/<div class="cbot-nav-actions">[\s\S]*?<\/div>/);
    var navHtml = navMatch ? navMatch[0] : '';
    var withoutNav = navMatch ? html.replace(navHtml, '') : html;

    var mediaMatch = withoutNav.match(/<div class="cbot-media-card[\s\S]*?<\/div>\s*<\/div>/);
    var mediaHtml = mediaMatch ? mediaMatch[0] : '';
    var withoutMedia = mediaMatch ? withoutNav.replace(mediaHtml, '') : withoutNav;

    /* Extract Title, Tag, Main Summary, and Bullet Items */
    var titleM = withoutMedia.match(/<span class="cbot-topic-title">([\s\S]*?)<\/span>/);
    var tagM = withoutMedia.match(/<span class="cbot-topic-tag">([\s\S]*?)<\/span>/);
    var bodyM = withoutMedia.match(/<div class="cbot-body-text">([\s\S]*?)<\/div>/) || withoutMedia.match(/<\/div><div>([\s\S]*?)<\/div>/);
    var listM = withoutMedia.match(/<ul class="cbot-point-list">([\s\S]*?)<\/ul>/);

    if (!bodyM) {
      /* Plain text / simple HTML message */
      var plain = withoutMedia.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      return translateText(plain, 'en', lang).then(function (tr) {
        var dirAttr = /^(ar|ur|fa|he)$/.test(lang) ? ' dir="rtl" style="text-align:right;"' : '';
        return mediaHtml + '<div' + dirAttr + '><strong>' + escapeHtml(tr) + '</strong></div>';
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
        mediaHtml +
        '<div class="cbot-body-text"' + dirStyle + '>' + escapeHtml(trSummary) + '</div>' +
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

    var waveImgSrc = ROOT_PREFIX + 'img/webp/bot-wave.webp?v=13';
    var pointImgSrc = ROOT_PREFIX + 'img/webp/bot-point.webp?v=13';

    root.innerHTML =
      /* Full-Screen HD Anatomy Image Lightbox Modal */
      '<div class="cbot-lightbox" id="cbotLightbox" role="dialog" aria-modal="true" aria-label="Enlarged anatomy image" aria-hidden="true" tabindex="-1">' +
        '<div class="cbot-lightbox-box">' +
          '<button type="button" class="cbot-lightbox-close" id="cbotLightboxClose" aria-label="Close image preview">×</button>' +
          '<img class="cbot-lightbox-img" id="cbotLightboxImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Anatomy visual preview" width="640" height="420" />' +
          '<div class="cbot-lightbox-title" id="cbotLightboxTitle"></div>' +
        '</div>' +
      '</div>' +

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
            '<button type="submit" class="cbot-send" id="cbotSendBtn" aria-label="Send question" title="Ask AI">' +
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
          '<span class="cbot-body-hit" id="cbotBodyHit" aria-hidden="true"></span>' +
        '</span>' +
      '</button>';

    document.body.appendChild(root);
    bindBotEvents(root);
  }

  function bindBotEvents(root) {
    var avatarBtn = root.querySelector('#cbotAvatarBtn');
    var bodyHit = root.querySelector('#cbotBodyHit');
    var bubble = root.querySelector('#cbotBubble');
    var boardWrap = root.querySelector('#cbotBoardWrap');
    var closeBtn = root.querySelector('#cbotCloseBtn');
    var form = root.querySelector('#cbotForm');
    var input = root.querySelector('#cbotInput');
    var sendBtn = root.querySelector('#cbotSendBtn');
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
    if (bodyHit) {
      bodyHit.addEventListener('click', function (e) {
        e.stopPropagation();
        if (IS_OPEN) closeBoard();
        else openBoard();
      });
    }

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

    /* Handle internal SPA navigation clicks & Visual Image Zoom clicks inside messages */
    var lightbox = root.querySelector('#cbotLightbox');
    var lightboxImg = root.querySelector('#cbotLightboxImg');
    var lightboxTitle = root.querySelector('#cbotLightboxTitle');
    var lightboxClose = root.querySelector('#cbotLightboxClose');

    var lightboxReturnFocus = null;
    var previousBodyOverflow = '';
    var previousDocumentOverflow = '';
    var LIGHTBOX_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    function openLightbox(src, title) {
      if (!lightbox || !lightboxImg || !src) return;
      if (!lightbox.classList.contains('is-active')) {
        lightboxReturnFocus = document.activeElement;
        previousBodyOverflow = document.body.style.overflow;
        previousDocumentOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      }
      lightboxImg.src = src;
      lightboxImg.alt = title || 'Anatomy visual preview';
      if (lightboxTitle) lightboxTitle.textContent = title || 'Anatomy visual preview';
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      if (lightboxClose) {
        try { lightboxClose.focus({ preventScroll: true }); }
        catch (_) { lightboxClose.focus(); }
      }
    }

    function closeLightbox() {
      if (!lightbox || !lightbox.classList.contains('is-active')) return;
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      if (lightboxImg) lightboxImg.src = LIGHTBOX_PLACEHOLDER;
      var returnFocus = lightboxReturnFocus;
      lightboxReturnFocus = null;
      if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') {
        try { returnFocus.focus({ preventScroll: true }); }
        catch (_) { returnFocus.focus(); }
      }
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
      });
    }
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (!lightbox || !lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'Tab' && lightboxClose) {
        // The close control is the only focusable element in this modal.
        e.preventDefault();
        lightboxClose.focus();
      }
    });

    messages.addEventListener('click', function (e) {
      /* 1. Copy Assignment Study Notes button */
      var copyBtn = e.target.closest ? e.target.closest('[data-cbot-copy]') : null;
      if (copyBtn) {
        e.preventDefault();
        e.stopPropagation();
        var msgBox = copyBtn.closest ? copyBtn.closest('.cbot-msg') : null;
        if (msgBox) {
          var clone = msgBox.cloneNode(true);
          var rm = clone.querySelectorAll('.cbot-media-card, .cbot-tool-row, .cbot-nav-actions');
          for (var r = 0; r < rm.length; r++) {
            if (rm[r].parentNode) rm[r].parentNode.removeChild(rm[r]);
          }
          var cleanNotes = (clone.innerText || clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cleanNotes).catch(function () {});
          }
          var origLabel = copyBtn.innerHTML;
          copyBtn.textContent = '✓ Copied Study Notes!';
          setTimeout(function () { copyBtn.innerHTML = origLabel; }, 2000);
        }
        return;
      }

      /* 2. Media Card Zoom */
      var mediaCard = e.target.closest ? e.target.closest('.cbot-media-card') : null;
      if (mediaCard && lightbox && lightboxImg) {
        var zoomSrc = mediaCard.getAttribute('data-cbot-zoom-src');
        var zoomTitle = mediaCard.getAttribute('data-cbot-zoom-title') || 'Anatomy Visual';
        if (zoomSrc) openLightbox(zoomSrc, zoomTitle);
        return;
      }

      /* 4. Clean Hashless SPA Navigation */
      var navLink = e.target.closest ? e.target.closest('[data-cbot-nav]') : null;
      if (navLink && document.getElementById('app') && window.ORGANS) {
        var targetPath = navLink.getAttribute('data-cbot-nav');
        if (targetPath && targetPath.indexOf('/') === 0) {
          e.preventDefault();
          window.history.pushState(null, '', targetPath);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    });

    /* Shared submit handler for Enter key AND Send button mouse click / touch tap */
    function submitCurrentQuestion() {
      var text = (input.value || '').trim();
      if (!text) {
        input.focus();
        return;
      }
      input.value = '';
      handleUserQuestion(text);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitCurrentQuestion();
    });

    if (sendBtn) {
      sendBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        submitCurrentQuestion();
      });
    }

    function calibratePinSvg(card, img) {
      var svg = card.querySelector('.cbot-pin-svg');
      if (!svg || !img || !img.naturalWidth || !img.naturalHeight) return;
      var stage = card.querySelector('.cbot-media-stage');
      if (!stage) return;
      var sw = stage.clientWidth || 240;
      var sh = stage.clientHeight || 156;
      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      var scale = Math.min(sw / nw, sh / nh);
      var rw = nw * scale;
      var rh = nh * scale;
      var ox = (sw - rw) / 2;
      var oy = (sh - rh) / 2;
      var hx0 = Number(svg.getAttribute('data-hx')) || 500;
      var hy0 = Number(svg.getAttribute('data-hy')) || 500;
      var lbl = svg.getAttribute('data-lbl') || 'Target';
      /* Map [0..1000] image coords to [0..1000] stage coords accounting for object-fit:contain letterbox */
      var hx = Math.round(((ox + (hx0 / 1000) * rw) / sw) * 1000);
      var hy = Math.round(((oy + (hy0 / 1000) * rh) / sh) * 1000);
      var bx = hx < 500 ? Math.min(815, hx + 185) : Math.max(185, hx - 185);
      var by = hy < 280 ? Math.min(850, hy + 160) : Math.max(120, hy - 145);
      svg.innerHTML =
        '<line x1="' + hx + '" y1="' + hy + '" x2="' + bx + '" y2="' + by + '" stroke="#ff5a5f" stroke-width="6" stroke-linecap="round"/>' +
        '<circle class="cbot-pin-pulse" cx="' + hx + '" cy="' + hy + '" r="34" fill="rgba(255,90,95,0.28)" stroke="#ff5a5f" stroke-width="5"/>' +
        '<circle cx="' + hx + '" cy="' + hy + '" r="13" fill="#ff5a5f" stroke="#ffffff" stroke-width="5"/>' +
        '<rect x="' + (bx - 170) + '" y="' + (by - 36) + '" width="340" height="68" rx="14" fill="rgba(9,24,23,0.92)" stroke="#6ee7b7" stroke-width="4"/>' +
        '<text x="' + bx + '" y="' + (by + 10) + '" text-anchor="middle" fill="#ecfdf5" font-family="system-ui,sans-serif" font-size="36" font-weight="800">' + escapeHtml(lbl) + '</text>';
    }

    function enhanceMediaCards(bubbleEl) {
      if (!bubbleEl || !bubbleEl.querySelectorAll) return;
      var cards = bubbleEl.querySelectorAll('.cbot-media-card');
      for (var i = 0; i < cards.length; i++) {
        (function (card) {
          var img = card.querySelector('.cbot-media-img');
          if (img) {
            if (img.complete && img.naturalWidth > 0) {
              calibratePinSvg(card, img);
            } else {
              img.addEventListener('load', function () {
                calibratePinSvg(card, img);
              });
            }
            img.addEventListener('error', function () {
              var originalSrc = card.getAttribute('data-cbot-zoom-src') || '';
              var alreadyTriedOriginal = img.getAttribute('data-cbot-original-fallback') === '1';
              if (!alreadyTriedOriginal && originalSrc && img.getAttribute('src') !== originalSrc) {
                img.setAttribute('data-cbot-original-fallback', '1');
                img.setAttribute('src', originalSrc);
                return;
              }
              /* Never replace a failed reviewed asset with a generated or external illustration. */
              card.style.display = 'none';
            });
          }
        })(cards[i]);
      }
    }

    function appendMessage(htmlContent, isUser) {
      var div = document.createElement('div');
      div.className = 'cbot-msg ' + (isUser ? 'cbot-msg-user' : 'cbot-msg-bot');
      if (isUser) div.textContent = htmlContent;
      else div.innerHTML = htmlContent;
      messages.appendChild(div);
      if (!isUser) enhanceMediaCards(div);
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

      loadKnowledgeBase().then(function (kb) {
        /* The server-only 5,000 Q&A brain is checked before the existing website KB (including its 370 FAQs). */
        var loadingBubble = appendMessage(
          '<div class="cbot-typing"><span>Searching Atlas Q&amp;A first</span><span class="cbot-typing-dots"><i></i><i></i><i></i></span></div>',
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

          var resolvedQuestion = resolveFollowUpQuestion(enQuestion || rawQuestion);
          var enParsed = normalizeQuery(resolvedQuestion);
          var atlasQuestion = resolvedQuestion || rawQuestion;
          return requestAIWebFallback(atlasQuestion, userLang, { qaOnly: true }).then(function (atlasReply) {
            if (atlasReply) return atlasReply;

            /* The existing 370 curated FAQs and other website knowledge remain the second Atlas source. */
            var kbMatchAfterTrans = searchInternalKB(enParsed, kb);
            if (kbMatchAfterTrans) return localizeReplyForLanguage(kbMatchAfterTrans, userLang);

            /* On a miss in both Atlas layers, use the optional server-side web fallback only if configured. */
            return requestAIWebFallback(atlasQuestion, userLang);
          });
        }).then(function (finalReply) {
          if (finalReply === null && !loadingBubble.parentNode) return; /* already handled by trConv */
          if (loadingBubble && loadingBubble.parentNode) {
            loadingBubble.parentNode.removeChild(loadingBubble);
          }
          if (finalReply) {
            appendMessage(finalReply, false);
          } else {
            var fallbackEn = 'I could not access the Atlas Q&A service right now. Please try a specific anatomy topic again shortly.';
            if (userLang === 'ur-Latn') {
              appendMessage('<strong>Atlas Q&amp;A abhi available nahi hai.</strong><br>Agar aap image maang rahe hain aur site par exact image nahi milti, to main image generate nahi karungi; sirf related Atlas page ya text context de sakti hoon.', false);
            } else if (userLang === 'en') {
              appendMessage('<strong>The Atlas Q&amp;A service is unavailable right now.</strong><br>Please try a specific anatomy topic again shortly.', false);
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
    }, 0);

    WAVE_TIMER = setInterval(function () {
      showBriefGreeting();
    }, 30000);

    /* Automatically block & remove Netlify's injected HUD/badge (#nl-badge-frame / #nl-hud-frame) */
    function removeNetlifyBadge() {
      try {
        var frames = document.querySelectorAll('iframe#nl-badge-frame, iframe#nl-hud-frame, iframe[title*="Netlify"], script[src*="/.netlify/scripts/hud"]');
        for (var i = 0; i < frames.length; i++) {
          var f = frames[i];
          f.style.setProperty('display', 'none', 'important');
          if (f.parentNode) f.parentNode.removeChild(f);
        }
        /* Place hidden dummy placeholders with #nl-badge-frame and #nl-hud-frame so Netlify's async HUD script exits immediately */
        if (document.body && !document.getElementById('nl-badge-frame')) {
          var dummy1 = document.createElement('span');
          dummy1.id = 'nl-badge-frame';
          dummy1.style.cssText = 'display:none!important;width:0!important;height:0!important;';
          document.body.appendChild(dummy1);
        }
        if (document.body && !document.getElementById('nl-hud-frame')) {
          var dummy2 = document.createElement('span');
          dummy2.id = 'nl-hud-frame';
          dummy2.style.cssText = 'display:none!important;width:0!important;height:0!important;';
          document.body.appendChild(dummy2);
        }
      } catch (e) {}
    }

    removeNetlifyBadge();
    setTimeout(removeNetlifyBadge, 500);
    setTimeout(removeNetlifyBadge, 1800);
    if (typeof MutationObserver !== 'undefined') {
      var badgeObs = new MutationObserver(function () {
        removeNetlifyBadge();
      });
      badgeObs.observe(document.documentElement || document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBotWidget);
  } else {
    createBotWidget();
  }
})();
