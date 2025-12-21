import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { GuestsTab } from "../../components/guests/GuestsTab";
import { BlastsTab } from "../../components/blasts/BlastsTab";
import { RegistrationTab } from "../../components/registration/RegistrationTab";
import { InsightsTab } from "../../components/insights/InsightsTab";
import { MoreTab } from "../../components/more/MoreTab";
import { SendBlastModal } from "../../components/blasts/SendBlastModal";

const tabs = ["Overview", "Guests", "Registration", "Blasts", "Insights", "More"];

export function ManageDropPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isBlastModalOpen, setIsBlastModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative bg-brand-dark text-gray-200">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/30 via-purple-800/10 to-transparent pointer-events-none" />

      <div className="relative z-[1]">
        <Header />

        <main className="max-w-5xl mx-auto px-8 py-12">
          <DropManagerHeader activeTab={activeTab} onTabChange={setActiveTab} dropId={id} />
          {activeTab === "Guests" ? (
            <GuestsTab />
          ) : activeTab === "Blasts" ? (
            <BlastsTab />
          ) : activeTab === "Registration" ? (
            <RegistrationTab />
          ) : activeTab === "Insights" ? (
            <InsightsTab />
          ) : activeTab === "More" ? (
            <MoreTab />
          ) : (
            <>
              <DropActions onOpenBlastModal={() => setIsBlastModalOpen(true)} />
              <DropPreviewDetails />
              <DropInvites />
              <DropGuests />
              <DropHosts />
              <DropVisibility />
            </>
          )}
        </main>

        <footer className="max-w-7xl mx-auto px-8 pt-12 pb-16">
          <div className="border-t border-white/10 pt-8 text-center text-sm text-brand-gray-100">
            <p>2025 AirDope. The Buzz OS.</p>
          </div>
        </footer>
      </div>

      <SendBlastModal isOpen={isBlastModalOpen} onClose={() => setIsBlastModalOpen(false)} />
    </div>
  );
}

interface DropManagerHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dropId?: string;
}

function DropManagerHeader({ activeTab, onTabChange, dropId }: DropManagerHeaderProps) {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white tracking-tight">AI day</h1>
        <Link
          to={`/drop/${dropId || "1"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-white hover:bg-gray-100 text-brand-dark text-sm font-semibold rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>Drop Page</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
        </Link>
      </div>
      <nav className="border-b border-white/10">
        <div className="flex items-center space-x-8 text-sm font-medium text-brand-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`py-3 transition-colors ${
                activeTab === tab
                  ? "text-white border-b-2 border-white"
                  : "hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}

interface DropActionsProps {
  onOpenBlastModal: () => void;
}

function DropActions({ onOpenBlastModal }: DropActionsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <button className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium">
        <i className="fa-solid fa-user-plus text-blue-400" />
        <span>Invite Guests</span>
      </button>
      <button
        onClick={onOpenBlastModal}
        className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium"
      >
        <i className="fa-solid fa-paper-plane text-purple-400" />
        <span>Send a Blast</span>
      </button>
      <button className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium">
        <i className="fa-solid fa-share-nodes text-red-400" />
        <span>Share Drop</span>
      </button>
    </section>
  );
}

function DropPreviewDetails() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div className="bg-brand-gray-400/80 rounded-2xl p-6 border border-brand-gray-200/50">
        <div className="flex space-x-6">
          <div className="w-36 h-36 flex-shrink-0">
            <div className="h-36 overflow-hidden rounded-lg">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c91ed0a6e8-735850ffd382fcacf3ed.png"
                alt="Event invitation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">AI day</h3>
            <p className="text-sm text-gray-300">Thursday, December 25</p>
            <p className="text-sm text-gray-400 mb-2">11:00 AM</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-1">Hosted by</p>
          <div className="flex items-center space-x-2">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              className="w-6 h-6 rounded-full"
              alt="Host avatar"
            />
            <span className="text-sm font-medium text-white">Mayan Warior</span>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between bg-brand-gray-300/50 rounded-lg p-2">
            <span className="text-sm text-gray-300 truncate pl-2">
              airdope.com/y9i1abt1
            </span>
            <button className="bg-brand-gray-200 hover:bg-white/20 text-white text-xs font-bold py-2 px-4 rounded-md transition-colors">
              COPY
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">When & Where</h3>
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex flex-col items-center justify-center bg-brand-gray-300 rounded-lg w-14 h-14 p-2">
            <span className="text-xs text-brand-gray-100 uppercase">DEC</span>
            <span className="text-xl font-bold text-white">25</span>
          </div>
          <div>
            <p className="font-medium text-white">Thursday, Dec 25</p>
            <p className="text-sm text-brand-gray-100">11:00 AM - 12:00 PM GMT+2</p>
          </div>
        </div>
        <p className="text-xs text-brand-gray-100 mt-4">
          The address is shown publicly on the event page.
        </p>
        <div className="flex items-center space-x-4 mt-6">
          <button className="flex-1 text-center py-2 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-medium rounded-lg transition-colors">
            Edit Drop
          </button>
          <button className="flex-1 text-center py-2 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-medium rounded-lg transition-colors">
            Change Photo
          </button>
        </div>
      </div>
    </section>
  );
}

