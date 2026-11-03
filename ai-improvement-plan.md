# Corpus AI Assistant — 50x Improvement Plan

English + Hindi/Urdu (Hinglish) mein.

## Masala (Problem)

User ne poocha: **"what is in side a single hair"**
AI ne diya: Generic **"Human body / PHYSICAL SUBSTANCE OF THE HUMAN ORGA…"** jawab + ek human anatomy illustration.

Ye galat hai. User ne bal (hair) ke baare mein poocha, aur AI ne poora "human body" bhej diya. AI ko:
1. Question ka **intent** samajhna chahiye (hair anatomy, na ki full body)
2. **Domain knowledge** hona chahiye (hair structure: follicle, bulb, papilla, cortex, medulla, cuticle, keratin, melanin, sebaceous gland, arrector pili)
3. Site ke apne content (74 chapters, 1,586 parts) se **sach jawab** dena chahiye, na ki halluciant/generic

---

## 50x Improvement Roadmap

### Phase 1: Better System Prompt (Immediate, zero cost)

AI ko ek strict system prompt dein:

> You are the Corpus AI Assistant for an interactive human anatomy atlas. You answer anatomy/health questions using ONLY the site's documented content (74 study guides, 1,586 documented parts). 
> - If user asks about a specific organ/part (e.g. hair, heart, kidney), answer about THAT part specifically — do NOT give a generic "human body" overview.
> - Use Latin terms where useful (e.g. folliculus pili, cortex, medulla, cuticula).
> - If you don't know from the site's content, say so honestly. Don't hallucinate.
> - Keep answers concise but complete (3-6 sentences + bullet points).
> - Language: reply in the same language the user asked (English or Hinglish/Hindi).

### Phase 2: Intent Recognition + Keyword Routing

Pehle se pehchan lo ki user kya pooch raha hai:

| Keywords | Intent | Target answer |
|----------|--------|---------------|
| hair, single hair, follicle, strand | Hair anatomy | Hair shaft/follicle/bulb/papilla/cortex/medulla/cuticle/keratin |
| heart | Heart | Chambers, valves, coronary flow |
| bone, skeleton | Skeletal | Bones, joints, marrow |

Agar "hair" keyword aaye to **sirf hair ki anatomy** ka jawab dein, full body ka nahi.

### Phase 3: RAG (Retrieval-Augmented Generation) — Real 50x jump

Site ke paas pehle se hai:
- 74 illustrated study guides
- 1,586 documented parts with Latin names, function, clinical context

**RAG ka matlab:** Jab user koi sawal pooche, to:
1. Us sawal se match karne wale chapters/parts dhundhein (site ke content se)
2. Unka text AI ke paas bhejein (context ke saath)
3. AI us context se jawab dein

Isse AI ghar ke baare mein galat ya generic jawab nahi dega — wo apne hi atlas ka sahi content dega.

### Phase 4: Hair-specific knowledge base (example content)

AI ke paas ye hona chahiye:

**Inside a single hair (ek bal ke andar):**
- **Hair shaft** — jo bahar dikhta hai
- **Three layers:** Cuticle (bahar ki patli parat), Cortex (beech ka hissa, keratin se bhora, rang melanin se), Medulla (centre, sabse andar, kabhi-kabhi hota hai)
- **Hair follicle** — skin mein woh ghar jahan se bal nikalta hai
- **Hair root / bulb** — follicle ka neecha hissa jahan bal ugta hai
- **Dermal papilla** — bulb ke neeche, khoon ki supply deti hai
- **Sebaceous gland (oil gland)** — bal ko chikna rakhti hai
- **Arrector pili muscle** — chhoti maanspeshie jo bal ko khada karti hai (goosebumps)
- **Keratin** — protein jisse bal bana hota hai
- **Melanin** — pigment jo bal ka rang deta hai

### Phase 5: Evaluation

Test questions aur expected answers rakhein:

| User question | Expected AI response topic |
|---------------|---------------------------|
| what is inside a single hair | Hair shaft, cuticle, cortex, medulla, follicle, papilla, keratin, melanin |
| how does the heart work | 4 chambers, valves, SA node, coronary arteries |
| what are body planes | Sagittal, coronal, transverse |
| name parts of the kidney | Cortex, medulla, nephron, pelvis |

Agar AI inka sahi jawab de → improvement successful.

---

## Example: Corrected AI response for "what is inside a single hair"

> A single hair has several layers and parts:
> - **Hair shaft** — the part you see above the skin.
> - **Three layers:** **Cuticle** (outer thin layer), **Cortex** (middle, made of keratin, gives color via melanin), **Medulla** (inner core).
> - **Hair follicle** — the skin pocket the hair grows from.
> - **Hair bulb & dermal papilla** — the root base where the hair grows and gets blood supply.
> - **Sebaceous gland** — adds oil; **arrector pili muscle** — makes hair stand up (goosebumps).
> - Main protein: **keratin**; color pigment: **melanin**.

Yeh answer specific hai, sahi hai, aur user ke sawal se directly jura hua hai.

---

## Frontend Code

Dekhein `ai-assistant-improved.js` — wahan ek improved assistant ka example code hai jo aap apne site mein integrate kar sakte hain.
