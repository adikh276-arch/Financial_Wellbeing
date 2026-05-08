import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import {
  ExerciseState,
  MONTHS,
  formatINR,
  monthsBetween,
  parseAmount,
} from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  state: ExerciseState;
  setState: (s: ExerciseState) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Screen3Target = ({ state, setState, onNext, onBack }: Props) => {
  const { t } = useTranslation();
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
          {t('Next')} →
        </PrimaryButton>
      }
    >
      <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
        {t('Step 2 of 3 · Your Numbers')}
      </span>
      <h2 className="heading-lg text-primary mt-4">{t('How Much Do You Need?')} 💰</h2>
      <p className="text-sm text-secondary mt-1">
        {t('Enter your savings target and timeline')}
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-xs font-bold text-primary">
          {t('How much do you want to save?')}
        </label>
        <div className="flex items-stretch rounded-2xl border border-default overflow-hidden">
          <div className="flex items-center justify-center px-4 font-bold text-lg" style={{ background: 'var(--brand-primary-bg)', color: 'var(--brand-primary)' }}>
            ₹
          </div>
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
            className="form-input"
            style={{ border: 'none', borderRadius: 0, padding: '12px 16px', fontWeight: 700 }}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-xs font-bold text-primary">
          {t('By when do you want to reach this goal?')}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={state.targetMonth}
            onChange={(e) =>
              setState({ ...state, targetMonth: e.target.value })
            }
            className="form-input"
          >
            <option value="">{t('Month')}</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{t(m)}</option>
            ))}
          </select>
          <select
            value={state.targetYear}
            onChange={(e) =>
              setState({ ...state, targetYear: e.target.value })
            }
            className="form-input"
          >
            <option value="">{t('Year')}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {ready && (
        <div className="mt-8 animate-fadeIn rounded-2xl p-5 border" style={{ background: 'var(--brand-success-bg)', borderColor: 'var(--brand-success)' }}>
          <div className="space-y-3 text-sm text-primary">
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t('📅 Months remaining')}</span>
              <span className="font-bold">{months}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t('💾 You need to save')}</span>
              <span className="font-bold">
                ₹{formatINR(monthly)} / {t('month')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t('☕ That\'s just')}</span>
              <span className="font-bold">
                ₹{formatINR(daily)} / {t('day')}
              </span>
            </div>
          </div>
          <div className="separator" style={{ margin: '12px 0' }} />
          <p className="text-xs font-bold" style={{ color: 'var(--brand-success)' }}>
            {t(motivation)}
          </p>
        </div>
      )}
    </ScreenShell>
  );
};