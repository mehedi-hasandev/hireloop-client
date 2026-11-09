import Link from "next/link"

import { cn } from "@/lib/utils"

function LoopOMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-[1em]", className)}>
      <defs>
        <linearGradient id="hireloop-o" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f5af5" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="url(#hireloop-o)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeDasharray="40 14"
        transform="rotate(-55 12 12)"
      />
    </svg>
  )
}

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn(
        "inline-flex shrink-0 items-center text-2xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="text-[#2f5af5]">hirel</span>
      <LoopOMark className="mx-[1px] mt-[0.18em] size-[0.82em]" />
      <span className="text-[#f97316]">op</span>
    </Link>
  )
}
