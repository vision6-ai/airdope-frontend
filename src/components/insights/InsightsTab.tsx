import React, { useState } from "react";

export function InsightsTab() {
  return (
    <div className="space-y-8">
      <SummaryCards />
      <FanActivitySection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LocationsSection />
        <AcquisitionChannelsSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AcquisitionSourcesSection />
        <PotentialInfluencersSection />
      </div>
      <RegistrationReferralsSection />
    </div>
  );
}

function SummaryCards() {
  const cards = [
    { label: "Total Fans", value: "1", icon: "fa-solid fa-users" },
    { label: "Total Link Clicks", value: "0", icon: "fa-solid fa-link" },
    { label: "Conversion Rate", value: "0%", icon: "fa-solid fa-chart-line" },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-brand-gray-100 text-sm font-medium">
              {card.label}
            </span>
            <i className={`${card.icon} text-purple-400 text-sm`} />
          </div>
          <div className="text-3xl font-bold text-white">{card.value}</div>
        </div>
      ))}
    </section>
  );
}

function FanActivitySection() {
  const [activeRange, setActiveRange] = useState("28 days");
  const ranges = ["24 hours", "28 days", "Custom range"];

  const chartData = [
    { date: "Nov 21", value: 0 },
    { date: "Nov 25", value: 0 },
    { date: "Nov 29", value: 0 },
    { date: "Dec 03", value: 0 },
    { date: "Dec 07", value: 0 },
    { date: "Dec 11", value: 0 },
    { date: "Dec 13", value: 0.2 },
    { date: "Dec 14", value: 0.8 },
    { date: "Dec 15", value: 1 },
    { date: "Dec 16", value: 0.7 },
    { date: "Dec 17", value: 0.1 },
    { date: "Dec 19", value: 0 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Fan activity</h2>
          <p className="text-brand-gray-100 text-sm">
            Track RSVPs, link clicks, and upsell activity across your drops
          </p>
        </div>
        <div className="flex items-center text-sm bg-brand-gray-300/80 border border-brand-gray-200/50 rounded-lg p-1">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 rounded-md transition ${
                activeRange === range
                  ? "bg-brand-gray-200/80 text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-0.5 bg-blue-400 rounded" />
        <span className="text-sm text-brand-gray-100">1 Rsvp</span>
      </div>
      <div className="h-[250px] flex items-end justify-between px-2 border-l border-b border-brand-gray-200/50 relative">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 -ml-8 text-xs text-brand-gray-100">
          <span>1</span>
          <span>0.5</span>
          <span>0</span>
        </div>
        {chartData.map((point, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex justify-center mb-2">
              <div
                className="w-2 bg-gradient-to-t from-blue-500/20 to-blue-400 rounded-t"
                style={{ height: `${(point.value / maxValue) * 200}px` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-brand-gray-100 px-2">
        {chartData.filter((_, i) => i % 2 === 0).map((point) => (
          <span key={point.date}>{point.date}</span>
        ))}
      </div>
    </section>
  );
}

function LocationsSection() {
  const [activeView, setActiveView] = useState("Country");
  const views = ["City", "Country"];

  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Locations</h2>
        <div className="flex items-center text-sm bg-brand-gray-300/80 border border-brand-gray-200/50 rounded-lg p-1">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1 rounded-md transition ${
                activeView === view
                  ? "bg-brand-gray-200/80 text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="text-sm">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg">&#127470;&#127473;</span>
              <span className="text-white">Israel</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">1</span>
              <span className="text-brand-gray-100">100%</span>
            </div>
          </div>
          <div className="w-full bg-brand-gray-300 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full w-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="flex-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <i className="fa-solid fa-map-location-dot" />
          <span>Heatmap</span>
        </button>
        <button className="flex-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <i className="fa-solid fa-download" />
          <span>Download full list</span>
        </button>
      </div>
    </section>
  );
}

function AcquisitionChannelsSection() {
  const channels = [
    {
      name: "Email",
      icon: "fa-regular fa-envelope",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      value: 1,
      percentage: "100%",
      chartColor: "#8B5CF6",
    },
    {
      name: "SMS",
      icon: "fa-solid fa-comment-sms",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/20",
      value: 0,
      percentage: "0%",
      chartColor: "#3B82F6",
    },
    {
      name: "Instagram",
      icon: "fa-brands fa-instagram",
      iconColor: "text-pink-400",
      bgColor: "bg-pink-500/20",
      value: 0,
      percentage: "0%",
      chartColor: "#EC4899",
    },
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      value: 0,
      percentage: "0%",
      chartColor: "#10B981",
    },
    {
      name: "Direct Link",
      icon: "fa-solid fa-link",
      iconColor: "text-gray-400",
      bgColor: "bg-gray-500/20",
      value: 0,
      percentage: "0%",
      chartColor: "#6B7280",
    },
  ];

  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Acquisition channels</h2>
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-[200px] h-[200px]">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="12"
              strokeDasharray="251.2"
              strokeDashoffset="0"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">1</span>
            <span className="text-sm text-brand-gray-100">TOTAL</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {channels.map((channel, index) => (
          <div
            key={channel.name}
            className={`flex justify-between items-center text-sm py-3 ${
              index < channels.length - 1
                ? "border-b border-brand-gray-200/30"
                : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-lg ${channel.bgColor} flex items-center justify-center`}
              >
                <i className={`${channel.icon} ${channel.iconColor}`} />
              </div>
              <span className="text-white font-medium">{channel.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">{channel.value}</span>
              <span className="text-brand-gray-100 w-12 text-right">
                {channel.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AcquisitionSourcesSection() {
  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white">Acquisition sources</h2>
      <p className="text-brand-gray-100 text-sm mb-8">
        Websites, social media, sharing, etc.
      </p>
      <div className="flex flex-col items-center justify-center text-center h-48">
        <div className="w-20 h-20 flex items-center justify-center bg-brand-gray-300 rounded-full mb-4">
          <i className="fa-solid fa-chart-simple text-3xl text-purple-400" />
        </div>
        <p className="font-semibold text-white">Waiting for fans</p>
        <p className="text-sm text-brand-gray-100">
          You'll see acquisition sources data here
        </p>
      </div>
    </section>
  );
}

function PotentialInfluencersSection() {
  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white">Potential Influencers</h2>
      <p className="text-brand-gray-100 text-sm mb-8">
        Top fans by social follower count
      </p>
      <div className="flex flex-col items-center justify-center text-center h-48">
        <div className="w-20 h-20 flex items-center justify-center bg-brand-gray-300 rounded-full mb-4">
          <i className="fa-solid fa-chart-simple text-3xl text-purple-400" />
        </div>
        <p className="font-semibold text-white">Waiting for fans</p>
        <p className="text-sm text-brand-gray-100">
          You'll see notable fans data here
        </p>
      </div>
    </section>
  );
}

function RegistrationReferralsSection() {
  return (
    <section className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
      <div>
        <h2 className="text-xl font-bold text-white">Registration Referrals</h2>
        <p className="text-brand-gray-100 text-sm">
          Each guest has a unique referral link to invite friends.{" "}
          <a
            href="#"
            className="text-pink-400 font-medium hover:text-pink-300 transition-colors"
          >
            Learn More{" "}
            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
          </a>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="text-7xl text-brand-gray-300/40 mb-6">
          <i className="fa-solid fa-atom" />
        </div>
        <h3 className="font-semibold text-white text-lg">No Referrals</h3>
        <p className="text-sm text-brand-gray-100 mt-1">
          Referrals will start showing up here once guests start inviting their
          friends.
        </p>
      </div>
    </section>
  );
}
