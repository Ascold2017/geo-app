import { UserTask } from "@entities/task"
import { PracticeTypes } from "@features/repeatTasks";
import { CheckCompositionPracticeCard } from "@features/checkCompositionPractice";
import { CheckListeningPracticeCard } from "@features/checkListeningPractice";
import { CheckWritingPracticeCard } from "@features/checkWritingPractice";
import { CheckSpeakingPracticeCard } from "@features/checkSpeakingPractice";

type Props = {
    tasks: UserTask[],
    id: number;
    onSuccess: () => void;
    practiceType: PracticeTypes;
}

export function PracticeWidgetTask({ tasks, id, onSuccess, practiceType }: Props) {
    return <article className="card">
        {practiceType.includes('compose') && <CheckCompositionPracticeCard isRevert={practiceType === 'compose_revert'} taskId={id} tasks={tasks} onSuccess={onSuccess} />}
        {practiceType.includes('listening') && <CheckListeningPracticeCard taskId={id} tasks={tasks} onSuccess={onSuccess} />}
        {practiceType.includes('writing') && <CheckWritingPracticeCard isRevert={practiceType === 'writing_revert'} task={tasks.find(t => t.id === id)!} onSuccess={onSuccess} />}
        {practiceType.includes('speaking') && <CheckSpeakingPracticeCard task={tasks.find(t => t.id === id)!} onSuccess={onSuccess} />}
    </article>
}