function DropInvites() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Invites</h3>
        <button className="px-3 py-1.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-xs font-medium rounded-lg transition-colors flex items-center space-x-2">
          <i className="fa-solid fa-plus" />
          <span>Invite Guests</span>
        </button>
      </div>
      <p className="text-sm text-brand-gray-100 mb-6">
        Invite subscribers, contacts and past guests via email or SMS.
      </p>
      <div className="bg-brand-gray-400/80 rounded-lg p-8 text-center border border-brand-gray-200/50">
        <div className="w-12 h-12 bg-brand-gray-300 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fa-regular fa-envelope-open text-xl text-brand-gray-100" />
        </div>
        <h4 className="font-medium text-white">No Invites Sent</h4>
        <p className="text-sm text-brand-gray-100">
          You can invite subscribers, contacts and past guests to the event.
        </p>
      </div>
    </section>
  );
}

function DropGuests() {
  return (
    <section className="mb-12">
      <h3 className="text-lg font-semibold text-white mb-2">Guests</h3>
      <div className="flex items-center space-x-2 text-sm mb-3">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-green-400 font-medium">1</span>
        <span className="text-brand-gray-100">RSVP</span>
      </div>
      <div className="w-full h-1.5 bg-brand-gray-300 rounded-full mb-6">
        <div className="w-1/12 h-full bg-green-500 rounded-full" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-white">Recent Registrations</h4>
        <Link
          to="#"
          className="text-sm text-brand-gray-100 hover:text-white font-medium transition-colors flex items-center"
        >
          All Guests <i className="fa-solid fa-arrow-right ml-2 text-xs" />
        </Link>
      </div>
      <div className="bg-brand-gray-400/80 rounded-lg p-4 flex items-center justify-between border border-brand-gray-200/50">
        <div className="flex items-center space-x-3">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
            className="w-8 h-8 rounded-full object-cover"
            alt="Guest avatar"
          />
          <div>
            <p className="font-medium text-white text-sm">Yol</p>
            <p className="text-xs text-brand-gray-100">levinyinon2@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            RSVP
          </span>
          <span className="text-xs text-brand-gray-100">Dec 18</span>
        </div>
      </div>
    </section>
  );
}

function DropHosts() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Hosts</h3>
        <button className="px-3 py-1.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-xs font-medium rounded-lg transition-colors flex items-center space-x-2">
          <i className="fa-solid fa-plus" />
          <span>Add Host</span>
        </button>
      </div>
      <div className="bg-brand-gray-400/80 rounded-lg p-4 flex items-center justify-between border border-brand-gray-200/50">
        <div className="flex items-center space-x-3">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
            className="w-8 h-8 rounded-full object-cover"
            alt="Host avatar"
          />
          <div>
            <p className="font-medium text-white text-sm">Yol</p>
            <p className="text-xs text-brand-gray-100">levinyinon2@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs font-medium bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
            Creator
          </span>
          <button className="text-brand-gray-100 hover:text-white">
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>
      </div>
    </section>
  );
}

function DropVisibility() {
  return (
    <section className="mb-12">
      <h3 className="text-lg font-semibold text-white">Visibility & Discovery</h3>
      <p className="text-sm text-brand-gray-100 mb-6">
        Control how people can find your event.
      </p>
      <div className="bg-brand-gray-400/80 rounded-lg p-6 border border-brand-gray-200/50">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-pink-300 rounded-full flex-shrink-0 flex items-center justify-center text-lg">
            <span role="img" aria-label="smile">&#128522;</span>
          </div>
          <div>
            <h4 className="font-semibold text-white">Mayan Warrior Page</h4>
            <p className="text-sm text-brand-gray-100 mt-1 flex items-center">
              <i className="fa-solid fa-globe text-green-500 mr-2" />
              <span className="text-green-400 font-medium">Public</span>
              <span className="ml-1">— This event is listed on your profile page.</span>
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <button className="px-3 py-1.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-xs font-medium rounded-lg transition-colors flex items-center space-x-2">
                <i className="fa-solid fa-eye" />
                <span>Change Visibility</span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 my-6" />
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex-shrink-0 flex items-center justify-center text-lg">
              <span role="img" aria-label="robot">&#129302;</span>
            </div>
            <div>
              <p className="text-sm text-brand-gray-100">Featured by AirDope</p>
              <h4 className="font-semibold text-white">Drop title</h4>
              <p className="text-sm text-brand-gray-100">Category featured event page</p>
            </div>
          </div>
          <button className="text-brand-gray-100 hover:text-white">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
    </section>
  );
}
