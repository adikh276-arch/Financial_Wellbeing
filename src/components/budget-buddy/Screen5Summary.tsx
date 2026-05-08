import { useState } from "react";
import { CTAButton } from "./CTAButton";
import type { BudgetValues } from "./Screen4Build";
import { useTranslation } from "react-i18next";
import { useAutoSave } from "@/lib/hooks";

interface Screen5Props {
  income: number;
  values: BudgetValues;
  onComplete: () => void;
}

const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

const goals = [
  { id: "reduce", icon: "📉", title: "Reduce Expenses", desc: "Cut one spending habit this week" },
  { id: "save", icon: "💾", title: "Start Saving", desc: "Even ₹500/month builds the habit" },
  { id: "track", icon: "📊", title: "Track Spending", desc: "Log every expense for 7 days" },
  { id: "write", icon: "🧾", title: "Write a Budget", desc: "Put your plan on paper" },
];

// Donut path helper
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const arcPath = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
  const start = polar(cx, cy, r, endDeg);
  const end = polar(cx, cy, r, startDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
};

export const Screen5Summary = ({ income, values, onComplete }: Screen5Props) => {
  const { t } = useTranslation();
  const [goal, setGoal] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const total = values.needs + values.wants + values.savings || 1;
  const segs = [
    { key: "needs", label: "Needs", icon: "🏠", value: values.needs, color: "var(--brand-primary)" },
    { key: "wants", label: "Wants", icon: "🎉", value: values.wants, color: "var(--brand-accent)" },
    {
      key: "savings",
      label: "Savings",
      icon: "💎",
      value: values.savings,
      color: "var(--brand-gold)",
    },
  ];

  // Auto-save the results
  useAutoSave('budget_buddy_history', {
    income,
    values,
    goal,
    notes,
    completedAt: new Date().toISOString()
  }, { enabled: true, isDirty: true });

  // donut arcs
  let acc = 0;
  const arcs = segs.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return { ...s, start, end, pct: Math.round((s.value / total) * 100) };
  });

  const balanced = values.needs + values.wants + values.savings === income && income > 0;
  const wantsPct = (values.wants / (income || 1)) * 100;
  const savingsPct = (values.savings / (income || 1)) * 100;

  let insight: string;
  if (balanced && wantsPct <= 30 && savingsPct >= 20) {
    insight = "Perfect balance! You're following the 50/30/20 rule.";
  } else if (wantsPct > 30) {
    const trim = Math.round(values.wants - income * 0.3);
    insight = `Your wants are slightly above 30% — consider trimming ₹${fmt(trim)} and moving it to savings.`;
  } else if (savingsPct < 20) {
    const add = Math.round(income * 0.2 - values.savings);
    insight = `Try increasing your savings by ₹${fmt(add)} to hit the recommended 20%.`;
  } else {
    insight = "Perfect balance! You're following the 50/30/20 rule.";
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 space-y-4 mt-6">
        <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
          {t('Step 4 of 4 · Your Budget Breakdown')}
        </span>
        <h2 className="heading-lg text-primary">{t('Your Monthly Budget 📊')}</h2>
        <p className="text-sm text-secondary leading-relaxed">
          {t('Here\'s how your')} <span className="font-bold text-primary">₹{fmt(income)}</span> {t('is planned')}
        </p>

        {/* Donut + Legend */}
        <div className="card border p-5 flex flex-col sm:flex-row items-center gap-6" style={{ background: 'var(--bg-base)' }}>
          <div className="relative shrink-0">
            <svg width="140" height="140" viewBox="0 0 120 120">
              {arcs.map((a) =>
                a.value > 0 ? (
                  <path
                    key={a.key}
                    d={arcPath(60, 60, 48, a.start, a.end === a.start ? a.end + 0.001 : a.end)}
                    stroke={a.color}
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="butt"
                  />
                ) : null
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="label-caps" style={{ fontSize: '9px' }}>{t('Total')}</span>
              <span className="text-base font-bold text-primary leading-tight">₹{fmt(income)}</span>
              <span className="text-[9px] font-bold mt-1" style={{ color: balanced ? 'var(--brand-success)' : 'var(--brand-gold)' }}>
                {balanced ? t('Balanced ✅') : t('Review')}
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-3 w-full">
            {arcs.map((a) => (
              <div
                key={a.key}
                className="card bg-white border px-4 py-3 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: a.color }} /> {t(a.label)}
                  </span>
                  <span className="text-[10px] font-bold text-secondary">{a.pct}%</span>
                </div>
                <div className="text-sm font-bold text-primary mt-1">₹{fmt(a.value)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="rounded-xl p-4 text-xs font-medium border" style={{ background: 'var(--brand-primary-bg)', borderColor: 'var(--border-brand)', color: 'var(--brand-primary)', lineHeight: 1.6 }}>
          💡 {t(insight)}
        </div>

        {/* Goals */}
        <div className="pt-2">
          <div className="text-sm font-bold text-primary mb-3">🎯 {t('Pick your focus this month')}</div>
          <div className="grid grid-cols-2 gap-3">
            {goals.map((g) => {
              const selected = goal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className="card p-3 text-left transition-all duration-200"
                  style={{ 
                    borderColor: selected ? 'var(--brand-primary)' : 'var(--border-subtle)',
                    background: selected ? 'var(--brand-primary-bg)' : 'white'
                  }}
                >
                  <div className="text-2xl">{g.icon}</div>
                  <div className="text-xs font-bold text-primary mt-1">{t(g.title)}</div>
                  <div className="text-[10px] text-secondary leading-tight mt-1">
                    {t(g.desc)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('📝 Any notes about your finances? (optional)')}
            rows={3}
            className="form-input text-sm"
          />
        </div>

        {/* Motivational */}
        <div className="card p-4 text-xs leading-relaxed text-white" style={{ background: 'var(--gradient-brand)', border: 'none' }}>
          {t('Every rupee you plan is a rupee that works for you. Small steps today = financial freedom tomorrow')} 💚
        </div>
      </div>

      <CTAButton label="✅ Complete Exercise" onClick={onComplete} showArrow={false} />
    </div>
  );
};
