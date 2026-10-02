import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface LiveClassCardProps {
  liveClass: {
    id: string
    title: string
    platform: string
    scheduled_date: string
    start_time: string | null
    courses: { title: string; slug: string } | null
  }
}

export function LiveClassCard({ liveClass }: LiveClassCardProps) {
  const date = new Date(liveClass.scheduled_date)
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{liveClass.title}</CardTitle>
        {liveClass.courses && (
          <p className="text-sm text-muted-foreground">
            {liveClass.courses.title}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </div>
        {liveClass.start_time && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {liveClass.start_time}
          </div>
        )}
        <Badge variant="outline">{liveClass.platform.replace("_", " ")}</Badge>
        {liveClass.courses && (
          <div className="pt-2">
            <Link
              href={`/courses/${liveClass.courses.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View Course
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
