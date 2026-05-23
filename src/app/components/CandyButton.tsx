import { motion } from "motion/react";
import { ReactNode } from "react";

interface CandyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: "pink" | "yellow" | "blue" | "purple" | "orange" | "green";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
}

export function CandyButton({
  children,
  onClick,
  color = "pink",
  size = "md",
  className = "",
  disabled = false,
}: CandyButtonProps) {
  const colorClasses = {
    pink: "bg-[#FF6FAE] hover:bg-[#FF5A9E] shadow-[0_6px_0_#D5487A]",
    yellow: "bg-[#FFD93D] hover:bg-[#FFC91D] shadow-[0_6px_0_#D9B520]",
    blue: "bg-[#6EC6FF] hover:bg-[#5AB6FF] shadow-[0_6px_0_#4A9AD9]",
    purple: "bg-[#B388FF] hover:bg-[#A378FF] shadow-[0_6px_0_#8A5DD9]",
    orange: "bg-[#FFA94D] hover:bg-[#FF991D] shadow-[0_6px_0_#D98820]",
    green: "bg-[#6FD47C] hover:bg-[#5FC46C] shadow-[0_6px_0_#4AAA57]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-2xl",
    md: "px-6 py-3 text-base rounded-3xl",
    lg: "px-8 py-4 text-lg rounded-3xl",
    xl: "px-12 py-6 text-2xl rounded-[2rem]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colorClasses[color]}
        ${sizeClasses[size]}
        text-white
        transition-all
        active:translate-y-[6px]
        active:shadow-none
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
