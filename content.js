function applyDarkMode() {
  let style = document.createElement('style');
  style.id = 'dark-mode-style';
  style.innerText = `
    body {
      background-color: #121212 !important;
      color: #ffffff !important;
    }
    a { color: #bb86fc !important; }
  `;
  document.head.appendChild(style);
}

function removeDarkMode() {
  let style = document.getElementById('dark-mode-style');
  if (style) style.remove();
}

// Vérifie si le mode sombre est activé dans le stockage Chrome
chrome.storage.sync.get(['darkMode'], function(result) {
  if (result.darkMode) {
    applyDarkMode();
  }
  else {
    removeDarkMode(); // Ensure this function is called to remove dark mode if not active
  }
});
