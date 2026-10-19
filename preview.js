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
    const image = el('img'); image.alt = located
      ? `Realistic anatomy image highlighting the approximate region of ${name}`
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

    const note = el('p', 'plate-preview-note', located
      ? 'Tap the image to close. The line points to an approximate visible region, not a clinical localization.'
      : 'Tap the image to close. This is a regional reference plate: this deeper or microscopic structure is not separately visible.');
    modal.append(close, title, visual);

    let detail = null;
    if (located) {
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
    document.body.append(modal);
    active = modal;
    const fit = () => {
      if (!image.naturalWidth || !modal.open) return;
      const scale = Math.min(1, (innerWidth - 44) / image.naturalWidth,
        Math.max(230, innerHeight * 0.56) / image.naturalHeight);
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
