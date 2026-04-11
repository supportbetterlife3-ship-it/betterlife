'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(typeof data.error === 'string' ? data.error : 'Something went wrong.');
        setStatus('error');
        return;
      }
      setStatus('ok');
      form.reset();
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Send us a message</h2>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
        Leave your email and phone number and we&apos;ll get back to you as soon as we can.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={200}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={320}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            minLength={5}
            maxLength={50}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={10000}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-slate-900 dark:text-white resize-y min-h-[120px]"
          />
        </div>
        {status === 'ok' && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Thank you — we&apos;ve received your message.</p>
        )}
        {status === 'error' && <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{errorMsg}</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-8 py-3 transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
