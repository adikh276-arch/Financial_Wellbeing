'use client';

import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Zap, BarChart2, AlertCircle, Shield, Target, PieChart, Heart, Star, Compass, TrendingUp, Brain } from 'lucide-react';
import { useState } from 'react';

const modules = [
  { href: '/learn/budgeting-basics', label: 'Budgeting Basics', icon: PieChart, time: '5 min', color: '#6C5CE7', colorBg: '#6C5CE715', tag: 'Foundational' },
  { href: '/learn/saving-habits', label: 'Saving Habits', icon: Zap, time: '6 min', color: '#F39C12', colorBg: '#F39C1215', tag: 'Habits' },
  { href: '/learn/debt-management', label: 'Debt Management', icon: AlertCircle, time: '7 min', color: '#E74C3C', colorBg: '#E74C3C15', tag: 'Debt' },
  { href: '/learn/investing-basics', label: 'Investing Basics', icon: BarChart2, time: '8 min', color: '#0984e3', colorBg: '#0984e315', tag: 'Investing' },
  { href: '/learn/emergency-fund', label: 'Emergency Fund', icon: Shield, time: '5 min', color: '#00A884', colorBg: '#00A88415', tag: 'Safety' },
  { href: '/learn/financial-goals', label: 'Financial Goals', icon: Target, time: '6 min', color: '#e84393', colorBg: '#e8439315', tag: 'Goals' },
  { href: '/learn/50-30-20-rule', label: '50/30/20 Rule', icon: PieChart, time: '4 min', color: '#00B1B1', colorBg: '#00B1B115', tag: 'Foundational' },
  { href: '/learn/mindful-spending', label: 'Mindful Spending', icon: Heart, time: '6 min', color: '#e84393', colorBg: '#e8439315', tag: 'Behavior' },
  { href: '/learn/your-money-priorities', label: 'Your Money Priorities', icon: Star, time: '7 min', color: '#FDCB6E', colorBg: '#FDCB6E15', tag: 'Mindset' },
  { href: '/learn/plan-for-your-future', label: 'Plan for Your Future', icon: Compass, time: '9 min', color: '#6C5CE7', colorBg: '#6C5CE715', tag: 'Strategy' },
  { href: '/learn/understand-your-income-expenses', label: 'Understand Your Income & Expenses', icon: TrendingUp, time: '6 min', color: '#0984e3', colorBg: '#0984e315', tag: 'Foundational' },
  { href: '/learn/avoid-common-money-mistakes', label: 'Avoid Common Money Mistakes', icon: Brain, time: '10 min', color: '#E17055', colorBg: '#E1705515', tag: 'Behavior' },
];

const tags = ['All', 'Foundational', 'Habits', 'Investing', 'Debt', 'Safety', 'Goals', 'Behavior', 'Mindset', 'Strategy'];

export default function LearnHub() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? modules : modules.filter(m => m.tag === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="topbar">
         <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-brand)' }}>
            <BookOpen size={22} color="white" />
         </div>
         <h1 className="heading-md">Academy</h1>
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-8)' }}>
           <h2 className="display-sm" style={{ marginBottom: 4 }}>Master Your Capital</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>12 expert-curated modules for financial fluency.</p>
        </div>

        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {tags.map(tag => (
            <button key={tag} className={`chip ${filter === tag ? 'active' : ''}`} onClick={() => setFilter(tag)}>
              {tag}
            </button>
          ))}
        </div>

        <div className="stack-4">
          {filtered.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.href} href={mod.href} style={{ textDecoration: 'none' }}>
                <div className="card card-tap" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 'var(--space-4) var(--space-5)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: mod.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={mod.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, marginBottom: 4 }}>{t(mod.label)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                       <span style={{ fontSize: 10, fontWeight: 750, color: mod.color, background: mod.colorBg, padding: '2px 8px', borderRadius: 99, border: `1px solid ${mod.color}25` }}>{t(mod.tag)}</span>
                       <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} /> {mod.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-faint)" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
