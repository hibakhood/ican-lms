import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function TutorDashboard() {
  const profile = await requireRole('tutor')
  const supabase = await createClient()

  const tutorId = profile.id
  const { count: myCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('tutor_id', tutorId)

  const { count: published } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('tutor_id', tutorId)
    .eq('status', 'published')

  const { count: draft } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('tutor_id', tutorId)
    .eq('status', 'draft')

  const { count: lessons } = await supabase
    .from('lessons')
    .select('*, modules!inner(courses!inner(tutor_id))', { count: 'exact', head: true })
    .eq('modules.courses.tutor_id', tutorId)

  const { count: students } = await supabase
    .from('course_enrollments')
    .select('*, courses!inner(tutor_id)', { count: 'exact', head: true })
    .eq('courses.tutor_id', tutorId)

  const today = new Date().toISOString().split('T')[0]
  const { count: upcoming } = await supabase
    .from('live_classes')
    .select('*', { count: 'exact', head: true })
    .eq('tutor_id', tutorId)
    .gte('scheduled_date', today)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myCourses || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{published || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draft || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Live Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcoming || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
