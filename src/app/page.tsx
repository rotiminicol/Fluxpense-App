"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SplashScreen() {
  const router = useRouter();
  const handleContinue = useCallback(() => {
    router.push("/welcome");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background px-6">
      <Image
        src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
        alt="Fluxpense Logo"
        width={120}
        height={120}
        className="mb-8 animate-subtle-float"
        priority
      />
      <h1 className="text-3xl font-black text-center mb-4 text-primary font-headline">Fluxpense</h1>
      <p className="text-base text-center text-muted-foreground mb-10">Smart Expense Tracking, Budgeting & Analytics</p>
      <button
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-lg button-glow active:scale-95 transition-transform"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}