import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useGooglePlacesAutocomplete } from "../../lib/useGooglePlaces";

interface RevealingFieldProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealingField({
  isVisible,
  children,
  className,
  delay = 0,
}: RevealingFieldProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  if (!shouldRender) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "transition-all duration-300 ease-out",
        isAnimating
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  helperText?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  autoFocus = false,
  helperText,
}: FormInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <div className="space-y-1">
      <label className="text-[11px] text-brand-gray-100 font-medium uppercase tracking-wide">{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          "w-full bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-md px-3 py-2",
          "text-white placeholder-brand-gray-100/60 text-sm",
          "focus:outline-none focus:border-brand-gray-100/50 focus:ring-1 focus:ring-brand-gray-100/20",
          "transition-all duration-200",
          readOnly && "bg-brand-gray-400/40 cursor-not-allowed text-brand-gray-100"
        )}
      />
      {helperText && (
        <p className="text-[10px] text-brand-gray-100/70">{helperText}</p>
      )}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  autoFocus?: boolean;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  autoFocus = false,
}: FormSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (autoFocus && selectRef.current) {
      const timer = setTimeout(() => {
        selectRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <div className="space-y-1">
      <label className="text-[11px] text-brand-gray-100 font-medium uppercase tracking-wide">{label}</label>
      <select
        ref={selectRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-md px-3 py-2",
          "text-white text-sm appearance-none cursor-pointer",
          "focus:outline-none focus:border-brand-gray-100/50 focus:ring-1 focus:ring-brand-gray-100/20",
          "transition-all duration-200",
          !value && "text-brand-gray-100/60"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238A8A8E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "16px",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormInputAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (components: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function FormInputAutocomplete({
  label,
  value,
  onChange,
  onPlaceSelected,
  placeholder,
  autoFocus = false,
}: FormInputAutocompleteProps) {
  const autocompleteRef = useGooglePlacesAutocomplete(onPlaceSelected);

  useEffect(() => {
    if (autoFocus && autocompleteRef.current) {
      const timer = setTimeout(() => {
        autocompleteRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, autocompleteRef]);

  return (
    <div className="space-y-1">
      <label className="text-[11px] text-brand-gray-100 font-medium uppercase tracking-wide">
        {label}
      </label>
      <input
        ref={autocompleteRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-md px-3 py-2",
          "text-white placeholder-brand-gray-100/60 text-sm",
          "focus:outline-none focus:border-brand-gray-100/50 focus:ring-1 focus:ring-brand-gray-100/20",
          "transition-all duration-200"
        )}
      />
    </div>
  );
}
