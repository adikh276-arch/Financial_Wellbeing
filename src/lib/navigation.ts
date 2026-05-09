export const handleExternalExit = () => {
  if (typeof window !== 'undefined') {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit', path: '/finance' }, 'https://web.mantracare.com');
      window.parent.postMessage({ action: 'exit', path: '/finance' }, '*');
    } else {
      window.location.href = 'https://web.mantracare.com/finance';
    }
  }
};
