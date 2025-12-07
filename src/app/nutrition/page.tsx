"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MacroTracker } from "@/components/nutrition/macro-tracker"
import { calculateDailyTargets, getCarbMode } from "@/lib/carb-cycling"
import { generateWorkout } from "@/lib/training-logic"

export default function NutritionPage() {
    // Mock Data: User is 75kg, BMR/TDEE base is 2500
    const userWeight = 75
    const baseTdee = 2500

    // Today's Context
    const trainingDay = generateWorkout('Push') // Assume Push day
    const carbMode = getCarbMode(trainingDay.dayName)
    const targets = calculateDailyTargets(baseTdee, carbMode, userWeight)

    // Mock Consumed
    const consumed = {
        calories: 1850,
        protein: 140,
        carbs: 180,
        fat: 45
    }

    return (
        <div className="container max-w-2xl mx-auto space-y-6 py-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Nutrition</h1>
                <p className="text-muted-foreground">Smart Carb Cycling</p>
            </div>

            {/* Carb Cycle Status Card */}
            <Card className={`border-t-4 shadow-md ${carbMode === 'high' ? 'border-t-green-500' : carbMode === 'moderate' ? 'border-t-yellow-500' : 'border-t-blue-500'}`}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Today's Cycle</CardTitle>
                            <CardDescription>Based on {trainingDay.dayName} Day</CardDescription>
                        </div>
                        <Badge variant={carbMode === 'high' ? 'default' : 'secondary'} className="text-sm px-3 py-1 capitalize">
                            {carbMode} Carb Day
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {carbMode === 'high' && "Heavy training day. Focus on pre/post workout carbs to fuel performance and recovery."}
                        {carbMode === 'moderate' && "Standard training day. Balance your macros to support hypertrophy."}
                        {carbMode === 'low' && "Rest day. Lower carbs to improve insulin sensitivity and minimize fat gain."}
                    </p>
                </CardContent>
            </Card>

            <MacroTracker targets={targets} consumed={consumed} />
        </div>
    )
}
