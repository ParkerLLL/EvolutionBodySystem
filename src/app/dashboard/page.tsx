import { Zap, Activity, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { WeeklyProgress } from "@/components/dashboard/weekly-progress"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Focus</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Dec 08, Sun</span>
                </div>
            </div>

            {/* 1. Today's Mission (Hero) */}
            <Card className="border-l-4 border-l-primary shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary fill-primary" />
                        Today&apos;s Mission
                    </CardTitle>
                    <CardDescription>
                        High Carb Day • Push (Chest/Tri)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Daily Calories</span>
                                <span className="text-muted-foreground">1200 / 2800 kcal</span>
                            </div>
                            <Progress value={42} className="h-2" />
                        </div>

                        <Button className="w-full" size="lg">
                            Start Workout
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6 flex flex-col items-center gap-2 text-center">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-sm">Log Activity</span>
                    </CardContent>
                </Card>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6 flex flex-col items-center gap-2 text-center">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-sm">Update Weight</span>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Weekly Trends */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Weekly Load</CardTitle>
                </CardHeader>
                <CardContent className="pl-0">
                    <WeeklyProgress />
                </CardContent>
            </Card>
        </div>
    )
}
