import React, { useState } from 'react';
import api from '../../../services/api';
import { CloudinaryUpload } from './CloudinaryUpload';

interface AboutStats {
  experience: string;
  projects: number;
  technologies: number;
  clients: number;
}

interface AboutData {
  bio: string;
  location: string;
  profileImage: string;
  stats?: AboutStats;
}

interface HomeAboutManagerProps {
  aboutData: AboutData;
  onSave: () => void;
}

export const HomeAboutManager: React.FC<HomeAboutManagerProps> = ({ aboutData, onSave }) => {
  const [form, setForm] = useState({
    bio: aboutData.bio || '',
    location: aboutData.location || '',
    profileImage: aboutData.profileImage || '',
    experience: aboutData.stats?.experience || 'Nearly 3 Years',
    projects: aboutData.stats?.projects || 14,
    technologies: aboutData.stats?.technologies || 24,
    clients: aboutData.stats?.clients || 6,
  });
  
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await api.put('/about', {
        bio: form.bio,
        location: form.location,
        profileImage: form.profileImage,
        stats: {
          experience: form.experience,
          projects: Number(form.projects),
          technologies: Number(form.technologies),
          clients: Number(form.clients),
        },
      });
      if (response.data.success) {
        alert('About section variables updated.');
        onSave();
      }
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Manage Home & About Sections</h1>
        <p className="text-xs text-zinc-500">Edit biography details, locations, profile photos and statistics counters</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-6">
        <CloudinaryUpload 
          label="Profile Photo Image" 
          onUploadSuccess={(url) => handleFieldChange('profileImage', url)} 
        />

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Biography summary</label>
          <textarea
            rows={5}
            value={form.bio}
            onChange={(e) => handleFieldChange('bio', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-3 px-4 text-sm text-zinc-200 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-3 px-4 text-sm text-zinc-200 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-900">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Experience Stat</span>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => handleFieldChange('experience', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-lg p-2 text-xs focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Projects Stat</span>
            <input
              type="number"
              value={form.projects}
              onChange={(e) => handleFieldChange('projects', Number(e.target.value))}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-lg p-2 text-xs focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Techs Stat</span>
            <input
              type="number"
              value={form.technologies}
              onChange={(e) => handleFieldChange('technologies', Number(e.target.value))}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-lg p-2 text-xs focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Clients Stat</span>
            <input
              type="number"
              value={form.clients}
              onChange={(e) => handleFieldChange('clients', Number(e.target.value))}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-lg p-2 text-xs focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white cursor-pointer transition-all disabled:opacity-50"
      >
        {saving ? 'Saving changes...' : 'Save variables'}
      </button>
    </form>
  );
};
