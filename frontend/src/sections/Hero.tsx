import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { about, settings } = usePortfolio();

  const handleScrollClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const marqueeText = "MERN • MEAN • HTML • CSS • GRAPHQL • TAILWIND • BOOTSTRAP • NESTJS • NODEJS • HASURA • EXPRESSJS • ";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-0 overflow-hidden bg-[#FDFBF7] bg-grid"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left Info Column */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-[#0B2545]">Hello, I'm</span>
              <div className="flex items-center gap-3.5 text-zinc-500">
                <a 
                  href={settings.socialLinks?.linkedin || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF7A30] transition-colors"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href={settings.socialLinks?.github || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF7A30] transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a 
                  href={settings.socialLinks?.twitter || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF7A30] transition-colors"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#0B2545] tracking-tight uppercase leading-none">
              Christopher Felix
            </h1>
            
            <h2 className="text-xl md:text-2xl font-extrabold text-[#FF7A30] uppercase tracking-wider font-mono">
              Full Stack Developer
            </h2>
          </div>

          <p className="text-base text-zinc-650 max-w-xl leading-relaxed">
            Building scalable enterprise web applications with modern frontend and backend technologies. Specialized in MERN, MEAN, React, Angular, Node.js, GraphQL, and Hasura architectures.
          </p>

          <div className="pt-2">
            <button
              onClick={() => handleScrollClick('about')}
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF7A30] hover:bg-[#FF7A30]/90 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
            >
              <span>Get Started</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Developer Portrait Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative hidden lg:block flex justify-center"
        >
          <div className="relative w-[340px] h-[420px] rounded-3xl overflow-hidden border-4 border-zinc-200 shadow-2xl">
            <img 
              src={about.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} 
              alt="Developer Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>
      </div>

      {/* Slanted Marquee Separator */}
      <div className="relative w-[110%] -left-[5%] overflow-hidden py-10 mt-16 z-20">
        <div className="space-y-1.5 -rotate-2 scale-102">
          {/* Top Marquee (Orange background, moves left) */}
          <div className="bg-[#FF7A30] text-white py-3 overflow-hidden whitespace-nowrap flex items-center">
            <div className="animate-marquee inline-block whitespace-nowrap text-xs font-black uppercase tracking-widest">
              {Array(15).fill(marqueeText).join('')}
            </div>
          </div>
          {/* Bottom Marquee (Navy background, moves right) */}
          <div className="bg-[#0B2545] text-white py-3 overflow-hidden whitespace-nowrap flex items-center">
            <div className="animate-[marquee_45s_linear_infinite_reverse] inline-block whitespace-nowrap text-xs font-black uppercase tracking-widest">
              {Array(15).fill(marqueeText).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
