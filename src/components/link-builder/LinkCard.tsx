import React from "react";

export interface LinkData {
  id: string;
  name: string;
  url: string;
  description: string;
  isActive: boolean;
  totalViews: string;
  clicksToday: string;
  conversionRate: string;
  lastUpdated: string;
}

interface LinkCardProps {
  link: LinkData;
  onEdit?: (id: string) => void;
  onDeactivate?: (id: string) => void;
  onAnalytics?: (id: string) => void;
  onQrCode?: (id: string) => void;
  onShare?: (id: string) => void;
  onCopyLink?: (url: string) => void;
}

export function LinkCard({
  link,
  onEdit,
  onDeactivate,
  onAnalytics,
  onQrCode,
  onShare,
  onCopyLink,
}: LinkCardProps) {
  return (
    <div className="bg-brand-gray-400 border border-brand-gray-200/50 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-xl font-bold text-white">{link.name}</h3>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  link.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {link.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-brand-gray-100 mb-4">
              <i className="fa-solid fa-link text-sm"></i>
              <span className="text-sm font-mono">{link.url}</span>
              <button
                onClick={() => onCopyLink?.(link.url)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <i className="fa-solid fa-copy text-xs"></i>
              </button>
            </div>
            <p className="text-sm text-brand-gray-100">{link.description}</p>
          </div>
          <button
            onClick={() => onEdit?.(link.id)}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors ml-6"
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-brand-gray-100 text-xs mb-1">Total Views</p>
            <p className="text-2xl font-bold text-white">{link.totalViews}</p>
          </div>
          <div>
            <p className="text-brand-gray-100 text-xs mb-1">Clicks Today</p>
            <p className="text-2xl font-bold text-white">{link.clicksToday}</p>
          </div>
          <div>
            <p className="text-brand-gray-100 text-xs mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold text-white">{link.conversionRate}</p>
          </div>
          <div>
            <p className="text-brand-gray-100 text-xs mb-1">Last Updated</p>
            <p className="text-sm font-medium text-white">{link.lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-gray-300/50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm">
          <button
            onClick={() => onAnalytics?.(link.id)}
            className="text-brand-gray-100 hover:text-white transition-colors flex items-center space-x-2"
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Analytics</span>
          </button>
          <button
            onClick={() => onQrCode?.(link.id)}
            className="text-brand-gray-100 hover:text-white transition-colors flex items-center space-x-2"
          >
            <i className="fa-solid fa-qrcode"></i>
            <span>QR Code</span>
          </button>
          <button
            onClick={() => onShare?.(link.id)}
            className="text-brand-gray-100 hover:text-white transition-colors flex items-center space-x-2"
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span>Share</span>
          </button>
        </div>
        <button
          onClick={() => onDeactivate?.(link.id)}
          className="text-red-400 hover:text-red-300 transition-colors text-sm flex items-center space-x-2"
        >
          <i className="fa-solid fa-power-off"></i>
          <span>{link.isActive ? "Deactivate" : "Activate"}</span>
        </button>
      </div>
    </div>
  );
}
