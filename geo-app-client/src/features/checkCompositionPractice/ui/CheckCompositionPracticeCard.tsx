import { UserTask } from "@entities/task";
import { useCheckCompositionPractice } from "../model"
import { CheckCircleFilled, PlayCircleFilled, QuestionCircleFilled } from "@ant-design/icons";
import { splitVariant, useAudio } from "@shared";
import { useEffect, useState } from "react";

interface CheckCompositionPracticeCard {
    taskId: number;
    tasks: UserTask[];
    isRevert: boolean;
    onSuccess: () => void;
}
export function CheckCompositionPracticeCard({ taskId, tasks, isRevert, onSuccess }: CheckCompositionPracticeCard) {

    const { task, blocks, answerBlocks, addBlock, removeBlock, isSuccess } = useCheckCompositionPractice(taskId, tasks, isRevert);
    const { play } = useAudio(task.soundUrl || null);
    const [isShowTranscription, setIsShowTranscription] = useState(false);
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription)
    useEffect(() => {
        if (isSuccess) {
            play();
            onSuccess();
        }
    }, [isSuccess])
    
    return <>
        <div className="task-card">
            <div className="task-card-container" >
                <CheckCircleFilled className="task-card-status" style={{ color: isSuccess ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : <span>{splitVariant(isRevert ? task.ru : task.ka)}</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className="btn task-card-transcription"><QuestionCircleFilled /></button>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlayCircleFilled />
                </button>
            </div>
            <div className="flex wrap items-center mt-6">
                <span className="app-text-2 mr-3">Ответ: </span>{answerBlocks.map((b, i) => <button className="btn mr-1 mb-1" key={i} onClick={() => removeBlock(i)}>{b}</button>)}
            </div>
        </div>
        <div className="app-divider" />
        <div>
            {blocks.map((b, i) => <button key={i} onClick={() => addBlock(b)} className="btn mx-1 my-1">{b}</button>)}
        </div>
    </>
}