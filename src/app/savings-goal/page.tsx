'use client';

import { useState } from "react";
import { SavingsGoalActivity } from "@/components/savings-goal/SavingsGoalActivity";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";

const STEPS = [
  'Introduction',
  'Choose Your Goal',
  'Set Target',
  'Savings Strategy',
  'Summary'
];

export default function SavingsGoalPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      window.location.href = '/';
      return;
    }
    setStep(s => s - 1);
  };

  return (
    <main className="inner-page">
      <PageHeader
        title={t('Savings Goal Setter')}
        subtitle={t('Activity')}
        onBackClick={handleBack}
        steps={STEPS}
        currentStep={step - 1}
      />
      <div className="inner-content" style={{ maxWidth: 500 }}>
        <div className="card overflow-hidden">
          <SavingsGoalActivity step={step} setStep={setStep} />
        </div>
      </div>
    </main>
  );
}
