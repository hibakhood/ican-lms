import { notFound } from "next/navigation"
import { getCourseBySlug } from "@/services/courses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, User } from "lucide-react"
import Link from "next/link"
import { SectionHeader } from "@/components/shared/section-header"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const result = await getCourseBySlug(courseId)
  const course = result.data
  if (!course) return { title: "Course Not Found" }
  return {
    title: course.title,
    description: course.description || "ICAN LMS course",
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const result = await getCourseBySlug(courseId)
  const course = result.data

  if (!course) {
    notFound()
  }

  const modules = course.modules || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {course.title}
              </h1>
              {course.description && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {course.description}
                </p>
              )}
            </div>

            {course.learning_outcomes && course.learning_outcomes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    {course.learning_outcomes.map((outcome: string, i: number) => (
                      <li key={i} className="text-muted-foreground">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {modules.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modules
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((module: any) => (
                      <div key={module.id} className="space-y-2">
                        <h3 className="font-semibold">
                          Module {module.order}: {module.title}
                        </h3>
                        {module.lessons && module.lessons.length > 0 && (
                          <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
                            {module.lessons
                              .sort((a: any, b: any) => a.order - b.order)
                              .map((lesson: any) => (
                                <li key={lesson.id} className="flex items-center gap-2">
                                  <BookOpen className="h-3 w-3" />
                                  {lesson.title}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.thumbnail_url && (
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {course.profiles?.full_name || "Tutor"}
                </span>
              </div>
              {course.course_categories?.name && (
                <Badge variant="secondary">{course.course_categories.name}</Badge>
              )}
              {course.level && (
                <Badge variant="outline">{course.level}</Badge>
              )}
              {course.duration_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration_hours} hours</span>
                </div>
              )}
              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/register">Register to Start Learning</Link>
                </Button>
                <Button asChild variant="outline" className="mt-2 w-full">
                  <Link href="/login">Login to Continue</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
