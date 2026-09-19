import React, { useState, useEffect } from 'react';
import {
  Users, Calculator, Calendar, MessageSquare, Settings, LogOut,
  TrendingUp, Activity, CheckCircle2, AlertTriangle, ShieldCheck,
  Search, RefreshCw, Trash2, Edit3, Save, Phone, MapPin, Sparkles
} from 'lucide-react';
import { MechanicalCard, TactileButton, StatusLed, IndustrialBadge } from '../common/TactileElements';
import { Lead, QuoteRequest, InspectionRequest, ContactMessage, BusinessConfig } from '../../types';

interface AdminDashboardProps {
  token: string;
  user: { username: string; role: string };
  business: BusinessConfig;
  onUpdateBusiness: (updated: BusinessConfig) => void;
  onLogout: () => void;
}

export function AdminDashboard({
  token,
  user,
  business,
  onUpdateBusiness,
  onLogout
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'quotes' | 'inspections' | 'messages' | 'cms'>('overview');
  
  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [inspections, setInspections] = useState<InspectionRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

  // CMS edit state
  const [cmsForm, setCmsForm] = useState<BusinessConfig>(business);
  const [cmsSaved, setCmsSaved] = useState(false);

  // Load dashboard data
  const loadData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [leadsRes, quotesRes, inspRes, msgRes, statsRes] = await Promise.all([
        fetch('/api/leads', { headers }),
        fetch('/api/quotes', { headers }),
        fetch('/api/inspections', { headers }),
        fetch('/api/contact', { headers }),
        fetch('/api/analytics/stats', { headers })
      ]);

      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (quotesRes.ok) setQuotes(await quotesRes.json());
      if (inspRes.ok) setInspections(await inspRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  // Update lead status
  const handleUpdateLeadStatus = async (id: string, status: any) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Confirm delete of this lead record?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Update quote status
  const handleUpdateQuoteStatus = async (id: string, status: any) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
      }
    } catch (err) {
      console.error('Failed to update quote:', err);
    }
  };

  // Mark message as read
  const handleMarkMessageRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error('Failed to mark message read:', err);
    }
  };

  // Save CMS changes
  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/business', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cmsForm)
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateBusiness(data.business);
        setCmsSaved(true);
        setTimeout(() => setCmsSaved(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save business info:', err);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Console Top Chassis (Material 3 Dark Tonal Container) */}
      <div className="rounded-[32px] bg-[#21005D] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 text-[#EADDFF] flex items-center justify-center font-extrabold shadow-sm">
            OPS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Central Dispatch Operations Portal</h1>
              <span className="bg-[#C8E6C9] text-[#1B5E20] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>
            <div className="text-xs text-white/80 mt-0.5">
              Authenticated Operator: <strong className="text-white">{user.username}</strong> ({user.role})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <TactileButton
            variant="secondary"
            onClick={loadData}
            disabled={loading}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 !py-2 !px-4 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </TactileButton>

          <TactileButton
            variant="danger"
            onClick={onLogout}
            className="!py-2 !px-4 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </TactileButton>
        </div>
      </div>

      {/* Main Console Navigation Tabs (Material 3 Segmented Filter Bar) */}
      <div className="flex items-center gap-2 p-1.5 bg-[#F3EDF7] rounded-full border border-[#E7E0EC] overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Telemetry', icon: TrendingUp, count: null },
          { id: 'leads', label: 'Leads Pipeline', icon: Users, count: leads.length },
          { id: 'quotes', label: 'Estimates & Quotes', icon: Calculator, count: quotes.length },
          { id: 'inspections', label: 'Inspection Orders', icon: Calendar, count: inspections.length },
          { id: 'messages', label: 'Contact Messages', icon: MessageSquare, count: messages.filter(m => !m.isRead).length },
          { id: 'cms', label: 'Company CMS Settings', icon: Settings, count: null }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#6750A4] text-white shadow-sm'
                  : 'text-[#49454F] hover:bg-[#E8DEF8]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-extrabold ${isActive ? 'bg-white text-[#6750A4]' : 'bg-[#E8DEF8] text-[#1D192B]'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Overview & Telemetry */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm">
              <div className="text-xs uppercase text-[#49454F] font-bold">Total Incoming Leads</div>
              <div className="text-3xl font-extrabold text-[#1C1B1F] mt-2">
                {stats?.totalLeads ?? (leads.length + quotes.length + inspections.length)}
              </div>
              <div className="text-xs font-bold text-[#2E7D32] mt-1">● Active Dispatch Queue</div>
            </div>

            <div className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm">
              <div className="text-xs uppercase text-[#49454F] font-bold">Conversion Efficiency</div>
              <div className="text-3xl font-extrabold text-[#6750A4] mt-2">
                {stats?.conversionRate ?? '14.2'}%
              </div>
              <div className="text-xs text-[#49454F] mt-1">Visits to formal proposal ratio</div>
            </div>

            <div className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm">
              <div className="text-xs uppercase text-[#49454F] font-bold">Pending Inspections</div>
              <div className="text-3xl font-extrabold text-[#1C1B1F] mt-2">
                {inspections.filter(i => i.status === 'new' || i.status === 'scheduled').length}
              </div>
              <div className="text-xs font-bold text-[#E65100] mt-1">● Drone & Walkthroughs</div>
            </div>

            <div className="rounded-3xl bg-[#F3EDF7] p-6 border border-[#E7E0EC] shadow-sm">
              <div className="text-xs uppercase text-[#49454F] font-bold">Emergency Phone Clicks</div>
              <div className="text-3xl font-extrabold text-[#2E7D32] mt-2">
                {stats?.phoneClicks ?? 18}
              </div>
              <div className="text-xs text-[#49454F] mt-1">Direct click-to-call taps</div>
            </div>
          </div>

          {/* 7-Day Activity Breakdown Chart */}
          <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-[#1C1B1F]">Daily Dispatch Telemetry</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {(stats?.timeline || [
                { date: 'Mon', pageViews: 42, leads: 3 },
                { date: 'Tue', pageViews: 58, leads: 5 },
                { date: 'Wed', pageViews: 65, leads: 4 },
                { date: 'Thu', pageViews: 81, leads: 7 },
                { date: 'Fri', pageViews: 74, leads: 6 },
                { date: 'Sat', pageViews: 38, leads: 2 },
                { date: 'Sun', pageViews: 29, leads: 1 }
              ]).map((day: any, i: number) => (
                <div key={i} className="p-4 bg-white/80 rounded-2xl border border-[#E7E0EC] space-y-1">
                  <div className="text-xs font-bold text-[#1C1B1F]">{day.date.includes('-') ? day.date.split('-').slice(1).join('/') : day.date}</div>
                  <div className="text-lg font-extrabold text-[#6750A4]">{day.leads} <span className="text-[11px] font-medium text-[#49454F]">leads</span></div>
                  <div className="text-[11px] text-[#49454F]">{day.pageViews} views</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Leads Pipeline */}
      {activeTab === 'leads' && (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-2xl font-extrabold text-[#1C1B1F]">Incoming Lead Submissions</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-4 py-2 text-xs font-bold rounded-full bg-white border border-[#E7E0EC] text-[#1C1B1F] shadow-xs outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New Only</option>
                <option value="qualified">Qualified</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E7E0EC] text-[#49454F] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Client Contact</th>
                  <th className="py-3 px-3">Property</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Urgency</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E0EC]">
                {leads
                  .filter(l => leadStatusFilter === 'all' || l.status === leadStatusFilter)
                  .map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/60 transition-colors">
                      <td className="py-3.5 px-3 text-[#49454F] whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-extrabold text-[#1C1B1F]">{lead.fullName}</div>
                        <div className="text-[11px] text-[#49454F]">{lead.phone}</div>
                        <div className="text-[10px] text-[#79747E]">{lead.email}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-[#1C1B1F] font-bold">{lead.propertyAddress || 'Not specified'}</div>
                        <div className="text-[10px] uppercase text-[#6750A4] font-bold">{lead.propertyType}</div>
                      </td>
                      <td className="py-3.5 px-3 text-[#1C1B1F] font-medium">
                        {lead.serviceRequested}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          lead.urgency === 'urgent'
                            ? 'bg-[#FFDAD6] text-[#BA1A1A]'
                            : 'bg-[#C8E6C9] text-[#1B5E20]'
                        }`}>
                          {lead.urgency}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                          className="px-3 py-1 rounded-full bg-white border border-[#E7E0EC] text-xs font-bold text-[#1C1B1F]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-full hover:bg-[#FFDAD6] text-[#BA1A1A] transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Quote Requests */}
      {activeTab === 'quotes' && (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
          <h3 className="text-2xl font-extrabold text-[#1C1B1F]">Parametric Quote Requests</h3>
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="p-5 rounded-3xl bg-white/80 border border-[#E7E0EC] space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E0EC] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#1C1B1F]">{q.fullName}</span>
                    <span className="text-[10px] bg-[#E8DEF8] text-[#1D192B] px-2.5 py-0.5 rounded-full font-bold">
                      {q.id.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[#6750A4] font-extrabold text-sm">
                    ${(q.calculatedEstimateLow ?? 0).toLocaleString()} – ${(q.calculatedEstimateHigh ?? 0).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#49454F]">
                  <div>Area: <strong className="text-[#1C1B1F]">{q.approximateSqFt.toLocaleString()} SQ FT</strong></div>
                  <div>Slope: <strong className="text-[#1C1B1F]">{q.pitchType}</strong></div>
                  <div>Material: <strong className="text-[#1C1B1F]">{q.materialPreference}</strong></div>
                  <div>Timeline: <strong className="text-[#1C1B1F]">{q.timeframe}</strong></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-[11px] text-[#49454F]">
                    Phone: <strong className="text-[#1C1B1F]">{q.phone}</strong> | Address: {q.propertyAddress}
                  </div>
                  <select
                    value={q.status}
                    onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                    className="px-3 py-1 rounded-full bg-[#E8DEF8] border border-[#E7E0EC] text-xs font-bold text-[#1D192B]"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Formal Bid Sent</option>
                    <option value="closed">Won / Signed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Inspections */}
      {activeTab === 'inspections' && (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
          <h3 className="text-2xl font-extrabold text-[#1C1B1F]">Scheduled Roof Inspections</h3>
          <div className="space-y-4">
            {inspections.map((insp) => (
              <div key={insp.id} className="p-5 rounded-3xl bg-white/80 border border-[#E7E0EC] space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[#E7E0EC] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#1C1B1F]">{insp.fullName}</span>
                    <span className="text-[#49454F]">({insp.phone})</span>
                  </div>
                  <div className="text-xs font-extrabold text-[#6750A4]">
                    DATE: {insp.preferredDate} ({insp.preferredTime.toUpperCase()})
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[#49454F]">
                  <div>Location: <strong className="text-[#1C1B1F]">{insp.propertyAddress}</strong></div>
                  <div>FLIR Drone: <strong className={insp.thermalDroneRequested ? 'text-[#2E7D32]' : 'text-[#49454F]'}>{insp.thermalDroneRequested ? 'YES' : 'NO'}</strong></div>
                  <div>Active Leaks: <strong className={insp.activeLeaks ? 'text-[#BA1A1A]' : 'text-[#49454F]'}>{insp.activeLeaks ? 'EMERGENCY' : 'NONE'}</strong></div>
                </div>

                {insp.notes && (
                  <div className="p-3 bg-[#F3EDF7] rounded-2xl text-xs text-[#1C1B1F]">
                    Notes: {insp.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Contact Messages */}
      {activeTab === 'messages' && (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
          <h3 className="text-2xl font-extrabold text-[#1C1B1F]">Contact Inquiries</h3>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-3xl border transition-all ${
                  msg.isRead ? 'bg-white/60 border-[#E7E0EC]' : 'bg-white border-[#6750A4] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs border-b border-[#E7E0EC] pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && <span className="w-2.5 h-2.5 rounded-full bg-[#6750A4]" />}
                    <span className="font-extrabold text-[#1C1B1F]">{msg.name}</span>
                    <span className="text-[#49454F]">({msg.email})</span>
                  </div>
                  <div className="text-[11px] text-[#49454F]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="text-xs font-extrabold text-[#1C1B1F] mb-1">
                  Subject: {msg.subject}
                </div>
                <p className="text-xs text-[#49454F] leading-relaxed">
                  {msg.message}
                </p>

                {!msg.isRead && (
                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => handleMarkMessageRead(msg.id)}
                      className="text-xs font-bold text-[#6750A4] hover:underline cursor-pointer"
                    >
                      Mark as Read ✓
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Company CMS Settings */}
      {activeTab === 'cms' && (
        <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-extrabold text-[#1C1B1F] mb-1">
              Live Business Configuration & Telemetry Parameters
            </h3>
            <p className="text-xs text-[#49454F] mb-6">
              Updates to these fields instantly synchronize across the application and persist in the database.
            </p>

            {cmsSaved && (
              <div className="mb-4 p-4 bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Configuration Saved and Synchronized Across System</span>
              </div>
            )}

            <form onSubmit={handleSaveCms} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">Primary Dispatch Phone</label>
                  <input
                    type="text"
                    value={cmsForm.primaryPhone}
                    onChange={(e) => setCmsForm({ ...cmsForm, primaryPhone: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">Emergency Hotline</label>
                  <input
                    type="text"
                    value={cmsForm.emergencyPhone}
                    onChange={(e) => setCmsForm({ ...cmsForm, emergencyPhone: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C1B1F] mb-1">Central Dispatch Physical Address</label>
                <input
                  type="text"
                  value={cmsForm.dispatchAddress}
                  onChange={(e) => setCmsForm({ ...cmsForm, dispatchAddress: e.target.value })}
                  className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">State Roofing License</label>
                  <input
                    type="text"
                    value={cmsForm.licenseNumber}
                    onChange={(e) => setCmsForm({ ...cmsForm, licenseNumber: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">General Liability Coverage</label>
                  <input
                    type="text"
                    value={cmsForm.insuranceCoverage}
                    onChange={(e) => setCmsForm({ ...cmsForm, insuranceCoverage: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">Hours (Weekdays)</label>
                  <input
                    type="text"
                    value={cmsForm.hoursWeekday}
                    onChange={(e) => setCmsForm({ ...cmsForm, hoursWeekday: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1B1F] mb-1">Hours (Saturday)</label>
                  <input
                    type="text"
                    value={cmsForm.hoursSaturday}
                    onChange={(e) => setCmsForm({ ...cmsForm, hoursSaturday: e.target.value })}
                    className="w-full h-11 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] text-[#1C1B1F] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <TactileButton variant="primary" type="submit" className="!py-3 !px-8 text-xs">
                  <Save className="w-4 h-4" />
                  <span>Commit Configuration to Database</span>
                </TactileButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
