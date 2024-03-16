/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AUTH_PATH, TOPICS_PATH, TOPIC_LECTURE_PATH, TOPIC_LETTERS_PATH, TOPIC_PATH, TOPIC_VIDEO_PATH, TOPIC_WORDS_PATH } from "@shared";

const AuthPage = React.lazy(() => import("@pages/authPage"));
const UserLayout = React.lazy(() => import("@widgets/userLayout"));
const TopicsPage = React.lazy(() => import("@pages/topicsPage"));
const TopicIndexPage = React.lazy(() => import("@pages/topicIndexPage"));
const TopicVideoPage = React.lazy(() => import("@pages/topicVideoPage"));
const TopicLecturePage = React.lazy(() => import("@pages/topicLecturePage"));
const TopicWordsPage = React.lazy(() => import("@pages/topicWordsPage"));
const TopicLettersPage = React.lazy(() => import("@pages/topicLettersPage"));

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={AUTH_PATH} element={<AuthPage />} />
    <Route path="/" element={<UserLayout />}>
      <Route path={TOPICS_PATH} element={<TopicsPage />} />
      <Route index element={<TopicsPage />} />
      <Route path={TOPIC_PATH} element={<TopicIndexPage />} />
      <Route path={TOPIC_VIDEO_PATH} element={<TopicVideoPage />} />
      <Route path={TOPIC_LECTURE_PATH} element={<TopicLecturePage />} />
      <Route path={TOPIC_WORDS_PATH} element={<TopicWordsPage />} />
      <Route path={TOPIC_LETTERS_PATH} element={<TopicLettersPage />} />
    </Route>
  </>
));

/*
  <Route path={TOPIC_PRACTICE_PATH} element={<TopicPractice />} />
  <Route path={PRACTICE_PATH} element={<PracticePage />} />
  <Route path={PROGRESS_PATH} element={<ProgressPage />} />
*/