'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Info, PiggyBank, ShoppingBag, Home, TrendingUp, Sparkles } from 'lucide-react';
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
      window.location.href = '/';
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
    <main className="inner-page">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 text-center shadow-premium bg-white border-none relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-brand" />
              <div className="w-24 h-24 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-5xl mb-8 shadow-sm">
                🎉
              </div>
              <h2 className="display-sm mb-4">{t('Budget Mastered!')}</h2>
              <p className="text-secondary mb-10 text-lg">
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
                  className="btn btn-primary btn-lg btn-full"
                >
                  {t('Plan Another Budget')}
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
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--brand-primary) 0%, transparent 70%)' }}
        />
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-[2rem] bg-brand-primary-bg flex items-center justify-center text-4xl mb-6 shadow-sm border border-brand">
            💰
          </div>
          <span className="badge badge-warning mb-4">
            {t('NEW ACTIVITY')}
          </span>
          <h1 className="display-sm mb-4">{t('Own Your Money, Own Your Life')}</h1>
          <p className="text-secondary text-lg leading-relaxed max-w-md mx-auto mb-8">
            {t("A budget isn't about restriction — it's about freedom. Let's build yours in under 10 minutes.")}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
             {[
               { label: 'Time', val: '7 mins', icon: '⏱️' },
               { label: 'Steps', val: '4 total', icon: '📋' },
               { label: 'Impact', val: 'High', icon: '✨' }
             ].map(item => (
               <div key={item.label} className="p-4 rounded-2xl bg-base border border-subtle">
                 <div className="text-xl mb-1">{item.icon}</div>
                 <div className="label-caps" style={{ fontSize: '9px' }}>{t(item.label)}</div>
                 <div className="text-sm font-bold text-primary">{t(item.val)}</div>
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

function LearnScreen({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  const [active, setActive] = useState('needs');

  const rules = [
    { id: 'needs', icon: <Home size={24} />, title: '50% Needs', desc: 'Rent, food, utilities, health', color: 'var(--brand-primary)' },
    { id: 'wants', icon: <ShoppingBag size={24} />, title: '30% Wants', desc: 'Dining, shopping, fun, hobbies', color: 'var(--brand-accent)' },
    { id: 'savings', icon: <PiggyBank size={24} />, title: '20% Savings', desc: 'Emergency fund, investments, debt', color: 'var(--brand-gold)' },
  ];

  return (
    <div className="stack-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="heading-xl mb-2">{t('The 50/30/20 Framework')}</h2>
        <p className="text-secondary">{t('The simplest way to manage your wealth. Tap each category to learn more.')}</p>
      </div>

      <div className="pt-4 px-2">
        <div className="flex h-4 w-full rounded-full overflow-hidden shadow-inner bg-base">
          <div style={{ background: "var(--brand-primary)", width: "50%" }} className="relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 text-white text-[10px] px-2 py-1 rounded">50% Needs</div>
          </div>
          <div style={{ background: "var(--brand-accent)", width: "30%" }} className="relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 text-white text-[10px] px-2 py-1 rounded">30% Wants</div>
          </div>
          <div style={{ background: "var(--brand-gold)", width: "20%" }} className="relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 text-white text-[10px] px-2 py-1 rounded">20% Savings</div>
          </div>
        </div>
      </div>

      <div className="stack-4 mt-4">
        {rules.map(r => (
          <button 
            key={r.id} 
            onClick={() => setActive(r.id)}
            className={`option-btn ${active === r.id ? 'active' : ''}`}
            style={{ padding: '24px' }}
          >
            <div className="option-letter" style={{ background: active === r.id ? r.color : 'white', color: active === r.id ? 'white' : r.color }}>
              {r.icon}
            </div>
            <div className="flex-1">
              <h3 className="heading-md mb-1">{t(r.title)}</h3>
              <p className="text-sm text-secondary">{t(r.desc)}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="btn btn-primary btn-md px-10">
          {t('Understood')}
          <ArrowRight size={18} />
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
        <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-primary-bg text-brand flex items-center justify-center mb-6">
          <TrendingUp size={32} />
        </div>
        <h2 className="heading-xl mb-3">{t('What is your monthly income?')}</h2>
        <p className="text-secondary">{t('This helps us calculate your personalized roadmap. Your data is strictly private.')}</p>
      </div>

      <div className="max-w-sm mx-auto w-full">
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-brand">₹</div>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="0"
            className="form-input text-3xl font-bold text-center py-8 pl-12"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-muted">
          <CheckCircle2 size={16} className="text-brand-success" />
          <span className="text-xs font-medium">{t('Secure & Encrypted')}</span>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={onNext} 
          disabled={!valid}
          className="btn btn-primary btn-lg px-12 disabled:opacity-50"
        >
          {t('Continue')}
          <ArrowRight size={20} />
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
        <h2 className="heading-xl mb-2">{t('Tailor Your Plan')} 📐</h2>
        <p className="text-secondary">{t('Adjust the numbers to fit your current lifestyle goals.')}</p>
      </div>

      <div className="card p-8 shadow-premium border-none bg-white">
        <div className="stack-6">
          {[
            { key: 'needs' as const, label: 'Needs (50%)', icon: <Home size={20} />, color: 'var(--brand-primary)' },
            { key: 'wants' as const, label: 'Wants (30%)', icon: <ShoppingBag size={20} />, color: 'var(--brand-accent)' },
            { key: 'savings' as const, label: 'Savings (20%)', icon: <PiggyBank size={20} />, color: 'var(--brand-gold)' },
          ].map(item => (
            <div key={item.key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-primary">{t(item.label)}</span>
                </div>
                <span className="text-xs font-bold text-muted">Rec: ₹{fmt(recommended[item.key])}</span>
              </div>
              <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary/40">₹</div>
                 <input 
                   type="number"
                   value={localValues[item.key] || ""}
                   onChange={(e) => update(item.key, e.target.value)}
                   className="form-input pl-10 pr-12 font-bold text-lg"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase">
                    {Math.round((localValues[item.key] / (income || 1)) * 100)}%
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="separator my-8" />

        <div className="flex items-center justify-between px-2">
          <div>
            <div className="label-caps">{t('TOTAL ALLOCATED')}</div>
            <div className={`heading-xl ${isBalanced ? 'text-brand-success' : 'text-brand-danger'}`}>
              ₹{fmt(total)}
            </div>
          </div>
          <div className="text-right">
            <div className="label-caps">{t('REMAINING')}</div>
            <div className={`heading-xl ${income - total >= 0 ? 'text-brand' : 'text-brand-danger'}`}>
              ₹{fmt(income - total)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2 text-xs font-medium text-secondary">
          <Info size={14} className="text-brand" />
          {isBalanced ? t('Budget is perfectly balanced!') : t('Try to allocate your full income for the best results.')}
        </div>
        <button 
          onClick={onNext} 
          className="btn btn-primary btn-md px-10"
        >
          {t('Final Review')}
          <ArrowRight size={18} />
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
        <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-primary-bg text-brand flex items-center justify-center mb-6 shadow-sm">
          <Sparkles size={32} />
        </div>
        <h2 className="heading-xl mb-2">{t('Your Financial Blueprint')}</h2>
        <p className="text-secondary">{t('A snapshot of your monthly money movement.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Card */}
        <div className="card p-8 flex flex-col items-center justify-center border-none shadow-premium bg-white">
           <div className="relative w-48 h-48 mb-6">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-base)" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="var(--brand-primary)" strokeWidth="12" 
                  strokeDasharray={`${needsPct * 2.51} 251`} 
                  strokeLinecap="round"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="var(--brand-accent)" strokeWidth="12" 
                  strokeDasharray={`${wantsPct * 2.51} 251`} 
                  strokeDashoffset={-(needsPct * 2.51)}
                  strokeLinecap="round"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="var(--brand-gold)" strokeWidth="12" 
                  strokeDasharray={`${savingsPct * 2.51} 251`} 
                  strokeDashoffset={-((needsPct + wantsPct) * 2.51)}
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="label-caps" style={{ fontSize: '10px' }}>{t('MONTHLY')}</div>
                <div className="heading-md">₹{fmt(income)}</div>
             </div>
           </div>
           
           <div className="stack-3 w-full">
              {[
                { label: 'Needs', pct: needsPct, color: 'var(--brand-primary)' },
                { label: 'Wants', pct: wantsPct, color: 'var(--brand-accent)' },
                { label: 'Savings', pct: savingsPct, color: 'var(--brand-gold)' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-secondary">{t(item.label)}</span>
                   </div>
                   <span className="font-bold text-primary">{item.pct}%</span>
                </div>
              ))}
           </div>
        </div>

        {/* Insight Card */}
        <div className="stack-6">
           <div className="card p-6 bg-brand-primary text-white border-none shadow-md relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <TrendingUp size={64} />
             </div>
             <div className="label-caps text-white/70 mb-2">{t('EXPERT INSIGHT')}</div>
             <p className="text-sm font-medium leading-relaxed">
               {savingsPct >= 20 
                 ? t("Fantastic! You're meeting the 20% savings target. This will build significant wealth over time.") 
                 : t("Consider finding small ways to increase your savings to 20%. Even 1% more makes a huge difference.")}
             </p>
           </div>

           <div className="card p-6 bg-white border-none shadow-premium stack-4">
             <div className="label-caps">{t('NEXT STEPS')}</div>
             <ul className="stack-3 text-xs font-medium text-secondary">
               <li className="flex items-start gap-2">
                 <CheckCircle2 size={14} className="text-brand-success mt-0.5 shrink-0" />
                 {t('Automate your savings transfer on payday.')}
               </li>
               <li className="flex items-start gap-2">
                 <CheckCircle2 size={14} className="text-brand-success mt-0.5 shrink-0" />
                 {t('Review your "Wants" subscriptions tonight.')}
               </li>
               <li className="flex items-start gap-2">
                 <CheckCircle2 size={14} className="text-brand-success mt-0.5 shrink-0" />
                 {t('Check back in 30 days to refine.')}
               </li>
             </ul>
           </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onComplete} 
          className="btn btn-primary btn-lg px-16 shadow-premium"
        >
          {t('Finish & Save')}
          <CheckCircle2 size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
