import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'All' | 'React' | 'MERN' | 'MEAN' | 'GraphQL'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['All', 'React', 'MERN', 'MEAN', 'GraphQL'] as const;

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || 
      project.category.toLowerCase() === activeCategory.toLowerCase() ||
      project.techStack.some((tech) => tech.toLowerCase() === activeCategory.toLowerCase());
      
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="relative py-24 bg-[#0B2545] overflow-hidden border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-black text-[#FF7A30] mb-2 font-mono">My Work</h2>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">Showcasing Innovation in Software Development</p>
          <div className="h-[3px] w-12 bg-[#FF7A30] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#FF7A30] border-[#FF7A30] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search project or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF7A30] transition-colors"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden bg-white flex flex-col justify-between group relative cursor-pointer shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform"
                  onClick={() => handleCardClick(project._id)}
                >
                  {/* Card Thumbnail Area */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.featured && (
                      <span className="absolute top-4 left-4 z-10 text-[9px] font-extrabold uppercase font-mono tracking-widest text-[#FF7A30] bg-[#FF7A30]/10 border border-[#FF7A30]/20 px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                        <span className="font-extrabold uppercase tracking-wider text-[#FF7A30]">{project.category}</span>
                        <span className="font-bold">2026</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#0B2545] uppercase tracking-tight group-hover:text-[#FF7A30] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-650 leading-relaxed font-semibold line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges & CTA */}
                    <div className="mt-6 pt-5 border-t border-zinc-150 space-y-4">
                      {/* Stack list */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-[10px] font-mono font-bold text-zinc-500 px-2.5 py-0.5 rounded bg-zinc-100 border border-zinc-200/80">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Read Case Study link */}
                      <div className="flex items-center justify-between text-xs font-bold text-[#FF7A30]">
                        <span className="flex items-center gap-1">
                          Read Case Study
                          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        
                        {/* Quick links buttons */}
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-[#0B2545] hover:text-[#FF7A30] transition-colors"
                            title="GitHub Repository"
                          >
                            <FiGithub className="w-4 h-4" />
                          </a>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-[#0B2545] hover:text-[#FF7A30] transition-colors"
                            title="Live Demo"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-zinc-400 text-sm">
                No projects found matching search details.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
