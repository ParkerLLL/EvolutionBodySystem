// Types
export type SplitDay = 'Push' | 'Pull' | 'Legs' | 'Rest'

export interface Exercise {
    id: string
    name: string
    targetMuscle: string
    sets: number
    reps: string
    rpe?: number
    isMainLift?: boolean
}

export interface WorkoutSession {
    dayName: SplitDay
    exercises: Exercise[]
    estimatedDuration: number // minutes
}

/**
 * Calculates the training weight for a specific 5/3/1 week/set
 * Formula: round((1RM * 0.9) * percentage)
 */
export function calculate531Weight(oneRepMax: number, percentage: number): number {
    const trainingMax = oneRepMax * 0.9
    const weight = trainingMax * percentage
    // Round to nearest 2.5kg (standard plate increment)
    return Math.round(weight / 2.5) * 2.5
}

/**
 * Generates a mock workout based on the split day
 * In a real app, this would fetch from the DB based on the user's program
 */
export function generateWorkout(day: SplitDay, benchPr: number = 100): WorkoutSession {
    if (day === 'Push') {
        // Example: 5/3/1 Week 1 (5/5/5+)
        const set1 = calculate531Weight(benchPr, 0.65)
        const set2 = calculate531Weight(benchPr, 0.75)
        const set3 = calculate531Weight(benchPr, 0.85)

        return {
            dayName: 'Push',
            estimatedDuration: 60,
            exercises: [
                {
                    id: 'bench-press',
                    name: 'Barbell Bench Press (5/3/1)',
                    targetMuscle: 'chest',
                    sets: 3,
                    reps: `5x${set1}kg, 5x${set2}kg, 5+x${set3}kg`,
                    isMainLift: true,
                    rpe: 8
                },
                {
                    id: 'incline-db',
                    name: 'Incline Dumbbell Press',
                    targetMuscle: 'chest',
                    sets: 3,
                    reps: '8-12',
                    rpe: 8
                },
                {
                    id: 'ohp',
                    name: 'Overhead Press',
                    targetMuscle: 'shoulders',
                    sets: 3,
                    reps: '8-12',
                    rpe: 8
                },
                {
                    id: 'tricep-pushdown',
                    name: 'Tricep Pushdowns',
                    targetMuscle: 'triceps',
                    sets: 4,
                    reps: '12-15',
                    rpe: 9
                }
            ]
        }
    }

    if (day === 'Pull') {
        return {
            dayName: 'Pull',
            estimatedDuration: 55,
            exercises: [
                {
                    id: 'deadlift',
                    name: 'Deadlift',
                    targetMuscle: 'back',
                    sets: 3,
                    reps: '5',
                    isMainLift: true,
                    rpe: 8
                },
                {
                    id: 'pullups',
                    name: 'Weighted Pull-ups',
                    targetMuscle: 'back',
                    sets: 4,
                    reps: '6-8',
                    rpe: 9
                },
                {
                    id: 'rows',
                    name: 'Cable Rows',
                    targetMuscle: 'back',
                    sets: 3,
                    reps: '10-12',
                    rpe: 8
                },
                {
                    id: 'curls',
                    name: 'Barbell Curls',
                    targetMuscle: 'biceps',
                    sets: 4,
                    reps: '8-12',
                    rpe: 9
                }
            ]
        }
    }

    if (day === 'Legs') {
        return {
            dayName: 'Legs',
            estimatedDuration: 70,
            exercises: [
                {
                    id: 'squat',
                    name: 'Barbell Squat',
                    targetMuscle: 'legs',
                    sets: 5,
                    reps: '5',
                    isMainLift: true,
                    rpe: 8
                },
                {
                    id: 'rdl',
                    name: 'Romanian Deadlift',
                    targetMuscle: 'legs',
                    sets: 3,
                    reps: '8-10',
                    rpe: 8
                },
                {
                    id: 'split-squat',
                    name: 'Bulgarian Split Squat',
                    targetMuscle: 'legs',
                    sets: 3,
                    reps: '10',
                    rpe: 9
                },
                {
                    id: 'calves',
                    name: 'Standing Calf Raise',
                    targetMuscle: 'legs',
                    sets: 5,
                    reps: '15-20',
                    rpe: 9
                }
            ]
        }
    }

    return {
        dayName: 'Rest',
        estimatedDuration: 0,
        exercises: []
    }
}
