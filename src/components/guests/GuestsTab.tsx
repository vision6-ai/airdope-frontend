import React, { useState } from "react";

const mockGuests = [
  {
    id: 1,
    name: "Olivia Rhye",
    contact: "olivia@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    rsvpStatus: "going",
    checkIn: "checked",
    guestType: "vip",
  },
  {
    id: 2,
    name: "Phoenix Baker",
    contact: "+1 555-123-4567",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    rsvpStatus: "going",
    checkIn: "checked",
    guestType: "regular",
  },
  {
    id: 3,
    name: "Lana Steiner",
    contact: "lana.s@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    rsvpStatus: "going",
    checkIn: "pending",
    guestType: "regular",
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    contact: "demi@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    rsvpStatus: "maybe",
    checkIn: "pending",
    guestType: "vip",
  },
  {
    id: 5,
    name: "Candice Wu",
    contact: "candice@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    rsvpStatus: "cantgo",
    checkIn: "na",
    guestType: "regular",
  },
  {
    id: 6,
    name: "Natali Craig",
    contact: "+1 555-987-6543",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    rsvpStatus: "noresponse",
    checkIn: "pending",
    guestType: "regular",
  },
  {
    id: 7,
    name: "Drew Cano",
    contact: "drew@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    rsvpStatus: "going",
    checkIn: "checked",
    guestType: "regular",
  },
  {
    id: 8,
    name: "Andi Lane",
    contact: "andi@email.com",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    rsvpStatus: "going",
    checkIn: "pending",
    guestType: "vip",
  },
];

export function GuestsTab() {
  return (
    <>
      <GuestsStats />
      <GuestsActions />
      <GuestsList />
    </>
  );
}

function GuestsStats() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-gray-100 font-medium">Total Fans</span>
            <div className="bg-purple-500/20 text-purple-400 p-2 rounded-lg">
              <i className="fa-solid fa-users" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">247</div>
          <div className="flex items-center text-xs text-green-400">
            <i className="fa-solid fa-arrow-up mr-1" />
            <span>18% from last drop</span>
          </div>
        </div>

        <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-gray-100 font-medium">Today Fans</span>
            <div className="bg-green-500/20 text-green-400 p-2 rounded-lg">
              <i className="fa-solid fa-check-circle" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">189</div>
          <div className="flex items-center text-xs text-brand-gray-100">
            <span>Fans who sign up today</span>
          </div>
        </div>

        <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-gray-100 font-medium">New Fans</span>
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
              <i className="fa-solid fa-ticket" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">142</div>
          <div className="flex items-center text-xs text-brand-gray-100">
            <span>First time fans interacting with your drop</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestsActions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <button className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium">
        <i className="fa-solid fa-user-plus text-blue-400" />
        <span>Invite Guests</span>
      </button>
      <button className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium">
        <i className="fa-solid fa-paper-plane text-purple-400" />
        <span>Send Reminder</span>
      </button>
      <button className="flex items-center justify-center space-x-3 bg-brand-gray-300 hover:bg-brand-gray-200 transition-colors rounded-lg p-4 font-medium">
        <i className="fa-solid fa-download text-green-400" />
        <span>Export List</span>
      </button>
    </section>
  );
}

function GuestsList() {
  const [searchMode, setSearchMode] = useState<"regular" | "ai">("regular");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Guest List</h2>
        <div className="flex items-center space-x-2">
          <button className="w-9 h-9 flex items-center justify-center bg-brand-gray-300 hover:bg-brand-gray-200 rounded-lg text-brand-gray-100 hover:text-white transition-colors">
            <i className="fa-solid fa-download" />
          </button>
        </div>
      </div>

      <SearchAndFilters searchMode={searchMode} onSearchModeChange={setSearchMode} />
      <GuestsTable />
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </section>
  );
}

interface SearchAndFiltersProps {
  searchMode: "regular" | "ai";
  onSearchModeChange: (mode: "regular" | "ai") => void;
}

