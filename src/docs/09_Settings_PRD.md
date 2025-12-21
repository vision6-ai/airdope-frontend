# Settings PRD

## 1. Overview
The **Settings** page is the central hub for account management, subscription control, team administration, and platform integrations. It provides creators with full control over their Buzz OS experience, billing, and connected channels.

## 2. User Stories

### Account & Profile
* **As a Creator**, I want to update my general account settings so I can keep my profile information current.
* **As a Creator**, I want to manage notification preferences so I only receive alerts that matter to me.
* **As a Creator**, I want to customize the display settings to match my visual preferences.

### Team Management
* **As a Creator**, I want to invite team members so they can help manage my account.
* **As a Creator**, I want to assign roles and permissions to control what each team member can access.
* **As a Creator**, I want to view activity logs to audit actions taken on my account.

### Billing & Subscription
* **As a Creator**, I want to view my current subscription plan and its features.
* **As a Creator**, I want to activate or deactivate specific product add-ons (Marketing Automation, Inbox, AI).
* **As a Creator**, I want to view my invoices and billing history.
* **As a Creator**, I want to update my payment method securely.
* **As a Creator**, I want to cancel my subscription if needed.

### Inbox Configuration
* **As a Creator**, I want to configure live chat behavior so messages are handled appropriately.
* **As a Creator**, I want to set up auto-assignment rules for incoming messages.

### Channel Integrations
* **As a Creator**, I want to connect my Instagram account to sync audience data.
* **As a Creator**, I want to connect TikTok for cross-platform messaging.
* **As a Creator**, I want to set up WhatsApp, Messenger, SMS, Email, and Telegram integrations.

## 3. Key Features & Components

### 3.1. Settings Sidebar
* **Component:** `SettingsSidebar`
* **Sections:**
  * **Main:** General, Notifications, Team Members, Logs, Display
  * **Billing:** Subscriptions (active by default), Invoices, Payment Details
  * **Inbox:** Live Chat Behavior, Auto-Assignment
  * **Channels:** Instagram, TikTok, WhatsApp, Messenger, SMS, Email, Telegram
* **Visual:** Each channel shows its brand icon with appropriate color

### 3.2. General Settings (Placeholder)
* **Route:** `/settings/general`
* **Features:**
  * Profile name and email update
  * Avatar upload
  * Timezone selection
  * Language preference

### 3.3. Notifications Settings (Placeholder)
* **Route:** `/settings/notifications`
* **Features:**
  * Email notification toggles (Marketing, Security, Product updates)
  * Push notification preferences
  * SMS alert settings
  * Quiet hours configuration

### 3.4. Team Members (Placeholder)
* **Route:** `/settings/team`
* **Features:**
  * Team member list with roles (Owner, Admin, Editor, Viewer)
  * Invite team member modal
  * Remove/deactivate member
  * Role permission matrix

### 3.5. Activity Logs (Placeholder)
* **Route:** `/settings/logs`
* **Features:**
  * Filterable activity log table
  * Action types: Login, Settings change, Campaign created, etc.
  * Export logs to CSV

### 3.6. Display Settings (Placeholder)
* **Route:** `/settings/display`
* **Features:**
  * Theme selection (Dark/Light/System)
  * Compact mode toggle
  * Sidebar collapsed by default option

### 3.7. Subscription Management
* **Component:** `SubscriptionSection`
* **Route:** `/settings/subscriptions` (default billing view)
* **Features:**
  * **Plan Badge:** Shows current tier (e.g., "PRO")
  * **Features & Pricing Link:** Opens comparison modal/page
  * **Product Table:**
    * Columns: Product, Details, Price, Status, Action
    * Products: Marketing Automation, Inbox
    * Row shows contact usage (e.g., "1/500 contacts used")
  * **AI Product Card:** Highlighted upsell for AirDope AI ($29/month)
  * **Footer:** Total monthly price, Cancel Subscription button

### 3.8. Invoices (Placeholder)
* **Route:** `/settings/invoices`
* **Features:**
  * Invoice list with date, amount, status
  * Download PDF button
  * Filter by date range

### 3.9. Payment Details (Placeholder)
* **Route:** `/settings/payment`
* **Features:**
  * Current payment method display (masked card)
  * Add/Update payment method (Stripe integration)
  * Billing address management

