import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminLiveClassesPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: liveClasses } = await supabase
    .from('live_classes')
    .select('*, courses(title), profiles:tutor_id(full_name)')
    .order('scheduled_date', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Live Classes</h1>
      <div className="mt-6 space-y-4">
        {liveClasses?.map((lc) => (
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
    </div>
  )
}
