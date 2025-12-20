import React, { useState } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
}

export function SimulationPreviewCard() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "When is the next tour starting?",
      isUser: true,
    },
    {
      id: "2",
      content:
        "We're kicking things off in October! pre-sale starts next tuesday. sign up on the site so u don't miss out",
      isUser: false,
    },
    {
      id: "3",
      content: "Will there be VIP?",
      isUser: true,
    },
    {
      id: "4",
      content: "",
      isUser: false,
      isTyping: true,
    },
  ]);

  const handleReset = () => {
    setMessages([]);
    setInputValue("");
  };

  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-3">
          <i className="fa-solid fa-robot text-purple-400"></i>
          <span>Simulation Preview</span>
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-arrows-rotate mr-1"></i> Reset
        </button>
      </div>
      <div
        className="bg-brand-gray-500/50 rounded-xl p-4 h-80 flex flex-col space-y-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at top right, rgba(138, 63, 252, 0.05), transparent 40%)",
        }}
      >
        <div className="flex-grow space-y-3 overflow-y-auto pr-2">
          {messages.map((msg) =>
            msg.isUser ? (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-brand-gray-200 text-white p-3 rounded-lg max-w-xs text-sm">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-end space-x-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  AI
                </div>
                <div className="bg-purple-900 text-white p-3 rounded-lg max-w-xs text-sm">
                  {msg.isTyping ? (
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></span>
                      <span
                        className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className="relative flex-shrink-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to test response..."
            className="w-full bg-brand-gray-300 border border-brand-gray-200 rounded-lg pl-4 pr-12 py-2.5 text-sm text-white placeholder-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
