import React, { useState } from "react";

interface SendBlastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendBlastModal({ isOpen, onClose }: SendBlastModalProps) {
  const [fanSelection, setFanSelection] = useState<"all" | "specific">("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [channelSelection, setChannelSelection] = useState<"ai" | "manual">("ai");
  const [activePanel, setActivePanel] = useState("location");
  const [selectedDrops, setSelectedDrops] = useState<string[]>([]);
  const [dropsDropdownOpen, setDropsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const availableDrops = [
    "Summer Collection 2024",
    "Limited Edition Sneakers",
    "Artist Collab Series",
    "Exclusive Merch Drop",
  ];

  const toggleDrop = (drop: string) => {
    setSelectedDrops((prev) =>
      prev.includes(drop) ? prev.filter((d) => d !== drop) : [...prev, drop]
    );
  };

  const advancedNavItems = [
    { id: "location", icon: "fa-solid fa-location-dot", label: "Location" },
    { id: "drops", icon: "fa-solid fa-droplet", label: "Drops" },
    { id: "segments", icon: "fa-solid fa-layer-group", label: "Drop segments" },
    { id: "imports", icon: "fa-solid fa-upload", label: "Imports" },
    { id: "signup", icon: "fa-regular fa-circle-check", label: "Signup type" },
    { id: "conversions", icon: "fa-solid fa-arrow-right-arrow-left", label: "Conversions" },
  ];

  const channels = [
    { id: "email", icon: "fa-regular fa-envelope", label: "Email", defaultChecked: true },
    { id: "sms", icon: "fa-solid fa-comment-sms", label: "SMS", defaultChecked: true },
    { id: "whatsapp", icon: "fa-brands fa-whatsapp", label: "WhatsApp", defaultChecked: false },
    { id: "instagram", icon: "fa-brands fa-instagram", label: "Instagram", defaultChecked: false },
    { id: "tiktok", icon: "fa-brands fa-tiktok", label: "TikTok", defaultChecked: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C1C1E] rounded-2xl p-8 w-full max-w-lg text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 bg-[#3A3A3C] rounded-full flex items-center justify-center text-[#AEAEB2] hover:bg-[#2C2C2E] transition-colors"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <ModalHeader />

        <form className="space-y-6">
          <RecipientsSection
            fanSelection={fanSelection}
            setFanSelection={setFanSelection}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            selectedDrops={selectedDrops}
            toggleDrop={toggleDrop}
            availableDrops={availableDrops}
            dropsDropdownOpen={dropsDropdownOpen}
            setDropsDropdownOpen={setDropsDropdownOpen}
            advancedNavItems={advancedNavItems}
          />

          <SubjectInput />
          <MessageInput />

          <ChannelsSection
            channelSelection={channelSelection}
            setChannelSelection={setChannelSelection}
            channels={channels}
          />
        </form>

        <ModalFooter onClose={onClose} />
      </div>
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="flex flex-col items-start mb-6">
      <div className="w-16 h-16 bg-[#2C2C2E] rounded-full flex items-center justify-center mb-5">
        <i className="fa-regular fa-envelope text-3xl text-[#E5E5EA]" />
      </div>
      <h2 className="text-3xl font-bold text-white">Send Blast</h2>
      <p className="text-[#AEAEB2] mt-2">
        Guests will receive the blast via email, SMS or in-app notification. It
        will also be shown on the event page.
      </p>
    </div>
  );
}

interface RecipientsSectionProps {
  fanSelection: "all" | "specific";
  setFanSelection: (value: "all" | "specific") => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  activePanel: string;
  setActivePanel: (value: string) => void;
  selectedDrops: string[];
  toggleDrop: (drop: string) => void;
  availableDrops: string[];
  dropsDropdownOpen: boolean;
  setDropsDropdownOpen: (value: boolean) => void;
  advancedNavItems: { id: string; icon: string; label: string }[];
}

function RecipientsSection({
  fanSelection,
  setFanSelection,
  showAdvanced,
  setShowAdvanced,
  activePanel,
  setActivePanel,
  selectedDrops,
  toggleDrop,
  availableDrops,
  dropsDropdownOpen,
  setDropsDropdownOpen,
  advancedNavItems,
}: RecipientsSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#E5E5EA] mb-2">
        Fans
      </label>

      {!showAdvanced ? (
        <div className="space-y-3">
          <RadioOption
            id="all-fans"
            name="fan-selection"
            checked={fanSelection === "all"}
            onChange={() => setFanSelection("all")}
            label="All Fans"
          />

          <RadioOption
            id="specific-drops"
            name="fan-selection"
            checked={fanSelection === "specific"}
            onChange={() => setFanSelection("specific")}
            label="Specific Drops"
          />

          {fanSelection === "specific" && (
            <div className="ml-7">
              <DropsDropdown
                availableDrops={availableDrops}
                selectedDrops={selectedDrops}
                toggleDrop={toggleDrop}
                isOpen={dropsDropdownOpen}
                setIsOpen={setDropsDropdownOpen}
              />
              <SelectedDropsTags
                selectedDrops={selectedDrops}
                toggleDrop={toggleDrop}
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(true)}
              className="text-sm font-semibold text-white hover:text-[#AEAEB2] transition-colors"
            >
              Advanced Targeting <i className="fa-solid fa-arrow-right ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <AdvancedTargeting
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          advancedNavItems={advancedNavItems}
          onBack={() => setShowAdvanced(false)}
        />
      )}
    </div>
  );
}

interface RadioOptionProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

function RadioOption({ id, name, checked, onChange, label }: RadioOptionProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-white bg-[#2C2C2E] border-[#3A3A3C] focus:ring-white/50"
      />
      <label htmlFor={id} className="text-sm font-medium text-white cursor-pointer">
        {label}
      </label>
    </div>
  );
}

interface DropsDropdownProps {
  availableDrops: string[];
  selectedDrops: string[];
  toggleDrop: (drop: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function DropsDropdown({
  availableDrops,
  selectedDrops,
  toggleDrop,
  isOpen,
  setIsOpen,
}: DropsDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-[#3A3A3C] transition-colors"
      >
        <span className="text-[#AEAEB2]">
          {selectedDrops.length > 0
            ? `${selectedDrops.length} drop${selectedDrops.length > 1 ? "s" : ""} selected`
            : "Select drops..."}
        </span>
        <i className="fa-solid fa-chevron-down text-[#8E8E93]" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg shadow-xl max-h-64 overflow-y-auto">
          <div className="p-2 space-y-1">
            {availableDrops.map((drop) => (
              <label
                key={drop}
                className="flex items-center gap-3 px-3 py-2 hover:bg-[#3A3A3C] rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedDrops.includes(drop)}
                  onChange={() => toggleDrop(drop)}
                  className="w-4 h-4 text-white bg-[#1C1C1E] border-[#3A3A3C] rounded focus:ring-white/50"
                />
                <span className="text-sm text-white">{drop}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SelectedDropsTagsProps {
  selectedDrops: string[];
  toggleDrop: (drop: string) => void;
}

function SelectedDropsTags({ selectedDrops, toggleDrop }: SelectedDropsTagsProps) {
  if (selectedDrops.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {selectedDrops.map((drop) => (
        <span
          key={drop}
          className="bg-[#3A3A3C] text-white text-sm font-medium px-3 py-1 rounded-md flex items-center gap-2"
        >
          {drop}
          <button
            type="button"
            onClick={() => toggleDrop(drop)}
            className="text-gray-300 hover:text-white"
          >
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </span>
      ))}
    </div>
  );
}

interface AdvancedTargetingProps {
  activePanel: string;
  setActivePanel: (value: string) => void;
  advancedNavItems: { id: string; icon: string; label: string }[];
  onBack: () => void;
}

function AdvancedTargeting({
  activePanel,
  setActivePanel,
  advancedNavItems,
  onBack,
}: AdvancedTargetingProps) {
  return (
    <div>
      <div className="flex border border-[#3A3A3C] rounded-xl bg-[#2C2C2E]/50 min-h-[350px]">
        <div className="w-1/3 border-r border-[#3A3A3C] p-4">
          <div className="mb-4">
            <p className="text-xs text-[#AEAEB2]">Sending to</p>
            <p className="text-2xl font-bold text-white">1 fan</p>
          </div>
          <hr className="border-[#3A3A3C] mb-4" />
          <div>
            <p className="text-xs text-[#AEAEB2] mb-2">TYPE</p>
            <nav className="space-y-1">
              {advancedNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePanel(item.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePanel === item.id
                      ? "bg-white/10 text-white"
                      : "text-[#AEAEB2] hover:bg-white/5"
                  }`}
                >
                  <i className={`${item.icon} w-4 text-center`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-2/3 p-6">
          <AdvancedPanel activePanel={activePanel} />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-white hover:text-[#AEAEB2] transition-colors"
        >
          <i className="fa-solid fa-arrow-left mr-1" /> Back to Simple Targeting
        </button>
      </div>
    </div>
  );
}

function AdvancedPanel({ activePanel }: { activePanel: string }) {
  const panels: Record<string, { title: string; description: string }> = {
    location: { title: "Location", description: "" },
    drops: { title: "Drops", description: "Select fans who signed up for specific drops." },
    segments: { title: "Drop Segments", description: "Target fans based on pre-defined segments." },
    imports: { title: "Imports", description: "Select fans from previous contact imports." },
    signup: { title: "Signup Type", description: "Filter fans by how they signed up." },
    conversions: { title: "Conversions", description: "Target fans based on conversion events." },
  };

  const panel = panels[activePanel];

  if (activePanel === "location") {
    return (
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Location</h3>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 left-4 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Search by city, state, country"
            className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg pl-11 pr-4 py-3 placeholder-[#8E8E93] text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
          />
        </div>
        <h4 className="text-sm font-semibold text-white mt-6 mb-3">Recent</h4>
        <div className="text-center py-8">
          <p className="text-[#8E8E93]">No recent locations.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">{panel.title}</h3>
      <p className="text-[#AEAEB2]">{panel.description}</p>
    </div>
  );
}

function SubjectInput() {
  return (
    <div>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-[#E5E5EA] mb-2"
      >
        Subject (Optional)
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder="New message in AI day"
        className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg px-4 py-3 placeholder-[#8E8E93] text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
      />
    </div>
  );
}

function MessageInput() {
  return (
    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium text-[#E5E5EA] mb-2"
      >
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={5}
        placeholder="Share a message with your guests..."
        className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg px-4 py-3 placeholder-[#8E8E93] text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow resize-none"
      />
    </div>
  );
}

interface ChannelsSectionProps {
  channelSelection: "ai" | "manual";
  setChannelSelection: (value: "ai" | "manual") => void;
  channels: { id: string; icon: string; label: string; defaultChecked: boolean }[];
}

function ChannelsSection({
  channelSelection,
  setChannelSelection,
  channels,
}: ChannelsSectionProps) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-[#E5E5EA] mb-3">
        Channels
      </label>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="ai-channels"
            name="channel-selection"
            checked={channelSelection === "ai"}
            onChange={() => setChannelSelection("ai")}
            className="w-4 h-4 text-white bg-[#2C2C2E] border-[#3A3A3C] focus:ring-white/50"
          />
          <label
            htmlFor="ai-channels"
            className="text-sm font-medium text-white cursor-pointer flex items-center gap-2"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-[#AEAEB2]" />
            Let AI choose best channels
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="manual-channels"
            name="channel-selection"
            checked={channelSelection === "manual"}
            onChange={() => setChannelSelection("manual")}
            className="w-4 h-4 text-white bg-[#2C2C2E] border-[#3A3A3C] focus:ring-white/50"
          />
          <label
            htmlFor="manual-channels"
            className="text-sm font-medium text-white cursor-pointer"
          >
            Choose channels manually
          </label>
        </div>

        {channelSelection === "manual" && (
          <div className="ml-7 space-y-2.5">
            {channels.map((channel) => (
              <label
                key={channel.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  defaultChecked={channel.defaultChecked}
                  className="w-4 h-4 text-white bg-[#1C1C1E] border-[#3A3A3C] rounded focus:ring-white/50"
                />
                <div className="flex items-center gap-2">
                  <i
                    className={`${channel.icon} text-[#AEAEB2] group-hover:text-white transition-colors`}
                  />
                  <span className="text-sm text-white">{channel.label}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ModalFooterProps {
  onClose: () => void;
}

function ModalFooter({ onClose }: ModalFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <i className="fa-regular fa-paper-plane" />
          Send
        </button>
        <button
          type="button"
          className="bg-[#3A3A3C] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2C2C2E] transition-colors"
        >
          Schedule
        </button>
      </div>
      <button
        type="button"
        className="text-[#AEAEB2] font-semibold hover:text-white transition-colors"
      >
        Preview
      </button>
    </div>
  );
}
