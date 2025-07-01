import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after animation completes
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald via-charcoal to-champagne">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/1.jpg"
          alt="Splash Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <Image
            src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
            alt="Fluxpense Logo"
            width={120}
            height={120}
            className="h-30 w-30"
          />
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-2 text-4xl font-bold text-champagne"
        >
          Fluxpense
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-8 text-lg text-ivory/90"
        >
          Smart Finance, Simplified
        </motion.p>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-xs"
        >
          <Button
            onClick={onComplete}
            className="w-full bg-champagne/80 text-charcoal hover:bg-emerald/80 hover:text-ivory backdrop-blur-md transition-all duration-300"
            size="lg"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
