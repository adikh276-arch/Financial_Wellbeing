'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PiggyBank, Target, ListChecks, CreditCard, TrendingUp, 
  Brain, Shield, Landmark, Zap, Copy, Check as CheckIcon, 
  Sparkles, Compass, Lightbulb
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

const CATEGORY_META: Record<string, { color: string; bg: string }> = {
  Savings: { color: '#00A884', bg: '#00A88412' },
  Budgeting: { color: '#6C5CE7', bg: '#6C5CE712' },
  Debt: { color: '#E74C3C', bg: '#E74C3C12' },
  Investing: { color: '#0984e3', bg: '#0984e312' },
  Behavior: { color: '#F39C12', bg: '#F39C1212' },
};

const TIPS = [
  { category: t("Savings"), tip: "Automate your savings on payday. If you never see the money in your spending account, you won't miss it.", label: t("Automatic First") },
  { category: t("Savings"), tip: "Aim for a small win: Save your first 1,000 units. The psychological boost of a completed goal is transformative.", label: t("Starter Win") },
  { category: t("Budgeting"), tip: "The 48-hour rule: Wait 48 hours for any non-essential purchase over 1% of your income. Most impulses fade.", label: t("Cooling Period") },
  { category: t("Budgeting"), tip: "Audit subscriptions quarterly. Recurring micro-leaks are the silent killers of wealth.", label: t("Leak Audit") },
  { category: t("Debt"), tip: "Use the Avalanche Method: Pay off the highest interest debt first to minimize total interest paid.", label: t("Apex Strategy") },
  { category: t("Investing"), tip: "Time in the market beats timing the market. Start your systematic plan today, regardless of current volatility.", label: t("Consistency") },
];

export default function FinancialTips() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [copied, setCopied] = useState<string | null>(null);

  const categories = ['All', ...Object.keys(CATEGORY_META)];
  const filtered = filter === 'All' ? TIPS : TIPS.filter(t => t.category === filter);

  const handleCopy = (tip: string) => {
    navigator.clipboard?.writeText(tip);
    setCopied(tip);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="topbar">
         <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(253,203,110,0.3)' }}>
            <Lightbulb size={20} color="white" />
         </div>
         <h1 className="heading-md">{t("Strategic Tips")}</h1>
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-8)' }}>
           <h2 className="display-sm" style={{ marginBottom: 4 }}>{t("Bite-Sized Wisdom")}</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t("High-impact tactical moves to optimize your financial trajectory.")}</p>
        </div>

        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {categories.map(cat => (
            <button key={cat} className={`chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>

        <div className="stack-4">
          {filtered.map((tip, i) => {
            const meta = CATEGORY_META[tip.category] || { color: 'var(--brand-primary)', bg: 'var(--brand-primary-glow)' };
            const isCopied = copied === tip.tip;
            
            return (
              <div key={i} className="card card-hover" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                   <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                         <span className="badge" style={{ background: meta.bg, color: meta.color, fontSize: 9 }}>{tip.category}</span>
                         <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{tip.label}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>{tip.tip}</p>
                   </div>
                   <button onClick={() => handleCopy(tip.tip)} className="btn btn-secondary btn-icon btn-sm">
                      {isCopied ? <CheckIcon size={12} color="var(--brand-success)" /> : <Copy size={12} />}
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
