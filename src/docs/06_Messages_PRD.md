# Messages PRD

## 1. Overview
The **Messages** page is a unified inbox that aggregates communications from various platforms (Instagram DM, TikTok DM, Email) into a single interface.

## 2. User Stories
*   **As a Creator**, I want to read and reply to messages from different platforms in one place.
*   **As a Creator**, I want to see context about the fan I'm talking to (Verification status, Platform).

## 3. Key Features & Components

### 3.1. Sidebar
*   **Component:** `MessagesSidebar`.
*   **Functionality:**
    *   Navigation for message folders (Inbox, Unread, Starred).
    *   Possibly filters for platforms (IG, TikTok, Email).

### 3.2. Message List
*   **Component:** `MessageList`.
*   **Content:** List of conversations.
*   **Item Details:** Contact Name, Avatar, Last Message Preview, Time, Platform Icon.

### 3.3. Chat Panel
*   **Component:** `ChatPanel`.
*   **Header:** Contact Name, Handle, Verification Badge, Platform indicator.
*   **Message Area:** Bubble view of the conversation history.
*   **Input:** Text area for typing replies.

## 4. Data Model (Contact)
*   `name`: string
*   `handle`: string
*   `platform`: string (e.g., "Instagram DM", "Email")
*   `isVerified`: boolean
*   `avatar`: string (url)

## 5. User Flow
1.  User navigates to `/messages`.
2.  User selects a conversation from the `MessageList`.
3.  The `ChatPanel` updates to show the conversation.
4.  User types and sends a reply.

