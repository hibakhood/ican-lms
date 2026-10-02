import { SectionHeader } from "@/components/shared/section-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Video, Award } from "lucide-react"

export const metadata = {
  title: "About | ICAN LMS",
  description: "About ICAN Learning Management System",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="About ICAN Learning"
        description="Professional online learning platform"
        className="mb-8"
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Learning Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              ICAN Learning is built on the principle of structured, progressive
              education. We focus on delivering well-organized content that
              builds knowledge step by step.
            </p>
            <p>
              Our platform combines recorded lessons for flexible self-paced
              learning with live interactive classes that encourage engagement
              and clarification.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <BookOpen className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">Structured Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Organized modules and lessons for clear progression
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">Expert Instruction</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Qualified tutors with professional expertise
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Video className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">Flexible Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Learn anytime with recorded content and scheduled live sessions
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Award className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">Practical Focus</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Emphasis on real-world application and exam preparation
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
