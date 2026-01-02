import { useState, useCallback } from "react";

export interface FormData {
  businessName: string;
  legalName: string;
  website: string;
  businessType: string;
  industryVertical: string;
  referenceId: string;
  taxId: string;
  taxCountry: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  supportEmail: string;
  supportPhone: string;
  contactFirstName: string;
  contactLastName: string;
}

export interface FieldVisibility {
  businessName: boolean;
  legalName: boolean;
  website: boolean;
  businessType: boolean;
  industryVertical: boolean;
  referenceId: boolean;
  taxId: boolean;
  taxCountry: boolean;
  streetAddress: boolean;
  city: boolean;
  state: boolean;
  zipCode: boolean;
  country: boolean;
  supportEmail: boolean;
  supportPhone: boolean;
  contactFirstName: boolean;
  contactLastName: boolean;
}

const initialFormData: FormData = {
  businessName: "",
  legalName: "",
  website: "",
  businessType: "",
  industryVertical: "",
  referenceId: "",
  taxId: "",
  taxCountry: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  supportEmail: "",
  supportPhone: "",
  contactFirstName: "",
  contactLastName: "",
};

const initialVisibility: FieldVisibility = {
  businessName: true,
  legalName: false,
  website: false,
  businessType: false,
  industryVertical: false,
  referenceId: false,
  taxId: false,
  taxCountry: false,
  streetAddress: false,
  city: false,
  state: false,
  zipCode: false,
  country: false,
  supportEmail: false,
  supportPhone: false,
  contactFirstName: false,
  contactLastName: false,
};

function generateReferenceId(): string {
  const chars = "0123456789abcdef";
  const segments = [8, 4, 4, 4, 12];
  return segments
    .map((len) =>
      Array.from({ length: len }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("")
    )
    .join("-");
}

export function useFormProgress() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [visibility, setVisibility] = useState<FieldVisibility>(initialVisibility);
  const [currentSection, setCurrentSection] = useState(1);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      setVisibility((prev) => {
        const newVisibility = { ...prev };

        switch (field) {
          case "businessName":
            if (value.length >= 2) {
              newVisibility.legalName = true;
            }
            break;
          case "legalName":
            if (value.length >= 2) {
              newVisibility.website = true;
              newVisibility.businessType = true;
            }
            break;
          case "businessType":
            if (value) {
              newVisibility.industryVertical = true;
            }
            break;
          case "industryVertical":
            if (value) {
              newVisibility.referenceId = true;
              const refId = generateReferenceId();
              setFormData((p) => ({ ...p, referenceId: refId }));
              setTimeout(() => {
                setVisibility((v) => ({ ...v, taxId: true }));
                setCurrentSection(2);
              }, 400);
            }
            break;
          case "taxId":
            if (value.length >= 5) {
              newVisibility.taxCountry = true;
            }
            break;
          case "taxCountry":
            if (value) {
              setTimeout(() => {
                setVisibility((v) => ({ ...v, streetAddress: true }));
                setCurrentSection(3);
              }, 300);
            }
            break;
          case "streetAddress":
            if (value.length >= 5) {
              newVisibility.city = true;
              newVisibility.state = true;
              newVisibility.zipCode = true;
            }
            break;
          case "zipCode":
            if (value.length >= 3) {
              newVisibility.country = true;
            }
            break;
          case "country":
            if (value) {
              setTimeout(() => {
                setVisibility((v) => ({ ...v, supportEmail: true }));
                setCurrentSection(4);
              }, 300);
            }
            break;
          case "supportEmail":
            if (value.includes("@") && value.includes(".")) {
              newVisibility.supportPhone = true;
            }
            break;
          case "supportPhone":
            if (value.length >= 7) {
              newVisibility.contactFirstName = true;
              newVisibility.contactLastName = true;
            }
            break;
        }

        return newVisibility;
      });
    },
    []
  );

  const getCompletionPercentage = useCallback(() => {
    const fields = Object.keys(formData) as (keyof FormData)[];
    const filledFields = fields.filter(
      (field) => formData[field] && formData[field].length > 0
    );
    return Math.round((filledFields.length / fields.length) * 100);
  }, [formData]);

  const isSectionComplete = useCallback(
    (section: number) => {
      switch (section) {
        case 1:
          return (
            formData.businessName &&
            formData.legalName &&
            formData.businessType &&
            formData.industryVertical
          );
        case 2:
          return formData.taxId && formData.taxCountry;
        case 3:
          return (
            formData.streetAddress &&
            formData.city &&
            formData.state &&
            formData.zipCode &&
            formData.country
          );
        case 4:
          return (
            formData.supportEmail &&
            formData.supportPhone &&
            formData.contactFirstName &&
            formData.contactLastName
          );
        default:
          return false;
      }
    },
    [formData]
  );

  const isFormComplete = useCallback(() => {
    return (
      isSectionComplete(1) &&
      isSectionComplete(2) &&
      isSectionComplete(3) &&
      isSectionComplete(4)
    );
  }, [isSectionComplete]);

  return {
    formData,
    visibility,
    currentSection,
    updateField,
    getCompletionPercentage,
    isSectionComplete,
    isFormComplete,
  };
}
