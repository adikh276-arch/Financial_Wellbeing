'use client';

import { useState } from 'react';
import {
  PiggyBank, ArrowRight, RotateCcw, Check, CheckCircle,
  Wallet, Target, TrendingUp, Clock, ListChecks
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { handleExternalExit } from '@/lib/navigation';
import { storage, fmt } from '@/lib/storage';

const STEPS = ['Income', 'Budget', 'Plan'];
const ACCENT = '#3B82F6';

export default function BudgetBuddyPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(-1);
  const [income, setIncome] = useState('');
  const [completed, setCompleted] = useState(false);

  const amount = Number(income.replace(/,/g, '')) || 0;
  const needs = Math.round(amount * 0.5);
  const wants = Math.round(amount * 0.3);
  const savings = Math.round(amount * 0.2);

  const handleReset = () => {
    setCompleted(false);
    setStep(-1);
    setIncome('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>

        <PageHeader
          title={t('Budget Buddy')}
          subtitle="ACTIVITY"
          onBackClick={handleExternalExit}
          steps={step >= 0 && !completed ? STEPS : undefined}
          currentStep={step >= 0 ? step : undefined}
          accentColor={ACCENT}
        />

        {/* ── Intro ── */}
        {step === -1 && !completed && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 24, background: `${ACCENT}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-6)',
            }}>
              <PiggyBank size={40} color={ACCENT} />
            </div>
            <p className="label-caps" style={{ color: ACCENT, marginBottom: 8 }}>NEW ACTIVITY</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>
              {t('Own Your Money, Own Your Life')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto var(--space-8)' }}>
              {t("A budget isn't about restriction — it's about freedom. Let's build yours in under 10 minutes.")}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-10)', flexWrap: 'wrap' }}>
              {[
                { icon: <Clock size={16} color={ACCENT} />, label: 'TIME', val: '7 mins' },
                { icon: <ListChecks size={16} color={ACCENT} />, label: 'STEPS', val: '4 total' },
                { icon: <TrendingUp size={16} color={ACCENT} />, label: 'IMPACT', val: 'High' },
              ].map(item => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto var(--space-2)',
                  }}>{item.icon}</div>
                  <p className="label-caps" style={{ color: 'var(--text-faint)', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontWeight: 800, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item.val}</p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220 }}>
              {t('Get Started')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 0: Income ── */}
        {step === 0 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: `${ACCENT}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-4)',
              }}>
                <Wallet size={26} color={ACCENT} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t("What's your monthly income?")}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Enter your take-home pay after tax')}
              </p>
            </div>

            <div style={{
              background: 'white', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                {t('Monthly Income')}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-muted)' }}>$</span>
                <input
                  type="text"
                  value={income}
                  onChange={e => setIncome(e.target.value.replace(/[^0-9,]/g, ''))}
                  placeholder="0"
                  autoFocus
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--text-primary)',
                    width: '100%', fontFamily: 'var(--font-display)',
                  }}
                />
              </div>
              {amount > 0 && (
                <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginTop: 8 }}>
                  ✓ {fmt.currency(amount, true)} per month
                </p>
              )}
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => setStep(1)}
              disabled={!amount}
              style={{ width: '100%' }}
            >
              {t('Calculate My Budget')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 1: Budget Breakdown ── */}
        {step === 1 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('Your 50/30/20 Plan')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Based on')} <strong style={{ color: 'var(--text-primary)' }}>{fmt.currency(amount, true)}</strong> {t('monthly income')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {[
                { label: t('Needs (50%)'), desc: t('Rent, Food, Bills'), val: needs, color: '#2563EB', icon: <Wallet size={20} color="#2563EB" /> },
                { label: t('Wants (30%)'), desc: t('Dining, Fun, Hobbies'), val: wants, color: '#F39C12', icon: <Target size={20} color="#F39C12" /> },
                { label: t('Savings (20%)'), desc: t('Emergency, Investments'), val: savings, color: '#00A884', icon: <PiggyBank size={20} color="#00A884" /> },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'white', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${item.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'var(--text-lg)', color: item.color }}>
                    {fmt.currency(item.val, true)}
                  </p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)} style={{ width: '100%' }}>
              {t('See My Action Plan')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 2: Tips ── */}
        {step === 2 && !completed && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('Your Budget Action Plan')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('3 steps to make your budget work')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {[
                { num: '01', title: t('Track Every Rupee'), desc: t('Use a budgeting app or spreadsheet to log your spending daily.') },
                { num: '02', title: t('Automate Savings'), desc: t('Set up an auto-debit for your savings on payday. Pay yourself first.') },
                { num: '03', title: t('Review Monthly'), desc: t('Every month-end, compare actual spending vs your 50/30/20 targets.') },
              ].map(item => (
                <div key={item.num} style={{
                  background: 'white', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)',
                  display: 'flex', gap: 'var(--space-4)', boxShadow: 'var(--shadow-xs)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900,
                    color: `${ACCENT}30`, lineHeight: 1, flexShrink: 0, minWidth: 40,
                  }}>{item.num}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>{item.title}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setCompleted(true)} style={{ width: '100%' }}>
              {t('Complete Activity')} <Check size={18} />
            </button>
          </div>
        )}

        {/* ── Completed ── */}
        {completed && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00A884, #00D2D3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: '0 12px 32px rgba(0,168,132,0.3)',
            }}>
              <CheckCircle size={44} color="white" />
            </div>
            <p className="label-caps" style={{ color: '#00A884', marginBottom: 8 }}>ACTIVITY COMPLETE</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Budget Built! 🎉')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto var(--space-10)' }}>
              {t("You've taken a crucial step toward financial freedom. Stick to your plan and review it every month.")}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary btn-lg" onClick={handleReset}>
                <RotateCcw size={16} /> {t('Start Over')}
              </button>
              <button className="btn btn-primary btn-lg" onClick={handleExternalExit}>
                {t('Back to Dashboard')} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
