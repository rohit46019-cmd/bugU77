import React, { useRef, useEffect, useState } from 'react';
import { Icons } from '../constants.tsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, theme, toggleTheme }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Icons.Home, color: 'blue' },
    { id: 'groups', label: 'Hubs', icon: Icons.Users, color: 'indigo' },
    { id: 'analysis', label: 'Audit', icon: Icons.Activity, color: 'emerald' },
    { id: 'settings', label: 'Nodes', icon: Icons.Settings, color: 'purple' },
  ];

  // Helper to get active item's color classes
  const getActiveColor = (itemColor: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-600 text-white shadow-blue-600/20',
      indigo: 'bg-indigo-600 text-white shadow-indigo-600/20',
      emerald: 'bg-emerald-600 text-white shadow-emerald-600/20',
      purple: 'bg-purple-600 text-white shadow-purple-600/20',
    };
    return colors[itemColor] || 'bg-blue-600 text-white';
  };

  // --- Mobile swipe & sliding indicator logic ---
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Update indicator position when activeTab changes or window resizes
  useEffect(() => {
    const activeIndex = menuItems.findIndex(item => item.id === activeTab);
    const activeButton = buttonRefs.current[activeIndex];
    if (activeButton && navRef.current) {
      const containerRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      // Indicator width = 20px (icon size), center under icon
      const indicatorWidth = 20;
      const left = buttonRect.left - containerRect.left + (buttonRect.width - indicatorWidth) / 2;
      setIndicatorStyle({ left, width: indicatorWidth, opacity: 1 });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeTab, menuItems]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeIndex = menuItems.findIndex(item => item.id === activeTab);
      const activeButton = buttonRefs.current[activeIndex];
      if (activeButton && navRef.current) {
        const containerRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const indicatorWidth = 20;
        const left = buttonRect.left - containerRect.left + (buttonRect.width - indicatorWidth) / 2;
        setIndicatorStyle({ left, width: indicatorWidth, opacity: 1 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, menuItems]);

  // --- Swipe handling ---
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50; // minimum swipe distance
    if (Math.abs(diff) > threshold) {
      const currentIndex = menuItems.findIndex(item => item.id === activeTab);
      let newIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1; // left swipe = next, right swipe = previous
      if (newIndex >= 0 && newIndex < menuItems.length) {
        onTabChange(menuItems[newIndex].id);
      }
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col h-screen fixed top-0 left-0 z-20 transition-colors duration-300 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Icons.Zap className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">TeleBridge</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const activeColor = getActiveColor(item.color);
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? activeColor
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active indicator line */}
                {isActive && (
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-${item.color}-400 rounded-r-full`} />
                )}
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 mt-auto">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Display</p>
            <button
              onClick={toggleTheme}
              className="relative w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {/* Background Icons */}
              <div className="absolute inset-0 flex items-center justify-between px-3 text-slate-500 dark:text-slate-400">
                <Icons.Sun size={16} />
                <Icons.Moon size={16} />
              </div>
              {/* Sliding Thumb */}
              <div
                className={`absolute top-1 left-1 w-8 h-8 bg-white dark:bg-slate-900 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-[calc(100%+0.25rem)]' : ''
                }`}
              >
                {theme === 'light' ? (
                  <Icons.Sun size={14} className="text-amber-500" />
                ) : (
                  <Icons.Moon size={14} className="text-indigo-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation with Swipe & Sliding Indicator */}
      <nav
        ref={navRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="md:hidden fixed bottom-4 left-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 flex items-center justify-around p-1 z-50 rounded-2xl shadow-2xl relative"
      >
        {/* Sliding Indicator */}
        <div
          className="absolute bottom-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 ease-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }}
        />

        {menuItems.map((item, index) => {
          const isActive = activeTab === item.id;
          const activeColor = getActiveColor(item.color);
          return (
            <button
              key={item.id}
              ref={el => (buttonRefs.current[index] = el)}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                isActive ? activeColor : 'text-slate-500 dark:text-slate-400'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
