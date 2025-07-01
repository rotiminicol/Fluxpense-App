"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import Image from 'next/image';
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-5 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-emerald text-ivory shadow-md hover:bg-emerald/90 transition-all duration-200"
        onClick={() => window.history.back()}
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
      {/* Full Screen Form */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center bg-ivory/90 rounded-none border-none shadow-none p-0">
          <Logo variant="default" size="lg" className="mb-6" />
          <h2 className="text-2xl font-bold mb-2 text-emerald text-center">Forgot Password?</h2>
          <p className="mb-6 text-champagne text-center">Enter your email to receive a password reset link.</p>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-emerald font-semibold mb-2">Check your email!</div>
              <div className="text-champagne text-sm mb-6">If an account exists for <span className="font-medium text-charcoal">{email}</span>, you will receive a password reset link shortly.</div>
              <a href="/auth/login" className="text-emerald underline font-medium">Back to Login</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
              <div className="space-y-2 w-full">
                <label htmlFor="forgot-email" className="text-champagne">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-charcoal/80 border border-champagne text-ivory placeholder-champagne focus:outline-none focus:ring-2 focus:ring-emerald transition-all duration-300 hover:border-emerald"
                />
              </div>
              {error && <div className="text-red-500 text-sm font-medium mt-1">{error}</div>}
              <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-base shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black mt-2">Send Reset Link</button>
              <a href="/auth/login" className="text-xs text-emerald underline text-center mt-2">Back to Login</a>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
