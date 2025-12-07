import { OnboardingWizard } from "@/components/onboarding-wizard";

export default function OnboardingPage() {
    return (
        <div className="container max-w-2xl mx-auto py-10 px-4">
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to Evolution</h1>
                <p className="text-muted-foreground">
                    Let's calibrate your system for optimal performance.
                </p>
            </div>

            <OnboardingWizard />
        </div>
    );
}
