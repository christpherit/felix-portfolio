import React from 'react';
import { FiTruck, FiCheck, FiPackage } from 'react-icons/fi';

interface ProductDispatch {
  id: string;
  name: string;
  ordered: number;
  dispatches: {
    batch: string;
    date: string;
    sentQuantity: number;
  }[];
}

const mockOrderData: ProductDispatch[] = [
  {
    id: 'p-a',
    name: 'Product A (Security Badges)',
    ordered: 5,
    dispatches: [
      { batch: 'Dispatch 1', date: 'Jul 10, 2026', sentQuantity: 2 },
      { batch: 'Dispatch 2', date: 'Jul 15, 2026', sentQuantity: 3 },
    ],
  },
  {
    id: 'p-b',
    name: 'Product B (Smart Access Cards)',
    ordered: 10,
    dispatches: [
      { batch: 'Dispatch 1', date: 'Jul 10, 2026', sentQuantity: 5 },
      { batch: 'Dispatch 2', date: 'Jul 15, 2026', sentQuantity: 5 },
    ],
  },
  {
    id: 'p-c',
    name: 'Product C (RFID Key Fobs)',
    ordered: 8,
    dispatches: [
      { batch: 'Dispatch 1', date: 'Jul 10, 2026', sentQuantity: 3 },
      { batch: 'Dispatch 2', date: 'Jul 15, 2026', sentQuantity: 5 },
    ],
  },
];

export const DispatchHistoryShowcase: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm text-left space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0B2545] dark:text-white flex items-center gap-2">
            <FiTruck className="text-[#FF7A30]" /> Dispatch Quantity History
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">Multi-product order fulfillment and partial delivery tracking</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
          Fulfillment Completed
        </span>
      </div>

      <div className="space-y-6">
        {mockOrderData.map((prod) => {
          const totalSent = prod.dispatches.reduce((acc, d) => acc + d.sentQuantity, 0);
          const percent = Math.round((totalSent / prod.ordered) * 100);

          return (
            <div key={prod.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#FF7A30]/10 rounded-lg text-[#FF7A30]">
                    <FiPackage className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0B2545] dark:text-white">{prod.name}</h4>
                    <span className="text-xs text-zinc-500 font-mono">Ordered: <strong>{prod.ordered} units</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <FiCheck className="w-3.5 h-3.5" /> Total Sent: {totalSent}/{prod.ordered}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold text-[10px]">
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF7A30] to-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
              </div>

              {/* Dispatch Batch Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {prod.dispatches.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF7A30]" />
                      <span className="font-bold text-[#0B2545] dark:text-zinc-200 font-mono">{d.batch}</span>
                      <span className="text-[10px] text-zinc-400">({d.date})</span>
                    </div>
                    <span className="font-bold text-[#0B2545] dark:text-white font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      Sent: {d.sentQuantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
