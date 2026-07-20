import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiAngular, SiNodedotjs, SiExpress, SiMongodb, 
  SiGraphql, SiHasura, SiJavascript, SiTypescript, SiTailwindcss, 
  SiPostgresql, SiMysql, SiDocker, SiGit, SiGithub, 
  SiPostman, SiFigma, SiVite, SiFirebase, SiRedux, SiMaterialdesign, SiSocketdotio
} from 'react-icons/si';
import { FiCode, FiLayers, FiDatabase, FiCpu, FiTool, FiLink } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import { TechMarquee } from '../components/TechMarquee';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  // Resolve icon component dynamically from DB string value
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'SiReact': return <SiReact className="w-5 h-5 text-[#61DAFB]" />;
      case 'SiAngular': return <SiAngular className="w-5 h-5 text-[#DD0031]" />;
      case 'SiNodedotjs': return <SiNodedotjs className="w-5 h-5 text-[#339933]" />;
      case 'SiExpress': return <SiExpress className="w-5 h-5 text-zinc-650" />;
      case 'SiMongodb': return <SiMongodb className="w-5 h-5 text-[#47A248]" />;
      case 'SiGraphql': return <SiGraphql className="w-5 h-5 text-[#E10098]" />;
      case 'SiHasura': return <SiHasura className="w-5 h-5 text-[#1EB4D4]" />;
      case 'SiTypescript': return <SiTypescript className="w-5 h-5 text-[#3178C6]" />;
      case 'SiJavascript': return <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />;
      case 'SiTailwindcss': return <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />;
      case 'SiRedux': return <SiRedux className="w-5 h-5 text-[#764ABC]" />;
      case 'SiMaterialdesign': return <SiMaterialdesign className="w-5 h-5 text-[#0081CB]" />;
      case 'SiPostgresql': return <SiPostgresql className="w-5 h-5 text-[#4169E1]" />;
      case 'SiMysql': return <SiMysql className="w-5 h-5 text-[#4479A1]" />;
      case 'SiDocker': return <SiDocker className="w-5 h-5 text-[#2496ED]" />;
      case 'SiGit': return <SiGit className="w-5 h-5 text-[#F05032]" />;
      case 'SiGithub': return <SiGithub className="w-5 h-5 text-zinc-800" />;
      case 'SiVisualstudio': return <FiCode className="w-5 h-5 text-[#007ACC]" />;
      case 'SiPostman': return <SiPostman className="w-5 h-5 text-[#FF6C37]" />;
      case 'SiFigma': return <SiFigma className="w-5 h-5 text-[#F24E1E]" />;
      case 'SiVite': return <SiVite className="w-5 h-5 text-[#646CFF]" />;
      case 'SiFirebase': return <SiFirebase className="w-5 h-5 text-[#FFCA28]" />;
      case 'SiSocketdotio': return <SiSocketdotio className="w-5 h-5 text-[#010101]" />;
      case 'SiLink': return <FiLink className="w-5 h-5 text-zinc-400" />;
      default: return <FiCode className="w-5 h-5 text-[#FF7A30]" />;
    }
  };

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'] as const;

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === 'All') return true;
    return skill.category === activeCategory;
  });

  const frontendSkills = skills.filter((s) => s.category === 'Frontend');
  const backendSkills = skills.filter((s) => s.category === 'Backend');
  const databaseSkills = skills.filter((s) => s.category === 'Database');
  const toolsSkills = skills.filter((s) => s.category === 'Tools');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
  };

  return (
    <section id="skills" className="relative py-24 bg-[#FDFBF7] overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-black text-[#FF7A30] mb-2 font-mono">Capabilities</h2>
          <h1 className="text-3xl md:text-5xl font-black text-[#0B2545] tracking-tight leading-tight uppercase">
            Technical Stack
          </h1>
          <div className="h-[3px] w-12 bg-[#FF7A30] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF7A30] border-[#FF7A30] text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-[#0B2545]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Category Grouping Layout */}
        <AnimatePresence mode="wait">
          {activeCategory !== 'All' ? (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-md shadow-zinc-200/5 text-left relative group overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-zinc-50 border border-zinc-150 rounded-xl group-hover:border-[#FF7A30]/30 transition-all duration-300">
                      {getIconComponent(skill.icon)}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-[#0B2545] group-hover:text-[#FF7A30] transition-colors leading-tight">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] text-zinc-450 uppercase tracking-widest font-mono font-bold">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <span>Proficiency</span>
                      <span className="font-bold text-zinc-700">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/40">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-[#FF7A30] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <SkillColumn title="Frontend" icon={<FiLayers className="w-5 h-5 text-[#FF7A30]" />} skills={frontendSkills} iconResolver={getIconComponent} />
              <SkillColumn title="Backend" icon={<FiCpu className="w-5 h-5 text-[#FF7A30]" />} skills={backendSkills} iconResolver={getIconComponent} />
              <SkillColumn title="Database" icon={<FiDatabase className="w-5 h-5 text-[#FF7A30]" />} skills={databaseSkills} iconResolver={getIconComponent} />
              <SkillColumn title="Tools & Dev" icon={<FiTool className="w-5 h-5 text-[#FF7A30]" />} skills={toolsSkills} iconResolver={getIconComponent} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embedded Marquee */}
        <div className="mt-16 border-t border-zinc-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">Continuous Integration & Ecosystem</p>
          <TechMarquee />
        </div>

      </div>
    </section>
  );
};

// Skill Column Component inside dashboard layout
const SkillColumn: React.FC<{
  title: string;
  icon: React.ReactNode;
  skills: any[];
  iconResolver: (name: string) => React.ReactNode;
}> = ({ title, icon, skills, iconResolver }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 text-left">
        {icon}
        <h3 className="text-base font-black text-[#0B2545] tracking-tight uppercase font-mono">{title}</h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-white p-4 rounded-xl border border-zinc-200 shadow-md shadow-zinc-200/5 text-left flex items-center justify-between group hover:border-[#FF7A30]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 border border-zinc-150 rounded-lg group-hover:border-[#FF7A30]/10 transition-all duration-300">
                {iconResolver(skill.icon)}
              </div>
              <span className="font-bold text-zinc-700 text-sm group-hover:text-[#0B2545] transition-colors">{skill.name}</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-zinc-400 group-hover:text-[#FF7A30] transition-colors">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
