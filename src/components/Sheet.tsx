"use client";

import React from "react";
import { createPortal } from "react-dom";
import { siteConfig } from '@/config/site';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function Sheet({ open, onOpenChange, children }: SheetProps) {
  const [mounted, setMounted] = React.useState(false);
  const touchStartXRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  if (!mounted) return null;

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!open) return;
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (!open) return;
    const startX = touchStartXRef.current;
    const endX = e.changedTouches[0]?.clientX ?? null;
    touchStartXRef.current = null;
    if (startX == null || endX == null) return;
    // Simple swipe-right-to-close gesture (good on very small screens)
    const deltaX = endX - startX;
    if (deltaX > 50) {
      onOpenChange(false);
    }
  };

  return createPortal(
    <div className={`sheet-overlay fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      {/* Transparent body overlay – tap to close */}
      <div
        aria-hidden={!open}
        onClick={() => onOpenChange(false)}
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Slide-in panel from the right, with margin on small screens for glass effect */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute inset-y-4 right-3 w-[92%] xs:w-[88%] sm:w-[20rem] max-w-sm transform transition-transform duration-400 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          <div className="relative flex items-center justify-end px-5 pt-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="absolute inset-x-0 mx-auto w-fit space-y-1 text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Menu
              </p>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {siteConfig.brandName}
              </h2>
            </div>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors"
              aria-label="Close menu"
              onClick={() => onOpenChange(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 gap-6 animate-fade-in">
            {children}
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
