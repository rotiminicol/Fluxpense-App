"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheck, FiLoader } from "react-icons/fi";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // For multi-step animations
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);
  const [error, setError] = useState("");

  // Generate floating particles
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup(form); // This will handle navigation
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input variants for animations
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden">
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

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q0YmZhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>

      {/* Content container with smooth entrance */}
      <motion.div 
        className="relative z-10 w-full max-w-md px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated logo/header */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Logo variant="default" size="lg" />
        </motion.div>

        {/* Title with staggered letters */}
        <motion.h2 
          className="text-4xl font-bold text-center mb-2 text-champagne font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {["C", "r", "e", "a", "t", "e", " ", "A", "c", "c", "o", "u", "n", "t"].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.3, type: "spring", stiffness: 300 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p 
          className="text-center text-ivory mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Join our financial platform and take control of your future
        </motion.p>

        {/* Google Signup Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-base shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black"
            // onClick={handleGoogleAuth} // Uncomment and implement if you have a Google handler
          >
            {/* Google SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.091,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>

        {/* Form with sequential input animations */}
        <motion.form 
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
        >
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <motion.div variants={inputVariants} custom={0}>
            <label className="block text-sm font-medium text-champagne mb-1">Full Name</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300 hover:border-emerald"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: form.name.length > 0 ? 1 : 0, 
                  scale: form.name.length > 0 ? 1 : 0.5 
                }}
                transition={{ type: "spring" }}
              >
                <FiCheck />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} custom={1}>
            <label className="block text-sm font-medium text-champagne mb-1">Email</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300 hover:border-emerald"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: form.email.length > 0 && form.email.includes('@') ? 1 : 0, 
                  scale: form.email.length > 0 && form.email.includes('@') ? 1 : 0.5 
                }}
                transition={{ type: "spring" }}
              >
                <FiCheck />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} custom={2}>
            <label className="block text-sm font-medium text-champagne mb-1">Password</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300 hover:border-emerald"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={inputVariants} custom={3} className="mt-2">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.button
                  key="loading"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-base shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  disabled
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiLoader />
                  </motion.span>
                  Signing Up...
                </motion.button>
              ) : (
                <motion.button
                  key="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-base shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black hover:shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="submit"
                >
                  Sign Up
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.form>

        {/* Progress indicators for multi-step */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full ${i <= step ? 'bg-emerald' : 'bg-charcoal'}`}
              initial={{ width: 8 }}
              animate={{ width: i === step ? 24 : 8 }}
              transition={{ type: "spring", stiffness: 500 }}
            />
          ))}
        </div>

        <motion.p 
          className="text-center text-ivory mt-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Already have an account?{' '}
          <button 
            className="text-emerald font-medium hover:text-emerald-200 transition-colors"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}