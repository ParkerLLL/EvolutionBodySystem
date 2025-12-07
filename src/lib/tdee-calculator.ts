export type Gender = 'male' | 'female'
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9
export type FitnessGoal = 'muscle_gain' | 'fat_loss' | 'strength' | 'recomp'

export interface UserStats {
    gender: Gender
    weightKg: number
    heightCm: number
    age: number
    activityLevel: ActivityLevel
    goal: FitnessGoal
}

/**
 * Calculates BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 */
export function calculateBMR(stats: UserStats): number {
    const { gender, weightKg, heightCm, age } = stats

    // Base BMR: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y)
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age

    // Gender adjustment
    if (gender === 'male') {
        bmr += 5
    } else {
        bmr -= 161
    }

    return Math.round(bmr)
}

/**
 * Calculates TDEE (Total Daily Energy Expenditure) based on Activity Level
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
    return Math.round(bmr * activityLevel)
}

/**
 * Calculates Target Calories based on Fitness Goal
 */
export function calculateTargetCalories(tdee: number, goal: FitnessGoal): number {
    switch (goal) {
        case 'muscle_gain':
            return tdee + 300 // Mild surplus
        case 'fat_loss':
            return tdee - 500 // Moderate deficit
        case 'strength':
            return tdee + 200 // Slight surplus for recovery
        case 'recomp':
            return tdee // Maintenance
        default:
            return tdee
    }
}

/**
 * Calculates Recommended Macros based on Calories and Goal
 * Returns { carbs, protein, fat } in grams
 */
export function calculateMacros(calories: number, goal: FitnessGoal, weightKg: number) {
    // Protein: High for all goals to preserve/build muscle
    // Approx 2.2g per kg bodyweight
    const proteinGrams = Math.round(weightKg * 2.2)
    const proteinCals = proteinGrams * 4

    // Fat: Approx 20-30% of total cals (minimum 0.8g/kg)
    let fatRatio = 0.25
    if (goal === 'muscle_gain') fatRatio = 0.2

    const fatCals = Math.round(calories * fatRatio)
    const fatGrams = Math.round(fatCals / 9)

    // Carbs: The rest
    const remainingCals = calories - proteinCals - fatCals
    const carbsGrams = Math.round(remainingCals / 4)

    return {
        protein: proteinGrams,
        fat: fatGrams,
        carbs: carbsGrams > 0 ? carbsGrams : 0 // Safety check
    }
}
