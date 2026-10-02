import { createClient } from '@/lib/supabase/server'

export async function getActiveCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_categories')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}
