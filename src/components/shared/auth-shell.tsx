import Link from "next/link"
import { SmartImage } from "@/components/shared/smart-image"
import { GraduationCap, Radio, Video, FileText } from "lucide-react"

const highlights = [
  { icon: Radio, label: "Live interactive classes" },
  { icon: Video, label: "Recorded video lessons" },
  { icon: FileText, label: "Downloadable study materials" },
]

interface AuthShellProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="grid lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.1fr_1fr]">
      <div className="relative isolate hidden overflow-hidden bg-forest p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
        <SmartImage
          src="/images/pexels-karola-g-7681091.jpg"
          alt="Students learning together with laptops"
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest-dark/90 to-forest-dark/55" />

        <Link href="/" className="relative flex w-fit items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-forest">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold text-white">
            ICAN <span className="text-mint">Learning</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight text-white xl:text-4xl">
            Learn. Prepare. <span className="text-mint">Achieve.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 xl:text-base">
            One platform for live classes, recorded lessons, and professional
            study materials—study from home, on any device.
          </p>
          <ul className="mt-7 space-y-3">
            {highlights.map((h) => (
              <li key={h.label} className="flex items-center gap-3 text-sm text-white/85">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/25"
                >
                  <h.icon className="h-4 w-4" />
                </span>
                {h.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex w-fit items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold text-forest">
              ICAN <span className="text-primary">Learning</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight text-forest">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
