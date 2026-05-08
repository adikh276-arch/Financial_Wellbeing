'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Gem, Calendar, Rocket, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

export default function SavingsGoalPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleRestart = () => {
    setCompleted(false);
    setStep(1);
    setGoalName('');
    setTargetAmount('');
  };

  return (
    <PremiumLayout 
      title={t('Savings Goal')} 
      subtitle={t('Wealth Builder')}
      onReset={step > 1 ? handleRestart : undefined}
      icon={<Target size={24} />}
    >
      <AnimatePresence mode="wait">
        {completed ? (
          <PremiumComplete
            title={t('Goal Locked In!')}
            message={t('Manifestation begins with a plan. You have defined your target and set the foundation for your future self.')}
            onRestart={handleRestart}
            icon={<Rocket size={64} className="text-orange-500" />}
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
                title={t('Dream It. Plan It. Save It.')}
                description={t("A goal without a plan is just a wish. Let's turn your aspirations into a concrete savings roadmap today.")}
                onStart={() => setStep(2)}
                icon={<Target size={40} className="text-orange-500" />}
                benefits={[
                  t('Clarify what truly matters to you'),
                  t('Break down big dreams into small steps'),
                  t('Stay motivated with clear deadlines')
                ]}
                duration="5 minutes"
              />
            )}

            {step === 2 && (
              <div className="max-w-md mx-auto py-12 space-y-8 pb-32">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">{t('What are we saving for?')}</h2>
                  <p className="text-slate-500 font-medium">{t('Give your goal a name and a value.')}</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('GOAL NAME')}</label>
                    <input
                      type="text"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      placeholder={t('e.g. Dream Vacation')}
                      className="w-full px-8 py-6 rounded-3xl bg-white border-2 border-slate-100 text-xl font-bold text-slate-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('TARGET AMOUNT')}</label>
                    <div className="relative group">
                      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300 group-focus-within:text-orange-400 transition-colors">$</span>
                      <input
                        type="text"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value.replace(/[^0-9,]/g, ''))}
                        placeholder="0.00"
                        className="w-full pl-14 pr-8 py-6 rounded-3xl bg-white border-2 border-slate-100 text-3xl font-black text-slate-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/5 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
                  <button
                    onClick={() => setStep(3)}
                    disabled={!goalName || !targetAmount}
                    className="w-full max-w-lg py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-3"
                  >
                    {t('Set Target')}
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-md mx-auto py-12 space-y-10 pb-32">
                <div className="text-center space-y-2">
                   <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-6 relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 border-2 border-dashed border-orange-200 rounded-full"
                      />
                      <Sparkles size={40} />
                   </div>
                  <h2 className="text-3xl font-black text-slate-900">{t('Ready to Launch?')}</h2>
                  <p className="text-slate-500 font-medium">{t('Your goal for')} <span className="text-orange-600 font-bold">{goalName}</span> {t('is set at')} <span className="text-slate-900 font-bold">${targetAmount}</span></p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('TIMELINE')}</p>
                      <p className="font-bold text-slate-900">{t('Custom Timeline Set')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                      <Gem size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('PURPOSE')}</p>
                      <p className="font-bold text-slate-900">{t('Personal Growth & Freedom')}</p>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
                  <button
                    onClick={() => setCompleted(true)}
                    className="w-full max-w-lg py-5 rounded-2xl bg-orange-500 text-white font-black text-lg shadow-2xl shadow-orange-500/20 hover:bg-orange-600 transition-all cursor-pointer"
                  >
                    {t('Confirm & Start Saving')}
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
