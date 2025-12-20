import React from "react";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  platform: string;
  rate: number;
  status: "brief_sent" | "negotiating" | "creating" | "filming" | "review" | "payment";
  progress?: number;
  approved?: boolean;
  draftPreview?: {
    image: string;
    duration: string;
  };
  feedback?: string;
  paymentInfo?: {
    amount: number;
    dueText: string;
    autopay?: boolean;
  };
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  brief_sent: { bg: "bg-blue-500/20", text: "text-blue-300", label: "Brief Sent" },
  negotiating: { bg: "bg-orange-500/20", text: "text-orange-300", label: "Negotiating" },
  creating: { bg: "bg-white/20", text: "text-white", label: "Creating Content" },
  filming: { bg: "bg-white/20", text: "text-white", label: "Filming" },
  review: { bg: "bg-yellow-500/20", text: "text-yellow-300", label: "Pending Review" },
  payment: { bg: "bg-green-500/20", text: "text-green-300", label: "Ready" },
};

export function CreatorCard({ creator, variant }: { creator: Creator; variant: "outreach" | "progress" | "review" | "payment" }) {
  const style = statusStyles[creator.status] || statusStyles.brief_sent;

  if (variant === "outreach") {
    return (
      <div className="bg-brand-gray-500 p-4 rounded-xl space-y-3">
        <div className="flex items-center space-x-3">
          <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" alt={creator.name} />
          <div>
            <p className="font-semibold text-white">{creator.name}</p>
            <p className="text-xs text-brand-gray-100">{creator.handle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium ${style.bg} ${style.text} px-2 py-1 rounded-md`}>
            {style.label}
          </span>
          <span className="text-xs font-medium bg-brand-gray-300 text-brand-gray-100 px-2 py-1 rounded-md">
            {creator.platform}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-sm text-brand-gray-100">
            Rate: <span className="font-semibold text-white">${creator.rate.toLocaleString()}</span>
          </span>
          <button className="text-brand-gray-100 hover:text-white">
            <i className="fa-regular fa-envelope"></i>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "progress") {
    return (
      <div className="bg-brand-gray-500 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" alt={creator.name} />
            <div>
              <p className="font-semibold text-white">{creator.name}</p>
              <p className="text-xs text-brand-gray-100">{creator.handle}</p>
            </div>
          </div>
          {creator.approved && <i className="fa-regular fa-circle-check text-green-400"></i>}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium ${style.bg} ${style.text} px-2 py-1 rounded-md`}>
            {style.label}
          </span>
          <span className="text-xs font-medium bg-brand-gray-300 text-brand-gray-100 px-2 py-1 rounded-md">
            {creator.platform}
          </span>
        </div>
        {creator.progress !== undefined && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-brand-gray-100">Progress</span>
              <span className="font-semibold text-white">{creator.progress}%</span>
            </div>
            <div className="w-full bg-brand-gray-300 rounded-full h-1.5">
              <div
                className="bg-white h-1.5 rounded-full"
                style={{ width: `${creator.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-sm text-brand-gray-100">
            Rate: <span className="font-semibold text-white">${creator.rate.toLocaleString()}</span>
          </span>
          <button className="text-brand-gray-100 hover:text-white">
            <i className="fa-regular fa-comment-dots"></i>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "review") {
    const isHighlighted = creator.draftPreview;
    return (
      <div className={`bg-brand-gray-500 p-4 rounded-xl space-y-3 ${isHighlighted ? "border-2 border-white shadow-lg shadow-white/10" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" alt={creator.name} />
            <div>
              <p className="font-semibold text-white">{creator.name}</p>
              <p className="text-xs text-brand-gray-100">{creator.handle}</p>
            </div>
          </div>
          <i className="fa-regular fa-clock text-yellow-400"></i>
        </div>
        {creator.draftPreview && (
          <div className="relative h-40 rounded-lg overflow-hidden group">
            <img
              src={creator.draftPreview.image}
              alt="Draft preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-play text-white text-3xl"></i>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-mono">
              {creator.draftPreview.duration}
            </span>
          </div>
        )}
        {creator.feedback && (
          <div className="bg-brand-gray-400/50 p-3 rounded-md text-sm text-gray-300 italic">
            "{creator.feedback}"
          </div>
        )}
        {creator.draftPreview && (
          <div className="grid grid-cols-2 gap-2">
            <button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 font-semibold py-2 rounded-md transition-colors text-sm">
              Approve
            </button>
            <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 rounded-md transition-colors text-sm">
              Reject
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === "payment" && creator.paymentInfo) {
    return (
      <div className="bg-brand-gray-500 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" alt={creator.name} />
            <div>
              <p className="font-semibold text-white">{creator.name}</p>
              <p className={`text-xs ${creator.paymentInfo.autopay ? "text-brand-gray-100" : "text-green-400"}`}>
                {creator.paymentInfo.autopay ? "Scheduled" : "Approved Today"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">${creator.paymentInfo.amount.toFixed(2)}</p>
            <p className="text-xs text-brand-gray-100">{creator.paymentInfo.dueText}</p>
          </div>
        </div>
        {creator.paymentInfo.autopay ? (
          <div className="w-full bg-brand-gray-400/50 text-brand-gray-100 font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span>Auto-pay Enabled</span>
          </div>
        ) : (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm">
            <i className="fa-brands fa-paypal"></i>
            <span>Pay with PayPal</span>
          </button>
        )}
      </div>
    );
  }

  return null;
}
