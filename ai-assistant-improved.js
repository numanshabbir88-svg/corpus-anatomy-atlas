/*
 * Corpus AI Assistant — Improved Frontend Example
 * 
 * Is example mein dikhaya gaya hai ke AI assistant kaise:
 * 1. User ke sawal ka intent pehchane (hair vs heart vs generic)
 * 2. Sahi, specific jawab de (generic "human body" nahi)
 * 3. Modal sahi tareeke se khule aur band ho (✕, backdrop, ESC)
 * 
 * Aap apne backend API ke hisay se iska `fetch(...)` hissa update karein.
 */

(function () {
  // -----------------------------------------------------------
  // 1. Intent + knowledge map (site content se liye ja sakte hain)
  // -----------------------------------------------------------
  const KNOWLEDGE = {
    hair: {
      title: 'Inside a single hair (ek bal ke andar)',
      answer: `A single hair has these parts:
      • Hair shaft — the part visible above the skin.
      • Three layers: Cuticle (outer), Cortex (middle; keratin + melanin for color), Medulla (inner core).
      • Hair follicle — the skin pocket it grows from.
      • Hair bulb & dermal papilla — root base; papilla supplies blood.
      • Sebaceous gland — adds oil; Arrector pili muscle — makes hair stand (goosebumps).
      Main protein: keratin. Color pigment: melanin.`,
    },
    heart: {
      title: 'Heart',
      answer: 'The heart has four chambers (2 atria, 2 ventricles), four one-way valves, coronary arteries, and an intrinsic electrical pacemaker (SA node → Purkinje fibers) that drives each heartbeat.',
    },
    // Add more organs from your 1,586 documented parts here...
  };

  function detectIntent(question) {
    const q = question.toLowerCase();
    const keywords = {
      hair: ['hair', 'single hair', 'follicle', 'strand', 'バル'],
      heart: ['heart'],
      kidney: ['kidney', 'renal'],
      lung: ['lung', 'lungs', 'pulmonary'],
      bone: ['bone', 'skeleton', 'skeletal'],
    };
    for (const [key, words] of Object.entries(keywords)) {
      if (words.some(w => q.includes(w))) return key;
    }
    return null;
  }

  // -----------------------------------------------------------
  // 2. Answer builder
  // -----------------------------------------------------------
  function buildAnswer(question) {
    const intent = detectIntent(question);
    if (intent && KNOWLEDGE[intent]) {
      return KNOWLEDGE[intent].answer;
    }
    // Fallback: honest generic + suggest browsing site
    return `I’m not sure about that from the Corpus atlas. Try asking about a specific organ (e.g. hair, heart, kidney, lung), or browse the study guides and body map on the site.`;
  }

  // -----------------------------------------------------------
  // 3. Modal open / close (uses modal-close-fix logic too)
  // -----------------------------------------------------------
  const modal = document.querySelector('[data-modal], .ai-assistant-modal, [role="dialog"]');
  const openBtn = document.querySelector('[data-open-ai], .ask-ai, [aria-label*="AI"]');
  const closeBtn = document.querySelector('[data-close], .ai-close, .modal-close');

  function openModal() {
    if (!modal) return;
    modal.setAttribute('open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('modal-open', 'no-scroll');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.removeAttribute('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open', 'no-scroll');
    document.body.style.removeProperty('overflow');
  }

  if (openBtn) openBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // -----------------------------------------------------------
  // 4. Handle user question -> answer
  // -----------------------------------------------------------
  const form = document.querySelector('form[aria-label*="AI"], .ai-form');
  const input = document.querySelector('.ai-input, [placeholder*="organ or question"]');

  if (form && input) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;

      // Show user message
      appendMessage('user', q);
      input.value = '';

      // TODO: Replace this with your real API call:
      // const res = await fetch('/api/ai', { method: 'POST', body: JSON.stringify({ question: q }) });
      // const data = await res.json();
      // const answer = data.answer;

      const answer = buildAnswer(q);
      appendMessage('assistant', answer);
    });
  }

  function appendMessage(role, text) {
    const container = document.querySelector('.ai-messages, [data-messages]');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `ai-message ai-message--${role}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  console.log('[Corpus] ai-assistant-improved loaded');
})();
