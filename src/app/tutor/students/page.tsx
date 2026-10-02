import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function TutorStudentsPage() {
  const profile = await requireRole('tutor')
  const supabase = await createClient()
  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('*, courses(title), profiles:student_id(full_name, email)')
    .eq('courses.tutor_id', profile.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">My Students</h1>
      <div className="mt-6 space-y-4">
        {enrollments?.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4">
              <p className="font-medium">{e.profiles?.full_name}</p>
              <p className="text-sm text-muted-foreground">{e.profiles?.email}</p>
              <p className="text-sm text-muted-foreground">{e.courses?.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
