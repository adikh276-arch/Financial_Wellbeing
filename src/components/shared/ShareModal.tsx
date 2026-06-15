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
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 101, padding: 'var(--space-6)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="card"
              style={{ width: '100%', maxWidth: '400px', pointerEvents: 'auto', overflow: 'hidden', borderRadius: '32px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-premium)' }}
            >
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--brand-primary-bg)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{t('share_progress', 'Share Progress')}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, margin: '4px 0 0 0' }}>{t('inspire_others', 'Inspire others today')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="btn-icon"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-base)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ position: 'relative', background: 'var(--bg-base)', borderRadius: '24px', padding: '24px', border: '1px solid var(--border-default)' }}>
                   <div style={{ position: 'absolute', top: '16px', left: '16px', color: 'var(--brand-primary)', opacity: 0.2 }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" /></svg>
                   </div>
                   <p style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600, lineHeight: 1.6, position: 'relative', zIndex: 10, margin: 0, padding: '8px 0 0 16px' }}>
                     "{shareText}"
                   </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                    >
                      <div className="card-hover" style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease' }}>
                        {option.icon}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>{option.name}</span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px', 
                    fontWeight: 800, 
                    fontSize: '16px',
                    background: copied ? 'var(--brand-success)' : 'var(--gradient-brand)',
                    border: 'none',
                    color: 'white',
                    boxShadow: copied ? '0 8px 16px rgba(16,185,129,0.3)' : '0 8px 16px rgba(59,130,246,0.3)',
                    cursor: 'pointer'
                  }}
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


