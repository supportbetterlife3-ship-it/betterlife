'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type MessageRow = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt?: string;
};

export default function AdminMessagesPanel() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = (await res.json()) as MessageRow[];
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: 'pending' | 'resolved') {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await load();
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this message permanently?')) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await load();
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Contact form inbox. Click a card or the message area to read the full text. Pending items count toward your
          sidebar badge.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Loading…
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          No messages yet.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {messages.map((m) => {
            const pending = m.status !== 'resolved';
            const isBusy = busyId === m._id;
            const expanded = expandedIds.has(m._id);
            return (
              <li
                key={m._id}
                onClick={() => toggleExpanded(m._id)}
                className={`flex cursor-pointer flex-col rounded-xl border bg-white p-3 shadow-sm transition hover:ring-2 hover:ring-brand-500/25 dark:bg-slate-900 ${
                  pending
                    ? 'border-amber-300/80 dark:border-amber-700/50'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      pending ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white dark:bg-emerald-700'
                    }`}
                  >
                    {pending ? 'Pending' : 'Done'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {m.createdAt ? new Date(m.createdAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                  </span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white" title={m.name}>
                    {m.name}
                  </p>
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-0.5 block truncate text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                    title={m.email}
                  >
                    {m.email}
                  </a>
                  <a
                    href={`tel:${m.phone}`}
                    className="mt-0.5 block text-xs text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {m.phone}
                  </a>
                </div>

                {/* Message body: click toggles expand; max-height works with pre-wrap (unlike line-clamp) */}
                <div
                  className="mt-2 flex-1 rounded-lg border border-slate-200/80 bg-slate-50/80 p-2 dark:border-slate-700 dark:bg-slate-800/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => toggleExpanded(m._id)}
                    className="w-full rounded-md text-left outline-none ring-brand-500/40 focus-visible:ring-2"
                  >
                    <p
                      className={`text-xs leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap ${
                        expanded ? '' : 'max-h-[5.25rem] overflow-hidden'
                      }`}
                    >
                      {m.message}
                    </p>
                    <span className="mt-1.5 inline-block text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                      {expanded ? 'Show less ↑' : 'Read full message ↓'}
                    </span>
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
                  {pending ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => setStatus(m._id, 'resolved')}
                      className="rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      Resolve
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => setStatus(m._id, 'pending')}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Pending
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => remove(m._id)}
                    className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
