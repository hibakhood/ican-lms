import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminUsersPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="mt-6 space-y-4">
        {users?.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{u.full_name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <Badge>{u.role}</Badge>
                  <span className="text-sm text-muted-foreground">{u.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
