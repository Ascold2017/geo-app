import { TaskCardPractice, UserTask } from "@entities/task";
import { useCheckCompositionPractice } from "../model"
import { PlayCircleFilled } from "@ant-design/icons";
import { useAudio } from "@shared";
import { useEffect } from "react";

interface CheckCompositionPracticeCard {
    taskId: number;
    tasks: UserTask[];
    isRevert: boolean;
    onSuccess: () => void;
}
export function CheckCompositionPracticeCard({ taskId, tasks, isRevert, onSuccess }: CheckCompositionPracticeCard) {

    const { task, blocks, answerBlocks, addBlock, removeBlock, isSuccess } = useCheckCompositionPractice(taskId, tasks, isRevert);
    const { play } = useAudio(task.soundUrl || null);
    useEffect(() => {
        if (isSuccess) {
            play();
            onSuccess();
        }
    }, [isSuccess])

    return <>
        <TaskCardPractice
            task={task}
            isRevert={isRevert}
            isSuccess={isSuccess}
            playSlot={
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlayCircleFilled />
                </button>
            }
            footerSlot={
                <div className="flex wrap items-center">
                    <span className="app-text-2 mr-3">Ответ: </span>{answerBlocks.map((b, i) => <button className="btn mr-1 mb-1" key={i} onClick={() => removeBlock(i)}>{b}</button>)}
                </div>
            }
        />
        <div className="app-divider" />
        <div>
            {blocks.map((b, i) => <button key={i} onClick={() => addBlock(b)} className="btn mx-1 my-1">{b}</button>)}
        </div>
    </>
}