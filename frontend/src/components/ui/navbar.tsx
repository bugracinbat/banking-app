import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const darkColor = "#1e293b"; // slate-900

export function Navbar() {
  const { currentUser, setCurrentUser, users } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="w-full bg-white glass-effect border-b border-slate-200 shadow-colorful fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shadow-colorful transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue">
            <span
              role="img"
              aria-label="logo"
              className="text-2xl animate-pulse-slow"
              style={{ color: darkColor }}
            >
              💳
            </span>
          </div>
          <span
            className="text-2xl font-extrabold drop-shadow animate-fade-in-left tracking-wide group-hover:text-blue-700 transition-colors duration-300"
            style={{ color: darkColor }}
          >
            NeoBank
          </span>
        </div>
        <div className="flex items-center space-x-8">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? darkColor : "#334155",
            })}
            className={({ isActive }) =>
              `relative text-lg font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-1 after:rounded-full after:bg-blue-200 after:opacity-80"
                  : "hover:bg-slate-100"
              }`
            }
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/booking"
            style={({ isActive }) => ({
              color: isActive ? darkColor : "#334155",
            })}
            className={({ isActive }) =>
              `relative text-lg font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-1 after:rounded-full after:bg-blue-200 after:opacity-80"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Booking
          </NavLink>
          {/* User Switcher */}
          <div className="relative ml-4" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              type="button"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border-2 border-blue-400 shadow"
              />
              <span className="font-medium text-slate-800 hover:text-blue-700 transition-colors">
                {currentUser.name.split(" ")[0]}
              </span>
              <svg
                className="w-4 h-4 ml-1 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                {users.map((user) => (
                  <button
                    key={user.id}
                    className={`flex items-center w-full px-4 py-2 hover:bg-blue-100 transition-colors ${
                      user.id === currentUser.id ? "bg-blue-50 font-bold" : ""
                    }`}
                    onClick={() => {
                      setCurrentUser(user);
                      setIsOpen(false);
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{user.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
