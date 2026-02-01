import React, { useState, useEffect, useMemo, useRef } from 'react';
import Sidebar from './components/Sidebar.tsx';
import GroupCard from './components/GroupCard.tsx';
import InviteModal from './components/InviteModal.tsx';
import { Icons } from './constants.tsx';
import { TelegramGroup, JoinEvent } from './types.ts';
import { verifyBotToken, getChatDetails, TelegramBotInfo, getChatMemberCount, getRecentUpdates, kickChatMember } from './services/telegramService.ts';

const DEFAULT_TOKEN = '8357993008:AAGCcWUfCrRboCCnUS3N3kHS53PvAPIMwxs';
const DEFAULT_GROUPS: TelegramGroup[] = [
  { "id": "-1003736636212", "name": "Ultra Calculation", "memberCount": 6, "description": "Auto Synced Hub", "category": "Telegram", "image": "https://picsum.photos/seed/-1003736636212/200", "lastInteraction": Date.now() },
  { "id": "-1003732445402", "name": "RANI MAM 7.0", "memberCount": 3, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003732445402/200", "lastInteraction": 1769838117170 },
  { "id": "-1003360985096", "name": "Hindi Foundation Batch 2025 by khan sir", "memberCount": 3, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003360985096/200", "lastInteraction": 1769943253862 },
  { "id": "-1003067240220", "name": "𝗔𝗗𝗜𝗧𝗬𝗔 𝗦𝗜𝗥 3.0", "memberCount": 8, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003067240220/200", "lastInteraction": 1769773345247 },
  { "id": "-1003037426232", "name": "𝐕𝐈𝐊𝐑𝐀𝐌𝐉𝐄𝐄𝐓 𝐑𝐄𝐀𝐒𝐎𝐍𝐈𝐍𝐆 𝟑.𝟎", "memberCount": 7, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003037426232/200", "lastInteraction": 1769735170282 },
  { "id": "-1003767448478", "name": "E1 Coching", "memberCount": 3, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003767448478/200", "lastInteraction": 1769942453739 },
  { "id": "-1003036147121", "name": "Aman Sir ENG ( Rec)", "memberCount": 8, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003036147121/200", "lastInteraction": 1769918152685 },
  { "id": "-1003636154961", "name": "Parmar 2.0 ENG", "memberCount": 4, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003636154961/200", "lastInteraction": 1769903309738 },
  { "id": "-1003565371067", "name": "RWA sanjeev sir Eng Live", "memberCount": 4, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003565371067/200", "lastInteraction": 1769822904677 },
  { "id": "-1003856954597", "name": "Nimisha mam", "memberCount": 5, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003856954597/200", "lastInteraction": 1769812641775 },
  { "id": "-1002793359066", "name": "Piyush Sir Reasoning", "memberCount": 15, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1002793359066/200", "lastInteraction": 1769918112466 },
  { "id": "-1003577096046", "name": "Math by Bhutesh sir", "memberCount": 3, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003577096046/200", "lastInteraction": 1769811153806 },
  { "id": "-1003225282870", "name": "Selection Way", "memberCount": 14, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003225282870/200", "lastInteraction": 1769921383796 },
  { "id": "-1003012561565", "name": "Parmar 3.0", "memberCount": 12, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003012561565/200", "lastInteraction": 1769928178498 },
  { "id": "-1003153087650", "name": "Parmar SSC 4.0 🔴Live", "memberCount": 17, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003153087650/200", "lastInteraction": 1769937548049 },
  { "id": "-1003419167658", "name": "🛑𝚁𝙰𝙽𝙸 𝙼𝙰𝙼 𝟼.𝟶", "memberCount": 14, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003419167658/200", "lastInteraction": 1769855368945 },
  { "id": "-1002661265147", "name": "Batch 1", "memberCount": 41, "description": "Rani Mam All Paid Batch", "category": "Telegram", "image": "https://picsum.photos/seed/-1002661265147/200", "lastInteraction": 1769914131999 },
  { "id": "-1003698762401", "name": "GK & GS Brahmastra 4.0 Batch", "memberCount": 3, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1003698762401/200", "lastInteraction": 1769755953244 },
  { "id": "-1002986001803", "name": "rakesh yadav", "memberCount": 32, "description": "Synced Group", "category": "Telegram", "image": "https://picsum.photos/seed/-1002986001803/200", "lastInteraction": 1769943748023 }
];

const SEED_HISTORY: JoinEvent[] = [
  { userId: 101, userName: "Aman Gupta", chatId: -1002661265147, chatTitle: "Batch 1", timestamp: Date.now() - 604800000 },
  { userId: 102, userName: "Priya Sharma", chatId: -1002661265147, chatTitle: "Batch 1", timestamp: Date.now() - 518400000 },
  { userId: 103, userName: "Rohan V", chatId: -1003153087650, chatTitle: "Parmar SSC 4.0", timestamp: Date.now() - 432000000 },
  { userId: 104, userName: "Vikram J", chatId: -1003012561565, chatTitle: "Parmar 3.0", timestamp: Date.now() - 86400000 },
];

const ROW_COLORS = [
  'bg-blue-600/20 border-blue-600/40 text-blue-800 dark:text-blue-300',
  'bg-emerald-600/20 border-emerald-600/40 text-emerald-800 dark:text-emerald-300',
  'bg-rose-600/20 border-rose-600/40 text-rose-800 dark:text-rose-300',
  'bg-amber-600/20 border-amber-600/40 text-amber-800 dark:text-amber-300',
  'bg-indigo-600/20 border-indigo-600/40 text-indigo-800 dark:text-indigo-300',
  'bg-purple-600/20 border-purple-600/40 text-purple-800 dark:text-purple-300',
  'bg-cyan-600/20 border-cyan-600/40 text-cyan-800 dark:text-cyan-300',
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedGroup, setSelectedGroup] = useState<TelegramGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [token, setToken] = useState(localStorage.getItem('tg_bot_token') || DEFAULT_TOKEN);
  const [botInfo, setBotInfo] = useState<TelegramBotInfo | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLocked, setIsLocked] = useState(() => localStorage.getItem('tg_token_locked') === 'true' || true);
  const [groups, setGroups] = useState<TelegramGroup[]>(() => {
    const saved = localStorage.getItem('tg_groups');
    return saved ? JSON.parse(saved) : DEFAULT_GROUPS;
  });
  const [newChatId, setNewChatId] = useState('');
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalMembers, setTotalMembers] = useState(0);
  const [joinEvents, setJoinEvents] = useState<JoinEvent[]>(() => {
    const saved = localStorage.getItem('tg_join_events');
    return saved ? JSON.parse(saved) : SEED_HISTORY;
  });
  const [lastUpdateId, setLastUpdateId] = useState(() => Number(localStorage.getItem('tg_last_update_id')) || 0);
  
  const importFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (token) handleVerify(token); }, []);
  
  // Recalculate global total count whenever groups array or memberCounts change
  useEffect(() => setTotalMembers(groups.reduce((sum, g) => sum + (g.memberCount || 0), 0)), [groups]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tg_token_locked', isLocked.toString());
    localStorage.setItem('tg_join_events', JSON.stringify(joinEvents));
    localStorage.setItem('tg_last_update_id', lastUpdateId.toString());
    localStorage.setItem('tg_groups', JSON.stringify(groups));
  }, [isLocked, joinEvents, lastUpdateId, groups]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleVerify = async (testToken: string) => {
    if (!testToken) return;
    setIsVerifying(true);
    setError(null);
    try {
      const info = await verifyBotToken(testToken);
      setBotInfo(info);
      setToken(testToken);
      localStorage.setItem('tg_bot_token', testToken);
      discoverGroupsAndJoins(testToken);
    } catch (err: any) {
      setError(err.message);
      setBotInfo(null);
    } finally { setIsVerifying(false); }
  };

  const handleAddGroupManual = async () => {
    if (!token || !newChatId) return;
    setIsAddingGroup(true);
    setError(null);
    try {
      const chat = await getChatDetails(token, newChatId);
      const count = await getChatMemberCount(token, newChatId);
      const newGroup: TelegramGroup = {
        id: chat.id.toString(),
        name: chat.title,
        memberCount: count,
        description: chat.description || 'Synced Hub',
        category: 'Telegram',
        image: `https://picsum.photos/seed/${chat.id}/200`,
        lastInteraction: Date.now()
      };
      setGroups(prev => [newGroup, ...prev.filter(g => g.id !== newGroup.id)]);
      setNewChatId('');
      alert("Batch successfully injected!");
    } catch (err: any) { setError(err.message); } finally { setIsAddingGroup(false); }
  };

  const discoverGroupsAndJoins = async (currentToken: string) => {
    if (!currentToken || isScanning) return;
    setIsScanning(true);
    try {
      const updates = await getRecentUpdates(currentToken, lastUpdateId + 1);
      const newJoins: JoinEvent[] = [];
      let maxId = lastUpdateId;
      
      // Track member joins per chat ID to update state accurately
      const joinsPerChat: Record<string, number> = {};

      updates.forEach(u => {
        maxId = Math.max(maxId, u.update_id);
        const mu = u.chat_member;
        if (mu && (mu.new_chat_member?.status === 'member' || mu.new_chat_member?.status === 'administrator')) {
          const chatIdStr = mu.chat.id.toString();
          newJoins.push({
            userId: mu.new_chat_member.user.id,
            userName: mu.new_chat_member.user.first_name + (mu.new_chat_member.user.last_name ? ` ${mu.new_chat_member.user.last_name}` : ''),
            chatId: mu.chat.id,
            chatTitle: mu.chat.title,
            timestamp: mu.date ? mu.date * 1000 : Date.now()
          });
          joinsPerChat[chatIdStr] = (joinsPerChat[chatIdStr] || 0) + 1;
        }
      });

      if (newJoins.length > 0) {
        setJoinEvents(prev => {
          const combined = [...newJoins, ...prev];
          return combined.filter((v, i, a) => a.findIndex(t => t.userId === v.userId && t.timestamp === v.timestamp) === i).slice(0, 10000);
        });

        // UPDATE MEMBER COUNT: Update each relevant group's memberCount
        setGroups(prevGroups => prevGroups.map(g => {
          if (joinsPerChat[g.id]) {
            return { ...g, memberCount: (g.memberCount || 0) + joinsPerChat[g.id] };
          }
          return g;
        }));
      }
      setLastUpdateId(maxId);
    } catch (e) {} finally { setIsScanning(false); }
  };

  const handleExecuteKick = async (chatId: number, userId: number, eventId: string) => {
    if (!token) return;
    try {
      await kickChatMember(token, chatId, userId);
      setJoinEvents(prev => prev.filter(e => `${e.userId}-${e.timestamp}` !== eventId));
      
      // DECREMENT MEMBER COUNT: Someone was removed from the matrix
      setGroups(prevGroups => prevGroups.map(g => {
        if (g.id === chatId.toString()) {
          return { ...g, memberCount: Math.max(0, (g.memberCount || 0) - 1) };
        }
        return g;
      }));

      alert("Member removed successfully.");
    } catch (err: any) { alert(`Operation failed: ${err.message}`); }
  };

  const handleGroupInteraction = (groupId: string) => {
    setGroups(prev => prev.map(g => 
      g.id === groupId ? { ...g, lastInteraction: Date.now() } : g
    ));
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.joinEvents) setJoinEvents(data.joinEvents);
        if (data.groups) setGroups(data.groups);
        if (data.token) {
          setToken(data.token);
          handleVerify(data.token);
        }
        alert('Data imported successfully!');
      } catch (err) { alert('Import failed.'); }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleExport = () => {
    const data = { joinEvents, groups, token, theme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telebridge-data-${selectedDate}.json`;
    a.click();
  };

  const filteredJoins = useMemo(() => joinEvents.filter(e => new Date(e.timestamp).toISOString().split('T')[0] === selectedDate).sort((a, b) => b.timestamp - a.timestamp), [joinEvents, selectedDate]);
  const joinsTodayCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return joinEvents.filter(e => new Date(e.timestamp).toISOString().split('T')[0] === today).length;
  }, [joinEvents]);

  const filteredGroups = useMemo(() => {
    return groups
      .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.id.includes(searchQuery))
      .sort((a, b) => (b.lastInteraction || 0) - (a.lastInteraction || 0));
  }, [groups, searchQuery]);

  const formatTime12h = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-all duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8 pt-4 w-full max-w-[1400px] mx-auto overflow-hidden">
        <header className="flex flex-col gap-2 mb-4 animate-in slide-in-from-top duration-500">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-8 bg-blue-600 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.7)]" />
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter capitalize">{activeTab}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-90 transition-all">
                {theme === 'dark' ? <Icons.Sun size={18} className="text-amber-500" /> : <Icons.Moon size={18} className="text-blue-600" />}
              </button>
              <button onClick={() => discoverGroupsAndJoins(token)} disabled={isScanning} className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg active:scale-90 transition-all">
                <Icons.Refresh size={18} className={isScanning ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </header>

        <div className="relative min-h-[70vh]">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in slide-in-from-right-6 duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-blue-600 p-5 rounded-[2rem] border-b-4 border-blue-800 shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Icons.Home size={20} className="text-white" strokeWidth={3} /></div>
                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1">Batches</p>
                    <p className="text-3xl font-black text-white">{groups.length}</p>
                 </div>
                 <div className="bg-emerald-600 p-5 rounded-[2rem] border-b-4 border-emerald-800 shadow-[0_15px_30px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Icons.Users size={20} className="text-white" strokeWidth={3} /></div>
                    <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-1">Total Verified</p>
                    <p className="text-3xl font-black text-white">{totalMembers.toLocaleString()}</p>
                 </div>
                 <div className="bg-amber-500 p-5 rounded-[2rem] border-b-4 border-amber-700 shadow-[0_15px_30px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Icons.Activity size={20} className="text-white" strokeWidth={3} /></div>
                    <p className="text-[10px] font-black text-amber-50 uppercase tracking-widest mb-1">Joins Today</p>
                    <p className="text-3xl font-black text-white">{joinsTodayCount}</p>
                 </div>
                 <div className="bg-purple-600 p-5 rounded-[2rem] border-b-4 border-purple-800 shadow-[0_15px_30px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Icons.Zap size={20} className="text-white" strokeWidth={3} /></div>
                    <p className="text-[10px] font-black text-purple-100 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xl font-black text-white uppercase">{botInfo ? 'ACTIVE' : 'OFFLINE'}</p>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
                 <h2 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                   <Icons.Zap size={20} className="text-blue-600" /> Fast Batch Injection
                 </h2>
                 <div className="flex flex-col sm:flex-row gap-3">
                   <input type="text" placeholder="Enter Telegram Chat ID (-100...)" className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl text-xs font-mono outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner" value={newChatId} onChange={e => setNewChatId(e.target.value)} />
                   <button onClick={handleAddGroupManual} disabled={isAddingGroup || !newChatId} className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 transition-all">
                     {isAddingGroup ? 'Connecting...' : 'Inject Batch'}
                   </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="relative group">
                <Icons.Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" placeholder="Search active batches..." className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-3 rounded-2xl text-xs outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              {/* Group cards: One per row */}
              <div className="grid grid-cols-1 gap-4">
                {filteredGroups.map(g => (
                  <GroupCard key={g.id} group={g} onClick={() => setSelectedGroup(g)} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1 bg-indigo-600 p-6 rounded-[2.5rem] border-b-4 border-indigo-900 shadow-xl text-white relative overflow-hidden active:scale-95 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">Today Joined</p>
                    <p className="text-4xl font-black">{joinsTodayCount}</p>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" />
                 </div>
                 <div className="flex-1 bg-rose-500 p-6 rounded-[2.5rem] border-b-4 border-rose-800 shadow-xl text-white relative overflow-hidden active:scale-95 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">Live Audit</p>
                    <p className="text-4xl font-black">ACTIVE</p>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" />
                 </div>
                 <div className="bg-slate-900 p-6 rounded-[2.5rem] border-b-4 border-black shadow-xl flex flex-col justify-center min-w-[220px]">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Window Selector</p>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-white/5 border-none text-white text-xs font-black uppercase outline-none rounded-xl p-2 w-full" />
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <div className="overflow-y-auto max-h-[55vh] custom-scrollbar">
                   <table className="w-full text-left">
                      <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950 backdrop-blur-md z-10">
                        <tr>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Target</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Time</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredJoins.map((e, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-6 py-4">
                               <div className={`inline-flex items-center px-4 py-1.5 rounded-full border ${ROW_COLORS[idx % ROW_COLORS.length]} font-black text-[10px] uppercase`}>
                                 {e.userName}
                               </div>
                            </td>
                            <td className="px-6 py-4 text-[10px] font-bold text-slate-500">{e.chatTitle}</td>
                            <td className="px-6 py-4 text-[9px] font-mono text-slate-400">{formatTime12h(e.timestamp)}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => handleExecuteKick(e.chatId, e.userId, `${e.userId}-${e.timestamp}`)} className="p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all"><Icons.Trash size={16}/></button>
                            </td>
                          </tr>
                        ))}
                        {filteredJoins.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-20 text-center opacity-30 italic font-black uppercase text-xs tracking-widest">No matrix activity found for this window</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-6 animate-in slide-in-from-left-6 duration-500">
               <div className="bg-indigo-700/10 p-8 rounded-[3rem] border-2 border-indigo-500/20 shadow-xl">
                  <h3 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                    <Icons.Zap size={14} /> Bot Gateway
                  </h3>
                  <input type="password" value={token} onChange={e => setToken(e.target.value)} disabled={isLocked} className="w-full bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-2xl text-slate-900 dark:text-white font-mono text-xs outline-none focus:ring-4 focus:ring-indigo-500/20 mb-4 transition-all" />
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => handleVerify(token)} className="flex-1 py-4 bg-indigo-600 text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:bg-indigo-500 active:scale-95 transition-all">Sync Connection</button>
                    <button onClick={() => setIsLocked(!isLocked)} className="px-6 py-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">{isLocked ? 'Unlock' : 'Lock'}</button>
                  </div>

                  {/* Export / Import Section in Settings */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-200 dark:border-slate-800 pt-6">
                    <button onClick={handleExport} className="flex flex-col items-center justify-center gap-2 p-5 bg-blue-600 text-white rounded-2xl shadow-lg active:scale-95 transition-all">
                      <Icons.DownloadCloud size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Export Data</span>
                    </button>
                    <button onClick={() => importFileRef.current?.click()} className="flex flex-col items-center justify-center gap-2 p-5 bg-emerald-600 text-white rounded-2xl shadow-lg active:scale-95 transition-all">
                      <Icons.UploadCloud size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Import Data</span>
                    </button>
                    <input type="file" ref={importFileRef} onChange={handleImport} accept=".json" className="hidden" />
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>

      {selectedGroup && (
        <InviteModal group={selectedGroup} onClose={() => setSelectedGroup(null)} botToken={token} onInteraction={() => handleGroupInteraction(selectedGroup.id)} />
      )}
    </div>
  );
};

export default App;
