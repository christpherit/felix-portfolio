import React from 'react';
import { 
  SiReact, SiAngular, SiNodedotjs, SiExpress, SiMongodb, 
  SiGraphql, SiHasura, SiJavascript, SiTypescript, SiTailwindcss, 
  SiPostgresql, SiMysql, SiDocker, SiGit, SiGithub, 
  SiPostman, SiFigma, SiVite, SiFirebase 
} from 'react-icons/si';
import { FiCode } from 'react-icons/fi';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

export const TechMarquee: React.FC = () => {
  const row1: TechItem[] = [
    { name: 'React', icon: <SiReact className="w-5 h-5" />, color: 'text-[#61DAFB]' },
    { name: 'Angular', icon: <SiAngular className="w-5 h-5" />, color: 'text-[#DD0031]' },
    { name: 'Node.js', icon: <SiNodedotjs className="w-5 h-5" />, color: 'text-[#339933]' },
    { name: 'Express', icon: <SiExpress className="w-5 h-5" />, color: 'text-zinc-200' },
    { name: 'MongoDB', icon: <SiMongodb className="w-5 h-5" />, color: 'text-[#47A248]' },
    { name: 'GraphQL', icon: <SiGraphql className="w-5 h-5" />, color: 'text-[#E10098]' },
    { name: 'Hasura', icon: <SiHasura className="w-5 h-5" />, color: 'text-[#1EB4D4]' },
    { name: 'TypeScript', icon: <SiTypescript className="w-5 h-5" />, color: 'text-[#3178C6]' },
    { name: 'JavaScript', icon: <SiJavascript className="w-5 h-5" />, color: 'text-[#F7DF1E]' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5" />, color: 'text-[#06B6D4]' },
  ];

  const row2: TechItem[] = [
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-5 h-5" />, color: 'text-[#4169E1]' },
    { name: 'MySQL', icon: <SiMysql className="w-5 h-5" />, color: 'text-[#4479A1]' },
    { name: 'Docker', icon: <SiDocker className="w-5 h-5" />, color: 'text-[#2496ED]' },
    { name: 'Git', icon: <SiGit className="w-5 h-5" />, color: 'text-[#F05032]' },
    { name: 'GitHub', icon: <SiGithub className="w-5 h-5" />, color: 'text-white' },
    { name: 'VS Code', icon: <FiCode className="w-5 h-5" />, color: 'text-[#007ACC]' },
    { name: 'Postman', icon: <SiPostman className="w-5 h-5" />, color: 'text-[#FF6C37]' },
    { name: 'Figma', icon: <SiFigma className="w-5 h-5" />, color: 'text-[#F24E1E]' },
    { name: 'Vite', icon: <SiVite className="w-5 h-5" />, color: 'text-[#646CFF]' },
    { name: 'Firebase', icon: <SiFirebase className="w-5 h-5" />, color: 'text-[#FFCA28]' },
  ];

  const renderRow = (items: TechItem[]) => {
    // Duplicate items to ensure seamless infinite scroll loop
    const duplicatedList = [...items, ...items, ...items, ...items];
    return (
      <div className="flex gap-4 w-max">
        {duplicatedList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md text-sm text-zinc-300 font-medium cursor-default hover:border-violet-500/30 transition-all select-none duration-300 hover:scale-105"
          >
            <span className={item.color}>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative py-12 flex flex-col gap-6 overflow-hidden w-full select-none">
      {/* Shadow gradient masks on left/right edges for fade-out look */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div className="flex overflow-hidden animate-marquee">
        {renderRow(row1)}
      </div>

      {/* Row 2 - Right to Left (reversed direction) */}
      <div className="flex overflow-hidden animate-marquee direction-reverse [animation-direction:reverse]">
        {renderRow(row2)}
      </div>
    </div>
  );
};
