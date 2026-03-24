"use client";

import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, ExternalLink, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for the demo if store is empty
  const mockLeads = [
    { id: 'sr_lead_a1b2', homeowner: { name: 'Alice Johnson' }, project: { type: 'Kitchen Remodel', address: '789 Pine Ln' }, status: 'synced', externalRef: 'BT_9921', createdAt: '2026-03-23T10:00:00Z' },
    { id: 'sr_lead_c3d4', homeowner: { name: 'Bob Wilson' }, project: { type: 'Bathroom Reno', address: '321 Oak St' }, status: 'appointment_scheduled', externalRef: 'PC_5521', createdAt: '2026-03-24T08:30:00Z' },
    { id: 'sr_lead_e5f6', homeowner: { name: 'Charlie Davis' }, project: { type: 'Deck Build', address: '555 Elm Rd' }, status: 'intake_received', externalRef: null, createdAt: '2026-03-24T09:15:00Z' },
  ];

  useEffect(() => {
    // In a real app we'd fetch from /api/dashboard or similar
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="flex min-h-screen bg-bg-deep">
      {/* Sidebar */}
      <aside className="w-64 glass-header border-r border-glass hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-main"></div>
            <span className="font-outfit text-xl font-bold tracking-tight">SmartReno</span>
          </div>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-accent-electric font-semibold"><LayoutDashboard className="w-5 h-5" /> Dashboard</a>
            <a href="#" className="flex items-center gap-3 text-fg-muted hover:text-white transition"><Users className="w-5 h-5" /> Leads</a>
            <a href="#" className="flex items-center gap-3 text-fg-muted hover:text-white transition"><Calendar className="w-5 h-5" /> Schedule</a>
            <a href="#" className="flex items-center gap-3 text-fg-muted hover:text-white transition"><Settings className="w-5 h-5" /> Settings</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Lead Command Center</h1>
            <p className="text-fg-muted italic">Manage your deals across Procore and Buildertrend.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-glass px-4 py-2 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Buildertrend Connected
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-glass px-4 py-2 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Procore Connected
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Leads', val: '128', change: '+12%', color: 'var(--accent-blue)' },
            { label: 'Active Bids', val: '34', change: '+5%', color: 'var(--accent-purple)' },
            { label: 'Sales Velocity', val: '4.2d', change: '-18%', color: 'var(--accent-electric)' },
            { label: 'Sync Health', val: '99.8%', change: 'Stable', color: '#10b981' },
          ].map((stat, i) => (
            <div key={i} className="glass p-6">
              <p className="text-fg-muted text-sm mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-bold font-outfit">{stat.val}</h3>
                <span className="text-xs font-semibold" style={{ color: stat.color }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="glass overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-glass bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted">Homeowner</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted">Project</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted">Provider Ref</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center animate-pulse italic">Syncing with construction cloud...</td></tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold">{lead.homeowner.name}</div>
                    <div className="text-xs text-fg-muted">ID: {lead.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>{lead.project.type}</div>
                    <div className="text-xs text-fg-muted">{lead.project.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      lead.status === 'synced' ? 'bg-green-500/10 text-green-400' :
                      lead.status === 'appointment_scheduled' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {lead.status === 'synced' ? <CheckCircle2 className="w-3 h-3" /> :
                       lead.status === 'appointment_scheduled' ? <Calendar className="w-3 h-3" /> :
                       <RefreshCw className="w-3 h-3 animate-spin-slow" />}
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-fg-muted">
                    {lead.externalRef || '--'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-accent-blue hover:text-accent-electric transition p-2 hover:bg-white/5 rounded-lg flex items-center gap-1">
                      View <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
