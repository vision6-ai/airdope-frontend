import React from "react";
import { Link } from "react-router-dom";

interface TabProps {
  label: string;
  href: string;
  isActive?: boolean;
}

function Tab({ label, href, isActive }: TabProps) {
  return (
    <Link
      to={href}
      className={`relative font-medium py-3 text-sm transition-colors ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      <span>{label}</span>
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
      )}
    </Link>
  );
}

interface MessagesTabsProps {
  activeTab?: string;
}

export function MessagesTabs({ activeTab = "inbox" }: MessagesTabsProps) {
  const tabs = [
    { id: "inbox", label: "Inbox", href: "/messages" },
    { id: "ai-agent", label: "AI Agent", href: "/messages/ai-agent" },
    { id: "automations", label: "Automations", href: "/messages/automations" },
  ];

  return (
    <nav className="sticky top-16 z-10 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center space-x-8">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              href={tab.href}
              isActive={tab.id === activeTab}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
