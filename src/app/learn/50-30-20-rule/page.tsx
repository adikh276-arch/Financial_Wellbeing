'use client';
import { LearnModule } from '@/components/LearnModule';
import { Home, Repeat, BarChart4, Lightbulb } from 'lucide-react';

export default function Rule503020() {
  return (
    <LearnModule
      title="50/30/20 Rule"
      subtitle="The simplest budgeting framework"
      readTime="4 min"
      category="Budgeting"
      introduction="The 50/30/20 rule is the simplest budgeting framework ever created. 50% for needs, 30% for wants, 20% for savings. Not perfect for everyone - but a powerful starting point."
      sections={[
        { 
          icon: Home, 
          heading: 'The Three Buckets', 
          content: [
            { title: '50% - Needs', description: 'Housing, utilities, groceries, transport, insurance, minimum debt payments. Cannot live without these.' }, 
            { title: '30% - Wants', description: 'Entertainment, hobbies, dining out, shopping, subscriptions, travel. Enrich life but aren\'t survival.' }, 
            { title: '20% - Savings & Debt', description: 'Emergency fund, investments, extra debt payments, retirement savings. Your future security.' }
          ] 
        },
        { 
          icon: Repeat, 
          heading: 'When to Adjust the Ratio', 
          content: [
            { title: 'High Cost of Living Area', description: '60% Needs / 20% Wants / 20% Savings - focus on increasing income to rebalance' }, 
            { title: 'Heavy Debt Situation', description: '50% Needs / 20% Wants / 30% Debt Repayment - then redirect after clearing' }, 
            { title: 'Wealth Acceleration Mode', description: '50% Needs / 20% Wants / 30% Savings - compress wants to build wealth faster' }, 
            { title: 'Near Retirement', description: '50% Needs / 15% Wants / 35% Savings - maximise before the finish line' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: BarChart4, 
          heading: 'Real Calculation Examples', 
          content: [
            'Income 1,000: Needs 500 | Wants 300 | Savings 200', 
            'Income 2,000: Needs 1,000 | Wants 600 | Savings 400', 
            'Income 5,000: Needs 2,500 | Wants 1,500 | Savings 1,000'
          ] 
        },
        { 
          icon: Lightbulb, 
          heading: 'How to Use It in Practice', 
          content: '1. Calculate 50%, 30%, 20% of your income\n2. List all monthly expenses\n3. Categorize each as need/want/saving\n4. Compare to targets\n5. Adjust over 2-3 months - don\'t expect perfection immediately' 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Calculate your exact 50%, 30%, and 20% of monthly take-home income' }, 
        { number: '02', text: 'List and categorize all current monthly expenses honestly' }, 
        { number: '03', text: 'Compare your current breakdown to 50/30/20 targets' }, 
        { number: '04', text: 'Identify the 3 biggest mismatches (where are you over-spending?)' }, 
        { number: '05', text: 'Use Budget Planner to implement and track this framework' }
      ]}
      keyTakeaways={[
        '50/30/20 is a starting framework - adjust for your life', 
        'Most people overspend on wants without realizing it', 
        'Even 18% savings beats 0% savings - be flexible', 
        'Tracking is what reveals where money actually goes', 
        'Small tweaks compound to massive shifts over time'
      ]}
      nextSteps={[
        { label: 'Budget Planner Tool', href: '/budget-planner' }, 
        { label: 'Budgeting Basics', href: '/learn/budgeting-basics' }, 
        { label: 'Saving Habits', href: '/learn/saving-habits' }
      ]}
    />
  );
}
