/* ---------------------------------------------------------------------------
   Corpus · extra structure pointers (2026-10)
   Adds the thin leader line + part-name label to parts that previously had no
   pointer on their chapter plate. Coordinates use the same 0–1000 space as
   ORGANS[].photo.hot, so every new entry renders exactly like the existing
   pins (dot on the structure, hairline leader, label beside the plate).

   Placement rules used here:
   · a part is only added when that structure is actually visible on the plate;
   · tissues and cell-scale rows keep their microscope cutaway (micro-lens.js);
   · abstract rows (timing, phases, tooth numbers, single-cell features) stay as
     study notes instead of receiving a false pointer.
   --------------------------------------------------------------------------- */
(function(){
  const PINS={
    heart:{
      svc:[120,155], ivc:[140,700], la:[690,255], pv:[770,290],
      aortic:[545,372], sa:[140,235]
    },
    brain:{
      frontal:[800,240], parietal:[700,170], occipital:[420,300], temporal:[500,380],
      pituitary:[540,520], fourth:[500,690]
    },
    nervousmale:{
      'detail_nervousmale_pelvicsplanchnic':[530,555],
      'detail_nervousmale_inferiorhypogastric':[498,592],
      'detail_nervousmale_hypogastric':[512,568],
      'detail_nervousmale_pudendal':[492,638],
      'detail_nervousmale_prostaticplexus':[500,615],
      'detail_nervousmale_cavernousnerves':[494,628],
      'detail_nervousmale_dorsalpenis':[496,650],
      'detail_nervousmale_perinealmale':[482,652]
    },
    nervousfemale:{
      'detail_nervousfemale_pelvicsplanchnic':[530,555],
      'detail_nervousfemale_inferiorhypogastric':[498,592],
      'detail_nervousfemale_hypogastric':[512,568],
      'detail_nervousfemale_pudendal':[492,638],
      'detail_nervousfemale_uterovaginal':[503,605],
      'detail_nervousfemale_dorsalclitoris':[496,650],
      'detail_nervousfemale_posteriorlabial':[482,652],
      'detail_nervousfemale_vaginalplexus':[510,618]
    },
    autonomic:{
      'detail_autonomic_0':[516,232], 'detail_autonomic_1':[516,276],
      'detail_autonomic_2':[512,372], 'detail_autonomic_3':[510,470],
      'detail_autonomic_4':[506,590]
    },
    spleen:{ sinusoid:[600,520] },
    liver:{ hepvein:[570,300] },
    gut:{ rugae:[540,190] },
    pancreas:{ accessory:[700,510] },
    thyroid:{ pyramidal:[520,430] },
    bladder:{ sphincter:[500,800] },
    gynuterus:{ spiral:[560,300], arcuate:[600,300] },
    gyncervix:{ mucus:[510,500] },
    gynvagina:{ lymphv:[520,700] },
    gynsupport:{ plexus:[470,650] },
    maletestis:{ cremast:[400,700] },
    maleprostate:{ pudend:[560,690] },

    clitoralcomplex:{
      clitoralglans:[500,300], clitoralprepuce:[520,320], rightcorpuscavernosum:[430,380],
      leftcorpuscavernosum:[570,380], tunicaalbuginea:[450,400], ischiocavernosus:[300,430],
      suspensoryligament:[500,360], cavernousautonomicfibers:[430,450],
      dorsalclitoralartery:[380,430], venousdrainage:[480,480]
    },
    penileerectile:{
      cavernosaltrabeculae:[260,430], deeppenilearteries:[230,400], helicinearteries:[250,450],
      subtunicalvenules:[200,470], dorsalarteries:[340,290], dorsalnerves:[360,270],
      cavernousnerves:[430,330], dartosfascia:[420,350], glanspenis:[300,880], penilecruraandbulb:[180,700]
    },
    facialnerve:{
      facialmotornucleus:[420,470], nervusintermedius:[480,520], internalacousticmeatus:[455,500],
      geniculateganglion:[470,540], greaterpetrosalnerve:[500,560], nervetostapedius:[490,570],
      chordatympani:[560,650], posteriorauricularbranch:[540,600], facialsensationcnv:[700,300]
    },
    trigeminalnerve:{
      trigeminalsensoryroot:[500,330], frontalnerve:[690,270], nasociliarynerve:[670,320],
      superioralveolarnerves:[720,560], auriculotemporalnerve:[600,640], buccalsensorynerve:[700,610],
      lingualnerve:[660,760], mentalnerve:[720,760], motorrootofv3:[560,600], cornealreflexloop:[640,280]
    },
    eyeanatomy:{
      bowmanlayer:[238,430], cornealstroma:[250,400], descemetmembrane:[270,440],
      cornealendothelium:[280,450], zonularfibers:[340,420], posteriorchamber:[300,440],
      trabecularmeshwork:[290,400], canalofschlemm:[300,415]
    },
    retina:{
      internallimitingmembrane:[170,330], nervefiberlayer:[180,350], innerplexiformlayer:[300,450],
      innernuclearlayer:[400,500], outerplexiformlayer:[500,550], outernuclearlayer:[560,580],
      externallimitingmembrane:[600,595], rods:[650,660], cones:[680,640], mllerglia:[700,500],
      opticdisc:[870,430], centralretinalartery:[880,400]
    },
    nephron:{
      efferentarteriole:[330,240], filtrationbasementmembrane:[365,290], podocytefootprocesses:[370,310],
      mesangialcells:[385,285], maculadensa:[610,300], juxtaglomerularcells:[320,300],
      principalcells:[700,540], intercalatedcells:[710,560]
    },
    brachialplexus:{
      posteriordivisions:[590,480], medialcord:[660,510], musculocutaneousnerve:[700,560],
      mediannerve:[710,600], ulnarnerve:[700,650], axillarynerve:[690,540], radialnerve:[730,630],
      longthoracicnerve:[500,450], suprascapularnerve:[520,430]
    },
    cerebraldeep:{
      globuspallidus:[650,600], subthalamicnucleus:[590,640],
      primarymotorcortex:[380,230], primarysomatosensorycortex:[500,200]
    },
    meningescsf:{
      periostealcranialdura:[480,140], meningealcranialdura:[500,155], straightsinus:[620,300],
      transversesinus:[720,600], subarachnoidspace:[460,200], interventricularforamina:[520,420],
      thirdventricle:[540,500], cerebralaqueduct:[560,560], arachnoidgranulations:[560,130]
    },
    brainstemdeep:{
      superiorcolliculus:[430,150], inferiorcolliculus:[445,215], substantianigra:[415,255],
      cerebralpeduncles:[400,285], pontinenuclei:[470,430], medullarypyramids:[500,790],
      inferiorolives:[560,760], cerebellarvermis:[660,380], superiorcerebellarpeduncle:[640,330],
      inferiorcerebellarpeduncle:[630,600]
    },
    pulmonaryacinus:{
      surfactantlayer:[480,660], lamellarbodies:[500,670], airbloodbarrier:[700,650],
      alveolarseptum:[640,560], elasticfibers:[560,620], poresofkohn:[600,540],
      pulmonaryarteriole:[700,700], pulmonaryvenule:[760,690]
    },
    hepaticlobule:{
      sinusoidalendothelium:[545,350], spaceofdisse:[555,360], bilecanaliculi:[600,380],
      canalsofhering:[430,200], kupffercells:[520,350], hepaticstellatecells:[540,370],
      zone1periportal:[400,180], zone2intermediate:[500,340], zone3centrilobular:[560,470],
      hepaticveindrainage:[500,560]
    },
    intestinalwall:{
      cryptoflieberkhn:[300,400], brushborder:[350,240], panethcell:[320,450],
      cryptstemcells:[330,470], enteroendocrinecell:[400,300], villuscapillaries:[300,280],
      muscularismucosae:[430,700], submucosalplexus:[440,740], circularmuscle:[470,820],
      longitudinalmuscle:[490,870], serosa:[510,950]
    },
    skinlayers:{
      melanocytes:[205,330], langerhanscells:[210,300], apocrinesweatgland:[600,520],
      meissnercorpuscle:[230,400], freenerveendings:[240,430]
    },

    /* Conception, pregnancy and birth plates: only the structures that are
       actually drawn on each render receive a pointer. */
    laborfirststage:{
      contractions:[440,300], myometrium:[560,260], fundus:[500,150], lowersegment:[470,470],
      cervix:[490,610], internalos:[495,650], externalos:[495,700], effacement:[520,640],
      dilation:[470,660], mucus:[505,690], membranes:[440,560], amnioticfluid:[520,480],
      presenting:[450,430], engagement:[470,540], pelvis:[520,720], vagina:[520,760],
      complete:[480,690]
    },
    laborsecondstage:{
      full:[500,600], bonyinlet:[450,650], ischial:[400,680], outlet:[500,760],
      pubicsymphysis:[430,740], sacrum:[600,600], pelvicfloor:[480,790], vagina:[500,720],
      perineum:[500,820], vertex:[450,640], station:[460,620], descent:[470,580],
      flexion:[480,600], internalrotation:[500,640], extension:[510,670],
      restitution:[520,700], shoulders:[500,730], birth:[520,780]
    },
    placentaanatomy:{
      placenta:[400,300], chorionicplate:[430,280], basalplate:[300,400], villi:[380,420],
      fetalcapillary:[420,440], intervillous:[330,470], placentalbarrier:[400,500],
      spiral:[300,520], umbilicalarteries:[520,640], umbilicalvein:[560,620],
      wharton:[540,600], amnion:[480,300], chorion:[460,330], decidua:[330,560],
      cotyledon:[360,360], gasexchange:[430,460], delivery:[500,360]
    },
    fetaldevelopment:{
      fetalhead:[430,300], limbs:[520,520], heart:[450,430], placenta:[300,380],
      umbilicalcord:[380,480], amnion:[420,380], lungs:[440,450], kidneys:[430,520],
      gut:[440,480], bone:[500,600]
    },
    dentition:{
      dej:[430,300], 'pulp-horns':[470,370], apex:[420,780], cementum:[360,650],
      periodontal:[330,620], cej:[380,470], proximal:[470,180], facial:[330,350], v3:[600,720]
    },
    skullface:{
      orbit:[350,420], infraorbital:[360,520], mental:[370,800], zygoarch:[620,520],
      tmj:[550,720], suture:[500,120]
    },
    gynvulva:{
      hymen:[500,620], perineum2:[500,800], hart:[460,520]
    },
    shoulder:{
      'detail_shoulder_0':[350,330], 'detail_shoulder_1':[420,400], 'detail_shoulder_2':[520,220],
      'detail_shoulder_3':[420,80], 'detail_shoulder_4':[360,90], 'detail_shoulder_5':[550,150],
      'detail_shoulder_6':[500,170], 'detail_shoulder_7':[470,220], 'detail_shoulder_8':[460,270],
      'detail_shoulder_9':[380,520], 'detail_shoulder_10':[450,620], 'detail_shoulder_11':[750,450]
    },
    spinalcord:{
      'detail_spinalcord_0':[470,550], 'detail_spinalcord_1':[500,400], 'detail_spinalcord_2':[440,350],
      'detail_spinalcord_3':[560,330], 'detail_spinalcord_4':[620,450], 'detail_spinalcord_5':[550,550],
      'detail_spinalcord_6':[480,570], 'detail_spinalcord_7':[570,320]
    },
    larynx:{
      nasalc:[300,300], sinuses:[240,200], adenoid:[400,320], pharynx:[350,520],
      epiglot:[400,620], larynx:[420,720], vocal:[670,550], cricoid:[660,400], trachea2:[680,850],
      'detail_larynx_0':[300,270], 'detail_larynx_1':[330,230], 'detail_larynx_2':[400,300],
      'detail_larynx_3':[360,550], 'detail_larynx_4':[420,670], 'detail_larynx_5':[640,480],
      'detail_larynx_6':[650,440], 'detail_larynx_7':[660,520], 'detail_larynx_8':[700,500],
      'detail_larynx_9':[640,600], 'detail_larynx_10':[720,700]
    },
    bodyregions:{
      dorsalcavity:[500,180], cranialcavity:[500,60], vertebralcavity:[500,140],
      ventralcavity:[500,450], thoraciccavity:[500,300], pleural:[370,280], mediastinum:[500,330],
      pericardial:[510,340], diaphragm:[500,490], abdominal:[500,650], pelvic:[500,880],
      peritoneum:[500,700], retroperitoneal:[450,760], ruq:[420,600], luq:[580,580],
      rlq:[420,800], llq:[580,800], rhypochondriac:[420,560], epigastric:[500,545],
      lhypochondriac:[580,560], rlumbar:[420,660], umbilical:[500,680], llumbar:[580,660],
      riliac:[420,800], hypogastric:[500,830], liliac:[580,800], sternal:[500,230],
      iliaccrest:[390,840]
    }
  };

  /* ── Batch 3 · whole-site sweep ───────────────────────────────────────────
     Every remaining part that is actually drawn somewhere on a shipped plate
     now gets its own thin leader line + label. Composite "context" chapters
     (male, female, pelvis charts, cranial nerves, whole-body nervous) borrow
     the coordinates of the plate where that structure is really drawn. */
  const PINS3={
    laborthirdstage:{
      attached:[560,240], myometrium:[350,300], retraction:[400,190],
      decidualplane:[510,370], intervillous:[545,270], vessels:[335,240],
      separation:[495,430], placentadelivery:[460,620], membranes:[430,500],
      cord:[300,600], arteries:[285,630], vein:[315,585], fetalface:[575,205],
      maternalface:[535,330], cotyledons:[560,300], uterinetone:[380,255],
      bleeding:[430,690]
    },
    fertilization:{
      tube:[300,120], tubalmovement:[250,170], oocyte:[570,500],
      capacitated:[215,600], coronapassage:[470,420], zonabinding:[480,468],
      acrosomereaction:[465,505], membranefusion:[478,522], cortical:[522,430]
    },
    implantation:{
      hatched:[478,250], endometrium:[300,580], apposition:[430,430],
      adhesion:[450,470], cytotrophoblast:[470,330], syncytiotrophoblast:[500,392],
      decidua:[600,600], glands:[660,600], maternalvessels:[130,600],
      lacunae:[520,380], hcg:[560,480], innercell:[430,470], chorion:[500,300]
    },
    cleavageblastocyst:{
      zonaretained:[420,220], trophectoderm:[440,320], blastocoel:[600,500],
      innercell:[345,650], pole:[355,560], hatching:[270,380]
    },
    malebody:{
      detail_malebody_prostate:[500,722], detail_malebody_seminalvesicles:[518,716],
      detail_malebody_epididymis:[520,805], detail_malebody_aorta:[512,470]
    },
    femalebody:{
      detail_femalebody_cervix:[500,540], detail_femalebody_tubes:[478,498],
      detail_femalebody_vagina:[500,570]
    },
    female:{
      ctx_gynuterus_fundus:[500,110], ctx_gynuterus_body:[500,300],
      ctx_gynuterus_cornua:[350,190], ctx_gyncervix_ecto:[500,620],
      ctx_gyncervix_canal:[505,700], ctx_gynvagina_canalv:[500,860],
      ctx_gynadnexa_cortex:[225,340], ctx_gynadnexa_medulla:[232,382],
      ctx_gynvagina_anteriorwall:[470,800]
    },
    male:{
      ctx_maletestis_tunv:[400,800], ctx_maletestis_tuna:[405,780],
      ctx_maletestis_mediast:[420,760], ctx_maletestis_lobules:[390,740],
      ctx_maleprostate_blneck:[470,450], ctx_maleprostate_transition:[480,432],
      ctx_maleprostate_peripheral:[500,482],
      ctx_penileerectile_pairedcorporacavernosa:[150,600],
      ctx_penileerectile_corpusspongiosum:[170,700],
      ctx_penileerectile_cavernosaltrabeculae:[160,640]
    },
    malepelvis:{
      ctx_maleprostate_blneck:[462,438], ctx_maleprostate_transition:[472,452],
      ctx_maleprostate_peripheral:[490,472], ctx_maleprostate_central:[480,462],
      ctx_maleprostate_urethrap:[468,468]
    },
    femalepelvis:{
      ctx_gynsupport_broad:[430,300], ctx_gynsupport_mesomet:[420,330],
      ctx_gynsupport_mesosal:[400,205], ctx_gynsupport_mesovar:[480,220],
      ctx_gynsupport_round:[400,420]
    },
    spermanatomy:{
      acrosome:[70,470], nucleus:[95,505], neck:[130,500], axoneme:[520,500]
    },
    oocyteanatomy:{
      secondary:[540,200], perivitelline:[480,240], oolemma:[440,420],
      ooplasm:[620,500], spindle:[500,330]
    },
    embryodevelopment:{ amnion:[200,150] },
    gynvulva:{
      barthol:[430,600], skene:[478,350], detail_vulva_glandduct:[520,590]
    },
    joints:{
      'ctx_shoulder_supra':[450,250], 'ctx_shoulder_infra':[550,350],
      'ctx_shoulder_teres':[570,430], 'ctx_shoulder_subscap':[390,400],
      'ctx_shoulder_labrum':[425,385], 'ctx_shoulder_ghcap':[500,300]
    },
    fetaldevelopment:{
      foramenovale:[455,425], ductusarteriosus:[470,410], ductusvenosus:[420,460]
    },
    spleen:{
      'detail_spleen_0':[630,470], 'detail_spleen_1':[676,676],
      'detail_spleen_2':[640,415], 'detail_spleen_3':[600,570],
      'detail_spleen_4':[612,540], 'detail_spleen_5':[650,455],
      'detail_spleen_6':[585,480], 'detail_spleen_7':[340,360],
      'detail_spleen_8':[362,400], 'detail_spleen_9':[590,595],
      'detail_spleen_10':[470,520], 'detail_spleen_11':[300,300]
    },
    thyroid:{
      'detail_thyroid_3':[418,360], 'detail_thyroid_4':[470,600],
      'detail_thyroid_5':[455,330], 'detail_thyroid_6':[630,470],
      'detail_thyroid_7':[500,650], 'detail_thyroid_8':[487,700],
      'detail_thyroid_9':[447,315], 'detail_thyroid_10':[390,520],
      'detail_thyroid_11':[506,640]
    },
    ear:{
      'detail_ear_0':[480,570], 'detail_ear_1':[500,505],
      'detail_ear_2':[505,565], 'detail_ear_3':[580,455],
      'detail_ear_4':[610,520], 'detail_ear_7':[660,470],
      'detail_ear_8':[645,405], 'detail_ear_9':[618,300]
    },
    bladder:{
      'detail_bladder_0':[469,300], 'detail_bladder_1':[420,480],
      'detail_bladder_2':[380,430], 'detail_bladder_3':[430,520],
      'detail_bladder_7':[330,380], 'detail_bladder_8':[590,420],
      'detail_bladder_9':[480,60], 'detail_bladder_10':[280,450]
    },
    pancreas:{
      'detail_pancreas_0':[640,560], 'detail_pancreas_1':[690,555],
      'detail_pancreas_2':[706,516], 'detail_pancreas_3':[742,560],
      'detail_pancreas_4':[728,564]
    },
    breast:{
      'detail_breast_4':[340,560], 'detail_breast_5':[300,580],
      'detail_breast_6':[660,505], 'detail_breast_7':[380,640],
      'detail_breast_8':[760,420], 'detail_breast_9':[560,620]
    },
    gynvagina:{
      'detail_gynvagina_0':[500,600], 'detail_gynvagina_1':[512,585],
      'detail_gynvagina_2':[640,560], 'detail_gynvagina_3':[430,560],
      'detail_gynvagina_4':[500,790], 'detail_gynvagina_5':[640,660]
    },
    gyncervix:{
      'detail_gyncervix_0':[520,390], 'detail_gyncervix_1':[560,345],
      'detail_gyncervix_2':[500,470], 'detail_gyncervix_3':[470,690],
      'detail_gyncervix_4':[530,700], 'detail_gyncervix_5':[600,520],
      'detail_gyncervix_6':[620,300], 'detail_gyncervix_7':[560,720]
    },
    maleprostate:{
      'detail_maleprostate_0':[430,300], 'detail_maleprostate_1':[480,250],
      'detail_maleprostate_2':[500,420], 'detail_maleprostate_3':[600,450],
      'detail_maleprostate_4':[560,520], 'detail_maleprostate_5':[450,520]
    },
    muscle:{
      'detail_muscle_0':[500,150], 'detail_muscle_1':[500,780],
      'detail_muscle_2':[520,400], 'detail_muscle_3':[500,300],
      'detail_muscle_4':[500,930]
    },
    vascular:{
      'detail_vascular_0':[512,280], 'detail_vascular_1':[520,292],
      'detail_vascular_2':[528,304], 'detail_vascular_3':[535,270],
      'detail_vascular_4':[600,700]
    },
    endocrine:{
      'detail_endocrine_0':[480,110], 'detail_endocrine_1':[500,120],
      'detail_endocrine_2':[520,105], 'detail_endocrine_3':[470,410],
      'detail_endocrine_4':[478,425], 'detail_endocrine_5':[486,440],
      'detail_endocrine_7':[520,205]
    },
    marrow:{
      'detail_marrow_7':[330,330], 'detail_marrow_8':[520,470],
      'detail_marrow_9':[450,350], 'detail_marrow_10':[500,500]
    },
    gynuterus:{
      'detail_gynuterus_2':[460,280], 'detail_gynuterus_3':[600,330],
      'detail_gynuterus_4':[515,80], 'detail_gynuterus_5':[470,290]
    },
    gynadnexa:{ 'detail_gynadnexa_3':[700,390] },
    gynsupport:{
      'detail_gynsupport_0':[470,650], 'detail_gynsupport_1':[500,860],
      'detail_gynsupport_2':[560,760]
    },
    clitoralcomplex:{
      'detail_clitoralcomplex_0':[480,470], 'detail_clitoralcomplex_1':[300,380],
      'detail_clitoralcomplex_2':[370,640], 'detail_clitoralcomplex_3':[500,400]
    },
    penileerectile:{
      'detail_penileerectile_0':[300,390], 'detail_penileerectile_1':[210,300],
      'detail_penileerectile_2':[260,600], 'detail_penileerectile_3':[180,720]
    },
    facialnerve:{
      'detail_facialnerve_0':[470,500],
      'detail_facialnerve_1':[560,700], 'detail_facialnerve_2':[575,730],
      'detail_facialnerve_3':[640,720]
    },
    trigeminalnerve:{
      'detail_trigeminalnerve_0':[520,360], 'detail_trigeminalnerve_1':[540,420],
      'detail_trigeminalnerve_2':[490,320], 'detail_trigeminalnerve_3':[505,380]
    },
    tissuefoundations:{ apical:[510,340], simple:[300,420], fourtypes:[750,400], histology:[600,500] },
    spinalcord:{
      'detail_spinalcord_8':[540,700], 'detail_spinalcord_9':[545,760],
      'detail_spinalcord_10':[585,700]
    },
    hepaticlobule:{
      'detail_hepaticlobule_0':[400,160], 'detail_hepaticlobule_1':[420,150],
      'detail_hepaticlobule_2':[430,130]
    },
    placentaanatomy:{ uterineveins:[350,600], hcg:[430,300], steroids:[380,340] },
    laborfirststage:{ latent:[500,300], active:[480,500], surveillance:[560,650] },
    heart:{ ias:[430,300], av:[470,370] },
    brachialplexus:{ 'detail_brachialplexus_0':[480,420], 'detail_brachialplexus_1':[560,420] },
    meningescsf:{ 'detail_meningescsf_0':[700,600], 'detail_meningescsf_1':[520,180] },
    laborsecondstage:{ cesarean:[350,700], clinical:[600,700] },
    cerebraldeep:{ 'detail_cerebraldeep_0':[520,470] },
    brainstemdeep:{ 'detail_brainstemdeep_0':[520,520] },
    pulmonaryacinus:{ 'detail_pulmonaryacinus_0':[400,520] },
    nephron:{ 'detail_nephron_1':[660,300] },
    dentition:{ v2:[500,220] },
    skullface:{
      lparietal:[310,120], ltemporal:[250,470], llacrimal:[332,470]
    }
  };
  for(const [chapter,map] of Object.entries(PINS3)){
    const cur=PINS[chapter]||(PINS[chapter]={});
    for(const [pid,xy] of Object.entries(map)) if(!cur[pid]) cur[pid]=xy;
  }

  /* Structures hidden on the chapter plate but drawn on a second, dedicated
     view: each gets its own real pin and leader on that plate. */
  const PLATES={
    skullface:{
      rparietal:['skull-face-medial.png',[620,180]],
      rtemporal:['skull-face-medial.png',[720,550]],
      occipital:['skull-face-medial.png',[720,420]],
      sphenoid:['skull-face-medial.png',[550,450]],
      ethmoid:['skull-face-medial.png',[380,420]],
      rlacrimal:['skull-face-medial.png',[300,480]],
      rpalatine:['skull-face-medial.png',[480,620]],
      rconcha:['skull-face-medial.png',[320,580]],
      vomer:['skull-face-medial.png',[420,550]],
      palate:['skull-face-medial.png',[450,620]],
      septum:['skull-face-medial.png',[380,520]]
    },
    gynvulva:{
      crura:['clitoral-complex.jpg',[430,380]],
      bulbs:['clitoral-complex.jpg',[365,635]],
      detail_vulva_pudendal:['clitoral-complex.jpg',[470,800]],
      detail_vulva_clitoralnerve:['clitoral-complex.jpg',[350,340]],
      detail_vulva_vessels:['clitoral-complex.jpg',[400,420]]
    }
  };

  /* Batch 3 · same rule for the composite "context" plates: a cross-referenced
     structure that is not drawn on this plate points at the plate that draws it. */
  const PLATES3={
    nervous:{
      ctx_cerebraldeep_corticalgraymatter:['cerebral-deep.jpg',[290,260]],
      ctx_brainstemdeep_midbrain:['brainstem-cerebellum.jpg',[430,185]],
      ctx_brachialplexus_c5t1ventralrami:['brachial-plexus-deep.jpg',[375,200]],
      ctx_cerebraldeep_layerimolecular:['cerebral-deep.jpg',[300,240]],
      ctx_brainstemdeep_superiorcolliculus:['brainstem-cerebellum.jpg',[430,150]],
      ctx_brachialplexus_interscalenepassage:['brachial-plexus-deep.jpg',[380,290]]
    },
    brain:{
      ctx_meningescsf_periostealcranialdura:['meninges-csf.jpg',[480,140]],
      ctx_brainstemdeep_superiorcolliculus:['brainstem-cerebellum.jpg',[430,150]]
    },
    cranialnerves:{
      ctx_facialnerve_facialmotornucleus:['facial-nerve-deep.jpg',[420,470]],
      ctx_trigeminalnerve_trigeminalsensoryroot:['trigeminal-deep.jpg',[500,330]],
      ctx_facialnerve_nervusintermedius:['facial-nerve-deep.jpg',[480,520]],
      ctx_trigeminalnerve_trigeminalganglion:['trigeminal-deep.jpg',[465,335]],
      ctx_facialnerve_internalacousticmeatus:['facial-nerve-deep.jpg',[455,500]],
      ctx_trigeminalnerve_ophthalmicv1:['trigeminal-deep.jpg',[660,215]],
      ctx_facialnerve_geniculateganglion:['facial-nerve-deep.jpg',[470,540]]
    },
    malepelvis:{
      ctx_penileerectile_pairedcorporacavernosa:['penile-erectile.jpg',[298,400]],
      ctx_penileerectile_corpusspongiosum:['penile-erectile.jpg',[295,760]],
      ctx_penileerectile_tunicaalbuginea:['penile-erectile.jpg',[175,430]],
      ctx_penileerectile_cavernosaltrabeculae:['penile-erectile.jpg',[260,430]],
      ctx_penileerectile_deeppenilearteries:['penile-erectile.jpg',[230,400]]
    },
    femalepelvis:{
      ctx_clitoralcomplex_clitoralglans:['clitoral-complex.jpg',[500,300]],
      ctx_clitoralcomplex_clitoralprepuce:['clitoral-complex.jpg',[520,320]],
      ctx_clitoralcomplex_clitoralbody:['clitoral-complex.jpg',[500,420]],
      ctx_clitoralcomplex_rightcorpuscavernosum:['clitoral-complex.jpg',[430,380]],
      ctx_clitoralcomplex_leftcorpuscavernosum:['clitoral-complex.jpg',[570,380]]
    }
  };
  for(const [chapter,map] of Object.entries(PLATES3)){
    const cur=PLATES[chapter]||(PLATES[chapter]={});
    for(const [pid,v] of Object.entries(map)) if(!cur[pid]) cur[pid]=v;
  }

  /* Tissues and cell-scale structures keep the microscope cutaway instead of a
     pointer on a gross-anatomy plate. */
  const LENSES={
    lungs:{alveoli:'alveolar'},
    kidney:{glom:'nephron',pct:'nephron',henle:'nephron',dct:'nephron',duct:'nephron'},
    liver:{lobule:'lobule'},
    gut:{villi:'intestine'},
    pancreas:{islet:'pancreas',acini:'pancreas'},
    thyroid:{follicle:'thyroid'}
  };

  /* Data hygiene: a part that already carries a coordinate on its plate is *pointed
     at*, so the stale `contextOnly` flag (which drives the neutral "study note" chip
     in the parts list) must go. Without this the labour, fertilisation and
     implantation rows showed an info glyph even though the plate had a leader line. */
  for(const o of Object.values(ORGANS)){
    const hot=(o.photo&&o.photo.hot)||{};
    for(const pid of Object.keys(hot)){
      if(o.parts[pid]&&Array.isArray(hot[pid])&&hot[pid].length===2) delete o.parts[pid].contextOnly;
    }
  }

  let pinned=0, lensed=0, unknown=[];
  for(const [chapter,map] of Object.entries(PINS)){
    const o=ORGANS[chapter];
    if(!o||!o.photo){unknown.push(chapter);continue}
    o.photo.hot=o.photo.hot||{};
    for(const [pid,xy] of Object.entries(map)){
      if(!o.parts[pid]){unknown.push(chapter+'.'+pid);continue}
      if(o.photo.hot[pid])continue;               /* never overwrite curated pins */
      if(!Array.isArray(xy)||xy.length!==2)continue;
      o.photo.hot[pid]=xy;
      delete o.parts[pid].contextOnly;            /* it is now pointed at on the plate */
      pinned++;
    }
  }
  let plated=0;
  for(const [chapter,map] of Object.entries(PLATES)){
    const o=ORGANS[chapter]; if(!o){unknown.push(chapter);continue}
    for(const [pid,[file,xy]] of Object.entries(map)){
      const p=o.parts[pid]; if(!p){unknown.push(chapter+'.'+pid);continue}
      p.pinPlate={file,hot:xy};
      plated++;
    }
  }
  /* Exact context references: when a context-only entry has no point on its
     selected micro-lens, use a curated target plate only if the target entry has
     the same visible name and an existing, valid hotspot. Never infer a point
     from a similar name or a different image. */
  const validPoint=xy=>Array.isArray(xy)&&xy.length===2&&xy.every(v=>Number.isFinite(v)&&v>=0&&v<=1000);
  const imageKey=file=>String(file||'').split(/[\\/]/).pop().replace(/\.(?:jpe?g|png|webp)$/i,'').toLowerCase();
  const applyContextTarget=(chapter,pid,targetChapter,targetPid)=>{
    const o=ORGANS[chapter],p=o?.parts?.[pid],target=ORGANS[targetChapter],q=target?.parts?.[targetPid];
    const point=target?.photo?.hot?.[targetPid];
    if(!p?.contextOnly||p.pinPlate?.file||(p.microLens&&validPoint(p.microPoint))||!q||q.contextOnly||q.n!==p.n||!target.photo?.file||!validPoint(point))return false;
    p.pinPlate={file:target.photo.file,hot:point.slice(),reference:targetChapter};
    return true;
  };
  for(const [chapter,o] of Object.entries(ORGANS)){
    for(const [pid,p] of Object.entries(o.parts||{})){
      if(!p.contextOnly||p.pinPlate?.file||(p.microLens&&validPoint(p.microPoint)))continue;
      const source=p.deepRef&&ORGANS[p.deepRef];
      if(source?.photo?.file){
        const prefix=`ctx_${p.deepRef}_`;
        const candidate=pid.startsWith(prefix)?pid.slice(prefix.length):'';
        if(candidate&&applyContextTarget(chapter,pid,p.deepRef,candidate))continue;
      }
      if(!p.referencePlate)continue;
      const referenceFile=typeof p.referencePlate==='string'?p.referencePlate:p.referencePlate.file;
      const key=imageKey(referenceFile);
      if(!key)continue;
      for(const [targetChapter,target] of Object.entries(ORGANS)){
        if(imageKey(target.photo?.file)!==key)continue;
        const matches=Object.entries(target.parts||{}).filter(([targetPid,q])=>q.n===p.n&&!q.contextOnly&&validPoint(target.photo?.hot?.[targetPid]));
        if(matches.length===1){applyContextTarget(chapter,pid,targetChapter,matches[0][0]);break;}
      }
    }
  }
  /* A few whole-body entries have an exact dedicated chapter hotspot. The
     overview itself remains unpinned; opening the note leads to the matching
     organ/system plate instead of guessing at an internal point on the body map. */
  const BODY_CONTEXT_TARGETS={
    malebody:{
      detail_malebody_spleen:['lymph','spleenl'],
      detail_malebody_adrenals:['endocrine','adr'],
      detail_malebody_diaphragm:['lungs','diaphragm'],
      detail_malebody_spinalcord:['nervous','spinalcord']
    },
    femalebody:{
      detail_femalebody_spleen:['lymph','spleenl'],
      detail_femalebody_adrenals:['endocrine','adr'],
      detail_femalebody_diaphragm:['lungs','diaphragm'],
      detail_femalebody_spinalcord:['nervous','spinalcord']
    }
  };
  for(const [chapter,map] of Object.entries(BODY_CONTEXT_TARGETS))
    for(const [pid,[targetChapter,targetPid]] of Object.entries(map))
      applyContextTarget(chapter,pid,targetChapter,targetPid);

  for(const [chapter,map] of Object.entries(LENSES)){
    const o=ORGANS[chapter]; if(!o)continue;
    for(const [pid,lens] of Object.entries(map)){
      const p=o.parts[pid]; if(!p||p.microLens)continue;
      p.microLens=lens;
      if(MICRO_ORIGINS[chapter]&&!p.microOrigin)p.microOrigin=MICRO_ORIGINS[chapter];
      lensed++;
    }
  }
  if(unknown.length)console.warn('part-pins: skipped',unknown.join(', '));
  window.CORPUS_PIN_REPORT={pinned,plated,lensed};
})();
