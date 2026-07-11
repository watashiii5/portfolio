export type ProjectMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; alt: string }
  | { kind: 'pdf'; src: string; label: string }
  | { kind: 'link'; href: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  accent: string;
  role?: string;
  timeline?: string;
  tech: string[];
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
  liveUrl?: string;
  sourceUrl?: string;
  media: ProjectMedia[];
};

const basePath = '/portfolio';

const asset = (path: string) => `${basePath}${path.startsWith('/') ? path : `/${path}`}`;

export const siteStats = [
  { label: 'Projects', value: '8' },
  { label: 'Internship', value: '300 hrs' },
  { label: 'Live demos', value: '3' },
  { label: 'Primary stack', value: 'Next.js + Supabase' },
];

export const featuredProjects = ['thesis-project', 'web-developer-intern', 'yui-ai-companion'];

export const projects: Project[] = [
  {
    slug: 'thesis-project',
    title: 'QTime: Quantum-Inspired Optimization for College-Based Room Allocation in Bulacan State University College of Science',
    category: 'Featured Thesis Project',
    summary: 'A web app that turns room allocation into an optimization problem and produces practical schedules for the College of Science.',
    intro:
      'I served as the main developer and built the project end-to-end: the UI, application logic, backend integration, and deployment workflow.',
    accent: '#7dd3fc',
    role: 'Main developer',
    timeline: 'Thesis project',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'CSS'],
    highlights: [
      'Translated scheduling constraints into a usable allocation flow.',
      'Handled the full stack from interface design to database integration.',
      'Focused on a practical schedule that could be iterated with real data.',
    ],
    metrics: [
      { label: 'Scope', value: 'Full stack thesis build' },
      { label: 'Focus', value: 'Room allocation optimization' },
      { label: 'Deployment', value: 'Vercel demo' },
    ],
    liveUrl: 'https://qia-room-allocation.vercel.app/',
    media: [
      { kind: 'image', src: asset('/projects/Thesis Project/logo.png'), alt: 'QTime project logo' },
      { kind: 'image', src: asset('/projects/Thesis Project/1.jpg'), alt: 'QTime screenshot 1' },
      { kind: 'image', src: asset('/projects/Thesis Project/2.jpg'), alt: 'QTime screenshot 2' },
      { kind: 'image', src: asset('/projects/Thesis Project/3.jpg'), alt: 'QTime screenshot 3' },
      { kind: 'image', src: asset('/projects/Thesis Project/4.jpg'), alt: 'QTime screenshot 4' },
      { kind: 'image', src: asset('/projects/Thesis Project/5.jpg'), alt: 'QTime screenshot 5' },
    ],
  },
  {
    slug: 'web-developer-intern',
    title: 'Web Developer Intern (OJT)',
    category: 'Professional Experience',
    summary: 'A 300-hour internship where I worked on web apps with FlutterFlow, Supabase, Figma, and Groq API-powered features.',
    intro:
      'I completed my On-the-Job Training at Nantes Bautista Consulting Inc. as part of my degree requirement, working in a real team environment with weekly planning and review sessions.',
    accent: '#f59e0b',
    role: 'Web developer intern',
    timeline: 'June 2025 to July 2025',
    tech: ['FlutterFlow', 'Supabase', 'Figma', 'Groq API', 'Agile workflow'],
    highlights: [
      'Built with a collaborative workflow across 2 other interns and a supervisor.',
      'Integrated a free AI chatbot into the system with Groq API.',
      'Created UI and product flows that matched a live consulting environment.',
    ],
    metrics: [
      { label: 'Company', value: 'Nantes Bautista Consulting Inc.' },
      { label: 'Hours', value: '300' },
      { label: 'Tooling', value: 'FlutterFlow + Supabase' },
    ],
    media: [
      { kind: 'image', src: asset('/projects/Web Developer Intern/RecrueIT_Text NEW (1) (1) (2).gif'), alt: 'RecrueIT logo animation' },
      { kind: 'image', src: asset('/projects/Web Developer Intern/RecrueITChatBOT.png'), alt: 'RecrueIT chatbot logo' },
      { kind: 'image', src: asset('/projects/Web Developer Intern/Screenshot 2026-06-15 093114.jpg'), alt: 'Internship screenshot 1' },
      { kind: 'image', src: asset('/projects/Web Developer Intern/Screenshot 2026-06-15 093132.jpg'), alt: 'Internship screenshot 2' },
      { kind: 'image', src: asset('/projects/Web Developer Intern/Screenshot 2026-06-15 093145.jpg'), alt: 'Internship screenshot 3' },
      { kind: 'image', src: asset('/projects/Web Developer Intern/Screenshot 2026-06-15 093201.jpg'), alt: 'Internship screenshot 4' },
    ],
  },
  {
    slug: 'yui-ai-companion',
    title: 'YUI AI Companion',
    category: 'AI Web App',
    summary: 'A character-first AI companion interface inspired by Yui from Sword Art Online and powered by Groq.',
    intro:
      'This project focuses on a lightweight companion experience rather than a generic chatbot, with a simple card-and-chat layout and a deploy-ready demo.',
    accent: '#22c55e',
    role: 'Front-end and AI integration',
    timeline: 'Portfolio demo',
    tech: ['HTML', 'CSS', 'JavaScript', 'Groq API', 'Vercel'],
    highlights: [
      'Kept the interface warm and character-centric.',
      'Connected the chat flow to Groq API responses.',
      'Shipped it as a live Vercel demo.',
    ],
    metrics: [
      { label: 'Demo', value: 'Live on Vercel' },
      { label: 'Interaction', value: 'Chat-first companion UI' },
      { label: 'Mood', value: 'Friendly and lightweight' },
    ],
    liveUrl: 'https://yui-sao.vercel.app/',
    media: [{ kind: 'image', src: asset('/projects/YUI AI Companion/screenshot.jpg'), alt: 'YUI AI Companion screenshot' }],
  },
  {
    slug: 'it-ticketing-system',
    title: 'IT Ticketing System',
    category: 'Support Workflow',
    summary: 'A centralized help desk concept for tracking, assigning, and resolving support requests.',
    intro:
      'The project showcases a practical support workflow with request intake, prioritization, ownership, and status tracking.',
    accent: '#38bdf8',
    role: 'System designer',
    timeline: 'Portfolio project',
    tech: ['Web UI', 'Workflow design', 'Support operations'],
    highlights: [
      'Focused on the lifecycle of a support request.',
      'Highlighted routing, comments, and audit history.',
      'Built to feel like a practical IT service desk.',
    ],
    metrics: [
      { label: 'Goal', value: 'Ticket tracking' },
      { label: 'Status', value: 'Concept showcase' },
      { label: 'Access', value: 'Live demo linked' },
    ],
    liveUrl: 'https://ticketing-system-8yho.onrender.com',
    media: [
      { kind: 'image', src: asset('/projects/IT Ticketing System/ticket.jpg'), alt: 'Ticketing system dark mode screenshot' },
      { kind: 'image', src: asset('/projects/IT Ticketing System/ticket2.jpg'), alt: 'Ticketing system light mode screenshot 1' },
      { kind: 'image', src: asset('/projects/IT Ticketing System/ticket3.jpg'), alt: 'Ticketing system light mode screenshot 2' },
    ],
  },
  {
    slug: 'game-development',
    title: 'Lainfern - A Unity Adventure Game',
    category: 'Game Development',
    summary: 'A chill nature-inspired adventure game with a logbook system, camera, and fishing spots.',
    intro:
      'The game was created as a collaborative project and focuses on exploration, discovery, and a relaxed adventure loop.',
    accent: '#f97316',
    role: 'Team project',
    timeline: 'Unity project',
    tech: ['Unity', 'Game design', 'Interaction systems'],
    highlights: [
      'Built around discovery mechanics and exploration.',
      'Includes a logbook system, camera, and fishing spots.',
      'Published as an itch.io demo for playtesting.',
    ],
    metrics: [
      { label: 'Platform', value: 'Unity' },
      { label: 'Mood', value: 'Nature-inspired adventure' },
      { label: 'Distribution', value: 'Itch.io' },
    ],
    liveUrl: 'https://watashi5.itch.io/lainferns-adventure',
    media: [
      { kind: 'image', src: asset('/projects/Game Development/1.png'), alt: 'Game screenshot 1' },
      { kind: 'image', src: asset('/projects/Game Development/2.png'), alt: 'Game screenshot 2' },
      { kind: 'image', src: asset('/projects/Game Development/3.png'), alt: 'Game screenshot 3' },
      { kind: 'image', src: asset('/projects/Game Development/4.png'), alt: 'Game screenshot 4' },
      { kind: 'image', src: asset('/projects/Game Development/5.png'), alt: 'Game screenshot 5' },
      { kind: 'image', src: asset('/projects/Game Development/6.png'), alt: 'Game screenshot 6' },
    ],
  },
  {
    slug: 'data-structure',
    title: 'Phonebook Database Project',
    category: 'Data Structure / Database',
    summary: 'A C# phonebook system connected to MySQL with PHP for database communication.',
    intro:
      'This project shows the system in action through a demo video and the original PDF documentation, emphasizing data entry and retrieval workflows.',
    accent: '#a78bfa',
    role: 'Course project',
    timeline: 'Academic project',
    tech: ['C#', 'MySQL', 'PHP', 'Documentation'],
    highlights: [
      'Combines a desktop workflow with database connectivity.',
      'Includes a runnable demo video and PDF documentation.',
      'Shows practical CRUD-style organization for contacts.',
    ],
    metrics: [
      { label: 'Language', value: 'C#' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Artifacts', value: 'Video + PDF' },
    ],
    media: [
      { kind: 'video', src: asset('/projects/Data Structure/phonevid.mp4'), alt: 'Phonebook project demo video' },
      { kind: 'pdf', src: asset('/projects/Data Structure/DATABASEPROJECT.pdf'), label: 'Open project documentation PDF' },
      { kind: 'link', href: asset('/projects/Data Structure/DATABASEPROJECT.pdf'), label: 'Download documentation PDF' },
    ],
  },
  {
    slug: 'computer-programming',
    title: 'POS System Project',
    category: 'Computer Programming',
    summary: 'A point-of-sale system built with Java, MySQL, and PHP, presented through screenshots and documentation.',
    intro:
      'The page captures how the POS system works in action and includes the original documentation as part of the showcase.',
    accent: '#84cc16',
    role: 'Course project',
    timeline: 'Academic project',
    tech: ['Java', 'NetBeans', 'MySQL', 'PHP', 'PDF documentation'],
    highlights: [
      'Demonstrates a complete checkout and management workflow.',
      'Includes multiple screenshots for interface review.',
      'Uses PHP and MySQL to connect the system logic and data store.',
    ],
    metrics: [
      { label: 'Language', value: 'Java' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Documentation', value: 'PDF included' },
    ],
    media: [
      { kind: 'image', src: asset('/projects/Computer Programming/1.png'), alt: 'POS screenshot 1' },
      { kind: 'image', src: asset('/projects/Computer Programming/4.png'), alt: 'POS screenshot 2' },
      { kind: 'image', src: asset('/projects/Computer Programming/3.png'), alt: 'POS screenshot 3' },
      { kind: 'image', src: asset('/projects/Computer Programming/2.png'), alt: 'POS screenshot 4' },
      { kind: 'image', src: asset('/projects/Computer Programming/5.png'), alt: 'POS screenshot 5' },
      { kind: 'image', src: asset('/projects/Computer Programming/6.png'), alt: 'POS screenshot 6' },
      { kind: 'pdf', src: asset('/projects/Computer Programming/POS Project.pdf'), label: 'Open POS documentation PDF' },
    ],
  },
  {
    slug: 'canvas-projects',
    title: 'Canvas Design Projects',
    category: 'Creative Work',
    summary: 'Canva-based poster and storybook redesigns created for design coursework.',
    intro:
      'These pieces highlight layout, visual hierarchy, and presentation polish rather than application logic.',
    accent: '#fb7185',
    role: 'Design coursework',
    timeline: 'Creative portfolio',
    tech: ['Canva', 'Layout design', 'Visual composition'],
    highlights: [
      'Recreated a Steam-inspired poster with branding awareness.',
      'Redesigned a storybook layout for presentation impact.',
      'Adds visual breadth to the portfolio beyond software projects.',
    ],
    metrics: [
      { label: 'Medium', value: 'Canva' },
      { label: 'Pieces', value: 'Poster + storybook' },
      { label: 'Focus', value: 'Graphic design' },
    ],
    media: [
      { kind: 'pdf', src: asset('/projects/Canvas Projects/Sample Steam Poster.pdf'), label: 'Open Steam poster PDF' },
      { kind: 'pdf', src: asset('/projects/Canvas Projects/story book (Pasamba, Ventura).pdf'), label: 'Open storybook PDF' },
    ],
  },
];

export const projectSlugs = projects.map((project) => ({ slug: project.slug }));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}