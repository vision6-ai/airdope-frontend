import React from "react";
import { EditableLinkData } from "./LinkEditorCard";

interface PhonePreviewProps {
  username: string;
  bio: string;
  avatarUrl: string;
  links: EditableLinkData[];
}

const getLinkIcon = (title: string): string => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("instagram")) return "fa-brands fa-instagram";
  if (titleLower.includes("whatsapp")) return "fa-brands fa-whatsapp";
  if (titleLower.includes("tiktok")) return "fa-brands fa-tiktok";
  if (titleLower.includes("youtube")) return "fa-brands fa-youtube";
  if (titleLower.includes("spotify")) return "fa-brands fa-spotify";
  if (titleLower.includes("twitter") || titleLower.includes("x"))
    return "fa-brands fa-x-twitter";
  if (titleLower.includes("facebook")) return "fa-brands fa-facebook";
  if (titleLower.includes("linkedin")) return "fa-brands fa-linkedin";
  return "fa-solid fa-link";
};

export function PhonePreview({
  username,
  bio,
  avatarUrl,
  links,
}: PhonePreviewProps) {
  return (
    <div className="w-[320px] h-[640px] bg-brand-dark rounded-[40px] border-8 border-brand-gray-300 shadow-2xl p-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center pt-8 text-center overflow-y-auto">
        <div className="w-6 h-6 rounded-full bg-brand-gray-400 flex items-center justify-center self-start mb-8">
          <i className="fa-solid fa-star-of-life text-purple-400 text-xs"></i>
        </div>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-white font-bold text-lg">{username}</h2>
        <p className="text-brand-gray-100 text-sm mt-1 mb-6 px-4">{bio}</p>

        <div className="w-full space-y-3 px-2">
          {links.map((link, index) => (
            <a
              key={link.id}
              href="#"
              className={`block w-full text-center font-semibold py-4 rounded-lg transition-colors text-sm ${
                link.isEnabled
                  ? index === 0
                    ? "bg-white/90 hover:bg-white text-brand-dark"
                    : "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-white/10 text-white opacity-50 cursor-not-allowed"
              }`}
            >
              <i className={`${getLinkIcon(link.title)} mr-2`}></i>
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-brand-gray-200 pb-2">
        <span>Report</span> &middot; <span>Privacy</span>
      </div>
    </div>
  );
}
