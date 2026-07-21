import React, { createContext, useContext, useState } from 'react';
import type { About, Skill, Experience, Project, Setting } from '../services/api';
import { 
  portfolioAbout, 
  portfolioSkills, 
  portfolioExperiences, 
  portfolioProjects, 
  portfolioSettings 
} from '../data/portfolioData';

interface PortfolioContextType {
  about: About;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  settings: Setting;
  loading: boolean;
  error: boolean;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [about] = useState<About>(portfolioAbout);
  const [skills] = useState<Skill[]>(portfolioSkills);
  const [experiences] = useState<Experience[]>(portfolioExperiences);
  const [projects] = useState<Project[]>(portfolioProjects);
  const [settings] = useState<Setting>(portfolioSettings);
  const [loading] = useState(false);
  const [error] = useState(false);

  const refreshData = async () => {
    // Static frontend data requires no network refresh
    return Promise.resolve();
  };

  return (
    <PortfolioContext.Provider
      value={{
        about,
        skills,
        experiences,
        projects,
        settings,
        loading,
        error,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
