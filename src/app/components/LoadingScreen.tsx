import { motion } from "motion/react";
import { BeeAvatar } from "./BeeAvatar";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFE4F0] to-[#E8E4FF] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <BeeAvatar size="xl" />
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl mt-8 bg-gradient-to-r from-[#FF6FAE] to-[#B388FF] bg-clip-text text-transparent"
        >
          Loading FunBee...
        </motion.h2>
        <motion.div
          className="mt-6 flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-[#FF6FAE] rounded-full"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
