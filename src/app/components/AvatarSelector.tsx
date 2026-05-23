import { useState } from "react";
import { motion } from "motion/react";
import { CandyButton } from "./CandyButton";
import { CandyCard } from "./CandyCard";

const avatars = [
  { id: 1, emoji: "🐝", name: "Bee", color: "#FFD93D" },
  { id: 2, emoji: "🦊", name: "Fox", color: "#FFA94D" },
  { id: 3, emoji: "🐱", name: "Cat", color: "#FF6FAE" },
  { id: 4, emoji: "🐶", name: "Dog", color: "#6EC6FF" },
  { id: 5, emoji: "🐼", name: "Panda", color: "#B388FF" },
  { id: 6, emoji: "🐻", name: "Bear", color: "#6FD47C" },
  { id: 7, emoji: "🦁", name: "Lion", color: "#FFD93D" },
  { id: 8, emoji: "🐰", name: "Bunny", color: "#FF6FAE" },
];

interface AvatarSelectorProps {
  selectedAvatar?: number;
  onSelect: (avatarId: number) => void;
}

export function AvatarSelector({ selectedAvatar = 1, onSelect }: AvatarSelectorProps) {
  const [selected, setSelected] = useState(selectedAvatar);

  const handleSelect = (id: number) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {avatars.map((avatar, index) => (
        <motion.div
          key={avatar.id}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => handleSelect(avatar.id)}
          className="cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              aspect-square rounded-3xl flex flex-col items-center justify-center
              border-4 transition-all shadow-lg
              ${
                selected === avatar.id
                  ? "border-white shadow-2xl ring-4 ring-[#FF6FAE]"
                  : "border-white/50"
              }
            `}
            style={{ backgroundColor: avatar.color }}
          >
            <div className="text-5xl mb-2">{avatar.emoji}</div>
            <div className="text-sm text-white">{avatar.name}</div>
            {selected === avatar.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
