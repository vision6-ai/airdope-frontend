import React from "react";

interface DraftReviewsCardProps {
  draftCount?: number;
  previewText?: string;
}

export function DraftReviewsCard({
  draftCount = 3,
  previewText = '"Yeah, the vinyl comes with a secret track..."',
}: DraftReviewsCardProps) {
  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-white flex items-center space-x-3">
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
          <span>Draft Reviews</span>
        </h2>
        <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-sm">
          {draftCount}
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-4">
        The agent generated {draftCount} replies that need your approval before
        sending.
      </p>
      <div className="border-l-2 border-purple-600 pl-4 italic text-gray-400 text-sm">
        {previewText}
      </div>
      <button className="w-full mt-6 py-3 text-sm font-semibold bg-white text-brand-dark rounded-lg hover:bg-gray-200 transition-colors">
        Review {draftCount} Drafts
      </button>
    </section>
  );
}
