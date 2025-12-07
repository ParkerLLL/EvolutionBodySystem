"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyNutritionTarget } from "@/lib/carb-cycling"

interface MacroTrackerProps {
    targets: DailyNutritionTarget
    consumed: {
        calories: number
        protein: number
        carbs: number
        fat: number
    }
}

export function MacroTracker({ targets, consumed }: MacroTrackerProps) {

    const getPercent = (current: number, target: number) => Math.min(100, Math.round((current / target) * 100))

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle>Daily Fuel</CardTitle>
                    <div className="text-right">
                        <div className="text-2xl font-bold">{consumed.calories} / {targets.calories}</div>
                        <div className="text-xs text-muted-foreground">Calories Consumed</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Progress value={getPercent(consumed.calories, targets.calories)} className="h-4" />

                <div className="grid grid-cols-3 gap-4 text-center">
                    {/* Protein */}
                    <div className="space-y-2">
                        <div className="text-xs text-muted-foreground font-medium uppercase">Protein</div>
                        <div className="font-bold text-xl text-blue-500">{consumed.protein}g</div>
                        <Progress value={getPercent(consumed.protein, targets.protein)} className="h-2" />
                        <div className="text-xs text-muted-foreground">Target: {targets.protein}g</div>
                    </div>

                    {/* Carbs */}
                    <div className="space-y-2">
                        <div className="text-xs text-muted-foreground font-medium uppercase">Carbs</div>
                        <div className="font-bold text-xl text-green-500">{consumed.carbs}g</div>
                        <Progress value={getPercent(consumed.carbs, targets.carbs)} className="h-2" />
                        <div className="text-xs text-muted-foreground">Target: {targets.carbs}g</div>
                    </div>

                    {/* Fat */}
                    <div className="space-y-2">
                        <div className="text-xs text-muted-foreground font-medium uppercase">Fat</div>
                        <div className="font-bold text-xl text-yellow-500">{consumed.fat}g</div>
                        <Progress value={getPercent(consumed.fat, targets.fat)} className="h-2" />
                        <div className="text-xs text-muted-foreground">Target: {targets.fat}g</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
