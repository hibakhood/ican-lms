import { createClient } from '@/lib/supabase/server'

export async function createNotification({
  userId,
  title,
  message,
  type = 'info',
  actionUrl,
}: {
  userId: string
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  actionUrl?: string | null
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('notifications').insert({
    user_id: userId,
    title,
    message,
    type,
    action_url: actionUrl || null,
  })
  return { error }
}

export async function triggerN8nWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET

  if (!webhookUrl) {
    return { success: false, error: 'N8N_WEBHOOK_URL not configured' }
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (webhookSecret) {
      headers['x-webhook-secret'] = webhookSecret
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return { success: false, error: `Webhook failed: ${res.status}` }
    }
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}
