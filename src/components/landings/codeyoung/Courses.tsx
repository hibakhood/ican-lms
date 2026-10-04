"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const courses = [
  {
    title: "Little Coders",
    desc: "Ages 6–8 • Block-based coding fundamentals",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/course_1_little_coders_1781448894497_tyboh1.png",
    grad: "from-yellow-300 via-yellow-200 to-amber-200",
  },
  {
    title: "Young Innovators",
    desc: "Ages 9–12 • Text-based coding \u0026 logic",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465987/course_2_young_innovators_1781448911749_lgkmr6.png",
    grad: "from-orange-400 via-orange-300 to-rose-300",
  },
  {
    title: "Tech Leaders",
    desc: "Ages 13–16 • Full-stack \u0026 real projects",
    img: "https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/course_3_tech_leaders_1781448931917_vd2jlq.png",
    grad: "from-indigo-500 via-purple-400 to-pink-300",
  },
]

export default function Courses() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section id="courses" className="mx-auto max-w-[1400px] px-6 py-16 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Our Courses</h2>
        <p className="mt-4 text-lg font-medium text-slate-600">Age-appropriate learning paths for every stage</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {courses.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`${i === 2 ? "md:col-span-2" : ""} group relative isolate overflow-hidden rounded-[2.5rem] border border-white/40 bg-gradient-to-br ${c.grad} p-8 shadow-xl shadow-gray-200/50`}
          >
            <div className="absolute inset-0 bg-white/0 transition-all duration-500 group-hover:bg-white/10 group-hover:backdrop-blur-[2px]" />
            <div className="relative z-10 max-w-sm">
              <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{c.title}</h3>
              <p className="mt-2 text-base font-medium text-slate-700">{c.desc}</p>
            </div>
            <Image src={c.img} alt={c.title} width={620} height={620} className={`absolute bottom-0 right-0 z-10 h-auto ${i === 2 ? "w-[40%] md:w-[30%]" : "w-[80%] md:w-[70%]"} -translate-x-4 translate-y-4 object-contain drop-shadow-xl`} />
          </motion.article>
        ))}
      </div>
    </section>
  )
}
