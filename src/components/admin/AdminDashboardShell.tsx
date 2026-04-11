'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import DashboardSignOut from '@/components/admin/DashboardSignOut';

const nav = [
  { href: '/admin/dashboard/messages', label: 'Messages', badgeKey: 'messages' as const },
  { href: '/admin/dashboard/careers', label: 'Careers', badgeKey: null },
  { href: '/admin/dashboard/blog', label: 'Blog', badgeKey: null },
];

type Props = {
  email: string;
  initialPendingMessages: number;
  children: React.ReactNode;
};

export default function AdminDashboardShell({ email, initialPendingMessages, children }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, setPending] = useState(initialPendingMessages);

  const refreshPending = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = (await res.json()) as { pendingMessages?: number };
        if (typeof data.pendingMessages === 'number') setPending(data.pendingMessages);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    refreshPending();
  }, [pathname, refreshPending]);

  useEffect(() => {
    const onFocus = () => refreshPending();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refreshPending]);

  return (
    <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="lg:flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white shadow-lg transition-transform dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 p-5 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Dashboard</p>
              <p className="mt-1 truncate text-sm text-slate-700 dark:text-slate-200">{email}</p>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const showBadge = item.badgeKey === 'messages' && pending > 0;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-brand-500/15 text-brand-800 dark:text-brand-200 ring-1 ring-brand-500/30'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    {showBadge ? (
                      <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                        {pending > 99 ? '99+' : pending}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <DashboardSignOut />
            </div>
          </div>
        </aside>

        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <div className="min-h-screen flex-1 lg:ml-0">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">Admin</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{email}</p>
            </div>
            {pending > 0 ? (
              <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                {pending > 99 ? '99+' : pending}
              </span>
            ) : null}
          </header>

          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
