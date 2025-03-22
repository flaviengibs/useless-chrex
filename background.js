chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ darkMode: false });
});

function checkTimeAndApplyDarkMode() {
  let hour = new Date().getHours();
  let shouldEnable = hour >= 19 || hour < 7;
  chrome.storage.sync.set({ darkMode: shouldEnable });
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: shouldEnable ? applyDarkMode : removeDarkMode
      });
    });
  });
}

setInterval(checkTimeAndApplyDarkMode, 60000);
