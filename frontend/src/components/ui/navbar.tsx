import React from "react";
import { NavLink } from "react-router-dom";

const darkColor = "#1e293b"; // slate-900

export function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
