import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import { GOAL_CATEGORIES, ExerciseState } from "./types";
import { cn } from "@/lib/utils";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Screen2Goal = ({ state, setState, onNext, onBack }: Props) => {
  const isCustom = state.categoryId === "custom";
  const customOk = !isCustom || state.customGoal.trim().length > 0;
  const canNext =
    !!state.categoryId && state.goalName.trim().length > 0 && customOk;

  return (
    <ScreenShell
      step={2}
      total={5}
      progress={40}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onNext} disabled={!canNext}>
          Next →
        </PrimaryButton>
      }
    >
      <span className="inline-block rounded-full bg-gold-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
        Step 1 of 3 · Your Goal
      </span>
      <h2 className="mt-3 text-xl font-bold text-navy">
        What Are You Saving For? 🌟
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a goal that excites you
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {GOAL_CATEGORIES.map((cat) => {
          const selected = state.categoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() =>
                setState({ ...state, categoryId: cat.id })
              }
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 text-center transition",
                selected
                  ? "border-gold bg-gold-soft shadow-soft"
                  : "border-border bg-card hover:border-gold/40",
              )}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-[10px] font-semibold leading-tight text-navy">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {isCustom && (
        <div className="mt-4 animate-fade-in">
          <label className="mb-1.5 block text-xs font-semibold text-navy">
            Describe your goal
          </label>
          <input
            value={state.customGoal}
            onChange={(e) =>
              setState({ ...state, customGoal: e.target.value })
            }
            placeholder="What are you saving for?"
            className="w-full rounded-xl border-2 border-border bg-card px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-gold"
          />
        </div>
      )}

      {state.categoryId && (
        <div className="mt-4 animate-fade-in">
          <label className="mb-1.5 block text-xs font-semibold text-navy">
            Give your goal a name
          </label>
          <input
            value={state.goalName}
            onChange={(e) =>
              setState({ ...state, goalName: e.target.value })
            }
            placeholder="e.g. Goa Trip 2025, Dream Home…"
            className="w-full rounded-xl border-2 border-border bg-card px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-gold"
          />
        </div>
      )}
    </ScreenShell>
  );
};