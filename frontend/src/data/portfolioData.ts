import type { About, Skill, Experience, Project, Setting } from '../services/api';
import christopherImage from '../assets/christopher.png'; 
import christopherResume from '../assets/Christopherresume.pdf';

export const portfolioAbout: About = {
  bio: "I'm a Full Stack Developer with nearly 3 years of experience building enterprise web applications using MERN, MEAN, GraphQL, Hasura, React, Angular, Node.js, MongoDB and MySQL. I specialize in designing high-performance REST and GraphQL APIs, optimizing relational and document-based databases, and engineering fluid, accessible client-side interfaces.",
  location: "Bangalore, India",
  profileImage: christopherImage,
  resumeUrl: christopherResume,
  stats: {
    experience: "Nearly 3 Years",
    projects: 14,
    technologies: 24,
    clients: 6,
  },
};

export const portfolioSkills: Skill[] = [
  // Frontend
  { _id: 's1', name: 'React', category: 'Frontend', level: 95, icon: 'SiReact' },
  { _id: 's2', name: 'Angular', category: 'Frontend', level: 85, icon: 'SiAngular' },
  { _id: 's3', name: 'TypeScript', category: 'Frontend', level: 90, icon: 'SiTypescript' },
  { _id: 's4', name: 'JavaScript', category: 'Frontend', level: 95, icon: 'SiJavascript' },
  { _id: 's5', name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'SiTailwindcss' },
  { _id: 's6', name: 'Redux', category: 'Frontend', level: 88, icon: 'SiRedux' },
  { _id: 's7', name: 'Bootstrap', category: 'Frontend', level: 90, icon: 'SiMaterialdesign' },
  
  // Backend
  { _id: 's8', name: 'Node.js', category: 'Backend', level: 92, icon: 'SiNodedotjs' },
  { _id: 's9', name: 'Express.js', category: 'Backend', level: 92, icon: 'SiExpress' },
  { _id: 's10', name: 'NestJS', category: 'Backend', level: 85, icon: 'SiNodedotjs' },
  { _id: 's11', name: 'GraphQL', category: 'Backend', level: 88, icon: 'SiGraphql' },
  { _id: 's12', name: 'Hasura', category: 'Backend', level: 85, icon: 'SiHasura' },
  { _id: 's13', name: 'REST APIs', category: 'Backend', level: 95, icon: 'SiLink' },
  { _id: 's14', name: 'Socket.io', category: 'Backend', level: 80, icon: 'SiSocketdotio' },
  
  // Database
  { _id: 's15', name: 'MongoDB', category: 'Database', level: 90, icon: 'SiMongodb' },
  { _id: 's16', name: 'MySQL', category: 'Database', level: 88, icon: 'SiMysql' },
  { _id: 's17', name: 'PostgreSQL', category: 'Database', level: 85, icon: 'SiPostgresql' },
  { _id: 's18', name: 'Firebase', category: 'Database', level: 80, icon: 'SiFirebase' },
  
  // Tools
  { _id: 's19', name: 'Git', category: 'Tools', level: 92, icon: 'SiGit' },
  { _id: 's20', name: 'Docker', category: 'Tools', level: 80, icon: 'SiDocker' },
  { _id: 's21', name: 'Postman', category: 'Tools', level: 95, icon: 'SiPostman' },
  { _id: 's22', name: 'Figma', category: 'Tools', level: 78, icon: 'SiFigma' },
  { _id: 's23', name: 'Vite', category: 'Tools', level: 90, icon: 'SiVite' },
];

