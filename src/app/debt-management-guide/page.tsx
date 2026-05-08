'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, CreditCard, ShieldCheck, Target, Zap, Snowflake } from "lucide-react";
import { useAutoSave } from "@/lib/hooks";

// --- Types ---
type Strategy = "avalanche" | "snowball";

const STRATEGY_INFO: Record<Strategy, { name: string; icon: any; focus: string; color: string }> = {
  avalanche: { name: "Avalanche Method", icon: Zap, focus: "Highest interest first", color: 'var(--brand-primary)' },
  snowball: { name: "Snowball Method", icon: Snowflake, focus: "Smallest balance first", color: 'var(--brand-accent)' },
};

const STEPS = [
  'Introduction',
  'Debt Types',
  'Pick Strategy',
  'Action Plan'
];

export default function DebtManagementPage() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(1);
  const [strategy, setStrategy] = useState<Strategy>("avalanche");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);

  const goNext = () => setScreen((s) => Math.min(4, s + 1));
  const goBack = () => {
    if (screen === 1) {
      window.location.href = '/';
      return;
    }
    setScreen((s) => s - 1);
  };

  useAutoSave('debt_management_history', {
    strategy,
    notes,
    completedAt: completed ? new Date().toISOString() : null
  }, { enabled: true, isDirty: true });

  return (
    <main className="inner-page">
      <PageHeader
        title={t('Debt Management Guide')}
        subtitle={t('Activity')}
        onBackClick={goBack}
        steps={STEPS}
        currentStep={screen - 1}
      />

      <div className="inner-content">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-[600px] mx-auto"
            >
              {screen === 1 && <IntroScreen onNext={goNext} />}
              {screen === 2 && <EducationScreen onNext={goNext} />}
              {screen === 3 && <StrategyScreen strategy={strategy} setStrategy={setStrategy} onNext={goNext} />}
              {screen === 4 && <ActionPlanScreen strategy={strategy} notes={notes} setNotes={setNotes} onComplete={() => setCompleted(true)} />}
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 text-center shadow-premium bg-white border-none relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-brand" />
              <div className="w-24 h-24 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-5xl mb-8 shadow-sm">
                🎯
              </div>
              <h2 className="display-sm mb-4">{t('Strategy Locked In!')}</h2>
              <p className="text-secondary mb-10 text-lg">
                {t("You've taken the first step toward debt freedom. Stick to your chosen method and watch the progress.")}
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setCompleted(false);
                    setScreen(1);
                    setNotes("");
                  }}
                  className="btn btn-primary btn-lg btn-full"
                >
                  {t('Review Strategy')}
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="btn btn-secondary btn-lg btn-full"
                >
                  {t('Back to Dashboard')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- Sub-screens ---

function IntroScreen({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="stack-8">
      <div className="card p-10 text-center relative overflow-hidden shadow-premium border-none bg-white">
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-[2rem] bg-brand-primary-bg flex items-center justify-center text-4xl mb-6 shadow-sm border border-brand text-brand">
             <CreditCard size={40} />
          </div>
          <span className="badge badge-success mb-4">
            {t('DEBT-FREE PATHWAY')}
          </span>
          <h1 className="display-sm mb-4">{t('Take Control of Your Debt')}</h1>
          <p className="text-secondary text-lg leading-relaxed max-w-md mx-auto mb-10">
            {t("Debt doesn't have to be a burden forever. Learn the smartest ways to pay it off and reclaim your peace of mind.")}
          </p>
          
          <div className="stack-4 mb-10">
             {[
               { title: 'Learn', desc: 'Differentiate between good and high-cost debt.' },
               { title: 'Choose', desc: 'Pick a proven mathematical strategy.' },
               { title: 'Action', desc: 'Build a step-by-step commitment plan.' }
             ].map((item, i) => (
               <div key={item.title} className="flex items-center gap-4 text-left p-4 rounded-2xl bg-base border border-subtle">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-brand shadow-xs border border-subtle">{i+1}</div>
                  <div>
                    <div className="font-bold text-primary">{t(item.title)}</div>
                    <div className="text-xs text-secondary">{t(item.desc)}</div>
                  </div>
               </div>
             ))}
          </div>

          <button onClick={onNext} className="btn btn-primary btn-lg px-12 group">
            {t('Get Started')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EducationScreen({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  const [active, setActive] = useState('bad');

  const types = [
    { id: 'bad', emoji: '🔴', title: 'High-Cost Debt', subtitle: 'Pay these first', desc: 'Credit cards, Personal loans, BNPL. Interest rates often exceed 24-48%.', tip: 'Target these aggressively as they drain your wealth fastest.' },
    { id: 'good', emoji: '🟢', title: 'Productive Debt', subtitle: 'Low interest & tax-efficient', desc: 'Home loans, Education loans. These often help build long-term assets.', tip: 'Maintain regular payments but focus extra cash on high-cost debt.' },
  ];

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('Know Your Debt')}</h2>
        <p className="text-secondary">{t('Not all debt is the same. Understanding the cost helps you prioritize.')}</p>
      </div>

      <div className="stack-4">
        {types.map(type => (
          <button 
            key={type.id}
            onClick={() => setActive(type.id)}
            className={`option-btn ${active === type.id ? 'active' : ''}`}
            style={{ padding: '24px', alignItems: 'flex-start' }}
          >
             <div className="text-3xl mt-1">{type.emoji}</div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h3 className="heading-md">{t(type.title)}</h3>
                   <span className="label-caps" style={{ fontSize: '9px' }}>{t(type.subtitle)}</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed mb-3">{t(type.desc)}</p>
                {active === type.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 rounded-xl bg-white/50 border border-brand/10 text-xs text-brand font-medium italic"
                  >
                    💡 {t(type.tip)}
                  </motion.div>
                )}
             </div>
          </button>
        ))}
      </div>

      <div className="card p-6 bg-base border-none mt-4 flex items-start gap-4">
         <ShieldCheck className="text-brand-success shrink-0 mt-1" />
         <div>
            <div className="font-bold text-primary mb-1">{t('Rule of Thumb')}</div>
            <p className="text-xs text-secondary leading-relaxed">
              {t('Total EMIs should ideally not exceed 40% of your monthly take-home income to maintain financial health.')}
            </p>
         </div>
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="btn btn-primary btn-md px-10">
          {t('Next: Pick Strategy')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StrategyScreen({ strategy, setStrategy, onNext }: { strategy: Strategy, setStrategy: (s: Strategy) => void, onNext: () => void }) {
  const { t } = useTranslation();

  const strategies = [
    { 
      id: 'avalanche' as const, 
      icon: <Zap size={24} />, 
      title: 'Avalanche Method', 
      badge: 'SAVES MOST MONEY', 
      tone: 'success',
      desc: 'Focus all extra payments on the debt with the highest interest rate first.',
      how: 'Minimum payments on everything + extra on highest rate.'
    },
    { 
      id: 'snowball' as const, 
      icon: <Snowflake size={24} />, 
      title: 'Snowball Method', 
      badge: 'BUILDS MOMENTUM', 
      tone: 'primary',
      desc: 'Focus all extra payments on the debt with the smallest balance first.',
      how: 'Minimum payments on everything + extra on smallest balance.'
    },
  ];

  return (
    <div className="stack-6">
       <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('Choose Your Strategy')}</h2>
        <p className="text-secondary">{t('Both are effective. Pick the one that aligns with your psychology.')}</p>
      </div>

      <div className="stack-5">
        {strategies.map(s => (
          <button 
            key={s.id}
            onClick={() => setStrategy(s.id)}
            className={`option-btn ${strategy === s.id ? 'active' : ''}`}
            style={{ padding: '24px', alignItems: 'flex-start' }}
          >
             <div className="option-letter" style={{ 
               background: strategy === s.id ? `var(--brand-${s.tone})` : 'white', 
               color: strategy === s.id ? 'white' : `var(--brand-${s.tone})`,
               borderColor: `var(--brand-${s.tone})`
             }}>
                {s.icon}
             </div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="heading-md">{t(s.title)}</h3>
                   <span className={`badge badge-${s.tone}`} style={{ fontSize: '9px' }}>{t(s.badge)}</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed mb-4">{t(s.desc)}</p>
                <div className="p-4 rounded-xl bg-slate-50 border border-subtle text-xs">
                   <span className="font-bold text-primary">{t('Execution')}: </span>
                   <span className="text-secondary">{t(s.how)}</span>
                </div>
             </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="btn btn-primary btn-md px-10">
          {t('Final Action Plan')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function ActionPlanScreen({ strategy, notes, setNotes, onComplete }: { strategy: Strategy, notes: string, setNotes: (s: string) => void, onComplete: () => void }) {
  const { t } = useTranslation();
  const info = STRATEGY_INFO[strategy];

  return (
    <div className="stack-8">
      <div className="card p-8 text-center bg-white shadow-premium border-none relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: info.color }} />
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm" style={{ background: `${info.color}15`, color: info.color }}>
          <info.icon size={32} />
        </div>
        <h2 className="heading-xl mb-1">{t('Your Path to Debt-Free')}</h2>
        <p className="text-secondary mb-8">{t('You have chosen the')} <span className="font-bold text-primary">{t(info.name)}</span></p>

        <div className="stack-4 text-left">
           {[
             { title: 'List All Debts', desc: 'Gather every loan and credit card balance today.' },
             { title: 'Order Them', desc: `Rank them by ${info.focus.toLowerCase()}.` },
             { title: 'Commit Extra', desc: 'Find ₹1,000 extra per month to fuel the fire.' }
           ].map((step, i) => (
             <div key={i} className="flex gap-4 p-4 rounded-2xl bg-base border border-subtle">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow-sm" style={{ color: info.color }}>{i+1}</div>
                <div>
                   <div className="font-bold text-primary text-sm">{t(step.title)}</div>
                   <div className="text-xs text-secondary">{t(step.desc)}</div>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="stack-3">
        <label className="label-caps px-1">{t('PERSONAL COMMITMENT (OPTIONAL)')}</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('Example: I will clear my Personal Loan by December 2025 by cutting gym costs...')}
          className="form-input"
          rows={4}
          style={{ padding: '20px' }}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={onComplete} 
          className="btn btn-primary btn-lg px-16 shadow-premium"
        >
          {t('Commit & Save Plan')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
