import { cn } from "@/lib/utils"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border bg-destructive/5 p-8 text-center",
        className
      )}
      {...props}
    >
      <h3 className="text-lg font-semibold text-destructive">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
