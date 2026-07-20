import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import type { ContactMessage } from '../../../services/api';

interface InboxManagerProps {
  inbox: ContactMessage[];
  loading: boolean;
  onRefresh: () => void;
}

export const InboxManager: React.FC<InboxManagerProps> = ({ inbox, loading, onRefresh }) => {
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const handleMarkAsRead = async (msg: ContactMessage) => {
    try {
      await api.put(`/contacts/${msg._id}`, { isRead: true });
      onRefresh();
      if (selectedMsg && selectedMsg._id === msg._id) {
        setSelectedMsg({ ...selectedMsg, isRead: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message permanently from database?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      setSelectedMsg(null);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Inbox Message Center</h1>
        <p className="text-xs text-zinc-500">Read and manage incoming inquiries from Christopher Felix portfolio contacts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Messages List column */}
        <div className="lg:col-span-5 space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {loading ? (
            <div className="text-center py-10 text-zinc-500 text-xs">Loading mail inbox...</div>
          ) : inbox.length > 0 ? (
            inbox.map((msg) => (
              <div
                key={msg._id}
                onClick={() => {
                  setSelectedMsg(msg);
                  if (!msg.isRead) handleMarkAsRead(msg);
                }}
                className={`glass-card p-4 rounded-xl border transition-all cursor-pointer text-left space-y-1.5 relative ${
                  selectedMsg?._id === msg._id
                    ? 'border-violet-500 bg-violet-600/10'
                    : msg.isRead
                    ? 'border-zinc-950 bg-zinc-950/20'
                    : 'border-zinc-800 bg-zinc-950/60'
                }`}
              >
                {!msg.isRead && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-violet-500" />
                )}
                
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                  <span className="font-bold truncate max-w-[120px]">{msg.name}</span>
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-white text-xs truncate">{msg.subject}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1 leading-normal">{msg.message}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500 text-xs border border-dashed border-zinc-850 rounded-2xl bg-zinc-950/20">
              Inbox is currently empty.
            </div>
          )}
        </div>

        {/* Selected Message details display column */}
        <div className="lg:col-span-7">
          {selectedMsg ? (
            <div className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-left space-y-6 relative">
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base leading-tight">{selectedMsg.subject}</h3>
                  <div className="text-xs text-zinc-400">
                    From: <strong>{selectedMsg.name}</strong> ({selectedMsg.email})
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(selectedMsg._id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-pink-600/10 border border-pink-500/20 hover:bg-pink-600 hover:text-white rounded-lg text-xs font-bold text-pink-400 transition-all cursor-pointer"
                >
                  <FiTrash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed bg-[#050212] p-4 rounded-xl border border-zinc-900 min-h-[140px] whitespace-pre-wrap">
                {selectedMsg.message}
              </div>

              <div className="text-[10px] text-zinc-500 font-mono">
                Received: {new Date(selectedMsg.createdAt).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="h-48 border border-dashed border-zinc-850 rounded-2xl flex items-center justify-center text-xs text-zinc-500 font-mono select-none">
              Select an email from the left to read
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
