'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ConfirmDialog from '@/components/ConfirmDialog';
import { adminQueryKeys } from '@/lib/admin/queryKeys';

type MessageRow = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt?: string;
};

async function fetchMessages(): Promise<MessageRow[]> {
  const res = await fetch('/api/admin/messages');
  if (!res.ok) throw new Error('Failed to load messages');
  return res.json();
}

function previewText(text: string, maxLen = 100) {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen)}…`;
}

type DetailModalProps = {
  message: MessageRow;
  busyId: string | null;
  onClose: () => void;
  onResolve: (id: string) => void;
  onPending: (id: string) => void;
  onRequestDelete: (id: string) => void;
};

function MessageDetailModal({ message: m, busyId, onClose, onResolve, onPending, onRequestDelete }: DetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const pending = m.status !== 'resolved';
  const isBusy = busyId === m._id;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-detail-title"
        className="relative flex max-h-[min(90vh,640px)] w-full max-w-lg flex-col rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p id="message-detail-title" className="truncate text-base font-bold text-slate-900 dark:text-white">
              {m.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {m.createdAt ? new Date(m.createdAt).toLocaleString('en-GB') : '—'}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              pending ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white dark:bg-emerald-700'
            }`}
          >
            {pending ? 'Pending' : 'Resolved'}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
              <a href={`mailto:${m.email}`} className="break-all font-medium text-brand-600 hover:underline dark:text-brand-400">
                {m.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</p>
              <a href={`tel:${m.phone}`} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                {m.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Message</p>
              <p className="mt-1 whitespace-pre-wrap break-words text-slate-700 dark:text-slate-200">{m.message}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50 sm:px-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Close
            </button>
            {pending ? (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onResolve(m._id)}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                Mark resolved
              </button>
            ) : (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onPending(m._id)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Mark pending
              </button>
            )}
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onRequestDelete(m._id)}
              className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function AdminMessagesPanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailMessage, setDetailMessage] = useState<MessageRow | null>(null);

  const { data: messages = [], isPending: loading } = useQuery({
    queryKey: adminQueryKeys.messages,
    queryFn: fetchMessages,
  });

  async function setStatus(id: string, status: 'pending' | 'resolved') {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: adminQueryKeys.messages });
        await queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
        router.refresh();
        setDetailMessage((cur) => {
          if (!cur || cur._id !== id) return cur;
          return { ...cur, status };
        });
      }
    } finally {
      setBusyId(null);
    }
  }

  async function performDelete(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.messages });
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
      router.refresh();
      setDetailMessage((cur) => (cur?._id === id ? null : cur));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete message?"
        description="This permanently removes the contact message from your inbox."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={async () => {
          if (deleteId) await performDelete(deleteId);
        }}
      />

      {detailMessage ? (
        <MessageDetailModal
          message={detailMessage}
          busyId={busyId}
          onClose={() => setDetailMessage(null)}
          onResolve={(id) => void setStatus(id, 'resolved')}
          onPending={(id) => void setStatus(id, 'pending')}
          onRequestDelete={(id) => {
            setDetailMessage(null);
            setDeleteId(id);
          }}
        />
      ) : null}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Tap a card to open the full message. Quick actions stay on the card. Pending items count toward your sidebar
          badge.
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
            return (
              <li
                key={m._id}
                className={`flex max-h-[220px] flex-col rounded-xl border bg-white p-3 shadow-sm dark:bg-slate-900 ${
                  pending
                    ? 'border-amber-300/80 dark:border-amber-700/50'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetailMessage(m)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setDetailMessage(m);
                    }
                  }}
                  className="flex min-h-0 flex-1 cursor-pointer flex-col rounded-lg outline-none transition hover:bg-slate-50/80 focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:hover:bg-slate-800/40"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
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
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="mt-0.5 block truncate text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {m.email}
                  </a>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{previewText(m.message)}</p>
                  <p className="mt-1 text-[10px] font-semibold text-brand-600 dark:text-brand-400">Open for full message →</p>
                </div>

                <div className="mt-2 shrink-0 border-t border-slate-100 pt-2 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
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
                      onClick={() => setDeleteId(m._id)}
                      className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
