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

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onComplete: () => void;
  onBack: () => void;
};

export const Screen5Summary = ({ state, setState, onComplete, onBack }: Props) => {
  const cat = GOAL_CATEGORIES.find((c) => c.id === state.categoryId);
  const strat = STRATEGIES.find((s) => s.id === state.strategyId);
  const amount = parseAmount(state.targetAmount);
  const months = monthsBetween(state.targetMonth, state.targetYear);
  const monthly = amount / months;
  const targetDate =
    state.targetMonth !== "" && state.targetYear !== ""
      ? `${MONTHS[parseInt(state.targetMonth, 10)]} ${state.targetYear}`
      : "—";

  const categoryLabel =
    state.categoryId === "custom"
      ? `✏️ ${state.customGoal || "Custom Goal"}`
      : cat
        ? `${cat.emoji} ${cat.label}`
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
      value: strat ? `${strat.emoji} ${strat.title}` : "—",
    },
  ];

  return (
    <ScreenShell
      step={5}
      total={5}
      progress={100}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onComplete}>✅ Complete Exercise</PrimaryButton>
      }
    >
      <div className="-mx-5 mb-4 bg-gradient-summary px-5 py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl shadow-soft">
          🎉
        </div>
        <h2 className="mt-3 text-xl font-bold text-navy">
          Your Savings Goal is Set!
        </h2>
        <p className="mt-1 text-sm text-navy/70">
          Here's your personal savings plan
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft border-l-4 border-l-gold">
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0"
            >
              <span className="text-xs font-medium text-muted-foreground">
                {r.icon} {r.label}
              </span>
              <span className="text-right text-xs font-bold text-navy">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-navy">
          📝 Any notes about your savings goal? (optional)
        </label>
        <textarea
          rows={3}
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          placeholder="E.g. I'll cut dining out to save faster…"
          className="w-full resize-none rounded-xl border-2 border-border bg-card px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-success"
        />
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-summary p-4 text-center">
        <p className="text-xs font-medium leading-relaxed text-navy">
          A goal without a plan is just a wish. You now have both. Go make it
          happen! 💛
        </p>
      </div>
    </ScreenShell>
  );
};