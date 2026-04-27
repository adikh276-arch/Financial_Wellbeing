'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  History, ChevronLeft, ChevronRight, Clock, 
  Trash2, Shield, Wallet, TrendingUp, Heart, 
  BarChart3, Award, Target, Info
} from 'lucide-react';
import { storage, fmt } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryEntry {
  id: string;
  type: string;
  title: string;
  date: string;
  score?: number;
  label?: string;
  data: any;
  icon: any;
  color: string;
}

export default function ActivityHistory() {
  const { t } = useTranslation();
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const all: HistoryEntry[] = [];

      // 1. Health Score
      const health = storage.get('health_score_history', []);
      health.forEach((h: any, i: number) => all.push({
        id: `health-${i}`,
        type: 'health_score',
        title: t('Financial Health Score'),
        date: h.date,
        score: h.score,
        data: h,
        icon: Award,
        color: '#F39C12'
      }));

      // 2. Budget
      const budget = storage.get('budget_history', []);
      budget.forEach((h: any, i: number) => all.push({
        id: `budget-${i}`,
        type: 'budget',
        title: t('Monthly Budget Flow'),
        date: h.date,
        label: h.surplus >= 0 ? t('Surplus') : t('Deficit'),
        score: h.surplus,
        data: h,
        icon: Wallet,
        color: '#00A884'
      }));

      // 3. Emergency Fund
      const ef = storage.get('emergency_fund_history', []);
      ef.forEach((h: any, i: number) => all.push({
        id: `ef-${i}`,
        type: 'emergency_fund',
        title: t('Emergency Fund Target'),
        date: h.date,
        score: h.currentSaved,
        label: `${Math.round((h.currentSaved / h.target) * 100)}% ${t('Funded')}`,
        data: h,
        icon: Shield,
        color: '#e84393'
      }));

      // 4. Investment
      const invest = storage.get('invest_history', []);
      invest.forEach((h: any, i: number) => all.push({
        id: `invest-${i}`,
        type: 'investment',
        title: t('Wealth Projection'),
        date: h.date,
        score: h.projectedAmount,
        label: t(h.riskLevel),
        data: h,
        icon: TrendingUp,
        color: '#2563EB'
      }));

      // 5. Quizzes
      const styles = storage.get('spending_style_history', []);
      styles.forEach((h: any, i: number) => all.push({
        id: `style-${i}`,
        type: 'spending_style',
        title: t('Spending Style'),
        date: h.date,
        label: t(h.label || 'Archetype'),
        data: h,
        icon: Heart,
        color: '#e84393'
      }));

      const savings = storage.get('savings_checkup_history', []);
      savings.forEach((h: any, i: number) => all.push({
        id: `savings-${i}`,
        type: 'savings_checkup',
        title: t('Savings Check-up'),
        date: h.date,
        score: h.score,
        label: t(h.label),
        data: h,
        icon: Target,
        color: '#BE185D'
      }));

      // Sort by date descending
      all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEntries(all);
      setLoading(false);
    };

    loadHistory();
  }, [t]);

  const clearHistory = () => {
    if (confirm(t('Are you sure you want to clear all history? This cannot be undone.'))) {
      // Clear all history keys
      ['health_score_history', 'budget_history', 'emergency_fund_history', 'invest_history', 'spending_style_history', 'savings_checkup_history'].forEach(key => {
        storage.set(key, []);
      });
      setEntries([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <PageHeader 
        title={t("Financial History")}
        subtitle="Activities"
        backHref="/"
        rightSlot={entries.length > 0 && (
          <button onClick={clearHistory} className="btn-icon" style={{ color: 'var(--brand-danger)', background: 'rgba(231,76,60,0.1)' }}>
            <Trash2 size={18} />
          </button>
        )}
      />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-16) 0', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-3xl)', background: 'var(--bg-glass-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', color: 'var(--text-faint)' }}>
              <History size={40} strokeWidth={1.5} />
            </div>
            <h2 className="heading-lg" style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{t('No Activity Yet')}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 300, margin: '0 auto var(--space-10)', lineHeight: 1.6 }}>{t('Your financial assessments and planning history will appear here once you start using the tools.')}</p>
            <button className="btn btn-primary" onClick={() => router.push('/')}>{t('Return to Dashboard')}</button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stack-4"
          >
            <div style={{ marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <label className="label-caps">{t('Recent Activities')}</label>
               <span style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 700 }}>{entries.length} {t('Entries')}</span>
            </div>

            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card card-tap"
                style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', border: '1px solid var(--border-subtle)' }}
              >
                <div style={{ 
                  width: 48, height: 48, borderRadius: 'var(--radius-xl)', 
                  background: `${entry.color}15`, color: entry.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <entry.icon size={22} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }} className="truncate">{entry.title}</h3>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)', fontWeight: 700 }}>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: entry.color }}>
                      {entry.type === 'budget' ? (entry.score >= 0 ? '+' : '') + fmt.currency(entry.score) : 
                       entry.type === 'investment' ? fmt.currency(entry.score, true) :
                       entry.type === 'health_score' ? `${entry.score}/100` :
                       entry.score ? fmt.number(entry.score) : ''}
                    </span>
                    {entry.label && (
                      <>
                        <span style={{ color: 'var(--border-default)' }}>•</span>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{entry.label}</span>
                      </>
                    )}
                  </div>
                </div>

                <ChevronRight size={18} color="var(--text-faint)" />
              </motion.div>
            ))}

            <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-8)', background: 'var(--bg-glass-light)', borderRadius: 'var(--radius-2xl)', textAlign: 'center', border: '1px dotted var(--border-subtle)' }}>
               <Info size={24} color="var(--text-faint)" style={{ margin: '0 auto 12px' }} />
               <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{t('Your activity data is stored locally and synced with our secure cloud to ensure you never lose your progress across sessions.')}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
