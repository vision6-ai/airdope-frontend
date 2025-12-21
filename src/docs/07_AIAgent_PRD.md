# AI Agent PRD

## 1. Overview
The **AI Agent** page allows the creator to configure and monitor their autonomous AI assistant. This agent helps with drafting content, replying to fans, and managing knowledge.

## 2. User Stories
*   **As a Creator**, I want to train the AI on my voice/tone so it sounds like me.
*   **As a Creator**, I want to set the autonomy level (e.g., "Review all drafts" vs "Auto-post").
*   **As a Creator**, I want to upload knowledge base files (transcripts, bios) to inform the AI.

## 3. Key Features & Components

### 3.1. Status & Health
*   **Global Status Card:**
    *   **Active/Inactive:** Toggle.
    *   **Training Health:** Score (e.g., 85%).
    *   **Health Tip:** Suggestion to improve (e.g., "Add more transcripts").

### 3.2. Knowledge Base
*   **Card:** `KnowledgeBaseCard`.
*   **Functionality:** Overview of uploaded files (Total Files count). Manage training data.

### 3.3. Behavior Settings
*   **Card:** `BehaviorSettingsCard`.
*   **Autonomy:** Options like "Review", "Semi-Auto", "Full Auto".
*   **Tone:** "Chill", "Professional", "Hype", etc.

### 3.4. Activities & Preview
*   **Simulation Preview:** Test the AI's responses in a chat interface.
*   **Campaigns:** Active AI-driven campaigns.
*   **Draft Reviews:**
    *   **Count:** Number of drafts waiting for approval.
    *   **Preview:** Snippet of generated text.

## 4. User Flow
1.  User navigates to the "AI Agent" tab (via `MessagesTabs` or direct link).
2.  User sees the health score is low.
3.  User uploads a new transcript in Knowledge Base (implied flow).
4.  User adjusts the "Tone" setting in Behavior Settings.
5.  User clicks "Draft Reviews" to approve generated content.

