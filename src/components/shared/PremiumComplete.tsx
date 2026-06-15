import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, RotateCcw, Sparkles, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ShareModal } from './ShareModal';

interface PremiumCompleteProps {
  title?: string;
  message?: string;
  onRestart?: () => void;
  onHome?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const PremiumComplete: React.FC<PremiumCompleteProps> = ({
  title,
  message,
  onRestart,
  onHome,
  children,
  icon
}) => {
  const { t } = useTranslation(['common', 'share']);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  
  const displayTitle = title || t("Well Done!");
  const displayMessage = message || t("You've successfully completed this activity. Take a moment to appreciate your progress.");
  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      // Always try to notify parent first
      if (window.parent !== window) {
        window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      }
      // Then navigate to external dashboard root
      window.location.href = '/financial_wellbeing';
    }
  };

  return (
    <div className="flex flex-col items-center py-12 pb-40 selection:bg-blue-600/10">
      <div className="w-full max-w-lg space-y-12">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-blue-600 -z-10 blur-2xl scale-150"
            />
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-blue-600 border border-slate-100 shadow-2xl shadow-blue-600/20">
              {icon || <CheckCircle2 size={64} strokeWidth={2.5} />}
            </div>
          </div>
        </motion.div>

        {/* Sparkle decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <Sparkles size={20} className="text-blue-600/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title & Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">{t(displayTitle)}</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md mx-auto">{t(displayMessage)}</p>
        </motion.div>

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Action Buttons — fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-md z-20 flex justify-center border-t border-slate-100/50">
        <div className="w-full max-w-lg flex flex-col gap-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsShareModalOpen(true)}
            className="w-full py-4.5 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Share2 size={18} strokeWidth={2.5} />
            {t("share:share")}
          </motion.button>

          {onRestart && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="w-full py-4.5 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw size={18} strokeWidth={2.5} />
              {t("Start Over")}
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHome}
            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Home size={20} strokeWidth={2.5} />
            {t("Finish & Exit")}
          </motion.button>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        activityName={title ? t(title) : ""} 
        customMessage={t('share_custom_premium_complete', "I just completed an awesome financial exercise on TherapyMantra! Start your journey to financial wellness here: https://web.mantracare.com/finance")}
      />
    </div>
  );
};
