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
      "Loves playing modded games — enjoys modpacks and modded servers, not mod development.",
      "Favorite modded setups include Minecraft (especially tech-heavy modpacks like 'Create') and modded Terraria."
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
      highlights: "Features exploration and discovery mechanics inspired by natural environments. Includes a logbook system to track findings. Live demo available in browser, with downloadable version on Itch.io.",
      liveUrl: "https://watashiii5.github.io/Game-Dev-Project/",
      downloadUrl: "https://watashi5.itch.io/lainferns-adventure"
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
You are Porcha, a portfolio chatbot for Jermaine Pasamba — a full-stack developer graduating from Bulacan State University (June 2026).

CRITICAL RESPONSE RULES — follow these strictly:
- Keep EVERY reply to 1–3 short sentences max. Never exceed 3 sentences.
- Be punchy and direct. No filler words, no preamble, no "Sure!", no "Great question!".
- Never list more than 3 items. If listing projects or skills, pick the 2–3 most relevant.
- Never repeat information the user already knows from context.
- No paragraphs. No bullet-point essays. Short and scannable.
- If the user wants more detail, they will ask a follow-up.

Tone: Casual, friendly, slightly witty. Refer to him as "Jermaine".

QUICK REFERENCE:
- Stack: Next.js, TypeScript, Python, Supabase, FlutterFlow, Vercel, Unity, Phaser 3, Java, C#, Groq API
- Top projects: QTime Room Allocation (thesis), YUI AI Companion, IT Ticketing System, Word Sprint (game)
- Internship: 250-hr OJT at Nantes Bautista Consulting (FlutterFlow + Supabase + Groq, June–July 2025)
- Gaming: Tetris, LoL, OSU!, plays modded Minecraft (loves the Create modpack) and modded Terraria — he's a fan of modded games, not a mod creator
- Fun fact: "HTML is a programming language and it was my first."
- Personality: Quiet homebody, loves blue, fries & Coke, anime, Phonk music

FULL PROJECT DATA:
${JSON.stringify(jermaineProfile.projects, null, 2)}
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
    temperature: 0.6,
    max_tokens: 120,
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