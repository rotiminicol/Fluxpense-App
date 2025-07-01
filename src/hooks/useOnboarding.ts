import { useState, useEffect } from 'react';

type OnboardingStep = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      image: '/5.jpg',
      title: 'Track Expenses',
      description: 'Effortlessly monitor your spending and stay on budget',
    },
    {
      id: 2,
      image: '/6.jpg',
      title: 'Smart Budgeting',
      description: 'Set and achieve your financial goals with ease',
    },
    {
      id: 3,
      image: '/7.jpg',
      title: 'Insightful Analytics',
      description: 'Get valuable insights into your spending habits',
    },
    {
      id: 4,
      image: '/8.jpg',
      title: 'Secure & Private',
      description: 'Your financial data is always protected',
    },
    {
      id: 5,
      image: '/9.jpg',
      title: 'Sync Across Devices',
      description: 'Access your finances anywhere, anytime',
    },
  ];

  const welcomeSlides = [
    {
      id: 1,
      image: '/2.jpg',
      title: 'Welcome to Fluxpense',
      subtitle: 'Your personal finance companion',
    },
    {
      id: 2,
      image: '/3.jpg',
      title: 'Take Control',
      subtitle: 'Of your financial future',
    },
    {
      id: 3,
      image: '/4.jpg',
      title: 'Start Today',
      subtitle: 'Begin your journey to financial freedom',
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const skipToEnd = () => {
    setCurrentStep(onboardingSteps.length);
  };

  return {
    currentStep,
    isLoading,
    onboardingSteps,
    welcomeSlides,
    nextStep,
    prevStep,
    skipToEnd,
    totalSteps: onboardingSteps.length,
  };
};

export type { OnboardingStep };
