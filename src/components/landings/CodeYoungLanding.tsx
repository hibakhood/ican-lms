"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Navbar from "./codeyoung/Navbar"
import Hero from "./codeyoung/Hero"
import Features from "./codeyoung/Features"
import Courses from "./codeyoung/Courses"
import HowItWorks from "./codeyoung/HowItWorks"
import AdBanner from "./codeyoung/AdBanner"
import Testimonials from "./codeyoung/Testimonials"
import Footer from "./codeyoung/Footer"

export default function CodeYoungLanding() {
  return (
    <div className="min-h-screen bg-[#dfdfdf] text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <HowItWorks />
        <AdBanner />
        <Testimonials />
        <Footer />
      </main>
    </div>
  )
}
