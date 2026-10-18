/* Progressive reading indicator: decorative, no tracking or external requests. */
(() => {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  let scheduled = false;
  function update() {
    const total = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / total))})`;
    scheduled = false;
  }
  function queue() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', queue, {passive:true});
  update();
})();
