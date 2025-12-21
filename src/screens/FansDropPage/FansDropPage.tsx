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

  const handleReset = () => {
    setIsSubmitted(false);
    setInputValue("");
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
              onReset={handleReset}
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
  onReset: () => void;
}

function EventDetails({
  inputValue,
  setInputValue,
  inputMode,
  setInputMode,
  onSubmit,
  isSubmitted,
  onReset,
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
        onReset={onReset}
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
  onReset: () => void;
}

function SignupCard({
  inputValue,
  setInputValue,
  inputMode,
  setInputMode,
  onSubmit,
  isSubmitted,
  onReset,
}: SignupCardProps) {
  if (isSubmitted) {
    return (
      <div className="bg-white text-black p-6 rounded-2xl w-full">
        <div className="flex flex-col items-center justify-center py-4 relative">
          <button className="absolute top-0 left-0 text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-arrow-up-from-bracket text-xl" />
          </button>
          <button
            onClick={onReset}
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl" />
          </button>

          <div className="bg-white shadow-lg rounded-2xl p-3 flex items-center gap-4 my-6">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c91ee05417-66511b817d6050b44585.png"
              alt="Stranger Than logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">Stranger Than;</p>
              <p className="text-lg font-bold text-black">
                {inputMode === "email" ? "Check your email" : "Check your phone"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-up-from-bracket" />
              Share
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-droplet" />
              Make a drop like this
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Powered by</span>
            <span className="font-bold text-gray-600 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 17.1429C14.8385 17.1429 17.1429 14.8385 17.1429 12C17.1429 9.16153 14.8385 6.85714 12 6.85714C9.16153 6.85714 6.85714 9.16153 6.85714 12C6.85714 14.8385 9.16153 17.1429 12 17.1429Z" />
              </svg>
              AirDope
            </span>
          </div>
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
