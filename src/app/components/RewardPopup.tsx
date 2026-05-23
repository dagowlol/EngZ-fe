import { motion, AnimatePresence } from "motion/react";
import { Trophy, Star, Award } from "lucide-react";
import { CandyButton } from "./CandyButton";
import { useEffect } from "react";
import { celebrateSuccess } from "./ConfettiEffect";

interface RewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  stars?: number;
  coins?: number;
  type?: "success" | "achievement" | "levelUp";
}

export function RewardPopup({
  isOpen,
  onClose,
  title,
  message,
  stars = 0,
  coins = 0,
  type = "success",
}: RewardPopupProps) {
  const icons = {
    success: "🎉",
    achievement: "🏆",
    levelUp: "⭐",
  };

  useEffect(() => {
    if (isOpen) {
      celebrateSuccess();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            {/* Popup */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#FFD93D] to-[#FFA94D] rounded-[2rem] p-8 max-w-md w-full mx-4 shadow-2xl border-8 border-white"
            >
              {/* Icon */}
              <motion.div
                className="text-8xl text-center mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                {icons[type]}
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl text-center text-white mb-4">{title}</h2>

              {/* Message */}
              <p className="text-xl text-center text-white/90 mb-6">{message}</p>

              {/* Rewards */}
              <div className="flex justify-center gap-6 mb-6">
                {stars > 0 && (
                  <div className="flex items-center gap-2 bg-white/30 rounded-2xl px-4 py-2">
                    <Star className="fill-[#FFD93D] text-[#FFD93D]" size={28} />
                    <span className="text-2xl text-white">+{stars}</span>
                  </div>
                )}
                {coins > 0 && (
                  <div className="flex items-center gap-2 bg-white/30 rounded-2xl px-4 py-2">
                    <span className="text-2xl">🍯</span>
                    <span className="text-2xl text-white">+{coins}</span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="flex justify-center">
                <CandyButton color="pink" size="lg" onClick={onClose}>
                  Continue
                </CandyButton>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}