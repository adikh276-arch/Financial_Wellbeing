'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, Target, Calendar, Wallet, Gem, Car, Plane, Home, Heart, GraduationCap, Trophy, PlusCircle, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { useAutoSave } from "@/lib/hooks";

// --- Types ---
interface ExerciseState {
  categoryId: string | null;
  customGoal: string;
  goalName: string;
  targetAmount: string;
  targetMonth: string;
  targetYear: string;
  strategyId: string | null;
  notes: string;
}

const CATEGORIES = [
  { id: "emergency", emoji: <ShieldCheck size={24} />, label: "Emergency", color: '#10B981' },
  { id: "travel", emoji: <Plane size={24} />, label: "Travel", color: '#3B82F6' },
  { id: "home", emoji: <Home size={24} />, label: "Home", color: '#8B5CF6' },
  { id: "car", emoji: <Car size={24} />, label: "Vehicle", color: '#6366F1' },
  { id: "education", emoji: <GraduationCap size={24} />, label: "Education", color: '#F59E0B' },
  { id: "gadget", emoji: <Zap size={24} />, label: "Gadget", color: '#64748B' },
  { id: "wedding", emoji: <Heart size={24} />, label: "Event", color: '#EC4899' },
  { id: "investment", emoji: <TrendingUp size={24} />, label: "Investment", color: '#22C55E' },
  { id: "custom", emoji: <PlusCircle size={24} />, label: "Custom", color: '#94A3B8' },
];

