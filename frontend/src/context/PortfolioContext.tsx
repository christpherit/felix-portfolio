import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import type { About, Skill, Experience, Project, Setting } from '../services/api';

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

// High-fidelity fallback mock data for failure-tolerance and instant rendering
const fallbackAbout: About = {
  bio: "I'm a Full Stack Developer with nearly 3 years of experience building enterprise web applications using MERN, MEAN, GraphQL, Hasura, React, Angular, Node.js, MongoDB and MySQL. I specialize in designing high-performance REST and GraphQL APIs, optimizing relational and document-based databases, and engineering fluid, accessible client-side interfaces.",
  location: "Bangalore, India",
  profileImage: "src/assets/christopher.png", // Placeholder developer image
  resumeUrl: "src/assets/Christopherresume.pdf",
  stats: {
    experience: "Nearly 3 Years",
    projects: 14,
    technologies: 24,
    clients: 6,
  },
};

const fallbackSkills: Skill[] = [
  // Frontend
  { _id: 's1', name: 'React', category: 'Frontend', level: 95, icon: 'SiReact' },
  { _id: 's2', name: 'Angular', category: 'Frontend', level: 85, icon: 'SiAngular' },
  { _id: 's3', name: 'TypeScript', category: 'Frontend', level: 90, icon: 'SiTypescript' },
  { _id: 's4', name: 'JavaScript', category: 'Frontend', level: 95, icon: 'SiJavascript' },
  { _id: 's5', name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'SiTailwindcss' },
  { _id: 's6', name: 'Redux', category: 'Frontend', level: 88, icon: 'SiRedux' },
  // Backend
  { _id: 's7', name: 'Node.js', category: 'Backend', level: 92, icon: 'SiNodedotjs' },
  { _id: 's8', name: 'Express.js', category: 'Backend', level: 92, icon: 'SiExpress' },
  { _id: 's9', name: 'GraphQL', category: 'Backend', level: 88, icon: 'SiGraphql' },
  { _id: 's10', name: 'Hasura', category: 'Backend', level: 85, icon: 'SiHasura' },
  { _id: 's11', name: 'REST APIs', category: 'Backend', level: 95, icon: 'SiLink' },
  { _id: 's12', name: 'Socket.io', category: 'Backend', level: 80, icon: 'SiSocketdotio' },
  // Database
  { _id: 's13', name: 'MongoDB', category: 'Database', level: 90, icon: 'SiMongodb' },
  { _id: 's14', name: 'MySQL', category: 'Database', level: 88, icon: 'SiMysql' },
  { _id: 's15', name: 'PostgreSQL', category: 'Database', level: 85, icon: 'SiPostgresql' },
  { _id: 's16', name: 'Firebase', category: 'Database', level: 80, icon: 'SiFirebase' },
  // Tools
  { _id: 's17', name: 'Git', category: 'Tools', level: 92, icon: 'SiGit' },
  { _id: 's18', name: 'Docker', category: 'Tools', level: 80, icon: 'SiDocker' },
  { _id: 's19', name: 'Postman', category: 'Tools', level: 95, icon: 'SiPostman' },
  { _id: 's20', name: 'Figma', category: 'Tools', level: 78, icon: 'SiFigma' },
  { _id: 's21', name: 'Vite', category: 'Tools', level: 90, icon: 'SiVite' },
];

const fallbackExperiences: Experience[] = [
  {
    _id: 'e1',
    company: 'Nandalala Infotech',
    position: 'Full Stack Developer',
    duration: 'Nearly 3 Years',
    responsibilities: [
      'Developed enterprise web applications utilizing MERN (MongoDB, Express, React, Node) and MEAN (Angular) stack technologies, delivering 40% performance gains.',
      'Designed and engineered GraphQL schema structures and integrated Hasura GraphQL engine to secure high-speed endpoints.',
      'Configured RESTful microservices with secure token-based user authentications (JWT), helmet policies, and speed-optimized request handling.',
      'Optimized database queries and schemas on MySQL and MongoDB Atlas, shaving 30% off API response latencies.',
      'Configured and executed bug repairs, handled code versions via Git, and deployed builds to production AWS and Render engines.',
    ],
    order: 1,
  },
];

