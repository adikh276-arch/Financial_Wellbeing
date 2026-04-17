'use client';
import { LearnModule } from '@/components/LearnModule';
import { TrendingUp, Scale, Target, Sparkles, AlertCircle } from 'lucide-react';

export default function InvestingBasics() {
  return (
    <LearnModule
      title="Investing Basics"
      subtitle="Put your money to work while you sleep"
      readTime="8 min"
      category="Investing"
      introduction="Investing is not complex. It's simply putting your money to work so it grows while you sleep. Start simple, understand the basics, and let compound returns work for you."
      sections={[
        { 
          icon: TrendingUp, 
          heading: 'Asset Classes Explained', 
          content: [
            { title: 'Stocks', description: 'Ownership in companies. Highest growth potential (12-18% avg) but highest short-term volatility.' }, 
            { title: 'Mutual Funds', description: 'Professional manager invests your money with others. Diversified, accessible with small monthly amounts.' }, 
            { title: 'Bonds & FDs', description: 'Loans to governments or banks. Lower risk (5-8%), guaranteed returns, best for safety-first investors.' }, 
            { title: 'Gold', description: 'Safe haven asset, hedge against inflation. No income generation but stores value over decades.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Scale, 
          heading: 'Risk vs Return', 
          content: 'Higher risk = higher potential returns (and losses). Young investors can afford more risk; those closer to retirement need stability. Your risk tolerance depends on three things: your age, your goals, and your income stability.' 
        },
        { 
          icon: Target, 
          heading: 'The Power of Rupee Cost Averaging (SIP)', 
          content: 'Invest a fixed amount monthly regardless of market price. You buy more units when the market is low, fewer when high - this automatically averages your cost and removes timing risk. Investing a fixed amount monthly for just 5 years eliminates the stress of "when to invest."' 
        },
        { 
          icon: Sparkles, 
          heading: 'Beginner Investment Plan', 
          content: [
            { title: 'Months 1-3: Learn & Plan', description: 'Understand your risk tolerance, define goals and timelines, research 2-3 mutual funds.' }, 
            { title: 'Months 4-6: Start Small', description: 'Open a demat account. Start systematic investments with small monthly amounts.' }, 
            { title: 'Months 7+: Grow & Automate', description: 'Increase investment as income grows. Let compound returns work. Rebalance annually.' }
          ] 
        },
        { 
          icon: AlertCircle, 
          heading: 'Common Investing Mistakes', 
          content: [
            'Starting too late - time is your most valuable asset', 
            'Being too conservative - inflation quietly destroys savings', 
            'Trying to time the market - even experts can\'t do this consistently', 
            'No diversification - putting all money in one stock or sector', 
            'Panic selling in downturns - most people buy high, sell low', 
            'Chasing last year\'s top performers - past returns don\'t predict future'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: 'Assess your risk tolerance: conservative, moderate, or aggressive?' }, 
        { number: '02', text: 'Define your investment goals and time horizons' }, 
        { number: '03', text: 'Research 2-3 mutual funds in your risk category on Value Research' }, 
        { number: '04', text: 'Open a demat account on Zerodha, Groww, or your bank app' }, 
        { number: '05', text: 'Start your first investment with a small monthly amount' }
      ]}
      keyTakeaways={[
        'Investing is for everyone, not just the rich', 
        'Start early, even with tiny amounts - time beats timing', 
        'SIP removes the burden of timing the market', 
        'Diversification is your safety net - don\'t skip it', 
        'Stay invested through downturns; market crashes are recoveries in disguise', 
        'Review quarterly but ignore daily market noise'
      ]}
      nextSteps={[
        { label: 'Investment Planner', href: '/investment-planner' }, 
        { label: 'Investment Readiness Quiz', href: '/check-ins/investment-readiness' }, 
        { label: 'Emergency Fund First', href: '/learn/emergency-fund' }
      ]}
    />
  );
}
