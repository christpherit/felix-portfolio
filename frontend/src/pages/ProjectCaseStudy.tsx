import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle, 
  FiCpu, FiAlertTriangle, FiCheck, FiBookOpen 
} from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import { VersionHistoryShowcase } from '../components/VersionHistoryShowcase';
import { DispatchHistoryShowcase } from '../components/DispatchHistoryShowcase';

export const ProjectCaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = usePortfolio();

  // Find exact project matching route parameter ID or slug
  const project = projects.find((p) => p._id === id || p.title.toLowerCase().replace(/\s+/g, '-') === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#030014] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-[#0B2545] dark:text-white mb-2">Case Study Not Found</h2>
        <p className="text-sm text-zinc-500 mb-6">The project case study you requested is unavailable.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-[#FF7A30] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#030014] text-[#0B2545] dark:text-zinc-200 pt-28 pb-20 text-left">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Top Back Nav Button */}
        <div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-[#FF7A30] transition-colors shadow-sm cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Portfolio
          </button>
        </div>

        {/* Hero Section of Case Study */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#FF7A30]/10 border border-[#FF7A30]/20 text-[#FF7A30] text-xs font-extrabold uppercase font-mono tracking-wider">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase font-mono tracking-wider">
                Featured Product
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[#0B2545] dark:text-white tracking-tight uppercase">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-zinc-650 dark:text-zinc-400 leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B2545] text-white hover:bg-[#0B2545]/90 text-xs font-bold transition-all shadow-md"
              >
                <FiGithub className="w-4 h-4" /> View Source Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A30] text-white hover:bg-[#FF7A30]/90 text-xs font-bold transition-all shadow-md"
              >
                <FiExternalLink className="w-4 h-4" /> Open Live Application
              </a>
            )}
          </div>
        </div>

        {/* Project Thumbnail Image */}
        <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl aspect-video relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Technologies Grid */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF7A30] font-mono">Technologies & Frameworks</h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-[#0B2545] dark:text-zinc-200 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Executive Overview & Business Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-[#0B2545] dark:text-white flex items-center gap-2">
              <FiBookOpen className="text-[#FF7A30]" /> Project Overview
            </h3>
            <p className="text-xs md:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-[#0B2545] dark:text-white flex items-center gap-2">
              <FiAlertTriangle className="text-amber-500" /> Business Problem Solved
            </h3>
            <p className="text-xs md:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
              {project.businessProblem || 'Operational friction and unorganized workflow tracking.'}
            </p>
          </div>
        </div>

        {/* Custom UI Showcase Components based on project ID */}
        {(project._id === 'lala-invoice' || project._id === 'portfolio-admin-dashboard' || project._id === 'dental-suite-360') && (
          <VersionHistoryShowcase />
        )}

        {project._id === 's2s-security-management' && (
          <DispatchHistoryShowcase />
        )}

        {/* Features Checklist */}
        {project.features && project.features.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#0B2545] dark:text-white flex items-center gap-2">
              <FiCheckCircle className="text-[#FF7A30]" /> Key System Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-[#0B2545] dark:text-zinc-300">
                  <FiCheck className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Architecture & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2545] dark:text-white font-mono flex items-center gap-2">
              <FiCpu className="text-[#FF7A30]" /> Technical Challenge
            </h3>
            <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-medium">
              {project.challengesFaced || 'Engineered low-latency communication data pipes across client UI modules.'}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2545] dark:text-white font-mono flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> Solution Implemented
            </h3>
            <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-medium">
              {project.howSolved || 'Optimized database indexes and state caches for seamless experience.'}
            </p>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3.5 rounded-full bg-[#FF7A30] hover:bg-[#FF7A30]/90 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all"
          >
            Return to All Projects
          </button>
        </div>

      </div>
    </div>
  );
};
