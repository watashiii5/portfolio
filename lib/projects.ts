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
  visual: {
    kind: 'image' | 'placeholder';
    src?: string;
    alt?: string;
    label?: string;
  };
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
    title: 'QTime Room Allocation',
    category: 'Thesis',
    summary: 'Room allocation tool for the College of Science.',
    intro: 'Built end to end with the UI, logic, backend integration, and deployment workflow.',
    accent: '#7dd3fc',
    visual: {
      kind: 'image',
      src: asset('/projects/Thesis Project/logo.png'),
      alt: 'QTime project logo',
    },
    role: 'Main developer',
    timeline: 'Thesis project',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Python'],
    highlights: ['Allocation flow', 'Full stack build', 'Practical scheduling'],
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
    title: 'Web Developer Intern',
    category: 'Internship',
    summary: '300-hour internship with FlutterFlow, Supabase, Figma, and Groq.',
    intro: 'Completed my OJT at Nantes Bautista Consulting Inc. with weekly team planning and review sessions.',
    accent: '#f59e0b',
    visual: {
      kind: 'image',
      src: asset('/projects/Web Developer Intern/RecrueIT_Text NEW (1) (1) (2).gif'),
      alt: 'RecrueIT logo animation',
    },
    role: 'Web developer intern',
    timeline: 'June 2025 to July 2025',
    tech: ['FlutterFlow', 'Supabase', 'Figma', 'Groq API'],
    highlights: ['Team workflow', 'Groq chatbot', 'Product UI flows'],
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
    category: 'AI App',
    summary: 'Character-first companion interface powered by Groq.',
    intro: 'A lightweight companion experience with a simple card-and-chat layout and a live demo.',
    accent: '#22c55e',
    visual: {
      kind: 'image',
      src: asset('/projects/YUI AI Companion/screenshot.jpg'),
      alt: 'YUI AI Companion screenshot',
    },
    role: 'Front-end and AI integration',
    timeline: 'Portfolio demo',
    tech: ['HTML', 'CSS', 'JavaScript', 'Groq API'],
    highlights: ['Character-first UI', 'Groq responses', 'Live demo'],
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
    category: 'Support',
    summary: 'Centralized help desk concept for tracking and resolving requests.',
    intro: 'Shows request intake, prioritization, ownership, and status tracking.',
    accent: '#38bdf8',
    visual: {
      kind: 'image',
      src: asset('/projects/IT Ticketing System/ticket.jpg'),
      alt: 'Ticketing system screenshot',
    },
    role: 'System designer',
    timeline: 'Portfolio project',
    tech: ['Web UI', 'Workflow design', 'Support ops'],
    highlights: ['Request lifecycle', 'Audit trail', 'Service desk flow'],
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
    title: 'Lainfern Adventure',
    category: 'Game',
    summary: 'Nature-inspired adventure game with discovery mechanics.',
    intro: 'A collaborative project focused on exploration, discovery, and a relaxed loop.',
    accent: '#f97316',
    visual: {
      kind: 'image',
      src: asset('/projects/Game Development/1.png'),
      alt: 'Lainfern game screenshot',
    },
    role: 'Team project',
    timeline: 'Unity project',
    tech: ['Unity', 'Game design', 'Interaction systems'],
    highlights: ['Discovery mechanics', 'Logbook system', 'Itch.io demo'],
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
    title: 'Phonebook System',
    category: 'Database',
    summary: 'C# phonebook system connected to MySQL and PHP.',
    intro: 'Shows the system through a demo video and the original documentation.',
    accent: '#a78bfa',
    visual: {
      kind: 'placeholder',
      label: 'Phonebook',
    },
    role: 'Course project',
    timeline: 'Academic project',
    tech: ['C#', 'MySQL', 'PHP', 'Documentation'],
    highlights: ['Desktop workflow', 'Demo video', 'CRUD-style contacts'],
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
    title: 'POS System',
    category: 'Programming',
    summary: 'Point-of-sale system built with Java, MySQL, and PHP.',
    intro: 'Captured through screenshots and the original documentation.',
    accent: '#84cc16',
    visual: {
      kind: 'placeholder',
      label: 'POS',
    },
    role: 'Course project',
    timeline: 'Academic project',
    tech: ['Java', 'NetBeans', 'MySQL', 'PHP'],
    highlights: ['Checkout workflow', 'Screenshot set', 'Database logic'],
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
    title: 'Canva Designs',
    category: 'Design',
    summary: 'Poster and storybook redesigns for coursework.',
    intro: 'Highlights layout, hierarchy, and presentation polish.',
    accent: '#fb7185',
    visual: {
      kind: 'placeholder',
      label: 'Canva',
    },
    role: 'Design coursework',
    timeline: 'Creative portfolio',
    tech: ['Canva', 'Layout design', 'Visual composition'],
    highlights: ['Steam poster', 'Storybook layout', 'Visual breadth'],
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