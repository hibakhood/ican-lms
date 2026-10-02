import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function TutorCoursesPage() {
  const profile = await requireRole('tutor')
  const supabase = await createClient()
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('tutor_id', profile.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button asChild>
          <Link href="/tutor/courses/new">New Course</Link>
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {courses?.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.status}</p>
                </div>
                <Badge>{c.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
