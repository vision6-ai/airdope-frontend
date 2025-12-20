import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { SendBlastModal } from "./SendBlastModal";

export function BlastsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <BlastComposer onOpenModal={() => setIsModalOpen(true)} />
      <BlastInfoCard onOpenModal={() => setIsModalOpen(true)} />
      <DropDayMessage />
      <EmailSettingsCard />
      <SystemMessagesSection />
      <SendBlastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

interface BlastComposerProps {
  onOpenModal: () => void;
}

function BlastComposer({ onOpenModal }: BlastComposerProps) {
  return (
    <section>
      <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-4">
        <div className="flex items-start space-x-4">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover mt-1"
          />
          <div className="flex-grow">
            <textarea
              rows={2}
              placeholder="Send a blast to your guests..."
              className="w-full bg-transparent text-gray-300 placeholder-brand-gray-100 focus:outline-none resize-none"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={onOpenModal}
            className="flex items-center space-x-2 text-sm text-brand-gray-100 hover:text-white font-medium transition-colors"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            <span>Advanced</span>
          </button>
          <button
            onClick={onOpenModal}
            className="bg-brand-gray-300 hover:bg-brand-gray-200 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
          >
            <i className="fa-solid fa-paper-plane" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </section>
  );
}

interface BlastInfoCardProps {
  onOpenModal: () => void;
}

