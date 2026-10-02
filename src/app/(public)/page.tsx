import Link from "next/link"
import { Hero } from "@/components/shared/hero"
import { CourseCard } from "@/components/shared/course-card"
import { TutorCard } from "@/components/shared/tutor-card"
import { LiveClassCard } from "@/components/shared/live-class-card"
import { SmartImage } from "@/components/shared/smart-image"
import { Button } from "@/components/ui/button"
import { getFeaturedCourses } from "@/services/courses"
import { getFeaturedTutors } from "@/services/tutors"
import { getUpcomingLiveClasses } from "@/services/live-classes"
import {
  ArrowRight,
  Radio,
  MonitorPlay,
  FileText,
  UserRoundCheck,
  ClipboardCheck,
  PlayCircle,
  GraduationCap,
} from "lucide-react"

const learningFormats = [
  {
    icon: Radio,
    title: "Live Interactive Classes",
    text: "Join scheduled ICAN-focused sessions. Ask questions in real time and learn directly from qualified practitioners.",
    image: "/images/pexels-pavel-danilyuk-7654129.jpg",
    alt: "Live interactive class session between tutor and students",
  },
  {
    icon: MonitorPlay,
    title: "Recorded Video Lessons",
    text: "Every live class is recorded and organised per lesson, so you can revise any ICAN topic as often as you need.",
    image: "/images/pexels-tima-miroshnichenko-6694964.jpg",
    alt: "Student reviewing recorded study material on a laptop",
  },
  {
    icon: FileText,
    title: "Professional Study Materials",
    text: "Lecture notes, practice questions, worked solutions and summaries—structured to match ICAN’s levels and ready when you are.",
    image: "/images/pexels-polina-tankilevitch-4443181.jpg",
    alt: "Organised study notes and materials on a desk",
  },
]

const steps = [
  {
    icon: UserRoundCheck,
    title: "Create your account",
    text: "Register as a student in under a minute—no paperwork, no setup fees.",
  },
  {
    icon: GraduationCap,
    title: "Enroll in a course",
    text: "Browse the catalogue, read the curriculum, and enrol in the course that fits your goals.",
  },
  {
    icon: PlayCircle,
    title: "Learn your way",
    text: "Attend live classes, watch recorded lessons, and work through the materials at your pace.",
  },
  {
    icon: ClipboardCheck,
    title: "Track your progress",
    text: "Mark lessons complete, see your course progress, and take quizzes to check your understanding.",
  },
]

export default async function HomePage() {
  const [coursesResult, tutorsResult, liveClassesResult] = await Promise.all([
    getFeaturedCourses(6),
    getFeaturedTutors(3),
    getUpcomingLiveClasses(3),
  ])

  const courses = coursesResult.data || []
  const tutors = tutorsResult.data || []
  const liveClasses = liveClassesResult.data || []

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Learning formats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3.5vw,2.75rem)]">
            Three ways to learn, one platform
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every ICAN course combines scheduled live teaching, on-demand
            recordings, and structured materials—so learning keeps moving even
            when life gets busy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {learningFormats.map((f) => (
            <article
              key={f.title}
              className="group overflow-hidden rounded-3xl border border-mint-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={f.image}
                  alt={f.alt}
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-forest">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-forest py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-display font-bold tracking-tight [font-size:clamp(1.75rem,3.5vw,2.75rem)]">
                From sign-up to your first lesson
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A straightforward path into the classroom. No installations, no
                complicated setup—everything runs in your browser.
              </p>
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
                <SmartImage
                  src="/images/pexels-mizunokozuki-12912080.jpg"
                  alt="Student taking structured notes during an ICAN study session"
                  sizes="(max-width: 1024px) 0vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
              </div>
            </div>

            <ol className="relative space-y-8">
              <span
                aria-hidden="true"
                className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/15 sm:block"
              />
              {steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-5">
                  <span
                    aria-hidden="true"
                    className="relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-mint/30 bg-forest font-display text-sm font-bold text-mint sm:flex"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:border-transparent sm:bg-transparent sm:p-0">
                    <div className="flex items-center gap-3">
                      <s.icon className="h-5 w-5 text-mint sm:hidden" aria-hidden="true" />
                      <h3 className="font-display text-lg font-semibold">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3.5vw,2.75rem)]">
              Featured courses
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Expert-led courses with structured modules, live sessions, and
              everything you need to prepare with confidence.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses">
              Browse all courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {courses.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: Record<string, unknown>) => (
              <CourseCard
                key={course.id as string}
                course={course as never}
                tutorName={(course.profiles as { full_name?: string })?.full_name}
                categoryName={(course.course_categories as { name?: string })?.name}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid items-stretch gap-6 overflow-hidden rounded-3xl border border-mint-soft bg-mint-soft/40 p-6 sm:grid-cols-2 sm:p-10">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
              <SmartImage
                src="/images/pexels-n-voitkevich-6863182.jpg"
                alt="Open books and organised study materials for exam preparation"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[4/3] sm:aspect-auto sm:h-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-forest sm:text-2xl">
                The catalogue is being prepared
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our tutors are putting the finishing touches on the first
                courses. In the meantime, create an account so you can enrol the
                moment a course opens.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/register">
                    Create a free account <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Upcoming live classes */}
      <section className="bg-mint-soft/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3.5vw,2.75rem)]">
              Upcoming live classes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Real-time teaching with space for questions—join from the
              student dashboard the moment your class begins.
            </p>
          </div>

          {liveClasses.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveClasses.map((lc: Record<string, unknown>) => (
                <LiveClassCard key={lc.id as string} liveClass={lc as never} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center rounded-3xl border border-mint-soft bg-white p-8 text-center shadow-sm sm:p-10">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-soft text-primary"
              >
                <Radio className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-forest">
                No classes scheduled right now
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                New live sessions are added weekly by our tutors. Enrol in a
                course to receive its class schedule.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/courses">View courses</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured tutors */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display font-bold tracking-tight text-forest [font-size:clamp(1.75rem,3.5vw,2.75rem)]">
              Taught by people who know the work
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our tutors are qualified practitioners who teach the way the
              profession actually works—clear explanations, worked examples,
              and honest feedback on your progress.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Qualified, reviewed tutor profiles",
                "Every course owned and maintained by its tutor",
                "Direct interaction during live sessions",
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
            <Button asChild className="mt-8">
              <Link href="/tutors">
                Meet our tutors <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {tutors.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {tutors.slice(0, 2).map((tutor: Record<string, unknown>) => {
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
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <SmartImage
                src="/images/pexels-pavel-danilyuk-7120911.jpg"
                alt="Qualified tutor guiding a focused study session"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/pexels-rdne-7947637.jpg"
            alt="Professional learning environment for focused exam preparation"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-forest-dark/85" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="font-display font-bold tracking-tight text-white [font-size:clamp(1.75rem,4vw,3rem)]">
            Your next lesson is waiting
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Create your free account today. Enrol when a course opens, join
            live classes from any device, and keep your progress in one place.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 bg-mint px-8 text-base text-forest hover:bg-white"
            >
              <Link href="/register">
                Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/30 bg-transparent px-8 text-base text-white hover:border-mint hover:text-mint"
            >
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
