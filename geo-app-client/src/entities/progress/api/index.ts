import { UserTask } from "@entities/task";
import { axiosInstance } from "@shared";

export const getProgressRequest = async () => (await axiosInstance<UserTask[]>({ url: '/users/progress/list' })).data
