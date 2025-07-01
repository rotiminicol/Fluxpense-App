"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogIn, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form); // This will handle navigation
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle ripple effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 100 + 50
    };
    
    setRipples([...ripples.slice(-3), newRipple]);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated ripples */}
      <div className="absolute inset-0 overflow-hidden">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-champagne/20 pointer-events-none"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              setRipples(ripples.filter(r => r.id !== ripple.id));
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q0YmZhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>

      {/* Content container */}
      <motion.div 
        className="relative z-10 w-full max-w-sm px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header with icon */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Logo variant="big-bird" size="lg" showText={false} />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-champagne text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            className="text-ivory text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to continue your journey
          </motion.p>
        </motion.div>

        {/* Google Login Button */}
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

        {/* Form */}
        <motion.form 
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-champagne mb-1">Email</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-champagne mb-1">Password</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300 pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne hover:text-emerald transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="button"
              className="text-sm text-champagne hover:text-emerald transition-colors"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <div className="mt-2">
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
                  Signing In...
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
                  Sign In
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        <motion.p 
          className="text-center text-gray-400 mt-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Don't have an account?{' '}
          <button 
            className="text-champagne font-medium hover:text-emerald transition-colors"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}