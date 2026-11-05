/* ============================================================
   CORPUS — Corpus AI chatbot loader
   ------------------------------------------------------------
   corpus-bot.js (~146 KB) and corpus-bot.css are only needed once the
   assistant is actually on screen. Keeping them out of the critical path
   means the atlas shell paints without waiting for chat code, and neither
   file is downloaded at all if a visitor has JavaScript disabled.

   The chatbot itself is unchanged: this loads the same script on the same
   page, it still builds its own launcher/avatar/board, still fetches
   bot-knowledge.json on the first question, and still talks to the same
   Netlify function. The stylesheet is applied before the script runs so the
   widget can never appear unstyled.

   Triggers: the first idle moment after this deferred script runs (backed by
   a timeout), or the first scroll / tap / key press, whichever comes first.
   ============================================================ */
(function () {
  'use strict';

  var BOT_VERSION = '20';
  var CSS_VERSION = '18';
  var started = false;

  function resolve(name) {
    var self = document.currentScript;
    if (!self) {
      var tags = document.querySelectorAll('script[src*="bot-loader.js"]');
      self = tags.length ? tags[tags.length - 1] : null;
    }
    var src = self && self.src ? self.src : '';
    if (src) return src.replace(/bot-loader\.js(\?[^/?#]*)?(#.*)?$/, name);
    return name;
  }

  function loadStylesheet(done) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = resolve('corpus-bot.css?v=' + CSS_VERSION);
    link.onload = done;
    link.onerror = done; /* never block the assistant on a missing stylesheet */
    (document.head || document.documentElement).appendChild(link);
  }

  function loadScript() {
    if (window.__CORPUS_BOT_LOADED__) return;
    var script = document.createElement('script');
    script.src = resolve('corpus-bot.js?v=' + BOT_VERSION);
    script.async = true;
    script.defer = true;
    script.setAttribute('data-corpus-bot-loader', '1');
    (document.head || document.documentElement).appendChild(script);
  }

  function load() {
    if (started) return;
    started = true;
    loadStylesheet(loadScript);
    /* safety net: if the stylesheet stalls, start the widget anyway */
    setTimeout(loadScript, 1500);
  }

  function whenIdle() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 1200 });
    } else {
      setTimeout(load, 600);
    }
  }

  whenIdle();
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (type) {
    window.addEventListener(type, load, { once: true, passive: true });
  });
})();
