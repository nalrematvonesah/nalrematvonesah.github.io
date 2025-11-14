/* friends.js — simple friend list behavior */

const CURRENT_USER_KEY = 'tmnt_current_user';
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

/* Toast */
function showToast(message, type = 'bg-tmnt-green') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `p-4 rounded-xl shadow-lg text-white ${type} max-w-sm flex justify-between items-center opacity-0 transition-opacity duration-300`;
  toast.innerHTML = `<span>${message}</span><button onclick="this.parentNode.remove()" class="ml-4 font-bold opacity-75 hover:opacity-100 transition-opacity">&times;</button>`;
  container.prepend(toast);
  setTimeout(() => toast.classList.remove('opacity-0'), 10);
  setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(()=>toast.remove(),300); }, 4000);
}

/* Auth */
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  const authLinkMobile = document.getElementById('auth-link-mobile');
  const text = currentUser ? 'Logout' : 'Login';
  const icon = currentUser ? 'log-out' : 'user';
  const action = currentUser ? 'handleLogout()' : "window.location.href='auth_portal.html'";
  [authLink, authLinkMobile].forEach(link=>{
    if(!link) return;
    link.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span>${text}</span>`;
    link.setAttribute('onclick', action);
  });
}
function handleLogout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  showToast('You have logged out.', 'bg-tmnt-green');
  setTimeout(()=>window.location.href='homepage.html',500);
}

/* Friend actions */
function messageFriend(name) {
  showToast(`Opening DM with ${name}...`, 'bg-tmnt-purple');
  setTimeout(()=>window.location.href='messages.html',800);
}

function findAllies() {
  showToast('Scanning sewers for new allies...', 'bg-tmnt-green');
}

/* Mobile menu */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu)
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  updateAuthLink();
});

window.showToast = showToast;
window.handleLogout = handleLogout;
window.messageFriend = messageFriend;
window.findAllies = findAllies;
