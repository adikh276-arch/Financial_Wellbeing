'use client';
import { LearnModule } from '@/components/LearnModule';
import { Zap, Brain, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function SavingHabits() {
  return (
    <LearnModule
      title="Saving Habits"
      subtitle="Build wealth one habit at a time"
      readTime="6 min"
      category="Savings"
      introduction="Saving is a habit, not a sacrifice. The difference between those who build wealth and those who don't is often just one simple habit: paying themselves first."
      sections={[
        { 
          icon: Zap, 
          heading: 'Why Saving Matters', 
          content: [
            'Builds financial security and reduces anxiety', 
            'Creates options and opportunities at every life stage', 
            'Protects against emergencies without going into debt', 
            'Enables dream-chasing: vacation, home, business', 
            'Time + consistent saving = life-changing wealth'
          ] 
        },
        { 
          icon: Brain, 
          heading: 'Pay Yourself First', 
          content: [
            { title: 'Automate on Payday', description: 'Set an automatic transfer the same day your salary arrives. Out of sight, out of mind.' }, 
            { title: 'Start with 10%', description: 'Begin with 10% of income. Increase by 1% every 3 months until you hit 20%.' }, 
            { title: 'Separate Account', description: 'Keep savings in a separate account so you\'re not tempted to spend it.' }, 
            { title: 'Link to Purpose', description: 'Label savings with a goal (e.g., "Europe Trip 2026") to stay motivated.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: TrendingUp, 
          heading: 'The Compound Effect', 
          content: '500 units/month invested at 7% annual return for 20 years = over 260,000 units. You only invested 120,000 - the rest is compound returns working silently for you. Start today, not tomorrow.' 
        },
        { 
          icon: Sparkles, 
          heading: 'Three Stages of Saving', 
          content: [
            { title: 'Stage 1: Emergency Fund (Month 1-6)', description: 'Build 3-6 months of expenses in a liquid savings account. Goal: financial safety.' }, 
            { title: 'Stage 2: Goal Savings (Month 6-18)', description: 'Open dedicated accounts for specific goals. Make your dreams tangible and trackable.' }, 
            { title: 'Stage 3: Wealth Building (Year 2+)', description: 'Start systematic investments. Let compound returns do the heavy lifting over decades.' }
          ] 
        },
        { 
          icon: AlertCircle, 
          heading: 'Common Mistakes', 
          content: [
            'Waiting for the "right amount" - start with small sums where possible', 
            'Putting savings in low-return accounts', 
            'Not having a purpose - you\'ll spend it without a goal', 
            'Dipping into emergency fund for non-emergencies', 
            'Comparing your savings to others (everyone starts somewhere)'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Calculate 10% of your monthly income - that\'s your savings target' },
        { number: '02', text: 'Set up an automatic transfer on your payday date' },
        { number: '03', text: 'Open a separate savings account and name it after a goal' },
        { number: '04', text: 'Set a weekly reminder to check your balance (motivation boost!)' },
        { number: '05', text: 'Use the Emergency Fund tool to set your first savings target' },
      ]}
      keyTakeaways={[
        'Saving is a habit - automate it so it requires no willpower', 
        'Start with whatever you can, grow from there', 
        'Time and consistency beat large amounts every time', 
        'Connect savings to a purpose, your "why"', 
        'The best savings plan is one you\'ll stick with'
      ]}
      nextSteps={[
        { label: 'Emergency Fund Tool', href: '/emergency-fund' }, 
        { label: 'Goal Planner', href: '/goal-planner' }, 
        { label: 'Investing Basics', href: '/learn/investing-basics' }
      ]}
    />
  );
}
