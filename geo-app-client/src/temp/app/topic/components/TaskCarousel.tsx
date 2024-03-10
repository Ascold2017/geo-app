import { HTMLProps, useEffect, useState } from "react";
import { UserTask } from "@common/constants/types"
import { CheckCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import useAudio from "@utils/useAudio";

type Props = {
    tasks: UserTask[]
    checkReaded: (id: number) => Promise<void>;
    renderFooter: (next: () => void, isLastTask: boolean) => React.ReactNode;
}
export default function TaskCarousel({ tasks, checkReaded, renderFooter }: Props) {
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(tasks[0]?.id || null)
    const [isLastTask, setIsLastTask] = useState(false);

    function next() {
        const tsks = tasks.sort((a, b) => a.id >= b.id ? 1 : -1);
        const currentTaskIndex = tsks.findIndex(t => t.id === currentTaskId);
        const nextTaskId = tsks[currentTaskIndex + 1]?.id || null;
        if (nextTaskId) {
            setCurrentTaskId(nextTaskId)
        } else {
            setIsLastTask(true)
        }
    }

    const currentTask = tasks.find(task => task.id === currentTaskId);
    if (!currentTask) return null;
    return <div>
        <TaskCard task={currentTask} checkReaded={checkReaded} className="mb-3" />
        {renderFooter(next, isLastTask)}
    </div>
}

type TaskCardProps = { task: UserTask; checkReaded: (id: number) => Promise<void> }
function TaskCard({ task, checkReaded, className }: TaskCardProps & HTMLProps<HTMLDivElement>) {
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
            await checkReaded(task.id);
            setIsReaded(true);
        }
    }
    return (
        <article onClick={onTap} className={`task-card ${className || ''}` }>
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