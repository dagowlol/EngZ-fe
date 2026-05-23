import { useNavigate } from "react-router";
import { ChevronLeft, Star, Trophy, Flame, Target, Award, Book } from "lucide-react";

export function Profile() {
  const navigate = useNavigate();

  // Mock user data - in real app would come from state/backend
  const userProfile = {
    name: "Little Learner",
    avatar: "🧒",
    level: 12,
    totalStars: 45,
    totalCoins: 890,
    streak: 7,
    wordsLearned: 156,
    topicsCompleted: 3,
    achievements: [
      { id: 1, name: "First Steps", icon: "👣", description: "Complete your first level" },
      { id: 2, name: "Word Master", icon: "📚", description: "Learn 100 words" },
      { id: 3, name: "Star Collector", icon: "⭐", description: "Collect 50 stars" },
      { id: 4, name: "Speed Learner", icon: "⚡", description: "Complete a level in under 10 moves" },
      { id: 5, name: "Streak Hero", icon: "🔥", description: "Maintain a 7-day streak" },
      { id: 6, name: "Topic Champion", icon: "🏆", description: "Complete all levels in a topic" },
    ],
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border-4 border-white"
            onClick={() => navigate("/world-map")}
          >
            <ChevronLeft className="w-6 h-6 text-purple-800" />
          </button>

          <h1 className="text-4xl font-bold text-purple-800">My Profile</h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-400">
              {/* Avatar */}
              <div className="text-9xl text-center mb-4">
                {userProfile.avatar}
              </div>

              {/* Name */}
              <h2 className="text-3xl font-bold text-center text-purple-800 mb-2">
                {userProfile.name}
              </h2>

              {/* Level */}
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full py-2 px-6 text-center font-bold text-xl mb-6">
                Level {userProfile.level}
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-yellow-100 rounded-2xl p-4 border-4 border-yellow-300">
                  <div className="flex items-center gap-3">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">Stars</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-800">
                    {userProfile.totalStars}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-orange-100 rounded-2xl p-4 border-4 border-orange-300">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-orange-600" />
                    <span className="font-bold text-gray-800">Coins</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {userProfile.totalCoins}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-red-100 rounded-2xl p-4 border-4 border-red-300">
                  <div className="flex items-center gap-3">
                    <Flame className="w-8 h-8 text-red-600" />
                    <span className="font-bold text-gray-800">Streak</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">
                    {userProfile.streak} days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-blue-400">
              <h3 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                <Target className="w-8 h-8" />
                Learning Progress
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 text-center border-4 border-purple-300">
                  <Book className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="text-5xl font-bold text-purple-800 mb-2">
                    {userProfile.wordsLearned}
                  </p>
                  <p className="text-gray-600 font-medium">Words Learned</p>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center border-4 border-blue-300">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-5xl font-bold text-blue-800 mb-2">
                    {userProfile.topicsCompleted}
                  </p>
                  <p className="text-gray-600 font-medium">Topics Completed</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 text-center border-4 border-yellow-300">
                  <Star className="w-12 h-12 fill-yellow-400 text-yellow-400 mx-auto mb-3" />
                  <p className="text-5xl font-bold text-orange-800 mb-2">
                    {userProfile.totalStars}
                  </p>
                  <p className="text-gray-600 font-medium">Total Stars</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-green-400">
              <h3 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                Achievements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-4 border-yellow-300 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl border-2 border-white">
                        ✓
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
