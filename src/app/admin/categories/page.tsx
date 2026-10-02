import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminCategoriesPage() {
  await requireRole('admin')
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('course_categories')
    .select('*')
    .order('name')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Course Categories</h1>
      <div className="mt-6 space-y-4">
        {categories?.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{c.name}</p>
                <Badge variant={c.is_active ? 'default' : 'secondary'}>
                  {c.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
