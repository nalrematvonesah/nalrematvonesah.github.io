
// Day/Night mode with LocalStorage
(function(){
  const THEME_KEY = 'tmnt_theme';
  const saved = localStorage.getItem(THEME_KEY);
  if(saved === 'dark'){
    document.documentElement.classList.add('theme-dark');
  }
  // Expose toggle
  window.toggleTheme = function(){
    const root = document.documentElement;
    const dark = root.classList.toggle('theme-dark');
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    // update aria-pressed
    const btn = document.getElementById('theme-toggle');
    if(btn){ btn.setAttribute('aria-pressed', String(dark)); }
  };
})();
