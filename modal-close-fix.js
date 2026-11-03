/*
 * Corpus Anatomy Atlas — Modal / Cross (✕) Close Fix
 * 
 * Masala: Image ya AI assistant modal khulti hai, lekin ✕ (cross) button
 * par click karne par modal band nahi hoti / wapis nahi jati.
 * 
 * Is script se:
 * 1. ✕ button se modal band hogi
 * 2. Peeche ke dark backdrop (overlay) par click karne par bhi band hogi
 * 3. ESC key dabane par band hogi
 * 4. Body ka overflow wapas normal hoga (page scroll ho sakegi)
 * 
 * Kaise lagayein: Is file ko apne page ke <head> ya body ke end mein
 * <script src="modal-close-fix.js"></script> ke zariye include karein.
 */

(function () {
  // Selectors — aap apne site ke class names ke hisay se inhe badal sakte hain
  const MODAL_SELECTOR = '[data-modal], .modal, .ai-assistant-modal, [role="dialog"]';
  const CLOSE_SELECTOR = '[data-close], .modal-close, .close-btn, .ai-close, button[aria-label="Close"]';
  const BACKDROP_SELECTOR = '.modal-backdrop, .overlay, [data-backdrop]';

  function getModal(el) {
    // Agar click modal ke andar hua to uske parent modal ko dhundhein
    return el.closest(MODAL_SELECTOR);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.removeAttribute('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open', 'active');
    document.body.classList.remove('modal-open', 'no-scroll');
    document.body.style.removeProperty('overflow');
    // Focus wapas trigger element par le jana optional hai
  }

  function closeAllModals() {
    document.querySelectorAll(MODAL_SELECTOR).forEach(closeModal);
  }

  // 1. ✕ cross button click
  document.addEventListener('click', function (e) {
    var closeBtn = e.target.closest(CLOSE_SELECTOR);
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      closeModal(getModal(closeBtn) || closeBtn.closest(MODAL_SELECTOR));
      return;
    }

    // Agar click directly modal par hai lekin close btn par nahi, to kuch na karein
    // (content click se modal band nahi honi chahiye)
  });

  // 2. Backdrop / overlay click
  document.addEventListener('click', function (e) {
    var backdrop = e.target.closest(BACKDROP_SELECTOR);
    if (backdrop) {
      e.preventDefault();
      closeAllModals();
    }
  });

  // 3. ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  console.log('[Corpus] modal-close-fix loaded');
})();