const STRATEGIES = [
  { id: "auto", title: "Automated Payday Save", emoji: "🤖", badge: "EASY", desc: "Transfer is automated as soon as salary arrives." },
  { id: "manual", title: "Manual Monthly Push", emoji: "👋", badge: "DISCIPLINED", desc: "You manually transfer after reviewing expenses." },
  { id: "daily", title: "Daily Change Saver", emoji: "☕", badge: "MICRO", desc: "Save small amounts every single day." },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const STEPS = [
  'Start',
  'Goal',
  'Numbers',
  'Strategy',
  'Review'
];


const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

export default function SavingsGoalPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<ExerciseState>({
    categoryId: null,
    customGoal: "",
    goalName: "",
    targetAmount: "",
    targetMonth: "",
    targetYear: "",
    strategyId: 'auto',
    notes: "",
  });
  const [completed, setCompleted] = useState(false);

  const goBack = () => {
    if (step === 1) {
      window.location.href = '/financial_wellbeing';
      return;
    }
    setStep(s => s - 1);
  };

  useAutoSave('savings_goal_history', {
    ...state,
    completedAt: completed ? new Date().toISOString() : null
  }, { enabled: true, isDirty: true });

  return (
    <main className="inner-page">
      <PageHeader
        title={t('Savings Goal Setter')}
        subtitle={t('Activity')}
        onBackClick={goBack}
        steps={STEPS}
        currentStep={step - 1}
      />

      <div className="inner-content">
        <AnimatePresence mode="wait">
          {!completed ? (
             <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-[640px] mx-auto"
            >
              {step === 1 && <IntroScreen onNext={() => setStep(2)} />}
              {step === 2 && <CategoryScreen state={state} setState={setState} onNext={() => setStep(3)} />}
              {step === 3 && <NumbersScreen state={state} setState={setState} onNext={() => setStep(4)} />}
              {step === 4 && <StrategyScreen state={state} setState={setState} onNext={() => setStep(5)} />}
              {step === 5 && <ReviewScreen state={state} onComplete={() => setCompleted(true)} />}
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 text-center shadow-premium bg-white border-none relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold" />
              <div className="w-24 h-24 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-5xl mb-8 shadow-sm">
                🌟
              </div>
              <h2 className="display-sm mb-4">{t('Plan Locked In!')}</h2>
              <p className="text-secondary mb-10 text-lg">
                {t("Your dream has a deadline and a plan. Now, let's make it a reality together.")}
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                   onClick={() => {
                     setCompleted(false);
                     setStep(1);
                     setState({ categoryId: null, customGoal: "", goalName: "", targetAmount: "", targetMonth: "", targetYear: "", strategyId: 'auto', notes: "" });
                   }}
                   className="btn btn-primary btn-lg btn-full"
                   style={{ background: 'var(--brand-gold)' }}
                >
                  {t('Set Another Goal')}
                </button>
                <button
                  onClick={() => window.location.href = '/financial_wellbeing'}
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
             <Target size={40} className="text-brand-gold" />
          </div>
          <span className="badge badge-warning mb-4">
            {t('MANIFEST YOUR DREAMS')}
          </span>
          <h1 className="display-sm mb-4">{t('Dream It. Plan It. Save It.')}</h1>
          <p className="text-secondary text-lg leading-relaxed max-w-md mx-auto mb-10">
            {t("A goal without a plan is just a wish. Let's turn your aspirations into a concrete savings roadmap today.")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
             {[
               { icon: <Gem size={20} />, title: 'Crystal Clear', desc: 'Define exactly what you want and why.' },
               { icon: <Calendar size={20} />, title: 'Time Bound', desc: 'Pick a deadline that motivates you.' },
               { icon: <Wallet size={20} />, title: 'Budget Fit', desc: 'Calculate the exact daily/monthly push needed.' },
               { icon: <Trophy size={20} />, title: 'Success Path', desc: 'Choose a strategy that ensures success.' }
             ].map((item) => (
               <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-base border border-subtle">
                  <div className="text-brand-gold mt-1">{item.icon}</div>
                  <div>
                    <div className="font-bold text-primary text-sm">{t(item.title)}</div>
                    <div className="text-[11px] text-secondary leading-snug">{t(item.desc)}</div>
                  </div>
               </div>
             ))}
          </div>

          <button onClick={onNext} className="btn btn-primary btn-lg px-12 group" style={{ background: 'var(--brand-gold)' }}>
            {t('Start Planning')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryScreen({ state, setState, onNext }: { state: ExerciseState, setState: (s: ExerciseState) => void, onNext: () => void }) {
  const { t } = useTranslation();
  const canNext = !!state.categoryId && (state.categoryId !== 'custom' || state.customGoal.trim().length > 0);

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('What are you building?')}</h2>
        <p className="text-secondary">{t('Select the category that best represents your current goal.')}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setState({ ...state, categoryId: cat.id })}
            className={`dashboard-card ${state.categoryId === cat.id ? 'active' : ''}`}
            style={{ 
              background: state.categoryId === cat.id ? 'var(--brand-primary-bg)' : 'white',
              borderColor: state.categoryId === cat.id ? 'var(--brand-primary)' : 'var(--border-subtle)',
              padding: '20px'
            }}
          >
             <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2" style={{ background: `${cat.color}15`, color: cat.color }}>
                {cat.emoji}
             </div>
             <div className="text-xs font-bold text-primary">{t(cat.label)}</div>
          </button>
        ))}
      </div>

      {state.categoryId === 'custom' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-2 mt-4">
           <label className="label-caps px-1">{t('DESCRIBE YOUR CUSTOM GOAL')}</label>
           <input 
             type="text" 
             value={state.customGoal} 
             onChange={(e) => setState({ ...state, customGoal: e.target.value })}
             placeholder={t('Example: Dream Gaming Setup...')}
             className="form-input"
             autoFocus
           />
        </motion.div>
      )}

      <div className="flex justify-end mt-8">
        <button onClick={onNext} disabled={!canNext} className="btn btn-primary btn-md px-10 disabled:opacity-50">
          {t('Define Numbers')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function NumbersScreen({ state, setState, onNext }: { state: ExerciseState, setState: (s: ExerciseState) => void, onNext: () => void }) {
  const { t } = useTranslation();
  
  const now = new Date();
  const years = Array.from({ length: 11 }, (_, i) => now.getFullYear() + i);

  const amountNum = Number(state.targetAmount.replace(/,/g, '')) || 0;
  const targetDate = new Date(Number(state.targetYear), Number(state.targetMonth));
  const diffMonths = Math.max(1, (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth()));
  
  const monthlyNeeded = amountNum / diffMonths;
  const canNext = amountNum > 0 && state.targetMonth !== "" && state.targetYear !== "" && state.goalName.trim() !== "";

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('The Target')}</h2>
        <p className="text-secondary">{t('How much and by when? Be realistic but ambitious.')}</p>
      </div>

      <div className="card p-8 shadow-premium border-none bg-white stack-6">
         <div className="stack-2">
           <label className="label-caps px-1">{t('GOAL NAME')}</label>
           <input 
             type="text" 
             value={state.goalName} 
             onChange={(e) => setState({ ...state, goalName: e.target.value })}
             placeholder={t('Example: My First Car')}
             className="form-input"
           />
         </div>

         <div className="stack-2">
           <label className="label-caps px-1">{t('TARGET AMOUNT')}</label>
           <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-brand-gold">₹</div>
              <input 
                type="number" 
                value={state.targetAmount} 
                onChange={(e) => setState({ ...state, targetAmount: e.target.value })}
                placeholder="0"
                className="form-input pl-10 text-xl font-bold"
              />
           </div>
         </div>

         <div className="stack-2">
           <label className="label-caps px-1">{t('TARGET DATE')}</label>
           <div className="grid grid-cols-2 gap-4">
              <select 
                value={state.targetMonth} 
                onChange={(e) => setState({ ...state, targetMonth: e.target.value })}
                className="form-input"
              >
                 <option value="">{t('Month')}</option>
                 {MONTHS.map((m, i) => <option key={m} value={i}>{t(m)}</option>)}
              </select>
              <select 
                value={state.targetYear} 
                onChange={(e) => setState({ ...state, targetYear: e.target.value })}
                className="form-input"
              >
                 <option value="">{t('Year')}</option>
                 {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
           </div>
         </div>
      </div>

      {canNext && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 bg-brand-primary-bg border-brand border-2 text-center shadow-md">
           <div className="text-xs font-bold text-brand mb-1 uppercase tracking-widest">{t('YOUR SAVINGS SPRINT')}</div>
           <div className="heading-xl text-primary mb-1">₹{fmt(Math.round(monthlyNeeded))} <span className="text-sm font-medium text-secondary">/ {t('month')}</span></div>
           <p className="text-xs text-secondary">{t('You need to save this for')} <span className="font-bold text-primary">{diffMonths} {t('months')}</span> {t('to reach your goal.')}</p>
        </motion.div>
      )}

      <div className="flex justify-end mt-4">
        <button onClick={onNext} disabled={!canNext} className="btn btn-primary btn-md px-10 disabled:opacity-50" style={{ background: 'var(--brand-gold)' }}>
          {t('Choose Strategy')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StrategyScreen({ state, setState, onNext }: { state: ExerciseState, setState: (s: ExerciseState) => void, onNext: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('How will you save?')}</h2>
        <p className="text-secondary">{t('Select the method that ensures you never miss a month.')}</p>
      </div>

      <div className="stack-4">
        {STRATEGIES.map(s => (
          <button 
            key={s.id}
            onClick={() => setState({ ...state, strategyId: s.id })}
            className={`option-btn ${state.strategyId === s.id ? 'active' : ''}`}
            style={{ padding: '24px' }}
          >
             <div className="option-letter" style={{ fontSize: '20px' }}>{s.emoji}</div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h3 className="heading-md">{t(s.title)}</h3>
                   <span className="badge" style={{ fontSize: '9px' }}>{t(s.badge)}</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">{t(s.desc)}</p>
             </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="btn btn-primary btn-md px-10" style={{ background: 'var(--brand-gold)' }}>
          {t('Review Plan')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function ReviewScreen({ state, onComplete }: { state: ExerciseState, onComplete: () => void }) {
  const { t } = useTranslation();
  const cat = CATEGORIES.find(c => c.id === state.categoryId);
  const strat = STRATEGIES.find(s => s.id === state.strategyId);
  const amount = Number(state.targetAmount.replace(/,/g, '')) || 0;
  const dateStr = `${t(MONTHS[Number(state.targetMonth)])} ${state.targetYear}`;

  return (
    <div className="stack-8">
      <div className="card p-10 bg-white shadow-premium border-none text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Target size={120} className="text-brand-gold" />
        </div>
        
        <div className="w-20 h-20 mx-auto rounded-full bg-brand-primary-bg flex items-center justify-center text-4xl mb-6 shadow-sm border border-brand text-brand">
           {cat?.emoji || '🎯'}
        </div>
        <h2 className="heading-xl mb-1">{t(state.goalName)}</h2>
        <p className="text-secondary mb-8">{t('Targeting')} <span className="font-bold text-primary">₹{fmt(amount)}</span> {t('by')} <span className="font-bold text-primary">{dateStr}</span></p>

        <div className="grid grid-cols-2 gap-4 text-left">
           <div className="p-4 rounded-2xl bg-base border border-subtle">
              <div className="label-caps mb-1">{t('STRATEGY')}</div>
              <div className="text-sm font-bold text-primary">{t(strat?.title || '')}</div>
           </div>
           <div className="p-4 rounded-2xl bg-base border border-subtle">
              <div className="label-caps mb-1">{t('CATEGORY')}</div>
              <div className="text-sm font-bold text-primary">{t(cat?.label || '')}</div>
           </div>
        </div>
      </div>

      <div className="stack-3">
        <label className="label-caps px-1">{t('MOTIVATION NOTES (OPTIONAL)')}</label>
        <textarea
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          placeholder={t('Why is this goal important to you?')}
          className="form-input"
          rows={4}
          style={{ padding: '20px' }}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={onComplete} 
          className="btn btn-primary btn-lg px-16 shadow-premium"
          style={{ background: 'var(--brand-gold)' }}
        >
          {t('Finalize Goal')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
