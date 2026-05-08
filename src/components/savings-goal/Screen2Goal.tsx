import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import { GOAL_CATEGORIES, ExerciseState } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Screen2Goal = ({ state, setState, onNext, onBack }: Props) => {
  const { t } = useTranslation();
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
          {t('Next')} →
        </PrimaryButton>
      }
    >
      <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
        {t('Step 1 of 3 · Your Goal')}
      </span>
      <h2 className="heading-lg text-primary mt-4">
        {t('What Are You Saving For?')} 🌟
      </h2>
      <p className="text-sm text-secondary mt-1">
        {t('Pick a goal that excites you')}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {GOAL_CATEGORIES.map((cat) => {
          const selected = state.categoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() =>
                setState({ ...state, categoryId: cat.id })
              }
              className="card flex aspect-square flex-col items-center justify-center gap-2 p-3 text-center transition-all duration-200"
              style={{ 
                borderColor: selected ? 'var(--brand-primary)' : 'var(--border-subtle)',
                background: selected ? 'var(--brand-primary-bg)' : 'white',
                boxShadow: selected ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-[10px] font-bold leading-tight text-primary">
                {t(cat.label)}
              </span>
            </button>
          );
        })}
      </div>

      {isCustom && (
        <div className="mt-6 animate-fadeIn">
          <label className="mb-2 block text-xs font-bold text-primary">
            {t('Describe your goal')}
          </label>
          <input
            value={state.customGoal}
            onChange={(e) =>
              setState({ ...state, customGoal: e.target.value })
            }
            placeholder={t('What are you saving for?')}
            className="form-input text-sm"
          />
        </div>
      )}

      {state.categoryId && (
        <div className="mt-6 animate-fadeIn">
          <label className="mb-2 block text-xs font-bold text-primary">
            {t('Give your goal a name')}
          </label>
          <input
            value={state.goalName}
            onChange={(e) =>
              setState({ ...state, goalName: e.target.value })
            }
            placeholder={t('e.g. Goa Trip 2025, Dream Home…')}
            className="form-input text-sm"
          />
        </div>
      )}
    </ScreenShell>
  );
};