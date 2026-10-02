import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SmartImage } from "@/components/shared/smart-image"
import { ArrowRight, Radio, Video, FileText, CalendarClock } from "lucide-react"

const formats = [
  { icon: Radio, label: "Live interactive classes" },
  { icon: Video, label: "Recorded video lessons" },
  { icon: FileText, label: "Downloadable study materials" },
  { icon: CalendarClock, label: "Learn at your own pace" },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <SmartImage
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80"
          alt="Students studying together with laptops"
          className="object-cover object-center"
          sizes="100vw"
          preload
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-36">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-xs font-semibold text-mint backdrop-blur-sm sm:text-sm">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Live Online Classes
          </span>

          <h1 className="mt-6 font-display font-extrabold leading-[1.05] tracking-tight text-white [font-size:clamp(2.5rem,6vw,4.25rem)]">
            Learn. Prepare.
            <br />
            <span className="text-mint">Achieve.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 [font-size:clamp(1rem,1.5vw,1.125rem)] sm:leading-8">
            Structured courses taught by expert tutors—live interactive classes,
            recorded lessons, and professional study materials, all in one
            place. Study from home, on any device, at your own pace.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 bg-mint px-8 text-base text-forest shadow-lg shadow-mint/20 hover:bg-white"
            >
              <Link href="/courses">
                Explore Courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:border-mint hover:bg-white/10 hover:text-mint"
            >
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {formats.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm text-white/80">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/25"
                >
                  <f.icon className="h-4 w-4" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
