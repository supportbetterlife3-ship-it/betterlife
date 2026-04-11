"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
}

/** Soft rotating conic glow behind cards (Magic UI–inspired). */
export function BorderBeam({ className, duration = 10 }: BorderBeamProps) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-[35%] z-0 opacity-50 dark:opacity-40 blur-3xl",
        className
      )}
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.5) 90deg, rgba(15,118,110,0.55) 180deg, rgba(14,165,233,0.45) 270deg, transparent 360deg)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}
