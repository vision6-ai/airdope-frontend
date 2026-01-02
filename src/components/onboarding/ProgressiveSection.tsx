import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { Check, ChevronDown } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const prevCompleteRef = useRef(false);

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

  useEffect(() => {
    if (isComplete && !prevCompleteRef.current) {
      prevCompleteRef.current = true;
      const timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 400);
      return () => clearTimeout(timer);
    }
    prevCompleteRef.current = isComplete;
  }, [isComplete]);

  if (!shouldRender) return null;

  const handleToggle = () => {
    if (isComplete) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-400 ease-out",
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 w-full text-left",
          isCollapsed ? "mb-0" : "mb-3",
          isComplete && "cursor-pointer group"
        )}
      >
        <div
          className={cn(
            "w-5 h-5 rounded flex items-center justify-center text-xs font-semibold transition-all duration-300",
            isComplete
              ? "bg-green-500/20 text-green-400"
              : "bg-brand-gray-300 text-white"
          )}
        >
          {isComplete ? <Check className="w-3 h-3" /> : number}
        </div>
        <h2 className="text-sm font-semibold text-white flex-1">{title}</h2>
        {isComplete && (
          <ChevronDown
            className={cn(
              "w-4 h-4 text-brand-gray-100 transition-transform duration-300",
              isCollapsed ? "rotate-0" : "rotate-180"
            )}
          />
        )}
      </button>
      <div
        className={cn(
          "space-y-2.5 overflow-hidden transition-all duration-300 ease-out",
          isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        )}
      >
        {children}
      </div>
    </div>
  );
}
