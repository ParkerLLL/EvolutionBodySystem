"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock Data matching DB schema
const initialExercises = [
    { id: 1, name: "Barbell Bench Press", target_muscle: "chest", equipment: "barbell", difficulty: "intermediate" },
    { id: 2, name: "Squat", target_muscle: "legs", equipment: "barbell", difficulty: "advanced" },
    { id: 3, name: "Deadlift", target_muscle: "back", equipment: "barbell", difficulty: "advanced" },
    { id: 4, name: "Dumbbell Curl", target_muscle: "biceps", equipment: "dumbbell", difficulty: "beginner" },
    { id: 5, name: "Tricep Extension", target_muscle: "triceps", equipment: "cable", difficulty: "beginner" },
]

export default function ExerciseManagerPage() {
    const [exercises] = useState(initialExercises)
    const [search, setSearch] = useState("")

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Exercise Library</h1>
                    <p className="text-muted-foreground">Manage the official exercise database.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Exercise
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Exercise</DialogTitle>
                            <DialogDescription>
                                Add a standard exercise to the global library.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" placeholder="E.g. Bench Press" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="muscle" className="text-right">Muscle</Label>
                                <Input id="muscle" placeholder="E.g. Chest" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Exercise</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter exercises..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Target Muscle</TableHead>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                                <TableCell className="font-medium">{exercise.name}</TableCell>
                                <TableCell className="capitalize">{exercise.target_muscle}</TableCell>
                                <TableCell className="capitalize">{exercise.equipment}</TableCell>
                                <TableCell className="capitalize">{exercise.difficulty}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
