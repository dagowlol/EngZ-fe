import { Link } from "react-router";
import { motion } from "motion/react";
import { CandyButton } from "../components/CandyButton";
import { CandyCard } from "../components/CandyCard";
import { BeeAvatar } from "../components/BeeAvatar";
import { FloatingParticles } from "../components/FloatingParticles";
import { Mail } from "lucide-react";

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFE4F0] to-[#E8E4FF] relative overflow-hidden flex items-center justify-center">
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-md mx-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <CandyCard color="white" hover={false}>
            {/* Bee Mascot */}
            <div className="flex justify-center mb-6">
              <BeeAvatar size="lg" />
            </div>

            {/* Title */}
            <h1 className="text-4xl text-center mb-2 bg-gradient-to-r from-[#FF6FAE] to-[#B388FF] bg-clip-text text-transparent">
              Welcome Back! 👋
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Let's continue your learning adventure!
            </p>

            {/* Login Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2 text-lg">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-6 py-4 rounded-3xl border-4 border-[#FFD93D] focus:border-[#FF6FAE] outline-none text-lg transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-lg">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-6 py-4 rounded-3xl border-4 border-[#6EC6FF] focus:border-[#B388FF] outline-none text-lg transition-colors"
                />
              </div>
            </div>

            {/* Login Button */}
            <Link to="/world-map" className="block mb-6">
              <CandyButton color="pink" size="lg" className="w-full">
                🚀 Let's Go!
              </CandyButton>
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />
              <span className="text-gray-500">or</span>
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button className="w-full px-6 py-4 rounded-3xl bg-white border-4 border-gray-200 hover:border-[#FFD93D] transition-all flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🔵</span>
                Continue with Google
              </button>
              <button className="w-full px-6 py-4 rounded-3xl bg-white border-4 border-gray-200 hover:border-[#6EC6FF] transition-all flex items-center justify-center gap-3 text-lg">
                <Mail size={24} className="text-[#6EC6FF]" />
                Continue with Email
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                New to FunBee?{" "}
                <a href="#" className="text-[#FF6FAE] hover:text-[#B388FF] transition-colors">
                  Create Account
                </a>
              </p>
            </div>
          </CandyCard>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/">
              <CandyButton color="purple" size="md">
                ← Back to Home
              </CandyButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
