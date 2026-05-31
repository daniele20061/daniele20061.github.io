/* ═══════════════════════════════════════════
    MONTHLY CALENDAR WIDGET + TIME SLOTS
    Full month view, navigable, 20-min time blocks
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
    var slotsContainer = document.getElementById('time-slots-container');
    var slotsGrid = document.getElementById('time-slots-grid');
    if (!labelEl || !daysEl || !prevBtn || !nextBtn) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var selectedDate = null;
    var selectedTime = null;
    var occupiedSlots = null;

    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
      return new Date(year, month, 1).getDay();
    }

    function formatTime(h, m) {
      return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    }

    function dateStr(d) {
      if (!d) return '';
      var y = d.getFullYear();
      var m = (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1);
      var day = (d.getDate() < 10 ? '0' : '') + d.getDate();
      return day + '/' + m + '/' + y;
    }

    function fetchOccupiedSlots() {
      var url = 'https://script.google.com/macros/s/AKfycbyvFEI6Z7VIjCIJpfs71eSoGzLrfk79Q6wz4RJFEitp9xIYM6M5e73Ntf-G8tfrYCQ/exec';
      return fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          occupiedSlots = {};
          data.forEach(function(slot) {
            occupiedSlots[slot.data + '|' + slot.orario] = true;
          });
        })
        .catch(function(err) {
          console.warn('Impossibile recuperare gli slot occupati:', err);
        });
    }

    function generateTimeSlots() {
      var slots = [];
      // 9:00 - 11:00 (20 min intervals)
      for (var h = 9; h < 11; h++) {
        for (var m = 0; m < 60; m += 20) {
          slots.push({ h: h, m: m });
        }
      }
      // 17:00 - 19:00 (20 min intervals)
      for (var h = 17; h < 19; h++) {
        for (var m = 0; m < 60; m += 20) {
          slots.push({ h: h, m: m });
        }
      }
      return slots;
    }

    function renderTimeSlots() {
      if (!slotsContainer || !slotsGrid || !selectedDate) return;

      var now = new Date();
      slotsGrid.innerHTML = '';
      var slots = generateTimeSlots();

      slots.forEach(function(slot) {
        var btn = document.createElement('button');
        var label = formatTime(slot.h, slot.m);
        btn.textContent = label;
        btn.className = 'py-2 px-3 text-xs font-semibold rounded-lg border border-surface-variant/30 bg-white text-on-surface transition-all hover:border-primary hover:bg-surface-container';

        var isPast = false;
        if (selectedDate.getTime() === today.getTime()) {
          var slotDate = new Date();
          slotDate.setHours(slot.h, slot.m, 0, 0);
          if (slotDate <= now) isPast = true;
        }

        var isOccupied = occupiedSlots && occupiedSlots[dateStr(selectedDate) + '|' + label] === true;

        if (isPast || isOccupied) {
          btn.className += ' opacity-25 cursor-not-allowed';
          if (isOccupied) btn.title = 'Già prenotato';
        } else {
          if (selectedTime && selectedTime.h === slot.h && selectedTime.m === slot.m) {
            btn.className += ' border-primary bg-surface-container';
          }
          (function(s) {
            btn.addEventListener('click', function() {
              selectedTime = s;
              renderTimeSlots();
              updateSelectionInfo();
            });
          })(slot);
        }

        slotsGrid.appendChild(btn);
      });

      slotsContainer.classList.remove('hidden');
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
          var html = '<span class="font-semibold text-primary">' + day + ' ' + MESES[month] + ' ' + year + '</span>';
          if (selectedTime) {
            html += ' alle <span class="font-semibold text-primary">' + formatTime(selectedTime.h, selectedTime.m) + '</span>';
          }
          selectionInfoEl.innerHTML = html + ' selezionato';
        } else {
          selectionInfoEl.innerHTML = 'Nessuna data selezionata';
        }
      }
    }

    function renderWeekdayHeaders() {
      var weekdayHeaderEl = document.getElementById('calendar-weekdays');
      if (!weekdayHeaderEl) return;
      weekdayHeaderEl.innerHTML = '';
      GIORNI_SETTIMANA.forEach(function(giorno) {
        var div = document.createElement('div');
        div.className = 'text-center py-2 text-xs font-bold text-outline';
        div.textContent = giorno;
        weekdayHeaderEl.appendChild(div);
      });
    }

    function showLoading() {
      daysEl.innerHTML = '';
      var loadingDiv = document.createElement('div');
      loadingDiv.className = 'col-span-7 text-center py-8 text-sm text-primary/60';
      loadingDiv.textContent = 'Caricando disponibilità…';
      daysEl.appendChild(loadingDiv);
      if (slotsContainer) slotsContainer.classList.add('hidden');
      selectedTime = null;
      updateSelectionInfo();
    }

    function renderDays(year, month) {
      renderWeekdayHeaders();
      
      daysEl.innerHTML = '';
      if (slotsContainer) slotsContainer.classList.add('hidden');
      selectedTime = null;

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
              selectedTime = null;
              renderDays(year, month);
              updateSelectionInfo();
              renderTimeSlots();
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
      renderWeekdayHeaders();
      showLoading();
      updateSelectionInfo();
      updateButtons();
    }

    window.__prenotazioneData = {
      get date() { return selectedDate; },
      get time() { return selectedTime; },
      get dateStr() { return dateStr(selectedDate); },
      get timeStr() {
        if (!selectedTime) return '';
        return formatTime(selectedTime.h, selectedTime.m);
      }
    };

    initialRender();

    fetchOccupiedSlots().then(function() {
      var year = displayedMonth.getFullYear();
      var month = displayedMonth.getMonth();
      renderDays(year, month);
    });

    prevBtn.addEventListener('click', function() { navigate(-1); });
    nextBtn.addEventListener('click', function() { navigate(1); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();