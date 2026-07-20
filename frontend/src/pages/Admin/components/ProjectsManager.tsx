import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import type { Project } from '../../../services/api';
import { CloudinaryUpload } from './CloudinaryUpload';

interface ProjectsManagerProps {
  projects: Project[];
  onSave: () => void;
}

const defaultForm = {
  title: '',
  description: '',
  image: '',
  liveUrl: '',
  githubUrl: '',
  techStackInput: '',
  category: 'MERN',
  featured: false,
  order: 1,
  overview: '',
  businessProblem: '',
  solution: '',
  challengesFaced: '',
  howSolved: '',
  lessonsLearned: '',
};

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onSave }) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const resetForm = () => {
    setEditingProject(null);
    setForm(defaultForm);
  };

  const handleFieldChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = (proj: Project) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      liveUrl: proj.liveUrl,
      githubUrl: proj.githubUrl,
      techStackInput: proj.techStack.join(', '),
      category: proj.category,
      featured: proj.featured,
      order: proj.order,
      overview: proj.overview || '',
      businessProblem: proj.businessProblem || '',
      solution: proj.solution || '',
      challengesFaced: proj.challengesFaced || '',
      howSolved: proj.howSolved || '',
      lessonsLearned: proj.lessonsLearned || '',
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      techStack: form.techStackInput.split(',').map((t) => t.trim()).filter(Boolean),
      category: form.category,
      featured: form.featured,
      order: Number(form.order),
      overview: form.overview,
      businessProblem: form.businessProblem,
      solution: form.solution,
      challengesFaced: form.challengesFaced,
      howSolved: form.howSolved,
      lessonsLearned: form.lessonsLearned,
    };

    try {
      setSaving(true);
      if (editingProject && editingProject._id) {
        await api.put(`/projects/${editingProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      resetForm();
      onSave();
    } catch (err) {
      console.error(err);
      alert('Saving project failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project case study permanently?')) return;
    try {
      await api.delete(`/projects/${id}`);
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Projects Case Studies CRUD</h1>
          <p className="text-xs text-zinc-500 font-mono">Create, read, update, or delete dynamic software products</p>
        </div>
        {!editingProject && (
          <button
            onClick={() => setEditingProject({})}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
          >
            <FiPlus /> New Case Study
          </button>
        )}
      </div>

      {editingProject ? (
        <form onSubmit={handleFormSubmit} className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 space-y-6 relative">
          <h3 className="font-extrabold text-lg text-white border-b border-zinc-900 pb-3">
            {editingProject._id ? `Modify: ${editingProject.title}` : 'Initialize New Case Study'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-violet-500 text-zinc-300"
              >
                <option value="React">React</option>
                <option value="MERN">MERN</option>
                <option value="MEAN">MEAN</option>
                <option value="GraphQL">GraphQL</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Short description card synopsis</label>
            <textarea
              rows={2}
              required
              value={form.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CloudinaryUpload 
              label="Project Showcase Screenshot" 
              onUploadSuccess={(url) => handleFieldChange('image', url)} 
            />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="React, Express, GraphQL, hasura"
                  value={form.techStackInput}
                  onChange={(e) => handleFieldChange('techStackInput', e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sorting Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => handleFieldChange('order', Number(e.target.value))}
                    className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={form.featured}
                    onChange={(e) => handleFieldChange('featured', e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-850 focus:ring-0 accent-violet-600 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="feat" className="text-xs font-bold text-zinc-400 uppercase tracking-wider cursor-pointer">Featured Card</label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">GitHub Repo URL</label>
              <input
                type="url"
                required
                value={form.githubUrl}
                onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live URL Deploy</label>
              <input
                type="url"
                required
                value={form.liveUrl}
                onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-zinc-900">
            <h4 className="text-sm font-extrabold text-white tracking-wider font-mono">Documentation specifications</h4>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">01. Project Overview details</label>
              <textarea
                rows={3}
                value={form.overview}
                onChange={(e) => handleFieldChange('overview', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">02. Business problem statement</label>
              <textarea
                rows={3}
                value={form.businessProblem}
                onChange={(e) => handleFieldChange('businessProblem', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">03. Solution engineering</label>
              <textarea
                rows={3}
                value={form.solution}
                onChange={(e) => handleFieldChange('solution', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">04. Challenge faced</label>
                <input
                  type="text"
                  value={form.challengesFaced}
                  onChange={(e) => handleFieldChange('challengesFaced', e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">05. How it was solved</label>
                <input
                  type="text"
                  value={form.howSolved}
                  onChange={(e) => handleFieldChange('howSolved', e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">06. Lessons learned & Retrospective</label>
              <textarea
                rows={2}
                value={form.lessonsLearned}
                onChange={(e) => handleFieldChange('lessonsLearned', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-zinc-900">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-zinc-850 rounded-xl text-xs font-bold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-xs font-bold text-white cursor-pointer transition-colors"
            >
              {saving ? 'Saving...' : 'Confirm Save'}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="glass-card p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 text-left">
                <img src={proj.image} alt={proj.title} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">{proj.title}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold">{proj.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEditClick(proj)}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Edit details"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-pink-500 hover:bg-pink-600/10 transition-colors cursor-pointer"
                  title="Delete case study"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
