"use client"

import { useState } from "react"
import { CheckCircle2, ChevronRight, Timer, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Exercise, WorkoutSession } from "@/lib/training-logic"

interface WorkoutLoggerProps {
    session: WorkoutSession
    onComplete: () => void
}

export function WorkoutLogger({ session, onComplete }: WorkoutLoggerProps) {
    const [activeExerciseId, setActiveExerciseId] = useState(session.exercises[0].id)
    const [logs, setLogs] = useState<Record<string, { weight: string; reps: string; rpe: string }[]>>({})

    const handleLogInput = (exerciseId: string, setIndex: number, field: string, value: string) => {
        setLogs((prev) => {
            const currentLogs = prev[exerciseId] || []
            const newLogs = [...currentLogs]
            if (!newLogs[setIndex]) {
                newLogs[setIndex] = { weight: "", reps: "", rpe: "" }
            }
            newLogs[setIndex] = { ...newLogs[setIndex], [field]: value }
            return { ...prev, [exerciseId]: newLogs }
        })
    }

    const isExerciseComplete = (exercise: Exercise) => {
        const log = logs[exercise.id]
        if (!log) return false
        // Check if we have logs for all intended sets
        return log.length >= exercise.sets
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold">{session.dayName} Day</h2>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Timer className="w-4 h-4" />
                        <span>Est. {session.estimatedDuration} min</span>
                    </div>
                </div>
                <Button onClick={onComplete} variant="default" className="bg-green-600 hover:bg-green-700">
                    Finish Workout
                </Button>
            </div>

            <Tabs value={activeExerciseId} onValueChange={setActiveExerciseId} className="flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="w-full whitespace-nowrap border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                        {session.exercises.map((exercise, index) => (
                            <TabsTrigger
                                key={exercise.id}
                                value={exercise.id}
                                className="relative px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 font-medium"
                            >
                                <div className="flex flex-col items-start gap-1">
                                    <span className="flex items-center gap-2">
                                        {index + 1}. {exercise.name}
                                        {isExerciseComplete(exercise) && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                                    </span>
                                    {exercise.isMainLift && (
                                        <Badge variant="secondary" className="text-[10px] h-4 px-1">Main Lift</Badge>
                                    )}
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </ScrollArea>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
                    {session.exercises.map((exercise) => (
                        <TabsContent key={exercise.id} value={exercise.id} className="mt-0 h-full space-y-6">

                            {/* Header Info */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">{exercise.name}</h3>
                                    <Badge variant="outline">{exercise.targetMuscle}</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                    Target: <span className="font-semibold text-foreground">{exercise.sets} sets</span> × <span className="font-semibold text-foreground">{exercise.reps}</span> reps
                                </div>
                            </div>

                            <Separator />

                            {/* Logging Area */}
                            <div className="space-y-4">
                                {Array.from({ length: exercise.sets }).map((_, i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <div className="flex items-center bg-muted/50 px-4 py-2 border-b">
                                            <span className="font-medium text-sm">Set {i + 1}</span>
                                            {exercise.isMainLift && i === exercise.sets - 1 && (
                                                <Badge variant="default" className="ml-auto text-xs bg-yellow-500 hover:bg-yellow-600">AMRAP</Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4 grid grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-xs text-muted-foreground">kg</label>
                                                <Input
                                                    type="number"
                                                    placeholder="Weight"
                                                    className="h-12 text-lg"
                                                    onChange={(e) => handleLogInput(exercise.id, i, 'weight', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-muted-foreground">reps</label>
                                                <Input
                                                    type="number"
                                                    placeholder="Reps"
                                                    className="h-12 text-lg"
                                                    onChange={(e) => handleLogInput(exercise.id, i, 'reps', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-muted-foreground">RPE</label>
                                                <Input
                                                    type="number"
                                                    placeholder={exercise.rpe ? `${exercise.rpe}` : "-"}
                                                    className="h-12 text-lg"
                                                    max={10}
                                                    onChange={(e) => handleLogInput(exercise.id, i, 'rpe', e.target.value)}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    )
}
