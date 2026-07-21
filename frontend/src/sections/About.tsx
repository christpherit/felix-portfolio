import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import { ProfileImage } from '../components/ProfileImage';

export const About: React.FC = () => {
  const { about } = usePortfolio();

  return (
    <section id="about" className="relative py-24 bg-[#FDFBF7] overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <h2 className="text-xs uppercase tracking-widest font-black text-[#FF7A30] mb-2 font-mono">Biography</h2>
          <h1 className="text-3xl md:text-5xl font-black text-[#0B2545] tracking-tight leading-tight">
            ABOUT
          </h1>
          <div className="h-[3px] w-12 bg-[#FF7A30] mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Circular Profile Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Dashed outer rings following screenshot design */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              {/* Outer decorative dashed circle */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF7A30]/40 animate-[spin_60s_linear_infinite]" />
              {/* Inner decorative dotted circle */}
              <div className="absolute inset-2 rounded-full border-2 border-dotted border-[#0B2545]/20" />
              
              {/* Profile Image container */}
              <div className="w-[260px] h-[260px] rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                <ProfileImage
                  src={about.profileImage}
                  alt="Developer Profile"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Info Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#0B2545] tracking-tight leading-snug">
              EXPERIENCED FULL STACK DEVELOPER | MERN, MEAN, AND NESTJS
            </h2>

            <p className="text-sm md:text-base text-zinc-650 leading-relaxed font-medium">
              {about.bio}
            </p>
            
            {/* Custom orange highlight callout box from screenshot */}
            <div className="p-5 bg-[#FF7A30]/5 border-l-4 border-[#FF7A30] rounded-r-2xl text-xs md:text-sm text-[#0B2545] font-semibold leading-relaxed">
              Skilled in MERN and MEAN stacks, HTML, CSS, GraphQL, Tailwind, and Bootstrap, with expertise in full-stack development. Proficient in NestJS, Node.js, Hasura, and Express.js architecture. Passionate about building scalable, efficient web solutions with clean, maintainable code.
            </div>

            <div className="pt-2">
              <a 
                href={about.resumeUrl !== '#' ? about.resumeUrl : '#'}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF7A30] hover:bg-[#FF7A30]/90 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Download CV</span>
                <FiArrowRight className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
