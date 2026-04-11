"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Sheet from './Sheet';
import { siteConfig } from '@/config/site';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
});

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800 shadow-sm shadow-slate-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3">
          <Link
            href="/"
            className="shrink-0 rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200/90 dark:ring-slate-700 p-1.5 shadow-sm transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.brandName} home`}
          >
            <Image
              src="/logo.png"
              alt={`${siteConfig.brandName} logo`}
              width={160}
              height={160}
              className="h-11 sm:h-14 w-auto max-w-[200px] object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-semibold transition-colors border-b-2 pb-1 ${
                    isActive
                      ? 'border-brand-500 text-brand-600 dark:text-brand-400 dark:border-brand-400'
                      : 'border-transparent text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-300 hover:border-brand-500/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {status === 'authenticated' && session?.user ? (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 py-0.5 pl-0.5 pr-2 text-slate-800 transition hover:border-brand-500/40 hover:bg-brand-500/5 dark:border-slate-600 dark:text-slate-100"
                title="Dashboard"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                    {(session.user.name || session.user.email || '?').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="hidden md:inline max-w-[4.5rem] lg:max-w-[6rem] truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                  {session.user.name || session.user.email?.split('@')[0] || 'Account'}
                </span>
              </Link>
            ) : (
              <Link
                href="/admin"
                className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800 dark:hover:text-brand-400"
              >
                Sign in
              </Link>
            )}
            <ThemeToggle className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-all duration-200" />
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-all duration-200" />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <div className="flex w-full max-w-sm flex-col items-stretch gap-3 px-2 py-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block w-full text-center text-base font-semibold tracking-wide rounded-full py-3 px-4 border transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border-brand-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-brand-500/40 hover:bg-brand-500/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            {status === 'authenticated' && session?.user ? (
              <Link
                href="/admin/dashboard"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-2.5 text-xs font-medium dark:border-slate-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {session.user.image ? (
                  <Image src={session.user.image} alt="" width={26} height={26} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[9px] font-bold text-white">
                    {(session.user.name || session.user.email || '?').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="max-w-[10rem] truncate">{session.user.name || session.user.email?.split('@')[0] || 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/admin"
                className="block w-full text-center text-sm font-semibold tracking-wide rounded-full py-3 px-4 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
