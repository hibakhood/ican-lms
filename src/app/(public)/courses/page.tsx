import Link from "next/link"
import { CourseCard } from "@/components/shared/course-card"
import { EmptyState } from "@/components/shared/empty-state"
import { SmartImage } from "@/components/shared/smart-image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import { getAllPublishedCourses, getCategoriesForFilter } from "@/services/courses"
import { cn } from "@/lib/utils"

export async function generateMetadata() {
  return {
    title: "Courses",
    description: "Browse the ICAN Learning catalogue of professional online courses.",
  }
}

type Course = {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  category_id: string | null
  level: string | null
  duration_hours: number | null
  is_free: boolean
  profiles?: { full_name: string | null }
  course_categories?: { name: string | null }
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const { search, category } = await searchParams
  const [result, categoriesResult] = await Promise.all([
    getAllPublishedCourses(),
    getCategoriesForFilter(),
  ])
  let courses = (result.data || []) as Course[]
  const categories = categoriesResult.data || []

  if (search) {
    const term = search.toLowerCase()
    courses = courses.filter(
      (c) =>
        c.title?.toLowerCase().includes(term) ||
        c.description?.toLowerCase().includes(term)
    )
  }
  if (category) {
    courses = courses.filter((c) => c.category_id === category)
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80"
            alt="Student browsing between library shelves"
            sizes="100vw"
            className="object-cover object-center"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
          <h1 className="max-w-2xl font-display font-extrabold tracking-tight text-white [font-size:clamp(2rem,4.5vw,3.25rem)]">
            Course Catalogue
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Browse our collection of professional courses. Filter by category
            or search for a topic to get started.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-5">
          <form className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="search"
              defaultValue={search || ""}
              placeholder="Search courses..."
              aria-label="Search courses"
              className="h-11 w-full rounded-full border border-mint-soft bg-mint-soft/50 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white"
            />
          </form>

          <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Link
              href="/courses"
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                !category
                  ? "border-primary bg-primary text-white"
                  : "border-mint-soft bg-white text-forest hover:border-primary hover:text-primary"
              )}
            >
              All
            </Link>
            {categories.map((cat: { id: string; name: string }) => (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.id}`}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  category === cat.id
                    ? "border-primary bg-primary text-white"
                    : "border-mint-soft bg-white text-forest hover:border-primary hover:text-primary"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  tutorName={course.profiles?.full_name || undefined}
                  categoryName={course.course_categories?.name || undefined}
                />
              ))}
            </div>
          ) : search || category ? (
            <EmptyState
              title="No courses found"
              description="Try adjusting your search or category filter, or check back later."
            />
          ) : (
            <div className="grid items-stretch gap-6 overflow-hidden rounded-3xl border border-mint-soft bg-mint-soft/40 p-6 sm:grid-cols-2 sm:p-10">
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
                <SmartImage
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80"
                  alt="Open books and notes on a study desk"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="aspect-[4/3] sm:aspect-auto sm:h-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-display text-xl font-bold text-forest sm:text-2xl">
                  The catalogue is being prepared
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Our tutors are putting the finishing touches on the first
                  courses. In the meantime, create an account so you can enrol
                  the moment a course opens.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/register">
                      Create a free account{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
