# Create Drop PRD

## 1. Overview
The **Create Drop** screen is a wizard-like interface for setting up a new event or product launch. It emphasizes visual customization and essential configuration (Date, Time, Options).

## 2. User Stories
*   **As a Creator**, I want to upload a flyer and have the system automatically extract colors to theme the page.
*   **As a Creator**, I want to set the date, time, and name of my drop.
*   **As a Creator**, I want to configure options like Ticket Price and Social Gating (requiring social follow to RSVP).
*   **As a Creator**, I want to preview how the drop will look on mobile before publishing.

## 3. Key Features & Components

### 3.1. Visual & Theme
*   **Flyer Upload:** Drag-and-drop or click-to-upload area.
*   **Color Extraction:**
    *   *Logic:* System analyzes the uploaded image.
    *   *Output:* Automatically sets `bgColor` and `accentColor` for the page background.
    *   *Fallback:* Defaults to brand colors if no image or extraction fails.

### 3.2. Drop Details Form
*   **Drop Name:** Large text input.
*   **Short Summary:** Optional text area (toggleable).
*   **Date & Time:**
    *   Date picker (HTML `date` input).
    *   Time picker (HTML `time` input).
    *   *Default:* Preset to 2 days in the future, 15:00.

### 3.3. Drop Options
*   **Ticket Price:** "Free" (default) or Paid (toggle).
*   **Social Account:** "Collect fan social account" (toggle).
*   **RSVP Spots:** "Unlimited" or capped.

### 3.4. Mobile Preview
*   **Component:** `MobilePreview`.
*   **Functionality:** Real-time rendering of the drop page based on form inputs.
*   **Elements:** Countdown timer ("LIVE IN 2D 4H"), Flyer image, Creator info, Title, Summary, "Add to Wallet" button simulation.

## 4. User Flow
1.  User navigates to `/create-drop`.
2.  User uploads an image -> Background color changes instantly.
3.  User enters "Drop Name" and selects Date/Time.
4.  User toggles "Social Account" requirement.
5.  User reviews the `MobilePreview` on the right (desktop) or bottom (mobile).
6.  User clicks "Create Event".
    *   *Post-Action:* Should redirect to the new drop's `ManageDropPage` (implied).

## 5. Technical Notes
*   **Color Extraction:** Uses HTML5 Canvas to sample pixels from the uploaded image and calculate dominant/average colors.
*   **State Management:** Local state (`useState`) handles the form data before submission.

