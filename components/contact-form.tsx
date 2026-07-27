'use client';

import { FormEvent, useRef, useState } from 'react';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const canSend = name.trim() && isValidEmail(email) && subject.trim() && message.trim() && status === 'idle';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;
    setStatus('sending');

    const formData = new FormData();
    formData.append('access_key', '08082264-f544-49fc-ab6f-e949be059b53');
    formData.append('name', name.trim());
    formData.append('email', email.trim());
    formData.append('subject', subject.trim());
    formData.append('message', message.trim());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('sent');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  return (
    <article className="email-composer">
      {/* ── Toolbar ── */}
      <div className="email-composer__toolbar">
        <div className="email-composer__toolbar-left">
          <span className="email-composer__dot email-composer__dot--red" />
          <span className="email-composer__dot email-composer__dot--yellow" />
          <span className="email-composer__dot email-composer__dot--green" />
        </div>
        <span className="email-composer__toolbar-title">New Message</span>
        <div className="email-composer__toolbar-right">
          {status === 'sent' && <span className="email-composer__badge email-composer__badge--sent">Sent</span>}
          {status === 'error' && <span className="email-composer__badge email-composer__badge--error">Failed</span>}
        </div>
      </div>

      {/* ── Address Bar ── */}
      <div className="email-composer__fields">
        <div className="email-composer__field-row">
          <label className="email-composer__label">From</label>
          <div className="email-composer__field-inputs">
            <input
              type="text"
              name="name"
              className="email-composer__field"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'sending' || status === 'sent'}
            />
            <span className="email-composer__field-sep">&lt;</span>
            <input
              type="email"
              name="email"
              className="email-composer__field"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending' || status === 'sent'}
            />
            <span className="email-composer__field-sep">&gt;</span>
          </div>
        </div>
        <div className="email-composer__field-row">
          <label className="email-composer__label">To</label>
          <span className="email-composer__field email-composer__field--static">jermaine.pasamba@gmail.com</span>
        </div>
        <div className="email-composer__field-row">
          <label className="email-composer__label">Subject</label>
          <input
            type="text"
            name="subject"
            className="email-composer__field"
            placeholder="What is this about?"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={status === 'sending' || status === 'sent'}
          />
        </div>
      </div>

      <div className="email-composer__divider" />

      {/* ── Body ── */}
      <form ref={formRef} onSubmit={handleSubmit} className="email-composer__body">
        <textarea
          name="message"
          className="email-composer__textarea"
          placeholder="Write your message here..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === 'sending' || status === 'sent'}
        />
        <div className="email-composer__actions">
          <button
            type="submit"
            className={`email-composer__send ${canSend ? 'email-composer__send--active' : ''}`}
            disabled={!canSend}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : 'Send Message'}
          </button>
        </div>
      </form>

      {status === 'sent' && (
        <div className="email-composer__success">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Message delivered successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="email-composer__error-msg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Failed to send. Please try again.
        </div>
      )}
    </article>
  );
}
