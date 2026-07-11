'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  time: string;
};

const STORAGE_KEY = 'jermaine-portfolio-chat';
function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function SiteChatbot() {
  const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://portfolio-opal-iota-2ffsqksb9m.vercel.app/api/chat';
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
          setMessages(parsed.messages.map((message) => ({ ...message, time: message.time || formatTime(new Date()) })));
          setReady(true);
          return;
        }
      } catch {
        // Ignore malformed storage.
      }
    }

    sessionIdRef.current = createId();
    setMessages([
      { id: createId(), role: 'assistant', content: 'Hi, I am Porcha. I am a portfolio chatbot built by Jermaine. Ask me about his projects, tools, or experience.', time: formatTime(new Date()) },
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

    const nextMessages = [...messages, { id: createId(), role: 'user' as const, content: text, time: formatTime(new Date()) }];
    setMessages((current) => [...current, { id: createId(), role: 'user', content: text, time: formatTime(new Date()) }]);
    setInput('');
    setBusy(true);

    const fallbackReply =
      text.toLowerCase().includes('project') ? 'My strongest work is the thesis app, the internship build, and the AI companion.' :
      text.toLowerCase().includes('stack') ? 'I mainly worked with Next.js, TypeScript, Supabase, FlutterFlow, Figma, and Groq.' :
      text.toLowerCase().includes('contact') ? 'You can reach me through the contact section in the portfolio.' :
      'Ask me about my projects, stack, or internship experience and I’ll keep it short.';

    const appendAssistantMessage = (content: string) => {
      setMessages((current) => [...current, { id: createId(), role: 'assistant', content, time: formatTime(new Date()) }]);
    };

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
            appendAssistantMessage(data.reply as string);
            setBusy(false);
            return;
          }
        }
      }

      appendAssistantMessage(fallbackReply);
    } catch {
      appendAssistantMessage(fallbackReply);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chatbot-shell">
      <button className="chatbot-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="portfolio-chatbot-panel">
        <span className="chatbot-launcher__logoWrap" aria-hidden="true">
          <img className="chatbot-launcher__logo" src="/portfolio/Gemini_Generated_chatbotLogo.png" alt="" />
        </span>
        <span className="chatbot-launcher__label">{title}</span>
      </button>

      {open ? (
        <section className="chatbot-panel" id="portfolio-chatbot-panel" aria-label="Portfolio chatbot">
          <header className="chatbot-panel__header">
            <div className="chatbot-panel__brand">
              <span className="chatbot-panel__avatar" aria-hidden="true">
                <img src="/portfolio/Gemini_Generated_chatbotLogo.png" alt="" />
              </span>
              <div>
              <strong>Porcha</strong>
              <p>A portfolio chatbot by Jermaine.</p>
              </div>
            </div>
            <button className="chatbot-close" type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">
              ×
            </button>
          </header>

          <div className="chatbot-messages" ref={viewportRef}>
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message chatbot-message--${message.role}`}>
                <div className="chatbot-message__text">{message.content}</div>
                <div className="chatbot-message__time">{message.time}</div>
              </div>
            ))}
            {busy ? (
              <div className="chatbot-message chatbot-message--assistant chatbot-message--typing" aria-live="polite">
                <span className="typing-dots" aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            ) : null}
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
        </section>
      ) : null}
    </div>
  );
}