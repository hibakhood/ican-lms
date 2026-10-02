import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminAuditLogsPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: logs } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <div className="mt-6 space-y-4">
        {logs?.map((l) => (
          <Card key={l.id}>
            <CardContent className="p-4">
              <p className="font-medium">{l.action}</p>
              <p className="text-sm text-muted-foreground">{l.table_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
