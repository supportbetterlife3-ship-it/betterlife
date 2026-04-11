"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Magic UI–style shifting gradient on text (teal / cyan / sky). */
export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent animate-magic-gradient",
        "bg-[linear-gradient(90deg,#115e59_0%,#0f766e_25%,#0ea5e9_50%,#0f766e_75%,#115e59_100%)]",
        "dark:bg-[linear-gradient(90deg,#5eead4_0%,#22d3ee_35%,#38bdf8_65%,#5eead4_100%)]",
        className
      )}
    >
      {children}
    </span>
  );
}
