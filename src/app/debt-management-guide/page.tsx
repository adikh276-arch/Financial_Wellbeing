'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, CreditCard, ShieldCheck, Target, Zap, Snowflake, Star, BookOpen, MousePointer2 } from "lucide-react";
import { useAutoSave } from "@/lib/hooks";

// --- Types ---
type Strategy = "avalanche" | "snowball";

const STRATEGY_INFO: Record<Strategy, { name: string; icon: any; focus: string; color: string; gradient: string }> = {
  avalanche: { name: "Avalanche Method", icon: Zap, focus: "Highest interest first", color: '#3B82F6', gradient: 'from-blue-500 to-indigo-600' },
  snowball: { name: "Snowball Method", icon: Snowflake, focus: "Smallest balance first", color: '#8B5CF6', gradient: 'from-purple-500 to-violet-600' },
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
      window.location.href = '/financial_wellbeing';
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
    <main className="inner-page min-h-screen bg-[#F8FAFC]">
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <div className="w-28 h-28 mx-auto rounded-[2rem] bg-blue-50 flex items-center justify-center text-6xl mb-8 shadow-sm border border-blue-100/50">
                🎯
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('Strategy Locked In!')}</h2>
              <p className="text-slate-500 mb-10 text-lg max-w-sm mx-auto leading-relaxed">
                {t("You've taken the first step toward debt freedom. Stick to your chosen method and watch the progress.")}
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setCompleted(false);
                    setScreen(1);
                    setNotes("");
                  }}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
                >
                  {t('Review Strategy')}
                </button>
                <button
                  onClick={() => window.location.href = '/financial_wellbeing'}
                  className="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
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
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white px-6 py-12 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 relative">
             <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
             <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl border border-white/20">
                <CreditCard size={44} className="text-white drop-shadow-sm" />
             </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-6 border border-emerald-100/50">
            <Star size={12} fill="currentColor" />
            {t('DEBT-FREE PATHWAY')}
          </span>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{t('Take Control of Your Debt')}</h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto mb-10">
            {t("Debt doesn't have to be a burden forever. Learn the smartest ways to pay it off and reclaim your peace of mind.")}
          </p>
          
          <div className="stack-3 mb-10 max-w-sm mx-auto">
             {[
               { title: 'Learn', desc: 'Differentiate between good and high-cost debt.', icon: <BookOpen size={16} /> },
               { title: 'Choose', desc: 'Pick a proven mathematical strategy.', icon: <MousePointer2 size={16} /> },
               { title: 'Action', desc: 'Build a step-by-step commitment plan.', icon: <CheckCircle2 size={16} /> }
             ].map((item, i) => (
               <div key={item.title} className="flex items-center gap-5 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 text-left hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
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
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-200"
          >
            {t('Get Started')}
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
    { id: 'bad', emoji: '🔴', title: 'High-Cost Debt', subtitle: 'Pay these first', desc: 'Credit cards, Personal loans, BNPL. Interest rates often exceed 24-48%.', tip: 'Target these aggressively as they drain your wealth fastest.', color: 'rose' },
    { id: 'good', emoji: '🟢', title: 'Productive Debt', subtitle: 'Low interest & tax-efficient', desc: 'Home loans, Education loans. These often help build long-term assets.', tip: 'Maintain regular payments but focus extra cash on high-cost debt.', color: 'emerald' },
  ];

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('Know Your Debt')}</h2>
        <p className="text-slate-500">{t('Not all debt is the same. Understanding the cost helps you prioritize.')}</p>
      </div>

      <div className="stack-4">
        {types.map(type => (
          <button 
            key={type.id}
            onClick={() => setActive(type.id)}
            className={`flex items-start gap-5 p-7 rounded-[2rem] text-left transition-all duration-300 border-2 ${active === type.id ? `border-${type.color === 'rose' ? 'rose-500 bg-rose-50/20' : 'emerald-500 bg-emerald-50/20'} shadow-md` : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
             <div className="text-4xl mt-1 shrink-0">{type.emoji}</div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold text-slate-900 tracking-tight">{t(type.title)}</h3>
                   <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${type.color === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {t(type.subtitle)}
                   </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{t(type.desc)}</p>
                {active === type.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-4 rounded-2xl ${type.color === 'rose' ? 'bg-rose-500/10 text-rose-700' : 'bg-emerald-500/10 text-emerald-700'} text-xs font-semibold flex items-start gap-3`}
                  >
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <span>{t(type.tip)}</span>
                  </motion.div>
                )}
             </div>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-xl mt-6">
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
         <div className="relative z-10 flex items-start gap-5">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 border border-white/10 backdrop-blur-md">
               <ShieldCheck size={24} />
            </div>
            <div>
               <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5">{t('Rule of Thumb')}</div>
               <p className="text-sm font-medium leading-relaxed text-slate-300">
                 {t('Total EMIs should ideally not exceed 40% of your monthly take-home income to maintain financial health.')}
               </p>
            </div>
         </div>
      </div>

      <div className="flex justify-end mt-10">
        <button onClick={onNext} className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2">
          {t('Next: Pick Strategy')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
      title: 'Avalanche Method', 
      badge: 'SAVES MOST MONEY', 
      tone: 'blue',
      desc: 'Focus all extra payments on the debt with the highest interest rate first.',
      how: 'Minimum payments on everything + extra on highest rate.'
    },
    { 
      id: 'snowball' as const, 
      title: 'Snowball Method', 
      badge: 'BUILDS MOMENTUM', 
      tone: 'purple',
      desc: 'Focus all extra payments on the debt with the smallest balance first.',
      how: 'Minimum payments on everything + extra on smallest balance.'
    },
  ];

  return (
    <div className="stack-6">
       <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('Choose Your Strategy')}</h2>
        <p className="text-slate-500">{t('Both are effective. Pick the one that aligns with your psychology.')}</p>
      </div>

      <div className="stack-5">
        {strategies.map(s => {
          const info = STRATEGY_INFO[s.id];
          return (
            <button 
              key={s.id}
              onClick={() => setStrategy(s.id)}
              className={`flex items-start gap-6 p-7 rounded-[2.5rem] text-left transition-all duration-300 border-2 ${strategy === s.id ? `border-${s.tone}-500 bg-${s.tone}-50/30 shadow-md` : 'border-slate-100 bg-white hover:border-slate-200'}`}
            >
               <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center shadow-sm bg-gradient-to-br ${info.gradient} text-white`}>
                  <info.icon size={28} />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="text-lg font-bold text-slate-900 tracking-tight">{t(s.title)}</h3>
                     <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${s.tone === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                        {t(s.badge)}
                     </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{t(s.desc)}</p>
                  <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-[11px] leading-relaxed">
                     <span className="font-bold text-slate-700">{t('Execution')}: </span>
                     <span className="text-slate-500">{t(s.how)}</span>
                  </div>
               </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-10">
        <button onClick={onNext} className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2">
          {t('Final Action Plan')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: info.color }} />
        
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 blur-xl opacity-20 rounded-full" style={{ background: info.color }} />
          <div className="relative w-full h-full rounded-2xl flex items-center justify-center shadow-lg text-white border border-white/20" style={{ background: `linear-gradient(to bottom right, ${info.color}, ${info.color}dd)` }}>
            <info.icon size={36} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('Your Path to Debt-Free')}</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          {t('You have chosen the')} <span className="font-bold text-slate-800 underline decoration-blue-200 underline-offset-4">{t(info.name)}</span>
        </p>

        <div className="grid grid-cols-1 gap-3 text-left">
           {[
             { title: 'List All Debts', desc: 'Gather every loan and credit card balance today.' },
             { title: 'Order Them', desc: `Rank them by ${info.focus.toLowerCase()}.` },
             { title: 'Commit Extra', desc: 'Find ₹1,000 extra per month to fuel the fire.' }
           ].map((step, i) => (
             <div key={i} className="flex gap-5 p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-md group">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-white flex items-center justify-center text-sm font-bold shadow-sm border border-slate-100 transition-colors group-hover:border-blue-200" style={{ color: info.color }}>
                  {i+1}
                </div>
                <div>
                   <div className="font-bold text-slate-900 text-sm mb-1">{t(step.title)}</div>
                   <div className="text-[11px] text-slate-500 leading-snug">{t(step.desc)}</div>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="stack-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('PERSONAL COMMITMENT (OPTIONAL)')}</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('Example: I will clear my Personal Loan by December 2025 by cutting gym costs...')}
          className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 px-8 text-slate-800 placeholder:text-slate-300 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
          rows={4}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={onComplete} 
          className="group px-20 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          {t('Commit & Save Plan')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
