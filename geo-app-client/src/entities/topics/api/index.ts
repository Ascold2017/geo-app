import { axiosInstance } from "@shared";
import { UserTopic } from "../model";

export const getUserTopics =  async () => (await axiosInstance<UserTopic[]>({ url: '/sections/topics' })).data;

export const getTopicRequest = async (id: string) => (await axiosInstance<UserTopicWithTasks>({ url: '/sections/topics/' + id })).data

