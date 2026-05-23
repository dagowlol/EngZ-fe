import { Volume2 } from "lucide-react";
import { motion } from "motion/react";

interface SoundButtonProps {
  text: string;
  size?: number;
  color?: string;
  className?: string;
}

export function SoundButton({ text, size = 32, color = "#6EC6FF", className = "" }: SoundButtonProps) {
  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={playSound}
      className={`rounded-full p-3 shadow-lg transition-colors ${className}`}
      style={{ backgroundColor: color }}
    >
      <Volume2 size={size} className="text-white" />
    </motion.button>
  );
}
