import React from "react";
import { Icons } from "../constants";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Icons.Home },
    { id: "groups", label: "Hubs", icon: Icons.Users },
    { id: "analysis", label: "Audit", icon: Icons.Activity },
    { id: "settings", label: "Nodes", icon: Icons.Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64
      bg-white dark:bg-slate-900
      border-r border-slate-200 dark:border-slate-800
      shadow-xl z-40
      transform transition-all duration-500 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-6 text-xl font-bold">TeleBridge</div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
