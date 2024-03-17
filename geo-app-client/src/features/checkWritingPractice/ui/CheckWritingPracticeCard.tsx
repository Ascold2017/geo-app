import { CheckCircleFilled, QuestionCircleFilled, PlayCircleFilled, EditOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";
import { useAudio, splitVariant } from "@shared";
import { UserTask } from "@entities/task";
import { useCheckWritingPractice } from "../model";
import Keyboard from "./Keyboard";

interface CheckWritingPracticeCardProps {
    task: UserTask;
    isRevert: boolean;
    onSuccess: () => void;
}
export function CheckWritingPracticeCard({ task, isRevert, onSuccess }: CheckWritingPracticeCardProps) {
    const { userAnswer, setUserAnswer, isSuccess } = useCheckWritingPractice(task, isRevert)
    const { play } = useAudio(task.soundUrl || null);
    const [isShowTranscription, setIsShowTranscription] = useState(false);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription)
    const toggleKeyboard = () => setIsShowKeyboard(!isShowKeyboard);

    useEffect(() => {
        if (isSuccess) {
            play();
            onSuccess()
        }
    }, [isSuccess])

    return <>
        <div className="task-card">
            <div className="task-card-container">
                <CheckCircleFilled className="task-card-status" style={{ color: isSuccess ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : <span>{splitVariant(isRevert ? task.ru : task.ka)}</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className="task-card-transcription"><QuestionCircleFilled /></button>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="task-card-play" >
                    <PlayCircleFilled />
                </button>
            </div>
            <div className="relative">
                {isRevert &&
                    <button
                        onClick={toggleKeyboard}
                        className="task-card-keyboard"
                    ><EditOutlined /></button>
                }

                <textarea className="input w-full" placeholder={isRevert ? 'Пишите по-грузински' : 'Пишите по-русски'} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
            </div>

            {isShowKeyboard && isRevert && <Keyboard value={userAnswer} inputHandler={setUserAnswer} />}

        </div>
    </>
}