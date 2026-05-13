'use client';

import { useState } from 'react';
import {
  CreditCard, ArrowRight, RotateCcw, Check, CheckCircle,
  TrendingDown, LayoutList, Zap, BookOpen, ChevronRight, Share2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ShareModal } from '@/components/shared/ShareModal';

const STEPS = ['Learn', 'Choose', 'Action'];
const ACCENT = '#3B82F6';

type Strategy = 'snowball' | 'avalanche' | null;

const STRATEGY_INFO = {
  snowball: {
    title: 'Debt Snowball',
    tag: 'Psychological Win',
    icon: <LayoutList size={22} color={ACCENT} />,
    desc: 'Pay the minimum on all debts. Put all extra money onto the smallest debt first. When it is paid off, roll that payment to the next smallest. The momentum keeps you motivated.',
    steps: [
      'List all debts from smallest to largest balance',
      'Make minimum payments on everything except the smallest',
      'Attack the smallest debt with every extra dollar you have',
      'Once paid, roll that full payment to the next debt on the list',
    ],
  },
  avalanche: {
    title: 'Debt Avalanche',
    tag: 'Mathematically Best',
    icon: <Zap size={22} color={ACCENT} />,
    desc: 'Pay the minimum on all debts. Put all extra money onto the debt with the highest interest rate first. This saves the most money over time.',
    steps: [
      'List all debts from highest to lowest interest rate',
      'Make minimum payments on everything except the highest rate',
      'Attack the highest-interest debt with every extra dollar',
      'Once paid, redirect that payment to the next highest rate debt',
    ],
  },
};

export default function DebtManagementPage() {
  const router = useRouter();
  const { t } = useTranslation(['debt-management-guide', 'share']);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [step, setStep] = useState(-1);
  const [strategy, setStrategy] = useState<Strategy>(null);
  const [completed, setCompleted] = useState(false);

  const handleReset = () => {
    setCompleted(false);
    setStep(-1);
    setStrategy(null);
  };

  const info = strategy ? STRATEGY_INFO[strategy] : null;

  return (
  return (
    <div className="inner-page">
      <div className="inner-content">

        <PageHeader
          title={t('Debt Management Guide')}
          subtitle={t('ACTIVITY')}
          backHref="/"
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
              <CreditCard size={40} color={ACCENT} />
            </div>
            <p className="label-caps" style={{ color: ACCENT, marginBottom: 8 }}>DEBT-FREE PATHWAY</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>
              {t('Take Control of Your Debt')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto var(--space-8)' }}>
              {t("Debt doesn't have to be a burden forever. Learn the smartest ways to pay it off and reclaim your peace of mind.")}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 400, margin: '0 auto var(--space-10)', textAlign: 'left' }}>
              {[
                { icon: <BookOpen size={16} color={ACCENT} />, text: t('Learn to differentiate good vs. high-cost debt') },
                { icon: <LayoutList size={16} color={ACCENT} />, text: t('Choose a proven mathematical repayment strategy') },
                { icon: <CheckCircle size={16} color="#00A884" />, text: t('Build a step-by-step commitment action plan') },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  background: 'white', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220 }}>
              {t('Get Started')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 0: Learn ── */}
        {step === 0 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: `${ACCENT}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-4)',
              }}>
                <BookOpen size={26} color={ACCENT} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('Understanding Debt')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Not all debt is bad. Know the difference.')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {[
                {
                  label: t('Good Debt'), color: '#00A884', bg: '#00A88415',
                  items: [t('Student loans for career growth'), t('Home mortgage builds equity'), t('Business loans for income generation')],
                },
                {
                  label: t('High-Cost Debt'), color: '#E74C3C', bg: '#E74C3C15',
                  items: [t('Credit card interest (18–45%)'), t('Personal loans for lifestyle'), t('Buy-now-pay-later traps')],
                },
              ].map(cat => (
                <div key={cat.label} style={{
                  background: 'white', border: `1px solid ${cat.color}30`,
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}>
                  <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: cat.color, marginBottom: 'var(--space-3)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' }}>
                    {cat.label}
                  </p>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < cat.items.length - 1 ? 8 : 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(1)} style={{ width: '100%' }}>
              {t('Choose My Strategy')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 1: Choose ── */}
        {step === 1 && (
          <div style={{ animation: 'slideInRight 0.35s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('Choose Your Strategy')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Pick the method that fits your personality and situation.')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {(Object.keys(STRATEGY_INFO) as Strategy[]).filter(Boolean).map(key => {
                const s = STRATEGY_INFO[key!];
                const selected = strategy === key;
                return (
                  <button
                    key={key}
                    onClick={() => setStrategy(key)}
                    style={{
                      width: '100%', background: 'white', textAlign: 'left', cursor: 'pointer',
                      border: selected ? `2px solid ${ACCENT}` : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)',
                      boxShadow: selected ? `0 0 0 3px ${ACCENT}20` : 'var(--shadow-xs)',
                      transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: selected ? `${ACCENT}15` : 'var(--bg-base)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{s.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{s.title}</p>
                        <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, background: `${ACCENT}15`, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.tag}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.desc.substring(0, 80)}...</p>
                    </div>
                    <ChevronRight size={18} color={selected ? ACCENT : 'var(--text-faint)'} style={{ flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)} disabled={!strategy} style={{ width: '100%' }}>
              {t('Build My Action Plan')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 2: Action Plan ── */}
        {step === 2 && info && !completed && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: `${ACCENT}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-4)',
              }}>{info.icon}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {info.title} {t('Plan')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6, lineHeight: 1.5, maxWidth: 380, margin: '8px auto 0' }}>
                {info.desc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {info.steps.map((stepText, i) => (
                <div key={i} style={{
                  background: 'white', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                  display: 'flex', gap: 'var(--space-4)', boxShadow: 'var(--shadow-xs)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: ACCENT,
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, flexShrink: 0,
                  }}>{i + 1}</div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)', lineHeight: 1.5, alignSelf: 'center' }}>{stepText}</p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setCompleted(true)} style={{ width: '100%' }}>
              {t('I Commit to This Plan')} <Check size={18} />
            </button>
          </div>
        )}

        {/* ── Completed ── */}
        {completed && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: '0 12px 32px rgba(59,130,246,0.3)',
            }}>
              <CheckCircle size={44} color="white" />
            </div>
            <p className="label-caps" style={{ color: ACCENT, marginBottom: 8 }}>ACTIVITY COMPLETE</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Pathway to Freedom! 🎯')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto var(--space-10)' }}>
              {t('You now have a proven strategy to eliminate your debt. Consistency is your greatest ally.')}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', maxWidth: 320, margin: '0 auto' }}>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              >
                <Share2 size={20} /> {t('share:share')}
              </button>
              <div style={{ display: 'flex', gap: 'var(--space-3)', width: '100%' }}>
                <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={handleReset}>
                  <RotateCcw size={16} /> {t('Start Over')}
                </button>
                <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => router.replace('/')}>
                  {t('Back')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        activityName={t('Debt Management Guide')} 
      />
    </div>
  );
}
