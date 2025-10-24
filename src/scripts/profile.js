document.addEventListener('DOMContentLoaded', function () {
  // ---------- переменные общие ----------
  var overlay = document.getElementById('contactPopup');
  if (!overlay) return;

  var openBtns = document.getElementsByClassName('js-open-popup');

  // ---------- 0) SHOW TIME (click) ----------
  var timeBtn = document.getElementById('timeBtn');
  var timeOut = document.getElementById('timeOut');
  if (timeBtn && timeOut) {
    timeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      timeOut.textContent = new Date().toLocaleTimeString();
    });
  }

  // ---------- 1) NAVIGATION KEYBOARD (ArrowLeft / ArrowRight) ----------
  var navLinksContainer = document.querySelector('.nav-links');
  if (navLinksContainer) {
    // собрать ссылки и установить tabindex (только первый tabbable)
    var navLinks = Array.prototype.slice.call(navLinksContainer.querySelectorAll('a'));
    navLinks.forEach(function (ln, idx) {
      ln.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    });

    // при фокусе на контейнере или при клике — фокус на первом элементе
    navLinksContainer.addEventListener('focus', function () {
      var first = navLinks[0];
      if (first) first.focus();
    }, true);

    // обработка стрелок
    navLinksContainer.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      // индекс текущего фокуса
      var activeIndex = navLinks.indexOf(document.activeElement);
      // если фокус не на ссылке — установить на первый
      if (activeIndex === -1) {
        activeIndex = 0;
        navLinks[0].focus();
      }

      e.preventDefault();
      var nextIndex;
      if (e.key === 'ArrowRight') {
        nextIndex = (activeIndex + 1) % navLinks.length;
      } else {
        nextIndex = (activeIndex - 1 + navLinks.length) % navLinks.length;
      }

      // обновить tabindex и фокус
      navLinks.forEach(function (ln, idx) {
        ln.setAttribute('tabindex', idx === nextIndex ? '0' : '-1');
      });
      navLinks[nextIndex].focus();
    });
  }

  // ---------- 2) POPUP open/close (сохранена твоя логика, чуть улучшена) ----------
  function openPopup() {
    if ((' ' + overlay.className + ' ').indexOf(' is-open ') === -1) {
      overlay.className = overlay.className + ' is-open';
    }
    overlay.style.display = 'block';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // при открытии показываем 1 шаг (если есть форма)
    showStep(1);
  }

  function closePopup() {
    overlay.className = overlay.className.replace(' is-open', '');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // сброс формы и статус
    if (popupForm) {
      popupForm.reset();
      popupStatus.textContent = 'Fill the form to send a message';
    }
  }

  for (var i = 0; i < openBtns.length; i++) {
    openBtns[i].addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  var innerButtons = overlay.getElementsByTagName('button');
  for (var j = 0; j < innerButtons.length; j++) {
    var b = innerButtons[j];
    if (b.hasAttribute && b.hasAttribute('data-popup-close')) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        closePopup();
      });
    }
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  });

  // ---------- 3) Multi-step popup form (showStep callback) ----------
  var popupForm = document.getElementById('popupForm');
  var popupStatus = document.getElementById('popupStatus');
  var toStep2Btn = document.getElementById('toStep2');
  var backToStep1Btn = document.getElementById('backToStep1');

  // showStep — универсальный колбэк для показа шага
  function showStep(stepNumber) {
    if (!popupForm) return;
    var steps = popupForm.querySelectorAll('.step');
    for (var s = 0; s < steps.length; s++) {
      var el = steps[s];
      var sNum = Number(el.getAttribute('data-step'));
      if (sNum === stepNumber) {
        el.classList.remove('d-none');
      } else {
        el.classList.add('d-none');
      }
    }
    // для доступности можно выставлять aria-hidden на диалоге, но мы уже управляем overlay
  }

  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', function () {
      var emailField = document.getElementById('popupEmail');
      var emailVal = emailField ? emailField.value.trim() : '';
      if (!emailVal) {
        if (popupStatus) popupStatus.textContent = 'Please enter a valid email.';
        return;
      }
      if (popupStatus) popupStatus.textContent = 'Step 2: write your message.';
      showStep(2); // использование колбэка
      var ta = document.getElementById('popupMessage');
      if (ta) ta.focus();
    });
  }

  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', function () {
      if (popupStatus) popupStatus.textContent = 'Back to step 1';
      showStep(1); // использование колбэка
      var eField = document.getElementById('popupEmail');
      if (eField) eField.focus();
    });
  }

  if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('popupEmail');
      var message = document.getElementById('popupMessage');

      var emailVal = email ? email.value.trim() : '';
      var msgVal = message ? message.value.trim() : '';

      if (!emailVal) {
        if (popupStatus) popupStatus.textContent = 'Email is required.';
        showStep(1);
        return;
      }
      if (!msgVal) {
        if (popupStatus) popupStatus.textContent = 'Message is required.';
        showStep(2);
        return;
      }

      // имитация асинхронной отправки (без fetch)
      if (popupStatus) popupStatus.textContent = 'Sending...';
      setTimeout(function () {
        if (popupStatus) popupStatus.textContent = 'Sent! Thank you.';
        // после небольшой паузы закрыть и сбросить
        setTimeout(function () {
          closePopup();
        }, 700);
      }, 700);
    });
  }

  // ---------- 4) Language switch (switch statement) ----------
  var langSelect = document.getElementById('lang');
  var siteTitle = document.getElementById('siteTitle');
  if (langSelect && siteTitle) {
    langSelect.addEventListener('change', function () {
      var v = langSelect.value;
      switch (v) {
        case 'en':
          siteTitle.textContent = 'TMNTgram';
          break;
        case 'ru':
          siteTitle.textContent = 'TMNTgram — Профиль';
          break;
        case 'kk':
          siteTitle.textContent = 'TMNTgram — Профиль (KK)';
          break;
        default:
          siteTitle.textContent = 'TMNTgram';
      }
    });
  }

  // ---------- 5) Accessibility: убедимся, что первая ссылка в навигации tabbable ----------
  (function ensureNavTabindex() {
    var navAnchors = document.querySelectorAll('.nav-links a');
    if (!navAnchors || navAnchors.length === 0) return;
    for (var n = 0; n < navAnchors.length; n++) {
      var ln = navAnchors[n];
      ln.setAttribute('tabindex', n === 0 ? '0' : '-1');
    }
  })();
});
