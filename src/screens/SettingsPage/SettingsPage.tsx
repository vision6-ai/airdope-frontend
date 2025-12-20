import React from "react";
import { Header } from "../../components/layout/Header";
import { SettingsSidebar } from "../../components/settings/SettingsSidebar";
import { SubscriptionSection } from "../../components/settings/SubscriptionSection";

export function SettingsPage() {
  return (
    <div className="bg-brand-dark text-gray-200 min-h-screen relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/30 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="w-full mx-auto relative z-[1]">
        <Header />

        <main className="flex max-w-7xl mx-auto px-8 py-12">
          <SettingsSidebar />
          <SubscriptionSection />
        </main>

        <footer className="max-w-7xl mx-auto px-8 pt-12 pb-16 mt-20">
          <div className="border-t border-white/10 pt-8 text-center text-sm text-brand-gray-100">
            <p>© 2025 AirDope. The Buzz OS.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