### 3.10. Live Chat Behavior (Placeholder)
* **Route:** `/settings/inbox/chat-behavior`
* **Features:**
  * Business hours configuration
  * Away message customization
  * Response time SLA settings

### 3.11. Auto-Assignment (Placeholder)
* **Route:** `/settings/inbox/auto-assignment`
* **Features:**
  * Round-robin assignment toggle
  * Skill-based routing rules
  * Load balancing settings

### 3.12. Channel Integrations
* **Route:** `/settings/channels/:platform`
* **Supported Platforms:**
  | Platform | Icon | Features |
  |----------|------|----------|
  | Instagram | Pink gradient | OAuth connect, DM sync, Story mentions |
  | TikTok | Black | OAuth connect, Comment sync |
  | WhatsApp | Green | Business API setup, Template messages |
  | Messenger | Blue | Page connection, Automated responses |
  | SMS | Sky blue | Phone number claim, Carrier settings |
  | Email | Purple | SMTP/IMAP config, Domain verification |
  | Telegram | Light blue | Bot token setup, Channel linking |

## 4. Data Models

### SubscriptionItem
```typescript
interface SubscriptionItem {
  id: string;
  name: string;
  detailsTitle: string;
  detailsSubtitle: string;
  price: number;
  isActive: boolean;
  isHighlighted?: boolean;
}
```

### TeamMember
```typescript
interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "active" | "pending" | "deactivated";
  lastActive: Date;
}
```

### ChannelConnection
```typescript
interface ChannelConnection {
  platform: string;
  isConnected: boolean;
  accountName?: string;
  connectedAt?: Date;
  syncStatus: "synced" | "syncing" | "error";
}
```

## 5. User Flow

### Subscription Management Flow
1. User clicks Profile Avatar → "Settings"
2. User lands on Settings page (Subscriptions view by default)
3. User views current subscription products
4. User clicks "Activate" on Inbox product
5. System prompts for payment confirmation
6. Product becomes active, total price updates

### Channel Connection Flow
1. User navigates to Settings → Channels → Instagram
2. User clicks "Connect Account"
3. OAuth popup opens for Instagram authorization
4. User grants permissions
5. System syncs follower data
6. Connection status shows "Synced"

## 6. Acceptance Criteria

### Subscription Section
- [ ] PRO badge displays correctly for paid accounts
- [ ] Product prices sum correctly in footer
- [ ] Active/Disabled status badges render appropriately
- [ ] Activate/Disable buttons trigger correct API calls
- [ ] AI Product card is visually distinct (purple gradient)
- [ ] Cancel subscription requires confirmation modal

### Team Management
- [ ] Owner cannot be removed
- [ ] Invited members receive email notification
- [ ] Role changes take effect immediately
- [ ] Deactivated members lose access within 5 minutes

### Channel Integrations
- [ ] OAuth flow completes without errors
- [ ] Sync status updates in real-time
- [ ] Disconnect option available for connected channels
- [ ] Error states show retry button

## 7. Error States

| Scenario | Error Message | Action |
|----------|--------------|--------|
| Payment failed | "Payment could not be processed. Please update your payment method." | Link to Payment Details |
| OAuth denied | "Connection was cancelled. Please try again." | Retry button |
| Sync failed | "Unable to sync data. Check your permissions." | Retry + Help link |
| Team invite failed | "Invitation could not be sent. Check the email address." | Highlight email field |
| Rate limit exceeded | "Too many requests. Please wait a moment." | Auto-retry with countdown |

## 8. UI/UX Details
* **Theme:** Dark mode with purple gradients
* **Sidebar:** Fixed width (256px), scrollable on overflow
* **Active State:** White text, no background change
* **Channel Icons:** Platform-specific colors (Instagram pink, WhatsApp green, etc.)
* **Subscription Cards:** Subtle borders, rounded corners (xl)
* **AI Upsell:** Purple gradient background to stand out

## 9. Technical Notes
* **Payment Processing:** Integrate with Stripe for subscription management
* **OAuth:** Use platform SDKs for Instagram, TikTok, Facebook connections
* **Real-time Sync:** WebSocket connection for sync status updates
* **Activity Logs:** Store in append-only log table, 90-day retention
