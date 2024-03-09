import React from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "@widgets/layout";
import { USERS_LIST, SECTION_LIST, TOPIC_LIST, NEW_TOPIC, EDIT_TOPIC } from "@shared";


const UsersPage = React.lazy(() => import('./users/index.tsx'));
const SectionsPage = React.lazy(() => import('./sections/index.tsx'));
const TopicListPage = React.lazy(() => import('./topic-list/index.tsx'));
const NewTopicPage = React.lazy(() => import('./new-topic/index.tsx'));
const EditTopicPage = React.lazy(() => import('./edit-topic/index.tsx'));

export const Routing = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route path={USERS_LIST} element={<UsersPage />} />
            <Route path={SECTION_LIST} element={<SectionsPage />} />
            <Route path={TOPIC_LIST} element={<TopicListPage />} />
            <Route path={NEW_TOPIC} element={<NewTopicPage />} />
            <Route path={EDIT_TOPIC} element={<EditTopicPage />} />
        </Route>

    </Routes>
}