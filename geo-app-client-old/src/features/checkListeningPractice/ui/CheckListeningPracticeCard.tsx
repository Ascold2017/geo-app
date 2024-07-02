import { TaskCardPractice, UserTask } from "@entities/task";
import { useCheckListeningPractice } from "../model";
import { PlaySquareOutlined } from "@ant-design/icons";
import { splitVariant, useAudio } from "@shared";
import { useEffect } from "react";

interface CheckListeningPracticeCardProps {
    taskId: number;
    tasks: UserTask[];
    onSuccess: () => void;
}
export function CheckListeningPracticeCard({ taskId, tasks, onSuccess, }: CheckListeningPracticeCardProps) {
    const { kaBlocks, answerBlocks, task, addBlock, removeBlock, isSuccess } = useCheckListeningPractice(taskId, tasks)
    const { play } = useAudio(task.soundUrl || null);
    useEffect(() => {
        if (isSuccess) {
            play();
            onSuccess();
        }
    }, [isSuccess]);

    return <>
        <TaskCardPractice
            task={task}
            isRevert={false}
            isSuccess={isSuccess}
            titleSlot={
                isSuccess
                    ? <span>{splitVariant(task.ru)}</span>
                    : <span>Что вы услышали?</span>
            }
            playSlot={
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlaySquareOutlined />
                </button>
            }
            footerSlot={
                <div className="flex wrap items-center mt-6">
                    <span className="app-text-2 mr-3">Ответ: </span>{answerBlocks.map((b, i) => <button className="btn mr-1 mb-1" key={i} onClick={() => removeBlock(i)}>{b}</button>)}
                </div>
            }

        />

        <div className="divider" />
        <div>
            {kaBlocks.map((b, i) => <button key={i} onClick={() => addBlock(b)} className="btn mx-1 my-1">{b}</button>)}
        </div>
    </>
}