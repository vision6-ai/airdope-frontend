# Fans PRD

## 1. Overview
The **Fans** page acts as the CRM (Customer Relationship Management) for the creator's audience. It allows viewing, searching, and managing fan data, as well as initiating broadcasts.

## 2. User Stories
*   **As a Creator**, I want to see an overview of my fan growth and engagement stats.
*   **As a Creator**, I want to search for specific fans by name or using AI natural language queries (e.g., "Fans who bought the last drop").
*   **As a Creator**, I want to segment my fans (e.g., "Superfans", "At Risk").
*   **As a Creator**, I want to import fans from other platforms via CSV.

## 3. Key Features & Components

### 3.1. Stats Dashboard
*   **Stat Cards:**
    *   **Total Fans:** Count and % change.
    *   **New Fans:** Weekly count and % change.
    *   **Avg Engagement Score:** Numeric score and trend.

### 3.2. Action Bar
*   **Import Fans:** Button to trigger CSV import flow.
*   **Send Broadcast:** Opens `SendBlastModal` to message all fans.
*   **Manage Segments:** Tools for grouping fans.

### 3.3. Search & Filter
*   **Toggle:** "Regular" vs "AI Search".
*   **Regular Search:** Text input for name/email, Filter dropdowns ("All Fans", "Register Time").
*   **AI Search:**
    *   Natural language input field (e.g., "Show me fans who...").
    *   Quick Query chips (pre-defined AI prompts like "Superfans with high LTV").

### 3.4. Fans List (Table)
*   **Columns:**
    *   **Full Name:** Avatar + Name + Contact (Email/Phone).
    *   **FanRank:** Numeric score (0-100).
    *   **LTV (Lifetime Value):** Monetary value ($).
    *   **Status:** "Superfan", "Regular", "At Risk" (Color-coded badges).
    *   **Actions:** Kebab menu (...) for individual fan actions.

### 3.5. Send Blast Modal
*   **Component:** `SendBlastModal`.
*   **Trigger:** "Send Broadcast" button.
*   **Functionality:** Compose and send messages to the selected audience segment.

## 4. User Flow
1.  User navigates to `/fans`.
2.  User reviews high-level stats.
3.  User wants to find a specific group:
    *   *Option A:* Types name in Regular Search.
    *   *Option B:* Switches to AI Search and types "At risk fans".
4.  User selects fans or clicks "Send Broadcast" to initiate a campaign.

## 5. Data Model (Fan)
*   `id`: string
*   `name`: string
*   `contact`: string (email or phone)
*   `avatar`: string (url)
*   `fanRank`: number
*   `ltv`: number
*   `status`: Enum ("Superfan" | "Regular" | "At Risk")

