
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Emergency Fund'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
