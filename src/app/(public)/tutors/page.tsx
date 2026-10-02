import { TutorCard } from "@/components/shared/tutor-card"
import { EmptyState } from "@/components/shared/empty-state"
import { SectionHeader } from "@/components/shared/section-header"
import { getAllTutors } from "@/services/tutors"

type Tutor = {
  id: string
  specialization: string | null
  qualification: string | null
  bio: string | null
  profiles?: { full_name: string | null; avatar_url: string | null }
}

export default async function TutorsPage() {
  const result = await getAllTutors()
  const tutors = (result.data || []) as Tutor[]

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Our Tutors"
        description="Meet our team of experienced professional tutors"
        className="mb-6"
      />
      {tutors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={{
                id: tutor.id,
                full_name: tutor.profiles?.full_name || null,
                avatar_url: tutor.profiles?.avatar_url || null,
                specialization: tutor.specialization,
                qualification: tutor.qualification,
                bio: tutor.bio,
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tutors available"
          description="Tutors will appear here once added to the platform"
        />
      )}
    </div>
  )
}
