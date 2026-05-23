import { motion } from "motion/react";
import { ReactNode } from "react";

interface CandyCardProps {
  children: ReactNode;
  color?: "pink" | "yellow" | "blue" | "purple" | "orange" | "white";
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function CandyCard({
  children,
  color = "white",
  className = "",
  onClick,
  hover = true,
}: CandyCardProps) {
  const colorClasses = {
    pink: "bg-gradient-to-br from-[#FF6FAE] to-[#FF8FC0]",
    yellow: "bg-gradient-to-br from-[#FFD93D] to-[#FFE470]",
    blue: "bg-gradient-to-br from-[#6EC6FF] to-[#8DD4FF]",
    purple: "bg-gradient-to-br from-[#B388FF] to-[#C5A0FF]",
    orange: "bg-gradient-to-br from-[#FFA94D] to-[#FFBD70]",
    white: "bg-white",
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.05, y: -4 } : {}}
      onClick={onClick}
      className={`
        ${colorClasses[color]}
        rounded-3xl
        p-6
        shadow-xl
        border-4
        border-white
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
