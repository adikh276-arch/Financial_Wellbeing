'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight } from 'lucide-react';

interface SaveAndFinishButtonProps {
  onSave: () => void | Promise<void>;
  saved: boolean;
  label?: string;
}

export function SaveAndFinishButton({ onSave, saved, label }: SaveAndFinishButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = async () => {
    await onSave();
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      padding: 'var(--space-4) var(--space-6)', 
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(24px)',
      borderTop: '1px solid var(--border-subtle)', 
      zIndex: 100, 
      display: 'flex', 
      justifyContent: 'center', 
      boxShadow: '0 -4px 20px rgba(0,0,0,0.03)' 
    }}>
      <div style={{ width: '100%', maxWidth: 'calc(800px - var(--space-6) * 2)', display: 'flex' }}>
        <button 
          onClick={handleClick}
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            padding: '18px', 
            borderRadius: '20px',
            fontSize: '1.1rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
            background: saved ? 'var(--brand-success)' : 'linear-gradient(135deg, var(--brand-primary), #4F46E5)'
          }}
        >
          {saved ? <Check size={22} /> : null}
          {saved ? t('Saved Successfully!') : (label || t('Save & Finish'))}
          {!saved && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}
