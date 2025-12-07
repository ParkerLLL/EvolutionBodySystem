"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert, Users, Dumbbell, LayoutDashboard, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isAdmin] = useState(true) // Mock RBAC

    if (!isAdmin) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4 text-center">
                <ShieldAlert className="h-16 w-16 text-destructive" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You do not have permission to view this area.</p>
                <Button asChild variant="outline">
                    <Link href="/dashboard">Return to App</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            {/* Admin Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-muted/40 md:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <ShieldAlert className="h-6 w-6" />
                        <span className="">Evolution Admin</span>
                    </Link>
                </div>
                <ScrollArea className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2 py-4">
                        <Link
                            href="/admin"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/admin' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/exercises"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/admin/exercises') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <Dumbbell className="h-4 w-4" />
                            Exercise Manager
                        </Link>
                        <Link
                            href="/admin/users"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/admin/users') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <Users className="h-4 w-4" />
                            User Management
                        </Link>
                        <Link
                            href="/admin/settings"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/admin/settings') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <Settings className="h-4 w-4" />
                            System Settings
                        </Link>
                    </nav>
                </ScrollArea>
                <div className="p-4 border-t">
                    <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/dashboard">Exit Admin</Link>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col md:pl-64 w-full">
                <main className="flex-1 p-4 lg:p-6 bg-muted/10">
                    {children}
                </main>
            </div>
        </div>
    )
}
