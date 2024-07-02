import { axiosInstance } from "@shared"

export const postCheckCompleted = async (id: number, value: boolean) => (await axiosInstance<{ ok: boolean }>({
    url: `/learn/complete-task/${id}`,
    method: 'POST',
    data: { value }
})).data
