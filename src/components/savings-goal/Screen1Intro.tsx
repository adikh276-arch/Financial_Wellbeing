import { ScreenShell } from "./ScreenShell";
import { PrimaryButton } from "./PrimaryButton";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export const Screen1Intro = ({ onNext, onBack }: Props) => {
  return (
    <ScreenShell
      step={1}
      total={5}
      progress={20}
      onBack={onBack}
      cta={<PrimaryButton onClick={onNext}>Let's Start →</PrimaryButton>}
    >
      {/* Hero */}
      <div className="relative -mx-5 mb-5 overflow-hidden bg-gradient-navy px-5 py-8">
        <div className="absolute inset-0 bg-gradient-gold" />
        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-3xl shadow-soft">
            🎯
          </div>
          <span className="mt-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
            Financial Wellness · Activity
          </span>
          <h1 className="mt-3 text-2xl font-bold text-white">
            Dream It. Plan It. Save It.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Setting a savings goal is the first step to making it real. Define
            what you're saving for, how much you need, and build a simple plan
            to get there.
          </p>
        </div>
      </div>

      {/* Stat chips */}
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {[
          { icon: "⏱️", label: "7–10 mins" },
          { icon: "📋", label: "3 Steps" },
          { icon: "🎯", label: "Savings Goal" },
        ].map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-navy"
          >
            <span>{s.icon}</span>
            {s.label}
          </span>
        ))}
      </div>

      {/* Info list */}
      <div className="space-y-2.5">
        {[
          {
            icon: "⏱️",
            title: "Time Required",
            body: "7–10 minutes",
          },
          {
            icon: "📋",
            title: "What You'll Do",
            body: "Set a goal, calculate your savings & build a plan",
          },
          {
            icon: "🎯",
            title: "Goal",
            body: "Walk away with a clear, actionable savings target",
          },
        ].map((row) => (
          <div
            key={row.title}
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5"
          >
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-muted text-lg">
              {row.icon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {row.title}
              </p>
              <p className="text-sm font-medium text-navy">{row.body}</p>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
};