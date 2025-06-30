"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background px-6">
      <Image
        src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
        alt="Fluxpense Logo"
        width={100}
        height={100}
        className="mb-8 animate-subtle-float"
        priority
      />
      <h2 className="text-2xl font-black text-center mb-2 text-primary font-headline">Welcome to Fluxpense</h2>
      <p className="text-base text-center text-muted-foreground mb-10">Manage your money smarter, on the go.</p>
      <button
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-lg mb-4 button-glow active:scale-95 transition-transform"
        onClick={() => router.push("/auth/signup")}
      >
        Sign Up
      </button>
      <button
        className="w-full py-3 rounded-xl border border-primary text-primary font-bold text-lg bg-white active:scale-95 transition-transform"
        onClick={() => router.push("/auth/login")}
      >
        Login
      </button>
    </div>
  );
} 