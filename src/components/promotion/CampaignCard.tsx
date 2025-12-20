import React from "react";

export interface Campaign {
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
  statusColor: "green" | "gray" | "blue" | "gray";
  borderColor: string;
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const getStatusBadgeClasses = (status: Campaign["status"]) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-500/20 text-green-400`;
      case "completed":
        return `${baseClasses} bg-gray-500/20 text-gray-400`;
      case "scheduled":
        return `${baseClasses} bg-blue-500/20 text-blue-400`;
      case "draft":
        return `${baseClasses} bg-gray-500/20 text-gray-300`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "fa-solid fa-circle fa-beat";
      case "completed":
        return "fa-solid fa-circle";
      case "scheduled":
        return "fa-solid fa-clock";
      case "draft":
        return "fa-solid fa-pencil";
      default:
        return "fa-solid fa-circle";
    }
  };

  const getBudgetPercentage = (budget: Campaign["budget"]) => {
    if (!budget) return 0;
    return (budget.spent / budget.total) * 100;
  };

  const getBudgetBarColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`relative bg-brand-gray-400/50 border border-brand-gray-200/20 rounded-2xl p-5 flex flex-col justify-between space-y-4 h-64 overflow-hidden`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${campaign.borderColor} rounded-l-2xl`}></div>

      <div className="flex items-start justify-between">
        <span className={getStatusBadgeClasses(campaign.status)}>
          <i className={`${getStatusIcon(campaign.status)} mr-2 text-xs`}></i>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
        <button className="text-brand-gray-100 hover:text-white">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
        <p className="text-sm text-brand-gray-100">{campaign.dateRange}</p>
      </div>

      {campaign.status !== "draft" ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-brand-gray-100">Creators Involved</label>
            {campaign.creators && campaign.creators.avatars.length > 0 ? (
              <div className="flex items-center mt-1 -space-x-2">
                {campaign.creators.avatars.slice(0, 3).map((avatar, idx) => (
                  <img
                    key={idx}
                    className="w-6 h-6 rounded-full border-2 border-brand-gray-400"
                    src={avatar}
                    alt={`Creator ${idx + 1}`}
                  />
                ))}
                {campaign.creators.count > 3 && (
                  <div className="w-6 h-6 rounded-full bg-brand-gray-300 flex items-center justify-center text-xs font-semibold text-white border-2 border-brand-gray-400">
                    +{campaign.creators.count - 3}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm font-medium text-brand-gray-100 mt-1">No creators added</p>
            )}
          </div>
          <div>
            <label className="text-xs text-brand-gray-100">Budget Utilization</label>
            {campaign.budget ? (
              <>
                <p className="text-sm font-semibold text-white mt-1">
                  ${campaign.budget.spent}k / ${campaign.budget.total}k
                </p>
                <div className="w-full bg-brand-gray-300 rounded-full h-1.5 mt-1.5">
                  <div
                    className={`${getBudgetBarColor(campaign.status)} h-1.5 rounded-full`}
                    style={{ width: `${getBudgetPercentage(campaign.budget)}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="text-sm font-semibold text-white mt-1">Est. Budget</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-brand-gray-100">Creators Involved</label>
            <p className="text-sm font-medium text-brand-gray-100 mt-1">No creators added</p>
          </div>
          <div>
            <label className="text-xs text-brand-gray-100">Est. Budget</label>
            <p className="text-lg font-bold text-white mt-1">$20.0k</p>
            <div className="w-full bg-brand-gray-300 rounded-full h-1.5 mt-1.5">
              <div className="bg-gray-500 h-1.5 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-brand-gray-200/20 pt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-brand-gray-100">
          <i className={`${campaign.bottomIcon} mr-2`}></i>
          <span>{campaign.bottomText}</span>
        </div>
        <a href="#" className="text-sm font-semibold text-white hover:text-gray-300 transition-colors flex items-center">
          {campaign.actionText} <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
        </a>
      </div>
    </div>
  );
}
