import { axiosInstance } from "@shared"

export const postCheckReaded = async (id: number) => (await axiosInstance<{ ok: boolean }>({
    url: `/users/progress/read-task/${id}`,
    method: 'POST',
})).data
