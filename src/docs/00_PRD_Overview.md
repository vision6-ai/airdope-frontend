# Buzz OS (AirDope) - Product Requirements Document (PRD)

## 1. Product Vision
**Buzz OS** (also known as AirDope) is a comprehensive growth engine designed for creators and artists. It empowers them to "manufacture sold-out launches" by providing a suite of tools for audience management, event/drop creation, multi-channel promotion, and AI-driven automation.

**Tagline:** "The growth engine that finds new fans and manufactures sold-out launches."

## 2. Core Concepts
* **Drops:** The central event or product launch mechanism (e.g., ticket sales, merchandise, content release).
* **Fans:** The audience CRM, tracking engagement, LTV, and contact details.
* **Promotion:** Tools to broadcast messages across Email, SMS, and Social Media.
* **AI Agent:** An autonomous or semi-autonomous assistant for managing fan interactions and content.
* **Link Builder:** A "Link-in-Bio" tool to consolidate digital presence.

## 3. User Personas
* **Creator / Artist:** The primary user. Wants to grow their fanbase, sell tickets/merch, and save time on marketing.
* **Manager:** A secondary user who might manage the account on behalf of the artist.
* **Fan:** The end-user who interacts with Drops, RSVPs to events, and receives messages (viewing the public-facing pages like `FansDropPage`).

## 4. High-Level Navigation Structure
The application is structured around a main dashboard with the following primary navigation areas:

* **Home:** Dashboard overview, onboarding progress, quick actions.
* **Drops:**
  * **Drops List:** View upcoming and past drops.
  * **Create Drop:** Wizard to set up a new drop.
  * **Manage Drop:** Detailed view for a specific drop (Guests, Blasts, etc.).
  * **Drop Page (Public):** The public landing page for a drop.
* **Fans:** CRM interface for managing the fanbase.
* **Promotion:** Campaign management (Ads, Email, SMS, Creator partnerships).
* **Messages:** Unified inbox for cross-platform communication.
* **AI Agent:** Configuration for the AI assistant.
* **Link Builder:** Link-in-bio editor.
* **Settings:** Account, subscription, and integration management.

## 5. Design Principles
* **Dark Mode First:** The UI uses a dark theme (`bg-brand-dark`) with purple/brand gradients (`bg-brand-purple`), reflecting a premium, nightlife/entertainment aesthetic.
* **Mobile-First Thinking:** Features like `LinkEditor` and `CreateDrop` include mobile previews, acknowledging that fans primarily engage via mobile.
* **Action-Oriented:** The dashboard emphasizes "Quick Actions" and "Onboarding Tasks" to drive user activation.
* **AI-Powered:** AI features are highlighted with purple gradients and sparkle icons throughout the app.

## 6. PRD Document Index

### Core Screens
| # | Document | Screen | Status |
|---|----------|--------|--------|
| 00 | [PRD_Template.md](./00_PRD_Template.md) | Template for new PRDs | Reference |
| 01 | [HomePage_PRD.md](./01_HomePage_PRD.md) | Dashboard & Onboarding | Complete |
| 02 | [Drops_PRD.md](./02_Drops_PRD.md) | Drops List View | Complete |
| 03 | [CreateDrop_PRD.md](./03_CreateDrop_PRD.md) | Drop Creation Wizard | Complete |
| 04 | [Fans_PRD.md](./04_Fans_PRD.md) | Fan CRM | Complete |
| 05 | [Promotion_PRD.md](./05_Promotion_PRD.md) | Campaigns & Ads | Complete |
| 06 | [Messages_PRD.md](./06_Messages_PRD.md) | Unified Inbox | Complete |
| 07 | [AIAgent_PRD.md](./07_AIAgent_PRD.md) | AI Configuration | Complete |
| 08 | [LinkEditor_PRD.md](./08_LinkEditor_PRD.md) | Link-in-Bio Builder | Complete |
| 09 | [Settings_PRD.md](./09_Settings_PRD.md) | Account & Billing | Complete |

### Management Screens
| # | Document | Screen | Status |
|---|----------|--------|--------|
| 10 | [ManageDrop_PRD.md](./10_ManageDrop_PRD.md) | Individual Drop Management | Complete |
| 11 | [FansDrop_PRD.md](./11_FansDrop_PRD.md) | Public Drop Page | Complete |
| 12 | [ManageCampaign_PRD.md](./12_ManageCampaign_PRD.md) | Campaign Management | Complete |

### Feature Extensions
| # | Document | Feature | Status |
|---|----------|---------|--------|
| 13 | [CreatorRoster_PRD.md](./13_CreatorRoster_PRD.md) | Influencer Management | Planned |
| 14 | [CampaignDiscovery_PRD.md](./14_CampaignDiscovery_PRD.md) | Creator Discovery | Planned |
| 15 | [CampaignPayments_PRD.md](./15_CampaignPayments_PRD.md) | Payment Management | Planned |

## 7. PRD Standard Sections

All PRD documents should include the following sections:

1. **Overview** - Brief description of the feature/screen
2. **User Stories** - "As a [user], I want to [action] so that [benefit]"
3. **Key Features & Components** - Detailed component specifications
4. **User Flow** - Step-by-step interaction flow
5. **Data Models** - TypeScript interfaces
6. **Acceptance Criteria** - Testable requirements checklist
7. **Error States** - Error scenarios and messaging
8. **Empty States** - What users see when there's no data
9. **UI/UX Details** - Visual specifications
10. **Technical Notes** - Implementation considerations

See [00_PRD_Template.md](./00_PRD_Template.md) for the full template.

## 8. Implementation Status

### Fully Implemented
- HomePage (Dashboard)
- DropsPage (List View)
- CreateDrop (Wizard)
- FansPage (CRM)
- FansDropPage (Public)
- PromotionPage (Campaigns + Ads)
- MessagesPage (Inbox)
- AIAgentPage (Configuration)
- LinkEditorPage (Builder)
- SettingsPage (Subscriptions)
- ManageDropPage (Drop Management)
- ManageCampaignPage (Campaign Management)

### Partially Implemented (UI Placeholder)
- Creator Roster (shows "coming soon")
- Campaign Discovery (shows "coming soon")
- Campaign Payments (shows "coming soon")

### Settings Subsections (Sidebar Navigation Exists)
- General Settings
- Notifications
- Team Members
- Activity Logs
- Display Settings
- Invoices
- Payment Details
- Live Chat Behavior
- Auto-Assignment
- Channel Integrations (Instagram, TikTok, WhatsApp, etc.)

## 9. Technology Stack
* **Frontend:** React + TypeScript
* **Styling:** Tailwind CSS with custom brand tokens
* **Icons:** Font Awesome
* **Routing:** React Router
* **State:** React hooks (useState, useReducer)

## 10. Future Roadmap Considerations
* Mobile app (React Native)
* Multi-language support
* White-label solution for agencies
* Advanced analytics dashboard
* Marketplace for creator partnerships
