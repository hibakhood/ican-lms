import { createClient } from '@/lib/supabase/server'

export async function getFeaturedTutors(limit = 3) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tutor_profiles')
    .select(`
      *,
      profiles:profile_id(full_name, avatar_url)
    `)
    .limit(limit)

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}

export async function getAllTutors() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tutor_profiles')
    .select(`
      *,
      profiles:profile_id(full_name, avatar_url, email)
    `)

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}
