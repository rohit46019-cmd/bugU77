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
  isOpen,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Icons?.Home },
    { id: "groups", label: "Hubs", icon: Icons?.Users },
    { id: "analysis", label: "Audit", icon: Icons?.Activity },
    { id: "settings", label: "Nodes", icon: Icons?.Settings },
  ];

  return (
    <>
      <aside
        className={`hidden md:flex flex-col fixed top-6 left-6 z-50
        ${collapsed ? "w-20" : "w-72"}
        h-[calc(100vh-3rem)]
        rounded-3xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-2xl
        transition-all duration-500
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              {Icons?.Zap && (
                <Icons.Zap className="text-white" size={20} />
              )}
            </div>

            {!collapsed && (
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                TeleBridge
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-blue-600 transition"
          >
            {"<"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {IconComponent && <IconComponent size={20} />}
                {!collapsed && (
                  <span className="text-sm font-semibold">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-2xl shadow-xl
      flex justify-around p-3">

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`p-3 rounded-xl transition
              ${isActive ? "bg-blue-600 text-white" : "text-slate-400"}`}
            >
              {IconComponent && <IconComponent size={20} />}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
