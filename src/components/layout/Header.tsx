import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={href}
      className={`flex items-center space-x-2 transition-colors ${
        isActive ? "text-white" : "hover:text-white"
      }`}
    >
      <i className={`${icon} w-4 text-center`}></i>
      <span>{label}</span>
    </Link>
  );
}

function ProfileDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-brand-gray-400 rounded-xl shadow-xl border border-white/10 overflow-hidden z-50"
    >
      <div className="p-4 flex items-center space-x-3 border-b border-white/10">
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate">Yol</p>
          <p className="text-sm text-gray-400 truncate">levinyinon2@gmail.com</p>
        </div>
      </div>
      <div className="py-2">
        <button
          onClick={() => handleNavigation("/profile")}
          className="w-full px-4 py-3 text-left text-gray-200 hover:bg-brand-gray-300/50 transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={() => handleNavigation("/settings")}
          className="w-full px-4 py-3 text-left text-gray-200 hover:bg-brand-gray-300/50 transition-colors"
        >
          Settings
        </button>
        <button className="w-full px-4 py-3 text-left text-gray-200 hover:bg-brand-gray-300/50 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems: NavItemProps[] = [
    { href: "/drops", icon: "fa-solid fa-ticket-simple", label: "Drops" },
    { href: "/fans", icon: "fa-solid fa-calendar-days", label: "Fans" },
    { href: "/promotion", icon: "fa-solid fa-compass", label: "Promotion" },
    { href: "/messages", icon: "fa-solid fa-envelope", label: "Messages" },
  ];

  return (
    <header className="sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-purple-400 text-xl">
              <i className="fa-solid fa-star-of-life"></i>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  {...item}
                  isActive={
                    location.pathname === item.href ||
                    location.pathname.startsWith(item.href + "/")
                  }
                />
              ))}
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
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  alt="User Avatar"
                  className={`w-7 h-7 rounded-full object-cover border-2 transition-all ${
                    isProfileOpen ? "border-purple-400" : "border-transparent hover:border-purple-400"
                  }`}
                />
              </button>
              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
