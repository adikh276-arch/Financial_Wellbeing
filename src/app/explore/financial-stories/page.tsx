'use client';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';

const STORIES = [
  { id: 'sarah', name: 'Sarah, 29', city: 'London', income: '6,000', achievement: 'Sarah Achievement', story: 'Sarah Story', color: 'var(--brand-primary)', icon: Trophy },
  { id: 'michael', name: 'Michael, 34', city: 'New York', income: '12,000', achievement: 'Michael Achievement', story: 'Michael Story', color: '#00A884', icon: Target },
  { id: 'chloe', name: 'Chloe, 27', city: 'Paris', income: '4,500', achievement: 'Chloe Achievement', story: 'Chloe Story', color: 'var(--brand-gold)', icon: TrendingUp },
  { id: 'david', name: 'David, 42', city: 'Sydney', income: '25,000', achievement: 'David Achievement', story: 'David Story', color: '#F85A4B', icon: Rocket },
  { id: 'elena', name: 'Elena, 52', city: 'Madrid', income: '8,000', achievement: 'Elena Achievement', story: 'Elena Story', color: '#00B1B1', icon: Gem },
  { id: 'liam', name: 'Liam, 25', city: 'Dublin', income: '3,500', achievement: 'Liam Achievement', story: 'Liam Story', color: 'var(--brand-primary-light)', icon: Zap },
];

export default function FinancialStories() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader
        title="Financial Stories"
        backHref="/explore"
        accentColor="var(--brand-primary)"
      />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <h1 className="heading-xl" style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{t("Real Journeys, Real Results")}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t("Authentic success stories from people who transformed their financial lives.")}</p>
        </div>

        <div className="stack-6">
          {STORIES.map((story) => {
            const Icon = story.icon;
            return (
              <div key={story.id} className="card" style={{ borderLeft: `4px solid ${story.color}`, padding: 'var(--space-8)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
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
                      <span className="heading-sm" style={{ color: 'var(--text-primary)' }}>{t(story.name)}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} /> {t(story.city)}
                      </span>
                      <span className="badge badge-neutral" style={{ padding: '4px 10px', fontWeight: 700 }}>{t('Income: £{{income}} / mo', { income: story.income })}</span>
                    </div>

                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-glass-light)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Trophy size={14} color={story.color} />
                      <div style={{ fontWeight: 800, color: story.color, fontSize: 'var(--text-sm)', letterSpacing: '0.02em' }}>
                        {t(story.achievement)}
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <Quote size={20} style={{ position: 'absolute', top: -5, left: -25, opacity: 0.1, color: story.color }} />
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                        {t(story.story)}
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
