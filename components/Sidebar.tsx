import React, { useState } from "react";
import { Icons } from "../constants.tsx";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  theme,
  toggleTheme,
  isOpen,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Icons.Home },
    { id: "groups", label: "Hubs", icon: Icons.Users },
    { id: "analysis", label: "Audit", icon: Icons.Activity },
    { id: "settings", label: "Nodes", icon: Icons.Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-6 left-6 z-50
        ${collapsed ? "w-20" : "w-72"}
        h-[calc(100vh-3rem)]
        rounded-3xl
        bg-white/70 dark:bg-slate-900/70
        backdrop-blur-3xl
        border border-white/20 dark:border-slate-800
        shadow-[0_30px_60px_rgba(0,0,0,0.25)]
        transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"}
        `}
      >
        {/* Gradient Border Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
              <Icons.Zap className="text-white" size={22} strokeWidth={2.5} />
            </div>

            {!collapsed && (
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                TeleBridge
              </span>
            )}
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-blue-600 transition"
          >
            <Icons.ChevronLeft
              className={`${collapsed ? "rotate-180" : ""} transition`}
              size={18}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 px-4 space-y-3 mt-4">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-4 w-full px-4 py-3 rounded-2xl
                transition-all duration-300 group overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 scale-[1.03]"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {/* Hover Sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="relative z-10"
                />

                {!collapsed && (
                  <span className="relative z-10 font-bold text-sm tracking-wide">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status Section */}
        {!collapsed && (
          <div className="relative p-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-blue-500/20 shadow-inner">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                Network Health
              </p>

              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 animate-pulse" />
                <div
                  className="bg-blue-600 h-full rounded-full relative z-10 transition-all duration-1000"
                  style={{ width: "78%" }}
                />
              </div>

              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider">
                All Systems Stable
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Premium Dock */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl
      border border-white/20 dark:border-slate-800
      rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)]
      flex justify-around p-4">

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center justify-center p-4 rounded-2xl transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110 shadow-lg shadow-blue-500/40"
                  : "text-slate-400"
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
