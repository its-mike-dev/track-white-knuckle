/* SISYPHUS // 15 — minimal page script: copy links, missing screenshot slots,
   and hiding the link slots the author has not filled in yet. */
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

  /* "copy" links next to the plugins path, the checksum and the wallets */
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
      var joinSel = a.getAttribute('data-copy-join');
      if (!text && joinSel) {
        text = joinSel.split(',').map(function (sel) {
          var n = document.querySelector(sel.trim());
          return n ? n.textContent.trim() : '';
        }).filter(Boolean).join('\n');
      } else if (!text) {
        var node = document.querySelector(a.getAttribute('data-copy-from') || '');
        text = node ? node.textContent.trim() : '';
      }
      if (!text) return;
      copy(text);
      var orig = a.getAttribute('data-label') || a.textContent;
      a.setAttribute('data-label', orig);
      a.textContent = 'copied';
      setTimeout(function () { a.textContent = orig; }, 1200);
    });
  });

  /* a placeholder link (still href="#") hides its slot — the row or the inline span
     marked class="slot" — so an unfilled link never shows up as a dead link */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-link]'), function (a) {
    if (a.getAttribute('href') !== '#') return;
    var slot = a.closest ? a.closest('.slot') : null;
    (slot || a).className = 'unset';
  });

  /* if nothing at all is left in the optional block, drop the block itself */
  (function () {
    var table = document.getElementById('optional-table');
    var block = document.getElementById('optional');
    if (!table || !block) return;
    var rows = table.querySelectorAll('tr');
    var shown = 0;
    Array.prototype.forEach.call(rows, function (tr) {
      if (tr.className.indexOf('unset') === -1) shown++;
    });
    if (!shown) block.className = 'unset';
  })();
})();
