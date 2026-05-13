'use client';

import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { handleExternalExit } from '@/lib/navigation';

import { HistoryModal } from '@/components/HistoryModal';
import { useState } from 'react';
import { History as HistoryIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  accentColor?: string;
  rightSlot?: ReactNode;
  steps?: string[];
  currentStep?: number;
  historyKey?: string;
  onRestore?: (data: any, timestamp: string) => void;
  onBackClick?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel,
  accentColor = 'var(--brand-primary)',
  rightSlot,
  steps,
  currentStep = 0,
  historyKey,
  onRestore,
  onBackClick,
}: PageHeaderProps) {
  const [showHistory, setShowHistory] = useState(false);
  const { t } = useTranslation();
  const label = backLabel || t('back');

  // Always use window.history.back() to properly pop the history stack.
  // Using Link replace or router.replace creates duplicate entries causing
  // the double-click issue. onBackClick overrides for custom exits (e.g. dashboard).
  const handleBack = onBackClick ?? (() => {
    if (typeof window !== 'undefined') {
      if (backHref && backHref !== '/') {
        window.location.href = backHref;
      } else {
        handleExternalExit();
      }
    }
  });

  return (
    <div className="page-header-bar" style={{ boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)' }}>
      <div className="page-header-inner">
        <button
          onClick={handleBack}
          className="back-btn"
          aria-label={label}
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {subtitle && (
            <p
              className="label-caps"
              style={{ color: accentColor, marginBottom: 1 }}
            >
              {t(subtitle)}
            </p>
          )}
          <h1
            className="truncate"
            style={{
              fontWeight: 700,
              fontSize: 'var(--text-base)',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              fontFamily: 'var(--font-display)',
            }}
          >
            {t(title)}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {historyKey && (
            <button 
              onClick={() => setShowHistory(true)} 
              className="btn-icon"
              style={{ background: 'var(--bg-neutral)', borderRadius: 12 }}
            >
              <HistoryIcon size={18} />
            </button>
          )}
          {rightSlot}
        </div>

        {historyKey && showHistory && (
          <HistoryModal 
            storageKey={historyKey}
            onClose={() => setShowHistory(false)}
            onRestore={(data, ts) => onRestore?.(data, ts)}
          />
        )}
      </div>

      {steps && (
        <div
          style={{
            maxWidth: 800,
            margin: '12px auto 0',
            padding: '0 var(--space-6)',
            display: 'flex',
            gap: 6,
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                background:
                  i < currentStep
                    ? accentColor
                    : i === currentStep
                    ? `${accentColor}40`
                    : 'var(--border-default)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
