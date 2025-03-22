document.addEventListener('DOMContentLoaded', function() {
  let toggleButton = document.getElementById('toggleDarkMode');
  let statusText = document.getElementById('status');

  function updateUI(isDarkMode) {
    toggleButton.textContent = isDarkMode ? 'Désactiver' : 'Activer';
    statusText.textContent = `Statut : ${isDarkMode ? 'Activé' : 'Désactivé'}`;
  }

  chrome.storage.sync.get(['darkMode'], function(result) {
    updateUI(result.darkMode);
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.sync.get(['darkMode'], function(result) {
      let newMode = !result.darkMode;
      chrome.storage.sync.set({ darkMode: newMode }, function() {
        updateUI(newMode);
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: newMode ? applyDarkMode : removeDarkMode
            });
          });
        });
      });
    });
  });
});
