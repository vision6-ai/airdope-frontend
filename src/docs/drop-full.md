# Product Requirements Document (PRD): Drop Functionality

## 1. Overview

### 1.1 Product Vision
A comprehensive drop management system that enables content creators to launch, manage, and distribute exclusive content drops to their fan base through an intuitive multi-screen interface.

### 1.2 Scope
This PRD documents the Drop functionality across four core screens: **CreateDrop**, **DropsPage**, **FansPage**, and **ManageDropPage**, plus the fan-facing **FansDropPage**.

### 1.3 Product Context
"Drop" is the core content unit in the AirDope platform. It represents an event, product launch, or exclusive content release that creators share with their fans.

---

## 2. User Stories

### 2.1 Creator User Stories
- **As a content creator**, I want to create new drops with customizable content, scheduling, and options so that I can monetize my exclusive content
- **As a content creator**, I want to view all my upcoming and past drops in one organized timeline view
- **As a content creator**, I want to manage my existing drops so that I can invite guests/Fans, send blasts, and monitor performance
- **As a content creator**, I want to see my fan analytics so that I can understand engagement levels and lifetime value

### 2.2 Fan User Stories
- **As a fan**, I want to RSVP to drops via email or phone so that I get notified when content goes live
- **As a fan**, I want to receive confirmation and reminders about upcoming drops


---

## 3. Screen Specifications

### 3.1 CreateDrop Screen (`/src/screens/CreateDrop/CreateDrop.tsx`)

#### Purpose
Enables creators to configure and publish new drops with real-time mobile preview.

#### Layout
- Two-column layout on desktop: Form (left), Mobile Preview (right)
- Single column on mobile with inline preview

#### Features

**3.1.1 Creator/Brand Selector**
- Dropdown to select which creator profile hosts the drop
- Visual display with avatar and name (e.g., "Mayan Warrior")

**3.1.2 Visibility Toggle**
- Public/Private visibility selector with globe icon
- Controls whether drop is publicly discoverable

**3.1.3 Drop Name Input**
- Large text input field for drop title
- Default value: "My Drop Name"
- Styled with semi-transparent background

**3.1.4 Short Summary (Optional)**
- Expandable section activated by "+ Short Summary" button
- Multi-line textarea for drop description

**3.1.5 Flyer Upload**
- Drag-and-drop interface for image upload
- Click-to-upload alternative
- Image preview with removal option (X button)
- **Dynamic Color Extraction**: Extracts dominant colors from uploaded image to style page background

**3.1.6 Dates Configuration**
- **Drop Day**: Date picker with formatted display (e.g., "Sat, Dec 28")
- **Time**: Time picker input
- Default: 7 days from current date at 3:00 PM

**3.1.7 Drop Options**
| Option | Icon | Default Value | Toggle |
|--------|------|---------------|--------|
| Ticket Price | DollarSign | "Free" | Yes (off) |
| Social Account | Share2 | Collect fan social | Yes (on) |
| RSVP Spots | Users | "Unlimited" | Yes (off) |

**3.1.8 Theme Selector**
- Visual theme picker with thumbnail preview
- Current theme: "Minimal"
- Positioned below mobile preview on desktop

**3.1.9 Mobile Preview Component**
- Real-time iPhone-style device mockup
- Displays:
  - Countdown timer ("LIVE IN 2D 4H")
  - Flyer image or placeholder drop icon
  - Creator avatar and handle
  - Drop title (truncated if > 20 characters)
  - Short summary (3-line clamp)
  - Wallet Pass card/sign up form 
  - "Add to Wallet" CTA button

**3.1.10 Create Drop Button**
- Primary CTA at bottom of form
- White button with dark text

#### Components
- `MobilePreview` - Real-time preview component
- `extractColors()` - Color extraction utility

---

### 3.2 DropsPage Screen (`/src/screens/DropsPage/DropsPage.tsx`)

#### Purpose
Dashboard view showing all creator drops organized by date with timeline visualization.

#### Layout
- Sticky sub-navigation below header
- Timeline-based event grouping

#### Features

**3.2.1 Sub-Navigation**
| Tab | Description |
|-----|-------------|
| Drops | Main drops timeline view |
| Link Builder | Link management tool (separate feature) |

**3.2.2 Page Header**
- Title: "Drops"
- Tab switcher: "Upcoming" / "Past"
- Styled toggle buttons

**3.2.3 Event Timeline**
- Events grouped by date (e.g., "Dec 25", "Dec 28")
- Each group shows:
  - Date and day of week (left column)
  - Vertical timeline connector with dot indicator
  - Event cards (right column)

