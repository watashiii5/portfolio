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

function buildSystemPrompt() {
  return [
    'You are a concise portfolio chatbot for Jermaine Pasamba.',
    'Answer in a professional, friendly tone.',
    'Keep replies short and useful.',
    'Only answer using the portfolio context you receive from the user message history when possible.',
    'If you are unsure, say so briefly and suggest checking the portfolio sections.',
  ].join(' ');
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