import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useTranslation } from "react-i18next";

interface Screen2Props {
  onNext: () => void;
}

const rules = [
  {
    id: "needs",
    icon: "🏠",
    title: "50% Needs",
    desc: "Rent, food, transport, utilities",
    color: "var(--brand-primary)",
    means: "Things you cannot live without",
    example: "₹25,000 goes to needs",
    tip: "If needs exceed 50%, look for ways to reduce fixed costs like switching plans or cutting utility bills",
  },
  {
    id: "wants",
    icon: "🎉",
    title: "30% Wants",
    desc: "Dining, shopping, subscriptions",
    color: "var(--brand-accent)",
    means: "Things that improve your lifestyle but aren't essential",
    example: "₹15,000 goes to wants",
    tip: "Cut one subscription you barely use or one fewer takeout per week",
  },
  {
    id: "savings",
    icon: "💎",
    title: "20% Savings",
    desc: "Emergency fund, SIPs, investments",
    color: "var(--brand-gold)",
    means: "Pay yourself first before spending",
    example: "₹10,000 goes to savings",
    tip: "Set up an auto-transfer on payday so savings happen before spending",
  },
];

export const Screen2Learn = ({ onNext }: Screen2Props) => {
  const [open, setOpen] = useState<string | null>("needs");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="px-6 space-y-4 mt-6">
        <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
          {t('Step 1 of 4 · Learn')}
        </span>
        <h2 className="heading-lg text-primary">{t('The 50/30/20 Rule')}</h2>
        <p className="text-sm text-secondary leading-relaxed">
          {t('The simplest framework for managing your money. Tap each card to learn more.')}
        </p>

        {/* Segmented bar */}
        <div className="pt-2">
          <div className="flex h-3 w-full rounded-full overflow-hidden shadow-xs">
            <div style={{ background: "var(--brand-primary)", width: "50%" }} />
            <div style={{ background: "var(--brand-accent)", width: "30%" }} />
            <div style={{ background: "var(--brand-gold)", width: "20%" }} />
          </div>
          <div className="flex justify-between mt-3 label-caps" style={{ fontSize: '10px' }}>
            <span>{t('50% Needs')}</span>
            <span>{t('30% Wants')}</span>
            <span>{t('20% Savings')}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-3 pt-4">
          {rules.map((r) => {
            const isOpen = open === r.id;
            return (
              <div
                key={r.id}
                className="card overflow-hidden transition-all duration-300"
                style={{ 
                  borderColor: isOpen ? r.color : 'var(--border-subtle)',
                  background: isOpen ? 'var(--bg-page)' : 'white'
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: r.color }} />
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-primary">{t(r.title)}</div>
                    <div className="text-xs text-secondary truncate">{t(r.desc)}</div>
                  </div>
                  <ChevronDown
                    size={18}
                    className="text-secondary transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0 space-y-3 text-xs leading-relaxed animate-fadeIn">
                    <div className="separator" style={{ margin: '8px 0' }} />
                    <div>
                      <div className="font-bold text-primary">{t('What this means')}</div>
                      <div className="text-secondary">{t(r.means)}</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{t('Example (₹50,000/month)')}</div>
                      <div className="text-secondary">{t(r.example)}</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: 'var(--brand-primary-bg)', border: '1px solid var(--border-brand)' }}>
                      <div className="font-bold" style={{ color: 'var(--brand-primary)' }}>💡 {t('Tip')}</div>
                      <div style={{ color: 'var(--brand-primary)', opacity: 0.8 }}>{t(r.tip)}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <CTAButton label="Understood →" onClick={onNext} />
    </div>
  );
};
