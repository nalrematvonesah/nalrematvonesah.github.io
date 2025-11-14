/* explore.js — search & trending feed logic */

const OMDb_API_KEY = 'f994f279';
const LAST_SEARCH_KEY = 'tmnt_last_search_results';
const CURRENT_USER_KEY = 'tmnt_current_user';
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

/* Toast */
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

/* Auth links */
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
  showToast('Logged out.', 'bg-tmnt-green');
  setTimeout(()=>window.location.href='homepage.html',500);
}

/* OMDb search */
async function searchOMDb(searchTerm = 'Ninja') {
  const input = document.getElementById('search-term');
  if (input && input.value.trim()) searchTerm = input.value.trim();

  const loading = document.getElementById('loading-spinner');
  const resultsDiv = document.getElementById('omdb-results');
  loading.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${OMDb_API_KEY}&type=movie`);
    const data = await res.json();
    if (data.Search && data.Search.length) {
      const results = data.Search.filter(item => item.Poster !== 'N/A').slice(0, 12);
      localStorage.setItem(LAST_SEARCH_KEY, JSON.stringify(results));
      renderResults(results);
    } else {
      resultsDiv.innerHTML = '<p class="text-center text-lg py-8 opacity-75">No results found.</p>';
    }
  } catch (e) {
    console.error(e);
    showToast('OMDb error occurred.', 'bg-red-500');
  } finally {
    loading.classList.add('hidden');
  }
}

/* Render posts */
function renderResults(results) {
  const resultsDiv = document.getElementById('omdb-results');
  resultsDiv.innerHTML = results.map(movie => `
    <div class="movie-card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <div class="p-4">
        <h3 class="font-bold text-xl mb-2 text-tmnt-green">${movie.Title}</h3>
        <p class="text-sm opacity-75">Year: ${movie.Year}</p>
        <button class="mt-3 w-full animated-btn px-4 py-2 rounded-lg font-semibold"
          onclick="showToast('Liked ${movie.Title}!')">Like Post</button>
      </div>
    </div>
  `).join('');
}

/* Load previous search or default */
function loadLastSearch() {
  const last = JSON.parse(localStorage.getItem(LAST_SEARCH_KEY));
  if (last && last.length) {
    renderResults(last);
  } else {
    searchOMDb('TMNT');
  }
}

/* Mobile menu toggle */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu)
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  updateAuthLink();
  loadLastSearch();
  const btn = document.getElementById('search-btn');
  if (btn) btn.addEventListener('click', () => searchOMDb());
});

window.showToast = showToast;
window.handleLogout = handleLogout;
