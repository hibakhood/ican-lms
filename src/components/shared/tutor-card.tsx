import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-col items-center text-center">
        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
          {tutor.avatar_url ? (
            <img
              src={tutor.avatar_url}
              alt={tutor.full_name || "Tutor"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <User className="h-10 w-10" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold">
          {tutor.full_name || "Unknown Tutor"}
        </h3>
        {tutor.qualification && (
          <p className="text-sm text-muted-foreground">{tutor.qualification}</p>
        )}
        {tutor.specialization && (
          <Badge variant="secondary" className="mt-2">
            {tutor.specialization}
          </Badge>
        )}
      </CardHeader>
      {tutor.bio && (
        <CardContent>
          <p className="line-clamp-3 text-center text-sm text-muted-foreground">
            {tutor.bio}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
