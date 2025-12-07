"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BodyWeightChart } from "@/components/profile/body-weight-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
    return (
        <div className="container max-w-2xl mx-auto space-y-6 py-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>EV</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Parker L.</h1>
                    <p className="text-muted-foreground">Advanced Lifter • Hypertrophy Focus</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Current Goal</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xl font-bold">Muscle Gain</div>
                        <p className="text-xs text-muted-foreground">Target: +0.5kg / week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">TDEE</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xl font-bold">2,850 kcal</div>
                        <p className="text-xs text-muted-foreground">Maintenance</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Weight Trend</CardTitle>
                    <CardDescription>
                        Your body weight progress over the last 6 weeks.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-0">
                    <BodyWeightChart />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Records</h3>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                        <span>Bench Press</span>
                        <Badge variant="outline">105 kg</Badge>
                    </div>
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                        <span>Squat</span>
                        <Badge variant="outline">145 kg</Badge>
                    </div>
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                        <span>Deadlift</span>
                        <Badge variant="outline">180 kg</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
