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
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors mt-2"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ backgroundColor: themeBg }}
            >
              <DollarSign size={24} style={{ color: themeColor }} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#020817] mb-1">{t("Financial Self-Care")}</h1>
              <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                {t("Build healthier financial habits through content, reflection, and guidance.")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>
          </motion.div>

          {/* Learn */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-lg font-semibold mb-5 text-[#0f172b]">{t("Learn")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {learnItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 h-full hover:border-[#CBD5E1] transition-all text-left group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: themeBg }}
                      >
                        <ItemIcon size={24} style={{ color: themeColor }} strokeWidth={2} />
                      </div>
                      <p className="text-[14px] leading-tight text-[#1E293B] font-semibold">{t(item.title)}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Check-ins */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-5 text-[#0f172b]">{t("Check-ins")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {checkinItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 h-full hover:shadow-lg hover:border-[#CBD5E1] transition-all text-left group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: themeBg }}
                      >
                        <ItemIcon size={24} style={{ color: themeColor }} strokeWidth={2} />
                      </div>
                      <p className="text-[14px] leading-tight text-[#1E293B] font-semibold">{t(item.title)}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-5 text-[#0f172b]">{t("Explore")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exploreItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Link key={item.title} href={item.route} className="block">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-md hover:border-[#CBD5E1] transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: themeBg }}
                        >
                          <ItemIcon size={24} style={{ color: themeColor }} strokeWidth={2} />
                        </div>
                        <div className="text-left">
                          <p className="text-[#1E293B] text-base font-semibold">{t(item.title)}</p>
                          <p className="text-xs text-[#94A3B8] mt-1">{t(item.desc)}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-[#CBD5E1] transition-colors group-hover:text-blue-500" />
                    </motion.div>
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
