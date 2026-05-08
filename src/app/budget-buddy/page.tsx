'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Info, PiggyBank, ShoppingBag, Home, TrendingUp, Sparkles, Clock, ListChecks, Star } from 'lucide-react';
import { useAutoSave } from "@/lib/hooks";

// --- Types ---
interface BudgetValues {
  needs: number;
  wants: number;
  savings: number;
}

const STEPS = [
  'Welcome',
  'The Rule',
  'Income',
  'Planning',
  'Summary'
];

const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

export default function BudgetBuddyPage() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [values, setValues] = useState<BudgetValues>({ needs: 0, wants: 0, savings: 0 });
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();

  const goTo = (n: number) => setStep(n);
  const handleBack = () => {
    if (step === 1) {
      window.location.href = '/financial_wellbeing';
      return;
    }
    setStep(s => s - 1);
  };

  const incomeNum = Number(income) || 0;

  // Auto-save progress
  useAutoSave('budget_buddy_history', {
    income: incomeNum,
    values,
    step,
    completedAt: completed ? new Date().toISOString() : null
  }, { enabled: true, isDirty: true });

  return (
    <main className="inner-page min-h-screen bg-[#F8FAFC]">
      <PageHeader
        title={t('Budget Buddy')}
        subtitle={t('Activity')}
        onBackClick={handleBack}
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
              className="w-full max-w-[600px] mx-auto"
            >
              {step === 1 && <IntroScreen onNext={() => goTo(2)} />}
              {step === 2 && <LearnScreen onNext={() => goTo(3)} />}
              {step === 3 && <IncomeScreen income={income} setIncome={setIncome} onNext={() => goTo(4)} />}
              {step === 4 && <PlanningScreen income={incomeNum} values={values} setValues={setValues} onNext={() => goTo(5)} />}
              {step === 5 && <SummaryScreen income={incomeNum} values={values} onComplete={() => setCompleted(true)} />}
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <div className="w-28 h-28 mx-auto rounded-[2rem] bg-emerald-50 flex items-center justify-center text-6xl mb-8 shadow-sm border border-emerald-100/50">
                🥳
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('Budget Mastered!')}</h2>
              <p className="text-slate-500 mb-10 text-lg max-w-sm mx-auto leading-relaxed">
                {t("You've built a solid financial foundation today. Your future self is already thanking you.")}
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setCompleted(false);
                    setStep(1);
                    setIncome("");
                    setValues({ needs: 0, wants: 0, savings: 0 });
                  }}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
                >
                  {t('Plan Another Budget')}
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-16 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-50/30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 relative">
             <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
             <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl border border-white/20">
                <PiggyBank size={44} className="text-white drop-shadow-sm" />
             </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-6 border border-amber-100/50">
            <Star size={12} fill="currentColor" />
            {t('NEW ACTIVITY')}
          </span>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{t('Own Your Money, Own Your Life')}</h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto mb-10">
            {t("A budget isn't about restriction — it's about freedom. Let's build yours in under 10 minutes.")}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
             {[
               { label: 'Time', val: '7 mins', icon: <Clock size={16} />, color: 'blue' },
               { label: 'Steps', val: '4 total', icon: <ListChecks size={16} />, color: 'indigo' },
               { label: 'Impact', val: 'High', icon: <TrendingUp size={16} />, color: 'emerald' }
             ].map(item => (
               <div key={item.label} className="p-4 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300">
                 <div className={`text-xl mb-2 flex justify-center text-${item.color}-500`}>{item.icon}</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t(item.label)}</div>
                 <div className="text-sm font-bold text-slate-800">{t(item.val)}</div>
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

function LearnScreen({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  const [active, setActive] = useState('needs');

  const rules = [
    { id: 'needs', icon: <Home size={24} />, title: '50% Needs', desc: 'Rent, food, utilities, health', gradient: 'from-blue-500 to-blue-600', color: '#3B82F6' },
    { id: 'wants', icon: <ShoppingBag size={24} />, title: '30% Wants', desc: 'Dining, shopping, fun, hobbies', gradient: 'from-purple-500 to-indigo-600', color: '#8B5CF6' },
    { id: 'savings', icon: <PiggyBank size={24} />, title: '20% Savings', desc: 'Emergency fund, investments, debt', gradient: 'from-emerald-500 to-teal-600', color: '#10B981' },
  ];

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('The 50/30/20 Framework')}</h2>
        <p className="text-slate-500">{t('The simplest way to manage your wealth. Tap each category to learn more.')}</p>
      </div>

      <div className="px-2 mb-8">
        <div className="flex h-5 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100 p-1 border border-slate-200/50">
          <div style={{ width: "50%" }} className="h-full rounded-l-xl bg-blue-500 transition-all duration-500" />
          <div style={{ width: "30%" }} className="h-full bg-indigo-500 transition-all duration-500" />
          <div style={{ width: "20%" }} className="h-full rounded-r-xl bg-emerald-500 transition-all duration-500" />
        </div>
        <div className="flex justify-between mt-3 px-1">
           <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Needs 50%</span>
           <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Wants 30%</span>
           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Savings 20%</span>
        </div>
      </div>

      <div className="stack-4">
        {rules.map(r => (
          <button 
            key={r.id} 
            onClick={() => setActive(r.id)}
            className={`flex items-center gap-5 p-6 rounded-3xl text-left transition-all duration-300 border-2 ${active === r.id ? 'border-blue-500 bg-blue-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-sm bg-gradient-to-br ${r.gradient}`}>
              <div className="text-white">{r.icon}</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t(r.title)}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t(r.desc)}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active === r.id ? 'bg-blue-500 border-blue-500' : 'border-slate-200'}`}>
               {active === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button onClick={onNext} className="group px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2">
          {t('Understood')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function IncomeScreen({ income, setIncome, onNext }: { income: string, setIncome: (v: string) => void, onNext: () => void }) {
  const { t } = useTranslation();
  const valid = income.trim() !== "" && Number(income) > 0;

  return (
    <div className="stack-8 py-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100/50">
          <TrendingUp size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{t('What is your monthly income?')}</h2>
        <p className="text-slate-500">{t('This helps us calculate your personalized roadmap. Your data is strictly private.')}</p>
      </div>

      <div className="max-w-sm mx-auto w-full">
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-blue-500">₹</div>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="0"
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] text-4xl font-bold text-center py-8 pl-12 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-8 py-3 px-6 rounded-full bg-emerald-50 text-emerald-600 w-fit mx-auto border border-emerald-100/50">
          <CheckCircle2 size={14} />
          <span className="text-[11px] font-bold uppercase tracking-wider">{t('Secure & Encrypted')}</span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={onNext} 
          disabled={!valid}
          className="group px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-30 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          {t('Continue')}
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function PlanningScreen({ income, values, setValues, onNext }: { income: number, values: BudgetValues, setValues: (v: BudgetValues) => void, onNext: () => void }) {
  const { t } = useTranslation();
  
  const recommended: BudgetValues = {
    needs: Math.round(income * 0.5),
    wants: Math.round(income * 0.3),
    savings: Math.round(income * 0.2),
  };

  const [localValues, setLocalValues] = useState<BudgetValues>(
    values.needs === 0 ? recommended : values
  );

  const total = localValues.needs + localValues.wants + localValues.savings;
  const isBalanced = total === income;

  const update = (k: keyof BudgetValues, v: string) => {
    const n = v === "" ? 0 : Math.max(0, Number(v));
    const next = { ...localValues, [k]: n };
    setLocalValues(next);
    setValues(next);
  };

  return (
    <div className="stack-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('Tailor Your Plan')} 📐</h2>
        <p className="text-slate-500">{t('Adjust the numbers to fit your current lifestyle goals.')}</p>
      </div>

      <div className="rounded-[2.5rem] bg-white p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="stack-8">
          {[
            { key: 'needs' as const, label: 'Needs (50%)', icon: <Home size={20} />, color: 'blue' },
            { key: 'wants' as const, label: 'Wants (30%)', icon: <ShoppingBag size={20} />, color: 'indigo' },
            { key: 'savings' as const, label: 'Savings (20%)', icon: <PiggyBank size={20} />, color: 'emerald' },
          ].map(item => (
            <div key={item.key} className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${item.color}-50 text-${item.color}-600 border border-${item.color}-100/50`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-800">{t(item.label)}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-lg">Rec: ₹{fmt(recommended[item.key])}</span>
              </div>
              <div className="relative">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-300 text-lg">₹</div>
                 <input 
                   type="number"
                   value={localValues[item.key] || ""}
                   onChange={(e) => update(item.key, e.target.value)}
                   className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-16 font-bold text-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                 />
                 <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {Math.round((localValues[item.key] / (income || 1)) * 100)}%
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-100 my-10" />

        <div className="flex items-center justify-between px-1">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('TOTAL ALLOCATED')}</div>
            <div className={`text-2xl font-bold ${isBalanced ? 'text-emerald-500' : 'text-rose-500'}`}>
              ₹{fmt(total)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('REMAINING')}</div>
            <div className={`text-2xl font-bold ${income - total >= 0 ? 'text-slate-900' : 'text-rose-500'}`}>
              ₹{fmt(income - total)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold border border-slate-200/50">
          <Info size={14} className="text-blue-500" />
          {isBalanced ? t('Budget is perfectly balanced!') : t('Try to allocate your full income for the best results.')}
        </div>
        <button 
          onClick={onNext} 
          className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center gap-2"
        >
          {t('Final Review')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function SummaryScreen({ income, values, onComplete }: { income: number, values: BudgetValues, onComplete: () => void }) {
  const { t } = useTranslation();
  
  const total = values.needs + values.wants + values.savings || 1;
  const needsPct = Math.round((values.needs / total) * 100);
  const wantsPct = Math.round((values.wants / total) * 100);
  const savingsPct = Math.round((values.savings / total) * 100);

  return (
    <div className="stack-8">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm border border-blue-100/50">
          <Sparkles size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{t('Your Financial Blueprint')}</h2>
        <p className="text-slate-500">{t('A snapshot of your monthly money movement.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Card */}
        <div className="rounded-[2.5rem] bg-white p-8 flex flex-col items-center justify-center border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
           <div className="relative w-52 h-52 mb-8">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#3B82F6" strokeWidth="14" 
                  strokeDasharray={`${needsPct * 2.51} 251`} 
                  strokeLinecap="round"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#8B5CF6" strokeWidth="14" 
                  strokeDasharray={`${wantsPct * 2.51} 251`} 
                  strokeDashoffset={-(needsPct * 2.51)}
                  strokeLinecap="round"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#10B981" strokeWidth="14" 
                  strokeDasharray={`${savingsPct * 2.51} 251`} 
                  strokeDashoffset={-((needsPct + wantsPct) * 2.51)}
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('MONTHLY')}</div>
                <div className="text-xl font-bold text-slate-900">₹{fmt(income)}</div>
             </div>
           </div>
           
           <div className="stack-3 w-full px-4">
              {[
                { label: 'Needs', pct: needsPct, color: '#3B82F6' },
                { label: 'Wants', pct: wantsPct, color: '#8B5CF6' },
                { label: 'Savings', pct: savingsPct, color: '#10B981' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm font-medium text-slate-500">{t(item.label)}</span>
                   </div>
                   <span className="text-sm font-bold text-slate-900">{item.pct}%</span>
                </div>
              ))}
           </div>
        </div>

        {/* Insight Card */}
        <div className="stack-6">
           <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
             <div className="relative z-10">
               <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">{t('EXPERT INSIGHT')}</div>
               <p className="text-[15px] font-medium leading-relaxed">
                 {savingsPct >= 20 
                   ? t("Fantastic! You're meeting the 20% savings target. This will build significant wealth over time.") 
                   : t("Consider finding small ways to increase your savings to 20%. Even 1% more makes a huge difference.")}
               </p>
             </div>
           </div>

           <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm stack-6">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('NEXT STEPS')}</div>
             <ul className="stack-4">
               {[
                 { text: 'Automate your savings transfer on payday.', color: 'emerald' },
                 { text: 'Review your "Wants" subscriptions tonight.', color: 'emerald' },
                 { text: 'Check back in 30 days to refine.', color: 'emerald' }
               ].map((step, i) => (
                 <li key={i} className="flex items-start gap-4">
                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100/50">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                   </div>
                   <span className="text-sm font-medium text-slate-600 leading-snug">{t(step.text)}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onComplete} 
          className="group px-20 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          {t('Finish & Save')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
