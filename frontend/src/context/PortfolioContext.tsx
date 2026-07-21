import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import type { About, Skill, Experience, Project, Setting } from '../services/api';
import christopher from '../assets/christopher.png';

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
  profileImage: christopher, // Placeholder developer image
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
    title: 'Lala Invoice',
    description: 'A professional invoicing platform for freelancers and small businesses to generate, track, and manage billing dynamically.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'MERN',
    featured: true,
    order: 1,
    overview: 'Lala Invoice is a modern invoice builder designed to simplify financial tracking for independent contractors and agencies.',
    businessProblem: 'Manual invoicing is prone to calculation errors and hard to track over time.',
    solution: 'Built a clean invoicing tool with PDF generation, automatic tax calculations, and status tracking.',
    challengesFaced: 'Generating PDFs client-side without bloat was complex.',
    howSolved: 'Implemented backend microservice for layout rendering and stream piping.',
    lessonsLearned: 'Decoupling rendering from main CPU loops preserves dashboard speed.',
    features: ['PDF generation', 'Automatic calculations', 'Status tracking'],
  },
  {
    _id: 'p2',
    title: 'S2S Security Management',
    description: 'An enterprise-grade physical security visitor logging and patrol tracking application.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'GraphQL', 'Hasura', 'PostgreSQL', 'Node.js'],
    category: 'GraphQL',
    featured: true,
    order: 2,
    overview: 'A secure, high-performance portal for security guards and administrators to monitor check-ins and patrol routes in real time.',
    businessProblem: 'Paper logs at security gates lead to slow searchability and security audits.',
    solution: 'Designed an interactive visitor check-in application backed by Hasura GraphQL subscriptions.',
    challengesFaced: 'WebSocket reconnection leaks when pages unmounted.',
    howSolved: 'Created React cleanup hooks to close subscription sockets on route switch.',
    lessonsLearned: 'Always throttle socket events on frequent payload triggers.',
    features: ['Real-time logs', 'Patrol checks', 'Alert alerts'],
  },
  {
    _id: 'p3',
    title: 'Dental Suite 360',
    description: 'A comprehensive clinic management console for dental practices to log patients, schedule treatments, and track invoices.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
    category: 'MEAN',
    featured: true,
    order: 3,
    overview: 'Dental Suite 360 streamlines patient records, dentist scheduling, and insurance claim tracking in a single application.',
    businessProblem: 'Dental practices often struggle with appointment double-bookings and scattered dental charts.',
    solution: 'Developed a unified MEAN stack application featuring a calendar dashboard and interactive treatment tracker.',
    challengesFaced: 'Managing multi-dentist schedules concurrently.',
    howSolved: 'Implemented Mongoose transaction locks and live calendar updates.',
    lessonsLearned: 'Optimizing calendar renders saves client memory.',
    features: ['Patient charts', 'Calendar bookings', 'Insurance logs'],
  },
  {
    _id: 'p4',
    title: 'Enterprise Employee Management System (Coming Soon)',
    description: 'A complete employee management solution for organizations with secure authentication, dashboards, and administrative features.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    category: 'MERN',
    featured: false,
    order: 4,
    overview: 'An administrative employee hub for time tracking, leave requests, and performance management.',
    businessProblem: 'Managing remote employees with separate spreadsheets is error-prone and time-consuming.',
    solution: 'A secure, role-based dashboard for employee operations.',
    challengesFaced: 'Role-based route blocking on client side.',
    howSolved: 'Utilized React Context combined with JWT verification endpoints.',
    lessonsLearned: 'Frontend route checks must always be backed by backend route guards.',
    features: ['Employee CRUD', 'Leave workflows', 'Analytics dashboard'],
  },
  {
    _id: 'p5',
    title: 'Hospital Appointment Management System (Coming Soon)',
    description: 'A healthcare management platform allowing patients and doctors to manage appointments and records efficiently.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Hasura'],
    category: 'GraphQL',
    featured: false,
    order: 5,
    overview: 'A portal for patients to schedule checkups and for doctors to configure their weekly availability.',
    businessProblem: 'Patient bookings via phone lines lead to long waiting lists and miscommunication.',
    solution: 'An automated scheduling portal with Hasura-backed medical logs.',
    challengesFaced: 'Structuring GraphQL queries for doctor schedules.',
    howSolved: 'Designed Postgres views and query bindings inside Hasura.',
    lessonsLearned: 'Database views save immense execution time for multi-join operations.',
    features: ['Scheduling engine', 'Patient registration', 'Medical logs'],
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
