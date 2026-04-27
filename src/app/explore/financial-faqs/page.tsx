'use client';

import { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  Wallet, Shield, TrendingUp, CreditCard, Brain, Zap, Clock, BookOpen, MessageCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';

const FAQS = [
  { q: "How much emergency fund is ideal?", a: "A standard recommendation is 3-6 months of essential living expenses. If your income is volatile or you work in a niche industry, consider 9-12 months for extreme security.", icon: Shield },
  { q: "Should I pay off debt or invest first?", a: "Generally, pay off high-interest debt (above 7-8%) first. If your debt is low-interest (like a mortgage) and you have a solid reserve, starting an index fund investment can build more wealth over time.", icon: CreditCard },
  { q: "What is the 50/30/20 rule?", a: "It's a simple allocation model: 50% of income for Needs (rent, bills), 30% for Wants (hobbies, dining), and 20% for Savings and Debt repayment.", icon: Wallet },
  { q: "How do I start investing with small amounts?", a: "Use systematic investment plans (SIPs) or micro-investing platforms. Buying low-cost index funds regularly is more important than the starting amount.", icon: TrendingUp },
  { q: "Is insurance an investment?", a: "Strictly speaking, no. Insurance is risk protection. Traditional plans that mix both often have high fees. It's usually better to keep them separate: buy pure insurance and invest for growth.", icon: Brain },
  { q: "When should I review my financial plan?", a: "At least once every 6 months, or whenever a major life event occurs (career change, marriage, etc.). Regular audits ensure your strategy remains aligned with your goals.", icon: Clock },
];

export default function FinancialFAQs() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="page-wrapper">
      <PageHeader 
        title="Financial FAQs"
        subtitle="Answers to common money questions"
        backHref="/explore"
        accentColor="var(--brand-accent)"
      />

      <main className="container-max" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="stack-column" style={{ gap: '12px' }}>
          {FAQS.map((faq, i) => (
             <div 
               key={i} 
               className="action-card" 
               style={{ 
                 overflow: 'hidden', 
                 padding: 0,
                 border: openIdx === i ? '1px solid var(--brand-accent)' : '1px solid var(--border-subtle)',
                 transition: 'all 0.3s ease'
               }}
             >
                <button 
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ 
                    width: '100%', 
                    padding: '24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: openIdx === i ? 'var(--bg-base)' : 'transparent',
                    transition: 'background 0.3s ease'
                  }}
                >
                   <div className="flex items-center gap-4">
                      <div className="card-icon-box" style={{ 
                        width: '40px', height: '40px', marginBottom: 0, 
                        background: openIdx === i ? 'var(--brand-accent)' : 'var(--bg-base)',
                        color: openIdx === i ? 'white' : 'var(--brand-accent)'
                      }}>
                        <faq.icon size={20} />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>{t(faq.q)}</span>
                   </div>
                   {openIdx === i ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
                </button>
                
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 24px 80px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px', fontWeight: 500 }}>
                         {t(faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          ))}
        </div>
      </main>
    </div>
  );
}
