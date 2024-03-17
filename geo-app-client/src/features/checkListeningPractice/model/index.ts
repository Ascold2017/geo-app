import { UserTask } from "@entities/task";
import { generateBlocks, isMatchQA, shuffle } from "@shared";
import { useMount } from "ahooks";
import { useState } from "react";

export const useCheckListeningPractice = (taskId: number, tasks: UserTask[]) => {
    const [kaBlocks, setKaBlocks] = useState<string[]>([])
    const [answerBlocks, setAnswerBlocks] = useState<string[]>([]);
    const task = tasks.find(e => e.id === taskId)!;
    const isSuccess = isMatchQA(answerBlocks, task.ka);

    useMount(() => {
        setKaBlocks(generateBlocks(task.ka, shuffle(tasks).slice(0, 3).map(t => t.ka)));
    })

    const addBlock = (block: string) => {
        setAnswerBlocks([...answerBlocks, block])
    };
    const removeBlock = (i: number) => setAnswerBlocks(answerBlocks.filter((_b, index) => index !== i));

    return {
        task,
        answerBlocks,
        isSuccess,
        kaBlocks,
        addBlock,
        removeBlock
    }
}