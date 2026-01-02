import React, { useState } from "react";
import { SmartOnboardingForm } from "../../components/onboarding";

export function OnboardingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  const handleSubmit = (data: Record<string, string>) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="bg-brand-gray-500 border border-brand-gray-200/30 rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Registration Complete
          </h2>
          <p className="text-brand-gray-100 mb-6">
            Thank you, {submittedData.contactFirstName}! Your business profile for{" "}
            <span className="text-white font-medium">{submittedData.businessName}</span>{" "}
            has been submitted successfully.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedData(null);
            }}
            className="px-6 py-3 bg-white text-brand-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start New Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <SmartOnboardingForm onSubmit={handleSubmit} />
    </div>
  );
}
