'use client';
import { LearnModule } from '@/components/LearnModule';
import { Brain, Timer, HelpCircle, Target, ListChecks } from 'lucide-react';

export default function MindfulSpending() {
  return (
    <LearnModule
      title="Mindful Spending"
      subtitle="Buy what aligns with your values"
      readTime="6 min"
      category="Behavior"
      introduction="Mindful spending is not about spending less. It's about spending intentionally. Buying what aligns with your values, not what impulse drives you to buy."
      sections={[
        { 
          icon: Brain, 
          heading: 'The Psychology of Impulse Buying', 
          content: 'Brain triggers: stress, boredom, social media, limited-time sales. The rush you feel is dopamine - temporary and fading within hours. Over a year, small impulse buys can add up significantly. Over 20 years with investment returns, this represents substantial lost wealth.' 
        },
        { 
          icon: Timer, 
          heading: 'The 30-Day Rule (Game-Changer)', 
          content: 'Simple rule: If you want to buy something non-essential, write it on a list and wait 30 days. After 30 days, review the list. Research shows 80%+ of impulses disappear naturally. Only buy items still on the list after 30 days - those are genuine desires, not impulse reactions.' 
        },
        { 
          icon: HelpCircle, 
          heading: '8 Questions to Ask Before Buying', 
          content: [
            'Do I need this or want this? (Be honest)', 
            'Does this align with my stated values and priorities?', 
            'Can I afford it without compromising financial goals?', 
            'Will I use this regularly or is this a novelty purchase?', 
            'Is this a trigger purchase - am I stressed, bored, or social-media influenced?', 
            'Have I wanted this for at least 30 days?', 
            'Is there a cheaper or free alternative?', 
            'Will I regret this in one week?'
          ] 
        },
        { 
          icon: Target, 
          heading: 'The Value vs Price Principle', 
          content: [
            { title: 'Price', description: 'What you pay for something - the number on the price tag.' }, 
            { title: 'Value', description: 'What you actually get in return - utility, joy, frequency of use, longevity.' }, 
            { title: 'Mindful Choice', description: 'Consider cost per use. A budget tool used daily for 2 years is much better value than a luxury item that stays in the box. Buy by value, not price.' }
          ] 
        },
        { 
          icon: ListChecks, 
          heading: 'Building Your Want List', 
          content: [
            'Create a running list (physical or digital) of everything you want to buy', 
            'Add items when tempted - writing it down removes urgency', 
            'Review on the 1st of every month', 
            'Buy only items still on the list after 30 days', 
            'Notice patterns: what keeps appearing? That\'s a real priority, not impulse'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Identify your 3 main spending triggers: stress, boredom, social media, sales?' }, 
        { number: '02', text: 'Create a physical or digital "Want List" starting today' }, 
        { number: '03', text: 'Unsubscribe from 5 promotional emails or delete 1 shopping app' }, 
        { number: '04', text: 'For your next impulse: write it down, wait 7 days, see if you still want it' }, 
        { number: '05', text: 'Track impulse purchases for 14 days - awareness is the first step to change' }
      ]}
      keyTakeaways={[
        'Mindful = intentional, not deprived or restricted', 
        'The 30-day rule eliminates 80%+ of impulse buys', 
        'Understanding your triggers is the key to control', 
        'Align spending with your real values, not societal pressure', 
        'Small daily decisions compound into massive life differences'
      ]}
      nextSteps={[
        { label: 'Spending Style Quiz', href: '/check-ins/spending-style-quiz' }, 
        { label: 'Budget Planner', href: '/budget-planner' }, 
        { label: 'Your Money Priorities', href: '/learn/your-money-priorities' }
      ]}
    />
  );
}
