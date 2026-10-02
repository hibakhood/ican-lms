import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface TutorCardProps {
  tutor: {
    id: string
    full_name: string | null
    avatar_url: string | null
    specialization: string | null
    qualification: string | null
    bio: string | null
  }
}

export function TutorCard({ tutor }: TutorCardProps) {
  const initials = (tutor.full_name || "T")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <article className="flex h-full flex-col items-center rounded-2xl border border-mint-soft bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-mint-soft">
        {tutor.avatar_url ? (
          <img
            src={tutor.avatar_url}
            alt={tutor.full_name || "Tutor"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-xl font-bold text-primary">
            {initials}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-bold text-forest">
        {tutor.full_name || "Expert Tutor"}
      </h3>
      {tutor.qualification && (
        <p className="mt-1 text-sm text-muted-foreground">{tutor.qualification}</p>
      )}
      {tutor.specialization && (
        <Badge className="mt-3 rounded-full bg-mint-soft text-forest">
          {tutor.specialization}
        </Badge>
      )}
      {tutor.bio && (
        <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{tutor.bio}</p>
      )}
    </article>
  )
}
