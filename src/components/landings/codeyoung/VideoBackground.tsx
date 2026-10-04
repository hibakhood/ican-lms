"use client"

import { useRef, useEffect } from "react"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const duration = video.duration || 0
      if (duration > 0) {
        video.currentTime = Math.max(0, Math.min(duration, x * duration))
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="absolute -bottom-10 right-0 h-[120%] w-auto origin-bottom-right scale-[0.85] object-contain"
        muted
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/dprydfxok/image/upload/q_auto/f_auto/v1781465988/feature_1_live_1781448955520_b76soe.png"
      >
        <source src="https://res.cloudinary.com/dprydfxok/video/upload/v1781466533/boy_laptop_1_qywp6u.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
