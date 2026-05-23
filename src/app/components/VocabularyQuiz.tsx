import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CandyButton } from "./CandyButton";
import { CandyCard } from "./CandyCard";

interface QuizQuestion {
  word: string;
  emoji: string;
  options: string[];
  correctAnswer: string;
}

const sampleQuestions: QuizQuestion[] = [
  {
    word: "🐱",
    emoji: "🐱",
    options: ["Cat", "Dog", "Bird", "Fish"],
    correctAnswer: "Cat",
  },
  {
    word: "🍎",
    emoji: "🍎",
    options: ["Banana", "Apple", "Orange", "Grape"],
    correctAnswer: "Apple",
  },
  {
    word: "☀️",
    emoji: "☀️",
    options: ["Moon", "Star", "Sun", "Cloud"],
    correctAnswer: "Sun",
  },
];

interface VocabularyQuizProps {
  questions?: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function VocabularyQuiz({ questions = sampleQuestions, onComplete }: VocabularyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        onComplete?.(score + (answer === question.correctAnswer ? 1 : 0));
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-lg text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-lg text-[#FF6FAE]">Score: {score}</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6FAE] to-[#B388FF]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <CandyCard color="white" hover={false} className="mb-8">
            <div className="text-center">
              <p className="text-2xl text-gray-600 mb-6">What is this?</p>
              <div className="text-9xl mb-6">{question.emoji}</div>
            </div>
          </CandyCard>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`
                    w-full p-6 rounded-3xl text-2xl transition-all
                    ${
                      !showFeedback
                        ? "bg-gradient-to-br from-[#6EC6FF] to-[#8DD4FF] hover:scale-105"
                        : selectedAnswer === option
                        ? isCorrect
                          ? "bg-gradient-to-br from-[#6FD47C] to-[#8EE48B]"
                          : "bg-gradient-to-br from-[#FF6B6B] to-[#FF8787]"
                        : option === question.correctAnswer
                        ? "bg-gradient-to-br from-[#6FD47C] to-[#8EE48B]"
                        : "bg-gray-300"
                    }
                    text-white shadow-lg border-4 border-white
                    disabled:cursor-not-allowed
                  `}
                >
                  {option}
                  {showFeedback && selectedAnswer === option && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-3 text-3xl"
                    >
                      {isCorrect ? "✓" : "✗"}
                    </motion.span>
                  )}
                  {showFeedback &&
                    selectedAnswer !== option &&
                    option === question.correctAnswer && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-3 text-3xl"
                      >
                        ✓
                      </motion.span>
                    )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="mt-6 text-center"
          >
            <div
              className={`text-4xl p-6 rounded-3xl ${
                isCorrect
                  ? "bg-[#6FD47C]/20 text-[#6FD47C]"
                  : "bg-[#FF6B6B]/20 text-[#FF6B6B]"
              }`}
            >
              {isCorrect ? "🎉 Correct!" : "💭 Try again next time!"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
