import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Course = {
  title: string | null
  slug: string | null
  id: string
}

type Enrollment = {
  id: string
  progress_percentage: number | null
  courses: Course | null
}

type LiveClass = {
  id: string
  title: string | null
  platform: string | null
  scheduled_date: string | null
  courses: { title: string | null; slug: string | null } | null
}

export default async function StudentDashboard() {
  const profile = await requireRole('student')
  const supabase = await createClient()
  const studentId = profile.id

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('*, courses(title, thumbnail_url, slug, id)')
    .eq('student_id', studentId)
    .eq('status', 'active')

  const today = new Date().toISOString().split('T')[0]
  const { data: liveClasses } = await supabase
    .from('live_classes')
    .select('*, courses(title, slug)')
    .gte('scheduled_date', today)
    .eq('status', 'scheduled')

  const enrolled = (enrollments || []) as unknown as Enrollment[]
  const upcoming = (liveClasses || []) as unknown as LiveClass[]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Welcome, {profile.full_name}</h1>
      <div className="mt-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">My Courses</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((e) => (
              <Card key={e.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{e.courses?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Progress: {e.progress_percentage ?? 0}%
                  </p>
                  <Button asChild className="mt-4 w-full">
                    <Link href={`/student/courses/${e.courses?.slug || e.courses?.id}`}>
                      Continue Learning
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {upcoming.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold">Upcoming Live Classes</h2>
            <div className="mt-4 space-y-4">
              {upcoming.map((lc) => (
                <Card key={lc.id}>
                  <CardContent className="p-4">
                    <p className="font-medium">{lc.title}</p>
                    <p className="text-sm text-muted-foreground">{lc.courses?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lc.scheduled_date} • {lc.platform}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
