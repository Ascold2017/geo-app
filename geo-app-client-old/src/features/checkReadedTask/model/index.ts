import { postCheckReaded } from "../api"

export const useCheckReadedTask = () => {

    async function checkReadedTask(id: number) {
        await postCheckReaded(id)
    }

    return { checkReadedTask }

}