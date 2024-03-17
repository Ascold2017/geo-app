import { UserTask } from "../model"
import { axiosInstance } from "@shared";

export const getPracticeRequest = async () => (await axiosInstance<{ tasks: UserTask[]; nextRepeat: Date | null }>({ url: '/users/progress/tasks-to-repeat', })).data;

export const getProgressRequest = async () => (await axiosInstance<UserTask[]>({ url: '/users/progress/list' })).data
