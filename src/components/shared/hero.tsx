import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Baby, Briefcase, Headphones, Radio, Users, CalendarCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark to-forest-dark lg:col-span-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(147,233,172,0.25),transparent_55%)]" />
            <div className="relative flex min-h-[340px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-10">
              <div className="absolute right-6 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 sm:h-32 sm:w-32">
                <Headphones className="h-10 w-10 text-mint sm:h-14 sm:w-14" />
              </div>
              <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-mint">
                <Radio className="h-3.5 w-3.5" /> Live Online Class
              </p>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
                Learn. Prepare. Achieve.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Our live online training is regularly scheduled and taught by
                expert tutors. Recorded lessons, study materials, and flexible
                self-paced learning—delivered to your home.
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-mint text-forest hover:bg-white"
                >
                  <Link href="/courses">
                    Browse Our Course Catalog <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col justify-between rounded-3xl bg-mint p-6 text-forest sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70">
                <Baby className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  For Beginners
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-forest/75">
                  Structured beginner-friendly courses for people of all levels,
                  without having to leave the house.
                </p>
                <Link
                  href="/courses"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-forest-dark p-6 text-white sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Briefcase className="h-6 w-6 text-mint" />
              </div>
              <div className="mt-6">
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  For Professionals
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Expert-led advanced training for working professionals, with
                  live classes and recorded sessions.
                </p>
                <Link
                  href="/courses"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint hover:underline"
                >
                  Advanced Classes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { icon: Users, label: "Expert Tutors" },
            { icon: Radio, label: "Live Classes" },
            { icon: CalendarCheck, label: "Flexible Schedule" },
            { icon: Headphones, label: "24/7 Access" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint/20 text-mint">
                <item.icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-medium text-white/85 sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
