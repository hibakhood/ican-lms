import { createClient } from '@/lib/supabase/server'

export async function getUpcomingLiveClasses(limit = 3) {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('live_classes')
    .select(`
      *,
      courses:course_id(title, slug),
      profiles:tutor_id(full_name)
    `)
    .gte('scheduled_date', today)
    .eq('status', 'scheduled')
    .order('scheduled_date', { ascending: true })
    .limit(limit)

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}
