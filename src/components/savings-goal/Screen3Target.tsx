import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import {
  ExerciseState,
  MONTHS,
  formatINR,
  monthsBetween,
  parseAmount,
} from "./types";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Screen3Target = ({ state, setState, onNext, onBack }: Props) => {
  const amount = parseAmount(state.targetAmount);
  const months = monthsBetween(state.targetMonth, state.targetYear);
  const ready =
    amount > 0 && state.targetMonth !== "" && state.targetYear !== "";

  const monthly = ready ? amount / months : 0;
  const daily = monthly / 30;

  let motivation = "";
  if (ready) {
    if (daily < 100) motivation = "That's less than a coffee a day! ☕ You've got this.";
    else if (daily <= 500) motivation = "Totally achievable with a little planning! 💪";
    else motivation = "Ambitious goal! Consider extending your timeline or increasing income. 🚀";
  }

  const now = new Date();
  const years = Array.from({ length: 11 }, (_, i) => now.getFullYear() + i);

  return (
    <ScreenShell
      step={3}
      total={5}
      progress={60}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onNext} disabled={!ready}>
          Next →
        </PrimaryButton>
      }
    >
      <span className="inline-block rounded-full bg-gold-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
        Step 2 of 3 · Your Numbers
      </span>
      <h2 className="mt-3 text-xl font-bold text-navy">How Much Do You Need? 💰</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your savings target and timeline
      </p>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-semibold text-navy">
          How much do you want to save?
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            ₹
          </span>
          <input
            inputMode="numeric"
            value={
              state.targetAmount
                ? parseAmount(state.targetAmount).toLocaleString("en-IN")
                : ""
            }
            onChange={(e) =>
              setState({ ...state, targetAmount: e.target.value })
            }
            placeholder="1,00,000"
            className="w-full rounded-xl border-2 border-border bg-card py-2.5 pl-7 pr-3.5 text-sm font-medium text-navy outline-none transition focus:border-success"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-navy">
          By when do you want to reach this goal?
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <select
            value={state.targetMonth}
            onChange={(e) =>
              setState({ ...state, targetMonth: e.target.value })
            }
            className="rounded-xl border-2 border-border bg-card px-3 py-2.5 text-sm text-navy outline-none transition focus:border-success"
          >
            <option value="">Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={state.targetYear}
            onChange={(e) =>
              setState({ ...state, targetYear: e.target.value })
            }
            className="rounded-xl border-2 border-border bg-card px-3 py-2.5 text-sm text-navy outline-none transition focus:border-success"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {ready && (
        <div className="mt-5 animate-fade-in rounded-2xl border-2 border-success/30 bg-success-soft p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-navy/70">📅 Months remaining</span>
              <span className="font-bold text-navy">{months}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-navy/70">💾 You need to save</span>
              <span className="font-bold text-navy">
                ₹{formatINR(monthly)} / month
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-navy/70">☕ That's just</span>
              <span className="font-bold text-navy">
                ₹{formatINR(daily)} / day
              </span>
            </div>
          </div>
          <p className="mt-3 border-t border-success/20 pt-3 text-xs font-medium text-navy">
            {motivation}
          </p>
        </div>
      )}
    </ScreenShell>
  );
};