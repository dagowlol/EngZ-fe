import { motion } from "motion/react";

interface BeeAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export function BeeAvatar({ size = "md", animated = true, className = "" }: BeeAvatarProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-2xl",
    md: "w-20 h-20 text-4xl",
    lg: "w-32 h-32 text-6xl",
    xl: "w-48 h-48 text-8xl",
  };

  const BeeContent = () => (
    <div
      className={`
      ${sizeClasses[size]}
      bg-gradient-to-br from-[#FFD93D] to-[#FFA94D]
      rounded-full
      flex
      items-center
      justify-center
      shadow-xl
      border-4
      border-white
      ${className}
    `}
    >
      <span>🐝</span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BeeContent />
      </motion.div>
    );
  }

  return <BeeContent />;
}
