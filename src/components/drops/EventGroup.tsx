import React from "react";
import { EventCard, EventData } from "./EventCard";

interface EventGroupProps {
  date: string;
  dayOfWeek: string;
  events: EventData[];
}

export function EventGroup({
  date,
  dayOfWeek,
  events,
}: EventGroupProps) {
  return (
    <div className="grid grid-cols-[1fr_4fr] gap-x-12">
      <div className="text-right">
        <h3 className="font-semibold text-white">{date}</h3>
        <p className="text-brand-gray-100 text-sm">{dayOfWeek}</p>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-0 top-1 h-full w-px bg-white/10"></div>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {index === 0 && (
                <div className="absolute left-[-36.5px] top-1.5 w-2.5 h-2.5 bg-brand-gray-100 rounded-full"></div>
              )}
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
