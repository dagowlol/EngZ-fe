import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { TOPICS } from "../data/topics";
import { ChevronLeft, ChevronRight, Volume2, Play, Star } from "lucide-react";
import { FloatingParticles } from "../components/FloatingParticles";
import confetti from "canvas-confetti";

export function VocabularyScreen() {
  const { topicId, level } = useParams<{ topicId: string; level: string }>();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const topic = TOPICS.find((t) => t.id === topicId);
  const levelNumber = parseInt(level || "1");
  const currentLevel = topic?.levels.find((l) => l.levelNumber === levelNumber);

  if (!topic || !currentLevel) {
    return <div>Topic or Level not found</div>;
  }

  const words = currentLevel.words;
  const currentWord = words[currentCardIndex];
  const progress = ((currentCardIndex + 1) / words.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < words.length - 1) {
      setDirection(1);
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // All words learned! Celebrate and go to game
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        navigate(`/game/${topicId}/${level}`);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setDirection(-1);
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handlePlayPronunciation = () => {
    // Mock pronunciation - in real app would use Web Speech API
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${topic.color}15, ${topic.color}30)`,
      }}
    >
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.button
            className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border-4 border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/topic/${topicId}`)}
          >
            <ChevronLeft className="w-6 h-6 text-purple-800" />
          </motion.button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-800">
              {topic.emoji} {topic.name}
            </h1>
            <p className="text-purple-600">Level {levelNumber}</p>
          </div>

          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-white/50 rounded-full h-6 overflow-hidden border-4 border-white shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-sm">
                {currentCardIndex + 1}/{words.length}
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentCardIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 },
              }}
              className="relative"
            >
              {/* Flashcard */}
              <motion.div
                className="bg-white rounded-[2rem] p-8 shadow-2xl border-4"
                style={{ borderColor: topic.color }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Difficulty Stars */}
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(currentWord.difficulty)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Word Image */}
                <motion.div
                  className="text-[9rem] text-center mb-6"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {currentWord.image}
                </motion.div>

                {/* Word */}
                <h2
                  className="text-5xl font-bold text-center mb-5"
                  style={{ color: topic.color }}
                >
                  {currentWord.word}
                </h2>

                {/* Pronunciation */}
                <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row sm:justify-center">
                  <p className="text-2xl text-gray-600">
                    {currentWord.pronunciation}
                  </p>
                  <motion.button
                    className="bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full p-4 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPronunciation}
                  >
                    <Volume2 className="w-8 h-8" />
                  </motion.button>
                </div>

                {/* Example Sentence */}
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-5 border-2 border-yellow-300">
                  <p className="text-xl text-center text-gray-800 font-medium">
                    "{currentWord.exampleSentence}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-10 pb-12">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-6">
          <motion.button
            className={`
              bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg border-4 border-white
              ${currentCardIndex === 0 ? "opacity-50" : ""}
            `}
            whileHover={currentCardIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={currentCardIndex > 0 ? { scale: 0.95 } : {}}
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
          >
            <ChevronLeft className="w-8 h-8 text-purple-800" />
          </motion.button>

          <motion.button
            className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full py-6 px-12 shadow-2xl border-4 border-white font-bold text-3xl flex items-center justify-center gap-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            {currentCardIndex === words.length - 1 ? (
              <>
                <span>Let's Play!</span>
                <Play className="w-9 h-10" />
              </>
            ) : (
              <>
                <span>Next Word</span>
                <ChevronRight className="w-10 h-10" />
              </>
            )}
          </motion.button>
        </div>
      </div>

    </div>
  );
}
