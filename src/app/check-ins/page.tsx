'use client';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { CheckSquare, Heart, Activity, TrendingUp, ArrowRight, Star } from 'lucide-react';

const checkIns = [
  {
    href: '/check-ins/spending-style-quiz',
    label: t("Spending Style Quiz"),
    desc: t("Decode your money personality & behavioral archetype"),
    icon: CheckSquare,
    gradient: 'linear-gradient(135deg, #6C5CE7, #8B7FF7)',
    glow: 'rgba(108,92,231,0.3)',
    color: '#6C5CE7',
    time: '5 min',
    questions: t("10 questions"),
    tag: 'Behavior',
  },
  {
    href: '/check-ins/savings-check-up',
    label: t("Savings Check-up"),
    desc: t("Benchmark your emergency fund, savings rate and habits"),
    icon: Heart,
    gradient: 'linear-gradient(135deg, #e84393, #fd79a8)',
    glow: 'rgba(232,67,147,0.3)',
    color: '#e84393',
    time: '4 min',
    questions: t("5 inputs"),
    tag: 'Savings',
  },
  {
    href: '/check-ins/money-stress-quiz',
    label: t("Money Stress Quiz"),
    desc: t("Measure your financial anxiety level and get relief tactics"),
    icon: Activity,
    gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
    glow: 'rgba(243,156,18,0.3)',
    color: '#F39C12',
    time: '6 min',
    questions: t("15 questions"),
    tag: 'Wellness',
  },
  {
    href: '/check-ins/investment-readiness',
    label: t("Investment Readiness"),
    desc: t("Are your foundations strong enough to start investing?"),
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #00A884, #00D2D3)',
    glow: 'rgba(0,168,132,0.3)',
    color: '#00A884',
    time: '5 min',
    questions: t("10 questions"),
    tag: 'Investing',
  },
];

export default function CheckInsHub() {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(247,248,252,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: 'var(--space-4)',
      }}>
        <div style={{ maxWidth: 680, margin: t("0 auto") }}>
          <p className="label-caps" style={{ color: 'var(--text-faint)', marginBottom: 2 }}>Assessments</p>
          <h1 className="heading-xl" style={{ color: 'var(--text-primary)' }}>Check-ins</h1>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: t("0 auto"), padding: 'var(--space-5) var(--space-4) var(--space-12)' }}>
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(145deg, #e84393 0%, #fd79a8 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-2)' }}>4 Assessments</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-1)', letterSpacing: '-0.015em' }}>
            Know yourself first
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-sm)' }}>
            Personalized diagnostics to reveal what's working and what needs fixing.
          </p>
        </div>

        {/* Check-in Cards */}
        <div className="stack-6">
          {checkIns.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div className=t("card card-tap") style={{
                  padding: 'var(--space-5)',
                  animation: t("fadeInUp 0.3s ease both"),
                  animationDelay: `${i * 70}ms`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                    {/* Gradient icon */}
                    <div style={{
                      width: 56, height: 56,
                      borderRadius: 'var(--radius-xl)',
                      background: item.gradient,
                      boxShadow: `0 6px 16px ${item.glow}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={24} color="white" strokeWidth={2.5} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{
                          fontSize: 'var(--text-2xs)', fontWeight: 700,
                          color: item.color, background: `${item.color}12`,
                          padding: '2px 8px', borderRadius: 99, border: `1px solid ${item.color}25`,
                          textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}>
                          {item.tag}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', fontWeight: 500 }}>
                          {item.time}
                        </span>
                      </div>

                      <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-base)', marginBottom: 4 }}>
                        {item.label}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {item.desc}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'var(--space-3)' }}>
                        <div style={{
                          flex: 1, height: 36,
                          background: `${item.color}12`,
                          borderRadius: 'var(--radius-lg)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: item.color, fontSize: 'var(--text-xs)', fontWeight: 700,
                          border: `1px solid ${item.color}20`,
                        }}>
                          Start - {item.questions}
                        </div>
                        <div style={{
                          width: 36, height: 36,
                          borderRadius: 'var(--radius-lg)',
                          background: `${item.color}15`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: `1px solid ${item.color}20`,
                        }}>
                          <ArrowRight size={16} color={item.color} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tip */}
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'rgba(108,92,231,0.06)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-brand)',
          display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
        }}>
          <Star size={18} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--brand-primary)' }}>Pro tip:</strong> Complete all 4 check-ins for a full picture of your financial wellness profile.
          </p>
        </div>
      </div>
    </div>
  );
}