**3.2.4 Event Card (`EventCard.tsx`)**
| Element | Description |
|---------|-------------|
| Time | Event start time (e.g., "11:00 AM") |
| Title | Drop name/title |
| Guest Count | Icon + count (e.g., "1 guest") |
| View Count | Eye icon + views (e.g., "245 views") |
| Image | 32x32 thumbnail on right |
| CTA | "Manage Drop" button linking to ManageDropPage |

**3.2.5 Empty State (Past Tab)**
- Calendar icon
- "No past events" message

#### Data Structure
```typescript
interface EventData {
  id: string;
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  guestCount: number;
  viewCount: number;
  imageUrl: string;
}
```

---

### 3.3 FansPage Screen (`/src/screens/FansPage/FansPage.tsx`)

#### Purpose
Fan relationship management dashboard with analytics, search, and communication tools.

#### Layout
- Stats cards section
- Action cards section
- Fans list table

#### Features

**3.3.1 Stats Cards (3 columns)**
| Metric | Value | Change Indicator |
|--------|-------|------------------|
| Total Fans | 2,847 | +12% from last month |
| New Fans (This Week) | 142 | +8% from last week |
| Avg Engagement Score | 78.5 | +5% from last month |

**3.3.2 Action Cards (3 columns)**
| Action | Icon | Description |
|--------|------|-------------|
| Import Fans | UserPlus (blue) | Import fans from CSV file |
| Send Broadcast | PaperPlane (green) | Opens SendBlastModal |
| Manage Segments | ListCheck (yellow) | Group fans by criteria |

**3.3.3 Fans List Section**
- Section title: "Fans List"
- Download button (top right)

**3.3.4 Search Mode Toggle**
- **Regular Search**: Text input + filter dropdown + sort dropdown
- **AI Search**: Natural language query input with quick query suggestions

**AI Search Quick Queries:**
- "Superfans with high LTV"
- "At risk fans"
- "New fans this month"
- "Low engagement score"

**3.3.5 Fans Table**
| Column | Description |
|--------|-------------|
| Full Name | Avatar + Name + Contact (email/phone) |
| FanRank | Numeric score (0-100) |
| LTV | Lifetime value in USD |
| Status | Badge: Superfan (green) / Regular (blue) / At Risk (yellow) |
| Actions | Ellipsis menu |

#### Data Structure
```typescript
interface Fan {
  id: string;
  name: string;
  contact: string;
  avatar: string;
  fanRank: number;
  ltv: number;
  status: "Superfan" | "Regular" | "At Risk";
}
```

---

### 3.4 ManageDropPage Screen (`/src/screens/ManageDropPage/ManageDropPage.tsx`)

#### Purpose
Comprehensive drop management interface with multiple functional tabs.

#### Layout
- Drop header with title and "Drop Page" external link
- Tab navigation
- Tab-specific content area

#### Tab Navigation
| Tab | Component |
|-----|-----------|
| Overview | Default view with drop details |
| Guests | `GuestsTab` |
| Registration | `RegistrationTab` |
| Blasts | `BlastsTab` |
| Insights | `InsightsTab` |
| More | `MoreTab` |

---

#### 3.4.1 Overview Tab

**Quick Actions (3 buttons)**
| Action | Icon Color | Function |
|--------|------------|----------|
| Invite Guests | Blue | Guest invitation flow |
| Send a Blast | Purple | Opens SendBlastModal |
| Share Drop | Red | Share functionality |

**Drop Preview Card**
- Drop image thumbnail (144x144)
- Title, date, time
- Host info with avatar
- Shareable link with copy button

**When & Where Section**
- Calendar-style date display
- Day, date, time with timezone
- "Edit Drop" and "Change Photo" buttons

**Invites Section**
- Empty state with envelope icon
- "Invite Guests" button
- Description of invite capability

**Guests Section**
- RSVP progress bar with count
- "Recent Registrations" list
- Guest cards showing:
  - Avatar, name, email
  - RSVP status badge
  - Registration date

**Hosts Section**
- Current hosts list
- "Add Host" button
- Host card with Creator badge

**Visibility & Discovery Section**
- Profile page visibility status
- Featured status (by AirDope)
- "Change Visibility" button

---

#### 3.4.2 Guests Tab (`GuestsTab.tsx`)

**Stats Cards (3 columns)**
| Metric | Icon | Description |
|--------|------|-------------|
| Total Fans | Users (purple) | 247, +18% from last drop |
| Today Fans | CheckCircle (green) | 189, fans who signed up today |
| New Fans | Ticket (blue) | 142, first-time interacting fans |

