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
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,99,7,0.08),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />

      {/* Logo with enhanced animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-emerald/20 rounded-full blur-3xl animate-pulse" />
        <Image
          src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
          alt="Fluxpense Logo"
          width={150}
          height={150}
          className="mb-10 relative z-10 animate-float-logo"
          priority
        />
      </div>

      {/* Title with gradient and hover animation */}
      <h1 className="text-4xl md:text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald to-champagne animate-fade-in font-headline transition-transform duration-300 group-hover:scale-105">
        Fluxpense
      </h1>

      {/* Subtitle with subtle animation */}
      <p className="text-lg md:text-xl text-center text-champagne mb-12 max-w-md animate-slide-up">
        Smart Expense Tracking, Budgeting & Analytics
      </p>

      {/* Button with enhanced hover and glow effects */}
      <button
        className="relative w-full max-w-xs py-4 px-6 rounded-xl bg-gradient-to-r from-emerald to-champagne text-black font-bold text-lg shadow-lg hover:bg-emerald hover:text-white border-2 border-black hover:shadow-xl hover:scale-105 transform transition-all duration-300 active:scale-95 group"
        onClick={handleContinue}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-emerald to-champagne opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
        <span className="relative z-10">Continue</span>
      </button>

      {/* Custom Tailwind CSS animations */}
      <style jsx>{`
        @keyframes float-logo {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float-logo {
          animation: float-logo 4s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 1.2s ease-out forwards 0.3s;
        }
      `}</style>
    </div>
  );
}