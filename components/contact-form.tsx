'use client';

import { FormEvent, useRef, useState } from 'react';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('sent');
        formRef.current?.reset();
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
    <article className="contact-card contact-card--form">
      <h3>Send an Email</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="web3-form">
        <input type="hidden" name="access_key" value="08082264-f544-49fc-ab6f-e949be059b53" />
        <input type="text" name="name" placeholder="Your Name" required className="form-input" disabled={status === 'sending'} />
        <input type="email" name="email" placeholder="Your Email" required className="form-input" disabled={status === 'sending'} />
        <textarea name="message" placeholder="Your Message" required className="form-textarea" disabled={status === 'sending'}></textarea>
        <button type="submit" className="button" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : status === 'error' ? 'Failed — Try again' : 'Submit'}
        </button>
      </form>
      {status === 'sent' && <p className="form-success">Message sent successfully! 🎉</p>}
    </article>
  );
}
