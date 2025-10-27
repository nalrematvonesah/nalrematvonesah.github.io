document.addEventListener('DOMContentLoaded', function () {
  // ---------- Общие элементы (без раннего return) ----------
  var overlay = document.getElementById('contactPopup'); // может быть null — допустимо
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
  var navLinks = [];
  if (navLinksContainer) {
    navLinks = Array.prototype.slice.call(navLinksContainer.querySelectorAll('a') || []);
    navLinks.forEach(function (ln, idx) {
      ln.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    });

    navLinksContainer.addEventListener('focus', function () {
      if (navLinks[0]) navLinks[0].focus();
    }, true);

    navLinksContainer.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      var activeIndex = navLinks.indexOf(document.activeElement);
      if (activeIndex === -1) activeIndex = 0;

      e.preventDefault();
      var nextIndex = (e.key === 'ArrowRight')
        ? (activeIndex + 1) % navLinks.length
        : (activeIndex - 1 + navLinks.length) % navLinks.length;

      navLinks.forEach(function (ln, idx) {
        ln.setAttribute('tabindex', idx === nextIndex ? '0' : '-1');
      });
      if (navLinks[nextIndex]) navLinks[nextIndex].focus();
    });
  }

  // ---------- 2) POPUP open/close ----------
  function openPopup() {
    if (!overlay) return;
    if ((' ' + overlay.className + ' ').indexOf(' is-open ') === -1) {
      overlay.className = overlay.className + ' is-open';
    }
    overlay.style.display = 'block';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showStep(1);
  }

  function closePopup() {
    if (!overlay) return;
    overlay.className = overlay.className.replace(' is-open', '');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (popupForm) {
      popupForm.reset();
      if (popupStatus) popupStatus.textContent = 'Fill the form to send a message';
    }
  }

  for (var i = 0; i < openBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup();
      });
    })(openBtns[i]);
  }

  if (overlay) {
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
      if (e.target === overlay) closePopup();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // ---------- 3) Multi-step popup form ----------
  var popupForm = document.getElementById('popupForm');
  var popupStatus = document.getElementById('popupStatus');
  var toStep2Btn = document.getElementById('toStep2');
  var backToStep1Btn = document.getElementById('backToStep1');

  function showStep(stepNumber) {
    if (!popupForm) return;
    var steps = popupForm.querySelectorAll('.step');
    for (var s = 0; s < steps.length; s++) {
      var el = steps[s];
      var sNum = Number(el.getAttribute('data-step'));
      if (sNum === stepNumber) el.classList.remove('d-none'); else el.classList.add('d-none');
    }
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
      showStep(2);
      var ta = document.getElementById('popupMessage');
      if (ta) ta.focus();
    });
  }

  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', function () {
      if (popupStatus) popupStatus.textContent = 'Back to step 1';
      showStep(1);
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

      if (popupStatus) popupStatus.textContent = 'Sending...';
      setTimeout(function () {
        if (popupStatus) popupStatus.textContent = 'Sent! Thank you.';
        setTimeout(function () { closePopup(); }, 700);
      }, 700);
    });
  }

  // ---------- 4) Translations (robust) ----------
  var langSelect = document.getElementById('lang');
  var siteTitle = document.getElementById('siteTitle');

  var heroTitleEl = document.querySelector('.hero-title');
  var heroDescEl = document.querySelector('.hero-description');
  var editProfileLink = document.getElementById('editProfileLink');
  var contactOpeners = Array.prototype.slice.call(document.getElementsByClassName('js-open-popup') || []);
  var backHomeLinks = Array.prototype.slice.call(document.querySelectorAll('.profile-actions a.btn-secondary') || []);
  var navAnchors = navLinksContainer ? Array.prototype.slice.call(navLinksContainer.querySelectorAll('a') || []) : [];

  var userNameEl = document.getElementById('userName');
  var userStatusEl = document.getElementById('userStatus');
  var userAboutEl = document.getElementById('userAbout');
  var userBirthdayEl = document.getElementById('userBirthday');
  var userCityEl = document.getElementById('userCity');
  var userEduEl = document.getElementById('userEdu');

