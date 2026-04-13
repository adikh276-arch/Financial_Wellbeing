'use client';
import { LearnModule } from '@/components/LearnModule';
import { Scale, BarChart4, Target, Lightbulb, CheckCircle } from 'lucide-react';

export default function DebtManagement() {
  return (
    <LearnModule
      title="Debt Management"
      subtitle="Strategies to become debt-free"
      readTime="7 min"
      category="Debt"
      introduction="Debt is a tool, not a failure. The key is understanding good debt vs bad debt, and having a strategy to become debt-free while building wealth simultaneously."
      sections={[
        { 
          icon: Scale, 
          heading: 'Good Debt vs Bad Debt', 
          content: [
            { title: 'Good Debt (Builds Wealth)', description: 'Home loans (appreciating asset, tax benefits), education loans (investment in yourself), business loans (generates income).' }, 
            { title: 'Bad Debt (Depletes Wealth)', description: 'Credit cards at 18%+ interest, personal loans for consumption, payday loans with predatory rates.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: BarChart4, 
          heading: 'Debt-to-Income Ratio', 
          content: 'Your DTI = Total monthly debt payments ++ Monthly income. Keep it below 36%. Above 50% is financial danger zone. Example: If income is 5,000 units, debt payments should be under 1,800/month.' 
        },
        { 
          icon: Target, 
          heading: 'Repayment Strategies', 
          content: [
            { title: 'Snowball Method', description: 'Pay minimum on all debts. Attack the smallest balance first. Psychological wins keep you motivated.' }, 
            { title: 'Avalanche Method', description: 'Pay minimum on all debts. Attack the highest interest rate first. Saves the most money mathematically.' }, 
            { title: 'Hybrid Method', description: 'Mix of both: one quick snowball win for motivation, then switch to avalanche for the rest.' }
          ] 
        },
        { 
          icon: Lightbulb, 
          heading: 'The Minimum Payment Trap', 
          content: 'A 5,000 unit credit card debt at 18% with minimum payments of 150/month takes 5 years and costs 4,000 in interest (total 9,000!). Paying 500/month clears it in 11 months with only 500 in interest. Strategy saves you 3,500.' 
        },
        { 
          icon: CheckCircle, 
          heading: 'Practical Tips', 
          content: [
            'Call your creditor and negotiate a lower interest rate (often works!)', 
            'Automate debt payments so you never miss one', 
            'Accelerate repayment with windfalls: bonus, tax refunds, gifts', 
            'Don\'t stop saving completely while repaying debt (maintain buffer)', 
            'Track debt payoff visually - the progress is incredibly motivating'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'List every debt: amount, interest rate, minimum payment' }, 
        { number: '02', text: 'Calculate your debt-to-income ratio' }, 
        { number: '03', text: 'Choose snowball or avalanche - pick what you\'ll stick with' }, 
        { number: '04', text: 'Set up automatic minimum payments on all debts today' }, 
        { number: '05', text: 'Use the Loan & EMI Planner to see impact of extra payments' }
      ]}
      keyTakeaways={[
        'Not all debt is bad - strategy and interest rate matter', 
        'Minimum payments keep you trapped for years', 
        'Automate to ensure you never miss a payment', 
        'Balance: repay debt and build savings simultaneously', 
        'Every extra rupee toward debt saves multiples in interest'
      ]}
      nextSteps={[
        { label: 'Loan & EMI Planner', href: '/loan-emi-planner' }, 
        { label: 'Financial Health Score', href: '/financial-health-score' }, 
        { label: 'Money Stress Quiz', href: '/check-ins/money-stress-quiz' }
      ]}
    />
  );
}
