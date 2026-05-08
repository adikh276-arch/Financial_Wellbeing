import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import {
  ExerciseState,
  GOAL_CATEGORIES,
  MONTHS,
  STRATEGIES,
  formatINR,
  monthsBetween,
  parseAmount,
} from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onComplete: () => void;
  onBack: () => void;
};

export const Screen5Summary = ({ state, setState, onComplete, onBack }: Props) => {
  const { t } = useTranslation();
  const cat = GOAL_CATEGORIES.find((c) => c.id === state.categoryId);
  const strat = STRATEGIES.find((s) => s.id === state.strategyId);
  const amount = parseAmount(state.targetAmount);
  const months = monthsBetween(state.targetMonth, state.targetYear);
  const monthly = amount / months;
  const targetDate =
    state.targetMonth !== "" && state.targetYear !== ""
      ? `${t(MONTHS[parseInt(state.targetMonth, 10)])} ${state.targetYear}`
      : "—";

  const categoryLabel =
    state.categoryId === "custom"
      ? `✏️ ${state.customGoal || t("Custom Goal")}`
      : cat
        ? `${cat.emoji} ${t(cat.label)}`
        : "—";

  const rows = [
    { icon: "🌟", label: "Goal Name", value: state.goalName || "—" },
    { icon: "🎯", label: "Category", value: categoryLabel },
    { icon: "💰", label: "Target Amount", value: `₹${formatINR(amount)}` },
    { icon: "📅", label: "Target Date", value: targetDate },
    {
      icon: "💾",
      label: "Monthly Savings Needed",
      value: `₹${formatINR(monthly)}`,
    },
    {
      icon: "🏦",
      label: "Savings Method",
      value: strat ? `${strat.emoji} ${t(strat.title)}` : "—",
    },
  ];

  return (
    <ScreenShell
      step={5}
      total={5}
      progress={100}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onComplete}>{t('✅ Complete Exercise')}</PrimaryButton>
      }
    >
      <div className="card p-6 text-center mb-6" style={{ background: 'var(--brand-primary-bg)', border: 'none' }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
          🎉
        </div>
        <h2 className="heading-md text-primary mt-4">
          {t('Your Savings Goal is Set!')}
        </h2>
        <p className="text-sm text-secondary mt-1">
          {t('Here\'s your personal savings plan')}
        </p>
      </div>

      <div className="card border p-4 shadow-xs" style={{ borderLeft: '4px solid var(--brand-primary)' }}>
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-start justify-between gap-4 border-b border-subtle pb-3 last:border-0 last:pb-0"
            >
              <span className="text-xs font-bold text-secondary">
                {r.icon} {t(r.label)}
              </span>
              <span className="text-right text-xs font-bold text-primary">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-xs font-bold text-primary">
          📝 {t('Any notes about your savings goal? (optional)')}
        </label>
        <textarea
          rows={3}
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          placeholder={t('E.g. I\'ll cut dining out to save faster…')}
          className="form-input text-sm"
        />
      </div>

      <div className="card mt-6 p-4 text-center text-white" style={{ background: 'var(--gradient-brand)', border: 'none' }}>
        <p className="text-xs font-medium leading-relaxed">
          {t('A goal without a plan is just a wish. You now have both. Go make it happen!')} 💛
        </p>
      </div>
    </ScreenShell>
  );
};