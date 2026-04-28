/* ═══════════════════════════════════════════
    MONTHLY CALENDAR WIDGET
    Full month view, navigable, today highlighted
    ═══════════════════════════════════════════ */
(function monthlyCalendarWidget() {
  var MESES = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  var GIORNI_SETTIMANA = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  function init() {
    var labelEl = document.getElementById('calendar-month-label');
    var daysEl = document.getElementById('calendar-days');
    var prevBtn = document.getElementById('cal-prev');
    var nextBtn = document.getElementById('cal-next');
    var selectionInfoEl = document.getElementById('calendar-selection-info');
    if (!labelEl || !daysEl || !prevBtn || !nextBtn) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var selectedDate = new Date(today); // Pre-select today by default

    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
      return new Date(year, month, 1).getDay(); // 0 = Domenica, 1 = Lunedì, etc.
    }

    function updateButtons() {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }

    function updateSelectionInfo() {
      if (selectionInfoEl) {
        if (selectedDate) {
          var day = selectedDate.getDate();
          var month = selectedDate.getMonth();
          var year = selectedDate.getFullYear();
          selectionInfoEl.innerHTML = '<span class="font-semibold text-primary">' + day + ' ' + MESES[month] + ' ' + year + '</span> selezionato';
        } else {
          selectionInfoEl.innerHTML = 'Nessuna data selezionata';
        }
      }
    }

    function renderDays(year, month) {
      var weekdayHeaderEl = document.getElementById('calendar-weekdays');
      if (weekdayHeaderEl) {
        weekdayHeaderEl.innerHTML = '';
        GIORNI_SETTIMANA.forEach(function(giorno) {
          var div = document.createElement('div');
          div.className = 'text-center py-2 text-xs font-bold text-outline';
          div.textContent = giorno;
          weekdayHeaderEl.appendChild(div);
        });
      }
      
      daysEl.innerHTML = '';

      var daysInMonth = getDaysInMonth(year, month);
      var firstDayIndex = getFirstDayOfMonth(year, month);
      
      for (var i = 0; i < firstDayIndex; i++) {
        var div = document.createElement('div');
        div.className = 'text-center py-3 text-sm rounded-lg opacity-0';
        div.textContent = '';
        daysEl.appendChild(div);
      }
      
      for (var day = 1; day <= daysInMonth; day++) {
        var currentDate = new Date(year, month, day);
        currentDate.setHours(0, 0, 0, 0);
        var isToday = currentDate.getTime() === today.getTime();
        var isSelected = selectedDate && currentDate.getTime() === selectedDate.getTime();
        var isPast = currentDate < today;

        var div = document.createElement('div');
        div.className = 'text-center py-3 text-sm rounded-lg transition-all cursor-pointer hover:bg-surface-container';
        div.textContent = day;

        if (isPast) {
          div.className += ' opacity-20 cursor-not-allowed';
        } else if (isSelected) {
          div.className += ' font-bold bg-primary text-white border border-primary';
        }

        if (!isPast) {
          (function(date) {
            div.addEventListener('click', function() {
              selectedDate = new Date(date);
              renderDays(year, month);
              updateSelectionInfo();
            });
          })(currentDate);
        }

        daysEl.appendChild(div);
      }
      
      var totalCells = firstDayIndex + daysInMonth;
      var remainingCells = (Math.ceil(totalCells / 7) * 7) - totalCells;
      for (var i = 0; i < remainingCells; i++) {
        var div = document.createElement('div');
        div.className = 'text-center py-3 text-sm rounded-lg opacity-0';
        div.textContent = '';
        daysEl.appendChild(div);
      }
    }

    function updateLabel(year, month) {
      labelEl.textContent = MESES[month] + ' ' + year;
    }

    function navigate(direction) {
      if (direction === -1) {
        displayedMonth.setMonth(displayedMonth.getMonth() - 1);
      } else {
        displayedMonth.setMonth(displayedMonth.getMonth() + 1);
      }
      
      var year = displayedMonth.getFullYear();
      var month = displayedMonth.getMonth();
      
      daysEl.style.transition = 'opacity 0.12s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      daysEl.style.opacity = '0';
      daysEl.style.transform = 'translateY(10px)';

      setTimeout(function() {
        updateLabel(year, month);
        renderDays(year, month);
        void daysEl.offsetHeight;
        daysEl.style.transition = 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        daysEl.style.transform = 'translateY(0)';
        daysEl.style.opacity = '0';
        void daysEl.offsetHeight;
        requestAnimationFrame(function() {
          daysEl.style.opacity = '1';
          daysEl.style.transform = 'translateY(0)';
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
      var year = displayedMonth.getFullYear();
      var month = displayedMonth.getMonth();
      updateLabel(year, month);
      renderDays(year, month);
      updateSelectionInfo();
      updateButtons();
    }

    prevBtn.addEventListener('click', function() { navigate(-1); });
    nextBtn.addEventListener('click', function() { navigate(1); });

    initialRender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();