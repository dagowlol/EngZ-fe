export interface VocabularyWord {
  word: string;
  translation?: string;
  pronunciation: string;
  image: string;
  exampleSentence: string;
  difficulty: 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard
}

export interface TopicLevel {
  levelNumber: number;
  words: VocabularyWord[];
  targetScore: number;
  moves: number;
  gridSize: { rows: number; cols: number };
  obstacles?: string[]; // Types of obstacles for this level
  specialMechanics?: string[]; // Special game mechanics
}

export interface Topic {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // Overall topic difficulty
  starsRequired: number; // Stars needed to unlock
  levels: TopicLevel[];
  isLocked: boolean;
  completed: boolean;
  totalStars: number; // Stars earned in this topic
}

// Mock data for topics with progressive difficulty
export const TOPICS: Topic[] = [
  {
    id: "colors",
    name: "Colors",
    emoji: "🎨",
    description: "Learn beautiful colors!",
    color: "#FF6FAE",
    difficulty: 1,
    starsRequired: 0,
    isLocked: false,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 500,
        moves: 20,
        gridSize: { rows: 6, cols: 6 },
        words: [
          {
            word: "red",
            pronunciation: "/rɛd/",
            image: "🔴",
            exampleSentence: "The apple is red.",
            difficulty: 1,
          },
          {
            word: "blue",
            pronunciation: "/bluː/",
            image: "🔵",
            exampleSentence: "The sky is blue.",
            difficulty: 1,
          },
          {
            word: "yellow",
            pronunciation: "/ˈjɛloʊ/",
            image: "🟡",
            exampleSentence: "The sun is yellow.",
            difficulty: 1,
          },
          {
            word: "green",
            pronunciation: "/ɡriːn/",
            image: "🟢",
            exampleSentence: "The grass is green.",
            difficulty: 1,
          },
        ],
      },
      {
        levelNumber: 2,
        targetScore: 800,
        moves: 18,
        gridSize: { rows: 7, cols: 7 },
        words: [
          {
            word: "purple",
            pronunciation: "/ˈpɜːrpəl/",
            image: "🟣",
            exampleSentence: "I like purple flowers.",
            difficulty: 2,
          },
          {
            word: "orange",
            pronunciation: "/ˈɔːrɪndʒ/",
            image: "🟠",
            exampleSentence: "The orange is orange.",
            difficulty: 2,
          },
          {
            word: "pink",
            pronunciation: "/pɪŋk/",
            image: "🩷",
            exampleSentence: "The pink candy is sweet.",
            difficulty: 2,
          },
          {
            word: "brown",
            pronunciation: "/braʊn/",
            image: "🟤",
            exampleSentence: "The bear is brown.",
            difficulty: 2,
          },
        ],
        specialMechanics: ["combo-system"],
      },
      {
        levelNumber: 3,
        targetScore: 1200,
        moves: 15,
        gridSize: { rows: 8, cols: 8 },
        words: [
          {
            word: "white",
            pronunciation: "/waɪt/",
            image: "⚪",
            exampleSentence: "Snow is white.",
            difficulty: 2,
          },
          {
            word: "black",
            pronunciation: "/blæk/",
            image: "⚫",
            exampleSentence: "The night is black.",
            difficulty: 2,
          },
          {
            word: "gray",
            pronunciation: "/ɡreɪ/",
            image: "⚫",
            exampleSentence: "The clouds are gray.",
            difficulty: 3,
          },
          {
            word: "golden",
            pronunciation: "/ˈɡoʊldən/",
            image: "🟡",
            exampleSentence: "The golden star shines.",
            difficulty: 3,
          },
        ],
        obstacles: ["honey-blocks"],
        specialMechanics: ["combo-system", "special-candies"],
      },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    emoji: "🐻",
    description: "Meet cute animal friends!",
    color: "#FFD93D",
    difficulty: 1,
    starsRequired: 3,
    isLocked: true,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 600,
        moves: 20,
        gridSize: { rows: 6, cols: 6 },
        words: [
          {
            word: "cat",
            pronunciation: "/kæt/",
            image: "🐱",
            exampleSentence: "The cat is sleeping.",
            difficulty: 1,
          },
          {
            word: "dog",
            pronunciation: "/dɔːɡ/",
            image: "🐶",
            exampleSentence: "My dog is happy.",
            difficulty: 1,
          },
          {
            word: "bird",
            pronunciation: "/bɜːrd/",
            image: "🐦",
            exampleSentence: "The bird can fly.",
            difficulty: 1,
          },
          {
            word: "fish",
            pronunciation: "/fɪʃ/",
            image: "🐟",
            exampleSentence: "The fish swims fast.",
            difficulty: 1,
          },
        ],
      },
      {
        levelNumber: 2,
        targetScore: 900,
        moves: 18,
        gridSize: { rows: 7, cols: 7 },
        words: [
          {
            word: "elephant",
            pronunciation: "/ˈɛlɪfənt/",
            image: "🐘",
            exampleSentence: "The elephant is big.",
            difficulty: 2,
          },
          {
            word: "monkey",
            pronunciation: "/ˈmʌŋki/",
            image: "🐵",
            exampleSentence: "The monkey eats bananas.",
            difficulty: 2,
          },
          {
            word: "lion",
            pronunciation: "/ˈlaɪən/",
            image: "🦁",
            exampleSentence: "The lion is strong.",
            difficulty: 2,
          },
          {
            word: "rabbit",
            pronunciation: "/ˈræbɪt/",
            image: "🐰",
            exampleSentence: "The rabbit hops fast.",
            difficulty: 2,
          },
        ],
        specialMechanics: ["combo-system"],
      },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    emoji: "🍎",
    description: "Yummy fruits to learn!",
    color: "#6EC6FF",
    difficulty: 2,
    starsRequired: 6,
    isLocked: true,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 700,
        moves: 20,
        gridSize: { rows: 6, cols: 6 },
        words: [
          {
            word: "apple",
            pronunciation: "/ˈæpəl/",
            image: "🍎",
            exampleSentence: "I eat an apple.",
            difficulty: 1,
          },
          {
            word: "banana",
            pronunciation: "/bəˈnænə/",
            image: "🍌",
            exampleSentence: "The banana is yellow.",
            difficulty: 2,
          },
          {
            word: "orange",
            pronunciation: "/ˈɔːrɪndʒ/",
            image: "🍊",
            exampleSentence: "Oranges are juicy.",
            difficulty: 2,
          },
          {
            word: "grape",
            pronunciation: "/ɡreɪp/",
            image: "🍇",
            exampleSentence: "Grapes are sweet.",
            difficulty: 1,
          },
        ],
      },
      {
        levelNumber: 2,
        targetScore: 1000,
        moves: 18,
        gridSize: { rows: 7, cols: 7 },
        words: [
          {
            word: "strawberry",
            pronunciation: "/ˈstrɔːbɛri/",
            image: "🍓",
            exampleSentence: "I love strawberries.",
            difficulty: 3,
          },
          {
            word: "watermelon",
            pronunciation: "/ˈwɔːtərˌmɛlən/",
            image: "🍉",
            exampleSentence: "Watermelon is refreshing.",
            difficulty: 3,
          },
          {
            word: "pineapple",
            pronunciation: "/ˈpaɪnˌæpəl/",
            image: "🍍",
            exampleSentence: "Pineapple is tropical.",
            difficulty: 3,
          },
          {
            word: "cherry",
            pronunciation: "/ˈtʃɛri/",
            image: "🍒",
            exampleSentence: "Cherries are red.",
            difficulty: 2,
          },
        ],
        obstacles: ["honey-blocks"],
        specialMechanics: ["combo-system"],
      },
    ],
  },
  {
    id: "family",
    name: "Family",
    emoji: "👨‍👩‍👧‍👦",
    description: "Learn about family!",
    color: "#B388FF",
    difficulty: 2,
    starsRequired: 10,
    isLocked: true,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 800,
        moves: 18,
        gridSize: { rows: 7, cols: 7 },
        words: [
          {
            word: "mother",
            pronunciation: "/ˈmʌðər/",
            image: "👩",
            exampleSentence: "My mother is kind.",
            difficulty: 2,
          },
          {
            word: "father",
            pronunciation: "/ˈfɑːðər/",
            image: "👨",
            exampleSentence: "My father is strong.",
            difficulty: 2,
          },
          {
            word: "sister",
            pronunciation: "/ˈsɪstər/",
            image: "👧",
            exampleSentence: "My sister is funny.",
            difficulty: 2,
          },
          {
            word: "brother",
            pronunciation: "/ˈbrʌðər/",
            image: "👦",
            exampleSentence: "My brother plays with me.",
            difficulty: 2,
          },
        ],
        specialMechanics: ["combo-system"],
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    emoji: "🍕",
    description: "Delicious food words!",
    color: "#FFA94D",
    difficulty: 3,
    starsRequired: 14,
    isLocked: true,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 900,
        moves: 16,
        gridSize: { rows: 7, cols: 7 },
        words: [
          {
            word: "pizza",
            pronunciation: "/ˈpiːtsə/",
            image: "🍕",
            exampleSentence: "I love pizza!",
            difficulty: 2,
          },
          {
            word: "hamburger",
            pronunciation: "/ˈhæmbɜːrɡər/",
            image: "🍔",
            exampleSentence: "The hamburger is tasty.",
            difficulty: 3,
          },
          {
            word: "sandwich",
            pronunciation: "/ˈsænwɪtʃ/",
            image: "🥪",
            exampleSentence: "I eat a sandwich.",
            difficulty: 3,
          },
          {
            word: "cake",
            pronunciation: "/keɪk/",
            image: "🍰",
            exampleSentence: "The cake is sweet.",
            difficulty: 2,
          },
        ],
        obstacles: ["honey-blocks"],
        specialMechanics: ["combo-system", "special-candies"],
      },
    ],
  },
  {
    id: "space",
    name: "Space",
    emoji: "🚀",
    description: "Explore the universe!",
    color: "#6EC6FF",
    difficulty: 4,
    starsRequired: 20,
    isLocked: true,
    completed: false,
    totalStars: 0,
    levels: [
      {
        levelNumber: 1,
        targetScore: 1200,
        moves: 15,
        gridSize: { rows: 8, cols: 8 },
        words: [
          {
            word: "star",
            pronunciation: "/stɑːr/",
            image: "⭐",
            exampleSentence: "The star is bright.",
            difficulty: 2,
          },
          {
            word: "moon",
            pronunciation: "/muːn/",
            image: "🌙",
            exampleSentence: "The moon is round.",
            difficulty: 2,
          },
          {
            word: "planet",
            pronunciation: "/ˈplænɪt/",
            image: "🪐",
            exampleSentence: "Earth is a planet.",
            difficulty: 3,
          },
          {
            word: "rocket",
            pronunciation: "/ˈrɑːkɪt/",
            image: "🚀",
            exampleSentence: "The rocket flies fast.",
            difficulty: 3,
          },
        ],
        obstacles: ["honey-blocks", "ice-blocks"],
        specialMechanics: ["combo-system", "special-candies", "timed-challenges"],
      },
    ],
  },
];
