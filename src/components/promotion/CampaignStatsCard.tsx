import React from "react";

interface CampaignStatsCardProps {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  trendText: string;
  trendDirection: "up" | "down";
  trendColor: string;
}

export function CampaignStatsCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  trendText,
  trendDirection,
  trendColor,
}: CampaignStatsCardProps) {
  return (
    <div className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-brand-gray-100 font-medium">{label}</span>
        <div className={`${iconBg} ${iconColor} p-2 rounded-lg`}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className={`flex items-center text-xs ${trendColor}`}>
        <i className={`fa-solid fa-arrow-${trendDirection} mr-1`}></i>
        <span>{trendText}</span>
      </div>
    </div>
  );
}
