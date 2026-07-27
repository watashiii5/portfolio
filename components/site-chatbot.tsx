'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  time: string;
  date: string;
};

const STORAGE_KEY = 'jermaine-portfolio-chat';
function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(date: Date) {
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

function isToday(dateStr: string) {
  return dateStr === formatDate(new Date());
}

function isYesterday(dateStr: string) {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateStr === formatDate(d);
}

function displayDate(dateStr: string) {
  if (isToday(dateStr)) return 'Today';
  if (isYesterday(dateStr)) return 'Yesterday';
  return dateStr;
}

const PANEL_HEIGHT_MIN = 320;
const PANEL_HEIGHT_MAX_RATIO = 0.85;
const PANEL_HEIGHT_DEFAULT = 520;

const QUICK_REPLIES = [
  'What are his top projects?',
  'What tech stack does he use?',
  'Tell me about his experience',
  'How can I contact him?',
];

const BOT_AVATAR_SRC = '/portfolio/Gemini_Generated_chatbotLogo.png';
const BOT_BUSY_SRC = '/portfolio/merged.gif';

export default function SiteChatbot() {
  const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://portfolio-opal-iota-2ffsqksb9m.vercel.app/api/chat';
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [liveHint, setLiveHint] = useState<string | null>(null);
  const [panelHeight, setPanelHeight] = useState(PANEL_HEIGHT_DEFAULT);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const sessionIdRef = useRef('');
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);

  const now = useMemo(() => ({ time: formatTime(new Date()), date: formatDate(new Date()) }), []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { sessionId?: string; messages?: ChatMessage[] };
        if (parsed.sessionId) {
          sessionIdRef.current = parsed.sessionId;
        }
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(parsed.messages.map((m) => ({
            ...m,
            time: m.time || formatTime(new Date()),
            date: m.date || formatDate(new Date()),
          })));
          setReady(true);
          return;
        }
      } catch {
        // Ignore malformed storage.
      }
    }

    sessionIdRef.current = createId();
    setMessages([
      {
        id: createId(),
        role: 'assistant',
        content: 'Hi there! I\u2019m **Porcha**, Jermaine\u2019s AI assistant. I can tell you about his projects, tech stack, experience, or how to get in touch.',
        time: formatTime(new Date()),
        date: formatDate(new Date()),
      },
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
      { id: 'projects', msg: 'Check out these featured projects! \uD83D\uDE80' },
      { id: 'all-projects', msg: 'Here is a complete view of all his work. \uD83D\uDCDA' },
      { id: 'experience', msg: 'His internship experience at NB Consulting! \uD83D\uDCBC' },
      { id: 'education', msg: 'His academic journey from elementary to college. \uD83C\uDF93' },
      { id: 'certificates', msg: 'He has certificates from his internship and a thesis competition! \uD83D\uDCDC' },
      { id: 'about', msg: 'Learn more about Jermaine here! \uD83E\uDDD1\u200D\uD83D\uDCBB' },
      { id: 'contact', msg: 'Need to reach him? You can send a direct email here! \u2709\uFE0F' },
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

    setTimeout(() => {
      setLiveHint("Hi! I\u2019m Porcha, Jermaine\u2019s AI assistant. \uD83D\uDC4B");
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
      requestAnimationFrame(() => {
        viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messages, open]);

  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, []);

  useEffect(() => {
    autoResize();
  }, [input, autoResize]);

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

  async function sendMessage(text?: string) {
    const textToSend = (text ?? input).trim();
    if (!textToSend || busy) return;

    const timestamp = new Date();
    const newMsg: ChatMessage = {
      id: createId(),
      role: 'user',
      content: textToSend,
      time: formatTime(timestamp),
      date: formatDate(timestamp),
    };

    setMessages((current) => [...current, newMsg]);
    setInput('');
    setBusy(true);
    setShowQuickReplies(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const fallbackReply =
      textToSend.toLowerCase().includes('project') ? 'His strongest work is the thesis app, the internship build, and the AI companion.' :
      textToSend.toLowerCase().includes('stack') ? 'He mainly worked with Next.js, TypeScript, Supabase, FlutterFlow, Figma, and Groq.' :
      textToSend.toLowerCase().includes('contact') ? 'You can reach him through the contact section in the portfolio.' :
      'Ask me about his projects, stack, or internship experience and I\u2019ll keep it short.';

    const appendAssistantMessage = (content: string) => {
      const t = new Date();
      setMessages((current) => [...current, {
        id: createId(),
        role: 'assistant',
        content,
        time: formatTime(t),
        date: formatDate(t),
      }]);
    };

    try {
      if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current, messages: [...messages, newMsg] }),
        });

        if (response.ok) {
          const data = (await response.json()) as { reply?: string };
          if (data.reply) {
            appendAssistantMessage(data.reply);
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

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  function renderMarkdown(content: string) {
    return content
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br/>');
  }

  let lastDate = '';

  return (
    <div className="chatbot-shell">
      <button
        className="chatbot-launcher"
        type="button"
        onClick={() => { setOpen((v) => !v); setLiveHint(null); }}
        aria-expanded={open}
        aria-controls="portfolio-chatbot-panel"
        aria-label="Open chat with Porcha"
      >
        <span className="chatbot-launcher__logoWrap" aria-hidden="true">
          <img
            className="chatbot-launcher__logo"
            src={busy || (!open && !!liveHint) ? BOT_BUSY_SRC : BOT_AVATAR_SRC}
            alt=""
          />
        </span>
        <span className={`chatbot-launcher__pulse ${busy ? 'chatbot-launcher__pulse--active' : ''}`} aria-hidden="true" />
        {liveHint && !open && (
          <div className="chatbot-bubble">{liveHint}</div>
        )}
      </button>

      {open && (
        <section
          className="chatbot-panel"
          id="portfolio-chatbot-panel"
          role="dialog"
          aria-label="Chat with Porcha"
          style={{ height: panelHeight }}
        >
          {/* ── Header ── */}
          <header className="chatbot-panel__header">
            <div className="chatbot-panel__brand">
              <span className="chatbot-panel__avatar" aria-hidden="true">
                <img src={busy ? BOT_BUSY_SRC : BOT_AVATAR_SRC} alt="" />
                <span className={`chatbot-panel__status ${busy ? 'chatbot-panel__status--busy' : 'chatbot-panel__status--online'}`} />
              </span>
              <div className="chatbot-panel__brandText">
                <strong className="chatbot-panel__name">Porcha</strong>
                <span className="chatbot-panel__subtitle">{busy ? 'Typing\u2026' : 'Online \u2022 Portfolio Assistant'}</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          {/* ── Drag handle ── */}
          <div className="chatbot-drag-handle" onMouseDown={onDragStart} aria-hidden="true">
            <span className="chatbot-drag-handle__bar" />
          </div>

          {/* ── Messages ── */}
          <div className="chatbot-messages" ref={viewportRef}>
            {messages.map((message, idx) => {
              const showDate = message.date !== lastDate;
              lastDate = message.date;
              const showAvatar = message.role === 'assistant' && (
                idx === messages.length - 1 ||
                messages[idx + 1]?.role !== 'assistant'
              );
              const isLastInGroup = idx === messages.length - 1 || messages[idx + 1]?.role !== message.role;

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="chatbot-date-sep">
                      <span>{displayDate(message.date)}</span>
                    </div>
                  )}
                  <div className={`chatbot-message chatbot-message--${message.role} ${isLastInGroup ? 'chatbot-message--last' : ''}`}>
                    {message.role === 'assistant' && (
                      <span className="chatbot-message__avatar" aria-hidden="true">
                        <img src={BOT_AVATAR_SRC} alt="" />
                      </span>
                    )}
                    <div className="chatbot-message__body">
                      <div
                        className="chatbot-message__text"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                      />
                      <span className="chatbot-message__time">{message.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {busy && (
              <div className="chatbot-message chatbot-message--assistant chatbot-message--typing" aria-live="polite">
                <span className="chatbot-message__avatar" aria-hidden="true">
                  <img src={BOT_BUSY_SRC} alt="" />
                </span>
                <div className="chatbot-message__body">
                  <span className="typing-dots" aria-label="Typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {showQuickReplies && !busy && messages.length <= 1 && (
              <div className="chatbot-quick-replies">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    className="chatbot-quick-reply"
                    type="button"
                    onClick={() => void sendMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Input ── */}
          <form
            className="chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
          >
            <div className="chatbot-input-wrap">
              <textarea
                ref={textareaRef}
                className="chatbot-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message\u2026"
                aria-label="Type a message to Porcha"
              />
            </div>
            <button
              className={`chatbot-send ${input.trim() && !busy ? 'chatbot-send--active' : ''}`}
              type="submit"
              disabled={!input.trim() || busy}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
