'use client';

import { FormEvent, useRef, useState } from 'react';

type CvDownloadButtonProps = {
  pdfUrl: string;
  label?: string;
  className?: string;
};

export default function CvDownloadButton({ pdfUrl, label = 'Download CV', className = 'button' }: CvDownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email) || status === 'sending') return;

    setStatus('sending');

    try {
      const formData = new FormData();
      formData.append('access_key', '08082264-f544-49fc-ab6f-e949be059b53');
      formData.append('name', 'CV Download Notification');
      formData.append('email', email);
      formData.append('subject', `CV Downloaded by ${email}`);
      formData.append('message', `Someone with the email "${email}" just downloaded your CV/Resume from your portfolio.`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('sent');
        setEmail('');
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        setTimeout(() => {
          setStatus('idle');
          setOpen(false);
        }, 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {label}
      </button>

      {open && (
        <div className="cv-modal-overlay" onClick={() => { if (status !== 'sending') setOpen(false); }}>
          <div className="cv-modal" role="dialog" aria-label="Download CV" onClick={(e) => e.stopPropagation()}>
            <button
              className="cv-modal__close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="cv-modal__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <h3 className="cv-modal__title">Download Resume</h3>
            <p className="cv-modal__desc">Enter your email so I know who downloaded my CV. You&apos;ll get the PDF right after.</p>

            <form ref={formRef} onSubmit={handleSubmit} className="cv-modal__form">
              <input
                type="email"
                className="cv-modal__input"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending' || status === 'sent'}
                aria-label="Your email address"
              />
              <button
                className={`cv-modal__submit ${isValidEmail(email) && status === 'idle' ? 'cv-modal__submit--active' : ''}`}
                type="submit"
                disabled={!isValidEmail(email) || status === 'sending' || status === 'sent'}
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : 'Download'}
              </button>
            </form>

            {status === 'error' && (
              <p className="cv-modal__error">Something went wrong. Try again.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
