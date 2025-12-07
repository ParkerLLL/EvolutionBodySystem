"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, LayoutDashboard, Settings, User, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Sidebar() {
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
        {
            href: "/admin",
            icon: Settings,
            label: "Admin", // Hidden for normal users later
        },
    ]

    return (
        <aside className="hidden h-screen w-64 flex-col border-r bg-muted/40 md:flex sticky top-0">
            <div className="flex h-14 items-center border-b px-6 font-semibold tracking-tight">
                Evolution Body
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    isActive
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ModeToggle />
                </div>
            </div>
        </aside>
    )
}
