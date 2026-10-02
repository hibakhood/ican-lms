import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function TutorMaterialsPage() {
  const profile = await requireRole('tutor')
  const supabase = await createClient()
  const { data: materials } = await supabase
    .from('lesson_materials')
    .select('*, lessons!inner(title, modules!inner(courses!inner(tutor_id)))')
    .eq('lessons.modules.courses.tutor_id', profile.id)
    .limit(50)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Materials</h1>
      <div className="mt-6 space-y-4">
        {materials?.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-4">
              <p className="font-medium">{m.title}</p>
              <p className="text-sm text-muted-foreground">{m.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
