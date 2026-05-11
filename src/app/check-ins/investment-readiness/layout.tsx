
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Investment Readiness'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
