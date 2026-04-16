'use client';
import { LearnModule } from '@/components/LearnModule';
import { Wallet, BarChart4, Zap, Search } from 'lucide-react';

export default function UnderstandIncomeExpenses() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Understand Income & Expenses")}
      subtitle={t("You can")}t manage what you don't measure"
      readTime="6 min"
      category={t("Fundamentals")}
      introduction={t("You can")}t manage what you don't measure. Understanding every unit coming in and going out is the foundation of financial control. This is where clarity begins."
      sections={[
        { 
          icon: Wallet, 
          heading: t("Types of Income"), 
          content: [
            { title: t("Salary (Primary)"), description: t("Fixed monthly income. Use net take-home, not gross - taxes and deductions come first.") }, 
            { title: t("Variable Income"), description: 'Freelance, bonuses, commissions. Budget conservatively: use average +Ã¹ 80% to avoid over-spending.' }, 
            { title: t("Passive Income"), description: t("Rental income, dividends, interest. Bonus income - don\\")t rely on it, plan with it.' }
          ] 
        },
        { 
          icon: BarChart4, 
          heading: t("Expense Categories"), 
          content: [
            { title: t("Fixed Expenses"), description: t("Rent, insurance, EMIs, phone, internet. Constant every month. To optimize: negotiate, refinance, switch providers.") }, 
            { title: t("Variable Expenses"), description: t("Groceries, fuel, dining, entertainment. Change monthly. Track for 3 months to find the average.") }, 
            { title: t("Irregular Expenses"), description: t("Car maintenance, gifts, medical check-ups. Happen periodically. Divide annual cost by 12 and set aside monthly.") }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Zap, 
          heading: t("Common Expense Surprises"), 
          content: [
            'Food & Groceries: Most people underestimate by 20-30%. Track for 1 month to see reality.', 
            t("Subscriptions: Average person has 5-7 active items. Often forgotten in budgets."), 
            t("Personal Care: Wellness and grooming - often forgotten in budgets."), 
            t("Transportation: Fuel + maintenance + parking + tolls."), 
            t("Irregular Expenses: Medical, gifts, repairs. Periodic but unpredictable.")
          ] 
        },
        { 
          icon: Search, 
          heading: t("Real Example: The Surprised Tracker"), 
          content: t("A tracker thought they spent 3,000 units/month. After tracking for 30 days, it was 4,200. Biggest surprises: subscriptions (350/month they\\")d forgotten) and dining out (450, not the 200 they estimated). Solution: cancelled 4 subscriptions, meal planned on weekdays. New spending: 3,500/month. Freed 700/month for savings - without feeling deprived.' 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Write down every income source: salary, freelance, rental, dividends") }, 
        { number: '02', text: t("Calculate true net income (after taxes, PF, insurance deductions)") }, 
        { number: '03', text: t("List all fixed expenses - these are your baseline floor") }, 
        { number: '04', text: t("Track variable expenses for 7 days: use notes app, receipt photos, or spreadsheet") }, 
        { number: '05', text: t("List irregular expenses and divide annual amount by 12 to budget monthly") }
      ]}
      keyTakeaways={[
        t("True income = net take-home, not gross salary"), 
        t("Track for at least 1 month to discover reality (not assumptions)"), 
        t("Irregular expenses must be distributed monthly or they\\")ll shock you', 
        t("Subscriptions are the biggest silent leak for most people"), 
        t("Small optimizations in fixed costs compound to massive savings")
      ]}
      nextSteps={[
        { label: t("Budget Planner"), href: '/budget-planner' }, 
        { label: t("50/30/20 Rule"), href: '/learn/50-30-20-rule' }, 
        { label: t("Spending Style Quiz"), href: '/check-ins/spending-style-quiz' }
      ]}
    />
  );
}
