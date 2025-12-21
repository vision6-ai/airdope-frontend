# Manage Drop PRD

## 1. Overview
The **Manage Drop** page (`ManageDropPage`) is the dashboard for a specific drop, allowing the creator to manage guests, blasts, and settings.

## 2. User Stories
*   **As a Creator**, I want to track RSVPs and guest details.
*   **As a Creator**, I want to send blasts (messages) specifically to people interested in this drop.
*   **As a Creator**, I want to get the public link to share the drop.

## 3. Key Features
*   **Header:** Drop Title, "Drop Page" link (opens public view), Navigation Tabs.
*   **Tabs:**
    *   **Overview:** Dashboard details (see below).
    *   **Guests:** List of RSVPs (`GuestsTab` component).
    *   **Blasts:** Communication history/tools (`BlastsTab`).
    *   **Registration:** Form settings (`RegistrationTab`).
    *   **Insights:** Analytics (`InsightsTab`).
    *   **More:** Additional settings (`MoreTab`).
*   **Overview Tab Features:**
    *   **Actions:** Invite Guests, Send Blast, Share Drop.
    *   **Preview Details:** Cover image, Title, Date/Time, Host info, Public URL (with Copy button).
    *   **Visibility:** Toggle "Public" vs "Private", Featured status.
    *   **Invites Widget:** Stats on invites sent.
    *   **Guests Widget:** RSVP progress bar, recent registrations list.
    *   **Hosts Widget:** Manage event hosts.

## 4. User Flow
1.  **Access:** Creator clicks a drop on `DropsPage`.
2.  **Overview:** Creator lands on Overview tab to see quick stats.
3.  **Manage:** Creator switches to "Guests" tab to view RSVPs.
4.  **Action:** Creator clicks "Send Blast" to update guests.

