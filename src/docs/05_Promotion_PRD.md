# Promotion Campaigns PRD

## 1. Overview
The **Promotion** module is the command center for multi-channel marketing campaigns. It provides tools to manage creator partnerships, run paid ads, and track campaign performance across all marketing channels.

## 2. User Stories

### Campaign Management
* **As a Creator**, I want to see the performance of my active campaigns so I can optimize in real-time.
* **As a Creator**, I want to create a new campaign for a launch so I can coordinate my marketing efforts.
* **As a Creator**, I want to filter campaigns by status (Active, Draft, Completed, Scheduled) so I can focus on relevant work.

### Ads Management
* **As a Creator**, I want to monitor all my active ads across platforms in one place.
* **As a Creator**, I want to use AI to manage and optimize my ad campaigns automatically.
* **As a Creator**, I want to see ROAS and conversion metrics for each ad.

### Creator Partnerships
* **As a Creator**, I want to manage my roster of influencer partners (see [Creator Roster PRD](./13_CreatorRoster_PRD.md)).

## 3. Key Features & Components

### 3.1. Navigation Tabs
* **Tabs:** Campaigns (default), Creator Roster, Ads
* **Implementation:** Tab-based navigation with active indicator

### 3.2. Campaigns Tab

#### 3.2.1. Stats Overview
* **Component:** `CampaignStatsCard`
* **Metrics:**
  | Metric | Description | Icon |
  |--------|-------------|------|
  | Active Campaigns | Count with status breakdown | Rocket (green) |
  | Total Reach (30d) | Aggregated reach metric | Bullseye (blue) |
  | Avg Conversion Rate | Percentage with trend | Arrow pointer (amber) |

#### 3.2.2. Campaigns Grid
* **Component:** `CampaignCard`
* **Card Elements:**
  * Title
  * Date Range & Category
  * Status Badge (Active/Completed/Scheduled/Draft)
  * Creator avatars stack
  * Budget progress (Spent vs Total)
  * Bottom text (e.g., "3 Approvals Pending")
  * Action button (Manage/View Report/Continue Setup)
* **Status Colors:**
  * Active: Green
  * Completed: Gray
  * Scheduled: Blue
  * Draft: Gray (lighter)

#### 3.2.3. Create Campaign Card
* Dashed border placeholder card
* Plus icon with "Create New Campaign" text
* Hover state with border color change

### 3.3. Ads Tab

#### 3.3.1. Ads Header
* **Title:** "Campaign Ads"
* **Subtitle:** "Monitor and manage your active advertising campaigns"
* **Action:** "Create Ad" button

#### 3.3.2. AI Ad Manager
* **Component:** AI-powered command bar (Beta)
* **Features:**
  * Natural language input for ad management
  * Examples: "Stop all running ads", "Focus only on TikTok"
  * Execute button with sparkle icon
  * Purple gradient background to highlight AI feature

#### 3.3.3. Ads Stats Cards
* **Component:** `StatCard`
* **Metrics:**
  | Metric | Value Example | Trend |
  |--------|---------------|-------|
  | Total Spend | $4,280 | 12% below budget |
  | Active Ads | 5 | Across 3 platforms |
  | Total Reach | 842K | +18% vs last week |
  | Conversions | 1,247 | CVR: 3.2% |

#### 3.3.4. Ad Cards List
* **Component:** `AdCard`
* **Platform Support:** Instagram, TikTok, Facebook, YouTube
* **Card Elements:**
  * Platform icon with brand colors
  * Ad title
  * Target audience description
  * Spend amount
  * Reach metric
  * ROAS (Return on Ad Spend)
  * Status badge (Active/Paused)
  * Kebab menu for actions

#### 3.3.5. Platform Styling
| Platform | Icon | Background |
|----------|------|------------|
| Instagram | fa-instagram | Purple-pink gradient |
| TikTok | fa-tiktok | Black |
| Facebook | fa-facebook | Blue |
| YouTube | fa-youtube | Red |

### 3.4. Creator Roster Tab
* See [13_CreatorRoster_PRD.md](./13_CreatorRoster_PRD.md)

## 4. User Flow

