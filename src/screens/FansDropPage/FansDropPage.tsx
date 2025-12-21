import React, { useState } from "react";

type InputMode = "email" | "phone";

export function FansDropPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("email");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-black font-inter text-white min-h-screen">
      <div className="min-h-[800px] flex items-center justify-center p-4 sm:p-8">
        <main className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <EventArtwork />
            <EventDetails
              inputValue={inputValue}
              setInputValue={setInputValue}
              inputMode={inputMode}
              setInputMode={setInputMode}
              onSubmit={handleSubmit}
              isSubmitted={isSubmitted}
            />
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
  inputValue: string;
  setInputValue: (value: string) => void;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
}

function EventDetails({
  inputValue,
  setInputValue,
  inputMode,
  setInputMode,
  onSubmit,
  isSubmitted,
}: EventDetailsProps) {
  return (
    <div className="flex flex-col gap-8">
      <EventTitleBlock />
      <SignupCard
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputMode={inputMode}
        setInputMode={setInputMode}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
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
  inputValue: string;
  setInputValue: (value: string) => void;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
}

function SignupCard({
  inputValue,
  setInputValue,
  inputMode,
  setInputMode,
  onSubmit,
  isSubmitted,
}: SignupCardProps) {
  if (isSubmitted) {
    return (
      <div className="bg-white text-black p-8 rounded-2xl w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-check text-green-600 text-2xl" />
          </div>
          <h2 className="font-bold text-2xl mb-2">You're on the list!</h2>
          <p className="text-gray-600 mb-4">
            We'll notify you at <span className="font-semibold">{inputValue}</span> when tickets
            drop.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-500 mb-3">Share with friends</p>
            <div className="flex items-center justify-center gap-3">
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-x-twitter text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-facebook-f text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-brands fa-whatsapp text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-link text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <a href="#" className="text-xs text-gray-500 font-medium group">
            Make a Drop like this{" "}
            <i className="fa-solid fa-arrow-right ml-1 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-6 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Get notified</h2>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setInputMode("phone")}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              inputMode === "phone"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <i className="fa-regular fa-comment-dots" />
          </button>
          <button
            type="button"
            onClick={() => setInputMode("email")}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              inputMode === "email"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <i className="fa-regular fa-envelope" />
          </button>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type={inputMode === "email" ? "email" : "tel"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputMode === "email" ? "Your email" : "Your phone number"}
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
