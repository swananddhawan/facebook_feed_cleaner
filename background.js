chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.includes("facebook.com")) {
    chrome.tabs.executeScript(details.tabId, { file: "content.js" });
  }
});
