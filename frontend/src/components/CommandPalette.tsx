import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiHome, FiUser, FiSliders, FiBriefcase, FiFolder, FiMail, FiMoon, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  shortcut?: string[];
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Command items definition
  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Go to Home',
      subtitle: 'Scroll to the top of the portfolio',
      icon: <FiHome className="w-4 h-4" />,
      shortcut: ['H'],
      action: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'about',
      title: 'Go to About Me',
      subtitle: 'Read career history and summary',
      icon: <FiUser className="w-4 h-4" />,
      shortcut: ['A'],
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'skills',
      title: 'Go to Skills',
      subtitle: 'Explore stack and proficiency levels',
      icon: <FiSliders className="w-4 h-4" />,
      shortcut: ['S'],
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'experience',
      title: 'Go to Experience',
      subtitle: 'Check work timeline and projects done',
      icon: <FiBriefcase className="w-4 h-4" />,
      shortcut: ['E'],
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      subtitle: 'Browse all case studies and live demos',
      icon: <FiFolder className="w-4 h-4" />,
      shortcut: ['P'],
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      subtitle: 'Send Christopher Felix a message',
      icon: <FiMail className="w-4 h-4" />,
      shortcut: ['C'],
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      subtitle: 'Login to CMS dashboard to manage site content',
      icon: <FiLock className="w-4 h-4" />,
      shortcut: ['L'],
      action: () => {
        navigate('/admin');
        setIsOpen(false);
      },
    },
    {
      id: 'theme',
      title: 'Toggle Theme',
      subtitle: 'Switch between light and dark themes',
      icon: <FiMoon className="w-4 h-4" />,
      shortcut: ['T'],
      action: () => {
        const bodyClass = document.body.classList;
        if (bodyClass.contains('light-mode')) {
          bodyClass.remove('light-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          bodyClass.add('light-mode');
          localStorage.setItem('theme', 'light');
        }
        setIsOpen(false);
      },
    },
  ];

  // Hotkey listener (Ctrl+K / Cmd+K and individual shortcuts when palette is closed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Escape close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }

      // Navigation when palette is open
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, search]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Shortcut Info Overlay bottom-left */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-1.5 px-3 py-1.5 glass-panel rounded-lg text-xs text-zinc-400 pointer-events-none select-none">
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-200 font-mono">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-200 font-mono">K</kbd>
        <span>to navigate</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15svh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl glass-panel max-h-[450px] flex flex-col"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 border-b border-zinc-800 h-14">
                <FiSearch className="w-5 h-5 text-zinc-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="w-full h-full bg-transparent text-zinc-100 text-sm focus:outline-none placeholder-zinc-500"
                />
                <kbd className="px-2 py-0.5 border border-zinc-800 bg-zinc-900 rounded text-[10px] text-zinc-400 font-mono select-none">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div
                ref={listRef}
                className="overflow-y-auto p-2 space-y-1 flex-1 scrollbar-thin"
              >
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? 'bg-violet-600/20 border border-violet-500/30 text-white'
                            : 'border border-transparent text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${isSelected ? 'bg-violet-500 text-white' : 'bg-zinc-900 text-zinc-400'}`}>
                            {cmd.icon}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className={`text-sm font-medium ${isSelected ? 'text-zinc-100' : 'text-zinc-200'}`}>
                              {cmd.title}
                            </span>
                            <span className="text-xs text-zinc-500">{cmd.subtitle}</span>
                          </div>
                        </div>

                        {cmd.shortcut && (
                          <div className="flex items-center gap-1">
                            {cmd.shortcut.map((sc, i) => (
                              <kbd
                                key={i}
                                className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                              >
                                {sc}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-sm text-zinc-500">
                    No results found for "{search}"
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 select-none">
                <span className="flex items-center gap-2">
                  <span>↑↓ Navigate</span>
                  <span>•</span>
                  <span>↵ Select</span>
                </span>
                <span>Christopher Felix Portals</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
