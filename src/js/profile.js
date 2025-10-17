document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('contactPopup');
  if (!overlay) return;

  var openBtns = document.getElementsByClassName('js-open-popup');

  function openPopup() {
    if ((' ' + overlay.className + ' ').indexOf(' is-open ') === -1) {
      overlay.className = overlay.className + ' is-open';
    }
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.className = overlay.className.replace(' is-open', '');
    document.body.style.overflow = '';
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

  var form = document.getElementById('popupForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('popupEmail');
      var message = document.getElementById('popupMessage');

      if (!email.value || !message.value) {
        alert('Please fill out all fields.');
        return;
      }

      alert('Message sent successfully!');
      form.reset();
      closePopup();
    });
  }
});
