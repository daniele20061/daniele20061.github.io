/* ══════════════════════════════════════════
   DYNAMIC CALENDAR WIDGET
   Current week, navigable, today highlighted
   ══════════════════════════════════════════ */
(function calendarWidget() {
  var MESES = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];

  function init() {
    var labelEl = document.getElementById('calendar-month-label');
    var daysEl = document.getElementById('calendar-days');
    var prevBtn = document.getElementById('cal-prev');
    var nextBtn = document.getElementById('cal-next');
    if (!labelEl || !daysEl || !prevBtn || !nextBtn) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var weekOffset = 0;
    var selectedDate = new Date(today);

    function getMonday(d) {
      var day = d.getDay();
      var diff = (day === 0 ? -6 : 1) - day;
      var mon = new Date(d);
      mon.setDate(d.getDate() + diff);
      mon.setHours(0, 0, 0, 0);
      return mon;
    }

    function updateButtons() {
      prevBtn.style.opacity = (weekOffset <= 0) ? '0.3' : '1';
      prevBtn.style.pointerEvents = (weekOffset <= 0) ? 'none' : 'auto';
    }

    function renderDays(monday) {
      daysEl.innerHTML = '';
      for (var i = 0; i < 7; i++) {
        var day = new Date(monday);
        day.setDate(monday.getDate() + i);
        var isPast = day < today;
        var isSelected = day.getTime() === selectedDate.getTime();

        var div = document.createElement('div');
        div.className = 'text-center py-3 text-sm rounded-lg transition-all';
        div.textContent = day.getDate();

        if (isPast) {
          div.className += ' opacity-20 cursor-not-allowed';
        } else if (isSelected) {
          div.className += ' font-bold bg-primary/10 text-primary cursor-pointer border border-primary/20';
        } else {
          div.className += ' font-bold cursor-pointer hover:bg-surface-container';
        }

        if (!isPast) {
          (function(d) {
            div.addEventListener('click', function() {
              selectedDate = new Date(d);
              var currentMonday = getMonday(today);
              currentMonday.setDate(currentMonday.getDate() + weekOffset * 7);
              renderDays(currentMonday);
              updateButtons();
            });
          })(day);
        }

        daysEl.appendChild(div);
      }
    }

    function updateLabel(monday) {
      var sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      var m1 = monday.getMonth();
      var m2 = sunday.getMonth();
      var y = monday.getFullYear();
      labelEl.textContent = (m1 === m2) ? MESES[m1] + ' ' + y : MESES[m1] + '-' + MESES[m2] + ' ' + y;
    }

    function navigate(direction) {
      var monday = getMonday(today);
      monday.setDate(monday.getDate() + weekOffset * 7);
      updateLabel(monday);

      var slideOut = direction > 0 ? '-12px' : '12px';
      var slideIn = direction > 0 ? '12px' : '-12px';

      daysEl.style.transition = 'opacity 0.12s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      daysEl.style.opacity = '0';
      daysEl.style.transform = 'translateX(' + slideOut + ')';

      setTimeout(function() {
        var newMonday = getMonday(today);
        newMonday.setDate(newMonday.getDate() + weekOffset * 7);
        renderDays(newMonday);
        // Force reflow
        void daysEl.offsetHeight;
        daysEl.style.transition = 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        daysEl.style.transform = 'translateX(' + slideIn + ')';
        daysEl.style.opacity = '0';
        void daysEl.offsetHeight;
        requestAnimationFrame(function() {
          daysEl.style.opacity = '1';
          daysEl.style.transform = 'translateX(0)';
        });
        setTimeout(function() {
          daysEl.style.transition = '';
          daysEl.style.transform = '';
          daysEl.style.opacity = '';
        }, 280);
      }, 130);

      updateButtons();
    }

    function initialRender() {
      var monday = getMonday(today);
      monday.setDate(monday.getDate() + weekOffset * 7);
      updateLabel(monday);
      renderDays(monday);
      updateButtons();
    }

    prevBtn.addEventListener('click', function() { weekOffset--; navigate(-1); });
    nextBtn.addEventListener('click', function() { weekOffset++; navigate(1); });

    initialRender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
