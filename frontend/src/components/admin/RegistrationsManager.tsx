import React, { useState } from 'react';
import { Search, Download, Eye, X, CheckCircle2, Check, Clock } from 'lucide-react';
import { RegistrationRecord, EventItem } from '../../types';
import { api } from '../../services/api';
import { formatDate } from '../../utils/helpers';
import { useNotification } from '../../context/NotificationContext';

interface RegistrationsManagerProps {
  registrations: RegistrationRecord[];
  events: EventItem[];
  onRefresh: () => void;
}

export const RegistrationsManager: React.FC<RegistrationsManagerProps> = ({
  registrations,
  events,
  onRefresh,
}) => {
  const { showNotification } = useNotification();
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const filtered = registrations.filter((r) => {
    const matchesEvent = selectedEventId === 'all' || r.event_id === selectedEventId;
    const matchesSearch =
      !search ||
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.reg_code.toLowerCase().includes(search.toLowerCase()) ||
      r.college_name.toLowerCase().includes(search.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const handleExportCsv = () => {
    const url = api.exportRegistrationsCsvUrl(selectedEventId === 'all' ? undefined : selectedEventId);
    window.open(url, '_blank');
  };

  const handleApprove = async (regId: string) => {
    setApprovingId(regId);
    try {
      await api.approveAdminRegistration(regId);
      showNotification('success', 'Registration Approved', 'Student has been granted Project Submission access.');
      onRefresh();
      if (selectedReg && selectedReg.id === regId) {
        setSelectedReg((prev) => prev ? { ...prev, status: 'approved', can_submit_project: true } : null);
      }
    } catch (err: any) {
      showNotification('error', 'Approval Error', err.message || 'Failed to approve registration.');
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-dark-900 border border-neutral-800 p-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, college, or reg code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-850 border border-neutral-700 pl-9 pr-3 py-2 text-xs font-mono text-neutral-100 focus:border-brand-lime focus:outline-none"
          />
        </div>

        {/* Filter by Event */}
        <div className="flex items-center gap-2">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="glass-select px-3 py-2 text-xs font-mono text-neutral-100 focus:outline-none"
          >
            <option value="all">All Events ({registrations.length})</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          {/* Export CSV button */}
          <button
            onClick={handleExportCsv}
            className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 whitespace-nowrap"
            title="Download CSV export"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-dark-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 bg-dark-850 text-neutral-400 uppercase tracking-wider">
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Participant</th>
              <th className="py-3 px-4">College</th>
              <th className="py-3 px-4">Event</th>
              <th className="py-3 px-4">Pass Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-850 text-neutral-300">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-dark-850/60 transition-colors">
                <td className="py-3 px-4 font-bold text-brand-lime whitespace-nowrap">
                  {r.reg_code}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-white">{r.full_name}</div>
                  <div className="text-[11px] text-neutral-400">{r.email} • {r.phone}</div>
                </td>
                <td className="py-3 px-4 max-w-[180px] truncate" title={r.college_name}>
                  {r.college_name}
                  {r.roll_number && (
                    <span className="block text-[10px] text-amber-400 font-mono">
                      Roll: {r.roll_number}
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400">
                    ({r.is_internal ? 'Internal' : 'External'})
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{r.event_name}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {r.registration_type === 'showcasing' ? (
                    <span className="px-2 py-0.5 text-[10px] bg-brand-blue/15 border border-brand-blue/30 text-brand-blue">
                      Project Showcasing
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] bg-neutral-800 border border-neutral-700 text-neutral-300">
                      Visitor Pass
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {r.status === 'pending_approval' ? (
                    <span className="px-2 py-0.5 text-[10px] bg-amber-400/15 border border-amber-400/30 text-amber-400 font-bold uppercase inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending Review
                    </span>
                  ) : r.status === 'approved' ? (
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 font-bold uppercase inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> Approved
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 uppercase">
                      {r.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                  {r.status === 'pending_approval' && (
                    <button
                      onClick={() => handleApprove(r.id)}
                      disabled={approvingId === r.id}
                      className="px-2.5 py-1 bg-brand-lime text-dark-950 font-bold text-[10px] hover:bg-white transition-colors flex items-center gap-1"
                      title="Approve registration and grant project submission"
                    >
                      <Check className="w-3 h-3" />
                      <span>{approvingId === r.id ? 'Approving...' : 'Approve'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedReg(r)}
                    className="p-1.5 border border-neutral-700 hover:border-brand-lime text-neutral-400 hover:text-brand-lime transition-colors"
                    title="View Full Registration"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs font-mono text-neutral-400">
            No registrations found matching your filters.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div className="bg-dark-900 border border-neutral-800 p-6 max-w-lg w-full font-mono space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="font-bold text-white uppercase text-sm">
                Registration Record
              </span>
              <button
                onClick={() => setSelectedReg(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px]">ID CODE</span>
                <span className="text-lg font-black text-brand-lime">{selectedReg.reg_code}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[10px]">NAME</span>
                  <span className="font-bold text-white">{selectedReg.full_name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">PHONE (WHATSAPP)</span>
                  <span>{selectedReg.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">EMAIL</span>
                <span>{selectedReg.email}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">COLLEGE</span>
                <span>{selectedReg.college_name}</span>
                <span className="ml-2 text-brand-lime text-[11px]">
                  ({selectedReg.is_internal ? 'Our College' : 'External College'})
                </span>
                {selectedReg.roll_number && (
                  <div className="mt-1">
                    <span className="text-neutral-400 text-[10px]">ROLL NO: </span>
                    <span className="font-bold text-amber-400 font-mono">{selectedReg.roll_number}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[10px]">PASS TYPE</span>
                  <span className="font-bold text-brand-blue">
                    {selectedReg.registration_type === 'showcasing' ? 'Project Showcasing (Free)' : 'Visitor Pass (Free)'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">STATUS</span>
                  <span className="font-bold text-white uppercase">{selectedReg.status}</span>
                </div>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">EVENT</span>
                <span className="font-bold text-white">{selectedReg.event_name}</span>
              </div>

              {selectedReg.team_name && (
                <div className="p-3 bg-dark-850 border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px]">TEAM NAME</span>
                  <span className="text-white font-bold">{selectedReg.team_name}</span>
                  {selectedReg.team_members && (
                    <p className="mt-1 text-neutral-300">
                      Members: {selectedReg.team_members}
                    </p>
                  )}
                </div>
              )}

              <div>
                <span className="text-neutral-400 block text-[10px]">REGISTERED TIMESTAMP</span>
                <span>{formatDate(selectedReg.created_at)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
              {selectedReg.status === 'pending_approval' ? (
                <button
                  onClick={() => handleApprove(selectedReg.id)}
                  disabled={approvingId === selectedReg.id}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Approve Registration &amp; Enable Project Submission
                </button>
              ) : (
                <span className="text-[11px] text-emerald-400">
                  ✓ Submission Access Active
                </span>
              )}

              <button
                onClick={() => setSelectedReg(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
