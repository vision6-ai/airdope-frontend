import React, { useState } from "react";
import { Switch } from "../ui/switch";

export function RegistrationTab() {
  return (
    <div>
      <RegistrationOptions />
      <Divider />
      <KeywordRegistrationSection />
      <Divider />
      <RegistrationEmailSection />
      <Divider />
      <RegistrationQuestionsSection />
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/10 my-16" />;
}

function RegistrationOptions() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OptionCard
          icon="fa-solid fa-list-check"
          iconBgColor="bg-green-500/20"
          iconColor="text-green-400"
          title="Registration"
          value="Open"
        />
        <OptionCard
          icon="fa-solid fa-users-line"
          iconBgColor="bg-orange-500/20"
          iconColor="text-orange-400"
          title="Event Capacity"
          value="Unlimited"
        />
        <OptionCard
          icon="fa-solid fa-user-group"
          iconBgColor="bg-blue-500/20"
          iconColor="text-blue-400"
          title="Group Registration"
          value="Off"
        />
      </div>
    </section>
  );
}

interface OptionCardProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string;
}

function OptionCard({ icon, iconBgColor, iconColor, title, value }: OptionCardProps) {
  return (
    <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-xl p-4 flex items-center space-x-4">
      <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center ${iconBgColor} rounded-lg`}>
        <i className={`${icon} ${iconColor}`} />
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-brand-gray-100">{value}</p>
      </div>
    </div>
  );
}

function KeywordRegistrationSection() {
  return (
    <section className="mb-16">
      <SMSKeywordsManagement />
      <InstagramCommentsManagement />
    </section>
  );
}

function SMSKeywordsManagement() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Instagram/SMS keywords</h2>
          <p className="text-brand-gray-100">
            Let fans sign up by texting or sending an Instagram DM (case insensitive)
          </p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="w-12 h-6 data-[state=checked]:bg-brand-gray-200 data-[state=unchecked]:bg-brand-gray-300"
        />
      </div>
      <div className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6">
        <div className="relative">
          <label className="text-xs text-brand-gray-100">Add a Keyword</label>
          <input
            type="text"
            placeholder="Add a custom keyword"
            className="w-full bg-transparent text-white text-lg placeholder-brand-gray-200 focus:outline-none pt-1 pr-10 border-none"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-brand-gray-300 hover:bg-brand-gray-200 rounded-full transition-colors">
            <i className="fa-solid fa-plus text-white text-sm" />
          </button>
        </div>
        <hr className="border-t border-brand-gray-200/50 my-4" />
        <div className="flex items-center justify-between text-sm text-brand-gray-100">
          <p>Keywords are not case sensitive. Maximum of 5 keywords per Drop.</p>
          <button className="text-brand-gray-100 hover:text-white">
            <i className="fa-regular fa-circle-question text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

function InstagramCommentsManagement() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Instagram comments</h2>
          <p className="text-brand-gray-100">Let fans sign up with a comment on a specific post</p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="w-12 h-6 data-[state=checked]:bg-brand-gray-200 data-[state=unchecked]:bg-brand-gray-300"
        />
      </div>
      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 flex items-start space-x-3">
        <i className="fa-brands fa-instagram text-blue-400 text-xl mt-0.5" />
        <div>
          <p className="font-semibold text-white">Any fan that comments will be signed up</p>
          <p className="text-sm text-blue-300/80">This feature is independent of Instagram/SMS Keywords</p>
        </div>
      </div>
    </div>
  );
}

function RegistrationEmailSection() {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-white mb-2">Registration Email</h2>
      <p className="text-brand-gray-100 max-w-2xl mb-6">
        Upon registration, we send guests a confirmation email that includes a calendar invite. You can add a custom
        message to the email.
      </p>
      <button className="bg-white hover:bg-gray-100 text-brand-dark text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
        <i className="fa-regular fa-envelope" />
        <span>Customize Email</span>
      </button>
    </section>
  );
}

function RegistrationQuestionsSection() {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-white mb-2">Registration Questions</h2>
      <p className="text-brand-gray-100 max-w-2xl mb-8">
        We will ask guests the following questions when they register for the event.
      </p>
      <PersonalInfoQuestions />
      <CustomQuestions />
    </section>
  );
}

function PersonalInfoQuestions() {
  return (
    <div className="space-y-4 mb-12">
      <h3 className="flex items-center space-x-3 text-md font-semibold text-white mb-4">
        <span className="w-6 h-6 flex items-center justify-center bg-green-500/20 rounded text-green-400 text-xs">
          <i className="fa-solid fa-user-check" />
        </span>
        <span>Personal Information</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        <QuestionTag icon="fa-regular fa-user" label="Name" value="Full Name" hasDropdown />
        <QuestionTag icon="fa-regular fa-envelope" label="Email / Phone" value="Required" />
        <QuestionTag icon="fa-solid fa-share-nodes" label="Social Account" value="Off" hasDropdown />
      </div>
    </div>
  );
}

interface QuestionTagProps {
  icon: string;
  label: string;
  value: string;
  hasDropdown?: boolean;
}

function QuestionTag({ icon, label, value, hasDropdown }: QuestionTagProps) {
  return (
    <div className="flex items-center space-x-2 bg-brand-gray-300/80 border border-brand-gray-200/50 rounded-lg px-3 py-1.5 text-sm">
      <i className={`${icon} text-brand-gray-100`} />
      <span className="text-gray-200 font-medium">{label}</span>
      <span className="text-brand-gray-100">{value}</span>
      {hasDropdown && (
        <button className="text-brand-gray-100 hover:text-white">
          <i className="fa-solid fa-chevron-down text-xs" />
        </button>
      )}
    </div>
  );
}

function CustomQuestions() {
  return (
    <div className="mt-10">
      <h3 className="flex items-center space-x-3 text-md font-semibold text-white">
        <span className="w-6 h-6 flex items-center justify-center bg-orange-500/20 rounded text-orange-400 text-xs">
          <i className="fa-solid fa-question" />
        </span>
        <span>Custom Questions</span>
      </h3>
      <div className="mt-4">
        <button className="bg-brand-gray-300 hover:bg-brand-gray-200 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <i className="fa-solid fa-plus" />
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
}
