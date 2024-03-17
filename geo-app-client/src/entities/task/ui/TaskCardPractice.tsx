import { CheckCircleFilled, QuestionCircleFilled } from "@ant-design/icons";
import { UserTask } from "../model";
import { useState } from "react";
import { splitVariant } from "@shared";
import './taskCard.css';

interface TaskCardPracticeProps {
    task: UserTask;
    isRevert: boolean;
    isSuccess: boolean;
    titleSlot?: React.ReactNode;
    playSlot: React.ReactNode;
    footerSlot: React.ReactNode;
}
export function TaskCardPractice({ task, isRevert, isSuccess, titleSlot, playSlot, footerSlot }: TaskCardPracticeProps) {
    const [isShowTranscription, setIsShowTranscription] = useState(false);
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription);
    return (
        <div className='task-card'>
            <div className="task-card-container mb-6">
                <CheckCircleFilled className='task-card-status' style={{ color: isSuccess ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className='task-card-image' />}
                <p className="app-text-2 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : titleSlot || <span>{splitVariant(isRevert ? task.ru : task.ka)}</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className='task-card-transcription'><QuestionCircleFilled /></button>

                <span className='task-card-play'>{playSlot}</span>
            </div>
            {footerSlot}
        </div>
    )
}