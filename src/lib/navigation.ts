export const handleExternalExit = () => {
  if (typeof window !== 'undefined') {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      window.parent.postMessage({ action: 'exit' }, '*');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  }
};