const fallbackProjects: Project[] = [
  {
    _id: 'p1',
    title: 'Enterprise MERN Corporate Dashboard',
    description: 'A multi-tenant metrics portal equipped with live data analytics pipelines, custom widgets, security authorization profiles, and real-time alerts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/felix-christopher',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'MERN',
    featured: true,
    order: 1,
    overview: 'This project is a high-availability corporate dashboard built to support multiple organizations (multi-tenant) with role-based access control, interactive metric widgets, and background telemetry processes.',
    businessProblem: 'Corporate managers lacked unified visibility into server telemetry and organization metrics, leading to critical operational delays and fragmented audit trails.',
    solution: 'Engineered a centralized glassmorphic administration portal using Express MVC routes, dynamic MongoDB aggregates, and a modular React frontend leveraging Tailwind v4 and chart analytics.',
    architectureDiagram: 'Client Browser ──[HTTPS/CORS]──> Express Router (Helmet & Rate Limiter) ──> Auth Middleware (JWT) ──> MVC Controllers ──> Mongoose Models ──> MongoDB Atlas',
    databaseDesign: 'User Collection (Org links, bcrypt passwords) | Metrics Collection (Time-series indexing) | Organization Collection (Tenant billing details)',
    apiFlow: 'POST /api/auth/login -> Sign JWT -> Send Cookie/Header -> GET /api/metrics -> Load aggregation data in 23ms',
    challengesFaced: 'Data size scaling created database performance spikes, delaying standard page load times.',
    howSolved: 'Introduced compound indexing on query dates and pre-aggregated daily telemetry counters using MongoDB cron triggers.',
    features: ['Multi-tenant segregation', 'Interactive Chart.js tracking', 'PDF telemetry reporting', 'Automated email threshold alerts'],
    lessonsLearned: 'Dynamic dashboard widgets render best when state updates are localized rather than triggering main application re-renders.',
  },
  {
    _id: 'p2',
    title: 'GraphQL Hasura Dynamic Telemetry Portal',
    description: 'Real-time telemetry event processor designed with Hasura engine schema bindings and React client-side GraphQL subscription triggers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/felix-christopher',
    techStack: ['React', 'GraphQL', 'Hasura', 'PostgreSQL', 'Tailwind CSS'],
    category: 'GraphQL',
    featured: true,
    order: 2,
    overview: 'A premium telemetry console capturing socket data signals, dispatching event notifications via Hasura triggers, and updating data rows in real-time.',
    businessProblem: 'Real-time telemetry updates suffered from 5-second polling delays, causing latency in server health alerts.',
    solution: 'Designed Hasura subscription events on PostgreSQL tables combined with clean Apollo Client interfaces to broadcast data changes instantly.',
    architectureDiagram: 'Client Socket Client ──[WSS / Apollo]──> Hasura Engine ──[PostgreSQL Listen/Notify]──> DB Engine',
    databaseDesign: 'Events Collection (Id, payload: JSONB, triggered_at: Timestamp)',
    apiFlow: 'Subscription subEvent { events_stream { id payload timestamp } } -> Active WebSocket connection',
    challengesFaced: 'WebSocket reconnection leaks when pages unmounted rapidly during user navigation.',
    howSolved: 'Designed a custom React hook that terminates active subscriptions and disposes of Apollo clients on route change events.',
    features: ['Hasura Action REST bindings', 'Real-time subscription streams', 'PostgreSQL JSONB payload query tracking'],
    lessonsLearned: 'WebSockets should be throttled on high-frequency payloads to prevent browser CPU spikes.',
  },
  {
    _id: 'p3',
    title: 'MEAN Multi-Asset Management App',
    description: 'An asset management system built for Nandalala Infotech clients to track hardware/software licenses, renewals, and resource configurations.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/felix-christopher',
    techStack: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
    category: 'MEAN',
    featured: false,
    order: 3,
    overview: 'Corporate IT inventory tracker monitoring over 5,000 active device nodes, licenses, and renewal cycles with multi-role permissions.',
    businessProblem: 'Manual spreadsheet entries for license renewals led to compliance penalties due to forgotten renewal dates.',
    solution: 'Built a full MEAN stack application. The Angular module provides advanced item searches and interactive timeline panels, and the Express scheduler dispatches automated warning emails.',
    architectureDiagram: 'Angular UI ──[HTTP Client]──> Node API ──> Mongoose Schemas ──> MongoDB Database',
    databaseDesign: 'Assets Schema (SerialNumber, LicenseKey, ExpiryDate, Status) | Logs Schema (AdminUser, Action, Timestamp)',
    apiFlow: 'PUT /api/assets/:id -> Validate Expiry date format -> Save Mongoose -> Emit update socket signal',
    challengesFaced: 'Form rendering for nested custom configurations was slow and difficult to maintain.',
    howSolved: 'Leveraged Angular Reactive Forms with dynamic form arrays, loading only selected hardware config nodes.',
    features: ['Dynamic Angular Forms', 'Cron-automated email notifications', 'Mongoose aggregate statistics'],
    lessonsLearned: 'Using Material UI datatable paginator components reduces bundle size compared to loading custom grid libraries.',
  },
];

