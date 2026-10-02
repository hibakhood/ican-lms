import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminTutorsPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: tutors } = await supabase
    .from('profiles')
    .select('*, tutor_profiles(*)')
    .eq('role', 'tutor')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Tutors</h1>
      <div className="mt-6 space-y-4">
        {tutors?.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-4">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{t.full_name}</p>
                  <p className="text-sm text-muted-foreground">{t.email}</p>
                  {t.tutor_profiles && (
                    <p className="text-sm text-muted-foreground">
                      {t.tutor_profiles.qualification} • {t.tutor_profiles.specialization}
                    </p>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground sm:mt-0">
                  Status: {t.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
