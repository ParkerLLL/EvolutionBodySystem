"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, LayoutDashboard, User, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    const items = [
        {
            href: "/dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
        },
        {
            href: "/training",
            icon: Dumbbell,
            label: "Training",
        },
        {
            href: "/nutrition",
            icon: Utensils,
            label: "Nutrition",
        },
        {
            href: "/profile",
            icon: User,
            label: "Profile",
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg md:hidden">
            <div className="flex h-16 items-center justify-around px-4">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
