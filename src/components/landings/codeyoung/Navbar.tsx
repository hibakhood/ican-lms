"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/20 bg-white/60 py-4 shadow-sm backdrop-blur-xl"
          : "py-6 bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          CodeYoung
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Features</Link>
          <Link href="#courses" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Courses</Link>
          <Link href="#how" className="text-sm font-semibold text-slate-600 hover:text-slate-900">How it works</Link>
          <Link href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Reviews</Link>
          <Button asChild size="lg" className="h-11 rounded-full bg-violet-600 px-6 font-semibold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700">
            <Link href="/register">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/70 backdrop-blur md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col bg-white/95 px-6 py-20 backdrop-blur-sm md:hidden">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-6 text-center">
            <Link href="#features" onClick={() => setOpen(false)} className="text-lg font-semibold">Features</Link>
            <Link href="#courses" onClick={() => setOpen(false)} className="text-lg font-semibold">Courses</Link>
            <Link href="#how" onClick={() => setOpen(false)} className="text-lg font-semibold">How it works</Link>
            <Link href="#testimonials" onClick={() => setOpen(false)} className="text-lg font-semibold">Reviews</Link>
            <Button asChild className="mt-2 h-12 rounded-full bg-violet-600 text-white hover:bg-violet-700">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
