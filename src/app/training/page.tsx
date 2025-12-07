"use client"

import { useState } from "react"
import { Calendar, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WorkoutLogger } from "@/components/training/workout-logger"
import { generateWorkout } from "@/lib/training-logic"

export default function TrainingPage() {
    const [isStarted, setIsStarted] = useState(false)

    // Mock: Today is Push Day, user has 100kg Bench PR
    const todaysWorkout = generateWorkout('Push', 100)

    if (isStarted) {
        return (
            <div className="container max-w-2xl mx-auto py-2 h-full">
                <WorkoutLogger
                    session={todaysWorkout}
                    onComplete={() => {
                        alert("Workout Completed! (Data would be saved here)")
                        setIsStarted(false)
                    }}
                />
            </div>
        )
    }

    return (
        <div className="container max-w-2xl mx-auto space-y-6 py-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Training</h1>
                <p className="text-muted-foreground">Cycle 1 • Week 1 (5/5/5+)</p>
            </div>

            <Card className="border-t-4 border-t-blue-500 shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Today: {todaysWorkout.dayName}</CardTitle>
                            <CardDescription>Estimated {todaysWorkout.estimatedDuration} mins</CardDescription>
                        </div>
                        <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setIsStarted(true)}>
                            <Play className="h-5 w-5 ml-1" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        <div className="space-y-4">
                            {todaysWorkout.exercises.map((ex, i) => (
                                <div key={ex.id} className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                                        {i + 1}
                                    </span>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{ex.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {ex.sets} sets × {ex.reps}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Future: Weekly Schedule View */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs mt-8 opacity-50">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className={`p-2 rounded ${i === 2 ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}>
                        {d}
                    </div>
                ))}
            </div>
        </div>
    )
}
