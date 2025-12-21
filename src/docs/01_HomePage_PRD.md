# HomePage PRD

## 1. Overview
The **Home Page** serves as the central command center for the Creator. It provides a snapshot of their progress, onboarding status, and quick access to high-value actions. It is designed to guide the user towards "manufacturing their first sold-out launch."

## 2. User Stories
*   **As a Creator**, I want to see my onboarding progress so I know what steps I need to complete to fully utilize the platform.
*   **As a Creator**, I want quick access to create a drop or campaign without navigating through menus.
*   **As a Creator**, I want to understand the value proposition of the platform through educational cards.

## 3. Key Features & Components

### 3.1. Header
*   **Component:** `Header` (Global)
*   **Functionality:** Navigation links (Drops, Fans, Promotion, Messages), Profile dropdown, Notifications, Search.

### 3.2. Welcome Section
*   **Content:** "Welcome to Buzz OS" greeting.
*   **Action:** "Create Drop" primary call-to-action button.
*   **Visual:** Large, prominent typography with brand colors.

### 3.3. Onboarding / Setup Widget
*   **Component:** `OnboardingTask` list.
*   **Features:**
    *   **Progress Ring:** Visual circular progress bar showing % of tasks completed (e.g., 0/3).
    *   **Task List:**
        *   **Connect Instagram:** Sync audience.
        *   **Claim Phone Number:** SMS capabilities.
        *   **Import Fans:** CSV import for CRM.
    *   **State:** Interactive buttons for each task (Connect Now, Claim Number, Import Now).

### 3.4. "What Happens Next?" (Educational Section)
*   **Component:** `FeatureCard`.
*   **Purpose:** Educates users on the platform's growth loop.
*   **Cards:**
    *   **Find New Fans:** Audience discovery.
    *   **Broadcast Everywhere:** Multi-channel messaging.
    *   **Orchestrate Launch:** Timing and coordination.

### 3.5. Quick Actions
*   **Component:** `QuickActionCard`.
*   **Purpose:** Shortcuts to frequent tasks.
*   **Actions:**
    *   **Create Campaign:** Links to `/promotion`.
    *   **View Analytics:** Links to `/fans`.

### 3.6. Resources
*   **Component:** `ResourceCard`.
*   **Content:** Quick Start Guide, Video Tutorials, Contact Support.

## 4. User Flow
1.  User lands on `/`.
2.  User sees onboarding progress.
    *   *If incomplete:* User clicks a task (e.g., "Connect Instagram") -> Redirects to integration flow (not yet defined in this scope).
    *   *If complete/ignored:* User clicks "Create Drop" -> Navigates to `/create-drop`.
3.  User explores "Quick Actions" -> Navigates to respective modules.

## 5. UI/UX Details
*   **Theme:** Dark mode with purple gradients.
*   **Interactions:** Hover effects on cards (border glow, scale).

