"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SmartImage } from "@/components/shared/smart-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowRight, BookOpen, UserRound, LogIn, UserPlus } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

const quickLinks = [
  {
    href: "/courses",
    icon: BookOpen,
    label: "Browse courses",
    text: "See the catalogue, categories, and search for a topic.",
  },
  {
    href: "/register",
    icon: UserPlus,
    label: "Create an account",
    text: "Register as a student in under a minute.",
  },
  {
    href: "/login",
    icon: LogIn,
    label: "Sign in",
    text: "Return to your dashboard and continue learning.",
  },
  {
    href: "/tutors",
    icon: UserRound,
    label: "Meet the tutors",
    text: "Every course is owned by the tutor who teaches it.",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    // Placeholder - integration point for Supabase/n8n/Resend
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubmitted(true)
    reset()
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/pexels-rdne-7947637.jpg"
            alt="Group of learners together outdoors"
            sizes="100vw"
            className="object-cover object-center"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-forest-dark/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl font-display font-extrabold tracking-tight text-white [font-size:clamp(2rem,4.5vw,3.25rem)]">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Questions about courses, live classes, or your account? Send us a
            message and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Card className="rounded-3xl shadow-sm ring-mint-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl font-bold text-forest">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-soft text-primary"
                  >
                    <CheckCircle className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-forest">
                    Message sent successfully
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for contacting us. We&apos;ll get back to you soon.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" {...register("subject")} />
                    {errors.subject && (
                      <p className="text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <aside className="rounded-3xl bg-forest p-8 text-white">
            <h2 className="font-display text-xl font-bold">
              Find your way around
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Most questions are answered a click away.
            </p>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="group flex items-start gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/25"
                    >
                      <q.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-semibold">
                        {q.label}
                        <ArrowRight
                          className="h-3.5 w-3.5 text-mint transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/70">
                        {q.text}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  )
}
