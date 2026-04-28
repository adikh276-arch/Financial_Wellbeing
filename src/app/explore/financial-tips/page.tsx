'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PiggyBank, Target, ListChecks, CreditCard, TrendingUp, 
  Brain, Shield, Landmark, Zap, Copy, Check as CheckIcon, 
  Sparkles, Compass, Lightbulb, ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_META: Record<string, { color: string; bg: string }> = {
  Savings: { color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
  Budgeting: { color: '#2563EB', bg: 'rgba(37, 99, 235, 0.08)' },
  Debt: { color: '#DC2626', bg: 'rgba(220, 38, 38, 0.08)' },
  Investing: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' },
  Behavior: { color: '#D97706', bg: 'rgba(217, 119, 6, 0.08)' },
};

const TIPS = [
  { category: "Savings", tip: "Automate your savings on payday. If you never see the money in your spending account, you won't miss it.", label: "Automatic First" },
  { category: "Savings", tip: "Aim for a small win: Save your first 1,000 units. The psychological boost of a completed goal is transformative.", label: "Starter Win" },
  { category: "Budgeting", tip: "The 48-hour rule: Wait 48 hours for any non-essential purchase over 1% of your income. Most impulses fade.", label: "Cooling Period" },
  { category: "Budgeting", tip: "Audit subscriptions quarterly. Recurring micro-leaks are the silent killers of wealth.", label: "Leak Audit" },
  { category: "Debt", tip: "Use the Avalanche Method: Pay off the highest interest debt first to minimize total interest paid.", label: "Apex Strategy" },
  { category: "Investing", tip: "Time in the market beats timing the market. Start your systematic plan today, regardless of current volatility.", label: "Consistency" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

export default function FinancialTips() {
  const { t } = useTranslation();
  const router = useRouter();
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
    <div className="page-wrapper">
      <PageHeader 
        title="Financial Tips"
        subtitle="Quick ideas to improve your money habits"
        backHref="/"
        accentColor="#F59E0B"
      />

      <main className="inner-content">
        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`chip ${filter === cat ? 'active' : ''}`} 
              onClick={() => setFilter(cat)}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        <motion.div 
          className="stack-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter}
          style={{ gap: '16px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tip, i) => {
              const meta = CATEGORY_META[tip.category] || { color: 'var(--brand-primary)', bg: 'var(--brand-primary-glow)' };
              const isCopied = copied === tip.tip;
              
              return (
                <motion.div 
                  key={tip.tip} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="action-card" style={{ padding: '24px', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge-pill" style={{ background: meta.bg, color: meta.color }}>
                          {t(tip.category)}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {t(tip.label)}
                        </span>
                      </div>
                      <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
                        {t(tip.tip)}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleCopy(tip.tip)} 
                      className="back-btn" 
                      style={{ width: 44, height: 44, flexShrink: 0, background: 'var(--bg-base)' }}
                    >
                      {isCopied ? <CheckIcon size={18} color="var(--brand-success)" /> : <Copy size={18} />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
