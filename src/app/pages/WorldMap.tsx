import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { TOPICS } from "../data/topics";
import { Lock, Star, Trophy } from "lucide-react";

export function WorldMap() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate user's total stars (mock data for now)
  const userStars = 15;
  const ITEMS_PER_PAGE = 6;
  const topicPages = Math.ceil(TOPICS.length / ITEMS_PER_PAGE);
  const pageTopics = TOPICS.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handleTopicClick = (topicId: string, isLocked: boolean, starsRequired: number) => {
    if (isLocked && userStars < starsRequired) {
      // Show locked message
      return;
    }
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">

      {/* Header */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-6xl">🐝</div>
          <div>
            <h1 className="font-bold text-3xl text-purple-800">FunBee</h1>
            <p className="text-purple-600">Choose You r Adventure!</p>
          </div>
        </div>

        {/* User Stats */}
        <div className="flex items-center gap-6">
          <motion.div
            className="bg-white/90 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg border-4 border-yellow-300"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-2xl text-purple-800">{userStars}</span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
          >
            👤
          </motion.button>
        </div>
      </header>

      {/* World Map Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-purple-800 mb-3">
            Learning Worlds
          </h2>
          <p className="text-lg text-purple-600">
            Tap a world to start your magical journey! ✨
          </p>
        </div>

        {/* Topics Grid */}
        <div>
          {/* Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {pageTopics.map((topic) => {
              const isLocked = topic.isLocked && userStars < topic.starsRequired;

              return (
                <div key={topic.id} className="relative">
                  <div
                    className={`relative cursor-pointer overflow-hidden rounded-3xl border-4 border-transparent bg-white/95 shadow-lg transition duration-200 ${
                      isLocked ? "opacity-60" : "hover:-translate-y-1 hover:shadow-xl"
                    }`}
                    style={{ borderColor: topic.color }}
                    onClick={() => handleTopicClick(topic.id, topic.isLocked, topic.starsRequired)}
                  >
                    <div
                      className="absolute inset-0 rounded-3xl opacity-30"
                      style={{ background: topic.color }}
                    />

                    <div className="relative p-5">
                      {/* Lock Overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-gray-900/40 rounded-3xl flex flex-col items-center justify-center z-10">
                          <Lock className="w-16 h-16 text-white mb-2" />
                          <p className="text-white font-bold text-xl">
                            {topic.starsRequired} ⭐ needed
                          </p>
                        </div>
                      )}

                      {/* Topic Emoji/Icon */}
                      <div className="text-7xl mb-4 text-center">{topic.emoji}</div>

                      {/* Topic Info */}
                      <h3 className="text-2xl font-bold text-center mb-2" style={{ color: topic.color }}>
                        {topic.name}
                      </h3>
                      <p className="text-gray-600 text-center text-base mb-4">
                        {topic.description}
                      </p>

                      {/* Difficulty Indicator */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < topic.difficulty
                                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-purple-800">
                            {topic.totalStars}/{topic.levels.length * 3}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-600">
                            {topic.levels.length} levels
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              className="rounded-full border border-purple-300 bg-white/90 px-4 py-2 text-sm font-semibold text-purple-800 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {Array.from({ length: topicPages }, (_, page) => (
              <button
                key={page}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-purple-700 text-white"
                    : "bg-white/90 text-purple-800 border border-purple-200"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="rounded-full border border-purple-300 bg-white/90 px-4 py-2 text-sm font-semibold text-purple-800 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, topicPages - 1))}
              disabled={currentPage >= topicPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer Mascot */}
      <div className="fixed bottom-8 left-8 text-4xl z-50">🐝✨</div>
    </div>
  );
}
