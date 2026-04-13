'use client';

import {
  MessageSquare, Trophy, Target, TrendingUp, Rocket,
  Gem, Zap, MapPin, Wallet, ArrowRight, Star, Quote
} from 'lucide-react';
import Link from 'next/link';

const STORIES = [
  { name: 'Sarah, 29', city: 'London', income: '6,000 units/mo', achievement: 'Built 20,000 emergency fund in 8 months', story: 'I used to live paycheck to paycheck. After learning about the 50/30/20 rule, I cut unnecessary spending and cancelled several subscriptions. In 8 months, I had 20,000 saved. The first month felt impossible. The eighth month felt automatic. The secret? I automated a transfer on my payday so I never saw it in my spending account.', color: 'var(--brand-primary)', icon: Trophy },
  { name: 'Michael, 34', city: 'New York', income: '12,000 units/mo', achievement: 'Paid off 80,000 in debt in 2.5 years', story: 'I had 80,000 in consumer debt - credit cards and a personal loan. Every month I paid minimums. I learned about the avalanche method: attack the highest interest debt first. By cutting lifestyle inflation and redirecting 2,500/month to the highest-interest debt, I cleared it all in 2.5 years. Today I invest 4,000/month - more than my entire savings 5 years ago.', color: '#00A884', icon: Target },
  { name: 'Chloe, 27', city: 'Paris', income: '4,500 units/mo', achievement: 'Started investing with small sums', story: 'I always thought investing was for people who had "extra" money. I felt I had nothing left to invest. Then I learned about index funds and systematic plans. I started with just 50 units/month. 18 months later, I\'ve increased it to 400/month. My portfolio is modest, but the habit is priceless. I understand markets now. I\'m not afraid anymore.', color: 'var(--brand-gold)', icon: TrendingUp },
  { name: 'David, 42', city: 'Sydney', income: '25,000 units/mo', achievement: 'FI target at 50 - 8 years away', story: 'At 38 I woke up to the idea of Financial Independence. My lifestyle was inflated, but I had no savings. I sold my luxury vehicle and redirected 4,000/month to investments. In 4 years, my portfolio grew substantially. If markets cooperate, I\'ll hit my target by 50 and have the option to work on my own terms. The decision to cut luxury spending was my most valuable financial move.', color: '#F85A4B', icon: Rocket },
  { name: 'Elena, 52', city: 'Madrid', income: '8,000 units/mo', achievement: 'Started retirement planning late - still made it', story: 'I started saving for retirement at 47. I was terrified it was too late. But with 2,000/month in aggressive investments and a clear target, it\'s still achievable. The lesson I learned: starting late costs more, but it\'s infinitely better than never starting. At 52, my portfolio is growing steadily. I wish I\'d started at 30, but I\'m glad I started now.', color: '#00B1B1', icon: Gem },
  { name: 'Liam, 25', city: 'Dublin', income: '3,500 units/mo', achievement: 'Zero lifestyle creep after promotions', story: 'I joined my company at 2,500. Three years later I earn 3,500. My savings have gone from 250 to 1,200/month - I kept 70% of every raise. Most of my peers increased their spending instead. I follow one rule: when income goes up, 50% goes to savings, 50% to lifestyle. At 25, I have a solid buffer and just started my first systematic investment.', color: 'var(--brand-primary-light)', icon: Zap },
];

export default function FinancialStories() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="topbar">
        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-brand)' }}>
          <MessageSquare size={18} color="white" strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Explore</div>
          <div className="heading-lg" style={{ color: 'var(--text-primary)' }}>Financial Stories</div>
        </div>
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <h1 className="heading-xl" style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Real Journeys, Real Results</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Authentic success stories from people who transformed their financial lives using smart strategies.</p>
        </div>

        <div className="stack-6">
          {STORIES.map((story, i) => {
            const Icon = story.icon;
            return (
              <div key={i} className="card card-hover" style={{ borderLeft: `4px solid ${story.color}`, padding: 'var(--space-8)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                  {/* Icon / Avatar */}
                  <div style={{
                    width: 64, height: 64, borderRadius: 'var(--radius-xl)',
                    background: `${story.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: story.color, flexShrink: 0
                  }}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>

                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                      <span className="heading-sm" style={{ color: 'var(--text-primary)' }}>{story.name}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} /> {story.city}
                      </span>
                      <span className="badge badge-neutral">{story.income}</span>
                    </div>

                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-glass-light)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Trophy size={14} color={story.color} />
                      <div style={{ fontWeight: 700, color: story.color, fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {story.achievement}
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <Quote size={24} style={{ position: 'absolute', top: -10, left: -20, opacity: 0.1, color: story.color }} />
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                        {story.story}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
