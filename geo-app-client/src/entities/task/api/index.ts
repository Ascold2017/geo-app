import { axiosInstance } from "@shared"

export const postCheckReaded = async (id: number) => (await axiosInstance<{ ok: boolean }>({
    url: `/users/progress/read-task/${id}`,
    method: 'POST',
})).data


export const postCheckCompleted = async (id: number, value: boolean) => (await axiosInstance<{ ok: boolean }>({
    url: `/users/progress/complete-task/${id}`,
    method: 'POST',
    data: { value }
})).data
