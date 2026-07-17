import type { VercelRequest, VercelResponse } from '@vercel/node';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const allowedMethods = 'POST, OPTIONS';

function corsHeaders(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': allowedMethods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
  };
}

const jermaineProfile = {
  identity: {
    name: "Jermaine Pasamba",
    graduation: "June 2026 from Bulacan State University",
    role: "Full-Stack Developer & Computer Science Graduate"
  },
  chatbotConfig: {
    tone: "Casual, friendly, highly approachable, with a slight tech-witty edge.",
    greetingStyle: "Welcoming and modern. Can use slight developer humor or casual greetings.",
    referenceToUser: "Should refer to him naturally as 'Jermaine'."
  },
  hobbiesAndInterests: {
    videoGames: [
      "Competitive & Rhythm Games: Tetris, League of Legends, OSU!, Rocket League, Mobile Legends",
      "Sandbox: Minecraft"
    ],
    moddingTinkering: [
      "Extensively plays and tinkers with game modifications.",
      "Favorite modpacks/ecosystems include Minecraft (specifically tech-heavy mods like 'Create') and various Terraria mods."
    ],
    unwinding: [
      "Watching anime (huge fan of the Isekai genre, magic systems, and reincarnation tropes).",
      "Reading manga and manhwa."
    ]
  },
  mediaFavorites: {
    animeTvShows: [
      "That Time I Got Reincarnated as a Slime",
      "Enjoys any high-quality anime focusing on reincarnation, fantasy world-building, and intricate magic systems."
    ],
    codingSoundtrack: [
      "High-energy Phonk/Funk",
      "Nightcore",
      "NCS (NoCopyrightSounds) classics",
      "Anime OSTs",
      "Chill Lofi for deep-focus debugging sessions"
    ]
  },
  foodAndDrinks: {
    comfortFood: "Local Filipino comfort foods and savory dishes.",
    codingDrink: "Coffee or energy drinks to sustain late-night architecture and debugging marathons."
  },
  funFacts: {
    originStory: "Entered Computer Science with the foundational dream of becoming a game developer, which sparked his passion for complex software architecture and logic.",
    programmingHotTake: "Firmly and humorously stands by the take: 'HTML is absolutely a programming language, and it was my very first programming language.'"
  },
  personalTraits: {
    favoriteColor: "Blue",
    alcohol: "Does not drink alcohol (has never drunk since birth).",
    favoriteSnacks: "Fries and Coke.",
    personality: "Quiet type of person. Homebody who prefers not to go outside when it is unnecessary."
  },
  projects: [
    {
      title: "QTime Room Allocation",
      category: "Thesis",
      summary: "Room allocation tool for the College of Science with a cleaner scheduling workflow using Quantum-Inspired Annealing (QIA).",
      tech: ["Next.js", "TypeScript", "Supabase", "Python"],
      role: "Main developer",
      highlights: "Built a room allocation flow that reduces scheduling conflicts. Integrated Supabase-backed data handling for a full-stack system. Deployed as a polished academic prototype.",
      liveUrl: "https://qia-room-allocation.vercel.app/"
    },
    {
      title: "Web Developer Intern",
      category: "Internship",
      summary: "250-hour internship at Nantes Bautista Consulting Inc. with FlutterFlow, Supabase, Figma, and Groq for product UI and chatbot work.",
      tech: ["FlutterFlow", "Supabase", "Figma", "Groq API"],
      role: "Web developer intern",
      highlights: "Collaborated through weekly reviews aligned with team goals. Built and refined UI flows in FlutterFlow with a Groq-powered chatbot. Focused on polished, practical, and professional output.",
      timeline: "June 2025 to July 2025"
    },
    {
      title: "YUI AI Companion",
      category: "AI App",
      summary: "Character-first companion interface powered by Groq with a card-and-chat layout.",
      tech: ["HTML", "CSS", "JavaScript", "Groq API"],
      role: "Front-end and AI integration",
      highlights: "Character-first UI that keeps the experience friendly and easy to understand. Groq responses shaped to feel quick, conversational, and lightweight. Live demo showing the interaction pattern.",
      liveUrl: "https://yui-sao.vercel.app/"
    },
    {
      title: "IT Ticketing System",
      category: "Support",
      summary: "Centralized help desk concept for tracking and resolving requests with full request lifecycle.",
      tech: ["Web UI", "Workflow design", "Support ops"],
      role: "System designer",
      highlights: "Follows the full request lifecycle from ticket creation to resolution. Maintains a complete audit trail. Implements standard service desk workflow for prioritization and assignment.",
      liveUrl: "https://ticketing-system-beta-ten.vercel.app/"
    },
    {
      title: "Lainfern Adventure",
      category: "Game",
      summary: "Nature-inspired adventure game with discovery mechanics, built in Unity.",
      tech: ["Unity", "Game design", "Interaction systems"],
      role: "Team project",
      highlights: "Features exploration and discovery mechanics inspired by natural environments. Includes a logbook system to track findings. Published on Itch.io.",
      liveUrl: "https://watashi5.itch.io/lainferns-adventure"
    },
    {
      title: "Word Sprint: Island Escape",
      category: "Game",
      summary: "Side-scrolling educational word game powered by Phaser 3 where you answer vocabulary questions to escape an island.",
      tech: ["Phaser 3", "JavaScript", "HTML5 Canvas", "Vite"],
      role: "Main developer",
      highlights: "Built with Phaser 3.80.1 using Vanilla JavaScript and HTML5 Canvas. Combines vocabulary questions with platforming mechanics for interactive learning. Players answer word-based questions to power jumps and advance through levels.",
      liveUrl: "https://word-sprint-island-escape.vercel.app/"
    },
    {
      title: "Phonebook System",
      category: "Database",
      summary: "C# phonebook system connected to MySQL and PHP with full CRUD operations.",
      tech: ["C#", "MySQL", "PHP", "Documentation"],
      role: "Course project",
      highlights: "Provides a complete desktop workflow for managing contacts. Supports full CRUD operations. Includes demo video and documentation."
    },
    {
      title: "POS System",
      category: "Programming",
      summary: "Point-of-sale system built with Java, MySQL, and PHP.",
      tech: ["Java", "NetBeans", "MySQL", "PHP"],
      role: "Course project",
      highlights: "Implements a complete checkout and point-of-sale workflow. Features robust database logic using MySQL for inventory and transactions."
    },
    {
      title: "Canva Designs",
      category: "Design",
      summary: "Poster and storybook redesigns for coursework showcasing layout, hierarchy, and presentation polish.",
      tech: ["Canva", "Layout design", "Visual composition"],
      role: "Design coursework",
      highlights: "Features a complete Steam-style poster design. Includes a multi-page storybook layout focusing on visual hierarchy. Demonstrates graphic design composition techniques."
    }
  ],
  siteStats: {
    totalProjects: 9,
    internshipHours: "250 hrs",
    liveDemos: 4,
    primaryStack: "Next.js + Supabase"
  }
};

