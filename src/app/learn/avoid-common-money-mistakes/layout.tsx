import { useTranslation } from 'react-i18next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: t("Common Money Mistakes"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
