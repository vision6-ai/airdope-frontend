# Campaign Discovery PRD

## 1. Overview
The **Discovery** tab within Manage Campaign provides AI-powered creator discovery and recommendation tools. It helps creators find the perfect influencer partners for their campaigns based on audience match, engagement metrics, and content style alignment.

## 2. User Stories

### Finding Creators
* **As a Creator**, I want to search for creators by niche and audience demographics so I can find relevant partners.
* **As a Creator**, I want to see AI-recommended creators based on my campaign goals so I can save time on research.
* **As a Creator**, I want to filter creators by follower count, engagement rate, and location.

### Evaluating Creators
* **As a Creator**, I want to see detailed audience insights for potential partners.
* **As a Creator**, I want to compare multiple creators side-by-side.
* **As a Creator**, I want to preview a creator's content style before reaching out.

### Taking Action
* **As a Creator**, I want to save creators to a shortlist for later review.
* **As a Creator**, I want to send collaboration requests directly from the discovery view.
* **As a Creator**, I want to add discovered creators to my roster.

## 3. Key Features & Components

### 3.1. AI Search Bar
* **Component:** `DiscoverySearchBar`
* **Features:**
  * Natural language search ("Find tech reviewers in LA with 50k+ followers")
  * Auto-suggestions based on campaign context
  * Recent searches history
  * Search filters inline (Platform, Location, Followers, Engagement)

### 3.2. AI Recommendations Panel
* **Component:** `AIRecommendationsPanel`
* **Features:**
  * "Recommended for this campaign" section
  * Match score (0-100%) based on audience overlap
  * Reasoning explanation ("High engagement with tech content")
  * Refresh recommendations button
  * Dismiss/Save actions per recommendation

### 3.3. Creator Discovery Grid
* **Component:** `DiscoveryGrid`
* **Card Elements:**
  * Profile preview (avatar, name, handle)
  * Platform icons with follower counts
  * Engagement rate badge
  * Location flag
  * Top content categories
  * "Add to Roster" / "Invite" quick actions
  * "View Profile" expansion

### 3.4. Filter Sidebar
* **Component:** `DiscoveryFilters`
* **Filters:**
  * **Platform:** Instagram, TikTok, YouTube, Twitter
  * **Follower Range:** 1K-10K, 10K-50K, 50K-100K, 100K-500K, 500K+
  * **Engagement Rate:** >1%, >3%, >5%, >10%
  * **Location:** Country, City
  * **Language:** Primary content language
  * **Content Type:** Photo, Video, Stories, Reels
  * **Niche:** Music, Tech, Fashion, Fitness, Gaming, etc.

### 3.5. Creator Preview Modal
* **Component:** `CreatorPreviewModal`
* **Sections:**
  * **Header:** Avatar, name, bio, primary platform
  * **Audience:** Demographics (age, gender, location breakdown)
  * **Content:** Recent posts grid with engagement metrics
  * **Performance:** Engagement trend chart (30 days)
  * **Rate Card:** If available, estimated cost per post
  * **Actions:** Add to Roster, Invite to Campaign, Share

### 3.6. Comparison View
* **Component:** `CreatorComparisonView`
* **Features:**
  * Compare up to 3 creators side-by-side
  * Metrics: Followers, Engagement, Avg Likes, Avg Comments
  * Audience overlap visualization
  * Cost-per-engagement estimate

### 3.7. Shortlist Drawer
* **Component:** `ShortlistDrawer`
* **Features:**
  * Persistent sidebar showing saved creators
  * Quick remove action
  * "Invite All" batch action
  * Export shortlist to CSV

## 4. User Flow

### AI-Powered Search
1. User navigates to Campaign → Discovery tab
2. User types: "Find beauty influencers in NYC with high engagement"
3. AI parses query and sets filters automatically
4. Results display with match scores
5. User saves top picks to shortlist

### Manual Filtering
1. User opens filter sidebar
2. User selects: Instagram, 50K-100K followers, >5% engagement, USA
3. Grid updates with matching creators
4. User clicks creator card to expand preview
5. User clicks "Add to Roster" to save