var person = {
  name: "Alikhan",
  age: 18,
  greeting: f
  
};
console.log("Name: " + person.name);
console.log("Age: " + person.age);

  var translations = {
    en: {
      siteTitle: 'TMNTgram',
      nav: ['Profile', 'Friends', 'Settings', 'Login', 'Home'],
      heroTitle: 'My Profile',
      heroDesc: 'View and manage your personal information on TMNTgram.',
      timeBtn: 'Show Time',
      editBtn: 'Edit Profile',
      contactBtn: 'Contact',
      backHome: 'Back to Home',
      userName: 'Alikhan Sekenov',
      userStatus: 'Student, Web Developer',
      userAbout: 'Second-year student interested in web development and design.',
      birthday: '25 June 2007',
      city: 'Astana',
      edu: 'AITU, Information Technology'
    },
    ru: {
      siteTitle: 'TMNTgram — Профиль',
      nav: ['Профиль', 'Друзья', 'Настройки', 'Вход', 'Главная'],
      heroTitle: 'Мой профиль',
      heroDesc: 'Просматривайте и редактируйте свою информацию на TMNTgram.',
      timeBtn: 'Показать время',
      editBtn: 'Редактировать профиль',
      contactBtn: 'Связаться',
      backHome: 'На главную',
      userName: 'Алихан Секенов',
      userStatus: 'Студент, Web-разработчик',
      userAbout: 'Студент 2 курса, интересуется веб-разработкой и дизайном.',
      birthday: '25 июня 2007',
      city: 'Астана',
      edu: 'AITУ, Информационные технологии'
    },
    kk: {
      siteTitle: 'TMNTgram — Профиль (KK)',
      nav: ['Профиль', 'Достар', 'Параметрлер', 'Кіру', 'Басты бет'],
      heroTitle: 'Менің профилім',
      heroDesc: 'TMNTgram-де жеке ақпаратыңызды қараңыз және басқарыңыз.',
      timeBtn: 'Уақытты көрсету',
      editBtn: 'Профильді өңдеу',
      contactBtn: 'Байланыс',
      backHome: 'Басты бетке',
      userName: 'Алихан Секенов',
      userStatus: 'Студент, Web-әзірлеуші',
      userAbout: 'Екінші курс студенті, веб-әзірлеу мен дизайнға қызығады.',
      birthday: '25 маусым 2007',
      city: 'Астана',
      edu: 'AITU, Ақпараттық технологиялар'
    }
  };

  function applyTranslations(lang) {
    var t = translations[lang] || translations.en;
    if (siteTitle) siteTitle.textContent = t.siteTitle;
    for (var ni = 0; ni < navAnchors.length && ni < t.nav.length; ni++) {
      if (navAnchors[ni]) navAnchors[ni].textContent = t.nav[ni];
    }
    if (heroTitleEl) heroTitleEl.textContent = t.heroTitle;
    if (heroDescEl) heroDescEl.textContent = t.heroDesc;
    if (timeBtn) timeBtn.textContent = t.timeBtn;
    if (editProfileLink) editProfileLink.textContent = t.editBtn;
    contactOpeners.forEach(function (el) { if (el) el.textContent = t.contactBtn; });
    backHomeLinks.forEach(function (el) { if (el) el.textContent = t.backHome; });

    if (userNameEl) userNameEl.textContent = t.userName;
    if (userStatusEl) userStatusEl.textContent = t.userStatus;
    if (userAboutEl) userAboutEl.textContent = t.userAbout;
    if (userBirthdayEl) userBirthdayEl.textContent = t.birthday;
    if (userCityEl) userCityEl.textContent = t.city;
    if (userEduEl) userEduEl.textContent = t.edu;
  }

  if (langSelect) {
    applyTranslations(langSelect.value || 'ru');
    langSelect.addEventListener('change', function () {
      applyTranslations(langSelect.value);
    });
  } else {
    applyTranslations('ru');
  }

  // ---------- 5) Ensure first nav link tabbable ----------
  (function ensureNavTabindex() {
    var navAnchors2 = document.querySelectorAll('.nav-links a');
    if (!navAnchors2 || navAnchors2.length === 0) return;
    for (var n = 0; n < navAnchors2.length; n++) {
      var ln = navAnchors2[n];
      ln.setAttribute('tabindex', n === 0 ? '0' : '-1');
    }
  })();
});
// Task 0: проверка jQuery и Task 6: спиннер на отправке попапа
$(document).ready(function() {
  console.log("jQuery is ready!");

  // Обработчик отправки формы в попапе
  $("#popupForm").on("submit", function(e) {
    e.preventDefault(); // не перезагружать страницу

    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]'); // кнопка Send
    const $status = $("#popupStatus");

    // Сохраняем оригинальный HTML кнопки, чтобы вернуть потом
    const originalBtnHtml = $submitBtn.html();

    // Показать спиннер и вариант "Please wait..."
    $submitBtn.html('<span class="spinner"></span> Please wait...');
    $submitBtn.prop("disabled", true);

    // Обновляем статус попапа (необязательно, но полезно)
    $status.text("Sending message...");

    // Симуляция серверного запроса (3 секунды)
    setTimeout(function() {
      // вернуть кнопку в исходное состояние
      $submitBtn.html(originalBtnHtml);
      $submitBtn.prop("disabled", false);

      // Обновить статус и показать уведомление внутри попапа
      $status.text("Message sent successfully!");

      // Очистить поля формы (по желанию)
      $form.find("input, textarea").val("");

      // (опция) закрывать попап автоматически — если у тебя есть логика закрытия,
      // можно вызвать её здесь. Я этого не делаю автоматически, чтобы не менять твою логику попапа.
    }, 3000);
  });

  // Доп. мелочь: кнопка "Next" и "Back" (если в profile.js ещё нет логики)
  $("#toStep2").on("click", function() {
    $('[data-step="1"]').addClass('d-none');
    $('[data-step="2"]').removeClass('d-none');
  });
  $("#backToStep1").on("click", function() {
    $('[data-step="2"]').addClass('d-none');
    $('[data-step="1"]').removeClass('d-none');
  });
});
