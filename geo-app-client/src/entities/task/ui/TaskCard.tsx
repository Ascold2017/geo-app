import { CheckCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { HTMLProps, useState, useEffect } from "react";
import { useAudio } from "@shared";
import './taskCard.css';
import { UserTask } from "../model";

interface TaskCardProps {
    task: UserTask;
    onTapTask: (id: number) => Promise<void>
}
export function TaskCard({ task, onTapTask, className }: TaskCardProps & HTMLProps<HTMLDivElement>) {
    const [flip, setFlip] = useState(false);
    const [readed, setIsReaded] = useState(task.repeated > 0);
    const { playUrl, play } = useAudio(task.soundUrl || null);

    useEffect(() => {
        playUrl(task.soundUrl)
    }, [task, playUrl])

    async function onTap() {
        play();
        setFlip(!flip);
        if (!readed) {
            await onTapTask(task.id);
            setIsReaded(true);
        }
    }
    return (
        <article onClick={onTap} className={`task-card ${className || ''}`}>
            <div className="task-card-container">
                <CheckCircleFilled className="task-card-status" style={{ color: readed ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        flip
                            ? <span>{task.ru}</span>
                            : <span>{task.ka} [{task.transcription}]</span>
                    }
                </p>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlayCircleFilled />
                </button>
            </div>
        </article>
    )
}