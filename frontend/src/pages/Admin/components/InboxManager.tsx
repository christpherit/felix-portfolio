import React, { useState } from 'react';
import { FiSearch, FiTrash2, FiEye, FiCheckCircle, FiMail, FiCalendar, FiUser } from 'react-icons/fi';
import api from '../../../services/api';
import type { ContactMessage } from '../../../services/api';

interface InboxManagerProps {
  inbox: ContactMessage[];
  loading: boolean;
  onRefresh: () => void;
}

export const InboxManager: React.FC<InboxManagerProps> = ({ inbox, loading, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter messages by search input
  const filteredInbox = inbox.filter((msg) => {
    const q = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q)
    );
  });

  // Sort by newest first
  const sortedInbox = [...filteredInbox].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination bounds
  const totalPages = Math.ceil(sortedInbox.length / itemsPerPage) || 1;
  const paginatedInbox = sortedInbox.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleMarkAsRead = async (msg: ContactMessage) => {
    try {
      await api.put(`/contacts/${msg._id}`, { isRead: true });
      onRefresh();
      if (selectedMsg && selectedMsg._id === msg._id) {
        setSelectedMsg({ ...selectedMsg, isRead: true });
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message submission permanently?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      if (selectedMsg?._id === id) setSelectedMsg(null);
      onRefresh();
    } catch (err) {
      console.error('Error deleting contact message:', err);
    }
  };

  const openMessageModal = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      handleMarkAsRead(msg);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Contact Submissions</h1>
          <p className="text-xs text-zinc-500">Manage and respond to incoming inquiries from your portfolio website</p>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Message Inspection Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-zinc-800 bg-zinc-950 text-left space-y-5 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-violet-400">Inquiry Subject</span>
                <h3 className="text-lg font-black text-white leading-tight">{selectedMsg.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-500 flex items-center gap-1 font-mono text-[10px]">
                  <FiUser className="text-violet-400" /> Sender Name
                </span>
                <div className="font-bold text-white">{selectedMsg.name}</div>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 flex items-center gap-1 font-mono text-[10px]">
                  <FiMail className="text-violet-400" /> Sender Email
                </span>
                <div className="font-bold text-white">{selectedMsg.email}</div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500 flex items-center gap-1 font-mono text-[10px]">
                <FiCalendar className="text-violet-400" /> Date & Time
              </span>
              <div className="text-xs text-zinc-300 font-mono">
                {new Date(selectedMsg.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-zinc-500 font-mono text-[10px] font-bold uppercase">Message Details</span>
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => handleDelete(selectedMsg._id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-pink-600/10 border border-pink-500/20 hover:bg-pink-600 hover:text-white rounded-xl text-xs font-bold text-pink-400 transition-all cursor-pointer"
              >
                <FiTrash2 className="w-4 h-4" /> Delete Submission
              </button>

              <button
                onClick={() => setSelectedMsg(null)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tabular Data Table */}
      <div className="glass-card rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 text-zinc-400 font-mono uppercase border-b border-zinc-850">
              <tr>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">Loading submission records...</td>
                </tr>
              ) : paginatedInbox.length > 0 ? (
                paginatedInbox.map((msg) => (
                  <tr
                    key={msg._id}
                    className={`hover:bg-zinc-900/40 transition-colors ${
                      !msg.isRead ? 'bg-violet-600/5' : ''
                    }`}
                  >
                    {/* Status Badge Column */}
                    <td className="py-3.5 px-4">
                      {msg.isRead ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 font-mono">
                          <FiCheckCircle className="w-3 h-3 text-emerald-400" /> Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-[10px] font-bold text-violet-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> New
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">{msg.name}</td>
                    <td className="py-3.5 px-4 text-zinc-300 font-mono">{msg.email}</td>
                    <td className="py-3.5 px-4 text-zinc-200 font-semibold truncate max-w-[150px]">{msg.subject}</td>
                    <td className="py-3.5 px-4 text-zinc-400 truncate max-w-[180px]">{msg.message}</td>
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openMessageModal(msg)}
                        className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                        title="View details"
                      >
                        <FiEye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-pink-400 hover:bg-pink-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete submission"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">No contact submissions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-zinc-900 bg-zinc-950/60 text-xs text-zinc-400 font-mono">
          <div>
            Showing Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({sortedInbox.length} Total Messages)
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              Previous
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
