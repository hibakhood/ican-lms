import Link from "next/link"
import { CourseCard } from "@/components/shared/course-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Search } from "lucide-react"
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
        Our courses
      </p>
      <h1 className="font-display text-3xl font-bold text-forest sm:text-5xl">
        Course Catalogue
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Browse our collection of professional courses. Filter by category or
        search for a topic to get started.
      </p>

      <div className="mt-8 flex flex-col gap-5">
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

      <div className="mt-8">
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
        ) : (
          <EmptyState
            title="No courses found"
            description="Try adjusting your search or category filter, or check back later."
          />
        )}
      </div>
    </div>
  )
}
