import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CandyButton } from "./CandyButton";
import { BeeAvatar } from "./BeeAvatar";

interface TourStep {
  title: string;
  description: string;
  emoji: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to FunBee! 🎉",
    description: "I'm FunBee, your learning buddy! Let me show you around this magical world of English learning!",
    emoji: "🐝",
  },
  {
    title: "Learn with Fun! 📚",
    description: "Click on any level to start learning new words with colorful flashcards and fun games!",
    emoji: "🎮",
  },
  {
    title: "Play Games! 🍬",
    description: "Match candies, play memory games, and have fun while learning English words!",
    emoji: "🎯",
  },
  {
    title: "Earn Rewards! 🏆",
    description: "Collect stars, honey coins, and unlock special achievements as you learn!",
    emoji: "⭐",
  },
  {
    title: "Let's Start! 🚀",
    description: "You're all set! Click on the first level and begin your English learning adventure!",
    emoji: "🌟",
  },
];

interface WelcomeTourProps {
  onComplete: () => void;
}

export function WelcomeTour({ onComplete }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const step = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            key={currentStep}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-white to-[#FFF9E6] rounded-[3rem] p-12 max-w-2xl w-full mx-4 shadow-2xl border-8 border-white"
          >
            {/* Bee Avatar */}
            <div className="flex justify-center mb-6">
              <BeeAvatar size="lg" />
            </div>

            {/* Emoji */}
            <motion.div
              className="text-8xl text-center mb-6"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {step.emoji}
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl text-center mb-6 bg-gradient-to-r from-[#FF6FAE] to-[#B388FF] bg-clip-text text-transparent">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-2xl text-center text-gray-700 mb-8 leading-relaxed">
              {step.description}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mb-8">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-[#FF6FAE] w-8"
                      : index < currentStep
                      ? "bg-[#FFD93D]"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <CandyButton color="purple" size="lg" onClick={handleSkip} className="flex-1">
                Skip Tour
              </CandyButton>
              <CandyButton color="pink" size="lg" onClick={handleNext} className="flex-1">
                {currentStep < tourSteps.length - 1 ? "Next →" : "Start Learning! 🚀"}
              </CandyButton>
            </div>

            {/* Step Counter */}
            <p className="text-center text-gray-500 mt-6">
              Step {currentStep + 1} of {tourSteps.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
