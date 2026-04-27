'use client';

import {
  TrendingUp, CreditCard, Layout, XCircle, Brain, CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';

const MYTHS = [
  {
    myth: "Investing is only for the rich",
    reality: "Wealth is built by investing early and consistently, even with small amounts. Micro-investing apps have democratized the markets.",
    icon: TrendingUp,
    color: "#2563EB"
  },
  {
    myth: "Debt is always a negative",
    reality: "Strategic debt (like low-interest mortgages or education loans) can build long-term value. Only high-interest consumer debt is truly destructive.",
    icon: CreditCard,
    color: "#059669"
  },
  {
    myth: "Buying a home is always better than renting",
    reality: "The total cost of ownership (taxes, maintenance, insurance) can sometimes exceed the benefits of appreciation. Renting and investing the difference is often viable.",
    icon: Layout,
    color: "#D97706"
  },
  {
    myth: "You need a high IQ to master finance",
    reality: "Emotional temperament and discipline are far more important than complex math. Systematic habits beat intelligence every time.",
    icon: Brain,
    color: "#7C3AED"
  }
];

export default function FinancialMyths() {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper">
      <PageHeader 
        title="Money Myths"
        subtitle="Common misconceptions about money"
        backHref="/explore"
        accentColor="#EF4444"
      />

      <main className="container-max" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="stack-column" style={{ gap: '20px' }}>
          {MYTHS.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="action-card" style={{ padding: '32px' }}>
                <div className="flex items-start gap-6">
                  <div className="card-icon-box" style={{ 
                    width: '56px', height: '56px', marginBottom: 0, 
                    background: `${m.color}10`, color: m.color 
                  }}>
                    <m.icon size={28} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle size={16} className="text-danger" />
                      <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--brand-danger)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('The Myth')}</span>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>
                      {t(m.myth)}
                    </h3>
                    
                    <div style={{ background: 'var(--bg-base)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} color="var(--brand-success)" />
                        <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--brand-success)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('The Reality')}</span>
                      </div>
                      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
                        {t(m.reality)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
