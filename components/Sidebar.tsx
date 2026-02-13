import React from 'react';
import { Icons } from '../constants.tsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  theme,
  toggleTheme,
  isOpen
}) => {

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Icons.Home },
    { id: 'groups', label: 'Hubs', icon: Icons.Users },
    { id: 'analysis', label: 'Audit', icon: Icons.Activity },
    { id: 'settings', label: 'Nodes', icon: Icons.Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 z-40
        border-r border-slate-200/40 dark:border-slate-800/40
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl
        transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        `}
      >
        {/* Logo */}
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
            <Icons.Zap className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
            TeleBridge
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative w-full flex items-center gap-4 px-5 py-4 
              rounded-[1.25rem] transition-all duration-300 group
              hover:scale-[1.03] active:scale-[0.97]
              ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] scale-[1.05]"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white hover:shadow-lg"
              }`}
            >

              {/* Active Indicator */}
              <span
                className={`absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-500
                ${activeTab === item.id ? "bg-white" : "bg-transparent"}`}
              />

              <item.icon
                size={20}
                strokeWidth={activeTab === item.id ? 2.5 : 2}
              />

              <span className="font-black text-[11px] uppercase tracking-[0.2em]">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Status Card */}
        <div className="p-6">
          <div className="p-5 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-3xl shadow-xl">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
              Link Status
            </p>

            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2 shadow-inner">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.6)]"
                style={{ width: "65%" }}
              />
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              Global: Operational
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 
      bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl 
      border border-slate-200 dark:border-slate-800 
      flex items-center justify-around p-3 z-50 
      rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center 
            p-4 rounded-2xl transition-all duration-300
            active:scale-90
            ${
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-110"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
            }`}
          >
            <item.icon
              size={22}
              strokeWidth={activeTab === item.id ? 2.5 : 2}
            />
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
