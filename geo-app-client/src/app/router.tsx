import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "./auth/layout/AuthLayout";
import UserLayout from "./common/components/Layout";

import AuthPage from "./auth/Auth";
import PracticePage from "./practice/Practice";
import ProgressPage from "./progress/Progress";
import TopicIndex from "./topic/TopicIndex";
import TopicLection from "./topic/TopicLection";
import TopicLettersPage from "./topic/TopicLetters";
import TopicPractice from "./topic/TopicPractice";
import TopicVideo from "./topic/TopicVideo";
import TopicWords from "./topic/TopicWords";
import TopicsPage from "./topics/Topics";

import { TOPIC_LECTURE_PATH, TOPIC_LETTERS_PATH, TOPIC_PATH, TOPIC_PRACTICE_PATH, TOPIC_VIDEO_PATH, TOPIC_WORDS_PATH, TOPICS_PATH } from "./topic/constants";
import { PRACTICE_PATH } from "./practice/constants";
import { PROGRESS_PATH } from "./progress/constants";
import { AUTH_PATH } from "./auth/contstants";
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={AUTH_PATH} element={<AuthLayout />}>
      <Route path="" element={<AuthPage />} />
    </Route>
    <Route path="" element={<UserLayout />}>
      <Route path="/" element={<TopicsPage />} />
      <Route path={TOPICS_PATH} element={<TopicsPage />} />

      <Route path={TOPIC_PATH} element={<TopicIndex />} />
      <Route path={TOPIC_VIDEO_PATH} element={<TopicVideo />} />
      <Route path={TOPIC_LECTURE_PATH} element={<TopicLection />} />
      <Route path={TOPIC_WORDS_PATH} element={<TopicWords />} />
      <Route path={TOPIC_LETTERS_PATH} element={<TopicLettersPage />} />
      <Route path={TOPIC_PRACTICE_PATH} element={<TopicPractice />} />

      <Route path={PRACTICE_PATH} element={<PracticePage />} />
      <Route path={PROGRESS_PATH} element={<ProgressPage />} />
    </Route>
  </>
));


export default router;