import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { motion } from "motion/react";
import { TOPICS } from "../data/topics";
import { Star, Coins, Trophy, ChevronRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export function LevelComplete() {
  const { topicId, level } = useParams<{ topicId: string; level: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const topic = TOPICS.find((t) => t.id === topicId);
  const levelNumber = parseInt(level || "1");
  const currentLevel = topic?.levels.find((l) => l.levelNumber === levelNumber);

  const { score = 0, stars = 3, coins = 0 } = (location.state as any) || {};

  useEffect(() => {
    // Trigger celebration confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#FF6FAE", "#FFD93D", "#6EC6FF", "#B388FF", "#FFA94D"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#FF6FAE", "#FFD93D", "#6EC6FF", "#B388FF", "#FFA94D"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  if (!topic || !currentLevel) {
    return <div>Topic or Level not found</div>;
  }

  const hasNextLevel = levelNumber < topic.levels.length;

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(to bottom right, ${topic.color}30, ${topic.color}50)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {["🌟", "🎉", "✨", "🍬", "🐝"][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        className="relative z-10 max-w-2xl w-full mx-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div
          className="bg-white rounded-[3rem] p-12 shadow-2xl border-8"
          style={{ borderColor: topic.color }}
        >
          {/* Trophy Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 20, -20, 0] }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative">
              <Trophy className="w-32 h-32 text-yellow-400 fill-yellow-400" />
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-6xl font-bold text-center mb-4"
            style={{ color: topic.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Level Complete!
          </motion.h1>

          <motion.p
            className="text-3xl text-center text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Amazing work! 🎉
          </motion.p>

          {/* Stars */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{
                  opacity: i < stars ? 1 : 0.3,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{ delay: 0.9 + i * 0.2 }}
              >
                <Star
                  className={`w-20 h-20 ${
                    i < stars
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {/* Score */}
            <div
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-6 flex items-center justify-between border-4"
              style={{ borderColor: topic.color }}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-10 h-10 text-purple-600" />
                <span className="text-2xl font-bold text-gray-800">Score</span>
              </div>
              <span className="text-4xl font-bold text-purple-800">{score}</span>
            </div>

            {/* Coins Earned */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 flex items-center justify-between border-4 border-yellow-400">
              <div className="flex items-center gap-3">
                <Coins className="w-10 h-10 text-orange-600" />
                <span className="text-2xl font-bold text-gray-800">Coins Earned</span>
              </div>
              <span className="text-4xl font-bold text-orange-600">+{coins}</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {hasNextLevel ? (
              <motion.button
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full py-6 shadow-2xl border-4 border-white font-bold text-3xl flex items-center justify-center gap-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/vocabulary/${topicId}/${levelNumber + 1}`)}
              >
                <span>Next Level</span>
                <ChevronRight className="w-10 h-10" />
              </motion.button>
            ) : (
              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full py-6 shadow-2xl border-4 border-white font-bold text-3xl flex items-center justify-center gap-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/world-map")}
              >
                <span>Topic Complete! 🎉</span>
              </motion.button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                className="bg-white text-purple-800 rounded-full py-4 shadow-lg border-4 border-purple-400 font-bold text-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/vocabulary/${topicId}/${levelNumber}`)}
              >
                <RotateCcw className="w-6 h-6" />
                <span>Replay</span>
              </motion.button>

              <motion.button
                className="bg-white text-purple-800 rounded-full py-4 shadow-lg border-4 border-purple-400 font-bold text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/topic/${topicId}`)}
              >
                Level Map
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mascot */}
      <motion.div
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 text-8xl z-50"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐝🎉
      </motion.div>
    </div>
  );
}
