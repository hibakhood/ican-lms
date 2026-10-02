import { CourseCard } from "@/components/shared/course-card"
import { EmptyState } from "@/components/shared/empty-state"
import { SectionHeader } from "@/components/shared/section-header"
import { Input } from "@/components/ui/input"
import { getAllPublishedCourses } from "@/services/courses"

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
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams
  const result = await getAllPublishedCourses()
  let courses = (result.data || []) as Course[]

  if (search) {
    const term = search.toLowerCase()
    courses = courses.filter(
      (c) =>
        c.title?.toLowerCase().includes(term) ||
        c.description?.toLowerCase().includes(term)
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Courses"
        description="Browse our collection of professional courses"
        className="mb-6"
      />
      <div className="mb-6 max-w-md">
        <form>
          <Input
            name="search"
            placeholder="Search courses..."
            defaultValue={search || ""}
          />
        </form>
      </div>
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
          description="Try adjusting your search or check back later"
        />
      )}
    </div>
  )
}
