import React from "react";

interface InboxItemProps {
  icon: string;
  label: string;
  count: number;
  isActive?: boolean;
}

function InboxItem({ icon, label, count, isActive }: InboxItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-brand-gray-400/80 text-white font-medium"
          : "hover:bg-brand-gray-400/50 text-gray-300 hover:text-white"
      }`}
    >
      <div className="flex items-center space-x-3">
        <i className={`${icon} w-4 text-center`}></i>
        <span>{label}</span>
      </div>
      {isActive ? (
        <span className="text-xs bg-purple-600 text-white font-semibold px-2 py-0.5 rounded-full">
          {count}
        </span>
      ) : (
        <span className="text-xs text-brand-gray-100 font-medium">{count}</span>
      )}
    </a>
  );
}

export function MessagesSidebar() {
  const inboxes = [
    { icon: "fa-solid fa-inbox", label: "All Messages", count: 12, isActive: true },
    { icon: "fa-brands fa-instagram", label: "Instagram", count: 5 },
    { icon: "fa-brands fa-whatsapp", label: "WhatsApp", count: 3 },
    { icon: "fa-brands fa-tiktok", label: "TikTok", count: 2 },
    { icon: "fa-regular fa-envelope", label: "Email", count: 2 },
  ];

  return (
    <aside className="w-64 bg-brand-dark/50 flex-shrink-0 p-6 flex flex-col">
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Channels</h2>
        <div>
          <h3 className="text-xs text-brand-gray-100 font-medium uppercase tracking-wider mb-3">
            Inboxes
          </h3>
          <nav className="space-y-1">
            {inboxes.map((inbox) => (
              <InboxItem key={inbox.label} {...inbox} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
