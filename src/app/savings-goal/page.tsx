'use client';

import { useState } from 'react';
import {
  Target, ArrowRight, RotateCcw, Check, CheckCircle,
  Gem, Calendar, TrendingUp, Rocket, Wallet, Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { handleExternalExit } from '@/lib/navigation';
import { fmt } from '@/lib/storage';

const STEPS = ['Goal', 'Target', 'Strategy'];
const ACCENT = '#F59E0B';

const CATEGORIES = [
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
  { id: 'vehicle', label: 'Vehicle', icon: '🚗' },
  { id: 'wedding', label: 'Wedding', icon: '💍' },
  { id: 'retirement', label: 'Retirement', icon: '🌅' },
  { id: 'other', label: 'Other', icon: '🎯' },
];

const STRATEGIES = [
  { id: 'auto', label: 'Auto-Debit', desc: 'Set and forget — auto-transfer on payday', icon: <Wallet size={18} color={ACCENT} /> },
  { id: 'cut', label: 'Cut & Save', desc: 'Reduce one expense category and redirect it', icon: <TrendingUp size={18} color={ACCENT} /> },
  { id: 'income', label: 'Extra Income', desc: 'Freelancing, side gig, or selling items', icon: <Star size={18} color={ACCENT} /> },
];

export default function SavingsGoalPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(-1);
  const [category, setCategory] = useState('');
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetMonths, setTargetMonths] = useState('12');
  const [savingStrategy, setSavingStrategy] = useState('');
  const [completed, setCompleted] = useState(false);

  const amount = Number(targetAmount.replace(/,/g, '')) || 0;
  const months = Number(targetMonths) || 12;
  const monthly = amount > 0 ? Math.ceil(amount / months) : 0;

  const handleReset = () => {
    setCompleted(false);
    setStep(-1);
    setCategory('');
    setGoalName('');
    setTargetAmount('');
    setTargetMonths('12');
    setSavingStrategy('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>

        <PageHeader
          title={t('Savings Goal Setter')}
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
              <Target size={40} color={ACCENT} />
            </div>
            <p className="label-caps" style={{ color: ACCENT, marginBottom: 8 }}>MANIFEST YOUR DREAMS</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>
              {t('Dream It. Plan It. Save It.')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto var(--space-8)' }}>
              {t("A goal without a plan is just a wish. Let's turn your aspirations into a concrete savings roadmap today.")}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', maxWidth: 380, margin: '0 auto var(--space-10)', textAlign: 'left' }}>
              {[
                { icon: <Gem size={16} color={ACCENT} />, title: t('Crystal Clear'), desc: t('Define exactly what you want and why') },
                { icon: <Calendar size={16} color={ACCENT} />, title: t('Time Bound'), desc: t('Pick a deadline that motivates you') },
                { icon: <Wallet size={16} color={ACCENT} />, title: t('Budget Fit'), desc: t('Calculate the exact push needed') },
                { icon: <Rocket size={16} color={ACCENT} />, title: t('Success Path'), desc: t('Choose a strategy that ensures success') },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'white', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)',
                  boxShadow: 'var(--shadow-xs)',
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-2)' }}>
                    {item.icon}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 12, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220, background: ACCENT, boxShadow: `0 8px 20px ${ACCENT}40` }}>
              {t('Start Planning')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 0: Goal ── */}
        {step === 0 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('What are you saving for?')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Choose a category and name your goal.')}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    background: 'white', border: category === cat.id ? `2px solid ${ACCENT}` : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer',
                    boxShadow: category === cat.id ? `0 0 0 3px ${ACCENT}20` : 'var(--shadow-xs)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{t(cat.label)}</span>
                </button>
              ))}
            </div>

            <div style={{
              background: 'white', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                {t('GOAL NAME')}
              </label>
              <input
                type="text"
                value={goalName}
                onChange={e => setGoalName(e.target.value)}
                placeholder={t('e.g. Dream Vacation in Bali')}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)',
                  width: '100%', fontFamily: 'var(--font-display)',
                }}
              />
            </div>

            <button
              className="btn btn-lg"
              onClick={() => setStep(1)}
              disabled={!category || !goalName}
              style={{ width: '100%', background: ACCENT, color: 'white', border: 'none', boxShadow: `0 8px 20px ${ACCENT}40` }}
            >
              {t('Set My Target')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 1: Target ── */}
        {step === 1 && (
          <div style={{ animation: 'slideInRight 0.35s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('How much & by when?')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Be realistic but ambitious.')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{
                background: 'white', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)',
              }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                  {t('TARGET AMOUNT')}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-muted)' }}>$</span>
                  <input
                    type="text"
                    value={targetAmount}
                    onChange={e => setTargetAmount(e.target.value.replace(/[^0-9,]/g, ''))}
                    placeholder="0"
                    autoFocus
                    style={{
                      border: 'none', outline: 'none', background: 'transparent',
                      fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--text-primary)',
                      width: '100%', fontFamily: 'var(--font-display)',
                    }}
                  />
                </div>
              </div>

              <div style={{
                background: 'white', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)',
              }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                  {t('MONTHS TO SAVE')}
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {['6', '12', '18', '24', '36'].map(m => (
                    <button
                      key={m}
                      onClick={() => setTargetMonths(m)}
                      style={{
                        padding: '8px 20px', borderRadius: 99, cursor: 'pointer', fontWeight: 700, fontSize: 13,
                        background: targetMonths === m ? ACCENT : 'var(--bg-base)',
                        color: targetMonths === m ? 'white' : 'var(--text-secondary)',
                        border: targetMonths === m ? `2px solid ${ACCENT}` : '1px solid var(--border-subtle)',
                        transition: 'all 0.2s ease',
                      }}
                    >{m}m</button>
                  ))}
                </div>
              </div>
            </div>

            {amount > 0 && (
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}08)`, border: `1px solid ${ACCENT}30`,
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)', textAlign: 'center',
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  {t('You need to save')}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                  {fmt.currency(monthly, true)}<span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-muted)' }}>/month</span>
                </p>
              </div>
            )}

            <button
              className="btn btn-lg"
              onClick={() => setStep(2)}
              disabled={!amount}
              style={{ width: '100%', background: ACCENT, color: 'white', border: 'none', boxShadow: `0 8px 20px ${ACCENT}40` }}
            >
              {t('Choose Strategy')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── Step 2: Strategy ── */}
        {step === 2 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both', paddingTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('How will you save?')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>
                {t('Choose the strategy that fits your lifestyle.')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {STRATEGIES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSavingStrategy(s.id)}
                  style={{
                    width: '100%', background: 'white', textAlign: 'left', cursor: 'pointer',
                    border: savingStrategy === s.id ? `2px solid ${ACCENT}` : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xl)', padding: 'var(--space-4) var(--space-5)',
                    boxShadow: savingStrategy === s.id ? `0 0 0 3px ${ACCENT}20` : 'var(--shadow-xs)',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: savingStrategy === s.id ? `${ACCENT}15` : 'var(--bg-base)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 2 }}>{t(s.label)}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t(s.desc)}</p>
                  </div>
                  {savingStrategy === s.id && <Check size={18} color={ACCENT} style={{ flexShrink: 0 }} />}
                </button>
              ))}
            </div>

            <button
              className="btn btn-lg"
              onClick={() => setCompleted(true)}
              disabled={!savingStrategy}
              style={{ width: '100%', background: ACCENT, color: 'white', border: 'none', boxShadow: `0 8px 20px ${ACCENT}40` }}
            >
              {t('Lock In My Goal')} <Check size={18} />
            </button>
          </div>
        )}

        {/* ── Completed ── */}
        {completed && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `linear-gradient(135deg, ${ACCENT}, #F97316)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: `0 12px 32px ${ACCENT}50`,
            }}>
              <CheckCircle size={44} color="white" />
            </div>
            <p className="label-caps" style={{ color: ACCENT, marginBottom: 8 }}>GOAL LOCKED IN</p>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{goalName} 🌟</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto var(--space-6)' }}>
              {t('Your goal is set. Save')} <strong style={{ color: 'var(--text-primary)' }}>{fmt.currency(monthly, true)}/month</strong> {t('for')} <strong style={{ color: 'var(--text-primary)' }}>{targetMonths} months</strong> {t('to reach')} <strong style={{ color: ACCENT }}>{fmt.currency(amount, true)}</strong>.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary btn-lg" onClick={handleReset}>
                <RotateCcw size={16} /> {t('New Goal')}
              </button>
              <button className="btn btn-lg" onClick={handleExternalExit} style={{ background: ACCENT, color: 'white', border: 'none', boxShadow: `0 8px 20px ${ACCENT}40` }}>
                {t('Back to Dashboard')} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
