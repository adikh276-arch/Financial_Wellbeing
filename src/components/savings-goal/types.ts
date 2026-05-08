export type GoalCategory = {
  id: string;
  emoji: string;
  label: string;
};

export type SavingsStrategy = {
  id: string;
  emoji: string;
  title: string;
  badge: string;
  badgeTone: "green" | "blue" | "gold";
  description: string;
  how: string;
  tip: string;
};

export type ExerciseState = {
  categoryId: string | null;
  customGoal: string;
  goalName: string;
  targetAmount: string;
  targetMonth: string;
  targetYear: string;
  strategyId: string | null;
  notes: string;
};

export const GOAL_CATEGORIES: GoalCategory[] = [
  { id: "home", emoji: "🏠", label: "Home / Property" },
  { id: "travel", emoji: "✈️", label: "Travel / Vacation" },
  { id: "education", emoji: "🎓", label: "Education" },
  { id: "wedding", emoji: "💍", label: "Wedding" },
  { id: "vehicle", emoji: "🚗", label: "Vehicle" },
  { id: "emergency", emoji: "🏥", label: "Emergency Fund" },
  { id: "child", emoji: "👶", label: "Child's Future" },
  { id: "business", emoji: "💼", label: "Business / Investment" },
  { id: "custom", emoji: "✏️", label: "Custom Goal" },
];

export const STRATEGIES: SavingsStrategy[] = [
  {
    id: "fixed",
    emoji: "🏦",
    title: "Fixed Monthly Transfer",
    badge: "Best for Salaried",
    badgeTone: "green",
    description:
      "Transfer a fixed amount to a separate savings account every month.",
    how: "Set it up as an auto-debit on salary day — save before you spend.",
    tip: "Pay yourself first — treat savings like a non-negotiable bill.",
  },
  {
    id: "spare",
    emoji: "🐖",
    title: "Spare Change Method",
    badge: "Start Small",
    badgeTone: "blue",
    description:
      "Save small amounts daily — every rupee adds up faster than you think.",
    how: "Round up purchases or set aside ₹50–100 daily into a separate account.",
    tip: "Even ₹50/day = ₹1,500/month = ₹18,000/year!",
  },
  {
    id: "sip",
    emoji: "📈",
    title: "SIP / Investment",
    badge: "Grow Your Money",
    badgeTone: "gold",
    description:
      "Invest a fixed amount monthly in a mutual fund or recurring deposit.",
    how: "SIPs can earn 10–12% annually — your money grows faster than a savings account.",
    tip: "Best for goals that are 2+ years away.",
  },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatINR(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "0";
  const rounded = Math.round(n);
  return rounded.toLocaleString("en-IN");
}

export function parseAmount(s: string): number {
  const cleaned = s.replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export function monthsBetween(month: string, year: string): number {
  if (!month || !year) return 0;
  const now = new Date();
  const target = new Date(parseInt(year, 10), parseInt(month, 10), 1);
  const diff =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());
  return Math.max(1, diff);
}