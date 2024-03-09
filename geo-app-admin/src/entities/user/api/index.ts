import { http } from "../../../shared/api"
import { User } from "../model/index.d"

export const getUsers = async () => {
    const data = (await http<User[]>({ url: '/adm/users' })).data
    return data
}