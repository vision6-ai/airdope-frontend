import React, { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  initialsColor?: string;
  preview: string;
  time: string;
  platform?: string;
  badge?: string;
  hasUnread?: boolean;
}

interface ConversationItemProps extends Conversation {
  isSelected?: boolean;
  onClick: () => void;
}

function ConversationItem({
  name,
  avatar,
  initials,
  initialsColor,
  preview,
  time,
  platform,
  badge,
  hasUnread,
  isSelected,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 flex space-x-3 cursor-pointer border-l-2 transition-colors ${
        isSelected
          ? "bg-brand-gray-400/30 border-purple-600"
          : "hover:bg-brand-gray-400/20 border-transparent"
      }`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div
          className={`w-12 h-12 rounded-full ${initialsColor} flex-shrink-0 flex items-center justify-center font-bold text-white text-lg`}
        >
          {initials}
        </div>
      )}
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-white truncate">{name}</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-brand-gray-100">{time}</span>
            {hasUnread && (
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-300 truncate mt-1">{preview}</p>
        {(platform || badge) && (
          <div className="flex items-center space-x-2 mt-1.5">
            {platform && (
              <i className={`${platform} text-brand-gray-100 text-xs`}></i>
            )}
            {badge && (
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface MessageListProps {
  onSelectConversation: (id: string) => void;
  selectedId?: string;
}

export function MessageList({ onSelectConversation, selectedId }: MessageListProps) {
  const [activeFilter, setActiveFilter] = useState("open");

  const filters = [
    { id: "open", label: "Open" },
    { id: "unread", label: "Unread" },
    { id: "done", label: "Done" },
  ];

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Sarah Jenkins",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      preview: "Loved the new drop! When is the next...",
      time: "2m",
      platform: "fa-brands fa-instagram",
      badge: "VIP Fan",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      preview: "Is there a discount code for loyal...",
      time: "1h",
      hasUnread: true,
    },
    {
      id: "3",
      name: "Jessica Wu",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      preview: "Can you react to my duet video?",
      time: "3h",
      platform: "fa-brands fa-tiktok",
    },
    {
      id: "4",
      name: "David Broker",
      initials: "DB",
      initialsColor: "bg-indigo-600",
      preview: "Subject: Partnership Opportunity for Q4...",
      time: "1d",
      platform: "fa-regular fa-envelope",
    },
  ];

  return (
    <section className="w-96 bg-brand-gray-500 flex-shrink-0 border-l border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-100"></i>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-brand-gray-400 border border-brand-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex items-center space-x-2 mt-4 text-sm">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-brand-gray-200 text-white"
                  : "text-brand-gray-100 hover:bg-brand-gray-300/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        {conversations.map((convo) => (
          <ConversationItem
            key={convo.id}
            {...convo}
            isSelected={selectedId === convo.id}
            onClick={() => onSelectConversation(convo.id)}
          />
        ))}
      </div>
    </section>
  );
}
