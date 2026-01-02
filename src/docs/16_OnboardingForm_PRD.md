# Onboarding Form PRD

## Overview

A progressive business registration form that reveals fields dynamically as the user completes each step. The form uses a "smart reveal" pattern to reduce cognitive load and guide users through the registration process.

---

## Form Sections

### Section 1: Basic Information
| Field | Type | Trigger to Reveal | Validation |
|-------|------|-------------------|------------|
| Brand Name | Text Input | Always visible (first field) | Required |
| Legal Name | Text Input | Brand Name >= 2 characters | Required |
| Website | Text Input | Legal Name >= 2 characters | Optional |
| Business Type | Select | Legal Name >= 2 characters | Required (triggers Section 2) |

**Business Type Options:**
- Standard
- Enterprise
- Startup
- Non-Profit

---

### Section 2: Tax Information
| Field | Type | Trigger to Reveal | Validation |
|-------|------|-------------------|------------|
| Tax ID (EIN) | Text Input | Business Type selected (400ms delay) | Required |
| Tax ID Issuing Country | Select | Tax ID >= 5 characters | Required (triggers Section 3) |

**Country Options:**
- United States
- Canada
- United Kingdom
- Germany
- France
- Australia
- Other

---

### Section 3: Business Address
| Field | Type | Trigger to Reveal | Validation |
|-------|------|-------------------|------------|
| Street Address | Text Input (Autocomplete) | Tax Country selected (300ms delay) | Required |
| City | Text Input | Street Address >= 5 chars OR Google Places selection | Required |
| State | Text Input | Street Address >= 5 chars OR Google Places selection | Required |
| Zip Code | Text Input | Street Address >= 5 chars OR Google Places selection | Required |
| Country | Select | Zip Code >= 3 characters | Required (triggers Section 4) |

**Google Places Integration:**
- When user selects an address from autocomplete, all address fields auto-populate
- Parses: street_number, route, locality, administrative_area_level_1, postal_code, country

---

### Section 4: Contact Information
| Field | Type | Trigger to Reveal | Validation |
|-------|------|-------------------|------------|
| Support Email | Email Input | Country selected (300ms delay) | Required, must contain @ and . |
| Support Phone | Tel Input | Valid email entered | Required |
| Contact First Name | Text Input | Phone >= 7 characters | Required |
| Contact Last Name | Text Input | Phone >= 7 characters | Required |

---

## Progressive Reveal Flow

```
[Start]
    |
    v
+------------------+
| 1. Brand Name    |  <-- Always visible, autofocus
+------------------+
    | (>= 2 chars)
    v
+------------------+
| 2. Legal Name    |
+------------------+
    | (>= 2 chars)
    v
+------------------+
| 3. Website       |
| 4. Business Type |  <-- Side by side
+------------------+
    | (Type selected)
    v
=== SECTION 2 REVEALS (400ms delay) ===
    |
    v
+------------------+
| 5. Tax ID        |
+------------------+
    | (>= 5 chars)
    v
+------------------+
| 6. Tax Country   |
+------------------+
    | (Country selected)
    v
=== SECTION 3 REVEALS (300ms delay) ===
    |
    v
+------------------+
| 7. Street Address|  <-- Google Places autocomplete
+------------------+
    | (>= 5 chars OR place selected)
    v
+------------------+
| 8. City          |
| 9. State         |  <-- 3-column grid
| 10. Zip Code     |
+------------------+
    | (Zip >= 3 chars)
    v
+------------------+
| 11. Country      |
+------------------+
    | (Country selected)
    v
=== SECTION 4 REVEALS (300ms delay) ===
    |
    v
+------------------+
| 12. Support Email|
+------------------+
    | (valid email format)
    v
+------------------+
| 13. Support Phone|
+------------------+
    | (>= 7 chars)
    v
+------------------+
| 14. First Name   |
| 15. Last Name    |  <-- Side by side
+------------------+
    |
    v
[Submit Enabled]
```

---

## Section Completion Behavior

### Auto-Collapse
- When all required fields in a section are filled, the section is marked complete
- After 400ms delay, the section auto-collapses
- Section header shows green checkmark icon
- Chevron appears for expand/collapse toggle

### Section Complete Criteria
| Section | Required Fields |
|---------|-----------------|
| 1 | businessName + legalName + businessType |
| 2 | taxId + taxCountry |
| 3 | streetAddress + city + state + zipCode + country |
| 4 | supportEmail + supportPhone + contactFirstName + contactLastName |

---

## Animation Specifications

### Field Reveal Animation
- Duration: 300ms
- Easing: ease-out
- Transform: translateY(12px) -> translateY(0)
- Opacity: 0 -> 1

### Section Reveal Animation
- Duration: 400ms
- Easing: ease-out
- Transform: translateY(16px) -> translateY(0)
- Opacity: 0 -> 1

### Section Collapse Animation
- Duration: 300ms
- Easing: ease-out
- Max-height: 500px -> 0
- Opacity: 1 -> 0

---

## UI Components

### Section Header
- Number badge (1-4) or checkmark when complete
- Section title
- Chevron (visible only when section is complete, rotates on toggle)

### Input Fields
- Dark theme: bg-brand-gray-400/60
- Border: brand-gray-200/50
- Focus ring: brand-gray-100/20
- Placeholder: brand-gray-100/60

### Submit Button
- Disabled until all sections complete
- White background, dark text
- Arrow icon suffix

### Success Screen
- Green checkmark in circle
- Personalized message with user's first name and business name
- "Start New Registration" button to reset form

---

## Form Data Structure

```typescript
interface FormData {
  // Section 1: Basic Information
  businessName: string;
  legalName: string;
  website: string;
  businessType: string;

  // Section 2: Tax Information
  taxId: string;
  taxCountry: string;

  // Section 3: Business Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Section 4: Contact Information
  supportEmail: string;
  supportPhone: string;
  contactFirstName: string;
  contactLastName: string;
}
```

---

## Accessibility Considerations

- First field receives autofocus
- Proper label associations with all inputs
- Keyboard navigable
- Focus management when new fields reveal
- Screen reader announcements for section completion (future enhancement)
