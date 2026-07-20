import React, { useState } from 'react';
import api from '../../../services/api';

interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  phone: string;
  email: string;
}

interface SettingsData {
  seo?: SEOSettings;
  socialLinks?: SocialLinks;
}

interface SettingsManagerProps {
  settingsData: SettingsData;
  onSave: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settingsData, onSave }) => {
  const [form, setForm] = useState({
    seoTitle: settingsData.seo?.title || '',
    seoDesc: settingsData.seo?.description || '',
    seoKeywords: settingsData.seo?.keywords?.join(', ') || '',
    github: settingsData.socialLinks?.github || '',
    linkedin: settingsData.socialLinks?.linkedin || '',
    twitter: settingsData.socialLinks?.twitter || '',
    phone: settingsData.socialLinks?.phone || '',
    email: settingsData.socialLinks?.email || '',
  });

  const [saving, setSaving] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      seo: {
        title: form.seoTitle,
        description: form.seoDesc,
        keywords: form.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean),
        ogImage: settingsData.seo?.ogImage || '',
      },
      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        twitter: form.twitter,
        phone: form.phone,
        email: form.email,
      },
    };

    try {
      setSaving(true);
      const response = await api.put('/settings', payload);
      if (response.data.success) {
        alert('SEO settings and social links updated.');
        onSave();
      }
    } catch (err) {
      console.error(err);
      alert('Settings save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">SEO Settings & Social Integration</h1>
        <p className="text-xs text-zinc-500">Manage header meta tags, indexing keywords, and external social media paths</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-5">
        <h3 className="font-extrabold text-sm text-white border-b border-zinc-900 pb-3">Search Engine Optimization (SEO)</h3>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SEO Title Tag</label>
          <input
            type="text"
            value={form.seoTitle}
            onChange={(e) => handleFieldChange('seoTitle', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SEO Description Meta</label>
          <textarea
            rows={2}
            value={form.seoDesc}
            onChange={(e) => handleFieldChange('seoDesc', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Keywords (comma separated)</label>
          <input
            type="text"
            value={form.seoKeywords}
            placeholder="React developer, full stack, Hasura"
            onChange={(e) => handleFieldChange('seoKeywords', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
          />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-5">
        <h3 className="font-extrabold text-sm text-white border-b border-zinc-900 pb-3">Social Profiles & Contact Channels</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">GitHub Link</label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => handleFieldChange('github', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">LinkedIn Link</label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => handleFieldChange('linkedin', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Twitter Link</label>
            <input
              type="url"
              value={form.twitter}
              onChange={(e) => handleFieldChange('twitter', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Public Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-4 text-xs focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white cursor-pointer transition-all disabled:opacity-50"
      >
        {saving ? 'Saving changes...' : 'Save Settings'}
      </button>
    </form>
  );
};
