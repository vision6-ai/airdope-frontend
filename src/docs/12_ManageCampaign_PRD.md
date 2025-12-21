# Manage Campaign PRD

## 1. Overview
The **Manage Campaign** page (`ManageCampaignPage`) provides a detailed view for a single campaign, allowing management of creators, content, and budget.

## 2. User Stories
*   **As a Creator**, I want to manage the creators/influencers involved in a campaign.
*   **As a Creator**, I want to track the budget spend and engagement metrics for this specific campaign.

## 3. Key Features
*   **Header:** Title, Category, Status Badge, Creator avatars, "New Creator" button.
*   **Tabs:** Creators Board, Discovery, Ads, Payments.
*   **Campaign Stats:**
    *   **Total Spent:** Progress bar vs Budget.
    *   **Pending Drafts:** Count of content needing approval.
    *   **Avg Engagement:** % metric.
    *   **Days Left:** Countdown.
*   **Creators Board (Tab):**
    *   Kanban or list view of creators and their content status (Draft, Approved, Posted) - *Implied by `CampaignTimeline` and `CreatorsBoard` components.*

## 4. User Flow
1.  **Access:** Creator clicks a campaign on `PromotionPage`.
2.  **Overview:** Creator lands on `ManageCampaignPage` and reviews "Pending Drafts".
3.  **Manage:** Creator uses the "Creators Board" to approve content or communicate with creators.

## 5. Data Model (Campaign)
*   `id`: string
*   `title`: string
*   `category`: string (e.g., "Tech & Lifestyle", "Email & SMS")
*   `dateRange`: string
*   `status`: Enum ("active" | "completed" | "scheduled" | "draft")
*   `budget`: { `spent`: number, `total`: number }
*   `stats`: Engagement, Draft counts, etc.

