'use client';

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, ClipboardList, Target, ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoSave } from "@/lib/hooks";

type Strategy = "avalanche" | "snowball";

const STRATEGY_INFO: Record<Strategy, { name: string; icon: string; focus: string }> = {
  avalanche: { name: "Avalanche Method ❄️", icon: "❄️", focus: "Highest interest first" },
  snowball: { name: "Snowball Method ⛄", icon: "⛄", focus: "Smallest balance first" },
};

const STEPS = [
  'Introduction',
  'Learn Debt Types',
  'Choose Strategy',
  'Action Plan'
];

export default function DebtManagementPage() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(1);
  const [expandedDebt, setExpandedDebt] = useState<"good" | "bad" | "manageable" | null>("good");
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
  }, { enabled: completed, isDirty: completed });

  return (
    <main className="inner-page">
      <PageHeader
        title={t('Debt Management Guide')}
        subtitle={t('Activity')}
        onBackClick={goBack}
        steps={STEPS}
        currentStep={screen - 1}
      />

      <div className="inner-content" style={{ maxWidth: 500 }}>
        <AnimatePresence mode="wait">
          {completed ? (
             <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-4xl mb-6">
                🎉
              </div>
              <h2 className="heading-xl mb-4">{t('Exercise Complete!')}</h2>
              <p className="text-secondary mb-8">
                {t("You've picked a strategy to tackle your debt. Consistency is key!")}
              </p>
              <button
                onClick={() => {
                  setCompleted(false);
                  setScreen(1);
                  setNotes("");
                }}
                className="btn btn-primary btn-lg btn-full"
              >
                {t('Restart Activity')}
              </button>
            </motion.div>
          ) : (
            <motion.article
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="card overflow-hidden"
              style={{ paddingBottom: 'var(--space-8)' }}
            >
              {screen === 1 && <Screen1 />}
              {screen === 2 && <Screen2 expanded={expandedDebt} setExpanded={setExpandedDebt} />}
              {screen === 3 && <Screen3 strategy={strategy} setStrategy={setStrategy} />}
              {screen === 4 && (
                <Screen4
                  strategy={strategy}
                  notes={notes}
                  setNotes={setNotes}
                  completed={completed}
                />
              )}

              {/* CTA */}
              <div className="px-6 mt-8 flex justify-end">
                {screen < 4 ? (
                  <button onClick={goNext} className="btn btn-primary btn-md">
                    {screen === 1 && <>{t('Get Started')} <ArrowRight size={18} /></>}
                    {screen === 2 && <>{t('Got it! Next')} <ArrowRight size={18} /></>}
                    {screen === 3 && <>{t('This Works for Me!')} <ArrowRight size={18} /></>}
                  </button>
                ) : (
                  <button onClick={() => setCompleted(true)} className="btn btn-primary btn-md">
                    {t('✅ Complete Exercise')}
                  </button>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------- Screen 1 ---------- */
const Screen1 = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div 
        className="relative mx-6 rounded-3xl overflow-hidden p-8 text-white mt-6"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div className="relative flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30">
            💳
          </div>
          <span className="label-caps" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '999px' }}>
            {t('Financial Wellness · Activity')}
          </span>
          <h1 className="heading-xl leading-tight" style={{ color: 'white' }}>{t('Take Control of Your Debt')}</h1>
          <p className="text-sm" style={{ opacity: 0.9, lineHeight: 1.6 }}>
            {t("Debt doesn't have to be scary. Learn smart repayment strategies and take one clear action today.")}
          </p>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-3">
        {[
          { icon: <Clock size={20} />, label: "Time Required", value: "7–10 minutes", bg: 'var(--brand-primary-bg)', color: 'var(--brand-primary)' },
          { icon: <ClipboardList size={20} />, label: "What You'll Do", value: "Learn, assess & build a plan", bg: 'rgba(245,158,11,0.1)', color: 'var(--brand-gold)' },
          { icon: <Target size={20} />, label: "Goal", value: "Pick a payoff strategy", bg: 'rgba(16,185,129,0.1)', color: 'var(--brand-success)' },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ background: 'white', color: row.color }}>{row.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="label-caps" style={{ fontSize: '10px' }}>{t(row.label)}</p>
              <p className="text-sm font-bold text-primary">{t(row.value)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Screen 2 ---------- */
type DebtKey = "good" | "bad" | "manageable";
const DEBTS: {
  key: DebtKey;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  examples: string;
  fact: string;
  tip: string;
}[] = [
  {
    key: "good",
    emoji: "💚",
    title: "Good Debt",
    subtitle: "Builds wealth over time",
    color: "var(--brand-success)",
    examples: "Home loan, education loan, business loan",
    fact: "Usually low interest rate & tax benefits available",
    tip: "Pay on time to build a strong credit score",
  },
  {
    key: "bad",
    emoji: "🔴",
    title: "Bad Debt",
    subtitle: "Costs you the most",
    color: "var(--brand-danger)",
    examples: "Credit card dues, personal loans for shopping, BNPL",
    fact: "Very high interest (24–48% per year on credit cards!)",
    tip: "Pay bad debt first — it costs you the most",
  },
  {
    key: "manageable",
    emoji: "🟡",
    title: "Manageable Debt",
    subtitle: "Under control & being repaid",
    color: "var(--brand-gold)",
    examples: "Car loan, consumer durables EMI",
    fact: "EMIs should not exceed 40% of your income",
    tip: "Don't take on more debt while repaying existing ones",
  },
];

const Screen2 = ({ expanded, setExpanded }: { expanded: DebtKey | null; setExpanded: (k: DebtKey | null) => void; }) => {
  const { t } = useTranslation();
  return (
    <div className="px-6 flex flex-col mt-6">
      <span className="label-caps mb-4" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px', alignSelf: 'flex-start' }}>
        {t('Step 1 of 3 · Learn')}
      </span>
      <h2 className="heading-lg text-primary mb-2">{t('Not All Debt Is Equal 📚')}</h2>
      <p className="text-sm text-secondary mb-6">{t('Tap each type to understand it better')}</p>

      <div className="space-y-3">
        {DEBTS.map((d) => {
          const isOpen = expanded === d.key;
          return (
            <div key={d.key} className="card overflow-hidden transition-all duration-300" style={{ borderColor: isOpen ? d.color : 'var(--border-subtle)' }}>
              <button onClick={() => setExpanded(isOpen ? null : d.key)} className="w-full flex items-center gap-4 p-4 text-left" style={{ background: isOpen ? 'var(--bg-page)' : 'white' }}>
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">{d.emoji} {t(d.title)}</p>
                  <p className="text-xs text-secondary">{t(d.subtitle)}</p>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0 space-y-3 text-xs leading-relaxed animate-fadeIn">
                  <div className="separator" style={{ margin: '8px 0' }} />
                  <p><span className="font-bold text-primary">{t('Examples')}: </span><span className="text-secondary">{t(d.examples)}</span></p>
                  <p><span className="font-bold text-primary">{t('Key fact')}: </span><span className="text-secondary">{t(d.fact)}</span></p>
                  <div className="rounded-xl p-3" style={{ background: 'var(--brand-primary-bg)', border: '1px solid var(--border-brand)' }}>
                    <p><span className="font-bold" style={{ color: 'var(--brand-primary)' }}>💡 {t('Tip')}: </span><span style={{ color: 'var(--brand-primary)', opacity: 0.8 }}>{t(d.tip)}</span></p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Screen 3 ---------- */
const STRATEGIES: {
  key: Strategy;
  emoji: string;
  name: string;
  badge: string;
  color: string;
  desc: string;
  how: string;
  example: string;
}[] = [
  {
    key: "avalanche",
    emoji: "❄️",
    name: "Avalanche Method",
    badge: "Saves Most Money",
    color: "var(--brand-success)",
    desc: "Pay off the highest interest debt first — best for saving the most money overall.",
    how: "Make minimum payments on all debts. Put any extra money toward the highest interest one first.",
    example: "💡 Tackle credit card (40% interest) before car loan (12% interest)",
  },
  {
    key: "snowball",
    emoji: "⛄",
    name: "Snowball Method",
    badge: "Builds Momentum",
    color: "var(--brand-primary)",
    desc: "Pay off the smallest debt first — best for building motivation and quick wins.",
    how: "Make minimum payments on all debts. Put any extra money toward the smallest balance first.",
    example: "💡 Clear ₹5,000 dues first, then ₹20,000, then bigger loans",
  },
];

const Screen3 = ({ strategy, setStrategy }: { strategy: Strategy; setStrategy: (s: Strategy) => void; }) => {
  const { t } = useTranslation();
  return (
    <div className="px-6 flex flex-col mt-6">
      <span className="label-caps mb-4" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px', alignSelf: 'flex-start' }}>
        {t('Step 2 of 3 · Strategy')}
      </span>
      <h2 className="heading-lg text-primary mb-2">{t('Pick Your Debt Payoff Strategy 🎯')}</h2>
      <p className="text-sm text-secondary mb-6">{t('Two proven methods — choose what works for you')}</p>

      <div className="space-y-4">
        {STRATEGIES.map((s) => {
          const selected = strategy === s.key;
          return (
            <button key={s.key} onClick={() => setStrategy(s.key)} className="card w-full text-left p-5 transition-all duration-300" style={{ borderColor: selected ? s.color : 'var(--border-subtle)', background: selected ? 'var(--bg-page)' : 'white' }}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-sm font-bold text-primary">{s.emoji} {t(s.name)}</p>
                  <span className="label-caps mt-1 inline-block" style={{ fontSize: '9px', background: 'white', padding: '2px 8px', borderRadius: '4px', border: `1px solid ${s.color}`, color: s.color }}>{t(s.badge)}</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: selected ? s.color : 'var(--border-subtle)', background: selected ? s.color : 'transparent' }}>
                  {selected && <Check size={12} color="white" />}
                </div>
              </div>
              <p className="text-xs text-secondary leading-relaxed mb-4">{t(s.desc)}</p>
              <div className="rounded-xl p-3 text-[11px] leading-relaxed mb-3" style={{ background: 'white', border: '1px solid var(--border-subtle)' }}>
                <span className="font-bold text-primary">{t('How it works')}: </span>{t(s.how)}
              </div>
              <p className="text-[11px] text-secondary italic">{t(s.example)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Screen 4 ---------- */
const Screen4 = ({ strategy, notes, setNotes }: { strategy: Strategy; notes: string; setNotes: (s: string) => void; completed: boolean; }) => {
  const { t } = useTranslation();
  const info = STRATEGY_INFO[strategy];
  return (
    <div className="flex flex-col px-6 mt-6">
      <div className="rounded-3xl p-6 flex flex-col items-center text-center mb-6" style={{ background: 'var(--brand-primary-bg)' }}>
        <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl shadow-sm mb-4">💪</div>
        <h2 className="heading-md text-primary">{t('Your Debt Action Plan')}</h2>
        <p className="text-xs text-secondary mt-1">{t('Small consistent steps lead to debt freedom')}</p>
      </div>

      <div className="space-y-4">
        <div className="card border overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 label-caps" style={{ fontSize: '10px' }}>{t('Your Summary')}</div>
          <div className="divide-y divide-subtle text-xs">
            <div className="flex justify-between px-4 py-3">
              <span className="text-secondary">{t('🎯 Strategy Chosen')}</span>
              <span className="font-bold text-primary">{t(info.name)}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-secondary">{t('📌 Focus')}</span>
              <span className="font-bold text-primary">{t(info.focus)}</span>
            </div>
          </div>
        </div>

        <div className="card border overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 label-caps" style={{ fontSize: '10px' }}>{t('Your 3-Step Action Plan')}</div>
          <div className="p-4 space-y-4">
            {[
              "List all your debts with their interest rates this week",
              "Make minimum payments on all, put extra toward priority debt",
              "Track progress every month — celebrate every small win!",
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">{i + 1}</div>
                <p className="text-xs text-secondary leading-relaxed pt-1">{t(step)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <label className="text-xs font-bold text-primary mb-2 block">📝 {t('Any notes about your debt situation? (optional)')}</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('E.g. I want to clear my credit card by March…')} rows={3} className="form-input text-sm" />
        </div>
      </div>
    </div>
  );
};
