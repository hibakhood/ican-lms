"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoBackground from "./VideoBackground"

export default function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-32">
      <VideoBackground />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="w-full lg:w-[50%]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px] lg:text-[76px]"
          >
            Learn to Code. Create the Future.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg font-medium text-slate-600 md:text-xl"
          >
            Live coding classes for kids \u0026 teens by top educators. Build real projects, develop problem-solving skills, and have fun!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="h-12 rounded-full bg-violet-600 px-7 font-semibold text-white hover:bg-violet-700">
              <Link href="/register">Start Free Trial <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-slate-300 bg-white/70 px-7 font-semibold backdrop-blur">
              <Link href="#features"><PlayCircle className="mr-1 h-4 w-4" /> Watch Demo</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
