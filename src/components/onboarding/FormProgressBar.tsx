import React from "react";
import { cn } from "../../lib/utils";

interface FormProgressBarProps {
  percentage: number;
  className?: string;
}

export function FormProgressBar({ percentage, className }: FormProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-brand-gray-100">Progress</span>
        <span className="text-xs text-brand-gray-100 font-medium">
          {percentage}%
        </span>
      </div>
      <div className="h-1 bg-brand-gray-300 rounded-full overflow-hidden">
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
    <div className="flex items-center gap-2">
      {sections.map((section, index) => (
        <React.Fragment key={section.number}>
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
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
                "w-8 h-0.5 transition-all duration-300",
                section.isComplete ? "bg-green-400/50" : "bg-brand-gray-200"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
