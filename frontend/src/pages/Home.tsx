import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { GithubGrid } from '../components/GithubGrid';
import { Contact } from '../sections/Contact';

export const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />

      {/* GitHub Contributions Section */}
      <section className="relative py-24 bg-[#030014] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-left">
          <GithubGrid />
        </div>
      </section>

      <Contact />
    </motion.div>
  );
};
export default Home;
