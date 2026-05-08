'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, Target, Wallet, ListChecks, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

export default function BudgetBuddyPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState('');
  const [completed, setCompleted] = useState(false);
  const [values, setValues] = useState({ needs: 0, wants: 0, savings: 0 });

  const calculateBudget = () => {
    const amount = Number(income.replace(/,/g, '')) || 0;
    setValues({
      needs: Math.round(amount * 0.5),
      wants: Math.round(amount * 0.3),
      savings: Math.round(amount * 0.2),
    });
    setStep(3);
  };

  const handleRestart = () => {
    setCompleted(false);
    setStep(1);
    setIncome('');
    setValues({ needs: 0, wants: 0, savings: 0 });
  };

  return (
    <PremiumLayout 
      title={t('Budget Buddy')} 
      subtitle={t('Financial Planning')}
      onReset={step > 1 ? handleRestart : undefined}
      icon={<PiggyBank size={24} />}
    >
      <AnimatePresence mode="wait">
        {completed ? (
          <PremiumComplete
            title={t('Budget Created!')}
            message={t('You now have a clear roadmap for your monthly spending. Stick to the 50/30/20 rule to build long-term wealth.')}
            onRestart={handleRestart}
            icon={<CheckCircle2 size={64} />}
          />
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {step === 1 && (
              <PremiumIntro
                title={t('Own Your Money, Own Your Life')}
                description={t("A budget isn't about restriction — it's about freedom. Let's build yours in under 10 minutes.")}
                onStart={() => setStep(2)}
                icon={<PiggyBank size={40} />}
                benefits={[
                  t('Identify where your money goes'),
                  t('Prioritize your future savings'),
                  t('Stop overspending on impulse')
                ]}
                duration="5-7 minutes"
              />
            )}

            {step === 2 && (
              <div className="max-w-md mx-auto py-12 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">{t('Monthly Income')}</h2>
                  <p className="text-slate-500 font-medium">{t('Enter your take-home pay after tax.')}</p>
                </div>

                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                  <input
                    type="text"
                    value={income}
                    onChange={(e) => setIncome(e.target.value.replace(/[^0-9,]/g, ''))}
                    placeholder="0.00"
                    className="w-full pl-12 pr-6 py-6 rounded-3xl bg-white border-2 border-slate-100 text-3xl font-black text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
                  <button
                    onClick={calculateBudget}
                    disabled={!income}
                    className="w-full max-w-lg py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {t('Calculate My Budget')}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-md mx-auto py-12 space-y-8 pb-32">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">{t('Your 50/30/20 Plan')}</h2>
                  <p className="text-slate-500 font-medium">{t('Based on your monthly income of')} <span className="text-slate-900 font-bold">${income}</span></p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: t('Needs (50%)'), val: values.needs, color: 'blue', desc: t('Rent, Food, Bills') },
                    { label: t('Wants (30%)'), val: values.wants, color: 'indigo', desc: t('Hobby, Dining, Fun') },
                    { label: t('Savings (20%)'), val: values.savings, color: 'emerald', desc: t('Debt, Emergency, Stocks') },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-${item.color}-600/10 text-${item.color}-600 flex items-center justify-center shrink-0`}>
                          {item.color === 'blue' ? <Wallet size={20} /> : item.color === 'indigo' ? <Target size={20} /> : <PiggyBank size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                        </div>
                      </div>
                      <p className="text-xl font-black text-slate-900">${item.val.toLocaleString()}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
                  <button
                    onClick={() => setCompleted(true)}
                    className="w-full max-w-lg py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    {t('Finalize My Plan')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumLayout>
  );
}
