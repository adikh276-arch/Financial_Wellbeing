'use client';
import { useTranslation } from 'react-i18next';
import { LearnModule } from '@/components/LearnModule';
import { Scale, BarChart4, Target, Lightbulb, CheckCircle } from 'lucide-react';

export default function DebtManagement() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Debt Management")}
      subtitle={t("Strategies to become debt-free")}
      readTime="7 min"
      category="Debt"
      introduction={t("Debt is a tool, not a failure. The key is understanding good debt vs bad debt, and having a strategy to become debt-free while building wealth simultaneously.")}
      sections={[
        { 
          icon: Scale, 
          heading: t("Good Debt vs Bad Debt"), 
          content: [
            { title: t("Good Debt (Builds Wealth)"), description: t("Home loans (appreciating asset, tax benefits), education loans (investment in yourself), business loans (generates income).") }, 
            { title: t("Bad Debt (Depletes Wealth)"), description: t("Credit cards at 18%+ interest, personal loans for consumption, payday loans with predatory rates.") }
          ], 
          variant: 'cards' 
        },
        { 
          icon: BarChart4, 
          heading: t("Debt-to-Income Ratio"), 
          content: 'Your DTI = Total monthly debt payments ++ Monthly income. Keep it below 36%. Above 50% is financial danger zone. Example: If income is 5,000 units, debt payments should be under 1,800/month.' 
        },
        { 
          icon: Target, 
          heading: t("Repayment Strategies"), 
          content: [
            { title: t("Snowball Method"), description: t("Pay minimum on all debts. Attack the smallest balance first. Psychological wins keep you motivated.") }, 
            { title: t("Avalanche Method"), description: t("Pay minimum on all debts. Attack the highest interest rate first. Saves the most money mathematically.") }, 
            { title: t("Hybrid Method"), description: t("Mix of both: one quick snowball win for motivation, then switch to avalanche for the rest.") }
          ] 
        },
        { 
          icon: Lightbulb, 
          heading: t("The Minimum Payment Trap"), 
          content: t("A 5,000 unit credit card debt at 18% with minimum payments of 150/month takes 5 years and costs 4,000 in interest (total 9,000!). Paying 500/month clears it in 11 months with only 500 in interest. Strategy saves you 3,500.") 
        },
        { 
          icon: CheckCircle, 
          heading: t("Practical Tips"), 
          content: [
            t("Call your creditor and negotiate a lower interest rate (often works!)"), 
            t("Automate debt payments so you never miss one"), 
            t("Accelerate repayment with windfalls: bonus, tax refunds, gifts"), 
            'Don\'t stop saving completely while repaying debt (maintain buffer)', 
            t("Track debt payoff visually - the progress is incredibly motivating")
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("List every debt: amount, interest rate, minimum payment") }, 
        { number: '02', text: t("Calculate your debt-to-income ratio") }, 
        { number: '03', text: t("Choose snowball or avalanche - pick what you\\")ll stick with' }, 
        { number: '04', text: t("Set up automatic minimum payments on all debts today") }, 
        { number: '05', text: t("Use the Loan & EMI Planner to see impact of extra payments") }
      ]}
      keyTakeaways={[
        t("Not all debt is bad - strategy and interest rate matter"), 
        t("Minimum payments keep you trapped for years"), 
        t("Automate to ensure you never miss a payment"), 
        t("Balance: repay debt and build savings simultaneously"), 
        t("Every extra rupee toward debt saves multiples in interest")
      ]}
      nextSteps={[
        { label: t("Loan & EMI Planner"), href: '/loan-emi-planner' }, 
        { label: t("Financial Health Score"), href: '/financial-health-score' }, 
        { label: t("Money Stress Quiz"), href: '/check-ins/money-stress-quiz' }
      ]}
    />
  );
}
