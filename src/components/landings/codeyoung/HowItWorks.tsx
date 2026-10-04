"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, CalendarCheck2, Trophy } from "lucide-react"

const steps = [
  { icon: BookOpen, title: "Choose a Course", desc: "Find the perfect learning path for your child." },
  { icon: CalendarCheck2, title: "Book a Trial", desc: "Join a free live trial class with our experts." },
  { icon: Trophy, title: "Start Learning", desc: "Build skills, projects, and confidence." },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section id="how" className="mx-auto max-w-[1400px] px-6 py-16 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">How It Works</h2>
      </motion.div>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="absolute left-1/2 top-12 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400 to-transparent md:block" />
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-violet-700" />
              <div className="relative flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full bg-white/10 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-2" />
              <s.icon className="absolute h-6 w-6 text-white" />
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-xs font-bold text-white">{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-base font-medium text-slate-600">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
