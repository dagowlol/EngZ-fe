import { Link } from "react-router";
import { motion } from "motion/react";
import { CandyButton } from "../components/CandyButton";
import { CandyCard } from "../components/CandyCard";
import { BeeAvatar } from "../components/BeeAvatar";
import { FloatingParticles } from "../components/FloatingParticles";
import { BookOpen, Gamepad2, Trophy, Globe } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Landing() {
  const features = [
    {
      icon: <BookOpen size={40} />,
      title: "Learn by Topics",
      description: "Discover words through fun themed worlds",
      color: "blue" as const,
    },
    {
      icon: <Gamepad2 size={40} />,
      title: "Word Candy Game",
      description: "Match letters in a Candy Crush style game",
      color: "pink" as const,
    },
    {
      icon: <Trophy size={40} />,
      title: "Earn Stars & Coins",
      description: "Unlock new topics and achievements",
      color: "yellow" as const,
    },
    {
      icon: <Globe size={40} />,
      title: "Progress & Grow",
      description: "Level up as you master more words",
      color: "purple" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFE4F0] to-[#E8E4FF] relative overflow-hidden">
      <FloatingParticles />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <BeeAvatar size="sm" />
          <span className="text-3xl text-[#FF6FAE]">FunBee</span>
        </motion.div>
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Link to="/login">
            <CandyButton color="blue" size="md">
              Login
            </CandyButton>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-7xl mb-6 bg-gradient-to-r from-[#FF6FAE] via-[#FFD93D] to-[#B388FF] bg-clip-text text-transparent">
              Learn English the Fun Way! 🎉
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Join FunBee on a magical adventure to learn English through games, stories, and
              exciting challenges!
            </p>
            <div className="flex gap-4">
              <Link to="/world-map">
                <CandyButton color="pink" size="xl">
                  🚀 Start Learning
                </CandyButton>
              </Link>
              <Link to="/login">
                <CandyButton color="purple" size="xl">
                  🎮 Play Now
                </CandyButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <BeeAvatar size="xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl text-center mb-16 bg-gradient-to-r from-[#FF6FAE] to-[#B388FF] bg-clip-text text-transparent"
        >
          Why Kids Love FunBee ✨
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CandyCard color={feature.color}>
                <div className="text-white text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-lg opacity-90">{feature.description}</p>
                </div>
              </CandyCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parent Trust Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <CandyCard color="white" hover={false} className="text-center">
            <h2 className="text-4xl mb-6 text-[#FF6FAE]">Trusted by Parents Worldwide 👪</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              FunBee provides a safe, ad-free learning environment designed by education experts.
              Track your child's progress and celebrate their achievements together!
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-5xl mb-3">🎓</div>
                <h3 className="text-3xl text-[#6EC6FF] mb-2">Expert Designed</h3>
                <p className="text-gray-600">Created by education professionals</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-3">🔒</div>
                <h3 className="text-3xl text-[#B388FF] mb-2">100% Safe</h3>
                <p className="text-gray-600">Kid-friendly and ad-free</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-3">📊</div>
                <h3 className="text-3xl text-[#FFA94D] mb-2">Track Progress</h3>
                <p className="text-gray-600">Detailed learning analytics</p>
              </div>
            </div>
          </CandyCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/50 backdrop-blur-sm py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <BeeAvatar size="md" animated={false} />
          </div>
          <p className="text-xl text-gray-600 mb-4">
            © 2026 FunBee Learning Platform. Made with 💛 for kids everywhere!
          </p>
          <div className="flex justify-center gap-6 text-lg text-gray-600">
            <a href="#" className="hover:text-[#FF6FAE]">
              About
            </a>
            <a href="#" className="hover:text-[#FF6FAE]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#FF6FAE]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
