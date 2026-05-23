import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface FunBeeMascotProps {
  message?: string;
  autoShow?: boolean;
  delay?: number;
}

export function FunBeeMascot({ message, autoShow = false, delay = 2000 }: FunBeeMascotProps) {
  const [isVisible, setIsVisible] = useState(autoShow);
  const [currentMessage, setCurrentMessage] = useState(message || "Hi! I'm FunBee! 🐝");

  const encouragingMessages = [
    "You're doing amazing! 🌟",
    "Keep up the great work! 💪",
    "Learning is fun! 🎉",
    "You're a superstar! ⭐",
    "Great job today! 👏",
  ];

  useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoShow, delay]);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
    }
  }, [message]);

  const showRandomMessage = () => {
    const randomMsg = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setCurrentMessage(randomMsg);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return (
    <>
      {/* Floating Bee Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        onClick={showRandomMessage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD93D] to-[#FFA94D] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
          <span className="text-4xl">🐝</span>
        </div>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            className="fixed bottom-32 right-8 z-50 max-w-xs"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#FFD93D] relative">
              <p className="text-lg text-gray-800">{currentMessage}</p>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-4 border-b-4 border-[#FFD93D] transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
