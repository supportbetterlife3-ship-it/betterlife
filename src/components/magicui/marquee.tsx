"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}

/** Magic UI–style horizontal marquee strip. */
export function Marquee({ children, className, pauseOnHover = true }: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden",
        pauseOnHover && "hover-pause-marquee",
        className
      )}
    >
      <div className="flex w-max shrink-0 animate-magic-marquee">
        <div className="flex shrink-0 items-center gap-12 px-4">{children}</div>
        <div className="flex shrink-0 items-center gap-12 px-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
