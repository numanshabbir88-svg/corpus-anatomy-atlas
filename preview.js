/* Corpus shared plate preview for atlas cards and search-readable study guides. */
(() => {
  'use strict';
  let active = null;
  const svgNS = 'http://www.w3.org/2000/svg';
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const clamp = (v, low, high) => Math.max(low, Math.min(high, v));

  function open(trigger) {
    if (active) active.close();
    const name = trigger.dataset.partName || 'Anatomy region';
    const source = trigger.dataset.plateSrc;
    const kind = trigger.dataset.previewKind || 'region';
    const scope = kind === 'scope';
    if (!source) return;
    const x = Number(trigger.dataset.pointX), y = Number(trigger.dataset.pointY);
    const located = trigger.dataset.previewContext !== 'true' &&
      Number.isFinite(x) && Number.isFinite(y) &&
      x >= 0 && x <= 1000 && y >= 0 && y <= 1000 &&
      trigger.hasAttribute('data-point-x') && trigger.hasAttribute('data-point-y');

    const modal = el('dialog', 'plate-preview');
    modal.setAttribute('aria-label', 'Enlarged anatomical image: ' + name);
    const close = el('button', 'plate-preview-close', '×');
    close.type = 'button'; close.setAttribute('aria-label', 'Close enlarged image');
    const title = el('h2', 'plate-preview-title', name);
    const visual = el('div', 'plate-preview-visual');
    const image = el('img'); image.alt = scope
      ? (located ? `Tissue-scale educational cutaway identifying ${name}`
        : `Relevant tissue-scale cutaway for ${name}; individual feature not singled out`)
      : located
        ? (kind === 'micro' ? `Digital alveolar teaching illustration showing ${name}` : `Anatomy teaching illustration indicating ${name}`)
        : `Regional anatomy illustration for the study note ${name}`;
    image.decoding = 'async'; image.src = source;
    visual.append(image);

    if (located) {
      const side = x < 500 ? 'left' : 'right';
      const endX = side === 'left' ? 225 : 775;
      const endY = clamp(y - 95, 85, 915);
      const svg = document.createElementNS(svgNS, 'svg');
      svg.classList.add('plate-preview-leader');
      svg.setAttribute('viewBox', '0 0 1000 1000');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('aria-hidden', 'true');
      const line = document.createElementNS(svgNS, 'path');
      line.setAttribute('d', `M${x} ${y} L${endX} ${endY}`);
      const point = document.createElementNS(svgNS, 'circle');
      point.setAttribute('cx', x); point.setAttribute('cy', y); point.setAttribute('r', '4');
      svg.append(line, point);
      const label = el('span', 'plate-preview-label ' + side, name);
      label.style.top = (endY / 10).toFixed(1) + '%';
      visual.append(svg, label);
    }

    const note = el('p', 'plate-preview-note', trigger.dataset.previewNote || (scope
      ? (located ? 'This is a tissue-scale digital teaching illustration, not a clinical micrograph or an actual zoom from the organ picture. The fine line marks the depicted feature. Tap the lens image to close.'
        : 'This cutaway shows the tissue type around ' + name + ' rather than that one named structure, so no part-specific pointer is drawn. It is not a clinical micrograph or a literal zoom of the organ picture.')
      : kind === 'micro'
      ? 'Digital microscopic-scale teaching illustration, not a histology micrograph or a literal zoom of the whole lung. The fine line identifies the depicted cell. Tap the image to close.'
      : located
        ? 'Tap the image to close. The fine line indicates an approximate visible structure on this teaching plate, not a clinical localization.'
        : 'Tap the image to close. This is a regional teaching plate; this structure is not separately identifiable here and no pointer is shown.'));
    modal.append(close, title);
    if (scope) {
      const compare = el('div', 'scope-compare');
      const overview = el('div', 'scope-overview');
      overview.append(el('small', 'scope-step', '01 · Organ / source region'));
      const macro = el('div', 'scope-overview-image');
      const overviewImage = el('img');
      overviewImage.alt = 'Whole-organ teaching image showing the general source region, not a microscopic cell';
      overviewImage.loading = 'lazy';
      overviewImage.src = trigger.dataset.overviewSrc || '';
      macro.append(overviewImage);
      const ox = Number(trigger.dataset.originX), oy = Number(trigger.dataset.originY);
      if (trigger.hasAttribute('data-origin-x') && trigger.hasAttribute('data-origin-y') &&
          Number.isFinite(ox) && Number.isFinite(oy) && ox >= 0 && ox <= 1000 && oy >= 0 && oy <= 1000) {
        const ring = el('span', 'scope-sample');
        ring.style.left = (ox / 10).toFixed(1) + '%';
        ring.style.top = (oy / 10).toFixed(1) + '%';
        ring.setAttribute('aria-hidden', 'true');
        macro.append(ring);
      }
      overview.append(macro, el('p', 'scope-origin-note', (trigger.hasAttribute('data-origin-x') && trigger.hasAttribute('data-origin-y') ? 'Ring = representative tissue region, not the location of an individual cell.' : 'No sample ring: this whole-body or earlier-stage image cannot identify an exact microscopic sampling site.')));
      const bridge = el('div', 'scope-bridge', '→');
      bridge.setAttribute('aria-hidden', 'true');
      const lens = el('div', 'scope-lens');
      lens.append(el('small', 'scope-step', '02 · Under the lens'));
      lens.append(el('h3', 'scope-lens-heading', trigger.dataset.lensTitle || 'Tissue-level cutaway'));
      lens.append(visual);
      compare.append(overview, bridge, lens);
      modal.append(compare);
    } else modal.append(visual);

    let detail = null;
    if (located && !scope) {
      const section = el('div', 'plate-preview-detail');
      const subtitle = el('h3', '', 'Closer look near ' + name);
      const canvas = el('canvas');
      canvas.width = 800; canvas.height = 420;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Enlarged crop of the image near ' + name);
      section.append(subtitle, canvas);
      modal.append(section);
      detail = canvas;
    }
    modal.append(note);
    if (scope) {
      const href=trigger.dataset.sourceUrl;
      try {
        const sourceUrl=new URL(href);
        if (sourceUrl.protocol==='https:' && sourceUrl.hostname==='openstax.org' &&
            sourceUrl.pathname.startsWith('/books/anatomy-and-physiology-2e/pages/')) {
          const cite=el('a', 'plate-preview-reference', 'Read the anatomy reference ↗');
          cite.href=sourceUrl.href;cite.target='_blank';cite.rel='noopener noreferrer';
          modal.append(cite);
        }
      } catch(_) { /* Preview still works if a reference URL is removed. */ }
    }
    const link = trigger.dataset.referenceHref;
    if (link && /^\/learn\/[a-z0-9]+\/$/.test(link)) {
      const ref = el('a', 'plate-preview-reference', 'Read the focused anatomy guide →');
      ref.href = link;
      modal.append(ref);
    }
    document.body.append(modal);
    active = modal;
    const fit = () => {
      if (!image.naturalWidth || !modal.open) return;
      /* The old cap (56% of the viewport height) shrank tall plates to a narrow
         column and left the crop below the fold inside the dialog. */
      const available = scope
        ? Math.max(180, visual.parentElement.clientWidth)
        : Math.min(innerWidth - 44, 940);
      const heightBudget = located && !scope ? innerHeight * 0.52 : innerHeight * 0.64;
      const scale = Math.min(1, available / image.naturalWidth,
        Math.max(230, heightBudget) / image.naturalHeight);
      visual.style.width = Math.max(1, Math.round(image.naturalWidth * scale)) + 'px';
      visual.style.height = Math.max(1, Math.round(image.naturalHeight * scale)) + 'px';
    };
    const renderCrop = () => {
      if (!detail || !image.naturalWidth) return;
      const width = image.naturalWidth / 2.45;
      const height = Math.min(image.naturalHeight, width * (420 / 800));
      const sourceX = clamp(x / 1000 * image.naturalWidth - width / 2,
        0, image.naturalWidth - width);
      const sourceY = clamp(y / 1000 * image.naturalHeight - height / 2,
        0, image.naturalHeight - height);
      detail.getContext('2d').drawImage(image, sourceX, sourceY, width, height,
        0, 0, detail.width, detail.height);
    };
    image.addEventListener('load', () => { fit(); renderCrop(); }, {once:true});
    image.addEventListener('error', () => {
      note.textContent = 'This image could not be loaded. Close the preview and try again.';
    }, {once:true});
    modal.addEventListener('click', event => {
      if (event.target === modal || event.target.closest('.plate-preview-close, .plate-preview-visual'))
        modal.close();
    });
    modal.addEventListener('close', () => {
      removeEventListener('resize', fit);
      modal.remove();
      if (active === modal) active = null;
      if (trigger.isConnected) trigger.focus({preventScroll:true});
    }, {once:true});
    addEventListener('resize', fit);
    modal.showModal();
    if (image.complete && image.naturalWidth) { fit(); renderCrop(); }
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-plate-preview]');
    if (trigger) { event.preventDefault(); open(trigger); }
  });
})();