const fallbackSettings: Setting = {
  seo: {
    title: "Christopher Felix | Full Stack Developer Portfolio",
    description: "Enterprise-grade portfolio of Christopher Felix, Full Stack Developer with nearly 3 years of experience in MERN, MEAN, and GraphQL/Hasura solutions.",
    keywords: ["Full Stack Developer", "MERN Stack", "MEAN Stack", "GraphQL", "Hasura", "Christopher Felix", "Bangalore Developer"],
    ogImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  socialLinks: {
    github: "https://github.com/christpherit",
    linkedin: "https://www.linkedin.com/in/christopher-felix-396a7125b/",
    twitter: "https://twitter.com",
    phone: "+91 86681 05304",
    email: "christpherit@gmail.com",
  },
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [about, setAbout] = useState<About>(fallbackAbout);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [settings, setSettings] = useState<Setting>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Run concurrent requests to pull CMS content
      const [aboutRes, skillsRes, experiencesRes, projectsRes, settingsRes] = await Promise.allSettled([
        api.get('/about'),
        api.get('/skills'),
        api.get('/experiences'),
        api.get('/projects'),
        api.get('/settings'),
      ]);

      if (aboutRes.status === 'fulfilled' && aboutRes.value.data.success) {
        // Handle when DB has object
        if (aboutRes.value.data.data) setAbout(aboutRes.value.data.data);
      }
      if (skillsRes.status === 'fulfilled' && skillsRes.value.data.success) {
        if (skillsRes.value.data.data?.length > 0) setSkills(skillsRes.value.data.data);
      }
      if (experiencesRes.status === 'fulfilled' && experiencesRes.value.data.success) {
        if (experiencesRes.value.data.data?.length > 0) setExperiences(experiencesRes.value.data.data);
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value.data.success) {
        if (projectsRes.value.data.data?.length > 0) setProjects(projectsRes.value.data.data);
      }
      if (settingsRes.status === 'fulfilled' && settingsRes.value.data.success) {
        if (settingsRes.value.data.data) setSettings(settingsRes.value.data.data);
      }

      setError(false);
    } catch (err) {
      console.warn('API connection failed. Loading high-fidelity mockup defaults.', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update SEO Head tags dynamically
  useEffect(() => {
    if (settings && settings.seo) {
      document.title = settings.seo.title || fallbackSettings.seo.title;
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', settings.seo.description || fallbackSettings.seo.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = settings.seo.description || fallbackSettings.seo.description;
        document.head.appendChild(meta);
      }
    }
  }, [settings]);

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
        refreshData: fetchData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
