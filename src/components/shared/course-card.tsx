import Link from "next/link"
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  course: {
    id: string
    title: string
    slug: string
    description: string | null
    thumbnail_url: string | null
    category_id: string | null
    level: string | null
    duration_hours: number | null
    is_free: boolean
  }
  tutorName?: string
  categoryName?: string
}

export function CourseCard({ course, tutorName, categoryName }: CourseCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mint-soft bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video w-full bg-gradient-to-br from-forest to-primary-dark">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-mint/70" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {course.is_free ? "Free" : "Course"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          {course.category_id && categoryName && (
            <span className="rounded-full bg-mint-soft px-2.5 py-1 text-forest">
              {categoryName}
            </span>
          )}
          {course.level && (
            <span className="capitalize text-primary">{course.level}</span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-forest">
          {course.title}
        </h3>

        {course.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          {tutorName && (
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Teacher: <span className="text-forest">{tutorName}</span>
            </p>
          )}
          <div className="flex items-center justify-between border-t border-mint-soft pt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {course.duration_hours ? `${course.duration_hours}h` : "Self-paced"}
            </span>
            <Link
              href={`/courses/${course.slug || course.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View Course <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
