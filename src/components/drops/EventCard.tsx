import React from "react";
import { Link } from "react-router-dom";

export interface EventData {
  id: string;
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  guestCount: number;
  viewCount: number;
  imageUrl: string;
}

interface EventCardProps {
  event: EventData;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-brand-gray-400 border border-brand-gray-200/50 p-6 rounded-2xl flex items-center justify-between hover:border-white/20 transition-all duration-300 cursor-pointer">
      <div className="space-y-4">
        <p className="text-sm text-brand-gray-100">{event.time}</p>
        <h2 className="text-xl font-bold text-white">{event.title}</h2>
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <i className="fa-solid fa-user text-brand-gray-100"></i>
          <span>
            {event.guestCount} {event.guestCount === 1 ? "guest" : "guests"}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <i className="fa-solid fa-eye text-brand-gray-100"></i>
          <span>
            {event.viewCount.toLocaleString()} {event.viewCount === 1 ? "view" : "views"}
          </span>
        </div>
        <Link
          to={`/manage-drop/${event.id}`}
          className="inline-flex items-center mt-4 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          <span>Manage Drop</span>
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>
      </div>
      <div className="w-32 h-32 flex-shrink-0 ml-6">
        <img
          className="w-full h-full object-cover rounded-xl shadow-lg"
          src={event.imageUrl}
          alt={event.title}
        />
      </div>
    </div>
  );
}
