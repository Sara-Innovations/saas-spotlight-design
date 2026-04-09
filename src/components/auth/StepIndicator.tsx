import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Step Nodes */}
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={label} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-primary border-primary text-white"
                    : isActive
                    ? "bg-white border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-110"
                    : "bg-white border-neutral-200 text-neutral-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <span className="text-sm font-bold">{stepNumber}</span>
                )}
              </div>
              <span 
                className={cn(
                  "absolute -bottom-7 w-20 text-center text-[10px] font-semibold tracking-wider uppercase transition-colors duration-300",
                  isActive ? "text-primary" : isCompleted ? "text-neutral-600" : "text-neutral-400"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
