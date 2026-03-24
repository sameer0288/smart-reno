"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Calendar, Settings, ExternalLink, RefreshCw, BarChart3, ShieldCheck, Zap, Menu, X, Bell, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mockLeads = [
    { id: 'sr_lead_a1b2', homeowner: { name: 'Alice Johnson' }, project: { type: 'Kitchen Remodel', address: '789 Pine Ln' }, status: 'synced', externalRef: 'BT_9921', createdAt: '2026-03-23T10:00:00Z' },
    { id: 'sr_lead_c3d4', homeowner: { name: 'Bob Wilson' }, project: { type: 'Bathroom Reno', address: '321 Oak St' }, status: 'appointment_scheduled', externalRef: 'PC_5521', createdAt: '2026-03-24T08:30:00Z' },
    { id: 'sr_lead_spequ2', homeowner: { name: 'John Smith' }, project: { type: 'Deck Build', address: '456 Oak Ave' }, status: 'synced', externalRef: 'BT_1CYN', createdAt: '2026-03-24T09:15:00Z' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1500);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-bg-deep text-fg-main antialiased relative overflow-hidden">
       {/* Background Decor */}
       <div className="bg-glow opacity-10 blur-[150px]" />
       <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Header Nav */}
      <header className="lg:hidden sticky top-0 z-[60] glass-header px-6 py-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-main flex items-center justify-center font-outfit font-black text-white italic text-xs">SR</div>
            <span className="font-outfit text-xl font-bold tracking-tighter">Command</span>
         </div>
         <button onClick={toggleSidebar} className="p-2 rounded-xl bg-white/5 border border-white/10">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>
      </header>

      {/* Responsive Sidebar Overlay */}
      <AnimatePresence>
         {isSidebarOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={toggleSidebar}
               className="lg:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
            />
         )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`
         fixed top-0 left-0 bottom-0 z-[80] w-[300px] glass-header border-r border-white/5 p-10 transform transition-transform duration-500 ease-out lg:translate-x-0 lg:sticky
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center mb-16">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-main shadow-xl flex items-center justify-center font-outfit font-black text-white italic">SR</div>
              <span className="font-outfit text-3xl font-bold tracking-tighter">SmartReno</span>
           </div>
           <button onClick={toggleSidebar} className="lg:hidden p-2 text-fg-muted hover:text-white transition"><X className="w-6 h-6" /></button>
        </div>
        
        <nav className="space-y-10">
          <div className="space-y-4">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-fg-muted mb-6">Operations</p>
            <NavItem icon={LayoutDashboard} label="Pulse Dashboard" active />
            <NavItem icon={Users} label="Homeowner Leads" />
            <NavItem icon={Calendar} label="Estimator Schedule" />
          </div>

          <div className="space-y-4 pt-10">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-fg-muted mb-6">Systems</p>
            <NavItem icon={BarChart3} label="Performance" />
            <NavItem icon={ShieldCheck} label="Security Logs" />
            <NavItem icon={Settings} label="Integrations" />
          </div>
        </nav>

        <div className="absolute bottom-10 left-10 right-10">
           <div className="p-6 glass border-blue-500/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 p-2 bg-blue-500/10 rounded-bl-xl"><Zap className="w-3 h-3 text-blue-400 fill-current" /></div>
              <p className="text-[10px] font-bold text-fg-muted uppercase tracking-widest mb-1">Support Tier</p>
              <h4 className="font-bold text-sm mb-4">Enterprise Hub</h4>
              <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5">Upgrade Hub</button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-12 lg:p-16 max-w-[1700px] mx-auto relative z-10 w-full">
         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20 animate-fade-in">
            <div className="space-y-1">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                   <Zap className="w-4 h-4 fill-current" /> Live Provider Feed
               </div>
               <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight leading-none mb-2">System <span className="text-gradient">Pulse</span></h1>
               <p className="text-fg-muted font-medium opacity-80 text-lg">Managing synced project threads across construction network endpoints.</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                  ))}
               </div>
               <div className="h-10 w-px bg-white/10 hidden md:block" />
               <button className="p-3 glass rounded-2xl relative"><Bell className="w-5 h-5 text-fg-muted" /><div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-deep" /></button>
               <button className="flex-1 md:flex-none btn-primary !py-3 !px-6 text-sm flex items-center justify-center gap-2">New Request <Zap className="w-4 h-4 fill-current" /></button>
            </div>
         </header>

         {/* Grid Stats */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <StatCard label="Live Pipelines" val="128" change="+12.4%" icon={Zap} color="blue" />
            <StatCard label="SLA Compliance" val="99.9%" change="Optimal" icon={ShieldCheck} color="green" />
            <StatCard label="Daily Intake" val="45" change="+8.2%" icon={Users} color="purple" />
            <StatCard label="Project Volume" val="$1.4M" change="Q1 Target" icon={BarChart3} color="orange" />
         </div>

         {/* Pipeline Management Interface */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass relative overflow-hidden"
         >
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.01]">
               <div className="flex items-center gap-4">
                  <h3 className="font-outfit font-black text-2xl tracking-tight uppercase tracking-[0.2em]">Lead Pipeline</h3>
                  <span className="badge badge-blue">3 New Leads</span>
               </div>
               <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
                     <input className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-blue-500/50 transition-all w-full md:w-64" placeholder="Search threads..." />
                  </div>
                  <button className="p-2.5 glass rounded-xl hover:bg-white/10 transition"><Filter className="w-5 h-5" /></button>
                  <button className="p-2.5 glass rounded-xl hover:bg-white/10 transition"><RefreshCw className="w-5 h-5" /></button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left font-inter">
                  <thead>
                     <tr className="bg-white/[0.02]">
                        <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-fg-muted">Identity & Origin</th>
                        <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-fg-muted">Scope Definition</th>
                        <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-fg-muted text-center">Sync Health</th>
                        <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-fg-muted">Reference ID</th>
                        <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-fg-muted text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {loading ? (
                        <tr>
                           <td colSpan={5} className="py-40 text-center">
                              <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-6" />
                              <p className="text-sm font-black uppercase tracking-[0.3em] text-fg-muted animate-pulse">Initializing Data Stream...</p>
                           </td>
                        </tr>
                     ) : (
                        leads.map((lead, i) => (
                           <motion.tr 
                              key={lead.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 * i }}
                              className="hover:bg-white/[0.04] transition-all duration-300 group"
                           >
                              <td className="px-10 py-8">
                                 <div className="text-lg font-bold font-outfit leading-tight mb-1">{lead.homeowner.name}</div>
                                 <div className="text-[10px] font-mono text-fg-muted uppercase tracking-widest font-black opacity-50">#SR-{lead.id.slice(-6).toUpperCase()}</div>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="badge badge-purple mb-2">{lead.project.type}</div>
                                 <div className="text-xs text-fg-muted opacity-80 italic font-medium">{lead.project.address}</div>
                              </td>
                              <td className="px-10 py-8 text-center">
                                 <StatusBadge status={lead.status} />
                              </td>
                              <td className="px-10 py-8">
                                 <div className="text-xs font-mono font-bold text-fg-muted group-hover:text-blue-400 transition-colors uppercase">{lead.externalRef || 'Generating...'}</div>
                              </td>
                              <td className="px-10 py-8 text-right">
                                 <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all group-hover:border-blue-500">
                                    <ExternalLink className="w-5 h-5 text-fg-muted group-hover:text-white" />
                                 </button>
                              </td>
                           </motion.tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
            
            <div className="p-8 bg-white/[0.01] border-t border-white/5 text-center">
               <button className="text-[11px] font-black uppercase tracking-[0.4em] text-fg-muted hover:text-white transition-all hover:tracking-[0.5em]">Sync Detailed Pipeline History</button>
            </div>
         </motion.div>
      </main>

      {/* Mobile Sticky Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] glass border-t border-white/10 px-8 py-5 flex justify-between items-center rounded-none rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
         <NavItem icon={LayoutDashboard} label="" active mobile />
         <NavItem icon={Users} label="" mobile />
         <NavItem icon={Calendar} label="" mobile />
         <NavItem icon={Settings} label="" mobile />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, mobile }: any) {
   return (
      <a href="#" className={`
         flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
         ${active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'text-fg-muted hover:bg-white/5 hover:text-white border border-transparent'}
         ${mobile ? '!py-3 !px-3' : ''}
      `}>
         <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
         {!mobile && <span className={`text-sm font-black uppercase tracking-[0.1em] ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{label}</span>}
      </a>
   )
}

function StatCard({ label, val, change, icon: Icon, color }: any) {
   const colorMap: any = {
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      green: 'text-green-400 bg-green-500/10 border-green-500/20',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
   };
   
   return (
      <div className="glass p-8 relative group hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
         <div className={`absolute top-0 right-0 p-3 rounded-bl-3xl opacity-20 group-hover:opacity-100 transition-opacity ${colorMap[color]}`}>
            <Icon className="w-5 h-5" />
         </div>
         <p className="text-[10px] font-black text-fg-muted uppercase tracking-[0.3em] mb-6">{label}</p>
         <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black font-outfit tracking-tighter">{val}</h3>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg mb-1.5 ${colorMap[color]}`}>{change}</span>
         </div>
         <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
   )
}

function StatusBadge({ status }: { status: string }) {
   switch (status) {
      case 'synced': return <span className="badge badge-green"><CheckCircle2 className="w-3 h-3" /> Operational</span>;
      case 'appointment_scheduled': return <span className="badge badge-blue"><Calendar className="w-3 h-3" /> Scheduled</span>;
      default: return <span className="badge badge-orange"><AlertCircle className="w-3 h-3" /> Attention</span>;
   }
}
