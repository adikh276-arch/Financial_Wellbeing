'use client';

import { useState } from "react";
import { ExerciseState } from "./types";
import { Screen1Intro } from "./Screen1Intro";
import { Screen2Goal } from "./Screen2Goal";
import { Screen3Target } from "./Screen3Target";
import { Screen4Plan } from "./Screen4Plan";
import { Screen5Summary } from "./Screen5Summary";
import { useAutoSave } from "@/lib/hooks";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const initialState: ExerciseState = {
  categoryId: null,
  customGoal: "",
  goalName: "",
  targetAmount: "",
  targetMonth: "",
  targetYear: "",
  strategyId: null,
  notes: "",
};

interface Props {
  step: number;
  setStep: (n: number | ((prev: number) => number)) => void;
}

export const SavingsGoalActivity = ({ step, setStep }: Props) => {
  const { t } = useTranslation();
  const [state, setState] = useState<ExerciseState>(initialState);
  const [completed, setCompleted] = useState(false);

  const goNext = () => setStep((s) => Math.min(5, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onComplete = () => {
    setCompleted(true);
  };

  useAutoSave('savings_goal_history', {
    ...state,
    completedAt: completed ? new Date().toISOString() : null
  }, { enabled: completed, isDirty: completed });

  if (completed) {
    return (
      <div className="p-8 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary-bg flex items-center justify-center text-4xl mb-6 shadow-sm">
          🌟
        </div>
        <h2 className="heading-xl mb-4 text-primary">{t('Plan Locked In!')}</h2>
        <p className="text-secondary mb-8 leading-relaxed">
          {t('Great work — your savings goal is now part of your financial wellness journey.')}
        </p>
        <button
          onClick={() => {
            setState(initialState);
            setStep(1);
            setCompleted(false);
          }}
          className="btn btn-primary btn-lg btn-full"
        >
          {t('Set Another Goal')}
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white min-h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && <Screen1Intro onNext={goNext} onBack={goBack} />}
          {step === 2 && (
            <Screen2Goal
              state={state}
              setState={setState}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <Screen3Target
              state={state}
              setState={setState}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 4 && (
            <Screen4Plan
              state={state}
              setState={setState}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 5 && (
            <Screen5Summary
              state={state}
              setState={setState}
              onComplete={onComplete}
              onBack={goBack}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};