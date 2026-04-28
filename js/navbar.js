/* ══════════════════════════════════════════
   NAVBAR — Copiacodice style
   Dark, transparent→dark on scroll, scroll-aware
   ══════════════════════════════════════════ */
(function Navbar() {
  var NAV_HTML =
    '<nav id="site-nav">' +
      '<a href="index.html" class="nav-logo" style="all:unset;display:inline-flex;align-items:center;font-family:Manrope,sans-serif !important;font-weight:800 !important;font-size:15px !important;letter-spacing:0.12em !important;color:#fff !important;text-transform:uppercase !important;cursor:none !important;">Ilaria Dammicco</a>' +
      '<div class="nav-right">' +
        '<a class="nav-link" href="chi-sono.html">Chi Sono</a>' +
        '<a class="nav-link" href="percorsi.html">Percorsi</a>' +
        '<a class="nav-link" href="contatti.html">Contatti</a>' +
        '<button class="nav-btn" onclick="window.location.href=\'prenotazione.html\'">' +
          '<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="4" fill="white"/></svg>' +
          'Prenota' +
        '</button>' +
      '</div>' +
    '</nav>';

  var NAV_CSS =
    '#site-nav {' +
      'position: fixed; top: 0; left: 0; right: 0; z-index: 1000;' +
      'padding: 0 40px; height: 64px;' +
      'display: flex; align-items: center; justify-content: space-between;' +
      'background: rgba(15,23,42,0.0); backdrop-filter: blur(0px);' +
      'transition: all 0.4s ease;' +
    '}' +
    '#site-nav.scrolled {' +
      'background: rgba(15,23,42,0.92); backdrop-filter: blur(20px);' +
      'border-bottom: 1px solid rgba(141,1,198,0.2);' +
    '}' +
    'nav#site-nav a.nav-logo, nav#site-nav a.nav-logo:hover, nav#site-nav a.nav-logo:visited, nav#site-nav a.nav-logo:active {' +
      'font-family: "Manrope", sans-serif !important; font-weight: 800 !important; font-size: 15px !important;' +
      'letter-spacing: 0.12em !important; color: #fff !important; text-transform: uppercase !important;' +
      'text-decoration: none !important; text-decoration-line: none !important;' +
      'border-bottom: none !important; border: none !important; outline: none !important;' +
      'transition: opacity 0.2s !important; cursor: none !important;' +
    '}' +
    'nav#site-nav a.nav-logo:hover { opacity: 0.8 !important; }' +
    '.nav-right {' +
      'display: flex; align-items: center; gap: 8px;' +
    '}' +
    '.nav-link {' +
      'font-family: "Inter", sans-serif; font-size: 13px; font-weight: 500;' +
      'color: rgba(255,255,255,0.7); text-decoration: none;' +
      'padding: 9px 16px; border-radius: 100px;' +
      'transition: all 0.2s; letter-spacing: 0.04em;' +
    '}' +
    '.nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }' +
    '.nav-link.active {' +
      'color: #fff; font-weight: 600;' +
    '}' +
    '.nav-btn {' +
      'background: #8d01c6; color: white; border: none;' +
      'padding: 9px 20px; border-radius: 100px;' +
      'font-family: "Inter", sans-serif; font-size: 13px; font-weight: 600;' +
      'display: flex; align-items: center; gap: 6px;' +
      'transition: background 0.2s; cursor: pointer;' +
    '}' +
    '.nav-btn:hover { background: #7a01ad; }' +
    '@media (max-width: 768px) {' +
      '#site-nav { padding: 0 20px; }' +
      '.nav-link { display: none; }' +
    '}';

  // Inject CSS
  var styleEl = document.createElement('style');
  styleEl.textContent = NAV_CSS;
  document.head.appendChild(styleEl);

  // Inject HTML
  var placeholder = document.getElementById('site-header');
  if (placeholder) {
    var activePage = placeholder.getAttribute('data-active') || '';
    placeholder.insertAdjacentHTML('afterend', NAV_HTML);
    placeholder.remove();

    // Mark active link
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Scroll handler
  var nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }
})();
