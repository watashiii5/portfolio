'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

const STORAGE_KEY = 'jermaine-portfolio-chat';
const sessionPrompts = [
  'Want to ask me about my projects, tools, or internship?',
  'Need a quick summary of my work experience?',
  'Ask me about the thesis, game project, or AI work.',
  'I can answer questions about the portfolio or my stack.',
];

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function getSessionGreeting() {
  const randomIndex = Math.floor(Math.random() * sessionPrompts.length);
  return sessionPrompts[randomIndex];
}

export default function SiteChatbot() {
  const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sessionIdRef = useRef('');
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { sessionId?: string; messages?: ChatMessage[] };
        if (parsed.sessionId) {
          sessionIdRef.current = parsed.sessionId;
        }
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(parsed.messages);
          setReady(true);
          return;
        }
      } catch {
        // Ignore malformed storage.
      }
    }

    sessionIdRef.current = createId();
    setMessages([
      { id: createId(), role: 'assistant', content: getSessionGreeting() },
    ]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId: sessionIdRef.current, messages }));
  }, [messages, ready]);

  useEffect(() => {
    if (open) {
      viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, open]);

  const title = useMemo(() => 'Ask about Jermaine', []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;

    const nextMessages = [...messages, { id: createId(), role: 'user' as const, content: text }];
    setMessages(nextMessages);
    setInput('');
    setBusy(true);

    const fallbackReply =
      text.toLowerCase().includes('project') ? 'My strongest projects are the thesis system, internship work, and the AI companion.' :
      text.toLowerCase().includes('stack') ? 'I mainly worked with Next.js, TypeScript, Supabase, FlutterFlow, Figma, and Groq.' :
      text.toLowerCase().includes('contact') ? 'You can reach me through the contact section in the portfolio.' :
      'Ask me about my projects, stack, or internship experience and I’ll keep it short.';

    try {
      if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current, messages: nextMessages }),
        });

        if (response.ok) {
          const data = (await response.json()) as { reply?: string };
          if (data.reply) {
            setMessages((current) => [...current, { id: createId(), role: 'assistant', content: data.reply as string }]);
            setBusy(false);
            return;
          }
        }
      }

      setMessages((current) => [...current, { id: createId(), role: 'assistant', content: fallbackReply }]);
    } catch {
      setMessages((current) => [...current, { id: createId(), role: 'assistant', content: fallbackReply }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chatbot-shell">
      <button className="chatbot-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="portfolio-chatbot-panel">
        <span className="chatbot-launcher__dot" aria-hidden="true" />
        <span className="chatbot-launcher__label">{title}</span>
      </button>

      {open ? (
        <section className="chatbot-panel" id="portfolio-chatbot-panel" aria-label="Portfolio chatbot">
          <header className="chatbot-panel__header">
            <div>
              <strong>Portfolio chat</strong>
              <p>Session only. No message history is stored after the tab ends.</p>
            </div>
            <button className="chatbot-close" type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">
              ×
            </button>
          </header>

          <div className="chatbot-messages" ref={viewportRef}>
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message chatbot-message--${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
          >
            <input
              className="chatbot-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask something about me..."
              aria-label="Ask something about Jermaine"
            />
            <button className="chatbot-send" type="submit" disabled={busy}>
              {busy ? '...' : 'Send'}
            </button>
          </form>
          <div className="chatbot-footnote">Optional: set NEXT_PUBLIC_CHATBOT_API_URL to connect a Vercel Groq endpoint.</div>
        </section>
      ) : null}
    </div>
  );
}