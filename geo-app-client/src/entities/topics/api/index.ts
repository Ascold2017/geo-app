import { axiosInstance } from "@shared";
import { UserTopic, UserTopicWithTasks } from "../model";

export const getUserTopics =  async () => (await axiosInstance<UserTopic[]>({ url: '/sections/topics' })).data;

export const getUserTopic = async (id: string) => (await axiosInstance<UserTopicWithTasks>({ url: '/sections/topics/' + id })).data

