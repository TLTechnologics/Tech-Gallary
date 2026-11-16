import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { FAQItem } from '../../types';
import { api } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

interface FAQsManagerProps {
  faqs: FAQItem[];
  onRefresh: () => void;
}

export const FAQsManager: React.FC<FAQsManagerProps> = ({ faqs, onRefresh }) => {
  const { showNotification } = useNotification();
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    category: 'General',
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;

    setIsSubmitting(true);
    try {
      await api.addFAQ(newFaq);
      showNotification('success', 'FAQ Added', 'New question published.');
      setNewFaq({ question: '', answer: '', category: 'General' });
      setShowAddForm(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    setIsSubmitting(true);
    try {
      await api.updateFAQ(editingFaq.id, {
        question: editingFaq.question,
        answer: editingFaq.answer,
        category: editingFaq.category,
      });
      showNotification('success', 'FAQ Updated', 'Changes saved.');
      setEditingFaq(null);
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Update Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await api.deleteFAQ(id);
      showNotification('success', 'Deleted', 'FAQ removed.');
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Failed', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-dark-900 border border-neutral-800 p-4">
        <div>
          <h3 className="font-display font-bold text-white text-base">
            Frequently Asked Questions ({faqs.length})
          </h3>
          <p className="text-xs font-mono text-neutral-400">
            Edit answers, add guidelines, or clarify festival eligibility
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="bg-dark-900 border border-brand-lime/40 p-6 space-y-4 font-mono text-xs"
        >
          <span className="text-brand-lime font-bold uppercase tracking-wider block">
            Add New Question
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-neutral-400 uppercase text-[10px] mb-1">Question *</label>
              <input
                type="text"
                required
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase text-[10px] mb-1">Category</label>
              <input
                type="text"
                value={newFaq.category}
                onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 uppercase text-[10px] mb-1">Answer *</label>
            <textarea
              rows={3}
              required
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
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
              Publish FAQ
            </button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="tech-card border border-neutral-800 bg-dark-900 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-neutral-700 text-neutral-400 inline-block mb-1">
                {faq.category}
              </span>
              <h4 className="font-display font-bold text-white text-sm">
                {faq.question}
              </h4>
              <p className="text-xs text-neutral-300 font-sans mt-1 line-clamp-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => setEditingFaq({ ...faq })}
                className="p-1.5 border border-neutral-700 hover:border-brand-lime text-neutral-400 hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 border border-neutral-700 hover:border-rose-500 text-rose-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="bg-dark-900 border border-neutral-700 p-6 max-w-lg w-full font-mono text-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs uppercase text-brand-lime font-bold">Edit FAQ</span>
              <button onClick={() => setEditingFaq(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-white focus:border-brand-lime focus:outline-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs py-2 px-5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

