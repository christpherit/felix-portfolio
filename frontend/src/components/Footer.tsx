import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <footer className="w-full bg-white border-t border-zinc-200 py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Brand Name */}
        <h2 className="text-xl md:text-2xl font-black text-[#0B2545] tracking-widest uppercase">
          Christopher Felix
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-zinc-500 font-semibold tracking-wide">
          Living, learning, & levelling up one day at a time.
        </p>

        {/* Social Icons Link Dock */}
        <div className="flex items-center gap-5 pt-2">
          <a
            href={settings.socialLinks?.linkedin || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-200 text-[#0B2545] hover:text-[#FF7A30] hover:border-[#FF7A30]/30 hover:bg-orange-50 transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
          <a
            href={settings.socialLinks?.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-200 text-[#0B2545] hover:text-[#FF7A30] hover:border-[#FF7A30]/30 hover:bg-orange-50 transition-all shadow-sm"
            title="GitHub Profile"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href={settings.socialLinks?.twitter || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-200 text-[#0B2545] hover:text-[#FF7A30] hover:border-[#FF7A30]/30 hover:bg-orange-50 transition-all shadow-sm"
            title="Twitter Profile"
          >
            <FiTwitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${settings.socialLinks?.email || 'christpherit@gmail.com'}`}
            className="p-2.5 rounded-full border border-zinc-200 text-[#0B2545] hover:text-[#FF7A30] hover:border-[#FF7A30]/30 hover:bg-orange-50 transition-all shadow-sm"
            title="Send Email"
          >
            <FiMail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright Tag in Orange */}
        <div className="text-[10px] sm:text-xs font-bold text-[#FF7A30] uppercase tracking-wider pt-6 font-mono">
          Copyright @ {settings.socialLinks?.email || 'christpherit@gmail.com'}
        </div>

      </div>
    </footer>
  );
};
