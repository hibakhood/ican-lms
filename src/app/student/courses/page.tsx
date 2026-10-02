import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Course = {
  id: string
  title: string
  slug: string | null
}

type Enrollment = {
  id: string
  courses: Course | null
}

export default async function StudentCoursesPage() {
  const profile = await requireRole('student')
  const supabase = await createClient()
  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('*, courses(id, title, slug)')
    .eq('student_id', profile.id)

  const enrolled = (enrollments || []) as Enrollment[]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <div className="mt-6 space-y-4">
        {enrolled.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{e.courses?.title}</p>
                <Button asChild>
                  <Link href={`/student/courses/${e.courses?.slug || e.courses?.id}`}>
                    Open
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
