'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, Target, Calendar, Wallet, Gem, Car, Plane, Home, Heart, GraduationCap, Trophy, PlusCircle, ShieldCheck, TrendingUp, Zap, Star } from "lucide-react";
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
  { id: "emergency", emoji: <ShieldCheck size={24} />, label: "Emergency", color: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { id: "travel", emoji: <Plane size={24} />, label: "Travel", color: '#3B82F6', bg: 'bg-blue-50', text: 'text-blue-600' },
  { id: "home", emoji: <Home size={24} />, label: "Home", color: '#8B5CF6', bg: 'bg-purple-50', text: 'text-purple-600' },
  { id: "car", emoji: <Car size={24} />, label: "Vehicle", color: '#6366F1', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { id: "education", emoji: <GraduationCap size={24} />, label: "Education", color: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-600' },
  { id: "gadget", emoji: <Zap size={24} />, label: "Gadget", color: '#64748B', bg: 'bg-slate-50', text: 'text-slate-600' },
  { id: "wedding", emoji: <Heart size={24} />, label: "Event", color: '#EC4899', bg: 'bg-pink-50', text: 'text-pink-600' },
  { id: "investment", emoji: <TrendingUp size={24} />, label: "Investment", color: '#22C55E', bg: 'bg-green-50', text: 'text-green-600' },
  { id: "custom", emoji: <PlusCircle size={24} />, label: "Custom", color: '#94A3B8', bg: 'bg-gray-50', text: 'text-gray-600' },
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
    <main className="inner-page min-h-screen bg-[#F8FAFC]">
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[640px] mx-auto"
            >
              <div className="relative rounded-[2.5rem] bg-white p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="w-28 h-28 mx-auto rounded-[2rem] bg-amber-50 flex items-center justify-center text-6xl mb-8 shadow-sm border border-amber-100/50">
                🌟
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('Plan Locked In!')}</h2>
              <p className="text-slate-500 mb-10 text-lg max-w-sm mx-auto leading-relaxed">
                {t("Your dream has a deadline and a plan. Now, let's make it a reality together.")}
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                   onClick={() => {
                     setCompleted(false);
                     setStep(1);
                     setState({ categoryId: null, customGoal: "", goalName: "", targetAmount: "", targetMonth: "", targetYear: "", strategyId: 'auto', notes: "" });
                   }}
                   className="w-full py-4 rounded-2xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all active:scale-[0.98] shadow-lg shadow-amber-100"
                >
                  {t('Set Another Goal')}
                </button>
                <button
                  onClick={() => window.location.href = '/financial_wellbeing'}
                  className="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  {t('Back to Dashboard')}
                </button>
              </div>
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
    <div className="w-full max-w-[640px] mx-auto">
      <div className="relative rounded-[2.5rem] bg-white p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/50 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 relative">
             <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full" />
             <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl border border-white/20">
                <Target size={44} className="text-white drop-shadow-sm" />
             </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-6 border border-amber-100/50">
            <Star size={12} fill="currentColor" />
            {t('MANIFEST YOUR DREAMS')}
          </span>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{t('Dream It. Plan It. Save It.')}</h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto mb-10">
            {t("A goal without a plan is just a wish. Let's turn your aspirations into a concrete savings roadmap today.")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
             {[
               { icon: <Gem size={18} />, title: 'Crystal Clear', desc: 'Define exactly what you want and why.', color: 'amber' },
               { icon: <Calendar size={18} />, title: 'Time Bound', desc: 'Pick a deadline that motivates you.', color: 'blue' },
               { icon: <Wallet size={18} />, title: 'Budget Fit', desc: 'Calculate the exact push needed.', color: 'emerald' },
               { icon: <Trophy size={18} />, title: 'Success Path', desc: 'Choose a strategy that ensures success.', color: 'purple' }
             ].map((item) => (
               <div key={item.title} className="flex gap-4 p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className={`w-10 h-10 shrink-0 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100 transition-colors group-hover:border-${item.color}-200 text-${item.color}-500`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm leading-none mb-1.5">{t(item.title)}</div>
                    <div className="text-[11px] text-slate-500 leading-snug">{t(item.desc)}</div>
                  </div>
               </div>
             ))}
          </div>

          <button 
            onClick={onNext} 
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-amber-500 rounded-2xl hover:bg-amber-600 active:scale-[0.98] shadow-lg shadow-amber-200"
          >
            {t('Start Planning')}
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('What are you building?')}</h2>
        <p className="text-slate-500">{t('Select the category that best represents your current goal.')}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setState({ ...state, categoryId: cat.id })}
            className={`group relative flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all duration-300 border-2 ${state.categoryId === cat.id ? 'border-amber-500 bg-amber-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'}`}
          >
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${cat.bg} ${cat.text} border border-white/50 shadow-sm`}>
                {cat.emoji}
             </div>
             <div className="text-xs font-bold text-slate-800 tracking-tight">{t(cat.label)}</div>
             {state.categoryId === cat.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-sm">
                   <CheckCircle2 size={12} className="text-white" />
                </div>
             )}
          </button>
        ))}
      </div>

      {state.categoryId === 'custom' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stack-3 mt-4">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('DESCRIBE YOUR CUSTOM GOAL')}</label>
           <input 
             type="text" 
             value={state.customGoal} 
             onChange={(e) => setState({ ...state, customGoal: e.target.value })}
             placeholder={t('Example: Dream Gaming Setup...')}
             className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 px-8 text-slate-800 placeholder:text-slate-300 focus:border-amber-500 focus:outline-none transition-all shadow-sm"
             autoFocus
           />
        </motion.div>
      )}

      <div className="flex justify-end mt-10">
        <button onClick={onNext} disabled={!canNext} className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-30 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2">
          {t('Define Numbers')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('The Target')}</h2>
        <p className="text-slate-500">{t('How much and by when? Be realistic but ambitious.')}</p>
      </div>

      <div className="rounded-[2.5rem] bg-white p-8 md:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100 stack-8">
         <div className="stack-3">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('GOAL NAME')}</label>
           <input 
             type="text" 
             value={state.goalName} 
             onChange={(e) => setState({ ...state, goalName: e.target.value })}
             placeholder={t('Example: My First Car')}
             className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 font-bold text-lg focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
           />
         </div>

         <div className="stack-3">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('TARGET AMOUNT')}</label>
           <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-amber-500 text-xl">₹</div>
              <input 
                type="number" 
                value={state.targetAmount} 
                onChange={(e) => setState({ ...state, targetAmount: e.target.value })}
                placeholder="0"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 pl-12 px-6 font-bold text-2xl focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
              />
           </div>
         </div>

         <div className="stack-3">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('TARGET DATE')}</label>
           <div className="grid grid-cols-2 gap-4">
              <select 
                value={state.targetMonth} 
                onChange={(e) => setState({ ...state, targetMonth: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:border-amber-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
              >
                 <option value="">{t('Month')}</option>
                 {MONTHS.map((m, i) => <option key={m} value={i}>{t(m)}</option>)}
              </select>
              <select 
                value={state.targetYear} 
                onChange={(e) => setState({ ...state, targetYear: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:border-amber-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
              >
                 <option value="">{t('Year')}</option>
                 {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
           </div>
         </div>
      </div>

      {canNext && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-[2rem] bg-amber-500 p-8 text-center shadow-xl shadow-amber-100">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
           <div className="relative z-10">
              <div className="text-[10px] font-bold text-white/70 mb-2 uppercase tracking-[0.2em]">{t('YOUR SAVINGS SPRINT')}</div>
              <div className="text-4xl font-black text-white mb-2 leading-none">₹{fmt(Math.round(monthlyNeeded))} <span className="text-sm font-medium text-white/60">/ {t('month')}</span></div>
              <p className="text-xs text-white/80 font-medium">{t('You need to save this for')} <span className="font-bold text-white">{diffMonths} {t('months')}</span> {t('to reach your goal.')}</p>
           </div>
        </motion.div>
      )}

      <div className="flex justify-end mt-6">
        <button onClick={onNext} disabled={!canNext} className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-30 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2">
          {t('Choose Strategy')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function StrategyScreen({ state, setState, onNext }: { state: ExerciseState, setState: (s: ExerciseState) => void, onNext: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('How will you save?')}</h2>
        <p className="text-slate-500">{t('Select the method that ensures you never miss a month.')}</p>
      </div>

      <div className="stack-4">
        {STRATEGIES.map(s => (
          <button 
            key={s.id}
            onClick={() => setState({ ...state, strategyId: s.id })}
            className={`flex items-start gap-6 p-7 rounded-[2.5rem] text-left transition-all duration-300 border-2 ${state.strategyId === s.id ? 'border-amber-500 bg-amber-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
             <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-3xl shadow-sm transition-all group-hover:scale-110">
                {s.emoji}
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold text-slate-900 tracking-tight">{t(s.title)}</h3>
                   <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-600 text-[9px] font-bold uppercase tracking-widest">{t(s.badge)}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{t(s.desc)}</p>
             </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button onClick={onNext} className="group px-10 py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all active:scale-[0.98] shadow-lg shadow-amber-200 flex items-center gap-2">
          {t('Review Plan')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <Target size={180} className="text-amber-500" />
        </div>
        
        <div className="w-24 h-24 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-4xl mb-8 shadow-sm border border-amber-100/50">
           {cat?.emoji || '🎯'}
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{t(state.goalName)}</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-lg">
          {t('Targeting')} <span className="font-bold text-slate-900">₹{fmt(amount)}</span> {t('by')} <span className="font-bold text-slate-900">{dateStr}</span>
        </p>

        <div className="grid grid-cols-2 gap-4 text-left">
           <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('STRATEGY')}</div>
              <div className="text-sm font-bold text-slate-800">{t(strat?.title || '')}</div>
           </div>
           <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('CATEGORY')}</div>
              <div className="text-sm font-bold text-slate-800">{t(cat?.label || '')}</div>
           </div>
        </div>
      </div>

      <div className="stack-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('MOTIVATION NOTES (OPTIONAL)')}</label>
        <textarea
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          placeholder={t('Why is this goal important to you?')}
          className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 px-8 text-slate-800 placeholder:text-slate-300 focus:border-amber-500 focus:outline-none transition-all shadow-sm"
          rows={4}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={onComplete} 
          className="group px-24 py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all active:scale-[0.98] shadow-lg shadow-amber-200 flex items-center gap-2"
        >
          {t('Finalize Goal')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
