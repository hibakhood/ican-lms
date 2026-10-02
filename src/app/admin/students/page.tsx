import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminStudentsPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: students } = await supabase
    .from('profiles')
    .select('*, student_profiles(*)')
    .eq('role', 'student')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Students</h1>
      <div className="mt-6 space-y-4">
        {students?.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{s.full_name}</p>
                  <p className="text-sm text-muted-foreground">{s.email}</p>
                  {s.phone && (
                    <p className="text-sm text-muted-foreground">{s.phone}</p>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground sm:mt-0">
                  Status: {s.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
