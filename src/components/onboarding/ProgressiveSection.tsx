import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface ProgressiveSectionProps {
  number: number;
  title: string;
  isVisible: boolean;
  isComplete: boolean;
  children: React.ReactNode;
  delay?: number;
}

export function ProgressiveSection({
  number,
  title,
  isVisible,
  isComplete,
  children,
  delay = 0,
}: ProgressiveSectionProps) {
  const [shouldRender, setShouldRender] = useState(number === 1);
  const [isAnimating, setIsAnimating] = useState(number === 1);

  useEffect(() => {
    if (isVisible && !shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldRender, delay]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "transition-all duration-400 ease-out",
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300",
            isComplete
              ? "bg-green-500/20 text-green-400"
              : "bg-brand-gray-300 text-white"
          )}
        >
          {isComplete ? <Check className="w-4 h-4" /> : number}
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
