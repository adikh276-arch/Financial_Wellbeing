import { useTranslation } from 'react-i18next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan & EMI Planner',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
