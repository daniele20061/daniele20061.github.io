(function QuestionnaireModal() {
  'use strict';

  var CATEGORIES = {
    azienda: 'Azienda / Organizzazione',
    societa: 'Società Sportiva',
    atleta: 'Atleta',
    lavoratore: 'Lavoratore / Professionista'
  };

  var QUESTIONS = {
    category: {
      id: 'category',
      type: 'choice',
      question: 'In quale categoria ti identifichi maggiormente?',
      options: [
        { value: 'azienda', label: 'Azienda / Organizzazione' },
        { value: 'societa', label: 'Società Sportiva' },
        { value: 'atleta', label: 'Atleta' },
        { value: 'lavoratore', label: 'Lavoratore / Professionista' }
      ]
    },
    categories: {
      azienda: [
        {
          id: 'azienda-obiettivo',
          type: 'choice',
          question: "Qual è l'obiettivo principale della richiesta?",
          options: [
            { value: 'formazione', label: 'Formazione' },
            { value: 'team-building', label: 'Team building' },
            { value: 'gestione-stress', label: 'Gestione dello stress' },
            { value: 'leadership', label: 'Sviluppo leadership' },
            { value: 'assessment', label: 'Assessment / selezione' },
            { value: 'altro', label: 'Altro' }
          ]
        },
        {
          id: 'azienda-difficolta',
          type: 'text',
          question: 'Quali difficoltà state riscontrando attualmente?'
        },
        {
          id: 'azienda-rivolto',
          type: 'choice',
          question: 'A chi è rivolto l\'intervento?',
          options: [
            { value: 'team', label: 'Team specifico' },
            { value: 'manager', label: 'Manager / leadership' },
            { value: 'tutta-azienda', label: 'Tutta l\'azienda' }
          ]
        },
        {
          id: 'azienda-tempistiche',
          type: 'choice',
          question: 'Tempistiche desiderate per l\'intervento',
          options: [
            { value: 'urgente', label: 'Urgente' },
            { value: '1-mese', label: 'Entro 1 mese' },
            { value: '3-mesi', label: 'Entro 3 mesi' },
            { value: 'da-definire', label: 'Da definire' }
          ]
        }
      ],
      societa: [
        {
          id: 'societa-sport',
          type: 'text',
          question: 'Di che sport si tratta?'
        },
        {
          id: 'societa-livello',
          type: 'choice',
          question: 'Categoria / livello della squadra',
          options: [
            { value: 'giovanile', label: 'Giovanile' },
            { value: 'dilettantistico', label: 'Dilettantistico' },
            { value: 'semipro', label: 'Semiprofessionistico' },
            { value: 'professionistico', label: 'Professionistico' }
          ]
        },
        {
          id: 'societa-focalizzato',
          type: 'choice',
          question: 'Su chi è focalizzato l\'intervento?',
          options: [
            { value: 'squadra', label: 'Squadra' },
            { value: 'staff', label: 'Staff' },
            { value: 'allenatori', label: 'Allenatori' },
            { value: 'tutto-sistema', label: 'Tutto il sistema' }
          ]
        },
        {
          id: 'societa-difficolta',
          type: 'choice',
          question: 'Qual è la principale difficoltà?',
          options: [
            { value: 'pressione', label: 'Gestione della pressione' },
            { value: 'calo-performance', label: 'Calo di performance' },
            { value: 'problemi-squadra', label: 'Problemi di squadra' },
            { value: 'comunicazione', label: 'Comunicazione' },
            { value: 'motivazione', label: 'Motivazione' },
            { value: 'altro', label: 'Altro' }
          ]
        }
      ],
      atleta: [
        {
          id: 'atleta-sport',
          type: 'text',
          question: 'Che sport pratichi?'
        },
        {
          id: 'atleta-livello',
          type: 'choice',
          question: 'Livello',
          options: [
            { value: 'amatoriale', label: 'Amatoriale' },
            { value: 'agonistico', label: 'Agonistico' },
            { value: 'alto-livello', label: 'Alto livello' }
          ]
        },
        {
          id: 'atleta-difficolta',
          type: 'choice',
          question: 'Qual è la difficoltà principale che stai vivendo?',
          options: [
            { value: 'ansia-pre-gara', label: 'Ansia pre-gara' },
            { value: 'calo-concentrazione', label: 'Calo di concentrazione' },
            { value: 'gestione-errore', label: 'Gestione errore' },
            { value: 'autostima', label: 'Autostima' },
            { value: 'pressione', label: 'Pressione' },
            { value: 'altro', label: 'Altro' }
          ]
        },
        {
          id: 'atleta-quando',
          type: 'text',
          question: 'In quali momenti senti di più questa difficoltà?'
        },
        {
          id: 'atleta-gia-lavorato',
          type: 'choice',
          question: 'Ti è già capitato di lavorare su questi aspetti?',
          options: [
            { value: 'si', label: 'Sì' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'atleta-migliorare',
          type: 'text',
          question: 'Cosa vorresti migliorare concretamente?'
        },
        {
          id: 'atleta-obiettivi',
          type: 'text',
          question: 'Hai obiettivi sportivi specifici nei prossimi mesi?'
        }
      ],
      lavoratore: [
        {
          id: 'lavoratore-ambito',
          type: 'text',
          question: 'In che ambito lavori?'
        },
        {
          id: 'lavoratore-difficolta',
          type: 'choice',
          question: 'Qual è la tua principale difficoltà in questo momento?',
          options: [
            { value: 'stress', label: 'Stress lavorativo' },
            { value: 'tempo', label: 'Gestione del tempo' },
            { value: 'motivazione', label: 'Mancanza di motivazione' },
            { value: 'decisioni', label: 'Difficoltà decisionali' },
            { value: 'relazioni', label: 'Relazioni lavorative' },
            { value: 'altro', label: 'Altro' }
          ]
        },
        {
          id: 'lavoratore-influenza',
          type: 'choice',
          question: 'Questa difficoltà influisce su?',
          options: [
            { value: 'performance', label: 'Performance lavorativa' },
            { value: 'benessere', label: 'Benessere personale' },
            { value: 'entrambi', label: 'Entrambi' }
          ]
        },
        {
          id: 'lavoratore-da-quanto',
          type: 'choice',
          question: 'Da quanto tempo vivi questa situazione?',
          options: [
            { value: 'meno-1-mese', label: 'Meno di 1 mese' },
            { value: '1-3-mesi', label: '1–3 mesi' },
            { value: '3-6-mesi', label: '3–6 mesi' },
            { value: 'piu-6-mesi', label: 'Più di 6 mesi' }
          ]
        },
        {
          id: 'lavoratore-migliorare',
          type: 'text',
          question: 'Cosa vorresti migliorare nel concreto?'
        },
        {
          id: 'lavoratore-gia-fatto',
          type: 'choice',
          question: 'Hai già intrapreso percorsi simili?',
          options: [
            { value: 'si', label: 'Sì' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    contact: {
      id: 'contact',
      type: 'contact',
      question: 'Lascia i tuoi recapiti per essere ricontattato'
    },
    final: {
      id: 'final-note',
      type: 'text',
      question: 'C\'è qualcosa di importante che vuoi aggiungere prima del nostro incontro?'
    }
  };

  var state = {
    answers: {},
    steps: [],
    currentStep: 0
  };

  var elements = {};
  var triggerBtn = null;

  function init() {
    triggerBtn = document.getElementById('procedi-prenotazione');
    if (!triggerBtn) return;

    buildModalHTML();
    cacheElements();
    bindEvents();
  }

  function buildModalHTML() {
    var html =
      '<div class="questionnaire-overlay" id="questionnaire-overlay">' +
        '<div class="questionnaire-modal" role="dialog" aria-label="Questionario di prenotazione">' +
          '<button class="questionnaire-close" id="questionnaire-close" aria-label="Chiudi">' +
            '<span class="material-symbols-outlined">close</span>' +
          '</button>' +
          '<div class="questionnaire-header" id="questionnaire-header">' +
            '<div class="questionnaire-progress">' +
              '<div class="questionnaire-progress-bar"><span id="questionnaire-progress-fill"></span></div>' +
              '<span class="questionnaire-progress-label" id="questionnaire-progress-label">1/1</span>' +
            '</div>' +
          '</div>' +
          '<div class="questionnaire-body" id="questionnaire-body"></div>' +
          '<div class="questionnaire-footer" id="questionnaire-footer">' +
            '<button class="questionnaire-btn-back" id="questionnaire-btn-back">' +
              '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;margin-right:4px;">arrow_back</span>' +
              'Indietro' +
            '</button>' +
            '<button class="questionnaire-btn-next" id="questionnaire-btn-next">' +
              'Avanti' +
              '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;margin-left:4px;">arrow_forward</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);
  }

  function cacheElements() {
    elements.overlay = document.getElementById('questionnaire-overlay');
    elements.modal = elements.overlay.querySelector('.questionnaire-modal');
    elements.closeBtn = document.getElementById('questionnaire-close');
    elements.header = document.getElementById('questionnaire-header');
    elements.body = document.getElementById('questionnaire-body');
    elements.footer = document.getElementById('questionnaire-footer');
    elements.backBtn = document.getElementById('questionnaire-btn-back');
    elements.nextBtn = document.getElementById('questionnaire-btn-next');
    elements.progressFill = document.getElementById('questionnaire-progress-fill');
    elements.progressLabel = document.getElementById('questionnaire-progress-label');
  }

  function bindEvents() {
    triggerBtn.addEventListener('click', open);

    elements.closeBtn.addEventListener('click', close);
    elements.overlay.addEventListener('click', function(e) {
      if (e.target === elements.overlay) close();
    });

    elements.backBtn.addEventListener('click', goBack);
    elements.nextBtn.addEventListener('click', goNext);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && elements.overlay.classList.contains('active')) {
        close();
      }
    });
  }

  function open() {
    state.answers = {};
    state.currentStep = 0;
    state.steps = buildSteps();

    elements.header.style.display = '';
    elements.footer.style.display = '';
    elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderStep();
  }

  function close() {
    elements.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function buildSteps() {
    return [QUESTIONS.category, QUESTIONS.contact];
  }

  function reconstructSteps(category) {
    state.steps = [QUESTIONS.category, QUESTIONS.contact];
    if (category) {
      state.steps = state.steps.concat(QUESTIONS.categories[category]);
    }
    state.steps.push(QUESTIONS.final);
    state.currentStep = 0;
  }

  function renderStep() {
    var step = state.steps[state.currentStep];
    if (!step) return;

    var total = state.steps.length;
    var current = state.currentStep + 1;
    var pct = ((state.currentStep) / (total - 1)) * 100;

    elements.progressFill.style.width = pct + '%';
    elements.progressLabel.textContent = current + '/' + total;

    var isFirst = state.currentStep === 0;
    var isLast = state.currentStep === total - 1;
    var isCategoryStep = state.currentStep === 0 && state.steps[0] && state.steps[0].id === 'category';

    elements.backBtn.style.visibility = isFirst ? 'hidden' : 'visible';

    if (isCategoryStep) {
      elements.header.style.display = 'none';
      elements.body.classList.add('no-header');
      elements.nextBtn.style.display = 'none';
      hideConfirmButton();
    } else {
      elements.header.style.display = '';
      elements.body.classList.remove('no-header');
      if (isLast) {
        elements.nextBtn.style.display = 'none';
        showConfirmButton();
      } else {
        elements.nextBtn.style.display = '';
        hideConfirmButton();
      }
    }

    elements.body.innerHTML = '';
    var stepDiv = document.createElement('div');
    stepDiv.className = 'questionnaire-step';

    // Label
    if (state.currentStep === 0) {
      stepDiv.innerHTML += '<div class="questionnaire-step-label">Categoria</div>';
    } else if (step.id === 'contact') {
      stepDiv.innerHTML += '<div class="questionnaire-step-label">Contatti</div>';
    } else if (state.currentStep === total - 1) {
      stepDiv.innerHTML += '<div class="questionnaire-step-label">Ultimo passo</div>';
    } else {
      stepDiv.innerHTML += '<div class="questionnaire-step-label">Passo ' + current + '</div>';
    }

    // Question
    stepDiv.innerHTML += '<div class="questionnaire-question">' + step.question + '</div>';

    // Input
    if (step.type === 'contact') {
      var fields = [
        { id: 'contact-nome', label: 'Nome e Cognome', type: 'text', placeholder: 'Mario Rossi' },
        { id: 'contact-email', label: 'Email', type: 'email', placeholder: 'mario@email.com' },
        { id: 'contact-telefono', label: 'Telefono', type: 'tel', placeholder: '+39 320 123 4567' }
      ];

      var contactWrap = document.createElement('div');
      contactWrap.style.display = 'flex';
      contactWrap.style.flexDirection = 'column';
      contactWrap.style.gap = '16px';

      fields.forEach(function(f) {
        var fieldDiv = document.createElement('div');

        var labelEl = document.createElement('label');
        labelEl.style.display = 'block';
        labelEl.style.fontSize = '14px';
        labelEl.style.fontWeight = '600';
        labelEl.style.marginBottom = '4px';
        labelEl.textContent = f.label;
        fieldDiv.appendChild(labelEl);

        var input = document.createElement('input');
        input.type = f.type;
        input.className = 'questionnaire-input';
        input.placeholder = f.placeholder;
        input.value = state.answers[f.id] || '';

        input.addEventListener('input', function() {
          state.answers[f.id] = this.value;
          updateNextButton();
        });

        fieldDiv.appendChild(input);
        contactWrap.appendChild(fieldDiv);
      });

      stepDiv.appendChild(contactWrap);

    } else if (step.type === 'choice') {
      var optionsWrap = document.createElement('div');
      optionsWrap.className = 'questionnaire-options';

      step.options.forEach(function(opt) {
        var btn = document.createElement('button');
        btn.className = 'questionnaire-option';
        btn.dataset.value = opt.value;

        var dot = document.createElement('span');
        dot.className = 'radio-dot';
        btn.appendChild(dot);

        var label = document.createElement('span');
        label.textContent = opt.label;
        btn.appendChild(label);

        if (state.answers[step.id] === opt.value) {
          btn.classList.add('selected');
        }

        btn.addEventListener('click', function() {
          var parent = this.parentNode;
          parent.querySelectorAll('.questionnaire-option').forEach(function(el) {
            el.classList.remove('selected');
          });
          this.classList.add('selected');
          state.answers[step.id] = this.dataset.value;

          // Handle category selection - rebuild steps and advance
          if (step.id === 'category') {
            // Clear answers from previous category
            Object.keys(state.answers).forEach(function(key) {
              if (key !== 'category') delete state.answers[key];
            });
            reconstructSteps(state.answers.category);
            state.currentStep = 1;
            renderStep();
            return;
          }

          updateNextButton();
        });

        optionsWrap.appendChild(btn);
      });

      stepDiv.appendChild(optionsWrap);

    } else if (step.type === 'text') {
      var textarea = document.createElement('textarea');
      textarea.className = 'questionnaire-textarea';
      textarea.placeholder = 'Scrivi qui la tua risposta...';
      textarea.rows = 4;

      if (state.answers[step.id]) {
        textarea.value = state.answers[step.id];
      }

      textarea.addEventListener('input', function() {
        state.answers[step.id] = this.value;
        updateNextButton();
      });

      stepDiv.appendChild(textarea);
    }

    // Error message
    var errorDiv = document.createElement('div');
    errorDiv.className = 'questionnaire-error';
    errorDiv.id = 'questionnaire-error';
    stepDiv.appendChild(errorDiv);

    elements.body.appendChild(stepDiv);

    // Focus textarea if present
    var ta = elements.body.querySelector('.questionnaire-textarea');
    if (ta) setTimeout(function() { ta.focus(); }, 350);

    updateNextButton();
  }

  function showConfirmButton() {
    var existing = elements.footer.querySelector('.questionnaire-btn-confirm');
    if (existing) return;

    var confirmBtn = document.createElement('button');
    confirmBtn.className = 'questionnaire-btn-confirm';
    confirmBtn.id = 'questionnaire-btn-confirm';
    confirmBtn.textContent = 'Conferma Prenotazione';
    confirmBtn.addEventListener('click', confirmBooking);

    elements.nextBtn.parentNode.insertBefore(confirmBtn, elements.nextBtn);
    updateNextButton();
  }

  function hideConfirmButton() {
    var confirmBtn = elements.footer.querySelector('.questionnaire-btn-confirm');
    if (confirmBtn) confirmBtn.remove();
  }

  function updateNextButton() {
    var step = state.steps[state.currentStep];
    if (!step) return;

    var answered = !!state.answers[step.id];

    if (step.type === 'text') {
      answered = state.answers[step.id] && state.answers[step.id].trim().length > 0;
    }

    if (step.type === 'contact') {
      answered = state.answers['contact-nome'] && state.answers['contact-nome'].trim().length > 0 &&
                 state.answers['contact-email'] && state.answers['contact-email'].trim().length > 0 &&
                 state.answers['contact-telefono'] && state.answers['contact-telefono'].trim().length > 0;
    }

    var isLast = state.currentStep === state.steps.length - 1;

    if (isLast) {
      var confirmBtn = elements.footer.querySelector('.questionnaire-btn-confirm');
      if (confirmBtn) {
        confirmBtn.classList.toggle('ready', answered);
      }
    } else {
      elements.nextBtn.classList.toggle('ready', answered);
    }
  }

  function goBack() {
    if (state.currentStep <= 0) return;

    var prevStep = state.steps[state.currentStep - 1];

    // Going back to category question: reset steps to just the category
    if (prevStep && prevStep.id === 'category') {
      reconstructSteps(null);
      renderStep();
      return;
    }

    state.currentStep--;
    renderStep();
  }

  function goNext() {
    var step = state.steps[state.currentStep];
    if (!step) return;

    var answered = !!state.answers[step.id];
    if (step.type === 'text') {
      answered = state.answers[step.id] && state.answers[step.id].trim().length > 0;
    }
    if (step.type === 'contact') {
      answered = state.answers['contact-nome'] && state.answers['contact-nome'].trim().length > 0 &&
                 state.answers['contact-email'] && state.answers['contact-email'].trim().length > 0 &&
                 state.answers['contact-telefono'] && state.answers['contact-telefono'].trim().length > 0;
    }

    if (!answered) {
      showError('Per favore, rispondi prima di proseguire.');
      return;
    }

    hideError();

    if (state.currentStep < state.steps.length - 1) {
      state.currentStep++;
      renderStep();
    }
  }

  function showError(msg) {
    var errEl = document.getElementById('questionnaire-error');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  }

  function hideError() {
    var errEl = document.getElementById('questionnaire-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  function confirmBooking() {
    var allAnswered = state.steps.every(function(step) {
      if (step.type === 'contact') {
        return state.answers['contact-nome'] && state.answers['contact-nome'].trim().length > 0 &&
               state.answers['contact-email'] && state.answers['contact-email'].trim().length > 0 &&
               state.answers['contact-telefono'] && state.answers['contact-telefono'].trim().length > 0;
      }
      var val = state.answers[step.id];
      return val && (step.type !== 'text' || val.trim().length > 0);
    });

    if (!allAnswered) {
      showError('Tutte le domande devono essere completate.');
      return;
    }

    hideError();

    var pd = window.__prenotazioneData;
    var data = pd.dateStr;
    var orario = pd.timeStr;

    if (!data || !orario) {
      showError('Seleziona data e orario prima di confermare.');
      return;
    }

    var confirmBtn = elements.footer.querySelector('.questionnaire-btn-confirm');
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Invio in corso…';
    }

    var d = ['', '', '', '', '', '', '', ''];
    var steps = state.steps;
    var di = 0;

    for (var si = 0; si < steps.length && di < 8; si++) {
      var step = steps[si];

      if (step.type === 'contact') {
        d[di++] = 'Nome e Cognome? ' + (state.answers['contact-nome'] || '');
        if (di < 8) d[di++] = 'Email? ' + (state.answers['contact-email'] || '');
        if (di < 8) d[di++] = 'Telefono? ' + (state.answers['contact-telefono'] || '');
        continue;
      }

      var raw = state.answers[step.id];
      if (!raw) continue;

      var label = raw;
      if (step.options) {
        for (var j = 0; j < step.options.length; j++) {
          if (step.options[j].value === raw) {
            label = step.options[j].label;
            break;
          }
        }
      }

      d[di++] = step.question + (step.question.slice(-1) === '?' ? ' ' : '? ') + label;
    }

    var payload = { data: data, orario: orario };
    for (var i = 0; i < 8; i++) {
      payload['d' + (i + 1)] = d[i];
    }

    payload['nome'] = state.answers['contact-nome'] || '';
    payload['email'] = state.answers['contact-email'] || '';
    payload['telefono'] = state.answers['contact-telefono'] || '';

    var url = 'https://script.google.com/macros/s/AKfycbz0voCd4C_Jw6xoawiOL_duLo8eWrxvV_w2S3xlGTBZ3Txiln0ftNPzIOkXq1siJi7q/exec';

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function() {
      showConfirmationView();
    }).catch(function(error) {
      console.error('Errore invio prenotazione:', error);
      showConfirmationView();
    });
  }

  function showConfirmationView() {
    elements.header.style.display = 'none';
    elements.footer.style.display = 'none';

    elements.body.classList.remove('no-header');
    elements.body.innerHTML =
      '<div class="questionnaire-step" style="text-align:center;padding:60px 20px 40px;">' +
        '<div style="font-size:72px;line-height:1;margin-bottom:24px;">🎉</div>' +
        '<h3 style="font-family:Manrope,sans-serif;font-size:24px;font-weight:700;color:var(--text-primary);margin:0 0 12px;">Prenotazione Confermata!</h3>' +
        '<p style="font-family:Inter,sans-serif;font-size:16px;color:var(--text-secondary);line-height:1.6;max-width:400px;margin:0 auto;">Grazie per aver compilato il questionario. Riceverai una conferma via email con tutti i dettagli del tuo incontro.</p>' +
      '</div>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
