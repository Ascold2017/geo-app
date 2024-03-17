import { UserTask } from "@entities/task";
import { axiosInstance } from "@shared";

export const getPracticeRequest = async () => (await axiosInstance<{ tasks: UserTask[]; nextRepeat: Date | null }>({ url: '/users/progress/tasks-to-repeat', })).data