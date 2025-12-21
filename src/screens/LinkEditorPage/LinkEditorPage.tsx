import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import {
  LinkEditorCard,
  PhonePreview,
  EditableLinkData,
} from "../../components/link-editor";

const initialLinks: EditableLinkData[] = [
  {
    id: "1",
    title: "Instagram",
    url: "",
    isEnabled: true,
    clicks: 0,
    hasWarning: true,
    warningMessage:
      'Enter your Instagram URL or <a href="#" class="font-semibold underline hover:text-white">connect your account</a>.',
  },
  {
    id: "2",
    title: "WhatsApp",
    url: "",
    isEnabled: false,
    clicks: 0,
  },
  {
    id: "3",
    title: "TikTok",
    url: "",
    isEnabled: false,
    clicks: 0,
  },
];

const socialPlatforms = [
  { icon: "fa-brands fa-instagram", label: "Instagram" },
  { icon: "fa-brands fa-tiktok", label: "TikTok" },
  { icon: "fa-brands fa-youtube", label: "YouTube" },
  { icon: "fa-brands fa-spotify", label: "Spotify" },
];

export function LinkEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [links, setLinks] = useState<EditableLinkData[]>(initialLinks);
  const [username] = useState("@airdope_artist");
  const [bio] = useState(
    "The growth engine that finds new fans and manufactures sold-out launches."
  );
  const [avatarUrl] = useState(
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
  );

  const handleToggle = (linkId: string, enabled: boolean) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === linkId ? { ...link, isEnabled: enabled } : link
      )
    );
  };

  const handleDelete = (linkId: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  const handleAddLink = () => {
    const newLink: EditableLinkData = {
      id: String(Date.now()),
      title: "New Link",
      url: "",
      isEnabled: true,
      clicks: 0,
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const handleOpenPreview = () => {
    window.open("https://airdope.io/artist", "_blank");
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>

      <div className="relative z-[1]">
        <header className="sticky top-0 z-20">
          <div className="max-w-full mx-auto px-8 border-b border-white/10 bg-brand-dark/50 backdrop-blur-xl">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-purple-400 text-xl">
                  <i className="fa-solid fa-star-of-life"></i>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                  <Link
                    to="/drops"
                    className="flex items-center space-x-2 text-white"
                  >
                    <i className="fa-solid fa-ticket-simple w-4 text-center"></i>
                    <span>Drops</span>
                  </Link>
                  <Link
                    to="/fans"
                    className="flex items-center space-x-2 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-calendar-days w-4 text-center"></i>
                    <span>Fans</span>
                  </Link>
                  <Link
                    to="/promotion"
                    className="flex items-center space-x-2 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-compass w-4 text-center"></i>
                    <span>Promotion</span>
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center space-x-2 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-envelope w-4 text-center"></i>
                    <span>Messages</span>
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-5 text-sm">
                <Link
                  to="/create-drop"
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Create Drop
                </Link>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-solid fa-bell"></i>
                </button>
                <button>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="User Avatar"
                    className="w-7 h-7 rounded-full object-cover border-2 border-transparent hover:border-purple-400 transition-all"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full">
          <div className="grid grid-cols-10 gap-8 h-[calc(100vh-64px)]">
            <section className="col-span-6 overflow-y-auto px-12 py-10">
              <div className="mb-8">
                <div className="flex items-center mb-10">
                  <button
                    onClick={() => navigate("/drops")}
                    className="text-sm text-brand-gray-100 hover:text-white flex items-center"
                  >
                    <i className="fa-solid fa-arrow-left mr-3"></i>
                    Back to Link Builder
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-gray-300"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      {username}
                    </h1>
                    <div className="flex items-center space-x-2 mt-2">
                      {socialPlatforms.map((platform) => (
                        <div
                          key={platform.label}
                          className="w-8 h-8 rounded-full bg-brand-gray-300 flex items-center justify-center text-brand-gray-100"
                        >
                          <i className={platform.icon}></i>
                        </div>
                      ))}
                      <button className="w-8 h-8 rounded-full bg-brand-gray-400 border border-dashed border-brand-gray-200 flex items-center justify-center text-brand-gray-100 hover:border-white hover:text-white transition-colors">
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddLink}
                className="w-full mb-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full transition-colors flex items-center justify-center"
              >
                <i className="fa-solid fa-plus mr-3"></i>
                Add Link
              </button>

              <div className="space-y-4">
                {links.map((link) => (
                  <LinkEditorCard
                    key={link.id}
                    link={link}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </section>

            <aside className="col-span-4 bg-brand-gray-400/30 border-l border-white/10 flex flex-col items-center py-10">
              <div className="w-full flex justify-end items-center space-x-3 px-8 mb-8">
                <button className="px-4 py-2 text-sm font-medium bg-brand-gray-300/80 hover:bg-brand-gray-200 rounded-lg transition-colors flex items-center space-x-2">
                  <i className="fa-solid fa-wand-magic-sparkles text-purple-400"></i>
                  <span>Enhance</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-brand-gray-300/80 hover:bg-brand-gray-200 rounded-lg transition-colors">
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>

              <div className="w-full max-w-sm bg-brand-gray-400/80 border border-white/10 rounded-lg flex items-center justify-between px-4 py-2.5 text-sm mb-8">
                <span className="font-mono text-gray-300">airdope.io/artist</span>
                <button
                  onClick={handleOpenPreview}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
              </div>

              <PhonePreview
                username={username}
                bio={bio}
                avatarUrl={avatarUrl}
                links={links}
              />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
