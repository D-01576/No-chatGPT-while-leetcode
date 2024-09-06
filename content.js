const createPopup = () => {
    let popup = document.querySelector('#my-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'my-popup';
      popup.style.position = 'fixed';
      popup.style.top = '0';
      popup.style.left = '0';
      popup.style.width = '100vw';
      popup.style.height = '100vh';
      popup.style.background = 'rgb(0, 0, 0,0.9)';
      popup.style.display = 'flex';
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.style.color = 'red';
      popup.style.fontSize = '3em';
      popup.style.weight = "bold"
      popup.style.textAlign = 'center';
      popup.style.zIndex = '9999';
      popup.textContent = 'Remember! You actually want No chatGPT while leetcode';
  
      document.body.appendChild(popup);
    }
  };

  const removePopup = () => {
    const popup = document.querySelector('#my-popup');
    if (popup) {
      document.body.removeChild(popup);
    }
  };
  const updatePopup = () => {
    chrome.storage.local.get(['hasLeetCodeTab'], (result) => {
      if (result.hasLeetCodeTab) {
        createPopup();
      } else {
        removePopup();
      }
    });
  };
  
  updatePopup();
  
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.hasLeetCodeTab) {
      updatePopup();
    }
  });
  