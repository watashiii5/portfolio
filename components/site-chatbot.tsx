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
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

const PANEL_HEIGHT_MIN = 280;
const PANEL_HEIGHT_MAX_RATIO = 0.85;
const PANEL_HEIGHT_DEFAULT = 480;

export default function SiteChatbot() {
  const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://portfolio-opal-iota-2ffsqksb9m.vercel.app/api/chat';
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [liveHint, setLiveHint] = useState<string | null>(null);
  const [panelHeight, setPanelHeight] = useState(PANEL_HEIGHT_DEFAULT);
  const sessionIdRef = useRef('');
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);

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
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const sections = [
      { id: 'projects', msg: 'Check out these featured projects! 🚀' },
      { id: 'all-projects', msg: 'Here is a complete view of all his work. 📚' },
      { id: 'experience', msg: 'His internship experience at NB Consulting! 💼' },
      { id: 'education', msg: 'His academic journey from elementary to college. 🎓' },
      { id: 'certificates', msg: 'He has certificates from his internship and a thesis competition! 📜' },
      { id: 'about', msg: 'Learn more about Jermaine here! 🧑‍💻' },
      { id: 'contact', msg: 'Need to reach him? You can send a direct email here! ✉️' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const section = sections.find(s => s.id === entry.target.id);
            if (section) {
              setLiveHint(section.msg);
              if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
              hintTimerRef.current = setTimeout(() => {
                setLiveHint(null);
              }, 4500);
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // Initial hint
    setTimeout(() => {
      setLiveHint("Hi! I'm Porcha, Jermaine's AI assistant. 👋");
      hintTimerRef.current = setTimeout(() => setLiveHint(null), 5000);
    }, 1500);

    return () => observer.disconnect();
  }, [ready]);

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

  function onDragStart(e: React.MouseEvent) {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startHeight: panelHeight };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startY - ev.clientY;
      const maxH = window.innerHeight * PANEL_HEIGHT_MAX_RATIO;
      const next = Math.min(maxH, Math.max(PANEL_HEIGHT_MIN, dragRef.current.startHeight + delta));
      setPanelHeight(next);
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';
  }

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
      <button className="chatbot-launcher" type="button" onClick={() => { setOpen((value) => !value); setLiveHint(null); }} aria-expanded={open} aria-controls="portfolio-chatbot-panel" aria-label="Ask about Jermaine">
        <span className="chatbot-launcher__logoWrap" aria-hidden="true">
          <img className="chatbot-launcher__logo" src={busy || (!open && !!liveHint) ? "/portfolio/merged.gif" : "/portfolio/Gemini_Generated_chatbotLogo.png"} alt="" />
        </span>
        {liveHint && !open && (
          <div className="chatbot-bubble">
            {liveHint}
          </div>
        )}
      </button>

      {open ? (
        <section className="chatbot-panel" id="portfolio-chatbot-panel" aria-label="Portfolio chatbot" style={{ height: panelHeight }}>
          <div className="chatbot-drag-handle" onMouseDown={onDragStart} aria-hidden="true">
            <span className="chatbot-drag-handle__bar" />
          </div>
          <header className="chatbot-panel__header">
            <div className="chatbot-panel__brand">
              <span className="chatbot-panel__avatar" aria-hidden="true">
                <img src={busy ? "/portfolio/merged.gif" : "/portfolio/Gemini_Generated_chatbotLogo.png"} alt="" />
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