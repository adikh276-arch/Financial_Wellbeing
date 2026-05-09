'use client';

import { ChevronLeft } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useRouter } from 'next/navigation';
import { HistoryModal } from '@/components/HistoryModal';
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const label = backLabel || t('back');

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onBackClick) {
      onBackClick();
      return;
    }

    // Use window.location for more reliable navigation in iframe/Next.js edge cases
    const params = new URLSearchParams(window.location.search);
    params.delete('token'); 
    const query = params.toString();
    const suffix = query ? `?${query}` : '';
    const target = `${backHref || '/'}${suffix}`;
    
    window.location.replace(target);
  };

  return (
    <div className="page-header-bar">
      <div className="page-header-inner">
        <button 
          onClick={handleBack} 
          className="back-btn" 
          aria-label={label} 
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            maxWidth: 640,
            margin: '8px auto 0',
            display: 'flex',
            gap: 4,
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background:
                  i < currentStep
                    ? accentColor
                    : i === currentStep
                    ? `${accentColor}60`
                    : 'var(--border-default)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
