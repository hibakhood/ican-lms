import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"

export const metadata = {
  title: "Resources | ICAN LMS",
  description: "Public learning resources",
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Public Resources"
        description="Free learning resources and materials"
        className="mb-6"
      />
      <EmptyState
        title="No public resources yet"
        description="Public resources will be added here as they become available"
      />
    </div>
  )
}
