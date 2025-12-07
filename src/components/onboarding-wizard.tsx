"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Activity, ArrowRight, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { calculateBMR, calculateMacros, calculateTargetCalories, calculateTDEE } from "@/lib/tdee-calculator"

const formSchema = z.object({
    gender: z.enum(["male", "female"]),
    age: z.coerce.number().min(10).max(100),
    weightKg: z.coerce.number().min(30).max(200),
    heightCm: z.coerce.number().min(100).max(250),
    activityLevel: z.string(), // We'll parse this to number later
    goal: z.enum(["muscle_gain", "fat_loss", "strength", "recomp"]),
    benchPressPr: z.coerce.number().min(0).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function OnboardingWizard() {
    const [step, setStep] = useState(1)
    const [result, setResult] = useState<null | {
        tdee: number
        targetCalories: number
        macros: { protein: number; fat: number; carbs: number }
    }>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "male",
            age: 25,
            weightKg: 70,
            heightCm: 175,
            activityLevel: "1.375",
            goal: "muscle_gain",
            benchPressPr: 0,
        },
    })

    function onSubmit(values: FormValues) {
        // Calculate TDEE
        const bmr = calculateBMR({
            gender: values.gender,
            age: values.age,
            weightKg: values.weightKg,
            heightCm: values.heightCm,
            activityLevel: 1.2, // placeholder for type satisfaction
            goal: values.goal
        })

        const activityLevel = parseFloat(values.activityLevel) as 1.2 | 1.375 | 1.55 | 1.725 | 1.9
        const tdee = calculateTDEE(bmr, activityLevel)
        const targetCalories = calculateTargetCalories(tdee, values.goal)
        const macros = calculateMacros(targetCalories, values.goal, values.weightKg)

        setResult({ tdee, targetCalories, macros })
        setStep(3) // Move to results step

        // Future: Save to Supabase
        console.log("Saving user profile...", values)
    }

    const nextStep = async () => {
        const fieldsToValidate = step === 1
            ? ['gender', 'age', 'weightKg', 'heightCm', 'activityLevel'] as const
            : ['goal', 'benchPressPr'] as const

        const isValid = await form.trigger(fieldsToValidate)
        if (isValid) setStep(step + 1)
    }

    return (
        <Card className="w-full max-w-lg mx-auto border-none shadow-none md:border md:shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                    <Activity className="text-primary" />
                    {step === 3 ? "Your Blueprint" : "Identity Matrix"}
                </CardTitle>
                <CardDescription>
                    Step {step} of 3 • {step === 1 ? "Biometrics" : step === 2 ? "Goals & Performance" : "Results"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 3 && result ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-muted rounded-lg">
                                <div className="text-muted-foreground text-xs uppercase tracking-wider">Maintenance</div>
                                <div className="text-2xl font-bold">{result.tdee}</div>
                                <div className="text-xs text-muted-foreground">kcal/day</div>
                            </div>
                            <div className="p-4 bg-primary/10 border-primary border rounded-lg">
                                <div className="text-primary text-xs uppercase tracking-wider font-bold">Target</div>
                                <div className="text-2xl font-bold text-primary">{result.targetCalories}</div>
                                <div className="text-xs text-primary/80">kcal/day</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium">Daily Macro Split</h4>
                            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                <div className="p-2 bg-muted rounded">
                                    <div className="font-bold text-blue-500">{result.macros.protein}g</div>
                                    <div className="text-xs text-muted-foreground">Protein</div>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <div className="font-bold text-yellow-500">{result.macros.fat}g</div>
                                    <div className="text-xs text-muted-foreground">Fat</div>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <div className="font-bold text-green-500">{result.macros.carbs}g</div>
                                    <div className="text-xs text-muted-foreground">Carbs</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full" size="lg" onClick={() => window.location.href = '/dashboard'}>
                                Enter Evolution System
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Biological Sex</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="male" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Male
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="female" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Female
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Age</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="weightKg"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Weight (kg)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="heightCm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Height (cm)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="activityLevel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Activity Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select activity" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1.2">Sedentary (Office job, no exercise)</SelectItem>
                                                        <SelectItem value="1.375">Light (1-3 days/week)</SelectItem>
                                                        <SelectItem value="1.55">Moderate (3-5 days/week)</SelectItem>
                                                        <SelectItem value="1.725">Active (6-7 days/week)</SelectItem>
                                                        <SelectItem value="1.9">Athlete (2x per day)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="goal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Primary Objective</FormLabel>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 gap-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="muscle_gain" className="peer sr-only" />
                                                        </FormControl>
                                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                            <span className="text-sm font-semibold">Lean Bulk (Hypertrophy)</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="fat_loss" className="peer sr-only" />
                                                        </FormControl>
                                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                            <span className="text-sm font-semibold">Fat Loss (Cut)</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="strength" className="peer sr-only" />
                                                        </FormControl>
                                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                            <span className="text-sm font-semibold">Pure Strength</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-4 border-t">
                                        <FormField
                                            control={form.control}
                                            name="benchPressPr"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Dumbbell className="w-4 h-4" />
                                                        Bench Press 1RM (Optional)
                                                    </FormLabel>
                                                    <CardDescription className="mb-2">Enter 0 if unknown. We use this for the specialist program.</CardDescription>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            <CardFooter className="px-0 flex justify-between pt-4">
                                {step > 1 && (
                                    <Button variant="ghost" type="button" onClick={() => setStep(step - 1)}>
                                        Back
                                    </Button>
                                )}
                                {step < 3 ? (
                                    <Button type="button" className={step === 1 ? "ml-auto" : ""} onClick={step === 1 ? nextStep : form.handleSubmit(onSubmit)}>
                                        {step === 2 ? "Generate Plan" : "Next"} <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                ) : null}
                            </CardFooter>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    )
}
