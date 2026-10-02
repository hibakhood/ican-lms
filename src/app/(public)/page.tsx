import Link from "next/link"
import { Hero } from "@/components/shared/hero"
import { CourseCard } from "@/components/shared/course-card"
import { TutorCard } from "@/components/shared/tutor-card"
import { LiveClassCard } from "@/components/shared/live-class-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { getFeaturedCourses } from "@/services/courses"
import { getFeaturedTutors } from "@/services/tutors"
import { getUpcomingLiveClasses } from "@/services/live-classes"
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MonitorPlay,
  Users,
} from "lucide-react"

export default async function HomePage() {
  const [coursesResult, tutorsResult, liveClassesResult] = await Promise.all([
    getFeaturedCourses(6),
    getFeaturedTutors(3),
    getUpcomingLiveClasses(3),
  ])

  const courses = coursesResult.data || []
  const tutors = tutorsResult.data || []
  const liveClasses = liveClassesResult.data || []

  const features = [
    {
      icon: CalendarCheck,
      title: "Class Schedule",
      text: "Regularly scheduled live online classes taught by expert instructors, plus flexible recorded sessions.",
    },
    {
      icon: MonitorPlay,
      title: "Instructor-Led Online Advantage",
      text: "Learn directly from qualified tutors with real professional expertise and interactive support.",
    },
    {
      icon: Users,
      title: "Structured Learning Path",
      text: "Courses organized into modules and lessons that build knowledge step by step.",
    },
  ]

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Brand strip */}
      <section aria-label="Trusted by learners" className="bg-mint-soft py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-14">
          {["ICAN Prep", "Accounting", "Taxation", "Business", "Finance"].map(
            (brand) => (
              <span
                key={brand}
                className="font-display text-sm font-bold uppercase tracking-widest text-forest/45 sm:text-base"
              >
                {brand}
              </span>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint to-mint-soft">
              <div className="flex aspect-[4/3] items-center justify-center">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/70">
                  <MonitorPlay className="h-12 w-12 text-primary" />
                </span>
              </div>
            </div>
            <span className="absolute -left-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg sm:-left-5 sm:-top-5">
              <Users className="h-7 w-7" />
            </span>
          </div>

          <div>
            <p className="mb-3 inline-block rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-primary">
              Why learners choose us
            </p>
            <h2 className="font-display text-2xl font-bold leading-tight text-forest sm:text-4xl">
              Join Live Online Classes Led By Expert Tutors
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Structured courses combining live interactive classes with recorded
              lessons and downloadable study materials—learn anywhere, on any
              device.
            </p>

            <ul className="mt-6 space-y-5">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-forest">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8">
              <Link href="/about">
                More About ICAN <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="bg-mint-soft/60 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Our courses
              </p>
              <h2 className="font-display text-2xl font-bold text-forest sm:text-4xl">
                Join Our Online Classes
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Structured, expert-led courses for learners at every level.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/courses">
                View All Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course: Record<string, unknown>) => (
                <CourseCard
                  key={course.id as string}
                  course={course as never}
                  tutorName={
                    (course.profiles as { full_name?: string })?.full_name
                  }
                  categoryName={
                    (course.course_categories as { name?: string })?.name
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No courses available yet"
              description="Courses will appear here once published. Check back soon."
            />
          )}
        </div>
      </section>

      {/* Featured tutors */}
      {tutors.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Our team
            </p>
            <h2 className="font-display text-2xl font-bold text-forest sm:text-4xl">
              Learn With Expert Tutors
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor: Record<string, unknown>) => {
              const profile = tutor.profiles as
                | { full_name?: string; avatar_url?: string }
                | null
              return (
                <TutorCard
                  key={tutor.id as string}
                  tutor={{
                    id: tutor.id as string,
                    full_name: profile?.full_name || null,
                    avatar_url: profile?.avatar_url || null,
                    specialization: tutor.specialization as string | null,
                    qualification: tutor.qualification as string | null,
                    bio: tutor.bio as string | null,
                  }}
                />
              )
            })}
          </div>
        </section>
      )}

      {/* Upcoming live classes */}
      {liveClasses.length > 0 && (
        <section className="bg-forest py-14 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mint">
                Live schedule
              </p>
              <h2 className="font-display text-2xl font-bold sm:text-4xl">
                Upcoming Live Classes
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">
                Join our interactive live sessions and learn in real time.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveClasses.map((lc: Record<string, unknown>) => (
                <LiveClassCard
                  key={lc.id as string}
                  liveClass={lc as never}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest to-primary-dark px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,233,172,0.2),transparent_60%)]" />
          <div className="relative">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-mint">
              <CheckCircle2 className="h-4 w-4" /> Start today
            </span>
            <h2 className="font-display text-2xl font-bold sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 sm:text-base">
              Join ICAN Learning and study with expert tutors through live
              classes, recorded lessons, and structured materials.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-mint text-forest hover:bg-white"
              >
                <Link href="/register">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:border-mint hover:text-mint"
              >
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
