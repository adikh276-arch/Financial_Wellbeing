'use client';
import { LearnModule } from '@/components/LearnModule';
import { Wallet, BarChart4, Zap, Search } from 'lucide-react';

export default function UnderstandIncomeExpenses() {
  return (
    <LearnModule
      title="Understand Income & Expenses"
      subtitle="You can't manage what you don't measure"
      readTime="6 min"
      category="Fundamentals"
      introduction="You can't manage what you don't measure. Understanding every unit coming in and going out is the foundation of financial control. This is where clarity begins."
      sections={[
        { 
          icon: Wallet, 
          heading: 'Types of Income', 
          content: [
            { title: 'Salary (Primary)', description: 'Fixed monthly income. Use net take-home, not gross - taxes and deductions come first.' }, 
            { title: 'Variable Income', description: 'Freelance, bonuses, commissions. Budget conservatively: use average +Ã¹ 80% to avoid over-spending.' }, 
            { title: 'Passive Income', description: 'Rental income, dividends, interest. Bonus income - don\'t rely on it, plan with it.' }
          ] 
        },
        { 
          icon: BarChart4, 
          heading: 'Expense Categories', 
          content: [
            { title: 'Fixed Expenses', description: 'Rent, insurance, EMIs, phone, internet. Constant every month. To optimize: negotiate, refinance, switch providers.' }, 
            { title: 'Variable Expenses', description: 'Groceries, fuel, dining, entertainment. Change monthly. Track for 3 months to find the average.' }, 
            { title: 'Irregular Expenses', description: 'Car maintenance, gifts, medical check-ups. Happen periodically. Divide annual cost by 12 and set aside monthly.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Zap, 
          heading: 'Common Expense Surprises', 
          content: [
            'Food & Groceries: Most people underestimate by 20-30%. Track for 1 month to see reality.', 
            'Subscriptions: Average person has 5-7 active items. Often forgotten in budgets.', 
            'Personal Care: Wellness and grooming - often forgotten in budgets.', 
            'Transportation: Fuel + maintenance + parking + tolls.', 
            'Irregular Expenses: Medical, gifts, repairs. Periodic but unpredictable.'
          ] 
        },
        { 
          icon: Search, 
          heading: 'Real Example: The Surprised Tracker', 
          content: 'A tracker thought they spent 3,000 units/month. After tracking for 30 days, it was 4,200. Biggest surprises: subscriptions (350/month they\'d forgotten) and dining out (450, not the 200 they estimated). Solution: cancelled 4 subscriptions, meal planned on weekdays. New spending: 3,500/month. Freed 700/month for savings - without feeling deprived.' 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Write down every income source: salary, freelance, rental, dividends' }, 
        { number: '02', text: 'Calculate true net income (after taxes, PF, insurance deductions)' }, 
        { number: '03', text: 'List all fixed expenses - these are your baseline floor' }, 
        { number: '04', text: 'Track variable expenses for 7 days: use notes app, receipt photos, or spreadsheet' }, 
        { number: '05', text: 'List irregular expenses and divide annual amount by 12 to budget monthly' }
      ]}
      keyTakeaways={[
        'True income = net take-home, not gross salary', 
        'Track for at least 1 month to discover reality (not assumptions)', 
        'Irregular expenses must be distributed monthly or they\'ll shock you', 
        'Subscriptions are the biggest silent leak for most people', 
        'Small optimizations in fixed costs compound to massive savings'
      ]}
      nextSteps={[
        { label: 'Budget Planner', href: '/budget-planner' }, 
        { label: '50/30/20 Rule', href: '/learn/50-30-20-rule' }, 
        { label: 'Spending Style Quiz', href: '/check-ins/spending-style-quiz' }
      ]}
    />
  );
}
