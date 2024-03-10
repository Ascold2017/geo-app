/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthLayout } from "@widgets/authLayout";
import { AUTH_PATH, TOPICS_PATH } from "@shared";


const AuthPage = React.lazy(() => import("@pages/authPage"));
const UserLayout = React.lazy(() => import("@widgets/userLayout"));
const TopicsPage = React.lazy(() => import("@pages/topicsPage"));

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={AUTH_PATH} element={<AuthLayout />}>
      <Route path="" element={<AuthPage />} />
    </Route>

    <Route path="/" element={<UserLayout />}>
      <Route path={TOPICS_PATH} element={<TopicsPage />} />
      <Route index element={<TopicsPage />} />
    </Route>
  </>
));

/*

 
      <Route path={TOPIC_PATH} element={<TopicIndex />} />
      <Route path={TOPIC_VIDEO_PATH} element={<TopicVideo />} />
      <Route path={TOPIC_LECTURE_PATH} element={<TopicLection />} />
      <Route path={TOPIC_WORDS_PATH} element={<TopicWords />} />
      <Route path={TOPIC_LETTERS_PATH} element={<TopicLettersPage />} />
      <Route path={TOPIC_PRACTICE_PATH} element={<TopicPractice />} />
 
      <Route path={PRACTICE_PATH} element={<PracticePage />} />
      <Route path={PROGRESS_PATH} element={<ProgressPage />} />

      */