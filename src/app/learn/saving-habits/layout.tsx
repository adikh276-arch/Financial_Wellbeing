
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Saving Habits'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
