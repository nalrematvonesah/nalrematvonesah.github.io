/* profile.js — user profile management */

const USERS_KEY = 'tmnt_users';
const CURRENT_USER_KEY = 'tmnt_current_user';
let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
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

/* Auth links */
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  const authLinkMobile = document.getElementById('auth-link-mobile');
  const text = currentUser ? 'Logout' : 'Login';
  const icon = currentUser ? 'log-out' : 'user';
  const action = currentUser ? 'handleLogout()' : "window.location.href='auth.html'";
  [authLink, authLinkMobile].forEach(link=>{
    if(!link) return;
    link.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span>${text}</span>`;
    link.setAttribute('onclick', action);
  });
}
function handleLogout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  showToast('Logged out successfully.', 'bg-tmnt-green');
  setTimeout(()=>window.location.href='home.html',500);
}

/* Render profile */
function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!currentUser) {
    container.innerHTML = `
      <p class="text-center text-xl p-10 card">You must be logged in to view your profile.</p>
      <div class="text-center mt-6">
        <button class="animated-btn px-6 py-3 rounded-xl font-bold text-lg" onclick="window.location.href='auth.html'">Go to Login</button>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="profile-card space-y-6">
      <form id="editProfileForm" class="space-y-6">
        <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div class="profile-avatar">${currentUser.avatar || currentUser.name.charAt(0)}</div>
          <div class="flex-grow w-full">
            <label class="block mb-4">
              <span class="text-sm font-semibold block mb-1">Full Name:</span>
              <input type="text" id="editName" name="name" class="input-field" value="${currentUser.name}" required>
            </label>
            <p class="text-lg opacity-75">Email: ${currentUser.email}</p>
          </div>
        </div>
        <div class="border-t pt-4 border-gray-500/30">
          <h4 class="text-xl font-semibold mb-2">Bio / Status:</h4>
          <textarea id="editBio" name="bio" class="input-field" rows="3">${currentUser.bio || ''}</textarea>
        </div>
        <div class="flex space-x-4 pt-4">
          <button type="submit" class="animated-btn flex-grow px-4 py-3 rounded-lg font-bold text-lg">Save Changes</button>
          <button type="button" class="animated-btn flex-grow px-4 py-3 rounded-lg font-bold text-lg bg-red-600 hover:bg-red-500" style="--accent-green:#EF4444;--shadow-color:rgba(239,68,68,0.4);" onclick="handleLogout()">Log Out</button>
        </div>
      </form>
    </div>`;
  const form = document.getElementById('editProfileForm');
  form.addEventListener('submit', handleUpdateProfile);
}

/* Save changes */
function handleUpdateProfile(event) {
  event.preventDefault();
  const newName = document.getElementById('editName').value.trim();
  const newBio = document.getElementById('editBio').value.trim();
  if (!newName) {
    showToast('Name cannot be empty.', 'bg-red-500');
    return;
  }
  currentUser.name = newName;
  currentUser.bio = newBio;
  currentUser.avatar = newName.charAt(0);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

  const idx = users.findIndex(u => u.email === currentUser.email);
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  showToast('Profile updated successfully!', 'bg-tmnt-green');
  renderProfile();
}

/* Mobile menu */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu)
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  updateAuthLink();
  renderProfile();
});

window.showToast = showToast;
window.handleLogout = handleLogout;
