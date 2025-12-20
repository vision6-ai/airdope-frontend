import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  iconColor?: string;
  isActive?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "General", href: "#" },
      { label: "Notifications", href: "#" },
      { label: "Team Members", href: "#" },
      { label: "Logs", href: "#" },
      { label: "Display", href: "#" },
    ],
  },
  {
    title: "Billing",
    items: [
      { label: "Subscriptions", href: "#", isActive: true },
      { label: "Invoices", href: "#" },
      { label: "Payment Details", href: "#" },
    ],
  },
  {
    title: "Inbox",
    items: [
      { label: "Live Chat Behavior", href: "#" },
      { label: "Auto-Assignment", href: "#" },
    ],
  },
  {
    title: "Channels",
    items: [
      { label: "Instagram", href: "#", icon: "fa-brands fa-instagram", iconColor: "text-pink-500" },
      { label: "TikTok", href: "#", icon: "fa-brands fa-tiktok", iconColor: "text-white" },
      { label: "WhatsApp", href: "#", icon: "fa-brands fa-whatsapp", iconColor: "text-green-500" },
      { label: "Messenger", href: "#", icon: "fa-brands fa-facebook-messenger", iconColor: "text-blue-500" },
      { label: "SMS", href: "#", icon: "fa-solid fa-comment-sms", iconColor: "text-sky-500" },
      { label: "Email", href: "#", icon: "fa-solid fa-envelope", iconColor: "text-purple-500" },
      { label: "Telegram", href: "#", icon: "fa-brands fa-telegram", iconColor: "text-blue-400" },
    ],
  },
];

export function SettingsSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 pr-8">
      <h1 className="text-3xl font-bold text-white mb-10">Settings</h1>

      <nav className="space-y-8">
        {navSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold text-brand-gray-100 uppercase mb-3 tracking-wider">
              {section.title}
            </h2>
            <ul className={section.title === "Channels" ? "space-y-2.5" : "space-y-2"}>
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center text-sm transition-colors ${
                      item.isActive
                        ? "text-white font-medium"
                        : "text-brand-gray-100 hover:text-white"
                    }`}
                  >
                    {item.icon && (
                      <i className={`${item.icon} w-5 text-center mr-2 ${item.iconColor}`}></i>
                    )}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
