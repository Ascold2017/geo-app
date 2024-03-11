import { useState } from "react";
import { UserTask, useTaskModel } from "@entities/task"
import { TaskCard } from "@components/TaskCard";

interface Props {
    tasks: UserTask[]
    renderFooter: (next: () => void, isLastTask: boolean) => React.ReactNode;
}
export function TasksToLearn({ tasks, renderFooter }: Props) {
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(tasks[0]?.id || null)
    const [isLastTask, setIsLastTask] = useState(false);
    const { checkReaded } = useTaskModel()

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