### Bulk Invitation
1. User adds 5 creators to shortlist
2. User opens shortlist drawer
3. User clicks "Invite All"
4. Modal opens with campaign details and message template
5. Invitations sent, shortlist cleared

## 5. Data Models

### DiscoveredCreator
```typescript
interface DiscoveredCreator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  platform: "instagram" | "tiktok" | "youtube" | "twitter";
  followers: number;
  engagementRate: number;
  location: {
    country: string;
    city?: string;
  };
  language: string;
  niches: string[];
  recentContent: {
    thumbnail: string;
    likes: number;
    comments: number;
    type: "photo" | "video" | "reel";
  }[];
  audienceDemo?: {
    ageRanges: { range: string; percent: number }[];
    genderSplit: { male: number; female: number; other: number };
    topLocations: { location: string; percent: number }[];
  };
  estimatedCost?: {
    post: number;
    story: number;
    reel: number;
  };
  matchScore?: number;
  matchReason?: string;
}
```

### DiscoveryQuery
```typescript
interface DiscoveryQuery {
  text?: string;
  filters: {
    platforms?: string[];
    followerMin?: number;
    followerMax?: number;
    engagementMin?: number;
    location?: string;
    language?: string;
    niches?: string[];
  };
  campaignId: string;
  sortBy: "relevance" | "followers" | "engagement" | "cost";
}
```

## 6. Acceptance Criteria

### AI Search
- [ ] Natural language queries return relevant results within 2s
- [ ] Filters auto-populate from query parsing
- [ ] "No results" state suggests query refinements
- [ ] Search history persists across sessions

### Discovery Grid
- [ ] Infinite scroll loads 20 creators at a time
- [ ] Cards display platform-appropriate metrics
- [ ] Match scores visible for AI recommendations
- [ ] Hover state reveals quick actions

### Filters
- [ ] Multiple filters combine with AND logic
- [ ] Filter changes trigger instant refresh
- [ ] Active filters shown as removable pills
- [ ] "Clear All" resets to default state

### Comparison
- [ ] Up to 3 creators can be compared
- [ ] Metrics align in comparable columns
- [ ] Winner highlighting for best metric
- [ ] Export comparison as image/PDF

## 7. Error States

| Scenario | Error Message | User Action |
|----------|--------------|-------------|
| No results | "No creators match your criteria. Try broadening your search." | Suggest filter removals |
| API timeout | "Search is taking longer than expected. Please retry." | Retry button |
| Rate limited | "Too many searches. Please wait 1 minute." | Countdown timer |
| Profile unavailable | "This creator's profile is currently unavailable." | Remove from results |
| Quota exceeded | "You've reached your monthly discovery limit." | Upgrade CTA |

## 8. Empty States

| State | Message | Call to Action |
|-------|---------|----------------|
| Initial load | "Discover creators for your campaign" | Search bar highlighted |
| No matches | "No creators found" | "Try different filters" or AI suggestions |
| Empty shortlist | "Your shortlist is empty" | "Save creators as you browse" |

## 9. UI/UX Details
* **Theme:** Dark mode with purple accent for AI features
* **Grid:** 3 columns on desktop, responsive to 1 column on mobile
* **Cards:** Rounded corners, subtle border, hover elevation
* **Match Score:** Circular progress indicator with percentage
* **AI Elements:** Sparkle icon, gradient highlights
* **Filters:** Collapsible sidebar, sticky on scroll

## 10. Technical Notes
* **AI Search:** Uses NLP to parse queries, maps to structured filters
* **Data Sources:** Instagram Graph API, TikTok API, third-party data providers
* **Caching:** Cache search results for 1 hour
* **Rate Limits:** 100 searches per day, 500 profile views per day
* **Match Algorithm:** Audience overlap + engagement + content style similarity

## 11. Future Considerations
* Predictive performance modeling ("Estimated ROI if you partner")
* Automated outreach sequences based on discovery
* Integration with influencer marketing platforms
* Fake follower detection and authenticity scoring
