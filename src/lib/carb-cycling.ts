import { SplitDay } from "@/lib/training-logic"

export type CarbMode = 'high' | 'moderate' | 'low'

export interface DailyNutritionTarget {
    mode: CarbMode
    calories: number
    protein: number
    carbs: number
    fat: number
}

/**
 * Determines the Carb Mode based on the workout day
 * High Carb: Leg Day / Back Day (Big muscle groups)
 * Moderate Carb: Push Day / Upper Body
 * Low Carb: Rest Day / Active Recovery
 */
export function getCarbMode(day: SplitDay): CarbMode {
    if (day === 'Legs' || day === 'Pull') return 'high'
    if (day === 'Push') return 'moderate'
    return 'low'
}

/**
 * Adjusts base TDEE macros based on the Carb Mode
 * This is a simple multiplier logic for the MVP
 */
export function calculateDailyTargets(baseTdee: number, mode: CarbMode, weightKg: number): DailyNutritionTarget {
    const protein = Math.round(weightKg * 2.2) // Constant 2.2g/kg
    const proteinCals = protein * 4

    let carbMultiplier = 3.0 // Default Moderate
    if (mode === 'high') carbMultiplier = 4.0
    if (mode === 'low') carbMultiplier = 1.0 // Low carb on rest days

    const carbs = Math.round(weightKg * carbMultiplier)
    const carbCals = carbs * 4

    // Fat fills the rest, but maintain minimum 0.8g/kg
    // For this simple logic, we just calculate total calories based on mode
    let calorieAdjust = 0
    if (mode === 'high') calorieAdjust = 300 // Surplus
    if (mode === 'low') calorieAdjust = -300 // Deficit

    const targetCalories = baseTdee + calorieAdjust
    const remainingCals = targetCalories - proteinCals - carbCals
    const fat = Math.round(remainingCals / 9)

    return {
        mode,
        calories: targetCalories,
        protein,
        carbs,
        fat: fat > 30 ? fat : 30 // Minimum safety
    }
}
