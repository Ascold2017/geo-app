import { UserTask } from "@entities/task";
import { isMatchQA } from "@shared";
import { useState } from "react";

export function useCheckWritingPractice(task: UserTask, isRevert: boolean) {
    const [userAnswer, setUserAnswer] = useState('');
    const isSuccess = isMatchQA(userAnswer, isRevert ? task.ka : task.ru);

    return {
        userAnswer,
        setUserAnswer,
        isSuccess
    }
}