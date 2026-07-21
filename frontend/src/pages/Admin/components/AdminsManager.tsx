import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiKey, FiUserCheck, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import api from '../../../services/api';

interface AdminUser {
  _id: string;
  username: string; // Used for Name
  email: string;
  createdAt?: string;
}

export const AdminsManager: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states for creating admin
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password modal states
  const [changingPassAdmin, setChangingPassAdmin] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/admins');
      if (res.data.success) {
        setAdmins(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch admins list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      setSubmitting(true);
      const res = await api.post('/auth/admins', {
        username: name,
        email,
        password,
      });

      if (res.data.success) {
        setSuccessMsg(`Admin account "${name}" created successfully.`);
        setName('');
        setEmail('');
        setPassword('');
        setShowCreateForm(false);
        fetchAdmins();
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to create admin account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id: string, adminName: string) => {
    if (!window.confirm(`Permanently delete administrator account "${adminName}"?`)) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await api.delete(`/auth/admins/${id}`);
      if (res.data.success) {
        setSuccessMsg(`Administrator account deleted.`);
        fetchAdmins();
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to delete admin account.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changingPassAdmin || !newPassword) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      setSubmitting(true);
      const res = await api.put(`/auth/admins/${changingPassAdmin._id}/password`, {
        newPassword,
      });

      if (res.data.success) {
        setSuccessMsg(`Password for ${changingPassAdmin.username} updated.`);
        setChangingPassAdmin(null);
        setNewPassword('');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Management</h1>
          <p className="text-xs text-zinc-500">Manage administrator accounts, authentication credentials, and passwords</p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setErrorMsg(null);
            setSuccessMsg(null);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer transition-colors"
        >
          <FiPlus /> {showCreateForm ? 'Cancel' : 'Create New Admin'}
        </button>
      </div>

      {/* Alert Notices */}
      {errorMsg && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 text-xs">
          <FiAlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs">
          <FiCheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Create Admin Form Drawer */}
      {showCreateForm && (
        <form onSubmit={handleCreateAdmin} className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-zinc-900 pb-3">Create Administrator Account</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Name</label>
              <input
                type="text"
                required
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Confirm Create Admin'}
            </button>
          </div>
        </form>
      )}

      {/* Change Password Modal */}
      {changingPassAdmin && (
        <form onSubmit={handleChangePassword} className="glass-card p-6 rounded-2xl border border-violet-500/30 bg-violet-950/10 space-y-4">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <FiKey className="text-violet-400" /> Change Password for {changingPassAdmin.username} ({changingPassAdmin.email})
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="password"
              required
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-violet-500"
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setChangingPassAdmin(null)}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Admins Table Data View */}
      <div className="glass-card rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/60 text-zinc-400 font-mono uppercase border-b border-zinc-850">
              <tr>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500">Loading administrators list...</td>
                </tr>
              ) : admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <FiUserCheck className="text-violet-400 w-4 h-4" />
                      <span>{admin.username}</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 font-mono">{admin.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 font-mono text-[10px] font-bold">
                        Administrator
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setChangingPassAdmin(admin);
                          setNewPassword('');
                        }}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                        title="Change password"
                      >
                        <FiKey className="inline w-3 h-3 mr-1" /> Password
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin._id, admin.username)}
                        className="px-2.5 py-1 rounded bg-pink-600/10 border border-pink-500/20 text-pink-400 hover:bg-pink-600 hover:text-white transition-colors cursor-pointer text-[11px]"
                        title="Delete administrator"
                      >
                        <FiTrash2 className="inline w-3 h-3 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500">No admin accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
