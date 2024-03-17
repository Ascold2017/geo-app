import { PlayCircleFilled, EditOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";
import { useAudio } from "@shared";
import { TaskCardPractice, UserTask } from "@entities/task";
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
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const toggleKeyboard = () => setIsShowKeyboard(!isShowKeyboard);

    useEffect(() => {
        if (isSuccess) {
            play();
            onSuccess()
        }
    }, [isSuccess])

    return (
        <TaskCardPractice
            task={task}
            isRevert={isRevert}
            isSuccess={isSuccess}
            playSlot={
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="task-card-play" >
                    <PlayCircleFilled />
                </button>
            }
            footerSlot={
                <>
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
                </>
            }
        />
    );
}