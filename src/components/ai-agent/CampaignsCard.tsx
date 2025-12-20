import React, { useState } from "react";
import { Switch } from "../ui/switch";

interface Campaign {
  id: string;
  name: string;
  isActive: boolean;
}

interface CampaignsCardProps {
  initialCampaigns?: Campaign[];
}

export function CampaignsCard({
  initialCampaigns = [
    { id: "1", name: "Merch Drop #4", isActive: true },
    { id: "2", name: "Fall Tour Presale", isActive: false },
  ],
}: CampaignsCardProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const activeCount = campaigns.filter((c) => c.isActive).length;

  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Campaigns</h2>
        <span className="text-xs bg-brand-gray-200 text-gray-300 px-2 py-1 rounded-md font-medium">
          {activeCount} Active
        </span>
      </div>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">{campaign.name}</p>
              <p
                className={`text-sm ${
                  campaign.isActive ? "text-green-400" : "text-gray-400"
                }`}
              >
                {campaign.isActive ? "Agent Active" : "Agent Paused"}
              </p>
            </div>
            <Switch
              checked={campaign.isActive}
              onCheckedChange={() => toggleCampaign(campaign.id)}
            />
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-medium border border-brand-gray-200 rounded-lg text-gray-300 hover:bg-brand-gray-300/50 hover:text-white transition-colors">
        <i className="fa-solid fa-plus mr-2"></i> Manage Campaigns
      </button>
    </section>
  );
}
