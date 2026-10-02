interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-2xl font-bold tracking-tight text-forest sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
