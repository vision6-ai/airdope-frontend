# Link Editor PRD

## 1. Overview
The **Link Editor** (Link Builder) allows creators to build a "Link-in-Bio" page (`airdope.io/artist`) that aggregates their important links (Socials, Drops, Merch).

## 2. User Stories
*   **As a Creator**, I want to add, edit, and reorder links on my bio page.
*   **As a Creator**, I want to customize the look of my bio page (Avatar, Bio text).
*   **As a Creator**, I want to preview how the page looks on a phone in real-time.

## 3. Key Features & Components

### 3.1. Link Management
*   **Add Link:** Button to create a new link entry.
*   **Link Card (`LinkEditorCard`):**
    *   **Title & URL:** Text inputs.
    *   **Toggle:** Enable/Disable visibility.
    *   **Delete:** Remove link.
    *   **Stats:** Click count.
    *   **Validation:** Warnings for missing URLs (e.g., "Enter your Instagram URL").

### 3.2. Profile Settings
*   **Header Area:**
    *   **Avatar:** Image upload/preview.
    *   **Username:** Display name.
    *   **Social Icons:** Quick links to major platforms (IG, TikTok, YT, Spotify).

### 3.3. Phone Preview
*   **Component:** `PhonePreview`.
*   **Functionality:** Renders the bio page inside a mock phone frame. Updates in real-time as the user edits links.
*   **External Link:** Button to open the actual live page.

## 4. User Flow
1.  User navigates to `/link-editor` (or clicks "Link Builder" tab in Drops).
2.  User clicks "Add Link".
3.  User types "New Song" and pastes a Spotify URL.
4.  User sees the new button appear immediately in the Phone Preview.
5.  User toggles off an old link.

## 5. Data Model (Link)
*   `id`: string
*   `title`: string
*   `url`: string
*   `isEnabled`: boolean
*   `clicks`: number
*   `hasWarning`: boolean
*   `warningMessage`: string (optional)

