import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Learn. Prepare. Achieve.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Structured learning with expert tutors, recorded lessons, live
            interactive classes, and comprehensive study materials—all in one
            professional learning platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Structured Learning</h3>
              <p className="text-center text-sm text-muted-foreground">
                Well-organized modules and lessons for progressive learning
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <Video className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Live & Recorded Classes</h3>
              <p className="text-center text-sm text-muted-foreground">
                Learn at your pace with recordings and interactive live sessions
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Expert Tutors</h3>
              <p className="text-center text-sm text-muted-foreground">
                Learn from qualified tutors with real expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