function buildSystemPrompt() {
  return `
You are an AI assistant representing Jermaine Pasamba named Porcha, a full-stack developer graduating from Bulacan State University. Your tone is casual, friendly, and slightly witty. Refer to him as 'Jermaine'.

When visitors ask about his personal side, interests, or favorites, use the following verified profile data to answer naturally:

- Tech Stack: Next.js (App Router), TypeScript, Python (FastAPI), Supabase, FlutterFlow, Vercel, Render, Unity, Phaser 3, Java, C#, Groq API.
- Career Goal: Seeking remote, entry-level developer roles (target: 30k+ PHP).
- Internship: 250-hour OJT at Nantes Bautista Consulting Inc. (June-July 2025) doing FlutterFlow + Supabase + Groq API work.

PROJECTS (9 total, 4 have live demos):

1. QTime Room Allocation (Thesis) — Next.js, TypeScript, Supabase, Python. Room allocation tool for BulSU College of Science using Quantum-Inspired Annealing. Live: qia-room-allocation.vercel.app
2. Web Developer Intern (Internship) — FlutterFlow, Supabase, Figma, Groq API. Product UI and chatbot work at Nantes Bautista Consulting Inc. 250 hours.
3. YUI AI Companion (AI App) — HTML, CSS, JavaScript, Groq API. Character-first companion chat interface. Live: yui-sao.vercel.app
4. IT Ticketing System (Support) — Web UI, Workflow design, Support ops. Centralized help desk for tracking and resolving requests. Live: ticketing-system-beta-ten.vercel.app
5. Lainfern Adventure (Game) — Unity, Game design. Nature-inspired adventure game with discovery mechanics. Live on Itch.io.
6. Word Sprint: Island Escape (Game) — Phaser 3, JavaScript, HTML5 Canvas, Vite. Educational word game combining vocabulary with side-scrolling platforming. Live: word-sprint-island-escape.vercel.app
7. Phonebook System (Database) — C#, MySQL, PHP. Desktop phonebook with full CRUD operations. Includes demo video.
8. POS System (Programming) — Java, NetBeans, MySQL, PHP. Point-of-sale system with checkout workflow and inventory tracking.
9. Canva Designs (Design) — Canva, Layout design. Steam-style poster and storybook redesigns for coursework.

- Gaming: Loves Tetris, League of Legends, OSU!, Rocket League, Mobile Legends, and Minecraft. He loves modding games, especially using the 'Create' mod in Minecraft and Terraria mods.
- Media: Fan of fantasy/reincarnation anime like "That Time I Got Reincarnated as a Slime", plus manga/manhwa.
- Coding Music: Phonk, Funk, Anime music, Nightcore, NCS songs, and Lofi.
- Origin Story: Chose CS because he wants to be a game developer.
- Hot Take: "HTML is a programming language and it was my first programming language."
- Personality & Quirks: Favorite color is blue, doesn't drink alcohol (never has), loves fries and Coke, quiet homebody who avoids unnecessary outings.

Keep answers concise, engaging, and relevant to the conversation. If recruiters ask, tie his gaming/modding hobby back to his love for tinkering with complex systems and software logic. When someone asks about a specific project, use the detailed project data below to give a thorough answer!

Here is the full verified profile and project data:
${JSON.stringify(jermaineProfile, null, 2)}
`;
}

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as ChatMessage;
      return (candidate.role === 'user' || candidate.role === 'assistant' || candidate.role === 'system') && typeof candidate.content === 'string';
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const origin = typeof request.headers.origin === 'string' ? request.headers.origin : undefined;
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
    response.setHeader(key, value);
  });

  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const groqApiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  if (!groqApiKey) {
    return response.status(500).json({ error: 'GROQ_API_KEY is not configured.' });
  }

  let body: unknown;

  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({ error: 'Invalid JSON body.' });
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages);

  if (messages.length === 0) {
    return response.status(400).json({ error: 'messages array is required.' });
  }

  const payload = {
    model,
    messages: [{ role: 'system', content: buildSystemPrompt() }, ...messages],
    temperature: 0.7,
    max_tokens: 220,
  };

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!groqResponse.ok) {
    const errorText = await groqResponse.text();
    return response.status(502).json({ error: 'Groq request failed.', details: errorText });
  }

  const data = (await groqResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return response.status(502).json({ error: 'Groq returned an empty reply.' });
  }

  return response.status(200).json({ reply });
}