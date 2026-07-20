import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { experiences } = usePortfolio();
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="relative py-24 bg-[#FFF5E6] overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-widest font-black text-[#FF7A30] mb-2 font-mono">My Journey</h2>
          <h1 className="text-3xl md:text-5xl font-black text-[#0B2545] tracking-tight leading-tight uppercase">
            Experience
          </h1>
          <div className="h-[3px] w-12 bg-[#FF7A30] mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Core Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Dotted/Dashed Line */}
          <div className="absolute left-[16px] sm:left-[180px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#FF7A30]/40 transform -translate-x-1/2" />

          {sortedExperiences.map((exp) => (
            <div 
              key={exp._id} 
              className="relative grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-12 mb-16 last:mb-0 items-start"
            >
              {/* Date/Duration column */}
              <div className="col-span-1 sm:col-span-3 text-left sm:text-right pt-1.5 pl-10 sm:pl-0">
                <span className="text-xs sm:text-sm font-black text-[#0B2545] font-mono tracking-wider">
                  {exp.duration.toUpperCase()}
                </span>
              </div>

              {/* Timeline Center Node Badge */}
              <div className="absolute left-[16px] sm:left-[180px] top-1 sm:top-1.5 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#FF7A30] flex items-center justify-center z-20 text-[10px] font-black text-[#FF7A30] shadow-md shadow-orange-500/10">
                &lt;&gt;
              </div>

              {/* Experience Card column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="col-span-1 sm:col-span-9 pl-10 sm:pl-4 text-left"
              >
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-800/5 relative">
                  <h3 className="text-base sm:text-lg font-black text-[#FF7A30] tracking-tight uppercase">
                    {exp.position}
                  </h3>
                  <h4 className="text-xs font-black text-[#0B2545] mt-1 tracking-widest uppercase font-mono">
                    {exp.company}
                  </h4>
                  
                  <ul className="mt-5 space-y-2.5 text-xs text-zinc-600 leading-relaxed font-semibold">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#FF7A30] select-none">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
