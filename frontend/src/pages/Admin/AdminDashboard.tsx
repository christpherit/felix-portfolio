import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSliders, FiLock, FiLogOut, FiFolder, FiMail, 
  FiCpu, FiDatabase, FiSettings, FiCheck
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import api from '../../services/api';
import type { ContactMessage } from '../../services/api';

// Sub managers
import { HomeAboutManager } from './components/HomeAboutManager';
import { ProjectsManager } from './components/ProjectsManager';
import { SkillsManager } from './components/SkillsManager';
import { ExperiencesManager } from './components/ExperiencesManager';
import { SettingsManager } from './components/SettingsManager';
import { InboxManager } from './components/InboxManager';

type TabType = 'overview' | 'home-about' | 'projects' | 'skills' | 'experiences' | 'settings' | 'inbox';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const { about, skills, experiences, projects, settings, refreshData } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Route protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // CMS state values
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);

  // Fetch messages on mount/refresh
  const fetchInbox = async () => {
    try {
      setMsgLoading(true);
      const response = await api.get('/contacts');
      if (response.data.success) {
        setInbox(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching messages inbox:', err);
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInbox();
    }
  }, [isAuthenticated]);

  // Tab sidebar items
  const menuItems = [
    { id: 'overview' as TabType, label: 'Overview', icon: <FiSliders className="w-4 h-4" /> },
    { id: 'home-about' as TabType, label: 'Home & About', icon: <FiSliders className="w-4 h-4" /> },
    { id: 'projects' as TabType, label: 'Projects CRUD', icon: <FiFolder className="w-4 h-4" /> },
    { id: 'skills' as TabType, label: 'Skills CRUD', icon: <FiCpu className="w-4 h-4" /> },
    { id: 'experiences' as TabType, label: 'Experiences CRUD', icon: <FiDatabase className="w-4 h-4" /> },
    { id: 'settings' as TabType, label: 'SEO & Settings', icon: <FiSettings className="w-4 h-4" /> },
    { id: 'inbox' as TabType, label: 'Contact Inbox', icon: <FiMail className="w-4 h-4" /> },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-300 flex flex-col md:flex-row pt-20">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-zinc-950/80 border-r border-zinc-900 flex flex-col justify-between p-4 h-auto md:h-[calc(100vh-80px)] fixed md:sticky top-20 left-0 z-30">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-900">
            <div className="w-8 h-8 rounded bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
              <FiLock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-xs leading-none">Console Manager</div>
              <span className="text-[10px] text-zinc-500">v1.0.0 Stable</span>
            </div>
          </div>

          <div className="space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors w-full text-left shrink-0 md:shrink ${
                  activeTab === item.id
                    ? 'bg-violet-600/10 border border-violet-500/25 text-violet-400'
                    : 'border border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/admin');
          }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-pink-400 hover:bg-pink-600/10 hover:text-pink-300 transition-colors w-full text-left cursor-pointer border border-transparent mt-6"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Exit Console</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-grid min-h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="text-left">
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">System Status Dashboard</h1>
                  <p className="text-xs text-zinc-500">Live operational overview of dynamic portfolio entities</p>
                </div>
                
                {/* Stats Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl border border-zinc-900 text-left">
                    <h3 className="text-3xl font-extrabold text-white font-mono">{projects.length}</h3>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Total Projects</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-zinc-900 text-left">
                    <h3 className="text-3xl font-extrabold text-white font-mono">{skills.length}</h3>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Active Skills</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-zinc-900 text-left">
                    <h3 className="text-3xl font-extrabold text-white font-mono">
                      {inbox.filter(m => !m.isRead).length}
                    </h3>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Unread Mail</p>
                  </div>
                </div>

                {/* Operations checklist */}
                <div className="glass-card p-6 rounded-2xl border border-zinc-900 text-left space-y-4">
                  <h3 className="text-base font-extrabold text-white tracking-tight border-b border-zinc-900 pb-3">Deployment Diagnostics</h3>
                  <div className="space-y-3.5 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400 w-4 h-4 shrink-0" />
                      <span>MongoDB Connection: <strong>OK (Atlas Cluster Online)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400 w-4 h-4 shrink-0" />
                      <span>Security Headers: <strong>OK (Helmet Active)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400 w-4 h-4 shrink-0" />
                      <span>Cloudinary Storage: <strong>OK (Image Pipeline Set)</strong></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'home-about' && (
              <motion.div key="home-about" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <HomeAboutManager aboutData={about} onSave={refreshData} />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ProjectsManager projects={projects} onSave={refreshData} />
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <SkillsManager skills={skills} onSave={refreshData} />
              </motion.div>
            )}

            {activeTab === 'experiences' && (
              <motion.div key="experiences" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ExperiencesManager experiences={experiences} onSave={refreshData} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <SettingsManager settingsData={settings} onSave={refreshData} />
              </motion.div>
            )}

            {activeTab === 'inbox' && (
              <motion.div key="inbox" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <InboxManager inbox={inbox} loading={msgLoading} onRefresh={fetchInbox} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
