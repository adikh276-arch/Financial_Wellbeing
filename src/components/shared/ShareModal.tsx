'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, activityName }) => {
  const { t } = useTranslation('share');
  const [copied, setCopied] = React.useState(false);

  const webUrl = "https://web.mantracare.com/finance";
  
  const shareText = t('share_text', {
    defaultValue: "I have done this {{activityName}} in TherapyMantra and really enjoy it you can do it too just follow the link to https://web.mantracare.com/finance",
    activityName: activityName || t('this_activity', 'this activity'),
    webUrl
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="text-emerald-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      color: 'bg-emerald-50'
    },
    {
      name: 'Twitter',
      icon: <Send className="text-sky-500" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      color: 'bg-sky-50'
    },
    {
      name: 'Facebook',
      icon: <Share2 className="text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(webUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-50'
    },
    {
      name: 'Telegram',
      icon: <Send className="text-blue-400" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(webUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-50'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl pointer-events-auto overflow-hidden border border-slate-100"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl tracking-tight">{t('share_progress', 'Share Progress')}</h3>
                      <p className="text-slate-500 text-sm font-medium mt-0.5">{t('inspire_others', 'Inspire others today')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-3xl p-6 border border-indigo-100/50 shadow-inner">
                   <div className="absolute top-4 left-4 text-indigo-200 opacity-50">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" /></svg>
                   </div>
                   <p className="text-slate-700 text-[15px] font-medium leading-relaxed line-clamp-4 relative z-10 pt-2 pl-4">
                     "{shareText}"
                   </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-active:scale-95 shadow-sm`}>
                        {option.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{option.name}</span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 font-bold text-[15px] ${
                    copied 
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-200/50' 
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 hover:-translate-y-0.5'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      {t('copied', 'Copied!')}
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      {t('copy_message', 'Copy Message')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};


