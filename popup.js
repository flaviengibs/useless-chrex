document.addEventListener('DOMContentLoaded', function() {
  let toggleButton = document.getElementById('toggleDarkMode');
  let statusText = document.getElementById('status');

  function updateUI(isDarkMode) {
    toggleButton.textContent = isDarkMode ? 'Disable' : 'Enable';
    statusText.textContent = `Statut : ${isDarkMode ? 'Active' : 'Inactive'}`;
  }

  function toggleDarkMode(enable) {
    let code = enable
      ? `document.body.style.backgroundColor = "#121212"; document.body.style.color = "#ffffff";`
      : `document.body.style.backgroundColor = ""; document.body.style.color = "";`;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: new Function(code)
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
