import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminAnnouncementsPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <div className="mt-6 space-y-4">
        {announcements?.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
