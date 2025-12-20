import React, { useState } from "react";
import { Header } from "../../components/layout/Header";
import { EventGroup } from "../../components/drops/EventGroup";
import { EventData } from "../../components/drops/EventCard";

type TabType = "upcoming" | "past";

const mockEvents: Record<string, { dayOfWeek: string; events: EventData[] }> = {
  "Dec 25": {
    dayOfWeek: "Thursday",
    events: [
      {
        id: "1",
        date: "Dec 25",
        dayOfWeek: "Thursday",
        time: "11:00 AM",
        title: "AI day",
        guestCount: 1,
        viewCount: 245,
        imageUrl:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/c91ed0a6e8-665116792af50e8a03cd.png",
      },
    ],
  },
  "Dec 28": {
    dayOfWeek: "Sunday",
    events: [
      {
        id: "2",
        date: "Dec 28",
        dayOfWeek: "Sunday",
        time: "3:00 PM",
        title: "Year End Celebration",
        guestCount: 24,
        viewCount: 760,
        imageUrl:
          "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=300",
      },
    ],
  },
  "Jan 5": {
    dayOfWeek: "Sunday",
    events: [
      {
        id: "3",
        date: "Jan 5",
        dayOfWeek: "Sunday",
        time: "7:00 PM",
        title: "New Year Kickoff",
        guestCount: 42,
        viewCount: 1240,
        imageUrl:
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
      },
    ],
  },
};

export function DropsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="relative z-[1]">
        <Header />

        <main className="max-w-4xl mx-auto px-8 py-16">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Drops
            </h1>
            <div className="flex items-center bg-brand-gray-300 p-1 rounded-lg text-sm">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-brand-gray-200 text-white"
                    : "text-brand-gray-100 hover:text-white"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === "past"
                    ? "bg-brand-gray-200 text-white"
                    : "text-brand-gray-100 hover:text-white"
                }`}
              >
                Past
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {activeTab === "upcoming" ? (
              Object.entries(mockEvents).map(([date, { dayOfWeek, events }]) => (
                <EventGroup
                  key={date}
                  date={date}
                  dayOfWeek={dayOfWeek}
                  events={events}
                />
              ))
            ) : (
              <div className="text-center py-16 text-brand-gray-100">
                <i className="fa-solid fa-calendar-xmark text-4xl mb-4"></i>
                <p>No past events</p>
              </div>
            )}
          </div>
        </main>

        <footer className="max-w-4xl mx-auto px-8 pt-24 pb-16">
          <div className="border-t border-white/10 pt-8"></div>
        </footer>
      </div>
    </div>
  );
}
