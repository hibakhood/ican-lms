"use client"

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { Button } from "@/components/ui/button"
import { SmartImage } from "@/components/shared/smart-image"
import { ArrowRight, Radio, Video, FileText, CalendarClock } from "lucide-react"

const formats = [
  { icon: Radio, label: "Live interactive classes" },
  { icon: Video, label: "Recorded video lessons" },
  { icon: FileText, label: "Downloadable study materials" },
  { icon: CalendarClock, label: "Learn at your own pace" },
]

// Drop a looping ambient clip at public/videos/hero.mp4 to enable video.
// Until then the poster image below is used (a failed video load falls back to it).
const VIDEO_SRC = "/videos/hero.mp4"
const POSTER_SRC = "/images/pexels-gabby-k-6281877.jpg"
const POSTER_ALT = "Focused student preparing for ICAN exam studies at a desk"

// Pixels of travel at full mouse deflection. The background follows the
// cursor; the foreground drifts the opposite way for parallax depth.
const BG_TRAVEL_X = 36
const BG_TRAVEL_Y = 24
const FG_TRAVEL_X = 14
const FG_TRAVEL_Y = 10

const fadeTransition = (delay: number) => ({
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
  delay,
})
const fadeHidden = { opacity: 0, y: 24 }
const fadeShown = { opacity: 1, y: 0 }

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const reduceMotion = useReducedMotion()

  // Normalised cursor position over the hero: -0.5 … 0.5 on each axis.
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const sx = useSpring(nx, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(ny, { stiffness: 60, damping: 20, mass: 0.6 })

  // Video moves in the direction of the mouse movement (and vice versa).
  const bgX = useTransform(sx, (v) => v * -BG_TRAVEL_X)
  const bgY = useTransform(sy, (v) => v * -BG_TRAVEL_Y)
  const fgX = useTransform(sx, (v) => v * FG_TRAVEL_X)
  const fgY = useTransform(sy, (v) => v * FG_TRAVEL_Y)

  function handleMouseMove(e: ReactMouseEvent<HTMLElement>) {
    if (reduceMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    nx.set((e.clientX - rect.left) / rect.width - 0.5)
    ny.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    nx.set(0)
    ny.set(0)
  }

  // Shared entrance props: each element animates itself so nothing can
  // get stuck waiting on variant propagation.
  const entrance = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: fadeHidden,
          animate: fadeShown,
          transition: fadeTransition(delay),
        }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate overflow-hidden bg-forest"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: bgX, y: bgY }}
        className="absolute -inset-10"
      >
        {videoFailed ? (
          <SmartImage
            src={POSTER_SRC}
            alt=""
            className="object-cover object-center"
            sizes="100vw"
            preload
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
          >
            <source
              src={VIDEO_SRC}
              type="video/mp4"
              onError={() => setVideoFailed(true)}
            />
          </video>
        )}
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { x: fgX, y: fgY }}
        className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-36"
      >
        <div className="max-w-2xl">
          <motion.span
            {...entrance(0)}
            className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-white/10 px-4 py-1.5 text-xs font-semibold text-mint backdrop-blur-sm sm:text-sm shadow-sm"
          >
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            ICAN Exam Preparation
          </motion.span>

          <motion.h1
            {...entrance(0.08)}
            className="mt-6 font-display font-extrabold leading-[1.05] tracking-tight text-white [font-size:clamp(2.5rem,6vw,4.25rem)]"
          >
            A clear path to
            <br />
            <span className="text-mint">ICAN success</span>
          </motion.h1>

          <motion.p
            {...entrance(0.16)}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/85 [font-size:clamp(1rem,1.5vw,1.125rem)] sm:leading-8"
          >
            Structured for ICAN’s levels, taught by qualified practitioners.
            Live classes, recordings, and organised study materials—so every
            hour of study moves you forward.
          </motion.p>

          <motion.div
            {...entrance(0.24)}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-13 bg-mint px-8 text-base text-forest shadow-lg shadow-mint/20 hover:bg-white"
            >
              <Link href="/courses">
                Explore Courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:border-mint hover:bg-white/10 hover:text-mint"
            >
              <Link href="/tutors">Meet Our Tutors</Link>
            </Button>
          </motion.div>

          <motion.ul
            {...entrance(0.32)}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {formats.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm text-white/80">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/25"
                >
                  <f.icon className="h-4 w-4" />
                </span>
                {f.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <span className="sr-only">{POSTER_ALT}</span>
    </section>
  )
}