**Actions (3 buttons)**
- Invite Guests
- Send Reminder
- Export List

**Guest List Table**
| Column | Options |
|--------|---------|
| Guest Name | Avatar + name + contact |
| RSVP Status | Going (green) / Maybe (yellow) / Can't Go (red) / No Response (gray) |
| Check-In | Checked In (blue) / Pending (gray) / N/A |
| Guest Type | VIP (purple) / Regular (gray) |
| Actions | Ellipsis menu |

**Search Features**
- Regular search with filters (All Guests, RSVP Time)
- AI Search with quick queries:
  - "VIP guests"
  - "No-shows from last drop"
  - "First-time guests"
  - "Pending RSVP"

**Pagination**
- Shows "1-8 of 247 guests"
- Page number buttons with ellipsis

---

#### 3.4.3 Blasts Tab (`BlastsTab.tsx`)

**Blast Composer**
- Avatar + textarea for quick message
- "Advanced" link
- "Send" button

**Blast Info Card**
- Animated notification illustration (email, SMS, push icons)
- "Send a Blast" primary button

**Drop Day Message**
- Toggle switch to enable/disable
- Message textarea with validation
- Date and time pickers
- Recipient selector: "All fans" / "Only RSVPs for this Drop"

**Email Settings Card**
- Collapsible section
- Email subject line input
- Template selector ("Magic Template")
- "Send test" and "Save" buttons

**System Messages Section**

**Event Reminders Card**
- Master toggle for all reminders
- Individual reminder items:
  - 1 day before reminder
  - 1 hour before reminder
- Each reminder has:
  - Toggle switch
  - Message textarea
  - Recipient and schedule info

---

#### 3.4.4 Registration Tab (`RegistrationTab.tsx`)

**Registration Options (3 cards)**
| Option | Status |
|--------|--------|
| Registration | Open |
| Event Capacity | Unlimited |
| Group Registration | Off |

**Instagram/SMS Keywords**
- Toggle to enable keyword registration
- Keyword input field with add button
- Maximum 5 keywords per drop

**Instagram Comments**
- Toggle to enable comment-based signup
- Info card explaining feature

**Registration Email**
- Description of confirmation email
- "Customize Email" button

**Registration Questions**

*Personal Information:*
| Field | Setting |
|-------|---------|
| Name | Full Name (dropdown) |
| Email / Phone | Required |
| Social Account | Off (dropdown) |

*Custom Questions:*
- "Add Question" button

---

#### 3.4.5 Insights Tab (`InsightsTab.tsx`)

**Summary Cards (3 columns)**
| Metric | Value |
|--------|-------|
| Total Fans | 1 |
| Total Link Clicks | 0 |
| Conversion Rate | 0% |

**Fan Activity Chart**
- Time range selector: 24 hours / 28 days / Custom range
- Bar chart showing RSVP activity over time
- Date labels on x-axis

**Locations Section**
- City/Country toggle
- Location distribution with flag, count, percentage
- Progress bar visualization
- "Heatmap" and "Download full list" buttons

**Acquisition Channels**
- Donut chart with total in center
- Channel breakdown:
  - Email
  - SMS
  - Instagram
  - WhatsApp
  - Direct Link

**Acquisition Sources**
- Empty state: "Waiting for fans"

**Potential Influencers**
- Shows top fans by social follower count
- Empty state: "Waiting for fans"

**Registration Referrals**
- Unique referral link tracking
- Empty state: "No Referrals"

---

#### 3.4.6 More Tab (`MoreTab.tsx`)

**Clone Drop**
- Description: Copy drop settings (except guest list and blasts)
- "Clone Drop" button

**Event Page**
- URL customization (requires AirDope Plus)
- Public URL input with domain prefix
- "Update" button

**Embed Event**
- Embed type selector: "Embed as Button" / "Embed Drop Page"
- HTML code snippet display
- Live button preview
- Link to documentation

**Cancel Event**
- Warning: Permanent deletion, guest notification
- Red "Cancel Event" button

---

### 3.5 SendBlastModal Component (`SendBlastModal.tsx`)

#### Purpose
Modal for composing and sending multi-channel communications to fans.

#### Features

**Recipients Selection**
- **Simple Mode**:
  - All Fans (radio)
  - Specific Drops (radio + multi-select dropdown)
- **Advanced Targeting** (expandable panel):
  - Left sidebar: Sending count + navigation
  - Target by: Location, Drops, Drop segments, Imports, Signup type, Conversions

**Message Composition**
- Subject line (optional)
- Message textarea

