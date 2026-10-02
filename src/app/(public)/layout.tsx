import type { Metadata } from "next"
import { Navbar } from "@/components/layouts/navbar"
import { Footer } from "@/components/layouts/footer"

export const metadata: Metadata = {
  title: {
    default: "ICAN Learning - Online Learning Management System",
    template: "%s | ICAN Learning",
  },
  description:
    "Structured online learning with expert tutors, recorded lessons, live interactive classes, and professional study materials.",
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
