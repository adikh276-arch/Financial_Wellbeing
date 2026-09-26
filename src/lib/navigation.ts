declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

/**
 * Centrally preserves active URL query parameters (service, upa_id, uid, etc.)
 * when navigating to a new path or route.
 */
export const preserveQueryParams = (targetPath: string): string => {
  if (typeof window === 'undefined' || !window.location) {
    return targetPath;
  }

  const [pathname, targetQuery] = targetPath.split('?');
  const currentParams = new URLSearchParams(window.location.search || '');

  // Normalize legacy 'source' param to 'service'
  if (currentParams.has('source')) {
    const val = currentParams.get('source');
    if (val && !currentParams.has('service')) {
      currentParams.set('service', val);
    }
    currentParams.delete('source');
  }

  // Fallback to cached upa_id from sessionStorage if missing
  if (!currentParams.has('upa_id')) {
    try {
      const cachedUpa = sessionStorage.getItem('fw_upa_id') || sessionStorage.getItem('upa_id');
      if (cachedUpa) currentParams.set('upa_id', cachedUpa);
    } catch {
      // ignore storage access errors
    }
  }

  if (targetQuery) {
    const targetParams = new URLSearchParams(targetQuery);
    targetParams.forEach((value, key) => {
      if (key === 'source') {
        currentParams.set('service', value);
      } else {
        currentParams.set(key, value);
      }
    });
  }

  const mergedSearch = currentParams.toString();
  return mergedSearch ? `${pathname}?${mergedSearch}` : pathname;
};

/**
 * Centrally handles exit across all 3 contexts:
 * 1. React Native WebView -> window.ReactNativeWebView.postMessage
 * 2. iframe inside web.mantracare.com -> window.parent.postMessage
 * 3. Localhost -> returns to local dashboard
 * 4. Standalone browser -> redirects to https://web.mantracare.com/tasks
 */
export function handleExit() {
  if (typeof window === 'undefined') return;

  // 1. React Native WebView
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        action: 'exit',
      })
    );
    return;
  }

  // 2. iframe inside web.mantracare.com
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        action: 'exit',
      },
      'https://web.mantracare.com'
    );
    return;
  }

  // Localhost dev environment fallback
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.location.href = '/financial_wellbeing';
    return;
  }

  // 3. Standalone browser
  window.location.href = 'https://web.mantracare.com/tasks';
}

/**
 * Backward-compatible alias for handleExit
 */
export const handleExternalExit = handleExit;

/**
 * Handles back routing, delegating to onBackCallback or handleExit.
 */
export const goBack = (onBackCallback?: () => void) => {
  if (onBackCallback) {
    onBackCallback();
  } else {
    handleExit();
  }
};

/**
 * Redirects back to Dashboard / Exit.
 */
export const goToDashboard = () => {
  handleExit();
};
