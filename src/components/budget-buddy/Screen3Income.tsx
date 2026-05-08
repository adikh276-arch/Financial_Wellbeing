import { CTAButton } from "./CTAButton";
import { useTranslation } from "react-i18next";

interface Screen3Props {
  income: string;
  setIncome: (v: string) => void;
  onNext: () => void;
}

export const Screen3Income = ({ income, setIncome, onNext }: Screen3Props) => {
  const { t } = useTranslation();
  const valid = income.trim() !== "" && Number(income) > 0;

  return (
    <div className="flex flex-col">
      <div className="px-6 space-y-4 mt-6">
        <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
          {t('Step 2 of 4 · Your Finances')}
        </span>
        <h2 className="heading-lg text-primary">{t('What is your monthly income?')}</h2>
        <p className="text-sm text-secondary leading-relaxed">
          {t('This helps us calculate your personalised budget. Your answer stays private.')}
        </p>

        <div className="pt-4">
          <div
            className="flex items-stretch rounded-2xl border overflow-hidden transition-all duration-200"
            style={{ 
              borderColor: valid ? 'var(--brand-primary)' : 'var(--border-default)',
              boxShadow: valid ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <div className="flex items-center justify-center px-5 font-bold text-xl" style={{ background: 'var(--brand-primary-bg)', color: 'var(--brand-primary)' }}>
              ₹
            </div>
            <input
              type="number"
              inputMode="numeric"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder={t('e.g. 35000')}
              className="form-input"
              style={{ border: 'none', borderRadius: 0, padding: '16px 20px', fontSize: '1.125rem', fontWeight: 700 }}
            />
          </div>
          <p className="text-xs text-secondary mt-4 flex items-center gap-2">
            🔒 {t('Your data is private and never shared.')}
          </p>
        </div>
      </div>
      <CTAButton label="Next →" onClick={onNext} disabled={!valid} />
    </div>
  );
};
