'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, ArrowRight, Save, Check, RotateCcw, 
  Smile, Meh, Frown, AlertCircle, Heart, Calendar, 
  HeartPulse, ListChecks, TrendingUp, Sparkles, ChevronLeft,
  Shield, Brain, Zap, Info, ArrowUpRight, Target, Clock
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';

const QUESTIONS = [
  { id: 'worry', text: t("How often do you worry about money?"), options: [t("Rarely or never"), 'Sometimes', 'Often', t("Almost always")] },
  { id: 'debt', text: t("Do you have debt that worries you?"), options: [t("No concerning debt"), t("Minor debt concern"), t("Moderate concern"), t("Significant stress")] },
  { id: 'emergency', text: t("Can you cover a 1,000 unit emergency right now?"), options: [t("Yes, easily"), t("Yes, with effort"), 'Barely', 'No'] },
  { id: 'arguments', text: t("Do you fight with partner/family about money?"), options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
  { id: 'avoidance', text: t("Do you avoid looking at bank statements?"), options: [t("Never - I check regularly"), 'Rarely', 'Sometimes', t("Yes, often")] },
  { id: 'plan', text: t("Do you have a clear financial plan?"), options: [t("Yes, written and tracked"), 'Somewhat', t("Vague ideas"), t("No plan")] },
  { id: 'confidence', text: t("How confident are you about your financial future?"), options: [t("Very confident"), t("Somewhat confident"), 'Neutral', t("Not confident at all")] },
  { id: 'health', text: t("Has money stress affected your sleep or health?"), options: ['Never', 'Rarely', 'Sometimes', t("Yes, regularly")] },
  { id: 'impulse', text: t("Do you spend impulsively to feel better?"), options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
  { id: 'goals', text: t("How clear are your financial goals?"), options: [t("Very clear - written down"), t("Somewhat clear"), 'Vague', t("No financial goals")] },
  { id: 'track', text: t("Are you on track with your financial goals?"), options: [t("Yes, on track"), t("Mostly on track"), 'Partially', t("Not really")] },
  { id: 'compare', text: t("Do you compare yourself to others financially?"), options: [t("Never - I focus on my journey"), 'Rarely', 'Sometimes', t("Often - it stresses me")] },
  { id: 'control', text: t("How much control do you feel over your finances?"), options: [t("Complete control"), t("Mostly in control"), t("Some control"), t("Feels out of control")] },
  { id: 'optimism', text: t("How optimistic are you about your financial future?"), options: [t("Very optimistic"), t("Somewhat optimistic"), 'Neutral', 'Pessimistic'] },
  { id: 'emergency_access', text: t("Could you access emergency savings within 24 hours?"), options: [t("Yes, easily"), t("Yes, with effort"), 'Partially', t("No savings access")] },
];

const STRESS_LEVELS = [
  { min: 0, max: 15, label: 'OPTIMIZED', icon: Smile, color: '#00A884', desc: t("Your financial foundations are exceptionally strong. You maintain a state of low anxiety and high sovereignty over your capital.") },
  { min: 15, max: 25, label: 'ELEVATED', icon: Meh, color: 'var(--brand-gold)', desc: t("Detectable stress areas are present. Your foundations are stable, but targeted improvements are required to achieve total peace.") },
  { min: 25, max: 35, label: 'TURBULENT', icon: Frown, color: '#E17055', desc: t("Significant financial anxiety is impacting your wellbeing. Immediate tactical interventions are recommended to stabilize your situation.") },
  { min: 35, max: 60, label: 'CRITICAL', icon: AlertCircle, color: '#E74C3C', desc: t("Severe financial pressure detected. This state poses high risks to your mental and physical health. Prioritize professional advisory support.") },
];

export default function MoneyStressQuiz() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // 1. Local load
    setHistory(storage.get('money_stress_history', []));

    // 2. Server sync
    storage.fetch('money_stress_history').then(remote => {
      if (remote) {
        setHistory(remote);
        storage.set('money_stress_history', remote);
      }
    });
  }, []);

  const totalStress = answers.reduce((sum, a) => sum + a, 0);
  const stressLevel = STRESS_LEVELS.find(s => totalStress >= s.min && totalStress < s.max) || STRESS_LEVELS[3];
  const stressPercent = Math.min(100, (totalStress / (QUESTIONS.length * 3)) * 100);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSave = () => {
    const newEntry = { totalStress, label: stressLevel.label, date: new Date().toISOString() };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    storage.set('money_stress_history', updatedHistory);
    storage.sync('money_stress_history', newEntry, totalStress); // Sync individual snapshot
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentQ = QUESTIONS[step - 1];
  const progress = step > 0 && step <= QUESTIONS.length ? ((step - 1) / QUESTIONS.length) * 100 : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Money Stress Quiz')}
        backHref="/"
        rightSlot={step === QUESTIONS.length + 1 ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} className=t("btn btn-primary btn-sm")>{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Result Saved') : t('Save')}</button>
            <button onClick={() => { setStep(0); setAnswers([]); }} className=t("btn btn-secondary btn-icon btn-sm")><RotateCcw size={14} /></button>
          </div>
        ) : null}
      />
      <div style={{ maxWidth: 640, margin: t("0 auto"), padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>

        {step === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', animation: t("fadeIn 0.4s ease") }}>
            <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-2xl)', background: 'var(--bg-glass-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', margin: '0 auto var(--space-8)', border: '1px solid var(--border-subtle)' }}>
              <HeartPulse size={40} strokeWidth={1.5} />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Quantify Your Financial Stress')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: 540, margin: '0 auto var(--space-10)', lineHeight: 1.6 }}>{t('Identify the behavioral and structural drivers of financial anxiety with our clinical-grade diagnostic.')}</p>
            
            <button className=t("btn btn-primary btn-lg") onClick={() => setStep(1)} style={{ padding: '16px 40px', marginBottom: 'var(--space-12)' }}>
              {t('Run Analysis')} <ArrowRight size={18} />
            </button>

            {history.length > 0 && (
              <div style={{ textAlign: 'left' }}>
                 <label className="label-caps" style={{ marginBottom: 'var(--space-4)' }}>{t('Recent Assessments')}</label>
                 <div className="stack-3">
                   {history.map((h, i) => (
                      <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{h.label}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{new Date(h.date).toLocaleDateString()}</div>
                         </div>
                         <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--brand-primary)' }}>{h.totalStress}</div>
                      </div>
                   ))}
                 </div>
              </div>
            )}
          </div>
        )}

        {step > 0 && step <= QUESTIONS.length && currentQ && (
          <div key={step} style={{ animation: t("slideInRight 0.35s ease") }}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <div className="progress-bar" style={{ height: 4, background: 'var(--border-subtle)' }}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <h2 className="heading-lg" style={{ marginBottom: 'var(--space-10)', lineHeight: 1.3 }}>{currentQ.text}</h2>
              <div className="stack-3">
                {currentQ.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="option-btn">
                    <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                    <span className="option-text">{t(opt)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === QUESTIONS.length + 1 && (
          <div style={{ animation: t("fadeIn 0.6s ease") }}>
             <div style={{ background: stressLevel.color, borderRadius: 'var(--radius-3xl)', padding: 'var(--space-10)', textAlign: 'center', color: 'white', marginBottom: 'var(--space-8)', boxShadow: 'var(--shadow-lg)' }}>
                <p className="label-caps" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('DIAGNOSTIC STATE')}</p>
                <div className="display-sm" style={{ fontWeight: 900, marginBottom: 8 }}>{stressLevel.label}</div>
                <p style={{ opacity: 0.9, fontSize: 'var(--text-base)', lineHeight: 1.5 }}>{stressLevel.desc}</p>
             </div>

             <div className="card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                   <span className="label-caps">{t('Stress Spectrum')}</span>
                   <span style={{ fontSize: 13, fontWeight: 800 }}>{totalStress} / 45</span>
                </div>
                <div className="progress-bar" style={{ height: 12, background: 'var(--bg-neutral)' }}>
                   <div className="progress-fill" style={{ width: `${stressPercent}%`, background: stressLevel.color }} />
                </div>
             </div>

             <div className="card" style={{ padding: 'var(--space-8)', background: 'var(--brand-primary-glow)', border: '1px solid var(--border-brand)' }}>
                <h3 className="heading-sm" style={{ marginBottom: 'var(--space-4)', color: 'var(--brand-primary)' }}>{t('Tactical Relief Plan')}</h3>
                <div className="stack-3">
                   {totalStress > 20 ? (
                     <>
                        <div className="card" style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{t('Execute immediate cashflow audit & budget freeze.')}</div>
                        <div className="card" style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{t('Automate and prioritize high-interest debt payments.')}</div>
                     </>
                   ) : (
                      <div className="card" style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{t('Optimize redundant reserve channels into yields.')}</div>
                   )}
                   <button className=t("btn btn-secondary btn-full") style={{ marginTop: 'var(--space-4)' }} onClick={() => setStep(0)}>{t('Recalibrate Assessment')}</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
