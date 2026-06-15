"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setSessionId } from "@/actions/sessionActions";

const REDIRECT_KEY = "APP_REDIRECT_PATH";
const USER_KEY = "financial_wellbeing_user_id";
const TOKEN_KEY = "session_token";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const processingRef = useRef(false);

  const restoreAndNavigate = useCallback((currentPath: string) => {
    const savedPath = localStorage.getItem(REDIRECT_KEY);
    localStorage.removeItem(REDIRECT_KEY);

    // Fallback Logic: Saved path -> Current Path (if landing on deep link with token) -> Home
    const targetPath = savedPath || currentPath || "/";
    
    console.log("Restoring navigation to:", targetPath);
    // Passing only the pathname to router.replace natively strips the token query param
    router.replace(targetPath);
  }, [router]);

  useEffect(() => {
    const userId = localStorage.getItem(USER_KEY);
    const token = searchParams.get("token");
    
    // Capture Webhook Parameters for Daily Activity Assignment
    const upaId = searchParams.get("upa_id");
    const uid = searchParams.get("uid");
    if (upaId && uid) {
      sessionStorage.setItem("fw_upa_id", upaId);
      sessionStorage.setItem("fw_uid", uid);
    }

    // 1. Intercept Unauthenticated Deep Links
    if (!userId && !token) {
      const fullPath = pathname + window.location.search;
      localStorage.setItem(REDIRECT_KEY, fullPath);
      
      const authUrl = `https://web.mantracare.com/app/financial_wellbeing?redirect_url=${window.location.origin}/financial_wellbeing`;
      console.log("Unauthenticated. Capturing path and redirecting to Auth Portal:", fullPath);
      window.location.href = authUrl;
      return;
    }

    // 2. Handle Auth Portal Return & Magic Links
    if (!userId && token && !processingRef.current) {
      processingRef.current = true;
      console.log("Token detected. Exchanging for User ID...");

      fetch("https://api.mantracare.com/user/user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token.startsWith('Bearer ') ? token : `Bearer ${token}` 
        },
        body: JSON.stringify({ token, auth_token: token }),
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        const id = data.id || data.user_id || data.therapy_user_id || data.user?.id || data.data?.id;
        if (id) {
          localStorage.setItem(USER_KEY, id.toString());
          localStorage.setItem(TOKEN_KEY, token);
          setSessionId(id.toString()).then(() => {
            localStorage.setItem("fw_session_synced", "true");
          }).catch(console.error);
          setIsAuthorized(true);
          restoreAndNavigate(pathname);
        } else {
          throw new Error("Invalid user data");
        }
      })
      .catch(err => {
        console.error("Authentication exchange failed:", err);
        processingRef.current = false;
        // Even on fail, clear the token to prevent loops
        router.replace("/");
      });
      return;
    }

    // 4. Stale Token Cleanup (Failsafe)
    if (userId && token) {
      console.log("User already authenticated. Cleaning stale token from URL.");
      router.replace(pathname);
      setIsAuthorized(true);
      return;
    }

    if (userId) {
      if (!localStorage.getItem("fw_session_synced")) {
        setSessionId(userId).then(() => {
          localStorage.setItem("fw_session_synced", "true");
        }).catch(console.error);
      }
      setIsAuthorized(true);
    }
  }, [pathname, searchParams, router, restoreAndNavigate]);

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t("Authenticating...")}</p>
      </div>
    );
  }

  return <>{children}</>;
}
