import React, { useState } from 'react';
import { Plus, Trash2, Image, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types';
import { api } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

interface GalleryManagerProps {
  items: GalleryItem[];
  onRefresh: () => void;
}

export const GalleryManager: React.FC<GalleryManagerProps> = ({ items, onRefresh }) => {
  const { showNotification } = useNotification();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'hardware' as 'hardware' | 'software' | 'event' | 'workshop',
    image_url: '',
    description: '',
    is_featured: false,
    is_placeholder: false,
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      showNotification('warning', 'Missing Fields', 'Title and Image URL are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.addGalleryItem(formData);
      showNotification('success', 'Image Added', 'New gallery artifact created.');
      setFormData({
        title: '',
        category: 'hardware',
        image_url: '',
        description: '',
        is_featured: false,
        is_placeholder: false,
      });
      setShowAddForm(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Add Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;

    try {
      await api.deleteGalleryItem(id);
      showNotification('success', 'Item Deleted', 'Gallery artifact removed.');
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Delete Failed', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-dark-900 border border-neutral-800 p-4">
        <div>
          <h3 className="font-display font-bold text-white text-base">
            Gallery Artifacts & Photos ({items.length})
          </h3>
          <p className="text-xs font-mono text-neutral-400">
            Manage showcase images, hardware prototypes, and workshop photos
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add Image</span>
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="bg-dark-900 border border-brand-lime/40 p-6 space-y-4 font-mono text-xs"
        >
          <span className="text-brand-lime font-bold uppercase tracking-wider block">
            Add New Gallery Artifact
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 uppercase text-[10px] mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Autonomous Solar Rover"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase text-[10px] mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                className="w-full glass-select p-2 text-white focus:outline-none"
              >
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="event">Hackathon / Event Floor</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 uppercase text-[10px] mb-1">Image URL *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 uppercase text-[10px] mb-1">Description</label>
            <input
              type="text"
              placeholder="Brief caption..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="text-brand-lime focus:ring-0"
              />
              <span className="text-neutral-300">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_placeholder}
                onChange={(e) => setFormData({ ...formData, is_placeholder: e.target.checked })}
                className="text-brand-lime focus:ring-0"
              />
              <span className="text-neutral-300">Concept Preview Flag</span>
            </label>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-xs py-2 px-5"
            >
              {isSubmitting ? 'Uploading...' : 'Save Image'}
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="tech-card border border-neutral-800 bg-dark-900 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-video bg-black">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-dark-950/80 border border-neutral-700 text-brand-lime uppercase">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-3 text-xs font-mono">
              <h5 className="font-bold text-white truncate">{item.title}</h5>
              {item.description && (
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{item.description}</p>
              )}

              <div className="mt-3 pt-2 border-t border-neutral-850 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400">
                  {item.is_placeholder ? '[Concept]' : '[Photo]'}
                </span>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="text-rose-400 hover:text-rose-300 p-1"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

