import React, { useState } from 'react';
import { Edit2, Save, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../../types';
import { api } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

interface EventsManagerProps {
  events: EventItem[];
  onRefresh: () => void;
}

export const EventsManager: React.FC<EventsManagerProps> = ({ events, onRefresh }) => {
  const { showNotification } = useNotification();
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsSaving(true);
    try {
      await api.updateEvent(editingEvent.id, {
        name: editingEvent.name,
        tagline: editingEvent.tagline,
        description: editingEvent.description,
        registration_status: editingEvent.registration_status,
        rules: editingEvent.rules,
        venue: editingEvent.venue,
        timing: editingEvent.timing,
      });
      showNotification('success', 'Event Updated', `${editingEvent.name} settings saved.`);
      setEditingEvent(null);
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Update Failed', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-dark-900 border border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
        <span>Managing official schedule & registration gates for all 7 festival days.</span>
        <span className="text-brand-lime font-bold">Total: {events.length} Events</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="tech-card border border-neutral-800 bg-dark-900 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-brand-lime font-bold">{event.date_display}</span>
                <span
                  className={`px-2 py-0.5 uppercase border text-[10px] ${
                    event.registration_status === 'open'
                      ? 'border-emerald-400/40 text-emerald-400 bg-emerald-400/10'
                      : event.registration_status === 'waitlist'
                      ? 'border-amber-400/40 text-amber-400 bg-amber-400/10'
                      : 'border-neutral-700 text-neutral-400 bg-neutral-800'
                  }`}
                >
                  Status: {event.registration_status}
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-white mb-1">
                {event.name}
              </h4>
              {event.tagline && (
                <p className="font-mono text-[11px] text-neutral-400 mb-2 uppercase">
                  {event.tagline}
                </p>
              )}

              <p className="text-xs text-neutral-300 line-clamp-3 mb-4 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pt-3 border-t border-neutral-850">
                <div>Venue: <span className="text-neutral-200">{event.venue}</span></div>
                <div>Timing: <span className="text-neutral-200">{event.timing}</span></div>
                <div>Eligibility: <span className="text-brand-lime">{event.eligibility}</span></div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 text-right">
              <button
                onClick={() => setEditingEvent({ ...event })}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 ml-auto"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Configuration</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-dark-900 border border-neutral-700 p-6 sm:p-8 max-w-xl w-full font-mono text-neutral-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs uppercase text-brand-lime font-bold">
                Edit Event: {editingEvent.name}
              </span>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  value={editingEvent.tagline || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, tagline: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                  Registration Status
                </label>
                <select
                  value={editingEvent.registration_status}
                  onChange={(e: any) => setEditingEvent({ ...editingEvent, registration_status: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                >
                  <option value="open">Open</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="closed">Closed</option>
                  <option value="announced">Announced (Results / Ceremonial)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                    Timing
                  </label>
                  <input
                    type="text"
                    value={editingEvent.timing || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, timing: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={editingEvent.venue || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                  Rules & Guidelines
                </label>
                <textarea
                  rows={4}
                  value={editingEvent.rules || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, rules: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

