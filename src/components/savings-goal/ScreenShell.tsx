import { ReactNode } from "react";

type Props = {
  step: number;
  total: number;
  progress: number;
  onBack: () => void;
  children: ReactNode;
  cta: ReactNode;
  scrollKey?: string | number;
};

export const ScreenShell = ({
  children,
  cta,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 px-6 pt-4">{children}</div>
      <div className="px-6 py-8 flex justify-end">
        {cta}
      </div>
    </div>
  );
};