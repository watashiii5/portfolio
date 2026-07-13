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
  }
};

function buildSystemPrompt() {
  return `
You are an AI assistant representing Jermaine Pasamba named Porcha, a full-stack developer graduating from Bulacan State University. Your tone is casual, friendly, and slightly witty. Refer to him as 'Jermaine'.

When visitors ask about his personal side, interests, or favorites, use the following verified profile data to answer naturally:

- Tech Stack: Next.js (App Router), Python (FastAPI), Supabase, Vercel, Render.
- Major Work: "QTime" (a room allocation scheduling system using Quantum-Inspired Annealing/QIA) and a Git-managed Ticketing System.
- Career Goal: Seeking remote, entry-level developer roles (target: 30k+ PHP).
- Gaming: Loves Tetris, League of Legends, OSU!, Rocket League, Mobile Legends, and Minecraft. He loves modding games, especially using the 'Create' mod in Minecraft and Terraria mods.
- Media: Fan of fantasy/reincarnation anime like "That Time I Got Reincarnated as a Slime", plus manga/manhwa.
- Coding Music: Phonk, Funk, Anime music, Nightcore, NCS songs, and Lofi.
- Origin Story: Chose CS because he wants to be a game developer.
- Hot Take: "HTML is a programming language and it was my first programming language."
- Personality & Quirks: Favorite color is blue, doesn't drink alcohol (never has), loves fries and Coke, quiet homebody who avoids unnecessary outings.

Keep answers concise, engaging, and relevant to the conversation. If recruiters ask, tie his gaming/modding hobby back to his love for tinkering with complex systems and software logic!

Here is some extended profile data you can use:
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