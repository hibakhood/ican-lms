import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminLessonsPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*, modules(title, courses(title))')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Lessons</h1>
      <div className="mt-6 space-y-4">
        {lessons?.map((l) => (
          <Card key={l.id}>
            <CardContent className="p-4">
              <p className="font-medium">{l.title}</p>
              <p className="text-sm text-muted-foreground">
                {l.modules?.courses?.title} • {l.modules?.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
