"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"

const testimonials = [
  { name: "Sarah M.", role: "Parent", text: "My son loves CodeYoung! His coding skills grew so fast.", rating: 5 },
  { name: "James R.", role: "Parent", text: "Amazing teachers and real projects. Highly recommended!", rating: 5 },
  { name: "Emily L.", role: "Parent", text: "The trial class won us over. Fantastic experience.", rating: 5 },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section id="testimonials" className="mx-auto max-w-[1400px] px-6 py-16 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">What Parents Say</h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <div className="absolute -right-4 -top-4 text-[120px] font-extrabold text-violet-500/10 rotate-180 select-none">“</div>
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="mt-4 text-base font-medium text-slate-700">{t.text}</p>
            <div className="mt-6">
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-slate-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
