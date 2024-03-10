import { UserTask } from "../app/common/constants/types";
import axiosInstance from "../utils/axios";

export const useChangeUserSection = () => {
    return async (sectionId: number) => (await axiosInstance<{ ok: boolean }>({ method: 'POST', url: '/users/change-section', data: { sectionId } })).data;
}


export const usePostCheckReadedTask = () => {
    return async (id: number) => (await axiosInstance<{ ok: boolean }>({
        url: `/users/progress/read-task/${id}`,
        method: 'POST',
    })).data
}

export const usePostCheckCompletedTask = () => {
    return async (id: number, value: boolean) => (await axiosInstance<{ ok: boolean }>({
        url: `/users/progress/complete-task/${id}`,
        method: 'POST',
        data: { value }
    })).data
}

export const useGetPracticeRequest = () => {
    return async () => (await axiosInstance<{ tasks: UserTask[]; nextRepeat: Date | null }>({ url: '/users/progress/tasks-to-repeat', })).data
}

export const useGetProgressRequest = () => {
    return async () => (await axiosInstance<UserTask[]>({ url: '/users/progress/list' })).data
}