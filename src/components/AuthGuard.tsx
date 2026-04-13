"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("financial_wellbeing_user_id");
    const hasToken = new URLSearchParams(window.location.search).has("token");

    if (!user && !hasToken) {
      // Capture the path after /financial_wellbeing
      sessionStorage.setItem("redirect_path", pathname);

      const authUrl = "https://web.mantracare.com/app/financial_wellbeing?redirect_url=https://platform.mantracare.com/financial_wellbeing";
      console.log("Redirecting to auth portal...", authUrl);
      window.location.href = authUrl;
    } else if (user) {
      setIsAuthorized(true);
    }
  }, [pathname]);

  if (!isAuthorized) {
    // If we have a token, we must render children so the TokenHandler can process it
    const hasToken = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has("token");
    
    if (hasToken) {
      return <>{children}</>;
    }

    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
