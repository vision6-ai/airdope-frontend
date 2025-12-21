# Drops List PRD

## 1. Overview
The **Drops** module is the core event management system. This PRD focuses on the high-level list view (`DropsPage`).

## 2. Drops List Page (`DropsPage`)

### 2.1. Overview
Displays a calendar or list of all scheduled and past drops.

### 2.2. User Stories
*   **As a Creator**, I want to see a schedule of my upcoming drops to manage my content calendar.
*   **As a Creator**, I want to access past drops to view performance stats.

### 2.3. Key Features
*   **Sub-Navigation:** Switch between "Drops" and "Link Builder" (shared context).
*   **Tabs:** "Upcoming" vs "Past".
*   **Event Grouping:** Events are grouped by date (e.g., "Dec 25", "Jan 5").
*   **Event Card:** Displays Title, Date, Time, Guest Count, View Count, and Cover Image.
*   **Empty State:** Message when no events exist.

## 3. User Flow
1.  **Navigation:** Creator navigates to `/drops`.
2.  **View:** Creator sees list of upcoming drops.
3.  **Action:** Creator clicks on a drop card to view details (navigates to `ManageDropPage`).
