"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, User, Building, Mail, PiggyBank, Users, PartyPopper, ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

const steps = [
  { id: 1, title: "Welcome!", icon: PartyPopper, image: "/3.jpg" },
  { id: 2, title: "Account Type", icon: Building, image: "/4.jpg" },
  { id: 3, title: "Connect Email", icon: Mail, image: "/5.jpg" },
  { id: 4, title: "Financial Goals", icon: PiggyBank, image: "/6.jpg" },
  { id: 5, title: "Invite Team", icon: Users, image: "/7.jpg" },
  { id: 6, title: "You're all set!", icon: Check, image: "/8.jpg" },
];

const slideVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "50%" : "-50%",
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: "0%",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? "50%" : "-50%",
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, loading, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);

  // Redirect logic for onboarding access
  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else if (user.onboarding_complete) {
      router.replace("/dashboard/overview");
    }
  }, [user, router]);

  const nextStep = () => {
    setDirection(1);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishOnboarding = async () => {
    setIsFinishing(true);
    try {
      await completeOnboarding();
      setTimeout(() => {
        router.push("/dashboard/overview");
      }, 800);
    } catch (error) {
      setIsFinishing(false);
    }
  };

  const skipOnboarding = () => {
    router.push("/dashboard/overview");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const ActiveIcon = steps[currentStep].icon;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-5 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-emerald text-ivory shadow-md hover:bg-emerald/90 transition-all duration-200"
        onClick={() => router.back()}
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold text-base">Back</span>
      </button>
      {/* Subtle background image overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={steps[currentStep].image}
          alt={steps[currentStep].title + " Background"}
          fill
          className="object-cover blur-md transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>
      {/* Skip button */}
      {currentStep < steps.length - 1 && (
        <button
          className="absolute top-6 right-6 z-20 text-champagne bg-charcoal/60 px-4 py-2 rounded-full font-semibold text-sm hover:bg-emerald/70 hover:text-ivory transition-all duration-300"
          onClick={skipOnboarding}
        >
          Skip
        </button>
      )}
      <div className="relative z-10 flex w-full h-full items-center justify-center p-4 overflow-y-auto no-scrollbar">
        <motion.div
          key={steps[currentStep].id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div className="w-full h-full flex flex-col items-center justify-center bg-ivory/90 rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center mb-6">
              <Logo variant="default" size="lg" className="cursor-pointer hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex items-center justify-between mb-6 w-full">
              <span className="text-sm font-medium text-champagne">Step {currentStep + 1} of {steps.length}</span>
              <div className="flex items-center gap-2">
                <ActiveIcon className="h-5 w-5 text-emerald" />
                <span className="text-2xl font-bold tracking-tight text-emerald hover:text-champagne transition-colors duration-300">
                  {steps[currentStep].title}
                </span>
              </div>
            </div>
            <Progress value={progress} className="w-full bg-champagne/20 mb-8" />
            <div className="overflow-visible relative flex items-center w-full min-h-[180px] mb-8">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <div className="w-full flex flex-col items-center justify-center gap-6">
                    <StepContent step={currentStep} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-row justify-between items-center border-t border-champagne/20 pt-6 gap-4 w-full mt-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0 || isFinishing || loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-lg shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" /> Previous
              </button>
              {currentStep < steps.length - 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-lg shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black"
                >
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : currentStep === steps.length - 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-emerald to-champagne text-black font-semibold text-lg shadow-md hover:bg-emerald hover:text-white transition-all duration-300 border-2 border-black"
                >
                  Finish Setup <Check className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishOnboarding}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-emerald to-champagne text-black font-bold text-xl shadow-lg border-2 border-black relative overflow-hidden transition-all duration-300 focus:ring-4 focus:ring-emerald/40 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
                  disabled={isFinishing || loading}
                  style={{ boxShadow: '0 0 16px 2px #04630755' }}
                >
                  {isFinishing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-emerald" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                      Redirecting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Go to Dashboard
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                        <Check className="w-6 h-6 text-emerald ml-1 animate-bounce" />
                      </motion.span>
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="text-center space-y-4 max-w-xs mx-auto">
          <h3 className="text-xl font-semibold text-emerald">Welcome to Fluxpense!</h3>
          <p className="text-champagne">Let's get your account set up in just a few quick steps. We're excited to help you take control of your finances.</p>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4 w-full max-w-xs mx-auto">
          <Label className="text-lg text-emerald">How will you be using Fluxpense?</Label>
          <RadioGroup defaultValue="personal" className="space-y-3">
            <Label className="flex items-center gap-4 p-4 border border-champagne/30 rounded-lg hover:bg-emerald/20 transition-all duration-300">
              <RadioGroupItem value="personal" id="personal" />
              <div>
                <p className="font-semibold text-emerald">Personal Use</p>
                <p className="text-sm text-champagne">For tracking my own expenses and budgets.</p>
              </div>
            </Label>
            <Label className="flex items-center gap-4 p-4 border border-champagne/30 rounded-lg hover:bg-emerald/20 transition-all duration-300">
              <RadioGroupItem value="business" id="business" />
              <div>
                <p className="font-semibold text-emerald">Business/Team</p>
                <p className="text-sm text-champagne">For managing expenses for my company or team.</p>
              </div>
            </Label>
          </RadioGroup>
        </div>
      );
    case 2:
      return (
        <div className="text-center space-y-4 max-w-xs mx-auto">
          <h3 className="text-xl font-semibold text-emerald">Automate with Email</h3>
          <p className="text-champagne">Connect your email to automatically import receipts from services like Uber, Amazon, and more. You can do this later from the Integrations page.</p>
          <Button className="bg-emerald hover:bg-emerald/90 text-ivory transition-all duration-300 w-full max-w-xs mx-auto">Connect Gmail</Button>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 w-full max-w-xs mx-auto">
          <h3 className="text-xl font-semibold text-emerald">What are your financial goals?</h3>
          <Textarea
            placeholder="e.g., Save for a vacation, reduce monthly spending on dining out, pay off debt..."
            className="bg-charcoal border-champagne/30 text-emerald placeholder-champagne focus:ring-emerald transition-all duration-300 w-full"
            rows={4}
          />
        </div>
      );
    case 4:
      return (
        <div className="space-y-4 w-full max-w-xs mx-auto">
          <h3 className="text-xl font-semibold text-emerald">Invite your team (optional)</h3>
          <p className="text-sm text-champagne">Enter emails separated by commas to invite team members.</p>
          <Input
            placeholder="friend@example.com, colleague@example.com"
            className="bg-charcoal border-champagne/30 text-emerald placeholder-champagne focus:ring-emerald transition-all duration-300 w-full"
          />
        </div>
      );
    case 5:
      return (
        <div className="text-center space-y-4 py-8 max-w-xs mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: "spring" } }}>
            <PartyPopper className="h-16 w-16 text-emerald-500 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-emerald">You're All Set!</h3>
          <p className="text-champagne">Your account is ready. Let's get your finances organized.</p>
        </div>
      );
    default:
      return null;
  }
}