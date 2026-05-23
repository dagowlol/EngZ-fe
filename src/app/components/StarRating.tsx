import { Star } from "lucide-react";
import { motion } from "motion/react";

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: number;
}

export function StarRating({ stars, maxStars = 3, size = 24 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          <Star
            size={size}
            className={i < stars ? "fill-[#FFD93D] text-[#FFD93D]" : "fill-gray-300 text-gray-300"}
          />
        </motion.div>
      ))}
    </div>
  );
}
