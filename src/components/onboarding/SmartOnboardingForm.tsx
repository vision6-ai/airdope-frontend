import React from "react";
import { X, ArrowRight, Shield } from "lucide-react";
import { useFormProgress } from "./useFormProgress";
import { RevealingField, FormInput, FormSelect } from "./RevealingField";
import { ProgressiveSection } from "./ProgressiveSection";
import { FormProgressBar, SectionIndicator } from "./FormProgressBar";

const businessTypeOptions = [
  { value: "standard", label: "Standard" },
  { value: "enterprise", label: "Enterprise" },
  { value: "startup", label: "Startup" },
  { value: "nonprofit", label: "Non-Profit" },
];

const industryOptions = [
  { value: "retail", label: "Retail & Consumer Products" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "au", label: "Australia" },
  { value: "other", label: "Other" },
];

interface SmartOnboardingFormProps {
  onClose?: () => void;
  onSubmit?: (data: ReturnType<typeof useFormProgress>["formData"]) => void;
}

export function SmartOnboardingForm({
  onClose,
  onSubmit,
}: SmartOnboardingFormProps) {
  const {
    formData,
    visibility,
    currentSection,
    updateField,
    getCompletionPercentage,
    isSectionComplete,
    isFormComplete,
  } = useFormProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete()) {
      onSubmit?.(formData);
    }
  };

  const sections = [
    { number: 1, title: "Basic Information", isComplete: isSectionComplete(1) },
    { number: 2, title: "Tax Information", isComplete: isSectionComplete(2) },
    { number: 3, title: "Business Address", isComplete: isSectionComplete(3) },
    { number: 4, title: "Contact Information", isComplete: isSectionComplete(4) },
  ];

  return (
    <div className="bg-brand-gray-500 border border-brand-gray-200/30 rounded-xl w-full max-w-xl mx-auto overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-brand-gray-200/20">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-white">Business Registration</h1>
            <p className="text-brand-gray-100 text-xs mt-0.5">
              Complete your business profile to activate your account
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-brand-gray-300 rounded-md transition-colors -mr-1"
            >
              <X className="w-4 h-4 text-brand-gray-100" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <SectionIndicator sections={sections} currentSection={currentSection} />
          <FormProgressBar
            percentage={getCompletionPercentage()}
            className="w-28"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 space-y-5">
        <ProgressiveSection
          number={1}
          title="Basic Information"
          isVisible={true}
          isComplete={isSectionComplete(1)}
        >
          <RevealingField isVisible={visibility.businessName}>
            <FormInput
              label="Business Name"
              value={formData.businessName}
              onChange={(v) => updateField("businessName", v)}
              placeholder="Enter your business name"
              autoFocus
            />
          </RevealingField>

          <RevealingField isVisible={visibility.legalName} delay={100}>
            <FormInput
              label="Legal Name"
              value={formData.legalName}
              onChange={(v) => updateField("legalName", v)}
              placeholder="Legal entity name"
            />
          </RevealingField>

          <RevealingField isVisible={visibility.website} delay={100}>
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Website"
                value={formData.website}
                onChange={(v) => updateField("website", v)}
                placeholder="https://www.example.com"
              />
              <FormSelect
                label="Business Type"
                value={formData.businessType}
                onChange={(v) => updateField("businessType", v)}
                options={businessTypeOptions}
                placeholder="Select type"
              />
            </div>
          </RevealingField>

          <RevealingField isVisible={visibility.industryVertical} delay={100}>
            <div className="grid grid-cols-2 gap-3">
              <FormSelect
                label="Industry Vertical"
                value={formData.industryVertical}
                onChange={(v) => updateField("industryVertical", v)}
                options={industryOptions}
                placeholder="Select industry"
              />
              <RevealingField isVisible={visibility.referenceId} delay={200}>
                <FormInput
                  label="Reference ID"
                  value={formData.referenceId}
                  onChange={() => {}}
                  readOnly
                />
              </RevealingField>
            </div>
          </RevealingField>
        </ProgressiveSection>

        <ProgressiveSection
          number={2}
          title="Tax Information"
          isVisible={visibility.taxId}
          isComplete={isSectionComplete(2)}
          delay={200}
        >
          <RevealingField isVisible={visibility.taxId}>
            <FormInput
              label="Tax ID (EIN)"
              value={formData.taxId}
              onChange={(v) => updateField("taxId", v)}
              placeholder="XX-XXXXXXX"
            />
          </RevealingField>

          <RevealingField isVisible={visibility.taxCountry} delay={100}>
            <FormSelect
              label="Tax ID Issuing Country"
              value={formData.taxCountry}
              onChange={(v) => updateField("taxCountry", v)}
              options={countryOptions}
              placeholder="Select country"
            />
          </RevealingField>
        </ProgressiveSection>

        <ProgressiveSection
          number={3}
          title="Business Address"
          isVisible={visibility.streetAddress}
          isComplete={isSectionComplete(3)}
          delay={200}
        >
          <RevealingField isVisible={visibility.streetAddress}>
            <FormInput
              label="Street Address"
              value={formData.streetAddress}
              onChange={(v) => updateField("streetAddress", v)}
              placeholder="123 Main St"
            />
          </RevealingField>

          <RevealingField isVisible={visibility.city} delay={100}>
            <div className="grid grid-cols-3 gap-3">
              <FormInput
                label="City"
                value={formData.city}
                onChange={(v) => updateField("city", v)}
                placeholder="New York"
              />
              <FormInput
                label="State"
                value={formData.state}
                onChange={(v) => updateField("state", v)}
                placeholder="NY"
              />
              <FormInput
                label="Zip Code"
                value={formData.zipCode}
                onChange={(v) => updateField("zipCode", v)}
                placeholder="10001"
              />
            </div>
          </RevealingField>

          <RevealingField isVisible={visibility.country} delay={100}>
            <FormSelect
              label="Country"
              value={formData.country}
              onChange={(v) => updateField("country", v)}
              options={countryOptions}
              placeholder="Select country"
            />
          </RevealingField>
        </ProgressiveSection>

        <ProgressiveSection
          number={4}
          title="Contact Information"
          isVisible={visibility.supportEmail}
          isComplete={isSectionComplete(4)}
          delay={200}
        >
          <RevealingField isVisible={visibility.supportEmail}>
            <FormInput
              label="Support Email"
              value={formData.supportEmail}
              onChange={(v) => updateField("supportEmail", v)}
              placeholder="support@example.com"
              type="email"
            />
          </RevealingField>

          <RevealingField isVisible={visibility.supportPhone} delay={100}>
            <FormInput
              label="Support Phone"
              value={formData.supportPhone}
              onChange={(v) => updateField("supportPhone", v)}
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
          </RevealingField>

          <RevealingField isVisible={visibility.contactFirstName} delay={100}>
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Contact First Name"
                value={formData.contactFirstName}
                onChange={(v) => updateField("contactFirstName", v)}
                placeholder="John"
              />
              <FormInput
                label="Contact Last Name"
                value={formData.contactLastName}
                onChange={(v) => updateField("contactLastName", v)}
                placeholder="Doe"
              />
            </div>
          </RevealingField>
        </ProgressiveSection>
      </form>

      <div className="px-5 py-3 border-t border-brand-gray-200/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-brand-gray-100 text-xs">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted and secure</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white hover:bg-brand-gray-300 rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            className="px-4 py-2 text-sm font-semibold bg-white text-brand-dark rounded-md hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            Submit
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
