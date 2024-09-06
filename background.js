const updateTabsState = () => {
    chrome.tabs.query({}, (tabs) => {
      const hasLeetCodeTab = tabs.some(tab => tab.url && tab.url.includes('leetcode.com'));
      const chatGPTTabs = tabs.filter(tab => tab.url && tab.url.includes('chatgpt.com'));
  
      chrome.storage.local.set({ hasLeetCodeTab: hasLeetCodeTab });
  
      chatGPTTabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: updatePopup,
        });
      });
    });
  };
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      updateTabsState();
    }
  });
  
  chrome.tabs.onCreated.addListener(() => {
    updateTabsState();
  });
  
  chrome.tabs.onRemoved.addListener(() => {
    updateTabsState();
  });
  
  chrome.runtime.onStartup.addListener(updateTabsState);
  