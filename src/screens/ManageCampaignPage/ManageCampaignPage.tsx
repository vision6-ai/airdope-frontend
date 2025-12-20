import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { CampaignTimeline, CreatorsBoard } from "../../components/campaign";

interface CampaignData {
  id: string;
  title: string;
  category: string;
  dateRange: string;
  status: "active" | "completed" | "scheduled" | "draft";
  creators: string[];
  stats: {
    totalSpent: number;
    budgetLimit: number;
    pendingDrafts: number;
    totalDrafts: number;
    avgEngagement: number;
    engagementChange: number;
    daysLeft: number;
    endDate: string;
  };
}

const mockCampaignData: Record<string, CampaignData> = {
  "1": {
    id: "1",
    title: "Summer Launch '24",
    category: "Tech & Lifestyle",
    dateRange: "June 01 - Aug 31",
    status: "active",
    creators: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    ],
    stats: {
      totalSpent: 8125,
      budgetLimit: 12500,
      pendingDrafts: 3,
      totalDrafts: 12,
      avgEngagement: 4.8,
      engagementChange: 1.2,
      daysLeft: 42,
      endDate: "Aug 31",
    },
  },
  "2": {
    id: "2",
    title: "Summer Tour Announcement",
    category: "Email & SMS",
    dateRange: "May 15 - May 30",
    status: "completed",
    creators: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    ],
    stats: {
      totalSpent: 500,
      budgetLimit: 500,
      pendingDrafts: 0,
      totalDrafts: 5,
      avgEngagement: 3.2,
      engagementChange: 0.5,
      daysLeft: 0,
      endDate: "May 30",
    },
  },
  "3": {
    id: "3",
    title: "New Single Pre-Save",
    category: "Link in Bio",
    dateRange: "Starts Jul 01",
    status: "scheduled",
    creators: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    ],
    stats: {
      totalSpent: 0,
      budgetLimit: 200,
      pendingDrafts: 0,
      totalDrafts: 0,
      avgEngagement: 0,
      engagementChange: 0,
      daysLeft: 12,
      endDate: "Jul 31",
    },
  },
};

type TabType = "creators" | "discovery" | "ads" | "payments";

export function ManageCampaignPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("creators");

  const campaign = mockCampaignData[id || "1"] || mockCampaignData["1"];
  const budgetPercentage = (campaign.stats.totalSpent / campaign.stats.budgetLimit) * 100;

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "creators", label: "Creators Board", icon: "fa-solid fa-table-columns" },
    { id: "discovery", label: "Discovery", icon: "fa-solid fa-search" },
    { id: "ads", label: "Ads", icon: "fa-solid fa-ad" },
    { id: "payments", label: "Payments", icon: "fa-solid fa-credit-card" },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="relative z-[1]">
        <Header />

        <main className="max-w-7xl mx-auto px-8 py-10">
          <section className="mb-8">
            <Link
              to="/promotion"
              className="inline-flex items-center text-sm text-brand-gray-100 hover:text-white mb-4 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Campaigns
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                  {campaign.title}
                </h1>
                <div className="flex items-center space-x-4 mt-2 text-brand-gray-100 text-sm">
                  {campaign.status === "active" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/20 text-green-400">
                      <i className="fa-solid fa-circle fa-beat mr-1.5 text-[6px]"></i>
                      ACTIVE
                    </span>
                  )}
                  {campaign.status === "completed" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-500/20 text-gray-400">
                      <i className="fa-solid fa-check mr-1.5 text-[8px]"></i>
                      COMPLETED
                    </span>
                  )}
                  {campaign.status === "scheduled" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400">
                      <i className="fa-solid fa-clock mr-1.5 text-[8px]"></i>
                      SCHEDULED
                    </span>
                  )}
                  <span className="text-gray-500">|</span>
                  <span>{campaign.category}</span>
                  <span className="text-gray-500">|</span>
                  <span>{campaign.dateRange}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center -space-x-2">
                  {campaign.creators.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt={`Creator ${idx + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-brand-dark object-cover"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                    +3
                  </div>
                </div>
                <button className="bg-white hover:bg-gray-200 text-brand-dark font-semibold px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm">
                  <i className="fa-solid fa-plus"></i>
                  <span>New Creator</span>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-brand-gray-400/50 hover:bg-brand-gray-300 rounded-lg text-brand-gray-100 hover:text-white transition-colors">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>

            <nav className="mt-8 border-b border-white/10">
              <div className="flex items-center space-x-8 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative font-medium py-3 text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <i className={tab.icon}></i>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-brand-gray-100 font-medium">Total Spent</span>
                <div className="text-brand-gray-100">
                  <i className="fa-solid fa-wallet"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-3">
                ${campaign.stats.totalSpent.toLocaleString()}
              </div>
              <div className="w-full bg-brand-gray-300 rounded-full h-1.5">
                <div
                  className="bg-white h-1.5 rounded-full"
                  style={{ width: `${budgetPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-brand-gray-100 font-medium">Pending Drafts</span>
                <div className="text-brand-gray-100">
                  <i className="fa-regular fa-clock"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <span className="text-white">{campaign.stats.pendingDrafts}</span>{" "}
                <span className="text-brand-gray-100 text-2xl">/ {campaign.stats.totalDrafts}</span>
              </div>
              {campaign.stats.pendingDrafts > 0 && (
                <div className="text-xs text-yellow-400 font-semibold">Action Required</div>
              )}
            </div>

            <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-brand-gray-100 font-medium">Avg. Engagement</span>
                <div className="text-brand-gray-100">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {campaign.stats.avgEngagement}%
              </div>
              {campaign.stats.engagementChange > 0 && (
                <div className="flex items-center text-xs text-green-400">
                  <i className="fa-solid fa-arrow-up mr-1"></i>
                  <span>{campaign.stats.engagementChange}% vs last month</span>
                </div>
              )}
            </div>

            <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-5 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-brand-gray-100 font-medium">Days Left</span>
                <div className="text-brand-gray-100">
                  <i className="fa-regular fa-calendar-days"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{campaign.stats.daysLeft}</div>
              <div className="text-xs text-brand-gray-100">Ends {campaign.stats.endDate}</div>
            </div>
          </section>

          {activeTab === "creators" && (
            <>
              <CampaignTimeline />
              <CreatorsBoard />
            </>
          )}

          {activeTab === "discovery" && (
            <div className="text-center py-16">
              <p className="text-brand-gray-100 text-lg">Creator Discovery coming soon</p>
            </div>
          )}

          {activeTab === "ads" && (
            <div className="text-center py-16">
              <p className="text-brand-gray-100 text-lg">Campaign Ads coming soon</p>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="text-center py-16">
              <p className="text-brand-gray-100 text-lg">Payments section coming soon</p>
            </div>
          )}
        </main>

        <footer className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="border-t border-white/10 pt-8"></div>
        </footer>
      </div>
    </div>
  );
}
