import { motion } from "motion/react";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "pink" | "yellow" | "blue" | "purple" | "orange";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function Badge({
  children,
  color = "pink",
  size = "md",
  animated = false,
  className = "",
}: BadgeProps) {
  const colorClasses = {
    pink: "bg-gradient-to-br from-[#FF6FAE] to-[#FF8FC0]",
    yellow: "bg-gradient-to-br from-[#FFD93D] to-[#FFE470]",
    blue: "bg-gradient-to-br from-[#6EC6FF] to-[#8DD4FF]",
    purple: "bg-gradient-to-br from-[#B388FF] to-[#C5A0FF]",
    orange: "bg-gradient-to-br from-[#FFA94D] to-[#FFBD70]",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const BadgeContent = (
    <div
      className={`
        ${colorClasses[color]}
        ${sizeClasses[size]}
        text-white
        rounded-full
        shadow-md
        inline-flex
        items-center
        gap-2
        border-2
        border-white
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
}
