"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const features = [
  {
    title: "Live Interactive Classes",
    desc: "Engage with expert teachers in small groups for personalized learning.",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/feature_1_live_1781448955520_b76soe.png",
    dir: "left" as const,
  },
  {
    title: "Real Projects",
    desc: "Build apps, games, and websites that you can showcase with pride.",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/feature_2_projects_1781448980561_g5dniq.png",
    dir: "right" as const,
  },
  {
    title: "Top Experts",
    desc: "Learn from industry professionals passionate about teaching kids.",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/feature_3_experts_1781448998009_tcoe2t.png",
    dir: "left" as const,
  },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1400px] px-6 py-16 md:py-32">
      <div className="space-y-20">
        {features.map((f, i) => (
          <FeatureBlock key={f.title} {...f} index={i} />
        ))}
      </div>
    </section>
  )
}

function FeatureBlock({ title, desc, img, dir, index }: {
  title: string
  desc: string
  img: string
  dir: "left" | "right"
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${dir === "right" ? "md:[grid-template-areas:'img_text']" : "md:[grid-template-areas:'text_img']"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="md:[grid-area:text]"
      >
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg font-medium text-slate-600">{desc}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex justify-center md:[grid-area:img]"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[120%] w-[120%] rounded-full bg-violet-500/20 blur-[80px]" />
        </div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative">
          <Image src={img} alt={title} width={540} height={540} className="relative z-10 h-auto w-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}
