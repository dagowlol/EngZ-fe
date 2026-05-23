import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { WorldMap } from "./pages/WorldMap";
import { TopicOverview } from "./pages/TopicOverview";
import { VocabularyScreen } from "./pages/VocabularyScreen";
import { WordGame } from "./pages/WordGame";
import { LevelComplete } from "./pages/LevelComplete";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/world-map",
    Component: WorldMap,
  },
  {
    path: "/topic/:topicId",
    Component: TopicOverview,
  },
  {
    path: "/vocabulary/:topicId/:level",
    Component: VocabularyScreen,
  },
  {
    path: "/game/:topicId/:level",
    Component: WordGame,
  },
  {
    path: "/level-complete/:topicId/:level",
    Component: LevelComplete,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
