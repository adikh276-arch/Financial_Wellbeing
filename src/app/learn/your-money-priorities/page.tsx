'use client';
import { LearnModule } from '@/components/LearnModule';
import { Gem, Target, Lightbulb, Activity } from 'lucide-react';

export default function YourMoneyPriorities() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Your Money Priorities")}
      subtitle={t("Align spending with what truly matters")}
      readTime="7 min"
      category="Values"
      introduction="Your money priorities are unique. They flow from your values. If you know what truly matters, you can make spending and saving decisions that bring fulfillment, not just accumulation."
      sections={[
        { 
          icon: Gem, 
          heading: t("6 Common Money Priority Types"), 
          content: [
            { title: t("Security & Safety"), description: t("Emergency fund, insurance, stable income, debt repayment. Risk-averse, plan-oriented people.") }, 
            { title: t("Family & Relationships"), description: 'Children\'s education, supporting parents, family vacations, homeownership. Family-first personalities.' }, 
            { title: t("Freedom & Independence"), description: t("Early retirement, passive income, wealth building, side business. Ambitious, growth-oriented.") }, 
            { title: t("Adventure & Experience"), description: t("Travel, new experiences, learning, wellness. Experience-driven, present-focused people.") }, 
            { title: t("Impact & Giving"), description: t("Charitable giving, helping others, community causes. Purpose-driven, generous individuals.") }, 
            { title: t("Comfort & Lifestyle"), description: t("Quality of life, status items, convenience, entertainment. Present-focused, pleasure-seeking.") }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Target, 
          heading: t("The Values-Alignment Check"), 
          content: [
            t("Write down your top 3 priorities (not society\\")s, yours)', 
            t("Review last 3 months of spending - categorize each purchase by priority it serves"), 
            t("Calculate what % of spending goes to each priority"), 
            t("Compare your stated priorities to actual spending"), 
            t("Identify the biggest mismatch and make one reallocation")
          ] 
        },
        { 
          icon: Lightbulb, 
          heading: t("Real-World: The Values Mismatch"), 
          content: t("A person said their priority was family time, yet they spent heavily on a luxury vehicle and had no budget for family vacations. They felt stressed and unfulfilled. By switching to a more economical vehicle, they freed up substantial monthly funds. Within 12 months, they funded multiple family trips and an emergency fund. Satisfaction reached a new high.") 
        },
        { 
          icon: Activity, 
          heading: t("Guilt-Free Spending Framework"), 
          content: t("If a purchase aligns with your top 3 priorities ¥Ã† spend guilt-free. If it doesn\\")t ¥Ã† question it honestly. This removes both deprivation AND impulsive spending. You can travel generously if travel is priority #1, while cutting status purchases guilt-free because status isn\t("t your priority.") 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'List 5-10 possible money priorities (from the 6 types above)' }, 
        { number: '02', text: t("Rank and narrow to your top 3 (honest self-reflection, not what sounds good)") }, 
        { number: '03', text: t("Review last month\\")s spending - categorize to your priorities' }, 
        { number: '04', text: t("Calculate % of spending on each priority") }, 
        { number: '05', text: t("Make one reallocation: cut one low-priority expense, funding a high-priority one") }
      ]}
      keyTakeaways={[
        'Your priorities are unique - not inherited from society', 
        t("Money is a tool to live your values, not an end in itself"), 
        t("Alignment = fulfillment and peace; misalignment = stress"), 
        t("Give yourself permission to enjoy your top priorities"), 
        t("Ruthlessly cut spending on things that don\\")t matter to you'
      ]}
      nextSteps={[
        { label: t("Budget Planner"), href: '/budget-planner' }, 
        { label: t("Mindful Spending"), href: '/learn/mindful-spending' }, 
        { label: t("Financial Health Score"), href: '/financial-health-score' }
      ]}
    />
  );
}
