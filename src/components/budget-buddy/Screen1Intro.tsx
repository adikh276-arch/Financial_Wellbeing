import { CTAButton } from "./CTAButton";
import { useTranslation } from "react-i18next";

interface Screen1Props {
  onNext: () => void;
}

export const Screen1Intro = ({ onNext }: Screen1Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div 
        className="relative mx-6 rounded-3xl overflow-hidden p-8 text-white mt-6"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div className="relative flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30">
            💰
          </div>
          <span className="label-caps" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '999px' }}>
            {t('Financial Wellness · Activity')}
          </span>
          <h1 className="heading-xl leading-tight" style={{ color: 'white' }}>{t('Plan Your Money, Own Your Life')}</h1>
          <p className="text-sm" style={{ opacity: 0.9, lineHeight: 1.6 }}>
            {t("A budget isn't about restriction — it's about freedom. Understand where your money goes in under 10 minutes.")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["⏱️ 7–10 mins", "📋 4 Steps", "🎯 Budgeting"].map((t_val) => (
              <span
                key={t_val}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15"
              >
                {t(t_val)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info list */}
      <div className="px-6 mt-8 space-y-3">
        {[
          { icon: "⏱️", label: "Time Required", value: "7–10 minutes" },
          { icon: "📋", label: "What You'll Do", value: "Learn, reflect & build your personal budget" },
          { icon: "🎯", label: "Goal", value: "Know your income, expenses & savings gap" },
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

      <CTAButton label="Get Started →" onClick={onNext} />
    </div>
  );
};
