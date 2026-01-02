import React from "react";
import { cn } from "../../lib/utils";

interface FormProgressBarProps {
  percentage: number;
  className?: string;
}

export function FormProgressBar({ percentage, className }: FormProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-brand-gray-100">Progress</span>
        <span className="text-[10px] text-brand-gray-100 font-medium">
          {percentage}%
        </span>
      </div>
      <div className="h-0.5 bg-brand-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface SectionIndicatorProps {
  sections: { number: number; title: string; isComplete: boolean }[];
  currentSection: number;
}

export function SectionIndicator({
  sections,
  currentSection,
}: SectionIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {sections.map((section, index) => (
        <React.Fragment key={section.number}>
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              section.isComplete
                ? "bg-green-400"
                : section.number === currentSection
                ? "bg-white"
                : "bg-brand-gray-200"
            )}
          />
          {index < sections.length - 1 && (
            <div
              className={cn(
                "w-5 h-px transition-all duration-300",
                section.isComplete ? "bg-green-400/50" : "bg-brand-gray-200"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
