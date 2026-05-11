
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Savings Check-up'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
