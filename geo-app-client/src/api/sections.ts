import { UserSection, UserTopic, UserTopicWithTasks } from "../app/common/constants/types";
import axiosInstance from "../utils/axios";


export const useGetSections = () => {
    return async () => (await axiosInstance<UserSection[]>({ url: '/sections'})).data;
}

export const useGetUserTopics = () => {
    return async () => (await axiosInstance<UserTopic[]>({ url: '/sections/topics' })).data;
}

export const useGetTopicRequest = (id: string) => {
    return async () => (await axiosInstance<UserTopicWithTasks>({ url: '/sections/topics/' + id })).data
}
