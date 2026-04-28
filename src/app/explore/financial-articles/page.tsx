'use client';

import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  Wallet, Shield, TrendingUp, CreditCard, Brain, Zap, Clock, BookOpen, MessageCircle, FileText, ChevronRight, X, Star, Award, Activity, Target, Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';

const ARTICLES = [
  { id: 1, title: "The Complete Beginner's Guide to Mutual Funds", author: 'Financial Wellbeing Team', readTime: "12 min", category: "Investing", preview: "Mutual funds are a simple way to start investing professionally. Learn about systematic plans and risk-adjusted returns.", content: "Detailed content about mutual funds...", icon: TrendingUp, color: '#2563EB' },
  { id: 2, title: "How the 52-Week Money Challenge Can Transform Your Savings", author: 'Financial Wellbeing Team', readTime: "8 min", category: "Savings", preview: "Gamify your saving habit by increasing your weekly goal. By week 52, you will have a substantial emergency buffer.", content: "Step by step guide for the 52-week challenge...", icon: Zap, color: '#00B894' },
  { id: 3, title: "Understanding Your Credit Score: A Deep Dive", author: 'Financial Wellbeing Team', readTime: "10 min", category: "Credit", preview: "Learn how your score is calculated and the specific behaviors that can boost it or hurt it significantly.", content: "Comprehensive report on credit scoring algorithms...", icon: Activity, color: '#0984e3' },
  { id: 4, title: "Choosing Between Long-term Savings Vehicles", author: 'Financial Wellbeing Team', readTime: "14 min", category: "Tax", preview: "Comparison of various instruments for long-horizon capital growth and tax optimization.", content: "In-depth analysis of pension funds vs ETFs...", icon: Shield, color: '#FDCB6E' },
  { id: 5, title: "The Hidden Cost of Lifestyle Inflation", author: 'Financial Wellbeing Team', readTime: "7 min", category: "Behavior", preview: "Why raises often don't lead to more wealth. Learn how to maintain your savings rate during income shifts.", content: "Psychological strategies to combat lifestyle creep...", icon: Heart, color: '#fd79a8' },
  { id: 6, title: "Emergency Fund Math: How Much is Actually Enough?", author: 'Financial Wellbeing Team', readTime: "6 min", category: "Savings", preview: "A framework to calculate your custom safety net based on volatility and fixed obligations.", content: "Detailed mathematical models for emergency funds...", icon: Target, color: '#e84393' },
];

export default function FinancialArticles() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const categories = ['All', ...new Set(ARTICLES.map(a => a.category))];
  const filtered = activeCategory === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="page-wrapper">
      <PageHeader 
        title="Financial Articles"
        subtitle="In-depth reads on financial wellbeing"
        backHref="/"
        accentColor="var(--brand-primary)"
      />

      <main className="inner-content">
        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {categories.map(cat => (
            <button key={cat} className={`chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {t(cat)}
            </button>
          ))}
        </div>

        <div className="stack-column" style={{ gap: '16px' }}>
          {filtered.map((article) => (
             <div 
               key={article.id} 
               className="action-card" 
               onClick={() => setSelectedId(article.id === selectedId ? null : article.id)} 
               style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.3s ease' }}
             >
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div className="card-icon-box" style={{ 
                    width: 56, height: 56, 
                    background: `${article.color}10`, 
                    color: article.color, 
                    marginBottom: 0,
                    borderRadius: '12px'
                  }}>
                    <article.icon size={28} />
                  </div>
                  <div style={{ flex: 1 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                        <span className="badge-pill" style={{ background: `${article.color}10`, color: article.color }}>
                          {t(article.category)}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                           <Clock size={14} /> {t(article.readTime)}
                        </div>
                     </div>
                     <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
                       {t(article.title)}
                     </h3>
                     <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                       {t(article.preview)}
                     </p>
                     
                     {selectedId === article.id && (
                       <motion.div 
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}
                       >
                          <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.8, fontWeight: 500 }}>
                            {t("The full analysis for \"{{title}}\" by the Financial Wellness Team is reserved for in-depth academy modules. Key takeaways include optimizing capital allocation and understanding behavioral friction points.", { title: t(article.title) })}
                          </p>
                       </motion.div>
                     )}
                  </div>
                </div>
             </div>
          ))}
        </div>
      </main>
    </div>
  );
}
