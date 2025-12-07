import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
        Evolution Body System
      </h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl">
        Advanced Hypertrophy & Strength Periodization for the Modern Lifter.
      </p>
      <div className="flex gap-4">
        <Link href="/onboarding">
          <Button size="lg">Start Onboarding</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="lg">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
