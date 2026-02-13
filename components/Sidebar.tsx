import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../constants.tsx'; // your existing icons

// Fallback theme icons in case Icons.Moon / Icons.Sun are missing
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

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

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const menuItemVariants = {
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, type: 'spring', stiffness: 300 }
    }),
    closed: { x: -20, opacity: 0 }
  };

  return (
    <>
      {/* Desktop Sidebar with Framer Motion */}
      <motion.aside
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 z-40
          border-r border-slate-200/40 dark:border-slate-800/40
          bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl"
      >
        {/* Logo */}
        <motion.div 
          className="p-8 pb-4 flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
            <Icons.Zap className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <motion.span 
            className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white"
            animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
          >
            TeleBridge
          </motion.span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              custom={i}
              variants={menuItemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => onTabChange(item.id)}
              className={`relative w-full flex items-center gap-4 px-5 py-4 
                rounded-[1.25rem] transition-colors duration-300 group
                ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Active Indicator */}
              <motion.span
                layoutId="activeIndicator"
                className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-white`}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeTab === item.id ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />

              <item.icon
                size={20}
                strokeWidth={activeTab === item.id ? 2.5 : 2}
              />

              <span className="font-black text-[11px] uppercase tracking-[0.2em]">
                {item.label}
              </span>
            </motion.button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-6 space-y-4">
          {/* Status Card */}
          <motion.div
            className="p-5 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-3xl shadow-xl"
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: ['0 0 0 0 rgba(37,99,235,0.3)', '0 0 0 8px rgba(37,99,235,0)']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
              Link Status
            </p>

            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2 shadow-inner">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              />
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              Global: Operational
            </p>
          </motion.div>

          {/* Theme Toggle Button – uses fallback icons if Icons.Moon/Sun missing */}
          <motion.button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl
              bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {theme === 'light' ? (
              Icons.Moon ? <Icons.Moon size={18} /> : <MoonIcon />
            ) : (
              Icons.Sun ? <Icons.Sun size={18} /> : <SunIcon />
            )}
            <span className="text-xs font-bold uppercase tracking-wider">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        className="md:hidden fixed bottom-6 left-6 right-6 
          bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl 
          border border-slate-200 dark:border-slate-800 
          flex items-center justify-around p-3 z-50 
          rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center 
              p-4 rounded-2xl transition-colors duration-300
              ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon
              size={22}
              strokeWidth={activeTab === item.id ? 2.5 : 2}
            />
          </motion.button>
        ))}
      </motion.nav>
    </>
  );
};

export default Sidebar;