### Campaign Overview Flow
1. Creator navigates to `/promotion`
2. Creator lands on Campaigns tab (default)
3. Creator reviews stats cards (Active, Reach, Conversion)
4. Creator filters by status if needed
5. Creator clicks campaign card → navigates to `/promotion/campaign/:id`

### Create Campaign Flow
1. Creator clicks "Create Campaign" button or dashed card
2. Modal/wizard opens for campaign setup
3. Creator enters: Name, Date Range, Budget, Channel type
4. Creator saves as draft or publishes
5. Redirects to campaign management page

### Ads Management Flow
1. Creator switches to Ads tab
2. Creator reviews spend and performance metrics
3. Creator uses AI command: "Pause all Facebook ads"
4. System processes command and updates ad statuses
5. Creator sees confirmation toast

## 5. Data Models

### Campaign
```typescript
interface Campaign {
  id: string;
  title: string;
  dateRange: string;
  status: "active" | "completed" | "scheduled" | "draft";
  creators?: {
    avatars: string[];
    count: number;
  };
  budget?: {
    spent: number;
    total: number;
  };
  bottomText: string;
  bottomIcon: string;
  actionText: string;
  statusColor: string;
  borderColor: string;
}
```

### Ad
```typescript
interface Ad {
  id: string;
  platform: "instagram" | "tiktok" | "facebook" | "youtube";
  title: string;
  audience: string;
  spend: number;
  reach: number;
  roas: number | null;
  status: "active" | "paused" | "ended";
  createdAt: Date;
  campaignId?: string;
}
```

## 6. Acceptance Criteria

### Campaigns Tab
- [ ] Stats cards load within 1 second
- [ ] Campaign grid displays up to 12 cards with pagination
- [ ] Status filter updates grid instantly
- [ ] Search finds campaigns by title
- [ ] Create Campaign card is always last in grid

### Ads Tab
- [ ] AI command bar parses natural language inputs
- [ ] Platform icons render with correct brand colors
- [ ] ROAS displays "-" for paused/new ads
- [ ] Bulk actions work on multiple selected ads
- [ ] Real-time sync with ad platform APIs

### Navigation
- [ ] Tab state persists on page refresh
- [ ] Active tab has underline indicator
- [ ] Tab switching is instant (no loading)

## 7. Error States

| Scenario | Error Message | User Action |
|----------|--------------|-------------|
| API sync failed | "Unable to sync with [Platform]. Check your connection." | Retry button |
| Ad creation failed | "Ad could not be created. Check your account permissions." | Link to Settings |
| Budget exceeded | "Campaign budget reached. Ads have been paused." | Increase budget |
| AI command failed | "Couldn't understand that command. Try rephrasing." | Show examples |
| No ad accounts | "No ad accounts connected." | "Connect Account" button |

## 8. Empty States

| State | Message | Call to Action |
|-------|---------|----------------|
| No campaigns | "No campaigns yet" | "Create your first campaign" |
| No active campaigns | "No active campaigns" | "Launch a campaign" |
| No ads | "No ads running" | "Create your first ad" |
| No connected platforms | "Connect ad accounts to get started" | Platform connection links |

## 9. UI/UX Details
* **Theme:** Dark mode with purple gradients
* **Grid:** 3-column layout for campaigns, responsive
* **Stats Cards:** Subtle background, trend indicators
* **AI Banner:** Purple gradient border, sparkle animation
* **Ad Cards:** Horizontal layout with metrics inline
* **Status Badges:** Pill-shaped with appropriate colors

## 10. Technical Notes
* **Ad Platform APIs:**
  * Meta Ads API for Instagram/Facebook
  * TikTok for Business API
  * Google Ads API for YouTube
* **Real-time Sync:** Poll every 5 minutes for metrics
* **AI Commands:** Use NLP to parse and execute ad operations
* **Caching:** Cache campaign list for 2 minutes

## 11. Related PRDs
* [12_ManageCampaign_PRD.md](./12_ManageCampaign_PRD.md) - Individual campaign management
* [13_CreatorRoster_PRD.md](./13_CreatorRoster_PRD.md) - Creator partnership management
* [14_CampaignDiscovery_PRD.md](./14_CampaignDiscovery_PRD.md) - Creator discovery tools
* [15_CampaignPayments_PRD.md](./15_CampaignPayments_PRD.md) - Payment management
