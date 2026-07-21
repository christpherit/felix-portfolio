import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiGitCommit, FiUser } from 'react-icons/fi';

interface VersionLog {
  version: string;
  timestamp: string;
  author: string;
  summary: string;
  changes: {
    field: string;
    previous: string;
    updated: string;
  }[];
}

const mockVersions: VersionLog[] = [
  {
    version: 'Version 2.0',
    timestamp: 'Today, 02:45 PM',
    author: 'Christopher Felix (Admin)',
    summary: 'Updated client tax calculation rules and payment terms',
    changes: [
      { field: 'Tax Rate', previous: '10% GST', updated: '18% GST (Standard)' },
      { field: 'Payment Terms', previous: 'Net 15 Days', updated: 'Net 30 Days' },
      { field: 'Invoice Status', previous: 'Draft', updated: 'Sent to Client' },
    ],
  },
  {
    version: 'Version 1.0',
    timestamp: 'Yesterday, 10:15 AM',
    author: 'Christopher Felix (Admin)',
    summary: 'Initial invoice generated and items logged',
    changes: [
      { field: 'Client Name', previous: 'Unassigned', updated: 'Acme Global Corp' },
      { field: 'Total Amount', previous: '$0.00', updated: '$2,450.00' },
      { field: 'Line Items', previous: '0 Items', updated: '3 Items added' },
    ],
  },
];

export const VersionHistoryShowcase: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<number>(0);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm text-left space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0B2545] dark:text-white flex items-center gap-2">
            <FiGitCommit className="text-[#FF7A30]" /> Order & Version Audit History
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">Track version revisions, changed attributes, and update timestamps</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Live Audit Log
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Version List Selector */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Revisions Log</span>
          {mockVersions.map((v, idx) => (
            <div
              key={v.version}
              onClick={() => setActiveVersion(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                activeVersion === idx
                  ? 'border-[#FF7A30] bg-[#FF7A30]/5 shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0B2545] dark:text-white font-mono">{v.version}</span>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                  <FiClock className="w-3 h-3 text-[#FF7A30]" /> {v.timestamp}
                </span>
              </div>
              <p className="text-xs text-zinc-650 dark:text-zinc-400 font-medium line-clamp-1">{v.summary}</p>
            </div>
          ))}
        </div>

        {/* Selected Version Detail Breakdowns */}
        <div className="md:col-span-7 bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div>
              <h4 className="text-sm font-extrabold text-[#0B2545] dark:text-white font-mono">{mockVersions[activeVersion].version} Breakdown</h4>
              <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                <FiUser className="w-3 h-3 text-[#FF7A30]" /> Modified by {mockVersions[activeVersion].author}
              </p>
            </div>
            <FiCheckCircle className="text-emerald-500 w-5 h-5" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Attribute Changes</span>
            {mockVersions[activeVersion].changes.map((change, i) => (
              <div key={i} className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
                <div className="font-bold text-[#0B2545] dark:text-zinc-200">{change.field}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="text-red-500 bg-red-50 dark:bg-red-950/30 p-1.5 rounded border border-red-100 dark:border-red-900/40">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-red-400 block">Previous</span>
                    {change.previous}
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-1.5 rounded border border-emerald-100 dark:border-emerald-900/40">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-500 block">Updated</span>
                    {change.updated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
