import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ICAN - Online Learning Management System",
  description: "ICAN Online Learning Management System",
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            ICAN LMS
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">Courses</Link>
            <Link href="/tutors" className="text-sm font-medium transition-colors hover:text-primary">Tutors</Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">About</Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</Link>
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">Login</Link>
            <Link href="/register" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">Register</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ICAN. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
