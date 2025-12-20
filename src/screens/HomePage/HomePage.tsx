import { Link } from "react-router-dom";
import { Header } from "../../components/layout/Header";

interface OnboardingTaskProps {
  icon: string;
  iconGradient: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: string;
  buttonStyle: "primary" | "secondary";
}

function OnboardingTask({
  icon,
  iconGradient,
  title,
  description,
  buttonText,
  buttonIcon,
  buttonStyle,
}: OnboardingTaskProps) {
  const buttonClasses =
    buttonStyle === "primary"
      ? "bg-brand-purple text-white hover:bg-purple-500"
      : "bg-white text-brand-dark hover:bg-gray-200";

  return (
    <div className="bg-brand-gray-400/60 border border-brand-gray-200/50 rounded-xl p-6 flex items-center justify-between group hover:border-brand-purple/50 transition-all">
      <div className="flex items-center space-x-5">
        <div
          className={`w-12 h-12 ${iconGradient} rounded-xl flex items-center justify-center flex-shrink-0`}
        >
          <i className={`${icon} text-white text-xl`}></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-brand-gray-100">{description}</p>
        </div>
      </div>
      <button
        className={`${buttonClasses} font-semibold text-sm py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors flex-shrink-0`}
      >
        <i className={buttonIcon}></i>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  glowClass: string;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  iconBgClass,
  iconTextClass,
  glowClass,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6 relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${glowClass} rounded-full blur-2xl`}
      ></div>
      <div className="relative z-10">
        <div
          className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center mb-4`}
        >
          <i className={`${icon} ${iconTextClass} text-xl`}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-brand-gray-100 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  icon: string;
  iconGradient: string;
  title: string;
  description: string;
  hoverColorClass: string;
  href: string;
}

function QuickActionCard({
  icon,
  iconGradient,
  title,
  description,
  hoverColorClass,
  href,
}: QuickActionCardProps) {
  return (
    <Link
      to={href}
      className={`bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-8 flex items-center justify-between hover:border-${hoverColorClass}/50 transition-all cursor-pointer group`}
    >
      <div className="flex items-center space-x-5">
        <div
          className={`w-14 h-14 ${iconGradient} rounded-xl flex items-center justify-center`}
        >
          <i className={`${icon} text-white text-2xl`}></i>
        </div>
        <div>
          <h3
            className={`text-xl font-bold text-white mb-1 group-hover:text-${hoverColorClass} transition-colors`}
          >
            {title}
          </h3>
          <p className="text-sm text-brand-gray-100">{description}</p>
        </div>
      </div>
      <i
        className={`fa-solid fa-arrow-right text-brand-gray-100 group-hover:text-${hoverColorClass} group-hover:translate-x-1 transition-all`}
      ></i>
    </Link>
  );
}

interface ResourceCardProps {
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  title: string;
  description: string;
  href: string;
}

