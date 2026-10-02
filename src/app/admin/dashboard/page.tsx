import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, Calendar } from 'lucide-react'

export default async function AdminDashboard() {
  await requireRole('admin')
  const supabase = await createClient()

  const [
    { count: totalStudents },
    { count: totalTutors },
    { count: totalCourses },
    { count: publishedCourses },
    { count: draftCourses },
    { count: enrollments },
    { count: upcomingLive },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from('student_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('tutor_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('live_classes').select('*', { count: 'exact', head: true }).gte('scheduled_date', new Date().toISOString().split('T')[0]),
    supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTutors || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses || 0}</div>
            <p className="text-xs text-muted-foreground">
              {publishedCourses || 0} published • {draftCourses || 0} draft
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Live Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingLive || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
