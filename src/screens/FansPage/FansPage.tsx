import React, { useState } from "react";
import { Header } from "../../components/layout/Header";
import { SendBlastModal } from "../../components/blasts/SendBlastModal";

type SearchMode = "regular" | "ai";

interface Fan {
  id: string;
  name: string;
  contact: string;
  avatar: string;
  fanRank: number;
  ltv: number;
  status: "Superfan" | "Regular" | "At Risk";
}

const mockFans: Fan[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    contact: "olivia@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    fanRank: 98,
    ltv: 1200,
    status: "Superfan",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    contact: "+1 555-123-4567",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    fanRank: 85,
    ltv: 850,
    status: "Regular",
  },
  {
    id: "3",
    name: "Lana Steiner",
    contact: "lana.s@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    fanRank: 62,
    ltv: 430,
    status: "At Risk",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    contact: "demi@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    fanRank: 91,
    ltv: 1050,
    status: "Superfan",
  },
  {
    id: "5",
    name: "Candice Wu",
    contact: "candice@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    fanRank: 78,
    ltv: 600,
    status: "Regular",
  },
  {
    id: "6",
    name: "Natali Craig",
    contact: "+1 555-987-6543",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    fanRank: 55,
    ltv: 210,
    status: "At Risk",
  },
];

function StatCard({
  label,
  value,
  change,
  icon,
  iconBgClass,
  iconColorClass,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
}) {
  return (
    <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-brand-gray-100 font-medium">{label}</span>
        <div className={`${iconBgClass} ${iconColorClass} p-2 rounded-lg`}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="flex items-center text-xs text-green-400">
        <i className="fa-solid fa-arrow-up mr-1"></i>
        <span>{change}</span>
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  iconBgClass,
  iconColorClass,
  title,
  description,
  onClick,
}: {
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-brand-gray-300 p-5 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-brand-gray-200/80 transition-colors"
    >
      <div className={`${iconBgClass} ${iconColorClass} p-3 rounded-lg`}>
        <i className={`${icon} fa-lg`}></i>
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-brand-gray-100">{description}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Fan["status"] }) {
  const styles = {
    Superfan: "bg-green-500/20 text-green-400",
    Regular: "bg-blue-500/20 text-blue-400",
    "At Risk": "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function FansPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>("regular");
  const [isBlastModalOpen, setIsBlastModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="relative z-[1]">
        <Header />

        <main className="max-w-7xl mx-auto px-8 py-12">
          <section className="mb-10">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
              Fans
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard
                label="Total Fans"
                value="2,847"
                change="12% from last month"
                icon="fa-solid fa-users"
                iconBgClass="bg-purple-500/20"
                iconColorClass="text-purple-400"
              />
              <StatCard
                label="New Fans (This Week)"
                value="142"
                change="8% from last week"
                icon="fa-solid fa-user-plus"
                iconBgClass="bg-blue-500/20"
                iconColorClass="text-blue-400"
              />
              <StatCard
                label="Avg Engagement Score"
                value="78.5"
                change="5% from last month"
                icon="fa-solid fa-chart-line"
                iconBgClass="bg-green-500/20"
                iconColorClass="text-green-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard
                icon="fa-solid fa-user-plus"
                iconBgClass="bg-blue-500/20"
                iconColorClass="text-blue-400"
                title="Import Fans"
                description="Import fans from CSV file"
              />
              <ActionCard
                icon="fa-solid fa-paper-plane"
                iconBgClass="bg-green-500/20"
                iconColorClass="text-green-400"
                title="Send Broadcast"
                description="Message all your fans"
                onClick={() => setIsBlastModalOpen(true)}
              />
              <ActionCard
                icon="fa-solid fa-list-check"
                iconBgClass="bg-yellow-500/20"
                iconColorClass="text-yellow-400"
                title="Manage Segments"
                description="Group fans by criteria"
              />
            </div>
          </section>

          <section className="bg-brand-gray-400/50 border border-brand-gray-200/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Fans List</h2>
              <div className="flex items-center space-x-2">
                <button className="w-9 h-9 flex items-center justify-center bg-brand-gray-300 hover:bg-brand-gray-200 rounded-lg text-brand-gray-100 hover:text-white transition-colors">
                  <i className="fa-solid fa-download"></i>
                </button>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center space-x-2 mb-3">
                <button
                  onClick={() => setSearchMode("regular")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    searchMode === "regular"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
                      : "bg-brand-gray-300 text-brand-gray-100 hover:bg-brand-gray-200 hover:text-white"
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setSearchMode("ai")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    searchMode === "ai"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
                      : "bg-brand-gray-300 text-brand-gray-100 hover:bg-brand-gray-200 hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-sparkles mr-1.5"></i>
                  AI Search
                </button>
              </div>

              {searchMode === "regular" ? (
                <div className="flex items-center space-x-4">
                  <div className="relative flex-grow">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-100"></i>
                    <input
                      type="text"
                      placeholder="Search fans..."
                      className="w-full bg-brand-gray-300 border border-transparent focus:border-purple-400 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder-brand-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                    />
                  </div>
                  <button className="flex items-center space-x-2 bg-brand-gray-300 hover:bg-brand-gray-200 px-4 py-2.5 rounded-lg text-white font-medium transition-colors">
                    <i className="fa-solid fa-filter text-brand-gray-100"></i>
                    <span>All Fans</span>
                    <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                  </button>
                  <button className="flex items-center space-x-2 bg-brand-gray-300 hover:bg-brand-gray-200 px-4 py-2.5 rounded-lg text-white font-medium transition-colors">
                    <i className="fa-solid fa-arrow-up-wide-short text-brand-gray-100"></i>
                    <span>Register Time</span>
                    <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <i className="fa-solid fa-sparkles absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"></i>
                    <input
                      type="text"
                      placeholder="Ask AI: Show me fans who bought the last drop but haven't opened an email in 30 days"
                      className="w-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/50 focus:border-purple-400 rounded-lg py-2.5 pl-11 pr-32 text-white placeholder-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                      Search
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-brand-gray-100 mr-2">
                      Quick queries:
                    </span>
                    <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
                      Superfans with high LTV
                    </button>
                    <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
                      At risk fans
                    </button>
                    <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
                      New fans this month
                    </button>
                    <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
                      Low engagement score
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-brand-gray-100 uppercase border-b border-brand-gray-200/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Full Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      FanRank
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      LTV
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {mockFans.map((fan, index) => (
                    <tr
                      key={fan.id}
                      className={`hover:bg-brand-gray-300/30 transition-colors ${
                        index < mockFans.length - 1
                          ? "border-b border-brand-gray-300/50"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={fan.avatar}
                            alt={fan.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold">{fan.name}</div>
                            <div className="text-xs text-brand-gray-100">
                              {fan.contact}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{fan.fanRank}</td>
                      <td className="px-6 py-4 font-medium">
                        ${fan.ltv.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={fan.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-brand-gray-100 hover:text-white">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="border-t border-white/10 pt-8"></div>
        </footer>
      </div>

      <SendBlastModal isOpen={isBlastModalOpen} onClose={() => setIsBlastModalOpen(false)} />
    </div>
  );
}
