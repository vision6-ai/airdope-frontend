import React, { useState } from "react";
import { Header } from "../../components/layout/Header";
import { CampaignStatsCard } from "../../components/promotion/CampaignStatsCard";
import { CampaignCard, Campaign } from "../../components/promotion/CampaignCard";
import { AdsTab } from "../../components/promotion/AdsTab";

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: '"Midnight Bloom" Album Launch',
    dateRange: "Social Media • Jun 01 - Aug 31",
    status: "active",
    creators: {
      avatars: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      ],
      count: 15,
    },
    budget: {
      spent: 1.8,
      total: 2.5,
    },
    bottomText: "3 Approvals Pending",
    bottomIcon: "fa-solid fa-check-double text-yellow-400",
    actionText: "Manage",
    statusColor: "green",
    borderColor: "bg-green-500",
  },
  {
    id: "2",
    title: "Summer Tour Announcement",
    dateRange: "Email & SMS • May 15 - May 30",
    status: "completed",
    creators: {
      avatars: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      ],
      count: 2,
    },
    budget: {
      spent: 0.5,
      total: 0.5,
    },
    bottomText: "Completed on May 30",
    bottomIcon: "fa-solid fa-check-circle text-green-400",
    actionText: "View Report",
    statusColor: "gray",
    borderColor: "bg-gray-500",
  },
  {
    id: "3",
    title: "New Single Pre-Save",
    dateRange: "Link in Bio • Starts Jul 01",
    status: "scheduled",
    creators: {
      avatars: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      ],
      count: 5,
    },
    budget: {
      spent: 0.0,
      total: 0.2,
    },
    bottomText: "Starts in 12 days",
    bottomIcon: "fa-solid fa-rocket",
    actionText: "Manage",
    statusColor: "blue",
    borderColor: "bg-blue-500",
  },
  {
    id: "4",
    title: "Holiday Gift Guide",
    dateRange: "Lifestyle • Nov 20 - Dec 25",
    status: "draft",
    creators: undefined,
    bottomText: "Last edited 2d ago",
    bottomIcon: "fa-regular fa-clock",
    actionText: "Continue Setup",
    statusColor: "gray",
    borderColor: "bg-gray-400",
  },
];

export function PromotionPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "roster" | "ads">(
    "campaigns"
  );

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="relative z-[1]">
        <Header />

        <nav className="sticky top-16 z-10 bg-transparent backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center space-x-8">
              {["campaigns", "roster", "ads"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>
                    {tab === "campaigns"
                      ? "Campaigns"
                      : tab === "roster"
                      ? "Creator Roster"
                      : "Ads"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 py-12">
          {activeTab === "campaigns" && (
            <>
              <section className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Campaigns
                </h1>
                <button className="bg-[#2E3031] hover:bg-[#3a3b3c] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-2">
                  <i className="fa-solid fa-plus"></i>
                  <span>Create Campaign</span>
                </button>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <CampaignStatsCard
                  label="Active Campaigns"
                  value="12"
                  icon="fa-solid fa-rocket"
                  iconBg="bg-green-500/20"
                  iconColor="text-green-400"
                  trendText="3 Paused, 2 Completed this month"
                  trendDirection="up"
                  trendColor="text-gray-400"
                />
                <CampaignStatsCard
                  label="Total Reach (30d)"
                  value="1.2M"
                  icon="fa-solid fa-bullseye"
                  iconBg="bg-blue-500/20"
                  iconColor="text-blue-400"
                  trendText="15% from last 30d"
                  trendDirection="up"
                  trendColor="text-green-400"
                />
                <CampaignStatsCard
                  label="Avg. Conversion Rate"
                  value="4.7%"
                  icon="fa-solid fa-arrow-pointer"
                  iconBg="bg-amber-500/20"
                  iconColor="text-amber-400"
                  trendText="-0.5% from last month"
                  trendDirection="down"
                  trendColor="text-red-400"
                />
              </section>

              <section className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-grow min-w-[300px]">
                      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-100"></i>
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full bg-brand-gray-300 border border-transparent focus:border-white/30 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder-brand-gray-100 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      />
                    </div>
                    <button className="flex items-center space-x-2 bg-brand-gray-300 hover:bg-brand-gray-200 px-4 py-2.5 rounded-lg text-white font-medium transition-colors">
                      <i className="fa-solid fa-filter text-brand-gray-100"></i>
                      <span>Status: All</span>
                      <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      title="Export Data"
                      className="w-9 h-9 flex items-center justify-center bg-brand-gray-300 hover:bg-brand-gray-200 rounded-lg text-brand-gray-100 hover:text-white transition-colors"
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}

                  <div className="border-2 border-dashed border-brand-gray-200/50 rounded-2xl flex items-center justify-center h-64 hover:border-white/30 hover:bg-brand-gray-400/30 transition-all cursor-pointer group">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-brand-gray-300 group-hover:bg-[#2E3031] flex items-center justify-center mx-auto transition-colors">
                        <i className="fa-solid fa-plus text-white text-xl"></i>
                      </div>
                      <p className="mt-3 font-semibold text-white">Create New Campaign</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === "roster" && (
            <div className="text-center py-16">
              <p className="text-brand-gray-100 text-lg">Creator Roster coming soon</p>
            </div>
          )}

          {activeTab === "ads" && <AdsTab />}
        </main>

        <footer className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="border-t border-white/10 pt-8"></div>
        </footer>
      </div>
    </div>
  );
}
