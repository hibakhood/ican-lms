import { cn } from "@/lib/utils"

export function LoadingState({
  message = "Loading...",
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
