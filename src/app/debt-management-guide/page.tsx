'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, TrendingDown, LayoutList, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

type Strategy = 'snowball' | 'avalanche';

export default function DebtManagementPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleRestart = () => {
    setCompleted(false);
    setStep(1);
    setStrategy(null);
  };

  return (
    <PremiumLayout 
      title={t('Debt Management')} 
      subtitle={t('Financial Freedom')}
      onReset={step > 1 ? handleRestart : undefined}
      icon={<CreditCard size={24} />}
    >
      <AnimatePresence mode="wait">
        {completed ? (
          <PremiumComplete
            title={t('Pathway to Freedom')}
            message={t('You now have a proven mathematical strategy to eliminate your debt. Consistency is your greatest ally.')}
            onRestart={handleRestart}
            icon={<ShieldCheck size={64} className="text-blue-600" />}
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
                title={t('Take Control of Your Debt')}
                description={t("Debt doesn't have to be a burden forever. Learn the smartest ways to pay it off and reclaim your peace of mind.")}
                onStart={() => setStep(2)}
                icon={<TrendingDown size={40} />}
                benefits={[
                  t('Save thousands in interest payments'),
                  t('Build a realistic repayment timeline'),
                  t('Boost your credit score long-term')
                ]}
                duration="8-10 minutes"
              />
            )}

            {step === 2 && (
              <div className="max-w-lg mx-auto py-12 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">{t('Choose Your Strategy')}</h2>
                  <p className="text-slate-500 font-medium">{t('Select the method that fits your personality.')}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { 
                      id: 'snowball', 
                      title: t('Debt Snowball'), 
                      desc: t('Pay smallest debts first to gain momentum.'), 
                      icon: <LayoutList size={24} />,
                      tag: t('Psychological Win'),
                      color: 'indigo'
                    },
                    { 
                      id: 'avalanche', 
                      title: t('Debt Avalanche'), 
                      desc: t('Pay highest interest rates first to save money.'), 
                      icon: <Zap size={24} />,
                      tag: t('Mathematical Best'),
                      color: 'blue'
                    }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setStrategy(item.id as Strategy);
                        setStep(3);
                      }}
                      className="group p-8 bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-600/30 text-left transition-all shadow-sm hover:shadow-xl hover:shadow-blue-600/5 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex gap-6 items-center">
                        <div className={`w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600/10 group-hover:text-blue-600 flex items-center justify-center transition-colors`}>
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-black text-xl text-slate-900">{item.title}</h3>
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">{item.tag}</span>
                          </div>
                          <p className="text-slate-500 font-medium text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && strategy && (
              <div className="max-w-lg mx-auto py-12 space-y-10 pb-32">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                    {strategy === 'snowball' ? <LayoutList size={32} /> : <Zap size={32} />}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">{strategy === 'snowball' ? t('Snowball Action Plan') : t('Avalanche Action Plan')}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {strategy === 'snowball' 
                      ? t('List your debts by size. Pay the minimum on all except the smallest. When that is gone, roll the payment into the next one.')
                      : t('List your debts by interest rate. Pay the minimum on all except the one with the highest rate. This minimizes total cost.')}
                  </p>
                </div>

                <div className="space-y-4">
                  {[t('Step 1: Stop taking on new debt'), t('Step 2: List every single debt item'), t('Step 3: Set up automatic minimum payments')].map((stepText, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="font-bold text-slate-700">{stepText}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
                  <button
                    onClick={() => setCompleted(true)}
                    className="w-full max-w-lg py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    {t('I Commit to This Plan')}
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
