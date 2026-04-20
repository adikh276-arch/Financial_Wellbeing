'use client';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';

import Link from 'next/link';
import { Lightbulb, HelpCircle, BookOpen, MessageSquare, FileText, ArrowRight, Sparkles } from 'lucide-react';

const sections = [
  {
    href: '/explore/financial-tips',
    label: "Financial Tips",
    desc: "Bite-sized, actionable wisdom across all money topics",
    icon: Lightbulb,
    gradient: 'linear-gradient(135deg, #FDCB6E, #E17055)',
    color: '#E17055',
    colorBg: '#FDCB6E12',
    count: '50+ tips',
  },
  {
    href: '/explore/financial-faqs',
    label: "FAQs",
    desc: "Clear answers to the most common money questions",
    icon: HelpCircle,
    gradient: 'linear-gradient(135deg, #0984e3, #74b9ff)',
    color: '#0984e3',
    colorBg: '#0984e312',
    count: '30+ answers',
  },
  {
    href: '/explore/financial-articles',
    label: "In-Depth Articles",
    desc: "Research-backed reads for financial mastery",
    icon: FileText,
    gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    color: '#2563EB',
    colorBg: '#2563EB12',
    count: '8 articles',
  },
  {
    href: '/explore/financial-myths',
    label: "Money Myths Busted",
    desc: "Debunking the lies that keep you financially stuck",
    icon: MessageSquare,
    gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)',
    color: '#E74C3C',
    colorBg: '#E74C3C12',
    count: '12 myths',
  },
  {
    href: '/explore/financial-stories',
    label: "Real Money Stories",
    desc: "Inspiring journeys of financial transformation",
    icon: BookOpen,
    gradient: 'linear-gradient(135deg, #00A884, #00D2D3)',
    color: '#00A884',
    colorBg: '#00A88412',
    count: '6 stories',
  },
];

export default function ExploreHub() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(247,248,252,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: 'var(--space-4)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <div>
            <p className="label-caps" style={{ color: 'var(--text-faint)', marginBottom: 2 }}>{t('Content Library')}</p>
            <h1 className="heading-xl" style={{ color: 'var(--text-primary)' }}>{t('Explore')}</h1>
          </div>
          <div style={{ flex: 1 }} />
          <LanguageSelector />
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: 'var(--space-5) var(--space-4) var(--space-12)' }}>
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(145deg, #F39C12 0%, #E17055 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={22} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{t('100+ pieces of content')}</p>
              <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.015em' }}>
                {t('Financial Wisdom')}
              </h2>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="stack-3">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={`${section.href}${suffix}`} style={{ textDecoration: 'none' }}>
                <div className="card card-tap" style={{
                  animation: 'fadeInUp 0.3s ease both',
                  animationDelay: `${i * 60}ms`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 'var(--radius-xl)',
                      background: section.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={22} color="white" strokeWidth={2.5} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>{t(section.label)}</h3>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: section.color,
                          background: section.colorBg, padding: '2px 7px',
                          borderRadius: 99, border: `1px solid ${section.color}25`,
                          textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0
                        }}>
                          {t(section.count)}
                        </span>
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.4 }}>{t(section.desc)}</p>
                    </div>
                    <div style={{
                      width: 32, height: 32, borderRadius: 'var(--radius-md)',
                      background: section.colorBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ArrowRight size={14} color={section.color} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
