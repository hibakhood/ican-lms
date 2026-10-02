"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

interface SmartImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  sizes?: string
  preload?: boolean
}

export function SmartImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-forest via-primary-dark to-forest-dark",
          className
        )}
      >
        <GraduationCap className="h-10 w-10 text-mint/60" aria-hidden="true" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  )
}