**Channels Selection**
- AI mode: "Let AI choose best channels"
- Manual mode with checkboxes:
  - Email (default on)
  - SMS (default on)
  - WhatsApp
  - Instagram
  - TikTok

**Actions**
- Send button
- Schedule button
- Preview link

---

### 3.6 FansDropPage Screen (`/src/screens/FansDropPage/FansDropPage.tsx`)

#### Purpose
Public-facing drop landing page for fan signup.

#### Layout
- Two-column: Event artwork (left), Details + signup (right)
- Full-screen dark theme

#### Features

**Event Artwork**
- Large image display

**Event Title Block**
- Large uppercase title
- Creator avatar and name

**Signup Card**
- "Get notified" header
- Input mode toggle: Phone / Email buttons
- Email or phone input field
- "RSVP" submit button
- Terms and privacy policy links
- "Make a Drop like this" CTA

**Success State**
- "Check your email/phone" confirmation
- Share button
- "Make a drop like this" button
- AirDope branding

**Additional Details**
- Expandable description section
- Event details and platform info

---

## 4. Screen Flow

### 4.1 Creator Flow
```
DropsPage (Drops list)
    |
    +--> CreateDrop (New drop creation)
    |         |
    |         v
    |    [Drop Created] --> ManageDropPage
    |
    +--> ManageDropPage (via "Manage Drop" button)
              |
              +--> Overview Tab
              +--> Guests Tab
              +--> Registration Tab
              +--> Blasts Tab
              +--> Insights Tab
              +--> More Tab
```

### 4.2 Fan Flow
```
[Receives link/notification]
    |
    v
FansDropPage
    |
    +--> Enter email/phone
    +--> Submit RSVP
    |
    v
[Confirmation + Reminders]
```

---

## 5. Component Architecture

### 5.1 Shared Components
| Component | Location | Usage |
|-----------|----------|-------|
| Header | `/components/layout/Header.tsx` | All screens |
| Button | `/components/ui/button.tsx` | Throughout |
| Switch | `/components/ui/switch.tsx` | Toggles in settings |
| SendBlastModal | `/components/blasts/SendBlastModal.tsx` | FansPage, ManageDropPage, BlastsTab |

### 5.2 Screen-Specific Components
| Screen | Components |
|--------|------------|
| DropsPage | EventCard, EventGroup |
| ManageDropPage | GuestsTab, BlastsTab, RegistrationTab, InsightsTab, MoreTab |
| FansPage | StatCard, ActionCard, StatusBadge |

---

## 6. State Management

### 6.1 Local State (useState)
All screens use React's useState for local UI state:
- Tab selection
- Form inputs
- Modal visibility
- Toggle states

### 6.2 Mock Data
Currently using hardcoded mock data for:
- Events list
- Fan list
- Guest list
- Analytics metrics

---

## 7. Navigation Structure

### 7.1 Routes
| Path | Screen |
|------|--------|
| `/drops` | DropsPage |
| `/create-drop` | CreateDrop |
| `/manage-drop/:id` | ManageDropPage |
| `/fans` | FansPage |
| `/drop/:id` | FansDropPage |

---

## 8. Design System

### 8.1 Color Tokens
| Token | Usage |
|-------|-------|
| `brand-gray-100` | Muted text |
| `brand-gray-200` | Borders, dividers |
| `brand-gray-300` | Card backgrounds, inputs |
| `brand-gray-400` | Darker card backgrounds |
| `brand-dark` | Dark theme base |
| `purple-400/500` | Primary accent |
| `green-400/500` | Success states |
| `blue-400/500` | Info states |
| `yellow-400/500` | Warning states |
| `red-400/500/600` | Error/danger states |

### 8.2 Typography
- Font Family: Inter
- Large titles: 32-48px, font-bold
- Section titles: 20-24px, font-bold
- Body: 13-14px
- Small/labels: 10-12px

### 8.3 Spacing
- Section gaps: 12-16 spacing units
- Card padding: 16-24px
- Input padding: 12-16px

### 8.4 Border Radius
- Cards: rounded-2xl (16px)
- Buttons: rounded-lg (8px)
- Inputs: rounded-lg (8px)
- Tags/badges: rounded-full

---

## 9. Future Considerations

*Note: The following are not currently implemented but represent potential enhancement areas based on the existing architecture:*

- Real-time data synchronization
- Push notification integration
- Advanced analytics dashboards
- Payment/ticketing integration
- Multi-language support
- Accessibility enhancements

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-21 | Product Team | Initial PRD based on current implementation |
