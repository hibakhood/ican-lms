import { requireRole } from '@/lib/auth'

export default async function TutorProfilePage() {
  const profile = await requireRole('tutor')
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="mt-2 text-muted-foreground">{profile.full_name}</p>
    </div>
  )
}
