/* TRACK — minimal page script: copy links + missing screenshot slots. */
(function () {
  'use strict';

  /* screenshots that are not uploaded yet show a plain placeholder */
  Array.prototype.forEach.call(document.querySelectorAll('ul.shots li'), function (li) {
    var img = li.querySelector('img');
    if (!img) return;
    function missing() { li.className = 'missing'; }
    if (img.complete) { if (!img.naturalWidth) missing(); }
    else { img.addEventListener('error', missing); }
  });

  /* "copy" links next to the plugins path and the checksum */
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.parentNode.removeChild(ta);
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('a.copy'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var text = a.getAttribute('data-copy');
      if (!text) {
        var node = document.querySelector(a.getAttribute('data-copy-from') || '');
        text = node ? node.textContent.trim() : '';
      }
      if (!text) return;
      copy(text);
      a.textContent = 'copied';
      setTimeout(function () { a.textContent = 'copy'; }, 1200);
    });
  });

  /* support rows: a row whose address is still the "…" placeholder (or whose link is
     still href="#") is hidden; if none of them is filled in, the section goes away too */
  (function () {
    var rows = document.querySelectorAll('#support-table tr');
    if (!rows.length) return;
    var hidden = 0;
    Array.prototype.forEach.call(rows, function (tr) {
      var code = tr.querySelector('code[data-field]');
      var link = tr.querySelector('a[data-link]');
      var unset = (code && code.textContent.indexOf('…') !== -1) ||
                  (link && link.getAttribute('href') === '#');
      if (unset) {
        tr.className = 'unset';
        hidden++;
      }
    });
    if (hidden < rows.length) return;
    ['support', 'support-intro', 'support-table'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.className = 'unset';
    });
    var nav = document.querySelector('#archnavbarlist a[href="#support"]');
    if (nav && nav.parentNode) nav.parentNode.className = 'unset';
  })();

  /* placeholder links do nothing until the author fills them in */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-link]'), function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') === '#') e.preventDefault();
    });
  });
})();
