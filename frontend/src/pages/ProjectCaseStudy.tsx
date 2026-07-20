import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCpu, FiDatabase, FiCheckSquare, FiAlertCircle, FiSettings } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../services/api';

export const ProjectCaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = usePortfolio();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Scroll to top of case study page on load
    window.scrollTo(0, 0);

    if (projects.length > 0) {
      const foundProject = projects.find((p) => p._id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Redirection on not found
        navigate('/');
      }
    }
  }, [id, projects, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-300 pb-24 pt-28 bg-grid">
      
      {/* Dynamic Glow blobs */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Back navigation link */}
        <Link
          to="/"
          state={{ scrollTo: 'projects' }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white mb-10 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back To Projects
        </Link>

        {/* Documentation Header */}
        <div className="border-b border-zinc-950 pb-10 mb-12 text-left space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="font-semibold uppercase text-violet-400">{project.category} CASE STUDY</span>
            <span>SYSTEM TYPE: ENTERPRISE DEPLOYMENT</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base text-zinc-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
            {/* Tech tag list */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium text-zinc-400 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Quick Links buttons */}
            <div className="flex items-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:text-white transition-all text-xs font-semibold cursor-pointer"
              >
                <FiGithub className="w-4 h-4" /> GitHub
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-violet-600 hover:bg-violet-500 text-white transition-all text-xs font-semibold cursor-pointer"
              >
                <FiExternalLink className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* Banner image representation */}
        <div className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden glass-card border border-zinc-900 mb-16 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-[85%]"
          />
        </div>

        {/* Documentation Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Main Case study text (Col: 8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Overview */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">01.</span> Project Overview
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {project.overview || 'This system represents an advanced enterprise-grade implementation designed to streamline user workflows, aggregate complex data telemetry points, and serve low-latency content. Built following clean coding principles, it features modular hooks, type-safe structures, and security profiles.'}
              </p>
            </section>

            {/* 2. Business Problem */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">02.</span> The Business Challenge
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {project.businessProblem || 'Prior to deployment, the organization suffered from high server load delays, synchronization issues across distributed device nodes, and a lack of role-based auditing options. This resulted in delayed customer updates and manual entry checks.'}
              </p>
            </section>

            {/* 3. Solution */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">03.</span> Solution & Architecture
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {project.solution || 'We engineered a highly available full-stack system. By leveraging Express middleware routing, rate-limit profiles, and mongoose aggregate calculations, we decoupled heavy read/write metrics, ensuring high-speed data delivery.'}
              </p>

              {/* Mock Architecture display block */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 font-mono text-[11px] text-violet-300 leading-relaxed overflow-x-auto shadow-inner">
                <div className="font-bold text-zinc-500 uppercase tracking-wider text-[9px] mb-3">System Dataflow Architecture</div>
                <pre>{project.architectureDiagram || `Client Interface (React Router) ──[Axios/WSS]──> CORS Router (Express)
                                            │
                                    [Helmet Filters]
                                            │
                                            ▼
                                     Auth JWT Check
                                            │
                                            ▼
                                     MVC Controllers ──> MongoDB Database`}</pre>
              </div>
            </section>

            {/* 4. DB Design & API Flow */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">04.</span> Database Design & API Flow
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                The database utilizes optimized indexes to avoid table-scans. Mongoose pre-save hooks and transaction pipelines are used where schema writes must be atomic.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl font-mono text-[10px]">
                  <div className="font-bold text-zinc-500 uppercase tracking-wider text-[9px] mb-2">Schema Definitions</div>
                  <pre className="text-zinc-400">{project.databaseDesign || `ProjectCollection {
  _id: ObjectID,
  title: String,
  techStack: Array,
  order: Number,
  featured: Boolean
}`}</pre>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl font-mono text-[10px]">
                  <div className="font-bold text-zinc-500 uppercase tracking-wider text-[9px] mb-2">Query Flow</div>
                  <pre className="text-zinc-400">{project.apiFlow || `GET /api/projects
↓ Check cache (none)
↓ MongoDB aggregation
↓ Return 200 OK (22ms)`}</pre>
                </div>
              </div>
            </section>

            {/* 5. Challenges Faced */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">05.</span> Challenges & Resolution
              </h2>
              <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex gap-4">
                <FiAlertCircle className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-200 text-sm">Challenge: {project.challengesFaced || 'High latency aggregation pipelines during Peak traffic periods.'}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong>Resolution:</strong> {project.howSolved || 'We optimized database performance by adding query filters, compound indexing, and pre-loading telemetry details on server startup.'}
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Features & Lessons */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">06.</span> Key Features & Achievements
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(project.features || ['Interactive dashboard tracking', 'Custom JWT auth token integration', 'Tailwind responsive rendering', 'MongoDB schema optimization']).map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                    <FiCheckSquare className="w-4 h-4 text-violet-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. Lessons Learned */}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-violet-400">07.</span> Retrospective & Lessons
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {project.lessonsLearned || 'This case study reinforced the value of decoupling dynamic aggregation calculations from basic API endpoints. Moving forward, caching queries or implementing Redis layers can further optimize enterprise dashboard responses.'}
              </p>
            </section>

          </div>

          {/* Right Sidebar specs (Col: 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-left space-y-6">
              <h3 className="font-extrabold text-white text-base tracking-tight pb-3 border-b border-zinc-900">
                Specifications
              </h3>

              {/* Spec Item */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Host Engine</span>
                <p className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <FiCpu className="w-4 h-4 text-violet-400" /> Vercel & Render
                </p>
              </div>

              {/* Spec Item */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Database Engine</span>
                <p className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <FiDatabase className="w-4 h-4 text-blue-400" /> MongoDB Atlas
                </p>
              </div>

              {/* Spec Item */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Linting Standards</span>
                <p className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <FiSettings className="w-4 h-4 text-pink-400" /> ESLint / Oxlint
                </p>
              </div>

              {/* Lighthouse Score indicator mock */}
              <div className="pt-4 border-t border-zinc-900 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Performance Index</span>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full border-4 border-emerald-500/20 flex items-center justify-center font-mono font-bold text-sm text-emerald-400">
                    <span className="absolute inset-0 border-4 border-t-emerald-500 border-r-emerald-500 border-b-emerald-500 border-l-transparent rounded-full animate-[spin_3s_linear_infinite]" />
                    98
                  </div>
                  <div className="text-left text-xs text-zinc-400">
                    <div className="font-bold text-zinc-300">Lighthouse Score</div>
                    <div>Responsive Handoff active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default ProjectCaseStudy;
