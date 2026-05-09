'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Shield,
  Target,
  Heart,
  BarChart3,
  FileText,
  HelpCircle,
  Compass,
  CalendarCheck,
  Receipt,
  AlertCircle,
  BookOpen,
  Zap,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { handleExternalExit } from '@/lib/navigation';

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

// For extraction
const t = (s: string) => s;

/* ─── Data ─── */
const learnItems = [
  { title: t('Budgeting Basics'),                     icon: Wallet,       route: '/learn/budgeting-basics' },
  { title: t('Saving Habits'),                         icon: PiggyBank,    route: '/learn/saving-habits' },
  { title: t('Debt Management'),                       icon: CreditCard,   route: '/learn/debt-management' },
  { title: t('Investing Basics'),                      icon: TrendingUp,   route: '/learn/investing-basics' },
  { title: t('Emergency Fund'),                        icon: Shield,       route: '/learn/emergency-fund' },
  { title: t('Financial Goals'),                       icon: Target,       route: '/learn/financial-goals' },
  { title: t('50/30/20 Rule'),                         icon: BarChart3,    route: '/learn/50-30-20-rule' },
  { title: t('Mindful Spending'),                      icon: Heart,        route: '/learn/mindful-spending' },
  { title: t('Your Money Priorities'),                 icon: Compass,      route: '/learn/your-money-priorities' },
  { title: t('Plan for Your Future'),                  icon: CalendarCheck,route: '/learn/plan-for-your-future' },
  { title: t('Understand Your Income & Expenses'),     icon: Receipt,      route: '/learn/understand-your-income-expenses' },
  { title: t('Avoid Common Money Mistakes'),           icon: AlertCircle,  route: '/learn/avoid-common-money-mistakes' },
];

const checkinItems = [
  { title: t('Spending Style Quiz'),    icon: Wallet,     route: '/check-ins/spending-style-quiz' },
  { title: t('Savings Check-up'),       icon: PiggyBank,  route: '/check-ins/savings-check-up' },
  { title: t('Money Stress Quiz'),      icon: Heart,      route: '/check-ins/money-stress-quiz' },
  { title: t('Investment Readiness'),   icon: TrendingUp, route: '/check-ins/investment-readiness' },
];

const exploreItems = [
  { title: t('Financial Tips'),     icon: Lightbulb,    route: '/explore/financial-tips',     desc: t('Quick ideas to improve your money habits') },
  { title: t('Financial Stories'),  icon: MessageSquare,route: '/explore/financial-stories',   desc: t('Real experiences from people like you') },
  { title: t('Financial Articles'), icon: FileText,     route: '/explore/financial-articles',  desc: t('In-depth reads on financial wellbeing') },
  { title: t('Financial FAQs'),     icon: HelpCircle,   route: '/explore/financial-faqs',      desc: t('Answers to common money questions') },
  { title: t('Financial Myths'),    icon: BookOpen,     route: '/explore/financial-myths',     desc: t('Common misconceptions about money') },
];

/* ─── Component ─── */
export default function FinancialWellbeingDashboard() {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <div className="page-wrapper">
      <main className="dashboard-wrapper">

        {/* ─── Header ─── */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="dashboard-header"
        >
          <button
            onClick={handleExternalExit}
            className="back-btn"
            aria-label="Go back"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="dashboard-logo">
            <DollarSign size={22} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t('Financial Self-Care')}</h1>
            <p className="dashboard-subtitle">
              {t('Build healthier financial habits through expert content, personal reflections, and smart tool guidance.')}
            </p>
          </div>

        </motion.header>

        {/* ─── Learn Section ─── */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            <motion.h2 className="dashboard-section-title" variants={itemVariants}>
              <BookOpen size={18} strokeWidth={2.2} style={{ color: 'var(--brand-primary)' }} />
              {t('Learn')}
            </motion.h2>
            <div className="dashboard-grid">
              {learnItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="dashboard-card">
                      <div className="dashboard-card-icon">
                        <Icon size={20} strokeWidth={2.2} />
                      </div>
                      <p className="dashboard-card-title">{t(item.title)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ─── Check-ins & History Section ─── */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <motion.h2 className="dashboard-section-title" variants={itemVariants} style={{ marginBottom: 0 }}>
                <Zap size={18} strokeWidth={2.2} style={{ color: 'var(--brand-primary)' }} />
                {t('Check-ins')}
              </motion.h2>
              <motion.div variants={itemVariants}>
                <Link href="/history" className="btn btn-ghost btn-sm" style={{ gap: 6, fontSize: 12 }}>
                  <History size={14} /> {t('View History')}
                </Link>
              </motion.div>
            </div>
            <div className="dashboard-grid">
              {checkinItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="dashboard-card">
                      <div className="dashboard-card-icon">
                        <Icon size={20} strokeWidth={2.2} />
                      </div>
                      <p className="dashboard-card-title">{t(item.title)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ─── Explore Section ─── */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            <motion.h2 className="dashboard-section-title" variants={itemVariants}>
              <Compass size={18} strokeWidth={2.2} style={{ color: 'var(--brand-primary)' }} />
              {t('Explore')}
            </motion.h2>
            <div className="stack-column">
              {exploreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="explore-card">
                      <div className="explore-icon-wrapper">
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <div className="explore-content">
                        <h3 className="explore-title">{t(item.title)}</h3>
                        <p className="explore-desc">{t(item.desc)}</p>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
