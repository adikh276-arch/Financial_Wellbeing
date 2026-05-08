import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import { ExerciseState, STRATEGIES } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Screen4Plan = ({ state, setState, onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const canNext = !!state.strategyId;

  return (
    <ScreenShell
      step={4}
      total={5}
      progress={80}
      onBack={onBack}
      cta={
        <PrimaryButton onClick={onNext} disabled={!canNext}>
          {t('Lock In My Plan!')} →
        </PrimaryButton>
      }
    >
      <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
        {t('Step 3 of 3 · Your Plan')}
      </span>
      <h2 className="heading-lg text-primary mt-4">
        {t('How Will You Save?')} 🏦
      </h2>
      <p className="text-sm text-secondary mt-1">
        {t('Pick a savings method that works for you')}
      </p>

      <div className="mt-6 space-y-4">
        {STRATEGIES.map((s) => {
          const selected = state.strategyId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setState({ ...state, strategyId: s.id })}
              className="card w-full p-5 text-left transition-all duration-200"
              style={{ 
                borderColor: selected ? 'var(--brand-success)' : 'var(--border-subtle)',
                background: selected ? 'var(--brand-success-bg)' : 'white',
                boxShadow: selected ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <h3 className="text-sm font-bold text-primary">{t(s.title)}</h3>
                </div>
                <span
                  className="label-caps"
                  style={{ 
                    fontSize: '9px',
                    color: selected ? 'var(--brand-success)' : 'var(--text-secondary)',
                    background: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid currentColor'
                  }}
                >
                  {t(s.badge)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-secondary">
                {t(s.description)}
              </p>
              <div className="mt-3 rounded-xl bg-slate-50 border border-subtle px-4 py-3 text-[11px] leading-relaxed text-primary">
                <span className="font-bold">{t('How it works')}: </span>
                {t(s.how)}
              </div>
              <p className="mt-3 text-[11px] font-bold text-primary">
                💡 {t(s.tip)}
              </p>
            </button>
          );
        })}
      </div>

      <div className="card mt-6 p-4 text-xs leading-relaxed text-primary" style={{ background: 'var(--brand-primary-bg)', border: '1px solid var(--border-brand)' }}>
        💡 {t('The best savings method is the one you\'ll actually stick to. Start small — you can always increase later!')}
      </div>
    </ScreenShell>
  );
};