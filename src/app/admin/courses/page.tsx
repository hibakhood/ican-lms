import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminCoursesPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: courses } = await supabase
    .from('courses')
    .select('*, profiles:tutor_id(full_name), course_categories:category_id(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="mt-6 space-y-4">
        {courses?.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Tutor: {c.profiles?.full_name} • {c.course_categories?.name}
                  </p>
                </div>
                <Badge variant={c.status === 'published' ? 'default' : 'secondary'}>
                  {c.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
