import { ArrowLeft } from "lucide-react";

interface ActivityHeaderProps {
  step: number;
  total: number;
  progress: number;
  onBack: () => void;
}

export const ActivityHeader = ({ step, total, progress, onBack }: ActivityHeaderProps) => {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-medium text-navy hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {step} of {total}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-navy">Budget Planning Activity</span>
        <span className="text-xs font-bold text-primary">{progress}%</span>
      </div>
      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-progress rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
