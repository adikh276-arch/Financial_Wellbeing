'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  TrendingUp, Calculator, Target, PieChart, Shield, Activity,
  BookOpen, ArrowRight, ChevronRight, Sparkles, Wallet,
  Clock, Brain, Zap, BarChart2, AlertCircle, Heart,
  Star, Compass, CheckCircle
} from 'lucide-react';

function TokenHandler() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      // Prevent infinite loops if token is invalid but stays in URL
      if (sessionStorage.getItem("processed_token") === token) return;
      sessionStorage.setItem("processed_token", token);

      fetch("https://api.mantracare.com/user/user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token.startsWith('Bearer ') ? token : `Bearer ${token}` 
        },
        body: JSON.stringify({ token, auth_token: token }),
      })
        .then(res => res.ok ? res.json() : (res.status === 400 ? fetch("https://api.mantracare.com/user/user-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        }).then(r => r.json()) : Promise.reject(res.status)))
        .then(data => {
          const userId = data.id || data.user_id || data.therapy_user_id || data.user?.id || data.data?.id;
          if (userId) {
            sessionStorage.setItem("financial_wellbeing_user_id", userId.toString());
            sessionStorage.setItem("session_token", token);
            router.replace("/");
          }
        })
        .catch(err => {
          console.error("Auth failed:", err);
          // Still redirect to clear the token from URL even if it failed
          router.replace("/");
        });
    }
  }, [params, router]);

  return null;
}

const featuredTools = [
  { href: '/investment-planner', label: 'Investment Planner', desc: 'Grow wealth', icon: TrendingUp, gradient: 'linear-gradient(135deg, #6C5CE7, #8B7FF7)', glow: 'rgba(108,92,231,0.35)' },
  { href: '/loan-emi-planner', label: 'Loan & EMI Planner', desc: 'Calc repay', icon: Calculator, gradient: 'linear-gradient(135deg, #0984e3, #74b9ff)', glow: 'rgba(9,132,227,0.35)' },
  { href: '/goal-planner', label: 'Goal Planner', desc: 'Set targets', icon: Target, gradient: 'linear-gradient(135deg, #FDCB6E, #E17055)', glow: 'rgba(253,203,110,0.35)' },
  { href: '/budget-planner', label: 'Budget Planner', desc: 'Track spend', icon: Wallet, gradient: 'linear-gradient(135deg, #00A884, #00D2D3)', glow: 'rgba(0,168,132,0.35)' },
  { href: '/emergency-fund', label: 'Emergency Fund', desc: 'Build safety', icon: Shield, gradient: 'linear-gradient(135deg, #e84393, #fd79a8)', glow: 'rgba(232,67,147,0.35)' },
  { href: '/financial-health-score', label: 'Financial Health Score', desc: 'Get graded', icon: Activity, gradient: 'linear-gradient(135deg, #F39C12, #f1c40f)', glow: 'rgba(243,156,18,0.35)' },
];

const featuredModules = [
  { href: '/learn/budgeting-basics', label: 'Budgeting Basics', icon: PieChart, time: '5 min', color: '#6C5CE7', colorBg: '#6C5CE715' },
  { href: '/learn/saving-habits', label: 'Saving Habits', icon: Zap, time: '6 min', color: '#F39C12', colorBg: '#F39C1215' },
  { href: '/learn/debt-management', label: 'Debt Management', icon: AlertCircle, time: '7 min', color: '#E74C3C', colorBg: '#E74C3C15' },
  { href: '/learn/investing-basics', label: 'Investing Basics', icon: BarChart2, time: '8 min', color: '#0984e3', colorBg: '#0984e315' },
];

