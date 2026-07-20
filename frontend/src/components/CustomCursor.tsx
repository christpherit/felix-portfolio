import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Detect clickable elements
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .clickable'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial attachment
    addHoverListeners();

    // Create a MutationObserver to watch for dynamic DOM updates
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [hidden, cursorX, cursorY]);

  // Disable on mobile/touch screens
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  if (isTouchDevice || hidden) return null;

  return (
    <>
      {/* Outer Spring Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.5 : clicked ? 0.9 : 1,
          backgroundColor: hovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(0, 0, 0, 0)',
        }}
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-violet-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: clicked ? 1.4 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};
