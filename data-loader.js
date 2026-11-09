/* Corpus — deferred data bootstrap.
 *
 * The anatomy datasets (organs.js, part-pins.js, the chapter enrichments …) and
 * app.js are what render everything *below* the static hero. On a phone that is
 * ~1.3 MB of JavaScript, and executing it on the main thread used to hold up the
 * very first paint (measured: 3.0 s FCP on a 4x-throttled mobile profile even
 * though the hero is plain HTML).
 *
 * So the files are requested only *after* the browser has committed its first
 * frame: they still download in parallel (async=false below keeps the execution
 * order identical to the old <script defer> list), but parsing/executing them can
 * no longer delay the first contentful paint or the LCP element.
 *
 * Order matters: img-dims.js → datasets → app.js (which reads them) → preview.js.
 */
(function () {
  "use strict";

  var FILES = [
    "img-dims.js?v=1",
    "organs.js?v=39",
    "brain-and-micro-chapters.js?v=33",
    "deep-chapters.js?v=33",
    "part-enrichment-notes.js?v=33",
    "chapter-enrichment.js?v=38",
    "muscle-atlas.js?v=33",
    "skull-chapter.js?v=40",
    "dental-chapter.js?v=42",
    "foundations-chapters.js?v=46",
    "reproduction-stages.js?v=48",
    "repro-image-enrichment.js?v=48",
    "micro-lens.js?v=64",
    "part-pins.js?v=69",
    "app.js?v=80",
    "preview.js?v=65"
  ];

  var started = false;

  function start() {
    if (started) return;
    started = true;
    var host = document.head || document.documentElement;
    for (var i = 0; i < FILES.length; i++) {
      var script = document.createElement("script");
      script.src = FILES[i];
      /* Dynamically inserted + async=false: the browser downloads them in
         parallel but executes them in this exact order. */
      script.async = false;
      host.appendChild(script);
    }
  }

  if (window.requestAnimationFrame) {
    requestAnimationFrame(function () { requestAnimationFrame(start); });
    /* Background tabs can starve rAF forever — never leave the page unhydrated. */
    window.addEventListener("load", start, { once: true });
  } else {
    setTimeout(start, 50);
  }
})();
