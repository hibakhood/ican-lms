import { Hero } from "@/components/shared/hero"
import { SectionHeader } from "@/components/shared/section-header"
import { CourseCard } from "@/components/shared/course-card"
import { TutorCard } from "@/components/shared/tutor-card"
import { LiveClassCard } from "@/components/shared/live-class-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getFeaturedCourses } from "@/services/courses"
import { getFeaturedTutors } from "@/services/tutors"
import { getUpcomingLiveClasses } from "@/services/live-classes"
import { BookOpen, Award, Clock, Users } from "lucide-react"

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

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            title="Featured Courses"
            description="Explore our curated collection of professional courses"
          />
          <Button asChild variant="outline">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <CourseCard
                key={course.id}
                course={course}
                tutorName={course.profiles?.full_name}
                categoryName={course.course_categories?.name}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No courses available"
            description="Courses will appear here once published"
          />
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Choose ICAN Learning"
            description="A modern approach to professional education"
            className="mb-8 text-center"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Structured Curriculum</h3>
              <p className="text-sm text-muted-foreground">
                Progressive learning path designed for maximum retention
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Expert Tutors</h3>
              <p className="text-sm text-muted-foreground">
                Learn from qualified and experienced instructors
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Flexible Learning</h3>
              <p className="text-sm text-muted-foreground">
                Study at your own pace with 24/7 access to materials
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <Award className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Practical Focus</h3>
              <p className="text-sm text-muted-foreground">
                Real-world applications and exam-focused preparation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      {tutors.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              title="Featured Tutors"
              description="Learn from our expert instructors"
            />
            <Button asChild variant="outline">
              <Link href="/tutors">View All Tutors</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor: any) => (
              <TutorCard
                key={tutor.id}
                tutor={{
                  id: tutor.id,
                  full_name: tutor.profiles?.full_name,
                  avatar_url: tutor.profiles?.avatar_url,
                  specialization: tutor.specialization,
                  qualification: tutor.qualification,
                  bio: tutor.bio,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Live Classes */}
      {liveClasses.length > 0 && (
        <section className="bg-muted/20 py-12">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Upcoming Live Classes"
              description="Join our interactive live sessions"
              className="mb-8"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveClasses.map((lc: any) => (
                <LiveClassCard key={lc.id} liveClass={lc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to start learning?
          </h2>
          <p className="mt-2 text-primary-foreground/90">
            Join thousands of learners on ICAN Learning today
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
