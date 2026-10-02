import { SmartImage } from "@/components/shared/smart-image"
import { BookOpen, Users, Video, Award } from "lucide-react"

export const metadata = {
  title: "About | ICAN Learning",
  description:
    "About ICAN Learning—a professional online platform for live classes, recorded lessons, and structured study materials.",
}

const values = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    text: "Organized modules and lessons for clear progression",
  },
  {
    icon: Users,
    title: "Expert Instruction",
    text: "Qualified tutors with professional expertise",
  },
  {
    icon: Video,
    title: "Flexible Access",
    text: "Learn anytime with recorded content and scheduled live sessions",
  },
  {
    icon: Award,
    title: "Practical Focus",
    text: "Emphasis on real-world application and exam preparation",
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/pexels-rdne-5915230.jpg"
            alt="University lecture hall"
            sizes="100vw"
            className="object-cover object-center"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl font-display font-extrabold tracking-tight text-white [font-size:clamp(2rem,4.5vw,3.25rem)]">
            About ICAN Learning
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            A professional online learning platform built on structured,
            progressive education—combining live classes, recorded lessons,
            and study materials that build knowledge step by step.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <SmartImage
            src="/images/pexels-leeloothefirst-8358048.jpg"
            alt="Library shelves filled with books"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3vw,2.5rem)]">
            Our learning philosophy
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            ICAN Learning is built on the principle of structured, progressive
            education. We focus on delivering well-organized content that
            builds knowledge step by step.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our platform combines recorded lessons for flexible self-paced
            learning with live interactive classes that encourage engagement
            and clarification.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Every course owned and maintained by its tutor",
              "Live sessions with room for questions",
              "Recorded lessons you can revisit any time",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-forest">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-soft text-primary"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6.5l2.5 2.5L10 3.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mint-soft/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3vw,2.5rem)]">
              What every course is built around
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The same four principles shape everything taught on the
              platform.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <article
                key={v.title}
                className="rounded-3xl border border-mint-soft bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-soft text-primary"
                >
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-forest">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
