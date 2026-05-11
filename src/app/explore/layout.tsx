
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t('Explore Finance'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
