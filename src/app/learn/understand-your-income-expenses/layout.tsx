
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Understanding Income & Expenses'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
