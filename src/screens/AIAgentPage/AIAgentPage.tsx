import React from "react";
import { Header } from "../../components/layout/Header";
import { MessagesTabs } from "../../components/messages";
import {
  GlobalStatusCard,
  KnowledgeBaseCard,
  BehaviorSettingsCard,
  SimulationPreviewCard,
  CampaignsCard,
  DraftReviewsCard,
} from "../../components/ai-agent";

export function AIAgentPage() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none" />

      <div className="relative z-[1]">
        <Header />

        <MessagesTabs activeTab="ai-agent" />

        <main className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-8 items-start">
            <div className="col-span-2 flex flex-col gap-8">
              <GlobalStatusCard
                isActive={true}
                trainingHealth={85}
                healthTip="Add more interview transcripts to improve tone matching."
              />
              <KnowledgeBaseCard totalFiles={14} />
              <BehaviorSettingsCard
                initialAutonomy="review"
                initialTone="chill"
              />
            </div>

            <div className="col-span-1 flex flex-col gap-8">
              <SimulationPreviewCard />
              <CampaignsCard />
              <DraftReviewsCard
                draftCount={3}
                previewText='"Yeah, the vinyl comes with a secret track..."'
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
