import { TutorCard } from "@/components/shared/tutor-card"
import { SmartImage } from "@/components/shared/smart-image"
import { EmptyState } from "@/components/shared/empty-state"
import { getAllTutors } from "@/services/tutors"

export async function generateMetadata() {
  return {
    title: "Tutors",
    description: "Meet the expert tutors behind ICAN Learning courses.",
  }
}

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
    <div>
      <section className="relative isolate overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80"
            alt="Tutor leading a class"
            sizes="100vw"
            className="object-cover object-center"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl font-display font-extrabold tracking-tight text-white [font-size:clamp(2rem,4.5vw,3.25rem)]">
            Learn from tutors who know the work
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Every tutor owns and maintains their own courses—so what you study
            is always current, accurate, and taught with real professional
            experience.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
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
            title="Tutor profiles are being added"
            description="Our teaching team is being onboarded. Check back soon—or create an account to be notified when courses open."
          />
        )}
      </section>
    </div>
  )
}
