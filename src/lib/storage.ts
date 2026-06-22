import i18n from './i18n';
import { fetchUserRecord, saveUserRecord } from '@/actions/storageActions';

// ============================================================
// LOCAL STORAGE UTILITY — Financial Wellbeing
// ============================================================

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(`fw_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`fw_${key}`, JSON.stringify(value));
    } catch {
      // quota issues — silently fail
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`fw_${key}`);
  },

  clear(prefix?: string): void {
    if (typeof window === 'undefined') return;
    const p = `fw_${prefix ?? ''}`;
    Object.keys(localStorage)
      .filter(k => k.startsWith(p))
      .forEach(k => localStorage.removeItem(k));
  },

  async sync(key: string, data: any, score?: number): Promise<void> {
    if (typeof window === 'undefined') return;
    const userId = localStorage.getItem("financial_wellbeing_user_id") || localStorage.getItem("fw_guest_id");
    
    console.log(`[storage.sync] Triggered for key: ${key}. userId: ${userId}`);
    if (!userId) {
      console.warn('[storage.sync] Sync aborted: no userId found in localStorage.');
      return;
    }

    try {
      console.log(`[storage.sync] Saving user record to DB...`);
      await saveUserRecord(key, data, score);
      console.log(`[storage.sync] DB save successful.`);
      
      // Webhook Trigger for Daily Activity Completion
      const upaId = sessionStorage.getItem("fw_upa_id");
      const uid = sessionStorage.getItem("fw_uid");
      console.log(`[storage.sync] Webhook check - fw_upa_id: ${upaId}, fw_uid: ${uid}`);
      
      if (upaId && uid) {
        // Prevent firing multiple times per session by removing it after first successful save
        sessionStorage.removeItem("fw_upa_id");
        
        const payload = {
          intent: "complete_activity",
          upa_id: parseInt(upaId, 10),
          uid: uid
        };
        console.log('[storage.sync] Sending webhook POST to https://api.mantracare.com/webhook/pathway with payload:', payload);

        fetch('https://api.mantracare.com/webhook/pathway', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(async (res) => {
          console.log(`[storage.sync] Webhook response status: ${res.status}`);
          const text = await res.text();
          console.log(`[storage.sync] Webhook response body: ${text}`);
        })
        .catch(err => console.error("[storage.sync] Webhook fetch failed:", err));
      } else {
        console.log("[storage.sync] Skipping webhook trigger: fw_upa_id or fw_uid is missing in sessionStorage.");
      }
    } catch (err) {
      console.error('[storage.sync] Persistence sync failed:', err);
    }
  },

  async fetch(key: string): Promise<any | null> {
    if (typeof window === 'undefined') return null;
    const userId = localStorage.getItem("financial_wellbeing_user_id") || localStorage.getItem("fw_guest_id");
    if (!userId) return null;

    try {
      const data = await fetchUserRecord(key);
      return data;
    } catch (err) {
      console.error('Persistence fetch failed:', err);
      return null;
    }
  }
};

// ─── Format helpers ───────────────────────────────────────────
export const fmt = {
  currency: (n: number, compact = false) => {
    const lng = i18n.language || 'en';
    if (compact && n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(2)}M`;
    }
    if (compact && n >= 1_000) {
      return `${(n / 1_000).toFixed(1)}K`;
    }
    return new Intl.NumberFormat(lng, { maximumFractionDigits: 0 }).format(n);
  },
  percent: (n: number, decimals = 1) => `${n.toFixed(decimals)}%`,
  number: (n: number) => {
    const lng = i18n.language || 'en';
    return new Intl.NumberFormat(lng).format(Math.round(n));
  },
};

// ─── Financial calculations ───────────────────────────────────
export const calc = {
  // Compound interest: FV = PV(1+r)^n + PMT * [(1+r)^n - 1] / r
  futureValue: (principal: number, annualRate: number, years: number, monthlyAdd = 0) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const fvLump = principal * Math.pow(1 + r, n);
    const fvSip = monthlyAdd > 0 && r > 0
      ? monthlyAdd * (Math.pow(1 + r, n) - 1) / r * (1 + r)
      : monthlyAdd * n;
    return fvLump + fvSip;
  },

  // EMI: r * P * (1+r)^n / [(1+r)^n - 1]
  emi: (principal: number, annualRate: number, tenureMonths: number) => {
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / tenureMonths;
    return (r * principal * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  },

  // Monthly savings needed to reach goal
  monthlySavingsNeeded: (target: number, current: number, months: number, annualRate = 0) => {
    const remaining = target - current;
    if (months <= 0) return remaining;
    if (annualRate <= 0) return remaining / months;
    const r = annualRate / 100 / 12;
    return remaining * r / (Math.pow(1 + r, months) - 1);
  },
};
