import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiUserCheck, FiLogOut, FiArrowLeft, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import type { ContactMessage } from '../../services/api';

// Sub managers
import { InboxManager } from './components/InboxManager';
import { AdminsManager } from './components/AdminsManager';

type TabType = 'contacts' | 'admins';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('contacts');

  // CMS state values
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);

  // Route protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch inbox messages
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-300 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between p-5 h-auto md:h-screen sticky top-0 left-0 z-30">
        <div className="space-y-6">
          {/* Top Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
            <div className="w-9 h-9 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
              <FiLock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-extrabold text-white text-xs leading-tight">Admin Console</div>
              <span className="text-[10px] text-zinc-500 font-mono">v2.0 Managed</span>
            </div>
          </div>

          {/* Back to Portfolio Link */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-850 bg-zinc-900/60 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all w-full text-left"
            >
              <FiArrowLeft className="w-4 h-4 text-violet-400" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          {/* Sidebar Menu Items (ONLY Contacts & Admin Management) */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all w-full text-left relative ${
                activeTab === 'contacts'
                  ? 'bg-violet-600/15 border border-violet-500/30 text-violet-400'
                  : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <FiMail className="w-4 h-4" />
              <span>Contacts</span>
              {inbox.filter((m) => !m.isRead).length > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-violet-500 text-white text-[10px] font-bold font-mono">
                  {inbox.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all w-full text-left ${
                activeTab === 'admins'
                  ? 'bg-violet-600/15 border border-violet-500/30 text-violet-400'
                  : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <FiUserCheck className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          </div>
        </div>

        {/* Bottom Logout Action */}
        <div className="pt-6 border-t border-zinc-900">
          <button
            onClick={() => {
              logout();
              navigate('/admin');
            }}
            className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold text-pink-400 hover:bg-pink-600/10 hover:text-pink-300 transition-colors w-full text-left cursor-pointer border border-transparent"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-grid min-h-screen">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'contacts' && (
              <motion.div key="contacts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <InboxManager inbox={inbox} loading={msgLoading} onRefresh={fetchInbox} />
              </motion.div>
            )}

            {activeTab === 'admins' && (
              <motion.div key="admins" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AdminsManager />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
