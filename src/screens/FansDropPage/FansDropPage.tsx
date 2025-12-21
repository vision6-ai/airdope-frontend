import React, { useState } from "react";

export function FansDropPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-black font-inter text-white min-h-screen">
      <div className="min-h-[800px] flex items-center justify-center p-4 sm:p-8">
        <main className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <EventArtwork />
            <EventDetails email={email} setEmail={setEmail} onSubmit={handleSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}

function EventArtwork() {
  return (
    <div className="relative group">
      <div className="aspect-square h-auto max-h-[600px] overflow-hidden rounded-2xl">
        <img
          className="w-full h-full object-cover"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1318eb7f77-85f6d3bf2997fadadc81.png"
          alt="A futuristic concert poster for an electronic music event"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl cursor-pointer">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <i className="fa-solid fa-play text-white text-3xl ml-1" />
        </div>
      </div>
    </div>
  );
}

interface EventDetailsProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function EventDetails({ email, setEmail, onSubmit }: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-8">
      <EventTitleBlock />
      <SignupCard email={email} setEmail={setEmail} onSubmit={onSubmit} />
      <AdditionalDetails />
    </div>
  );
}

function EventTitleBlock() {
  return (
    <div>
      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
        Feb 28: Mayan Warrior - Guadalajara
      </h1>
      <div className="flex items-center gap-3 mt-6">
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c91ee05417-66511b817d6050b44585.png"
          alt="Stranger Than logo"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-300">Stranger Than;</span>
      </div>
    </div>
  );
}

interface SignupCardProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function SignupCard({ email, setEmail, onSubmit }: SignupCardProps) {
  return (
    <div className="bg-white text-black p-6 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Get notified</h2>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
            <i className="fa-regular fa-comment-dots text-gray-600" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
            <i className="fa-regular fa-envelope text-gray-600" />
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        />
        <button
          type="submit"
          className="bg-gray-200 text-gray-500 font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-300 transition-colors"
        >
          RSVP
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-3">
        This site is protected by reCaptcha. By submitting my information, I agree to receive
        recurring automated messages from the contact information provided and to{" "}
        <a href="#" className="underline">
          AirDope's Terms of Service
        </a>
        ,{" "}
        <a href="#" className="underline">
          Cookie Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
      <div className="text-center mt-5">
        <a href="#" className="text-xs text-gray-500 font-medium group">
          Make a Drop like this{" "}
          <i className="fa-solid fa-arrow-right ml-1 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

function AdditionalDetails() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-xl">Additional details</h3>
      <p className="text-gray-300 leading-relaxed">
        Sign up for exclusive first access to tickets dropping Monday, December 15th @ 12pm PT / 2pm
        CST.
      </p>
      <p className="text-gray-300 leading-relaxed">
        On February 28th, the Full Mayan Warrior Art Car Returns to Guadalajara at Hacienda
        Benazuza. AirDope is the Buzz OS — the marketing layer that manufactures sold-out launches.
        We are the growth engine that finds new fans and orchestrates everything to hit at the exact
        right moment.
      </p>
    </div>
  );
}
