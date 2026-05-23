import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { TOPICS } from "../data/topics";
import { ChevronLeft, Star, Trophy } from "lucide-react";

export function TopicOverview() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  // Mock user progress - in real app would come from state/backend
  const completedLevels = new Set([1]);
  const currentLevel = 2;
  const LEVELS_PER_PAGE = 6;
  const levelPages = Math.ceil(topic.levels.length / LEVELS_PER_PAGE);
  const pageLevels = topic.levels.slice(
    currentPage * LEVELS_PER_PAGE,
    currentPage * LEVELS_PER_PAGE + LEVELS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-end">
          <button
            className="rounded-full bg-white shadow-lg border border-slate-200 p-4 transition hover:-translate-y-0.5"
            onClick={() => navigate("/world-map")}
          >
            <ChevronLeft className="w-6 h-6 text-purple-800" />
          </button>

          <div className="text-center md:text-left md:flex-1">
            <div className="text-8xl mb-4">{topic.emoji}</div>
            <h1 className="text-4xl font-bold" style={{ color: topic.color }}>
              {topic.name}
            </h1>
            <p className="text-base text-slate-600 mt-3 max-w-2xl">
              {topic.description}
            </p>
          </div>

          <div className="hidden md:block w-16" />
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mt-8">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-7 h-7 text-purple-600" />
              <span className="font-semibold text-slate-800">Stars</span>
            </div>
            <p className="text-3xl font-bold text-purple-800">
              {topic.totalStars}/{topic.levels.length * 3}
            </p>
          </div>

          <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-7 h-7 text-yellow-500" />
              <span className="font-semibold text-slate-800">Levels</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {completedLevels.size}/{topic.levels.length}
            </p>
          </div>
        </div>
      </header>

      {/* Levels Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageLevels.map((level) => {
            const isCompleted = completedLevels.has(level.levelNumber);
            const isLocked = level.levelNumber > currentLevel;
            const isCurrent = level.levelNumber === currentLevel;

            return (
              <button
                key={level.levelNumber}
                type="button"
                disabled={isLocked}
                onClick={() => navigate(`/vocabulary/${topicId}/${level.levelNumber}`)}
                className={`group rounded-3xl border-2 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isLocked ? "cursor-not-allowed opacity-70" : "hover:shadow-2xl"
                } ${isCurrent ? "ring-4 ring-yellow-300" : ""}`}
                style={{ borderColor: isCurrent ? topic.color : "#eef2ff" }}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Level {level.levelNumber}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{isCurrent ? "Current Level" : isCompleted ? "Completed" : isLocked ? "Locked" : "Ready"}</h3>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                    {isCurrent ? "Now" : isLocked ? "Locked" : "Play"}
                  </div>
                </div>

                <div className="mb-5 space-y-2 text-sm text-slate-600">
                  <p>Target: <span className="font-semibold text-slate-900">{level.targetScore}</span></p>
                  <p>Moves: <span className="font-semibold text-slate-900">{level.moves}</span></p>
                  <p>Words: <span className="font-semibold text-slate-900">{level.words.length}</span></p>
                </div>

                <div className="flex items-center gap-2 text-yellow-400">
                  {[...Array(3)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-6 h-6 ${isCompleted ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600">Page {currentPage + 1} of {levelPages}</span>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, levelPages - 1))}
            disabled={currentPage === levelPages - 1}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Mascot */}
      <motion.div
        className="fixed bottom-8 right-8 text-6xl z-50"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐝✨
      </motion.div>
    </div>
  );
}
