import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { SmartImage } from "@/components/shared/smart-image"

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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mint-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden">
        <SmartImage
          src={course.thumbnail_url}
          alt={course.title}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-sm backdrop-blur-sm">
          {course.is_free ? "Free course" : "Course"}
        </span>
        {course.level && (
          <span className="absolute right-4 top-4 rounded-full bg-forest/80 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
            {course.level}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {course.category_id && categoryName && (
          <span className="w-fit rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-primary">
            {categoryName}
          </span>
        )}

        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-forest">
          {course.title}
        </h3>

        {course.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {course.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          {tutorName && (
            <p className="mb-4 text-xs font-medium text-muted-foreground">
              Taught by <span className="text-forest">{tutorName}</span>
            </p>
          )}
          <div className="flex items-center justify-between border-t border-mint-soft pt-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {course.duration_hours ? `${course.duration_hours}h` : "Self-paced"}
            </span>
            <Link
              href={`/courses/${course.slug || course.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
