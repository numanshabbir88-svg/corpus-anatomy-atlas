#!/usr/bin/env python3
"""Recheck and clean the 370 curated FAQ answers in the Atlas source chapters.

The rule-based pass removes appended source-field material only at sentence
boundaries. Explicit corrections below handle known question/answer mismatches,
fragments, overly long replies, and the mirrored male/female overview FAQs.
"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ROOT / 'seo' / 'chapters'
KNOWLEDGE = ROOT / 'bot-knowledge.json'

# The female overview previously repeated the male page's brain, lung, and liver
# FAQs verbatim. Replace those three with distinct, female-map-relevant questions.
QUESTION_REWRITES: dict[tuple[str, str], tuple[str, str]] = {
    ('spleen', 'What is the function of the hilum?'): (
        'What structures pass through the splenic hilum?',
        'The splenic artery and vein, lymphatics and nerves pass through the hilum; the pancreatic tail lies nearby.',
    ),
    ('gyncervix', 'What is the function of the squamocolumnar junction?'): (
        'What is the squamocolumnar junction, and how does it change?',
        'It is the boundary between glandular columnar and squamous epithelia; its position shifts with age, hormones and pregnancy.',
    ),
    ('marrow', 'Where are blood cells made in adults?'): (
        'What does red bone marrow produce?',
        'Red bone marrow produces red blood cells, most white blood cells and platelets from hematopoietic stem and progenitor cells.',
    ),
    ('liver', 'How do hepatic lobules and sinusoids handle blood and bile flow?'): (
        'How does bile flow through a hepatic lobule?',
        'Bile produced by hepatocytes flows through canaliculi toward bile ductules in portal tracts, opposite to blood flow toward central veins.',
    ),
    ('hepaticlobule', 'Does bile flow in the same direction as blood in a liver lobule?'): (
        'What are hepatic sinusoids?',
        'Hepatic sinusoids are fenestrated channels between hepatocyte plates that allow plasma exchange with hepatocytes; Kupffer cells line their luminal surface.',
    ),
    ('facialnerve', 'What does the facial nerve control?'): (
        'Which non-motor functions does the facial nerve carry?',
        'The facial nerve carries taste from the anterior two-thirds of the tongue and parasympathetic fibers to lacrimal, submandibular and sublingual glands.',
    ),
    ('male', 'How is sperm produced and transported?'): (
        'What route do sperm take from the testes to the urethra?',
        'Sperm pass from seminiferous tubules through straight tubules into the rete testis, then via efferent ductules to the epididymis, vas deferens, ejaculatory ducts and urethra.',
    ),
    ('male', 'What is the testis & seminiferous tubules?'): (
        'How is each testis organized?',
        'Each testis is divided by septa into about 250–300 lobules containing coiled seminiferous tubules; a dense fibrous tunica albuginea surrounds the organ.',
    ),
    ('maletestis', 'Where are sperm made in the testis?'): (
        'What is the interstitial tissue of the testis?',
        'Interstitial tissue lies between seminiferous tubules and contains Leydig cells, which produce testosterone. Sertoli cells instead support developing germ cells within the tubules.',
    ),
    ('female', 'Where does fertilization usually occur?'): (
        'What role does the uterus play in reproduction?',
        'The uterus receives a blastocyst for implantation and supports development during pregnancy; its functional endometrium is shed during menstruation if pregnancy does not occur.',
    ),
    ('eye', 'What is the function of the macula & fovea?'): (
        'Where are the macula and fovea located?',
        'The macula is the central region of the retina; the fovea lies at its center, temporal to the optic disc.',
    ),
    ('nervous', 'What is the brain?'): (
        'How does the brain connect to the spinal cord?',
        'The medulla continues through the foramen magnum into the spinal cord; together, the brain and spinal cord form the central nervous system.',
    ),
    ('larynx', 'What is the function of the epiglottis?'): (
        'Where is the epiglottis located?',
        'The epiglottis is an elastic-cartilage flap at the laryngeal inlet, behind the tongue base and attached to the thyroid cartilage by a ligament.',
    ),
    ('clitoralcomplex', 'What is the function of the left corpus cavernosum?'): (
        'What do the clitoral corpora cavernosa do?',
        'The paired corpora cavernosa fill with blood and provide rigidity and expansion of the clitoral body during arousal.',
    ),
    ('malebody', 'What does the liver do in the male body?'): (
        'Where is the liver shown on the male body map?',
        'The whole-body view marks the liver as a major upper-abdominal organ but does not show lobes, vessels or segmental anatomy; see the liver chapter for those details.',
    ),
    ('malebody', 'Where is the liver shown on the male body map?'): (
        'What liver details are shown on the male body map?',
        'The whole-body view marks the liver as a major upper-abdominal organ but does not show lobes, vessels or segmental anatomy; see the liver chapter for those details.',
    ),
    ('brainstemdeep', 'What does the cerebellum do?'): (
        'How is the cerebellum related to the brainstem?',
        'The cerebellum lies posterior to the pons and medulla and connects to the brainstem through three paired peduncles: superior to midbrain, middle to pons and inferior to medulla.',
    ),
    ('cerebraldeep', 'Where is the layer II · external granular located?'): (
        'Where is cortical layer II located?',
        'Layer II, the external granular layer, lies just beneath the molecular layer of the cerebral cortex and contains small granule and pyramidal cells.',
    ),
    ('brachialplexus', 'Which spinal nerves form the brachial plexus?'): (
        'Which spinal nerve roots usually contribute to the brachial plexus?',
        'The brachial plexus usually receives fibers from the ventral rami of C5 through T1, though anatomical variants can extend to C4 or T2.',
    ),
    ('brachialplexus', 'What is the C5–T1 ventral rami?'): (
        'What do the C5–T1 ventral rami contribute to the brachial plexus?',
        'The C5–T1 ventral rami form its roots and carry mixed sensory and motor fibers; dorsal rami do not join the plexus and supply intrinsic back muscles and overlying skin.',
    ),
    ('endocrine', 'Where in the neck is the thyroid gland located?'): (
        'Which structures lie posterior to the thyroid gland?',
        'The parathyroid glands usually lie on the posterior thyroid surface; the recurrent laryngeal nerves ascend nearby in the tracheoesophageal grooves.',
    ),
    ('maleprostate', 'What is the bladder neck / internal sphincter?'): (
        'What are the bladder neck and internal urethral sphincter?',
        'The bladder neck is a smooth-muscle outlet at the base of the bladder; its internal urethral sphincter helps regulate passage into the urethra.',
    ),
    ('larynx', 'What is the nasal cavity & conchae?'): (
        'What are the nasal cavity and nasal conchae?',
        'The nasal cavity is divided by a septum and contains three conchae on each side that increase surface area and create airflow turbulence.',
    ),
    ('skullface', 'Which nerve moves the facial-expression muscles around the skull?'): (
        'Where does the facial nerve exit the skull?',
        'The facial nerve leaves the temporal bone through the stylomastoid foramen and then branches within the parotid region.',
    ),
    ('lymph', 'What is the cervical nodes?'): (
        'Where are the cervical lymph nodes located?',
        'Cervical lymph nodes are arranged in chains along the internal jugular vessels and through the posterior neck.',
    ),
    ('lymph', 'Where is the inguinal nodes located?'): (
        'Where are the inguinal lymph nodes located?',
        'Inguinal lymph nodes form superficial horizontal and vertical groups in the groin.',
    ),
    ('breast', 'Where is the lactiferous ducts located?'): (
        'Where are the lactiferous ducts located?',
        'Lactiferous ducts pass through the breast from glandular lobules toward openings at the nipple.',
    ),
    ('thyroid', 'Where is the trachea & larynx located?'): (
        'Where are the larynx and trachea located?',
        'The larynx lies above the trachea in the neck; the trachea descends from the larynx through the neck into the thorax.',
    ),
    ('kidney', "Where is the glomerulus & Bowman's capsule located?"): (
        'Where is the renal corpuscle (glomerulus and Bowman’s capsule) located?',
        'The renal corpuscle—glomerulus enclosed by Bowman’s capsule—is located in the kidney cortex.',
    ),
    ('gynuterus', 'What is the fundus?'): (
        'What is the uterine fundus?',
        'The uterine fundus is the rounded upper part of the uterus above the openings of the uterine tubes.',
    ),
    ('liver', 'What is the function of the hepatic lobule & sinusoids?'): (
        'How do hepatic lobules and sinusoids handle blood and bile flow?',
        'In a hepatic lobule, blood flows from portal tracts through sinusoids toward a central vein, while bile flows toward the portal tracts.',
    ),
    ('marrow', 'What is the red marrow?'): (
        'What is red bone marrow?',
        'Red bone marrow is blood-forming tissue within spongy bone, especially in adult vertebrae, pelvis and sternum.',
    ),
    ('breast', 'What are the lobules (glandular)?'): (
        'What are the glandular lobules of the breast?',
        'Glandular breast lobules contain milk-producing units connected to ducts that carry secretions toward the nipple.',
    ),
    ('malebody', 'Does a male body map show every deep structure?'): (
        'Which male structures need a deeper view than the body map?',
        'The prostate, seminal vesicles, pelvic nerves and microscopic tissue layers require dedicated regional views; a whole-body plate is for orientation.',
    ),
    ('femalebody', 'Does a female body map show every deep structure?'): (
        'Which female structures need a deeper pelvic or breast view?',
        'Ovaries, uterine tubes, cervix, pelvic supports and breast-tissue layers require dedicated regional chapters beyond the whole-body orientation view.',
    ),
    ('femalebody', 'Where is the brain shown on the female body map?'): (
        'Where are the ovaries located on the female body map?',
        'The ovaries lie on either side of the uterus in the lateral pelvis; the uterine tubes extend from the uterus toward them.',
    ),
    ('femalebody', 'Where are the lungs in the female body map?'): (
        'Where is the uterus located on the female body map?',
        'The uterus lies in the midline of the pelvis, posterior to the bladder and anterior to the rectum.',
    ),
    ('femalebody', 'What does the liver do in the female body?'): (
        'Where is breast tissue located on the female body map?',
        'The breasts lie on the anterior chest wall over the pectoral fascia; mammary tissue is within them, with ducts converging toward the nipple.',
    ),
    ('spleen', 'What is the capsule & trabeculae?'): (
        'What are the splenic capsule and trabeculae?',
        'The spleen’s fibroelastic capsule sends trabeculae into the pulp; these trabeculae carry blood vessels.',
    ),
    ('malepelvis', 'Where is the prostatic & membranous urethra located?'): (
        'Where are the prostatic and membranous urethral segments?',
        'The prostatic urethra passes through the prostate; the membranous urethra continues through the pelvic floor and perineal membrane.',
    ),
    ('femalepelvis', 'What is the function of the vesico- & recto-uterine pouches?'): (
        'What do the vesicouterine and rectouterine pouches do?',
        'These peritoneal recesses accommodate movement of pelvic organs and can collect free fluid.',
    ),
    ('thyroid', 'What is the function of the follicle & colloid?'): (
        'What do thyroid follicles and colloid do?',
        'Thyroid follicles synthesize and store thyroid hormone in colloid; thyroid-stimulating hormone promotes iodine uptake and hormone production and release.',
    ),
    ('autonomic', 'Where is the coeliac ganglion & plexus located?'): (
        'Where are the coeliac plexus and ganglia located?',
        'The coeliac plexus and ganglia surround the origin of the coeliac trunk, anterior to the aorta near the T12–L1 level.',
    ),
    ('larynx', 'Where is the nasopharynx & adenoid located?'): (
        'Where are the nasopharynx and adenoid located?',
        'The nasopharynx lies behind the nasal cavity and above the soft palate; the adenoid is in its roof and posterior wall.',
    ),
    ('female', 'What is the fundus & body?'): (
        'How are the uterine fundus and body distinguished?',
        'The uterine fundus is the domed top above the tubal openings; the body is the main muscular portion below it.',
    ),
    ('skin', 'Where is the dermis (papillary & reticular) located?'): (
        'Where are the papillary and reticular dermis layers?',
        'The dermis lies beneath the epidermis and above the hypodermis; its papillary layer is superficial and its reticular layer is deeper.',
    ),
    ('pancreas', 'What is the function of the acinar cells & ductules?'): (
        'How do pancreatic acinar cells and ductules work together?',
        'Pancreatic acinar cells secrete digestive enzyme precursors into ductules, which carry them toward the duodenum.',
    ),
    ('ear', 'What is the function of the vestibule (utricle & saccule)?'): (
        'What do the utricle and saccule do?',
        'The utricle and saccule sense linear acceleration and head tilt relative to gravity.',
    ),
    ('gynuterus', 'What is the function of the endometrium — functionalis?'): (
        'What does the uterine endometrial functionalis do?',
        'The endometrial functionalis proliferates under estrogen, becomes secretory under progesterone, and is shed during menstruation.',
    ),
    ('skin', 'What is the function of the hair shaft & follicle?'): (
        'What roles do the hair shaft and follicle have?',
        'Hair shafts provide protection and sensation; hair follicles anchor and produce the hair.',
    ),
    ('marrow', 'What is the function of the endosteum & osteoblasts?'): (
        'How do osteoblasts and the endosteum contribute to bone remodeling?',
        'Osteoblasts build bone and osteoclasts resorb it; the endosteum lines internal bone surfaces where remodeling occurs.',
    ),
    ('nephron', 'What is the bowman capsule?'): (
        'What is Bowman’s capsule?',
        'Bowman’s capsule has a parietal squamous layer and a visceral podocyte layer enclosing Bowman’s space.',
    ),
}

# Sentence-level, anatomy-specific corrections. These are based on the Atlas
# chapter records and are deliberately concise; no new image or outside-source
# material is introduced here.
ANSWER_OVERRIDES: dict[tuple[str, str], str] = {
    ('malebody', 'Where are the main organs in the male body?'):
        'The brain is in the skull; heart and lungs are in the chest; liver, stomach, intestines and kidneys are in the abdomen; and the bladder, prostate, seminal vesicles and rectum are in the pelvis. The testes and penis are external genital structures.',
    ('femalebody', 'Where are the main organs in the female body?'):
        'The brain is in the skull; heart and lungs are in the chest; digestive and urinary organs are in the abdomen; and the uterus, uterine tubes, ovaries and vagina are in the pelvis. The breasts lie on the anterior chest wall.',
    ('endocrine', 'What is the function of the adrenal glands?'):
        'The adrenal cortex releases cortisol for stress metabolism and aldosterone for sodium, potassium and blood-pressure regulation; the medulla releases epinephrine and norepinephrine for rapid sympathetic responses.',
    ('maleprostate', 'What are the main anatomical zones of the prostate?'):
        'The transition zone surrounds the proximal urethra, the central zone surrounds the ejaculatory ducts, and the peripheral zone forms much of the posterior gland.',
    ('brain', 'What is the frontal lobe?'):
        'The frontal lobe lies anterior to the central sulcus and above the lateral sulcus. It includes the primary motor cortex and prefrontal cortex; Broca’s area is usually in the left frontal lobe.',
    ('kidney', 'What is the renal cortex?'):
        'The renal cortex is the kidney’s outer region. It contains renal corpuscles and most proximal and distal convoluted tubules, and extends between medullary pyramids as renal columns.',
    ('liver', 'What is the gallbladder?'):
        'The gallbladder is a pear-shaped sac on the liver’s visceral surface; it stores and concentrates bile by absorbing water and electrolytes.',
    ('female', 'Where is the cervix located?'):
        'The cervix is the lower part of the uterus that projects into the vagina. Its canal is lined by mucus-secreting columnar epithelium, while the ectocervix is covered by stratified squamous epithelium.',
    ('female', 'What role does the uterus play in reproduction?'):
        'The uterus provides a site for blastocyst implantation and supports embryo and fetal development; the myometrium contracts during labor.',
    ('nervousfemale', 'Does the full-body female nerve plate identify tiny pelvic branches?'):
        'No. The plate shows major pathways, not fine pelvic branches. The pudendal nerve is a paired somatic nerve from S2–S4 that passes through the pudendal canal to the perineum.',
    ('malebody', 'Does a male body map show every deep structure?'):
        'No. It is an orientation view; deeper layers and small structures require dedicated chapters. The prostate, seminal vesicles and pelvic nerves are not resolved on one whole-body plate.',
    ('femalebody', 'Does a female body map show every deep structure?'):
        'No. It is an orientation view; deeper pelvic supports, breast-tissue layers and small nerves require dedicated regional chapters.',
    ('malebody', 'Where is the brain shown on the male body map?'):
        'The male body map shows the brain in the head, enclosed by the skull.',
    ('malebody', 'Where are the lungs in the male body map?'):
        'The male body map shows the lungs in the chest on either side of the heart.',
    ('malebody', 'What does the liver do in the male body?'):
        'The liver processes nutrients, produces bile and plasma proteins, stores glycogen, and metabolizes many drugs and other substances; these functions are the same regardless of sex.',
    ('lymph', 'What is the cervical nodes?'):
        'Cervical lymph nodes are arranged in chains along the internal jugular vessels and through the posterior neck.',
    ('gut', 'Where is the body of stomach located?'):
        'The body is the large central region of the stomach between the fundus and pyloric part; the stomach lies mainly in the upper abdomen, left of midline.',
    ('brain', 'Where is the thalamus located?'):
        'The thalamus is a pair of gray-matter masses on either side of the third ventricle, within the diencephalon.',
    ('kidney', "Where is the glomerulus & Bowman's capsule located?"):
        'The renal corpuscle—glomerulus enclosed by Bowman’s capsule—is located in the kidney cortex.',
    ('liver', 'Where is the hepatic portal vein located?'):
        'The hepatic portal vein forms behind the neck of the pancreas and enters the liver at the porta hepatis.',
    ('eye', 'Where is the retina located?'):
        'The retina lines the inner back wall of the eye, between the vitreous body and the retinal pigment epithelium, choroid and sclera.',
    ('ear', 'Where is the stapes located?'):
        'The stapes is a middle-ear ossicle; its footplate sits in the oval window.',
    ('spleen', 'Where is the white pulp located?'):
        'White pulp is within the spleen, surrounding central arterioles as periarteriolar lymphoid sheaths and follicles.',
    ('thyroid', 'Where is the trachea & larynx located?'):
        'The larynx lies above the trachea in the neck; the trachea descends from the larynx through the neck into the thorax.',
    ('bladder', 'Where is the urothelium located?'):
        'Urothelium lines the renal calyces and pelvis, ureters, urinary bladder and proximal urethra.',
    ('skin', 'Where is the dermis (papillary & reticular) located?'):
        'The dermis lies beneath the epidermis and above the hypodermis; its papillary layer is superficial and its reticular layer is deeper.',
    ('spinalcord', 'Where is the lateral horn located?'):
        'The lateral horn is in the spinal gray matter, most distinctly at thoracic and upper lumbar levels (classically T1–L2).',
    ('male', 'Where is the vas deferens located?'):
        'The vas deferens runs from the tail of the epididymis through the inguinal canal into the pelvis, where it joins the duct of the seminal vesicle.',
    ('pancreas', 'Where is the main pancreatic duct located?'):
        'The main pancreatic duct runs from the tail toward the head of the pancreas and usually joins the common bile duct at the hepatopancreatic ampulla.',
    ('marrow', 'Where is the trabecular (spongy) bone located?'):
        'Trabecular bone lies inside many bones, especially at the ends of long bones and within flat bones; its struts align with mechanical stresses.',
    ('malepelvis', 'Where is the urinary bladder in the male pelvis?'):
        'In the male pelvis, the bladder lies superior to the prostate; the prostatic urethra begins at the bladder neck.',
    ('femalepelvis', 'Where is the urinary bladder in the female pelvis?'):
        'In the female pelvis, the bladder lies anterior to the vagina and uterus.',
    ('malepelvis', 'Where is the prostatic & membranous urethra located?'):
        'The prostatic urethra passes through the prostate; the membranous urethra continues through the pelvic floor and perineal membrane.',
    ('gynuterus', 'Where are the uterine cornua located?'):
        'The uterine cornua are the upper lateral corners of the uterus where the uterine tubes enter.',
    ('gynuterus', 'What is the fundus?'):
        'The uterine fundus is the rounded upper part of the uterus above the openings of the uterine tubes.',
    ('gyncervix', 'Where is the endocervical columnar epithelium located?'):
        'Simple columnar epithelium lines the endocervical canal and secretes mucus.',
    ('gynadnexa', 'Where are the primordial follicles located?'):
        'Primordial follicles lie in the ovarian cortex and contain an oocyte surrounded by a single layer of flattened follicular cells.',
    ('gynvagina', 'Where is the posterior vaginal wall located?'):
        'The posterior vaginal wall faces the rectum; the vagina is longer posteriorly near the posterior fornix.',
    ('gynsupport', 'Where is the mesosalpinx located?'):
        'The mesosalpinx is the part of the broad ligament associated with and supporting the uterine tube.',
    ('maletestis', 'Where is the mediastinum testis located?'):
        'The mediastinum testis is a posterior thickening of the tunica albuginea that contains the rete testis.',
    ('clitoralcomplex', 'What is the clitoral glans?'):
        'The clitoral glans is the highly innervated distal part of the clitoris, often partly covered by the hood; it is distinct from the internal corpora cavernosa.',
    ('clitoralcomplex', 'Where is the clitoral body located?'):
        'The clitoral body lies in the midline, deep to the glans, and is formed mainly by the paired corpora cavernosa.',
    ('penileerectile', 'What are the paired corpora cavernosa?'):
        'The paired corpora cavernosa are dorsal erectile cylinders that unite along the shaft and separate proximally as the crura.',
    ('penileerectile', 'What does the tunica albuginea do in erectile tissue?'):
        'It resists outward expansion of the corpora cavernosa, helping compress subtunical veins and maintain intracavernosal pressure during erection.',
    ('penileerectile', 'Where is the tunica albuginea located?'):
        'The tunica albuginea is the dense fibrous sheath surrounding the erectile corpora cavernosa.',
    ('skinlayers', 'Where is the stratum granulosum located?'):
        'The stratum granulosum lies between the stratum spinosum and stratum corneum in the epidermis.',
    ('facialnerve', 'Where is the internal acoustic meatus located?'):
        'The internal acoustic meatus is a canal in the petrous temporal bone that transmits cranial nerves VII and VIII and the labyrinthine vessels.',
    ('trigeminalnerve', 'Where is the ophthalmic V1 located?'):
        'The ophthalmic division (V1) passes through the superior orbital fissure into the orbit, where it divides into frontal, lacrimal and nasociliary branches.',
    ('eyeanatomy', 'Where is the corneal stroma located?'):
        'The corneal stroma lies between Bowman’s layer anteriorly and Descemet’s membrane posteriorly; it forms most of the corneal thickness.',
    ('nephron', 'Where are the podocyte foot processes located?'):
        'Podocyte foot processes cover the outer surface of glomerular capillaries and form filtration slits facing Bowman’s space.',
    ('brachialplexus', 'Where is the upper trunk located?'):
        'The upper trunk of the brachial plexus forms in the neck from the union of the C5 and C6 ventral rami.',
    ('cerebraldeep', 'Where is the layer II · external granular located?'):
        'Layer II, the external granular layer, lies just beneath the molecular layer of the cerebral cortex and contains small granule and pyramidal cells.',
    ('meningescsf', 'Where is the falx cerebri located?'):
        'The falx cerebri is a vertical fold of dura mater between the cerebral hemispheres.',
    ('brainstemdeep', 'Where is the inferior colliculus located?'):
        'The inferior colliculus is in the dorsal caudal midbrain and forms part of the auditory pathway.',
    ('hepaticlobule', 'Where is the interlobular bile duct located?'):
        'Interlobular bile ducts lie in portal tracts alongside branches of the hepatic artery and portal vein.',
    ('intestinalwall', 'Where is the enterocyte located?'):
        'Enterocytes line the intestinal villi and crypts, with apical microvilli facing the intestinal lumen.',
    ('bodyregions', 'Where are the kidneys in relation to the peritoneum?'):
        'The kidneys are retroperitoneal, lying posterior to the parietal peritoneum and on either side of the vertebral column.',
    ('spermanatomy', 'What are the three main structural parts of a human sperm cell and what does each part do?'):
        'A sperm cell has a head (haploid nucleus and acrosome), a midpiece (mitochondria) and a tail (flagellum) that propels it.',
    ('spermanatomy', 'Where are sperm cells produced in the male body, and how long does spermatogenesis take?'):
        'Spermatogenesis occurs in the seminiferous tubules of the testes and takes roughly 64–74 days; sperm then mature further in the epididymis.',
    ('spermanatomy', 'How does spermiogenesis differ from meiosis during sperm development?'):
        'Meiosis reduces the chromosome number from 46 to 23; spermiogenesis then remodels the nondividing spermatids into sperm cells, forming the acrosome, midpiece and flagellum.',
    ('spermanatomy', 'Why are sperm leaving the seminiferous tubules not yet ready to fertilize an oocyte?'):
        'New sperm leaving seminiferous tubules are usually immotile and not fully capable of fertilization. They mature in the epididymis and gain fertilizing capacity after capacitation in the female reproductive tract.',
    ('spermanatomy', 'What is the difference between sperm capacitation and the acrosome reaction?'):
        'Capacitation involves membrane and signaling changes that prepare sperm for fertilization and hyperactivated motility. The acrosome reaction is exocytosis from the sperm head that helps it cross the zona pellucida.',
    ('liver', 'What is the function of the hepatic lobule & sinusoids?'):
        'In a hepatic lobule, blood flows from portal tracts through sinusoids toward a central vein, while bile flows toward the portal tracts.',
    ('dentition', 'Do adults always have 32 teeth and do primary teeth have premolars?'):
        'The full permanent dentition usually has 32 teeth, including third molars, but some adults have fewer because third molars may be absent or removed. Primary dentition has 20 teeth and no premolars.',
    ('tissuefoundations', 'What makes epithelial tissue different from connective tissue?'):
        'Epithelia form closely packed sheets with little extracellular space and usually lack blood vessels. Connective-tissue cells are more dispersed in an extracellular matrix.',
    ('marrow', 'What is the red marrow?'):
        'Red bone marrow is blood-forming tissue within spongy bone, especially in adult vertebrae, pelvis and sternum.',
    ('breast', 'What are the lobules (glandular)?'):
        'Glandular breast lobules contain milk-producing units connected to ducts that carry secretions toward the nipple.',
    ('lymph', 'What is the function of the thymus?'):
        'The thymus supports T-lymphocyte maturation, especially during childhood; it lies behind the sternum.',
    ('vascular', 'What is the difference between arteries and veins?'):
        'Arteries carry blood away from the heart; veins return it. This describes direction of flow, not oxygen content—pulmonary arteries carry less-oxygenated blood.',
    ('endocrine', 'How do endocrine glands differ from exocrine glands?'):
        'Endocrine glands release hormones into the blood; exocrine glands send products through ducts to a surface or lumen.',
    ('larynx', 'What is the path of air through the upper airway?'):
        'Air passes from the nose or mouth through the pharynx and larynx, then down the trachea toward the bronchi.',
    ('marrow', 'What is the difference between red and yellow bone marrow?'):
        'Red marrow produces blood cells; yellow marrow contains more fat. Their distribution changes with age and varies by skeletal site.',
    ('cranialnerves', 'Which cranial nerve controls facial expression?'):
        'The facial nerve (cranial nerve VII) supplies most muscles of facial expression.',
    ('endocrine', 'Where in the neck is the thyroid gland located?'):
        'The thyroid lies in the lower anterior neck, just below the larynx, with its lobes beside the upper trachea and isthmus crossing in front.',
    ('vascular', 'Where is the subclavian artery located?'):
        'The subclavian artery passes beneath the clavicle and continues as the axillary artery at the lateral border of the first rib.',
    ('shoulder', 'What is the supraspinatus tendon?'):
        'The supraspinatus tendon attaches the supraspinatus muscle to the greater tubercle of the humerus and passes beneath the acromion.',
    ('shoulder', 'Where is the teres minor tendon located?'):
        'The teres minor tendon inserts on the inferior facet of the greater tubercle, below the infraspinatus tendon.',
    ('joints', 'Where is the posterior cruciate ligament located?'):
        'The posterior cruciate ligament runs from the medial femoral condyle to the posterior intercondylar area of the tibia.',
    ('larynx', 'Where is the nasopharynx & adenoid located?'):
        'The nasopharynx lies behind the nasal cavity and above the soft palate; the adenoid is in its roof and posterior wall.',
    ('maleprostate', 'Where is the prostatic peripheral zone located?'):
        'The peripheral zone occupies the posterior and posterolateral parts of the prostate and can be examined through the rectal wall.',
    ('femalepelvis', 'Where is the vagina located?'):
        'The vagina is a muscular canal extending from the cervix to the vestibule.',
    ('gynvagina', 'Where are the vaginal fornices?'):
        'The vaginal fornices are recesses around the cervix at the upper end of the vagina; the posterior fornix lies behind the cervix.',
    ('breast', 'Where is the lactiferous ducts located?'):
        'Lactiferous ducts pass through the breast from glandular lobules toward openings at the nipple.',
    ('cranialnerves', 'Where does the oculomotor nerve (CN III) originate?'):
        'The oculomotor nerve emerges from the ventral midbrain at the interpeduncular fossa; its motor nuclei lie in the midbrain.',
    ('nervous', 'Where is the brainstem located?'):
        'The brainstem—midbrain, pons and medulla—lies between the diencephalon and spinal cord.',
    ('autonomic', 'Where is the coeliac ganglion & plexus located?'):
        'The coeliac plexus and ganglia surround the origin of the coeliac trunk, anterior to the aorta near the T12–L1 level.',
    ('lymph', 'Where is the inguinal nodes located?'):
        'Inguinal lymph nodes form superficial horizontal and vertical groups in the groin.',
    ('clitoralcomplex', 'Where are the clitoral crura located?'):
        'The paired clitoral crura extend along the ischiopubic rami beneath the superficial vulvar tissues.',
    ('retina', 'Where are rods and cones located in the retina?'):
        'Rods and cones are photoreceptors in the outer neural retina, adjacent to the retinal pigment epithelium.',
    ('retina', 'Where is the retinal pigment epithelium located?'):
        'The retinal pigment epithelium is a pigmented cell layer between the photoreceptors and Bruch’s membrane.',
    ('nephron', 'Where does filtration occur in the kidney?'):
        'Filtration occurs across glomerular capillaries into Bowman’s space in renal corpuscles, mainly in the kidney cortex.',
    ('lungs', 'Where does air go after the bronchi?'):
        'Air passes from the bronchi into bronchioles and then through the respiratory zone to the alveoli, where gas exchange occurs.',
    ('marrow', 'Where are blood cells made in adults?'):
        'Most adult blood-cell production occurs in red marrow of the axial skeleton and proximal ends of selected long bones.',
    ('spinalcord', 'Where does the spinal cord end in adults?'):
        'In most adults, the spinal cord ends as the conus medullaris near the L1–L2 vertebral level; nerve roots continue below as the cauda equina.',
    ('lymph', 'Where does lymph drain back into the blood?'):
        'The major lymphatic ducts empty near the junctions of the internal jugular and subclavian veins; the thoracic duct drains most of the body.',
    ('pancreas', 'Where is the head of the pancreas?'):
        'The pancreatic head sits within the C-shaped curve of the duodenum; the uncinate process extends behind the superior mesenteric vessels.',
    ('pancreas', 'Where is the pancreas located?'):
        'The pancreas lies behind the stomach across the upper abdomen, with its head near the duodenum and tail toward the spleen.',
    ('maleprostate', 'What is the bladder neck / internal sphincter?'):
        'The bladder neck is a smooth-muscle outlet at the base of the bladder; its internal urethral sphincter helps regulate passage into the urethra.',
    ('endocrine', 'What is the pituitary gland?'):
        'The pituitary is an endocrine gland in the sella turcica that releases hormones regulating other glands and body functions.',
    ('larynx', 'What is the nasal cavity & conchae?'):
        'The nasal cavity is divided by a septum and contains three conchae on each side that increase surface area and create airflow turbulence.',
    ('gyncervix', 'What is the ectocervix?'):
        'The ectocervix is the portion of the cervix that projects into the vagina and is visible during a speculum examination.',
    ('retina', 'What are the photoreceptor segments?'):
        'Rod and cone photoreceptors have inner and outer segments; their outer segments lie next to the retinal pigment epithelium.',
    ('cranialnerves', 'What is the olfactory nerve (CN I)?'):
        'The olfactory nerve consists of sensory axons from the nasal olfactory epithelium that pass through the cribriform plate to the olfactory bulb.',
    ('autonomic', 'What is the sympathetic trunk?'):
        'The sympathetic trunks are paired chains of ganglia that run alongside the vertebral column from the neck to the sacrum.',
    ('maletestis', 'What is the tunica vaginalis?'):
        'The tunica vaginalis is a double-layered serous sac covering the testis, with visceral and parietal layers.',
    ('meningescsf', 'What is the periosteal cranial dura?'):
        'The periosteal layer of cranial dura is the outer dural layer adherent to the inner surface of the skull.',
    ('gynadnexa', 'What is the ovarian cortex?'):
        'The ovarian cortex is the outer region of the ovary containing follicles at different stages of development.',
    ('eyeanatomy', 'What is the corneal epithelium?'):
        'The corneal epithelium is the nonkeratinized stratified cell layer covering the front of the cornea.',
    ('eye', 'What is the cornea?'):
        'The cornea is a transparent, avascular, five-layered dome at the front of the eye that provides most of the eye’s refractive power.',
    ('cerebraldeep', 'What is the cortical gray matter?'):
        'Cortical gray matter is the neuronal cell-body layer folded into gyri and sulci on the cerebral surface.',
    ('joints', 'What is the anterior cruciate ligament?'):
        'The anterior cruciate ligament runs from the lateral femoral condyle to the anterior intercondylar area of the tibia.',
    ('nervous', 'What is the brain?'):
        'The brain comprises the cerebrum, cerebellum and brainstem within the cranial vault.',
    ('vascular', 'What is the aortic arch?'):
        'The aortic arch is the curved part of the aorta that gives rise to the brachiocephalic trunk and the left common carotid and left subclavian arteries.',
    ('kidney', 'What is the function of the loop of Henle?'):
        'The loop of Henle builds the medullary osmotic gradient that helps concentrate urine through countercurrent multiplication.',
    ('gut', 'What is the function of the rugae?'):
        'Gastric rugae allow the stomach to expand and help channel chyme toward the pylorus.',
    ('eye', 'What is the function of the macula & fovea?'):
        'The macula supports high-acuity central vision; the fovea provides the sharpest vision for reading and faces.',
    ('ear', 'What is the function of the vestibule (utricle & saccule)?'):
        'The utricle and saccule sense linear acceleration and head tilt relative to gravity.',
    ('pancreas', 'What is the function of the acinar cells & ductules?'):
        'Pancreatic acinar cells secrete digestive enzyme precursors into ductules, which carry them toward the duodenum.',
    ('bladder', 'What is the function of the trigone?'):
        'The bladder trigone helps direct urine toward the internal urethral opening; its stretch receptors contribute to the micturition reflex.',
    ('skin', 'What is the function of the hair shaft & follicle?'):
        'Hair shafts provide protection and sensation; hair follicles anchor and produce the hair.',
    ('spinalcord', 'What is the function of the white funiculi & tracts?'):
        'Spinal white-matter tracts carry sensory information upward and motor commands downward between the body and brain.',
    ('male', 'What is the function of the prostate?'):
        'The prostate adds citrate, zinc and prostate-specific antigen to seminal fluid; PSA helps liquefy semen after ejaculation.',
    ('female', 'What is the function of the uterine tube?'):
        'Uterine tubes capture the oocyte and transport the early embryo toward the uterus through ciliary action and smooth-muscle contractions.',
    ('nervous', 'What is the function of the cervical plexus?'):
        'The cervical plexus supplies neck muscles and skin; its C3–C5 contributions form the phrenic nerve to the diaphragm.',
    ('cranialnerves', 'What does the trigeminal nerve (CN V) do?'):
        'The trigeminal nerve provides most facial sensation and motor supply to muscles of mastication through its three divisions: V1, V2 and V3.',
    ('autonomic', 'What is the function of the inferior mesenteric ganglion?'):
        'The inferior mesenteric ganglion relays sympathetic signals to the hindgut and contributes to pelvic visceral pathways.',
    ('breast', 'What is the function of the axillary lymph nodes?'):
        'Axillary lymph nodes filter lymph from the upper limb and much of the breast.',
    ('vascular', 'What is the function of the descending aorta?'):
        'The descending aorta supplies the thorax and abdomen through branches to the body wall and visceral organs.',
    ('joints', 'What is the function of the menisci (medial & lateral)?'):
        'The medial and lateral menisci distribute load, absorb shock and help reduce friction in the knee joint.',
    ('shoulder', 'What is the function of the glenoid labrum?'):
        'The glenoid labrum is a fibrocartilage rim that deepens the shoulder socket and helps stabilize the humeral head.',
    ('larynx', 'What is the function of the epiglottis?'):
        'During swallowing, the epiglottis helps shield the laryngeal inlet from food and liquid.',
    ('marrow', 'What is the function of the endosteum & osteoblasts?'):
        'Osteoblasts build bone and osteoclasts resorb it; the endosteum lines internal bone surfaces where remodeling occurs.',
    ('malepelvis', 'What is the function of the rectum?'):
        'The rectum temporarily stores feces before defecation and empties into the anal canal.',
    ('femalepelvis', 'What is the function of the vesico- & recto-uterine pouches?'):
        'These peritoneal recesses accommodate movement of pelvic organs and can collect free fluid.',
    ('gynuterus', 'What is the function of the endometrium — functionalis?'):
        'The endometrial functionalis proliferates under estrogen, becomes secretory under progesterone, and is shed during menstruation.',
    ('gynadnexa', 'What is the function of the dominant antral follicle?'):
        'After the luteinizing hormone surge, the dominant antral follicle releases a secondary oocyte at ovulation.',
    ('gynvagina', 'What is the function of the vaginal muscularis?'):
        'The vaginal muscularis allows the vaginal wall to distend and recoil.',
    ('gynsupport', 'What is the function of the round ligament?'):
        'The round ligament helps maintain uterine anteversion but is not the principal support of the uterus.',
    ('maletestis', 'Where are sperm made in the testis?'):
        'Sperm develop in seminiferous tubules, where Sertoli cells support developing germ cells. Leydig cells between the tubules produce testosterone. The rete testis receives sperm from straight tubules.',
    ('maletestis', 'What is the function of the seminiferous tubules?'):
        'Seminiferous tubules are the site of sperm production, where developing germ cells are supported by Sertoli cells.',
    ('maleprostate', 'What is the function of the prostatic urethra?'):
        'The prostatic urethra conducts urine during voiding and semen during ejaculation through the prostate.',
    ('clitoralcomplex', 'What is the function of the left corpus cavernosum?'):
        'The paired corpora cavernosa fill with blood and provide rigidity and expansion of the clitoral body during arousal.',
    ('penileerectile', 'What is the function of the deep penile arteries?'):
        'The deep penile arteries supply blood to the corpora cavernosa.',
    ('skinlayers', 'What is the function of the stratum corneum?'):
        'The stratum corneum forms the epidermis’s outer permeability barrier and helps limit water loss.',
    ('facialnerve', 'What is the function of the greater petrosal nerve?'):
        'The greater petrosal nerve carries preganglionic parasympathetic fibers toward the pterygopalatine ganglion, supporting lacrimal and nasal/palatal gland secretion.',
    ('trigeminalnerve', 'What is the function of the nasociliary nerve?'):
        'The nasociliary nerve carries corneal sensation through the long ciliary nerves and also gives off ethmoidal and infratrochlear branches.',
    ('eyeanatomy', 'What is the function of the corneal endothelium?'):
        'The corneal endothelium pumps fluid from the stroma to help maintain corneal transparency.',
    ('retina', 'What is the function of the fovea centralis?'):
        'The fovea centralis provides the highest spatial acuity, with densely packed cones and displaced inner retinal layers.',
    ('nephron', 'What is the function of the collecting duct?'):
        'The collecting duct adjusts water reabsorption in response to antidiuretic hormone and contributes to acid–base regulation.',
    ('brachialplexus', 'What is the function of the lower trunk?'):
        'The lower trunk carries C8–T1 fibers into the brachial plexus pathways that supply the hand.',
    ('cerebraldeep', 'What is the function of the layer IV · internal granular?'):
        'Layer IV of the cerebral cortex receives major thalamocortical input, especially in primary sensory areas.',
    ('meningescsf', 'What is the function of the superior sagittal sinus?'):
        'The superior sagittal sinus receives superficial cerebral veins and cerebrospinal fluid from arachnoid granulations.',
    ('brainstemdeep', 'What is the function of the cerebral peduncles?'):
        'Cerebral peduncles carry descending corticospinal, corticobulbar and corticopontine fibers through the ventral midbrain.',
    ('hepaticlobule', 'What is the function of the central vein?'):
        'The central vein collects sinusoidal blood from a hepatic lobule and drains toward hepatic veins.',
    ('intestinalwall', 'What is the function of the goblet cell?'):
        'Goblet cells secrete mucus that lubricates and helps protect the intestinal mucosa.',
    ('gynvagina', 'What is the vaginal lumen?'):
        'The vaginal lumen is a potential space; its anterior and posterior walls normally lie against one another.',
    ('trigeminalnerve', 'What is the trigeminal sensory root?'):
        'The trigeminal sensory root is a large bundle of sensory fibers that emerges from the lateral pons and enters the trigeminal cistern.',
    ('thyroid', 'What is the isthmus?'):
        'The thyroid isthmus is the narrow bridge crossing the second to fourth tracheal rings and joining the two lobes.',
    ('skinlayers', 'What is the stratum basale?'):
        'The stratum basale is the deep, single-cell layer of proliferative keratinocytes adjoining the basement membrane.',
    ('brainstemdeep', 'What is the midbrain?'):
        'The midbrain is the rostral part of the brainstem around the cerebral aqueduct, between the diencephalon and pons.',
    ('nephron', 'What is the bowman capsule?'):
        'Bowman’s capsule has a parietal squamous layer and a visceral podocyte layer enclosing Bowman’s space.',
    ('gynsupport', 'What is the broad ligament?'):
        'The broad ligament is a double layer of peritoneum draped over the uterus, uterine tubes and associated structures.',
    ('spleen', 'What is the capsule & trabeculae?'):
        'The spleen’s fibroelastic capsule sends trabeculae into the pulp; these trabeculae carry blood vessels.',
    ('hepaticlobule', 'What is the portal venule?'):
        'A portal venule is a small branch of the portal vein that delivers nutrient-rich blood to hepatic sinusoids.',
    ('hepaticlobule', 'What are hepatic sinusoids?'):
        'Hepatic sinusoids are fenestrated channels between hepatocyte plates that allow plasma exchange with hepatocytes; Kupffer cells line their luminal surface.',
    ('facialnerve', 'What is the facial motor nucleus?'):
        'The facial motor nucleus is a group of pontine motor neurons whose axons loop around the abducens nucleus before exiting the brainstem.',
    ('gut', 'What is the oesophagus?'):
        'The oesophagus is a muscular tube about 25 cm long that carries food from the pharynx to the stomach through the diaphragm at T10.',
    ('intestinalwall', 'What is the villus?'):
        'A villus is a finger-like projection of small-intestinal mucosa covered by epithelium and containing a lamina propria core.',
    ('bladder', 'What is the detrusor muscle?'):
        'The detrusor is the interlacing smooth muscle of the bladder wall; it contracts to expel urine.',
    ('brachialplexus', 'What is the C5–T1 ventral rami?'):
        'The C5–T1 ventral rami are anterior branches of the fifth cervical through first thoracic spinal nerves; together they form the brachial plexus.',
    ('spinalcord', 'What is the posterior (dorsal) horn?'):
        'The posterior horn is the dorsal gray-matter region of the spinal cord that receives and processes sensory afferents.',
    ('ear', 'What is the tympanic membrane?'):
        'The tympanic membrane is a thin, cone-shaped partition between the external ear canal and middle ear; the umbo is its inward-pointing center.',
    ('skin', 'What is the stratum corneum?'):
        'The stratum corneum is the outer epidermal layer, formed by flattened dead keratinocytes held together by intercellular lipids.',
    ('female', 'What is the fundus & body?'):
        'The uterine fundus is the domed top above the tubal openings; the body is the main muscular portion below it.',
    ('femalepelvis', 'Which organs are located in the female pelvis?'):
        'The female pelvis contains the bladder, uterus, cervix, vagina and rectum; the ovaries and uterine tubes lie laterally.',
    ('skeleton', 'Where is blood cell production found in adult bones?'):
        'In adults, red marrow is found mainly in axial bones and the proximal ends of selected long bones.',
    ('breast', 'What are the glandular lobules of the breast?'):
        'Glandular lobules are clusters of milk-secreting alveoli within the breast.',
    ('facialnerve', 'Does the facial nerve provide most facial skin sensation?'):
        'No. Most facial skin sensation travels through branches of the trigeminal nerve (CN V).',
    ('femalepelvis', 'What supports the uterus and pelvic organs?'):
        'The levator ani and coccygeus form the pelvic diaphragm, supporting pelvic viscera and helping maintain continence; connective-tissue attachments also stabilize the uterus.',
    ('hepaticlobule', 'How does blood flow through a hepatic lobule?'):
        'Branches of the portal vein and hepatic artery deliver blood to sinusoids near portal tracts; blood then drains toward the central vein.',
    ('bladder', 'What is the trigone of the bladder?'):
        'The trigone is a smooth triangular area on the bladder floor bounded by the two ureteric openings and the internal urethral opening.',
    ('eye', 'What is the difference between the retina and the optic nerve?'):
        'The retina is the light-sensitive neural tissue lining the back of the eye; axons from its ganglion cells converge to form the optic nerve.',
    ('gynvulva', 'What do the labia minora do?'):
        'The labia minora are inner folds bordering the vestibule and joining near the clitoral hood; their size, color and asymmetry vary normally.',
    ('cleavageblastocyst', 'How is a morula different from a blastocyst?'):
        'A morula is a compact solid cluster of cells; a blastocyst has a fluid-filled cavity, an outer trophoblast and an inner cell mass.',
    ('implantation', 'What is the difference between cytotrophoblast and syncytiotrophoblast?'):
        'Cytotrophoblast is the inner cellular, proliferative layer; syncytiotrophoblast is the outer multinucleated layer that invades the endometrium.',
    ('embryodevelopment', 'What does the embryonic neural tube form?'):
        'The embryonic neural tube develops into the brain and spinal cord after the neural plate folds and closes.',
    ('laborsecondstage', 'What does the labor-stage-two picture actually show?'):
        'The digital cutaway shows a head-down fetus descending through the birth canal after full cervical dilation, before delivery. It is an educational model, not a patient image or measurement.',
    ('fetaldevelopment', 'Can these fetal images date a pregnancy or confirm fetal health?'):
        'No. They are educational illustrations, not prenatal scans; they cannot date a pregnancy, measure growth or assess fetal health.',
    ('gynadnexa', 'Which part of the fallopian tube is the usual site of fertilization?'):
        'The ampulla, a wider segment of the uterine tube, is the most common site of fertilization.',
    ('gynsupport', 'What is the difference between the broad ligament and pelvic support ligaments?'):
        'The broad ligament is a peritoneal fold; the cardinal and uterosacral ligaments and pelvic-floor muscles provide more substantial support to the uterus.',
    ('lungs', 'Is the enlarged alveolar image an actual microscope slide?'):
        'No. It is a digital educational illustration showing the relationship of alveolar lining cells to the air space, not a microscope slide or literal magnification.',
    ('pulmonaryacinus', 'Is the Type I cell image a histology photograph?'):
        'No. It is a digital teaching illustration of an alveolar cell, not a tissue specimen or clinical slide.',
    ('laborthirdstage', 'What do the three placenta-related images in this chapter show?'):
        'The three digital illustrations show a partly separating placenta after birth, an attached placenta during pregnancy, and a microscopic chorionic villus. They are teaching models, not patient photographs.',
    ('heart', 'What route does blood take through the heart?'):
        'Body blood enters the right atrium, passes through the right ventricle to the lungs, returns to the left atrium, then moves through the left ventricle into the aorta.',
    ('dentition', 'Which nerves carry sensation from upper and lower teeth?'):
        'Upper teeth receive sensation mainly through superior alveolar branches of CN V2; lower teeth receive it through the inferior alveolar branch of CN V3.',
    ('skullface', 'Which facial bones are easiest to identify from the front?'):
        'From the front, the maxillae form the upper jaw, zygomatic bones the cheeks, nasal bones the bridge, and the mandible the lower jaw.',
    ('dentition', 'Can one molar cutaway show the exact canal and root shape of every tooth?'):
        'No. Root, canal and cusp anatomy vary by tooth class and individual. This is a representative teaching model, not a patient scan or a rendering of every tooth.',
    ('nervousfemale', 'Is the female nervous system built differently from the male nervous system?'):
        'The central nervous system has the same basic organization; the female-focused pelvic view highlights branches serving the uterus, vagina, clitoris and vulva.',
    ('bodyregions', 'What are the dorsal and ventral body cavities?'):
        'The dorsal cavity includes cranial and vertebral spaces for the brain and spinal cord. The ventral cavity includes thoracic and abdominopelvic spaces, separated by the diaphragm.',
    ('bodyregions', 'What are the four abdominal quadrants?'):
        'Two intersecting planes through the umbilicus divide the abdomen into right upper, left upper, right lower and left lower quadrants. They are surface guides, not exact organ boundaries.',
    ('bodyregions', 'How do the nine abdominal regions differ from quadrants?'):
        'The nine-region system divides the abdomen into upper, middle and lower rows: right hypochondriac, epigastric, left hypochondriac; right lumbar, umbilical, left lumbar; and right iliac, hypogastric, left iliac. Quadrants give four broader areas.',
    ('brain', 'What is the function of the cerebellum?'):
        'The cerebellum coordinates movement, balance, posture and motor learning by comparing intended movement with sensory feedback.',
    ('kidney', 'How does urine travel from the kidney to the bladder?'):
        'Filtrate passes through nephron tubules and collecting ducts into the calyces and renal pelvis; a ureter then carries urine to the bladder.',
    ('nervousmale', 'Is the male nervous system built differently from the female nervous system?'):
        'The basic brain, spinal-cord and peripheral-nerve plan is shared. The male-focused pelvic view shows branches serving the prostate, penis and scrotum; it does not imply a separate male nervous system.',
    ('oocyteanatomy', 'What is the first polar body?'):
        'The first polar body is a small cell produced by unequal division during oocyte meiosis I; it may lie in the perivitelline space and is not a second egg.',
    ('skullface', 'How many facial bones are in an adult human skull?'):
        'An adult skull has 14 facial bones: six paired groups (maxillae, zygomatic, nasal, lacrimal, palatine and inferior nasal conchae) plus the mandible and vomer.',
    ('thyroid', 'What is the function of the follicle & colloid?'):
        'Thyroid follicles synthesize and store thyroid hormone in colloid; thyroid-stimulating hormone promotes iodine uptake and hormone production and release.',
}

MARKERS = re.compile(
    r'\b(?:Structurally|Physiologically|Functionally|Clinically|Anatomically),'
    r'|\bMedical evaluation\b|\bFrom a diagnostic standpoint\b|\bIn clinical pathology\b',
    re.IGNORECASE,
)


def normalize(value: object) -> str:
    ascii_value = unicodedata.normalize('NFKD', str(value or '')).encode('ascii', 'ignore').decode('ascii')
    return ' '.join(re.findall(r'[a-z0-9]+', ascii_value.lower()))


def tokens_with_positions(value: str) -> list[tuple[str, int]]:
    return [(normalize(match.group()), match.start()) for match in re.finditer(r"[^\W_]+", value, re.UNICODE) if normalize(match.group())]


def sentence_start(value: str, position: int) -> int:
    ends = [value.rfind(mark, 0, position) for mark in '.?!']
    end = max(ends)
    return 0 if end < 0 else end + 1


def cut_boundary(value: str, position: int) -> int:
    start = sentence_start(value, position)
    return start if start > 0 else 0


def source_fields(knowledge: dict) -> list[tuple[list[str], list[str]]]:
    result: list[tuple[list[str], list[str]]] = []
    for part in knowledge.get('parts', []):
        name_tokens = normalize(part.get('n')).split()
        if not name_tokens:
            continue
        for field in ('d', 'f', 'c'):
            fact_tokens = normalize(part.get(field)).split()
            if len(fact_tokens) >= 7:
                result.append((fact_tokens, name_tokens))
    return result


def clean_with_source_facts(question: str, answer: str, fields: list[tuple[list[str], list[str]]]) -> str:
    answer = re.sub(r'\s+', ' ', answer).strip()
    answer_tokens = tokens_with_positions(answer)
    normalized_answer = [token for token, _ in answer_tokens]
    query_tokens = set(normalize(question).split())
    cuts: list[int] = []

    # Remove a later sentence when it exactly repeats another structure's source
    # field. Matching is token-based, and the cut is always at a sentence boundary.
    for fact_tokens, topic_tokens in fields:
        if topic_tokens and sum(token in query_tokens for token in topic_tokens) / len(topic_tokens) >= 0.8:
            continue
        span = len(fact_tokens)
        for index in range(1, len(normalized_answer) - span + 1):
            if normalized_answer[index:index + span] == fact_tokens:
                start = cut_boundary(answer, answer_tokens[index][1])
                if start > 0:
                    cuts.append(start)
                break

    # Also remove the first appended editorial/source marker, but retain a marker
    # that begins the answer itself (it can be the answer's actual lead-in).
    marker_matches = list(MARKERS.finditer(answer))
    internal_markers = [match for match in marker_matches if match.start() > 0]
    if marker_matches and marker_matches[0].start() == 0:
        internal_markers = marker_matches[1:]
    if internal_markers:
        start = cut_boundary(answer, internal_markers[0].start())
        if start > 0:
            cuts.append(start)

    if cuts:
        answer = answer[:min(cuts)].strip()
    return answer


def update_chapter(path: Path, fields: list[tuple[list[str], list[str]]]) -> tuple[int, int, list[tuple[str, str]]]:
    data = json.loads(path.read_text(encoding='utf-8'))
    chapter_key = path.stem
    changed_records = 0
    manual_changes = 0
    reviewed: list[tuple[str, str]] = []
    questions = data.get('questions', [])
    for item in questions:
        old_question = item.get('question', '')
        old_answer = item.get('answer', '')
        new_question = old_question
        answer = old_answer
        rewrite_applied = False
        visited_questions: set[str] = set()
        while (chapter_key, new_question) in QUESTION_REWRITES:
            if new_question in visited_questions:
                raise SystemExit(f'Question rewrite cycle in {chapter_key}: {new_question}')
            visited_questions.add(new_question)
            new_question, answer = QUESTION_REWRITES[(chapter_key, new_question)]
            rewrite_applied = True
        if rewrite_applied:
            item['question'] = new_question
            item['answer'] = answer
            if new_question != old_question or answer != old_answer:
                changed_records += 1
                manual_changes += 1
        else:
            override = ANSWER_OVERRIDES.get((chapter_key, old_question))
            if override is not None:
                answer = override
                if answer != old_answer:
                    changed_records += 1
                    manual_changes += 1
            else:
                answer = clean_with_source_facts(old_question, old_answer, fields)
                if answer != old_answer:
                    changed_records += 1
            item['answer'] = answer
        reviewed.append((item.get('question', ''), item.get('answer', '')))

    data['questions'] = questions
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return changed_records, manual_changes, reviewed


def main() -> None:
    knowledge = json.loads(KNOWLEDGE.read_text(encoding='utf-8'))
    fields = source_fields(knowledge)
    total = changed = manual_changes = 0
    all_rows: list[tuple[str, str, str]] = []
    duplicate_questions: dict[str, list[tuple[str, str]]] = {}
    for path in sorted(CHAPTERS.glob('*.json')):
        count, manual, rows = update_chapter(path, fields)
        total += len(rows)
        changed += count
        manual_changes += manual
        for question, answer in rows:
            all_rows.append((path.stem, question, answer))
            duplicate_questions.setdefault(normalize(question), []).append((path.stem, question))
    duplicate_question_groups = [items for items in duplicate_questions.values() if len(items) > 1]
    answer_groups: dict[str, list[tuple[str, str]]] = {}
    for chapter, question, answer in all_rows:
        answer_groups.setdefault(normalize(answer), []).append((chapter, question))
    duplicate_answer_groups = [items for items in answer_groups.values() if len(items) > 1]
    long_answers = [(chapter, question, len(answer)) for chapter, question, answer in all_rows if len(answer) > 300]
    empty_answers = [(chapter, question) for chapter, question, answer in all_rows if not answer]
    if total != 370:
        raise SystemExit(f'Expected 370 FAQ records, found {total}')
    if duplicate_question_groups:
        raise SystemExit(f'Duplicate FAQ questions after cleanup: {duplicate_question_groups[:5]}')
    if duplicate_answer_groups:
        raise SystemExit(f'Duplicate FAQ answers after cleanup: {duplicate_answer_groups[:5]}')
    if long_answers:
        raise SystemExit(f'FAQ answers still exceed 300 characters: {long_answers}')
    if empty_answers:
        raise SystemExit(f'FAQ answers are empty: {empty_answers}')
    print(f'Rechecked {total} FAQ records: {changed} records changed this run ({manual_changes} by explicit correction/rewrite rules); normalized questions and answers are unique, and all answers are non-empty and <=300 characters.')
    print('Question/answer fit and anatomical authenticity remain subject to qualified human review; this script is a conservative source-consistency pass.')


if __name__ == '__main__':
    main()
