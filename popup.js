document.addEventListener('DOMContentLoaded', function() {
  let toggleButton = document.getElementById('toggleDarkMode');
  let statusText = document.getElementById('status');

  function updateUI(isDarkMode) {
    toggleButton.textContent = isDarkMode ? 'Désactiver' : 'Activer';
    statusText.textContent = `Statut : ${isDarkMode ? 'Activé' : 'Désactivé'}`;
  }

  function toggleDarkMode(enable) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: enable
            ? () => {
                document.body.style.backgroundColor = "#121212";
                document.body.style.color = "#ffffff";
              }
            : () => {
                document.body.style.backgroundColor = "";
                document.body.style.color = "";
              }
        });
      }
    });
  }

  chrome.storage.sync.get(['darkMode'], function(result) {
    updateUI(result.darkMode);
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.sync.get(['darkMode'], function(result) {
      let newMode = !result.darkMode;
      chrome.storage.sync.set({ darkMode: newMode }, function() {
        updateUI(newMode);
        toggleDarkMode(newMode);
      });
    });
  });
});
