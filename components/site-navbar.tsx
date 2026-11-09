"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { SiteLogo } from "@/components/site-logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0b0f] text-white">
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <SiteLogo />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="mx-6 h-5 w-px bg-white/20" />

          <Link
            href="/sign-in"
            className="text-sm font-medium text-[#8f8ffb] transition-colors hover:text-[#a7a4ff]"
          >
            Sign In
          </Link>

          <Button
            render={<Link href="/get-started" />}
            className="ml-5 h-9 rounded-full bg-linear-to-b from-[#6a5cff] to-[#5343f1] px-5 text-white shadow-[0_0_24px_rgba(99,84,255,0.35)] hover:from-[#7b70ff] hover:to-[#6152f5]"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open menu"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent className="border-white/10 bg-[#0b0b0f] text-white max-md:w-72">
            <SheetHeader>
              <SheetTitle className="text-left">
                <SiteLogo className="text-xl" />
              </SheetTitle>
            </SheetHeader>

            <nav aria-label="Main mobile" className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose key={link.href} render={<Link href={link.href} />}>
                  <span className="block rounded-lg px-2 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white">
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 p-4">
              <SheetClose
                render={<Link href="/sign-in" />}
                className="rounded-lg px-2 py-2.5 text-center text-sm font-medium text-[#8f8ffb] transition-colors hover:bg-white/10 hover:text-[#a7a4ff]"
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/get-started"
                    className="flex h-10 items-center justify-center rounded-full bg-linear-to-b from-[#6a5cff] to-[#5343f1] text-sm font-medium text-white shadow-[0_0_24px_rgba(99,84,255,0.35)] hover:from-[#7b70ff] hover:to-[#6152f5]"
                  />
                }
              >
                Get Started
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
