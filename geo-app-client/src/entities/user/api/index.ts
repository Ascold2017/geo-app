import { axiosInstance } from "@shared"
import { User } from "../model"

export const getUser = async (token: string) => {
    const r = await axiosInstance.request<User>({ url: '/users/' + token, method: 'GET' })
    return r.data
}