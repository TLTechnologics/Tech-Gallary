import React, { useState } from 'react';
import { Save, Building, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { FestivalSettings } from '../../types';
import { api } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

interface SettingsManagerProps {
  settings: FestivalSettings;
  onRefresh: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings, onRefresh }) => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<FestivalSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateSettings(formData);
      showNotification('success', 'Settings Saved', 'Festival details & contact information updated.');
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Update Failed', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl bg-dark-900 border border-neutral-800 p-6 sm:p-8 font-mono text-xs">
      <div className="mb-6 pb-4 border-b border-neutral-800">
        <h3 className="font-display font-bold text-lg text-white">
          Festival Configuration & Contact Channels
        </h3>
        <p className="text-neutral-400 mt-1">
          Adjust institutional metadata, validation anchors, and public communication desks
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-neutral-400 uppercase text-[10px] mb-1">
            Festival Title
          </label>
          <input
            type="text"
            required
            value={formData.festival_name}
            onChange={(e) => setFormData({ ...formData, festival_name: e.target.value })}
            className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-neutral-400 uppercase text-[10px] mb-1">
            Festival Tagline
          </label>
          <input
            type="text"
            required
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
          />
        </div>

        <div className="p-3 bg-dark-850 border border-brand-lime/30 space-y-1">
          <label className="block text-brand-lime uppercase text-[10px] font-bold">
            Host College Official Name (Used for Internal Registration Matching) *
          </label>
          <input
            type="text"
            required
            value={formData.our_college_name}
            onChange={(e) => setFormData({ ...formData, our_college_name: e.target.value })}
            className="w-full bg-dark-900 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
          />
          <span className="text-[10px] text-neutral-400 block">
            Students whose college matches this name or keywords are flagged as Internal participants.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-400 uppercase text-[10px] mb-1">
              Official Email
            </label>
            <input
              type="email"
              required
              value={formData.official_email}
              onChange={(e) => setFormData({ ...formData, official_email: e.target.value })}
              className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 uppercase text-[10px] mb-1">
              Helpline Phone Number
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-400 uppercase text-[10px] mb-1">
            College Address / Campus Block
          </label>
          <textarea
            rows={2}
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-neutral-400 uppercase text-[10px] mb-1">
            Instagram Profile URL
          </label>
          <input
            type="url"
            value={formData.instagram_url}
            onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
            className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 text-right">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 ml-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Updates...' : 'Update Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

