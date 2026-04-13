'use client';
import { LearnModule } from '@/components/LearnModule';
import { Shield, Target, MapPin, AlertCircle } from 'lucide-react';

export default function EmergencyFundLearn() {
  return (
    <LearnModule
      title="Emergency Fund"
      subtitle="Your financial airbag"
      readTime="5 min"
      category="Savings"
      introduction="An emergency fund is not optional'it's essential. It's the difference between a problem and a catastrophe. Think of it as your financial airbag."
      sections={[
        { 
          icon: Shield, 
          heading: 'What Counts as an Emergency?', 
          content: [
            { title: 'GÂ£Ã´ Medical emergency', description: 'Surgery, hospitalization, or unexpected health crisis' }, 
            { title: 'GÂ£Ã´ Job loss', description: 'Unexpected unemployment while you search for new work' }, 
            { title: 'GÂ£Ã´ Major repairs', description: 'Home foundation, car breakdown, plumbing failure' }, 
            { title: 'GÂ£Ã¹ NOT an emergency', description: 'Vacation, sale shopping, wanting a new gadget or upgrade' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Target, 
          heading: 'How Much to Save', 
          content: [
            { title: 'Minimum (3 months)', description: 'Basic safety net. Covers most medical emergencies and short-term job gaps.' }, 
            { title: 'Recommended (6 months)', description: 'The sweet spot. Covers job loss, major repairs, and family emergencies with breathing room.' }, 
            { title: 'Conservative (12 months)', description: 'For freelancers, entrepreneurs, or variable income earners. Peace of mind at maximum.' }
          ] 
        },
        { 
          icon: MapPin, 
          heading: 'Where to Keep It', 
          content: 'Keep 3 months in a regular savings account (fully liquid). Place the rest in a high-yield savings account or ladder it across Fixed Deposits (90-day, 180-day, 1-year) for better returns while maintaining access when needed.' 
        },
        { 
          icon: AlertCircle, 
          heading: 'The True Cost of No Emergency Fund', 
          content: 'A person had no emergency fund and hit an unexpected bill of 200,000 units. They borrowed on a credit card at 18% interest. After 3 years of minimum payments, the total cost was 360,000 units. Compare: 3,000 units/month saved for 5 years = 180,000 unit buffer - enough to avoid the entire interest trap.' 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Calculate your essential monthly expenses (rent + food + utilities + transport + insurance + minimum EMIs)' }, 
        { number: '02', text: 'Multiply by 6 to get your target number' }, 
        { number: '03', text: 'Check how much you have today - that\'s your gap' }, 
        { number: '04', text: 'Open a separate savings account labeled "Emergency Fund - Do Not Touch"' }, 
        { number: '05', text: 'Set up a monthly auto-transfer, even if it\'s just a small amount to start' }
      ]}
      keyTakeaways={[
        'Emergency fund is the foundation of ALL financial planning', 
        '6 months is the recommended target - start with 3', 
        'Keep it completely separate from your spending account', 
        'Never use it for non-emergencies, even tempting ones', 
        'Update your target every 6 months as expenses change'
      ]}
      nextSteps={[
        { label: 'Emergency Fund Tool', href: '/emergency-fund' }, 
        { label: 'Savings Check-up', href: '/check-ins/savings-check-up' }, 
        { label: 'Investing Basics', href: '/learn/investing-basics' }
      ]}
    />
  );
}
