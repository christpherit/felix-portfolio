import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import type { Experience } from '../../../services/api';

interface ExperiencesManagerProps {
  experiences: Experience[];
  onSave: () => void;
}

const defaultForm = {
  company: '',
  position: '',
  duration: '',
  responsibilitiesInput: '',
  order: 1,
};

export const ExperiencesManager: React.FC<ExperiencesManagerProps> = ({ experiences, onSave }) => {
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const resetForm = () => {
    setEditingExp(null);
    setForm(defaultForm);
  };

  const handleFieldChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = (exp: Experience) => {
    setEditingExp(exp);
    setForm({
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      responsibilitiesInput: exp.responsibilities.join('\n'),
      order: exp.order,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      company: form.company,
      position: form.position,
      duration: form.duration,
      responsibilities: form.responsibilitiesInput.split('\n').map((r) => r.trim()).filter(Boolean),
      order: Number(form.order),
    };

    try {
      setSaving(true);
      if (editingExp && editingExp._id) {
        await api.put(`/experiences/${editingExp._id}`, payload);
      } else {
        await api.post('/experiences', payload);
      }
      resetForm();
      onSave();
    } catch (err) {
      console.error(err);
      alert('Saving experience timeline node failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this career timeline node?')) return;
    try {
      await api.delete(`/experiences/${id}`);
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Timeline Experiences CRUD</h1>
          <p className="text-xs text-zinc-500 font-mono">Create, update or delete vertical timeline nodes</p>
        </div>
        {!editingExp && (
          <button
            onClick={() => setEditingExp({})}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
          >
            <FiPlus /> New Experience Node
          </button>
        )}
      </div>

      {editingExp ? (
        <form onSubmit={handleFormSubmit} className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-5">
          <h3 className="font-extrabold text-sm text-white border-b border-zinc-900 pb-3">
            {editingExp._id ? `Modify Node: ${editingExp.company}` : 'Create New Timeline Node'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Role Position</label>
              <input
                type="text"
                required
                value={form.position}
                onChange={(e) => handleFieldChange('position', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Work Duration</label>
              <input
                type="text"
                required
                value={form.duration}
                placeholder="e.g. Nearly 3 Years or 2023 - Present"
                onChange={(e) => handleFieldChange('duration', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sorting Index Order</label>
              <input
                type="number"
                required
                value={form.order}
                onChange={(e) => handleFieldChange('order', Number(e.target.value))}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Responsibilities (one item per line)</label>
            <textarea
              rows={4}
              required
              placeholder="- Developed MERN apps&#10;- Optimized MySQL indexes"
              value={form.responsibilitiesInput}
              onChange={(e) => handleFieldChange('responsibilitiesInput', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-zinc-900">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-zinc-855 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-[10px] font-bold text-white cursor-pointer transition-colors"
            >
              Save Timeline Node
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="glass-card p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between"
            >
              <div className="text-left space-y-1">
                <h4 className="font-bold text-white text-base leading-tight">{exp.position}</h4>
                <p className="text-xs text-zinc-400 font-semibold">{exp.company} • {exp.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEditClick(exp)}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-pink-500 hover:bg-pink-600/10 transition-colors cursor-pointer"
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
