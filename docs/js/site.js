/* ============================================================
   Silver Glass — site.js
   Injects the shared header and footer. Read by every page.

   A page sets two globals in <head>, before this file loads:
     window.SITE_ROOT     "../"  relative path back to the site root
     window.PAGE_SECTION  "lobby" the data-section to mark active
   ============================================================ */

(function () {
  'use strict';

  var SITE_ROOT = (typeof window.SITE_ROOT === 'string') ? window.SITE_ROOT : './';
  var PAGE_SECTION = (typeof window.PAGE_SECTION === 'string') ? window.PAGE_SECTION : '';

  var headerMount = document.getElementById('site-header');
  var footerMount = document.getElementById('site-footer');

  /* ---- {{ROOT}} ------------------------------------------------ */

  function resolve(template) {
    return template.replace(/\{\{ROOT\}\}/g, SITE_ROOT);
  }

  /* ---- Chrome -------------------------------------------------- */

  function load(path, mount, after) {
    if (!mount) return; // a page with no mount point is not an error
    fetch(SITE_ROOT + path)
      .then(function (r) {
        if (!r.ok) throw new Error(path + ' -> ' + r.status);
        return r.text();
      })
      .then(function (html) {
        mount.innerHTML = resolve(html);
        if (after) after(mount);
      })
      .catch(function (err) {
        // A chrome failure must not take the page content with it.
        if (window.console) console.warn('[site.js] could not load ' + path, err);
      });
  }

  function markActive(scope) {
    var links = scope.querySelectorAll('[data-section]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-section') === PAGE_SECTION) {
        links[i].classList.add('is-active');
        links[i].setAttribute('aria-current', 'page');
      }
    }
  }

  /* ---- Mobile navigation --------------------------------------- */

  function wireToggle(scope) {
    var toggle = scope.querySelector('.nav__toggle');
    var links = scope.querySelector('.nav__links');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    }

    setOpen(false);

    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('is-open'));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---- Favicon -------------------------------------------------
     Injected as an inline data URI. No network request, no icon
     file to keep in sync with the palette.
     ------------------------------------------------------------ */

  var FAVICON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
    '<rect width="32" height="32" rx="8" fill="%235b7189"/>' +
    '<path d="M16 7l7 4v6c0 4.2-2.9 7.4-7 8.4-4.1-1-7-4.2-7-8.4v-6z" fill="%23ffffff" fill-opacity=".92"/>' +
    '</svg>';

  function setFavicon() {
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + FAVICON;
    document.head.appendChild(link);
  }

  /* ---- Year ---------------------------------------------------- */

  function stampYear(scope) {
    var el = scope.querySelector('[data-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---- Go ------------------------------------------------------ */

  setFavicon();
  load('partials/header.html', headerMount, function (scope) {
    markActive(scope);
    wireToggle(scope);
  });
  load('partials/footer.html', footerMount, stampYear);
})();