export default function FinancialWellnessDashboard() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Suspense fallback={null}>
        <TokenHandler />
      </Suspense>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg, #6C5CE7 0%, #5A49CB 35%, #4a3ab5 100%)',
        padding: 'var(--space-8) var(--space-4)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + var(--space-8))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -40, right: 60, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: 40, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{t("Good morning")}</p>
              <h1 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 2 }}>
                {t("Your Money Dashboard")}
              </h1>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <Compass size={18} color="white" strokeWidth={2.5} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {[
              { label: 'Tools', value: '6', color: 'rgba(255,255,255,0.2)' },
              { label: 'Modules', value: '12', color: 'rgba(255,255,255,0.2)' },
              { label: 'Quizzes', value: '4', color: 'rgba(255,255,255,0.2)' },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: s.color, borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3)', textAlign: 'center',
                backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 var(--space-4) var(--space-16)' }}>
        <section style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <p className="label-caps" style={{ color: 'var(--text-faint)', marginBottom: 2 }}>{t("Suite Hub")}</p>
            <h2 className="heading-lg" style={{ color: 'var(--text-primary)' }}>{t("Your Financial Suite")}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            {featuredTools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-4)', boxShadow: 'var(--shadow-xs)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
                    cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center',
                    animation: 'fadeInUp 0.3s ease both', animationDelay: `${i * 40}ms`,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-xl)',
                      background: tool.gradient, boxShadow: `0 4px 12px ${tool.glow}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} color="white" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', lineHeight: 1.2 }}>{t(tool.label)}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)', fontWeight: 500 }}>{t(tool.desc)}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {/* Check-ins */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)' }}>{t("Personal Assessments")}</h3>
                <Link href="/check-ins" style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--brand-primary)' }}>{t("View All")}</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                {[
                  { href: '/check-ins/spending-style-quiz', label: 'Spending Style Quiz', icon: Brain, color: '#6C5CE7' },
                  { href: '/check-ins/savings-check-up', label: 'Savings Check-up', icon: Wallet, color: '#e84393' },
                  { href: '/check-ins/money-stress-quiz', label: 'Money Stress Quiz', icon: Activity, color: '#F39C12' },
                  { href: '/check-ins/investment-readiness', label: 'Investment Readiness', icon: TrendingUp, color: '#00A884' },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ 
                    display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-4)',
                    background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)',
                    textDecoration: 'none', transition: 'all 0.2s ease'
                  }} className="card-tap">
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-lg)', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={16} color={item.color} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t(item.label)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore resources */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)' }}>{t("Knowledge & Insights")}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div style={{ display: 'contents' }}>
                  {[
                    { href: '/explore/financial-tips', label: 'Financial Tips', gradient: 'linear-gradient(135deg, #FDCB6E, #E17055)', icon: Sparkles },
                    { href: '/explore/financial-stories', label: 'Financial Stories', gradient: 'linear-gradient(135deg, #6C5CE7, #a29bfe)', icon: BookOpen },
                    { href: '/explore/financial-articles', label: 'Financial Articles', gradient: 'linear-gradient(135deg, #00A884, #55efc4)', icon: Compass },
                    { href: '/explore/financial-faqs', label: 'Financial FAQs', gradient: 'linear-gradient(135deg, #0984e3, #74b9ff)', icon: Brain },
                    { href: '/explore/financial-myths', label: 'Financial Myths', gradient: 'linear-gradient(135deg, #e84393, #fd79a8)', icon: Star },
                  ].map(item => (
                    <Link key={item.href} href={item.href} style={{ 
                      display: 'flex', flexDirection: 'column', gap: 8,
                      padding: 'var(--space-5)', background: item.gradient, borderRadius: 'var(--radius-xl)',
                      textDecoration: 'none', position: 'relative', overflow: 'hidden'
                    }} className="card-tap">
                      <item.icon size={20} color="white" style={{ marginBottom: 8 }} />
                      <div style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{t(item.label)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Academy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)' }}>{t("Learning Academy")}</h3>
                <Link href="/learn" style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--brand-primary)' }}>{t("12 Modules")}</Link>
              </div>
              <div className="stack-3">
                {featuredModules.map(mod => (
                  <Link key={mod.href} href={mod.href} className="card card-tap" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-3) var(--space-4)', textDecoration: 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-lg)', background: mod.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <mod.icon size={16} color={mod.color} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{t(mod.label)}</span>
                    <ArrowRight size={14} color="var(--text-faint)" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
