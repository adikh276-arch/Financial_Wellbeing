'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useParams } from 'next/navigation';
import { LanguageSelector } from '../LanguageSelector';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel?: string;
  accentColor?: string;
  rightSlot?: ReactNode;
  steps?: string[];
  currentStep?: number;
  showLanguage?: boolean;
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
  showLanguage = true,
}: PageHeaderProps) {
  const { t } = useTranslation();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const label = backLabel || t('back');

  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  // Ensure backHref is prefixed with slug if it's just "/"
  const finalBackHref = backHref === "/" ? `/${slug}${suffix}` : `${backHref}${suffix}`;

  return (
    <div className="page-header-bar">
      <div className="page-header-inner">
        <Link href={finalBackHref} className="back-btn" aria-label={label}>
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
          {rightSlot}
          {showLanguage && <LanguageSelector />}
        </div>
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
