/* ══════════════════════════════════════════
   SITE COMPONENTS — Footer only
   Navbar is handled by js/navbar.js
   Works on file:// (no server needed)
   ══════════════════════════════════════════ */

(function SiteComponents() {
  function getFooter() {
    return '<footer class="bg-slate-50 border-t border-slate-200">\n' +
      '  <div class="max-w-7xl mx-auto px-8 py-20">\n' +
      '    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">\n' +
      '      <div class="md:col-span-1">\n' +
      '        <div class="font-headline font-bold text-2xl text-slate-900 mb-6">Ilaria Dammicco</div>\n' +
      '        <p class="text-sm text-slate-500 mb-8 leading-relaxed">Psicologia della performance tra sport e lavoro.\nTrasformo stress e pressione in strumenti di crescita e risultato.</p>\n' +
      '        <div class="flex gap-4">\n' +
      '          <a class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="https://www.linkedin.com/in/ilaria-dammicco-b639a7195/" target="_blank" rel="noopener noreferrer">\n' +
      '            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.61c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28z"/></svg>\n' +
      '          </a>\n' +
      '          <a class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" href="https://www.instagram.com/ilaria_dammicco/" target="_blank" rel="noopener noreferrer">\n' +
      '            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072C2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.766 6.97 6.966 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.351-.2 6.764-2.612 6.965-6.966.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.612-6.766-6.97-6.966C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>\n' +
      '          </a>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '      <div class="md:col-span-1">\n' +
      '        <h4 class="font-headline font-bold text-slate-900 mb-6">Pagine</h4>\n' +
      '        <ul class="space-y-4 font-inter text-sm text-slate-500">\n' +
      '          <li><a class="hover:text-primary transition-colors" href="percorsi.html">Aree di Intervento</a></li>\n' +
      '          <li><a class="hover:text-primary transition-colors" href="chi-sono.html">Chi Sono</a></li>\n' +
      '          <li><a class="hover:text-primary transition-colors" href="contatti.html">Contatti</a></li>\n' +
      '        </ul>\n' +
      '      </div>\n' +
      '      <div class="md:col-span-1">\n' +
      '        <h4 class="font-headline font-bold text-slate-900 mb-6">Legale</h4>\n' +
      '        <ul class="space-y-4 font-inter text-sm text-slate-500">\n' +
      '          <li><a class="hover:text-primary transition-colors" href="privacy-policy.html">Privacy Policy</a></li>\n' +
      '          <li><a class="hover:text-primary transition-colors" href="cookie-policy.html">Cookie Policy</a></li>\n' +
      '          <li><a class="hover:text-primary transition-colors" href="termini-e-condizioni.html">Termini e Condizioni</a></li>\n' +
      '        </ul>\n' +
      '      </div>\n' +
      '      <div class="md:col-span-1">\n' +
      '        <h4 class="font-headline font-bold text-slate-900 mb-6">Newsletter</h4>\n' +
'        <p class="text-xs text-slate-500 mb-4">Ricevi approfondimenti, strumenti e riflessioni sulla mente in azione: nello sport, nel lavoro, nella vita.</p>\n' +
       '        <div class="space-y-3">\n' +
       '          <input class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="latua@email.it" type="email"/>\n' +
       '          <button class="w-full py-3 bg-slate-900 text-white rounded-xl font-headline font-bold text-sm hover:bg-slate-800 transition-all">Ricevi i prossimi contenuti</button>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">\n' +
      '      <p class="font-inter text-xs text-slate-500">© 2024 Ilaria Dammicco. Psicologa del Lavoro e dello Sport. P.IVA 1234567890</p>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</footer>';
  }

  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.insertAdjacentHTML('beforebegin', getFooter());
    footerEl.remove();
  }
})();
