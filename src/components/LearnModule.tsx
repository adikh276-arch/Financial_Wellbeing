'use client';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageHeader } from './layout/PageHeader';

interface Section {
  icon: any;
  heading: string;
  content: any;
  variant?: 'cards';
}

interface LearnModuleProps {
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  introduction: string;
  sections: Section[];
  actionSteps: { number: string; text: string }[];
  keyTakeaways: string[];
  nextSteps?: { label: string; href: string }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export function LearnModule({
  title, subtitle, readTime, category, introduction, sections, actionSteps, keyTakeaways, nextSteps
}: LearnModuleProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <PageHeader title={t(title)} backHref="/" />
      <div style={{ padding: 'var(--space-8) var(--space-4) var(--space-20)' }}>
        <motion.div 
          style={{ maxWidth: 680, margin: '0 auto' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--brand-primary-glow)', color: 'var(--brand-primary)', padding: '6px 16px', borderRadius: 99, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 20 }}>
              <BookOpen size={14} /> {t(category)}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 12 }}>{t(title)}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: 500, marginBottom: 20, lineHeight: 1.6 }}>{t(subtitle)}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} /> {readTime} {t("read")}</span>
            </div>
          </motion.div>

          {/* Intro */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 'var(--space-8)', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-brand)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-12)' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>{t(introduction)}</p>
          </motion.div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div variants={itemVariants} key={idx} className="card" style={{ padding: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-6)' }}>
                     <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                       <Icon size={24} />
                     </div>
                     <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)' }}>{t(section.heading)}</h2>
                  </div>

                  {typeof section.content === 'string' ? (
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.0625rem' }}>{t(section.content)}</p>
                  ) : Array.isArray(section.content) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {section.content.map((item: any, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', color: 'var(--text-secondary)' }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary)', marginTop: 8, flexShrink: 0, opacity: 0.8 }} />
                          <span style={{ lineHeight: 1.6, fontSize: '1.0625rem' }}>{typeof item === 'string' ? t(item) : <><strong style={{ color: 'var(--text-primary)' }}>{t(item.title)}</strong>: {t(item.description)}</>}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          {/* Action Steps */}
          <motion.div variants={itemVariants} style={{ marginTop: 'var(--space-12)', padding: 'var(--space-10)', background: 'var(--brand-primary-glow)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-brand)' }}>
             <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--brand-primary-dark)' }}>{t("Action Steps")}</h3>
             <div className="stack-4">
               {actionSteps.map(step => (
                 <div key={step.number} style={{ display: 'flex', gap: 20, alignItems: 'center', background: 'rgba(255,255,255,0.6)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(8px)' }}>
                   <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-primary)', boxShadow: 'var(--shadow-sm)' }}>{step.number}</div>
                   <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t(step.text)}</div>
                 </div>
               ))}
             </div>
          </motion.div>

          {/* Key Takeaways */}
          <motion.div variants={itemVariants} style={{ marginTop: 'var(--space-12)' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>{t("Key Takeaways")}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
               {keyTakeaways.map((take, i) => (
                  <div key={i} className="card" style={{ padding: 'var(--space-5)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                     <CheckCircle2 size={20} color="var(--brand-success)" style={{ flexShrink: 0, marginTop: 2 }} />
                     <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t(take)}</span>
                  </div>
               ))}
            </div>
          </motion.div>

          {nextSteps && nextSteps.length > 0 && (
            <motion.div variants={itemVariants} style={{ marginTop: 'var(--space-12)' }}>
               <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>{t("What to explore next")}</h3>
               <div className="stack-4">
                 {nextSteps.map((step, i) => (
                   <Link key={i} href={`${step.href}${suffix}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 'var(--space-4) var(--space-5)', textDecoration: 'none' }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-accent)' }} />
                     <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{t(step.label)}</span>
                     <ChevronRight size={18} color="var(--text-muted)" />
                   </Link>
                 ))}
               </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: 'var(--space-16)', padding: '32px', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
            {t("End of module")}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
