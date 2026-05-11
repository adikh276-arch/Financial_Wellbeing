
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Emergency Fund Basics'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
