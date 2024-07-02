import { postCheckCompleted } from "../api"

export const useCheckCompletedTask = () => {

    async function checkCompletedTask(id: number, value: boolean) {
        await postCheckCompleted(id, value)
    }

    return { checkCompletedTask }

}