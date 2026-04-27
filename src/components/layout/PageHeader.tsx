'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

import { HistoryModal } from '@/components/HistoryModal';
import { useState } from 'react';
import { History as HistoryIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel?: string;
  accentColor?: string;
  rightSlot?: ReactNode;
  steps?: string[];
  currentStep?: number;
  historyKey?: string;
  onRestore?: (data: any, timestamp: string) => void;
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
}: PageHeaderProps) {
  const [showHistory, setShowHistory] = useState(false);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const label = backLabel || t('back');

  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  return (
    <div className="page-header-bar">
      <div className="page-header-inner">
        <Link href={`${backHref}${suffix}`} className="back-btn" aria-label={label}>
          <ChevronLeft size={18} />
        </Link>

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
