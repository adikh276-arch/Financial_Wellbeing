import { useEffect } from "react";
import { CTAButton } from "./CTAButton";
import { useTranslation } from "react-i18next";

export interface BudgetValues {
  needs: number;
  wants: number;
  savings: number;
}

interface Screen4Props {
  income: number;
  values: BudgetValues;
  setValues: (v: BudgetValues) => void;
  onNext: () => void;
}

const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

export const Screen4Build = ({ income, values, setValues, onNext }: Screen4Props) => {
  const { t } = useTranslation();
  
  const recommended: BudgetValues = {
    needs: Math.round(income * 0.5),
    wants: Math.round(income * 0.3),
    savings: Math.round(income * 0.2),
  };

  useEffect(() => {
    if (values.needs === 0 && values.wants === 0 && values.savings === 0) {
      setValues(recommended);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income]);

  const total = values.needs + values.wants + values.savings;
  const diff = total - income;

  let status: { tone: "ok" | "over" | "under"; text: string };
  if (diff === 0) status = { tone: "ok", text: "Your budget is balanced. Great job!" };
  else if (diff > 0) status = { tone: "over", text: `You're ₹${fmt(diff)} over your income. Adjust your plan.` };
  else status = { tone: "under", text: `You have ₹${fmt(-diff)} unallocated — consider adding it to savings!` };

  const rows = [
    { key: "needs" as const, color: "var(--brand-primary)", icon: "🏠", name: "Needs", pct: "50%" },
    { key: "wants" as const, color: "var(--brand-accent)", icon: "🎉", name: "Wants", pct: "30%" },
    { key: "savings" as const, color: "var(--brand-gold)", icon: "💎", name: "Savings", pct: "20%" },
  ];

  const update = (k: keyof BudgetValues, v: string) => {
    const n = v === "" ? 0 : Math.max(0, Number(v));
    setValues({ ...values, [k]: n });
  };

  return (
    <div className="flex flex-col">
      <div className="px-6 space-y-4 mt-6">
        <span className="label-caps" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-bg)', padding: '4px 12px', borderRadius: '999px' }}>
          {t('Step 3 of 4 · Plan')}
        </span>
        <h2 className="heading-lg text-primary">{t("Let's Build Your Budget 📊")}</h2>
        <p className="text-sm text-secondary leading-relaxed">
          {t('Based on your income, here\'s your recommended split. Adjust the numbers as needed.')}
        </p>

        <div className="rounded-xl p-4 text-xs font-medium" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
          💡 {t('Using')} <span className="font-bold">₹{fmt(income)}</span> {t('as your estimated income for this plan.')}
        </div>

        <div className="card overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-slate-50 label-caps px-4 py-3" style={{ fontSize: '10px' }}>
            <span>{t('Category')}</span>
            <span className="text-right">{t('Recommended')}</span>
            <span className="text-right">{t('Your Plan')}</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.key}
              className="grid grid-cols-[1.4fr_1fr_1.2fr] items-center px-4 py-4 border-t border-subtle"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="text-xl">{r.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-primary truncate">{t(r.name)}</div>
                  <div className="text-[10px] text-secondary">{r.pct}</div>
                </div>
              </div>
              <span className="text-xs font-medium text-secondary text-right">
                ₹{fmt(recommended[r.key])}
              </span>
              <div className="flex items-center justify-end">
                <div className="flex items-center rounded-xl border border-border focus-within:border-brand overflow-hidden bg-white w-full max-w-[120px]">
                  <span className="text-xs font-bold text-primary pl-3">₹</span>
                  <input
                    type="number"
                    value={values[r.key] || ""}
                    onChange={(e) => update(r.key, e.target.value)}
                    className="w-full px-2 py-2 text-sm font-bold text-primary bg-transparent outline-none text-right"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] items-center bg-slate-50 px-4 py-4 border-t border-subtle">
            <span className="text-xs font-bold text-primary">{t('Total')}</span>
            <span className="text-xs font-medium text-secondary text-right">₹{fmt(income)}</span>
            <span
              className="text-sm font-bold text-right"
              style={{
                color: status.tone === "ok" ? "var(--brand-success)" : status.tone === "over" ? "var(--brand-danger)" : "var(--brand-gold)"
              }}
            >
              ₹{fmt(total)}
            </span>
          </div>
        </div>

        <div
          className="rounded-xl p-4 text-xs font-medium border"
          style={{
            background: status.tone === "ok" ? "rgba(16,185,129,0.1)" : status.tone === "over" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
            borderColor: status.tone === "ok" ? "var(--brand-success)" : status.tone === "over" ? "var(--brand-danger)" : "var(--brand-gold)",
            color: status.tone === "ok" ? "var(--brand-success)" : status.tone === "over" ? "var(--brand-danger)" : "var(--brand-gold)"
          }}
        >
          {status.tone === "ok" && "✅ "}
          {status.tone === "over" && "⚠️ "}
          {status.tone === "under" && "💡 "}
          {t(status.text)}
        </div>
      </div>

      <CTAButton label="Looks Good! →" onClick={onNext} />
    </div>
  );
};
