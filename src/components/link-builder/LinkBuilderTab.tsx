import React from "react";
import { useNavigate } from "react-router-dom";
import { LinkStatsCard } from "./LinkStatsCard";
import { LinkCard, LinkData } from "./LinkCard";

const mockLinks: LinkData[] = [
  {
    id: "1",
    name: "Main Link",
    url: "airdope.io/main",
    description:
      "Primary landing page for all marketing campaigns and presale launches",
    isActive: true,
    totalViews: "2,394",
    clicksToday: "127",
    conversionRate: "8.4%",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Community Link",
    url: "airdope.io/community",
    description:
      "Direct link to community hub for fan engagement and influencer activations",
    isActive: true,
    totalViews: "1,453",
    clicksToday: "89",
    conversionRate: "12.7%",
    lastUpdated: "5 hours ago",
  },
];

export function LinkBuilderTab() {
  const navigate = useNavigate();
  const totalLinks = mockLinks.length;
  const totalViews = "3,847";
  const activeLinks = mockLinks.filter((l) => l.isActive).length;

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/link-editor/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/link-editor/new");
  };

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Link Builder
          </h1>
          <p className="text-brand-gray-100 text-sm">
            Manage your marketing links and track performance
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          <span>Create New Link</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        <LinkStatsCard
          label="Total Links"
          value={String(totalLinks)}
          icon="fa-solid fa-link"
          iconColor="text-purple-400"
        />
        <LinkStatsCard
          label="Total Views"
          value={totalViews}
          icon="fa-solid fa-eye"
          iconColor="text-purple-400"
        />
        <LinkStatsCard
          label="Active Links"
          value={String(activeLinks)}
          icon="fa-solid fa-circle-check"
          iconColor="text-green-400"
        />
      </div>

      <div className="space-y-6">
        {mockLinks.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onCopyLink={handleCopyLink}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <div className="mt-12 bg-brand-gray-400 border border-dashed border-brand-gray-200 rounded-2xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-link text-2xl text-purple-400"></i>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Create More Links</h3>
          <p className="text-brand-gray-100 text-sm mb-6">
            Build custom links for different campaigns, influencers, or launch
            windows to track performance across channels
          </p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-5 py-2.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            <span>Create New Link</span>
          </button>
        </div>
      </div>
    </>
  );
}
