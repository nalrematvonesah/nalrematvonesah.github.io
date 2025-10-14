// profile.js — отладочный проверенный вариант
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("contactPopup");
  const openButtons = document.querySelectorAll(".js-open-popup");
  if (!overlay) {
    console.error('Popup overlay #contactPopup not found in DOM');
    return;
  }
  if (!openButtons.length) {
    console.warn('No .js-open-popup buttons found');
  }

  const closeButtons = overlay.querySelectorAll("[data-popup-close]");
  const form = document.getElementById("popupForm");

  function openPopup() {
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    console.log('Popup opened');
  }

  function closePopup() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    console.log('Popup closed');
  }

  openButtons.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openPopup();
  }));

  closeButtons.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    closePopup();
  }));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("popupEmail");
      const message = document.getElementById("popupMessage");
      if (!email.value.trim() || !message.value.trim()) {
        alert("Please fill out all fields.");
        return;
      }
      // Здесь можно сделать fetch(...) если нужно. Для простоты — уведомление и закрытие.
      alert("Message sent successfully!");
      form.reset();
      closePopup();
    });
  }
});
