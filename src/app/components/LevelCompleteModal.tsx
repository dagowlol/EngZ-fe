import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { CandyButton } from "./CandyButton";
import { StarRating } from "./StarRating";
import { useEffect } from "react";
import { celebrateSuccess } from "./ConfettiEffect";

interface LevelCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplay?: () => void;
  onNext?: () => void;
  stars: number;
  score: number;
  title?: string;
  message?: string;
}

export function LevelCompleteModal({
  isOpen,
  onClose,
  onReplay,
  onNext,
  stars,
  score,
  title = "Level Complete!",
  message = "Amazing work!",
}: LevelCompleteModalProps) {
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
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0, rotate: -180, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 180, y: 100 }}
              transition={{ type: "spring", duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white to-[#FFF9E6] rounded-[3rem] p-12 max-w-lg w-full mx-4 shadow-2xl border-8 border-white relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6FAE] via-[#FFD93D] to-[#B388FF]" />
              
              {/* Trophy Animation */}
              <motion.div
                className="text-9xl text-center mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                🏆
              </motion.div>

              {/* Title */}
              <h2 className="text-5xl text-center mb-4 bg-gradient-to-r from-[#FF6FAE] to-[#B388FF] bg-clip-text text-transparent">
                {title}
              </h2>

              {/* Message */}
              <p className="text-2xl text-center text-gray-700 mb-6">{message}</p>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                <StarRating stars={stars} maxStars={3} size={48} />
              </div>

              {/* Score */}
              <div className="bg-gradient-to-br from-[#FFD93D]/20 to-[#FFA94D]/20 rounded-3xl p-6 mb-8">
                <div className="text-center">
                  <p className="text-xl text-gray-600 mb-2">Your Score</p>
                  <div className="text-5xl text-[#FF6FAE]">{score}</div>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <Star className="fill-[#FFD93D] text-[#FFD93D]" size={24} />
                      <span className="text-xl">+{stars * 10}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <span className="text-2xl">🍯</span>
                      <span className="text-xl">+{Math.floor(score / 10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                {onReplay && (
                  <CandyButton color="blue" size="lg" onClick={onReplay} className="flex-1">
                    🔄 Replay
                  </CandyButton>
                )}
                {onNext ? (
                  <CandyButton color="pink" size="lg" onClick={onNext} className="flex-1">
                    Next Level →
                  </CandyButton>
                ) : (
                  <CandyButton color="purple" size="lg" onClick={onClose} className="flex-1">
                    Continue
                  </CandyButton>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
