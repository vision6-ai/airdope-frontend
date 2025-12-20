import React, { useState } from "react";

interface Message {
  id: string;
  content: string;
  time: string;
  isOwn: boolean;
  readStatus?: string;
}

interface ChatPanelProps {
  contact: {
    name: string;
    avatar: string;
    handle: string;
    platform: string;
    isVerified?: boolean;
  };
}

export function ChatPanel({ contact }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  const messages: Message[] = [
    {
      id: "1",
      content:
        "Hey Alex! OMG I just listened to the new exclusive audio pack from the drop. It's absolutely insane. The beats on track 3 are next level.",
      time: "4:23 PM",
      isOwn: false,
    },
    {
      id: "2",
      content:
        "Sarah! Thank you so much. Track 3 was actually a late addition, glad you vibing with it.",
      time: "4:30 PM",
      isOwn: true,
      readStatus: "Read",
    },
    {
      id: "3",
      content:
        "Loved the new drop! When is the next one coming? I'm saving up for the merch run you teased on stories",
      time: "4:35 PM",
      isOwn: false,
    },
  ];

  const quickReplies = [
    "Next drop is in 2 weeks!",
    "Merch details coming soon",
  ];

  return (
    <section className="flex-grow flex flex-col bg-brand-dark">
      <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-white flex items-center space-x-2">
              <span>{contact.name}</span>
              {contact.isVerified && (
                <i className="fa-solid fa-check-circle text-blue-400 text-sm"></i>
              )}
            </h3>
            <p className="text-sm text-brand-gray-100">
              {contact.handle} - {contact.platform}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-brand-gray-100 text-xl">
          <button className="hover:text-white transition-colors">
            <i className="fa-solid fa-check-double"></i>
          </button>
          <button className="hover:text-white transition-colors">
            <i className="fa-regular fa-user"></i>
          </button>
          <button className="hover:text-white transition-colors">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </header>

      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        <div className="text-center my-4">
          <span className="text-xs text-brand-gray-100 bg-brand-gray-400/50 px-3 py-1 rounded-full">
            TODAY, 4:23 PM
          </span>
        </div>

        {messages.map((msg) =>
          msg.isOwn ? (
            <div
              key={msg.id}
              className="flex items-end space-x-3 max-w-lg ml-auto justify-end"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl rounded-bl-2xl">
                <p>{msg.content}</p>
                <p className="text-xs text-right text-purple-200/80 mt-2">
                  {msg.time}
                  {msg.readStatus && ` - ${msg.readStatus}`}
                </p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-end space-x-3 max-w-lg">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-brand-gray-300 p-4 rounded-t-2xl rounded-br-2xl">
                <p className="text-white">{msg.content}</p>
                <p className="text-xs text-right text-brand-gray-100 mt-2">
                  {msg.time}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <footer className="p-4 flex-shrink-0">
        <div className="flex items-center space-x-2 mb-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              className="text-sm bg-brand-gray-300/80 hover:bg-brand-gray-300 text-gray-200 px-3 py-1.5 rounded-full transition-colors"
            >
              {reply}
            </button>
          ))}
          <button className="text-sm bg-brand-gray-300/80 hover:bg-brand-gray-300 text-gray-200 px-3 py-1.5 rounded-full transition-colors flex items-center space-x-2">
            <i className="fa-solid fa-wand-magic-sparkles text-purple-400"></i>
            <span>Create AirAgent Reply</span>
          </button>
        </div>
        <div className="bg-brand-gray-300 rounded-xl p-2 flex items-center">
          <textarea
            placeholder={`Type a reply to ${contact.name.split(" ")[0]}...`}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow bg-transparent p-2 text-white placeholder-brand-gray-100 focus:outline-none resize-none"
          />
          <div className="flex items-center space-x-3 text-brand-gray-100 text-xl px-2">
            <button className="hover:text-white transition-colors">
              <i className="fa-regular fa-image"></i>
            </button>
            <button className="hover:text-white transition-colors">
              <i className="fa-solid fa-microphone"></i>
            </button>
            <button className="hover:text-white transition-colors">
              <i className="fa-regular fa-folder-open"></i>
            </button>
            <button className="hover:text-white transition-colors">
              <i className="fa-regular fa-face-smile"></i>
            </button>
          </div>
          <button className="bg-white text-brand-dark font-semibold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </footer>
    </section>
  );
}
