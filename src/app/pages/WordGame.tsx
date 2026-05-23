import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { TOPICS } from "../data/topics";
import { Heart, Star, Coins, Trophy, Sparkles, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

interface GridCell {
  id: string;
  letter: string;
  word: string;
  color: string;
  isMatched: boolean;
  row: number;
  col: number;
}

interface SelectedCell {
  row: number;
  col: number;
}

const CANDY_COLORS = [
  "#FF6FAE", // Pink
  "#FFD93D", // Yellow
  "#6EC6FF", // Blue
  "#B388FF", // Purple
  "#FFA94D", // Orange
];

export function WordGame() {
  const { topicId, level } = useParams<{ topicId: string; level: string }>();
  const navigate = useNavigate();

  const topic = TOPICS.find((t) => t.id === topicId);
  const levelNumber = parseInt(level || "1");
  const currentLevel = topic?.levels.find((l) => l.levelNumber === levelNumber);

  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(currentLevel?.moves || 20);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [matchedWords, setMatchedWords] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  if (!topic || !currentLevel) {
    return <div>Topic or Level not found</div>;
  }

  const { rows, cols } = currentLevel.gridSize;
  const words = currentLevel.words;

  // Initialize grid
  useEffect(() => {
    const newGrid: GridCell[][] = [];
    for (let row = 0; row < rows; row++) {
      const gridRow: GridCell[] = [];
      for (let col = 0; col < cols; col++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomLetter =
          randomWord.word[Math.floor(Math.random() * randomWord.word.length)];
        gridRow.push({
          id: `${row}-${col}`,
          letter: randomLetter.toUpperCase(),
          word: randomWord.word,
          color: CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)],
          isMatched: false,
          row,
          col,
        });
      }
      newGrid.push(gridRow);
    }
    setGrid(newGrid);
  }, [rows, cols, words]);

  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row][col];
    if (cell.isMatched) return;

    const isAlreadySelected = selectedCells.some(
      (s) => s.row === row && s.col === col
    );

    if (isAlreadySelected) {
      setSelectedCells(selectedCells.filter((s) => !(s.row === row && s.col === col)));
    } else {
      const newSelected = [...selectedCells, { row, col }];
      setSelectedCells(newSelected);

      // Check if we formed a word
      if (newSelected.length >= 3) {
        checkForWord(newSelected);
      }
    }
  };

  const checkForWord = (selected: SelectedCell[]) => {
    const letters = selected
      .map((s) => grid[s.row][s.col].letter)
      .join("")
      .toLowerCase();

    // Check if the letters match any word from the topic
    const foundWord = words.find((w) => {
      const word = w.word.toLowerCase();
      return word === letters || letters.includes(word) || word.includes(letters);
    });

    if (foundWord && selected.length >= foundWord.word.length) {
      handleMatch(selected, foundWord.word);
    }
  };

  const handleMatch = (selected: SelectedCell[], word: string) => {
    // Mark cells as matched
    const newGrid = grid.map((row) =>
      row.map((cell) => {
        const isSelected = selected.some((s) => s.row === cell.row && s.col === cell.col);
        if (isSelected) {
          return { ...cell, isMatched: true };
        }
        return cell;
      })
    );
    setGrid(newGrid);
    setSelectedCells([]);

    // Update score and stats
    const wordScore = word.length * 100;
    setScore((prev) => prev + wordScore);
    setCoins((prev) => prev + 10);
    setMatchedWords((prev) => new Set([...prev, word]));
    setMoves((prev) => prev - 1);

    // Celebration
    showWordCelebration(word, wordScore);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    // Speak the word
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);

    // Fill empty cells
    setTimeout(() => {
      fillEmptyCells(newGrid);
    }, 500);

    // Check for level completion
    if (matchedWords.size + 1 >= words.length || score + wordScore >= currentLevel.targetScore) {
      setTimeout(() => {
        navigate(`/level-complete/${topicId}/${level}`, {
          state: { score, stars: 3, coins },
        });
      }, 2000);
    }
  };

  const fillEmptyCells = (currentGrid: GridCell[][]) => {
    const newGrid = currentGrid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell.isMatched) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          const randomLetter =
            randomWord.word[Math.floor(Math.random() * randomWord.word.length)];
          return {
            id: `${rowIndex}-${colIndex}-${Date.now()}`,
            letter: randomLetter.toUpperCase(),
            word: randomWord.word,
            color: CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)],
            isMatched: false,
            row: rowIndex,
            col: colIndex,
          };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const showWordCelebration = (word: string, points: number) => {
    const messages = ["Sweet!", "Amazing!", "Excellent!", "Fantastic!", "Brilliant!"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    setCelebrationMessage(`${message} "${word}" +${points}!`);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const isSelected = (row: number, col: number) => {
    return selectedCells.some((s) => s.row === row && s.col === col);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${topic.color}20, ${topic.color}40)`,
      }}
    >
      <button
        type="button"
        className="absolute top-4 left-4 z-20 bg-white/90 rounded-full px-4 py-3 shadow-lg border-2 border-purple-400 text-sm font-semibold text-purple-800 hover:bg-white"
        onClick={() => navigate(`/topic/${topicId}`)}
      >
        ← Return
      </button>

      {/* Header Stats */}
      <header className="p-4 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Lives */}
          <div className="flex items-center gap-2">
            {[...Array(lives)].map((_, i) => (
              <Heart
                key={i}
                className="w-10 h-10 fill-red-500 text-red-500"
              />
            ))}
          </div>

          {/* Center: Level Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-800">
              {topic.emoji} {topic.name} - Level {levelNumber}
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="bg-white/90 rounded-full px-4 py-1 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-800">
                  {score}/{currentLevel.targetScore}
                </span>
              </div>
              <div className="bg-white/90 rounded-full px-4 py-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-purple-800">{moves} moves</span>
              </div>
            </div>
          </div>

          {/* Right: Coins */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg border-4 border-white">
            <Coins className="w-6 h-6 text-white" />
            <span className="font-bold text-2xl text-white">{coins}</span>
          </div>
        </div>
      </header>

      {/* Main Game Grid */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-6 py-8">
        <div className="relative">
          {/* Grid Container */}
          <div
            className="grid gap-2 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border-8"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              borderColor: topic.color,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const selected = isSelected(rowIndex, colIndex);
                return (
                  <motion.button
                    key={cell.id}
                    className={`
                      relative w-16 h-16 rounded-2xl font-bold text-2xl text-white shadow-lg
                      border-4 border-white
                      ${cell.isMatched ? "opacity-0 pointer-events-none" : ""}
                      ${selected ? "ring-4 ring-yellow-400" : ""}
                    `}
                    style={{
                      background: selected
                        ? `linear-gradient(135deg, ${cell.color}, ${cell.color}dd)`
                        : `linear-gradient(135deg, ${cell.color}, ${cell.color}cc)`,
                    }}
                    whileHover={!cell.isMatched ? { scale: 1.1, rotate: 5 } : {}}
                    whileTap={!cell.isMatched ? { scale: 0.95 } : {}}
                    animate={
                      cell.isMatched
                        ? {
                            scale: 0,
                            rotate: 360,
                            opacity: 0,
                          }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell.letter}
                    {selected && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm text-purple-800 border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {selectedCells.findIndex(
                          (s) => s.row === rowIndex && s.col === colIndex
                        ) + 1}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Current Word Preview */}
          {selectedCells.length > 0 && (
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl px-8 py-4 shadow-2xl border-4 border-purple-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-3xl font-bold text-purple-800">
                {selectedCells.map((s) => grid[s.row][s.col].letter).join("")}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Words to Find */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-purple-400 max-w-xs">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          Find Words
        </h3>
        <div className="space-y-2">
          {words.map((word) => (
            <div
              key={word.word}
              className={`
                flex items-center gap-3 p-3 rounded-2xl
                ${
                  matchedWords.has(word.word)
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-gray-100"
                }
              `}
            >
              <span className="text-3xl">{word.image}</span>
              <span
                className={`font-bold text-xl ${
                  matchedWords.has(word.word)
                    ? "line-through text-green-600"
                    : "text-gray-800"
                }`}
              >
                {word.word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 text-white rounded-3xl px-12 py-8 shadow-2xl border-8 border-white">
              <p className="text-5xl font-bold text-center">{celebrationMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <motion.div
        className="fixed bottom-8 right-8 text-6xl z-50"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐝✨
      </motion.div>
    </div>
  );
}
