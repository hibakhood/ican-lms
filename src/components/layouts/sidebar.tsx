import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarNavItem {
  title: string
  href: string
}

interface SidebarProps {
  items: SidebarNavItem[]
  className?: string
}

export function Sidebar({ items, className }: SidebarProps) {
  return (
    <aside className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
