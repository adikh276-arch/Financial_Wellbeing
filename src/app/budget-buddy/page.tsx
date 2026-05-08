'use client';

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Screen1Intro } from "@/components/budget-buddy/Screen1Intro";
import { Screen2Learn } from "@/components/budget-buddy/Screen2Learn";
import { Screen3Income } from "@/components/budget-buddy/Screen3Income";
import { Screen4Build, type BudgetValues } from "@/components/budget-buddy/Screen4Build";
import { Screen5Summary } from "@/components/budget-buddy/Screen5Summary";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'Introduction',
  'Learning the 50/30/20 Rule',
  'Income Analysis',
  'Building Your Plan',
  'Summary'
];

export default function BudgetBuddyPage() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [values, setValues] = useState<BudgetValues>({ needs: 0, wants: 0, savings: 0 });
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();

  const goTo = (n: number) => {
    setStep(n);
  };

  const handleBack = () => {
    if (step === 1) {
      window.location.href = '/';
      return;
    }
    goTo(step - 1);
  };

  const incomeNum = Number(income) || 0;

  return (
    <main className="inner-page">
      <PageHeader
        title={t('Budget Buddy')}
        subtitle={t('Activity')}
        onBackClick={handleBack}
        steps={STEPS}
        currentStep={step - 1}
      />

      <div className="inner-content" style={{ maxWidth: 500 }}>
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-4xl mb-6">
                🎉
              </div>
              <h2 className="heading-xl mb-4">{t('Exercise Complete!')}</h2>
              <p className="text-secondary mb-8">
                {t("You've built your personal budget. Keep showing up for your future self.")}
              </p>
              <button
                onClick={() => {
                  setCompleted(false);
                  setStep(1);
                  setIncome("");
                  setValues({ needs: 0, wants: 0, savings: 0 });
                }}
                className="btn btn-primary btn-lg btn-full"
              >
                {t('Restart Activity')}
              </button>
            </motion.div>
          ) : (
            <motion.article
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="card overflow-hidden"
              style={{ paddingBottom: 'var(--space-8)' }}
            >
              {step === 1 && <Screen1Intro onNext={() => goTo(2)} />}
              {step === 2 && <Screen2Learn onNext={() => goTo(3)} />}
              {step === 3 && (
                <Screen3Income income={income} setIncome={setIncome} onNext={() => goTo(4)} />
              )}
              {step === 4 && (
                <Screen4Build
                  income={incomeNum}
                  values={values}
                  setValues={setValues}
                  onNext={() => goTo(5)}
                />
              )}
              {step === 5 && (
                <Screen5Summary
                  income={incomeNum}
                  values={values}
                  onComplete={() => setCompleted(true)}
                />
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
