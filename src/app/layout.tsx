
import type { Metadata, Viewport } from 'next';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import AuthGuard from "@/components/AuthGuard";
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: {
    default: 'Financial Wellbeing — Master Your Money',
    template: '%s | Financial Wellbeing'
  },
  description: 'A premium financial wellbeing platform with tools, education, and insights to transform your financial health.',
  keywords: 'financial wellbeing, budget planner, investment planner, EMI calculator, goal planner',
  icons: {
    icon: [
      { url: '/financial_wellbeing/favicon.png' },
    ],
    apple: [
      { url: '/financial_wellbeing/favicon.png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F7F8FC" />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <Suspense fallback={null}>
            <AuthGuard>
              <div className="app-shell">
                {children}
              </div>
            </AuthGuard>
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
