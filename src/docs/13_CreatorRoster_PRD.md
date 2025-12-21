# Creator Roster PRD

## 1. Overview
The **Creator Roster** is a talent management system within the Promotion module. It allows creators to build and manage a network of influencers, collaborators, and brand ambassadors for campaigns. Think of it as a CRM specifically for creator partnerships.

## 2. User Stories

### Roster Management
* **As a Creator**, I want to add influencers to my roster so I can quickly invite them to campaigns.
* **As a Creator**, I want to categorize creators by niche (Music, Tech, Lifestyle) so I can find the right fit for each campaign.
* **As a Creator**, I want to track each creator's performance history so I can make data-driven partnership decisions.

### Discovery & Outreach
* **As a Creator**, I want to discover new creators based on audience demographics so I can expand my network.
* **As a Creator**, I want to send partnership invitations directly from the platform.
* **As a Creator**, I want to see a creator's rate card and availability before reaching out.

### Relationship Tracking
* **As a Creator**, I want to see all past collaborations with a creator in one place.
* **As a Creator**, I want to rate creators after campaigns to build institutional knowledge.
* **As a Creator**, I want to set reminders for follow-up with potential partners.

## 3. Key Features & Components

### 3.1. Roster List View
* **Component:** `CreatorRosterList`
* **Features:**
  * Grid/List toggle view
  * Search by name, handle, or niche
  * Filter by: Status (Active, Pending, Archived), Niche, Performance tier
  * Sort by: Recent activity, Engagement rate, Total earnings

### 3.2. Creator Card
* **Component:** `CreatorCard`
* **Elements:**
  * Avatar and verified badge
  * Name and primary handle
  * Niche tags (e.g., "Tech", "Music", "Lifestyle")
  * Follower count (aggregated across platforms)
  * Engagement rate
  * Collaboration count
  * Status badge (Active Partner, Invited, Prospect)
  * Quick actions: View Profile, Invite to Campaign, Message

### 3.3. Creator Profile Modal
* **Component:** `CreatorProfileModal`
* **Sections:**
  * **Overview:** Bio, connected platforms, audience demographics
  * **Stats:** Avg engagement, reach, content frequency
  * **History:** Past campaigns, earnings, deliverables
  * **Rate Card:** Content type pricing (Post, Story, Reel, Video)
  * **Notes:** Internal notes from team
  * **Actions:** Edit, Archive, Invite to Campaign

### 3.4. Add Creator Flow
* **Component:** `AddCreatorModal`
* **Methods:**
  * Manual entry (Name, handle, platform)
  * Import from Instagram/TikTok (OAuth search)
  * Bulk import via CSV
* **Required Fields:** Name, Primary Platform, Handle
* **Optional Fields:** Email, Niche, Rate Card, Notes

### 3.5. Roster Stats Dashboard
* **Component:** `RosterStatsCards`
* **Metrics:**
  * Total Creators in roster
  * Active Partnerships
  * Pending Invitations
  * Avg Engagement Rate (across roster)

## 4. User Flow

### Adding a Creator
1. User navigates to `/promotion` → "Creator Roster" tab
2. User clicks "Add Creator" button
3. User enters creator's Instagram handle
4. System fetches public profile data
5. User reviews and adds niche tags
6. Creator is added to roster as "Prospect"

### Inviting to Campaign
1. User views a creator in the roster
2. User clicks "Invite to Campaign"
3. User selects target campaign from dropdown
4. System sends invitation (email/DM based on settings)
5. Creator status updates to "Invited"

## 5. Data Models

### RosterCreator
```typescript
interface RosterCreator {
  id: string;
  name: string;
  handles: {
    platform: "instagram" | "tiktok" | "youtube" | "twitter";
    handle: string;
    followers: number;
    isVerified: boolean;
  }[];
  avatar: string;
  email?: string;
  niche: string[];
  status: "prospect" | "invited" | "active" | "archived";
  stats: {
    avgEngagement: number;
    totalReach: number;
    collaborationCount: number;
    totalEarnings: number;
  };
  rateCard?: {
    post: number;
    story: number;
    reel: number;
    video: number;
  };
  notes: string;
  addedAt: Date;
  lastCollaboration?: Date;
}
```

### CreatorInvitation
```typescript
interface CreatorInvitation {
  id: string;
  creatorId: string;
  campaignId: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentAt: Date;
  respondedAt?: Date;
  message?: string;
}
```

## 6. Acceptance Criteria

### Roster List
- [ ] Displays all creators with pagination (20 per page)
- [ ] Search returns results within 300ms
- [ ] Filters persist across page navigation
- [ ] Grid/List toggle preserves selection
- [ ] Empty state shows "Add your first creator" CTA

### Creator Card
- [ ] Shows aggregated follower count across platforms
- [ ] Engagement rate displays with trend indicator
- [ ] Status badge colors match design system
- [ ] Quick actions are accessible via hover or kebab menu

### Add Creator
- [ ] Instagram handle lookup returns profile within 2s
- [ ] CSV import supports up to 500 rows
- [ ] Duplicate detection warns before adding
- [ ] Required field validation prevents submission

## 7. Error States

| Scenario | Error Message | User Action |
|----------|--------------|-------------|
| Handle not found | "We couldn't find this creator. Check the handle and try again." | Edit handle field |
| Private account | "This account is private. The creator needs to accept our request." | Send follow request |
| Import failed | "Some rows couldn't be imported. Download error report." | Download CSV with errors |
| Invitation failed | "Invitation couldn't be sent. Check contact info." | Edit creator profile |
| Rate limit | "Instagram API limit reached. Try again in 1 hour." | Show countdown timer |

## 8. Empty States

| State | Message | Call to Action |
|-------|---------|----------------|
| No creators | "Your roster is empty" | "Add your first creator" button |
| No search results | "No creators match your search" | "Clear filters" link |
| No active partners | "No active partnerships yet" | "Invite creators to campaigns" |

## 9. UI/UX Details
* **Theme:** Dark mode with purple accents
* **Card Layout:** 3-column grid on desktop, 1-column on mobile
* **Avatar Size:** 48px in list, 80px in profile modal
* **Niche Tags:** Pill-shaped, muted background colors
* **Status Colors:**
  * Prospect: Gray
  * Invited: Yellow
  * Active: Green
  * Archived: Red (muted)

## 10. Technical Notes
* **Instagram API:** Use Instagram Basic Display API for public profile data
* **Rate Limiting:** Cache creator profiles for 24 hours
* **CSV Import:** Process in background, notify on completion
* **Search:** Implement debounced search (300ms delay)

## 11. Future Considerations
* AI-powered creator recommendations based on audience overlap
* Automated outreach sequences
* Contract and payment management integration
* Creator-side portal for accepting invitations
