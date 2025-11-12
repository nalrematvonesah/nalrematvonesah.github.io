/* news.js — handles OMDb search, rendering results, and basic UI */

const OMDb_API_KEY = 'f994f279';
const LAST_SEARCH_KEY = 'tmnt_last_search_results';
const CURRENT_USER_KEY = 'tmnt_current_user';
const contentDiv = document.getElementById('content');

let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

/* Toast helper (same as home.js) */
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

/* Auth link setup */
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  const authLinkMobile = document.getElementById('auth-link-mobile');
  const text = currentUser ? 'Logout' : 'Login';
  const icon = currentUser ? 'log-out' : 'user';
  const action = currentUser ? 'handleLogout()' : "window.location.href='auth.html'";
  [authLink, authLinkMobile].forEach(link => {
    if (link) {
      link.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span>${text}</span>`;
      link.setAttribute('onclick', action);
    }
  });
}

function handleLogout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  showToast('Logged out successfully.', 'bg-tmnt-green');
  setTimeout(() => window.location.href = 'home.html', 500);
}

/* Search OMDb */
async function searchOMDb(searchTerm = 'Ninja') {
  const searchInput = document.getElementById('search-term');
  if (searchInput && searchInput.value.trim()) {
    searchTerm = searchInput.value.trim();
  }

  const loading = document.getElementById('loading-spinner');
  const resultsDiv = document.getElementById('omdb-results');
  loading.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${OMDb_API_KEY}&type=movie`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.Search && data.Search.length) {
      const results = data.Search.filter(item => item.Poster !== 'N/A').slice(0, 12);
      localStorage.setItem(LAST_SEARCH_KEY, JSON.stringify(results));
      renderResults(results);
    } else {
      resultsDiv.innerHTML = '<p class="text-center text-lg py-8 opacity-75">No posts found for that term.</p>';
    }
  } catch (err) {
    console.error(err);
    showToast('API error. Could not fetch posts.', 'bg-red-500');
  } finally {
    loading.classList.add('hidden');
  }
}

/* Render cards */
function renderResults(results) {
  const resultsDiv = document.getElementById('omdb-results');
  resultsDiv.innerHTML = results.map(movie => `
    <div class="movie-card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <div class="p-4">
        <h3 class="font-bold text-xl mb-2 text-tmnt-green">${movie.Title}</h3>
        <p class="text-sm opacity-75">Year: ${movie.Year}</p>
        <p class="text-xs mt-2 italic">A great new post from the TMNT community!</p>
        <button class="mt-4 w-full animated-btn px-4 py-2 rounded-lg font-semibold" onclick="showToast('Liked ${movie.Title}!')">
          Like Post
        </button>
      </div>
    </div>
  `).join('');
}

/* Load last search if available */
function loadLastSearch() {
  const last = JSON.parse(localStorage.getItem(LAST_SEARCH_KEY));
  if (last && last.length) {
    renderResults(last);
    const input = document.getElementById('search-term');
    if (input) input.placeholder = '🔍 Last search loaded...';
  } else {
    searchOMDb();
  }
}

/* Setup mobile menu toggle */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  updateAuthLink();
  loadLastSearch();

  const btn = document.getElementById('search-btn');
  if (btn) btn.addEventListener('click', () => searchOMDb());
});

window.showToast = showToast;
window.handleLogout = handleLogout;