function SearchAndFilters({ searchMode, onSearchModeChange }: SearchAndFiltersProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center space-x-2 mb-3">
        <button
          onClick={() => onSearchModeChange("regular")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            searchMode === "regular"
              ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
              : "bg-brand-gray-300 text-brand-gray-100 hover:bg-brand-gray-200 hover:text-white"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => onSearchModeChange("ai")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            searchMode === "ai"
              ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
              : "bg-brand-gray-300 text-brand-gray-100 hover:bg-brand-gray-200 hover:text-white"
          }`}
        >
          <i className="fa-solid fa-sparkles mr-1.5" />
          AI Search
        </button>
      </div>

      {searchMode === "regular" ? <RegularSearch /> : <AISearch />}
    </div>
  );
}

function RegularSearch() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-grow">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-100" />
        <input
          type="text"
          placeholder="Search guests..."
          className="w-full bg-brand-gray-300 border border-transparent focus:border-purple-400 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder-brand-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
        />
      </div>
      <button className="flex items-center space-x-2 bg-brand-gray-300 hover:bg-brand-gray-200 px-4 py-2.5 rounded-lg text-white font-medium transition-colors">
        <i className="fa-solid fa-filter text-brand-gray-100" />
        <span>All Guests</span>
        <i className="fa-solid fa-chevron-down text-xs ml-1" />
      </button>
      <button className="flex items-center space-x-2 bg-brand-gray-300 hover:bg-brand-gray-200 px-4 py-2.5 rounded-lg text-white font-medium transition-colors">
        <i className="fa-solid fa-arrow-up-wide-short text-brand-gray-100" />
        <span>RSVP Time</span>
        <i className="fa-solid fa-chevron-down text-xs ml-1" />
      </button>
    </div>
  );
}

function AISearch() {
  return (
    <div>
      <div className="relative">
        <i className="fa-solid fa-sparkles absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
        <input
          type="text"
          placeholder="Ask AI: Show me guests who RSVP'd but haven't checked in yet"
          className="w-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/50 focus:border-purple-400 rounded-lg py-2.5 pl-11 pr-32 text-white placeholder-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
          Search
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-brand-gray-100 mr-2">Quick queries:</span>
        <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
          VIP guests
        </button>
        <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
          No-shows from last drop
        </button>
        <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
          First-time guests
        </button>
        <button className="px-3 py-1 bg-brand-gray-300 hover:bg-brand-gray-200 text-brand-gray-100 hover:text-white text-xs rounded-lg transition-colors">
          Pending RSVP
        </button>
      </div>
    </div>
  );
}

function GuestsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-brand-gray-100 uppercase border-b border-brand-gray-200/50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Guest Name</th>
            <th scope="col" className="px-6 py-4 font-medium">RSVP Status</th>
            <th scope="col" className="px-6 py-4 font-medium">Check-In</th>
            <th scope="col" className="px-6 py-4 font-medium">Guest Type</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {mockGuests.map((guest, index) => (
            <GuestRow key={guest.id} guest={guest} isLast={index === mockGuests.length - 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface GuestRowProps {
  guest: typeof mockGuests[0];
  isLast: boolean;
}

function GuestRow({ guest, isLast }: GuestRowProps) {
  return (
    <tr className={`${!isLast ? "border-b border-brand-gray-300/50" : ""} hover:bg-brand-gray-300/30 transition-colors`}>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img src={guest.avatar} alt={guest.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{guest.name}</div>
            <div className="text-xs text-brand-gray-100">{guest.contact}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <RSVPBadge status={guest.rsvpStatus} />
      </td>
      <td className="px-6 py-4">
        <CheckInBadge status={guest.checkIn} />
      </td>
      <td className="px-6 py-4">
        <GuestTypeBadge type={guest.guestType} />
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-brand-gray-100 hover:text-white">
          <i className="fa-solid fa-ellipsis" />
        </button>
      </td>
    </tr>
  );
}

function RSVPBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; icon: string; label: string }> = {
    going: { bg: "bg-green-500/20", text: "text-green-400", icon: "fa-check", label: "Going" },
    maybe: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: "fa-clock", label: "Maybe" },
    cantgo: { bg: "bg-red-500/20", text: "text-red-400", icon: "fa-xmark", label: "Can't Go" },
    noresponse: { bg: "bg-brand-gray-300", text: "text-brand-gray-100", icon: "fa-question", label: "No Response" },
  };

  const style = styles[status] || styles.noresponse;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <i className={`fa-solid ${style.icon} mr-1`} />
      {style.label}
    </span>
  );
}

function CheckInBadge({ status }: { status: string }) {
  if (status === "checked") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
        <i className="fa-solid fa-ticket mr-1" />
        Checked In
      </span>
    );
  }
  if (status === "na") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-gray-300 text-brand-gray-100">
        N/A
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-gray-300 text-brand-gray-100">
      Pending
    </span>
  );
}

function GuestTypeBadge({ type }: { type: string }) {
  if (type === "vip") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
        VIP
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
      Regular
    </span>
  );
}

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const totalPages = 31;

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-gray-200/50">
      <div className="text-sm text-brand-gray-100">
        Showing <span className="font-medium text-white">1-8</span> of{" "}
        <span className="font-medium text-white">247</span> guests
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="px-3 py-1.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white rounded-lg text-sm transition-colors"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-purple-500 text-white"
                : "bg-brand-gray-300 hover:bg-brand-gray-200 text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-2 text-brand-gray-100">...</span>
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            currentPage === totalPages
              ? "bg-purple-500 text-white font-medium"
              : "bg-brand-gray-300 hover:bg-brand-gray-200 text-white"
          }`}
        >
          {totalPages}
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="px-3 py-1.5 bg-brand-gray-300 hover:bg-brand-gray-200 text-white rounded-lg text-sm transition-colors"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
