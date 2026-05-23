import { motion } from "motion/react";

export function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    emoji: ["🍬", "🍭", "🐝", "⭐", "🍯", "🌟", "✨"][i % 7],
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }));

  return (
    // <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    //   {particles.map((particle) => (
    //     <motion.div
    //       key={particle.id}
    //       className="absolute text-4xl opacity-30"
    //       style={{ left: `${particle.x}%`, top: "-10%" }}
    //       animate={{
    //         y: ["0vh", "110vh"],
    //         rotate: [0, 360],
    //         x: [0, Math.sin(particle.id) * 50],
    //       }}
    //       transition={{
    //         duration: particle.duration,
    //         delay: particle.delay,
    //         repeat: Infinity,
    //         ease: "linear",
    //       }}
    //     >
    //       {particle.emoji}
    //     </motion.div>
    //   ))}
    // </div>
    <div/>
  );
}
