import React from "react";

interface GlobalStatusCardProps {
  isActive?: boolean;
  trainingHealth: number;
  healthTip?: string;
}

export function GlobalStatusCard({
  isActive = true,
  trainingHealth = 85,
  healthTip = "Add more interview transcripts to improve tone matching.",
}: GlobalStatusCardProps) {
  return (
    <section className="bg-brand-gray-400/50 rounded-2xl p-6 border border-white/10">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-green-400"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Global Status
            </p>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{isActive ? "Active" : "Inactive"}</span>
              {isActive && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              )}
            </h3>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-300">Training Health</p>
            <p className="text-sm font-bold text-purple-400">{trainingHealth}%</p>
          </div>
          <div className="w-full bg-brand-gray-300 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${trainingHealth}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center space-x-1.5">
            <i className="fa-solid fa-info-circle"></i>
            <span>{healthTip}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
