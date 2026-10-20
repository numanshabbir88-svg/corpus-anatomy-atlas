/* ============================================================
   CORPUS — anatomy dataset: systems, organs, planned, body map
   ============================================================ */
const SYSTEMS = {
 "circulatory": {
  "name": "Circulatory",
  "color": "#c0453f",
  "d": "Heart and vessels moving blood, oxygen, hormones and heat around the body."
 },
 "respiratory": {
  "name": "Respiratory",
  "color": "#3f7f9c",
  "d": "Air conduction and gas exchange between atmosphere and blood."
 },
 "nervous": {
  "name": "Nervous",
  "color": "#6d4a86",
  "d": "Central and peripheral control: sensation, integration, movement."
 },
 "urinary": {
  "name": "Urinary",
  "color": "#a9762a",
  "d": "Filtration of blood, water and electrolyte balance, excretion of urine."
 },
 "digestive": {
  "name": "Digestive",
  "color": "#a8442f",
  "d": "Ingestion, digestion, absorption of nutrients and elimination of waste."
 },
 "endocrine": {
  "name": "Endocrine",
  "color": "#5f7340",
  "d": "Ductless glands secreting hormones into the bloodstream."
 },
 "integumentary": {
  "name": "Integumentary",
  "color": "#8a6a4a",
  "d": "Skin and its appendages: barrier, thermoregulation, sensation."
 },
 "sensory": {
  "name": "Sensory",
  "color": "#2f6f8f",
  "d": "Special sense organs for vision, hearing and balance."
 },
 "lymphatic": {
  "name": "Lymphatic & immune",
  "color": "#4a7c59",
  "d": "Lymph drainage, immune surveillance and blood filtering."
 },
 "male": {
  "name": "Male reproductive",
  "color": "#3f5f9c",
  "d": "Gamete production, hormone secretion and delivery."
 },
 "female": {
  "name": "Female reproductive",
  "color": "#a34a6a",
  "d": "Gamete production, fertilisation, gestation and birth."
 },
 "skeletal": {
  "name": "Skeletal system",
  "color": "#c9a86a",
  "d": "Bones, joints and cartilage — frame, leverage, protection and marrow."
 },
 "muscular": {
  "name": "Muscular system",
  "color": "#b05252",
  "d": "Skeletal muscle and tendons — movement, posture and heat."
 }
};

const ORGANS = {
 "heart": {
  "title": "Heart",
  "latin": "Cor",
  "system": "circulatory",
  "region": "Middle mediastinum, behind the sternum",
  "size": "≈ 250–350 g · about a closed fist",
  "blood": "Right & left coronary arteries (first branches of the aorta)",
  "nerve": "Cardiac plexus — vagus (slows) + sympathetic T1–T4 (speeds up)",
  "blurb": "A four-chambered muscular pump with four valves and its own electrical conduction system.",
  "summary": "The heart is a double pump. Its right side receives deoxygenated blood from the venae cavae and sends it to the lungs; its left side receives oxygenated blood from the pulmonary veins and ejects it into the aorta. The two sides never mix because of the interatrial and interventricular septa, and one-way valves keep blood moving forwards. Contraction is triggered by an electrical impulse that begins in the sinoatrial node and sweeps through the atria, the atrioventricular node, the bundle of His and the Purkinje fibres.",
  "vb": [
   640,
   640
  ],
  "legend": [
   [
    "#c0453f",
    "Oxygenated"
   ],
   [
    "#5c76ab",
    "Deoxygenated"
   ],
   [
    "#f5c542",
    "Conduction tissue"
   ],
   [
    "#c06a63",
    "Myocardium"
   ]
  ],
  "parts": {
   "svc": {
    "n": "Superior vena cava",
    "l": "Vena cava superior",
    "t": "Great vein",
    "at": [
     188,
     54
    ],
    "s": "l",
    "d": "The large vein draining the head, neck, upper limbs and thorax. It enters the upper part of the right atrium.",
    "f": "Returns deoxygenated blood from everything above the diaphragm.",
    "c": "Obstruction (SVC syndrome) causes facial and arm swelling with distended neck veins."
   },
   "ivc": {
    "n": "Inferior vena cava",
    "l": "Vena cava inferior",
    "t": "Great vein",
    "at": [
     186,
     566
    ],
    "s": "l",
    "d": "The largest vein in the body. It collects blood from the abdomen, pelvis and lower limbs and enters the inferior part of the right atrium.",
    "f": "Returns deoxygenated blood from below the diaphragm.",
    "c": "Compression in late pregnancy reduces venous return and can cause supine hypotension."
   },
   "aorta": {
    "n": "Aorta",
    "l": "Aorta",
    "t": "Great artery",
    "at": [
     474,
     68
    ],
    "s": "r",
    "d": "The largest artery in the body. It arises from the left ventricle, arches over the left main bronchus and descends through the thorax and abdomen.",
    "f": "Distributes oxygenated blood to the entire systemic circulation.",
    "c": "A tear in the wall (aortic dissection) causes sudden tearing chest or back pain — a surgical emergency."
   },
   "pta": {
    "n": "Pulmonary trunk",
    "l": "Truncus pulmonalis",
    "t": "Great artery",
    "at": [
     206,
     126
    ],
    "s": "l",
    "d": "Leaves the right ventricle and divides into right and left pulmonary arteries. Uniquely, it carries deoxygenated blood.",
    "f": "Carries blood from the right ventricle to the lungs for oxygenation.",
    "c": "A clot lodging here (pulmonary embolism) causes breathlessness, pleuritic pain and hypoxia."
   },
   "pv": {
    "n": "Pulmonary veins",
    "l": "Venae pulmonales",
    "t": "Veins",
    "at": [
     528,
     176
    ],
    "s": "r",
    "d": "Four veins — two from each lung — that carry freshly oxygenated blood into the left atrium.",
    "f": "Return oxygenated blood from the lungs to the heart.",
    "c": "Ectopic electrical foci in the pulmonary vein ostia are the commonest trigger of atrial fibrillation."
   },
   "myo": {
    "n": "Myocardium",
    "l": "Myocardium",
    "t": "Muscle wall",
    "at": [
     112,
     250
    ],
    "s": "l",
    "d": "The thick middle layer of the heart wall, made of branching, interlinked cardiac muscle fibres joined by intercalated discs.",
    "f": "Contracts to generate the pressure that ejects blood.",
    "c": "Death of myocardium from a blocked coronary artery is a myocardial infarction; the dead tissue scars rather than regrows."
   },
   "ra": {
    "n": "Right atrium",
    "l": "Atrium dextrum",
    "t": "Chamber",
    "at": [
     206,
     208
    ],
    "s": "l",
    "d": "Thin-walled receiving chamber for the superior and inferior venae cavae and the coronary sinus. Contains the fossa ovalis and the right auricle.",
    "f": "Collects deoxygenated blood and passes it to the right ventricle through the tricuspid valve.",
    "c": "Houses the SA node, so it initiates every normal heartbeat."
   },
   "la": {
    "n": "Left atrium",
    "l": "Atrium sinistrum",
    "t": "Chamber",
    "at": [
     450,
     204
    ],
    "s": "r",
    "d": "The most posterior chamber, receiving the four pulmonary veins.",
    "f": "Passes oxygenated blood to the left ventricle through the mitral valve.",
    "c": "Enlargement can press on the oesophagus (dysphagia) or the recurrent laryngeal nerve (hoarseness)."
   },
   "rv": {
    "n": "Right ventricle",
    "l": "Ventriculus dexter",
    "t": "Chamber",
    "at": [
     196,
     352
    ],
    "s": "l",
    "d": "Crescent-shaped chamber with a thinner wall than the left, lined by trabeculae carneae and containing the moderator band.",
    "f": "Pumps deoxygenated blood through the pulmonary valve into the pulmonary trunk.",
    "c": "Fails first in pulmonary hypertension (cor pulmonale), causing raised jugular venous pressure and ankle oedema."
   },
   "lv": {
    "n": "Left ventricle",
    "l": "Ventriculus sinister",
    "t": "Chamber",
    "at": [
     408,
     400
    ],
    "s": "r",
    "d": "The thickest-walled chamber — roughly three times the right ventricle — because it must drive blood around the whole body.",
    "f": "Ejects oxygenated blood through the aortic valve into the aorta.",
    "c": "Pressure overload (hypertension, aortic stenosis) causes concentric hypertrophy and later heart failure."
   },
   "ias": {
    "n": "Interatrial septum",
    "l": "Septum interatriale",
    "t": "Septum",
    "at": [
     310,
     190
    ],
    "s": "r",
    "d": "The thin wall between the two atria. Its shallow depression, the fossa ovalis, marks where the foramen ovale closed after birth.",
    "f": "Keeps the atrial circulations separate.",
    "c": "A patent foramen ovale persists in ~25% of adults and can allow a paradoxical embolus to cause a stroke."
   },
   "ivs": {
    "n": "Interventricular septum",
    "l": "Septum interventriculare",
    "t": "Septum",
    "at": [
     318,
     420
    ],
    "s": "r",
    "d": "Thick muscular wall between the ventricles, with a thin membranous part just below the aortic valve.",
    "f": "Prevents mixing of oxygenated and deoxygenated blood and carries the bundle branches.",
    "c": "The membranous part is the commonest site of a ventricular septal defect, the most frequent congenital heart lesion."
   },
   "tricuspid": {
    "n": "Tricuspid valve",
    "l": "Valva tricuspidalis",
    "t": "Atrioventricular valve",
    "at": [
     238,
     272
    ],
    "s": "l",
    "d": "Three cusps (anterior, posterior, septal) between right atrium and right ventricle.",
    "f": "Closes at ventricular systole to stop backflow into the right atrium.",
    "c": "Regurgitation produces large \"v\" waves in the jugular venous pulse and a pulsatile liver."
   },
   "mitral": {
    "n": "Mitral valve",
    "l": "Valva mitralis",
    "t": "Atrioventricular valve",
    "at": [
     390,
     266
    ],
    "s": "r",
    "d": "The bicuspid valve between left atrium and left ventricle, with anterior and posterior cusps.",
    "f": "Closes at ventricular systole to stop backflow into the left atrium.",
    "c": "Rheumatic fever most often narrows it (mitral stenosis), giving a mid-diastolic murmur and atrial fibrillation."
   },
   "aortic": {
    "n": "Aortic valve",
    "l": "Valva aortae",
    "t": "Semilunar valve",
    "at": [
     340,
     214
    ],
    "s": "r",
    "d": "Three semilunar cusps (right, left and non-coronary) at the root of the aorta. The right and left sinuses above the cusps give off the coronary arteries.",
    "f": "Opens in systole, closes in diastole to prevent reflux into the left ventricle.",
    "c": "Calcific aortic stenosis in the elderly causes angina, syncope and breathlessness."
   },
   "pulmonary": {
    "n": "Pulmonary valve",
    "l": "Valva trunci pulmonalis",
    "t": "Semilunar valve",
    "at": [
     268,
     240
    ],
    "s": "l",
    "d": "Three semilunar cusps at the junction of the right ventricle and pulmonary trunk.",
    "f": "Prevents backflow from the pulmonary trunk into the right ventricle during diastole.",
    "c": "Absent or stenotic in tetralogy of Fallot, contributing to right-to-left shunting."
   },
   "chordae": {
    "n": "Chordae tendineae",
    "l": "Chordae tendineae",
    "t": "Support",
    "at": [
     404,
     300
    ],
    "s": "r",
    "d": "Fibrous \"heart strings\" running from the edges of the AV valve cusps to the papillary muscles.",
    "f": "Tauten during systole so the cusps cannot prolapse into the atria.",
    "c": "Rupture (e.g. after infarction or in endocarditis) causes sudden severe valve regurgitation."
   },
   "papillary": {
    "n": "Papillary muscles",
    "l": "Musculi papillares",
    "t": "Support",
    "at": [
     200,
     400
    ],
    "s": "l",
    "d": "Conical muscles projecting from the ventricular walls; two in the left ventricle, three in the right.",
    "f": "Contract with the ventricle to anchor the chordae tendineae.",
    "c": "The posteromedial papillary muscle has a single blood supply and is the one most likely to rupture after infarction."
   },
   "coronary": {
    "n": "Coronary arteries",
    "l": "Arteriae coronariae",
    "t": "Arteries",
    "at": [
     178,
     336
    ],
    "s": "l",
    "d": "Right and left coronary arteries arising from the aortic sinuses. The left divides into the anterior interventricular (LAD) and circumflex branches.",
    "f": "Supply the myocardium itself — the heart fills during diastole but perfuses itself only then.",
    "c": "Atherosclerotic narrowing here causes angina; acute occlusion causes myocardial infarction. The LAD is the \"widow-maker\"."
   },
   "sa": {
    "n": "Sinoatrial node",
    "l": "Nodus sinuatrialis",
    "t": "Conduction",
    "at": [
     186,
     166
    ],
    "s": "l",
    "d": "A crescent of specialised pacemaker cells in the right atrial wall at the entrance of the SVC. Fires at ~60–100/min without any nervous input.",
    "f": "Sets the heart rate — the natural pacemaker.",
    "c": "Sick sinus syndrome causes bradycardia and pauses, often needing a permanent pacemaker."
   },
   "av": {
    "n": "Atrioventricular node",
    "l": "Nodus atrioventricularis",
    "t": "Conduction",
    "at": [
     292,
     262
    ],
    "s": "l",
    "d": "Pacemaker tissue in the inferior interatrial septum, near the coronary sinus and the septal cusp of the tricuspid valve.",
    "f": "Delays the impulse ~0.1 s so the atria finish emptying before the ventricles contract.",
    "c": "The only normal electrical connection between atria and ventricles; block here causes heart block."
   },
   "his": {
    "n": "Bundle of His & bundle branches",
    "l": "Fasciculus atrioventricularis",
    "t": "Conduction",
    "at": [
     322,
     326
    ],
    "s": "r",
    "d": "The bundle of His crosses the fibrous skeleton, then splits into right and left bundle branches that run down the interventricular septum to the Purkinje fibres.",
    "f": "Conducts the impulse rapidly to both ventricles so they contract almost simultaneously, from apex upwards.",
    "c": "Branch blocks widen the QRS complex on the ECG; the left bundle branch block masks infarction patterns."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"h-myo\" cx=\"36%\" cy=\"26%\" r=\"86%\">\n      <stop offset=\"0\" stop-color=\"#dd938a\"/><stop offset=\".5\" stop-color=\"#c26a63\"/><stop offset=\"1\" stop-color=\"#8b3733\"/>\n    </radialGradient>\n    <radialGradient id=\"h-rch\" cx=\"38%\" cy=\"28%\" r=\"84%\">\n      <stop offset=\"0\" stop-color=\"#8299c6\"/><stop offset=\"1\" stop-color=\"#3c5688\"/>\n    </radialGradient>\n    <radialGradient id=\"h-lch\" cx=\"38%\" cy=\"28%\" r=\"84%\">\n      <stop offset=\"0\" stop-color=\"#d1615a\"/><stop offset=\"1\" stop-color=\"#8b2b28\"/>\n    </radialGradient>\n    <linearGradient id=\"h-art\" x1=\"0\" y1=\"0\" x2=\".8\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#d85f55\"/><stop offset=\"1\" stop-color=\"#9e3731\"/>\n    </linearGradient>\n    <linearGradient id=\"h-vein\" x1=\"0\" y1=\"0\" x2=\".8\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#6885b8\"/><stop offset=\"1\" stop-color=\"#33497a\"/>\n    </linearGradient>\n    <linearGradient id=\"h-sep\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\">\n      <stop offset=\"0\" stop-color=\"#d98b83\"/><stop offset=\"1\" stop-color=\"#b9635c\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- great veins (behind) -->\n  <g class=\"vessel-v\" fill=\"none\" stroke=\"url(#h-vein)\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"svc\" d=\"M196 158 C188 108 184 66 182 22\" stroke-width=\"32\"/>\n    <path class=\"part\" data-id=\"ivc\" d=\"M208 452 C194 502 184 542 178 596\" stroke-width=\"32\"/>\n    <path d=\"M250 146 C274 126 300 116 322 118\" stroke-width=\"17\"/>\n    <path class=\"part\" data-id=\"pta\" d=\"M278 244 C268 198 262 168 246 146 C228 122 194 114 168 128 C146 140 124 142 108 136\" stroke-width=\"27\"/>\n  </g>\n  <!-- great arteries (behind top, in front of veins) -->\n  <g class=\"vessel-a\" fill=\"none\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"pv\" d=\"M566 166 C528 174 492 182 462 192 M566 214 C528 214 494 210 466 204\" stroke=\"url(#h-art)\" stroke-width=\"15\"/>\n    <path d=\"M382 78 L374 32 M414 64 L412 22 M446 70 L456 28\" stroke=\"url(#h-art)\" stroke-width=\"13\"/>\n    <path class=\"part\" data-id=\"aorta\" d=\"M334 214 C328 156 340 108 372 84 C410 56 466 64 486 102 C498 126 498 150 494 178\" stroke=\"url(#h-art)\" stroke-width=\"27\"/>\n  </g>\n\n  <!-- myocardium -->\n  <path class=\"part\" data-id=\"myo\" d=\"M300 578 C192 512 96 408 88 292 C82 210 128 150 194 144 C252 139 292 168 314 208 C336 168 386 136 444 142 C512 149 552 214 542 296 C530 410 424 512 342 566 Z\" fill=\"url(#h-myo)\" stroke=\"#7d2f2c\" stroke-width=\"2.4\"/>\n  <path d=\"M120 240 C132 190 168 164 206 162\" fill=\"none\" stroke=\"#e9a9a1\" stroke-width=\"7\" opacity=\".33\" stroke-linecap=\"round\"/>\n\n  <!-- chambers -->\n  <g class=\"atr\">\n    <path class=\"part\" data-id=\"ra\" d=\"M212 174 C254 164 286 182 290 214 C294 246 264 262 226 254 C192 248 172 224 178 198 C182 182 196 177 212 174 Z\" fill=\"url(#h-rch)\" stroke=\"#33497a\" stroke-width=\"1.6\"/>\n    <path class=\"part\" data-id=\"la\" d=\"M420 170 C458 162 488 180 490 210 C492 240 462 256 428 252 C394 248 374 224 378 198 C381 180 400 174 420 170 Z\" fill=\"url(#h-lch)\" stroke=\"#7d2f2c\" stroke-width=\"1.6\"/>\n  </g>\n  <g class=\"vent\">\n    <path class=\"part\" data-id=\"rv\" d=\"M288 268 C292 324 284 388 258 430 C232 470 194 464 174 424 C150 380 142 322 150 278 C156 252 284 250 288 268 Z\" fill=\"url(#h-rch)\" stroke=\"#33497a\" stroke-width=\"1.6\"/>\n    <path class=\"part\" data-id=\"lv\" d=\"M334 262 C344 330 344 412 330 472 C322 512 344 532 366 510 C406 470 438 396 444 322 C448 284 440 262 428 256 C392 246 350 246 334 262 Z\" fill=\"url(#h-lch)\" stroke=\"#7d2f2c\" stroke-width=\"1.6\"/>\n  </g>\n  <path d=\"M176 300 C182 340 190 372 202 396\" fill=\"none\" stroke=\"#a9bcd9\" stroke-width=\"4\" opacity=\".28\" stroke-linecap=\"round\"/>\n  <path d=\"M424 300 C416 350 402 400 386 440\" fill=\"none\" stroke=\"#eaa8a2\" stroke-width=\"4\" opacity=\".25\" stroke-linecap=\"round\"/>\n\n  <!-- septa -->\n  <path class=\"part\" data-id=\"ias\" d=\"M296 172 L320 172 L320 256 L296 256 Z\" fill=\"url(#h-sep)\" stroke=\"#8b3733\" stroke-width=\"1.2\"/>\n  <path class=\"part\" data-id=\"ivs\" d=\"M292 256 C308 300 308 384 298 442 C294 472 308 496 322 478 C334 452 338 380 332 300 C328 266 314 252 292 256 Z\" fill=\"url(#h-sep)\" stroke=\"#8b3733\" stroke-width=\"1.4\"/>\n\n  <!-- valves -->\n  <g stroke=\"#a3564e\" stroke-width=\"1.5\">\n    <path class=\"part\" data-id=\"tricuspid\" d=\"M200 250 C220 254 236 268 246 286 C256 268 272 254 292 250 C272 262 254 278 246 296 C238 278 220 262 200 250 Z\" fill=\"#f7ece5\"/>\n    <path class=\"part\" data-id=\"mitral\" d=\"M344 248 C364 252 380 266 390 284 C400 266 416 252 436 248 C416 260 398 276 390 294 C382 276 364 260 344 248 Z\" fill=\"#f7ece5\"/>\n  </g>\n  <g class=\"part\" data-id=\"aortic\">\n    <circle cx=\"334\" cy=\"216\" r=\"16\" fill=\"#faeee8\" stroke=\"#a3564e\" stroke-width=\"1.6\"/>\n    <path d=\"M334 200 L334 232 M320 208 L348 224 M348 208 L320 224\" stroke=\"#b06a60\" stroke-width=\"1.5\" fill=\"none\"/>\n  </g>\n  <g class=\"part\" data-id=\"pulmonary\">\n    <circle cx=\"278\" cy=\"242\" r=\"13\" fill=\"#faeee8\" stroke=\"#a3564e\" stroke-width=\"1.6\"/>\n    <path d=\"M278 229 L278 255 M267 235 L289 249 M289 235 L267 249\" stroke=\"#b06a60\" stroke-width=\"1.4\" fill=\"none\"/>\n  </g>\n\n  <!-- chordae + papillary -->\n  <g class=\"part\" data-id=\"chordae\" fill=\"none\" stroke=\"#f2e4dc\" stroke-width=\"1.9\" stroke-linecap=\"round\">\n    <path d=\"M372 448 L386 292 M372 448 L364 290 M414 410 L396 290 M414 410 L406 288 M204 402 L240 292 M204 402 L222 290 M252 414 L248 294 M252 414 L268 290\"/>\n  </g>\n  <g class=\"part\" data-id=\"papillary\" fill=\"#e5a49c\" stroke=\"#96433c\" stroke-width=\"1.3\">\n    <path d=\"M360 456 C350 428 362 408 376 414 C390 420 386 448 374 460 Z\"/>\n    <path d=\"M406 418 C400 394 414 380 424 388 C434 396 426 418 416 424 Z\"/>\n    <path d=\"M196 410 C188 386 202 372 212 380 C222 388 214 410 204 416 Z\"/>\n    <path d=\"M244 424 C238 402 250 390 260 396 C270 402 262 424 252 430 Z\"/>\n  </g>\n\n  <!-- coronary arteries -->\n  <g class=\"part\" data-id=\"coronary\" fill=\"none\" stroke=\"#e4574d\" stroke-linecap=\"round\">\n    <path d=\"M320 238 C312 302 306 384 300 476\" stroke-width=\"5.5\"/>\n    <path d=\"M324 240 C372 252 416 272 444 302\" stroke-width=\"5\"/>\n    <path d=\"M312 234 C272 246 228 254 190 272 C164 284 152 306 154 328\" stroke-width=\"5.5\"/>\n    <path d=\"M314 300 C336 314 356 330 372 350 M308 360 C286 372 268 386 254 402 M200 282 C196 306 196 330 200 352\" stroke-width=\"2.4\" opacity=\".85\"/>\n  </g>\n\n  <!-- conduction system -->\n  <g class=\"part\" data-id=\"sa\"><circle cx=\"188\" cy=\"166\" r=\"9.5\" fill=\"#f7cd52\" stroke=\"#8a6a12\" stroke-width=\"1.6\"/></g>\n  <g class=\"part\" data-id=\"av\"><circle cx=\"294\" cy=\"262\" r=\"8\" fill=\"#f7cd52\" stroke=\"#8a6a12\" stroke-width=\"1.6\"/></g>\n  <g class=\"part\" data-id=\"his\" fill=\"none\" stroke=\"#f7cd52\" stroke-width=\"3.4\" stroke-linecap=\"round\" opacity=\".95\">\n    <path d=\"M296 268 C302 284 304 292 306 302\"/>\n    <path d=\"M306 302 C300 344 296 392 292 440\"/>\n    <path d=\"M306 302 C316 344 322 396 326 446\"/>\n    <path d=\"M292 440 L280 458 M292 440 L296 462 M326 446 L318 466 M326 446 L338 462\" stroke-width=\"2\"/>\n  </g>",
  "anims": [
   {
    "id": "beat",
    "label": "Cardiac cycle",
    "cls": "beat"
   },
   {
    "id": "flow",
    "label": "Blood flow",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#6f8fc4\"><animateMotion dur=\"4.6s\" repeatCount=\"indefinite\" path=\"M182 24 C186 80 192 130 210 190 C226 224 238 254 234 296 C230 340 218 374 204 398 C228 380 258 330 270 282 C278 246 266 198 240 158 C218 130 176 122 132 132 C110 138 96 138 92 138\"/><animate attributeName=\"opacity\" values=\"0;1;1;0\" dur=\"4.6s\" repeatCount=\"indefinite\"/></circle>\n        <circle r=\"5\" fill=\"#6f8fc4\"><animateMotion dur=\"4.6s\" begin=\"-2.3s\" repeatCount=\"indefinite\" path=\"M182 24 C186 80 192 130 210 190 C226 224 238 254 234 296 C230 340 218 374 204 398 C228 380 258 330 270 282 C278 246 266 198 240 158 C218 130 176 122 132 132 C110 138 96 138 92 138\"/></circle>\n        <circle r=\"5\" fill=\"#e0655c\"><animateMotion dur=\"4.6s\" begin=\"-1.1s\" repeatCount=\"indefinite\" path=\"M566 176 C520 186 486 196 456 208 C432 234 402 254 392 292 C386 336 380 384 372 430 C368 380 358 320 342 268 C334 238 330 214 334 178 C340 128 356 96 384 76 C424 52 470 62 490 100 C502 124 502 148 498 172\"/><animate attributeName=\"opacity\" values=\"0;1;1;0\" dur=\"4.6s\" begin=\"-1.1s\" repeatCount=\"indefinite\"/></circle>\n        <circle r=\"5\" fill=\"#e0655c\"><animateMotion dur=\"4.6s\" begin=\"-3.4s\" repeatCount=\"indefinite\" path=\"M566 176 C520 186 486 196 456 208 C432 234 402 254 392 292 C386 336 380 384 372 430 C368 380 358 320 342 268 C334 238 330 214 334 178 C340 128 356 96 384 76 C424 52 470 62 490 100 C502 124 502 148 498 172\"/></circle>\n      </g>"
   },
   {
    "id": "conduction",
    "label": "Electrical impulse",
    "layer": "\n      <g class=\"flow-layer\">\n        <path class=\"signal-path\" d=\"M188 166 C216 186 250 214 294 262 C302 284 304 292 306 302 C300 344 296 392 292 440\"/>\n        <path class=\"signal-path\" style=\"animation-delay:.25s\" d=\"M188 166 C240 150 340 152 420 178\"/>\n        <path class=\"signal-path\" style=\"animation-delay:.55s\" d=\"M306 302 C316 344 322 396 326 446\"/>\n        <circle r=\"6\" fill=\"#ffe066\"><animateMotion dur=\"1s\" repeatCount=\"indefinite\" path=\"M188 166 C216 186 250 214 294 262 C302 284 304 292 306 302 C300 344 296 392 292 440\"/></circle>\n      </g>"
   }
  ],
  "extra": {
   "rate": {
    "min": 40,
    "max": 170,
    "val": 72,
    "unit": " bpm",
    "label": "Heart rate"
   }
  },
  "quiz": [
   {
    "q": "Which chamber has the thickest muscular wall?",
    "opts": [
     "Right atrium",
     "Right ventricle",
     "Left ventricle",
     "Left atrium"
    ],
    "a": 2,
    "why": "The left ventricle must generate systemic pressure (~120 mmHg) versus ~25 mmHg in the pulmonary circuit, so its wall is roughly three times thicker."
   },
   {
    "q": "The delay of about 0.1 s in the cardiac cycle occurs in the…",
    "opts": [
     "SA node",
     "AV node",
     "Bundle of His",
     "Purkinje fibres"
    ],
    "a": 1,
    "why": "The AV node conducts slowly. That delay lets the atria finish emptying before the ventricles contract."
   },
   {
    "q": "Blood in the pulmonary trunk is…",
    "opts": [
     "Oxygenated, heading to the body",
     "Deoxygenated, heading to the lungs",
     "Oxygenated, returning from the lungs",
     "Mixed, because of the fossa ovalis"
    ],
    "a": 1,
    "why": "The pulmonary arteries are the only arteries carrying deoxygenated blood; they take blood from the right ventricle to the lungs."
   }
  ],
  "related": [
   "lungs",
   "liver",
   "kidney",
   "brain"
  ],
  "photo": {
   "file": "heart.jpg",
   "credit": "3D render — cut-away coronal section (reference artwork)",
   "hot": {
    "pta": [
     500,
     126
    ],
    "aorta": [
     583,
     84
    ],
    "ra": [
     150,
     368
    ],
    "tricuspid": [
     208,
     316
    ],
    "coronary": [
     542,
     305
    ],
    "mitral": [
     633,
     316
    ],
    "rv": [
     208,
     505
    ],
    "chordae": [
     292,
     632
    ],
    "papillary": [
     400,
     737
    ],
    "ivs": [
     517,
     652
    ],
    "lv": [
     667,
     684
    ],
    "myo": [
     733,
     800
    ],
    "pulmonary": [
     500,
     316
    ]
   }
  }
 },
 "lungs": {
  "title": "Lungs",
  "latin": "Pulmones",
  "system": "respiratory",
  "region": "Pleural cavities of the thorax, either side of the mediastinum",
  "size": "Right ≈ 625 g, left ≈ 565 g · ~300 million alveoli",
  "blood": "Pulmonary arteries (gas exchange) + bronchial arteries (tissue supply)",
  "nerve": "Pulmonary plexus — vagus (bronchoconstriction) + sympathetic T2–T4",
  "blurb": "Two elastic, pleura-lined organs where air and blood come within 0.5 µm of each other.",
  "summary": "Air is conducted from the trachea through progressively dividing bronchi and bronchioles until it reaches the alveoli, where oxygen diffuses into pulmonary capillaries and carbon dioxide diffuses out. The right lung has three lobes separated by oblique and horizontal fissures; the left has two, with a cardiac notch and lingula to accommodate the heart. Each lung is wrapped in visceral pleura, opposed by parietal pleura across a thin fluid-filled cavity whose surface tension keeps the lung expanded.",
  "vb": [
   640,
   600
  ],
  "legend": [
   [
    "#d9a49c",
    "Lung tissue"
   ],
   [
    "#dcc7a6",
    "Airway"
   ],
   [
    "#3f5f9c",
    "Pulmonary artery"
   ],
   [
    "#c0453f",
    "Pulmonary vein"
   ],
   [
    "#b06a63",
    "Diaphragm"
   ]
  ],
  "parts": {
   "trachea": {
    "n": "Trachea",
    "l": "Trachea",
    "t": "Airway",
    "at": [
     320,
     52
    ],
    "s": "r",
    "d": "A 10–12 cm tube held open by 16–20 C-shaped hyaline cartilage rings, open posteriorly where the trachealis muscle lies. Lined by ciliated pseudostratified columnar epithelium with goblet cells.",
    "f": "Conducts, warms, humidifies and filters inspired air.",
    "c": "Foreign bodies more often enter the right main bronchus because it is wider, shorter and more vertical."
   },
   "bronchi": {
    "n": "Main & lobar bronchi",
    "l": "Bronchi principales et lobares",
    "t": "Airway",
    "at": [
     248,
     214
    ],
    "s": "l",
    "d": "The trachea divides at the carina (T4/T5) into right and left main bronchi, which divide into lobar then segmental bronchi. Cartilage plates replace rings as the airways narrow.",
    "f": "Distribute air to each lobe and bronchopulmonary segment.",
    "c": "Each segmental bronchus supplies a bronchopulmonary segment that can be surgically removed on its own."
   },
   "tree": {
    "n": "Bronchioles",
    "l": "Bronchioli",
    "t": "Airway",
    "at": [
     430,
     300
    ],
    "s": "r",
    "d": "Airways under 1 mm with no cartilage and relatively more smooth muscle, ending in terminal then respiratory bronchioles.",
    "f": "Regulate airflow resistance and deliver air to the alveolar ducts.",
    "c": "Smooth-muscle spasm of the bronchioles is the main problem in asthma; smooth muscle is also the target of salbutamol."
   },
   "rlung": {
    "n": "Right lung — three lobes",
    "l": "Pulmo dexter",
    "t": "Organ",
    "at": [
     176,
     330
    ],
    "s": "l",
    "d": "Superior, middle and inferior lobes separated by the oblique and horizontal fissures. Shorter than the left because the liver sits below, but wider and heavier.",
    "f": "Gas exchange across ~150 million alveoli.",
    "c": "The right middle lobe is prone to collapse (middle-lobe syndrome) because its bronchus is narrow and surrounded by nodes."
   },
   "llung": {
    "n": "Left lung — two lobes",
    "l": "Pulmo sinister",
    "t": "Organ",
    "at": [
     474,
     330
    ],
    "s": "r",
    "d": "Superior and inferior lobes separated by the oblique fissure only. Narrower than the right because the heart bulges to the left.",
    "f": "Gas exchange; the lingula of the superior lobe is the equivalent of the right middle lobe.",
    "c": "A left upper-lobe mass can compress the recurrent laryngeal nerve, causing hoarseness."
   },
   "fissures": {
    "n": "Fissures",
    "l": "Fissurae pulmonis",
    "t": "Landmark",
    "at": [
     216,
     238
    ],
    "s": "l",
    "d": "Deep invaginations of visceral pleura. The oblique fissure runs in both lungs (T4 posteriorly to the 6th rib anteriorly); the horizontal fissure is right-sided only.",
    "f": "Allow the lobes to slide against each other and define surgical planes.",
    "c": "Fluid collects in the fissures on a chest radiograph as a \"phantom tumour\" in heart failure."
   },
   "notch": {
    "n": "Cardiac notch & lingula",
    "l": "Incisura cardiaca",
    "t": "Landmark",
    "at": [
     398,
     364
    ],
    "s": "l",
    "d": "A concave impression on the anterior border of the left lung that cradles the heart; the tongue-like projection below it is the lingula.",
    "f": "Makes room for the heart and left ventricular apex.",
    "c": "The bare area of pericardium behind this notch allows pericardiocentesis without crossing the pleura."
   },
   "hilum": {
    "n": "Hilum",
    "l": "Hilum pulmonis",
    "t": "Landmark",
    "at": [
     268,
     252
    ],
    "s": "l",
    "d": "The wedge-shaped entry point on the mediastinal surface: main bronchus, pulmonary artery, pulmonary veins, bronchial vessels, lymphatics and nerves.",
    "f": "The lung's root — everything enters and leaves here.",
    "c": "Hilar lymph node enlargement is a classic sign of sarcoidosis and tuberculosis."
   },
   "pleura": {
    "n": "Pleura & pleural cavity",
    "l": "Pleura",
    "t": "Membrane",
    "at": [
     126,
     206
    ],
    "s": "l",
    "d": "Visceral pleura covers the lung; parietal pleura lines the wall. Between them is a potential space with a film of serous fluid.",
    "f": "Surface tension couples the lung to the chest wall so it expands with it, and the fluid lets the layers glide.",
    "c": "Air entering the cavity collapses the lung — a pneumothorax. Fluid gives a pleural effusion with stony dullness on percussion."
   },
   "pa": {
    "n": "Pulmonary arteries",
    "l": "Arteriae pulmonales",
    "t": "Vessels",
    "at": [
     290,
     258
    ],
    "s": "l",
    "d": "Carry deoxygenated blood from the right ventricle, branching alongside the bronchi into each segment.",
    "f": "Bring the whole cardiac output to the alveolar capillaries.",
    "c": "Hypoxic pulmonary vasoconstriction shunts blood away from poorly ventilated regions — reversed globally in COPD, causing pulmonary hypertension."
   },
   "pvn": {
    "n": "Pulmonary veins",
    "l": "Venae pulmonales",
    "t": "Vessels",
    "at": [
     350,
     282
    ],
    "s": "r",
    "d": "Four veins that collect oxygenated blood from the capillary plexus and drain into the left atrium.",
    "f": "Return oxygenated blood to the systemic pump.",
    "c": "They run in the interlobular septa — the opposite position to the pulmonary arteries."
   },
   "diaphragm": {
    "n": "Diaphragm",
    "l": "Diaphragma",
    "t": "Muscle",
    "at": [
     320,
     470
    ],
    "s": "r",
    "d": "A dome-shaped musculotendinous sheet separating thorax from abdomen, with crura arising from the lumbar vertebrae and openings for the aorta (T12), oesophagus (T10) and IVC (T8).",
    "f": "The main muscle of inspiration — contraction flattens the dome and enlarges the thorax.",
    "c": "Supplied by the phrenic nerve (C3–C5): \"C3, 4, 5 keeps the diaphragm alive\". A high spinal cord injury above C3 stops spontaneous breathing."
   },
   "alveoli": {
    "n": "Alveoli & capillary bed",
    "l": "Alveoli pulmonis",
    "t": "Functional unit",
    "at": [
     300,
     548
    ],
    "s": "l",
    "d": "Thin-walled sacs of type I pneumocytes wrapped in capillaries; type II pneumocytes secrete surfactant and alveolar macrophages patrol the surface. Together they present ~70 m² of membrane only 0.5 µm thick.",
    "f": "Diffusion of O₂ into blood and CO₂ out of it.",
    "c": "Surfactant deficiency in premature infants causes respiratory distress syndrome. Emphysema destroys the walls, reducing surface area."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"l-tis\" cx=\"40%\" cy=\"24%\" r=\"88%\">\n      <stop offset=\"0\" stop-color=\"#e5b4ab\"/><stop offset=\".55\" stop-color=\"#cf948c\"/><stop offset=\"1\" stop-color=\"#a4665f\"/>\n    </radialGradient>\n    <linearGradient id=\"l-air\" gradientUnits=\"userSpaceOnUse\" x1=\"320\" y1=\"0\" x2=\"320\" y2=\"470\">\n      <stop offset=\"0\" stop-color=\"#eeddbe\"/><stop offset=\"1\" stop-color=\"#c6a983\"/>\n    </linearGradient>\n    <linearGradient id=\"l-dia\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#c07a70\"/><stop offset=\"1\" stop-color=\"#8e4b45\"/>\n    </linearGradient>\n    <clipPath id=\"l-clipR\"><path d=\"M268 118 C232 94 176 102 146 146 C112 196 96 266 100 328 C104 390 128 438 168 450 C214 464 254 440 268 398 C280 358 282 198 268 118 Z\"/></clipPath>\n    <clipPath id=\"l-clipL\"><path d=\"M372 116 C410 92 466 102 496 146 C530 196 546 266 542 328 C538 390 514 438 474 450 C428 464 388 440 374 398 C368 378 380 364 392 348 C404 332 404 316 392 304 C378 290 370 272 370 248 Z\"/></clipPath>\n  </defs>\n\n  <!-- pleural domes (dashed) -->\n  <g class=\"part\" data-id=\"pleura\" fill=\"none\" stroke=\"#cfe0dd\" stroke-width=\"1.8\" stroke-dasharray=\"8 7\" opacity=\".5\">\n    <path d=\"M276 106 C236 78 168 88 134 138 C98 192 82 266 86 332 C90 398 118 450 162 464 C214 480 260 452 276 406 Z\"/>\n    <path d=\"M364 104 C404 76 472 86 506 136 C542 190 558 264 554 330 C550 396 522 448 478 462 C426 478 380 450 364 404 Z\"/>\n  </g>\n\n  <!-- lungs -->\n  <g class=\"lungR\">\n    <path class=\"part\" data-id=\"rlung\" d=\"M268 118 C232 94 176 102 146 146 C112 196 96 266 100 328 C104 390 128 438 168 450 C214 464 254 440 268 398 C280 358 282 198 268 118 Z\" fill=\"url(#l-tis)\" stroke=\"#8d554e\" stroke-width=\"2.2\"/>\n    <g clip-path=\"url(#l-clipR)\" opacity=\".5\" fill=\"none\" stroke=\"#a06a62\" stroke-width=\"1.3\">\n      <path d=\"M110 150 h170 M104 180 h176 M100 210 h180 M98 240 h182 M98 270 h182 M100 300 h180 M104 330 h176 M110 360 h170 M120 390 h160 M134 420 h146\"/>\n    </g>\n    <g class=\"part\" data-id=\"fissures\" fill=\"none\" stroke=\"#7d423c\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".85\">\n      <path d=\"M258 172 C222 224 186 300 170 404\"/>\n      <path d=\"M198 268 C224 262 246 262 266 266\"/>\n    </g>\n  </g>\n  <g class=\"lungL\">\n    <path class=\"part\" data-id=\"llung\" d=\"M372 116 C410 92 466 102 496 146 C530 196 546 266 542 328 C538 390 514 438 474 450 C428 464 388 440 374 398 C368 378 380 364 392 348 C404 332 404 316 392 304 C378 290 370 272 370 248 Z\" fill=\"url(#l-tis)\" stroke=\"#8d554e\" stroke-width=\"2.2\"/>\n    <g clip-path=\"url(#l-clipL)\" opacity=\".5\" fill=\"none\" stroke=\"#a06a62\" stroke-width=\"1.3\">\n      <path d=\"M366 150 h180 M362 180 h184 M360 210 h186 M360 240 h186 M362 270 h184 M366 300 h180 M372 330 h174 M380 360 h166 M392 390 h154 M406 420 h140\"/>\n    </g>\n    <g class=\"part\" data-id=\"fissures\" fill=\"none\" stroke=\"#7d423c\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".85\">\n      <path d=\"M382 172 C418 224 454 300 470 404\"/>\n    </g>\n    <path class=\"part\" data-id=\"notch\" d=\"M374 398 C368 378 380 364 392 348 C404 332 404 316 392 304 C378 290 370 272 370 248\" fill=\"none\" stroke=\"#f0dcd6\" stroke-width=\"3.4\" opacity=\".8\"/>\n  </g>\n\n  <!-- pulmonary vessels at hilum -->\n  <g fill=\"none\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"pa\" d=\"M320 276 C304 258 288 248 272 246 M320 276 C336 258 352 248 368 246\" stroke=\"#4f6fa8\" stroke-width=\"13\"/>\n    <path d=\"M320 276 L320 300\" stroke=\"#4f6fa8\" stroke-width=\"15\"/>\n    <path class=\"part\" data-id=\"pvn\" d=\"M272 262 C288 282 304 294 318 300 M368 262 C352 282 336 294 324 300\" stroke=\"#c0453f\" stroke-width=\"11\"/>\n  </g>\n\n  <!-- airway tree -->\n  <g class=\"part\" data-id=\"trachea\" stroke=\"url(#l-air)\" stroke-width=\"34\" stroke-linecap=\"round\" fill=\"none\">\n    <path d=\"M320 6 L320 176\"/>\n  </g>\n  <g stroke=\"#c3a681\" stroke-width=\"5\" stroke-linecap=\"round\" opacity=\".8\">\n    <path d=\"M304 56 h32 M304 78 h32 M304 100 h32 M304 122 h32 M304 144 h32 M304 164 h32\"/>\n  </g>\n  <g fill=\"none\" stroke=\"url(#l-air)\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"bronchi\" d=\"M314 180 C292 194 268 208 246 218 M326 180 C348 196 370 208 392 218\" stroke-width=\"21\"/>\n    <path class=\"part\" data-id=\"bronchi\" d=\"M246 218 C230 204 218 188 210 168 M246 218 C226 226 206 232 188 234 M246 218 C240 244 234 268 232 292 M392 218 C408 204 420 188 428 168 M392 218 C404 246 410 272 412 300\" stroke-width=\"12\"/>\n    <path class=\"part\" data-id=\"tree\" d=\"M210 168 C200 152 190 142 176 134 M210 168 C214 150 224 138 236 130 M188 234 C170 236 154 240 140 248 M188 234 C182 252 178 268 178 286 M232 292 C226 312 220 330 212 346 M232 292 C242 308 250 322 254 340 M428 168 C440 152 452 142 466 134 M428 168 C424 150 414 138 402 130 M412 300 C406 320 400 338 392 354 M412 300 C424 316 434 330 440 348 M412 300 C420 282 432 268 446 260 M232 292 C216 300 202 312 192 326\" stroke-width=\"6\"/>\n    <path class=\"part\" data-id=\"tree\" d=\"M176 134 C166 126 156 122 146 120 M140 248 C130 252 122 258 116 264 M212 346 C204 358 198 370 194 382 M254 340 C258 354 260 366 260 378 M466 134 C476 126 486 122 496 120 M392 354 C384 366 378 378 374 390 M440 348 C446 362 450 374 452 386 M192 326 C184 336 178 348 174 360\" stroke-width=\"3.4\" opacity=\".9\"/>\n  </g>\n  <g class=\"part\" data-id=\"hilum\" fill=\"#f0e2c8\" stroke=\"#8d7346\" stroke-width=\"1.6\">\n    <ellipse cx=\"268\" cy=\"252\" rx=\"7\" ry=\"27\"/>\n    <ellipse cx=\"372\" cy=\"252\" rx=\"7\" ry=\"27\"/>\n  </g>\n\n  <!-- diaphragm -->\n  <path class=\"diaphragm part\" data-id=\"diaphragm\" d=\"M70 448 C150 396 248 414 320 442 C392 414 490 396 570 448 L570 486 C486 452 392 464 320 482 C248 464 154 452 70 486 Z\" fill=\"url(#l-dia)\" stroke=\"#7c3f3a\" stroke-width=\"2\"/>\n  <g fill=\"none\" stroke=\"#e0a49a\" stroke-width=\"2\" opacity=\".45\">\n    <path d=\"M110 448 C160 424 220 428 268 444 M372 444 C420 428 480 424 530 448\"/>\n  </g>\n  <text x=\"320\" y=\"470\" text-anchor=\"middle\" class=\"cap\" style=\"fill:#f4dcd6\">diaphragm</text>\n\n  <!-- alveolar inset -->\n  <rect class=\"inset-box\" x=\"44\" y=\"500\" width=\"552\" height=\"92\" rx=\"14\"/>\n  <text x=\"60\" y=\"520\" class=\"inset-title\">Alveolus &amp; capillary bed · gas exchange unit</text>\n  <g class=\"part\" data-id=\"alveoli\">\n    <path d=\"M76 566 C104 566 120 560 138 552\" fill=\"none\" stroke=\"#dcc7a6\" stroke-width=\"11\" stroke-linecap=\"round\"/>\n    <path d=\"M138 552 C154 546 164 540 176 534 M138 552 C156 558 170 562 186 562 M138 552 C150 566 160 576 172 582\" fill=\"none\" stroke=\"#dcc7a6\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n    <g fill=\"#f3ddd7\" stroke=\"#b3807a\" stroke-width=\"1.4\">\n      <circle cx=\"204\" cy=\"530\" r=\"17\"/><circle cx=\"234\" cy=\"520\" r=\"15\"/><circle cx=\"228\" cy=\"548\" r=\"16\"/>\n      <circle cx=\"200\" cy=\"572\" r=\"16\"/><circle cx=\"232\" cy=\"580\" r=\"14\"/><circle cx=\"176\" cy=\"534\" r=\"12\"/>\n    </g>\n    <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2\" opacity=\".9\">\n      <path d=\"M188 512 C206 502 236 500 252 512 M186 592 C206 600 234 600 250 590 M252 512 C268 528 268 574 250 590\"/>\n    </g>\n    <g fill=\"none\" stroke=\"#3f5f9c\" stroke-width=\"2\" opacity=\".9\">\n      <path d=\"M186 522 C200 514 224 512 240 520 M188 584 C204 590 226 590 240 582\"/>\n    </g>\n    <g fill=\"#fff\" opacity=\".9\">\n      <circle cx=\"286\" cy=\"530\" r=\"3.4\"/><circle cx=\"298\" cy=\"552\" r=\"3.4\"/><circle cx=\"286\" cy=\"574\" r=\"3.4\"/>\n    </g>\n    <g class=\"lbl-layer-inline\">\n      <text x=\"316\" y=\"536\" class=\"cap\" style=\"fill:#9fd8c8\">O₂ in</text>\n      <text x=\"316\" y=\"580\" class=\"cap\" style=\"fill:#e7a99f\">CO₂ out</text>\n    </g>\n    <g fill=\"#e9d8ba\" stroke=\"#b3807a\" stroke-width=\"1.3\">\n      <ellipse cx=\"392\" cy=\"540\" rx=\"26\" ry=\"20\"/><ellipse cx=\"430\" cy=\"556\" rx=\"24\" ry=\"19\"/><ellipse cx=\"404\" cy=\"574\" rx=\"22\" ry=\"17\"/>\n    </g>\n    <text x=\"386\" y=\"516\" class=\"cap\">surfactant-lined sac</text>\n    <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2.2\">\n      <path d=\"M466 528 C490 520 520 522 540 534 M466 580 C492 590 522 588 542 576\"/>\n    </g>\n    <text x=\"470\" y=\"560\" class=\"cap\">capillary</text>\n  </g>",
  "anims": [
   {
    "id": "breathe",
    "label": "Breathing cycle",
    "cls": "breathe"
   },
   {
    "id": "airflow",
    "label": "Airflow",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.6\" fill=\"#dff2ee\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" keyPoints=\"0;1;1;0;0\" keyTimes=\"0;.42;.5;.92;1\" calcMode=\"linear\" path=\"M320 8 L320 176 C300 190 276 206 250 216 C232 202 220 188 212 170 C200 154 188 142 176 134\"/></circle>\n        <circle r=\"4.6\" fill=\"#dff2ee\"><animateMotion dur=\"4s\" begin=\"-.6s\" repeatCount=\"indefinite\" keyPoints=\"0;1;1;0;0\" keyTimes=\"0;.42;.5;.92;1\" calcMode=\"linear\" path=\"M320 8 L320 176 C344 194 368 208 392 218 C406 204 418 190 428 170 C440 154 452 142 466 134\"/></circle>\n        <circle r=\"4.6\" fill=\"#dff2ee\"><animateMotion dur=\"4s\" begin=\"-1.2s\" repeatCount=\"indefinite\" keyPoints=\"0;1;1;0;0\" keyTimes=\"0;.42;.5;.92;1\" calcMode=\"linear\" path=\"M320 8 L320 176 C300 190 276 206 246 218 C240 246 234 270 232 294 C226 314 218 332 210 348\"/></circle>\n        <circle r=\"4.6\" fill=\"#dff2ee\"><animateMotion dur=\"4s\" begin=\"-1.8s\" repeatCount=\"indefinite\" keyPoints=\"0;1;1;0;0\" keyTimes=\"0;.42;.5;.92;1\" calcMode=\"linear\" path=\"M320 8 L320 176 C344 194 368 208 392 218 C404 248 410 274 412 302 C406 322 400 340 392 356\"/></circle>\n      </g>"
   },
   {
    "id": "exchange",
    "label": "Gas exchange",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"3.6\" fill=\"#7dd3fc\"><animateMotion dur=\"2.4s\" repeatCount=\"indefinite\" path=\"M228 520 C240 512 254 520 258 540 C262 562 254 578 240 584\"/></circle>\n        <circle r=\"3.6\" fill=\"#7dd3fc\"><animateMotion dur=\"2.4s\" begin=\"-1.2s\" repeatCount=\"indefinite\" path=\"M228 520 C240 512 254 520 258 540 C262 562 254 578 240 584\"/></circle>\n        <circle r=\"3.6\" fill=\"#f4a6a0\"><animateMotion dur=\"2.4s\" begin=\"-.6s\" repeatCount=\"indefinite\" path=\"M240 584 C254 578 262 562 258 540 C254 520 240 512 228 520\"/></circle>\n      </g>"
   }
  ],
  "extra": {
   "rate": {
    "min": 6,
    "max": 30,
    "val": 14,
    "unit": " br/min",
    "label": "Breathing rate",
    "varName": "--breath",
    "scale": 60
   }
  },
  "quiz": [
   {
    "q": "How many lobes does the left lung have?",
    "opts": [
     "One",
     "Two",
     "Three",
     "Four"
    ],
    "a": 1,
    "why": "The left lung has superior and inferior lobes divided by the oblique fissure only. The right has three, adding the horizontal fissure and middle lobe."
   },
   {
    "q": "A foreign body inhaled while standing most often lodges in the…",
    "opts": [
     "Left main bronchus",
     "Right main bronchus",
     "Trachea above the carina",
     "Lingula"
    ],
    "a": 1,
    "why": "The right main bronchus is wider, shorter and more vertical than the left, so aspirated material preferentially goes right."
   },
   {
    "q": "What keeps the lung expanded against the chest wall?",
    "opts": [
     "Cartilage rings",
     "Surface tension of pleural fluid",
     "Positive pressure in the pleural cavity",
     "Diaphragmatic attachment"
    ],
    "a": 1,
    "why": "The thin film of pleural fluid creates surface tension coupling visceral to parietal pleura. Air breaking that coupling causes a pneumothorax."
   }
  ],
  "related": [
   "heart",
   "brain",
   "kidney",
   "skin"
  ],
  "photo": {
   "file": "lungs.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "trachea": [
     500,
     200
    ],
    "bronchi": [
     475,
     378
    ],
    "tree": [
     406,
     367
    ],
    "rlung": [
     388,
     444
    ],
    "llung": [
     625,
     467
    ],
    "fissures": [
     375,
     533
    ],
    "notch": [
     588,
     533
    ],
    "hilum": [
     494,
     444
    ],
    "pleura": [
     688,
     556
    ],
    "pa": [
     550,
     422
    ],
    "pvn": [
     438,
     433
    ],
    "diaphragm": [
     500,
     844
    ]
   }
  }
 },
 "brain": {
  "title": "Brain",
  "latin": "Encephalon",
  "system": "nervous",
  "region": "Cranial cavity, above the brainstem",
  "size": "≈ 1.3–1.4 kg · ~86 billion neurons",
  "blood": "Internal carotid + vertebral arteries → circle of Willis (15% of cardiac output)",
  "nerve": "Itself the source of cranial nerves I–XII",
  "blurb": "Midsagittal section: cerebrum, diencephalon, brainstem and cerebellum around the ventricular system.",
  "summary": "The brain integrates sensation, generates movement, and supports language, memory and consciousness. It uses about 20% of the body's oxygen and glucose despite being 2% of body weight, and it has almost no energy reserve — four minutes of ischaemia starts to kill neurons. The cerebral cortex is folded into gyri and sulci to pack ~0.15 m² of grey matter into the skull. Beneath it, white-matter tracts such as the corpus callosum connect the hemispheres, while the diencephalon and brainstem handle relay, arousal and the automatic control of breathing, heart rate and blood pressure.",
  "vb": [
   660,
   510
  ],
  "legend": [
   [
    "#d9a08e",
    "Cerebral cortex"
   ],
   [
    "#f3e8d6",
    "White matter"
   ],
   [
    "#cfe3ec",
    "Ventricles / CSF"
   ],
   [
    "#cf9184",
    "Cerebellum"
   ],
   [
    "#e0cdb6",
    "Brainstem"
   ]
  ],
  "parts": {
   "cerebrum": {
    "n": "Cerebrum",
    "l": "Cerebrum",
    "t": "Region",
    "at": [
     468,
     88
    ],
    "s": "r",
    "d": "The largest part of the brain: two hemispheres of folded cortex over deep white matter, basal ganglia and the lateral ventricles.",
    "f": "Voluntary movement, sensation, language, memory, personality and conscious thought.",
    "c": "Its surface folding (gyri and sulci) triples cortical area; abnormal folding causes lissencephaly and epilepsy."
   },
   "frontal": {
    "n": "Frontal lobe",
    "l": "Lobus frontalis",
    "t": "Lobe",
    "at": [
     140,
     178
    ],
    "s": "l",
    "d": "Anterior to the central sulcus and above the lateral sulcus. Contains the primary motor cortex, Broca's area (usually left) and the prefrontal cortex.",
    "f": "Planning, judgement, personality, voluntary movement and expressive speech.",
    "c": "Prefrontal damage (classically Phineas Gage) changes personality and impulse control while sparing memory and IQ."
   },
   "parietal": {
    "n": "Parietal lobe",
    "l": "Lobus parietalis",
    "t": "Lobe",
    "at": [
     332,
     42
    ],
    "s": "r",
    "d": "Behind the central sulcus, above the temporal lobe. Houses the primary somatosensory cortex in the postcentral gyrus.",
    "f": "Processing of touch, pain, temperature, position sense and spatial awareness.",
    "c": "Right-sided lesions cause hemispatial neglect — the patient ignores the whole left side of space."
   },
   "occipital": {
    "n": "Occipital lobe",
    "l": "Lobus occipitalis",
    "t": "Lobe",
    "at": [
     524,
     238
    ],
    "s": "r",
    "d": "The posterior pole, bounded medially by the parieto-occipital sulcus, containing the primary visual cortex on the banks of the calcarine sulcus.",
    "f": "Vision — the retinal image is mapped point-for-point on the calcarine cortex.",
    "c": "A posterior cerebral artery stroke causes a congruous homonymous hemianopia with macular sparing."
   },
   "temporal": {
    "n": "Temporal lobe",
    "l": "Lobus temporalis",
    "t": "Lobe",
    "at": [
     196,
     300
    ],
    "s": "l",
    "d": "Below the lateral sulcus, including the hippocampal formation and primary auditory cortex on the superior temporal gyrus.",
    "f": "Hearing, memory formation, language comprehension (Wernicke's area) and emotion.",
    "c": "The medial temporal lobe is the commonest focus of temporal-lobe epilepsy and the earliest region damaged in Alzheimer disease."
   },
   "corpus": {
    "n": "Corpus callosum",
    "l": "Corpus callosum",
    "t": "White matter",
    "at": [
     244,
     146
    ],
    "s": "l",
    "d": "The great C-shaped commissure of ~200 million myelinated fibres: rostrum, genu, body and splenium.",
    "f": "Connects matching regions of the two hemispheres so they work as one brain.",
    "c": "Surgically sectioned for intractable epilepsy, producing \"split-brain\" patients who cannot name an object felt in the left hand."
   },
   "latvent": {
    "n": "Lateral ventricle",
    "l": "Ventriculus lateralis",
    "t": "Cavity",
    "at": [
     300,
     186
    ],
    "s": "l",
    "d": "C-shaped CSF cavity in each hemisphere with anterior, body, posterior and temporal horns, lined by ependyma with choroid plexus on the floor.",
    "f": "Cushions the brain and circulates CSF produced by the choroid plexus.",
    "c": "Obstruction of the interventricular foramen causes hydrocephalus and enlargement of the ventricle."
   },
   "thalamus": {
    "n": "Thalamus",
    "l": "Thalamus",
    "t": "Diencephalon",
    "at": [
     326,
     222
    ],
    "s": "r",
    "d": "Two ovals of grey matter flanking the third ventricle, subdivided into anterior, medial and lateral nuclear groups.",
    "f": "The relay station: nearly all sensory information (except smell) is edited and sent on to the cortex. Also involved in arousal.",
    "c": "A thalamic stroke can produce severe contralateral sensory loss and thalamic pain syndrome."
   },
   "hypothalamus": {
    "n": "Hypothalamus",
    "l": "Hypothalamus",
    "t": "Diencephalon",
    "at": [
     288,
     250
    ],
    "s": "l",
    "d": "Only 4 g, yet it controls the autonomic and endocrine systems: supraoptic, paraventricular, arcuate and suprachiasmatic nuclei.",
    "f": "Temperature, thirst, hunger, circadian rhythm, and hormone release via the pituitary.",
    "c": "Lesions cause diabetes insipidus, obesity or emaciation, and disruption of sleep-wake cycles."
   },
   "pituitary": {
    "n": "Pituitary gland",
    "l": "Hypophysis",
    "t": "Endocrine",
    "at": [
     286,
     292
    ],
    "s": "l",
    "d": "Sits in the sella turcica below the hypothalamus, joined by the infundibulum. Anterior lobe is glandular; posterior lobe is neural tissue.",
    "f": "Secretes GH, TSH, ACTH, FSH, LH, prolactin, plus oxytocin and vasopressin released from the posterior lobe.",
    "c": "A pituitary adenoma pressing upward on the optic chiasm causes bitemporal hemianopia — loss of the outer half of both visual fields."
   },
   "midbrain": {
    "n": "Midbrain",
    "l": "Mesencephalon",
    "t": "Brainstem",
    "at": [
     330,
     264
    ],
    "s": "r",
    "d": "Tectum (superior and inferior colliculi) plus cerebral peduncles, with the cerebral aqueduct running through it.",
    "f": "Visual and auditory reflexes, eye movements, and the dopamine-producing substantia nigra.",
    "c": "Degeneration of the substantia nigra causes Parkinson disease: tremor, rigidity and bradykinesia."
   },
   "pons": {
    "n": "Pons",
    "l": "Pons",
    "t": "Brainstem",
    "at": [
     300,
     326
    ],
    "s": "l",
    "d": "The bulging bridge anterior to the cerebellum, carrying transverse fibres into the middle cerebellar peduncles.",
    "f": "Relays cortex to cerebellum; holds the pneumotaxic and apneustic centres that shape breathing, plus nuclei of cranial nerves V–VIII.",
    "c": "Occlusion of the basilar artery can cause locked-in syndrome — full awareness with paralysis of everything except vertical eye movement."
   },
   "medulla": {
    "n": "Medulla oblongata",
    "l": "Medulla oblongata",
    "t": "Brainstem",
    "at": [
     330,
     392
    ],
    "s": "r",
    "d": "The lowest brainstem segment, continuous with the spinal cord at the foramen magnum. Contains the pyramids, olives and the floor of the fourth ventricle.",
    "f": "Cardiac, vasomotor and respiratory centres; reflexes for vomiting, coughing and swallowing. The pyramidal decussation happens here.",
    "c": "Because motor fibres cross at the medulla, a lesion above the decussation paralyses the opposite side of the body."
   },
   "cerebellum": {
    "n": "Cerebellum",
    "l": "Cerebellum",
    "t": "Region",
    "at": [
     452,
     352
    ],
    "s": "r",
    "d": "Two hemispheres and a midline vermis, with a densely folded cortex, deep nuclei (dentate, emboliform, globose, fastigial) and branching white matter — the arbor vitae.",
    "f": "Compares intended movement with actual movement and corrects it: coordination, precision, timing, posture and motor learning.",
    "c": "Damage causes ipsilateral ataxia, intention tremor, dysdiadochokinesia and a broad-based gait. Alcohol affects it first."
   },
   "fourth": {
    "n": "Fourth ventricle",
    "l": "Ventriculus quartus",
    "t": "Cavity",
    "at": [
     352,
     336
    ],
    "s": "l",
    "d": "A diamond-shaped cavity between the pons/medulla in front and the cerebellum behind, draining through the foramina of Luschka and Magendie.",
    "f": "CSF passes from here into the subarachnoid space around brain and spinal cord.",
    "c": "Blocked outflow causes obstructive hydrocephalus — a common presentation of posterior fossa tumours in children."
   },
   "spinalcord": {
    "n": "Spinal cord",
    "l": "Medulla spinalis",
    "t": "CNS",
    "at": [
     326,
     466
    ],
    "s": "l",
    "d": "Continues from the medulla at the foramen magnum and ends at L1/L2 as the conus medullaris, with the cauda equina below.",
    "f": "Carries sensory information up and motor commands down, and runs reflex arcs independently of the brain.",
    "c": "Transection above C3–C5 stops diaphragmatic breathing; at thoracic level it causes paraplegia with a sensory level."
   },
   "gyri": {
    "n": "Gyri & sulci",
    "l": "Gyri et sulci",
    "t": "Cortex",
    "at": [
     404,
     146
    ],
    "s": "r",
    "d": "The folded ridges and grooves of the cortex. Grey matter (neuron cell bodies) is 2–4 mm thick on the surface; white matter (myelinated axons) lies beneath.",
    "f": "Folding multiplies cortical surface area about threefold within the fixed volume of the skull.",
    "c": "The pattern is individually unique and is disrupted in cortical dysplasias that cause focal epilepsy."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"b-cx\" cx=\"34%\" cy=\"22%\" r=\"90%\">\n      <stop offset=\"0\" stop-color=\"#e6b3a1\"/><stop offset=\".55\" stop-color=\"#d19482\"/><stop offset=\"1\" stop-color=\"#9c6152\"/>\n    </radialGradient>\n    <radialGradient id=\"b-cb\" cx=\"40%\" cy=\"26%\" r=\"86%\">\n      <stop offset=\"0\" stop-color=\"#dc9d8f\"/><stop offset=\"1\" stop-color=\"#a4614f\"/>\n    </radialGradient>\n    <linearGradient id=\"b-wm\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#f8efe0\"/><stop offset=\"1\" stop-color=\"#e0cfb4\"/>\n    </linearGradient>\n    <linearGradient id=\"b-bs\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#eee0cc\"/><stop offset=\"1\" stop-color=\"#cbb394\"/>\n    </linearGradient>\n    <clipPath id=\"b-clip\"><path d=\"M100 240 C92 152 140 80 224 50 C312 18 420 24 490 66 C548 100 572 158 566 214 C560 268 520 302 462 304 C430 306 402 298 376 296 C344 294 322 306 300 306 C262 306 204 300 160 292 C122 284 104 268 100 240 Z\"/></clipPath>\n  </defs>\n\n  <!-- cerebrum -->\n  <path class=\"part\" data-id=\"cerebrum\" d=\"M100 240 C92 152 140 80 224 50 C312 18 420 24 490 66 C548 100 572 158 566 214 C560 268 520 302 462 304 C430 306 402 298 376 296 C344 294 322 306 300 306 C262 306 204 300 160 292 C122 284 104 268 100 240 Z\" fill=\"url(#b-cx)\" stroke=\"#7a4637\" stroke-width=\"2.4\"/>\n\n  <!-- lobe tints -->\n  <g clip-path=\"url(#b-clip)\">\n    <path class=\"part\" data-id=\"frontal\" d=\"M92 300 L92 60 C130 44 170 40 210 46 L236 310 C180 316 130 312 92 300 Z\" fill=\"#c98a7c\" opacity=\".26\"/>\n    <path class=\"part\" data-id=\"parietal\" d=\"M214 42 C290 20 380 22 448 56 L430 120 C370 90 290 88 234 108 Z\" fill=\"#d3a08a\" opacity=\".26\"/>\n    <path class=\"part\" data-id=\"occipital\" d=\"M448 60 C520 92 570 152 566 216 C562 264 528 298 470 304 L438 304 L416 214 C428 168 440 116 448 60 Z\" fill=\"#b9786a\" opacity=\".3\"/>\n    <path class=\"part\" data-id=\"temporal\" d=\"M120 268 C170 292 240 300 300 300 L300 320 C230 322 168 312 122 292 Z\" fill=\"#c07a6c\" opacity=\".22\"/>\n    <!-- sulci -->\n    <g id=\"b-sulci\" fill=\"none\" stroke=\"#8b5346\" stroke-linecap=\"round\" opacity=\".55\"></g>\n    <g class=\"part\" data-id=\"gyri\" fill=\"none\" stroke=\"#8b5346\" stroke-width=\"2.6\" stroke-linecap=\"round\" opacity=\".8\">\n      <path d=\"M332 50 C318 106 308 160 300 214\"/>\n      <path d=\"M444 72 C432 128 420 178 402 226\"/>\n      <path d=\"M402 226 C448 236 496 246 544 248\"/>\n      <path d=\"M150 130 C186 118 226 116 258 128\"/>\n    </g>\n    <text x=\"316\" y=\"112\" class=\"cap\" style=\"fill:#8b5346\" opacity=\".75\">central sulcus</text>\n    <text x=\"404\" y=\"256\" class=\"cap\" style=\"fill:#8b5346\" opacity=\".75\">calcarine sulcus</text>\n  </g>\n\n  <!-- cingulate gyrus -->\n  <path d=\"M198 206 C214 140 318 110 398 138 C436 152 456 180 450 206\" fill=\"none\" stroke=\"#c98f7f\" stroke-width=\"20\" stroke-linecap=\"round\" opacity=\".55\"/>\n\n  <!-- corpus callosum -->\n  <path class=\"part\" data-id=\"corpus\" d=\"M206 196 C224 142 320 116 394 142 C426 154 442 178 436 200 C418 180 394 168 364 164 C304 156 244 172 214 212 Z\" fill=\"url(#b-wm)\" stroke=\"#a98a63\" stroke-width=\"1.8\"/>\n\n  <!-- lateral ventricle -->\n  <path class=\"part\" data-id=\"latvent\" d=\"M236 180 C284 158 358 154 406 172 C420 194 402 212 370 210 C318 206 268 202 242 196 Z\" fill=\"#cfe3ec\" stroke=\"#6f97a8\" stroke-width=\"1.6\"/>\n  <path d=\"M258 182 C288 172 330 168 364 176\" fill=\"none\" stroke=\"#eaf4f8\" stroke-width=\"4\" opacity=\".8\"/>\n  <g fill=\"#c0453f\" opacity=\".75\"><circle cx=\"286\" cy=\"196\" r=\"4\"/><circle cx=\"306\" cy=\"192\" r=\"3.4\"/><circle cx=\"326\" cy=\"194\" r=\"4\"/><circle cx=\"346\" cy=\"190\" r=\"3.2\"/><circle cx=\"366\" cy=\"194\" r=\"3.6\"/></g>\n  <text x=\"292\" y=\"228\" class=\"cap\" style=\"fill:#7fa6b6\">choroid plexus</text>\n\n  <!-- third ventricle -->\n  <path d=\"M300 210 C308 226 312 244 312 260 L322 260 C322 242 318 224 310 208 Z\" fill=\"#cfe3ec\" stroke=\"#6f97a8\" stroke-width=\"1.2\"/>\n\n  <!-- diencephalon -->\n  <ellipse class=\"part\" data-id=\"thalamus\" cx=\"326\" cy=\"222\" rx=\"34\" ry=\"20\" fill=\"#d9c5aa\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  <ellipse class=\"part\" data-id=\"hypothalamus\" cx=\"292\" cy=\"252\" rx=\"15\" ry=\"10\" fill=\"#eec25c\" stroke=\"#8a6a12\" stroke-width=\"1.4\"/>\n  <g class=\"part\" data-id=\"pituitary\">\n    <path d=\"M292 260 C288 272 286 280 286 288\" fill=\"none\" stroke=\"#c98fa8\" stroke-width=\"5\"/>\n    <ellipse cx=\"286\" cy=\"296\" rx=\"12\" ry=\"9.5\" fill=\"#e0a0ba\" stroke=\"#8c4a63\" stroke-width=\"1.5\"/>\n  </g>\n\n  <!-- brainstem -->\n  <path class=\"part\" data-id=\"midbrain\" d=\"M330 232 C312 238 302 252 304 268 C306 284 318 294 332 296 L352 296 C356 272 354 248 346 232 Z\" fill=\"url(#b-bs)\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"pons\" d=\"M332 292 C308 296 292 310 292 326 C292 344 308 356 330 358 L352 356 C358 336 358 312 352 294 Z\" fill=\"url(#b-bs)\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"medulla\" d=\"M330 354 C318 358 312 372 312 392 C312 414 316 434 320 448 L348 448 C352 428 354 402 352 378 C350 364 344 356 336 354 Z\" fill=\"url(#b-bs)\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  <path d=\"M322 356 C330 380 334 404 334 430\" fill=\"none\" stroke=\"#a98a63\" stroke-width=\"4\" opacity=\".5\"/>\n  <path d=\"M346 356 C340 380 336 404 336 430\" fill=\"none\" stroke=\"#a98a63\" stroke-width=\"3\" opacity=\".4\"/>\n  <text x=\"366\" y=\"380\" class=\"cap\" style=\"fill:#a98a63\">pyramid</text>\n\n  <!-- fourth ventricle -->\n  <path class=\"part\" data-id=\"fourth\" d=\"M352 316 L376 338 L352 360 L338 338 Z\" fill=\"#cfe3ec\" stroke=\"#6f97a8\" stroke-width=\"1.5\"/>\n\n  <!-- cerebellum -->\n  <path class=\"part\" data-id=\"cerebellum\" d=\"M372 306 C424 288 490 296 516 328 C538 356 526 396 490 412 C446 432 386 424 362 394 C344 372 350 322 372 306 Z\" fill=\"url(#b-cb)\" stroke=\"#7a4637\" stroke-width=\"2.2\"/>\n  <g clip-path=\"none\" fill=\"none\" stroke=\"#8b5346\" stroke-width=\"1.6\" opacity=\".55\">\n    <path d=\"M366 322 C410 312 470 316 506 332 M360 340 C406 330 470 334 512 350 M360 358 C404 350 466 354 510 370 M366 376 C406 370 460 374 500 388 M378 394 C412 390 452 392 484 402\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#f3e8d6\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".9\">\n    <path d=\"M396 356 C416 350 434 352 448 360 M396 356 C404 340 416 330 430 326 M396 356 C406 372 418 382 432 386\"/>\n  </g>\n  <text x=\"404\" y=\"424\" class=\"cap\" style=\"fill:#f0d8cf\">arbor vitae</text>\n\n  <!-- spinal cord -->\n  <path class=\"part\" data-id=\"spinalcord\" d=\"M312 432 C310 454 310 474 312 496 L348 496 C350 474 350 454 348 434 Z\" fill=\"url(#b-bs)\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  <text x=\"322\" y=\"498\" class=\"cap\">to spinal cord</text>",
  "anims": [
   {
    "id": "signal",
    "label": "Nerve signal",
    "layer": "\n      <g class=\"flow-layer\">\n        <path class=\"signal-path\" d=\"M206 196 C224 142 320 116 394 142 C426 154 442 178 436 200\"/>\n        <path class=\"signal-path\" style=\"animation-delay:.5s\" d=\"M328 240 C350 250 366 268 350 296 C336 318 332 330 336 344 C340 372 340 404 336 434 L336 496\"/>\n        <circle r=\"5.5\" fill=\"#c4b5fd\"><animateMotion dur=\"2.2s\" repeatCount=\"indefinite\" path=\"M140 200 C180 160 250 140 320 150 C400 162 470 190 520 220\"/></circle>\n        <circle r=\"5.5\" fill=\"#c4b5fd\"><animateMotion dur=\"2.2s\" begin=\"-1.1s\" repeatCount=\"indefinite\" path=\"M520 220 C470 190 400 162 320 150 C250 140 180 160 140 200\"/></circle>\n      </g>"
   },
   {
    "id": "csf",
    "label": "CSF circulation",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4\" fill=\"#a5e8f5\"><animateMotion dur=\"6s\" repeatCount=\"indefinite\" path=\"M262 190 C300 178 350 176 392 188 C404 196 400 206 386 208 C350 206 300 200 264 196 C286 214 302 232 308 258 C320 288 340 312 356 338 C364 356 356 372 340 372 C320 372 300 350 300 320\"/></circle>\n        <circle r=\"4\" fill=\"#a5e8f5\"><animateMotion dur=\"6s\" begin=\"-3s\" repeatCount=\"indefinite\" path=\"M356 338 C376 320 400 312 430 312 C470 314 500 330 512 352 C520 372 508 396 486 404\"/></circle>\n      </g>"
   }
  ],
  "quiz": [
   {
    "q": "Which structure relays almost all sensory information to the cerebral cortex?",
    "opts": [
     "Hypothalamus",
     "Thalamus",
     "Cerebellum",
     "Pons"
    ],
    "a": 1,
    "why": "The thalamus is the sensory relay station — everything except olfaction synapses there before reaching cortex."
   },
   {
    "q": "A tumour pressing on the optic chiasm from below (pituitary adenoma) typically causes…",
    "opts": [
     "Loss of the left visual field in both eyes",
     "Bitemporal hemianopia",
     "Total blindness in one eye",
     "Loss of central vision only"
    ],
    "a": 1,
    "why": "Fibres from the nasal retina of both eyes cross in the chiasm, so compression from below loses both temporal visual fields."
   },
   {
    "q": "Damage to the cerebellum produces…",
    "opts": [
     "Contralateral weakness",
     "Ipsilateral incoordination and ataxia",
     "Loss of pain sensation",
     "Memory loss"
    ],
    "a": 1,
    "why": "Cerebellar pathways cross twice, so signs appear on the same side: ataxia, intention tremor and a broad-based gait, without weakness."
   }
  ],
  "related": [
   "spinalcord",
   "eye",
   "ear",
   "heart"
  ],
  "photo": {
   "file": "brain.jpg",
   "credit": "3D render — midsagittal section (reference artwork)",
   "hot": {
    "gyri": [
     500,
     240
    ],
    "cerebrum": [
     700,
     300
    ],
    "latvent": [
     600,
     333
    ],
    "corpus": [
     640,
     389
    ],
    "thalamus": [
     544,
     456
    ],
    "hypothalamus": [
     524,
     486
    ],
    "midbrain": [
     540,
     556
    ],
    "cerebellum": [
     340,
     611
    ],
    "pons": [
     510,
     644
    ],
    "medulla": [
     480,
     733
    ],
    "spinalcord": [
     460,
     866
    ]
   }
  }
 },
 "kidney": {
  "title": "Kidney",
  "latin": "Ren",
  "system": "urinary",
  "region": "Retroperitoneal, T12–L3 (left slightly higher)",
  "size": "≈ 11 × 6 × 3 cm · 120–170 g each · ~1 million nephrons",
  "blood": "Renal artery from the abdominal aorta — 20–25% of cardiac output",
  "nerve": "Renal plexus (sympathetic T10–L1) — mainly vasomotor",
  "blurb": "Coronal section plus a nephron: filtration, reabsorption, secretion and urine concentration.",
  "summary": "Each kidney filters about 180 litres of plasma a day and returns all but 1–2 litres to the blood. Filtration happens in the renal corpuscle, where glomerular capillaries sit inside Bowman's capsule. The filtrate then passes through the proximal tubule (bulk reabsorption), the loop of Henle (concentration by countercurrent multiplication), the distal tubule (hormone-controlled fine tuning) and the collecting duct (final water handling under vasopressin). Nephrons drain via the papilla into minor and major calyces, the renal pelvis and the ureter.",
  "vb": [
   640,
   620
  ],
  "legend": [
   [
    "#a85a45",
    "Cortex"
   ],
   [
    "#d08a6e",
    "Medullary pyramid"
   ],
   [
    "#e8cf9c",
    "Urine collecting system"
   ],
   [
    "#c0453f",
    "Artery"
   ],
   [
    "#3f5f9c",
    "Vein"
   ]
  ],
  "parts": {
   "capsule": {
    "n": "Fibrous capsule",
    "l": "Capsula fibrosa",
    "t": "Covering",
    "at": [
     506,
     110
    ],
    "s": "r",
    "d": "A tough transparent layer of collagenous tissue directly on the kidney surface, surrounded by perinephric fat.",
    "f": "Protects the parenchyma and maintains its shape.",
    "c": "It does not stretch: swelling inside the capsule in acute inflammation causes the dull loin pain of pyelonephritis."
   },
   "cortex": {
    "n": "Renal cortex",
    "l": "Cortex renalis",
    "t": "Region",
    "at": [
     452,
     74
    ],
    "s": "r",
    "d": "The outer 1 cm, containing all the renal corpuscles, the proximal and distal convoluted tubules, and cortical tissue dipping between pyramids as the renal columns.",
    "f": "Site of blood filtration and most solute reabsorption.",
    "c": "Thinning or scarring of the cortex on ultrasound indicates chronic kidney disease."
   },
   "pyramid": {
    "n": "Renal pyramid",
    "l": "Pyramides renales",
    "t": "Region",
    "at": [
     470,
     170
    ],
    "s": "r",
    "d": "8–18 cone-shaped regions of medulla, striped by the straight loops of Henle, vasa recta and collecting ducts that run through them.",
    "f": "Create and exploit the osmotic gradient that concentrates urine.",
    "c": "Their striated appearance is lost in medullary cystic disease and in the scarring of chronic reflux nephropathy."
   },
   "papilla": {
    "n": "Renal papilla",
    "l": "Papilla renalis",
    "t": "Region",
    "at": [
     316,
     306
    ],
    "s": "l",
    "d": "The apex of each pyramid, pierced by dozens of duct openings (area cribrosa) that empty into a minor calyx.",
    "f": "The final exit point for urine from the nephron system.",
    "c": "Analgesic abuse, diabetes and sickle-cell disease can cause papillary necrosis, with sloughed tissue in the urine."
   },
   "calyces": {
    "n": "Minor & major calyces",
    "l": "Calices renales",
    "t": "Collecting",
    "at": [
     282,
     214
    ],
    "s": "l",
    "d": "Cup-like minor calyces (8–18) receive urine from papillae and join into 2–3 major calyces that funnel into the renal pelvis.",
    "f": "Collect urine and conduct it to the pelvis; their smooth muscle helps propel it.",
    "c": "This is where renal stones form and lodge, causing the colicky flank pain of renal colic."
   },
   "pelvis": {
    "n": "Renal pelvis",
    "l": "Pelvis renalis",
    "t": "Collecting",
    "at": [
     240,
     236
    ],
    "s": "l",
    "d": "The funnel-shaped expansion of the upper ureter inside the hilum.",
    "f": "Collects urine from the major calyces and channels it into the ureter.",
    "c": "Dilatation of the pelvis (hydronephrosis) is the ultrasound sign of an obstructed outflow tract."
   },
   "ureter": {
    "n": "Ureter",
    "l": "Ureter",
    "t": "Duct",
    "at": [
     148,
     470
    ],
    "s": "l",
    "d": "A 25–30 cm muscular tube with an inner mucosa, muscular coat and outer adventitia, running retroperitoneally to the bladder.",
    "f": "Propels urine to the bladder by peristaltic waves (1–5/min), not by gravity.",
    "c": "Three natural narrowings — pelviureteric junction, pelvic brim and vesicoureteric junction — are where stones impact."
   },
   "hilum": {
    "n": "Hilum",
    "l": "Hilum renis",
    "t": "Landmark",
    "at": [
     214,
     300
    ],
    "s": "l",
    "d": "The medial slit where structures enter and leave. Anterior to posterior: renal vein, renal artery, renal pelvis (\"VAU\").",
    "f": "Gateway for vessels, nerves, lymphatics and the ureter.",
    "c": "Surgeons use this fixed order when clamping the hilum during nephrectomy or transplant."
   },
   "artery": {
    "n": "Renal artery",
    "l": "Arteria renalis",
    "t": "Vessel",
    "at": [
     52,
     220
    ],
    "s": "l",
    "d": "A short, wide branch of the abdominal aorta at L1/L2 dividing into five segmental arteries — these are end-arteries with no anastomosis. Branching continues: interlobar → arcuate → interlobular → afferent arteriole.",
    "f": "Delivers ~1.2 litres of blood per minute for filtration.",
    "c": "Narrowing (renal artery stenosis) causes secondary hypertension through excess renin release."
   },
   "vein": {
    "n": "Renal vein",
    "l": "Vena renalis",
    "t": "Vessel",
    "at": [
     52,
     300
    ],
    "s": "l",
    "d": "Leaves the hilum to drain into the inferior vena cava. The left renal vein is longer, passing between the aorta and the superior mesenteric artery and receiving the gonadal vein.",
    "f": "Returns filtered blood to the systemic circulation.",
    "c": "The left vein can be compressed between aorta and SMA (\"nutcracker syndrome\"), causing haematuria and left varicocele."
   },
   "glom": {
    "n": "Glomerulus & Bowman's capsule",
    "l": "Corpusculum renale",
    "t": "Nephron",
    "at": [
     352,
     504
    ],
    "s": "l",
    "d": "A tuft of fenestrated capillaries invaginating a double-walled capsule. Between them, the filtration barrier: fenestrated endothelium, fused basement membrane and podocyte foot processes with slit diaphragms.",
    "f": "Ultrafiltration of plasma — water and small solutes pass; cells and proteins do not.",
    "c": "Damage to the barrier leaks protein (nephrotic syndrome) or blood (nephritic syndrome) into the urine."
   },
   "pct": {
    "n": "Proximal convoluted tubule",
    "l": "Tubulus contortus proximalis",
    "t": "Nephron",
    "at": [
     428,
     470
    ],
    "s": "r",
    "d": "The longest, widest segment, lined by cells with a dense brush border of microvilli and many mitochondria.",
    "f": "Reabsorbs ~65% of filtered water and sodium, and 100% of glucose and amino acids; secretes drugs and acids.",
    "c": "SGLT2 inhibitors act on this tubule and can benefit selected patients with diabetes, heart failure or chronic kidney disease; use is a clinical decision."
   },
   "henle": {
    "n": "Loop of Henle",
    "l": "Ansa nephroni",
    "t": "Nephron",
    "at": [
     470,
     578
    ],
    "s": "r",
    "d": "A hairpin with a thin descending limb (water-permeable) and a thick ascending limb (actively pumps out NaCl but is water-impermeable), dipping into the medulla.",
    "f": "Countercurrent multiplication builds the medullary osmotic gradient that allows urine to be concentrated.",
    "c": "Loop diuretics such as furosemide block the Na-K-2Cl cotransporter here and are the most powerful diuretics."
   },
   "dct": {
    "n": "Distal convoluted tubule",
    "l": "Tubulus contortus distalis",
    "t": "Nephron",
    "at": [
     536,
     504
    ],
    "s": "r",
    "d": "Shorter than the proximal tubule, with fewer microvilli, and the site where the macula densa contacts its own glomerulus.",
    "f": "Fine-tunes sodium, potassium, calcium and pH under aldosterone, PTH and vasopressin control.",
    "c": "Thiazide diuretics act here; the macula densa senses sodium delivery and drives tubuloglomerular feedback."
   },
   "duct": {
    "n": "Collecting duct",
    "l": "Ductus collectivus",
    "t": "Nephron",
    "at": [
     598,
     560
    ],
    "s": "r",
    "d": "Receives filtrate from many nephrons and runs through the medulla to open on a papilla. Principal cells respond to vasopressin and aldosterone; intercalated cells handle acid.",
    "f": "Determines final urine volume and concentration.",
    "c": "Without vasopressin (diabetes insipidus) the duct stays water-impermeable and 10–20 L of dilute urine is passed daily."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"k-cx\" cx=\"34%\" cy=\"26%\" r=\"88%\">\n      <stop offset=\"0\" stop-color=\"#c07458\"/><stop offset=\".55\" stop-color=\"#a85a45\"/><stop offset=\"1\" stop-color=\"#71362a\"/>\n    </radialGradient>\n    <linearGradient id=\"k-py\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#e0a083\"/><stop offset=\"1\" stop-color=\"#b96b50\"/>\n    </linearGradient>\n    <linearGradient id=\"k-cal\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#f2dfae\"/><stop offset=\"1\" stop-color=\"#d3b473\"/>\n    </linearGradient>\n    <clipPath id=\"k-clip\"><path d=\"M336 34 C452 26 534 96 538 208 C542 330 470 428 356 442 C272 452 214 414 206 348 C200 306 222 288 224 258 C226 226 200 206 208 164 C218 92 262 40 336 34 Z\"/></clipPath>\n  </defs>\n\n  <!-- capsule -->\n  <path class=\"part\" data-id=\"capsule\" d=\"M338 22 C462 14 546 88 550 206 C554 336 478 440 358 454 C268 464 206 424 198 352 C192 306 216 288 218 256 C220 222 192 202 200 158 C212 82 258 28 338 22 Z\" fill=\"none\" stroke=\"#e2cfc4\" stroke-width=\"2.4\" stroke-dasharray=\"9 6\" opacity=\".75\"/>\n  <!-- cortex -->\n  <path class=\"part\" data-id=\"cortex\" d=\"M336 34 C452 26 534 96 538 208 C542 330 470 428 356 442 C272 452 214 414 206 348 C200 306 222 288 224 258 C226 226 200 206 208 164 C218 92 262 40 336 34 Z\" fill=\"url(#k-cx)\" stroke=\"#6d3227\" stroke-width=\"2.4\"/>\n  <g clip-path=\"none\" opacity=\".22\" fill=\"none\" stroke=\"#ffd9c4\" stroke-width=\"1.4\">\n    <path d=\"M250 120 C300 90 380 78 450 96 M232 200 C290 176 380 168 460 186 M232 280 C292 262 380 256 462 274 M250 356 C300 340 380 336 448 350\"/>\n  </g>\n\n  <!-- pyramids + papillae + calyces -->\n  <g clip-path=\"url(#k-clip)\">\n    <g class=\"part\" data-id=\"pyramid\" fill=\"url(#k-py)\" stroke=\"#8a4632\" stroke-width=\"1.8\">\n      <path d=\"M286 168 L267 75 Q325 55 371 69 Z\"/>\n      <path d=\"M322 186 L384 76 Q436 84 458 119 Z\"/>\n      <path d=\"M344 232 L469 136 Q503 166 498 211 Z\"/>\n      <path d=\"M340 272 L495 232 Q505 271 473 310 Z\"/>\n      <path d=\"M316 306 L458 328 Q451 368 407 391 Z\"/>\n      <path d=\"M292 326 L394 401 Q367 424 316 417 Z\"/>\n      <path d=\"M270 318 L294 414 Q266 418 240 387 Z\"/>\n      <path d=\"M262 190 L230 134 Q237 93 252 84 Z\"/>\n    </g>\n    <g fill=\"none\" stroke=\"#f6d3ba\" stroke-width=\"1.4\" opacity=\".45\">\n      <path d=\"M300 90 L288 160 M430 78 L330 180 M512 160 L350 228 M516 268 L346 270 M460 368 L322 304 M368 428 L296 324 M262 418 L272 322 M234 96 L264 184\"/>\n    </g>\n    <g class=\"part\" data-id=\"papilla\" fill=\"#e8b894\" stroke=\"#8a4632\" stroke-width=\"1.3\">\n      <circle cx=\"286\" cy=\"168\" r=\"9\"/><circle cx=\"322\" cy=\"186\" r=\"9\"/><circle cx=\"344\" cy=\"232\" r=\"9\"/><circle cx=\"340\" cy=\"272\" r=\"9\"/><circle cx=\"316\" cy=\"306\" r=\"9\"/><circle cx=\"292\" cy=\"326\" r=\"9\"/><circle cx=\"270\" cy=\"318\" r=\"9\"/><circle cx=\"262\" cy=\"190\" r=\"9\"/>\n    </g>\n    <g class=\"part\" data-id=\"calyces\" fill=\"url(#k-cal)\" stroke=\"#8a6a2e\" stroke-width=\"1.5\">\n      <path d=\"M269 165 Q282 194 303 171 Q286 168 269 165 Z\"/>\n      <path d=\"M309 176 Q306 206 335 196 Q322 186 309 176 Z\"/>\n      <path d=\"M340 216 Q319 238 348 248 Q344 232 340 216 Z\"/>\n      <path d=\"M345 256 Q315 264 335 288 Q340 272 345 256 Z\"/>\n      <path d=\"M329 295 Q300 286 303 317 Q316 306 329 295 Z\"/>\n      <path d=\"M308 322 Q285 301 276 330 Q292 326 308 322 Z\"/>\n      <path d=\"M287 318 Q271 292 253 318 Q270 318 287 318 Z\"/>\n      <path d=\"M245 193 Q266 216 279 187 Q262 190 245 193 Z\"/>\n      <path d=\"M286 176 C276 200 268 216 258 230 C268 236 282 234 292 224 C302 208 300 190 296 178 Z\"/>\n      <path d=\"M344 240 C320 244 300 246 284 248 C288 262 304 268 320 266 C336 262 346 252 348 246 Z\"/>\n      <path d=\"M296 318 C286 300 276 286 264 274 C256 282 256 296 262 306 C272 318 286 324 296 322 Z\"/>\n    </g>\n    <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2.6\" opacity=\".75\">\n      <path d=\"M276 246 L386 60 M276 246 L482 117 M276 246 L519 215 M276 246 L491 322 M276 246 L416 401 M276 246 L318 425\"/>\n    </g>\n  </g>\n\n  <!-- pelvis + ureter -->\n  <path class=\"part\" data-id=\"pelvis\" d=\"M222 206 C258 194 300 208 308 240 C312 268 292 292 258 296 C232 298 212 282 208 258 C206 236 210 216 222 206 Z\" fill=\"url(#k-cal)\" stroke=\"#8a6a2e\" stroke-width=\"2\"/>\n  <path class=\"part\" data-id=\"ureter\" d=\"M226 288 C214 340 190 392 160 442 C138 478 124 508 118 538\" fill=\"none\" stroke=\"#e2c68d\" stroke-width=\"15\" stroke-linecap=\"round\"/>\n  <path d=\"M226 288 C214 340 190 392 160 442 C138 478 124 508 118 538\" fill=\"none\" stroke=\"#f7e8c0\" stroke-width=\"4\" opacity=\".45\" stroke-linecap=\"round\"/>\n  <path d=\"M118 538 C116 552 118 562 124 570\" fill=\"none\" stroke=\"#e2c68d\" stroke-width=\"15\" stroke-linecap=\"round\" opacity=\".5\"/>\n\n  <!-- hilum -->\n  <ellipse class=\"part\" data-id=\"hilum\" cx=\"214\" cy=\"252\" rx=\"9\" ry=\"34\" fill=\"#f6e9d4\" stroke=\"#8a6a2e\" stroke-width=\"1.6\" opacity=\".9\"/>\n\n  <!-- vessels -->\n  <g fill=\"none\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"artery\" d=\"M40 224 C100 224 158 232 210 240\" stroke=\"#c0453f\" stroke-width=\"14\"/>\n    <path class=\"part\" data-id=\"vein\" d=\"M40 288 C100 284 158 274 210 264\" stroke=\"#3f5f9c\" stroke-width=\"16\"/>\n    <path d=\"M210 240 C232 240 254 242 276 246\" stroke=\"#c0453f\" stroke-width=\"7\" opacity=\".9\"/>\n  </g>\n\n  <!-- nephron inset -->\n  <rect class=\"inset-box\" x=\"292\" y=\"452\" width=\"336\" height=\"152\" rx=\"16\"/>\n  <text x=\"628\" y=\"472\" class=\"inset-title\" text-anchor=\"end\">Nephron · the functional unit (≈ 1 million per kidney)</text>\n  <g class=\"part\" data-id=\"glom\">\n    <circle cx=\"344\" cy=\"512\" r=\"26\" fill=\"#f5e3dc\" stroke=\"#b3807a\" stroke-width=\"1.6\"/>\n    <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2.4\">\n      <path d=\"M330 500 C344 494 356 502 352 514 C348 526 334 528 328 518\"/>\n      <path d=\"M340 522 C352 528 362 520 358 508\"/>\n    </g>\n    <path d=\"M318 512 C310 500 300 496 292 498\" fill=\"none\" stroke=\"#c0453f\" stroke-width=\"3.4\"/>\n    <text x=\"308\" y=\"556\" class=\"cap\">glomerulus</text>\n  </g>\n  <g class=\"part\" data-id=\"pct\" fill=\"none\" stroke=\"#e2a15c\" stroke-width=\"7\" stroke-linecap=\"round\">\n    <path d=\"M366 528 C384 540 402 528 396 512 C390 496 372 498 374 514 C376 530 398 538 414 528 C428 518 424 500 410 496\"/>\n  </g>\n  <g class=\"part\" data-id=\"henle\" fill=\"none\" stroke=\"#8fb8c9\" stroke-width=\"5.4\" stroke-linecap=\"round\">\n    <path d=\"M410 496 C420 502 424 520 424 546 C424 572 430 586 442 588 C454 590 460 576 460 550 C460 524 466 506 478 498\"/>\n  </g>\n  <g class=\"part\" data-id=\"dct\" fill=\"none\" stroke=\"#7fae7a\" stroke-width=\"7\" stroke-linecap=\"round\">\n    <path d=\"M478 498 C496 490 512 502 506 516 C500 530 482 526 484 512 C486 498 506 494 520 504\"/>\n  </g>\n  <g class=\"part\" data-id=\"duct\" fill=\"none\" stroke=\"#cfae6a\" stroke-width=\"9\" stroke-linecap=\"round\">\n    <path d=\"M528 512 C556 520 578 536 586 560 C590 574 592 586 594 596\"/>\n    <path d=\"M556 528 C572 540 580 556 584 574\" stroke-width=\"4\" opacity=\".6\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2\" opacity=\".7\">\n    <path d=\"M372 556 C392 566 412 566 428 558 M446 566 C462 572 480 570 494 560 M500 540 C520 546 540 552 556 562\"/>\n  </g>\n  <text x=\"628\" y=\"602\" class=\"cap\" text-anchor=\"end\">peritubular capillaries &amp; vasa recta</text>\n  <text x=\"628\" y=\"480\" class=\"cap\" text-anchor=\"end\">→ collecting duct → papilla → calyx</text>",
  "anims": [
   {
    "id": "flow",
    "label": "Blood & filtrate",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#ef6a5f\"><animateMotion dur=\"5.4s\" repeatCount=\"indefinite\" path=\"M40 224 C100 224 158 232 210 240 C240 226 268 210 292 190 C330 160 360 130 392 108\"/></circle>\n        <circle r=\"5\" fill=\"#ef6a5f\"><animateMotion dur=\"5.4s\" begin=\"-2.7s\" repeatCount=\"indefinite\" path=\"M40 224 C100 224 158 232 210 240 C244 244 276 250 300 262 C330 276 356 296 368 320\"/></circle>\n        <circle r=\"4.6\" fill=\"#6f9fd8\"><animateMotion dur=\"5.4s\" begin=\"-1.4s\" repeatCount=\"indefinite\" path=\"M392 112 C360 150 320 200 260 240 C200 268 120 282 40 288\"/></circle>\n        <circle r=\"4.2\" fill=\"#f2d179\"><animateMotion dur=\"6s\" repeatCount=\"indefinite\" path=\"M344 512 C360 528 386 534 404 520 C420 506 424 530 424 560 C426 584 448 592 458 566 C466 540 466 512 480 500 C498 492 512 508 520 512 C548 524 574 542 588 570 C594 582 598 592 600 600\"/></circle>\n        <circle r=\"4.2\" fill=\"#f2d179\"><animateMotion dur=\"6s\" begin=\"-3s\" repeatCount=\"indefinite\" path=\"M344 512 C360 528 386 534 404 520 C420 506 424 530 424 560 C426 584 448 592 458 566 C466 540 466 512 480 500 C498 492 512 508 520 512 C548 524 574 542 588 570 C594 582 598 592 600 600\"/></circle>\n        <circle r=\"4.6\" fill=\"#f2d179\"><animateMotion dur=\"4.4s\" repeatCount=\"indefinite\" path=\"M226 288 C214 340 190 392 160 442 C138 478 124 508 118 538 C116 556 120 566 126 574\"/></circle>\n      </g>"
   },
   {
    "id": "peri",
    "label": "Ureteric peristalsis",
    "cls": "peri",
    "layer": "\n      <g class=\"flow-layer\">\n        <ellipse class=\"peri-wave\" rx=\"9\" ry=\"4\" fill=\"#fff6dd\" opacity=\".8\" transform=\"rotate(24)\"/>\n        <circle r=\"5\" fill=\"#fff2cc\"><animateMotion dur=\"2.6s\" repeatCount=\"indefinite\" path=\"M226 288 C214 340 190 392 160 442 C138 478 124 508 118 538\"/></circle>\n      </g>"
   }
  ],
  "extra": {
   "rate": {
    "min": 20,
    "max": 200,
    "val": 125,
    "unit": " mL/min",
    "label": "GFR"
   }
  },
  "quiz": [
   {
    "q": "Where does the majority of filtered glucose get reabsorbed?",
    "opts": [
     "Loop of Henle",
     "Proximal convoluted tubule",
     "Distal convoluted tubule",
     "Collecting duct"
    ],
    "a": 1,
    "why": "The PCT reabsorbs 100% of glucose via SGLT2/SGLT1. If plasma glucose exceeds ~10 mmol/L the transporters saturate and glucose appears in urine."
   },
   {
    "q": "Which nephron segment is impermeable to water but actively pumps out sodium chloride?",
    "opts": [
     "Thin descending limb of Henle",
     "Thick ascending limb of Henle",
     "Proximal convoluted tubule",
     "Collecting duct with vasopressin present"
    ],
    "a": 1,
    "why": "The thick ascending limb's Na-K-2Cl pump builds the medullary gradient without water following — the \"single effect\" of countercurrent multiplication."
   },
   {
    "q": "At the hilum, from anterior to posterior the structures are…",
    "opts": [
     "Artery, vein, pelvis",
     "Vein, artery, pelvis",
     "Pelvis, artery, vein",
     "Vein, pelvis, artery"
    ],
    "a": 1,
    "why": "Remember \"VAU\": renal Vein most anterior, then Artery, then Ureter/pelvis most posterior."
   }
  ],
  "related": [
   "bladder",
   "heart",
   "liver",
   "thyroid"
  ],
  "photo": {
   "file": "kidney.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "capsule": [
     813,
     333
    ],
    "cortex": [
     188,
     222
    ],
    "pyramid": [
     250,
     244
    ],
    "papilla": [
     269,
     367
    ],
    "calyces": [
     281,
     333
    ],
    "pelvis": [
     313,
     467
    ],
    "ureter": [
     381,
     722
    ],
    "hilum": [
     350,
     478
    ],
    "artery": [
     400,
     456
    ],
    "vein": [
     400,
     506
    ]
   }
  }
 },
 "liver": {
  "title": "Liver",
  "latin": "Hepar",
  "system": "digestive",
  "region": "Right hypochondrium & epigastrium, under the diaphragm",
  "size": "≈ 1.4–1.6 kg — the largest internal organ",
  "blood": "Dual: hepatic artery (25%) + hepatic portal vein (75%)",
  "nerve": "Hepatic plexus (vagus + sympathetic coeliac fibres)",
  "blurb": "The body's chemical plant: metabolism, bile, clotting factors, detoxification and storage.",
  "summary": "The liver receives blood twice over — oxygenated from the hepatic artery and nutrient-rich from the portal vein — and mixes them in the sinusoids between plates of hepatocytes. Each hepatocyte performs hundreds of jobs: making albumin and clotting factors, conjugating bilirubin, storing glycogen and vitamins, and detoxifying drugs through the cytochrome P450 system. Bile, made continuously, is concentrated in the gallbladder and released into the duodenum to emulsify fat. The liver is also the only visceral organ that can regenerate: removing 70% leaves a liver that regrows to full size.",
  "vb": [
   640,
   540
  ],
  "legend": [
   [
    "#8a4a33",
    "Hepatic tissue"
   ],
   [
    "#4f8f5b",
    "Bile system"
   ],
   [
    "#3f5f9c",
    "Portal / hepatic veins"
   ],
   [
    "#c0453f",
    "Hepatic artery"
   ]
  ],
  "parts": {
   "rlobe": {
    "n": "Right lobe",
    "l": "Lobus dexter",
    "t": "Lobe",
    "at": [
     180,
     240
    ],
    "s": "l",
    "d": "The larger lobe, four to six times the volume of the left, occupying the right hypochondrium. Its diaphragmatic surface is smooth and convex.",
    "f": "Carries most of the hepatic mass and function.",
    "c": "Its inferior edge is what you palpate below the costal margin in hepatomegaly."
   },
   "llobe": {
    "n": "Left lobe",
    "l": "Lobus sinister",
    "t": "Lobe",
    "at": [
     490,
     220
    ],
    "s": "r",
    "d": "Thinner and flatter, lying in the epigastrium and reaching across to the left. Separated from the right lobe on the diaphragmatic surface by the falciform ligament.",
    "f": "Supplies the left half of the functional liver.",
    "c": "In cirrhosis the left and caudate lobes often hypertrophy while the right lobe atrophies."
   },
   "caudate": {
    "n": "Caudate lobe",
    "l": "Lobus caudatus",
    "t": "Lobe",
    "at": [
     300,
     150
    ],
    "s": "r",
    "d": "A small lobe on the posterior surface between the IVC and the ligamentum venosum, draining directly into the IVC.",
    "f": "Has independent vascular supply and biliary drainage.",
    "c": "It hypertrophies in Budd–Chiari syndrome, and its size relative to the right lobe is a CT sign of cirrhosis."
   },
   "quadrate": {
    "n": "Quadrate lobe",
    "l": "Lobus quadratus",
    "t": "Lobe",
    "at": [
     330,
     330
    ],
    "s": "r",
    "d": "On the visceral surface between the gallbladder fossa and the fissure for the ligamentum teres.",
    "f": "Functionally part of the left hemiliver.",
    "c": "Together with the caudate lobe it defines the surgical anatomy of the portohepatic segments."
   },
   "falciform": {
    "n": "Falciform ligament",
    "l": "Ligamentum falciforme",
    "t": "Ligament",
    "at": [
     398,
     120
    ],
    "s": "r",
    "d": "A sickle-shaped fold of peritoneum attaching the liver to the anterior abdominal wall and diaphragm; its free edge carries the ligamentum teres (obliterated umbilical vein).",
    "f": "Anchors the liver and divides the anatomical lobes on the diaphragmatic surface.",
    "c": "In portal hypertension the ligamentum teres can recanalise and cause a periumbilical caput medusae."
   },
   "gallbladder": {
    "n": "Gallbladder",
    "l": "Vesica biliaris",
    "t": "Accessory organ",
    "at": [
     330,
     430
    ],
    "s": "l",
    "d": "A 7–10 cm pear-shaped sac on the visceral surface of the right lobe, with fundus, body and neck. Its wall concentrates bile up to tenfold.",
    "f": "Stores and concentrates bile, releasing it into the duodenum when fat arrives (CCK-mediated).",
    "c": "Gallstones (cholelithiasis) cause biliary colic; a stone impacted in the neck gives acute cholecystitis with Murphy's sign."
   },
   "cystic": {
    "n": "Cystic duct",
    "l": "Ductus cysticus",
    "t": "Bile duct",
    "at": [
     368,
     392
    ],
    "s": "r",
    "d": "The spiral-valved duct joining the gallbladder neck to the common hepatic duct.",
    "f": "Two-way channel: bile enters the gallbladder for storage and leaves it after a fatty meal.",
    "c": "Its spiral valves of Heister make cannulation during ERCP tricky."
   },
   "cbd": {
    "n": "Common bile duct",
    "l": "Ductus choledochus",
    "t": "Bile duct",
    "at": [
     420,
     470
    ],
    "s": "r",
    "d": "Formed by union of common hepatic and cystic ducts; runs in the free edge of the lesser omentum, behind the first part of the duodenum and into the pancreatic head to the ampulla.",
    "f": "Delivers bile to the duodenum for fat emulsification.",
    "c": "A stone here causes obstructive jaundice, pale stools and dark urine; with infection, ascending cholangitis."
   },
   "artery": {
    "n": "Hepatic artery proper",
    "l": "Arteria hepatica propria",
    "t": "Vessel",
    "at": [
     392,
     352
    ],
    "s": "r",
    "d": "Branch of the coeliac trunk (via the common hepatic), supplying oxygenated blood and running in the portal triad.",
    "f": "Provides ~25% of hepatic blood flow but ~50% of its oxygen.",
    "c": "It is the dominant supply to tumours, which is why chemoembolisation (TACE) via the hepatic artery works."
   },
   "portalvein": {
    "n": "Hepatic portal vein",
    "l": "Vena portae hepatis",
    "t": "Vessel",
    "at": [
     352,
     372
    ],
    "s": "l",
    "d": "Formed behind the pancreatic neck by the splenic and superior mesenteric veins; carries nutrient-rich, deoxygenated blood from gut, spleen and pancreas.",
    "f": "Delivers 75% of hepatic blood and everything absorbed from the gut for first-pass processing.",
    "c": "Portal hypertension (cirrhosis) causes oesophageal varices, splenomegaly and ascites."
   },
   "hepvein": {
    "n": "Hepatic veins",
    "l": "Venae hepaticae",
    "t": "Vessel",
    "at": [
     268,
     96
    ],
    "s": "l",
    "d": "Three short veins (right, middle, left) draining the liver directly into the IVC at its superior surface.",
    "f": "Return processed blood to the heart.",
    "c": "Their obstruction defines Budd–Chiari syndrome: painful hepatomegaly, ascites and jaundice."
   },
   "ivc": {
    "n": "Inferior vena cava",
    "l": "Vena cava inferior",
    "t": "Vessel",
    "at": [
     252,
     60
    ],
    "s": "l",
    "d": "Grooves a deep fossa on the posterior liver surface; the liver partly surrounds it.",
    "f": "Carries hepatic outflow to the right atrium.",
    "c": "Because the liver wraps it, major liver trauma can tear the IVC with catastrophic bleeding."
   },
   "lobule": {
    "n": "Hepatic lobule & sinusoids",
    "l": "Lobulus hepaticus",
    "t": "Functional unit",
    "at": [
     300,
     500
    ],
    "s": "l",
    "d": "Hexagonal units ~1 mm across: plates of hepatocytes radiating from a central vein, separated by sinusoids lined with endothelium and Kupffer macrophages; portal triads (artery, vein, bile duct) sit at the corners.",
    "f": "Blood flows from triad to central vein while bile flows the opposite way, from canaliculi to the triad bile duct.",
    "c": "Zone 3 (around the central vein) is most vulnerable to ischaemia and paracetamol toxicity; zone 1 to viral hepatitis."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"lv-t\" cx=\"36%\" cy=\"26%\" r=\"90%\">\n      <stop offset=\"0\" stop-color=\"#b06247\"/><stop offset=\".55\" stop-color=\"#8f4a34\"/><stop offset=\"1\" stop-color=\"#5f2c20\"/>\n    </radialGradient>\n    <linearGradient id=\"lv-bile\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#7fae72\"/><stop offset=\"1\" stop-color=\"#41703f\"/>\n    </linearGradient>\n  </defs>\n  <path class=\"part\" data-id=\"ivc\" d=\"M238 26 C232 60 232 100 240 132 L272 132 C280 100 280 60 274 26 Z\" fill=\"#41608f\" stroke=\"#2b4066\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"hepvein\" fill=\"none\" stroke=\"#5c80b8\" stroke-width=\"9\" stroke-linecap=\"round\" d=\"M256 128 C246 100 236 74 232 44 M258 128 C266 98 276 72 282 46 M256 128 C256 100 258 72 258 46\"/>\n  <path class=\"part\" data-id=\"rlobe\" d=\"M62 152 C56 250 86 350 148 402 C212 454 306 458 364 424 C396 404 408 372 406 338 L406 208 C406 158 342 118 250 110 C158 102 68 116 62 152 Z\" fill=\"url(#lv-t)\" stroke=\"#4c231a\" stroke-width=\"2.4\"/>\n  <path class=\"part\" data-id=\"llobe\" d=\"M406 212 C464 196 524 192 562 204 C592 214 596 244 572 260 C530 288 462 300 406 296 Z\" fill=\"url(#lv-t)\" stroke=\"#4c231a\" stroke-width=\"2.2\"/>\n  <path d=\"M96 190 C110 260 140 330 186 380\" fill=\"none\" stroke=\"#d08a6c\" stroke-width=\"6\" opacity=\".3\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"caudate\" d=\"M282 128 C306 120 328 130 330 150 C332 170 314 182 294 178 C276 174 268 152 282 128 Z\" fill=\"#a05a41\" stroke=\"#4c231a\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"quadrate\" d=\"M312 306 C336 300 356 308 358 326 C360 344 342 356 320 352 C300 348 296 322 312 306 Z\" fill=\"#a05a41\" stroke=\"#4c231a\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"falciform\" d=\"M396 96 L412 96 L412 306 L396 306 Z\" fill=\"#efe0c8\" stroke=\"#a98a63\" stroke-width=\"1.6\"/>\n  <path d=\"M404 300 L404 352\" stroke=\"#a98a63\" stroke-width=\"3\" opacity=\".7\"/>\n  <path class=\"part\" data-id=\"gallbladder\" d=\"M316 396 C302 424 308 452 330 458 C352 452 358 424 344 396 Z\" fill=\"url(#lv-bile)\" stroke=\"#2c4b2b\" stroke-width=\"1.8\"/>\n  <path class=\"part\" data-id=\"cystic\" d=\"M340 400 C352 392 362 386 372 380\" fill=\"none\" stroke=\"#5c8f52\" stroke-width=\"7\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"cbd\" d=\"M372 380 C392 396 408 420 416 448 C420 462 422 476 422 490\" fill=\"none\" stroke=\"#5c8f52\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"portalvein\" d=\"M330 386 C344 378 356 372 368 366 M368 366 C352 344 330 330 306 322\" fill=\"none\" stroke=\"#4b628f\" stroke-width=\"12\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"artery\" d=\"M398 344 C388 352 380 358 372 364 M372 364 C360 344 344 332 326 326\" fill=\"none\" stroke=\"#c0453f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n  <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"3\" opacity=\".6\">\n    <path d=\"M306 322 C270 306 220 296 170 300 M306 322 C290 280 268 240 240 210 M326 326 C352 300 372 268 384 236\"/>\n  </g>\n  <rect class=\"inset-box\" x=\"44\" y=\"452\" width=\"552\" height=\"82\" rx=\"14\"/>\n  <text x=\"60\" y=\"472\" class=\"inset-title\">Classic lobule · portal triads at the corners, central vein in the middle</text>\n  <g class=\"part\" data-id=\"lobule\">\n    <path d=\"M300 480 L348 494 L348 522 L300 536 L252 522 L252 494 Z\" fill=\"#a05a41\" stroke=\"#4c231a\" stroke-width=\"1.6\" opacity=\".95\"/>\n    <circle cx=\"300\" cy=\"508\" r=\"9\" fill=\"#5c80b8\" stroke=\"#2b4066\" stroke-width=\"1.4\"/>\n    <g fill=\"none\" stroke=\"#d08a6c\" stroke-width=\"2\" opacity=\".8\">\n      <path d=\"M262 498 C276 502 288 504 292 506 M262 518 C276 514 288 512 292 510 M338 498 C324 502 312 504 308 506 M338 518 C324 514 312 512 308 510 M300 484 L300 498 M300 518 L300 532\"/>\n    </g>\n    <g fill=\"#5c8f52\"><circle cx=\"252\" cy=\"494\" r=\"5\"/><circle cx=\"348\" cy=\"494\" r=\"5\"/><circle cx=\"348\" cy=\"522\" r=\"5\"/><circle cx=\"252\" cy=\"522\" r=\"5\"/></g>\n    <g fill=\"#c0453f\"><circle cx=\"258\" cy=\"490\" r=\"3.4\"/><circle cx=\"342\" cy=\"490\" r=\"3.4\"/><circle cx=\"342\" cy=\"526\" r=\"3.4\"/><circle cx=\"258\" cy=\"526\" r=\"3.4\"/></g>\n    <g fill=\"#4b628f\"><circle cx=\"246\" cy=\"498\" r=\"3.4\"/><circle cx=\"354\" cy=\"498\" r=\"3.4\"/><circle cx=\"354\" cy=\"518\" r=\"3.4\"/><circle cx=\"246\" cy=\"518\" r=\"3.4\"/></g>\n    <text x=\"628\" y=\"502\" class=\"cap\" text-anchor=\"end\">portal triad: bile duct · hepatic arteriole · portal venule</text>\n    <text x=\"628\" y=\"524\" class=\"cap\" text-anchor=\"end\">sinusoids carry blood inward; bile flows outward</text>\n    <text x=\"120\" y=\"502\" class=\"cap\">Kupffer cells</text>\n    <circle cx=\"166\" cy=\"498\" r=\"4\" fill=\"#7a4637\"/>\n    <text x=\"120\" y=\"524\" class=\"cap\">space of Disse</text>\n    <circle cx=\"176\" cy=\"520\" r=\"4\" fill=\"#e0b48c\"/>\n  </g>",
  "anims": [
   {
    "id": "flow",
    "label": "Blood & bile flow",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#7c9bd2\"><animateMotion dur=\"4.6s\" repeatCount=\"indefinite\" path=\"M330 386 C344 378 356 372 368 366 C352 344 330 330 306 322 C270 306 220 296 170 300\"/></circle>\n        <circle r=\"4.6\" fill=\"#ef6a5f\"><animateMotion dur=\"4.6s\" begin=\"-2.3s\" repeatCount=\"indefinite\" path=\"M398 344 C388 352 380 358 372 364 C360 344 344 332 326 326 C352 300 372 268 384 236\"/></circle>\n        <circle r=\"4.6\" fill=\"#8fd08a\"><animateMotion dur=\"5.2s\" repeatCount=\"indefinite\" path=\"M330 452 C336 424 344 408 356 396 C372 386 384 384 372 380 C392 396 408 420 416 448 C420 462 422 476 422 490\"/></circle>\n        <circle r=\"4.4\" fill=\"#7c9bd2\"><animateMotion dur=\"4.6s\" begin=\"-1.2s\" repeatCount=\"indefinite\" path=\"M256 128 C246 100 236 74 232 44\"/></circle>\n      </g>"
   },
   {
    "id": "throb",
    "label": "Metabolic activity",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Most of the liver's blood supply arrives via the…",
    "opts": [
     "Hepatic artery proper",
     "Hepatic portal vein",
     "Inferior vena cava",
     "Coeliac trunk directly"
    ],
    "a": 1,
    "why": "About 75% of hepatic blood is portal venous blood from gut, spleen and pancreas; the hepatic artery supplies the rest but half the oxygen."
   },
   {
    "q": "Bile in the lobule flows…",
    "opts": [
     "From central vein to portal triad",
     "From portal triad to central vein",
     "From canaliculi at the centre outward to the triad bile duct",
     "Only within the gallbladder"
    ],
    "a": 2,
    "why": "Bile is secreted into canaliculi between hepatocytes and runs outward to the bile ductule in the portal triad — opposite to the direction of blood."
   },
   {
    "q": "A stone in the common bile duct classically causes…",
    "opts": [
     "Haematemesis",
     "Obstructive jaundice with pale stools and dark urine",
     "Polyuria and polydipsia",
     "Sudden deafness"
    ],
    "a": 1,
    "why": "Conjugated bilirubin cannot reach the gut, so stools lose their colour and the water-soluble bilirubin is excreted in urine."
   }
  ],
  "related": [
   "gut",
   "pancreas",
   "spleen",
   "kidney"
  ],
  "photo": {
   "file": "liver.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "rlobe": [
     281,
     389
    ],
    "llobe": [
     688,
     311
    ],
    "falciform": [
     550,
     256
    ],
    "gallbladder": [
     350,
     578
    ],
    "cystic": [
     450,
     578
    ],
    "cbd": [
     481,
     733
    ],
    "artery": [
     544,
     600
    ],
    "portalvein": [
     513,
     644
    ],
    "ivc": [
     544,
     811
    ],
    "caudate": [
     563,
     522
    ],
    "quadrate": [
     438,
     522
    ]
   }
  }
 },
 "gut": {
  "title": "Stomach & intestines",
  "latin": "Gaster et intestina",
  "system": "digestive",
  "region": "Abdominal cavity, from diaphragm to pelvic floor",
  "size": "Stomach 1.5 L · small bowel ≈ 4–6 m · large bowel ≈ 1.5 m",
  "blood": "Coeliac trunk, superior & inferior mesenteric arteries",
  "nerve": "Vagus (parasympathetic) + thoracolumbar splanchnic (sympathetic)",
  "blurb": "The gastrointestinal tract from oesophagus to rectum, with the villus that does the absorbing.",
  "summary": "Food is stored and acidified in the stomach, where pepsin begins protein digestion and the muscular wall churns it into chyme. The duodenum neutralises acid and receives bile and pancreatic juice; the jejunum and ileum absorb almost all nutrients across a surface amplified by circular folds, villi and microvilli to roughly 250 m². The colon then reclaims water and electrolytes and stores faeces. The gut also carries its own nervous system — the enteric plexuses — with more neurons than the spinal cord.",
  "vb": [
   640,
   660
  ],
  "legend": [
   [
    "#c9705f",
    "Stomach"
   ],
   [
    "#d99a7e",
    "Small intestine"
   ],
   [
    "#a9805f",
    "Large intestine"
   ],
   [
    "#e8cf9c",
    "Villus (inset)"
   ]
  ],
  "parts": {
   "oesophagus": {
    "n": "Oesophagus",
    "l": "Oesophagus",
    "t": "Tube",
    "at": [
     322,
     40
    ],
    "s": "r",
    "d": "A 25 cm muscular tube from pharynx to stomach, passing through the diaphragm at T10.",
    "f": "Propels the bolus by peristalsis; the lower sphincter prevents reflux.",
    "c": "Its lower third drains to the portal system via the left gastric vein — hence varices in portal hypertension."
   },
   "fundus": {
    "n": "Fundus of stomach",
    "l": "Fundus ventriculi",
    "t": "Region",
    "at": [
     452,
     120
    ],
    "s": "r",
    "d": "The dome above the oesophageal opening, usually filled with a gas bubble on erect films.",
    "f": "Stores swallowed air and gives the stomach its reservoir.",
    "c": "A fundal mass can be missed behind the gastric gas bubble on a plain radiograph."
   },
   "body": {
    "n": "Body of stomach",
    "l": "Corpus ventriculi",
    "t": "Region",
    "at": [
     452,
     220
    ],
    "s": "r",
    "d": "The main reservoir between fundus and antrum, lined by acid- and pepsin-secreting mucosa with rugae.",
    "f": "Mixes food with acid and pepsin; intrinsic factor for B12 absorption is made here.",
    "c": "Loss of parietal cells (autoimmune gastritis) causes pernicious anaemia through B12 malabsorption."
   },
   "antrum": {
    "n": "Pyloric antrum & pylorus",
    "l": "Antrum pyloricum",
    "t": "Region",
    "at": [
     382,
     300
    ],
    "s": "l",
    "d": "The distal funnel ending in the thick pyloric sphincter.",
    "f": "Grinds food and meters chyme into the duodenum; G cells here secrete gastrin.",
    "c": "Chronic antral gastritis from Helicobacter pylori is the main route to peptic ulcer and gastric cancer."
   },
   "rugae": {
    "n": "Rugae",
    "l": "Plicae gastricae",
    "t": "Mucosa",
    "at": [
     470,
     180
    ],
    "s": "r",
    "d": "Longitudinal folds of gastric mucosa that flatten as the stomach distends.",
    "f": "Allow expansion and channel the flow of chyme.",
    "c": "Thickened rugae (Ménétrier disease) cause protein-losing gastropathy."
   },
   "duodenum": {
    "n": "Duodenum",
    "l": "Duodenum",
    "t": "Small bowel",
    "at": [
     300,
     360
    ],
    "s": "l",
    "d": "A C-shaped 25 cm first part of the small bowel wrapping the pancreatic head; the ampulla opens on its second part.",
    "f": "Neutralises acid with bicarbonate and mixes chyme with bile and pancreatic enzymes.",
    "c": "Most peptic ulcers occur in the duodenal bulb; posterior ulcers can erode the gastroduodenal artery."
   },
   "jejunum": {
    "n": "Jejunum",
    "l": "Jejunum",
    "t": "Small bowel",
    "at": [
     230,
     450
    ],
    "s": "l",
    "d": "The proximal two-fifths of the mobile small bowel, in the left upper quadrant, with tall circular folds and few Peyer's patches.",
    "f": "The principal site of carbohydrate and protein absorption.",
    "c": "Its rich vasa recta give it a deeper red colour and thicker wall than ileum at surgery."
   },
   "ileum": {
    "n": "Ileum",
    "l": "Ileum",
    "t": "Small bowel",
    "at": [
     300,
     540
    ],
    "s": "l",
    "d": "The distal three-fifths, in the right lower quadrant and pelvis, with Peyer's patches on the antimesenteric border.",
    "f": "Absorbs bile salts and vitamin B12–intrinsic factor complex; delivers residue to the caecum.",
    "c": "Crohn disease most often affects the terminal ileum, causing B12 deficiency and bile-salt diarrhoea."
   },
   "caecum": {
    "n": "Caecum & appendix",
    "l": "Caecum et appendix",
    "t": "Large bowel",
    "at": [
     136,
     540
    ],
    "s": "l",
    "d": "The blind first part of the colon in the right iliac fossa, with the worm-like appendix at its pole.",
    "f": "Absorbs fluid; the appendix is a lymphoid organ and gut flora reservoir.",
    "c": "Appendicitis classically migrates from periumbilical pain to McBurney's point as the parietal peritoneum becomes inflamed."
   },
   "ascending": {
    "n": "Ascending colon",
    "l": "Colon ascendens",
    "t": "Large bowel",
    "at": [
     110,
     400
    ],
    "s": "l",
    "d": "Retroperitoneal, from caecum to the hepatic flexure under the right lobe of liver.",
    "f": "Absorbs water and electrolytes; moves residue proximally to distally.",
    "c": "Right-sided cancers tend to bleed and cause iron-deficiency anaemia rather than obstruction."
   },
   "transverse": {
    "n": "Transverse colon",
    "l": "Colon transversum",
    "t": "Large bowel",
    "at": [
     320,
     268
    ],
    "s": "r",
    "d": "The mobile loop slung between hepatic and splenic flexures on the transverse mesocolon.",
    "f": "Continues water absorption and storage.",
    "c": "It is the commonest site of volvulus after the sigmoid, and of colonic obstruction from cancer."
   },
   "descending": {
    "n": "Descending colon",
    "l": "Colon descendens",
    "t": "Large bowel",
    "at": [
     524,
     400
    ],
    "s": "r",
    "d": "Retroperitoneal, from splenic flexure to the iliac fossa.",
    "f": "Stores and transports faeces toward the sigmoid.",
    "c": "The splenic flexure is a watershed zone (Griffiths' point) vulnerable to ischaemic colitis."
   },
   "sigmoid": {
    "n": "Sigmoid colon & rectum",
    "l": "Colon sigmoideum et rectum",
    "t": "Large bowel",
    "at": [
     480,
     560
    ],
    "s": "r",
    "d": "The S-shaped mobile loop leading into the rectum, which follows the sacral curve to the anal canal.",
    "f": "Stores faeces; rectal distension triggers the defecation reflex.",
    "c": "The sigmoid is the commonest site of diverticular disease and of volvulus."
   },
   "villi": {
    "n": "Villus & microvilli",
    "l": "Villi intestinales",
    "t": "Functional unit",
    "at": [
     330,
     624
    ],
    "s": "l",
    "d": "Finger-like mucosal projections ~1 mm tall, each with a capillary network and a central lacteal, covered by enterocytes with a brush border of microvilli.",
    "f": "Multiply the absorptive surface ~600-fold; sugars and amino acids enter blood, fat enters the lacteal.",
    "c": "In coeliac disease, gluten-driven immunity flattens the villi, causing malabsorption and steatorrhoea."
   }
  },
  "art": "\n  <defs>\n    <linearGradient id=\"g-st\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#d9806c\"/><stop offset=\"1\" stop-color=\"#a04a3c\"/>\n    </linearGradient>\n    <linearGradient id=\"g-si\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#e2ab8c\"/><stop offset=\"1\" stop-color=\"#c07e60\"/>\n    </linearGradient>\n    <linearGradient id=\"g-li\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#bd9068\"/><stop offset=\"1\" stop-color=\"#8e6446\"/>\n    </linearGradient>\n  </defs>\n  <path class=\"part\" data-id=\"oesophagus\" d=\"M322 8 L322 84\" stroke=\"#c9705f\" stroke-width=\"20\" stroke-linecap=\"round\" fill=\"none\"/>\n  <g fill=\"none\" stroke=\"url(#g-li)\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"ascending\" d=\"M132 528 C118 480 112 420 116 356 C118 322 124 300 134 286\" stroke-width=\"34\"/>\n    <path class=\"part\" data-id=\"transverse\" d=\"M134 286 C150 268 200 258 260 262 C340 268 420 268 480 262 C510 258 524 268 528 288\" stroke-width=\"34\"/>\n    <path class=\"part\" data-id=\"descending\" d=\"M528 288 C536 330 536 400 528 452 C524 480 516 502 504 516\" stroke-width=\"34\"/>\n    <path class=\"part\" data-id=\"sigmoid\" d=\"M504 516 C480 540 452 552 430 560 C410 568 400 584 404 604 C408 626 420 640 436 646\" stroke-width=\"30\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#8e6446\" stroke-width=\"2\" opacity=\".5\">\n    <path d=\"M120 330 h24 M116 380 h26 M118 430 h26 M124 480 h24 M160 272 v22 M210 266 v24 M270 268 v24 M330 272 v24 M390 270 v24 M450 266 v24 M516 300 h-24 M526 350 h-26 M528 400 h-26 M522 450 h-24\"/>\n  </g>\n  <g class=\"part\" data-id=\"caecum\">\n    <path d=\"M132 528 C120 546 122 566 138 574 C156 582 172 570 172 550 C172 536 160 526 148 524 Z\" fill=\"url(#g-li)\" stroke=\"#7a5238\" stroke-width=\"2\"/>\n    <path d=\"M140 574 C136 590 128 600 116 606\" fill=\"none\" stroke=\"#bd9068\" stroke-width=\"9\" stroke-linecap=\"round\"/>\n  </g>\n  <path class=\"part\" data-id=\"fundus\" d=\"M404 96 C440 84 476 96 486 128 C492 152 480 172 458 176 C430 180 408 164 402 138 C398 118 396 104 404 96 Z\" fill=\"url(#g-st)\" stroke=\"#7d3227\" stroke-width=\"2.2\"/>\n  <path class=\"part\" data-id=\"body\" d=\"M404 96 C400 130 404 170 420 204 C436 238 452 262 456 286 C420 292 386 282 366 258 C346 234 342 190 352 150 C360 118 380 100 404 96 Z\" fill=\"url(#g-st)\" stroke=\"#7d3227\" stroke-width=\"2.2\"/>\n  <g class=\"part\" data-id=\"rugae\" fill=\"none\" stroke=\"#f0c4b4\" stroke-width=\"3.4\" opacity=\".8\" stroke-linecap=\"round\">\n    <path d=\"M382 130 C378 160 382 194 394 224 M404 124 C402 158 408 196 422 230 M428 122 C428 154 436 190 448 220\"/>\n  </g>\n  <path class=\"part\" data-id=\"antrum\" d=\"M456 286 C452 306 436 318 414 318 C396 318 382 308 378 292 C396 296 424 296 456 286 Z\" fill=\"url(#g-st)\" stroke=\"#7d3227\" stroke-width=\"2.2\"/>\n  <circle cx=\"388\" cy=\"308\" r=\"8\" fill=\"#f3d9cf\" stroke=\"#7d3227\" stroke-width=\"1.6\"/>\n  <g fill=\"none\" stroke=\"url(#g-si)\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"duodenum\" d=\"M380 312 C352 318 330 332 322 356 C314 382 322 404 344 414 C364 422 384 414 392 396\" stroke-width=\"24\"/>\n    <path class=\"part\" data-id=\"jejunum\" d=\"M392 396 C360 400 320 402 288 410 C240 422 208 442 206 466 C204 490 232 500 268 496 C310 492 348 480 372 468 C398 456 410 470 402 486 C392 506 352 516 312 520 C272 524 240 532 236 550\" stroke-width=\"22\"/>\n    <path class=\"part\" data-id=\"ileum\" d=\"M236 550 C240 568 276 574 316 570 C360 566 396 556 412 542 C428 528 420 512 398 514 C370 516 340 526 320 540 C300 554 300 570 322 578 C350 588 392 586 420 576\" stroke-width=\"20\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#f4d8c4\" stroke-width=\"2\" opacity=\".4\">\n    <path d=\"M240 430 C280 424 320 424 350 432 M250 470 C290 464 330 462 360 468 M260 540 C300 534 340 534 370 540\"/>\n  </g>\n  <path d=\"M172 552 C200 560 220 556 236 550\" fill=\"none\" stroke=\"url(#g-si)\" stroke-width=\"20\" stroke-linecap=\"round\"/>\n  <path d=\"M330 300 C300 380 260 460 240 540 M330 300 C360 390 380 470 390 550\" fill=\"none\" stroke=\"#e8d3bd\" stroke-width=\"1.6\" opacity=\".35\"/>\n  <rect class=\"inset-box\" x=\"44\" y=\"588\" width=\"552\" height=\"66\" rx=\"14\"/>\n  <g class=\"part\" data-id=\"villi\">\n    <path d=\"M62 646 C62 620 70 604 84 604 C98 604 106 620 106 646 Z\" fill=\"#e8cf9c\" stroke=\"#a9805f\" stroke-width=\"1.6\"/>\n    <path d=\"M118 646 C118 616 126 600 140 600 C154 600 162 616 162 646 Z\" fill=\"#e8cf9c\" stroke=\"#a9805f\" stroke-width=\"1.6\"/>\n    <path d=\"M174 646 C174 620 182 604 196 604 C210 604 218 620 218 646 Z\" fill=\"#e8cf9c\" stroke=\"#a9805f\" stroke-width=\"1.6\"/>\n    <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2\"><path d=\"M76 640 C74 622 78 612 84 610 C92 612 96 624 94 640 M132 640 C130 618 134 608 140 606 C148 608 152 620 150 640\"/></g>\n    <g fill=\"none\" stroke=\"#8fc06a\" stroke-width=\"3\"><path d=\"M188 640 L188 612 M196 640 L196 616\"/></g>\n    <text x=\"240\" y=\"616\" class=\"cap\">enterocyte brush border · microvilli ×600 surface area</text>\n    <text x=\"628\" y=\"640\" class=\"cap\" text-anchor=\"end\">red = capillary (sugars, amino acids) · green = lacteal (fat)</text>\n  </g>",
  "anims": [
   {
    "id": "peri",
    "label": "Peristalsis",
    "cls": "peri",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#f7e3c8\"><animateMotion dur=\"6.5s\" repeatCount=\"indefinite\" path=\"M322 10 L322 84 C360 100 400 110 420 150 C440 200 452 250 452 288 C440 306 414 314 390 310 C352 318 330 332 322 356 C314 382 322 404 344 414 C360 400 320 402 288 410 C240 422 208 442 206 466 C204 490 232 500 268 496 C310 492 348 480 372 468 C398 456 410 470 402 486 C392 506 352 516 312 520 C272 524 240 532 236 550 C240 568 276 574 316 570 C360 566 396 556 412 542\"/></circle>\n        <circle r=\"5\" fill=\"#e8c79a\"><animateMotion dur=\"7.5s\" begin=\"-3s\" repeatCount=\"indefinite\" path=\"M132 528 C118 480 112 420 116 356 C118 322 124 300 134 286 C150 268 200 258 260 262 C340 268 420 268 480 262 C510 258 524 268 528 288 C536 330 536 400 528 452 C524 480 516 502 504 516 C480 540 452 552 430 560 C410 568 400 584 404 604 C408 626 420 640 436 646\"/></circle>\n      </g>"
   },
   {
    "id": "churn",
    "label": "Gastric mixing",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Vitamin B12 is absorbed in the…",
    "opts": [
     "Duodenum",
     "Jejunum",
     "Terminal ileum",
     "Sigmoid colon"
    ],
    "a": 2,
    "why": "B12 bound to intrinsic factor (made by gastric parietal cells) is taken up by receptors in the terminal ileum — hence B12 deficiency after ileal resection or in Crohn disease."
   },
   {
    "q": "Which artery supplies the midgut (distal duodenum to proximal two-thirds of transverse colon)?",
    "opts": [
     "Coeliac trunk",
     "Superior mesenteric artery",
     "Inferior mesenteric artery",
     "Internal iliac artery"
    ],
    "a": 1,
    "why": "The SMA supplies the midgut; the coeliac trunk the foregut and the IMA the hindgut. Their junctions are watershed zones prone to ischaemia."
   },
   {
    "q": "Classic appendicitis pain starts periumbilically and then localises to the right iliac fossa because…",
    "opts": [
     "The appendix moves",
     "Visceral pain is poorly localised until the parietal peritoneum is inflamed",
     "The caecum rotates",
     "Referred pain from the ureter"
    ],
    "a": 1,
    "why": "Early visceral pain is dull and central (T10); once inflammation reaches the parietal peritoneum, somatic pain localises precisely to McBurney's point."
   }
  ],
  "related": [
   "liver",
   "pancreas",
   "spleen",
   "kidney"
  ],
  "photo": {
   "file": "gut.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "oesophagus": [
     494,
     67
    ],
    "fundus": [
     550,
     167
    ],
    "body": [
     538,
     222
    ],
    "antrum": [
     513,
     289
    ],
    "duodenum": [
     463,
     333
    ],
    "jejunum": [
     475,
     556
    ],
    "ileum": [
     519,
     667
    ],
    "caecum": [
     394,
     756
    ],
    "ascending": [
     388,
     578
    ],
    "transverse": [
     500,
     444
    ],
    "descending": [
     613,
     578
    ],
    "sigmoid": [
     563,
     778
    ]
   }
  }
 },
 "eye": {
  "title": "Eye",
  "latin": "Oculus",
  "system": "sensory",
  "region": "Orbit, protected by the bony orbital walls",
  "size": "≈ 24 mm globe · retina ≈ 126 million photoreceptors",
  "blood": "Ophthalmic artery (central retinal + ciliary branches)",
  "nerve": "Optic (II) · motor III, IV, VI · autonomic for pupil",
  "blurb": "Sagittal section: an optical instrument that focuses light onto a neural film.",
  "summary": "Light is refracted mostly at the cornea and finely focused by the lens, whose curvature is changed by the ciliary muscle for near vision. The iris adjusts pupil size to control light entry. The image lands on the retina, where rods (dim light, motion) and cones (colour, detail) convert photons into signals through bipolar cells to ganglion cells, whose axons leave as the optic nerve. The fovea, a pit in the macula with cones only, gives sharp central vision. The retina is neural tissue: it is the only place in the body where the central nervous system can be seen directly.",
  "vb": [
   640,
   470
  ],
  "legend": [
   [
    "#e8e4da",
    "Sclera"
   ],
   [
    "#bcd8e6",
    "Cornea & aqueous"
   ],
   [
    "#c9a24a",
    "Lens"
   ],
   [
    "#8a4a52",
    "Uvea"
   ],
   [
    "#6d4a86",
    "Retina & optic nerve"
   ]
  ],
  "parts": {
   "cornea": {
    "n": "Cornea",
    "l": "Cornea",
    "t": "Refractive",
    "at": [
     120,
     206
    ],
    "s": "l",
    "d": "Transparent, avascular, five-layered dome at the front of the eye. Provides about two-thirds of the eye's refractive power.",
    "f": "Bends and transmits light; its endothelium pumps water out to stay clear.",
    "c": "Endothelial failure causes oedema and cloudy vision; reshaping the cornea (LASIK) corrects refractive error."
   },
   "sclera": {
    "n": "Sclera",
    "l": "Sclera",
    "t": "Wall",
    "at": [
     300,
     64
    ],
    "s": "r",
    "d": "The tough white outer coat of collagen, continuous with the cornea anteriorly and the dural sheath of the optic nerve posteriorly.",
    "f": "Maintains the shape of the globe and anchors the extraocular muscles.",
    "c": "Thins with age and in inflammation (scleritis, a painful red eye linked to autoimmune disease)."
   },
   "choroid": {
    "n": "Choroid",
    "l": "Choroidea",
    "t": "Uvea",
    "at": [
     330,
     100
    ],
    "s": "r",
    "d": "The vascular middle layer between sclera and retina, densely packed with capillaries and melanin.",
    "f": "Feeds the outer retina and absorbs stray light to sharpen the image.",
    "c": "Its high blood flow makes it a common site for metastatic deposits and for uveitis."
   },
   "retina": {
    "n": "Retina",
    "l": "Retina",
    "t": "Neural",
    "at": [
     420,
     300
    ],
    "s": "r",
    "d": "Ten-layered neural film: photoreceptors outermost (light must pass through the inner layers first), then bipolar and ganglion cells.",
    "f": "Transduces light into nerve impulses.",
    "c": "Retinal detachment is a surgical emergency — flashes, floaters and a curtain across the field."
   },
   "macula": {
    "n": "Macula & fovea",
    "l": "Macula lutea",
    "t": "Neural",
    "at": [
     470,
     240
    ],
    "s": "r",
    "d": "A 5.5 mm yellow-pigmented area at the posterior pole; its centre, the fovea, contains cones only and no vessels.",
    "f": "High-acuity central vision for reading and faces.",
    "c": "Age-related macular degeneration destroys the fovea and central vision while sparing peripheral sight."
   },
   "disc": {
    "n": "Optic disc",
    "l": "Discus opticus",
    "t": "Neural",
    "at": [
     500,
     206
    ],
    "s": "r",
    "d": "Where ganglion axons and the central retinal vessels pierce the sclera. It has no photoreceptors.",
    "f": "Exit point of the optic nerve and entry of the central retinal artery.",
    "c": "It is the physiological blind spot; swelling (papilloedema) signals raised intracranial pressure."
   },
   "nerve": {
    "n": "Optic nerve",
    "l": "Nervus opticus",
    "t": "CNS tract",
    "at": [
     560,
     240
    ],
    "s": "r",
    "d": "About a million myelinated axons wrapped in meninges, running to the optic chiasm. It is brain tissue, not a peripheral nerve.",
    "f": "Carries visual information to the lateral geniculate body and cortex.",
    "c": "Optic neuritis can cause painful vision loss and has several causes, including demyelinating disease; new vision loss needs prompt assessment."
   },
   "lens": {
    "n": "Lens",
    "l": "Lens",
    "t": "Refractive",
    "at": [
     212,
     240
    ],
    "s": "l",
    "d": "A biconvex, avascular, elastic structure of crystallin proteins, suspended by zonular fibres from the ciliary body.",
    "f": "Fine focus: relaxing the ciliary muscle tightens the zonule and flattens the lens for distance; contracting it bulges the lens for near.",
    "c": "Loss of transparency is a cataract; loss of accommodation with age is presbyopia."
   },
   "iris": {
    "n": "Iris",
    "l": "Iris",
    "t": "Uvea",
    "at": [
     170,
     150
    ],
    "s": "l",
    "d": "The coloured diaphragm of smooth muscle (sphincter and dilator pupillae) in front of the lens.",
    "f": "Controls pupil diameter and therefore light entry and depth of focus.",
    "c": "Sphincter is parasympathetic (III), dilator sympathetic — hence Horner syndrome gives a small pupil and a fixed dilated pupil suggests III palsy."
   },
   "pupil": {
    "n": "Pupil",
    "l": "Pupilla",
    "t": "Aperture",
    "at": [
     150,
     240
    ],
    "s": "l",
    "d": "The central aperture of the iris — not a structure but a hole.",
    "f": "Adjusts from ~2 mm in bright light to ~8 mm in the dark.",
    "c": "An irregular or keyhole pupil suggests previous surgery or trauma; a relative afferent pupillary defect signals optic nerve disease."
   },
   "ciliary": {
    "n": "Ciliary body & zonule",
    "l": "Corpus ciliare",
    "t": "Uvea",
    "at": [
     200,
     320
    ],
    "s": "l",
    "d": "A ring of muscle and ciliary processes behind the iris; the processes secrete aqueous humour and the muscle controls lens shape through the zonular fibres.",
    "f": "Accommodation and aqueous production.",
    "c": "Aqueous drainage through the trabecular meshwork at the iridocorneal angle determines intraocular pressure — the target in glaucoma."
   },
   "aqueous": {
    "n": "Anterior chamber & aqueous",
    "l": "Camera anterior",
    "t": "Fluid",
    "at": [
     150,
     190
    ],
    "s": "l",
    "d": "The space between cornea and iris, filled with clear aqueous humour made by the ciliary processes and drained at the angle.",
    "f": "Nourishes cornea and lens and maintains intraocular pressure.",
    "c": "Blockage of drainage causes glaucoma: acute angle-closure is a painful red eye with a hard globe and haloes."
   },
   "vitreous": {
    "n": "Vitreous body",
    "l": "Corpus vitreum",
    "t": "Gel",
    "at": [
     330,
     240
    ],
    "s": "l",
    "d": "A clear collagen-and-hyaluronan gel filling four-fifths of the globe, adherent at the disc, macula and ora serrata.",
    "f": "Maintains globe shape and holds the retina in place.",
    "c": "With age it liquefies and pulls away (posterior vitreous detachment), causing floaters and, if it tugs, retinal tears."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"e-gl\" cx=\"40%\" cy=\"34%\" r=\"80%\">\n      <stop offset=\"0\" stop-color=\"#3d4f66\"/><stop offset=\"1\" stop-color=\"#141c26\"/>\n    </radialGradient>\n    <radialGradient id=\"e-lens\" cx=\"40%\" cy=\"34%\" r=\"80%\">\n      <stop offset=\"0\" stop-color=\"#f2d795\"/><stop offset=\"1\" stop-color=\"#c09440\"/>\n    </radialGradient>\n  </defs>\n  <circle cx=\"330\" cy=\"240\" r=\"168\" fill=\"url(#e-gl)\"/>\n  <path class=\"part\" data-id=\"sclera\" d=\"M330 72 A168 168 0 1 1 329.9 72 Z M330 88 A152 152 0 1 0 330.1 88 Z\" fill=\"#e8e4da\" fill-rule=\"evenodd\" stroke=\"#b9b2a4\" stroke-width=\"1.4\"/>\n  <path class=\"part\" data-id=\"choroid\" d=\"M330 88 A152 152 0 1 1 329.9 88 Z M330 100 A140 140 0 1 0 330.1 100 Z\" fill=\"#8a4a52\" fill-rule=\"evenodd\"/>\n  <path class=\"part\" data-id=\"retina\" d=\"M330 100 A140 140 0 1 1 329.9 100 Z M330 110 A130 130 0 1 0 330.1 110 Z\" fill=\"#6d4a86\" fill-rule=\"evenodd\"/>\n  <g class=\"part\" data-id=\"macula\"><circle cx=\"462\" cy=\"240\" r=\"14\" fill=\"#d9a83c\" stroke=\"#8a6a12\" stroke-width=\"1.4\"/><circle cx=\"462\" cy=\"240\" r=\"5\" fill=\"#f5e0a0\"/></g>\n  <g class=\"part\" data-id=\"disc\"><ellipse cx=\"486\" cy=\"240\" rx=\"10\" ry=\"26\" fill=\"#e8d9c0\" stroke=\"#8a7154\" stroke-width=\"1.4\"/></g>\n  <path class=\"part\" data-id=\"nerve\" d=\"M492 226 C540 220 580 224 616 236 L616 250 C580 258 540 260 492 254 Z\" fill=\"#cbb8dd\" stroke=\"#6d4a86\" stroke-width=\"1.6\"/>\n  <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2.6\" opacity=\".85\">\n    <path d=\"M486 236 C450 220 420 200 396 176 M486 244 C450 260 420 280 396 304\"/>\n  </g>\n  <path class=\"part\" data-id=\"cornea\" d=\"M196 148 C152 176 138 208 138 240 C138 272 152 304 196 332 C176 300 168 270 168 240 C168 210 176 180 196 148 Z\" fill=\"#bcd8e6\" stroke=\"#7fa6b8\" stroke-width=\"1.6\" opacity=\".92\"/>\n  <path class=\"part\" data-id=\"aqueous\" d=\"M196 148 C176 180 168 210 168 240 C168 270 176 300 196 332 C206 300 210 270 210 240 C210 210 206 180 196 148 Z\" fill=\"#9cc4d8\" opacity=\".5\"/>\n  <g class=\"part\" data-id=\"iris\">\n    <path d=\"M196 148 C214 168 224 190 228 214 L204 220 C200 194 194 170 186 152 Z\" fill=\"#8a4a52\" stroke=\"#5c2a32\" stroke-width=\"1.4\"/>\n    <path d=\"M196 332 C214 312 224 290 228 266 L204 260 C200 286 194 310 186 328 Z\" fill=\"#8a4a52\" stroke=\"#5c2a32\" stroke-width=\"1.4\"/>\n  </g>\n  <g class=\"part\" data-id=\"pupil\"><path d=\"M228 214 C232 232 232 248 228 266 L204 260 C207 247 207 233 204 220 Z\" fill=\"#0d1117\"/></g>\n  <ellipse class=\"part\" data-id=\"lens\" cx=\"248\" cy=\"240\" rx=\"26\" ry=\"52\" fill=\"url(#e-lens)\" stroke=\"#8a6a12\" stroke-width=\"1.6\"/>\n  <g class=\"part\" data-id=\"ciliary\" fill=\"#8a4a52\" stroke=\"#5c2a32\" stroke-width=\"1.4\">\n    <path d=\"M222 168 C240 176 252 188 258 202 L242 212 C234 196 226 182 214 174 Z\"/>\n    <path d=\"M222 312 C240 304 252 292 258 278 L242 268 C234 284 226 298 214 306 Z\"/>\n    <path d=\"M258 202 L276 208 M258 278 L276 272\" stroke=\"#e8d9c0\" stroke-width=\"1.6\" fill=\"none\"/>\n  </g>\n  <path class=\"part\" data-id=\"vitreous\" d=\"M282 140 C340 120 400 128 440 168 C470 200 478 240 470 280 C450 330 390 356 330 350 C290 346 268 320 262 288 C258 268 262 200 282 140 Z\" fill=\"#7fa6b8\" opacity=\".14\"/>\n  <g fill=\"none\" stroke=\"#f7e9a0\" stroke-width=\"2.2\" opacity=\".9\">\n    <path d=\"M28 176 L206 226 M28 240 L206 240 M28 304 L206 254\"/>\n    <path d=\"M228 226 L462 238 M228 240 L462 240 M228 254 L462 242\"/>\n  </g>\n  <text x=\"30\" y=\"150\" class=\"cap\">light rays converge on the fovea</text>\n  <path d=\"M40 360 C90 392 160 404 230 400\" fill=\"none\" stroke=\"#8fb0aa\" stroke-width=\"1.6\" opacity=\".5\"/>\n  <text x=\"44\" y=\"384\" class=\"cap\">extraocular muscles &amp; orbital fat surround the globe</text>",
  "anims": [
   {
    "id": "light",
    "label": "Light path",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.4\" fill=\"#ffe27a\"><animateMotion dur=\"2.6s\" repeatCount=\"indefinite\" path=\"M28 176 L206 226 L228 226 L462 238\"/></circle>\n        <circle r=\"4.4\" fill=\"#ffe27a\"><animateMotion dur=\"2.6s\" begin=\"-.9s\" repeatCount=\"indefinite\" path=\"M28 240 L206 240 L228 240 L462 240\"/></circle>\n        <circle r=\"4.4\" fill=\"#ffe27a\"><animateMotion dur=\"2.6s\" begin=\"-1.8s\" repeatCount=\"indefinite\" path=\"M28 304 L206 254 L228 254 L462 242\"/></circle>\n        <circle r=\"4\" fill=\"#c4b5fd\"><animateMotion dur=\"3.4s\" repeatCount=\"indefinite\" path=\"M462 240 C480 240 492 240 500 240 C540 236 580 238 616 242\"/></circle>\n      </g>"
   },
   {
    "id": "focus",
    "label": "Accommodation",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Most of the eye's refractive power comes from the…",
    "opts": [
     "Lens",
     "Cornea",
     "Vitreous",
     "Iris"
    ],
    "a": 1,
    "why": "The air–cornea interface bends light most (~43 dioptres); the lens adds fine, adjustable focus (~19 D)."
   },
   {
    "q": "The optic disc is blind because…",
    "opts": [
     "It has no blood supply",
     "It contains no photoreceptors",
     "It lies behind the iris",
     "It is covered by sclera"
    ],
    "a": 1,
    "why": "At the disc, ganglion axons and vessels pierce the retina, so there are no rods or cones — the physiological blind spot."
   },
   {
    "q": "Aqueous humour is produced by the…",
    "opts": [
     "Trabecular meshwork",
     "Ciliary processes",
     "Schlemm canal",
     "Corneal endothelium"
    ],
    "a": 1,
    "why": "The ciliary processes secrete aqueous; it drains through the trabecular meshwork at the angle. Imbalance raises intraocular pressure in glaucoma."
   }
  ],
  "related": [
   "brain",
   "ear",
   "skin",
   "thyroid"
  ],
  "photo": {
   "file": "eye.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "cornea": [
     269,
     467
    ],
    "iris": [
     300,
     478
    ],
    "pupil": [
     313,
     522
    ],
    "lens": [
     375,
     467
    ],
    "ciliary": [
     325,
     333
    ],
    "aqueous": [
     294,
     444
    ],
    "sclera": [
     438,
     756
    ],
    "retina": [
     563,
     556
    ],
    "choroid": [
     563,
     711
    ],
    "vitreous": [
     531,
     444
    ],
    "macula": [
     640,
     400
    ],
    "disc": [
     690,
     300
    ],
    "nerve": [
     719,
     278
    ]
   }
  }
 },
 "ear": {
  "title": "Ear",
  "latin": "Auris",
  "system": "sensory",
  "region": "Temporal bone: external, middle and inner ear",
  "size": "Cochlea ≈ 35 mm of spiral · hears 20 Hz–20 kHz",
  "blood": "Labyrinthine artery (from basilar or AICA)",
  "nerve": "Vestibulocochlear (VIII)",
  "blurb": "A pressure-wave collector that turns vibration into nerve impulses and doubles as a gyroscope.",
  "summary": "Sound waves are funnelled by the auricle down the external canal to the tympanic membrane. The membrane vibrates the ossicular chain — malleus, incus and stapes, the three smallest bones in the body — which amplifies pressure about 22-fold as it transfers vibration from a large eardrum to the tiny oval window. In the fluid-filled cochlea, the travelling wave bends hair cells on the basilar membrane: high frequencies at the base, low at the apex. Beside it, the vestibule and three semicircular canals sense gravity and angular acceleration for balance.",
  "vb": [
   660,
   430
  ],
  "legend": [
   [
    "#d9a98c",
    "External ear"
   ],
   [
    "#c98a5c",
    "Middle ear"
   ],
   [
    "#e8cf9c",
    "Ossicles"
   ],
   [
    "#6d8fb0",
    "Inner ear (bony labyrinth)"
   ]
  ],
  "parts": {
   "auricle": {
    "n": "Auricle (pinna)",
    "l": "Auricula",
    "t": "External",
    "at": [
     64,
     150
    ],
    "s": "l",
    "d": "A cartilaginous scoop: helix, antihelix, tragus, antitragus, concha and lobule.",
    "f": "Collects sound and helps localise it, especially vertically.",
    "c": "Its skin is a classic site for gouty tophi and for sun-related skin cancer."
   },
   "canal": {
    "n": "External acoustic meatus",
    "l": "Meatus acusticus externus",
    "t": "External",
    "at": [
     170,
     206
    ],
    "s": "l",
    "d": "A 2.5 cm S-shaped canal, cartilaginous outer third and bony inner two-thirds, lined by skin with ceruminous glands.",
    "f": "Conducts sound to the eardrum; cerumen traps dust and insects.",
    "c": "Impacted wax and otitis externa (swimmer's ear) both cause conductive hearing loss and pain on pulling the pinna."
   },
   "tympanic": {
    "n": "Tympanic membrane",
    "l": "Membrana tympani",
    "t": "Boundary",
    "at": [
     240,
     206
    ],
    "s": "l",
    "d": "A 9 × 10 mm cone of three layers, tilted so its umbo points medially; pars tensa below, pars flaccida above.",
    "f": "Converts sound pressure into mechanical vibration of the malleus.",
    "c": "A red bulging drum means otitis media; a pearly white mass behind it suggests cholesteatoma."
   },
   "malleus": {
    "n": "Malleus",
    "l": "Malleus",
    "t": "Ossicle",
    "at": [
     268,
     168
    ],
    "s": "l",
    "d": "The hammer: handle embedded in the eardrum, head articulating with the incus.",
    "f": "First lever of the ossicular chain.",
    "c": "Its handle is what you see as the cone-of-light landmark on otoscopy."
   },
   "incus": {
    "n": "Incus",
    "l": "Incus",
    "t": "Ossicle",
    "at": [
     296,
     152
    ],
    "s": "l",
    "d": "The anvil, bridging malleus and stapes.",
    "f": "Second lever; its long process is the most fragile part of the chain.",
    "c": "Incudostapedial joint disruption is a common cause of conductive loss after head injury."
   },
   "stapes": {
    "n": "Stapes",
    "l": "Stapes",
    "t": "Ossicle",
    "at": [
     322,
     196
    ],
    "s": "l",
    "d": "The stirrup: the smallest bone in the body (~3 mm), its footplate closing the oval window.",
    "f": "Delivers amplified vibration into the cochlear fluid.",
    "c": "Otosclerosis fixes the footplate and causes conductive deafness, classically in young women; stapedotomy restores hearing."
   },
   "middleear": {
    "n": "Middle ear cavity",
    "l": "Cavitas tympani",
    "t": "Middle",
    "at": [
     280,
     240
    ],
    "s": "l",
    "d": "An air-filled cleft in the temporal bone containing the ossicles, two muscles (tensor tympani, stapedius) and the chorda tympani.",
    "f": "Impedance matching between air and cochlear fluid.",
    "c": "The stapedius reflex dampens loud sound; its paralysis causes hyperacusis in facial nerve palsy."
   },
   "eustachian": {
    "n": "Eustachian tube",
    "l": "Tuba auditiva",
    "t": "Middle",
    "at": [
     300,
     320
    ],
    "s": "l",
    "d": "A 3.5 cm tube to the nasopharynx, normally closed and opened by swallowing.",
    "f": "Equalises middle-ear pressure and drains mucus.",
    "c": "In children it is short and horizontal, which is why middle-ear infections follow colds so often."
   },
   "cochlea": {
    "n": "Cochlea",
    "l": "Cochlea",
    "t": "Inner",
    "at": [
     392,
     262
    ],
    "s": "r",
    "d": "A 2.5-turn spiral containing the scala vestibuli, scala media and scala tympani, with the organ of Corti on the basilar membrane.",
    "f": "Frequency analysis: base responds to high pitch, apex to low; hair cells release glutamate onto the cochlear nerve.",
    "c": "Outer hair cells are killed by noise and aminoglycosides, causing sensorineural deafness. Cochlear implants bypass them."
   },
   "vestibule": {
    "n": "Vestibule (utricle & saccule)",
    "l": "Vestibulum",
    "t": "Inner",
    "at": [
     420,
     196
    ],
    "s": "r",
    "d": "Two otolith organs whose hair cells carry crystals of calcium carbonate.",
    "f": "Sense linear acceleration and head tilt — gravity sensing.",
    "c": "Dislodged otoliths drifting into a semicircular canal cause BPPV, the commonest cause of positional vertigo."
   },
   "canals": {
    "n": "Semicircular canals",
    "l": "Canales semicirculares",
    "t": "Inner",
    "at": [
     470,
     120
    ],
    "s": "r",
    "d": "Three fluid-filled loops at right angles (horizontal, anterior, posterior), each with an ampulla containing a cupula.",
    "f": "Detect angular acceleration of the head in three planes.",
    "c": "Their mismatched input with vision and proprioception is what produces motion sickness and vertigo."
   },
   "nerve": {
    "n": "Vestibulocochlear nerve",
    "l": "Nervus VIII",
    "t": "Nerve",
    "at": [
     560,
     220
    ],
    "s": "r",
    "d": "Cochlear and vestibular divisions joining at the internal acoustic meatus, entering the brainstem at the cerebellopontine angle.",
    "f": "Carries hearing and balance information to the cochlear and vestibular nuclei.",
    "c": "A vestibular schwannoma at the cerebellopontine angle causes unilateral sensorineural loss, tinnitus and unsteadiness."
   }
  },
  "art": "\n  <defs>\n    <linearGradient id=\"ea-skin\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\">\n      <stop offset=\"0\" stop-color=\"#e2b394\"/><stop offset=\"1\" stop-color=\"#b97f62\"/>\n    </linearGradient>\n    <radialGradient id=\"ea-bone\" cx=\"40%\" cy=\"30%\" r=\"80%\">\n      <stop offset=\"0\" stop-color=\"#7fa3c4\"/><stop offset=\"1\" stop-color=\"#3c5a78\"/>\n    </radialGradient>\n  </defs>\n  <path class=\"part\" data-id=\"auricle\" d=\"M96 92 C56 96 34 132 40 176 C46 220 68 258 96 268 C118 276 132 262 128 240 C124 220 108 214 96 216 C104 200 108 176 102 152 C98 132 104 116 118 110 C132 104 130 90 96 92 Z\" fill=\"url(#ea-skin)\" stroke=\"#8a5a44\" stroke-width=\"2.2\"/>\n  <path d=\"M84 130 C74 152 74 186 84 210 M104 132 C96 156 96 186 104 208\" fill=\"none\" stroke=\"#a06a50\" stroke-width=\"2.4\" opacity=\".7\"/>\n  <path class=\"part\" data-id=\"canal\" d=\"M120 200 C160 192 200 196 236 206 L236 226 C200 220 160 220 122 226 Z\" fill=\"#c98a6c\" stroke=\"#8a5a44\" stroke-width=\"1.8\"/>\n  <g fill=\"none\" stroke=\"#f7e9a0\" stroke-width=\"2\" opacity=\".85\">\n    <path d=\"M20 176 C34 170 46 170 58 176 M14 200 C30 194 44 194 56 200 M20 224 C34 230 46 230 58 224\"/>\n  </g>\n  <path class=\"part\" data-id=\"tympanic\" d=\"M236 176 C246 196 246 224 236 244 L244 246 C254 224 254 196 244 174 Z\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"middleear\" d=\"M244 168 C280 156 320 158 348 176 C360 196 360 226 348 246 C320 262 280 264 246 252 C254 226 254 194 244 168 Z\" fill=\"#8a5a44\" opacity=\".35\"/>\n  <g class=\"part\" data-id=\"malleus\" fill=\"#f0dcae\" stroke=\"#8a6a2e\" stroke-width=\"1.4\">\n    <path d=\"M242 182 C252 176 262 172 270 172 L274 186 C264 186 254 190 246 196 Z\"/>\n    <circle cx=\"274\" cy=\"176\" r=\"9\"/>\n  </g>\n  <g class=\"part\" data-id=\"incus\" fill=\"#f0dcae\" stroke=\"#8a6a2e\" stroke-width=\"1.4\">\n    <path d=\"M282 168 C292 158 302 154 310 156 L314 168 C304 168 296 172 288 180 Z\"/>\n    <path d=\"M308 160 C316 172 318 186 314 198 L304 194 C308 184 306 172 300 166 Z\"/>\n  </g>\n  <g class=\"part\" data-id=\"stapes\" fill=\"#f0dcae\" stroke=\"#8a6a2e\" stroke-width=\"1.4\">\n    <path d=\"M312 196 L330 190 L332 210 L314 206 Z\"/>\n    <path d=\"M332 188 L338 188 L338 214 L332 214 Z\"/>\n  </g>\n  <path class=\"part\" data-id=\"eustachian\" d=\"M282 246 C292 274 300 300 302 328 C303 344 300 356 292 364\" fill=\"none\" stroke=\"#c98a6c\" stroke-width=\"12\" stroke-linecap=\"round\"/>\n  <g class=\"part\" data-id=\"canals\" fill=\"none\" stroke=\"url(#ea-bone)\" stroke-width=\"13\" stroke-linecap=\"round\">\n    <path d=\"M430 160 C420 116 442 84 476 84 C510 84 528 116 514 152\"/>\n    <path d=\"M446 168 C470 130 508 128 528 156 C544 180 536 208 512 218\"/>\n    <path d=\"M424 176 C398 152 396 118 418 100\"/>\n  </g>\n  <g class=\"part\" data-id=\"vestibule\">\n    <ellipse cx=\"420\" cy=\"196\" rx=\"24\" ry=\"20\" fill=\"url(#ea-bone)\" stroke=\"#2b4066\" stroke-width=\"1.6\"/>\n    <circle cx=\"414\" cy=\"192\" r=\"6\" fill=\"#bcd8e6\"/><circle cx=\"428\" cy=\"202\" r=\"5\" fill=\"#bcd8e6\"/>\n  </g>\n  <g class=\"part\" data-id=\"cochlea\">\n    <path d=\"M392 236 C420 236 438 254 438 276 C438 298 420 312 400 312 C382 312 370 300 370 286 C370 274 380 266 390 266 C399 266 405 272 405 280 C405 287 400 291 394 291\" fill=\"none\" stroke=\"url(#ea-bone)\" stroke-width=\"17\" stroke-linecap=\"round\"/>\n    <circle cx=\"394\" cy=\"280\" r=\"4\" fill=\"#bcd8e6\"/>\n  </g>\n  <path class=\"part\" data-id=\"nerve\" d=\"M446 200 C490 208 530 214 570 218 C596 220 616 222 632 224 L632 244 C600 244 560 240 520 234 C486 228 458 222 442 218 Z\" fill=\"#cbb8dd\" stroke=\"#6d4a86\" stroke-width=\"1.6\"/>\n  <g fill=\"none\" stroke=\"#f7e9a0\" stroke-width=\"2\" opacity=\".9\">\n    <path d=\"M120 120 C160 150 200 180 236 200 M120 280 C160 258 200 234 236 220\"/>\n  </g>\n  <text x=\"44\" y=\"330\" class=\"cap\">sound pressure waves</text>\n  <text x=\"628\" y=\"330\" class=\"cap\" text-anchor=\"end\">to vestibular &amp; cochlear nuclei</text>",
  "anims": [
   {
    "id": "sound",
    "label": "Sound waves",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.4\" fill=\"#ffe27a\"><animateMotion dur=\"2.8s\" repeatCount=\"indefinite\" path=\"M20 200 C60 196 100 200 140 206 C180 210 210 210 236 210\"/></circle>\n        <circle r=\"4.4\" fill=\"#ffe27a\"><animateMotion dur=\"2.8s\" begin=\"-1.4s\" repeatCount=\"indefinite\" path=\"M20 200 C60 196 100 200 140 206 C180 210 210 210 236 210\"/></circle>\n        <circle r=\"4\" fill=\"#f0dcae\"><animateMotion dur=\"2.2s\" repeatCount=\"indefinite\" path=\"M242 190 C256 182 268 178 274 176 C286 168 300 162 310 162 C314 176 316 190 314 200 C322 198 330 196 336 200\"/></circle>\n        <circle r=\"4\" fill=\"#9fd8ec\"><animateMotion dur=\"3s\" repeatCount=\"indefinite\" path=\"M392 236 C420 236 438 254 438 276 C438 298 420 312 400 312 C382 312 370 300 370 286\"/></circle>\n        <circle r=\"4\" fill=\"#c4b5fd\"><animateMotion dur=\"2.6s\" repeatCount=\"indefinite\" path=\"M446 208 C490 216 540 222 632 232\"/></circle>\n      </g>"
   },
   {
    "id": "ring",
    "label": "Ossicle vibration",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The ossicular chain mainly serves to…",
    "opts": [
     "Protect the cochlea from loud noise",
     "Amplify pressure from the eardrum to the oval window",
     "Detect head rotation",
     "Produce earwax"
    ],
    "a": 1,
    "why": "Air-to-fluid transmission loses ~99% of energy; the lever ratio plus the area ratio of drum to footplate recovers it (~22× pressure gain)."
   },
   {
    "q": "High-frequency sounds maximally vibrate the basilar membrane at the…",
    "opts": [
     "Apex of the cochlea",
     "Base of the cochlea",
     "Middle turn",
     "Vestibule"
    ],
    "a": 1,
    "why": "The base is stiff and narrow (high frequencies); the apex is wide and floppy (low frequencies) — the cochlea's tonotopic map."
   },
   {
    "q": "BPPV vertigo is caused by…",
    "opts": [
     "Infection of the middle ear",
     "Otoliths dislodged into a semicircular canal",
     "A blocked Eustachian tube",
     "Damage to the tympanic membrane"
    ],
    "a": 1,
    "why": "Free-floating otoconia in the posterior canal make it respond to gravity, producing brief spinning on head movement — treated with the Epley manoeuvre."
   }
  ],
  "related": [
   "eye",
   "brain",
   "skin",
   "spinalcord"
  ],
  "photo": {
   "file": "ear.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "auricle": [
     188,
     444
    ],
    "canal": [
     313,
     533
    ],
    "tympanic": [
     500,
     533
    ],
    "malleus": [
     513,
     422
    ],
    "incus": [
     538,
     433
    ],
    "stapes": [
     563,
     467
    ],
    "middleear": [
     560,
     520
    ],
    "eustachian": [
     688,
     722
    ],
    "cochlea": [
     675,
     500
    ],
    "vestibule": [
     640,
     420
    ],
    "canals": [
     613,
     289
    ],
    "nerve": [
     750,
     389
    ]
   }
  }
 },
 "pancreas": {
  "title": "Pancreas",
  "latin": "Pancreas",
  "system": "digestive",
  "region": "Retroperitoneal, across L1–L2 behind the stomach",
  "size": "≈ 15 cm long, 80 g · exocrine 98%, endocrine 2%",
  "blood": "Splenic artery + pancreaticoduodenal arcades",
  "nerve": "Vagus + splanchnic via coeliac plexus",
  "blurb": "A dual gland: digestive enzymes from acini, hormones from the islets of Langerhans.",
  "summary": "The pancreas is both an exocrine and an endocrine organ. Acinar cells package trypsinogen, lipase and amylase into zymogen granules and secrete them into the pancreatic duct, which joins the common bile duct at the hepatopancreatic ampulla; bicarbonate-rich fluid from duct cells neutralises gastric acid. Scattered among the acini, the islets of Langerhans secrete insulin (beta cells), glucagon (alpha), somatostatin (delta) and pancreatic polypeptide directly into blood, minute-to-minute control of glucose.",
  "vb": [
   640,
   400
  ],
  "legend": [
   [
    "#d9b08c",
    "Exocrine pancreas"
   ],
   [
    "#8f6fb0",
    "Islets of Langerhans"
   ],
   [
    "#5c8f52",
    "Pancreatic duct"
   ],
   [
    "#bd9068",
    "Duodenum"
   ]
  ],
  "parts": {
   "head": {
    "n": "Head",
    "l": "Caput pancreatis",
    "t": "Region",
    "at": [
     180,
     220
    ],
    "s": "l",
    "d": "The broad end nestled in the C-loop of the duodenum, with the uncinate process hooking behind the superior mesenteric vessels.",
    "f": "Houses much of the exocrine tissue and the terminal duct.",
    "c": "A tumour here compresses the common bile duct, causing painless obstructive jaundice and a palpable gallbladder (Courvoisier's law)."
   },
   "neck": {
    "n": "Neck",
    "l": "Collum pancreatis",
    "t": "Region",
    "at": [
     268,
     190
    ],
    "s": "l",
    "d": "The short constriction in front of the portal vein's formation.",
    "f": "Landmark separating head from body; the portal vein forms behind it.",
    "c": "It is the transection line in a Whipple procedure and in distal pancreatectomy."
   },
   "body": {
    "n": "Body",
    "l": "Corpus pancreatis",
    "t": "Region",
    "at": [
     360,
     170
    ],
    "s": "r",
    "d": "The middle third crossing the aorta and vertebral body, behind the stomach in the lesser sac.",
    "f": "Carries the duct and splenic vessels along its borders.",
    "c": "It lies against the splenic vein — thrombosis of that vein from pancreatitis causes isolated gastric varices."
   },
   "tail": {
    "n": "Tail",
    "l": "Cauda pancreatis",
    "t": "Region",
    "at": [
     480,
     140
    ],
    "s": "r",
    "d": "The narrow left end reaching the splenic hilum between the layers of the splenorenal ligament.",
    "f": "Contains a high density of islets.",
    "c": "It is easily injured during splenectomy, causing a postoperative pancreatic fistula."
   },
   "duct": {
    "n": "Main pancreatic duct",
    "l": "Ductus pancreaticus",
    "t": "Duct",
    "at": [
     330,
     230
    ],
    "s": "l",
    "d": "Runs the length of the gland from tail to head, joining the common bile duct at the ampulla in the second part of duodenum.",
    "f": "Delivers ~1.5 L of enzyme- and bicarbonate-rich juice daily.",
    "c": "A \"double duct sign\" (dilated pancreatic and bile ducts) on imaging suggests a head tumour."
   },
   "accessory": {
    "n": "Accessory duct (of Santorini)",
    "l": "Ductus pancreaticus accessorius",
    "t": "Duct",
    "at": [
     216,
     150
    ],
    "s": "l",
    "d": "An inconstant second duct opening at the minor duodenal papilla above the main one.",
    "f": "Provides alternative drainage, mainly of the head.",
    "c": "Pancreas divisum — failure of the duct systems to fuse — drains most secretions through this narrow route and can cause recurrent pancreatitis."
   },
   "ampulla": {
    "n": "Hepatopancreatic ampulla",
    "l": "Ampulla hepatopancreatica",
    "t": "Junction",
    "at": [
     210,
     290
    ],
    "s": "l",
    "d": "The common channel of bile and pancreatic ducts, guarded by the sphincter of Oddi at the major duodenal papilla.",
    "f": "Gates the entry of bile and pancreatic juice into the duodenum.",
    "c": "A gallstone impacted here causes both biliary colic and acute pancreatitis."
   },
   "islet": {
    "n": "Islets of Langerhans",
    "l": "Insulae pancreaticae",
    "t": "Endocrine",
    "at": [
     420,
     300
    ],
    "s": "r",
    "d": "1–1.5 million microscopic clusters of alpha (glucagon), beta (insulin, amylin), delta (somatostatin) and PP cells, richly capillarised.",
    "f": "Minute-to-minute control of blood glucose, plus intermediary metabolism.",
    "c": "Autoimmune destruction of beta cells causes type 1 diabetes; resistance to insulin with beta-cell exhaustion causes type 2."
   },
   "acini": {
    "n": "Acinar cells & ductules",
    "l": "Acini pancreatici",
    "t": "Exocrine",
    "at": [
     300,
     320
    ],
    "s": "l",
    "d": "Grape-like clusters of enzyme-packed cells draining into centroacinar cells and ductules.",
    "f": "Secrete the pro-enzymes for digesting protein, fat and carbohydrate.",
    "c": "Premature activation of trypsin inside acinar cells is the initiating event of acute pancreatitis."
   }
  },
  "art": "\n  <defs>\n    <linearGradient id=\"p-t\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#e2bb95\"/><stop offset=\"1\" stop-color=\"#b98862\"/>\n    </linearGradient>\n    <linearGradient id=\"p-duo\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#c9a075\"/><stop offset=\"1\" stop-color=\"#96703f\"/>\n    </linearGradient>\n  </defs>\n  <path class=\"part\" data-id=\"head\" d=\"M140 160 C170 140 214 142 236 168 C256 192 258 236 240 262 C220 290 176 296 148 276 C120 256 116 184 140 160 Z\" fill=\"url(#p-t)\" stroke=\"#7d5433\" stroke-width=\"2.2\"/>\n  <path d=\"M196 268 C214 282 236 284 252 274\" fill=\"none\" stroke=\"#b98862\" stroke-width=\"16\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"neck\" d=\"M238 168 C258 158 276 158 288 168 L288 216 C274 226 256 226 240 216 Z\" fill=\"url(#p-t)\" stroke=\"#7d5433\" stroke-width=\"2\"/>\n  <path class=\"part\" data-id=\"body\" d=\"M288 168 C340 150 400 142 448 148 L448 196 C400 190 340 198 288 216 Z\" fill=\"url(#p-t)\" stroke=\"#7d5433\" stroke-width=\"2\"/>\n  <path class=\"part\" data-id=\"tail\" d=\"M448 148 C480 142 508 132 528 118 C544 108 556 112 554 126 C550 146 528 168 500 182 C480 192 462 196 448 196 Z\" fill=\"url(#p-t)\" stroke=\"#7d5433\" stroke-width=\"2\"/>\n  <g fill=\"none\" stroke=\"#e8cf9c\" stroke-width=\"1.4\" opacity=\".5\">\n    <path d=\"M160 180 C190 172 220 176 240 190 M300 180 C340 170 380 166 420 168 M460 160 C480 152 500 144 516 136\"/>\n  </g>\n  <path d=\"M120 150 C96 176 92 226 108 262 C120 288 146 300 172 296\" fill=\"none\" stroke=\"url(#p-duo)\" stroke-width=\"26\" stroke-linecap=\"round\"/>\n  <path d=\"M172 296 C200 292 216 276 220 252\" fill=\"none\" stroke=\"url(#p-duo)\" stroke-width=\"24\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"duct\" d=\"M520 140 C470 156 420 168 370 180 C330 190 292 200 262 212 C240 222 224 240 216 262\" fill=\"none\" stroke=\"#5c8f52\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"accessory\" d=\"M240 196 C232 180 226 166 222 150\" fill=\"none\" stroke=\"#5c8f52\" stroke-width=\"4.6\" stroke-linecap=\"round\"/>\n  <g class=\"part\" data-id=\"ampulla\"><circle cx=\"214\" cy=\"272\" r=\"9\" fill=\"#8fc06a\" stroke=\"#3c5c34\" stroke-width=\"1.6\"/></g>\n  <g class=\"part\" data-id=\"islet\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.3\">\n    <circle cx=\"176\" cy=\"200\" r=\"10\"/><circle cx=\"212\" cy=\"232\" r=\"8\"/><circle cx=\"330\" cy=\"180\" r=\"9\"/><circle cx=\"402\" cy=\"170\" r=\"8\"/><circle cx=\"470\" cy=\"162\" r=\"8\"/><circle cx=\"150\" cy=\"240\" r=\"7\"/>\n  </g>\n  <g class=\"part\" data-id=\"acini\" fill=\"#d9b08c\" stroke=\"#8a5a3a\" stroke-width=\"1.2\">\n    <circle cx=\"300\" cy=\"330\" r=\"13\"/><circle cx=\"326\" cy=\"342\" r=\"12\"/><circle cx=\"352\" cy=\"330\" r=\"13\"/><circle cx=\"326\" cy=\"316\" r=\"11\"/>\n    <circle cx=\"326\" cy=\"330\" r=\"5\" fill=\"#f5e3d0\"/>\n  </g>\n  <rect class=\"inset-box\" x=\"272\" y=\"286\" width=\"352\" height=\"102\" rx=\"14\"/>\n  <text x=\"288\" y=\"306\" class=\"inset-title\">Acinus + islet · exocrine vs endocrine output</text>\n  <g fill=\"none\" stroke=\"#5c8f52\" stroke-width=\"2.4\"><path d=\"M352 330 C390 336 420 340 448 340\"/></g>\n  <text x=\"548\" y=\"336\" class=\"cap\" text-anchor=\"end\">enzymes → duct → duodenum</text>\n  <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"2.4\"><path d=\"M326 356 C360 366 400 370 448 368\"/></g>\n  <text x=\"548\" y=\"366\" class=\"cap\" text-anchor=\"end\">insulin &amp; glucagon → blood</text>",
  "anims": [
   {
    "id": "secrete",
    "label": "Enzyme & hormone release",
    "cls": "throb",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.2\" fill=\"#8fc06a\"><animateMotion dur=\"4.4s\" repeatCount=\"indefinite\" path=\"M520 140 C470 156 420 168 370 180 C330 190 292 200 262 212 C240 222 224 240 216 262\"/></circle>\n        <circle r=\"4.2\" fill=\"#8fc06a\"><animateMotion dur=\"4.4s\" begin=\"-2.2s\" repeatCount=\"indefinite\" path=\"M520 140 C470 156 420 168 370 180 C330 190 292 200 262 212 C240 222 224 240 216 262\"/></circle>\n        <circle r=\"4\" fill=\"#c4a2e0\"><animateMotion dur=\"3s\" repeatCount=\"indefinite\" path=\"M176 200 C176 230 190 260 210 284\"/></circle>\n        <circle r=\"4\" fill=\"#c4a2e0\"><animateMotion dur=\"3s\" begin=\"-1.5s\" repeatCount=\"indefinite\" path=\"M330 180 C330 210 320 250 300 284\"/></circle>\n      </g>"
   }
  ],
  "quiz": [
   {
    "q": "Insulin is secreted by which islet cell?",
    "opts": [
     "Alpha cell",
     "Beta cell",
     "Delta cell",
     "PP cell"
    ],
    "a": 1,
    "why": "Beta cells secrete insulin (and amylin); alpha cells secrete glucagon, delta cells somatostatin."
   },
   {
    "q": "Painless jaundice with a palpable gallbladder suggests…",
    "opts": [
     "Gallstones in the cystic duct",
     "A tumour in the head of pancreas",
     "Acute hepatitis",
     "Haemolysis"
    ],
    "a": 1,
    "why": "Courvoisier's law: a malignant obstruction of the common bile duct distends a non-fibrosed gallbladder, unlike stone disease."
   },
   {
    "q": "The enzyme whose premature intracellular activation starts acute pancreatitis is…",
    "opts": [
     "Lipase",
     "Amylase",
     "Trypsin",
     "Ribonuclease"
    ],
    "a": 2,
    "why": "Trypsinogen activating to trypsin inside acinar cells triggers the cascade of autodigestion; serum lipase is then used as the diagnostic marker."
   }
  ],
  "related": [
   "liver",
   "gut",
   "spleen",
   "thyroid"
  ],
  "photo": {
   "file": "pancreas.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "head": [
     625,
     500
    ],
    "neck": [
     550,
     467
    ],
    "body": [
     438,
     422
    ],
    "tail": [
     219,
     389
    ],
    "duct": [
     469,
     478
    ],
    "ampulla": [
     738,
     544
    ]
   }
  }
 },
 "spleen": {
  "title": "Spleen",
  "latin": "Lien (splen)",
  "system": "lymphatic",
  "region": "Left hypochondrium, ribs 9–11, posterior to the stomach",
  "size": "≈ 12 cm, 150–200 g · filters ~350 mL blood/min",
  "blood": "Splenic artery (largest branch of the coeliac trunk)",
  "nerve": "Coeliac plexus (sympathetic) — mostly vasomotor",
  "blurb": "The largest lymphoid organ: a blood filter, immune sentinel and red-cell graveyard.",
  "summary": "Blood enters the spleen through the splenic artery and percolates through two compartments. White pulp — cuffs of lymphocytes around central arterioles — mounts immune responses to blood-borne antigens, making IgM and opsonins. Red pulp is a mesh of sinusoids and cords where old, stiff or antibody-coated red cells are trapped and destroyed by macrophages, and where platelets are stored (a third of the body's pool). In fetal life the spleen makes red cells; after splenectomy the liver and marrow take over, but the loss of opsonisation leaves lifelong risk of encapsulated bacterial sepsis.",
  "vb": [
   560,
   430
  ],
  "legend": [
   [
    "#8c3b47",
    "Red pulp"
   ],
   [
    "#cfd8e6",
    "White pulp"
   ],
   [
    "#5f3a63",
    "Capsule & trabeculae"
   ]
  ],
  "parts": {
   "capsule": {
    "n": "Capsule & trabeculae",
    "l": "Capsula lienis",
    "t": "Covering",
    "at": [
     300,
     60
    ],
    "s": "r",
    "d": "A fibroelastic capsule sending trabeculae into the pulp, carrying the vessels.",
    "f": "Structural framework and conduit for vessels.",
    "c": "The capsule is thin and the pulp fragile — the spleen tears easily in blunt abdominal trauma and bleeds briskly."
   },
   "redpulp": {
    "n": "Red pulp",
    "l": "Pulpa rubra",
    "t": "Parenchyma",
    "at": [
     300,
     220
    ],
    "s": "l",
    "d": "Splenic cords of Billroth and wide sinusoids lined by stave cells with slit-like gaps.",
    "f": "Filters senescent and abnormal red cells; recycles iron; stores platelets and monocytes.",
    "c": "In hereditary spherocytosis the rigid spheres are trapped here, causing haemolytic anaemia cured by splenectomy."
   },
   "whitepulp": {
    "n": "White pulp",
    "l": "Pulpa alba",
    "t": "Lymphoid",
    "at": [
     216,
     160
    ],
    "s": "l",
    "d": "Periarteriolar lymphoid sheaths (T cells), follicles (B cells) and a marginal zone rich in macrophages.",
    "f": "Immune surveillance of blood: antibody and opsonin production, especially against capsules.",
    "c": "Its loss explains why asplenic patients are vulnerable to pneumococcus, meningococcus and H. influenzae."
   },
   "sinusoid": {
    "n": "Splenic sinusoids",
    "l": "Sinus splenicus",
    "t": "Vascular",
    "at": [
     380,
     290
    ],
    "s": "r",
    "d": "Discontinuous, leaky channels whose endothelial slits force red cells to squeeze through.",
    "f": "The mechanical filter: healthy deformable cells pass; rigid ones are eaten.",
    "c": "Malaria parasites stiffen red cells, which is why the spleen enlarges in chronic infection."
   },
   "hilum": {
    "n": "Hilum",
    "l": "Hilum lienis",
    "t": "Landmark",
    "at": [
     140,
     270
    ],
    "s": "l",
    "d": "The notched medial border where splenic vessels enter and the tail of pancreas and stomach fundus relate.",
    "f": "Vascular gateway; also the site of accessory spleens in ~15% of people.",
    "c": "A missed accessory spleen can cause relapse of disease after splenectomy for ITP."
   },
   "artery": {
    "n": "Splenic artery",
    "l": "Arteria lienalis",
    "t": "Vessel",
    "at": [
     70,
     240
    ],
    "s": "l",
    "d": "A tortuous branch of the coeliac trunk running along the upper border of the pancreas.",
    "f": "Supplies the spleen, pancreas (via branches) and part of the stomach.",
    "c": "Its tortuosity makes it prone to aneurysm in pregnancy and portal hypertension."
   },
   "vein": {
    "n": "Splenic vein",
    "l": "Vena lienalis",
    "t": "Vessel",
    "at": [
     70,
     300
    ],
    "s": "l",
    "d": "Drains the spleen and joins the superior mesenteric vein behind the pancreatic neck to form the portal vein.",
    "f": "Returns filtered blood to the portal system.",
    "c": "Its thrombosis causes left-sided (sinistral) portal hypertension with isolated gastric varices."
   },
   "follicle": {
    "n": "Germinal centre",
    "l": "Centrum germinale",
    "t": "Lymphoid",
    "at": [
     430,
     150
    ],
    "s": "r",
    "d": "The pale core of an activated follicle where B cells proliferate and affinity-mature their antibodies.",
    "f": "Produces high-affinity, memory B cells against blood-borne antigens.",
    "c": "Vaccines against encapsulated organisms work partly by priming these centres before splenic loss."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"s-t\" cx=\"38%\" cy=\"28%\" r=\"86%\">\n      <stop offset=\"0\" stop-color=\"#a8505c\"/><stop offset=\".6\" stop-color=\"#8c3b47\"/><stop offset=\"1\" stop-color=\"#5c232d\"/>\n    </radialGradient>\n  </defs>\n  <path class=\"part\" data-id=\"capsule\" d=\"M286 44 C380 36 452 88 462 176 C472 268 420 352 320 368 C226 382 152 336 140 252 C130 172 190 52 286 44 Z\" fill=\"none\" stroke=\"#c9a3ad\" stroke-width=\"2.6\" stroke-dasharray=\"9 6\" opacity=\".7\"/>\n  <path d=\"M286 52 C376 44 444 94 454 178 C464 266 414 346 318 362 C228 376 158 332 147 250 C137 174 194 60 286 52 Z\" fill=\"url(#s-t)\" stroke=\"#4c1a22\" stroke-width=\"2.4\"/>\n  <g fill=\"none\" stroke=\"#5f3a63\" stroke-width=\"7\" stroke-linecap=\"round\" opacity=\".85\">\n    <path d=\"M150 268 C190 262 226 250 254 232 M254 232 C268 200 270 168 262 140 M254 232 C286 246 322 252 356 248 M356 248 C376 222 384 192 380 164 M356 248 C368 280 366 310 350 334\"/>\n  </g>\n  <g class=\"part\" data-id=\"whitepulp\" fill=\"#cfd8e6\" stroke=\"#5b6b85\" stroke-width=\"1.5\">\n    <ellipse cx=\"216\" cy=\"160\" rx=\"26\" ry=\"20\"/><ellipse cx=\"330\" cy=\"130\" rx=\"22\" ry=\"17\"/><ellipse cx=\"392\" cy=\"210\" rx=\"24\" ry=\"18\"/><ellipse cx=\"250\" cy=\"290\" rx=\"22\" ry=\"17\"/><ellipse cx=\"330\" cy=\"300\" rx=\"20\" ry=\"15\"/>\n  </g>\n  <g class=\"part\" data-id=\"follicle\" fill=\"#e8eef6\" stroke=\"#5b6b85\" stroke-width=\"1.2\">\n    <circle cx=\"216\" cy=\"160\" r=\"10\"/><circle cx=\"330\" cy=\"130\" r=\"8\"/><circle cx=\"392\" cy=\"210\" r=\"9\"/><circle cx=\"250\" cy=\"290\" r=\"8\"/>\n  </g>\n  <g class=\"part\" data-id=\"redpulp\" fill=\"none\" stroke=\"#d98a94\" stroke-width=\"1.6\" opacity=\".55\">\n    <path d=\"M180 120 C220 110 260 108 300 112 M170 200 C220 194 280 192 330 196 M180 250 C230 246 290 246 340 250 M210 320 C250 318 300 318 340 320 M380 130 C400 150 412 176 416 204\"/>\n  </g>\n  <g class=\"part\" data-id=\"sinusoid\" fill=\"none\" stroke=\"#e6b3ba\" stroke-width=\"2.4\" opacity=\".8\">\n    <path d=\"M360 270 C372 282 380 296 384 312 M396 262 C408 274 416 288 420 304 M430 254 C440 266 446 280 448 294\"/>\n  </g>\n  <ellipse class=\"part\" data-id=\"hilum\" cx=\"146\" cy=\"262\" rx=\"10\" ry=\"34\" fill=\"#e6cdd4\" stroke=\"#5f3a63\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"artery\" d=\"M40 236 C80 238 116 246 146 254\" fill=\"none\" stroke=\"#c0453f\" stroke-width=\"12\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"vein\" d=\"M40 306 C80 302 116 292 146 280\" fill=\"none\" stroke=\"#3f5f9c\" stroke-width=\"13\" stroke-linecap=\"round\"/>\n  <g fill=\"#e0645c\"><circle cx=\"196\" cy=\"220\" r=\"4\"/><circle cx=\"300\" cy=\"180\" r=\"4\"/><circle cx=\"356\" cy=\"290\" r=\"4\"/><circle cx=\"276\" cy=\"330\" r=\"4\"/><circle cx=\"420\" cy=\"160\" r=\"4\"/></g>\n  <text x=\"548\" y=\"404\" class=\"cap\" text-anchor=\"end\">red cells must deform to pass the sinus wall — rigid cells are phagocytosed</text>",
  "anims": [
   {
    "id": "flow",
    "label": "Blood filtering",
    "cls": "throb",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#ef6a5f\"><animateMotion dur=\"5s\" repeatCount=\"indefinite\" path=\"M40 236 C80 238 116 246 146 254 C190 262 226 250 254 232 C268 200 270 168 262 140\"/></circle>\n        <circle r=\"5\" fill=\"#ef6a5f\"><animateMotion dur=\"5s\" begin=\"-2.5s\" repeatCount=\"indefinite\" path=\"M40 236 C80 238 116 246 146 254 C186 246 222 250 254 232 C286 246 322 252 356 248 C376 222 384 192 380 164\"/></circle>\n        <circle r=\"4.6\" fill=\"#6f9fd8\"><animateMotion dur=\"5s\" begin=\"-1.2s\" repeatCount=\"indefinite\" path=\"M350 334 C366 310 368 280 356 248 C322 252 286 246 254 232 C226 250 190 262 146 280 C116 292 80 302 40 306\"/></circle>\n      </g>"
   }
  ],
  "quiz": [
   {
    "q": "After splenectomy, patients are especially vulnerable to…",
    "opts": [
     "Viral hepatitis",
     "Encapsulated bacteria such as pneumococcus",
     "Fungal skin infection",
     "Autoimmune thyroiditis"
    ],
    "a": 1,
    "why": "The splenic white pulp makes opsonins and clears encapsulated organisms; without it, overwhelming post-splenectomy sepsis is a lifelong risk, hence vaccines and sometimes prophylactic antibiotics."
   },
   {
    "q": "Which pulp compartment removes senescent red cells?",
    "opts": [
     "White pulp",
     "Red pulp",
     "Germinal centres",
     "Trabeculae"
    ],
    "a": 1,
    "why": "Red pulp cords and sinusoids mechanically trap rigid old red cells, which macrophages then destroy while recycling iron."
   },
   {
    "q": "The splenic vein joins which vessel to form the portal vein?",
    "opts": [
     "Inferior mesenteric vein",
     "Superior mesenteric vein",
     "Left gastric vein",
     "Inferior vena cava"
    ],
    "a": 1,
    "why": "Behind the neck of pancreas, splenic + superior mesenteric veins unite as the hepatic portal vein."
   }
  ],
  "related": [
   "liver",
   "gut",
   "pancreas",
   "kidney"
  ],
  "photo": {
   "file": "spleen.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "capsule": [
     313,
     333
    ],
    "redpulp": [
     625,
     556
    ],
    "whitepulp": [
     656,
     444
    ],
    "hilum": [
     488,
     500
    ],
    "artery": [
     563,
     444
    ],
    "vein": [
     531,
     578
    ],
    "follicle": [
     688,
     689
    ]
   }
  }
 },
 "thyroid": {
  "title": "Thyroid gland",
  "latin": "Glandula thyroidea",
  "system": "endocrine",
  "region": "Anterior neck, C5–T1, in front of trachea and larynx",
  "size": "≈ 15–25 g · the most vascular endocrine gland",
  "blood": "Superior & inferior thyroid arteries (± thyroidea ima)",
  "nerve": "Sympathetic + parasympathetic (vasomotor only; secretion is TSH-driven)",
  "blurb": "A butterfly gland of follicles that sets the body's metabolic rate.",
  "summary": "The thyroid is built from follicles — spheres of cuboidal cells filled with colloid, a store of thyroglobulin. Iodide is trapped, oxidised and attached to tyrosine residues to make T3 and T4, released under control of pituitary TSH. These hormones raise basal metabolic rate, oxygen consumption and heat production, and are essential for growth and brain development. Parafollicular C cells secrete calcitonin. Embedded behind the gland, the four parathyroid glands sense calcium and release parathyroid hormone — the minute-to-minute controller of plasma calcium.",
  "vb": [
   560,
   440
  ],
  "legend": [
   [
    "#b0647a",
    "Thyroid follicles"
   ],
   [
    "#e8cf9c",
    "Colloid"
   ],
   [
    "#8f6fb0",
    "Parathyroid glands"
   ],
   [
    "#c9b6a0",
    "Trachea & larynx"
   ]
  ],
  "parts": {
   "rlobe": {
    "n": "Right lobe",
    "l": "Lobus dexter",
    "t": "Lobe",
    "at": [
     180,
     220
    ],
    "s": "l",
    "d": "One of two lateral lobes, 5–8 cm long, lying against the trachea and oesophagus and covered by the pretracheal fascia.",
    "f": "Secretes T3/T4 from its follicles.",
    "c": "An enlarging lobe can compress the trachea (stridor) or the recurrent laryngeal nerve (hoarseness)."
   },
   "llobe": {
    "n": "Left lobe",
    "l": "Lobus sinister",
    "t": "Lobe",
    "at": [
     384,
     220
    ],
    "s": "r",
    "d": "The mirror-image lobe; asymmetry between lobes is common and usually benign.",
    "f": "Secretes T3/T4.",
    "c": "A dominant nodule in one lobe is investigated with ultrasound and, if suspicious, fine-needle cytology."
   },
   "isthmus": {
    "n": "Isthmus",
    "l": "Isthmus",
    "t": "Lobe",
    "at": [
     282,
     262
    ],
    "s": "l",
    "d": "The bridge crossing the 2nd–4th tracheal rings, joining the two lobes.",
    "f": "Connects the lobes into a single gland.",
    "c": "It is the landmark for emergency tracheostomy and cricothyroidotomy is performed above it."
   },
   "pyramidal": {
    "n": "Pyramidal lobe",
    "l": "Lobus pyramidalis",
    "t": "Variant",
    "at": [
     300,
     140
    ],
    "s": "r",
    "d": "A tongue of thyroid tissue ascending toward the hyoid in ~50% of people, a remnant of the thyroglossal duct.",
    "f": "Functionally ordinary thyroid tissue.",
    "c": "If left behind at thyroidectomy it can hypertrophy and mimic a recurrent goitre or a midline neck mass."
   },
   "trachea": {
    "n": "Trachea & larynx",
    "l": "Trachea et larynx",
    "t": "Relation",
    "at": [
     282,
     330
    ],
    "s": "l",
    "d": "The gland wraps the airway; the cricoid cartilage and thyroid cartilage lie above.",
    "f": "Anatomical landmark and the reason goitres cause compressive symptoms.",
    "c": "Retrosternal extension of a goitre can be read on CT and may require sternotomy to remove."
   },
   "artery": {
    "n": "Thyroid arteries",
    "l": "Arteriae thyroideae",
    "t": "Vessel",
    "at": [
     120,
     150
    ],
    "s": "l",
    "d": "Superior thyroid (from external carotid) and inferior thyroid (from thyrocervical trunk), with rich anastomoses.",
    "f": "Give the gland its extremely high blood flow per gram.",
    "c": "The superior laryngeal nerve runs with the superior artery and the recurrent laryngeal with the inferior — both at risk in surgery."
   },
   "follicle": {
    "n": "Follicle & colloid",
    "l": "Folliculi thyroidei",
    "t": "Functional unit",
    "at": [
     300,
     392
    ],
    "s": "l",
    "d": "Spheres of follicular cells enclosing colloid (iodinated thyroglobulin). TSH stimulates iodide trapping, organification, coupling, and endocytosis of colloid to release T3/T4.",
    "f": "Synthesis and storage of thyroid hormone — the only endocrine gland that stores its product extracellularly.",
    "c": "In Graves disease, autoantibodies to the TSH receptor drive unregulated hormone release and goitre."
   },
   "parathyroid": {
    "n": "Parathyroid glands",
    "l": "Glandulae parathyroideae",
    "t": "Endocrine",
    "at": [
     420,
     300
    ],
    "s": "r",
    "d": "Four small glands (occasionally 3–6) on the posterior surface, derived from the third and fourth pharyngeal pouches.",
    "f": "PTH raises plasma calcium: bone resorption, renal retention and activation of vitamin D.",
    "c": "Accidental removal or devascularisation at thyroidectomy causes hypocalcaemic tetany and a positive Chvostek sign."
   }
  },
  "art": "\n  <defs>\n    <linearGradient id=\"t-t\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#c47a8c\"/><stop offset=\"1\" stop-color=\"#8e4256\"/>\n    </linearGradient>\n  </defs>\n  <g class=\"part\" data-id=\"trachea\">\n    <path d=\"M262 96 L302 96 L306 356 L258 356 Z\" fill=\"#cbb394\" stroke=\"#8a7154\" stroke-width=\"1.8\"/>\n    <g stroke=\"#a98a63\" stroke-width=\"5\" stroke-linecap=\"round\" opacity=\".8\">\n      <path d=\"M262 130 h40 M261 162 h42 M260 194 h44 M260 226 h44 M259 258 h46 M259 290 h46 M258 322 h48\"/>\n    </g>\n    <path d=\"M252 74 C262 62 302 62 312 74 L306 100 L258 100 Z\" fill=\"#d9c3a4\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n    <path d=\"M244 46 C262 34 302 34 320 46 L312 76 L252 76 Z\" fill=\"#e2cfae\" stroke=\"#8a7154\" stroke-width=\"1.6\"/>\n  </g>\n  <path class=\"part\" data-id=\"pyramidal\" d=\"M276 168 C272 140 276 112 286 92 C296 112 300 140 296 168 Z\" fill=\"url(#t-t)\" stroke=\"#5c2330\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"rlobe\" d=\"M196 132 C158 138 136 176 138 226 C140 280 162 318 198 324 C228 328 246 300 248 252 C250 196 232 128 196 132 Z\" fill=\"url(#t-t)\" stroke=\"#5c2330\" stroke-width=\"2.2\"/>\n  <path class=\"part\" data-id=\"llobe\" d=\"M368 132 C406 138 428 176 426 226 C424 280 402 318 366 324 C336 328 318 300 316 252 C314 196 332 128 368 132 Z\" fill=\"url(#t-t)\" stroke=\"#5c2330\" stroke-width=\"2.2\"/>\n  <path class=\"part\" data-id=\"isthmus\" d=\"M246 244 C262 238 302 238 318 244 L318 282 C302 288 262 288 246 282 Z\" fill=\"url(#t-t)\" stroke=\"#5c2330\" stroke-width=\"2\"/>\n  <g fill=\"none\" stroke=\"#e0645c\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\".9\">\n    <path d=\"M120 148 C142 152 160 162 172 178 M120 148 C112 190 118 240 136 276 M444 148 C422 152 404 162 392 178 M444 148 C452 190 446 240 428 276\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#e0645c\" stroke-width=\"2\" opacity=\".6\">\n    <path d=\"M172 178 C166 206 168 240 178 268 M392 178 C398 206 396 240 386 268\"/>\n  </g>\n  <g class=\"part\" data-id=\"follicle\">\n    <circle cx=\"180\" cy=\"392\" r=\"26\" fill=\"#e8cf9c\" stroke=\"#8a4256\" stroke-width=\"4\"/>\n    <circle cx=\"238\" cy=\"404\" r=\"20\" fill=\"#e8cf9c\" stroke=\"#8a4256\" stroke-width=\"3.4\"/>\n    <circle cx=\"180\" cy=\"392\" r=\"9\" fill=\"#f6e7c4\"/>\n    <circle cx=\"238\" cy=\"404\" r=\"7\" fill=\"#f6e7c4\"/>\n    <g fill=\"#8a4256\"><circle cx=\"164\" cy=\"372\" r=\"3\"/><circle cx=\"198\" cy=\"374\" r=\"3\"/><circle cx=\"200\" cy=\"410\" r=\"3\"/><circle cx=\"162\" cy=\"410\" r=\"3\"/><circle cx=\"226\" cy=\"390\" r=\"2.6\"/><circle cx=\"250\" cy=\"392\" r=\"2.6\"/><circle cx=\"248\" cy=\"418\" r=\"2.6\"/><circle cx=\"226\" cy=\"418\" r=\"2.6\"/></g>\n    <circle cx=\"300\" cy=\"398\" r=\"8\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.4\"/>\n    <text x=\"316\" y=\"394\" class=\"cap\">C cell (calcitonin)</text>\n    <text x=\"120\" y=\"434\" class=\"cap\">follicular cells · colloid store of thyroglobulin</text>\n  </g>\n  <g class=\"part\" data-id=\"parathyroid\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.6\">\n    <ellipse cx=\"420\" cy=\"252\" rx=\"12\" ry=\"16\"/><ellipse cx=\"424\" cy=\"300\" rx=\"11\" ry=\"15\"/>\n    <ellipse cx=\"146\" cy=\"252\" rx=\"12\" ry=\"16\" opacity=\".55\"/><ellipse cx=\"142\" cy=\"300\" rx=\"11\" ry=\"15\" opacity=\".55\"/>\n  </g>\n  <text x=\"436\" y=\"252\" class=\"cap\">superior</text>\n  <text x=\"438\" y=\"300\" class=\"cap\">inferior</text>",
  "anims": [
   {
    "id": "hormone",
    "label": "Hormone release",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.4\" fill=\"#f2d179\"><animateMotion dur=\"3.4s\" repeatCount=\"indefinite\" path=\"M180 392 C180 340 190 280 196 220 C200 180 200 160 196 140\"/></circle>\n        <circle r=\"4.4\" fill=\"#f2d179\"><animateMotion dur=\"3.4s\" begin=\"-1.7s\" repeatCount=\"indefinite\" path=\"M384 392 C384 340 374 280 368 220 C364 180 364 160 368 140\"/></circle>\n        <circle r=\"4\" fill=\"#c4a2e0\"><animateMotion dur=\"3s\" begin=\"-.8s\" repeatCount=\"indefinite\" path=\"M420 252 C440 260 452 280 456 306\"/></circle>\n      </g>",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which cells secrete parathyroid hormone?",
    "opts": [
     "Thyroid follicular cells",
     "Parafollicular C cells",
     "Parathyroid chief cells",
     "Oxyphil cells of the thyroid"
    ],
    "a": 2,
    "why": "Parathyroid chief cells sense plasma calcium via the CaSR and release PTH when calcium falls; C cells secrete calcitonin."
   },
   {
    "q": "Hoarseness after thyroidectomy usually means injury to the…",
    "opts": [
     "Superior laryngeal nerve",
     "Recurrent laryngeal nerve",
     "Vagus trunk",
     "Hypoglossal nerve"
    ],
    "a": 1,
    "why": "The recurrent laryngeal nerve supplies all intrinsic laryngeal muscles except cricothyroid; damage paralyses a vocal cord and causes hoarseness."
   },
   {
    "q": "The thyroid stores its hormone…",
    "opts": [
     "Inside follicular cell vesicles",
     "Bound to plasma proteins only",
     "Extracellularly in colloid as thyroglobulin",
     "In the parathyroid glands"
    ],
    "a": 2,
    "why": "Unique among endocrine glands, the thyroid keeps weeks of hormone extracellularly as iodinated thyroglobulin within follicular colloid."
   }
  ],
  "related": [
   "pancreas",
   "kidney",
   "brain",
   "heart"
  ],
  "photo": {
   "file": "thyroid.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "rlobe": [
     413,
     533
    ],
    "llobe": [
     600,
     533
    ],
    "isthmus": [
     506,
     578
    ],
    "trachea": [
     506,
     722
    ],
    "artery": [
     431,
     333
    ],
    "parathyroid": [
     444,
     489
    ]
   }
  }
 },
 "bladder": {
  "title": "Urinary bladder",
  "latin": "Vesica urinaria",
  "system": "urinary",
  "region": "Pelvis, behind the pubic symphysis",
  "size": "Capacity 400–600 mL · first urge at ~150–250 mL",
  "blood": "Superior & inferior vesical arteries (internal iliac)",
  "nerve": "Parasympathetic S2–S4 (contracts) · sympathetic T11–L2 (stores)",
  "blurb": "A detrusor-muscle reservoir with a smooth trigone and a two-stage sphincter.",
  "summary": "The bladder is a muscular sac lined by transitional (urothelial) epithelium that stretches from five cell layers down to two as it fills. The detrusor muscle contracts under parasympathetic control (S2–S4) while the internal sphincter (smooth muscle) and external sphincter (skeletal, pudendal nerve) keep urine in. The trigone — the triangle between the two ureteric orifices and the internal urethral orifice — is smooth because it develops from the mesonephric duct, and its oblique ureteric tunnels act as flap valves preventing reflux. Micturition is a spinal reflex under voluntary control from the pons and cortex.",
  "vb": [
   560,
   470
  ],
  "legend": [
   [
    "#c98a5c",
    "Detrusor wall"
   ],
   [
    "#e8cf9c",
    "Trigone & urethra"
   ],
   [
    "#3f5f9c",
    "Ureters"
   ]
  ],
  "parts": {
   "dome": {
    "n": "Dome (apex)",
    "l": "Apex vesicae",
    "t": "Region",
    "at": [
     280,
     90
    ],
    "s": "r",
    "d": "The superior part, pointing toward the pubic symphysis and connected to the urachus (median umbilical ligament).",
    "f": "Expands upward into the abdomen as the bladder fills.",
    "c": "A patent urachus can leak urine at the umbilicus in a newborn."
   },
   "detrusor": {
    "n": "Detrusor muscle",
    "l": "Musculus detrusor",
    "t": "Muscle",
    "at": [
     140,
     240
    ],
    "s": "l",
    "d": "Three layers of interlacing smooth muscle with the wall thickened into trabeculae when obstructed.",
    "f": "Contraction empties the bladder; relaxation allows storage at low pressure.",
    "c": "Chronic outlet obstruction (prostate) hypertrophies it into trabeculae and diverticula; overactivity causes urge incontinence."
   },
   "urothelium": {
    "n": "Urothelium",
    "l": "Epithelium transitionale",
    "t": "Lining",
    "at": [
     330,
     180
    ],
    "s": "r",
    "d": "Stratified transitional epithelium with umbrella cells whose plaques make it impermeable to urine.",
    "f": "A stretch-tolerant, urine-proof lining.",
    "c": "Its instability to carcinogens (smoking, aniline dyes) makes transitional-cell carcinoma the classic bladder cancer."
   },
   "trigone": {
    "n": "Trigone",
    "l": "Trigonum vesicae",
    "t": "Region",
    "at": [
     280,
     300
    ],
    "s": "l",
    "d": "The smooth triangle bounded by the two ureteric orifices and the internal urethral orifice; mucosa firmly bound to muscle.",
    "f": "Funnel for emptying; its stretch receptors trigger the micturition reflex.",
    "c": "The interureteric ridge between the orifices is the first landmark sought at cystoscopy."
   },
   "ureteric": {
    "n": "Ureteric orifices",
    "l": "Ostia ureterum",
    "t": "Opening",
    "at": [
     226,
     282
    ],
    "s": "l",
    "d": "Slit-like openings of the ureters at the posterolateral corners of the trigone, with oblique intramural tunnels.",
    "f": "One-way entry of urine; the tunnel acts as a flap valve.",
    "c": "A short tunnel allows vesicoureteric reflux, a cause of childhood renal scarring."
   },
   "iuo": {
    "n": "Internal urethral orifice",
    "l": "Ostium urethrae internum",
    "t": "Opening",
    "at": [
     280,
     340
    ],
    "s": "l",
    "d": "The inferior angle of the trigone where the bladder neck meets the urethra.",
    "f": "Outlet guarded by the internal sphincter.",
    "c": "Bladder neck sclerosis or prostate enlargement here causes obstructive voiding and retention."
   },
   "sphincter": {
    "n": "Internal & external sphincters",
    "l": "Sphincteres urethrae",
    "t": "Muscle",
    "at": [
     280,
     392
    ],
    "s": "l",
    "d": "The internal sphincter is smooth muscle of the bladder neck (sympathetic); the external is skeletal muscle in the urogenital diaphragm (pudendal, voluntary).",
    "f": "Maintain continence; the external sphincter is under conscious control.",
    "c": "After spinal cord injury above S2 the bladder becomes reflexic with detrusor–sphincter dyssynergia."
   },
   "urethra": {
    "n": "Urethra",
    "l": "Urethra",
    "t": "Duct",
    "at": [
     280,
     440
    ],
    "s": "l",
    "d": "Female ~4 cm, male ~20 cm (prostatic, membranous, spongy parts).",
    "f": "Conveys urine out of the body; in males, also semen.",
    "c": "Catheterisation and instrumentation make it the commonest site of iatrogenic stricture, especially the male membranous urethra."
   },
   "ureter": {
    "n": "Ureters entering",
    "l": "Ureteres",
    "t": "Duct",
    "at": [
     150,
     180
    ],
    "s": "l",
    "d": "The two muscular ducts pierce the posterolateral bladder wall obliquely.",
    "f": "Deliver ureteric jets of urine every 10–30 seconds.",
    "c": "The vesicoureteric junction is the third and commonest site of ureteric stone impaction."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"b-t\" cx=\"40%\" cy=\"26%\" r=\"88%\">\n      <stop offset=\"0\" stop-color=\"#d99a6c\"/><stop offset=\".6\" stop-color=\"#b87448\"/><stop offset=\"1\" stop-color=\"#8a4f2e\"/>\n    </radialGradient>\n  </defs>\n  <g fill=\"none\" stroke=\"#4f6fa8\" stroke-width=\"12\" stroke-linecap=\"round\">\n    <path class=\"part\" data-id=\"ureter\" d=\"M96 120 C130 146 168 168 208 186 M464 120 C430 146 392 168 352 186\"/>\n  </g>\n  <path class=\"part\" data-id=\"dome\" d=\"M280 74 C350 74 404 116 410 180 C360 152 300 148 280 148 C260 148 200 152 150 180 C156 116 210 74 280 74 Z\" fill=\"url(#b-t)\" stroke=\"#6d3a1e\" stroke-width=\"2.2\"/>\n  <path class=\"part\" data-id=\"detrusor\" d=\"M150 180 C200 152 260 148 280 148 C300 148 360 152 410 180 C424 232 414 288 380 322 C344 356 316 366 280 366 C244 366 216 356 180 322 C146 288 136 232 150 180 Z\" fill=\"url(#b-t)\" stroke=\"#6d3a1e\" stroke-width=\"2.2\"/>\n  <path d=\"M170 210 C200 190 250 182 280 182 C310 182 360 190 390 210\" fill=\"none\" stroke=\"#e8c39c\" stroke-width=\"4\" opacity=\".35\"/>\n  <path d=\"M162 250 C200 232 250 226 280 226 C310 226 360 232 398 250\" fill=\"none\" stroke=\"#e8c39c\" stroke-width=\"3\" opacity=\".25\"/>\n  <path class=\"part\" data-id=\"urothelium\" d=\"M186 200 C226 178 258 174 280 174 C302 174 334 178 374 200 C384 240 376 284 348 312 C318 340 300 346 280 346 C260 346 242 340 212 312 C184 284 176 240 186 200 Z\" fill=\"#5c3a24\" opacity=\".55\"/>\n  <path class=\"part\" data-id=\"trigone\" d=\"M226 282 L334 282 L280 344 Z\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"2\"/>\n  <g class=\"part\" data-id=\"ureteric\" fill=\"#8a6a2e\">\n    <ellipse cx=\"226\" cy=\"282\" rx=\"7\" ry=\"4.4\"/><ellipse cx=\"334\" cy=\"282\" rx=\"7\" ry=\"4.4\"/>\n  </g>\n  <g class=\"part\" data-id=\"iuo\"><ellipse cx=\"280\" cy=\"342\" rx=\"8\" ry=\"5\" fill=\"#8a6a2e\"/></g>\n  <g class=\"part\" data-id=\"sphincter\">\n    <path d=\"M262 352 C262 372 262 384 264 392 L296 392 C298 384 298 372 298 352 Z\" fill=\"#c98a5c\" stroke=\"#6d3a1e\" stroke-width=\"1.8\"/>\n    <path d=\"M252 396 L308 396 L304 414 L256 414 Z\" fill=\"#a4653c\" stroke=\"#6d3a1e\" stroke-width=\"1.8\"/>\n  </g>\n  <path class=\"part\" data-id=\"urethra\" d=\"M266 414 L294 414 L292 456 L268 456 Z\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"1.8\"/>\n  <g fill=\"#cfe3ec\" opacity=\".9\">\n    <ellipse class=\"fillup\" cx=\"280\" cy=\"300\" rx=\"86\" ry=\"60\"/>\n  </g>\n  <text x=\"280\" y=\"306\" text-anchor=\"middle\" class=\"cap\" style=\"fill:#9fc6d6\">urine</text>\n  <text x=\"96\" y=\"104\" class=\"cap\">from ureters</text>\n  <text x=\"548\" y=\"452\" class=\"cap\" text-anchor=\"end\">external sphincter (voluntary)</text>\n  <path d=\"M388 440 C350 424 320 412 306 404\" fill=\"none\" stroke=\"#8fb0aa\" stroke-width=\"1.4\" opacity=\".6\"/>",
  "anims": [
   {
    "id": "fill",
    "label": "Filling & voiding",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.6\" fill=\"#a5e8f5\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M96 120 C130 146 168 168 208 186 C226 220 240 250 250 276\"/></circle>\n        <circle r=\"4.6\" fill=\"#a5e8f5\"><animateMotion dur=\"4s\" begin=\"-2s\" repeatCount=\"indefinite\" path=\"M464 120 C430 146 392 168 352 186 C334 220 320 250 310 276\"/></circle>\n        <circle r=\"4.6\" fill=\"#a5e8f5\"><animateMotion dur=\"2.6s\" begin=\"-1s\" repeatCount=\"indefinite\" path=\"M280 336 C280 360 280 384 280 408 C280 428 280 444 280 456\"/></circle>\n      </g>",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The bladder's voluntary sphincter is supplied by the…",
    "opts": [
     "Pelvic splanchnic nerves (S2–S4)",
     "Pudendal nerve",
     "Hypogastric nerve",
     "Vagus nerve"
    ],
    "a": 1,
    "why": "The external sphincter is skeletal muscle in the urogenital diaphragm, supplied by the pudendal nerve (S2–S4 somatic), so it is under conscious control."
   },
   {
    "q": "The trigone is smooth because…",
    "opts": [
     "It never stretches",
     "It develops from mesonephric duct with mucosa fixed to muscle",
     "It lacks epithelium",
     "It is covered by peritoneum"
    ],
    "a": 1,
    "why": "Unlike the rest of the bladder, the trigone derives from absorbed mesonephric duct, so its mucosa stays firmly adherent and smooth."
   },
   {
    "q": "The lining of the bladder is…",
    "opts": [
     "Stratified squamous",
     "Simple columnar",
     "Transitional (urothelium)",
     "Pseudostratified ciliated"
    ],
    "a": 2,
    "why": "Urothelium stretches and is impermeable to urine; it is also the origin of transitional-cell carcinoma."
   }
  ],
  "related": [
   "kidney",
   "male",
   "female",
   "spinalcord"
  ],
  "photo": {
   "file": "bladder.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "dome": [
     469,
     111
    ],
    "detrusor": [
     281,
     333
    ],
    "urothelium": [
     563,
     333
    ],
    "trigone": [
     469,
     556
    ],
    "ureteric": [
     350,
     400
    ],
    "iuo": [
     488,
     722
    ],
    "urethra": [
     500,
     911
    ],
    "ureter": [
     188,
     167
    ]
   }
  }
 },
 "skin": {
  "title": "Skin",
  "latin": "Cutis",
  "system": "integumentary",
  "region": "Whole body surface — the largest organ",
  "size": "1.5–2 m² · 3–5 kg · ~70% of body heat lost through it",
  "blood": "Dermal plexuses from segmental perforators",
  "nerve": "Somatic sensory (touch, pain, temperature) + sympathetic",
  "blurb": "A layered barrier with hair, glands, receptors and its own immune system.",
  "summary": "The epidermis is a keratinising stratified squamous epithelium renewed from the basal layer every ~4 weeks, with melanocytes, Langerhans cells and Merkel cells among the keratinocytes. Beneath it the dermis gives strength and elasticity (papillary loose, reticular dense connective tissue) and carries the vessels, nerves, hair follicles and glands. The hypodermis is fat that insulates and cushions. Skin makes vitamin D, senses the world, and regulates temperature by sweating and by shunting blood through arteriovenous anastomoses.",
  "vb": [
   640,
   430
  ],
  "legend": [
   [
    "#d9a98c",
    "Epidermis"
   ],
   [
    "#c98a6c",
    "Dermis"
   ],
   [
    "#e8d3a8",
    "Hypodermis"
   ],
   [
    "#8f6fb0",
    "Nerves & receptors"
   ]
  ],
  "parts": {
   "corneum": {
    "n": "Stratum corneum",
    "l": "Stratum corneum",
    "t": "Epidermis",
    "at": [
     90,
     60
    ],
    "s": "l",
    "d": "15–20 layers of dead, flattened, keratin-filled corneocytes held by lipids — the \"brick and mortar\" barrier.",
    "f": "Waterproofing and the main barrier to microbes and chemicals.",
    "c": "Its thickness defines palms and soles; loss in burns allows catastrophic fluid and heat loss."
   },
   "basale": {
    "n": "Stratum basale & spinosum",
    "l": "Stratum basale",
    "t": "Epidermis",
    "at": [
     90,
     110
    ],
    "s": "l",
    "d": "The single basal row of dividing keratinocytes on the basement membrane, plus the prickle-cell layers above with desmosomes, melanocytes and Langerhans cells.",
    "f": "Renews the epidermis; melanocytes transfer pigment; Langerhans cells present antigen.",
    "c": "Basal cell carcinoma arises here at sun-exposed sites; melanoma from melanocytes."
   },
   "dermis": {
    "n": "Dermis (papillary & reticular)",
    "l": "Dermis",
    "t": "Dermis",
    "at": [
     90,
     180
    ],
    "s": "l",
    "d": "Papillary layer of loose connective tissue forming dermal papillae; reticular layer of dense irregular collagen and elastin.",
    "f": "Strength, elasticity, sensation and the vascular supply of the epidermis.",
    "c": "Split-thickness grafts take from the dermal remnants left in the wound bed; keloids are dermal over-scarring."
   },
   "hypodermis": {
    "n": "Hypodermis (subcutis)",
    "l": "Tela subcutanea",
    "t": "Fat",
    "at": [
     90,
     330
    ],
    "s": "l",
    "d": "Loose connective tissue and fat, with larger vessels and nerves and, in places, panniculus carnosus.",
    "f": "Insulation, energy store, shock absorption and skin mobility.",
    "c": "Subcutaneous insulin absorption varies with site and temperature because of this layer's blood flow."
   },
   "hair": {
    "n": "Hair shaft & follicle",
    "l": "Folliculus pili",
    "t": "Appendage",
    "at": [
     210,
     60
    ],
    "s": "l",
    "d": "A keratinised shaft growing from a follicle that dips into dermis or fat, with a bulb around a dermal papilla and a bulge of stem cells.",
    "f": "Protection, sensation and (in other mammals) insulation.",
    "c": "Follicular stem cells re-epithelialise partial-thickness wounds; follicles are the target of alopecias."
   },
   "arrector": {
    "n": "Arrector pili muscle",
    "l": "Musculus arrector pili",
    "t": "Muscle",
    "at": [
     268,
     190
    ],
    "s": "r",
    "d": "A band of smooth muscle from follicle to dermis, supplied by sympathetic fibres.",
    "f": "Erects the hair (goose flesh) and helps express sebum.",
    "c": "Its contraction in cold traps air for insulation — vestigial in humans."
   },
   "sebaceous": {
    "n": "Sebaceous gland",
    "l": "Glandula sebacea",
    "t": "Gland",
    "at": [
     300,
     150
    ],
    "s": "r",
    "d": "A holocrine gland of lipid-filled cells opening into the follicle above the arrector pili insertion.",
    "f": "Sebum lubricates and waterproofs hair and skin and has mild antimicrobial action.",
    "c": "Blocked, colonised glands are the lesion of acne vulgaris (Propionibacterium/Cutibacterium acnes)."
   },
   "sweat": {
    "n": "Eccrine sweat gland & duct",
    "l": "Glandula sudorifera",
    "t": "Gland",
    "at": [
     430,
     330
    ],
    "s": "r",
    "d": "A coiled secretory coil deep in the dermis with a duct spiralling through the epidermis to a pore.",
    "f": "Evaporative cooling — the main human thermoregulatory mechanism; also excretes salt, urea and lactate.",
    "c": "Heat stroke follows when sweating fails; cystic fibrosis makes sweat abnormally salty (chloride test)."
   },
   "meissner": {
    "n": "Meissner corpuscle",
    "l": "Corpusculum tacti",
    "t": "Receptor",
    "at": [
     330,
     220
    ],
    "s": "r",
    "d": "A stacked, encapsulated ending in the dermal papillae of glabrous skin.",
    "f": "Detects light touch and low-frequency vibration (rapidly adapting).",
    "c": "Dense in fingertips and lips — the reason two-point discrimination is finest there."
   },
   "pacinian": {
    "n": "Pacinian corpuscle",
    "l": "Corpusculum lamellosum",
    "t": "Receptor",
    "at": [
     480,
     392
    ],
    "s": "r",
    "d": "An onion-like encapsulated receptor in deep dermis and hypodermis.",
    "f": "Senses deep pressure and high-frequency vibration.",
    "c": "Its loss in leprosy and diabetes contributes to unnoticed injury and ulceration."
   },
   "vessels": {
    "n": "Dermal vessels & AV anastomoses",
    "l": "Plexus vasculosus",
    "t": "Vessel",
    "at": [
     560,
     300
    ],
    "s": "r",
    "d": "A deep and a superficial plexus with capillary loops in each dermal papilla, plus glomus arteriovenous shunts in acral skin.",
    "f": "Nutrition of the epidermis and control of heat loss by shunting blood.",
    "c": "Opening the shunts flushes and cools; closing them in cold makes fingers pale — exaggerated in Raynaud phenomenon."
   }
  },
  "art": "\n  <defs>\n    <linearGradient id=\"sk-ep\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#e8c3a4\"/><stop offset=\"1\" stop-color=\"#c99073\"/>\n    </linearGradient>\n    <linearGradient id=\"sk-dm\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#d9a184\"/><stop offset=\"1\" stop-color=\"#b3765a\"/>\n    </linearGradient>\n    <linearGradient id=\"sk-hy\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#f0dcae\"/><stop offset=\"1\" stop-color=\"#d9bd85\"/>\n    </linearGradient>\n  </defs>\n  <path d=\"M20 120 C120 108 240 108 340 118 C440 128 540 128 620 118 L620 150 C540 160 440 160 340 150 C240 140 120 140 20 152 Z\" fill=\"url(#sk-ep)\" stroke=\"#8a5a44\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"corneum\" d=\"M20 120 C120 108 240 108 340 118 C440 128 540 128 620 118 L620 128 C540 138 440 138 340 128 C240 118 120 118 20 130 Z\" fill=\"#efd6bd\" stroke=\"#8a5a44\" stroke-width=\"1\"/>\n  <path class=\"part\" data-id=\"basale\" d=\"M20 144 C120 132 240 132 340 142 C440 152 540 152 620 142 L620 152 C540 162 440 162 340 152 C240 142 120 142 20 154 Z\" fill=\"#b3765a\"/>\n  <path class=\"part\" data-id=\"dermis\" d=\"M20 152 C120 140 240 140 340 150 C440 160 540 160 620 150 L620 290 C540 300 440 300 340 290 C240 280 120 280 20 292 Z\" fill=\"url(#sk-dm)\" stroke=\"#8a5a44\" stroke-width=\"1.4\"/>\n  <path class=\"part\" data-id=\"hypodermis\" d=\"M20 292 C120 280 240 280 340 290 C440 300 540 300 620 290 L620 400 L20 400 Z\" fill=\"url(#sk-hy)\" stroke=\"#a98a63\" stroke-width=\"1.4\"/>\n  <g fill=\"#f6e7c4\" stroke=\"#c9a86e\" stroke-width=\"1.4\">\n    <ellipse cx=\"70\" cy=\"330\" rx=\"26\" ry=\"18\"/><ellipse cx=\"130\" cy=\"352\" rx=\"26\" ry=\"18\"/><ellipse cx=\"190\" cy=\"330\" rx=\"26\" ry=\"18\"/><ellipse cx=\"250\" cy=\"356\" rx=\"26\" ry=\"18\"/><ellipse cx=\"310\" cy=\"332\" rx=\"26\" ry=\"18\"/><ellipse cx=\"370\" cy=\"356\" rx=\"26\" ry=\"18\"/><ellipse cx=\"430\" cy=\"332\" rx=\"26\" ry=\"18\"/><ellipse cx=\"490\" cy=\"356\" rx=\"26\" ry=\"18\"/><ellipse cx=\"550\" cy=\"332\" rx=\"26\" ry=\"18\"/><ellipse cx=\"600\" cy=\"356\" rx=\"24\" ry=\"18\"/>\n  </g>\n  <g class=\"part\" data-id=\"hair\">\n    <path d=\"M212 30 C210 60 212 92 216 120 L228 120 C224 92 222 60 224 30 Z\" fill=\"#6a4a34\" stroke=\"#4a3222\" stroke-width=\"1.2\"/>\n    <path d=\"M204 150 C200 190 204 226 216 250 C228 268 244 268 252 250 C262 226 258 186 246 150 Z\" fill=\"#e8c3a4\" stroke=\"#8a5a44\" stroke-width=\"1.6\"/>\n    <ellipse cx=\"230\" cy=\"252\" rx=\"16\" ry=\"14\" fill=\"#c98a6c\" stroke=\"#8a5a44\" stroke-width=\"1.4\"/>\n  </g>\n  <path class=\"part\" data-id=\"arrector\" d=\"M248 196 C272 210 292 226 306 244 L298 254 C282 236 262 220 240 208 Z\" fill=\"#c9705f\" stroke=\"#7d3227\" stroke-width=\"1.4\"/>\n  <g class=\"part\" data-id=\"sebaceous\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"1.5\">\n    <path d=\"M286 148 C306 142 322 150 324 166 C326 182 312 192 296 188 C282 184 276 160 286 148 Z\"/>\n    <circle cx=\"300\" cy=\"166\" r=\"5\" fill=\"#f6e7c4\"/><circle cx=\"312\" cy=\"174\" r=\"4\" fill=\"#f6e7c4\"/>\n  </g>\n  <g class=\"part\" data-id=\"sweat\">\n    <path d=\"M430 300 C420 268 420 232 428 196 C434 172 438 150 438 128\" fill=\"none\" stroke=\"#9fc6d6\" stroke-width=\"7\" stroke-linecap=\"round\"/>\n    <path d=\"M414 322 C402 314 402 298 414 292 C426 286 440 292 442 304 C444 316 432 326 420 322 C430 330 446 326 450 314\" fill=\"none\" stroke=\"#9fc6d6\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n  </g>\n  <g class=\"part\" data-id=\"meissner\">\n    <ellipse cx=\"330\" cy=\"212\" rx=\"13\" ry=\"20\" fill=\"#cbb8dd\" stroke=\"#6d4a86\" stroke-width=\"1.5\"/>\n    <path d=\"M322 200 h16 M322 208 h16 M322 216 h16 M322 224 h16\" stroke=\"#6d4a86\" stroke-width=\"1.4\"/>\n  </g>\n  <g class=\"part\" data-id=\"pacinian\">\n    <ellipse cx=\"480\" cy=\"386\" rx=\"22\" ry=\"16\" fill=\"#cbb8dd\" stroke=\"#6d4a86\" stroke-width=\"1.5\"/>\n    <ellipse cx=\"480\" cy=\"386\" rx=\"15\" ry=\"10\" fill=\"none\" stroke=\"#6d4a86\" stroke-width=\"1.3\"/>\n    <ellipse cx=\"480\" cy=\"386\" rx=\"8\" ry=\"5\" fill=\"none\" stroke=\"#6d4a86\" stroke-width=\"1.3\"/>\n    <circle cx=\"480\" cy=\"386\" r=\"2.4\" fill=\"#6d4a86\"/>\n  </g>\n  <g class=\"part\" data-id=\"vessels\" fill=\"none\" stroke-linecap=\"round\">\n    <path d=\"M560 292 C556 260 556 220 560 180\" stroke=\"#c0453f\" stroke-width=\"6\"/>\n    <path d=\"M586 292 C590 260 590 220 586 180\" stroke=\"#3f5f9c\" stroke-width=\"6\"/>\n    <path d=\"M560 180 C540 168 520 162 500 160 M586 180 C600 170 610 164 618 160 M560 292 C520 300 480 302 440 300 M586 292 C560 300 530 302 500 300\" stroke-width=\"3\" opacity=\".8\" stroke=\"#c0453f\"/>\n    <path d=\"M470 200 C470 180 470 168 470 156\" stroke=\"#c0453f\" stroke-width=\"2.4\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#8f6fb0\" stroke-width=\"2.4\" opacity=\".9\">\n    <path d=\"M330 232 C332 260 336 280 344 300 M230 266 C236 286 240 300 246 316 M480 370 C478 344 476 320 472 300\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#7a4637\" stroke-width=\"1.6\" opacity=\".5\">\n    <path d=\"M60 190 C100 184 140 184 180 190 M260 210 C300 204 340 204 380 210 M420 230 C460 224 500 224 540 230 M80 250 C120 244 160 244 200 250 M320 260 C360 254 400 254 440 260\"/>\n  </g>",
  "anims": [
   {
    "id": "sweat",
    "label": "Sweat & heat loss",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4\" fill=\"#a5e8f5\"><animateMotion dur=\"3.6s\" repeatCount=\"indefinite\" path=\"M420 310 C424 280 424 240 428 200 C434 172 438 150 438 128\"/></circle>\n        <circle r=\"4\" fill=\"#a5e8f5\"><animateMotion dur=\"3.6s\" begin=\"-1.8s\" repeatCount=\"indefinite\" path=\"M420 310 C424 280 424 240 428 200 C434 172 438 150 438 128\"/></circle>\n        <circle r=\"4\" fill=\"#ef6a5f\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M560 292 C556 260 556 220 560 180 C540 168 520 162 500 160\"/></circle>\n      </g>"
   },
   {
    "id": "touch",
    "label": "Sensory signalling",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.2\" fill=\"#c4b5fd\"><animateMotion dur=\"2.6s\" repeatCount=\"indefinite\" path=\"M330 212 C332 260 336 280 344 300 C352 330 360 360 368 392\"/></circle>\n        <circle r=\"4.2\" fill=\"#c4b5fd\"><animateMotion dur=\"2.6s\" begin=\"-1.3s\" repeatCount=\"indefinite\" path=\"M480 386 C478 344 476 320 472 300 C468 268 464 240 460 210\"/></circle>\n      </g>",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which layer provides the waterproof barrier?",
    "opts": [
     "Stratum basale",
     "Stratum spinosum",
     "Stratum corneum",
     "Papillary dermis"
    ],
    "a": 2,
    "why": "The dead keratinised corneocytes with intercellular lipid form the brick-and-mortar barrier that limits water loss and entry of microbes."
   },
   {
    "q": "Cooling the body in heat depends mainly on…",
    "opts": [
     "Arrector pili contraction",
     "Eccrine sweat evaporation",
     "Sebaceous secretion",
     "Melanocyte activity"
    ],
    "a": 1,
    "why": "Evaporation of eccrine sweat is the dominant human cooling mechanism; arteriovenous shunts also open to radiate heat."
   },
   {
    "q": "Vitamin D is synthesised in the skin from…",
    "opts": [
     "Cholesterol in the hypodermis under UV-B",
     "7-dehydrocholesterol in epidermis under UV-B",
     "Keratin in the stratum corneum",
     "Melanin in melanocytes"
    ],
    "a": 1,
    "why": "UV-B converts epidermal 7-dehydrocholesterol to previtamin D3, later hydroxylated in liver and kidney to the active hormone."
   }
  ],
  "related": [
   "brain",
   "heart",
   "kidney",
   "ear"
  ],
  "photo": {
   "file": "skin.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "corneum": [
     438,
     267
    ],
    "basale": [
     313,
     367
    ],
    "dermis": [
     281,
     500
    ],
    "hypodermis": [
     313,
     800
    ],
    "hair": [
     463,
     222
    ],
    "arrector": [
     481,
     578
    ],
    "sebaceous": [
     394,
     478
    ],
    "sweat": [
     656,
     644
    ],
    "meissner": [
     325,
     567
    ],
    "pacinian": [
     497,
     678
    ],
    "vessels": [
     375,
     756
    ]
   }
  }
 },
 "spinalcord": {
  "title": "Spinal cord",
  "latin": "Medulla spinalis",
  "system": "nervous",
  "region": "Vertebral canal, foramen magnum to L1/L2",
  "size": "≈ 45 cm long, 35 g · 31 segments",
  "blood": "Anterior spinal artery + two posterior, reinforced by radicular arteries",
  "nerve": "31 pairs of spinal nerves; ascending & descending tracts",
  "blurb": "Cross-section: a grey butterfly inside white tracts, wrapped in three meninges.",
  "summary": "In cross-section the cord shows an H- or butterfly-shaped core of grey matter — posterior (sensory) horns, lateral (autonomic) horns in thoracic segments and anterior (motor) horns — around the central canal. White matter surrounds it in funiculi carrying the dorsal column–medial lemniscus (fine touch, proprioception), the spinothalamic tracts (pain, temperature) and the corticospinal tracts (voluntary movement). Dorsal roots carry sensory fibres with their cell bodies in the dorsal root ganglion; ventral roots carry motor fibres. Three meninges and the denticulate ligaments suspend the cord in CSF.",
  "vb": [
   560,
   470
  ],
  "legend": [
   [
    "#c9a28a",
    "Grey matter"
   ],
   [
    "#e6dcc8",
    "White matter"
   ],
   [
    "#8f6fb0",
    "Roots & ganglion"
   ],
   [
    "#9fc6d6",
    "Meninges & CSF"
   ]
  ],
  "parts": {
   "posterior": {
    "n": "Posterior (dorsal) horn",
    "l": "Cornu posterius",
    "t": "Grey matter",
    "at": [
     216,
     120
    ],
    "s": "l",
    "d": "The slender upper horns receiving sensory afferents; laminae I–VI including the substantia gelatinosa.",
    "f": "First synapse for pain, temperature and touch; gate control of nociception happens here.",
    "c": "Loss of the spinothalamic decussation at a segment causes a segmental band of lost pain and temperature (syringomyelia)."
   },
   "anterior": {
    "n": "Anterior (ventral) horn",
    "l": "Cornu anterius",
    "t": "Grey matter",
    "at": [
     216,
     330
    ],
    "s": "l",
    "d": "The broad lower horns containing the lower motor neuron cell bodies and Renshaw cells.",
    "f": "Final common pathway: alpha motor neurons innervate skeletal muscle.",
    "c": "Poliovirus and ALS destroy these cells, giving flaccid paralysis, wasting and fasciculation."
   },
   "lateral": {
    "n": "Lateral horn",
    "l": "Cornu laterale",
    "t": "Grey matter",
    "at": [
     330,
     226
    ],
    "s": "r",
    "d": "Present only in T1–L2, holding preganglionic sympathetic neurons (and S2–S4 parasympathetic equivalents).",
    "f": "Origin of the sympathetic outflow.",
    "c": "Horner syndrome follows interruption of the T1 lateral horn or its pathway (e.g. Pancoast tumour)."
   },
   "canal": {
    "n": "Central canal",
    "l": "Canalis centralis",
    "t": "Cavity",
    "at": [
     280,
     226
    ],
    "s": "l",
    "d": "The ependyma-lined remnant of the neural tube lumen, continuous with the fourth ventricle.",
    "f": "Circulates a trickle of CSF within the cord.",
    "c": "Its dilatation defines syringomyelia, classically causing a cape-like loss of pain and temperature."
   },
   "white": {
    "n": "White funiculi & tracts",
    "l": "Funiculi",
    "t": "White matter",
    "at": [
     390,
     150
    ],
    "s": "r",
    "d": "Dorsal columns (fasciculus gracilis & cuneatus), lateral spinothalamic and corticospinal tracts, and spinocerebellar tracts.",
    "f": "Highways for sensation upward and motor commands downward.",
    "c": "B12 deficiency (subacute combined degeneration) damages dorsal columns and corticospinal tracts together."
   },
   "dura": {
    "n": "Dura mater",
    "l": "Dura mater",
    "t": "Meninges",
    "at": [
     280,
     40
    ],
    "s": "r",
    "d": "The tough outer sleeve, ending as the dural sac at S2 with the filum terminale beyond.",
    "f": "Protects and forms the epidural and subarachnoid boundaries.",
    "c": "Epidural anaesthesia deposits drug outside it; a dural puncture headache follows CSF leak from within."
   },
   "arachnoid": {
    "n": "Arachnoid & subarachnoid space",
    "l": "Arachnoidea",
    "t": "Meninges",
    "at": [
     90,
     150
    ],
    "s": "l",
    "d": "The web-like middle layer; the subarachnoid space beneath holds CSF and the cord's vessels.",
    "f": "CSF cushion and nutrient exchange.",
    "c": "Lumbar puncture samples CSF here below L2, where only the cauda equina floats."
   },
   "pia": {
    "n": "Pia mater & denticulate ligaments",
    "l": "Pia mater",
    "t": "Meninges",
    "at": [
     90,
     300
    ],
    "s": "l",
    "d": "The delicate inner layer adherent to the cord, throwing out toothed lateral ligaments to the dura.",
    "f": "Suspends the cord centrally in CSF.",
    "c": "The ligaments are the surgical landmark between anterior and posterior roots."
   },
   "dorsalroot": {
    "n": "Dorsal root & ganglion",
    "l": "Radix dorsalis",
    "t": "Root",
    "at": [
     470,
     120
    ],
    "s": "r",
    "d": "Sensory rootlets converging on the oval dorsal root ganglion of pseudo-unipolar cell bodies.",
    "f": "Carries all afferent input from one dermatome.",
    "c": "Shingles (zoster) reactivates in a ganglion, giving a dermatomal vesicular rash."
   },
   "ventralroot": {
    "n": "Ventral root",
    "l": "Radix ventralis",
    "t": "Root",
    "at": [
     470,
     330
    ],
    "s": "r",
    "d": "Motor rootlets from the anterior horn joining the dorsal root at the intervertebral foramen.",
    "f": "Carries motor and preganglionic autonomic fibres out.",
    "c": "Root compression by a prolapsed disc causes radicular pain in the matching dermatome and myotome."
   },
   "nerve": {
    "n": "Spinal nerve",
    "l": "Nervus spinalis",
    "t": "Nerve",
    "at": [
     520,
     226
    ],
    "s": "r",
    "d": "The mixed nerve formed by union of the roots, dividing at once into dorsal and ventral rami.",
    "f": "Supplies one segment of body wall and limb.",
    "c": "31 pairs: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal — cervical nerves are numbered above their vertebra."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"sc-w\" cx=\"45%\" cy=\"40%\" r=\"75%\">\n      <stop offset=\"0\" stop-color=\"#f0e6d2\"/><stop offset=\"1\" stop-color=\"#cfc0a2\"/>\n    </radialGradient>\n    <linearGradient id=\"sc-g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#d3a98f\"/><stop offset=\"1\" stop-color=\"#a9765c\"/>\n    </linearGradient>\n  </defs>\n  <circle class=\"part\" data-id=\"dura\" cx=\"280\" cy=\"226\" r=\"182\" fill=\"none\" stroke=\"#9fc6d6\" stroke-width=\"7\" opacity=\".85\"/>\n  <circle class=\"part\" data-id=\"arachnoid\" cx=\"280\" cy=\"226\" r=\"168\" fill=\"#12303a\" opacity=\".55\" stroke=\"#9fc6d6\" stroke-width=\"2\" stroke-dasharray=\"6 5\"/>\n  <circle class=\"part\" data-id=\"pia\" cx=\"280\" cy=\"226\" r=\"150\" fill=\"url(#sc-w)\" stroke=\"#8a7154\" stroke-width=\"2.4\"/>\n  <g class=\"part\" data-id=\"pia\" stroke=\"#9fc6d6\" stroke-width=\"3\" fill=\"none\">\n    <path d=\"M130 226 L112 226 M430 226 L448 226 M174 120 L162 108 M386 120 L398 108 M174 332 L162 344 M386 332 L398 344\"/>\n  </g>\n  <path class=\"part\" data-id=\"white\" d=\"M280 92 C340 92 396 130 410 190 C420 240 404 300 360 336 C320 366 240 366 200 336 C156 300 140 240 150 190 C164 130 220 92 280 92 Z\" fill=\"none\"/>\n  <path class=\"part\" data-id=\"posterior\" d=\"M262 118 C252 140 240 156 224 166 C206 176 196 168 200 152 C206 132 224 116 244 106 C256 100 266 104 262 118 Z M298 118 C308 140 320 156 336 166 C354 176 364 168 360 152 C354 132 336 116 316 106 C304 100 294 104 298 118 Z\" fill=\"url(#sc-g)\" stroke=\"#7a4637\" stroke-width=\"1.8\"/>\n  <path class=\"part\" data-id=\"anterior\" d=\"M250 300 C232 314 214 330 204 344 C196 356 206 366 220 360 C240 352 258 336 268 320 Z M310 300 C328 314 346 330 356 344 C364 356 354 366 340 360 C320 352 302 336 292 320 Z\" fill=\"url(#sc-g)\" stroke=\"#7a4637\" stroke-width=\"1.8\"/>\n  <path d=\"M268 176 C268 210 268 250 268 288 C274 296 286 296 292 288 C292 250 292 210 292 176 C286 168 274 168 268 176 Z\" fill=\"url(#sc-g)\" stroke=\"#7a4637\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"lateral\" d=\"M236 214 C222 218 210 224 202 232 C210 240 222 244 236 244 Z M324 214 C338 218 350 224 358 232 C350 240 338 244 324 244 Z\" fill=\"#c98a6c\" stroke=\"#7a4637\" stroke-width=\"1.5\"/>\n  <circle class=\"part\" data-id=\"canal\" cx=\"280\" cy=\"228\" r=\"7\" fill=\"#cfe3ec\" stroke=\"#6f97a8\" stroke-width=\"1.6\"/>\n  <path d=\"M280 84 L280 104 M280 352 L280 372\" stroke=\"#8a7154\" stroke-width=\"3\"/>\n  <text x=\"280\" y=\"76\" text-anchor=\"middle\" class=\"cap\">anterior median fissure</text>\n  <g class=\"part\" data-id=\"dorsalroot\">\n    <path d=\"M352 128 C392 116 428 108 462 104\" fill=\"none\" stroke=\"#cbb8dd\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n    <ellipse cx=\"478\" cy=\"102\" rx=\"20\" ry=\"13\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.6\"/>\n    <g fill=\"#e6dcf2\"><circle cx=\"470\" cy=\"100\" r=\"3\"/><circle cx=\"480\" cy=\"104\" r=\"3\"/><circle cx=\"488\" cy=\"98\" r=\"3\"/></g>\n  </g>\n  <g class=\"part\" data-id=\"ventralroot\">\n    <path d=\"M352 324 C392 336 428 344 462 348\" fill=\"none\" stroke=\"#cbb8dd\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n  </g>\n  <path class=\"part\" data-id=\"nerve\" d=\"M494 108 C512 128 520 168 522 210 C524 252 520 300 508 340 L494 344 C506 300 508 252 506 210 C504 170 496 132 482 114 Z\" fill=\"#e6dcf2\" stroke=\"#6d4a86\" stroke-width=\"1.6\"/>\n  <g fill=\"none\" stroke=\"#8fb0aa\" stroke-width=\"1.6\" opacity=\".6\">\n    <path d=\"M200 150 C160 140 130 132 108 122 M360 150 C400 140 424 132 444 124\"/>\n  </g>\n  <text x=\"96\" y=\"112\" class=\"cap\">dermatome input</text>\n  <text x=\"452\" y=\"392\" class=\"cap\">myotome output</text>\n  <g fill=\"none\" stroke=\"#f7e9a0\" stroke-width=\"2\" opacity=\".85\">\n    <path d=\"M120 90 C160 106 196 122 226 142 M440 90 C400 106 364 122 334 142\"/>\n  </g>",
  "anims": [
   {
    "id": "signal",
    "label": "Ascending & descending signals",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4.6\" fill=\"#c4b5fd\"><animateMotion dur=\"2.4s\" repeatCount=\"indefinite\" path=\"M478 102 C430 110 392 118 352 128 C320 140 300 156 288 176 C284 200 284 240 288 268\"/></circle>\n        <circle r=\"4.6\" fill=\"#8ff0d8\"><animateMotion dur=\"2.4s\" repeatCount=\"indefinite\" path=\"M288 268 C292 292 300 308 316 318 C352 330 400 340 462 348\"/></circle>\n        <path class=\"signal-path\" d=\"M478 102 C430 110 392 118 352 128 C320 140 300 156 288 176\"/>\n        <path class=\"signal-path\" style=\"animation-delay:.6s\" d=\"M272 268 C268 292 260 308 244 318 C208 330 160 340 98 348\"/>\n      </g>"
   },
   {
    "id": "csf",
    "label": "CSF pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Fine touch and proprioception ascend in the…",
    "opts": [
     "Lateral spinothalamic tract",
     "Dorsal columns",
     "Corticospinal tract",
     "Spinocerebellar tract"
    ],
    "a": 1,
    "why": "The fasciculi gracilis and cuneatus carry discriminative touch and position sense ipsilaterally to the medulla, where they cross."
   },
   {
    "q": "Lower motor neuron cell bodies sit in the…",
    "opts": [
     "Dorsal root ganglion",
     "Anterior horn of grey matter",
     "Lateral funiculus",
     "Posterior horn"
    ],
    "a": 1,
    "why": "Alpha motor neurons in the anterior horn are the final common pathway to skeletal muscle; their loss gives flaccid paralysis."
   },
   {
    "q": "A lumbar puncture is safely performed below L2 because…",
    "opts": [
     "The CSF ends there",
     "Only the floating cauda equina occupies the sac",
     "The dura ends at L2",
     "The cord is wider above"
    ],
    "a": 1,
    "why": "The cord ends at L1/L2; below it, mobile rootlets of the cauda equina drift away from the needle in CSF."
   }
  ],
  "related": [
   "brain",
   "skin",
   "bladder",
   "heart"
  ],
  "photo": {
   "file": "spinalcord.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "posterior": [
     550,
     356
    ],
    "anterior": [
     550,
     533
    ],
    "lateral": [
     613,
     422
    ],
    "canal": [
     547,
     450
    ],
    "white": [
     475,
     333
    ],
    "dura": [
     425,
     644
    ],
    "arachnoid": [
     456,
     611
    ],
    "pia": [
     513,
     578
    ],
    "dorsalroot": [
     675,
     322
    ],
    "ventralroot": [
     475,
     667
    ],
    "nerve": [
     250,
     756
    ]
   }
  }
 },
 "male": {
  "title": "Male reproductive system",
  "latin": "Organa genitalia masculina",
  "system": "male",
  "region": "Pelvis, perineum and scrotum",
  "size": "Testis ≈ 4–5 × 2–3 cm (adult; variable)",
  "blood": "Testicular arteries (abdominal aorta, L2)",
  "nerve": "Sympathetic T10–L2 (emission) · parasympathetic S2–S4 (erection)",
  "blurb": "Sperm production in the scrotum, maturation in the epididymis, and a shared exit with urine.",
  "summary": "Spermatogenesis runs for ~74 days in the seminiferous tubules, where Sertoli cells nurse dividing germ cells behind the blood–testis barrier; Leydig cells between tubules make testosterone under LH. Sperm mature and are stored in the epididymis, then travel through the vas deferens, which joins the seminal vesicle duct to form the ejaculatory duct crossing the prostate. Seminal fluid from seminal vesicles (fructose), prostate (citrate, PSA) and bulbourethral glands makes up semen. The scrotum keeps the testis ~2 °C below core temperature.",
  "vb": [
   640,
   470
  ],
  "legend": [
   [
    "#b0647a",
    "Testis & epididymis"
   ],
   [
    "#c98a5c",
    "Ducts"
   ],
   [
    "#8f6fb0",
    "Accessory glands"
   ],
   [
    "#9fc6d6",
    "Bladder & urethra"
   ]
  ],
  "parts": {
   "testis": {
    "n": "Testis & seminiferous tubules",
    "l": "Testis",
    "t": "Gonad",
    "at": [
     150,
     330
    ],
    "s": "l",
    "d": "250–300 lobules of coiled seminiferous tubules (total ~250 m) with Sertoli cells and developing germ cells, wrapped in tunica albuginea.",
    "f": "Spermatogenesis and testosterone production.",
    "c": "Undescended testis (cryptorchidism) raises infertility and germ-cell tumour risk; torsion is a 6-hour surgical emergency."
   },
   "epididymis": {
    "n": "Epididymis",
    "l": "Epididymis",
    "t": "Duct",
    "at": [
     110,
     270
    ],
    "s": "l",
    "d": "A 6 m coiled duct (head, body, tail) applied to the posterior border of the testis.",
    "f": "Sperm maturation, motility acquisition and storage (up to weeks).",
    "c": "A common site of infection (epididymitis) and of obstruction after vasectomy or infection."
   },
   "vas": {
    "n": "Vas deferens",
    "l": "Ductus deferens",
    "t": "Duct",
    "at": [
     200,
     180
    ],
    "s": "l",
    "d": "A thick-walled 45 cm muscular duct from the epididymal tail, through the inguinal canal into the pelvis.",
    "f": "Propels sperm by powerful peristalsis at emission.",
    "c": "Vasectomy divides it for contraception; sperm granulomas may form at the cut ends."
   },
   "seminal": {
    "n": "Seminal vesicle",
    "l": "Vesicula seminalis",
    "t": "Gland",
    "at": [
     330,
     240
    ],
    "s": "r",
    "d": "A coiled sac behind the bladder whose duct joins the vas to form the ejaculatory duct.",
    "f": "Adds ~60% of semen volume: fructose, prostaglandins and clotting proteins.",
    "c": "Its fructose is the energy source for sperm and a marker of ejaculatory duct patency."
   },
   "prostate": {
    "n": "Prostate",
    "l": "Prostata",
    "t": "Gland",
    "at": [
     300,
     320
    ],
    "s": "l",
    "d": "A walnut-sized fibromuscular gland around the urethra below the bladder, with peripheral, central and transition zones.",
    "f": "Secretes citrate, zinc and PSA that liquefy the seminal coagulum.",
    "c": "Benign hyperplasia of the transition zone obstructs voiding; most cancers arise in the peripheral zone (felt on DRE)."
   },
   "bulbourethral": {
    "n": "Bulbourethral gland",
    "l": "Glandula bulbourethralis",
    "t": "Gland",
    "at": [
     300,
     392
    ],
    "s": "l",
    "d": "Pea-sized glands (of Cowper) in the deep perineal pouch opening into the spongy urethra.",
    "f": "Secrete pre-ejaculate mucus that lubricates and neutralises urethral acidity.",
    "c": "Pre-ejaculate can carry sperm, which is why withdrawal is unreliable contraception."
   },
   "urethra": {
    "n": "Urethra",
    "l": "Urethra masculina",
    "t": "Duct",
    "at": [
     300,
     440
    ],
    "s": "l",
    "d": "Prostatic, membranous and spongy (penile) parts, ~20 cm long.",
    "f": "Common channel for urine and semen.",
    "c": "Strictures commonly follow catheterisation or gonococcal infection at the bulbar urethra."
   },
   "penis": {
    "n": "Penis (corpora)",
    "l": "Penis",
    "t": "Organ",
    "at": [
     420,
     420
    ],
    "s": "r",
    "d": "Two corpora cavernosa and one corpus spongiosum enclosing the urethra, ending in the glans.",
    "f": "Erection by parasympathetic NO-mediated vasodilatation and venous occlusion; ejaculation by sympathetic emission plus somatic expulsion.",
    "c": "PDE5 inhibitors potentiate the NO–cGMP pathway; priapism over 4 hours threatens the corpora."
   },
   "scrotum": {
    "n": "Scrotum & pampiniform plexus",
    "l": "Scrotum",
    "t": "Covering",
    "at": [
     110,
     410
    ],
    "s": "l",
    "d": "Skin and dartos muscle housing the testes, with the pampiniform venous plexus acting as a counter-current cooler.",
    "f": "Keeps spermatogenesis at ~34 °C.",
    "c": "Pampiniform varices (varicocele, usually left) cause a \"bag of worms\" and impaired fertility."
   },
   "bladder": {
    "n": "Bladder",
    "l": "Vesica urinaria",
    "t": "Relation",
    "at": [
     330,
     120
    ],
    "s": "r",
    "d": "Sits above the prostate; the vas and ureters pass behind it.",
    "f": "Urinary reservoir sharing the urethral outlet.",
    "c": "An enlarged prostate elevates its floor, seen as a raised \"J\" of the ureteric orifices at cystoscopy."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"m-t\" cx=\"40%\" cy=\"30%\" r=\"85%\">\n      <stop offset=\"0\" stop-color=\"#c47a8c\"/><stop offset=\"1\" stop-color=\"#8e4256\"/>\n    </radialGradient>\n  </defs>\n  <path class=\"part\" data-id=\"bladder\" d=\"M250 74 C300 62 360 66 396 92 C420 112 424 146 404 168 C372 196 300 200 262 180 C232 164 226 100 250 74 Z\" fill=\"#9fc6d6\" stroke=\"#4c7285\" stroke-width=\"2\"/>\n  <path class=\"part\" data-id=\"scrotum\" d=\"M92 250 C64 280 56 340 72 390 C86 432 128 452 168 440 C204 430 220 392 214 344 C208 300 180 262 146 246 C126 238 106 238 92 250 Z\" fill=\"#d9a98c\" stroke=\"#8a5a44\" stroke-width=\"2\"/>\n  <path class=\"part\" data-id=\"testis\" d=\"M112 282 C140 268 172 280 186 310 C200 342 194 384 170 402 C144 420 110 410 96 380 C82 348 88 296 112 282 Z\" fill=\"url(#m-t)\" stroke=\"#5c2330\" stroke-width=\"2\"/>\n  <g fill=\"none\" stroke=\"#e6b3ba\" stroke-width=\"1.6\" opacity=\".7\">\n    <path d=\"M112 300 C130 292 150 296 162 310 M104 330 C124 322 148 326 162 340 M104 360 C124 354 146 358 160 370 M116 390 C132 386 150 388 162 396\"/>\n  </g>\n  <path class=\"part\" data-id=\"epididymis\" d=\"M166 272 C186 280 196 300 196 326 C196 356 188 384 172 400 C164 392 160 380 164 368 C174 344 176 314 168 292 C164 282 162 276 166 272 Z\" fill=\"#d98a94\" stroke=\"#5c2330\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"vas\" d=\"M178 402 C206 400 224 372 226 330 C228 280 220 220 208 176 C200 146 196 120 200 100 C206 78 224 68 244 74 C262 80 272 98 274 122 C276 152 274 190 272 226\" fill=\"none\" stroke=\"#c98a5c\" stroke-width=\"7\" stroke-linecap=\"round\"/>\n  <path class=\"part\" data-id=\"seminal\" d=\"M300 214 C330 206 356 214 362 234 C368 254 352 270 328 268 C306 266 292 240 300 214 Z\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.6\"/>\n  <path d=\"M312 226 C330 222 344 228 348 240 M308 244 C326 240 340 244 346 252\" fill=\"none\" stroke=\"#e6dcf2\" stroke-width=\"2\" opacity=\".8\"/>\n  <path class=\"part\" data-id=\"prostate\" d=\"M268 292 C300 282 336 288 348 308 C358 328 348 350 322 356 C296 362 268 352 260 332 C254 316 256 300 268 292 Z\" fill=\"#c9a28a\" stroke=\"#7a4637\" stroke-width=\"2\"/>\n  <g class=\"part\" data-id=\"bulbourethral\"><circle cx=\"286\" cy=\"378\" r=\"8\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.4\"/><circle cx=\"318\" cy=\"378\" r=\"8\" fill=\"#8f6fb0\" stroke=\"#54386e\" stroke-width=\"1.4\"/></g>\n  <path class=\"part\" data-id=\"urethra\" d=\"M294 176 L312 176 L312 300 C312 340 308 372 302 396 L288 396 C294 372 296 340 294 300 Z\" fill=\"#9fc6d6\" stroke=\"#4c7285\" stroke-width=\"1.6\"/>\n  <path class=\"part\" data-id=\"penis\" d=\"M330 396 C372 396 416 404 452 418 C480 430 494 444 492 452 C470 458 420 452 380 442 C352 434 334 420 330 408 Z\" fill=\"#d9a98c\" stroke=\"#8a5a44\" stroke-width=\"2\"/>\n  <path d=\"M340 414 C380 420 424 430 458 440\" fill=\"none\" stroke=\"#9fc6d6\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n  <g fill=\"none\" stroke=\"#f7e9a0\" stroke-width=\"2\" opacity=\".7\">\n    <path d=\"M150 340 C160 320 168 300 172 282 M300 250 C300 268 300 284 300 296\"/>\n  </g>\n  <text x=\"404\" y=\"120\" class=\"cap\" style=\"fill:#5c8090\">bladder</text>\n  <text x=\"628\" y=\"456\" class=\"cap\" text-anchor=\"end\">spongy urethra within corpus spongiosum</text>",
  "anims": [
   {
    "id": "transport",
    "label": "Sperm transport",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"4\" fill=\"#f2e3c8\"><animateMotion dur=\"6s\" repeatCount=\"indefinite\" path=\"M150 350 C168 330 178 300 178 402 C206 400 224 372 226 330 C228 280 220 220 208 176 C200 146 196 120 200 100 C206 78 224 68 244 74 C262 80 272 98 274 122 C276 152 274 190 272 226 C276 250 288 262 300 268 C300 284 300 300 300 316 C300 350 300 380 300 400 C330 402 380 414 440 434\"/></circle>\n        <circle r=\"4\" fill=\"#f2e3c8\"><animateMotion dur=\"6s\" begin=\"-3s\" repeatCount=\"indefinite\" path=\"M150 350 C168 330 178 300 178 402 C206 400 224 372 226 330 C228 280 220 220 208 176 C200 146 196 120 200 100 C206 78 224 68 244 74 C262 80 272 98 274 122 C276 152 274 190 272 226 C276 250 288 262 300 268 C300 284 300 300 300 316 C300 350 300 380 300 400 C330 402 380 414 440 434\"/></circle>\n      </g>",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Sperm mature and are stored in the…",
    "opts": [
     "Seminiferous tubules",
     "Epididymis",
     "Seminal vesicle",
     "Prostate"
    ],
    "a": 1,
    "why": "Sperm leave the testis immotile; passage through the ~6 m epididymal duct confers motility and fertilising capacity, and the tail stores them."
   },
   {
    "q": "Testosterone is produced by…",
    "opts": [
     "Sertoli cells",
     "Leydig (interstitial) cells",
     "Germ cells",
     "Prostate epithelium"
    ],
    "a": 1,
    "why": "LH stimulates Leydig cells between tubules to make testosterone; Sertoli cells support spermatogenesis and make inhibin and androgen-binding protein."
   },
   {
    "q": "Ejaculatory ducts are formed by the union of…",
    "opts": [
     "Vas deferens and seminal vesicle duct",
     "Vas deferens and urethra",
     "Two vasa deferentia",
     "Seminal vesicle and prostate ducts"
    ],
    "a": 0,
    "why": "Each vas joins its seminal vesicle duct to form an ejaculatory duct that traverses the prostate to open at the verumontanum."
   }
  ],
  "related": [
   "maletestis",
   "maleprostate",
   "malepelvis",
   "bladder"
  ],
  "photo": {
   "file": "male.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "bladder": [
     513,
     244
    ],
    "testis": [
     425,
     778
    ],
    "epididymis": [
     463,
     733
    ],
    "vas": [
     431,
     533
    ],
    "seminal": [
     600,
     300
    ],
    "prostate": [
     538,
     400
    ],
    "bulbourethral": [
     563,
     478
    ],
    "urethra": [
     325,
     711
    ],
    "penis": [
     300,
     578
    ],
    "scrotum": [
     438,
     911
    ]
   }
  }
 },
 "female": {
  "title": "Female reproductive system",
  "latin": "Organa genitalia feminina",
  "system": "female",
  "region": "Pelvis: uterus, tubes, ovaries, vagina",
  "size": "Uterus ≈ 7.5 × 5 × 2.5 cm (nulliparous) · ovary ≈ 3 × 2 cm",
  "blood": "Uterine + ovarian arteries (internal iliac & aorta)",
  "nerve": "Uterovaginal plexus (T12–L2 sympathetic, S2–S4 parasympathetic)",
  "blurb": "A cyclic system: ovulation, fertilisation in the tube, implantation in the endometrium.",
  "summary": "Each cycle, FSH recruits a follicle that secretes oestradiol and builds the endometrium; the LH surge triggers ovulation at a variable cycle day (often about 14 days before the next period), and the corpus luteum then secretes progesterone to make the endometrium secretory. If fertilisation does not occur the corpus luteum regresses, progesterone falls and menstruation follows. Fertilisation normally happens in the ampulla of the uterine tube, and the embryo reaches the uterus after 3–4 days. The cervix, with its mucus plug, and the vaginal microbiome form the defence against ascending infection.",
  "vb": [
   640,
   470
  ],
  "legend": [
   [
    "#b0647a",
    "Uterus"
   ],
   [
    "#d98a94",
    "Tubes & ovaries"
   ],
   [
    "#e8cf9c",
    "Endometrium"
   ],
   [
    "#8f6fb0",
    "Follicles"
   ]
  ],
  "parts": {
   "fundus": {
    "n": "Fundus & body",
    "l": "Fundus et corpus uteri",
    "t": "Region",
    "at": [
     320,
     140
    ],
    "s": "r",
    "d": "The domed fundus above the tubal openings and the tapering body, of smooth muscle (myometrium) lined by endometrium.",
    "f": "Houses and nourishes a pregnancy; the myometrium generates labour.",
    "c": "Fibroids (leiomyomas) arise in the myometrium and cause heavy bleeding and pressure symptoms."
   },
   "endometrium": {
    "n": "Endometrium",
    "l": "Endometrium",
    "t": "Lining",
    "at": [
     320,
     200
    ],
    "s": "l",
    "d": "A functional layer of glands and stroma that proliferates under oestrogen and becomes secretory under progesterone, plus a permanent basal layer.",
    "f": "Site of implantation; sheds each cycle if no embryo implants.",
    "c": "Ectopic endometrium (endometriosis) causes cyclical pain and infertility; unopposed oestrogen drives hyperplasia and carcinoma."
   },
   "cervix": {
    "n": "Cervix",
    "l": "Cervix uteri",
    "t": "Region",
    "at": [
     320,
     300
    ],
    "s": "l",
    "d": "The fibrous neck projecting into the vagina, with an endocervical canal of mucus-secreting columnar epithelium and a squamous ectocervix.",
    "f": "Keeps pregnancy in and microbes out; dilates 10 cm in labour.",
    "c": "The squamocolumnar junction is where cervical cancer begins — the target of smear tests and HPV vaccination."
   },
   "vagina": {
    "n": "Vagina",
    "l": "Vagina",
    "t": "Duct",
    "at": [
     320,
     392
    ],
    "s": "l",
    "d": "A fibromuscular canal lined by glycogen-rich stratified squamous epithelium, angled back over the levator plate.",
    "f": "Birth canal, menstrual outlet and copulatory organ; lactobacilli keep pH ~4.",
    "c": "The acidic pH protects against infection; antibiotics and oestrogen loss can allow candidiasis."
   },
   "tube": {
    "n": "Uterine tube",
    "l": "Tuba uterina",
    "t": "Duct",
    "at": [
     180,
     120
    ],
    "s": "l",
    "d": "A 10 cm ciliated duct with interstitial, isthmic, ampullary and infundibular parts.",
    "f": "Captures the oocyte, is the site of fertilisation (ampulla) and transports the embryo by ciliary beat and peristalsis.",
    "c": "Damage from infection (PID) or surgery is the main cause of ectopic pregnancy and tubal infertility."
   },
   "fimbriae": {
    "n": "Fimbriae",
    "l": "Fimbriae tubae",
    "t": "Duct",
    "at": [
     110,
     150
    ],
    "s": "l",
    "d": "Finger-like projections around the tubal opening, one (fimbria ovarica) attached to the ovary.",
    "f": "Sweep the oocyte into the tube at ovulation.",
    "c": "Fimbrial epithelium is now recognised as the origin of many \"ovarian\" high-grade serous cancers."
   },
   "ovary": {
    "n": "Ovary",
    "l": "Ovarium",
    "t": "Gonad",
    "at": [
     130,
     230
    ],
    "s": "l",
    "d": "An almond of stroma holding the follicle pool, covered by germinal epithelium and suspended by the mesovarium.",
    "f": "Ovulation and secretion of oestradiol, progesterone and inhibin.",
    "c": "Polycystic ovaries show peripheral follicles with anovulation; epithelial tumours are the silent gynaecological cancer."
   },
   "follicle": {
    "n": "Follicles & corpus luteum",
    "l": "Folliculi ovarici",
    "t": "Functional unit",
    "at": [
     470,
     230
    ],
    "s": "r",
    "d": "Primordial → primary → antral → dominant (Graafian) follicle; after ovulation the remnant becomes the progesterone-secreting corpus luteum, then corpus albicans.",
    "f": "Produces the oocyte and the cycle's hormones.",
    "c": "A follicle that fails to rupture forms a follicular cyst; a persistent luteum forms a corpus luteum cyst."
   },
   "ligament": {
    "n": "Broad & suspensory ligaments",
    "l": "Ligamentum latum",
    "t": "Support",
    "at": [
     470,
     150
    ],
    "s": "r",
    "d": "Peritoneal folds (broad, round, ovarian, suspensory) carrying the tubes, vessels and ureters.",
    "f": "Suspend the uterus and convey its vessels.",
    "c": "The ureter runs under the uterine artery (\"water under the bridge\") — the classic injury point in hysterectomy."
   }
  },
  "art": "\n  <defs>\n    <radialGradient id=\"f-u\" cx=\"42%\" cy=\"28%\" r=\"85%\">\n      <stop offset=\"0\" stop-color=\"#c47a8c\"/><stop offset=\"1\" stop-color=\"#8e4256\"/>\n    </radialGradient>\n  </defs>\n  <g class=\"part\" data-id=\"ligament\" fill=\"#e6cdd4\" stroke=\"#8a5a6a\" stroke-width=\"1.6\" opacity=\".9\">\n    <path d=\"M232 150 C200 160 170 180 150 210 C170 240 200 260 232 268 Z\"/>\n    <path d=\"M408 150 C440 160 470 180 490 210 C470 240 440 260 408 268 Z\"/>\n  </g>\n  <g fill=\"none\" stroke=\"#c0453f\" stroke-width=\"3.4\" opacity=\".8\">\n    <path d=\"M470 96 C466 140 458 180 444 214 M170 96 C174 140 182 180 196 214\"/>\n  </g>\n  <path class=\"part\" data-id=\"tube\" d=\"M246 128 C210 108 172 104 142 118 C124 126 116 140 120 152 M394 128 C430 108 468 104 498 118 C516 126 524 140 520 152\" fill=\"none\" stroke=\"#d98a94\" stroke-width=\"13\" stroke-linecap=\"round\"/>\n  <g class=\"part\" data-id=\"fimbriae\" fill=\"#d98a94\" stroke=\"#8e4256\" stroke-width=\"1.4\">\n    <path d=\"M120 150 C110 158 104 168 104 178 C112 176 120 170 126 162 Z\"/>\n    <path d=\"M124 156 C118 168 116 180 118 190 C126 184 130 174 132 164 Z\"/>\n    <path d=\"M130 158 C128 172 130 184 136 194 C142 186 142 174 140 164 Z\"/>\n    <path d=\"M520 150 C530 158 536 168 536 178 C528 176 520 170 514 162 Z\"/>\n    <path d=\"M516 156 C522 168 524 180 522 190 C514 184 510 174 508 164 Z\"/>\n    <path d=\"M510 158 C512 172 510 184 504 194 C498 186 498 174 500 164 Z\"/>\n  </g>\n  <g class=\"part\" data-id=\"ovary\">\n    <ellipse cx=\"132\" cy=\"222\" rx=\"34\" ry=\"44\" fill=\"url(#f-u)\" stroke=\"#5c2330\" stroke-width=\"2\"/>\n    <ellipse cx=\"508\" cy=\"222\" rx=\"34\" ry=\"44\" fill=\"url(#f-u)\" stroke=\"#5c2330\" stroke-width=\"2\"/>\n  </g>\n  <g class=\"part\" data-id=\"follicle\">\n    <circle cx=\"124\" cy=\"204\" r=\"7\" fill=\"#cbb8dd\" stroke=\"#54386e\" stroke-width=\"1.3\"/>\n    <circle cx=\"140\" cy=\"222\" r=\"10\" fill=\"#cbb8dd\" stroke=\"#54386e\" stroke-width=\"1.3\"/>\n    <circle cx=\"140\" cy=\"222\" r=\"4\" fill=\"#e6dcf2\"/>\n    <circle cx=\"126\" cy=\"244\" r=\"6\" fill=\"#cbb8dd\" stroke=\"#54386e\" stroke-width=\"1.3\"/>\n    <path d=\"M500 208 C514 202 526 210 526 224 C526 238 512 246 500 240 C490 234 490 214 500 208 Z\" fill=\"#e8b84a\" stroke=\"#8a6a12\" stroke-width=\"1.4\"/>\n    <circle cx=\"512\" cy=\"248\" r=\"5\" fill=\"#f0e2c0\" stroke=\"#8a6a12\" stroke-width=\"1.2\"/>\n    <circle cx=\"502\" cy=\"200\" r=\"4\" fill=\"#cbb8dd\" stroke=\"#54386e\" stroke-width=\"1.2\"/>\n  </g>\n  <path class=\"part\" data-id=\"fundus\" d=\"M320 96 C372 96 410 122 414 168 C418 214 396 258 366 288 C346 306 332 314 320 314 C308 314 294 306 274 288 C244 258 222 214 226 168 C230 122 268 96 320 96 Z\" fill=\"url(#f-u)\" stroke=\"#5c2330\" stroke-width=\"2.4\"/>\n  <path class=\"part\" data-id=\"endometrium\" d=\"M320 128 C356 128 382 148 384 180 C386 214 368 250 344 274 C334 284 326 290 320 290 C314 290 306 284 296 274 C272 250 254 214 256 180 C258 148 284 128 320 128 Z\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"1.8\"/>\n  <g fill=\"none\" stroke=\"#c9a86e\" stroke-width=\"2\" opacity=\".8\">\n    <path d=\"M284 160 C282 180 286 200 294 218 M320 152 C320 176 320 200 320 222 M356 160 C358 180 354 200 346 218\"/>\n  </g>\n  <path class=\"part\" data-id=\"cervix\" d=\"M296 296 C306 306 334 306 344 296 C352 316 352 340 344 356 C332 366 308 366 296 356 C288 340 288 316 296 296 Z\" fill=\"#c47a8c\" stroke=\"#5c2330\" stroke-width=\"2\"/>\n  <path d=\"M316 306 L324 306 L324 352 L316 352 Z\" fill=\"#e8cf9c\" stroke=\"#8a6a2e\" stroke-width=\"1.2\"/>\n  <path class=\"part\" data-id=\"vagina\" d=\"M300 358 C308 366 332 366 340 358 C348 380 348 408 340 428 C328 438 312 438 300 428 C292 408 292 380 300 358 Z\" fill=\"#d9a98c\" stroke=\"#8a5a44\" stroke-width=\"2\"/>\n  <g fill=\"none\" stroke=\"#b3765a\" stroke-width=\"2\" opacity=\".7\">\n    <path d=\"M302 376 h36 M300 394 h40 M302 412 h36\"/>\n  </g>\n  <text x=\"404\" y=\"208\" class=\"cap\">corpus luteum</text>\n  <text x=\"60\" y=\"290\" class=\"cap\">antral follicle</text>\n  <text x=\"628\" y=\"440\" class=\"cap\" text-anchor=\"end\">uterine artery crosses the ureter</text>\n  <g fill=\"none\" stroke=\"#3f5f9c\" stroke-width=\"3\" opacity=\".8\"><path d=\"M470 420 C440 400 414 380 396 356\"/></g>",
  "anims": [
   {
    "id": "cycle",
    "label": "Ovulation & transport",
    "layer": "\n      <g class=\"flow-layer\">\n        <circle r=\"5\" fill=\"#f2d179\"><animateMotion dur=\"5s\" repeatCount=\"indefinite\" path=\"M132 210 C124 190 120 170 122 154 C132 140 150 128 172 122 C200 114 226 118 246 128 C270 140 292 160 306 186 C314 204 318 224 320 246\"/></circle>\n        <circle r=\"4\" fill=\"#cbb8dd\"><animateMotion dur=\"5s\" begin=\"-2.5s\" repeatCount=\"indefinite\" path=\"M508 210 C516 190 520 170 518 154 C508 140 490 128 468 122 C440 114 414 118 394 128 C370 140 348 160 334 186 C326 204 322 224 320 246\"/></circle>\n      </g>",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Fertilisation normally occurs in the…",
    "opts": [
     "Uterine cavity",
     "Ampulla of the uterine tube",
     "Ovary",
     "Cervical canal"
    ],
    "a": 1,
    "why": "The ampulla is where the oocyte meets sperm; the embryo then travels 3–4 days to the uterus for implantation."
   },
   {
    "q": "The hormone that makes the endometrium secretory after ovulation is…",
    "opts": [
     "Oestradiol",
     "Progesterone",
     "FSH",
     "LH"
    ],
    "a": 1,
    "why": "The corpus luteum secretes progesterone, converting the proliferative endometrium into a secretory one ready for implantation."
   },
   {
    "q": "The ureter is most at risk during hysterectomy where it…",
    "opts": [
     "Crosses under the uterine artery",
     "Runs in the round ligament",
     "Enters the broad ligament",
     "Passes over the ovarian vessels"
    ],
    "a": 0,
    "why": "\"Water under the bridge\": the ureter passes beneath the uterine artery at the level of the internal os, the commonest site of surgical injury."
   }
  ],
  "related": [
   "gynuterus",
   "gyncervix",
   "gynadnexa",
   "gynvagina",
   "gynvulva",
   "gynsupport",
   "femalepelvis",
   "breast"
  ],
  "photo": {
   "file": "female.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "fundus": [
     500,
     156
    ],
    "endometrium": [
     500,
     333
    ],
    "cervix": [
     500,
     722
    ],
    "vagina": [
     500,
     911
    ],
    "tube": [
     250,
     222
    ],
    "fimbriae": [
     156,
     422
    ],
    "ovary": [
     231,
     422
    ],
    "follicle": [
     213,
     400
    ],
    "ligament": [
     313,
     556
    ]
   }
  }
 },
 "malebody": {
  "title": "Male body — anterior",
  "latin": "Corpus masculinum",
  "system": "male",
  "region": "Whole body — anterior view",
  "size": "Reference adult model",
  "blood": "Systemic + pulmonary circuits",
  "nerve": "Central + peripheral nervous systems",
  "blurb": "A glass-body view of the male: every major organ in place, from brain to testes, with the reproductive tract in the pelvis.",
  "summary": "Use this page as an orientation map: click any glowing organ to jump into its full entry with the realistic render, labelled schematic and quiz.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ],
   [
    "#5f7340",
    "Endocrine"
   ],
   [
    "#3f7f9c",
    "Respiratory"
   ],
   [
    "#c0453f",
    "Circulatory"
   ],
   [
    "#a8442f",
    "Digestive"
   ]
  ],
  "parts": {
   "brain": {
    "n": "Brain",
    "l": "Encephalon",
    "t": "Nervous",
    "d": "Control centre housed in the skull, glowing through the translucent scalp.",
    "f": "Integrates sensation, movement, thought, memory and autonomic drive.",
    "c": "Stroke risk rises with age — remember FAST: face, arms, speech, time.",
    "at": [
     800,
     90
    ],
    "s": "r"
   },
   "thyroid": {
    "n": "Thyroid gland",
    "l": "Glandula thyroidea",
    "t": "Endocrine",
    "d": "Butterfly-shaped gland on the front of the neck.",
    "f": "Sets metabolic rate via T3/T4 under TSH control.",
    "c": "Hypothyroidism causes fatigue, weight gain and cold intolerance.",
    "at": [
     800,
     220.5
    ],
    "s": "r"
   },
   "lungs": {
    "n": "Lungs",
    "l": "Pulmones",
    "t": "Respiratory",
    "d": "Paired thoracic organs flanking the heart.",
    "f": "Gas exchange across ~300 million alveoli.",
    "c": "Smoking destroys alveolar walls → emphysema.",
    "at": [
     760,
     299.7
    ],
    "s": "l"
   },
   "heart": {
    "n": "Heart",
    "l": "Cor",
    "t": "Circulatory",
    "d": "Muscular pump in the mediastinum, a little left of midline.",
    "f": "Drives about 5 L of blood per minute through two circuits.",
    "c": "Coronary blockage causes myocardial infarction.",
    "at": [
     820.8000000000001,
     350.1
    ],
    "s": "r"
   },
   "liver": {
    "n": "Liver",
    "l": "Hepar",
    "t": "Digestive",
    "d": "Largest internal organ, right upper quadrant.",
    "f": "Metabolism, detoxification, bile, plasma proteins.",
    "c": "Cirrhosis scars the parenchyma (alcohol, hepatitis).",
    "at": [
     760,
     410.40000000000003
    ],
    "s": "l"
   },
   "stomach": {
    "n": "Stomach",
    "l": "Gaster",
    "t": "Digestive",
    "d": "J-shaped reservoir under the diaphragm, left side.",
    "f": "Acid–pepsin digestion; intrinsic factor for B12.",
    "c": "H. pylori is the commonest cause of peptic ulcer.",
    "at": [
     830.4000000000001,
     430.2
    ],
    "s": "r"
   },
   "intestines": {
    "n": "Intestines",
    "l": "Intestinum",
    "t": "Digestive",
    "d": "Small and large intestine coiling through the abdomen.",
    "f": "Absorbs nutrients, water, electrolytes; hosts the microbiome.",
    "c": "Obstruction and appendicitis present as acute pain.",
    "at": [
     800,
     530.1
    ],
    "s": "r"
   },
   "bladder": {
    "n": "Urinary bladder",
    "l": "Vesica urinaria",
    "t": "Urinary",
    "d": "Pelvic reservoir behind the pubic symphysis.",
    "f": "Stores urine; stretch triggers the micturition reflex.",
    "c": "Frequency + dysuria usually mean infection.",
    "at": [
     800,
     630
    ],
    "s": "r"
   },
   "penis": {
    "n": "Penis",
    "l": "Penis",
    "t": "Male reproductive",
    "d": "External organ of urination and copulation.",
    "f": "Erectile tissue engorges; delivers semen.",
    "c": "Erectile dysfunction is an early vascular warning sign.",
    "at": [
     800,
     700.2
    ],
    "s": "r"
   },
   "testes": {
    "n": "Testes",
    "l": "Testes",
    "t": "Male reproductive",
    "d": "Paired gonads in the scrotum, outside the body cavity.",
    "f": "Spermatogenesis and testosterone production.",
    "c": "Undescended testis raises malignancy risk.",
    "at": [
     809.6,
     720
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"none\" stroke=\"#8fd8c8\" stroke-width=\"1\" opacity=\".3\"/></g><ellipse class=\"part throb\" data-id=\"brain\" cx=\"800\" cy=\"90\" rx=\"62\" ry=\"46\" fill=\"#6d4a86\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"thyroid\" cx=\"800\" cy=\"220.5\" rx=\"62\" ry=\"46\" fill=\"#5f7340\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lungs\" cx=\"760\" cy=\"299.7\" rx=\"62\" ry=\"46\" fill=\"#3f7f9c\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"heart\" cx=\"820.8000000000001\" cy=\"350.1\" rx=\"62\" ry=\"46\" fill=\"#c0453f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"liver\" cx=\"760\" cy=\"410.40000000000003\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"stomach\" cx=\"830.4000000000001\" cy=\"430.2\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"intestines\" cx=\"800\" cy=\"530.1\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"bladder\" cx=\"800\" cy=\"630\" rx=\"62\" ry=\"46\" fill=\"#a9762a\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"penis\" cx=\"800\" cy=\"700.2\" rx=\"62\" ry=\"46\" fill=\"#3f5f9c\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"testes\" cx=\"809.6\" cy=\"720\" rx=\"62\" ry=\"46\" fill=\"#3f5f9c\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Organ pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which structure sits lowest in the male pelvic cavity?",
    "opts": [
     "Stomach",
     "Urinary bladder",
     "Testes",
     "Thyroid gland"
    ],
    "a": 2,
    "why": "The testes descend into the scrotum, below the bladder, to stay about 2 °C cooler for spermatogenesis."
   },
   {
    "q": "The large glowing organ in the right upper quadrant is the…",
    "opts": [
     "Liver",
     "Spleen",
     "Pancreas",
     "Stomach"
    ],
    "a": 0,
    "why": "The liver fills the right hypochondrium; the stomach sits to its left under the diaphragm."
   },
   {
    "q": "Sperm are produced in the…",
    "opts": [
     "Seminal vesicles",
     "Testes",
     "Prostate",
     "Bulbourethral glands"
    ],
    "a": 1,
    "why": "Spermatogenesis runs in the seminiferous tubules; the accessory glands only add seminal fluid."
   }
  ],
  "related": [
   "male",
   "kidney",
   "heart"
  ],
  "photo": {
   "file": "malebody.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "brain": [
     500,
     100
    ],
    "thyroid": [
     500,
     245
    ],
    "lungs": [
     475,
     333
    ],
    "heart": [
     513,
     389
    ],
    "liver": [
     475,
     456
    ],
    "stomach": [
     519,
     478
    ],
    "intestines": [
     500,
     589
    ],
    "bladder": [
     500,
     700
    ],
    "penis": [
     500,
     778
    ],
    "testes": [
     506,
     800
    ]
   }
  }
 },
 "femalebody": {
  "title": "Female body — anterior",
  "latin": "Corpus femininum",
  "system": "female",
  "region": "Whole body — anterior view",
  "size": "Reference adult model",
  "blood": "Systemic + pulmonary circuits",
  "nerve": "Central + peripheral nervous systems",
  "blurb": "A glass-body view of the female: major organs in place, with breasts, uterus and ovaries completing the picture.",
  "summary": "Use this page as an orientation map: click any glowing organ to jump into its full entry with the realistic render, labelled schematic and quiz.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ],
   [
    "#5f7340",
    "Endocrine"
   ],
   [
    "#3f7f9c",
    "Respiratory"
   ],
   [
    "#c0453f",
    "Circulatory"
   ],
   [
    "#a8442f",
    "Digestive"
   ]
  ],
  "parts": {
   "brain": {
    "n": "Brain",
    "l": "Encephalon",
    "t": "Nervous",
    "d": "Control centre housed in the skull, glowing through the translucent scalp.",
    "f": "Integrates sensation, movement, thought, memory and autonomic drive.",
    "c": "Stroke risk rises with age — remember FAST: face, arms, speech, time.",
    "at": [
     800,
     90
    ],
    "s": "r"
   },
   "thyroid": {
    "n": "Thyroid gland",
    "l": "Glandula thyroidea",
    "t": "Endocrine",
    "d": "Butterfly-shaped gland on the front of the neck.",
    "f": "Sets metabolic rate via T3/T4 under TSH control.",
    "c": "Hypothyroidism causes fatigue, weight gain and cold intolerance.",
    "at": [
     800,
     220.5
    ],
    "s": "r"
   },
   "lungs": {
    "n": "Lungs",
    "l": "Pulmones",
    "t": "Respiratory",
    "d": "Paired thoracic organs flanking the heart.",
    "f": "Gas exchange across ~300 million alveoli.",
    "c": "Smoking destroys alveolar walls → emphysema.",
    "at": [
     760,
     299.7
    ],
    "s": "l"
   },
   "heart": {
    "n": "Heart",
    "l": "Cor",
    "t": "Circulatory",
    "d": "Muscular pump in the mediastinum, a little left of midline.",
    "f": "Drives about 5 L of blood per minute through two circuits.",
    "c": "Coronary blockage causes myocardial infarction.",
    "at": [
     820.8000000000001,
     350.1
    ],
    "s": "r"
   },
   "liver": {
    "n": "Liver",
    "l": "Hepar",
    "t": "Digestive",
    "d": "Largest internal organ, right upper quadrant.",
    "f": "Metabolism, detoxification, bile, plasma proteins.",
    "c": "Cirrhosis scars the parenchyma (alcohol, hepatitis).",
    "at": [
     760,
     410.40000000000003
    ],
    "s": "l"
   },
   "stomach": {
    "n": "Stomach",
    "l": "Gaster",
    "t": "Digestive",
    "d": "J-shaped reservoir under the diaphragm, left side.",
    "f": "Acid–pepsin digestion; intrinsic factor for B12.",
    "c": "H. pylori is the commonest cause of peptic ulcer.",
    "at": [
     830.4000000000001,
     430.2
    ],
    "s": "r"
   },
   "intestines": {
    "n": "Intestines",
    "l": "Intestinum",
    "t": "Digestive",
    "d": "Small and large intestine coiling through the abdomen.",
    "f": "Absorbs nutrients, water, electrolytes; hosts the microbiome.",
    "c": "Obstruction and appendicitis present as acute pain.",
    "at": [
     800,
     530.1
    ],
    "s": "r"
   },
   "bladder": {
    "n": "Urinary bladder",
    "l": "Vesica urinaria",
    "t": "Urinary",
    "d": "Pelvic reservoir behind the pubic symphysis.",
    "f": "Stores urine; stretch triggers the micturition reflex.",
    "c": "Frequency + dysuria usually mean infection.",
    "at": [
     800,
     630
    ],
    "s": "r"
   },
   "breast": {
    "n": "Breast",
    "l": "Mamma",
    "t": "Female reproductive",
    "d": "Glandular tissue over the pectoral muscles.",
    "f": "Milk production in lobules under prolactin control.",
    "c": "New lump + skin change needs imaging.",
    "at": [
     760,
     274.5
    ],
    "s": "l"
   },
   "uterus": {
    "n": "Uterus",
    "l": "Uterus",
    "t": "Female reproductive",
    "d": "Muscular pear-shaped organ of the pelvis.",
    "f": "Houses and nourishes a developing fetus; menstrual cycle.",
    "c": "Fibroids cause heavy bleeding — benign but common.",
    "at": [
     800,
     454.5
    ],
    "s": "r"
   },
   "ovaries": {
    "n": "Ovaries",
    "l": "Ovaria",
    "t": "Female reproductive",
    "d": "Paired gonads either side of the uterus.",
    "f": "Ovulation; oestrogen and progesterone secretion.",
    "c": "Persistent bloating — rule out ovarian cancer.",
    "at": [
     760,
     450
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"none\" stroke=\"#8fd8c8\" stroke-width=\"1\" opacity=\".3\"/></g><ellipse class=\"part throb\" data-id=\"brain\" cx=\"800\" cy=\"90\" rx=\"62\" ry=\"46\" fill=\"#6d4a86\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"thyroid\" cx=\"800\" cy=\"220.5\" rx=\"62\" ry=\"46\" fill=\"#5f7340\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lungs\" cx=\"760\" cy=\"299.7\" rx=\"62\" ry=\"46\" fill=\"#3f7f9c\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"heart\" cx=\"820.8000000000001\" cy=\"350.1\" rx=\"62\" ry=\"46\" fill=\"#c0453f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"liver\" cx=\"760\" cy=\"410.40000000000003\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"stomach\" cx=\"830.4000000000001\" cy=\"430.2\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"intestines\" cx=\"800\" cy=\"530.1\" rx=\"62\" ry=\"46\" fill=\"#a8442f\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"bladder\" cx=\"800\" cy=\"630\" rx=\"62\" ry=\"46\" fill=\"#a9762a\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"breast\" cx=\"760\" cy=\"274.5\" rx=\"62\" ry=\"46\" fill=\"#a34a6a\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"uterus\" cx=\"800\" cy=\"454.5\" rx=\"62\" ry=\"46\" fill=\"#a34a6a\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ovaries\" cx=\"760\" cy=\"450\" rx=\"62\" ry=\"46\" fill=\"#a34a6a\" fill-opacity=\".72\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Organ pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which organ sheds its lining each menstrual cycle?",
    "opts": [
     "Vagina",
     "Uterus",
     "Ovary",
     "Cervix"
    ],
    "a": 1,
    "why": "The endometrium of the uterus builds up and sheds each cycle when fertilisation does not occur."
   },
   {
    "q": "Ovulation releases an oocyte from the…",
    "opts": [
     "Uterus",
     "Vagina",
     "Ovary",
     "Breast"
    ],
    "a": 2,
    "why": "A mature follicle ruptures at the ovary around day 14; fimbriae sweep the oocyte into the tube."
   },
   {
    "q": "Milk is produced by…",
    "opts": [
     "Nipple ducts",
     "Breast lobules",
     "Pectoral muscles",
     "Sebaceous glands"
    ],
    "a": 1,
    "why": "Secretory lobules make the milk; ducts only carry it to the nipple."
   }
  ],
  "related": [
   "female",
   "bladder",
   "heart"
  ],
  "photo": {
   "file": "femalebody.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "brain": [
     500,
     100
    ],
    "thyroid": [
     500,
     245
    ],
    "lungs": [
     475,
     333
    ],
    "heart": [
     513,
     389
    ],
    "liver": [
     475,
     456
    ],
    "stomach": [
     519,
     478
    ],
    "intestines": [
     500,
     589
    ],
    "bladder": [
     500,
     700
    ],
    "breast": [
     475,
     305
    ],
    "uterus": [
     500,
     505
    ],
    "ovaries": [
     475,
     500
    ]
   }
  }
 },
 "nervous": {
  "title": "Nervous system — overview",
  "latin": "Systema nervosum",
  "system": "nervous",
  "region": "Whole body: central + peripheral",
  "size": "≈ 86 billion neurons",
  "blood": "Internal carotid + vertebral arteries",
  "nerve": "Itself — plus autonomic control of every organ",
  "blurb": "One continuous network: the brain and spinal cord compute, and 43 pairs of peripheral nerves carry orders out and reports back.",
  "summary": "The master page of control. Follow the cord down, watch plexuses redistribute fibres to limbs, and see where the autonomic chain hugs the spine.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "brain": {
    "n": "Brain",
    "l": "Encephalon",
    "t": "Central",
    "d": "Cerebrum, cerebellum and brainstem inside the cranial vault.",
    "f": "Integration, consciousness, motor planning and autonomic control.",
    "c": "Head injury scales from concussion to diffuse axonal injury.",
    "at": [
     800,
     79.2
    ],
    "s": "r"
   },
   "cerebellum": {
    "n": "Cerebellum",
    "l": "Cerebellum",
    "t": "Central",
    "d": "Hindbrain structure behind the brainstem.",
    "f": "Coordination, balance and motor learning.",
    "c": "Lesion → intention tremor and ataxia on the same side.",
    "at": [
     851.2,
     106.2
    ],
    "s": "r"
   },
   "brainstem": {
    "n": "Brainstem",
    "l": "Truncus encephali",
    "t": "Central",
    "d": "Midbrain, pons and medulla connecting cord to brain.",
    "f": "Vital centres: respiration, heart rate, consciousness.",
    "c": "Brainstem death is legal death in most jurisdictions.",
    "at": [
     800,
     127.8
    ],
    "s": "r"
   },
   "spinalcord": {
    "n": "Spinal cord",
    "l": "Medulla spinalis",
    "t": "Central",
    "d": "31-segment cord from foramen magnum to L1–L2.",
    "f": "Two-way tracts plus segmental reflex circuits.",
    "c": "Cord transection level predicts deficit pattern precisely.",
    "at": [
     800,
     270
    ],
    "s": "r"
   },
   "cervical": {
    "n": "Cervical plexus",
    "l": "Plexus cervicalis (C1–C4)",
    "t": "Peripheral",
    "d": "Nerve network in the posterior triangle of the neck.",
    "f": "Neck muscles and skin; phrenic nerve to diaphragm.",
    "c": "C3-4-5 keeps the diaphragm alive — injury above C4 stops breathing.",
    "at": [
     748.8000000000001,
     172.8
    ],
    "s": "l"
   },
   "brachial": {
    "n": "Brachial plexus",
    "l": "Plexus brachialis (C5–T1)",
    "t": "Peripheral",
    "d": "Roots-trunks-divisions-cords-branches behind the clavicle.",
    "f": "All motor and sensory supply of the upper limb.",
    "c": "Erb's palsy (C5-6) from birth traction: waiter's-tip hand.",
    "at": [
     688,
     217.8
    ],
    "s": "l"
   },
   "intercostal": {
    "n": "Intercostal nerves",
    "l": "Nn. intercostales (T1–T11)",
    "t": "Peripheral",
    "d": "Ventral rami running in subcostal grooves.",
    "f": "Chest-wall muscles and segmental skin band.",
    "c": "Shingles follows one intercostal dermatome.",
    "at": [
     748.8000000000001,
     298.8
    ],
    "s": "l"
   },
   "lumbar": {
    "n": "Lumbar plexus",
    "l": "Plexus lumbalis (L1–L4)",
    "t": "Peripheral",
    "d": "Network within psoas major.",
    "f": "Anterior thigh and medial leg supply.",
    "c": "Femoral nerve block anaesthetises the anterior thigh.",
    "at": [
     764.8000000000001,
     423
    ],
    "s": "l"
   },
   "sacral": {
    "n": "Sacral plexus",
    "l": "Plexus sacralis (L4–S4)",
    "t": "Peripheral",
    "d": "Plexus on the piriformis wall of the pelvis.",
    "f": "Gluteal region, perineum and the sciatic nerve.",
    "c": "Sciatica radiates along its branches down the leg.",
    "at": [
     800,
     486
    ],
    "s": "r"
   },
   "sciatic": {
    "n": "Sciatic nerve",
    "l": "N. ischiadicus",
    "t": "Peripheral",
    "d": "Largest nerve in the body (L4–S3).",
    "f": "Hamstrings and all muscles below the knee.",
    "c": "Wrong gluteal injection site can injure it — use upper outer quadrant.",
    "at": [
     732.8000000000001,
     612
    ],
    "s": "l"
   },
   "femoral": {
    "n": "Femoral nerve",
    "l": "N. femoralis",
    "t": "Peripheral",
    "d": "L2–L4 branch under the inguinal ligament.",
    "f": "Quadriceps power and anterior-thigh sensation.",
    "c": "Loss → buckling knee and absent knee jerk.",
    "at": [
     700.8000000000001,
     540
    ],
    "s": "l"
   },
   "sympathetic": {
    "n": "Sympathetic trunk",
    "l": "Truncus sympathicus",
    "t": "Autonomic",
    "d": "Chain of ganglia from skull base to coccyx.",
    "f": "Fight-or-flight: heart up, gut down, pupils wide.",
    "c": "Horner's syndrome: ptosis, miosis, anhidrosis.",
    "at": [
     835.2,
     360
    ],
    "s": "r"
   },
   "vagus": {
    "n": "Vagus nerve (CN X)",
    "l": "N. vagus",
    "t": "Autonomic",
    "d": "Longest cranial nerve, neck to pelvis.",
    "f": "Parasympathetic brake on heart, lungs and gut.",
    "c": "Vagal stimulation terminates SVT — the Valsalva trick.",
    "at": [
     819.2,
     225
    ],
    "s": "r"
   },
   "drg": {
    "n": "Dorsal root ganglion",
    "l": "Ganglion sensorium",
    "t": "Peripheral",
    "d": "Sensory cell-body cluster on each dorsal root.",
    "f": "Houses pseudounipolar sensory neurons.",
    "c": "Varicella hides here and re-emerges as shingles.",
    "at": [
     835.2,
     316.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"brain\" cx=\"800\" cy=\"79.2\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cerebellum\" cx=\"851.2\" cy=\"106.2\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"brainstem\" cx=\"800\" cy=\"127.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"spinalcord\" cx=\"800\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cervical\" cx=\"748.8000000000001\" cy=\"172.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"brachial\" cx=\"688\" cy=\"217.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"intercostal\" cx=\"748.8000000000001\" cy=\"298.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lumbar\" cx=\"764.8000000000001\" cy=\"423\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sacral\" cx=\"800\" cy=\"486\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sciatic\" cx=\"732.8000000000001\" cy=\"612\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"femoral\" cx=\"700.8000000000001\" cy=\"540\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sympathetic\" cx=\"835.2\" cy=\"360\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vagus\" cx=\"819.2\" cy=\"225\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"drg\" cx=\"835.2\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "A stab wound above C4 endangers breathing because it may cut the…",
    "opts": [
     "Vagus nerve",
     "Phrenic nerve from the cervical plexus",
     "Intercostal nerves only",
     "Sciatic nerve"
    ],
    "a": 1,
    "why": "The phrenic nerve (C3–C5) is the sole motor supply of the diaphragm."
   },
   {
    "q": "Which plexus supplies the entire upper limb?",
    "opts": [
     "Cervical",
     "Lumbar",
     "Brachial",
     "Sacral"
    ],
    "a": 2,
    "why": "Brachial plexus C5–T1 gives every motor and sensory nerve of the arm."
   },
   {
    "q": "Shingles reactivates in the…",
    "opts": [
     "Ventral horn",
     "Dorsal root ganglion",
     "Sympathetic chain",
     "Cerebellum"
    ],
    "a": 1,
    "why": "Varicella-zoster stays latent in sensory ganglia and re-emerges along one dermatome."
   }
  ],
  "related": [
   "brain",
   "spinalcord",
   "cranialnerves"
  ],
  "photo": {
   "file": "nervous.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "brain": [
     500,
     88
    ],
    "cerebellum": [
     532,
     118
    ],
    "brainstem": [
     500,
     142
    ],
    "spinalcord": [
     500,
     300
    ],
    "cervical": [
     468,
     192
    ],
    "brachial": [
     430,
     242
    ],
    "intercostal": [
     468,
     332
    ],
    "lumbar": [
     478,
     470
    ],
    "sacral": [
     500,
     540
    ],
    "sciatic": [
     458,
     680
    ],
    "femoral": [
     438,
     600
    ],
    "sympathetic": [
     522,
     400
    ],
    "vagus": [
     512,
     250
    ],
    "drg": [
     522,
     352
    ]
   }
  }
 },
 "nervousmale": {
  "title": "Nervous system — male",
  "latin": "Systema nervosum (vir)",
  "system": "nervous",
  "region": "Male body, anterior",
  "size": "Identical circuitry, male habitus",
  "blood": "As overview",
  "nerve": "As overview",
  "blurb": "The male figure with every nerve pathway highlighted — same wiring as the female page, shown on male proportions for side-by-side study.",
  "summary": "Compare with the female nervous page: the circuitry is identical; only body habitus and pelvic branching angles differ slightly.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "brain": {
    "n": "Brain",
    "l": "Encephalon",
    "t": "Central",
    "d": "Cerebrum, cerebellum and brainstem inside the cranial vault.",
    "f": "Integration, consciousness, motor planning and autonomic control.",
    "c": "Head injury scales from concussion to diffuse axonal injury.",
    "at": [
     800,
     79.2
    ],
    "s": "r"
   },
   "spinalcord": {
    "n": "Spinal cord",
    "l": "Medulla spinalis",
    "t": "Central",
    "d": "31-segment cord from foramen magnum to L1–L2.",
    "f": "Two-way tracts plus segmental reflex circuits.",
    "c": "Cord transection level predicts deficit pattern precisely.",
    "at": [
     800,
     270
    ],
    "s": "r"
   },
   "cervical": {
    "n": "Cervical plexus",
    "l": "Plexus cervicalis (C1–C4)",
    "t": "Peripheral",
    "d": "Nerve network in the posterior triangle of the neck.",
    "f": "Neck muscles and skin; phrenic nerve to diaphragm.",
    "c": "C3-4-5 keeps the diaphragm alive — injury above C4 stops breathing.",
    "at": [
     748.8000000000001,
     172.8
    ],
    "s": "l"
   },
   "brachial": {
    "n": "Brachial plexus",
    "l": "Plexus brachialis (C5–T1)",
    "t": "Peripheral",
    "d": "Roots-trunks-divisions-cords-branches behind the clavicle.",
    "f": "All motor and sensory supply of the upper limb.",
    "c": "Erb's palsy (C5-6) from birth traction: waiter's-tip hand.",
    "at": [
     688,
     217.8
    ],
    "s": "l"
   },
   "intercostal": {
    "n": "Intercostal nerves",
    "l": "Nn. intercostales (T1–T11)",
    "t": "Peripheral",
    "d": "Ventral rami running in subcostal grooves.",
    "f": "Chest-wall muscles and segmental skin band.",
    "c": "Shingles follows one intercostal dermatome.",
    "at": [
     748.8000000000001,
     298.8
    ],
    "s": "l"
   },
   "lumbar": {
    "n": "Lumbar plexus",
    "l": "Plexus lumbalis (L1–L4)",
    "t": "Peripheral",
    "d": "Network within psoas major.",
    "f": "Anterior thigh and medial leg supply.",
    "c": "Femoral nerve block anaesthetises the anterior thigh.",
    "at": [
     764.8000000000001,
     423
    ],
    "s": "l"
   },
   "sacral": {
    "n": "Sacral plexus",
    "l": "Plexus sacralis (L4–S4)",
    "t": "Peripheral",
    "d": "Plexus on the piriformis wall of the pelvis.",
    "f": "Gluteal region, perineum and the sciatic nerve.",
    "c": "Sciatica radiates along its branches down the leg.",
    "at": [
     800,
     486
    ],
    "s": "r"
   },
   "sciatic": {
    "n": "Sciatic nerve",
    "l": "N. ischiadicus",
    "t": "Peripheral",
    "d": "Largest nerve in the body (L4–S3).",
    "f": "Hamstrings and all muscles below the knee.",
    "c": "Wrong gluteal injection site can injure it — use upper outer quadrant.",
    "at": [
     732.8000000000001,
     612
    ],
    "s": "l"
   },
   "sympathetic": {
    "n": "Sympathetic trunk",
    "l": "Truncus sympathicus",
    "t": "Autonomic",
    "d": "Chain of ganglia from skull base to coccyx.",
    "f": "Fight-or-flight: heart up, gut down, pupils wide.",
    "c": "Horner's syndrome: ptosis, miosis, anhidrosis.",
    "at": [
     835.2,
     360
    ],
    "s": "r"
   },
   "vagus": {
    "n": "Vagus nerve (CN X)",
    "l": "N. vagus",
    "t": "Autonomic",
    "d": "Longest cranial nerve, neck to pelvis.",
    "f": "Parasympathetic brake on heart, lungs and gut.",
    "c": "Vagal stimulation terminates SVT — the Valsalva trick.",
    "at": [
     819.2,
     225
    ],
    "s": "r"
   },
   "femoral": {
    "n": "Femoral nerve",
    "l": "N. femoralis",
    "t": "Peripheral",
    "d": "L2–L4 branch under the inguinal ligament.",
    "f": "Quadriceps power and anterior-thigh sensation.",
    "c": "Loss → buckling knee and absent knee jerk.",
    "at": [
     700.8000000000001,
     540
    ],
    "s": "l"
   },
   "drg": {
    "n": "Dorsal root ganglion",
    "l": "Ganglion sensorium",
    "t": "Peripheral",
    "d": "Sensory cell-body cluster on each dorsal root.",
    "f": "Houses pseudounipolar sensory neurons.",
    "c": "Varicella hides here and re-emerges as shingles.",
    "at": [
     835.2,
     316.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"brain\" cx=\"800\" cy=\"79.2\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"spinalcord\" cx=\"800\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cervical\" cx=\"748.8000000000001\" cy=\"172.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"brachial\" cx=\"688\" cy=\"217.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"intercostal\" cx=\"748.8000000000001\" cy=\"298.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lumbar\" cx=\"764.8000000000001\" cy=\"423\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sacral\" cx=\"800\" cy=\"486\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sciatic\" cx=\"732.8000000000001\" cy=\"612\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sympathetic\" cx=\"835.2\" cy=\"360\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vagus\" cx=\"819.2\" cy=\"225\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"femoral\" cx=\"700.8000000000001\" cy=\"540\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"drg\" cx=\"835.2\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "A stab wound above C4 endangers breathing because it may cut the…",
    "opts": [
     "Vagus nerve",
     "Phrenic nerve from the cervical plexus",
     "Intercostal nerves only",
     "Sciatic nerve"
    ],
    "a": 1,
    "why": "The phrenic nerve (C3–C5) is the sole motor supply of the diaphragm."
   },
   {
    "q": "Which plexus supplies the entire upper limb?",
    "opts": [
     "Cervical",
     "Lumbar",
     "Brachial",
     "Sacral"
    ],
    "a": 2,
    "why": "Brachial plexus C5–T1 gives every motor and sensory nerve of the arm."
   },
   {
    "q": "Shingles reactivates in the…",
    "opts": [
     "Ventral horn",
     "Dorsal root ganglion",
     "Sympathetic chain",
     "Cerebellum"
    ],
    "a": 1,
    "why": "Varicella-zoster stays latent in sensory ganglia and re-emerges along one dermatome."
   }
  ],
  "related": [
   "nervous",
   "nervousfemale",
   "malebody"
  ],
  "photo": {
   "file": "nervous-male.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "brain": [
     500,
     88
    ],
    "spinalcord": [
     500,
     300
    ],
    "cervical": [
     468,
     192
    ],
    "brachial": [
     430,
     242
    ],
    "intercostal": [
     468,
     332
    ],
    "lumbar": [
     478,
     470
    ],
    "sacral": [
     500,
     540
    ],
    "sciatic": [
     458,
     680
    ],
    "sympathetic": [
     522,
     400
    ],
    "vagus": [
     512,
     250
    ],
    "femoral": [
     438,
     600
    ],
    "drg": [
     522,
     352
    ]
   }
  }
 },
 "nervousfemale": {
  "title": "Nervous system — female",
  "latin": "Systema nervosum (femina)",
  "system": "nervous",
  "region": "Female body, anterior",
  "size": "Identical circuitry, female habitus",
  "blood": "As overview",
  "nerve": "As overview",
  "blurb": "The female figure with every nerve pathway highlighted — study pelvic plexus branching on female proportions.",
  "summary": "Compare with the male nervous page: identical circuitry on female habitus; uterovaginal plexus branches accompany pelvic vessels.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "brain": {
    "n": "Brain",
    "l": "Encephalon",
    "t": "Central",
    "d": "Cerebrum, cerebellum and brainstem inside the cranial vault.",
    "f": "Integration, consciousness, motor planning and autonomic control.",
    "c": "Head injury scales from concussion to diffuse axonal injury.",
    "at": [
     800,
     79.2
    ],
    "s": "r"
   },
   "spinalcord": {
    "n": "Spinal cord",
    "l": "Medulla spinalis",
    "t": "Central",
    "d": "31-segment cord from foramen magnum to L1–L2.",
    "f": "Two-way tracts plus segmental reflex circuits.",
    "c": "Cord transection level predicts deficit pattern precisely.",
    "at": [
     800,
     270
    ],
    "s": "r"
   },
   "cervical": {
    "n": "Cervical plexus",
    "l": "Plexus cervicalis (C1–C4)",
    "t": "Peripheral",
    "d": "Nerve network in the posterior triangle of the neck.",
    "f": "Neck muscles and skin; phrenic nerve to diaphragm.",
    "c": "C3-4-5 keeps the diaphragm alive — injury above C4 stops breathing.",
    "at": [
     748.8000000000001,
     172.8
    ],
    "s": "l"
   },
   "brachial": {
    "n": "Brachial plexus",
    "l": "Plexus brachialis (C5–T1)",
    "t": "Peripheral",
    "d": "Roots-trunks-divisions-cords-branches behind the clavicle.",
    "f": "All motor and sensory supply of the upper limb.",
    "c": "Erb's palsy (C5-6) from birth traction: waiter's-tip hand.",
    "at": [
     688,
     217.8
    ],
    "s": "l"
   },
   "intercostal": {
    "n": "Intercostal nerves",
    "l": "Nn. intercostales (T1–T11)",
    "t": "Peripheral",
    "d": "Ventral rami running in subcostal grooves.",
    "f": "Chest-wall muscles and segmental skin band.",
    "c": "Shingles follows one intercostal dermatome.",
    "at": [
     748.8000000000001,
     298.8
    ],
    "s": "l"
   },
   "lumbar": {
    "n": "Lumbar plexus",
    "l": "Plexus lumbalis (L1–L4)",
    "t": "Peripheral",
    "d": "Network within psoas major.",
    "f": "Anterior thigh and medial leg supply.",
    "c": "Femoral nerve block anaesthetises the anterior thigh.",
    "at": [
     764.8000000000001,
     423
    ],
    "s": "l"
   },
   "sacral": {
    "n": "Sacral plexus",
    "l": "Plexus sacralis (L4–S4)",
    "t": "Peripheral",
    "d": "Plexus on the piriformis wall of the pelvis.",
    "f": "Gluteal region, perineum and the sciatic nerve.",
    "c": "Sciatica radiates along its branches down the leg.",
    "at": [
     800,
     486
    ],
    "s": "r"
   },
   "sciatic": {
    "n": "Sciatic nerve",
    "l": "N. ischiadicus",
    "t": "Peripheral",
    "d": "Largest nerve in the body (L4–S3).",
    "f": "Hamstrings and all muscles below the knee.",
    "c": "Wrong gluteal injection site can injure it — use upper outer quadrant.",
    "at": [
     732.8000000000001,
     612
    ],
    "s": "l"
   },
   "sympathetic": {
    "n": "Sympathetic trunk",
    "l": "Truncus sympathicus",
    "t": "Autonomic",
    "d": "Chain of ganglia from skull base to coccyx.",
    "f": "Fight-or-flight: heart up, gut down, pupils wide.",
    "c": "Horner's syndrome: ptosis, miosis, anhidrosis.",
    "at": [
     835.2,
     360
    ],
    "s": "r"
   },
   "vagus": {
    "n": "Vagus nerve (CN X)",
    "l": "N. vagus",
    "t": "Autonomic",
    "d": "Longest cranial nerve, neck to pelvis.",
    "f": "Parasympathetic brake on heart, lungs and gut.",
    "c": "Vagal stimulation terminates SVT — the Valsalva trick.",
    "at": [
     819.2,
     225
    ],
    "s": "r"
   },
   "femoral": {
    "n": "Femoral nerve",
    "l": "N. femoralis",
    "t": "Peripheral",
    "d": "L2–L4 branch under the inguinal ligament.",
    "f": "Quadriceps power and anterior-thigh sensation.",
    "c": "Loss → buckling knee and absent knee jerk.",
    "at": [
     700.8000000000001,
     540
    ],
    "s": "l"
   },
   "drg": {
    "n": "Dorsal root ganglion",
    "l": "Ganglion sensorium",
    "t": "Peripheral",
    "d": "Sensory cell-body cluster on each dorsal root.",
    "f": "Houses pseudounipolar sensory neurons.",
    "c": "Varicella hides here and re-emerges as shingles.",
    "at": [
     835.2,
     316.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"brain\" cx=\"800\" cy=\"79.2\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"spinalcord\" cx=\"800\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cervical\" cx=\"748.8000000000001\" cy=\"172.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"brachial\" cx=\"688\" cy=\"217.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"intercostal\" cx=\"748.8000000000001\" cy=\"298.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lumbar\" cx=\"764.8000000000001\" cy=\"423\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sacral\" cx=\"800\" cy=\"486\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sciatic\" cx=\"732.8000000000001\" cy=\"612\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sympathetic\" cx=\"835.2\" cy=\"360\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vagus\" cx=\"819.2\" cy=\"225\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"femoral\" cx=\"700.8000000000001\" cy=\"540\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"drg\" cx=\"835.2\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "A stab wound above C4 endangers breathing because it may cut the…",
    "opts": [
     "Vagus nerve",
     "Phrenic nerve from the cervical plexus",
     "Intercostal nerves only",
     "Sciatic nerve"
    ],
    "a": 1,
    "why": "The phrenic nerve (C3–C5) is the sole motor supply of the diaphragm."
   },
   {
    "q": "Which plexus supplies the entire upper limb?",
    "opts": [
     "Cervical",
     "Lumbar",
     "Brachial",
     "Sacral"
    ],
    "a": 2,
    "why": "Brachial plexus C5–T1 gives every motor and sensory nerve of the arm."
   },
   {
    "q": "Shingles reactivates in the…",
    "opts": [
     "Ventral horn",
     "Dorsal root ganglion",
     "Sympathetic chain",
     "Cerebellum"
    ],
    "a": 1,
    "why": "Varicella-zoster stays latent in sensory ganglia and re-emerges along one dermatome."
   }
  ],
  "related": [
   "nervous",
   "nervousmale",
   "femalebody"
  ],
  "photo": {
   "file": "nervous-female.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "brain": [
     500,
     88
    ],
    "spinalcord": [
     500,
     300
    ],
    "cervical": [
     468,
     192
    ],
    "brachial": [
     430,
     242
    ],
    "intercostal": [
     468,
     332
    ],
    "lumbar": [
     478,
     470
    ],
    "sacral": [
     500,
     540
    ],
    "sciatic": [
     458,
     680
    ],
    "sympathetic": [
     522,
     400
    ],
    "vagus": [
     512,
     250
    ],
    "femoral": [
     438,
     600
    ],
    "drg": [
     522,
     352
    ]
   }
  }
 },
 "cranialnerves": {
  "title": "Cranial nerves",
  "latin": "Nervi craniales I–XII",
  "system": "nervous",
  "region": "Head & neck",
  "size": "12 pairs",
  "blood": "Carotid + vertebrobasilar",
  "nerve": "The nerves themselves",
  "blurb": "Twelve pairs leave the brain directly — smell to tongue movement — and they are examined in strict order in every neurological exam.",
  "summary": "Deep dive: each nerve with its nucleus, route and lesion. Mnemonics live in the clinical notes.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "c1": {
    "n": "I · Olfactory nerve",
    "l": "N. olfactorius",
    "t": "Cranial",
    "d": "Sensory filaments from nasal epithelium to bulb.",
    "f": "Smell.",
    "c": "Lesion: anosmia — test each nostril with coffee.",
    "at": [
     563.2,
     270
    ],
    "s": "l"
   },
   "c2": {
    "n": "II · Optic nerve",
    "l": "N. opticus",
    "t": "Cranial",
    "d": "Retinal ganglion axons to the chiasm.",
    "f": "Vision.",
    "c": "Papilloedema signals raised intracranial pressure.",
    "at": [
     672,
     286.2
    ],
    "s": "l"
   },
   "c3": {
    "n": "III · Oculomotor nerve",
    "l": "N. oculomotorius",
    "t": "Cranial",
    "d": "Midbrain nerve to four eye muscles + lid + pupil.",
    "f": "Eye elevation/adduction, lid lift, pupil constriction.",
    "c": "First sign of uncal herniation: a blown pupil.",
    "at": [
     723.2,
     316.8
    ],
    "s": "l"
   },
   "c4": {
    "n": "IV · Trochlear nerve",
    "l": "N. trochlearis",
    "t": "Cranial",
    "d": "Thinnest cranial nerve; exits dorsally.",
    "f": "Superior oblique — looks down and in.",
    "c": "Palsy: double vision on stairs.",
    "at": [
     755.2,
     334.8
    ],
    "s": "l"
   },
   "c5": {
    "n": "V · Trigeminal nerve",
    "l": "N. trigeminus",
    "t": "Cranial",
    "d": "Three divisions: ophthalmic, maxillary, mandibular.",
    "f": "Face sensation + muscles of mastication.",
    "c": "Trigeminal neuralgia: electric shock pain in V2/V3.",
    "at": [
     800,
     378
    ],
    "s": "r"
   },
   "c6": {
    "n": "VI · Abducens nerve",
    "l": "N. abducens",
    "t": "Cranial",
    "d": "Long intracranial course to lateral rectus.",
    "f": "Eye abduction.",
    "c": "False-localising sign in raised ICP.",
    "at": [
     771.2,
     345.6
    ],
    "s": "l"
   },
   "c7": {
    "n": "VII · Facial nerve",
    "l": "N. facialis",
    "t": "Cranial",
    "d": "Motor to face, taste anterior 2/3, lacrimal/salivary.",
    "f": "Facial expression.",
    "c": "Bell's palsy spares forehead? No — LMN hits whole side.",
    "at": [
     832,
     406.8
    ],
    "s": "r"
   },
   "c8": {
    "n": "VIII · Vestibulocochlear nerve",
    "l": "N. vestibulocochlearis",
    "t": "Cranial",
    "d": "Two bundles: cochlear and vestibular.",
    "f": "Hearing and balance.",
    "c": "Acoustic neuroma: tinnitus + unilateral deafness.",
    "at": [
     896,
     388.8
    ],
    "s": "r"
   },
   "c9": {
    "n": "IX · Glossopharyngeal nerve",
    "l": "N. glossopharyngeus",
    "t": "Cranial",
    "d": "Taste posterior 1/3, carotid body, stylopharyngeus.",
    "f": "Swallowing, BP sensing.",
    "c": "Glossopharyngeal neuralgia: throat pain on swallowing.",
    "at": [
     896,
     468
    ],
    "s": "r"
   },
   "c10": {
    "n": "X · Vagus nerve",
    "l": "N. vagus",
    "t": "Cranial",
    "d": "Roams from medulla to pelvic gut.",
    "f": "Parasympathetic to thorax/abdomen, voice.",
    "c": "Hoarseness = recurrent laryngeal branch until proven otherwise.",
    "at": [
     928,
     504
    ],
    "s": "r"
   },
   "c11": {
    "n": "XI · Accessory nerve",
    "l": "N. accessorius",
    "t": "Cranial",
    "d": "Spinal root from C1–C5 climbs into skull.",
    "f": "Trapezius and sternocleidomastoid.",
    "c": "Node biopsy in posterior triangle risks it — shrug weakness.",
    "at": [
     992,
     558
    ],
    "s": "r"
   },
   "c12": {
    "n": "XII · Hypoglossal nerve",
    "l": "N. hypoglossus",
    "t": "Cranial",
    "d": "Motor root to tongue muscles.",
    "f": "Tongue movement.",
    "c": "Tongue deviates TO the side of the lesion.",
    "at": [
     896,
     540
    ],
    "s": "r"
   },
   "cbs": {
    "n": "Brainstem",
    "l": "Truncus encephali",
    "t": "Central",
    "d": "Nuclei of all twelve nerves sit here.",
    "f": "Houses every cranial nerve nucleus.",
    "c": "Brainstem stroke can cause crossed signs.",
    "at": [
     960,
     316.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"c1\" cx=\"563.2\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c2\" cx=\"672\" cy=\"286.2\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c3\" cx=\"723.2\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c4\" cx=\"755.2\" cy=\"334.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c5\" cx=\"800\" cy=\"378\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c6\" cx=\"771.2\" cy=\"345.6\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c7\" cx=\"832\" cy=\"406.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c8\" cx=\"896\" cy=\"388.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c9\" cx=\"896\" cy=\"468\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c10\" cx=\"928\" cy=\"504\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c11\" cx=\"992\" cy=\"558\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"c12\" cx=\"896\" cy=\"540\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cbs\" cx=\"960\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which cranial nerve is purely sensory for smell?",
    "opts": [
     "I",
     "III",
     "VII",
     "XII"
    ],
    "a": 0,
    "why": "CN I (olfactory) carries smell fibres from the nasal epithelium."
   },
   {
    "q": "A patient cannot shrug one shoulder after neck surgery. Which nerve?",
    "opts": [
     "V",
     "X",
     "XI",
     "IX"
    ],
    "a": 2,
    "why": "The accessory nerve supplies trapezius; it crosses the posterior triangle."
   },
   {
    "q": "The tongue deviates to the left on protrusion. The lesion is in…",
    "opts": [
     "Left hypoglossal",
     "Right hypoglossal",
     "Left vagus",
     "Right facial"
    ],
    "a": 0,
    "why": "Genioglossus pushes the tongue forward; a weak side loses its push, so the tongue points to the weak (left) side."
   }
  ],
  "related": [
   "nervous",
   "brain",
   "autonomic"
  ],
  "photo": {
   "file": "cranial.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "c1": [
     352,
     300
    ],
    "c2": [
     420,
     318
    ],
    "c3": [
     452,
     352
    ],
    "c4": [
     472,
     372
    ],
    "c5": [
     500,
     420
    ],
    "c6": [
     482,
     384
    ],
    "c7": [
     520,
     452
    ],
    "c8": [
     560,
     432
    ],
    "c9": [
     560,
     520
    ],
    "c10": [
     580,
     560
    ],
    "c11": [
     620,
     620
    ],
    "c12": [
     560,
     600
    ],
    "cbs": [
     600,
     352
    ]
   }
  }
 },
 "autonomic": {
  "title": "Autonomic nervous system",
  "latin": "Systema nervosum autonomicum",
  "system": "nervous",
  "region": "Viscera + vertebral column",
  "size": "Sympathetic T1–L2 · Parasympathetic cranial + S2–S4",
  "blood": "Visceral vessels",
  "nerve": "Intrinsic — autonomic",
  "blurb": "The unconscious half of the nervous system: sympathetic accelerator, parasympathetic brake, and the gut's own enteric brain.",
  "summary": "Deep dive into ganglia and plexuses: where fibres relay, which organs they reach, and what happens when the balance breaks.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#6d4a86",
    "Nervous"
   ],
   [
    "#5f7340",
    "Endocrine"
   ]
  ],
  "parts": {
   "sym": {
    "n": "Sympathetic trunk",
    "l": "Truncus sympathicus",
    "t": "Chain",
    "d": "Paired chain from neck to sacrum beside vertebrae.",
    "f": "Mass fight-or-flight discharge.",
    "c": "Chronic overdrive: hypertension, anxiety physiology.",
    "at": [
     835.2,
     316.8
    ],
    "s": "r"
   },
   "cg": {
    "n": "Chain ganglion",
    "l": "Ganglion trunci",
    "t": "Chain",
    "d": "Relay station on the trunk.",
    "f": "Synapse for pre→postganglionic fibres.",
    "c": "Stellate ganglion block treats refractory angina pain.",
    "at": [
     835.2,
     270
    ],
    "s": "r"
   },
   "coeliac": {
    "n": "Coeliac ganglion & plexus",
    "l": "Ganglion coeliacum",
    "t": "Prevertebral",
    "d": "Largest prevertebral relay at T12/L1, around coeliac trunk.",
    "f": "Foregut sympathetic supply.",
    "c": "Coeliac plexus block for pancreatic cancer pain.",
    "at": [
     800,
     388.8
    ],
    "s": "r"
   },
   "smg": {
    "n": "Superior mesenteric ganglion",
    "l": "Ganglion mesentericum superius",
    "t": "Prevertebral",
    "d": "Relay at the SMA origin.",
    "f": "Midgut sympathetic supply.",
    "c": "Mesenteric ischaemia pain is carried with these fibres.",
    "at": [
     800,
     424.8
    ],
    "s": "r"
   },
   "img": {
    "n": "Inferior mesenteric ganglion",
    "l": "Ganglion mesentericum inferius",
    "t": "Prevertebral",
    "d": "Relay at IMA origin.",
    "f": "Hindgut and pelvic sympathetic supply.",
    "c": "Involved in post-ejaculatory pain syndromes.",
    "at": [
     800,
     460.8
    ],
    "s": "r"
   },
   "vg": {
    "n": "Vagus parasympathetic",
    "l": "N. vagus (parasymp.)",
    "t": "Cranial outflow",
    "d": "Cranial parasympathetic to thorax and fore/midgut.",
    "f": "Rest-digest: slow heart, stimulate gut.",
    "c": "Vagotomy historically cured duodenal ulcers.",
    "at": [
     800,
     226.8
    ],
    "s": "r"
   },
   "cp": {
    "n": "Cardiac plexus",
    "l": "Plexus cardiacus",
    "t": "Plexus",
    "d": "Sympathetic + vagal mesh at the aortic arch.",
    "f": "Heart rate and force tuning.",
    "c": "Beta-blockers blunt its sympathetic arm.",
    "at": [
     800,
     289.8
    ],
    "s": "r"
   },
   "pp": {
    "n": "Pulmonary plexus",
    "l": "Plexus pulmonalis",
    "t": "Plexus",
    "d": "Autonomic mesh at each lung root.",
    "f": "Bronchial tone and vessel calibre.",
    "c": "Asthma is partly autonomic imbalance here.",
    "at": [
     748.8000000000001,
     307.8
    ],
    "s": "l"
   },
   "ens": {
    "n": "Enteric nervous system",
    "l": "Systema nervosum entericum",
    "t": "Enteric",
    "d": "100–500 million neurons in gut wall plexuses.",
    "f": "Peristalsis and secretion, semi-independent.",
    "c": "Hirschsprung: missing enteric ganglia in distal colon.",
    "at": [
     835.2,
     487.8
    ],
    "s": "r"
   },
   "psp": {
    "n": "Pelvic splanchnic nerves",
    "l": "Nn. splanchnici pelvici (S2–S4)",
    "t": "Sacral outflow",
    "d": "Parasympathetic outflow to pelvis.",
    "f": "Bladder emptying, erection, defecation.",
    "c": "Sacral cord injury causes retention and impotence.",
    "at": [
     800,
     541.8000000000001
    ],
    "s": "r"
   },
   "am": {
    "n": "Adrenal medulla",
    "l": "Medulla glandulae suprarenalis",
    "t": "Special",
    "d": "Modified sympathetic ganglion releasing adrenaline.",
    "f": "Hormonal fight-or-flight broadcast.",
    "c": "Phaeochromocytoma: episodic hypertension + sweating.",
    "at": [
     748.8000000000001,
     397.8
    ],
    "s": "l"
   },
   "rc": {
    "n": "Rami communicantes",
    "l": "Rami communicantes",
    "t": "Chain",
    "d": "White (in) and grey (out) bridges to spinal nerves.",
    "f": "Connect trunk to every spinal nerve.",
    "c": "Grey rami carry postganglionic fibres back out.",
    "at": [
     851.2,
     343.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"sym\" cx=\"835.2\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cg\" cx=\"835.2\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"coeliac\" cx=\"800\" cy=\"388.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"smg\" cx=\"800\" cy=\"424.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"img\" cx=\"800\" cy=\"460.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vg\" cx=\"800\" cy=\"226.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cp\" cx=\"800\" cy=\"289.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pp\" cx=\"748.8000000000001\" cy=\"307.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ens\" cx=\"835.2\" cy=\"487.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"psp\" cx=\"800\" cy=\"541.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"am\" cx=\"748.8000000000001\" cy=\"397.8\" rx=\"52\" ry=\"38\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rc\" cx=\"851.2\" cy=\"343.8\" rx=\"52\" ry=\"38\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The \"rest and digest\" outflow arises from…",
    "opts": [
     "T1–L2 only",
     "Cranial + S2–S4",
     "Thoracic only",
     "Lumbar only"
    ],
    "a": 1,
    "why": "Parasympathetic = cranial nerves III, VII, IX, X plus sacral S2–S4."
   },
   {
    "q": "The enteric nervous system is best described as…",
    "opts": [
     "Part of the sympathetic chain",
     "A semi-independent neuron network in the gut wall",
     "A cranial nerve branch",
     "A spinal reflex"
    ],
    "a": 1,
    "why": "Myenteric and submucosal plexuses can drive peristalsis without central input."
   },
   {
    "q": "Adrenaline into the bloodstream is released by the…",
    "opts": [
     "Coeliac ganglion",
     "Adrenal medulla",
     "Vagus nerve",
     "Dorsal root ganglion"
    ],
    "a": 1,
    "why": "The adrenal medulla is a modified sympathetic ganglion with no postganglionic neuron."
   }
  ],
  "related": [
   "nervous",
   "gut",
   "heart"
  ],
  "photo": {
   "file": "autonomic.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "sym": [
     522,
     352
    ],
    "cg": [
     522,
     300
    ],
    "coeliac": [
     500,
     432
    ],
    "smg": [
     500,
     472
    ],
    "img": [
     500,
     512
    ],
    "vg": [
     500,
     252
    ],
    "cp": [
     500,
     322
    ],
    "pp": [
     468,
     342
    ],
    "ens": [
     522,
     542
    ],
    "psp": [
     500,
     602
    ],
    "am": [
     468,
     442
    ],
    "rc": [
     532,
     382
    ]
   }
  }
 },
 "breast": {
  "title": "Breast",
  "latin": "Mamma / Glandula mammaria",
  "system": "female",
  "region": "Pectoral region, T2–T6 ribs",
  "size": "15–20 lobules per breast",
  "blood": "Internal thoracic + lateral thoracic arteries",
  "nerve": "Intercostal nerves T2–T6 + lactiferous reflex",
  "blurb": "A modified sweat gland: glandular lobules make milk, ducts carry it, fat gives shape, and lymph drains mostly to the axilla — which is why breast cancer staging checks axillary nodes.",
  "summary": "Female breast in cut-away with every ductal and structural part; the male breast is the same blueprint, undeveloped.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#b05252",
    "Muscular system"
   ],
   [
    "#4a7c59",
    "Lymphatic & immune"
   ],
   [
    "#8a6a4a",
    "Integumentary"
   ]
  ],
  "parts": {
   "lobules": {
    "n": "Lobules (glandular)",
    "l": "Lobuli glandulae",
    "t": "Gland",
    "d": "Secretory alveolar clusters at duct ends.",
    "f": "Milk production under prolactin.",
    "c": "Most breast cancers start in lobules or ducts.",
    "at": [
     720,
     405
    ],
    "s": "l"
   },
   "ducts": {
    "n": "Lactiferous ducts",
    "l": "Ductus lactiferi",
    "t": "Gland",
    "d": "15–20 branching channels to the nipple.",
    "f": "Transport milk.",
    "c": "Ductal carcinoma in situ stays inside this lining.",
    "at": [
     880,
     360
    ],
    "s": "r"
   },
   "sinus": {
    "n": "Subareolar lactiferous ducts",
    "l": "Ductus lactiferi",
    "t": "Gland",
    "d": "Branching ducts converge near the nipple; classic large lactiferous sinuses are not consistently seen on ultrasound.",
    "f": "Carry milk from alveoli and lobules toward nipple openings, rather than acting as a major storage reservoir.",
    "c": "A blocked duct may cause a localized tender area; ultrasound revised the older “sinus reservoir” model.",
    "at": [
     960,
     432
    ],
    "s": "r"
   },
   "nipple": {
    "n": "Nipple",
    "l": "Papilla mammaria",
    "t": "Surface",
    "d": "Pigmented projection with 15–20 duct openings.",
    "f": "Milk delivery; erotic sensation.",
    "c": "Paget's disease: eczema-like nipple change = cancer until proven otherwise.",
    "at": [
     1120,
     450
    ],
    "s": "r"
   },
   "areola": {
    "n": "Areola",
    "l": "Areola mammae",
    "t": "Surface",
    "d": "Pigmented ring with sebaceous Montgomery tubercles.",
    "f": "Lubrication and latch cue.",
    "c": "Tubercles enlarge in pregnancy.",
    "at": [
     1088,
     421.2
    ],
    "s": "r"
   },
   "fat": {
    "n": "Adipose tissue",
    "l": "Corpus adiposum",
    "t": "Stroma",
    "d": "Fat between glandular compartments.",
    "f": "Size and contour.",
    "c": "Mammography reads density of fat vs gland.",
    "at": [
     560,
     315
    ],
    "s": "l"
   },
   "cooper": {
    "n": "Suspensory (Cooper) ligaments",
    "l": "Ligg. suspensoria",
    "t": "Stroma",
    "d": "Fibrous bands from skin to deep fascia.",
    "f": "Structural support.",
    "c": "Tumour invasion shortens them → skin dimpling.",
    "at": [
     640,
     270
    ],
    "s": "l"
   },
   "pec": {
    "n": "Pectoralis major",
    "l": "M. pectoralis major",
    "t": "Muscle",
    "d": "Fan-shaped chest muscle deep to the breast.",
    "f": "Base on which the breast rests.",
    "c": "Advanced cancer can fix the breast to it.",
    "at": [
     480,
     540
    ],
    "s": "l"
   },
   "axl": {
    "n": "Axillary lymph nodes",
    "l": "Ll. axillares",
    "t": "Lymph",
    "d": "75% of breast lymph drains here.",
    "f": "Immune surveillance of the breast.",
    "c": "Sentinel node biopsy stages cancer spread.",
    "at": [
     1280,
     270
    ],
    "s": "r"
   },
   "skin": {
    "n": "Skin & subcutaneous layer",
    "l": "Cutis",
    "t": "Surface",
    "d": "Thin skin over fat and gland.",
    "f": "Barrier and sensation.",
    "c": "Skin oedema → peau d'orange in inflammatory cancer.",
    "at": [
     400,
     225
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"lobules\" cx=\"720\" cy=\"405\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ducts\" cx=\"880\" cy=\"360\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sinus\" cx=\"960\" cy=\"432\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"nipple\" cx=\"1120\" cy=\"450\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"areola\" cx=\"1088\" cy=\"421.2\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"fat\" cx=\"560\" cy=\"315\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cooper\" cx=\"640\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pec\" cx=\"480\" cy=\"540\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"axl\" cx=\"1280\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"skin\" cx=\"400\" cy=\"225\" rx=\"52\" ry=\"38\" fill=\"#8a6a4a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Most breast lymph drains to the…",
    "opts": [
     "Inguinal nodes",
     "Axillary nodes",
     "Mediastinal nodes",
     "Cervical nodes"
    ],
    "a": 1,
    "why": "About three-quarters of lymph follows lateral ducts to axillary nodes — hence sentinel biopsy."
   },
   {
    "q": "Milk is synthesized primarily in the…",
    "opts": [
     "Mammary alveoli in lobules",
     "Lactiferous sinus",
     "Cooper ligaments",
     "Nipple skin"
    ],
    "a": 0,
    "why": "Milk is made by alveolar epithelial cells in lobules; ducts transport it. Large subareolar sinus reservoirs are not consistently seen on ultrasound."
   },
   {
    "q": "Skin dimpling over a lump suggests involvement of…",
    "opts": [
     "Pectoralis major",
     "Suspensory (Cooper) ligaments",
     "Intercostal nerves",
     "Rib periosteum"
    ],
    "a": 1,
    "why": "Tumour shortens Cooper ligaments, tethering and dimpling the overlying skin."
   }
  ],
  "related": [
   "female",
   "gynadnexa",
   "lymph"
  ],
  "photo": {
   "file": "breast.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "lobules": [
     450,
     450
    ],
    "ducts": [
     550,
     400
    ],
    "sinus": [
     600,
     480
    ],
    "nipple": [
     700,
     500
    ],
    "areola": [
     680,
     468
    ],
    "fat": [
     350,
     350
    ],
    "cooper": [
     400,
     300
    ],
    "pec": [
     300,
     600
    ],
    "axl": [
     800,
     300
    ],
    "skin": [
     250,
     250
    ]
   }
  }
 },
 "skeleton": {
  "title": "Skeleton",
  "latin": "Systema skeletale",
  "system": "skeletal",
  "region": "206 bones in the adult",
  "size": "206 bones · 300 at birth",
  "blood": "Periosteal + nutrient arteries",
  "nerve": "Nerves accompany every vessel",
  "blurb": "The frame: leverage for muscle, armour for viscera, a calcium bank, and the marrow factory that makes every blood cell.",
  "summary": "Anterior skeleton with the bones a student must point at in the first practical — axial column first, then the limbs.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#c9a86a",
    "Skeletal system"
   ]
  ],
  "parts": {
   "skull": {
    "n": "Skull",
    "l": "Cranium",
    "t": "Bone",
    "d": "Fuses 8 cranial + 14 facial bones; houses brain and senses.",
    "f": "Protection and mastication anchor.",
    "c": "Basilar skull fracture: raccoon eyes + CSF leak.",
    "at": [
     800,
     81
    ],
    "s": "r"
   },
   "clavicle": {
    "n": "Clavicle",
    "l": "Clavicula",
    "t": "Bone",
    "d": "S-strut between sternum and scapula.",
    "f": "Holds the shoulder off the chest.",
    "c": "Most commonly fractured bone in falls on the shoulder.",
    "at": [
     720,
     181.8
    ],
    "s": "l"
   },
   "sternum": {
    "n": "Sternum",
    "l": "Sternum",
    "t": "Bone",
    "d": "Manubrium, body and xiphoid in the midline.",
    "f": "Rib anchor; marrow biopsy site.",
    "c": "Sternal angle = T4/T5, the clinical landmark.",
    "at": [
     800,
     270
    ],
    "s": "r"
   },
   "ribs": {
    "n": "Rib cage",
    "l": "Costae",
    "t": "Bone",
    "d": "12 pairs: 7 true, 3 false, 2 floating.",
    "f": "Bellows for breathing; heart and lung armour.",
    "c": "Rib fractures in elders can cause fatal pneumonia.",
    "at": [
     720,
     289.8
    ],
    "s": "l"
   },
   "vertebrae": {
    "n": "Vertebral column",
    "l": "Columna vertebralis",
    "t": "Bone",
    "d": "7C-12T-5L-sacrum-coccyx with four curves.",
    "f": "Axial support and cord protection.",
    "c": "Herniated discs press nerve roots segmentally.",
    "at": [
     800,
     361.8
    ],
    "s": "r"
   },
   "pelvis": {
    "n": "Pelvis",
    "l": "Pelvis",
    "t": "Bone",
    "d": "Ilium, ischium, pubis + sacrum ring.",
    "f": "Weight transfer; birth canal in females.",
    "c": "Female pelvis is wider and shallower — obstetric adaptation.",
    "at": [
     800,
     487.8
    ],
    "s": "r"
   },
   "scapula": {
    "n": "Scapula",
    "l": "Scapula",
    "t": "Bone",
    "d": "Triangular shoulder blade with glenoid fossa.",
    "f": "Mobile socket for the arm.",
    "c": "Winged scapula = long thoracic nerve palsy.",
    "at": [
     672,
     217.8
    ],
    "s": "l"
   },
   "humerus": {
    "n": "Humerus",
    "l": "Humerus",
    "t": "Bone",
    "d": "Single upper-arm bone, head to condyles.",
    "f": "Arm lever; radial nerve hugs its groove.",
    "c": "Mid-shaft fracture → wrist drop.",
    "at": [
     640,
     316.8
    ],
    "s": "l"
   },
   "radius": {
    "n": "Radius",
    "l": "Radius",
    "t": "Bone",
    "d": "Lateral forearm bone (thumb side).",
    "f": "Rotates in pronation/supination.",
    "c": "Colles' fracture: dinner-fork deformity.",
    "at": [
     616,
     424.8
    ],
    "s": "l"
   },
   "ulna": {
    "n": "Ulna",
    "l": "Ulna",
    "t": "Bone",
    "d": "Medial forearm bone with olecranon.",
    "f": "Hinge of the elbow.",
    "c": "Fractures with radial head dislocation (Monteggia).",
    "at": [
     648,
     438.3
    ],
    "s": "l"
   },
   "carpals": {
    "n": "Carpals & hand",
    "l": "Ossa manus",
    "t": "Bone",
    "d": "8 carpals, 5 metacarpals, 14 phalanges.",
    "f": "Precision and power grip.",
    "c": "Scaphoid fracture: tender snuffbox, risk of avascular necrosis.",
    "at": [
     608,
     505.8
    ],
    "s": "l"
   },
   "femur": {
    "n": "Femur",
    "l": "Femur",
    "t": "Bone",
    "d": "Longest, strongest bone; neck-shaft angle.",
    "f": "Weight bearing and stride.",
    "c": "Neck fractures in osteoporosis threaten blood supply to the head.",
    "at": [
     736,
     595.8000000000001
    ],
    "s": "l"
   },
   "patella": {
    "n": "Patella",
    "l": "Patella",
    "t": "Bone",
    "d": "Largest sesamoid, inside quadriceps tendon.",
    "f": "Extensor lever and knee shield.",
    "c": "Bipartite patella mimics fracture on X-ray.",
    "at": [
     744,
     685.8000000000001
    ],
    "s": "l"
   },
   "tibia": {
    "n": "Tibia",
    "l": "Tibia",
    "t": "Bone",
    "d": "Weight-bearing shin bone.",
    "f": "Transfers load to ankle.",
    "c": "Second commonest fracture site after forearm in kids.",
    "at": [
     744,
     748.8000000000001
    ],
    "s": "l"
   },
   "fibula": {
    "n": "Fibula",
    "l": "Fibula",
    "t": "Bone",
    "d": "Slender lateral shin bone.",
    "f": "Ankle stability; muscle origin",
    "c": "Fibular neck fracture risks the common fibular nerve → foot drop.",
    "at": [
     779.2,
     748.8000000000001
    ],
    "s": "l"
   },
   "tarsals": {
    "n": "Tarsals & foot",
    "l": "Ossa pedis",
    "t": "Bone",
    "d": "7 tarsals, 5 metatarsals, 14 phalanges + arches.",
    "f": "Spring-loaded platform for gait.",
    "c": "Calcaneus fracture from falls — check the lumbar spine too.",
    "at": [
     752,
     838.8000000000001
    ],
    "s": "l"
   },
   "spinalig": {
    "n": "Spinal ligaments (ALL/PLL/flavum)",
    "l": "Ligg. columnae vertebralis",
    "t": "Ligament",
    "d": "Longitudinal and segmental ligament set.",
    "f": "Stability plus flexion control.",
    "c": "Ligamentum flavum hypertrophy narrows the canal in stenosis.",
    "at": [
     800,
     361.8
    ],
    "s": "r"
   },
   "hiplig": {
    "n": "Iliofemoral & hip ligaments",
    "l": "Ligg. articulationis coxae",
    "t": "Ligament",
    "d": "Strong Y-shaped anterior ligament set.",
    "f": "Limits extension; stabilises standing hip.",
    "c": "Among the strongest ligaments in the body.",
    "at": [
     800,
     487.8
    ],
    "s": "r"
   },
   "anklig": {
    "n": "Ankle collateral ligaments",
    "l": "Ligg. talocruralia",
    "t": "Ligament",
    "d": "Deltoid medially; ATFL, CFL, PTFL laterally.",
    "f": "Talar stability in inversion/eversion.",
    "c": "Inversion sprain tears ATFL first.",
    "at": [
     752,
     838.8000000000001
    ],
    "s": "l"
   },
   "tmjj": {
    "n": "Temporomandibular joint",
    "l": "Articulatio temporomandibularis",
    "t": "Joint",
    "d": "Condyle of mandible in the mandibular fossa, disc between.",
    "f": "Hinge + glide: jaw open, close, protrude, grind.",
    "c": "Disc displacement causes clicking and closed lock.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "stj": {
    "n": "Sternoclavicular & acromioclavicular joints",
    "l": "Artt. sternoclavicularis et acromioclavicularis",
    "t": "Joint",
    "d": "Clavicle's two ends: sternum front, acromion laterally.",
    "f": "Clavicular elevation, protraction, scapular rotation.",
    "c": "Posterior SC dislocation threatens the great vessels.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "shj": {
    "n": "Glenohumeral (shoulder) joint",
    "l": "Articulatio glenohumeralis",
    "t": "Joint",
    "d": "Humeral head in the shallow glenoid fossa.",
    "f": "Most mobile joint: all three planes.",
    "c": "Anterior dislocation with Bankart lesion.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "elj": {
    "n": "Elbow joint",
    "l": "Articulatio cubiti",
    "t": "Joint",
    "d": "Trochlea + capitulum with ulna and radial head.",
    "f": "Pure hinge: flexion–extension.",
    "c": "Supracondylar fractures risk brachial artery injury.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "wrj": {
    "n": "Radiocarpal (wrist) joint",
    "l": "Articulatio radiocarpea",
    "t": "Joint",
    "d": "Radius + disc onto scaphoid, lunate, triquetrum.",
    "f": "Flex/extend, radial & ulnar deviation.",
    "c": "FOOSH injuries: scaphoid fracture.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "ivdj": {
    "n": "Intervertebral joints & discs",
    "l": "Symphyses intervertebrales",
    "t": "Joint",
    "d": "Symphysis between vertebral bodies: annulus + nucleus.",
    "f": "Small glide summed into column flexion.",
    "c": "Posterolateral disc herniation → sciatica.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "facj": {
    "n": "Zygapophyseal (facet) joints",
    "l": "Articulationes zygapophyseales",
    "t": "Joint",
    "d": "Synovial planes between superior/inferior articular processes.",
    "f": "Guide and limit segmental glide.",
    "c": "Facet arthropathy is a common back-pain source.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "sij": {
    "n": "Sacroiliac joint",
    "l": "Articulatio sacroiliaca",
    "t": "Joint",
    "d": "Sacrum to ilium: synovial front, fibrous back.",
    "f": "Minimal glide; transfers trunk load to legs.",
    "c": "Sacroiliitis in ankylosing spondylitis.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "pubj": {
    "n": "Pubic symphysis",
    "l": "Symphysis pubica",
    "t": "Joint",
    "d": "Fibrocartilage disc between pubic bodies.",
    "f": "Micro-movement; widens in pregnancy.",
    "c": "Peripartum pubic symphysis dysfunction.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "hipj": {
    "n": "Hip joint",
    "l": "Articulatio coxae",
    "t": "Joint",
    "d": "Femoral head in the acetabulum with its labrum.",
    "f": "Stable ball & socket: weight bearing.",
    "c": "Femoral neck fracture; DDH in infancy.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "kneej": {
    "n": "Knee joint",
    "l": "Articulatio genus",
    "t": "Joint",
    "d": "Femoral condyles, tibial plateau, patella.",
    "f": "Hinge with rotation in flexion.",
    "c": "Unhappy triad: ACL + MCL + medial meniscus.",
    "at": [
     null,
     null
    ],
    "s": "r"
   },
   "ankj": {
    "n": "Ankle (talocrural) joint",
    "l": "Articulatio talocruralis",
    "t": "Joint",
    "d": "Malleolar mortise over the talar dome.",
    "f": "Dorsi- and plantar-flexion hinge.",
    "c": "Inversion sprains tear the ATFL first.",
    "at": [
     null,
     null
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"skull\" cx=\"800\" cy=\"81\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"clavicle\" cx=\"720\" cy=\"181.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sternum\" cx=\"800\" cy=\"270\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ribs\" cx=\"720\" cy=\"289.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vertebrae\" cx=\"800\" cy=\"361.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pelvis\" cx=\"800\" cy=\"487.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"scapula\" cx=\"672\" cy=\"217.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"humerus\" cx=\"640\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"radius\" cx=\"616\" cy=\"424.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ulna\" cx=\"648\" cy=\"438.3\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"carpals\" cx=\"608\" cy=\"505.8\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"femur\" cx=\"736\" cy=\"595.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"patella\" cx=\"744\" cy=\"685.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"tibia\" cx=\"744\" cy=\"748.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"fibula\" cx=\"779.2\" cy=\"748.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"tarsals\" cx=\"752\" cy=\"838.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which bone is most often fractured in a fall on the shoulder?",
    "opts": [
     "Scapula",
     "Clavicle",
     "Sternum",
     "Humerus"
    ],
    "a": 1,
    "why": "The clavicle transmits the force and is the commonest fracture overall."
   },
   {
    "q": "The sternal angle corresponds to which vertebral level?",
    "opts": [
     "T2/T3",
     "T4/T5",
     "T8/T9",
     "L1"
    ],
    "a": 1,
    "why": "Sternal angle = T4/T5 disc — the plane of the aortic arch and tracheal bifurcation."
   },
   {
    "q": "A mid-shaft humeral fracture risks which nerve?",
    "opts": [
     "Ulnar",
     "Median",
     "Radial",
     "Axillary"
    ],
    "a": 2,
    "why": "The radial nerve spirals in the radial groove behind the humerus."
   }
  ],
  "related": [
   "muscle",
   "malebody",
   "femalebody"
  ],
  "photo": {
   "file": "skeleton.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "skull": [
     500,
     90
    ],
    "clavicle": [
     450,
     202
    ],
    "sternum": [
     500,
     300
    ],
    "ribs": [
     450,
     322
    ],
    "vertebrae": [
     500,
     402
    ],
    "pelvis": [
     500,
     542
    ],
    "scapula": [
     420,
     242
    ],
    "humerus": [
     400,
     352
    ],
    "radius": [
     385,
     472
    ],
    "ulna": [
     405,
     487
    ],
    "carpals": [
     380,
     562
    ],
    "femur": [
     460,
     662
    ],
    "patella": [
     465,
     762
    ],
    "tibia": [
     465,
     832
    ],
    "fibula": [
     487,
     832
    ],
    "tarsals": [
     470,
     932
    ],
    "spinalig": [
     500,
     402
    ],
    "hiplig": [
     500,
     542
    ],
    "anklig": [
     470,
     932
    ],
    "tmjj": "skeletal",
    "stj": "skeletal",
    "shj": "skeletal",
    "elj": "skeletal",
    "wrj": "skeletal",
    "ivdj": "skeletal",
    "facj": "skeletal",
    "sij": "skeletal",
    "pubj": "skeletal",
    "hipj": "skeletal",
    "kneej": "skeletal",
    "ankj": "skeletal"
   }
  },
  "bones206": [
   {
    "g": "Skull, hyoid & ear ossicles",
    "n": 29,
    "hot": [
     500,
     90
    ],
    "items": [
     [
      "Frontal",
      1
     ],
     [
      "Occipital",
      1
     ],
     [
      "Parietal",
      2
     ],
     [
      "Temporal",
      2
     ],
     [
      "Sphenoid",
      1
     ],
     [
      "Ethmoid",
      1
     ],
     [
      "Maxilla",
      2
     ],
     [
      "Mandible",
      1
     ],
     [
      "Zygomatic",
      2
     ],
     [
      "Nasal",
      2
     ],
     [
      "Lacrimal",
      2
     ],
     [
      "Palatine",
      2
     ],
     [
      "Inferior nasal concha",
      2
     ],
     [
      "Vomer",
      1
     ],
     [
      "Hyoid",
      1
     ],
     [
      "Malleus",
      2
     ],
     [
      "Incus",
      2
     ],
     [
      "Stapes",
      2
     ]
    ],
    "named": [
     {
      "group": "Frontal",
      "bones": [
       "Frontal"
      ]
     },
     {
      "group": "Occipital",
      "bones": [
       "Occipital"
      ]
     },
     {
      "group": "Parietal",
      "bones": [
       "Right Parietal",
       "Left Parietal"
      ]
     },
     {
      "group": "Temporal",
      "bones": [
       "Right Temporal",
       "Left Temporal"
      ]
     },
     {
      "group": "Sphenoid",
      "bones": [
       "Sphenoid"
      ]
     },
     {
      "group": "Ethmoid",
      "bones": [
       "Ethmoid"
      ]
     },
     {
      "group": "Maxilla",
      "bones": [
       "Right Maxilla",
       "Left Maxilla"
      ]
     },
     {
      "group": "Mandible",
      "bones": [
       "Mandible"
      ]
     },
     {
      "group": "Zygomatic",
      "bones": [
       "Right Zygomatic",
       "Left Zygomatic"
      ]
     },
     {
      "group": "Nasal",
      "bones": [
       "Right Nasal",
       "Left Nasal"
      ]
     },
     {
      "group": "Lacrimal",
      "bones": [
       "Right Lacrimal",
       "Left Lacrimal"
      ]
     },
     {
      "group": "Palatine",
      "bones": [
       "Right Palatine",
       "Left Palatine"
      ]
     },
     {
      "group": "Inferior nasal concha",
      "bones": [
       "Right Inferior nasal concha",
       "Left Inferior nasal concha"
      ]
     },
     {
      "group": "Vomer",
      "bones": [
       "Vomer"
      ]
     },
     {
      "group": "Hyoid",
      "bones": [
       "Hyoid"
      ]
     },
     {
      "group": "Malleus",
      "bones": [
       "Right Malleus",
       "Left Malleus"
      ]
     },
     {
      "group": "Incus",
      "bones": [
       "Right Incus",
       "Left Incus"
      ]
     },
     {
      "group": "Stapes",
      "bones": [
       "Right Stapes",
       "Left Stapes"
      ]
     }
    ]
   },
   {
    "g": "Vertebral column",
    "n": 26,
    "hot": [
     500,
     400
    ],
    "items": [
     [
      "Cervical vertebrae",
      7
     ],
     [
      "Thoracic vertebrae",
      12
     ],
     [
      "Lumbar vertebrae",
      5
     ],
     [
      "Sacrum",
      1
     ],
     [
      "Coccyx",
      1
     ]
    ],
    "named": [
     {
      "group": "Cervical vertebrae",
      "bones": [
       "C1 cervical vertebra (atlas)",
       "C2 cervical vertebra (axis)",
       "C3 cervical vertebra",
       "C4 cervical vertebra",
       "C5 cervical vertebra",
       "C6 cervical vertebra",
       "C7 cervical vertebra"
      ]
     },
     {
      "group": "Thoracic vertebrae",
      "bones": [
       "T1 thoracic vertebra",
       "T2 thoracic vertebra",
       "T3 thoracic vertebra",
       "T4 thoracic vertebra",
       "T5 thoracic vertebra",
       "T6 thoracic vertebra",
       "T7 thoracic vertebra",
       "T8 thoracic vertebra",
       "T9 thoracic vertebra",
       "T10 thoracic vertebra",
       "T11 thoracic vertebra",
       "T12 thoracic vertebra"
      ]
     },
     {
      "group": "Lumbar vertebrae",
      "bones": [
       "L1 lumbar vertebra",
       "L2 lumbar vertebra",
       "L3 lumbar vertebra",
       "L4 lumbar vertebra",
       "L5 lumbar vertebra"
      ]
     },
     {
      "group": "Sacrum",
      "bones": [
       "Sacrum"
      ]
     },
     {
      "group": "Coccyx",
      "bones": [
       "Coccyx"
      ]
     }
    ]
   },
   {
    "g": "Thoracic cage",
    "n": 25,
    "hot": [
     485,
     300
    ],
    "items": [
     [
      "Sternum",
      1
     ],
     [
      "Ribs",
      24
     ]
    ],
    "named": [
     {
      "group": "Sternum",
      "bones": [
       "Sternum"
      ]
     },
     {
      "group": "Ribs",
      "bones": [
       "Right rib 1 (true)",
       "Right rib 2 (true)",
       "Right rib 3 (true)",
       "Right rib 4 (true)",
       "Right rib 5 (true)",
       "Right rib 6 (true)",
       "Right rib 7 (true)",
       "Right rib 8 (false)",
       "Right rib 9 (false)",
       "Right rib 10 (false)",
       "Right rib 11 (floating)",
       "Right rib 12 (floating)",
       "Left rib 1 (true)",
       "Left rib 2 (true)",
       "Left rib 3 (true)",
       "Left rib 4 (true)",
       "Left rib 5 (true)",
       "Left rib 6 (true)",
       "Left rib 7 (true)",
       "Left rib 8 (false)",
       "Left rib 9 (false)",
       "Left rib 10 (false)",
       "Left rib 11 (floating)",
       "Left rib 12 (floating)"
      ]
     }
    ]
   },
   {
    "g": "Upper limb",
    "n": 64,
    "hot": [
     450,
     350
    ],
    "items": [
     [
      "Clavicle",
      2
     ],
     [
      "Scapula",
      2
     ],
     [
      "Humerus",
      2
     ],
     [
      "Radius",
      2
     ],
     [
      "Ulna",
      2
     ],
     [
      "Scaphoid",
      2
     ],
     [
      "Lunate",
      2
     ],
     [
      "Triquetrum",
      2
     ],
     [
      "Pisiform",
      2
     ],
     [
      "Trapezium",
      2
     ],
     [
      "Trapezoid",
      2
     ],
     [
      "Capitate",
      2
     ],
     [
      "Hamate",
      2
     ],
     [
      "Metacarpals",
      10
     ],
     [
      "Phalanges (hand)",
      28
     ]
    ],
    "named": [
     {
      "group": "Clavicle",
      "bones": [
       "Right Clavicle",
       "Left Clavicle"
      ]
     },
     {
      "group": "Scapula",
      "bones": [
       "Right Scapula",
       "Left Scapula"
      ]
     },
     {
      "group": "Humerus",
      "bones": [
       "Right Humerus",
       "Left Humerus"
      ]
     },
     {
      "group": "Radius",
      "bones": [
       "Right Radius",
       "Left Radius"
      ]
     },
     {
      "group": "Ulna",
      "bones": [
       "Right Ulna",
       "Left Ulna"
      ]
     },
     {
      "group": "Scaphoid",
      "bones": [
       "Right Scaphoid",
       "Left Scaphoid"
      ]
     },
     {
      "group": "Lunate",
      "bones": [
       "Right Lunate",
       "Left Lunate"
      ]
     },
     {
      "group": "Triquetrum",
      "bones": [
       "Right Triquetrum",
       "Left Triquetrum"
      ]
     },
     {
      "group": "Pisiform",
      "bones": [
       "Right Pisiform",
       "Left Pisiform"
      ]
     },
     {
      "group": "Trapezium",
      "bones": [
       "Right Trapezium",
       "Left Trapezium"
      ]
     },
     {
      "group": "Trapezoid",
      "bones": [
       "Right Trapezoid",
       "Left Trapezoid"
      ]
     },
     {
      "group": "Capitate",
      "bones": [
       "Right Capitate",
       "Left Capitate"
      ]
     },
     {
      "group": "Hamate",
      "bones": [
       "Right Hamate",
       "Left Hamate"
      ]
     },
     {
      "group": "Metacarpals",
      "bones": [
       "Right metacarpal I",
       "Right metacarpal II",
       "Right metacarpal III",
       "Right metacarpal IV",
       "Right metacarpal V",
       "Left metacarpal I",
       "Left metacarpal II",
       "Left metacarpal III",
       "Left metacarpal IV",
       "Left metacarpal V"
      ]
     },
     {
      "group": "Phalanges (hand)",
      "bones": [
       "Right thumb proximal phalanx",
       "Right thumb distal phalanx",
       "Right index finger proximal phalanx",
       "Right index finger middle phalanx",
       "Right index finger distal phalanx",
       "Right middle finger proximal phalanx",
       "Right middle finger middle phalanx",
       "Right middle finger distal phalanx",
       "Right ring finger proximal phalanx",
       "Right ring finger middle phalanx",
       "Right ring finger distal phalanx",
       "Right little finger proximal phalanx",
       "Right little finger middle phalanx",
       "Right little finger distal phalanx",
       "Left thumb proximal phalanx",
       "Left thumb distal phalanx",
       "Left index finger proximal phalanx",
       "Left index finger middle phalanx",
       "Left index finger distal phalanx",
       "Left middle finger proximal phalanx",
       "Left middle finger middle phalanx",
       "Left middle finger distal phalanx",
       "Left ring finger proximal phalanx",
       "Left ring finger middle phalanx",
       "Left ring finger distal phalanx",
       "Left little finger proximal phalanx",
       "Left little finger middle phalanx",
       "Left little finger distal phalanx"
      ]
     }
    ]
   },
   {
    "g": "Lower limb",
    "n": 62,
    "hot": [
     487,
     700
    ],
    "items": [
     [
      "Hip bone",
      2
     ],
     [
      "Femur",
      2
     ],
     [
      "Patella",
      2
     ],
     [
      "Tibia",
      2
     ],
     [
      "Fibula",
      2
     ],
     [
      "Talus",
      2
     ],
     [
      "Calcaneus",
      2
     ],
     [
      "Navicular",
      2
     ],
     [
      "Cuboid",
      2
     ],
     [
      "Medial cuneiform",
      2
     ],
     [
      "Intermediate cuneiform",
      2
     ],
     [
      "Lateral cuneiform",
      2
     ],
     [
      "Metatarsals",
      10
     ],
     [
      "Phalanges (foot)",
      28
     ]
    ],
    "named": [
     {
      "group": "Hip bone",
      "bones": [
       "Right Hip bone",
       "Left Hip bone"
      ]
     },
     {
      "group": "Femur",
      "bones": [
       "Right Femur",
       "Left Femur"
      ]
     },
     {
      "group": "Patella",
      "bones": [
       "Right Patella",
       "Left Patella"
      ]
     },
     {
      "group": "Tibia",
      "bones": [
       "Right Tibia",
       "Left Tibia"
      ]
     },
     {
      "group": "Fibula",
      "bones": [
       "Right Fibula",
       "Left Fibula"
      ]
     },
     {
      "group": "Talus",
      "bones": [
       "Right Talus",
       "Left Talus"
      ]
     },
     {
      "group": "Calcaneus",
      "bones": [
       "Right Calcaneus",
       "Left Calcaneus"
      ]
     },
     {
      "group": "Navicular",
      "bones": [
       "Right Navicular",
       "Left Navicular"
      ]
     },
     {
      "group": "Cuboid",
      "bones": [
       "Right Cuboid",
       "Left Cuboid"
      ]
     },
     {
      "group": "Medial cuneiform",
      "bones": [
       "Right Medial cuneiform",
       "Left Medial cuneiform"
      ]
     },
     {
      "group": "Intermediate cuneiform",
      "bones": [
       "Right Intermediate cuneiform",
       "Left Intermediate cuneiform"
      ]
     },
     {
      "group": "Lateral cuneiform",
      "bones": [
       "Right Lateral cuneiform",
       "Left Lateral cuneiform"
      ]
     },
     {
      "group": "Metatarsals",
      "bones": [
       "Right metatarsal I",
       "Right metatarsal II",
       "Right metatarsal III",
       "Right metatarsal IV",
       "Right metatarsal V",
       "Left metatarsal I",
       "Left metatarsal II",
       "Left metatarsal III",
       "Left metatarsal IV",
       "Left metatarsal V"
      ]
     },
     {
      "group": "Phalanges (foot)",
      "bones": [
       "Right big toe proximal phalanx",
       "Right big toe distal phalanx",
       "Right second toe proximal phalanx",
       "Right second toe middle phalanx",
       "Right second toe distal phalanx",
       "Right third toe proximal phalanx",
       "Right third toe middle phalanx",
       "Right third toe distal phalanx",
       "Right fourth toe proximal phalanx",
       "Right fourth toe middle phalanx",
       "Right fourth toe distal phalanx",
       "Right fifth toe proximal phalanx",
       "Right fifth toe middle phalanx",
       "Right fifth toe distal phalanx",
       "Left big toe proximal phalanx",
       "Left big toe distal phalanx",
       "Left second toe proximal phalanx",
       "Left second toe middle phalanx",
       "Left second toe distal phalanx",
       "Left third toe proximal phalanx",
       "Left third toe middle phalanx",
       "Left third toe distal phalanx",
       "Left fourth toe proximal phalanx",
       "Left fourth toe middle phalanx",
       "Left fourth toe distal phalanx",
       "Left fifth toe proximal phalanx",
       "Left fifth toe middle phalanx",
       "Left fifth toe distal phalanx"
      ]
     }
    ]
   }
  ],
  "joints": [
   {
    "n": "Temporomandibular joint",
    "l": "Articulatio temporomandibularis",
    "type": "Synovial · condylar",
    "img": "tmj.jpg",
    "hot": [
     540,
     465
    ],
    "mv": "Depression, elevation, protrusion, retrusion, grinding",
    "inner": [
     "Articular disc",
     "Fibrous capsule",
     "Lateral ligament",
     "Sphenomandibular ligament",
     "Stylomandibular ligament"
    ],
    "cl": "Disc displacement → clicking and closed lock."
   },
   {
    "n": "Cranial sutures",
    "l": "Suturae cranii",
    "type": "Fibrous · synarthrosis",
    "img": "tmj.jpg",
    "hot": [
     470,
     170
    ],
    "mv": "None in adult; mouldable at birth",
    "inner": [
     "Coronal suture",
     "Sagittal suture",
     "Lambdoid suture",
     "Squamous suture",
     "Fontanelles (infant)"
    ],
    "cl": "Premature fusion → craniosynostosis."
   },
   {
    "n": "Atlanto-occipital joint",
    "l": "Articulatio atlantooccipitalis",
    "type": "Synovial · condylar",
    "img": "spine.jpg",
    "hot": [
     500,
     110
    ],
    "mv": "Nodding “yes”",
    "inner": [
     "Paired condylar capsules",
     "Anterior atlanto-occipital membrane",
     "Posterior atlanto-occipital membrane",
     "Tectorial membrane"
    ],
    "cl": "Dislocated in high cervical trauma."
   },
   {
    "n": "Atlanto-axial joint",
    "l": "Articulatio atlantoaxialis",
    "type": "Synovial · pivot",
    "img": "spine.jpg",
    "hot": [
     500,
     160
    ],
    "mv": "Shaking “no” (rotation)",
    "inner": [
     "Dens of axis",
     "Transverse ligament",
     "Alar ligaments",
     "Apical ligament"
    ],
    "cl": "Transverse ligament laxity in RA and Down syndrome."
   },
   {
    "n": "Intervertebral joints (discs)",
    "l": "Symphyses intervertebrales",
    "type": "Cartilaginous · symphysis",
    "img": "spine.jpg",
    "hot": [
     500,
     420
    ],
    "mv": "Small glide summed into spinal flexion",
    "inner": [
     "Annulus fibrosus",
     "Nucleus pulposus",
     "Cartilage endplates",
     "Anterior & posterior longitudinal ligaments"
    ],
    "cl": "Posterolateral herniation compresses nerve roots → sciatica."
   },
   {
    "n": "Zygapophyseal (facet) joints",
    "l": "Articulationes zygapophyseales",
    "type": "Synovial · plane",
    "img": "spine.jpg",
    "hot": [
     560,
     380
    ],
    "mv": "Guide segmental glide",
    "inner": [
     "Joint capsules",
     "Hyaline cartilage surfaces",
     "Meniscoid inclusions",
     "Ligamentum flavum behind"
    ],
    "cl": "Facet arthropathy → mechanical back pain."
   },
   {
    "n": "Costovertebral joints",
    "l": "Articulationes costovertebrales",
    "type": "Synovial",
    "img": "spine.jpg",
    "hot": [
     430,
     300
    ],
    "mv": "Pump- and bucket-handle breathing",
    "inner": [
     "Joint of head of rib",
     "Radiate ligament",
     "Costotransverse joint & ligament"
    ],
    "cl": "Strain mimics pleuritic chest pain."
   },
   {
    "n": "Sacrococcygeal joint",
    "l": "Articulatio sacrococcygea",
    "type": "Symphysis",
    "img": "spine.jpg",
    "hot": [
     500,
     800
    ],
    "mv": "Slight rocking in childbirth",
    "inner": [
     "Fibrocartilage disc",
     "Anterior & posterior sacrococcygeal ligaments"
    ],
    "cl": "Falls on the buttocks → coccydynia."
   },
   {
    "n": "Sternoclavicular joint",
    "l": "Articulatio sternoclavicularis",
    "type": "Synovial · saddle",
    "img": "shoulder.jpg",
    "hot": [
     500,
     250
    ],
    "mv": "Clavicle elevation, protraction, rotation",
    "inner": [
     "Articular disc",
     "Costoclavicular ligament",
     "Interclavicular ligament",
     "Anterior & posterior SC ligaments"
    ],
    "cl": "Posterior dislocation can compress great vessels."
   },
   {
    "n": "Acromioclavicular joint",
    "l": "Articulatio acromioclavicularis",
    "type": "Synovial · plane",
    "img": "shoulder.jpg",
    "hot": [
     560,
     240
    ],
    "mv": "Scapular rotation glide",
    "inner": [
     "AC ligament",
     "Coracoclavicular ligament (conoid + trapezoid)"
    ],
    "cl": "Shoulder separation = torn CC ligaments."
   },
   {
    "n": "Glenohumeral (shoulder) joint",
    "l": "Articulatio glenohumeralis",
    "type": "Synovial · ball & socket",
    "img": "shoulder.jpg",
    "hot": [
     500,
     400
    ],
    "mv": "Most mobile joint — all axes",
    "inner": [
     "Glenoid labrum",
     "Capsule + 3 glenohumeral ligaments",
     "Rotator cuff tendons",
     "Subacromial bursa",
     "Long head of biceps tendon"
    ],
    "cl": "Anterior dislocation with Bankart lesion."
   },
   {
    "n": "Elbow joint",
    "l": "Articulatio cubiti",
    "type": "Synovial · hinge",
    "img": "elbow.jpg",
    "hot": [
     500,
     450
    ],
    "mv": "Flexion–extension",
    "inner": [
     "Trochlear notch & olecranon",
     "Joint capsule",
     "Ulnar collateral ligament",
     "Radial collateral ligament",
     "Olecranon bursa"
    ],
    "cl": "Supracondylar fracture may trap the brachial artery."
   },
   {
    "n": "Proximal radioulnar joint",
    "l": "Articulatio radioulnaris proximalis",
    "type": "Synovial · pivot",
    "img": "elbow.jpg",
    "hot": [
     470,
     490
    ],
    "mv": "Pronation–supination",
    "inner": [
     "Annular ligament",
     "Quadrate ligament",
     "Radial notch of ulna"
    ],
    "cl": "Pulled-elbow: radial head slips the annular ligament."
   },
   {
    "n": "Distal radioulnar joint",
    "l": "Articulatio radioulnaris distalis",
    "type": "Synovial · pivot",
    "img": "wrist.jpg",
    "hot": [
     480,
     430
    ],
    "mv": "Pronation–supination",
    "inner": [
     "Articular disc (TFCC)",
     "Volar & dorsal DRU ligaments"
    ],
    "cl": "TFCC tears cause ulnar-sided wrist pain."
   },
   {
    "n": "Radiocarpal (wrist) joint",
    "l": "Articulatio radiocarpea",
    "type": "Synovial · condylar",
    "img": "wrist.jpg",
    "hot": [
     500,
     470
    ],
    "mv": "Flexion, extension, deviation",
    "inner": [
     "Scaphoid–lunate–triquetrum row",
     "Palmar radiocarpal ligaments",
     "Articular disc"
    ],
    "cl": "FOOSH → scaphoid fracture, snuffbox tenderness."
   },
   {
    "n": "Intercarpal joints",
    "l": "Articulationes intercarpeae",
    "type": "Synovial · plane",
    "img": "wrist.jpg",
    "hot": [
     500,
     530
    ],
    "mv": "Small glides adding wrist range",
    "inner": [
     "Interosseous intercarpal ligaments",
     "Scapholunate ligament",
     "Lunotriquetral ligament"
    ],
    "cl": "Scapholunate dissociation → Terry-Thomas sign."
   },
   {
    "n": "Carpometacarpal & thumb saddle",
    "l": "Articulatio carpometacarpalis pollicis",
    "type": "Synovial · saddle",
    "img": "wrist.jpg",
    "hot": [
     460,
     600
    ],
    "mv": "Thumb opposition",
    "inner": [
     "Anterior oblique (beak) ligament",
     "Dorsal radial ligament",
     "First CMC capsule"
    ],
    "cl": "1st CMC osteoarthritis → weak pinch."
   },
   {
    "n": "Metacarpophalangeal joints",
    "l": "Articulationes metacarpophalangeae",
    "type": "Synovial · condylar",
    "img": "wrist.jpg",
    "hot": [
     500,
     680
    ],
    "mv": "Flex–extend + spread",
    "inner": [
     "Collateral ligaments",
     "Palmar plates",
     "Deep transverse metacarpal ligament"
    ],
    "cl": "Ulnar drift in rheumatoid arthritis."
   },
   {
    "n": "Interphalangeal joints (hand)",
    "l": "Articulationes interphalangeae manus",
    "type": "Synovial · hinge",
    "img": "wrist.jpg",
    "hot": [
     500,
     750
    ],
    "mv": "Flexion–extension",
    "inner": [
     "Collateral ligaments",
     "Fibrous flexor sheath pulleys"
    ],
    "cl": "Boutonnière and swan-neck deformities."
   },
   {
    "n": "Hip joint",
    "l": "Articulatio coxae",
    "type": "Synovial · ball & socket",
    "img": "hip.jpg",
    "hot": [
     500,
     450
    ],
    "mv": "Weight-bearing, all axes",
    "inner": [
     "Acetabular labrum",
     "Ligament of head of femur",
     "Iliofemoral ligament",
     "Pubofemoral & ischiofemoral ligaments",
     "Zona orbicularis"
    ],
    "cl": "Femoral neck fracture; developmental dysplasia."
   },
   {
    "n": "Sacroiliac joint",
    "l": "Articulatio sacroiliaca",
    "type": "Synovial plane + fibrous",
    "img": "hip.jpg",
    "hot": [
     470,
     330
    ],
    "mv": "Minimal glide; load transfer",
    "inner": [
     "Interosseous sacroiliac ligaments",
     "Posterior sacroiliac ligament",
     "Sacrospinous & sacrotuberous ligaments"
    ],
    "cl": "Sacroiliitis in ankylosing spondylitis."
   },
   {
    "n": "Pubic symphysis",
    "l": "Symphysis pubica",
    "type": "Symphysis",
    "img": "hip.jpg",
    "hot": [
     545,
     560
    ],
    "mv": "Micro-movement; widens in pregnancy",
    "inner": [
     "Fibrocartilage disc",
     "Superior & inferior pubic ligaments"
    ],
    "cl": "Relaxin-driven widening → pelvic girdle pain."
   },
   {
    "n": "Knee (tibiofemoral) joint",
    "l": "Articulatio genus",
    "type": "Synovial · modified hinge",
    "img": "knee.jpg",
    "hot": [
     500,
     480
    ],
    "mv": "Flex–extend + rotation in flexion",
    "inner": [
     "ACL & PCL",
     "MCL & LCL",
     "Medial & lateral menisci",
     "Capsule + synovium"
    ],
    "cl": "Unhappy triad: ACL + MCL + medial meniscus."
   },
   {
    "n": "Patellofemoral joint",
    "l": "Articulatio patellofemoralis",
    "type": "Synovial · plane",
    "img": "knee.jpg",
    "hot": [
     500,
     600
    ],
    "mv": "Patellar glide in the trochlea",
    "inner": [
     "Patellar articular surface",
     "Femoral trochlea",
     "Medial & lateral retinacula"
    ],
    "cl": "Chondromalacia patellae → anterior knee pain."
   },
   {
    "n": "Tibiofibular joints",
    "l": "Articulationes tibiofibulares",
    "type": "Synovial plane + syndesmosis",
    "img": "knee.jpg",
    "hot": [
     560,
     520
    ],
    "mv": "Minimal glide",
    "inner": [
     "Anterior & posterior tibiofibular ligaments",
     "Interosseous membrane"
    ],
    "cl": "Maisonneuve fracture disrupts the syndesmosis."
   },
   {
    "n": "Talocrural (ankle) joint",
    "l": "Articulatio talocruralis",
    "type": "Synovial · hinge",
    "img": "ankle.jpg",
    "hot": [
     500,
     450
    ],
    "mv": "Dorsi- and plantar-flexion",
    "inner": [
     "Tibial plafond & malleolar mortise",
     "Deltoid ligament",
     "Lateral collaterals (ATFL, CFL, PTFL)"
    ],
    "cl": "Inversion sprain tears ATFL first."
   },
   {
    "n": "Subtalar joint",
    "l": "Articulatio subtalaris",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     500,
     520
    ],
    "mv": "Inversion–eversion",
    "inner": [
     "Interosseous talocalcaneal ligament",
     "Sinus tarsi",
     "Medial & lateral talocalcaneal ligaments"
    ],
    "cl": "Sinus tarsi syndrome after sprains."
   },
   {
    "n": "Midtarsal & tarsometatarsal joints",
    "l": "Articulatio tarsi transversa",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     500,
     600
    ],
    "mv": "Forefoot twist on uneven ground",
    "inner": [
     "Bifurcate ligament",
     "Dorsal & plantar tarsal ligaments",
     "Lisfranc ligament"
    ],
    "cl": "Lisfranc injury is easily missed on X-ray."
   },
   {
    "n": "Metatarsophalangeal & toe IP joints",
    "l": "Articulationes metatarsophalangeae",
    "type": "Synovial · condylar",
    "img": "ankle.jpg",
    "hot": [
     500,
     720
    ],
    "mv": "Toe flex–extend, push-off in gait",
    "inner": [
     "Collateral ligaments",
     "Plantar plates",
     "Deep transverse metatarsal ligament"
    ],
    "cl": "Hallux valgus bunion at the 1st MTP."
   },
   {
    "n": "Manubriosternal joint",
    "l": "Symphysis manubriosternalis",
    "type": "Cartilaginous · symphysis",
    "img": "spine.jpg",
    "hot": [
     390,
     290
    ],
    "mv": "Tiny elastic motion with breathing",
    "inner": [
     "Fibrocartilage between manubrium and body",
     "Sternal angle (T4–T5 landmark)"
    ],
    "cl": "May ossify with age; costal cartilage 2 attaches here."
   },
   {
    "n": "Xiphisternal joint",
    "l": "Synchondrosis xiphisternalis",
    "type": "Cartilaginous · synchondrosis",
    "img": "spine.jpg",
    "hot": [
     390,
     455
    ],
    "mv": "Minimal",
    "inner": [
     "Hyaline cartilage union between xiphoid and sternal body"
    ],
    "cl": "CPR compressions must stay above xiphoid."
   },
   {
    "n": "Sternocostal joints",
    "l": "Articulationes sternocostales",
    "type": "Synovial planes / synchondrosis",
    "img": "spine.jpg",
    "hot": [
     410,
     320
    ],
    "mv": "Small rib motion during breathing",
    "inner": [
     "Rib 1 primary cartilaginous union",
     "Ribs 2–7 synovial articulations",
     "Radiate sternocostal ligaments",
     "Intra-articular ligament of 2nd rib"
    ],
    "cl": "Costochondritis causes focal parasternal tenderness."
   },
   {
    "n": "Costochondral joints",
    "l": "Articulationes costochondrales",
    "type": "Cartilaginous · synchondrosis",
    "img": "spine.jpg",
    "hot": [
     430,
     310
    ],
    "mv": "Elastic rib–cartilage continuity",
    "inner": [
     "Hyaline costal cartilage",
     "Perichondrium continuous with periosteum"
    ],
    "cl": "Separated costochondral junction causes chest-wall pain."
   },
   {
    "n": "Interchondral joints",
    "l": "Articulationes interchondrales",
    "type": "Synovial / fibrous",
    "img": "spine.jpg",
    "hot": [
     430,
     380
    ],
    "mv": "Small glide between lower costal cartilages",
    "inner": [
     "Cartilages of ribs 6–9",
     "Interchondral ligament bridges"
    ],
    "cl": "Slipping rib syndrome is hypermobility of lower cartilages."
   },
   {
    "n": "Lumbosacral joint",
    "l": "Articulatio lumbosacralis",
    "type": "Disc + facet joints",
    "img": "spine.jpg",
    "hot": [
     505,
     690
    ],
    "mv": "Flexion and load transfer between L5 and S1",
    "inner": [
     "L5–S1 intervertebral disc",
     "L5–S1 facet capsules",
     "Iliolumbar ligament"
    ],
    "cl": "Common site of herniation and spondylolisthesis."
   },
   {
    "n": "Intermetacarpal joints",
    "l": "Articulationes intermetacarpales",
    "type": "Synovial · plane",
    "img": "wrist.jpg",
    "hot": [
     500,
     630
    ],
    "mv": "Tiny gliding of metacarpal bases",
    "inner": [
     "Dorsal & palmar metacarpal ligaments",
     "Interosseous ligaments"
    ],
    "cl": "Instability after carpometacarpal fracture-dislocations."
   },
   {
    "n": "Pisotriquetral joint",
    "l": "Articulatio pisotriquetralis",
    "type": "Synovial · plane",
    "img": "wrist.jpg",
    "hot": [
     555,
     525
    ],
    "mv": "Minor glide in hypothenar mechanics",
    "inner": [
     "Pisohamate ligament",
     "Pisometacarpal ligament",
     "FCU tendon"
    ],
    "cl": "Pisiform arthritis → ulnar wrist pain."
   },
   {
    "n": "Distal tibiofibular syndesmosis",
    "l": "Syndesmosis tibiofibularis",
    "type": "Fibrous · syndesmosis",
    "img": "ankle.jpg",
    "hot": [
     485,
     370
    ],
    "mv": "Slight spread of mortise in dorsiflexion",
    "inner": [
     "Anterior inferior tibiofibular ligament",
     "Posterior inferior tibiofibular ligament",
     "Interosseous ligament"
    ],
    "cl": "High ankle sprain tears the syndesmosis."
   },
   {
    "n": "Talonavicular joint",
    "l": "Articulatio talonavicularis",
    "type": "Synovial · ball & socket component",
    "img": "ankle.jpg",
    "hot": [
     530,
     580
    ],
    "mv": "Midfoot pronation–supination",
    "inner": [
     "Spring (plantar calcaneonavicular) ligament",
     "Dorsal talonavicular ligament"
    ],
    "cl": "Spring ligament failure → acquired flatfoot."
   },
   {
    "n": "Calcaneocuboid joint",
    "l": "Articulatio calcaneocuboidea",
    "type": "Synovial · saddle",
    "img": "ankle.jpg",
    "hot": [
     550,
     600
    ],
    "mv": "Midfoot locking and release in gait",
    "inner": [
     "Long plantar ligament",
     "Short plantar ligament",
     "Bifurcate ligament"
    ],
    "cl": "Cuboid syndrome causes lateral midfoot pain."
   },
   {
    "n": "Naviculocuneiform joints",
    "l": "Articulationes cuneonaviculares",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     550,
     645
    ],
    "mv": "Small midfoot arch deformation",
    "inner": [
     "Dorsal & plantar cuneonavicular ligaments",
     "Interosseous ligament complex"
    ],
    "cl": "Arthrosis contributes to midfoot pain."
   },
   {
    "n": "Intercuneiform & cuneocuboid joints",
    "l": "Articulationes intercuneiformes",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     510,
     650
    ],
    "mv": "Micro-glides across the tarsus",
    "inner": [
     "Dorsal & plantar ligaments",
     "Interosseous intertarsal ligaments"
    ],
    "cl": "Subtle midfoot instability after twist injury."
   },
   {
    "n": "Tarsometatarsal (Lisfranc) joints",
    "l": "Articulationes tarsometatarsales",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     500,
     675
    ],
    "mv": "Small column glide and arch support",
    "inner": [
     "Lisfranc ligament (medial cuneiform to metatarsal II)",
     "Dorsal & plantar tarsometatarsal ligaments"
    ],
    "cl": "Lisfranc ligament tear may be missed on non-weight-bearing X-rays."
   },
   {
    "n": "Intermetatarsal joints",
    "l": "Articulationes intermetatarsales",
    "type": "Synovial · plane",
    "img": "ankle.jpg",
    "hot": [
     500,
     715
    ],
    "mv": "Minor gliding of metatarsal bases",
    "inner": [
     "Dorsal & plantar intermetatarsal ligaments",
     "Interosseous metatarsal ligaments"
    ],
    "cl": "Forefoot instability after midfoot sprain."
   },
   {
    "n": "Toe interphalangeal joints",
    "l": "Articulationes interphalangeae pedis",
    "type": "Synovial · hinge",
    "img": "ankle.jpg",
    "hot": [
     500,
     780
    ],
    "mv": "Toe flexion–extension",
    "inner": [
     "Collateral ligaments",
     "Plantar plates",
     "Fibrous flexor tendon sheath"
    ],
    "cl": "Hammer toe and mallet toe deformity."
   }
  ]
 },
 "muscle": {
  "title": "Muscular system",
  "latin": "Systema musculare",
  "system": "muscular",
  "region": "≈ 600 skeletal muscles",
  "size": "40% of body mass",
  "blood": "Segmental + named arteries",
  "nerve": "Somatic motor nerves",
  "blurb": "Every movement, every breath, every heartbeat's preload begins as muscle fibres sliding — here the skeletal set in écorché.",
  "summary": "Surface-to-deep anterior musculature: origin-insertion logic and the clinical test for each.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#b05252",
    "Muscular system"
   ]
  ],
  "parts": {
   "scm": {
    "n": "Sternocleidomastoid",
    "l": "M. sternocleidomastoideus",
    "t": "Muscle",
    "d": "Mastoid to sternum+clavicle.",
    "f": "Head rotation and neck flexion.",
    "c": "Torticollis; landmark for carotid pulse.",
    "at": [
     768,
     154.8
    ],
    "s": "l"
   },
   "trap": {
    "n": "Trapezius",
    "l": "M. trapezius",
    "t": "Muscle",
    "d": "Occiput to scapular spine.",
    "f": "Shrug and scapular rotation.",
    "c": "Accessory nerve palsy → shrug weakness.",
    "at": [
     851.2,
     181.8
    ],
    "s": "r"
   },
   "deltoid": {
    "n": "Deltoid",
    "l": "M. deltoideus",
    "t": "Muscle",
    "d": "Clavicle/scapula to humeral shaft.",
    "f": "Arm abduction beyond 15°.",
    "c": "IM injection site — axillary nerve beneath.",
    "at": [
     672,
     208.8
    ],
    "s": "l"
   },
   "pecmajor": {
    "n": "Pectoralis major",
    "l": "M. pectoralis major",
    "t": "Muscle",
    "d": "Clavicle/sternum to humerus.",
    "f": "Arm adduction and push power.",
    "c": "Torn in bench-press injuries.",
    "at": [
     736,
     262.8
    ],
    "s": "l"
   },
   "biceps": {
    "n": "Biceps brachii",
    "l": "M. biceps brachii",
    "t": "Muscle",
    "d": "Scapula to radial tuberosity.",
    "f": "Elbow flexion + supination.",
    "c": "Long-head tendon rupture → Popeye deformity.",
    "at": [
     640,
     316.8
    ],
    "s": "l"
   },
   "forearm": {
    "n": "Forearm flexors",
    "l": "Mm. flexores antebrachii",
    "t": "Muscle",
    "d": "Medial epicondyle group.",
    "f": "Wrist and finger flexion.",
    "c": "Golfer's elbow = medial epicondylitis.",
    "at": [
     616,
     424.8
    ],
    "s": "l"
   },
   "rectab": {
    "n": "Rectus abdominis",
    "l": "M. rectus abdominis",
    "t": "Muscle",
    "d": "Pubis to costal cartilages.",
    "f": "Trunk flexion; core pressure.",
    "c": "Diastasis recti postpartum — midline gap.",
    "at": [
     800,
     388.8
    ],
    "s": "r"
   },
   "obliques": {
    "n": "External obliques",
    "l": "M. obliquus externus",
    "t": "Muscle",
    "d": "Ribs to iliac crest + linea alba.",
    "f": "Trunk rotation and lateral flexion.",
    "c": "Inguinal canal roof — hernia repairs use it.",
    "at": [
     739.2,
     406.8
    ],
    "s": "l"
   },
   "lat": {
    "n": "Latissimus dorsi",
    "l": "M. latissimus dorsi",
    "t": "Muscle",
    "d": "Spine/iliac to humeral groove.",
    "f": "Powerful adduction — climbing and pulling.",
    "c": "Flap donor for breast reconstruction.",
    "at": [
     664,
     352.8
    ],
    "s": "l"
   },
   "quads": {
    "n": "Quadriceps femoris",
    "l": "M. quadriceps femoris",
    "t": "Muscle",
    "d": "Four heads to patellar tendon.",
    "f": "Knee extension — standing and stairs.",
    "c": "Quadriceps lag after knee surgery.",
    "at": [
     736,
     613.8000000000001
    ],
    "s": "l"
   },
   "tibant": {
    "n": "Tibialis anterior",
    "l": "M. tibialis anterior",
    "t": "Muscle",
    "d": "Tibia to medial cuneiform.",
    "f": "Dorsiflexion of the foot.",
    "c": "Weakness → foot drop and high-stepping gait.",
    "at": [
     744,
     739.8000000000001
    ],
    "s": "l"
   },
   "adductors": {
    "n": "Adductor group",
    "l": "Mm. adductores",
    "t": "Muscle",
    "d": "Pubis to femoral linea aspera.",
    "f": "Thigh adduction and groin stability.",
    "c": "Groin strains in footballers.",
    "at": [
     777.6,
     595.8000000000001
    ],
    "s": "l"
   },
   "serratus": {
    "n": "Serratus anterior",
    "l": "M. serratus anterior",
    "t": "Muscle",
    "d": "Ribs to medial scapula.",
    "f": "Scapular protraction and holding.",
    "c": "Long thoracic nerve palsy → winged scapula.",
    "at": [
     700.8000000000001,
     298.8
    ],
    "s": "l"
   },
   "achilles": {
    "n": "Achilles (calcaneal) tendon",
    "l": "Tendo calcaneus",
    "t": "Tendon",
    "d": "Gastrocnemius + soleus onto the calcaneus.",
    "f": "Push-off power in gait and sprint.",
    "c": "Rupture: sudden pop; Thompson test positive.",
    "at": [
     752,
     814.5
    ],
    "s": "l"
   },
   "patellart": {
    "n": "Patellar tendon",
    "l": "Lig. patellae",
    "t": "Tendon",
    "d": "Patella to tibial tuberosity.",
    "f": "Completes the knee extensor mechanism.",
    "c": "Jumper's knee = its overuse tendinopathy.",
    "at": [
     744,
     700.2
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"scm\" cx=\"768\" cy=\"154.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"trap\" cx=\"851.2\" cy=\"181.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"deltoid\" cx=\"672\" cy=\"208.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pecmajor\" cx=\"736\" cy=\"262.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"biceps\" cx=\"640\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"forearm\" cx=\"616\" cy=\"424.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rectab\" cx=\"800\" cy=\"388.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"obliques\" cx=\"739.2\" cy=\"406.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lat\" cx=\"664\" cy=\"352.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"quads\" cx=\"736\" cy=\"613.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"tibant\" cx=\"744\" cy=\"739.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"adductors\" cx=\"777.6\" cy=\"595.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"serratus\" cx=\"700.8000000000001\" cy=\"298.8\" rx=\"52\" ry=\"38\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Winging of the scapula indicates injury to which nerve?",
    "opts": [
     "Accessory",
     "Long thoracic",
     "Suprascapular",
     "Dorsal scapular"
    ],
    "a": 1,
    "why": "Long thoracic nerve supplies serratus anterior, which holds the scapula flat."
   },
   {
    "q": "The safe deltoid IM injection avoids which nerve?",
    "opts": [
     "Radial",
     "Axillary",
     "Median",
     "Musculocutaneous"
    ],
    "a": 1,
    "why": "The axillary nerve wraps the surgical neck just below the deltoid."
   },
   {
    "q": "Foot drop results from weakness of…",
    "opts": [
     "Gastrocnemius",
     "Tibialis anterior",
     "Quadriceps",
     "Hamstrings"
    ],
    "a": 1,
    "why": "Tibialis anterior dorsiflexes; common fibular nerve palsy silences it."
   }
  ],
  "related": [
   "skeleton",
   "malebody",
   "femalebody"
  ],
  "photo": {
   "file": "muscle.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "scm": [
     480,
     172
    ],
    "trap": [
     532,
     202
    ],
    "deltoid": [
     420,
     232
    ],
    "pecmajor": [
     460,
     292
    ],
    "biceps": [
     400,
     352
    ],
    "forearm": [
     385,
     472
    ],
    "rectab": [
     500,
     432
    ],
    "obliques": [
     462,
     452
    ],
    "lat": [
     415,
     392
    ],
    "quads": [
     460,
     682
    ],
    "tibant": [
     465,
     822
    ],
    "adductors": [
     486,
     662
    ],
    "serratus": [
     438,
     332
    ],
    "achilles": [
     470,
     905
    ],
    "patellart": [
     465,
     778
    ]
   }
  }
 },
 "lymph": {
  "title": "Lymphatic system",
  "latin": "Systema lymphoideum",
  "system": "lymphatic",
  "region": "Whole body",
  "size": "≈ 600 nodes · 3 L lymph/day",
  "blood": "Returns via subclavian veins",
  "nerve": "Autonomic on vessels",
  "blurb": "The body's drainage and defence network: interstitial fluid returns as lymph, filtered node by node, while immune cells patrol.",
  "summary": "Node groups, trunks and the organs of immunity — with the clinical rule that nodes enlarge downstream of infection and cancer.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#4a7c59",
    "Lymphatic & immune"
   ]
  ],
  "parts": {
   "cervn": {
    "n": "Cervical nodes",
    "l": "Ll. cervicales",
    "t": "Nodes",
    "d": "Chains along jugular and spine.",
    "f": "Drain head and neck.",
    "c": "Rubbery vs hard-fixed distinguishes infection from malignancy.",
    "at": [
     800,
     154.8
    ],
    "s": "r"
   },
   "axn": {
    "n": "Axillary nodes",
    "l": "Ll. axillares",
    "t": "Nodes",
    "d": "Five groups in the armpit.",
    "f": "Drain arm, breast and chest wall.",
    "c": "Sentinel node first receives breast cancer cells.",
    "at": [
     672,
     235.8
    ],
    "s": "l"
   },
   "ingn": {
    "n": "Inguinal nodes",
    "l": "Ll. inguinales",
    "t": "Nodes",
    "d": "Horizontal + vertical groups in the groin.",
    "f": "Drain leg, perineum and lower abdominal wall.",
    "c": "Enlarge in leg infections and STIs.",
    "at": [
     720,
     505.8
    ],
    "s": "l"
   },
   "td": {
    "n": "Thoracic duct",
    "l": "Ductus thoracicus",
    "t": "Trunk",
    "d": "Largest lymph channel, cisterna chyli to left venous angle.",
    "f": "Returns 3/4 of body lymph.",
    "c": "Chylothorax if torn in chest surgery.",
    "at": [
     816,
     316.8
    ],
    "s": "r"
   },
   "thymus": {
    "n": "Thymus",
    "l": "Thymus",
    "t": "Organ",
    "d": "Bilobed school for T cells, behind sternum.",
    "f": "T-cell maturation in childhood.",
    "c": "Thymic hyperplasia accompanies myasthenia gravis.",
    "at": [
     800,
     262.8
    ],
    "s": "r"
   },
   "spleenl": {
    "n": "Spleen",
    "l": "Splen / Lien",
    "t": "Organ",
    "d": "Largest lymphoid organ, left upper quadrant.",
    "f": "Filters blood; recycles iron; antibodies.",
    "c": "Splenectomy → lifelong encapsulated-organism risk.",
    "at": [
     864,
     379.8
    ],
    "s": "r"
   },
   "tonsils": {
    "n": "Tonsils & Waldeyer ring",
    "l": "Tonsillae",
    "t": "Organ",
    "d": "Lymphoid ring at the oro/nasopharynx.",
    "f": "First-line sampling of inhaled/ingested antigens.",
    "c": "Tonsillitis causes painful swallowing and trismus.",
    "at": [
     800,
     136.8
    ],
    "s": "r"
   },
   "peyer": {
    "n": "Peyer's patches (MALT)",
    "l": "Folliculi lymphatici",
    "t": "Organ",
    "d": "Lymphoid follicles in ileal wall.",
    "f": "Samples gut antigens.",
    "c": "Typhoid classically inflames them → perforation risk.",
    "at": [
     800,
     433.8
    ],
    "s": "r"
   },
   "lvess": {
    "n": "Lymphatic vessels",
    "l": "Vasa lymphatica",
    "t": "Vessels",
    "d": "Blind-start capillaries to trunks.",
    "f": "Returns 3 L of interstitial fluid daily.",
    "c": "Blockage → lymphoedema (filariasis worldwide).",
    "at": [
     640,
     361.8
    ],
    "s": "l"
   },
   "cc": {
    "n": "Cisterna chyli",
    "l": "Cisterna chyli",
    "t": "Trunk",
    "d": "Sac at L1 collecting lumbar + intestinal trunks.",
    "f": "Origin of the thoracic duct.",
    "c": "Visible on MRI as a thin-walled sac.",
    "at": [
     808,
     406.8
    ],
    "s": "r"
   },
   "rld": {
    "n": "Right lymphatic duct",
    "l": "Ductus lymphaticus dexter",
    "t": "Trunk",
    "d": "Short duct at right venous angle.",
    "f": "Drains right head, arm and chest.",
    "c": "Injury is rare but causes right chylothorax.",
    "at": [
     848,
     235.8
    ],
    "s": "r"
   },
   "node": {
    "n": "Lymph node (structure)",
    "l": "Ll. structura",
    "t": "Nodes",
    "d": "Capsule, cortex follicles, medulla sinuses.",
    "f": "Filters lymph; activates B and T cells.",
    "c": "Painless hard node >2 weeks needs biopsy.",
    "at": [
     688,
     271.8
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"cervn\" cx=\"800\" cy=\"154.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"axn\" cx=\"672\" cy=\"235.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ingn\" cx=\"720\" cy=\"505.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"td\" cx=\"816\" cy=\"316.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"thymus\" cx=\"800\" cy=\"262.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"spleenl\" cx=\"864\" cy=\"379.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"tonsils\" cx=\"800\" cy=\"136.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"peyer\" cx=\"800\" cy=\"433.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lvess\" cx=\"640\" cy=\"361.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cc\" cx=\"808\" cy=\"406.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rld\" cx=\"848\" cy=\"235.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"node\" cx=\"688\" cy=\"271.8\" rx=\"52\" ry=\"38\" fill=\"#4a7c59\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The thoracic duct empties into the…",
    "opts": [
     "Right venous angle",
     "Left venous angle",
     "IVC",
     "Portal vein"
    ],
    "a": 1,
    "why": "It drains into the junction of left subclavian and internal jugular veins."
   },
   {
    "q": "After splenectomy patients need vaccines against…",
    "opts": [
     "Viruses only",
     "Encapsulated bacteria",
     "Fungi",
     "Parasites"
    ],
    "a": 1,
    "why": "The spleen clears encapsulated organisms like pneumococcus and meningococcus."
   },
   {
    "q": "Peyer's patches are concentrated in the…",
    "opts": [
     "Stomach",
     "Duodenum",
     "Ileum",
     "Rectum"
    ],
    "a": 2,
    "why": "MALT follicles cluster in the terminal ileum to sample gut antigens."
   }
  ],
  "related": [
   "spleen",
   "breast",
   "vascular"
  ],
  "photo": {
   "file": "lymph.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "cervn": [
     500,
     172
    ],
    "axn": [
     420,
     262
    ],
    "ingn": [
     450,
     562
    ],
    "td": [
     510,
     352
    ],
    "thymus": [
     500,
     292
    ],
    "spleenl": [
     540,
     422
    ],
    "tonsils": [
     500,
     152
    ],
    "peyer": [
     500,
     482
    ],
    "lvess": [
     400,
     402
    ],
    "cc": [
     505,
     452
    ],
    "rld": [
     530,
     262
    ],
    "node": [
     430,
     302
    ]
   }
  }
 },
 "vascular": {
  "title": "Vascular system",
  "latin": "Systema cardiovasculare",
  "system": "circulatory",
  "region": "Whole body",
  "size": "≈ 100,000 km of vessels",
  "blood": "The heart",
  "nerve": "Autonomic vasomotor",
  "blurb": "Two trees from one pump: arteries deliver under pressure, veins return against gravity — with valves, shunts and plexuses throughout.",
  "summary": "The arterial and venous maps a surgeon names daily, from carotids to saphenous.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#c0453f",
    "Circulatory"
   ]
  ],
  "parts": {
   "arch": {
    "n": "Aortic arch",
    "l": "Arcus aortae",
    "t": "Artery",
    "d": "Curve giving brachiocephalic, left carotid, left subclavian.",
    "f": "Distributes to head and arms.",
    "c": "Coarctation: hypertension above, weak femorals below.",
    "at": [
     800,
     244.8
    ],
    "s": "r"
   },
   "carotid": {
    "n": "Common carotid artery",
    "l": "A. carotis communis",
    "t": "Artery",
    "d": "Neck artery bifurcating at C4.",
    "f": "Brain and face supply.",
    "c": "Carotid bruit = stroke risk; press on the sinus to slow the heart.",
    "at": [
     784,
     145.8
    ],
    "s": "l"
   },
   "subcla": {
    "n": "Subclavian artery",
    "l": "A. subclavia",
    "t": "Artery",
    "d": "Under clavicle to axillary artery.",
    "f": "Arm supply; gives vertebral to brain.",
    "c": "Subclavian steal reverses vertebral flow on exertion.",
    "at": [
     720,
     208.8
    ],
    "s": "l"
   },
   "brachiala": {
    "n": "Brachial artery",
    "l": "A. brachialis",
    "t": "Artery",
    "d": "Upper-arm continuation.",
    "f": "Arm and forearm supply; BP cuff site.",
    "c": "Intra-arterial cannulation risk at elbow.",
    "at": [
     640,
     343.8
    ],
    "s": "l"
   },
   "daorta": {
    "n": "Descending aorta",
    "l": "Aorta descendens",
    "t": "Artery",
    "d": "Thoracic then abdominal aorta.",
    "f": "Segmental branches to wall and viscera.",
    "c": "Aneurysm screening in male smokers over 65.",
    "at": [
     808,
     343.8
    ],
    "s": "r"
   },
   "coeliaca": {
    "n": "Coeliac trunk",
    "l": "Truncus coeliacus",
    "t": "Artery",
    "d": "T12 branch: left gastric, splenic, hepatic.",
    "f": "Foregut supply.",
    "c": "Coeliac compression syndrome causes post-meal pain.",
    "at": [
     800,
     388.8
    ],
    "s": "r"
   },
   "renala": {
    "n": "Renal artery",
    "l": "A. renalis",
    "t": "Artery",
    "d": "Paired L1 branches, high flow.",
    "f": "Kidney perfusion for filtration.",
    "c": "Renal artery stenosis = curable hypertension.",
    "at": [
     768,
     397.8
    ],
    "s": "l"
   },
   "iliaca": {
    "n": "Common iliac artery",
    "l": "A. iliaca communis",
    "t": "Artery",
    "d": "Aortic bifurcation at L4.",
    "f": "Pelvis and limb supply.",
    "c": "Bifurcation level = umbilicus landmark.",
    "at": [
     768,
     487.8
    ],
    "s": "l"
   },
   "femorala": {
    "n": "Femoral artery",
    "l": "A. femoralis",
    "t": "Artery",
    "d": "External iliac under inguinal ligament.",
    "f": "Thigh and leg supply; catheter access.",
    "c": "Pulse check in trauma; medial is vein, lateral is nerve.",
    "at": [
     736,
     586.8000000000001
    ],
    "s": "l"
   },
   "jugular": {
    "n": "Internal jugular vein",
    "l": "V. jugularis interna",
    "t": "Vein",
    "d": "Brain's main venous exit.",
    "f": "Cerebral drainage; JVP window to right heart.",
    "c": "JVP height estimates central venous pressure.",
    "at": [
     816,
     154.8
    ],
    "s": "r"
   },
   "subclv": {
    "n": "Subclavian vein",
    "l": "V. subclavia",
    "t": "Vein",
    "d": "Arm return; joins IJV at venous angle.",
    "f": "Arm and chest drainage.",
    "c": "Preferred site for central lines — risk of pneumothorax.",
    "at": [
     848,
     217.8
    ],
    "s": "r"
   },
   "svc": {
    "n": "Superior vena cava",
    "l": "V. cava superior",
    "t": "Vein",
    "d": "Short trunk from brachiocephalic veins.",
    "f": "Upper-body return to right atrium.",
    "c": "SVC obstruction: facial swelling and distended neck veins.",
    "at": [
     824,
     271.8
    ],
    "s": "r"
   },
   "ivc": {
    "n": "Inferior vena cava",
    "l": "V. cava inferior",
    "t": "Vein",
    "d": "Largest vein, L5 to right atrium.",
    "f": "Lower-body and hepatic return.",
    "c": "IVC filters catch clots before the lungs.",
    "at": [
     824,
     379.8
    ],
    "s": "r"
   },
   "saphenous": {
    "n": "Great saphenous vein",
    "l": "V. saphena magna",
    "t": "Vein",
    "d": "Longest vein: ankle to groin.",
    "f": "Superficial leg return.",
    "c": "Harvested for coronary bypass grafts.",
    "at": [
     720,
     676.8000000000001
    ],
    "s": "l"
   },
   "heartv": {
    "n": "Heart",
    "l": "Cor",
    "t": "Pump",
    "d": "Four chambers at the centre of both trees.",
    "f": "The pump itself.",
    "c": "Open the heart page for the full chamber view.",
    "at": [
     800,
     289.8
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"arch\" cx=\"800\" cy=\"244.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"carotid\" cx=\"784\" cy=\"145.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"subcla\" cx=\"720\" cy=\"208.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"brachiala\" cx=\"640\" cy=\"343.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"daorta\" cx=\"808\" cy=\"343.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"coeliaca\" cx=\"800\" cy=\"388.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"renala\" cx=\"768\" cy=\"397.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"iliaca\" cx=\"768\" cy=\"487.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"femorala\" cx=\"736\" cy=\"586.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"jugular\" cx=\"816\" cy=\"154.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"subclv\" cx=\"848\" cy=\"217.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"svc\" cx=\"824\" cy=\"271.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ivc\" cx=\"824\" cy=\"379.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"saphenous\" cx=\"720\" cy=\"676.8000000000001\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"heartv\" cx=\"800\" cy=\"289.8\" rx=\"52\" ry=\"38\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The aorta bifurcates into common iliacs at which level?",
    "opts": [
     "T12",
     "L2",
     "L4",
     "S1"
    ],
    "a": 2,
    "why": "Aortic bifurcation at L4 — roughly the umbilical plane."
   },
   {
    "q": "Which vein is harvested for coronary artery bypass?",
    "opts": [
     "Cephalic",
     "Great saphenous",
     "Basilic",
     "Popliteal"
    ],
    "a": 1,
    "why": "The great saphenous vein's length and wall make it the classic graft."
   },
   {
    "q": "A carotid bruit suggests…",
    "opts": [
     "Venous hum",
     "Turbulent flow from stenosis",
     "Normal flow",
     "Aortic regurgitation"
    ],
    "a": 1,
    "why": "Stenosis accelerates flow, creating audible turbulence and stroke risk."
   }
  ],
  "related": [
   "heart",
   "lymph",
   "malebody"
  ],
  "photo": {
   "file": "vascular.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "arch": [
     500,
     272
    ],
    "carotid": [
     490,
     162
    ],
    "subcla": [
     450,
     232
    ],
    "brachiala": [
     400,
     382
    ],
    "daorta": [
     505,
     382
    ],
    "coeliaca": [
     500,
     432
    ],
    "renala": [
     480,
     442
    ],
    "iliaca": [
     480,
     542
    ],
    "femorala": [
     460,
     652
    ],
    "jugular": [
     510,
     172
    ],
    "subclv": [
     530,
     242
    ],
    "svc": [
     515,
     302
    ],
    "ivc": [
     515,
     422
    ],
    "saphenous": [
     450,
     752
    ],
    "heartv": [
     500,
     322
    ]
   }
  }
 },
 "endocrine": {
  "title": "Endocrine system",
  "latin": "Systema endocrinum",
  "system": "endocrine",
  "region": "Whole body — ductless glands",
  "size": "≈ 50 g of gland tissue total",
  "blood": "Rich arterial supply to each gland",
  "nerve": "Autonomic + trophic hormones",
  "blurb": "The body's slow wiring: hormones released straight into blood to tune metabolism, growth, stress, salt, sugar and reproduction.",
  "summary": "Every ductless gland on one figure — including the ones you never see: pineal, parathyroids, adrenals and the islets.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#5f7340",
    "Endocrine"
   ]
  ],
  "parts": {
   "pit": {
    "n": "Pituitary gland",
    "l": "Hypophysis",
    "t": "Gland",
    "d": "Pea-sized master gland in the sella turcica.",
    "f": "Releases ACTH, TSH, GH, LH/FSH, prolactin, ADH/oxytocin store.",
    "c": "Pituitary adenoma → visual field loss (optic chiasm above).",
    "at": [
     800,
     85.5
    ],
    "s": "r"
   },
   "pineal": {
    "n": "Pineal gland",
    "l": "Glandula pinealis",
    "t": "Gland",
    "d": "Tiny cone on the dorsal diencephalon.",
    "f": "Melatonin — circadian rhythm.",
    "c": "Calcifies with age; useful midline marker on CT.",
    "at": [
     812.8000000000001,
     97.2
    ],
    "s": "r"
   },
   "thy": {
    "n": "Thyroid gland",
    "l": "Glandula thyroidea",
    "t": "Gland",
    "d": "Butterfly gland on the trachea.",
    "f": "T3/T4 metabolic rate; calcitonin.",
    "c": "Goitre and thyrotoxicosis are common presentations.",
    "at": [
     800,
     171
    ],
    "s": "r"
   },
   "para": {
    "n": "Parathyroid glands",
    "l": "Gll. parathyroideae",
    "t": "Gland",
    "d": "Four grains on the thyroid's back.",
    "f": "PTH — raises plasma calcium.",
    "c": "Accidental removal in thyroidectomy → tetany.",
    "at": [
     819.2,
     176.4
    ],
    "s": "r"
   },
   "adr": {
    "n": "Adrenal glands",
    "l": "Gll. suprarenales",
    "t": "Gland",
    "d": "Caps on each kidney: cortex + medulla.",
    "f": "Cortisol, aldosterone, adrenaline.",
    "c": "Addison's: hypotension, pigmentation, fatigue.",
    "at": [
     764.8000000000001,
     378
    ],
    "s": "l"
   },
   "isl": {
    "n": "Pancreatic islets",
    "l": "Insulae pancreaticae",
    "t": "Gland",
    "d": "1–2 million islets in the pancreas.",
    "f": "Insulin (β) and glucagon (α) — glucose control.",
    "c": "Diabetes mellitus = islet failure or resistance.",
    "at": [
     808,
     412.2
    ],
    "s": "r"
   },
   "gon": {
    "n": "Gonads (testis / ovary)",
    "l": "Gonades",
    "t": "Gland",
    "d": "Testes or ovaries in the pelvis.",
    "f": "Sex steroids and gametes.",
    "c": "Turner/Klinefelter: chromosomal gonadal failure.",
    "at": [
     800,
     526.5
    ],
    "s": "r"
   },
   "jga": {
    "n": "Juxtaglomerular apparatus",
    "l": "Apparatus juxtaglomerularis",
    "t": "Gland",
    "d": "Where distal tubule meets its glomerulus.",
    "f": "Renin — blood pressure and salt balance.",
    "c": "Renin-secreting tumour: rare curable hypertension.",
    "at": [
     752,
     396
    ],
    "s": "l"
   },
   "anp": {
    "n": "Atrial natriuretic peptide",
    "l": "ANP",
    "t": "Gland",
    "d": "Released by stretched atrial myocytes.",
    "f": "Natriuresis and vasodilation — volume off-switch.",
    "c": "Raised in heart failure as a compensatory marker.",
    "at": [
     808,
     288
    ],
    "s": "r"
   },
   "eec": {
    "n": "Enteroendocrine cells",
    "l": "Cellulae enteroendocrinae",
    "t": "Gland",
    "d": "Scattered hormone cells of gut mucosa.",
    "f": "Gastrin, CCK, secretin, GLP-1.",
    "c": "GLP-1 drugs mimic the gut's own incretin.",
    "at": [
     800,
     432
    ],
    "s": "r"
   },
   "lep": {
    "n": "Adipose (leptin)",
    "l": "Adipocyti",
    "t": "Gland",
    "d": "Fat as an endocrine organ.",
    "f": "Leptin — long-term energy signalling.",
    "c": "Leptin resistance accompanies obesity.",
    "at": [
     720,
     423
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"pit\" cx=\"800\" cy=\"85.5\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pineal\" cx=\"812.8000000000001\" cy=\"97.2\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"thy\" cx=\"800\" cy=\"171\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"para\" cx=\"819.2\" cy=\"176.4\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"adr\" cx=\"764.8000000000001\" cy=\"378\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"isl\" cx=\"808\" cy=\"412.2\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"gon\" cx=\"800\" cy=\"526.5\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"jga\" cx=\"752\" cy=\"396\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"anp\" cx=\"808\" cy=\"288\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"eec\" cx=\"800\" cy=\"432\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lep\" cx=\"720\" cy=\"423\" rx=\"50\" ry=\"36\" fill=\"#5f7340\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which gland sits in the sella turcica under the optic chiasm?",
    "opts": [
     "Pineal",
     "Pituitary",
     "Thymus",
     "Adrenal"
    ],
    "a": 1,
    "why": "The pituitary hangs from the hypothalamus in the sella; adenomas compress the chiasm."
   },
   {
    "q": "Tetany after thyroidectomy suggests damage to the…",
    "opts": [
     "Thyroid follicles",
     "Parathyroid glands",
     "Recurrent laryngeal nerve",
     "C cells"
    ],
    "a": 1,
    "why": "Loss of PTH drops calcium, causing tetany."
   },
   {
    "q": "Melatonin is secreted by the…",
    "opts": [
     "Pituitary",
     "Pineal gland",
     "Adrenal cortex",
     "Pancreatic islets"
    ],
    "a": 1,
    "why": "The pineal gland converts serotonin to melatonin at night."
   }
  ],
  "related": [
   "thyroid",
   "pancreas",
   "kidney"
  ],
  "photo": {
   "file": "endocrine.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "pit": [
     500,
     95
    ],
    "pineal": [
     508,
     108
    ],
    "thy": [
     500,
     190
    ],
    "para": [
     512,
     196
    ],
    "adr": [
     478,
     420
    ],
    "isl": [
     505,
     458
    ],
    "gon": [
     500,
     585
    ],
    "jga": [
     470,
     440
    ],
    "anp": [
     505,
     320
    ],
    "eec": [
     500,
     480
    ],
    "lep": [
     450,
     470
    ]
   }
  }
 },
 "joints": {
  "title": "Joints & ligaments",
  "latin": "Articulationes et ligamenta",
  "system": "skeletal",
  "region": "Knee model + whole-body ligaments",
  "size": "≈ 360 joints in the body",
  "blood": "Genicular arteries",
  "nerve": "Articular branches",
  "blurb": "Where bones meet: cartilage cushions, capsules contain, ligaments guide — the knee is the classic teaching joint because every principle is visible in it.",
  "summary": "Open the knee to see cruciates, collaterals and menisci; the part list then tours the other major ligaments of the body.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#c9a86a",
    "Skeletal system"
   ]
  ],
  "parts": {
   "acl": {
    "n": "Anterior cruciate ligament",
    "l": "Lig. cruciatum anterius",
    "t": "Knee",
    "d": "From lateral femoral condyle to anterior tibial plateau.",
    "f": "Blocks anterior tibial translation; pivots in rotation.",
    "c": "ACL tear: pop + giving way; reconstructed with graft.",
    "at": [
     792,
     432
    ],
    "s": "l"
   },
   "pcl": {
    "n": "Posterior cruciate ligament",
    "l": "Lig. cruciatum posterius",
    "t": "Knee",
    "d": "Medial femoral condyle to posterior tibia.",
    "f": "Blocks posterior tibial slide (dashboard injury).",
    "c": "PCL injuries need far greater force than ACL.",
    "at": [
     832,
     415.8
    ],
    "s": "r"
   },
   "mcl": {
    "n": "Medial collateral ligament",
    "l": "Lig. collaterale tibiale",
    "t": "Knee",
    "d": "Femoral epicondyle to tibial shaft, fused with meniscus.",
    "f": "Resists valgus stress.",
    "c": "Valgus blow + medial pain = MCL; meniscus often torn with it.",
    "at": [
     664,
     454.5
    ],
    "s": "l"
   },
   "lcl": {
    "n": "Lateral collateral ligament",
    "l": "Lig. collaterale fibulare",
    "t": "Knee",
    "d": "Femoral epicondyle to fibular head.",
    "f": "Resists varus stress.",
    "c": "Varus injuries are rarer and often hit the peroneal nerve too.",
    "at": [
     936,
     454.5
    ],
    "s": "r"
   },
   "menisci": {
    "n": "Menisci (medial & lateral)",
    "l": "Menisci",
    "t": "Knee",
    "d": "Fibrocartilage crescents on the tibial plateau.",
    "f": "Load sharing, shock absorption, joint lubrication.",
    "c": "Medial meniscus tears most — \"unhappy triad\" with ACL+MCL.",
    "at": [
     755.2,
     472.5
    ],
    "s": "l"
   },
   "patellt": {
    "n": "Patellar ligament",
    "l": "Lig. patellae",
    "t": "Knee",
    "d": "Patella to tibial tuberosity (quadriceps continuation).",
    "f": "Transmits quadriceps force to the tibia.",
    "c": "Patellar tendinopathy = jumper's knee.",
    "at": [
     800,
     585
    ],
    "s": "r"
   },
   "quadt": {
    "n": "Quadriceps tendon",
    "l": "Tendo m. quadricipitis",
    "t": "Knee",
    "d": "Four muscle heads onto the patella.",
    "f": "Extensor mechanism origin.",
    "c": "Rupture in older patients: cannot straight-leg raise.",
    "at": [
     800,
     306
    ],
    "s": "r"
   },
   "capsule": {
    "n": "Joint capsule & synovium",
    "l": "Capsula articularis",
    "t": "Knee",
    "d": "Fibrous sleeve lined by synovial membrane.",
    "f": "Contains synovial fluid; proprioceptive nerves.",
    "c": "Effusion is the capsule distending — tap it to diagnose.",
    "at": [
     688,
     396
    ],
    "s": "l"
   },
   "cartilage": {
    "n": "Articular cartilage",
    "l": "Cartilago articularis",
    "t": "Knee",
    "d": "Hyaline cartilage 2–4 mm on joint surfaces.",
    "f": "Near-frictionless load bearing.",
    "c": "Avascular — heals poorly; osteoarthritis is its wear.",
    "at": [
     728,
     508.5
    ],
    "s": "l"
   },
   "bursa": {
    "n": "Prepatellar bursa",
    "l": "Bursa prepatellaris",
    "t": "Knee",
    "d": "Fluid sac between skin and patella.",
    "f": "Glides skin over bone during kneeling.",
    "c": "\"Housemaid's knee\" = its inflammation.",
    "at": [
     840,
     540
    ],
    "s": "r"
   },
   "achilles": {
    "n": "Achilles (calcaneal) tendon",
    "l": "Tendo calcaneus",
    "t": "Tendon",
    "d": "Gastrocnemius + soleus to calcaneus.",
    "f": "Strongest tendon — push-off power.",
    "c": "Rupture: sudden pop in sprinters; Thompson test positive.",
    "at": [
     192,
     139.5
    ],
    "s": "l"
   },
   "rotcuff": {
    "n": "Rotator cuff tendons",
    "l": "Tendines musculi rotatorii",
    "t": "Tendon",
    "d": "Supraspinatus, infraspinatus, teres minor, subscapularis.",
    "f": "Hold the humeral head in the glenoid.",
    "c": "Supraspinatus is the commonest tear — painful arc.",
    "at": [
     192,
     189
    ],
    "s": "l"
   },
   "spinalig": {
    "n": "Spinal ligaments",
    "l": "Ligg. columnae",
    "t": "Tendon",
    "d": "ALL, PLL, ligamentum flavum, supraspinous, interspinous.",
    "f": "Segmental stability; flavum buckles in stenosis.",
    "c": "Flavum hypertrophy contributes to lumbar stenosis.",
    "at": [
     192,
     238.5
    ],
    "s": "l"
   },
   "anklig": {
    "n": "Ankle collateral ligaments",
    "l": "Ligg. articulationis talocruralis",
    "t": "Tendon",
    "d": "Deltoid medially; ATFL/CFL/PTFL laterally.",
    "f": "Stabilise the talus.",
    "c": "Inversion sprains tear ATFL first.",
    "at": [
     192,
     288
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"acl\" cx=\"792\" cy=\"432\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pcl\" cx=\"832\" cy=\"415.8\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"mcl\" cx=\"664\" cy=\"454.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"lcl\" cx=\"936\" cy=\"454.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"menisci\" cx=\"755.2\" cy=\"472.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"patellt\" cx=\"800\" cy=\"585\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"quadt\" cx=\"800\" cy=\"306\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"capsule\" cx=\"688\" cy=\"396\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cartilage\" cx=\"728\" cy=\"508.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"bursa\" cx=\"840\" cy=\"540\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"achilles\" cx=\"192\" cy=\"139.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rotcuff\" cx=\"192\" cy=\"189\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"spinalig\" cx=\"192\" cy=\"238.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"anklig\" cx=\"192\" cy=\"288\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which ligament prevents the tibia sliding forward on the femur?",
    "opts": [
     "PCL",
     "ACL",
     "MCL",
     "LCL"
    ],
    "a": 1,
    "why": "The anterior cruciate is the primary restraint to anterior tibial translation."
   },
   {
    "q": "The \"unhappy triad\" is ACL, MCL and…",
    "opts": [
     "Lateral meniscus",
     "Medial meniscus",
     "Patellar ligament",
     "PCL"
    ],
    "a": 1,
    "why": "Valgus-rotation injuries classically tear ACL, MCL and the medial meniscus together."
   },
   {
    "q": "A positive Thompson (calf-squeeze) test indicates…",
    "opts": [
     "Patellar rupture",
     "Achilles tendon rupture",
     "Ankle sprain",
     "Plantar fasciitis"
    ],
    "a": 1,
    "why": "Without an intact Achilles, squeezing the calf fails to plantarflex the foot."
   }
  ],
  "related": [
   "skeleton",
   "muscle",
   "shoulder"
  ],
  "_i": 4,
  "photo": {
   "file": "knee.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "acl": [
     495,
     480
    ],
    "pcl": [
     520,
     462
    ],
    "mcl": [
     415,
     505
    ],
    "lcl": [
     585,
     505
    ],
    "menisci": [
     472,
     525
    ],
    "patellt": [
     500,
     650
    ],
    "quadt": [
     500,
     340
    ],
    "capsule": [
     430,
     440
    ],
    "cartilage": [
     455,
     565
    ],
    "bursa": [
     525,
     600
    ],
    "achilles": [
     120,
     155
    ],
    "rotcuff": [
     120,
     210
    ],
    "spinalig": [
     120,
     265
    ],
    "anklig": [
     120,
     320
    ]
   }
  }
 },
 "shoulder": {
  "title": "Shoulder joint",
  "latin": "Articulatio humeri",
  "system": "skeletal",
  "region": "Glenohumeral joint",
  "size": "Most mobile joint in the body",
  "blood": "Anterior & posterior circumflex humeral",
  "nerve": "Axillary nerve",
  "blurb": "Mobility bought at the price of stability: a shallow glenoid, a loose capsule, and four rotator-cuff tendons doing the holding.",
  "summary": "Cut-away view of the cuff, labrum, capsule and biceps tendon — the structures behind most shoulder clinics.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#c9a86a",
    "Skeletal system"
   ]
  ],
  "parts": {
   "supra": {
    "n": "Supraspinatus tendon",
    "l": "Tendo m. supraspinati",
    "t": "Cuff",
    "d": "Over the top of the humeral head.",
    "f": "Initiates abduction (first 15°).",
    "c": "Most torn cuff tendon — painful arc 60–120°.",
    "at": [
     800,
     279
    ],
    "s": "r"
   },
   "infra": {
    "n": "Infraspinatus tendon",
    "l": "Tendo m. infraspinati",
    "t": "Cuff",
    "d": "Posterior to the head.",
    "f": "External rotation.",
    "c": "Tear → weak external rotation.",
    "at": [
     840,
     387
    ],
    "s": "r"
   },
   "teres": {
    "n": "Teres minor tendon",
    "l": "Tendo m. teretis minoris",
    "t": "Cuff",
    "d": "Below infraspinatus.",
    "f": "External rotation + capsule tension.",
    "c": "Part of cuff tears in overhead athletes.",
    "at": [
     864,
     423
    ],
    "s": "r"
   },
   "subscap": {
    "n": "Subscapularis tendon",
    "l": "Tendo m. subscapularis",
    "t": "Cuff",
    "d": "Front of the head from the scapular fossa.",
    "f": "Internal rotation; anterior stability.",
    "c": "Lift-off test detects its tear.",
    "at": [
     748.8000000000001,
     409.5
    ],
    "s": "l"
   },
   "labrum": {
    "n": "Glenoid labrum",
    "l": "Labrum glenoidale",
    "t": "Cartilage",
    "d": "Fibrocartilage rim deepening the socket.",
    "f": "Adds ~50% of glenoid depth.",
    "c": "SLAP lesions in throwers; Bankart in dislocation.",
    "at": [
     835.2,
     346.5
    ],
    "s": "r"
   },
   "ghcap": {
    "n": "Glenohumeral capsule & ligaments",
    "l": "Capsula articularis",
    "t": "Capsule",
    "d": "Loose sleeve with three glenohumeral ligaments.",
    "f": "Permits huge range; limits extremes.",
    "c": "Inferior ligament fails in anterior dislocation.",
    "at": [
     800,
     369
    ],
    "s": "r"
   },
   "bicept": {
    "n": "Long head of biceps tendon",
    "l": "Caput longum m. bicipitis",
    "t": "Tendon",
    "d": "From supraglenoid tubercle through the groove.",
    "f": "Depresses the humeral head.",
    "c": "Tendonitis: groove tenderness; rupture → Popeye.",
    "at": [
     764.8000000000001,
     301.5
    ],
    "s": "l"
   },
   "sabursa": {
    "n": "Subacromial bursa",
    "l": "Bursa subacromialis",
    "t": "Bursa",
    "d": "Sac between cuff and acromion.",
    "f": "Reduces friction under the arch.",
    "c": "Impingement inflames it — bursitis.",
    "at": [
     800,
     229.5
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"supra\" cx=\"800\" cy=\"279\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"infra\" cx=\"840\" cy=\"387\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"teres\" cx=\"864\" cy=\"423\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"subscap\" cx=\"748.8000000000001\" cy=\"409.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"labrum\" cx=\"835.2\" cy=\"346.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ghcap\" cx=\"800\" cy=\"369\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"bicept\" cx=\"764.8000000000001\" cy=\"301.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sabursa\" cx=\"800\" cy=\"229.5\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which rotator-cuff muscle initiates abduction?",
    "opts": [
     "Infraspinatus",
     "Supraspinatus",
     "Subscapularis",
     "Teres minor"
    ],
    "a": 1,
    "why": "Supraspinatus starts the first 15° of abduction before deltoid takes over."
   },
   {
    "q": "The labrum's main job is to…",
    "opts": [
     "Produce synovial fluid",
     "Deepen the glenoid socket",
     "Attach the deltoid",
     "Protect the axillary nerve"
    ],
    "a": 1,
    "why": "The fibrocartilage ring adds depth and stability to the shallow glenoid."
   },
   {
    "q": "Anterior shoulder dislocation most often damages the…",
    "opts": [
     "Superior glenohumeral ligament",
     "Inferior glenohumeral ligament / Bankart",
     "Coracoclavicular ligament",
     "Biceps sheath"
    ],
    "a": 1,
    "why": "The inferior ligament and anteroinferior labrum fail as the head levers out forward."
   }
  ],
  "related": [
   "joints",
   "skeleton",
   "muscle"
  ],
  "photo": {
   "file": "shoulder.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "supra": [
     500,
     310
    ],
    "infra": [
     525,
     430
    ],
    "teres": [
     540,
     470
    ],
    "subscap": [
     468,
     455
    ],
    "labrum": [
     522,
     385
    ],
    "ghcap": [
     500,
     410
    ],
    "bicept": [
     478,
     335
    ],
    "sabursa": [
     500,
     255
    ]
   }
  }
 },
 "larynx": {
  "title": "Upper airway",
  "latin": "Via aerea superior",
  "system": "respiratory",
  "region": "Nose to trachea",
  "size": "≈ 25 cm of conducting airway",
  "blood": "Branches of external & internal carotid",
  "nerve": "Vagus (IX/X for pharynx)",
  "blurb": "The conducting corridor: nose conditions the air, pharynx crosses food and air, larynx turns air into voice and guards the lungs, trachea delivers.",
  "summary": "Midsagittal cut from nasal conchae to tracheal rings — including the parts you cannot see from outside: sinuses, adenoid, vocal folds.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#3f7f9c",
    "Respiratory"
   ]
  ],
  "parts": {
   "nasalc": {
    "n": "Nasal cavity & conchae",
    "l": "Cavum nasi",
    "t": "Airway",
    "d": "Three conchae turbo-charge the surface area.",
    "f": "Warms, humidifies and filters inspired air.",
    "c": "Deviated septum + turbinate hypertrophy = blocked nose.",
    "at": [
     640,
     270
    ],
    "s": "l"
   },
   "sinuses": {
    "n": "Paranasal sinuses",
    "l": "Sinus paranasales",
    "t": "Airway",
    "d": "Frontal, maxillary, ethmoid, sphenoid air spaces.",
    "f": "Lighten the skull; resonate voice; humidify.",
    "c": "Sinusitis pain follows the sinus walls — maxillary = cheekache.",
    "at": [
     672,
     229.5
    ],
    "s": "l"
   },
   "adenoid": {
    "n": "Nasopharynx & adenoid",
    "l": "Nasopharynx",
    "t": "Airway",
    "d": "Posterior nasal chamber with lymphoid adenoid.",
    "f": "Air passage; immune sampling in childhood.",
    "c": "Adenoid hypertrophy causes snoring and glue ear in kids.",
    "at": [
     720,
     342
    ],
    "s": "l"
   },
   "pharynx": {
    "n": "Oropharynx",
    "l": "Oropharynx",
    "t": "Airway",
    "d": "Behind the mouth, tonsils at its sides.",
    "f": "Shared food–air corridor; speech resonance.",
    "c": "OSA collapse happens here during sleep.",
    "at": [
     728,
     387
    ],
    "s": "l"
   },
   "epiglot": {
    "n": "Epiglottis",
    "l": "Epiglottis",
    "t": "Cartilage",
    "d": "Elastic leaf above the larynx.",
    "f": "Flips to cover the larynx during swallowing.",
    "c": "Epiglottitis: drooling, stridor — an airway emergency.",
    "at": [
     739.2,
     432
    ],
    "s": "l"
   },
   "larynx": {
    "n": "Larynx",
    "l": "Larynx",
    "t": "Cartilage",
    "d": "Thyroid + cricoid cartilages housing the folds.",
    "f": "Voice production and airway protection.",
    "c": "Hoarseness >3 weeks needs laryngoscopy.",
    "at": [
     752,
     468
    ],
    "s": "l"
   },
   "vocal": {
    "n": "Vocal folds",
    "l": "Plicae vocales",
    "t": "Mucosa",
    "d": "Ligament + muscle under mucosa, glottis between.",
    "f": "Vibrate to phonate; close to protect lungs.",
    "c": "Recurrent laryngeal nerve palsy paralyses a fold.",
    "at": [
     755.2,
     493.2
    ],
    "s": "l"
   },
   "cricoid": {
    "n": "Cricoid & thyroid cartilages",
    "l": "Cartilago cricoidea",
    "t": "Cartilage",
    "d": "Signet-ring cricoid; shield-like thyroid.",
    "f": "Complete ring keeps the airway open; muscle anchor.",
    "c": "Cricoid is the landmark for cricothyroidotomy.",
    "at": [
     748.8000000000001,
     517.5
    ],
    "s": "l"
   },
   "trachea2": {
    "n": "Trachea",
    "l": "Trachea",
    "t": "Airway",
    "d": "16–20 C-shaped rings, membranous back.",
    "f": "Conduit to the bronchi; mucociliary escalator.",
    "c": "Foreign bodies lodge at the carina or right main bronchus.",
    "at": [
     768,
     594
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"nasalc\" cx=\"640\" cy=\"270\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sinuses\" cx=\"672\" cy=\"229.5\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"adenoid\" cx=\"720\" cy=\"342\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pharynx\" cx=\"728\" cy=\"387\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"epiglot\" cx=\"739.2\" cy=\"432\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"larynx\" cx=\"752\" cy=\"468\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vocal\" cx=\"755.2\" cy=\"493.2\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cricoid\" cx=\"748.8000000000001\" cy=\"517.5\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"trachea2\" cx=\"768\" cy=\"594\" rx=\"50\" ry=\"36\" fill=\"#3f7f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "Which structure flips to protect the airway during swallowing?",
    "opts": [
     "Uvula",
     "Epiglottis",
     "Vocal fold",
     "Soft palate"
    ],
    "a": 1,
    "why": "The epiglottis covers the laryngeal inlet as the larynx rises."
   },
   {
    "q": "The only complete cartilage ring of the airway is the…",
    "opts": [
     "Thyroid",
     "Cricoid",
     "First tracheal",
     "Arytenoid"
    ],
    "a": 1,
    "why": "The signet-shaped cricoid is a complete ring — the others are C-shaped."
   },
   {
    "q": "Paranasal sinuses do NOT include the…",
    "opts": [
     "Maxillary",
     "Sphenoid",
     "Mastoid",
     "Ethmoid"
    ],
    "a": 2,
    "why": "Mastoid air cells belong to the temporal bone, not the paranasal set."
   }
  ],
  "related": [
   "lungs",
   "nose",
   "nervous"
  ],
  "photo": {
   "file": "larynx.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "nasalc": [
     400,
     300
    ],
    "sinuses": [
     420,
     255
    ],
    "adenoid": [
     450,
     380
    ],
    "pharynx": [
     455,
     430
    ],
    "epiglot": [
     462,
     480
    ],
    "larynx": [
     470,
     520
    ],
    "vocal": [
     472,
     548
    ],
    "cricoid": [
     468,
     575
    ],
    "trachea2": [
     480,
     660
    ]
   }
  }
 },
 "marrow": {
  "title": "Bone marrow & blood",
  "latin": "Medulla ossium",
  "system": "circulatory",
  "region": "Inside every bone",
  "size": "≈ 3 kg in the adult",
  "blood": "Nutrient + metaphyseal arteries",
  "nerve": "Autonomic fibres",
  "blurb": "The hidden factory: red marrow makes two million blood cells per second; yellow marrow stores energy; both sit behind bone you see every day.",
  "summary": "Cut long bone plus a cellular inset — the organs no eye ever sees without a microscope, highlighted here.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#c0453f",
    "Circulatory"
   ],
   [
    "#c9a86a",
    "Skeletal system"
   ]
  ],
  "parts": {
   "redm": {
    "n": "Red marrow",
    "l": "Medulla ossium rubra",
    "t": "Marrow",
    "d": "Spongy bone of vertebrae, pelvis, sternum, epiphyses.",
    "f": "Haematopoiesis: all blood cell lines.",
    "c": "Marrow failure = aplastic anaemia; infiltration = leukaemia.",
    "at": [
     560,
     270
    ],
    "s": "l"
   },
   "yellowm": {
    "n": "Yellow marrow",
    "l": "Medulla ossium flava",
    "t": "Marrow",
    "d": "Fat-filled shaft cavities of long bones.",
    "f": "Energy store; convertible back to red marrow.",
    "c": "Reconverts in chronic anaemia or severe bleeding.",
    "at": [
     800,
     450
    ],
    "s": "r"
   },
   "trab": {
    "n": "Trabecular (spongy) bone",
    "l": "Os spongiosum",
    "t": "Bone",
    "d": "Latticework of struts along stress lines.",
    "f": "Strength at low weight; houses red marrow.",
    "c": "Osteoporosis thins trabeculae first — vertebral fractures.",
    "at": [
     528,
     198
    ],
    "s": "l"
   },
   "cortexb": {
    "n": "Compact bone (cortex)",
    "l": "Os compactum",
    "t": "Bone",
    "d": "Dense osteon-based outer shell.",
    "f": "Bending and torsional strength; calcium bank.",
    "c": "Cortical thickening responds to load (Wolff's law).",
    "at": [
     896,
     360
    ],
    "s": "r"
   },
   "endost": {
    "n": "Endosteum & osteoblasts",
    "l": "Endosteum",
    "t": "Bone",
    "d": "Cellular lining of all internal bone surfaces.",
    "f": "Remodelling: osteoblasts build, osteoclasts eat.",
    "c": "Paget's disease is remodelling gone chaotic.",
    "at": [
     864,
     405
    ],
    "s": "r"
   },
   "hsc": {
    "n": "Haematopoietic stem cells",
    "l": "Cellulae stirpes",
    "t": "Cells",
    "d": "Pluripotent marrow stem cells.",
    "f": "Give rise to myeloid and lymphoid lines.",
    "c": "Stem-cell transplant replaces a diseased marrow.",
    "at": [
     1120,
     270
    ],
    "s": "r"
   },
   "sinusm": {
    "n": "Marrow sinusoids",
    "l": "Sinusoides medullae",
    "t": "Vessels",
    "d": "Leaky capillaries new cells enter.",
    "f": "Gateway for cells into circulation.",
    "c": "Mets (breast, prostate) seed marrow via these.",
    "at": [
     608,
     315
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"redm\" cx=\"560\" cy=\"270\" rx=\"50\" ry=\"36\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"yellowm\" cx=\"800\" cy=\"450\" rx=\"50\" ry=\"36\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"trab\" cx=\"528\" cy=\"198\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cortexb\" cx=\"896\" cy=\"360\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"endost\" cx=\"864\" cy=\"405\" rx=\"50\" ry=\"36\" fill=\"#c9a86a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"hsc\" cx=\"1120\" cy=\"270\" rx=\"50\" ry=\"36\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"sinusm\" cx=\"608\" cy=\"315\" rx=\"50\" ry=\"36\" fill=\"#c0453f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "In adults, red marrow is mainly found in the…",
    "opts": [
     "Femoral shaft",
     "Vertebrae, pelvis and sternum",
     "Tibial shaft",
     "Phalanges"
    ],
    "a": 1,
    "why": "Axial skeleton and proximal epiphyses keep haematopoietic marrow in adults."
   },
   {
    "q": "Yellow marrow is predominantly…",
    "opts": [
     "Blood-forming tissue",
     "Adipose tissue",
     "Lymphoid tissue",
     "Cartilage"
    ],
    "a": 1,
    "why": "Yellow marrow is fat that can reconvert to red marrow under demand."
   },
   {
    "q": "Wolff's law describes…",
    "opts": [
     "Bone remodelling to mechanical load",
     "Marrow conversion",
     "Calcium homeostasis",
     "Fracture healing stages"
    ],
    "a": 0,
    "why": "Bone architecture adapts to the stresses placed upon it."
   }
  ],
  "related": [
   "skeleton",
   "lymph",
   "vascular"
  ],
  "photo": {
   "file": "marrow.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "redm": [
     350,
     300
    ],
    "yellowm": [
     500,
     500
    ],
    "trab": [
     330,
     220
    ],
    "cortexb": [
     560,
     400
    ],
    "endost": [
     540,
     450
    ],
    "hsc": [
     700,
     300
    ],
    "sinusm": [
     380,
     350
    ]
   }
  }
 },
 "malepelvis": {
  "title": "Male pelvis & perineum",
  "latin": "Pelvis masculina",
  "system": "male",
  "region": "Pelvic sagittal section",
  "size": "Pelvic ring + floor",
  "blood": "Internal iliac branches",
  "nerve": "Pudendal + pelvic splanchnics",
  "blurb": "The male pelvic floor in sagittal section: bladder, prostate and urethra in front, rectum and anal canal behind, and the muscular sheet that holds them up.",
  "summary": "Deep regional anatomy — the pouches, sphincters and nerves examined in every pelvic module.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a9762a",
    "Urinary"
   ],
   [
    "#3f5f9c",
    "Male reproductive"
   ],
   [
    "#a8442f",
    "Digestive"
   ],
   [
    "#b05252",
    "Muscular system"
   ],
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "bladderm": {
    "n": "Urinary bladder",
    "l": "Vesica urinaria",
    "t": "Urinary",
    "d": "Reservoir behind the pubis.",
    "f": "Stores urine; trigone is its smooth base.",
    "c": "Outlet obstruction in men is usually prostatic.",
    "at": [
     720,
     270
    ],
    "s": "l"
   },
   "prostate2": {
    "n": "Prostate gland",
    "l": "Glandula prostatica",
    "t": "Male reproductive",
    "d": "Walnut gland around the prostatic urethra.",
    "f": "Seminal fluid (PSA, citric acid, fibrinolysin).",
    "c": "BPH compresses the urethra — hesitancy and nocturia.",
    "at": [
     752,
     378
    ],
    "s": "l"
   },
   "urethram2": {
    "n": "Prostatic & membranous urethra",
    "l": "Urethra masculina",
    "t": "Urinary",
    "d": "Urethra traversing prostate and perineum.",
    "f": "Conduit for urine and semen; sphincters here.",
    "c": "Catheterisation respects the puboprostatic curve.",
    "at": [
     720,
     432
    ],
    "s": "l"
   },
   "ejac": {
    "n": "Ejaculatory ducts",
    "l": "Ductus ejaculatorii",
    "t": "Male reproductive",
    "d": "Vas + seminal vesicle ducts through prostate.",
    "f": "Deliver sperm into prostatic urethra.",
    "c": "Obstruction → low-volume ejaculate.",
    "at": [
     768,
     360
    ],
    "s": "l"
   },
   "rectumm": {
    "n": "Rectum",
    "l": "Rectum",
    "t": "Digestive",
    "d": "Terminal 12–15 cm with three valves.",
    "f": "Stores stool before defecation.",
    "c": "Rectal exam reaches prostate anteriorly, rectum all round.",
    "at": [
     960,
     378
    ],
    "s": "r"
   },
   "analm": {
    "n": "Anal canal & sphincters",
    "l": "Canalis analis",
    "t": "Digestive",
    "d": "Internal (smooth) + external (striated) sphincters.",
    "f": "Continence control.",
    "c": "Fissures tear posteriorly where blood supply is poorest.",
    "at": [
     992,
     504
    ],
    "s": "r"
   },
   "levatorm": {
    "n": "Levator ani (pelvic floor)",
    "l": "M. levator ani",
    "t": "Muscle",
    "d": "Puborectalis, pubococcygeus, iliococcygeus sheet.",
    "f": "Supports viscera; maintains anorectal angle.",
    "c": "Pelvic floor training helps post-prostatectomy incontinence.",
    "at": [
     880,
     450
    ],
    "s": "r"
   },
   "ischio": {
    "n": "Ischio-anal fossa",
    "l": "Fossa ischioanalis",
    "t": "Region",
    "d": "Fat-filled wedge beside the anal canal.",
    "f": "Cushions canal expansion; infection space.",
    "c": "Infection may spread through this space; suspected abscess needs clinical assessment.",
    "at": [
     960,
     468
    ],
    "s": "r"
   },
   "pudendm": {
    "n": "Pudendal nerve & internal pudendal vessels",
    "l": "N. pudendus",
    "t": "Nervous",
    "d": "S2–S4 route via Alcock's canal.",
    "f": "Somatic control of sphincters and penile sensation.",
    "c": "Pudendal block for episiotomy/haemorrhoid surgery.",
    "at": [
     896,
     423
    ],
    "s": "r"
   },
   "perbody": {
    "n": "Perineal body",
    "l": "Centrum perineale",
    "t": "Region",
    "d": "Fibromuscular node between anus and bulb.",
    "f": "Anchor for nine perineal muscles.",
    "c": "Perineal trauma can compromise the central support node.",
    "at": [
     832,
     504
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"bladderm\" cx=\"720\" cy=\"270\" rx=\"50\" ry=\"36\" fill=\"#a9762a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"prostate2\" cx=\"752\" cy=\"378\" rx=\"50\" ry=\"36\" fill=\"#3f5f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"urethram2\" cx=\"720\" cy=\"432\" rx=\"50\" ry=\"36\" fill=\"#a9762a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ejac\" cx=\"768\" cy=\"360\" rx=\"50\" ry=\"36\" fill=\"#3f5f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rectumm\" cx=\"960\" cy=\"378\" rx=\"50\" ry=\"36\" fill=\"#a8442f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"analm\" cx=\"992\" cy=\"504\" rx=\"50\" ry=\"36\" fill=\"#a8442f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"levatorm\" cx=\"880\" cy=\"450\" rx=\"50\" ry=\"36\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"ischio\" cx=\"960\" cy=\"468\" rx=\"50\" ry=\"36\" fill=\"#3f5f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pudendm\" cx=\"896\" cy=\"423\" rx=\"50\" ry=\"36\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"perbody\" cx=\"832\" cy=\"504\" rx=\"50\" ry=\"36\" fill=\"#3f5f9c\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The external anal sphincter is supplied by the…",
    "opts": [
     "Pelvic splanchnics",
     "Pudendal nerve",
     "Hypogastric plexus",
     "Vagus"
    ],
    "a": 1,
    "why": "External sphincter is striated muscle under somatic pudendal control (S2–4)."
   },
   {
    "q": "Benign prostatic hyperplasia causes urinary symptoms by…",
    "opts": [
     "Irritating the bladder",
     "Compressing the prostatic urethra",
     "Blocking the ureters",
     "Paralysing the detrusor"
    ],
    "a": 1,
    "why": "The adenoma enlarges around the urethra, obstructing outflow."
   },
   {
    "q": "The ischio-anal fossa is important clinically because…",
    "opts": [
     "It holds the prostate",
     "It is a fat-filled space where perianal abscesses spread",
     "It contains the bladder",
     "It anchors the ureters"
    ],
    "a": 1,
    "why": "Its loose fat lets infection track around the anal canal."
   }
  ],
  "related": [
   "maleprostate",
   "maletestis",
   "male",
   "bladder"
  ],
  "photo": {
   "file": "male-pelvis.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "bladderm": [
     450,
     300
    ],
    "prostate2": [
     470,
     420
    ],
    "urethram2": [
     450,
     480
    ],
    "ejac": [
     480,
     400
    ],
    "rectumm": [
     600,
     420
    ],
    "analm": [
     620,
     560
    ],
    "levatorm": [
     550,
     500
    ],
    "ischio": [
     600,
     520
    ],
    "pudendm": [
     560,
     470
    ],
    "perbody": [
     520,
     560
    ]
   }
  }
 },
 "femalepelvis": {
  "title": "Female pelvis & perineum",
  "latin": "Pelvis femina",
  "system": "female",
  "region": "Pelvic sagittal section",
  "size": "Wide shallow pelvic ring",
  "blood": "Internal iliac branches",
  "nerve": "Pudendal + pelvic splanchnics",
  "blurb": "The female pelvic floor in sagittal section: bladder and urethra, vagina and anteverted uterus, rectum behind — plus the ligaments and pouches that position them.",
  "summary": "Deep regional anatomy of the female pelvis: pouches, cardinal ligaments, pelvic floor and perineum.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a9762a",
    "Urinary"
   ],
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#a8442f",
    "Digestive"
   ],
   [
    "#b05252",
    "Muscular system"
   ],
   [
    "#6d4a86",
    "Nervous"
   ]
  ],
  "parts": {
   "bladderf": {
    "n": "Urinary bladder",
    "l": "Vesica urinaria",
    "t": "Urinary",
    "d": "Reservoir behind the pubic symphysis.",
    "f": "Stores urine.",
    "c": "Stress incontinence follows pelvic-floor weakness.",
    "at": [
     704,
     270
    ],
    "s": "l"
   },
   "urethraf": {
    "n": "Female urethra",
    "l": "Urethra femina",
    "t": "Urinary",
    "d": "Short 4 cm tube to the vestibule.",
    "f": "Voiding.",
    "c": "Short length explains higher UTI rates in women.",
    "at": [
     704,
     378
    ],
    "s": "l"
   },
   "vagina2": {
    "n": "Vagina",
    "l": "Vagina",
    "t": "Female reproductive",
    "d": "Muscular canal from cervix to vestibule.",
    "f": "Intercourse, menstrual flow, birth canal.",
    "c": "Anteverted uterus rests on its anterior wall; pessaries sit here.",
    "at": [
     752,
     405
    ],
    "s": "l"
   },
   "uterus2": {
    "n": "Uterus & cervix (relations)",
    "l": "Uterus",
    "t": "Female reproductive",
    "d": "Anteverted over the bladder, pouch behind.",
    "f": "Gestation and menstruation.",
    "c": "Retroversion is a normal variant in ~20%.",
    "at": [
     800,
     297
    ],
    "s": "r"
   },
   "pouches": {
    "n": "Vesico- & recto-uterine pouches",
    "l": "Excavationes",
    "t": "Region",
    "d": "Peritoneal recesses front and back of uterus.",
    "f": "Allow organ movement; collect free fluid.",
    "c": "The recto-uterine pouch is the most dependent — pus collects there.",
    "at": [
     896,
     342
    ],
    "s": "r"
   },
   "rectumf": {
    "n": "Rectum",
    "l": "Rectum",
    "t": "Digestive",
    "d": "Terminal bowel behind the vagina.",
    "f": "Stool storage.",
    "c": "Rectovaginal examination assesses both walls.",
    "at": [
     976,
     387
    ],
    "s": "r"
   },
   "analf": {
    "n": "Anal canal & sphincters",
    "l": "Canalis analis",
    "t": "Digestive",
    "d": "Internal + external sphincters with puborectalis.",
    "f": "Continence.",
    "c": "Obstetric injury to the sphincter causes incontinence.",
    "at": [
     992,
     504
    ],
    "s": "r"
   },
   "levatorf": {
    "n": "Levator ani & pelvic floor",
    "l": "M. levator ani",
    "t": "Muscle",
    "d": "Muscular sheet from pubis to coccyx.",
    "f": "Visceral support; anorectal angle.",
    "c": "Pelvic organ prolapse follows levator damage in childbirth.",
    "at": [
     880,
     450
    ],
    "s": "r"
   },
   "cardinal": {
    "n": "Cardinal & uterosacral ligaments",
    "l": "Ligg. cardinalia",
    "t": "Female reproductive",
    "d": "Condensed endopelvic fascia at cervix sides.",
    "f": "Suspend cervix and upper vagina.",
    "c": "Their laxity causes uterine prolapse.",
    "at": [
     864,
     324
    ],
    "s": "r"
   },
   "pudendf": {
    "n": "Pudendal nerve & vessels",
    "l": "N. pudendus",
    "t": "Nervous",
    "d": "S2–S4 through the pudendal (Alcock's) canal.",
    "f": "Perineal sensation and sphincter motor.",
    "c": "Pudendal block anaesthetises the perineum for delivery.",
    "at": [
     912,
     423
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1f1d\"/><g transform=\"translate(557,10) scale(1.157)\"><path d=\"M210 14 C232 14 246 30 246 52 C246 70 238 82 228 88 L228 100 C258 106 286 118 298 140 C312 166 318 200 320 236 C322 268 320 300 316 330 C314 352 306 366 296 368 C288 370 282 362 282 348 C282 322 280 292 274 264 L272 300 C274 340 272 380 266 418 C262 448 258 480 256 512 C254 552 252 596 250 640 C249 676 246 706 240 730 C236 744 224 748 218 738 C212 726 210 700 210 672 C210 700 208 726 202 738 C196 748 184 744 180 730 C174 706 171 676 170 640 C168 596 166 552 164 512 C162 480 158 448 154 418 C148 380 146 340 148 300 L146 264 C140 292 138 322 138 348 C138 362 132 370 124 368 C114 366 106 352 104 330 C100 300 98 268 100 236 C102 200 108 166 122 140 C134 118 162 106 192 100 L192 88 C182 82 174 70 174 52 C174 30 188 14 210 14 Z\" fill=\"#12312d\" stroke=\"#3d6b64\" stroke-width=\"2\"/></g><ellipse class=\"part throb\" data-id=\"bladderf\" cx=\"704\" cy=\"270\" rx=\"50\" ry=\"36\" fill=\"#a9762a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"urethraf\" cx=\"704\" cy=\"378\" rx=\"50\" ry=\"36\" fill=\"#a9762a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"vagina2\" cx=\"752\" cy=\"405\" rx=\"50\" ry=\"36\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"uterus2\" cx=\"800\" cy=\"297\" rx=\"50\" ry=\"36\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pouches\" cx=\"896\" cy=\"342\" rx=\"50\" ry=\"36\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"rectumf\" cx=\"976\" cy=\"387\" rx=\"50\" ry=\"36\" fill=\"#a8442f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"analf\" cx=\"992\" cy=\"504\" rx=\"50\" ry=\"36\" fill=\"#a8442f\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"levatorf\" cx=\"880\" cy=\"450\" rx=\"50\" ry=\"36\" fill=\"#b05252\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"cardinal\" cx=\"864\" cy=\"324\" rx=\"50\" ry=\"36\" fill=\"#a34a6a\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/><ellipse class=\"part throb\" data-id=\"pudendf\" cx=\"912\" cy=\"423\" rx=\"50\" ry=\"36\" fill=\"#6d4a86\" fill-opacity=\".7\" stroke=\"#dff2ee\" stroke-width=\"2\"/>",
  "anims": [
   {
    "id": "pulse",
    "label": "Highlight pulse",
    "cls": "throb"
   }
  ],
  "quiz": [
   {
    "q": "The recto-uterine pouch (of Douglas) lies between…",
    "opts": [
     "Bladder and uterus",
     "Uterus and rectum",
     "Rectum and sacrum",
     "Bladder and pubis"
    ],
    "a": 1,
    "why": "It is the peritoneal recess behind the uterus, in front of the rectum — lowest point standing."
   },
   {
    "q": "Why are UTIs more common in women?",
    "opts": [
     "Higher bladder position",
     "Shorter urethra",
     "Absence of prostate fluid",
     "Wider pelvis"
    ],
    "a": 1,
    "why": "The ~4 cm urethra shortens the ascent distance for perineal bacteria."
   },
   {
    "q": "Uterine prolapse is mainly due to weakness of the…",
    "opts": [
     "Round ligaments",
     "Cardinal ligaments and pelvic floor",
     "Broad ligaments",
     "Uterosacral nerves"
    ],
    "a": 1,
    "why": "Cardinal ligaments and levator ani are the true uterine supports."
   }
  ],
  "related": [
   "gynsupport",
   "gynvagina",
   "gynuterus",
   "female"
  ],
  "photo": {
   "file": "female-pelvis.jpg",
   "credit": "3D medical render — Corpus atlas",
   "hot": {
    "bladderf": [
     440,
     300
    ],
    "urethraf": [
     440,
     420
    ],
    "vagina2": [
     470,
     450
    ],
    "uterus2": [
     500,
     330
    ],
    "pouches": [
     560,
     380
    ],
    "rectumf": [
     610,
     430
    ],
    "analf": [
     620,
     560
    ],
    "levatorf": [
     550,
     500
    ],
    "cardinal": [
     540,
     360
    ],
    "pudendf": [
     570,
     470
    ]
   }
  }
 },
 "gynuterus": {
  "title": "Uterus — layers & cavity",
  "latin": "Uterus",
  "system": "female",
  "region": "Midline pelvis between bladder and rectum",
  "size": "Nonpregnant ≈ 7–8 cm length (varies)",
  "blood": "Uterine artery (internal iliac), anastomoses with ovarian artery",
  "nerve": "Uterovaginal plexus; pelvic visceral afferents",
  "blurb": "The womb in cross-section: endometrium, junctional zone, myometrium, cavity, isthmus and the key clinical boundaries.",
  "summary": "Read the uterus from outside inward, then trace the menstrual endometrium and the lower segment relevant to obstetric and surgical anatomy.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "fundus": {
    "n": "Fundus",
    "l": "Fundus uteri",
    "t": "Gross",
    "d": "Dome above the two tubal openings.",
    "f": "Expands in pregnancy; fundal position is an obstetric landmark.",
    "c": "Fundal height is a rough gestational growth marker.",
    "at": [
     824,
     94.5
    ],
    "s": "r"
   },
   "body": {
    "n": "Uterine body",
    "l": "Corpus uteri",
    "t": "Gross",
    "d": "Main muscular region between fundus and isthmus.",
    "f": "Houses uterine cavity and contracts during labor.",
    "c": "Fibroids often arise here and may distort the cavity.",
    "at": [
     808,
     297
    ],
    "s": "r"
   },
   "cornua": {
    "n": "Uterine cornua",
    "l": "Cornua uteri",
    "t": "Gross",
    "d": "Upper lateral junctions where uterine tubes enter.",
    "f": "Communicate with intramural tube segments.",
    "c": "Interstitial ectopic pregnancy arises near the cornu.",
    "at": [
     540.8000000000001,
     189
    ],
    "s": "l"
   },
   "cavity": {
    "n": "Uterine cavity",
    "l": "Cavitas uteri",
    "t": "Space",
    "d": "Triangular cavity between the anterior and posterior endometrium.",
    "f": "Receives embryo; menstrual efflux passes to cervical canal.",
    "c": "Polyps or submucosal fibroids deform the cavity.",
    "at": [
     808,
     243
    ],
    "s": "r"
   },
   "endof": {
    "n": "Endometrium — functionalis",
    "l": "Stratum functionale",
    "t": "Histology",
    "d": "Superficial cyclic glandular layer; sheds with menses.",
    "f": "Proliferates under estrogen and becomes secretory under progesterone.",
    "c": "Abnormal bleeding can arise from altered endometrial architecture.",
    "at": [
     756.8000000000001,
     162
    ],
    "s": "l"
   },
   "endob": {
    "n": "Endometrium — basalis",
    "l": "Stratum basale",
    "t": "Histology",
    "d": "Deep regenerative endometrial layer next to myometrium.",
    "f": "Regrows the functionalis after menstruation.",
    "c": "Damage after uterine instrumentation can cause intrauterine adhesions.",
    "at": [
     692.8000000000001,
     166.5
    ],
    "s": "l"
   },
   "junction": {
    "n": "Endometrial–myometrial junction",
    "l": "Zona junctionalis",
    "t": "Histology",
    "d": "Inner myometrial zone adjacent to the endometrium.",
    "f": "Interface for cyclical uterine peristalsis and implantation.",
    "c": "Myometrial tissue in the endometrium-adjacent wall is central to adenomyosis.",
    "at": [
     696,
     270
    ],
    "s": "l"
   },
   "myomet": {
    "n": "Myometrium",
    "l": "Myometrium",
    "t": "Muscle",
    "d": "Thick interlacing smooth-muscle wall.",
    "f": "Contraction in labor; compresses spiral vessels after delivery.",
    "c": "Poor tone after birth is a major mechanism of postpartum hemorrhage.",
    "at": [
     992,
     324
    ],
    "s": "r"
   },
   "perimet": {
    "n": "Perimetrium / serosa",
    "l": "Perimetrium",
    "t": "Layer",
    "d": "Outer peritoneal covering where the uterus meets the pelvic cavity.",
    "f": "Allows gliding against adjacent viscera.",
    "c": "Anterior and posterior reflections create pelvic pouches.",
    "at": [
     1000,
     198
    ],
    "s": "r"
   },
   "isthmus": {
    "n": "Uterine isthmus",
    "l": "Isthmus uteri",
    "t": "Gross",
    "d": "Narrow transition between uterine body and cervix.",
    "f": "Elongates to form the lower uterine segment in pregnancy.",
    "c": "Lower-segment cesarean incisions are placed in this region.",
    "at": [
     832,
     562.5
    ],
    "s": "r"
   },
   "internalos": {
    "n": "Internal cervical os",
    "l": "Ostium internum",
    "t": "Opening",
    "d": "Upper entrance of the cervical canal.",
    "f": "Transition from cavity to cervical conduit.",
    "c": "Important landmark in cervical shortening assessment.",
    "at": [
     820.8000000000001,
     603
    ],
    "s": "r"
   },
   "cervixu": {
    "n": "Cervix / external os",
    "l": "Cervix uteri",
    "t": "Gross",
    "d": "Fibromuscular inferior uterine portion projecting into vagina.",
    "f": "Mucus, barrier function and dilation during birth.",
    "c": "The transformation zone is examined in cervical screening.",
    "at": [
     808,
     666
    ],
    "s": "r"
   },
   "spiral": {
    "n": "Spiral arteries",
    "l": "Arteriae spirales",
    "t": "Vascular",
    "d": "Coiled branches rising from radial arteries into functionalis.",
    "f": "Supply cyclic endometrium and remodel with implantation.",
    "c": "Deficient trophoblast remodeling is associated with placental disease.",
    "at": [
     120,
     80
    ],
    "s": "l"
   },
   "arcuate": {
    "n": "Arcuate and radial arteries",
    "l": "Arteriae arcuatae",
    "t": "Vascular",
    "d": "Uterine arteries branch circumferentially within myometrium.",
    "f": "Feed radial then basal and spiral vessels.",
    "c": "Uterine artery crosses superior to the ureter close to the cervix.",
    "at": [
     1480,
     158
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-uterus.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"fundus\"><circle cx=\"824\" cy=\"94.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"824\" cy=\"94.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"body\"><circle cx=\"808\" cy=\"297\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"808\" cy=\"297\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cornua\"><circle cx=\"540.8000000000001\" cy=\"189\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"540.8000000000001\" cy=\"189\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cavity\"><circle cx=\"808\" cy=\"243\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"808\" cy=\"243\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"endof\"><circle cx=\"756.8000000000001\" cy=\"162\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"756.8000000000001\" cy=\"162\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"endob\"><circle cx=\"692.8000000000001\" cy=\"166.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"692.8000000000001\" cy=\"166.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"junction\"><circle cx=\"696\" cy=\"270\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"696\" cy=\"270\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"myomet\"><circle cx=\"992\" cy=\"324\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"992\" cy=\"324\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"perimet\"><circle cx=\"1000\" cy=\"198\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1000\" cy=\"198\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"isthmus\"><circle cx=\"832\" cy=\"562.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"832\" cy=\"562.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"internalos\"><circle cx=\"820.8000000000001\" cy=\"603\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"820.8000000000001\" cy=\"603\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cervixu\"><circle cx=\"808\" cy=\"666\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"808\" cy=\"666\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 824 94.5 L 696 270\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "Which endometrial layer normally sheds during menstruation?",
    "opts": [
     "Basalis",
     "Functionalis",
     "Myometrium",
     "Perimetrium"
    ],
    "a": 1,
    "why": "The superficial functionalis sheds; basalis regenerates it."
   },
   {
    "q": "The thick contracting wall of the uterus is the…",
    "opts": [
     "Endometrium",
     "Myometrium",
     "Perimetrium",
     "Mesometrium"
    ],
    "a": 1,
    "why": "Myometrium consists of interlacing smooth muscle."
   },
   {
    "q": "The lower uterine segment develops mainly from the…",
    "opts": [
     "Fundus",
     "Isthmus",
     "Ovary",
     "Vaginal fornix"
    ],
    "a": 1,
    "why": "The uterine isthmus stretches into the lower uterine segment during pregnancy."
   }
  ],
  "related": [
   "gyncervix",
   "gynadnexa",
   "gynsupport",
   "female",
   "femalepelvis"
  ],
  "photo": {
   "file": "gyn-uterus.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "fundus": [
     515,
     105
    ],
    "body": [
     505,
     330
    ],
    "cornua": [
     338,
     210
    ],
    "cavity": [
     505,
     270
    ],
    "endof": [
     473,
     180
    ],
    "endob": [
     433,
     185
    ],
    "junction": [
     435,
     300
    ],
    "myomet": [
     620,
     360
    ],
    "perimet": [
     625,
     220
    ],
    "isthmus": [
     520,
     625
    ],
    "internalos": [
     513,
     670
    ],
    "cervixu": [
     505,
     740
    ]
   }
  },
  "study": {
   "lead": "A 3-layer wall surrounds a narrow cavity. Distinguish normal cyclic tissue from supporting muscle, then locate the ureter and uterine artery before studying hysterectomy planes.",
   "cards": [
    [
     "Wall from lumen outward",
     "Endometrium: functionalis + basalis → junctional zone → myometrium → perimetrium. The endometrium varies with the cycle."
    ],
    [
     "Vascular route",
     "Internal iliac → uterine artery → arcuate → radial → basal / spiral arteries. The ovarian artery anastomoses near the cornu."
    ],
    [
     "Lymphatic route",
     "Fundus toward para-aortic nodes (some via round ligament to superficial inguinal); body toward external iliac; cervix toward internal iliac, obturator and sacral nodes."
    ],
    [
     "High-yield relations",
     "Anteversion describes cervix–vagina axis; anteflexion describes body–cervix axis. Position and size vary; avoid assuming one fixed shape."
    ]
   ],
   "sources": [
    "https://teachmeanatomy.info/pelvis/female-reproductive-tract/uterus/",
    "https://www.ncbi.nlm.nih.gov/books/NBK538435/"
   ]
  }
 },
 "gyncervix": {
  "title": "Cervix — transformation zone",
  "latin": "Cervix uteri",
  "system": "female",
  "region": "Uterine neck projecting into vaginal fornices",
  "size": "≈ 2.5–3 cm long (variable)",
  "blood": "Descending uterine + vaginal branches",
  "nerve": "Uterovaginal plexus; pelvic visceral afferents",
  "blurb": "The gynecology examination landmark: external os, canal, squamocolumnar junction and transformation zone in one close-up.",
  "summary": "Learn which epithelium lines each surface and why the transformation zone matters for cervical cytology and colposcopy — without turning anatomy into a screening guideline.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "ecto": {
    "n": "Ectocervix",
    "l": "Portio vaginalis cervicis",
    "t": "Gross",
    "d": "Part of cervix visible at the vaginal vault.",
    "f": "Covered by nonkeratinizing stratified squamous epithelium.",
    "c": "Visual examination and directed biopsy sample this surface.",
    "at": [
     800,
     643.5
    ],
    "s": "r"
   },
   "canal": {
    "n": "Endocervical canal",
    "l": "Canalis cervicis uteri",
    "t": "Gross",
    "d": "Canal linking internal to external os.",
    "f": "Conducts sperm and menstrual flow; glandular mucus changes cyclically.",
    "c": "Stenosis may obstruct sampling or menstrual outflow.",
    "at": [
     800,
     360
    ],
    "s": "r"
   },
   "columnar": {
    "n": "Endocervical columnar epithelium",
    "l": "Epithelium columnare",
    "t": "Histology",
    "d": "Mucus-secreting simple columnar lining of the canal.",
    "f": "Produces cervical mucus under hormonal regulation.",
    "c": "Glandular lesions need distinct cytologic evaluation.",
    "at": [
     880,
     315
    ],
    "s": "r"
   },
   "squamous": {
    "n": "Ectocervical squamous epithelium",
    "l": "Epithelium squamosum",
    "t": "Histology",
    "d": "Nonkeratinizing squamous epithelium continuous with vaginal mucosa.",
    "f": "Protects exposed cervical surface.",
    "c": "Squamous metaplasia alters the visible junction.",
    "at": [
     1012.8000000000001,
     585
    ],
    "s": "r"
   },
   "scj": {
    "n": "Squamocolumnar junction",
    "l": "Junctio squamocolumnaris",
    "t": "Histology",
    "d": "Border where glandular and squamous epithelia meet.",
    "f": "Migrates with age, hormones and pregnancy.",
    "c": "Colposcopy assesses whether the entire junction is visible.",
    "at": [
     843.2,
     517.5
    ],
    "s": "r"
   },
   "tz": {
    "n": "Transformation zone",
    "l": "Zona transformationis",
    "t": "Histology",
    "d": "Region of squamous metaplasia between original and current SCJ.",
    "f": "Physiologic remodeling of exposed columnar epithelium.",
    "c": "Most cervical precancer arises here; anatomy guides sampling.",
    "at": [
     768,
     540
    ],
    "s": "l"
   },
   "externalos": {
    "n": "External os",
    "l": "Ostium externum",
    "t": "Opening",
    "d": "Opening from cervical canal into vagina.",
    "f": "Entry for cervical mucus and menstrual passage.",
    "c": "Shape varies, and appearance alone is not diagnostic.",
    "at": [
     808,
     612
    ],
    "s": "r"
   },
   "internalos2": {
    "n": "Internal os",
    "l": "Ostium internum",
    "t": "Opening",
    "d": "Opening from cervix to lower uterine cavity.",
    "f": "Mechanical boundary important in pregnancy.",
    "c": "Cervical funneling is described relative to this point.",
    "at": [
     800,
     99
    ],
    "s": "r"
   },
   "plicae": {
    "n": "Plicae palmatae",
    "l": "Plicae palmatae",
    "t": "Mucosa",
    "d": "Branching endocervical mucosal folds.",
    "f": "Increase glandular surface for mucus production.",
    "c": "Appear as arbor-vitae folds on section.",
    "at": [
     784,
     288
    ],
    "s": "l"
   },
   "stroma": {
    "n": "Cervical fibromuscular stroma",
    "l": "Stroma cervicis",
    "t": "Support",
    "d": "Collagen-rich cervical wall with some smooth-muscle fibers.",
    "f": "Structural integrity and remodeling during gestation.",
    "c": "Cervical insufficiency is a structural diagnosis, not simply os appearance.",
    "at": [
     1040,
     346.5
    ],
    "s": "r"
   },
   "fornix": {
    "n": "Vaginal fornices",
    "l": "Fornices vaginae",
    "t": "Relation",
    "d": "Vaginal recesses around the projecting cervix; posterior deepest.",
    "f": "Allow examination of cervix and adjacent pelvic structures.",
    "c": "Posterior fornix lies near the recto-uterine pouch.",
    "at": [
     1072,
     666
    ],
    "s": "r"
   },
   "mucus": {
    "n": "Cervical mucus",
    "l": "Mucus cervicalis",
    "t": "Secretion",
    "d": "Glandular secretion filling the canal.",
    "f": "Viscosity varies with estrogen/progesterone and can form a pregnancy plug.",
    "c": "Changes in discharge are not specific to one diagnosis.",
    "at": [
     1480,
     80
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-cervix.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"ecto\"><circle cx=\"800\" cy=\"643.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"800\" cy=\"643.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"canal\"><circle cx=\"800\" cy=\"360\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"800\" cy=\"360\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"columnar\"><circle cx=\"880\" cy=\"315\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"880\" cy=\"315\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"squamous\"><circle cx=\"1012.8000000000001\" cy=\"585\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1012.8000000000001\" cy=\"585\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"scj\"><circle cx=\"843.2\" cy=\"517.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"843.2\" cy=\"517.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"tz\"><circle cx=\"768\" cy=\"540\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"768\" cy=\"540\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"externalos\"><circle cx=\"808\" cy=\"612\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"808\" cy=\"612\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"internalos2\"><circle cx=\"800\" cy=\"99\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"800\" cy=\"99\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"plicae\"><circle cx=\"784\" cy=\"288\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"784\" cy=\"288\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"stroma\"><circle cx=\"1040\" cy=\"346.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1040\" cy=\"346.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fornix\"><circle cx=\"1072\" cy=\"666\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1072\" cy=\"666\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 800 643.5 L 768 540\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "The cervix transformation zone is between…",
    "opts": [
     "Myometrium and endometrium",
     "Original and current squamocolumnar junctions",
     "External and internal os only",
     "Vagina and bladder"
    ],
    "a": 1,
    "why": "The zone is remodeled squamous epithelium between original and current SCJs."
   },
   {
    "q": "Which tissue lines the endocervical canal?",
    "opts": [
     "Simple columnar glandular epithelium",
     "Keratinized epidermis",
     "Transitional urothelium",
     "Ciliated pseudostratified airway epithelium"
    ],
    "a": 0,
    "why": "Endocervix has mucus-secreting columnar cells."
   },
   {
    "q": "The posterior vaginal fornix lies near the…",
    "opts": [
     "Retropubic space",
     "Recto-uterine pouch",
     "Inguinal canal",
     "Ovarian fossa"
    ],
    "a": 1,
    "why": "The recto-uterine (Douglas) pouch lies immediately posterior-superior to the posterior fornix."
   }
  ],
  "related": [
   "gynuterus",
   "gynvagina",
   "gynsupport",
   "female"
  ],
  "photo": {
   "file": "gyn-cervix.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "ecto": [
     500,
     715
    ],
    "canal": [
     500,
     400
    ],
    "columnar": [
     550,
     350
    ],
    "squamous": [
     633,
     650
    ],
    "scj": [
     527,
     575
    ],
    "tz": [
     480,
     600
    ],
    "externalos": [
     505,
     680
    ],
    "internalos2": [
     500,
     110
    ],
    "plicae": [
     490,
     320
    ],
    "stroma": [
     650,
     385
    ],
    "fornix": [
     670,
     740
    ]
   }
  },
  "study": {
   "lead": "A cervical examination is an epithelial map, not just a hole in the uterine wall. Learn the movable junction and the anatomy behind directed sampling.",
   "cards": [
    [
     "Speculum sequence",
     "External os → ectocervix → visible squamocolumnar junction → canal. Document whether the full transformation zone can be visualized."
    ],
    [
     "Microscopic contrast",
     "Ectocervix: stratified squamous. Endocervix: mucus-secreting columnar. Metaplastic squamous epithelium forms the transformation zone."
    ],
    [
     "Anatomic variation",
     "SCJ and transformation zone can shift into the canal after menopause; shape and visibility vary by hormonal state."
    ],
    [
     "Blood & lymph",
     "Uterine and vaginal arterial branches supply the cervix. Lymph commonly reaches internal iliac, obturator and sacral nodes."
    ]
   ],
   "sources": [
    "https://www.ncbi.nlm.nih.gov/books/NBK568392/",
    "https://screening.iarc.fr/colpochap.php"
   ]
  }
 },
 "gynadnexa": {
  "title": "Ovary & uterine tube",
  "latin": "Ovarium et tuba uterina",
  "system": "female",
  "region": "Lateral pelvis / broad ligament",
  "size": "Ovary ≈ 3 × 2 × 1 cm; tube ≈ 10 cm (variable)",
  "blood": "Ovarian artery from aorta + tubal branches of uterine artery",
  "nerve": "Ovarian and uterovaginal autonomic plexuses",
  "blurb": "From follicular cortex to ampulla: the ovary, fimbriae, tubal mucosal folds and the hidden routes of fertilization.",
  "summary": "Follow the oocyte from dominant follicle across a peritoneal gap to the fimbriae and ampulla, then trace the tube to the uterine cornu.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "cortex": {
    "n": "Ovarian cortex",
    "l": "Cortex ovarii",
    "t": "Histology",
    "d": "Outer ovarian zone with follicles at several stages.",
    "f": "Houses the oocyte reserve.",
    "c": "Cortical tissue is considered in fertility-preserving surgery.",
    "at": [
     400,
     364.5
    ],
    "s": "l"
   },
   "medulla": {
    "n": "Ovarian medulla",
    "l": "Medulla ovarii",
    "t": "Histology",
    "d": "Central vascular stromal zone.",
    "f": "Supports vessels, nerves and the hilum.",
    "c": "Ovarian pedicle bleeding arises at the hilum.",
    "at": [
     432,
     486
    ],
    "s": "l"
   },
   "primordial": {
    "n": "Primordial follicles",
    "l": "Folliculi primordiales",
    "t": "Histology",
    "d": "Small oocyte with flat granulosa cells in outer cortex.",
    "f": "Dormant ovarian reserve pool.",
    "c": "Reserve declines with age and treatment exposure.",
    "at": [
     352,
     315
    ],
    "s": "l"
   },
   "secondary": {
    "n": "Growing follicles",
    "l": "Folliculi crescentes",
    "t": "Histology",
    "d": "Developing granulosa and theca layers, then antrum.",
    "f": "Estrogen synthesis and oocyte maturation.",
    "c": "Follicle tracking uses size, not a diagnosis of oocyte quality.",
    "at": [
     483.20000000000005,
     297
    ],
    "s": "l"
   },
   "dominant": {
    "n": "Dominant antral follicle",
    "l": "Folliculus maturus",
    "t": "Histology",
    "d": "Large fluid-filled preovulatory follicle.",
    "f": "Releases a secondary oocyte after the LH surge.",
    "c": "Functional cysts may arise from follicular persistence.",
    "at": [
     632,
     585
    ],
    "s": "l"
   },
   "luteum": {
    "n": "Corpus luteum",
    "l": "Corpus luteum",
    "t": "Endocrine",
    "d": "Yellow luteinized structure after ovulation.",
    "f": "Produces progesterone during luteal phase.",
    "c": "Corpus luteum cysts can mimic adnexal pathology.",
    "at": [
     328,
     648
    ],
    "s": "l"
   },
   "albuginea": {
    "n": "Ovarian surface & tunica albuginea",
    "l": "Tunica albuginea",
    "t": "Layer",
    "d": "Ovary has surface epithelium over dense connective tissue.",
    "f": "Protective covering; ovulation ruptures surface locally.",
    "c": "The ovarian surface is not covered by peritoneum.",
    "at": [
     288,
     441
    ],
    "s": "l"
   },
   "hilum": {
    "n": "Ovarian hilum / mesovarium",
    "l": "Hilum ovarii",
    "t": "Vascular",
    "d": "Mesovarium connects ovary to broad ligament; vessels enter at hilum.",
    "f": "Neurovascular gateway.",
    "c": "Preserve vascular supply when possible in adnexal surgery.",
    "at": [
     760,
     396
    ],
    "s": "l"
   },
   "suspensory": {
    "n": "Suspensory ligament (IP ligament)",
    "l": "Lig. suspensorium ovarii",
    "t": "Support",
    "d": "Peritoneal fold from ovary toward pelvic sidewall carrying vessels.",
    "f": "Conveys ovarian artery and vein.",
    "c": "Ureter lies close to ovarian pedicle during ligation.",
    "at": [
     288,
     117
    ],
    "s": "l"
   },
   "ovlig": {
    "n": "Ovarian ligament",
    "l": "Lig. ovarii proprium",
    "t": "Support",
    "d": "Fibrous connection from uterine cornu to ovary.",
    "f": "Anchors ovary medially.",
    "c": "Distinct from the vascular suspensory ligament.",
    "at": [
     720,
     414
    ],
    "s": "l"
   },
   "fimbriae2": {
    "n": "Fimbriae",
    "l": "Fimbriae tubae",
    "t": "Tube",
    "d": "Fringed distal projections adjacent to ovary.",
    "f": "Sweep oocyte toward tubal abdominal ostium.",
    "c": "The tube opens to the peritoneal cavity here.",
    "at": [
     624,
     378
    ],
    "s": "l"
   },
   "infund": {
    "n": "Infundibulum & abdominal ostium",
    "l": "Infundibulum tubae",
    "t": "Tube",
    "d": "Funnel-shaped distal end of tube.",
    "f": "Receives oocyte from peritoneal cavity.",
    "c": "Tubal disease here may impair pickup.",
    "at": [
     768,
     324
    ],
    "s": "l"
   },
   "ampulla2": {
    "n": "Ampulla",
    "l": "Ampulla tubae",
    "t": "Tube",
    "d": "Wide, folded lateral tubal segment.",
    "f": "Usual site of fertilization.",
    "c": "A common site of tubal ectopic implantation.",
    "at": [
     1096,
     333
    ],
    "s": "r"
   },
   "isthmus2": {
    "n": "Tubal isthmus",
    "l": "Isthmus tubae",
    "t": "Tube",
    "d": "Narrow muscular medial tubal segment.",
    "f": "Transports gametes/embryo toward uterus.",
    "c": "Narrow lumen can be affected by scarring.",
    "at": [
     1368,
     459
    ],
    "s": "r"
   },
   "intramural": {
    "n": "Intramural (interstitial) tube",
    "l": "Pars uterina tubae",
    "t": "Tube",
    "d": "Short segment inside uterine myometrium.",
    "f": "Connects tube to uterine cavity.",
    "c": "Interstitial ectopic gestation can expand before recognition.",
    "at": [
     1560,
     490.5
    ],
    "s": "r"
   },
   "mucosa": {
    "n": "Tubal mucosal folds & cilia",
    "l": "Plicae mucosae tubae",
    "t": "Histology",
    "d": "Highly folded ciliated and secretory epithelium in tube.",
    "f": "Ciliary motion and muscular peristalsis aid transport.",
    "c": "Inflammation damages cilia and increases ectopic risk.",
    "at": [
     1088,
     369
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-adnexa.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"cortex\"><circle cx=\"400\" cy=\"364.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"400\" cy=\"364.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"medulla\"><circle cx=\"432\" cy=\"486\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"432\" cy=\"486\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"primordial\"><circle cx=\"352\" cy=\"315\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"352\" cy=\"315\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"secondary\"><circle cx=\"483.20000000000005\" cy=\"297\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"483.20000000000005\" cy=\"297\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"dominant\"><circle cx=\"632\" cy=\"585\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"632\" cy=\"585\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"luteum\"><circle cx=\"328\" cy=\"648\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"328\" cy=\"648\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"albuginea\"><circle cx=\"288\" cy=\"441\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"288\" cy=\"441\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"hilum\"><circle cx=\"760\" cy=\"396\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"760\" cy=\"396\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"suspensory\"><circle cx=\"288\" cy=\"117\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"288\" cy=\"117\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ovlig\"><circle cx=\"720\" cy=\"414\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"720\" cy=\"414\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fimbriae2\"><circle cx=\"624\" cy=\"378\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"624\" cy=\"378\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"infund\"><circle cx=\"768\" cy=\"324\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"768\" cy=\"324\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ampulla2\"><circle cx=\"1096\" cy=\"333\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1096\" cy=\"333\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"isthmus2\"><circle cx=\"1368\" cy=\"459\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1368\" cy=\"459\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"intramural\"><circle cx=\"1560\" cy=\"490.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1560\" cy=\"490.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mucosa\"><circle cx=\"1088\" cy=\"369\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1088\" cy=\"369\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 400 364.5 L 288 117\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "Fertilization most often occurs in the…",
    "opts": [
     "Cervix",
     "Ampulla of uterine tube",
     "Ovarian medulla",
     "Uterine isthmus"
    ],
    "a": 1,
    "why": "The ampulla is the broad lateral tubal segment."
   },
   {
    "q": "Which ligament carries ovarian vessels?",
    "opts": [
     "Ovarian ligament",
     "Round ligament",
     "Suspensory (infundibulopelvic) ligament",
     "Uterosacral ligament"
    ],
    "a": 2,
    "why": "The suspensory ligament carries the ovarian artery, vein and lymphatics."
   },
   {
    "q": "After ovulation the main source of progesterone is…",
    "opts": [
     "Corpus luteum",
     "Primordial follicle",
     "Fimbria",
     "Ovarian hilum"
    ],
    "a": 0,
    "why": "Luteinized granulosa and theca cells form the corpus luteum."
   }
  ],
  "related": [
   "gynuterus",
   "gynsupport",
   "female",
   "femalepelvis"
  ],
  "photo": {
   "file": "gyn-adnexa.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "cortex": [
     250,
     405
    ],
    "medulla": [
     270,
     540
    ],
    "primordial": [
     220,
     350
    ],
    "secondary": [
     302,
     330
    ],
    "dominant": [
     395,
     650
    ],
    "luteum": [
     205,
     720
    ],
    "albuginea": [
     180,
     490
    ],
    "hilum": [
     475,
     440
    ],
    "suspensory": [
     180,
     130
    ],
    "ovlig": [
     450,
     460
    ],
    "fimbriae2": [
     390,
     420
    ],
    "infund": [
     480,
     360
    ],
    "ampulla2": [
     685,
     370
    ],
    "isthmus2": [
     855,
     510
    ],
    "intramural": [
     975,
     545
    ],
    "mucosa": [
     680,
     410
    ]
   }
  },
  "study": {
   "lead": "Understand three routes at once: oocyte transport, ovarian vessel supply and the ovarian lymphatic path. A peritoneal gap separates ovary and fimbrial ostium.",
   "cards": [
    [
     "Oocyte route",
     "Follicle → ovulatory surface → peritoneal gap → fimbriae → infundibulum → ampulla → isthmus → uterine part → cavity."
    ],
    [
     "Follicle histology",
     "Primordial → primary → secondary/antral → dominant → corpus luteum → corpus albicans if no ongoing hormonal support."
    ],
    [
     "Vessels and drainage",
     "Ovarian artery comes from abdominal aorta; right ovarian vein → IVC, left ovarian vein → left renal vein. Ovarian lymph reaches para-aortic nodes."
    ],
    [
     "Surgical relation",
     "The ureter lies near the ovarian vessels as they cross the pelvic brim; identify it when dealing with the infundibulopelvic ligament."
    ]
   ],
   "sources": [
    "https://teachmeanatomy.info/pelvis/female-reproductive-tract/fallopian-tubes/",
    "https://www.ncbi.nlm.nih.gov/books/NBK547660/"
   ]
  }
 },
 "gynvagina": {
  "title": "Vagina — walls & fornices",
  "latin": "Vagina",
  "system": "female",
  "region": "Pelvic canal between bladder/urethra and rectum",
  "size": "≈ 7–10 cm; distensible and variable",
  "blood": "Vaginal + uterine artery branches; internal pudendal distally",
  "nerve": "Uterovaginal plexus above, pudendal nerve below",
  "blurb": "A layered fibromuscular canal: rugae, muscularis, fornices, vestibular opening, adjacent urethra and rectum.",
  "summary": "The sagittal cut clarifies relationships used in speculum examination, pelvic surgery and posterior fornix assessment.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "canalv": {
    "n": "Vaginal lumen",
    "l": "Lumen vaginae",
    "t": "Space",
    "d": "Potential space whose walls normally lie against one another.",
    "f": "Passage for menstrual flow, intercourse and birth.",
    "c": "Distensibility varies; do not interpret the lumen as a permanently open tube.",
    "at": [
     808,
     571.5
    ],
    "s": "r"
   },
   "anteriorwall": {
    "n": "Anterior vaginal wall",
    "l": "Paries anterior vaginae",
    "t": "Wall",
    "d": "Shorter wall adjoining bladder base and urethra.",
    "f": "Provides anterior pelvic support.",
    "c": "Anterior compartment weakness may be associated with cystocele.",
    "at": [
     672,
     562.5
    ],
    "s": "l"
   },
   "posteriorwall": {
    "n": "Posterior vaginal wall",
    "l": "Paries posterior vaginae",
    "t": "Wall",
    "d": "Wall lying anterior to rectum, longer near posterior fornix.",
    "f": "Supports the posterior compartment.",
    "c": "Posterior wall defects may accompany rectocele.",
    "at": [
     952,
     585
    ],
    "s": "r"
   },
   "mucosav": {
    "n": "Vaginal mucosa & rugae",
    "l": "Tunica mucosa vaginae",
    "t": "Histology",
    "d": "Nonkeratinizing squamous mucosa with transverse folds.",
    "f": "Distends and responds to estrogen; no intrinsic mucosal glands.",
    "c": "Atrophy can cause fragility; moisture derives mainly from transudate and cervical secretions.",
    "at": [
     832,
     495
    ],
    "s": "r"
   },
   "muscularisv": {
    "n": "Vaginal muscularis",
    "l": "Tunica muscularis vaginae",
    "t": "Muscle",
    "d": "Circular and longitudinal smooth-muscle bundles.",
    "f": "Allows distension and elastic return.",
    "c": "At the introitus skeletal pelvic floor muscles contribute support.",
    "at": [
     912,
     445.5
    ],
    "s": "r"
   },
   "adventitia": {
    "n": "Adventitia & paravaginal fascia",
    "l": "Tunica adventitia",
    "t": "Support",
    "d": "Outer connective tissue joining vaginal walls to pelvic sidewall.",
    "f": "Contains neurovascular routes and supports the canal.",
    "c": "Fascial defects contribute to pelvic organ prolapse.",
    "at": [
     992,
     450
    ],
    "s": "r"
   },
   "fornixant": {
    "n": "Anterior fornix",
    "l": "Fornix anterior",
    "t": "Relation",
    "d": "Recess between cervix and anterior vaginal wall.",
    "f": "Allows motion around cervix.",
    "c": "Bladder is nearby anteriorly.",
    "at": [
     696,
     369
    ],
    "s": "l"
   },
   "fornixpost": {
    "n": "Posterior fornix",
    "l": "Fornix posterior",
    "t": "Relation",
    "d": "Deep recess behind cervix near recto-uterine pouch.",
    "f": "Useful landmark in examination.",
    "c": "Douglas pouch is separated by thin tissues superiorly.",
    "at": [
     944,
     351
    ],
    "s": "r"
   },
   "fornixlat": {
    "n": "Lateral fornices",
    "l": "Fornices laterales",
    "t": "Relation",
    "d": "Paired recesses to either side of cervix.",
    "f": "Anatomic route near cervical attachments.",
    "c": "Ureter runs near the lateral vaginal fornix under the uterine artery.",
    "at": [
     864,
     369
    ],
    "s": "r"
   },
   "cervixproj": {
    "n": "Cervix projecting into vagina",
    "l": "Portio vaginalis",
    "t": "Relation",
    "d": "Cervical tip enters upper vaginal vault.",
    "f": "Creates the four fornices.",
    "c": "Examination of the external os requires visualization of this projection.",
    "at": [
     824,
     315
    ],
    "s": "r"
   },
   "introitus": {
    "n": "Vaginal introitus",
    "l": "Ostium vaginae",
    "t": "Opening",
    "d": "External vaginal opening within vulvar vestibule.",
    "f": "Continuity with external genital tract.",
    "c": "The hymenal rim is variable and not evidence of sexual history.",
    "at": [
     752,
     774
    ],
    "s": "l"
   },
   "bladderrel": {
    "n": "Bladder & urethra relation",
    "l": "Vesica et urethra",
    "t": "Relation",
    "d": "Bladder and urethra lie anterior to vaginal wall.",
    "f": "Explains anterior pelvic support.",
    "c": "Urethral injury risk depends on operative plane.",
    "at": [
     584,
     373.5
    ],
    "s": "l"
   },
   "rectrel": {
    "n": "Rectal relation",
    "l": "Rectum",
    "t": "Relation",
    "d": "Rectum lies posterior to vagina.",
    "f": "Explains posterior compartment anatomy.",
    "c": "Rectovaginal septum is important in surgery and endometriosis.",
    "at": [
     1168,
     405
    ],
    "s": "r"
   },
   "lymphv": {
    "n": "Vaginal lymphatic zones",
    "l": "Vasa lymphatica",
    "t": "Lymph",
    "d": "Upper vagina drains to pelvic nodes; lower portion to inguinal nodes.",
    "f": "Route for local immune drainage.",
    "c": "Drainage patterns matter in oncologic staging.",
    "at": [
     1480,
     80
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-vagina.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"canalv\"><circle cx=\"808\" cy=\"571.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"808\" cy=\"571.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"anteriorwall\"><circle cx=\"672\" cy=\"562.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"672\" cy=\"562.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"posteriorwall\"><circle cx=\"952\" cy=\"585\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"952\" cy=\"585\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mucosav\"><circle cx=\"832\" cy=\"495\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"832\" cy=\"495\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"muscularisv\"><circle cx=\"912\" cy=\"445.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"912\" cy=\"445.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"adventitia\"><circle cx=\"992\" cy=\"450\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"992\" cy=\"450\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fornixant\"><circle cx=\"696\" cy=\"369\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"696\" cy=\"369\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fornixpost\"><circle cx=\"944\" cy=\"351\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"944\" cy=\"351\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fornixlat\"><circle cx=\"864\" cy=\"369\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"864\" cy=\"369\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cervixproj\"><circle cx=\"824\" cy=\"315\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"824\" cy=\"315\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"introitus\"><circle cx=\"752\" cy=\"774\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"752\" cy=\"774\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"bladderrel\"><circle cx=\"584\" cy=\"373.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"584\" cy=\"373.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"rectrel\"><circle cx=\"1168\" cy=\"405\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1168\" cy=\"405\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 808 571.5 L 696 369\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "The lining of the vagina is primarily…",
    "opts": [
     "Ciliated columnar",
     "Nonkeratinizing stratified squamous",
     "Urothelium",
     "Keratinized simple squamous"
    ],
    "a": 1,
    "why": "Vaginal mucosa is nonkeratinizing stratified squamous epithelium."
   },
   {
    "q": "Which fornix lies closest to the recto-uterine pouch?",
    "opts": [
     "Anterior",
     "Posterior",
     "Right lateral",
     "Left lateral"
    ],
    "a": 1,
    "why": "The posterior fornix is adjacent to the pouch of Douglas."
   },
   {
    "q": "The vaginal mucosa contains…",
    "opts": [
     "Many mucus glands",
     "No intrinsic glands",
     "Sebaceous glands throughout",
     "Endometrial glands"
    ],
    "a": 1,
    "why": "Lubrication is mainly transudation and cervical/vestibular secretions, not intrinsic vaginal glands."
   }
  ],
  "related": [
   "gyncervix",
   "gynvulva",
   "gynsupport",
   "femalepelvis"
  ],
  "photo": {
   "file": "gyn-vagina.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "canalv": [
     505,
     635
    ],
    "anteriorwall": [
     420,
     625
    ],
    "posteriorwall": [
     595,
     650
    ],
    "mucosav": [
     520,
     550
    ],
    "muscularisv": [
     570,
     495
    ],
    "adventitia": [
     620,
     500
    ],
    "fornixant": [
     435,
     410
    ],
    "fornixpost": [
     590,
     390
    ],
    "fornixlat": [
     540,
     410
    ],
    "cervixproj": [
     515,
     350
    ],
    "introitus": [
     470,
     860
    ],
    "bladderrel": [
     365,
     415
    ],
    "rectrel": [
     730,
     450
    ]
   }
  },
  "study": {
   "lead": "Describe the vagina as a potential space with a mucosa, muscle layer and supporting adventitia—not a gland-lined cavity. Distinguish upper autonomic from lower somatic sensation.",
   "cards": [
    [
     "Wall layers",
     "Squamous mucosa with rugae → smooth-muscle layer → outer adventitial connective tissue. No vaginal mucosal glands."
    ],
    [
     "Relations",
     "Anterior: bladder/urethra. Posterior: rectum. Superior: cervix and the four fornices; posterior fornix is the deepest recess."
    ],
    [
     "Vascular & lymph",
     "Vaginal and uterine arterial branches supply upper canal; internal pudendal distally. Upper vaginal lymph to pelvic nodes, lower to inguinal."
    ],
    [
     "Exam anatomy",
     "Speculum exposes cervix at upper vault; describe visible walls and fornices without assuming a single normal shape."
    ]
   ],
   "sources": [
    "https://www.ncbi.nlm.nih.gov/books/NBK554601/",
    "https://www.glowm.com/resources/glowm/cd/pages/v1/v1c001.html"
   ]
  }
 },
 "gynvulva": {
  "title": "Vulva — external genital anatomy",
  "latin": "Vulva",
  "system": "female",
  "region": "External genital region / urogenital triangle",
  "size": "Variable normal anatomy; no single standard shape",
  "blood": "Internal & external pudendal arteries",
  "nerve": "Pudendal (S2–S4), ilioinguinal & genitofemoral branches",
  "blurb": "The external genitalia, carefully distinguished from the vagina: labia, clitoral complex, vestibule, openings, glands and perineum.",
  "summary": "External structures are detailed below. The default realistic render is a regional sagittal context view; surface landmarks not visible in this plane are explained in the part records and a dedicated schematic.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "mons": {
    "n": "Mons pubis",
    "l": "Mons pubis",
    "t": "External",
    "d": "Fatty pad over pubic symphysis.",
    "f": "Cushions pubic bone.",
    "c": "Normal hair pattern and contour vary widely.",
    "at": [
     512,
     72
    ],
    "s": "l"
   },
   "major": {
    "n": "Labia majora",
    "l": "Labia majora pudendi",
    "t": "External",
    "d": "Outer skin folds containing fat and connective tissue.",
    "f": "Protect the vestibule and inner folds.",
    "c": "Vulvar lymph largely drains to superficial inguinal nodes.",
    "at": [
     1480,
     80
    ],
    "s": "r"
   },
   "minor": {
    "n": "Labia minora",
    "l": "Labia minora pudendi",
    "t": "External",
    "d": "Inner hairless folds, highly variable in size and pigmentation.",
    "f": "Border the vestibule and contribute to clitoral hood.",
    "c": "Normal asymmetry is common and not pathological.",
    "at": [
     120,
     158
    ],
    "s": "l"
   },
   "clit": {
    "n": "Clitoral glans & hood",
    "l": "Glans et preputium clitoridis",
    "t": "External",
    "d": "Glans at the anterior meeting of labia minora, under prepuce.",
    "f": "Highly innervated erectile tissue.",
    "c": "Clitoral neurovascular supply should be respected in vulvar surgery.",
    "at": [
     1480,
     236
    ],
    "s": "r"
   },
   "crura": {
    "n": "Clitoral body & crura",
    "l": "Corpus et crura clitoridis",
    "t": "Deep",
    "d": "Paired erectile corpora extend along pubic rami.",
    "f": "Erectile engorgement.",
    "c": "Most of clitoral structure is internal rather than visible externally.",
    "at": [
     120,
     314
    ],
    "s": "l"
   },
   "bulbs": {
    "n": "Vestibular bulbs",
    "l": "Bulbi vestibuli",
    "t": "Deep",
    "d": "Paired erectile tissues along lateral vaginal opening.",
    "f": "Engorge with arousal, beside bulbospongiosus muscle.",
    "c": "Can contribute to hematoma after perineal trauma.",
    "at": [
     1480,
     392
    ],
    "s": "r"
   },
   "vest": {
    "n": "Vulvar vestibule",
    "l": "Vestibulum vaginae",
    "t": "External",
    "d": "Space between labia minora containing urethral and vaginal openings.",
    "f": "Shared surface region for urinary and genital outlets.",
    "c": "Distinguish urethral meatus from vaginal introitus on examination.",
    "at": [
     760,
     757.8000000000001
    ],
    "s": "l"
   },
   "urethralmeatus": {
    "n": "External urethral meatus",
    "l": "Ostium urethrae externum",
    "t": "Opening",
    "d": "Urinary opening anterior to vaginal introitus.",
    "f": "Urine exits here, not through the vagina.",
    "c": "An important catheterization landmark.",
    "at": [
     688,
     684
    ],
    "s": "l"
   },
   "intro2": {
    "n": "Vaginal introitus",
    "l": "Ostium vaginae",
    "t": "Opening",
    "d": "Vaginal opening posterior to urethral meatus.",
    "f": "Entrance to the vaginal canal.",
    "c": "Hymenal tissue is variable and cannot establish sexual history.",
    "at": [
     784,
     787.5
    ],
    "s": "l"
   },
   "hymen": {
    "n": "Hymenal rim",
    "l": "Hymen",
    "t": "External",
    "d": "Variable mucosal fold around part of vaginal opening.",
    "f": "Embryologic remnant with a wide normal range.",
    "c": "Its appearance is not a reliable marker of sexual activity.",
    "at": [
     1480,
     470
    ],
    "s": "r"
   },
   "barthol": {
    "n": "Greater vestibular (Bartholin) glands",
    "l": "Gll. vestibulares majores",
    "t": "Gland",
    "d": "Paired glands posterolateral to vaginal opening; ducts empty in vestibule.",
    "f": "Secrete mucus for lubrication.",
    "c": "Duct obstruction may cause a cyst or abscess.",
    "at": [
     120,
     548
    ],
    "s": "l"
   },
   "skene": {
    "n": "Paraurethral (Skene) glands",
    "l": "Gll. paraurethrales",
    "t": "Gland",
    "d": "Small glands beside the distal urethra.",
    "f": "Contribute secretions near the urethral opening.",
    "c": "Can rarely become inflamed or form a cyst.",
    "at": [
     1480,
     626
    ],
    "s": "r"
   },
   "fourchette": {
    "n": "Posterior fourchette",
    "l": "Commissura posterior",
    "t": "External",
    "d": "Where labia minora join behind the introitus.",
    "f": "Landmark at posterior vestibule.",
    "c": "Perineal tears may involve this region.",
    "at": [
     832,
     814.5
    ],
    "s": "r"
   },
   "perineum2": {
    "n": "Perineal body",
    "l": "Centrum tendineum perinei",
    "t": "Support",
    "d": "Fibromuscular node between vagina and anus.",
    "f": "Attachment for bulbospongiosus, transverse perineal and anal sphincter fibers.",
    "c": "Obstetric tears may compromise perineal support.",
    "at": [
     912,
     819
    ],
    "s": "r"
   },
   "hart": {
    "n": "Hart line / vestibular boundary",
    "l": "Linea vestibularis",
    "t": "Histology",
    "d": "Transition between inner labial and vestibular epithelium.",
    "f": "Defines epithelial regions clinically.",
    "c": "Useful descriptor when localizing lesions.",
    "at": [
     120,
     704
    ],
    "s": "l"
   },
   "lymphvul": {
    "n": "Vulvar lymphatic drainage",
    "l": "Nodi inguinales",
    "t": "Lymph",
    "d": "Most vulvar tissues drain to superficial inguinal nodes; clitoral routes can reach deeper nodes.",
    "f": "Carries immune cells and tissue fluid.",
    "c": "Side and depth of drainage matter in cancer staging.",
    "at": [
     1480,
     782
    ],
    "s": "r"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-vagina.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"mons\"><circle cx=\"512\" cy=\"72\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"512\" cy=\"72\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"vest\"><circle cx=\"760\" cy=\"757.8000000000001\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"760\" cy=\"757.8000000000001\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"urethralmeatus\"><circle cx=\"688\" cy=\"684\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"688\" cy=\"684\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"intro2\"><circle cx=\"784\" cy=\"787.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"784\" cy=\"787.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"fourchette\"><circle cx=\"832\" cy=\"814.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"832\" cy=\"814.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"perineum2\"><circle cx=\"912\" cy=\"819\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"912\" cy=\"819\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 512 72 L 784 787.5\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "The urethral meatus lies where relative to the vaginal introitus?",
    "opts": [
     "Posterior",
     "Anterior",
     "Lateral",
     "Inside the cervix"
    ],
    "a": 1,
    "why": "The urethral opening lies anterior to the vaginal opening in the vestibule."
   },
   {
    "q": "Most vulvar lymph first reaches the…",
    "opts": [
     "Para-aortic nodes",
     "Superficial inguinal nodes",
     "Mediastinal nodes",
     "Axillary nodes"
    ],
    "a": 1,
    "why": "Superficial inguinal nodes receive most vulvar lymph; clitoral drainage may differ."
   },
   {
    "q": "Greater vestibular glands are also called…",
    "opts": [
     "Skene glands",
     "Bartholin glands",
     "Endometrial glands",
     "Cowper glands"
    ],
    "a": 1,
    "why": "Bartholin glands are posterolateral to the vaginal opening."
   }
  ],
  "related": [
   "gynvagina",
   "gynsupport",
   "femalepelvis",
   "female"
  ],
  "photo": {
   "file": "gyn-vagina.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "mons": [
     320,
     80
    ],
    "vest": [
     475,
     842
    ],
    "urethralmeatus": [
     430,
     760
    ],
    "intro2": [
     490,
     875
    ],
    "fourchette": [
     520,
     905
    ],
    "perineum2": [
     570,
     910
    ]
   }
  },
  "study": {
   "lead": "Terminology matters: vulva is external; vagina is an internal fibromuscular canal. Appearance is variable. This chapter teaches examination landmarks, not judgments about sexual history.",
   "cards": [
    [
     "Anterior → posterior landmarks",
     "Mons → clitoral hood/glans → urethral meatus → vaginal introitus → posterior fourchette → perineal body."
    ],
    [
     "Hidden components",
     "Paired clitoral crura and vestibular bulbs extend deep to visible structures. Bartholin glands lie posterolaterally; paraurethral glands lie near urethra."
    ],
    [
     "Vessels and nerves",
     "Internal/external pudendal arterial supply. Pudendal, ilioinguinal and genitofemoral somatic branches; clitoral dorsal nerve is a pudendal branch."
    ],
    [
     "Lymph in gynecology",
     "Most vulvar lymph to superficial inguinal nodes; clitoral/anterior routes may reach deep inguinal and pelvic nodes."
    ]
   ],
   "sources": [
    "https://teachmeanatomy.info/pelvis/female-reproductive-tract/the-vulva/",
    "https://www.ncbi.nlm.nih.gov/books/NBK547703/"
   ]
  }
 },
 "gynsupport": {
  "title": "Pelvic support & surgical planes",
  "latin": "Fascia et ligamenta pelvis feminae",
  "system": "female",
  "region": "Uterus, sidewall and pelvic floor",
  "size": "Dynamic fascial and muscular supports",
  "blood": "Uterine / ovarian / vaginal / internal pudendal vessels",
  "nerve": "Inferior hypogastric plexus + pudendal nerve",
  "blurb": "The surgical map: ureter under uterine artery, uterosacral and cardinal supports, broad ligament folds, ovarian pedicle and pelvic floor.",
  "summary": "Study true support separately from peritoneal reflections. This realistic pelvis plate shows why the ureter and arteries demand a careful surgical plane.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#a34a6a",
    "Female reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "broad": {
    "n": "Broad ligament",
    "l": "Ligamentum latum uteri",
    "t": "Peritoneum",
    "d": "Double peritoneal sheet draped over uterus, tubes and associated structures.",
    "f": "Supports relationships but is not the main mechanical uterine support.",
    "c": "Ureter and uterine vessels course at its base.",
    "at": [
     848,
     279
    ],
    "s": "r"
   },
   "mesomet": {
    "n": "Mesometrium",
    "l": "Mesometrium",
    "t": "Peritoneum",
    "d": "Largest sheet of broad ligament lateral to uterus.",
    "f": "Conveys uterine vessels and connective tissue in base.",
    "c": "Surgical dissection exposes adjacent ureter.",
    "at": [
     680,
     391.5
    ],
    "s": "l"
   },
   "mesosal": {
    "n": "Mesosalpinx",
    "l": "Mesosalpinx",
    "t": "Peritoneum",
    "d": "Broad ligament portion related to uterine tube.",
    "f": "Supports tube and its vessels.",
    "c": "Tubal surgery separates this vascular fold.",
    "at": [
     1056,
     252
    ],
    "s": "r"
   },
   "mesovar": {
    "n": "Mesovarium",
    "l": "Mesovarium",
    "t": "Peritoneum",
    "d": "Short fold suspending ovarian hilum from posterior broad ligament.",
    "f": "Transmits vessels to ovary.",
    "c": "Distinct from the suspensory ovarian ligament.",
    "at": [
     1224,
     310.5
    ],
    "s": "r"
   },
   "round": {
    "n": "Round ligament",
    "l": "Ligamentum teres uteri",
    "t": "Support",
    "d": "Band from uterine cornu through inguinal canal to labium majus.",
    "f": "Helps maintain anteversion; not principal apical support.",
    "c": "Relevant to round-ligament pain and inguinal surgery.",
    "at": [
     712,
     238.5
    ],
    "s": "l"
   },
   "ovarylig": {
    "n": "Ovarian ligament",
    "l": "Ligamentum ovarii proprium",
    "t": "Support",
    "d": "Cornu-to-ovary band medial to ovarian hilum.",
    "f": "Anchors ovary toward uterus.",
    "c": "Different from suspensory ligament carrying ovarian vessels.",
    "at": [
     1216,
     337.5
    ],
    "s": "r"
   },
   "ipl": {
    "n": "Infundibulopelvic (suspensory) ligament",
    "l": "Ligamentum suspensorium ovarii",
    "t": "Vascular",
    "d": "Ovary-to-sidewall peritoneal fold with ovarian vessels.",
    "f": "Conduit for ovarian artery, vein, nerves and lymph.",
    "c": "Locate ureter before pedicle division.",
    "at": [
     1352,
     292.5
    ],
    "s": "r"
   },
   "cardinal2": {
    "n": "Cardinal ligament",
    "l": "Ligamentum cardinale",
    "t": "Support",
    "d": "Transverse cervical connective tissue to pelvic sidewall.",
    "f": "Important apical support with uterine artery/vein.",
    "c": "Ureter passes nearby under the uterine artery.",
    "at": [
     688,
     540
    ],
    "s": "l"
   },
   "uterosac": {
    "n": "Uterosacral ligaments",
    "l": "Ligamenta sacrouterina",
    "t": "Support",
    "d": "Bands from posterior cervix/vagina to sacrum.",
    "f": "Posterior apical support.",
    "c": "Deep infiltrating endometriosis can involve this region.",
    "at": [
     1056,
     486
    ],
    "s": "r"
   },
   "pubocerv": {
    "n": "Pubocervical fascia",
    "l": "Fascia pubocervicalis",
    "t": "Support",
    "d": "Anterior connective tissue supporting vaginal wall and bladder.",
    "f": "Anterior compartment support.",
    "c": "Fascial defects are associated with anterior prolapse.",
    "at": [
     744,
     648
    ],
    "s": "l"
   },
   "rectovag": {
    "n": "Rectovaginal fascia",
    "l": "Septum rectovaginale",
    "t": "Support",
    "d": "Connective tissue between posterior vagina and rectum.",
    "f": "Separates posterior compartment.",
    "c": "A plane important in endometriosis and prolapse surgery.",
    "at": [
     1040,
     639
    ],
    "s": "r"
   },
   "levator": {
    "n": "Levator ani",
    "l": "Musculus levator ani",
    "t": "Muscle",
    "d": "Puborectalis, pubococcygeus, iliococcygeus under pelvic organs.",
    "f": "Supports pelvic organs and maintains anorectal angle.",
    "c": "Avulsion and weakness may contribute to prolapse.",
    "at": [
     776,
     729
    ],
    "s": "l"
   },
   "artery": {
    "n": "Uterine artery",
    "l": "Arteria uterina",
    "t": "Vascular",
    "d": "Tortuous internal iliac branch entering cervix in cardinal ligament.",
    "f": "Supplies uterus; anastomoses with ovarian artery.",
    "c": "“Water under the bridge”: artery crosses above ureter.",
    "at": [
     648,
     513
    ],
    "s": "l"
   },
   "ureter": {
    "n": "Distal ureter",
    "l": "Ureter",
    "t": "Urinary",
    "d": "Runs along pelvic sidewall then beneath uterine artery near cervix.",
    "f": "Delivers urine to bladder.",
    "c": "Identify and protect during hysterectomy.",
    "at": [
     694.4000000000001,
     621
    ],
    "s": "l"
   },
   "pouchant": {
    "n": "Vesico-uterine pouch",
    "l": "Excavatio vesicouterina",
    "t": "Peritoneum",
    "d": "Anterior reflection between bladder and uterus.",
    "f": "Mobile peritoneal recess.",
    "c": "Bladder-flap dissection relates to this plane.",
    "at": [
     792,
     432
    ],
    "s": "l"
   },
   "pouchpost": {
    "n": "Recto-uterine pouch (Douglas)",
    "l": "Excavatio rectouterina",
    "t": "Peritoneum",
    "d": "Posterior peritoneal recess between uterus and rectum.",
    "f": "Lowest intraperitoneal space when upright.",
    "c": "Pelvic fluid may collect here.",
    "at": [
     1032,
     432
    ],
    "s": "r"
   },
   "plexus": {
    "n": "Inferior hypogastric / uterovaginal plexus",
    "l": "Plexus hypogastricus inferior",
    "t": "Nervous",
    "d": "Autonomic fibers around lateral cervix/vagina.",
    "f": "Bladder, rectal and genital organ function.",
    "c": "Nerve-sparing planes reduce postoperative dysfunction.",
    "at": [
     120,
     80
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/gyn-support.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"broad\"><circle cx=\"848\" cy=\"279\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"848\" cy=\"279\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mesomet\"><circle cx=\"680\" cy=\"391.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"680\" cy=\"391.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mesosal\"><circle cx=\"1056\" cy=\"252\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1056\" cy=\"252\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mesovar\"><circle cx=\"1224\" cy=\"310.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1224\" cy=\"310.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"round\"><circle cx=\"712\" cy=\"238.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"712\" cy=\"238.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ovarylig\"><circle cx=\"1216\" cy=\"337.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1216\" cy=\"337.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ipl\"><circle cx=\"1352\" cy=\"292.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1352\" cy=\"292.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cardinal2\"><circle cx=\"688\" cy=\"540\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"688\" cy=\"540\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"uterosac\"><circle cx=\"1056\" cy=\"486\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1056\" cy=\"486\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"pubocerv\"><circle cx=\"744\" cy=\"648\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"744\" cy=\"648\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"rectovag\"><circle cx=\"1040\" cy=\"639\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1040\" cy=\"639\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"levator\"><circle cx=\"776\" cy=\"729\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"776\" cy=\"729\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"artery\"><circle cx=\"648\" cy=\"513\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"648\" cy=\"513\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ureter\"><circle cx=\"694.4000000000001\" cy=\"621\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"694.4000000000001\" cy=\"621\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"pouchant\"><circle cx=\"792\" cy=\"432\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"792\" cy=\"432\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"pouchpost\"><circle cx=\"1032\" cy=\"432\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1032\" cy=\"432\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 848 279 L 1056 486\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "Which vessel crosses superior to the distal ureter near the cervix?",
    "opts": [
     "Ovarian vein",
     "Uterine artery",
     "External iliac artery",
     "Pudendal artery"
    ],
    "a": 1,
    "why": "The uterine artery crosses over the ureter — “water under the bridge.”"
   },
   {
    "q": "The principal apical supports of the uterus include…",
    "opts": [
     "Broad ligament alone",
     "Cardinal and uterosacral ligaments",
     "Round ligaments only",
     "Mesosalpinx only"
    ],
    "a": 1,
    "why": "Cardinal and uterosacral connective tissue complexes are important apical supports."
   },
   {
    "q": "Which structure carries ovarian vessels toward the sidewall?",
    "opts": [
     "Round ligament",
     "Mesosalpinx",
     "Infundibulopelvic ligament",
     "Pubocervical fascia"
    ],
    "a": 2,
    "why": "The ovarian vessels travel in the suspensory/infundibulopelvic ligament."
   }
  ],
  "related": [
   "gynuterus",
   "gynadnexa",
   "gynvagina",
   "femalepelvis",
   "gynvulva"
  ],
  "photo": {
   "file": "gyn-support.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "broad": [
     530,
     310
    ],
    "mesomet": [
     425,
     435
    ],
    "mesosal": [
     660,
     280
    ],
    "mesovar": [
     765,
     345
    ],
    "round": [
     445,
     265
    ],
    "ovarylig": [
     760,
     375
    ],
    "ipl": [
     845,
     325
    ],
    "cardinal2": [
     430,
     600
    ],
    "uterosac": [
     660,
     540
    ],
    "pubocerv": [
     465,
     720
    ],
    "rectovag": [
     650,
     710
    ],
    "levator": [
     485,
     810
    ],
    "artery": [
     405,
     570
    ],
    "ureter": [
     434,
     690
    ],
    "pouchant": [
     495,
     480
    ],
    "pouchpost": [
     645,
     480
    ]
   }
  },
  "study": {
   "lead": "Build a 3-dimensional surgical map: ureter on pelvic sidewall, vessels within ligamentous folds, and levator ani beneath. “Ligament” can mean either a peritoneal fold or load-bearing connective tissue.",
   "cards": [
    [
     "Water under the bridge",
     "At the level of the lateral cervix the ureter passes inferior to the uterine artery. This is a key hysterectomy injury zone."
    ],
    [
     "True vs apparent support",
     "Cardinal + uterosacral complexes and pelvic floor carry much of apical support. Broad ligament is mostly a peritoneal sheet."
    ],
    [
     "Lymphatic highways",
     "Ovary → para-aortic nodes; uterine body → external iliac (fundus can drain para-aortic); cervix → pelvic obturator/internal iliac/sacral; vulva → inguinal."
    ],
    [
     "Compartment language",
     "Anterior: bladder and pubocervical fascia. Middle: cervix, uterus, vagina. Posterior: rectum and rectovaginal septum."
    ]
   ],
   "sources": [
    "https://teachmeanatomy.info/pelvis/female-reproductive-tract/uterus/",
    "https://www.ncbi.nlm.nih.gov/books/NBK538435/",
    "https://teachmeanatomy.info/pelvis/female-reproductive-tract/ligaments/"
   ]
  }
 },
 "maletestis": {
  "title": "Testis & epididymis — microanatomy",
  "latin": "Testis et epididymis",
  "system": "male",
  "region": "Scrotum and spermatic cord",
  "size": "Testis ≈ 4–5 cm; duct loops are microscopic",
  "blood": "Testicular artery from aorta; pampiniform plexus",
  "nerve": "Testicular plexus (visceral); scrotal somatic innervation",
  "blurb": "The sperm-production organ from tunica through seminiferous tubule to rete, efferent ducts and epididymal tail.",
  "summary": "A realistic cut section maps the invisible seminiferous loops, blood–testis barrier and sperm outflow route.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#3f5f9c",
    "Male reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "tunv": {
    "n": "Tunica vaginalis",
    "l": "Tunica vaginalis testis",
    "t": "Layer",
    "d": "Serous covering with visceral and parietal layers.",
    "f": "Allows mobile testis within scrotum.",
    "c": "Fluid accumulation in the cavity forms a hydrocele.",
    "at": [
     552,
     351
    ],
    "s": "l"
   },
   "tuna": {
    "n": "Tunica albuginea",
    "l": "Tunica albuginea testis",
    "t": "Layer",
    "d": "Dense white capsule under tunica vaginalis.",
    "f": "Partitions testis into lobules via septa.",
    "c": "Traumatic rupture may require urgent evaluation.",
    "at": [
     592,
     279
    ],
    "s": "l"
   },
   "mediast": {
    "n": "Mediastinum testis",
    "l": "Mediastinum testis",
    "t": "Gross",
    "d": "Posterior thickening of albuginea containing rete testis.",
    "f": "Organizes lobules and duct outflow.",
    "c": "Important landmark in testicular ultrasound.",
    "at": [
     816,
     387
    ],
    "s": "r"
   },
   "lobules": {
    "n": "Testicular lobules",
    "l": "Lobuli testis",
    "t": "Gross",
    "d": "Septa divide testis into lobules containing seminiferous tubules.",
    "f": "Compartmentalize sperm production.",
    "c": "Germ-cell tumors often distort intratesticular architecture.",
    "at": [
     704,
     477
    ],
    "s": "l"
   },
   "seminif": {
    "n": "Seminiferous tubules",
    "l": "Tubuli seminiferi",
    "t": "Histology",
    "d": "Coiled tubules lined by developing germ cells and Sertoli cells.",
    "f": "Spermatogenesis.",
    "c": "Tubular atrophy reduces fertility.",
    "at": [
     640,
     495
    ],
    "s": "l"
   },
   "sertoli": {
    "n": "Sertoli cells / blood–testis barrier",
    "l": "Cellulae sustentaculares",
    "t": "Histology",
    "d": "Supportive epithelium joined by tight junctions.",
    "f": "Nurse developing germ cells; secrete inhibin B.",
    "c": "Barrier limits immune exposure to postmeiotic germ cells.",
    "at": [
     760,
     306
    ],
    "s": "l"
   },
   "leydig": {
    "n": "Leydig cells",
    "l": "Cellulae interstitiales",
    "t": "Histology",
    "d": "Endocrine cells in interstitium between tubules.",
    "f": "Make testosterone in response to LH.",
    "c": "LH deficiency lowers intratesticular testosterone.",
    "at": [
     896,
     504
    ],
    "s": "r"
   },
   "rete": {
    "n": "Rete testis",
    "l": "Rete testis",
    "t": "Duct",
    "d": "Channels within mediastinum draining straight tubules.",
    "f": "Collect sperm from seminiferous system.",
    "c": "Obstruction can impair outflow.",
    "at": [
     872,
     400.5
    ],
    "s": "r"
   },
   "efferent": {
    "n": "Efferent ductules",
    "l": "Ductuli efferentes",
    "t": "Duct",
    "d": "Small ducts from rete to epididymal head.",
    "f": "Move sperm and resorb much tubular fluid.",
    "c": "May be involved in obstructive infertility.",
    "at": [
     928,
     270
    ],
    "s": "r"
   },
   "epihead": {
    "n": "Epididymal head",
    "l": "Caput epididymidis",
    "t": "Duct",
    "d": "Enlarged superior epididymis receiving efferent ductules.",
    "f": "Starts sperm maturation.",
    "c": "Epididymitis often causes tender swelling.",
    "at": [
     976,
     216
    ],
    "s": "r"
   },
   "epibody": {
    "n": "Epididymal body",
    "l": "Corpus epididymidis",
    "t": "Duct",
    "d": "Long single coiled epididymal duct along posterior testis.",
    "f": "Matures and transports sperm.",
    "c": "Can be palpated separately from testis.",
    "at": [
     1080,
     450
    ],
    "s": "r"
   },
   "epitail": {
    "n": "Epididymal tail",
    "l": "Cauda epididymidis",
    "t": "Duct",
    "d": "Inferior storage region leading into vas deferens.",
    "f": "Stores mature sperm.",
    "c": "Vasectomy interrupts downstream transport.",
    "at": [
     1048,
     666
    ],
    "s": "r"
   },
   "vas2": {
    "n": "Vas deferens",
    "l": "Ductus deferens",
    "t": "Duct",
    "d": "Thick smooth-muscle duct ascending in spermatic cord.",
    "f": "Propels sperm by peristalsis during emission.",
    "c": "Palpable cord structure; vasectomy divides it.",
    "at": [
     1144,
     288
    ],
    "s": "r"
   },
   "pamp": {
    "n": "Pampiniform venous plexus",
    "l": "Plexus pampiniformis",
    "t": "Vascular",
    "d": "Venous network around spermatic cord artery.",
    "f": "Countercurrent heat exchange.",
    "c": "Venous dilation is a varicocele.",
    "at": [
     1104,
     139.5
    ],
    "s": "r"
   },
   "cremast": {
    "n": "Cremaster muscle & fascia",
    "l": "M. cremaster",
    "t": "Muscle",
    "d": "Skeletal muscle fibers accompanying cord and testis.",
    "f": "Raises testis through cremasteric reflex.",
    "c": "Reflex assessment helps localize neurologic problems.",
    "at": [
     120,
     80
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/male-testis-detail.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"tunv\"><circle cx=\"552\" cy=\"351\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"552\" cy=\"351\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"tuna\"><circle cx=\"592\" cy=\"279\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"592\" cy=\"279\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"mediast\"><circle cx=\"816\" cy=\"387\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"816\" cy=\"387\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"lobules\"><circle cx=\"704\" cy=\"477\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"704\" cy=\"477\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"seminif\"><circle cx=\"640\" cy=\"495\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"640\" cy=\"495\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"sertoli\"><circle cx=\"760\" cy=\"306\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"760\" cy=\"306\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"leydig\"><circle cx=\"896\" cy=\"504\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"896\" cy=\"504\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"rete\"><circle cx=\"872\" cy=\"400.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"872\" cy=\"400.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"efferent\"><circle cx=\"928\" cy=\"270\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"928\" cy=\"270\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"epihead\"><circle cx=\"976\" cy=\"216\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"976\" cy=\"216\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"epibody\"><circle cx=\"1080\" cy=\"450\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1080\" cy=\"450\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"epitail\"><circle cx=\"1048\" cy=\"666\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1048\" cy=\"666\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"vas2\"><circle cx=\"1144\" cy=\"288\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1144\" cy=\"288\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"pamp\"><circle cx=\"1104\" cy=\"139.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1104\" cy=\"139.5\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 552 351 L 872 400.5\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "Which cells make testosterone in the testis?",
    "opts": [
     "Sertoli",
     "Leydig",
     "Epididymal",
     "Spermatogonia"
    ],
    "a": 1,
    "why": "Leydig cells lie in the interstitium between seminiferous tubules."
   },
   {
    "q": "Sperm enter the epididymal head through…",
    "opts": [
     "Efferent ductules",
     "Prostatic ducts",
     "Seminal vesicles",
     "Bulbourethral ducts"
    ],
    "a": 0,
    "why": "Rete testis drains through efferent ductules to epididymal head."
   },
   {
    "q": "The serous sac whose fluid may form a hydrocele is…",
    "opts": [
     "Tunica albuginea",
     "Tunica vaginalis",
     "Dartos",
     "Cremasteric fascia"
    ],
    "a": 1,
    "why": "Hydrocele fluid collects between layers of the tunica vaginalis."
   }
  ],
  "related": [
   "male",
   "maleprostate",
   "malepelvis",
   "muscle"
  ],
  "photo": {
   "file": "male-testis-detail.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "tunv": [
     345,
     390
    ],
    "tuna": [
     370,
     310
    ],
    "mediast": [
     510,
     430
    ],
    "lobules": [
     440,
     530
    ],
    "seminif": [
     400,
     550
    ],
    "sertoli": [
     475,
     340
    ],
    "leydig": [
     560,
     560
    ],
    "rete": [
     545,
     445
    ],
    "efferent": [
     580,
     300
    ],
    "epihead": [
     610,
     240
    ],
    "epibody": [
     675,
     500
    ],
    "epitail": [
     655,
     740
    ],
    "vas2": [
     715,
     320
    ],
    "pamp": [
     690,
     155
    ]
   }
  },
  "study": {
   "lead": "Sperm travels a continuous route; draw the outflow pathway and label the histologic cell types before learning pathology.",
   "cards": [
    [
     "Outflow sequence",
     "Seminiferous tubules → straight tubules → rete testis → efferent ductules → epididymal head/body/tail → vas deferens."
    ],
    [
     "Histologic roles",
     "Sertoli: support and barrier; Leydig: testosterone; germ cells: spermatogenic lineage."
    ],
    [
     "Scrotal thermoregulation",
     "Pampiniform plexus provides countercurrent heat exchange; dartos and cremaster adjust scrotal/testicular position."
    ],
    [
     "Blood and lymph",
     "Testicular arteries arise from aorta; venous drainage right → IVC, left → left renal vein; testicular lymph ascends to para-aortic nodes."
    ]
   ],
   "sources": [
    "https://www.ncbi.nlm.nih.gov/books/NBK470450/"
   ]
  }
 },
 "maleprostate": {
  "title": "Prostate, ducts & penis",
  "latin": "Prostata et penis",
  "system": "male",
  "region": "Bladder neck, pelvic floor and perineum",
  "size": "Prostate ≈ 20–30 g in younger adults (variable)",
  "blood": "Inferior vesical / internal pudendal branches",
  "nerve": "Inferior hypogastric plexus + pudendal somatic branches",
  "blurb": "Prostatic zones and the urinary–ejaculatory crossing: urethra, verumontanum, ducts, seminal vesicles and erectile bodies.",
  "summary": "A sagittal regional cut clarifies zones, bladder neck, ejaculatory duct entry and the urethral path through prostate and penis.",
  "vb": [
   1600,
   900
  ],
  "legend": [
   [
    "#3f5f9c",
    "Male reproductive"
   ],
   [
    "#d49b87",
    "Tissue layers"
   ],
   [
    "#f2d9bb",
    "Clinical landmark"
   ]
  ],
  "parts": {
   "blneck": {
    "n": "Bladder neck / internal sphincter",
    "l": "Collum vesicae",
    "t": "Urinary",
    "d": "Smooth-muscle outlet superior to prostate.",
    "f": "Closes during emission to limit retrograde ejaculation.",
    "c": "Bladder-neck dysfunction may affect voiding.",
    "at": [
     760,
     211.5
    ],
    "s": "l"
   },
   "transition": {
    "n": "Prostatic transition zone",
    "l": "Zona transitionis",
    "t": "Gland",
    "d": "Zone surrounding proximal prostatic urethra.",
    "f": "Contains glandular ducts and fibromuscular tissue.",
    "c": "Common origin of benign prostatic enlargement.",
    "at": [
     872,
     333
    ],
    "s": "r"
   },
   "peripheral": {
    "n": "Prostatic peripheral zone",
    "l": "Zona peripherica",
    "t": "Gland",
    "d": "Posterior-lateral zone palpable through rectum.",
    "f": "Produces prostatic secretions.",
    "c": "Most prostatic cancers arise in this zone.",
    "at": [
     976,
     432
    ],
    "s": "r"
   },
   "central": {
    "n": "Prostatic central zone",
    "l": "Zona centralis",
    "t": "Gland",
    "d": "Tissue surrounding ejaculatory ducts.",
    "f": "Secretory prostatic gland region.",
    "c": "Less frequently a primary site of carcinoma.",
    "at": [
     928,
     310.5
    ],
    "s": "r"
   },
   "urethrap": {
    "n": "Prostatic urethra",
    "l": "Pars prostatica urethrae",
    "t": "Duct",
    "d": "Urethra through prostate from bladder neck to membrane.",
    "f": "Conducts urine and semen in separate phases.",
    "c": "Enlarged transition zone may narrow it.",
    "at": [
     824,
     405
    ],
    "s": "r"
   },
   "veru": {
    "n": "Seminal colliculus (verumontanum)",
    "l": "Colliculus seminalis",
    "t": "Duct",
    "d": "Ridge in posterior prostatic urethra with duct openings.",
    "f": "Landmark for ejaculatory duct openings.",
    "c": "A key transurethral surgical landmark.",
    "at": [
     832,
     441
    ],
    "s": "r"
   },
   "ejac2": {
    "n": "Ejaculatory ducts",
    "l": "Ductus ejaculatorii",
    "t": "Duct",
    "d": "Union of vas ampulla and seminal vesicle duct traverses prostate.",
    "f": "Deliver sperm and vesicle secretion to urethra.",
    "c": "Obstruction can cause low ejaculate volume.",
    "at": [
     976,
     351
    ],
    "s": "r"
   },
   "semves": {
    "n": "Seminal vesicles",
    "l": "Glandulae vesiculosae",
    "t": "Gland",
    "d": "Paired folded glands posterior to bladder.",
    "f": "Contribute fructose-rich alkaline semen fluid.",
    "c": "Do not store sperm; they produce fluid.",
    "at": [
     1168,
     252
    ],
    "s": "r"
   },
   "bulbo": {
    "n": "Bulbourethral glands",
    "l": "Glandulae bulbourethrales",
    "t": "Gland",
    "d": "Small paired glands posterolateral to membranous urethra.",
    "f": "Secrete mucus into proximal spongy urethra.",
    "c": "Ducts open into bulbar urethra.",
    "at": [
     992,
     562.5
    ],
    "s": "r"
   },
   "extsph": {
    "n": "External urethral sphincter",
    "l": "M. sphincter urethrae externus",
    "t": "Muscle",
    "d": "Striated sphincter around membranous urethra.",
    "f": "Voluntary urinary continence.",
    "c": "May be affected during prostate surgery.",
    "at": [
     872,
     558
    ],
    "s": "r"
   },
   "rectrelation": {
    "n": "Rectal relation",
    "l": "Rectum",
    "t": "Relation",
    "d": "Rectum lies posterior to prostate.",
    "f": "Allows posterior prostate palpation by rectal examination.",
    "c": "Rectal wall is an anatomic boundary in pelvic surgery.",
    "at": [
     1336,
     378
    ],
    "s": "r"
   },
   "cavern": {
    "n": "Corpora cavernosa",
    "l": "Corpora cavernosa penis",
    "t": "Erectile",
    "d": "Paired dorsal erectile cylinders.",
    "f": "Engorge with blood during erection.",
    "c": "Cavernosal smooth muscle is autonomically regulated.",
    "at": [
     488,
     648
    ],
    "s": "l"
   },
   "spongios": {
    "n": "Corpus spongiosum",
    "l": "Corpus spongiosum penis",
    "t": "Erectile",
    "d": "Ventral erectile tissue around spongy urethra.",
    "f": "Keeps urethra patent during erection.",
    "c": "Ends in the glans distally.",
    "at": [
     408,
     706.5
    ],
    "s": "l"
   },
   "spongureth": {
    "n": "Spongy urethra",
    "l": "Pars spongiosa urethrae",
    "t": "Duct",
    "d": "Urethra within corpus spongiosum.",
    "f": "Conduit for urine and ejaculate.",
    "c": "Urethral injury depends on pelvic trauma pattern.",
    "at": [
     504,
     679.5
    ],
    "s": "l"
   },
   "pudend": {
    "n": "Pudendal nerve & perineal branches",
    "l": "N. pudendus",
    "t": "Nervous",
    "d": "Somatic S2–S4 branches supply perineal skin and sphincters.",
    "f": "Voluntary motor control and genital sensation.",
    "c": "Distinguish from autonomic cavernous nerves.",
    "at": [
     120,
     80
    ],
    "s": "l"
   }
  },
  "art": "<rect width=\"1600\" height=\"900\" fill=\"#0d1717\"/><image href=\"img/male-prostate-detail.jpg\" x=\"0\" y=\"0\" width=\"1600\" height=\"900\" preserveAspectRatio=\"none\" opacity=\".48\"/><rect width=\"1600\" height=\"900\" fill=\"#10312e\" opacity=\".13\"/><g class=\"part throb\" data-id=\"blneck\"><circle cx=\"760\" cy=\"211.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"760\" cy=\"211.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"transition\"><circle cx=\"872\" cy=\"333\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"872\" cy=\"333\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"peripheral\"><circle cx=\"976\" cy=\"432\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"976\" cy=\"432\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"central\"><circle cx=\"928\" cy=\"310.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"928\" cy=\"310.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"urethrap\"><circle cx=\"824\" cy=\"405\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"824\" cy=\"405\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"veru\"><circle cx=\"832\" cy=\"441\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"832\" cy=\"441\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"ejac2\"><circle cx=\"976\" cy=\"351\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"976\" cy=\"351\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"semves\"><circle cx=\"1168\" cy=\"252\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1168\" cy=\"252\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"bulbo\"><circle cx=\"992\" cy=\"562.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"992\" cy=\"562.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"extsph\"><circle cx=\"872\" cy=\"558\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"872\" cy=\"558\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"rectrelation\"><circle cx=\"1336\" cy=\"378\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"1336\" cy=\"378\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"cavern\"><circle cx=\"488\" cy=\"648\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"488\" cy=\"648\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"spongios\"><circle cx=\"408\" cy=\"706.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"408\" cy=\"706.5\" r=\"8\" fill=\"#ffd5b9\"/></g><g class=\"part throb\" data-id=\"spongureth\"><circle cx=\"504\" cy=\"679.5\" r=\"32\" fill=\"#ad6475\" fill-opacity=\".35\" stroke=\"#f3e4d8\" stroke-width=\"3\"/><circle cx=\"504\" cy=\"679.5\" r=\"8\" fill=\"#ffd5b9\"/></g>",
  "anims": [
   {
    "id": "pulse",
    "label": "Layer pulse",
    "cls": "throb"
   },
   {
    "id": "flow",
    "label": "Trace pathway",
    "layer": "<g class=\"flow-layer\"><circle r=\"8\" fill=\"#f7d7ac\"><animateMotion dur=\"4s\" repeatCount=\"indefinite\" path=\"M 760 211.5 L 1168 252\"/></circle></g>"
   }
  ],
  "quiz": [
   {
    "q": "BPH typically develops in the prostatic…",
    "opts": [
     "Peripheral zone",
     "Transition zone",
     "Central zone",
     "Rectal wall"
    ],
    "a": 1,
    "why": "BPH usually develops in the transition zone around the urethra."
   },
   {
    "q": "The ejaculatory duct forms where which structures join?",
    "opts": [
     "Vas deferens and seminal vesicle duct",
     "Two seminal vesicles",
     "Ureter and vas",
     "Bulbourethral and prostate ducts"
    ],
    "a": 0,
    "why": "The ampulla of vas joins the seminal vesicle duct before traversing prostate."
   },
   {
    "q": "The erectile body surrounding the spongy urethra is…",
    "opts": [
     "Corpus cavernosum",
     "Corpus spongiosum",
     "Tunica vaginalis",
     "Dartos"
    ],
    "a": 1,
    "why": "The corpus spongiosum contains the penile urethra."
   }
  ],
  "related": [
   "male",
   "maletestis",
   "malepelvis",
   "bladder"
  ],
  "photo": {
   "file": "male-prostate-detail.jpg",
   "credit": "Realistic educational medical render — Corpus atlas; not a clinical photograph",
   "hot": {
    "blneck": [
     475,
     235
    ],
    "transition": [
     545,
     370
    ],
    "peripheral": [
     610,
     480
    ],
    "central": [
     580,
     345
    ],
    "urethrap": [
     515,
     450
    ],
    "veru": [
     520,
     490
    ],
    "ejac2": [
     610,
     390
    ],
    "semves": [
     730,
     280
    ],
    "bulbo": [
     620,
     625
    ],
    "extsph": [
     545,
     620
    ],
    "rectrelation": [
     835,
     420
    ],
    "cavern": [
     305,
     720
    ],
    "spongios": [
     255,
     785
    ],
    "spongureth": [
     315,
     755
    ]
   }
  },
  "study": {
   "lead": "Anatomy separates voiding, ejaculation and erection. Trace the urethra and ducts, then distinguish transition from peripheral prostatic zones.",
   "cards": [
    [
     "Prostate zones",
     "Transition zone wraps proximal urethra and commonly enlarges in BPH; peripheral zone is posterior-lateral and commonly involved by carcinoma."
    ],
    [
     "Fluid route",
     "Vas ampulla + seminal vesicle duct → ejaculatory duct → prostatic urethra at seminal colliculus → membranous → spongy urethra."
    ],
    [
     "Autonomic vs somatic",
     "Cavernosal erection relies on pelvic autonomic pathways; pudendal nerve supplies perineal sensation and external sphincter skeletal muscle."
    ],
    [
     "Relations",
     "Bladder above; rectum behind; pelvic floor below; seminal vesicles posterosuperior to prostate."
    ]
   ],
   "sources": [
    "https://www.ncbi.nlm.nih.gov/books/NBK538530/"
   ]
  }
 }
};

const PLANNED = [];

const BODYMAP = {
 "vb": [
  420,
  760
 ],
 "anterior": [
  {
   "id": "brain",
   "x": 210,
   "y": 52,
   "r": 26
  },
  {
   "id": "thyroid",
   "x": 210,
   "y": 116,
   "r": 15
  },
  {
   "id": "lungs",
   "x": 176,
   "y": 196,
   "r": 30
  },
  {
   "id": "lungs",
   "x": 244,
   "y": 196,
   "r": 30,
   "key": "lungs2"
  },
  {
   "id": "heart",
   "x": 222,
   "y": 214,
   "r": 24
  },
  {
   "id": "liver",
   "x": 176,
   "y": 282,
   "r": 30
  },
  {
   "id": "gut",
   "x": 246,
   "y": 272,
   "r": 24,
   "key": "stomach"
  },
  {
   "id": "spleen",
   "x": 262,
   "y": 268,
   "r": 14
  },
  {
   "id": "pancreas",
   "x": 222,
   "y": 300,
   "r": 16
  },
  {
   "id": "kidney",
   "x": 182,
   "y": 318,
   "r": 18
  },
  {
   "id": "kidney",
   "x": 240,
   "y": 318,
   "r": 18,
   "key": "kidney2"
  },
  {
   "id": "gut",
   "x": 210,
   "y": 352,
   "r": 34,
   "key": "bowel"
  },
  {
   "id": "bladder",
   "x": 210,
   "y": 412,
   "r": 20
  },
  {
   "id": "male",
   "x": 210,
   "y": 452,
   "r": 16,
   "key": "male"
  },
  {
   "id": "skin",
   "x": 140,
   "y": 250,
   "r": 16
  },
  {
   "id": "eye",
   "x": 196,
   "y": 48,
   "r": 8
  },
  {
   "id": "ear",
   "x": 238,
   "y": 64,
   "r": 9
  }
 ],
 "posterior": [
  {
   "id": "brain",
   "x": 210,
   "y": 56,
   "r": 28
  },
  {
   "id": "spinalcord",
   "x": 210,
   "y": 180,
   "r": 16
  },
  {
   "id": "spinalcord",
   "x": 210,
   "y": 260,
   "r": 14,
   "key": "sc2"
  },
  {
   "id": "lungs",
   "x": 176,
   "y": 190,
   "r": 28
  },
  {
   "id": "lungs",
   "x": 244,
   "y": 190,
   "r": 28,
   "key": "lungs2"
  },
  {
   "id": "kidney",
   "x": 182,
   "y": 308,
   "r": 20
  },
  {
   "id": "kidney",
   "x": 240,
   "y": 308,
   "r": 20,
   "key": "kidney2"
  },
  {
   "id": "skin",
   "x": 150,
   "y": 360,
   "r": 18
  },
  {
   "id": "ear",
   "x": 246,
   "y": 70,
   "r": 10
  }
 ]
};
