import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import { ExerciseState, STRATEGIES } from "./types";
import { cn } from "@/lib/utils";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

const badgeClasses: Record<string, string> = {
  green: "bg-success-soft text-success",
  blue: "bg-[hsl(var(--info-soft))] text-[hsl(var(--info-fg))]",
  gold: "bg-gold-soft text-gold-foreground",
};

export const Screen4Plan = ({ state, setState, onNext, onBack }: Props) => {
  const canNext = !!state.strategyId;

  return (
    <ScreenShell
      step={4}
      total={5}
      progress={80}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onNext} disabled={!canNext}>
          Lock In My Plan! →
        </PrimaryButton>
      }
    >
      <span className="inline-block rounded-full bg-gold-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
        Step 3 of 3 · Your Plan
      </span>
      <h2 className="mt-3 text-xl font-bold text-navy">How Will You Save? 🏦</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a savings method that works for you
      </p>

      <div className="mt-5 space-y-3">
        {STRATEGIES.map((s) => {
          const selected = state.strategyId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setState({ ...state, strategyId: s.id })}
              className={cn(
                "block w-full rounded-2xl border-2 p-4 text-left transition",
                selected
                  ? "border-success bg-success-soft shadow-soft"
                  : "border-border bg-card hover:border-success/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <h3 className="text-sm font-bold text-navy">{s.title}</h3>
                </div>
                <span
                  className={cn(
                    "flex-none rounded-full px-2 py-0.5 text-[10px] font-bold",
                    badgeClasses[s.badgeTone],
                  )}
                >
                  {s.badge}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-navy/75">
                {s.description}
              </p>
              <div className="mt-2.5 rounded-lg bg-muted px-3 py-2 text-[11px] leading-relaxed text-navy/80">
                <span className="font-semibold">How it works: </span>
                {s.how}
              </div>
              <p className="mt-2 text-[11px] font-medium text-navy">
                💡 {s.tip}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--warn-soft))] p-3.5 text-xs leading-relaxed text-navy">
        💡 The best savings method is the one you'll actually stick to. Start
        small — you can always increase later!
      </div>
    </ScreenShell>
  );
};