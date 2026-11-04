/*
 * Corpus Anatomy Atlas — Modal / Cross (✕) Close Fix
 * 
 * Masala: Image ya koi bhi modal khulti hai, lekin ✕ (cross) button
 * par click karne par modal band nahi hoti / wapis nahi jati.
 * 
 * Is script se:
 * 1. ✕ button se modal band hogi
 * 2. Peeche ke dark backdrop par click karne par bhi band hogi
 * 3. ESC key dabane par band hogi
 * 4. Body scroll wapas normal hoga
 * 
 * Kaise lagayein: Is file ko apne page ke <head> ya body ke end mein
 * <script src="modal-close-fix.js"></script> ke zariye include karein.
 */

(function () {
  // Selectors — aap apne site ke class names ke hisay se inhe badal sakte hain
  const MODAL_SELECTOR = '[data-modal], .modal, [role="dialog"], .image-modal, .ai-assistant-modal';
  const CLOSE_SELECTOR = '[data-close], .modal-close, .close-btn, .ai-close, button[aria-label="Close"]';
  const BACKDROP_SELECTOR = '.modal-backdrop, .overlay, [data-backdrop]';

  function closeModal(modal) {
    if (!modal) return;
    modal.removeAttribute('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open', 'active', 'open');
    document.body.classList.remove('modal-open', 'no-scroll');
    document.body.style.removeProperty('overflow');
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
      var modal = closeBtn.closest(MODAL_SELECTOR);
      closeModal(modal || closeBtn);
      return;
    }
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
