import React from "react";

interface LinkStatsCardProps {
  label: string;
  value: string;
  icon: string;
  iconColor?: string;
}

export function LinkStatsCard({
  label,
  value,
  icon,
  iconColor = "text-purple-400",
}: LinkStatsCardProps) {
  return (
    <div className="bg-brand-gray-400 border border-brand-gray-200/50 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-brand-gray-100 text-sm">{label}</span>
        <i className={`${icon} ${iconColor}`}></i>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
