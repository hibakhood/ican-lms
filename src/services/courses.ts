import { createClient } from '@/lib/supabase/server'

export async function getFeaturedCourses(limit = 6) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      profiles:tutor_id(full_name),
      course_categories:category_id(name)
    `)
    .eq('status', 'published')
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}

export async function getAllPublishedCourses() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      profiles:tutor_id(full_name),
      course_categories:category_id(name)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      profiles:tutor_id(full_name, avatar_url),
      course_categories:category_id(name),
      modules(
        id,
        title,
        order,
        lessons(id, title, order, is_published)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}
