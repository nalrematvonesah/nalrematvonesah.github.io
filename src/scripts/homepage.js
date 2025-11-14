/* home.js - small logic for the landing page (theme, auth link, mobile menu, toast) */

const USERS_KEY = 'tmnt_users';
const CURRENT_USER_KEY = 'tmnt_current_user';

let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

const authLink = document.getElementById('auth-link');
const authLinkMobile = document.getElementById('auth-link-mobile');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const ctaPrimary = document.getElementById('cta-primary');
const ctaLogin = document.getElementById('cta-login');

/* Toast helper */
function showToast(message, type = 'bg-tmnt-green') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `p-4 rounded-xl shadow-lg text-white ${type} max-w-sm flex justify-between items-center opacity-0 transition-opacity duration-300`;
  toast.innerHTML = `<span>${message}</span><button onclick="this.parentNode.remove()" class="ml-4 font-bold opacity-75 hover:opacity-100 transition-opacity">&times;</button>`;
  container.prepend(toast);
  setTimeout(() => toast.classList.remove('opacity-0'), 10);
  setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(()=>toast.remove(),300); }, 4000);
}

/* Theme management */
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }
  localStorage.setItem('tmnt_theme', theme);
}
function toggleTheme() {
  const cur = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

/* Update auth link text/action */
function updateAuthLink() {
  const text = currentUser ? 'Logout' : 'Login';
  const icon = currentUser ? 'log-out' : 'user';
  if (authLink) {
    authLink.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span>${text}</span>`;
    authLink.setAttribute('onclick', currentUser ? 'handleLogoutFromHome()' : "window.location.href='auth.html'");
  }
  if (authLinkMobile) {
    authLinkMobile.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span>${text}</span>`;
    authLinkMobile.setAttribute('href', currentUser ? '#' : 'auth_portal.html');
    authLinkMobile.setAttribute('onclick', currentUser ? 'handleLogoutFromHome()' : '');
  }
}

/* Logout from this page */
function handleLogoutFromHome() {
  currentUser = null;
  localStorage.removeItem(CURRENT_USER_KEY);
  showToast('You have been logged out.', 'bg-tmnt-green');
  updateAuthLink();
}

/* Mobile menu toggle */
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

/* Initialize page */
document.addEventListener('DOMContentLoaded', () => {
  // apply saved theme
  const savedTheme = localStorage.getItem('tmnt_theme') || 'dark';
  applyTheme(savedTheme);

  // load user
  currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
  updateAuthLink();

  // if logged in, change CTAs
  if (currentUser) {
    if (ctaPrimary) ctaPrimary.href = 'news.html';
    if (ctaPrimary) ctaPrimary.textContent = 'Go to Feed';
    if (ctaLogin) ctaLogin.remove();
  }
});

/* Expose some helpers globally for inline onclicks */
window.toggleTheme = toggleTheme;
window.handleLogoutFromHome = handleLogoutFromHome;
window.showToast = showToast;
