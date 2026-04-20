'use client';

import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from 'next/link';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const themeColor = "#2563EB";
const themeBg = "#EFF6FF";

const learnItems = [
  { title: "Budgeting Basics", icon: Wallet, route: "/learn/budgeting-basics" },
  { title: "Saving Habits", icon: PiggyBank, route: "/learn/saving-habits" },
  { title: "Debt Management", icon: CreditCard, route: "/learn/debt-management" },
  { title: "Investing Basics", icon: TrendingUp, route: "/learn/investing-basics" },
  { title: "Emergency Fund", icon: Shield, route: "/learn/emergency-fund" },
  { title: "Financial Goals", icon: Target, route: "/learn/financial-goals" },
  { title: "50/30/20 Rule", icon: BarChart3, route: "/learn/50-30-20-rule" },
  { title: "Mindful Spending", icon: Heart, route: "/learn/mindful-spending" },
  { title: "Your Money Priorities", icon: Compass, route: "/learn/your-money-priorities" },
  { title: "Plan for Your Future", icon: CalendarCheck, route: "/learn/plan-for-your-future" },
  { title: "Understand Your Income & Expenses", icon: Receipt, route: "/learn/understand-your-income-expenses" },
  { title: "Avoid Common Money Mistakes", icon: AlertCircle, route: "/learn/avoid-common-money-mistakes" },
];

const checkinItems = [
  { title: "Spending Style Quiz", icon: Wallet, route: "/check-ins/spending-style-quiz" },
  { title: "Savings Check-up", icon: PiggyBank, route: "/check-ins/savings-check-up" },
  { title: "Money Stress Quiz", icon: Heart, route: "/check-ins/money-stress-quiz" },
  { title: "Investment Readiness", icon: TrendingUp, route: "/check-ins/investment-readiness" },
];

const exploreItems = [
  { title: "Financial Tips", icon: Lightbulb, route: "/explore/financial-tips", desc: "Quick ideas to improve your money habits" },
  { title: "Financial Stories", icon: MessageSquare, route: "/explore/financial-stories", desc: "Real experiences from people like you" },
  { title: "Financial Articles", icon: FileText, route: "/explore/financial-articles", desc: "In-depth reads on financial wellbeing" },
  { title: "Financial FAQs", icon: HelpCircle, route: "/explore/financial-faqs", desc: "Answers to common money questions" },
  { title: "Financial Myths", icon: HelpCircle, route: "/explore/financial-myths", desc: "Common misconceptions about money" },
];

// Note: Quick Tools are accessible via these routes but not displayed as buttons:
// /investment-planner
// /loan-emi-planner
// /goal-planner
// /budget-planner
// /emergency-fund
// /financial-health-score

export default function FinancialWellnessDashboard() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="dashboard-wrapper">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-header"
          >
            <button
              onClick={() => router.back()}
              className="dashboard-back-btn"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="dashboard-logo">
              <DollarSign size={24} style={{ color: themeColor }} strokeWidth={2.5} />
            </div>

            <div className="dashboard-title-section">
              <h1 className="dashboard-title">{t("Financial Self-Care")}</h1>
              <p className="dashboard-subtitle">
                {t("Build healthier financial habits through content, reflection, and guidance.")}
              </p>
            </div>

            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>
          </motion.div>

          {/* Learn */}
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="dashboard-section-title">{t("Learn")}</h2>
            <div className="dashboard-grid">
              {learnItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="dashboard-card animate-fade-in" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                    <div className="dashboard-card-icon">
                      <ItemIcon size={24} strokeWidth={2} />
                    </div>
                    <p className="dashboard-card-title">{t(item.title)}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Check-ins */}
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="dashboard-section-title">{t("Check-ins")}</h2>
            <div className="dashboard-grid">
              {checkinItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="dashboard-card animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                    <div className="dashboard-card-icon">
                      <ItemIcon size={24} strokeWidth={2} />
                    </div>
                    <p className="dashboard-card-title">{t(item.title)}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="dashboard-section-title">{t("Explore")}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
              {exploreItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="dashboard-explore-card animate-slide-in" style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <div className="dashboard-explore-icon">
                        <ItemIcon size={24} strokeWidth={2} />
                      </div>
                      <div className="dashboard-explore-content">
                        <p className="dashboard-explore-title">{t(item.title)}</p>
                        <p className="dashboard-explore-desc">{t(item.desc)}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#CBD5E1]" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
