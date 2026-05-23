import { motion } from "motion/react";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "pink" | "yellow" | "blue" | "purple" | "orange";
  showLabel?: boolean;
  height?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max,
  color = "yellow",
  showLabel = true,
  height = "md",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    pink: "from-[#FF6FAE] to-[#FF8FC0]",
    yellow: "from-[#FFD93D] to-[#FFE470]",
    blue: "from-[#6EC6FF] to-[#8DD4FF]",
    purple: "from-[#B388FF] to-[#C5A0FF]",
    orange: "from-[#FFA94D] to-[#FFBD70]",
  };

  const heightClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };

  return (
    <div className="w-full">
      <div
        className={`
        ${heightClasses[height]}
        bg-white
        rounded-full
        overflow-hidden
        border-4
        border-white
        shadow-lg
      `}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <div className="text-center mt-1 text-sm text-gray-600">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
