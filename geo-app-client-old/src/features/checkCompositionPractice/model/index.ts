import { useMount } from "ahooks";
import { shuffle } from "lodash";
import { useState } from "react";
import { isMatchQA, generateBlocks } from "@shared";
import { UserTask } from "@entities/task";

export const useCheckCompositionPractice = (taskId: number, tasks: UserTask[], isRevert: boolean) => {
    const [kaBlocks, setKaBlocks] = useState<string[]>([])
    const [ruBlocks, setRuBlocks] = useState<string[]>([])
    const [answerBlocks, setAnswerBlocks] = useState<string[]>([]);
    const task = tasks.find(e => e.id === taskId)!;
    const isSuccess = isMatchQA(answerBlocks, isRevert ? task.ka : task.ru);

    useMount(() => init())

    function init() {
        setKaBlocks(generateBlocks(task.ka, shuffle(tasks).slice(0, 3).map(t => t.ka)));
        setRuBlocks(generateBlocks(task.ru, shuffle(tasks).slice(0, 3).map(t => t.ru)));
    }

    const addBlock = (block: string) => {
        setAnswerBlocks([...answerBlocks, block])
    };
    const removeBlock = (i: number) => setAnswerBlocks(answerBlocks.filter((_b, index) => index !== i));

    return {
        task,
        blocks: isRevert ? kaBlocks : ruBlocks,
        answerBlocks,
        addBlock,
        removeBlock,
        isSuccess
    }

}