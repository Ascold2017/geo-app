import { useEffect, useState } from "react";
import { UserTask } from "../../constants/types"
import ComposeBlocksTask from "./ComposeBlocksTask";
import ListeningTask from "./ListeningTask";
import SpeakingCard from "./SpeakingCard";
import WritingTask from "./WritingTask";

type Props = {
    tasks: UserTask[],
    id: number;
    checkReaded: (id: number) => void;
    forcedTaskTypes?: TaskTypes[];
}

// eslint-disable-next-line react-refresh/only-export-components
export enum TaskTypes {
    COMPOSE = 'compose',
    COMPOSE_REVERT = 'compose_revert',
    WRITING = 'writing',
    WRITING_REVERT = 'writing_revert',
    LISTENING = 'listening',
    SPEAKING = 'speaking'
}

export default function TaskCard({ tasks, id, checkReaded, forcedTaskTypes }: Props) {
    const task = tasks.find(e => e.id === id)!;
    const [type, setType] = useState<TaskTypes>(TaskTypes.COMPOSE);

    useEffect(() => {
        if (forcedTaskTypes) {
            // Pick one of forcedTaskTypes
            setType(forcedTaskTypes[forcedTaskTypes.length * Math.random() << 0])
        } else {
            const keys = Object.keys(TaskTypes);
            // @ts-ignore asdsasd
            const type = TaskTypes[keys[keys.length * Math.random() << 0]];
            setType(type)
        }
    }, [])

    return <article className="app-card">
            {type.includes('compose') && <ComposeBlocksTask isRevert={type === 'compose_revert'} task={task} tasks={tasks} onCheckReaded={() => checkReaded(id)} />}
            {type.includes('writing') && <WritingTask isRevert={type === 'writing_revert'}  task={task} onCheckReaded={() => checkReaded(id)}/>}
            {type.includes('listening') && <ListeningTask task={task} tasks={tasks} onCheckReaded={() => checkReaded(id)} />}
            {type.includes('speaking') && <SpeakingCard task={task} onCheckReaded={() => checkReaded(id)} />}
    </article>
}