export const portfolioExperiences: Experience[] = [
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

export const portfolioProjects: Project[] = [
  {
    _id: 'portfolio-admin-dashboard',
    title: 'Portfolio + Admin Dashboard',
    description: 'A full-stack personal portfolio platform with a public portfolio website and a secure admin dashboard for managing contact enquiries and authentication.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    liveUrl: '/',
    githubUrl: 'https://github.com/christpherit/felix-portfolio',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    category: 'MERN',
    featured: true,
    order: 1,
    overview: 'A production-grade full-stack personal portfolio platform engineered with React 19, Vite, Tailwind CSS, Express, MongoDB Atlas, and JWT authentication. It features a public-facing developer portfolio alongside an isolated admin dashboard for managing contact messages and administrator credentials.',
    businessProblem: 'Static portfolios lack secure inquiry tracking and dynamic administrative controls, making message management difficult for developers.',
    solution: 'Designed a hybrid application where public content is rendered instantly on the frontend for speed, while contact submissions and session security are powered by a Node.js/Express backend API backed by MongoDB Atlas.',
    architectureDiagram: 'Public Visitor / Client Browser ──[Static Render]──> React App\nContact Submissions ──[HTTPS/JSON]──> Express Server ──> MongoDB Atlas\nAdmin Console ──[Bearer JWT]──> Protected Endpoints ──> Admin Management & Contacts DB',
    databaseDesign: 'User Collection (JWT Auth, Bcrypt hashed passwords) | Contact Collection (Inquiries, status flags, timestamps)',
    apiFlow: 'POST /api/contacts -> Validate & Insert to DB -> Dispatch Email Alert\nPOST /api/auth/login -> Sign JWT -> Expose Admin Console',
    challengesFaced: 'Decoupling static portfolio information from database queries to ensure 100% lighthouse load speed while preserving server-side admin management.',
    howSolved: 'Migrated static portfolio details into structured frontend configuration models and restricted database interactions strictly to contact records and JWT auth.',
    lessonsLearned: 'Frontend-driven static configuration dramatically improves first contentful paint (FCP) and reduces server infrastructure costs.',
    features: [
      'Instant static client rendering',
      'Secure JWT Admin Dashboard',
      'Contact inquiry table with search & pagination',
      'Administrator accounts CRUD',
      'Version & Dispatch History UI showcases',
      'Profile image retry fallback'
    ]
  },
  {
    _id: 'lala-invoice',
    title: 'Lala Invoice',
    description: 'A professional invoicing platform for freelancers and small businesses to generate, track, and manage billing dynamically.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'MERN',
    featured: true,
    order: 2,
    overview: 'Lala Invoice is a modern invoice builder designed to simplify financial tracking for independent contractors, freelancers, and small agencies.',
    businessProblem: 'Manual invoicing is prone to calculation errors, lack of audit history, and difficult payment tracking over time.',
    solution: 'Built a clean invoicing tool with PDF generation, automatic tax calculations, version history logging, and invoice status tracking.',
    architectureDiagram: 'Client App ──[REST API]──> Node/Express Engine ──> MongoDB Invoice Collections',
    databaseDesign: 'Invoice Collection (Client info, items array, tax rate, total, status history)',
    apiFlow: 'POST /api/invoices -> Generate invoice -> Stream PDF buffer -> Return metadata',
    challengesFaced: 'Generating formatted invoice PDFs client-side without heavy browser memory bloat.',
    howSolved: 'Implemented a backend stream microservice for template layout rendering and PDF buffer piping.',
    lessonsLearned: 'Decoupling PDF creation from frontend main CPU loops preserves browser responsiveness.',
    features: [
      'Interactive line-item calculation',
      'Instant PDF export',
      'Version history tracking on invoice updates',
      'Payment status flags (Draft, Sent, Paid, Overdue)'
    ]
  },
  {
    _id: 's2s-security-management',
    title: 'S2S Security Management',
    description: 'An enterprise-grade physical security visitor logging and patrol tracking application.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'GraphQL', 'Hasura', 'PostgreSQL', 'Node.js'],
    category: 'GraphQL',
    featured: true,
    order: 3,
    overview: 'A secure, high-performance portal for security personnel and facility managers to monitor visitor check-ins, badge dispatches, and patrol routes in real time.',
    businessProblem: 'Paper logs at security gates lead to slow searchability, misplaced records, and difficult compliance audits.',
    solution: 'Designed an interactive visitor check-in application backed by Hasura GraphQL subscriptions for instant live updates across security terminals.',
    architectureDiagram: 'Security Terminal / React App ──[WSS / Apollo]──> Hasura Engine ──[PostgreSQL Listen/Notify]──> DB Engine',
    databaseDesign: 'Visitors Schema (Name, ID proof, Host, CheckIn/Out) | Dispatch Schema (Badges, Sent Quantity, Remaining Inventory)',
    apiFlow: 'Subscription subVisitors { visitor_stream { id name status check_in_time } } -> Active WebSocket connection',
    challengesFaced: 'WebSocket reconnection leaks when guards switched navigation tabs rapidly.',
    howSolved: 'Created a custom React hook that terminates active subscriptions and disposes socket clients on route changes.',
    lessonsLearned: 'WebSocket subscriptions must be throttled on high-frequency payload triggers to prevent client CPU spikes.',
    features: [
      'Hasura GraphQL real-time subscription streams',
      'Visitor check-in/check-out tracking',
      'Multi-product badge dispatch quantity breakdown',
      'Audit log export'
    ]
  },
  {
    _id: 'dental-suite-360',
    title: 'Dental Suite 360',
    description: 'A comprehensive clinic management console for dental practices to log patients, schedule treatments, and track invoices.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
    category: 'MEAN',
    featured: true,
    order: 4,
    overview: 'Dental Suite 360 streamlines patient medical records, dentist calendar scheduling, treatment plans, and billing claims in a single clinic platform.',
    businessProblem: 'Dental practices struggle with appointment double-bookings, misplaced treatment charts, and fragmented billing.',
    solution: 'Developed a unified MEAN stack application featuring a interactive calendar dashboard, patient history versioning, and billing analytics.',
    architectureDiagram: 'Angular Client ──[HTTP Interceptor]──> Express API ──> Mongoose Models ──> MongoDB Database',
    databaseDesign: 'Patients Schema | Appointments Schema (DoctorId, Date, Slot, Status) | Billing Schema',
    apiFlow: 'PUT /api/appointments/:id -> Validate slot collision -> Lock transaction -> Save record',
    challengesFaced: 'Managing multi-dentist appointment schedules concurrently without timing collisions.',
    howSolved: 'Implemented Mongoose transaction locks and optimistic concurrency validation.',
    lessonsLearned: 'Optimizing calendar grid rendering reduces memory consumption on low-power clinic computers.',
    features: [
      'Interactive dentist schedule calendar',
      'Patient treatment history versioning',
      'Dynamic Angular reactive forms',
      'Automated email appointment reminders'
    ]
  },
  {
    _id: 'enterprise-employee-management',
    title: 'Enterprise Employee Management System (Coming Soon)',
    description: 'A complete employee management solution for organizations with secure authentication, dashboards, and administrative features.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    category: 'MERN',
    featured: false,
    order: 5,
    overview: 'A complete employee management solution for organizations featuring secure authentication, department management, leave workflows, attendance logging, and administrative analytics.',
    businessProblem: 'Managing remote employees with separate spreadsheets is error-prone, lacks access controls, and wastes administrative hours.',
    solution: 'A centralized, role-based administration platform with interactive dashboards, automated leave approvals, and employee records.',
    architectureDiagram: 'Client Application ──[JWT Authorization]──> Express API ──> MongoDB Enterprise Database',
    databaseDesign: 'Employee Collection (Profile, Role, Department) | Attendance Collection | Leave Requests Collection',
    apiFlow: 'POST /api/employees -> Validate role authorization -> Hash default credentials -> Create profile',
    challengesFaced: 'Configuring dynamic role-based route guards for HR, Managers, and Employees on client side.',
    howSolved: 'Utilized React Context combined with JWT claim decoding to enforce strict UI view permission locks.',
    lessonsLearned: 'Client-side permission checks must always be mirrored with backend route guards.',
    features: [
      'Employee CRUD operations',
      'Department management',
      'Role-based login & permission levels',
      'Attendance and leave request tracking',
      'Dashboard analytics & filterable tables'
    ]
  },
  {
    _id: 'hospital-appointment-management',
    title: 'Hospital Appointment Management System (Coming Soon)',
    description: 'A healthcare management platform allowing patients and doctors to manage appointments and records efficiently.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/christpherit',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Hasura'],
    category: 'GraphQL',
    featured: false,
    order: 6,
    overview: 'A modern healthcare platform allowing patients to register and book appointments, while enabling doctors to manage schedules, medical records, and consultations efficiently.',
    businessProblem: 'Patient bookings via phone lines lead to long waiting lists, missed appointments, and unorganized medical histories.',
    solution: 'An automated scheduling portal with Hasura-backed medical logs, live availability slots, and patient access portals.',
    architectureDiagram: 'Patient React Portal ──[GraphQL Queries]──> Hasura Engine ──> PostgreSQL/MongoDB Engine',
    databaseDesign: 'Doctors Schema (Specialty, Slots) | Patients Schema | Appointments Schema',
    apiFlow: 'Query GetDoctorSlots($doctorId: ID!) { slots(where: { available: true }) { id time } }',
    challengesFaced: 'Structuring GraphQL queries for complex doctor schedule availabilities.',
    howSolved: 'Designed Postgres database views and query bindings directly inside Hasura.',
    lessonsLearned: 'Database views save execution time for multi-table join operations.',
    features: [
      'Patient registration & portal',
      'Doctor schedule management',
      'Appointment booking engine',
      'Digital medical records history',
      'Responsive healthcare dashboard'
    ]
  }
];

export const portfolioSettings: Setting = {
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
