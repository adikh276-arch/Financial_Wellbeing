import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CTAButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  showArrow?: boolean;
}

export const CTAButton = ({ label, onClick, disabled, showArrow = true }: CTAButtonProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="px-6 mt-8 flex justify-end">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`btn btn-primary btn-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {t(label)}
        {showArrow && !label.includes("→") && !label.includes("✅") && <ArrowRight size={18} />}
      </button>
    </div>
  );
};
