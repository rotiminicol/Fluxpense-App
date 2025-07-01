"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function WelcomeScreen() {
  const router = useRouter();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const particlesArray = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
    setParticles(particlesArray);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-5 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-emerald text-ivory shadow-md hover:bg-emerald/90 transition-all duration-200"
        onClick={() => router.back()}
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold text-base">Back</span>
      </button>
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-champagne/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -50],
              x: [0, (Math.random() - 0.5) * 30]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      {/* Centered Logo */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/big bird.jpg"
          alt="Fluxpense Logo"
          width={120}
          height={120}
          className="mb-2 rounded-xl shadow-lg"
          priority
        />
      </motion.div>
      <motion.h2
        className="relative z-10 text-4xl font-bold text-center mb-2 text-champagne font-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Welcome to Fluxpense
      </motion.h2>
      <motion.p
        className="relative z-10 text-lg text-center text-ivory mb-10 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Manage your money smarter, on the go.
      </motion.p>
      <motion.button
        className="relative z-10 w-full max-w-xs py-3 rounded-xl bg-gradient-to-r from-emerald to-champagne text-black font-bold text-lg shadow-md hover:bg-emerald hover:text-white border-2 border-black hover:shadow-lg hover:scale-105 transition-all duration-300 mb-4"
        onClick={() => router.push("/auth/signup")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">Sign Up</span>
      </motion.button>
      <motion.button
        className="relative z-10 w-full max-w-xs py-3 rounded-xl border-2 border-black text-black font-bold text-lg bg-ivory hover:bg-emerald hover:text-white hover:scale-105 transition-all duration-300"
        onClick={() => router.push("/auth/login")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">Login</span>
      </motion.button>
    </div>
  );
}