function BlastInfoCard({ onOpenModal }: BlastInfoCardProps) {
  return (
    <section>
      <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Send Blasts</h2>
          <p className="text-brand-gray-100 max-w-sm">
            Share updates with your guests via email, SMS, and push notifications.
          </p>
          <button
            onClick={onOpenModal}
            className="mt-4 bg-white hover:bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-paper-plane" />
            Send a Blast
          </button>
        </div>
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border-2 border-dashed border-brand-gray-200 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-gray-100 text-xl">
            <i className="fa-solid fa-bell" />
          </div>
          <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            <i className="fa-solid fa-envelope" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-brand-gray-400">
              1
            </span>
          </div>
          <div className="absolute top-6 right-0 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            <i className="fa-solid fa-comment-sms" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-brand-gray-400">
              1
            </span>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black text-2xl shadow-lg">
            <i className="fa-brands fa-apple" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-brand-gray-400">
              1
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DropDayMessage() {
  const [enabled, setEnabled] = useState(true);
  const [sendTo, setSendTo] = useState("all");

  return (
    <section className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Drop day message</h2>
          <p className="text-brand-gray-100 mt-1">
            This message will automatically be sent out to fans that RSVP'd at the scheduled drop time
          </p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="w-12 h-7 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-brand-gray-300"
        />
      </div>
      <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6 space-y-6">
        <div className="relative border border-red-500/50 rounded-lg p-3">
          <label className="absolute -top-2.5 left-3 bg-brand-gray-400 px-1 text-xs text-red-400/80">
            Drop day message
          </label>
          <textarea
            rows={3}
            placeholder="Yo its YIN. MITA GAMI - NEW SONG RELEASE is live! https://laylo-nwr20hr.com"
            className="w-full bg-transparent text-gray-300 placeholder-brand-gray-100 focus:outline-none resize-none"
          />
          <div className="absolute top-3 right-3 text-red-500/80">
            <i className="fa-solid fa-exclamation-circle" />
          </div>
          <p className="text-xs text-red-500/80 mt-1">Message must not be empty</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-4 text-brand-gray-100 text-lg">
              <button className="hover:text-white">
                <i className="fa-regular fa-circle-question" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ex. 12/21/2025"
              className="w-full bg-brand-gray-300/50 border border-brand-gray-200/50 rounded-lg p-3 placeholder-brand-gray-100 text-white focus:outline-none focus:border-white/30"
            />
            <i className="fa-regular fa-calendar absolute top-1/2 right-4 -translate-y-1/2 text-brand-gray-100" />
          </div>
          <div className="relative">
            <select className="w-full bg-brand-gray-300/50 border border-brand-gray-200/50 rounded-lg p-3 appearance-none text-white focus:outline-none focus:border-white/30">
              <option>ex. 12:00 PM</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute top-1/2 right-4 -translate-y-1/2 text-brand-gray-100" />
          </div>
        </div>
        <div>
          <span className="text-sm font-medium text-white mr-4">Send to</span>
          <div className="inline-flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="send_to"
                checked={sendTo === "all"}
                onChange={() => setSendTo("all")}
                className="hidden peer"
              />
              <span className="w-5 h-5 rounded-full border-2 border-brand-gray-100 flex items-center justify-center peer-checked:border-white">
                {sendTo === "all" && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
              </span>
              <span className="text-sm text-gray-300">All fans (1)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="send_to"
                checked={sendTo === "rsvp"}
                onChange={() => setSendTo("rsvp")}
                className="hidden peer"
              />
              <span className="w-5 h-5 rounded-full border-2 border-brand-gray-100 flex items-center justify-center peer-checked:border-white">
                {sendTo === "rsvp" && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
              </span>
              <span className="text-sm text-gray-300">Only RSVPs for this Drop</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailSettingsCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Email settings</h3>
          <p className="text-sm text-brand-gray-100 mt-1">For fans that sign up by email</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-brand-gray-100 hover:text-white"
        >
          <i className={`fa-solid fa-chevron-${expanded ? "up" : "down"}`} />
        </button>
      </div>
      {expanded && (
        <>
          <div className="space-y-4 mt-6">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-brand-gray-400 px-1 text-xs text-brand-gray-100">
                Email subject line
              </label>
              <input
                type="text"
                defaultValue="MITA GAMI - NEW SONG RELEASE"
                className="w-full bg-transparent border border-brand-gray-200/50 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="relative border border-white/30 rounded-lg p-3 flex items-center space-x-3 cursor-pointer bg-white/5">
              <i className="fa-regular fa-file-alt text-gray-300" />
              <span className="flex-grow text-white font-medium">Magic Template</span>
              <i className="fa-solid fa-chevron-down text-brand-gray-100" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <button className="text-sm font-medium text-brand-gray-100 hover:text-white transition-colors">
              Send test
            </button>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-100 text-brand-dark text-sm font-semibold rounded-lg transition-colors">
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function SystemMessagesSection() {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold text-white mb-6">System Messages</h2>
      <div className="space-y-4">
        <EventRemindersCard />
      </div>
    </section>
  );
}

function EventRemindersCard() {
  const [enabled, setEnabled] = useState(true);
  const [reminder1Enabled, setReminder1Enabled] = useState(true);
  const [reminder2Enabled, setReminder2Enabled] = useState(true);

  return (
    <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center bg-brand-gray-300 rounded-lg text-brand-gray-100">
            <i className="fa-regular fa-clock" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Event Reminders</h3>
            <p className="text-sm text-brand-gray-100">
              Automated reminders sent via email, SMS, and push notification
            </p>
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="w-12 h-7 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-brand-gray-300"
        />
      </div>

      <div className="space-y-4">
        <ReminderItem
          label="1 day before"
          message="AI day is starting tomorrow"
          recipient="Going"
          scheduled="Dec 24, 11:00 AM"
          enabled={reminder1Enabled}
          onToggle={setReminder1Enabled}
        />
        <ReminderItem
          label="1 hour before"
          message="AI day is starting in 1 hour"
          recipient="Going"
          scheduled="Dec 25, 10:00 AM"
          enabled={reminder2Enabled}
          onToggle={setReminder2Enabled}
        />
      </div>

      <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-white hover:bg-gray-100 text-brand-dark text-sm font-semibold rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

interface ReminderItemProps {
  label: string;
  message: string;
  recipient: string;
  scheduled: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

function ReminderItem({ label, message, recipient, scheduled, enabled, onToggle }: ReminderItemProps) {
  return (
    <div className="bg-brand-gray-300/50 border border-brand-gray-200/50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 text-brand-gray-100">
          <i className="fa-solid fa-clock text-sm" />
          <span className="text-sm font-medium text-white">{label}</span>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          className="w-10 h-6 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-brand-gray-200"
        />
      </div>
      <textarea
        rows={2}
        className="w-full bg-brand-gray-400/50 border border-brand-gray-200/50 rounded-lg p-3 text-gray-300 placeholder-brand-gray-100 focus:outline-none focus:border-white/30 text-sm resize-none"
        defaultValue={message}
        placeholder="Enter reminder message..."
      />
      <div className="flex items-center justify-between mt-3 text-xs text-brand-gray-100">
        <span>To: {recipient}</span>
        <span>Scheduled: {scheduled}</span>
      </div>
    </div>
  );
}

