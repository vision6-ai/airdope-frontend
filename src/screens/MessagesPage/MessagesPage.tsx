import React, { useState } from "react";
import { Header } from "../../components/layout/Header";
import {
  MessagesTabs,
  MessagesSidebar,
  MessageList,
  ChatPanel,
} from "../../components/messages";

const contacts = {
  "1": {
    name: "Sarah Jenkins",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    handle: "@sarahj_arts",
    platform: "Instagram DM",
    isVerified: true,
  },
  "2": {
    name: "Michael Chen",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    handle: "@mikechen",
    platform: "Direct Message",
    isVerified: false,
  },
  "3": {
    name: "Jessica Wu",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    handle: "@jessicawu",
    platform: "TikTok DM",
    isVerified: false,
  },
  "4": {
    name: "David Broker",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    handle: "david@business.com",
    platform: "Email",
    isVerified: false,
  },
};

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("1");

  const currentContact = contacts[selectedConversation as keyof typeof contacts];

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none" />

      <div className="relative z-[1]">
        <Header />

        <MessagesTabs activeTab="inbox" />

        <main className="flex h-[calc(100vh-128px)]">
          <MessagesSidebar />
          <MessageList
            selectedId={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
          <ChatPanel contact={currentContact} />
        </main>
      </div>
    </div>
  );
}
