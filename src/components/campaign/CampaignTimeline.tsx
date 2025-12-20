import React from "react";

interface TimelinePhase {
  id: string;
  label: string;
  icon: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

const phases: TimelinePhase[] = [
  { id: "outreach", label: "Outreach", icon: "fa-solid fa-paper-plane", status: "completed" },
  { id: "briefing", label: "Briefing", icon: "fa-solid fa-pencil", status: "completed" },
  { id: "content", label: "Content Creation", icon: "fa-solid fa-swatchbook", status: "current" },
  { id: "launch", label: "Launch", icon: "fa-solid fa-rocket", status: "upcoming", date: "Jul 15" },
  { id: "payouts", label: "Payouts", icon: "fa-solid fa-dollar-sign", status: "upcoming", date: "Aug 01" },
];

export function CampaignTimeline() {
  const currentIndex = phases.findIndex((p) => p.status === "current");
  const progressWidth = ((currentIndex + 0.5) / phases.length) * 100;

  return (
    <section className="bg-brand-gray-400/50 border border-brand-gray-200/20 p-6 rounded-xl mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Campaign Timeline</h2>
        <a
          href="#"
          className="text-sm font-semibold text-white hover:text-gray-300 transition-colors"
        >
          View Details
        </a>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-brand-gray-200"></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-white"
          style={{ width: `${progressWidth}%` }}
        ></div>
        <div className="relative flex justify-between items-start">
          {phases.map((phase) => (
            <div key={phase.id} className="text-center w-1/5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-brand-dark ${
                  phase.status === "completed" || phase.status === "current"
                    ? "bg-white"
                    : "bg-brand-gray-200"
                } ${phase.status === "current" ? "ring-2 ring-white" : ""}`}
              >
                <i
                  className={`${phase.icon} text-xs ${
                    phase.status === "completed" || phase.status === "current"
                      ? "text-brand-dark"
                      : "text-brand-gray-100"
                  }`}
                ></i>
              </div>
              <p
                className={`text-sm font-semibold ${
                  phase.status === "current" ? "text-white" : "text-white"
                }`}
              >
                {phase.label}
              </p>
              <p className="text-xs text-brand-gray-100">
                {phase.status === "completed"
                  ? "Completed"
                  : phase.status === "current"
                  ? "Current Phase"
                  : phase.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
