
import React from 'react';
import { Icons } from '../constants.tsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Icons.Home },
    { id: 'groups', label: 'Hubs', icon: Icons.Users },
    { id: 'analysis', label: 'Audit', icon: Icons.Activity },
    { id: 'settings', label: 'Nodes', icon: Icons.Settings },
  ];

  return (
    <>
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen fixed top-0 left-0 z-20 transition-all duration-500">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Icons.Zap className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">TeleBridge</span>
        </div>

        <nav className="flex-1 mt-2 px-4 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="font-black text-[11px] uppercase tracking-[0.15em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8">
           <div className="p-4 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
             <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Status</p>
             <p className="text-[10px] text-slate-400 font-bold leading-tight">System fully operational. All nodes synced.</p>
           </div>
        </div>
      </aside>

      {/* Mobile nav refined for compactness */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 flex items-center justify-around p-1.5 z-50 rounded-2xl shadow-2xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-3.5 rounded-xl transition-all active:scale-90 ${
              activeTab === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
