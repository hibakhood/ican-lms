import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock } from "lucide-react"

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
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full bg-muted">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <BookOpen className="h-10 w-10" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        </div>
        {course.category_id && categoryName && (
          <Badge variant="secondary" className="w-fit">
            {categoryName}
          </Badge>
        )}
        {course.level && (
          <Badge variant="outline" className="w-fit">
            {course.level}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {course.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        {tutorName && (
          <p className="text-sm text-muted-foreground">By {tutorName}</p>
        )}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {course.duration_hours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.duration_hours}h
              </span>
            )}
          </div>
          <Link
            href={`/courses/${course.slug || course.id}`}
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View Course
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
