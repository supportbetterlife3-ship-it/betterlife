"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { BorderBeam } from "./border-beam";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/** Rounded surface with subtle animated border glow. */
export function MagicCard({ children, className, contentClassName }: MagicCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-[1px]", className)}>
      <BorderBeam />
      <div
        className={cn(
          "relative z-10 h-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
