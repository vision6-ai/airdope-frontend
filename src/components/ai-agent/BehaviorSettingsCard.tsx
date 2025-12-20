import React, { useState } from "react";

type AutonomyLevel = "draft" | "review" | "autonomous";
type ToneType = "chill" | "hype" | "professional" | "mystic";

interface BehaviorSettingsCardProps {
  initialAutonomy?: AutonomyLevel;
  initialTone?: ToneType;
}

export function BehaviorSettingsCard({
  initialAutonomy = "review",
  initialTone = "chill",
}: BehaviorSettingsCardProps) {
  const [autonomyLevel, setAutonomyLevel] = useState<AutonomyLevel>(initialAutonomy);
  const [tone, setTone] = useState<ToneType>(initialTone);

  const tones: ToneType[] = ["chill", "hype", "professional", "mystic"];

  const autonomyLabels: Record<AutonomyLevel, string> = {
    draft: "Draft Only",
    review: "Review First",
    autonomous: "Autonomous",
  };

  const autonomyBadges: Record<AutonomyLevel, { label: string; color: string }> = {
    draft: { label: "Manual Mode", color: "bg-gray-500/20 text-gray-300" },
    review: { label: "Review Required", color: "bg-yellow-500/20 text-yellow-300" },
    autonomous: { label: "Fully Automatic", color: "bg-green-500/20 text-green-300" },
  };

  const getSliderPosition = () => {
    switch (autonomyLevel) {
      case "draft":
        return "0%";
      case "review":
        return "50%";
      case "autonomous":
        return "100%";
    }
  };

  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <h2 className="text-lg font-bold text-white flex items-center space-x-3 mb-6">
        <i className="fa-solid fa-sliders text-purple-400"></i>
        <span>Behavior Settings</span>
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-brand-gray-300/50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Autonomy Level</h3>
            <span
              className={`text-xs px-2 py-1 rounded-md font-medium ${autonomyBadges[autonomyLevel].color}`}
            >
              {autonomyBadges[autonomyLevel].label}
            </span>
          </div>
          <div className="relative py-4">
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-brand-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all"
                style={{ width: getSliderPosition() }}
              ></div>
            </div>
            <div className="absolute -top-1 left-0 w-full flex justify-between items-center">
              <button
                onClick={() => setAutonomyLevel("draft")}
                className={`w-4 h-4 rounded-full transition-all ${
                  autonomyLevel === "draft"
                    ? "w-5 h-5 bg-white border-4 border-purple-600 shadow-lg"
                    : "bg-brand-gray-200 border-2 border-purple-600"
                }`}
              />
              <button
                onClick={() => setAutonomyLevel("review")}
                className={`w-4 h-4 rounded-full transition-all ${
                  autonomyLevel === "review"
                    ? "w-5 h-5 bg-white border-4 border-purple-600 shadow-lg"
                    : "bg-brand-gray-200 border-2 border-purple-600"
                }`}
              />
              <button
                onClick={() => setAutonomyLevel("autonomous")}
                className={`w-4 h-4 rounded-full transition-all ${
                  autonomyLevel === "autonomous"
                    ? "w-5 h-5 bg-white border-4 border-purple-600 shadow-lg"
                    : "bg-brand-gray-200"
                }`}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-4">
            {(["draft", "review", "autonomous"] as AutonomyLevel[]).map((level) => (
              <span
                key={level}
                className={autonomyLevel === level ? "font-bold text-white" : ""}
              >
                {autonomyLabels[level]}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-brand-gray-300/50 p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-4">Agent Tone</h3>
          <div className="flex items-center space-x-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  tone === t
                    ? "bg-purple-600 text-white"
                    : "bg-brand-gray-200/50 hover:bg-brand-gray-200/80 text-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Current tone is relaxed, using lowercase often, and occasional emojis
            based on "New Album Lyrics.txt".
          </p>
        </div>
      </div>
    </section>
  );
}
