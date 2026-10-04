"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate flex min-h-[450px] items-stretch overflow-hidden rounded-[3rem] bg-[#6145ed] px-8 py-10 md:px-12"
      >
        <div className="relative z-10 flex flex-col justify-center text-white md:w-2/3">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">Unlock Your Child&apos;s Coding Potential</h2>
          <p className="mt-4 text-lg font-medium text-white/90">Free trial class • No credit card required</p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 rounded-full bg-[#ffd233] px-8 font-semibold text-slate-900 hover:bg-[#fac214]">
              <Link href="/register">Book Free Trial</Link>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 -right-[5%] z-20 md:-right-[15%]">
          <Image src="https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/studient_with_laptop_nnprij.png" alt="Student with laptop" width={900} height={700} className="h-auto w-[130%] object-contain md:w-[140%] origin-bottom" />
        </div>
      </motion.div>
    </section>
  )
}
