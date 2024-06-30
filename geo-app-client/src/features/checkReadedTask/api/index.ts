import { axiosInstance } from "@shared"

export const postCheckReaded = async (id: number) => (await axiosInstance<{ ok: boolean }>({
    url: `/learn/read-task/${id}`,
    method: 'POST',
})).data
