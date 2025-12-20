import React from "react";
import { CreatorCard, Creator } from "./CreatorCard";

const mockCreators: { column: string; creators: Creator[] }[] = [
  {
    column: "outreach",
    creators: [
      {
        id: "1",
        name: "TechRex",
        handle: "@techrex_official",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
        platform: "Youtube",
        rate: 1200,
        status: "brief_sent",
      },
      {
        id: "2",
        name: "GamingGuru",
        handle: "@gaming_guru_tv",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
        platform: "Twitch",
        rate: 850,
        status: "negotiating",
      },
    ],
  },
  {
    column: "progress",
    creators: [
      {
        id: "3",
        name: "DesignDave",
        handle: "@design_dave",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
        platform: "Instagram",
        rate: 950,
        status: "creating",
        progress: 65,
        approved: true,
      },
      {
        id: "4",
        name: "MusicMike",
        handle: "@music_mike",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
        platform: "TikTok",
        rate: 700,
        status: "filming",
        progress: 40,
        approved: true,
      },
    ],
  },
  {
    column: "review",
    creators: [
      {
        id: "5",
        name: "SarahVlogs",
        handle: "@sarahvlogs",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
        platform: "Youtube",
        rate: 800,
        status: "review",
        draftPreview: {
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1473866496-34768da3b63231525445.png",
          duration: "0:45",
        },
      },
      {
        id: "6",
        name: "FitLife",
        handle: "@fitlife_official",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
        platform: "Instagram",
        rate: 600,
        status: "review",
        feedback: "Please adjust the lighting in the second clip...",
      },
    ],
  },
  {
    column: "payment",
    creators: [
      {
        id: "7",
        name: "TravelTom",
        handle: "@traveltom",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
        platform: "Youtube",
        rate: 500,
        status: "payment",
        paymentInfo: {
          amount: 500.0,
          dueText: "Net 15",
          autopay: false,
        },
      },
      {
        id: "8",
        name: "CryptoKing",
        handle: "@cryptoking",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
        platform: "Twitter",
        rate: 1200,
        status: "payment",
        paymentInfo: {
          amount: 1200.0,
          dueText: "Due in 2 days",
          autopay: true,
        },
      },
    ],
  },
];

interface ColumnConfig {
  id: string;
  title: string;
  color: string;
  variant: "outreach" | "progress" | "review" | "payment";
}

const columns: ColumnConfig[] = [
  { id: "outreach", title: "Outreach & Briefing", color: "text-blue-400", variant: "outreach" },
  { id: "progress", title: "In Progress", color: "text-white", variant: "progress" },
  { id: "review", title: "Review Drafts", color: "text-yellow-400", variant: "review" },
  { id: "payment", title: "Ready for Payment", color: "text-green-400", variant: "payment" },
];

export function CreatorsBoard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnData = mockCreators.find((c) => c.column === column.id);
        const creators = columnData?.creators || [];

        return (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className={`fa-solid fa-circle ${column.color} text-xs`}></i>
              <h3 className="font-bold text-white">{column.title}</h3>
              <span className="text-xs font-medium bg-brand-gray-300 text-brand-gray-100 w-5 h-5 flex items-center justify-center rounded-full">
                {creators.length}
              </span>
            </div>
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} variant={column.variant} />
            ))}
          </div>
        );
      })}
    </section>
  );
}
