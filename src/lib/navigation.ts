export const handleExternalExit = () => {
  if (typeof window !== 'undefined') {
    if (window.parent !== window) {
      // Send to both specific and wildcard to ensure delivery in different environments
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      window.parent.postMessage({ action: 'exit' }, '*');
    }
    
    // Always trigger a location change as a fallback after a tiny delay
    setTimeout(() => {
      window.location.href = 'https://web.mantracare.com';
    }, 100);
  }
};
