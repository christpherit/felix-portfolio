import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  targetId: string;
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems: NavItem[] = [
    { label: 'Home', targetId: 'home' },
    { label: 'About', targetId: 'about' },
    { label: 'Skills', targetId: 'skills' },
    { label: 'Experience', targetId: 'experience' },
    { label: 'Portfolio', targetId: 'projects' }, // matches image name
    { label: 'Contact', targetId: 'contact' },
  ];

  // Scroll spy effect to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
        navigate('/', { replace: true, state: {} });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-[#FDFBF7]/90 border-b border-zinc-200/60 backdrop-blur-md shadow-md shadow-zinc-200/10' 
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7A30] origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            className="text-lg font-black tracking-wider text-[#0B2545] hover:text-[#FF7A30] transition-all cursor-pointer font-mono"
          >
            FELIX.DEV
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className={`text-xs uppercase tracking-wider font-bold transition-all hover:text-[#0B2545] cursor-pointer relative py-1 ${
                  activeSection === item.targetId ? 'text-[#FF7A30]' : 'text-zinc-500'
                }`}
              >
                {item.label}
                {activeSection === item.targetId && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF7A30] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Utility Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF7A30] text-xs font-bold text-white hover:bg-[#FF7A30]/90 hover:scale-95 shadow-md shadow-orange-500/20 cursor-pointer transition-all"
            >
              <FiLock className="w-3.5 h-3.5" />
              <span>Portal</span>
            </Link>
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-[#0B2545] hover:text-[#FF7A30] transition-all cursor-pointer"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-64 z-40 bg-[#FDFBF7] border-l border-zinc-200 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8 mt-16">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleNavClick(item.targetId)}
                className={`text-left text-xs uppercase tracking-wider font-bold py-2.5 border-b border-zinc-100 transition-colors ${
                  activeSection === item.targetId ? 'text-[#FF7A30]' : 'text-zinc-500 hover:text-[#0B2545]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FF7A30] text-sm font-bold text-white hover:bg-[#FF7A30]/90 transition-all shadow-md shadow-orange-500/20"
          >
            <FiLock className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
          <div className="text-center text-[10px] text-zinc-400 font-mono">
            Christopher Felix Portfolio © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};
