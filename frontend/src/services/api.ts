import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token from localStorage on admin calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// Typed API Response interfaces
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  category: string;
  featured: boolean;
  order: number;
  // Case Study Sections
  overview?: string;
  businessProblem?: string;
  solution?: string;
  architectureDiagram?: string;
  databaseDesign?: string;
  apiFlow?: string;
  challengesFaced?: string;
  howSolved?: string;
  features?: string[];
  lessonsLearned?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  level: number; // percentage (0-100)
  icon: string; // React Icon name
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  order: number;
}

export interface About {
  _id?: string;
  bio: string;
  location: string;
  profileImage: string;
  resumeUrl: string;
  stats: {
    experience: string;
    projects: number;
    technologies: number;
    clients: number;
  };
}

export interface Setting {
  _id?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    phone: string;
    email: string;
  };
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
