import React from "react";

interface AdCardProps {
  platform: "instagram" | "tiktok" | "facebook" | "youtube";
  title: string;
  audience: string;
  spend: string;
  reach: string;
  roas: string;
  status: "active" | "paused";
}

const platformConfig = {
  instagram: {
    icon: "fa-brands fa-instagram",
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  tiktok: {
    icon: "fa-brands fa-tiktok",
    bg: "bg-black",
  },
  facebook: {
    icon: "fa-brands fa-facebook",
    bg: "bg-blue-600",
  },
  youtube: {
    icon: "fa-brands fa-youtube",
    bg: "bg-red-600",
  },
};

function AdCard({ platform, title, audience, spend, reach, roas, status }: AdCardProps) {
  const config = platformConfig[platform];

  return (
    <div className="bg-[#1C1C1E]/20 border border-[#3A3A3C]/10 rounded-lg p-4 hover:border-[#6B43F7]/30 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
            <i className={`${config.icon} text-white text-lg`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-[#8A8A8E] text-xs truncate">{audience}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 ml-4">
          <div className="text-center">
            <p className="text-xs text-[#8A8A8E]">Spend</p>
            <p className="text-sm font-semibold text-white">{spend}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#8A8A8E]">Reach</p>
            <p className="text-sm font-semibold text-white">{reach}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#8A8A8E]">ROAS</p>
            <p className={`text-sm font-semibold ${roas === "-" ? "text-gray-400" : "text-green-400"}`}>{roas}</p>
          </div>
          {status === "active" ? (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400">
              <i className="fa-solid fa-circle fa-beat mr-1.5 text-[5px]"></i>Active
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-500/20 text-yellow-400">
              <i className="fa-solid fa-pause mr-1.5 text-[6px]"></i>Paused
            </span>
          )}
          <button className="w-7 h-7 flex items-center justify-center hover:bg-[#2C2C2E]/50 rounded-lg text-[#8A8A8E] hover:text-white transition-colors">
            <i className="fa-solid fa-ellipsis text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  subtext: string;
  trend?: {
    direction: "up" | "down";
    text: string;
  };
}

function StatCard({ label, value, icon, subtext, trend }: StatCardProps) {
  return (
    <div className="bg-[#1C1C1E]/30 border border-[#3A3A3C]/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[#8A8A8E] text-sm font-medium">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-[#2C2C2E]/50 flex items-center justify-center">
          <i className={`${icon} text-[#8A8A8E] text-sm`}></i>
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {trend ? (
        <p className={`text-xs mt-1 flex items-center space-x-1 ${trend.direction === "up" ? "text-green-400" : "text-green-400"}`}>
          <i className={`fa-solid fa-arrow-${trend.direction}`}></i>
          <span>{trend.text}</span>
        </p>
      ) : (
        <p className="text-xs text-[#8A8A8E] mt-1">{subtext}</p>
      )}
    </div>
  );
}

const mockAds: AdCardProps[] = [
  {
    platform: "instagram",
    title: "Instagram Story Campaign",
    audience: "Tech enthusiasts, 18-34",
    spend: "$1,240",
    reach: "324K",
    roas: "3.2x",
    status: "active",
  },
  {
    platform: "tiktok",
    title: "TikTok Video Ads",
    audience: "Gen Z, Tech lovers",
    spend: "$1,680",
    reach: "428K",
    roas: "4.1x",
    status: "active",
  },
  {
    platform: "facebook",
    title: "Facebook Feed Ads",
    audience: "Lifestyle enthusiasts, 25-45",
    spend: "$920",
    reach: "156K",
    roas: "2.8x",
    status: "active",
  },
  {
    platform: "instagram",
    title: "Instagram Reels Campaign",
    audience: "Young professionals, 22-35",
    spend: "$440",
    reach: "89K",
    roas: "3.5x",
    status: "active",
  },
  {
    platform: "youtube",
    title: "YouTube Pre-Roll Ads",
    audience: "Tech reviewers audience",
    spend: "$0",
    reach: "0",
    roas: "-",
    status: "paused",
  },
];

export function AdsTab() {
  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Campaign Ads</h2>
          <p className="text-[#8A8A8E] mt-1">Monitor and manage your active advertising campaigns</p>
        </div>
        <button className="bg-[#6B43F7] hover:bg-[#8A6FF9] text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2 text-sm">
          <i className="fa-solid fa-plus"></i>
          <span>Create Ad</span>
        </button>
      </div>

      <div className="mb-8 bg-gradient-to-r from-[#6B43F7]/10 to-purple-900/10 border border-[#6B43F7]/20 rounded-xl p-5">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-[#6B43F7]/20 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-wand-magic-sparkles text-[#6B43F7]"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
              <span>AI Ad Manager</span>
              <span className="bg-[#6B43F7]/20 text-[#8A6FF9] text-xs font-medium px-2 py-0.5 rounded-full">Beta</span>
            </h3>
            <div className="relative">
              <i className="fa-solid fa-sparkles absolute left-4 top-1/2 -translate-y-1/2 text-[#6B43F7]"></i>
              <input
                type="text"
                placeholder='Try: "Stop all running ads" or "Focus only on TikTok, pause Instagram ads"'
                className="w-full bg-[#1C1C1E]/50 border border-[#3A3A3C]/20 rounded-lg pl-11 pr-24 py-3 text-sm text-white placeholder-[#8A8A8E] focus:ring-2 focus:ring-[#6B43F7] focus:border-[#6B43F7] outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6B43F7] hover:bg-[#8A6FF9] text-white font-semibold px-4 py-1.5 rounded-md transition-colors text-xs">
                Execute
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Total Spend"
          value="$4,280"
          icon="fa-solid fa-dollar-sign"
          subtext=""
          trend={{ direction: "down", text: "12% below budget" }}
        />
        <StatCard
          label="Active Ads"
          value="5"
          icon="fa-solid fa-bullhorn"
          subtext="Across 3 platforms"
        />
        <StatCard
          label="Total Reach"
          value="842K"
          icon="fa-solid fa-eye"
          subtext=""
          trend={{ direction: "up", text: "18% vs last week" }}
        />
        <StatCard
          label="Conversions"
          value="1,247"
          icon="fa-solid fa-check-circle"
          subtext="CVR: 3.2%"
        />
      </div>

      <div className="space-y-3">
        {mockAds.map((ad, index) => (
          <AdCard key={index} {...ad} />
        ))}
      </div>
    </>
  );
}