function ResourceCard({
  icon,
  iconBgClass,
  iconTextClass,
  title,
  description,
  href,
}: ResourceCardProps) {
  return (
    <a
      href={href}
      className="bg-brand-gray-400/80 border border-brand-gray-200/50 rounded-2xl p-6 hover:border-brand-purple/50 transition-all group"
    >
      <div
        className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center mb-4`}
      >
        <i className={`${icon} ${iconTextClass}`}></i>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">
        {title}
      </h3>
      <p className="text-sm text-brand-gray-100">{description}</p>
    </a>
  );
}

export function HomePage() {
  const completedTasks = 0;
  const totalTasks = 3;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-brand-dark min-h-screen text-gray-200 relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/40 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="w-full mx-auto relative z-[1]">
        <Header />

        <main className="max-w-7xl mx-auto px-8 py-12">
          <section className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Welcome to Buzz OS
              </h1>
              <p className="text-brand-gray-100 mt-2">
                Let's get you set up to manufacture your first sold-out launch.
              </p>
            </div>
            <Link
              to="/create-drop"
              className="bg-gradient-to-r from-brand-purple to-purple-600 text-white font-bold text-base py-4 px-8 rounded-xl flex items-center space-x-3 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 hover:scale-105 transform"
            >
              <i className="fa-solid fa-rocket text-xl"></i>
              <span>Create Drop</span>
            </Link>
          </section>

          <section className="mb-10">
            <div className="bg-gradient-to-br from-brand-purple/20 via-purple-900/10 to-transparent border border-brand-purple/30 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Complete Your Setup
                  </h2>
                  <p className="text-brand-gray-100">
                    3 steps to unlock your growth engine
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {completedTasks}
                      <span className="text-brand-gray-100">/{totalTasks}</span>
                    </p>
                    <p className="text-xs text-brand-gray-100 mt-1">
                      Tasks Complete
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-brand-gray-200/30 flex items-center justify-center relative">
                    <svg className="w-16 h-16 transform -rotate-90 absolute top-0 left-0">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-brand-purple"
                        strokeDasharray="176"
                        strokeDashoffset={176 - (176 * progressPercent) / 100}
                      />
                    </svg>
                    <span className="text-white font-bold text-sm relative z-10">
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <OnboardingTask
                  icon="fa-brands fa-instagram"
                  iconGradient="bg-gradient-to-br from-purple-500 to-pink-500"
                  title="Connect Your Instagram Account"
                  description="Sync your audience and activate influencer partnerships to amplify your launches."
                  buttonText="Connect Now"
                  buttonIcon="fa-brands fa-instagram"
                  buttonStyle="primary"
                />
                <OnboardingTask
                  icon="fa-solid fa-phone"
                  iconGradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                  title="Claim Your Phone Number"
                  description="Get a dedicated line to broadcast SMS campaigns and reach fans instantly when it matters."
                  buttonText="Claim Number"
                  buttonIcon="fa-solid fa-phone"
                  buttonStyle="secondary"
                />
                <OnboardingTask
                  icon="fa-solid fa-users"
                  iconGradient="bg-gradient-to-br from-green-500 to-emerald-500"
                  title="Import Your Existing Fans"
                  description="Bring your current audience into the growth engine to supercharge your reach from day one."
                  buttonText="Import Now"
                  buttonIcon="fa-solid fa-file-import"
                  buttonStyle="primary"
                />
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              What Happens Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon="fa-solid fa-users-viewfinder"
                iconBgClass="bg-brand-purple/20"
                iconTextClass="text-brand-purple"
                glowClass="bg-gradient-to-br from-brand-purple/20 to-transparent"
                title="Find New Fans"
                description="Our growth engine discovers and targets your ideal audience across every platform."
              />
              <FeatureCard
                icon="fa-solid fa-bullhorn"
                iconBgClass="bg-blue-500/20"
                iconTextClass="text-blue-400"
                glowClass="bg-gradient-to-br from-blue-500/20 to-transparent"
                title="Broadcast Everywhere"
                description="Push your message across email, SMS, social, and influencer networks simultaneously."
              />
              <FeatureCard
                icon="fa-solid fa-rocket"
                iconBgClass="bg-pink-500/20"
                iconTextClass="text-pink-400"
                glowClass="bg-gradient-to-br from-pink-500/20 to-transparent"
                title="Orchestrate Launch"
                description="Everything hits at the perfect moment when your presale window opens. Sold out."
              />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickActionCard
                icon="fa-solid fa-paper-plane"
                iconGradient="bg-gradient-to-br from-brand-purple to-purple-600"
                title="Create Campaign"
                description="Start broadcasting to your audience across all channels"
                hoverColorClass="brand-purple"
                href="/promotion"
              />
              <QuickActionCard
                icon="fa-solid fa-chart-line"
                iconGradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                title="View Analytics"
                description="Track your growth and campaign performance in real-time"
                hoverColorClass="blue-400"
                href="/fans"
              />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Resources to Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                icon="fa-solid fa-book"
                iconBgClass="bg-yellow-500/20"
                iconTextClass="text-yellow-400"
                title="Quick Start Guide"
                description="Learn the basics in 5 minutes"
                href="#"
              />
              <ResourceCard
                icon="fa-solid fa-play"
                iconBgClass="bg-red-500/20"
                iconTextClass="text-red-400"
                title="Video Tutorials"
                description="Watch how it works step-by-step"
                href="#"
              />
              <ResourceCard
                icon="fa-solid fa-headset"
                iconBgClass="bg-green-500/20"
                iconTextClass="text-green-400"
                title="Contact Support"
                description="Get help from our team 24/7"
                href="#"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
