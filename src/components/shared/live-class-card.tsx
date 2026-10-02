import Link from "next/link"
import { ArrowRight, Calendar, Clock, Radio } from "lucide-react"
import { SmartImage } from "@/components/shared/smart-image"

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

const platformLabels: Record<string, string> = {
  youtube_live: "YouTube Live",
  google_meet: "Google Meet",
  zoom: "Zoom",
}

const platformImages: Record<string, string> = {
  youtube_live:
    "/images/pexels-pavel-danilyuk-7654129.jpg",
  google_meet:
    "/images/pexels-pavel-danilyuk-7654129.jpg",
  zoom: "/images/pexels-pavel-danilyuk-7654129.jpg",
}

export function LiveClassCard({ liveClass }: LiveClassCardProps) {
  const date = new Date(liveClass.scheduled_date + "T00:00:00")
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mint-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          src={platformImages[liveClass.platform]}
          alt={`Live class on ${platformLabels[liveClass.platform] || liveClass.platform}`}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
          Live
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest backdrop-blur-sm">
          {platformLabels[liveClass.platform] || liveClass.platform}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-forest">
          {liveClass.title}
        </h3>
        {liveClass.courses && (
          <p className="mt-1 text-sm text-muted-foreground">
            {liveClass.courses.title}
          </p>
        )}

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {formattedDate}
          </p>
          {liveClass.start_time && (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {liveClass.start_time}
            </p>
          )}
        </div>

        <div className="mt-auto pt-5">
          {liveClass.courses ? (
            <Link
              href={`/courses/${liveClass.courses.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View course <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              Schedule announced soon
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
