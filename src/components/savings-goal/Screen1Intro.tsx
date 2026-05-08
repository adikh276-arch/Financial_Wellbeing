import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";
import { useTranslation } from "react-i18next";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Screen1Intro = ({ onNext, onBack }: Props) => {
  const { t } = useTranslation();

  return (
    <ScreenShell
      step={1}
      total={5}
      progress={20}
      onBack={onBack}
      cta={<PrimaryButton onClick={onNext}>{t('Let\'s Start')} →</PrimaryButton>}
    >
      {/* Hero */}
      <div 
        className="relative mx-6 rounded-3xl overflow-hidden p-8 text-white mt-6 text-center"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30">
            🎯
          </div>
          <span className="label-caps" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '999px' }}>
            {t('Financial Wellness · Activity')}
          </span>
          <h1 className="heading-xl leading-tight" style={{ color: 'white' }}>{t('Dream It. Plan It. Save It.')}</h1>
          <p className="text-sm" style={{ opacity: 0.9, lineHeight: 1.6 }}>
            {t("Setting a savings goal is the first step to making it real. Define what you're saving for, how much you need, and build a simple plan to get there.")}
          </p>
        </div>
      </div>

      {/* Info list */}
      <div className="px-6 mt-8 space-y-3">
        {[
          { icon: "⏱️", label: "Time Required", value: "7–10 minutes" },
          { icon: "📋", label: "What You'll Do", value: "Set a goal, calculate your savings & build a plan" },
          { icon: "🎯", label: "Goal", value: "Walk away with a clear, actionable savings target" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-xs">
              {row.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="label-caps" style={{ fontSize: '10px' }}>
                {t(row.label)}
              </div>
              <div className="text-sm font-bold text-primary">{t(row.value)}</div>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
};