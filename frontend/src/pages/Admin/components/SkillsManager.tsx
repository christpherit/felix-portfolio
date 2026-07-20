import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import type { Skill } from '../../../services/api';

interface SkillsManagerProps {
  skills: Skill[];
  onSave: () => void;
}

const defaultForm = {
  name: '',
  category: 'Frontend' as 'Frontend' | 'Backend' | 'Database' | 'Tools',
  level: 90,
  icon: 'SiReact',
};

export const SkillsManager: React.FC<SkillsManagerProps> = ({ skills, onSave }) => {
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const resetForm = () => {
    setEditingSkill(null);
    setForm(defaultForm);
  };

  const handleFieldChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = (sk: Skill) => {
    setEditingSkill(sk);
    setForm({
      name: sk.name,
      category: sk.category,
      level: sk.level,
      icon: sk.icon,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      category: form.category,
      level: Number(form.level),
      icon: form.icon,
    };

    try {
      setSaving(true);
      if (editingSkill && editingSkill._id) {
        await api.put(`/skills/${editingSkill._id}`, payload);
      } else {
        await api.post('/skills', payload);
      }
      resetForm();
      onSave();
    } catch (err) {
      console.error(err);
      alert('Saving skill failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill badge?')) return;
    try {
      await api.delete(`/skills/${id}`);
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Active Skills CMS</h1>
          <p className="text-xs text-zinc-500 font-mono">Create, update or delete developer skills dynamically</p>
        </div>
        {!editingSkill && (
          <button
            onClick={() => setEditingSkill({})}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
          >
            <FiPlus /> New Skill Badge
          </button>
        )}
      </div>

      {editingSkill ? (
        <form onSubmit={handleFormSubmit} className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-5">
          <h3 className="font-extrabold text-sm text-white border-b border-zinc-900 pb-3">
            {editingSkill._id ? `Modify Skill: ${editingSkill.name}` : 'Create New Skill Badge'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Skill Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs text-zinc-300 focus:outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Proficiency Level (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                required
                value={form.level}
                onChange={(e) => handleFieldChange('level', Number(e.target.value))}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Icon String Reference</label>
              <input
                type="text"
                required
                value={form.icon}
                placeholder="SiReact, SiAngular, SiLink"
                onChange={(e) => handleFieldChange('icon', e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-zinc-900">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-zinc-850 rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-[10px] font-bold text-white cursor-pointer transition-colors"
            >
              Save Skill
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((sk) => (
            <div
              key={sk._id}
              className="glass-card p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between"
            >
              <div className="text-left">
                <h4 className="font-bold text-white text-sm">{sk.name}</h4>
                <p className="text-[9px] text-zinc-500 font-mono uppercase font-bold">{sk.category} ({sk.level}%)</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(sk)}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FiEdit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(sk._id)}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-pink-500 hover:bg-pink-600/10 transition-colors cursor-pointer"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
