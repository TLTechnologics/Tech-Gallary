import React, { useState } from 'react';
import { Check, X, Search, Video, Users, Cpu, Code2, ExternalLink, AlertCircle } from 'lucide-react';
import { ProjectRecord } from '../../types';
import { api } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { formatDate } from '../../utils/helpers';

interface ProjectsManagerProps {
  projects: ProjectRecord[];
  onRefresh: () => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onRefresh }) => {
  const { showNotification } = useNotification();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = projects.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || p.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch =
      !search ||
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.student_name.toLowerCase().includes(search.toLowerCase()) ||
      p.college_name.toLowerCase().includes(search.toLowerCase()) ||
      p.project_code.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleUpdateStatus = async (projectId: string, newStatus: 'approved' | 'rejected') => {
    setIsUpdating(true);
    try {
      await api.updateProjectStatus(projectId, newStatus, adminNotes);
      showNotification('success', 'Project Updated', `Project marked as ${newStatus}.`);
      setSelectedProject(null);
      setAdminNotes('');
      onRefresh();
    } catch (err: any) {
      showNotification('error', 'Update Failed', err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-dark-900 border border-neutral-800 p-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search project title, builder, or college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-850 border border-neutral-700 pl-9 pr-3 py-2 text-xs font-mono text-neutral-100 focus:border-brand-lime focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-dark-850 border border-neutral-700 px-3 py-2 text-xs font-mono text-neutral-100 focus:border-brand-lime focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-850 border border-neutral-700 px-3 py-2 text-xs font-mono text-neutral-100 focus:border-brand-lime focus:outline-none"
          >
            <option value="all">All Statuses ({projects.length})</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => {
          const isPending = p.status === 'pending';
          const isApproved = p.status === 'approved';
          const isRejected = p.status === 'rejected';

          return (
            <div
              key={p.id}
              className={`tech-card border bg-dark-900 p-5 flex flex-col justify-between ${
                isPending
                  ? 'border-amber-400/40'
                  : isApproved
                  ? 'border-emerald-400/40'
                  : 'border-rose-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
                  <span className="font-bold text-brand-lime">{p.project_code}</span>
                  <span
                    className={`px-2 py-0.5 uppercase border ${
                      isPending
                        ? 'border-amber-400/30 text-amber-400 bg-amber-400/10'
                        : isApproved
                        ? 'border-emerald-400/30 text-emerald-400 bg-emerald-400/10'
                        : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-brand-blue mb-1">
                  {p.category === 'Hardware' ? <Cpu className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                  <span>{p.category} • {p.sub_category}</span>
                </div>

                <h4 className="font-display font-bold text-lg text-white mb-1">
                  {p.project_name}
                </h4>

                <p className="text-xs font-mono text-neutral-400 mb-2">
                  Lead: {p.student_name} ({p.college_name})
                </p>

                <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-3">
                  {p.description}
                </p>

                <div className="p-2 bg-dark-850 border border-neutral-800 text-[11px] font-mono text-neutral-300 mb-3">
                  <span className="text-neutral-400 block text-[10px]">TECH STACK</span>
                  <span className="text-brand-lime">{p.technologies_used}</span>
                </div>

                {p.admin_notes && (
                  <div className="p-2 bg-neutral-850 border border-neutral-700 text-[11px] font-mono text-neutral-300 mb-3">
                    <span className="text-neutral-400 block text-[10px]">ADMIN NOTES</span>
                    <span>{p.admin_notes}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedProject(p);
                    setAdminNotes(p.admin_notes || '');
                  }}
                  className="text-xs font-mono text-neutral-300 hover:text-white underline underline-offset-4"
                >
                  Review Details
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateStatus(p.id, 'approved')}
                    disabled={isUpdating}
                    className="p-1.5 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                    title="Approve for Exhibition"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(p.id, 'rejected')}
                    disabled={isUpdating}
                    className="p-1.5 border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center text-xs font-mono text-neutral-400 bg-dark-900 border border-neutral-800">
          No projects found in this view.
        </div>
      )}

      {/* Review Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-dark-900 border border-neutral-700 p-6 sm:p-8 max-w-2xl w-full font-mono text-neutral-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs uppercase text-brand-lime font-bold">
                Review Project Submission
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-neutral-400 block text-[10px]">CODE</span>
                  <span className="text-xl font-black text-brand-lime">{selectedProject.project_code}</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 block text-[10px]">STATUS</span>
                  <span className="uppercase font-bold text-white">{selectedProject.status}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px]">PROJECT TITLE</span>
                <span className="text-lg font-bold text-white">{selectedProject.project_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[10px]">CATEGORY</span>
                  <span className="text-brand-blue font-bold">{selectedProject.category} • {selectedProject.sub_category}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">SUBMISSION DATE</span>
                  <span>{formatDate(selectedProject.created_at)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[10px]">STUDENT LEAD</span>
                  <span>{selectedProject.student_name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">COLLEGE</span>
                  <span>{selectedProject.college_name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">EMAIL</span>
                  <span>{selectedProject.email}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">PHONE</span>
                  <span>{selectedProject.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px]">DESCRIPTION</span>
                <p className="p-3 bg-dark-850 border border-neutral-800 text-neutral-300 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px]">TECHNOLOGY STACK</span>
                <p className="font-bold text-brand-lime">{selectedProject.technologies_used}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[10px]">TEAM SIZE</span>
                  <span>{selectedProject.num_team_members} member(s)</span>
                </div>
                {selectedProject.team_member_names && (
                  <div>
                    <span className="text-neutral-400 block text-[10px]">TEAM MEMBERS</span>
                    <span>{selectedProject.team_member_names}</span>
                  </div>
                )}
              </div>

              {selectedProject.demo_video_url && (
                <div>
                  <span className="text-neutral-400 block text-[10px]">DEMO VIDEO</span>
                  <a
                    href={selectedProject.demo_video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-blue hover:underline flex items-center gap-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>{selectedProject.demo_video_url}</span>
                  </a>
                </div>
              )}

              {/* Images preview if any */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div>
                  <span className="text-neutral-400 block text-[10px] mb-1">PROJECT IMAGES</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.images.map((img) => (
                      <a key={img.id} href={img.image_url} target="_blank" rel="noreferrer" className="flex-shrink-0">
                        <img src={img.image_url} alt="Project" className="w-24 h-24 object-cover border border-neutral-700 hover:border-brand-lime" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Jury / Admin Notes */}
              <div>
                <label className="block text-neutral-400 text-[10px] uppercase mb-1">
                  Jury / Review Comments & Booth Assignment
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Assigned to Booth H-14, Hardware Hall. 230V AC socket requested."
                  className="w-full bg-dark-850 border border-neutral-700 p-2 text-xs text-neutral-100 font-mono focus:border-brand-lime focus:outline-none"
                />
              </div>
            </div>

            {/* Decisions */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedProject.id, 'rejected')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500 text-xs font-mono uppercase"
                >
                  Reject Project
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedProject.id, 'approved')}
                  disabled={isUpdating}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Approve For Showcase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

