import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { AppSpin, TOPIC_PATH_GEN, useLoading } from "@shared";
import { TaskTypesEnum } from "@entities/task";
import { useTopicModel } from "@entities/topics";
import { useCheckReadedTask } from "@features/checkReadedTask";
import { PracticeWidget, RenderFooterProps, TaskTypes } from "@widgets/practiceWidget";

export function TopicPracticePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, getTopic } = useTopicModel()
    const { loading: loadingTopic, error: topicError } = useLoading(() => getTopic(id!));
    const { checkReadedTask } = useCheckReadedTask()


    if (loadingTopic && !topic) return <AppSpin spinning />
    if (topicError) return <p className="app-text-1 text-center">Произошла ошибка: {topicError?.message}</p>
    if (!topic) return null;

    const renderFooter = ({ isLastStep, next, isDisabledNext }: RenderFooterProps) => {
        return (
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigate(TOPIC_PATH_GEN(+id!))} className="btn"><BackwardOutlined /> Покинуть урок</button>
                {isLastStep ? <span className="app-text-2">Ты прошел урок. Молодец :) </span>
                    : <button className="btn" disabled={isDisabledNext} onClick={next}>Далее <ForwardOutlined /></button>}
            </div>

        )
    }

    const isAlphabet = topic.tasks.some(t => t.type === TaskTypesEnum.LETTER)

    return <>
        <AppSpin spinning={loadingTopic} />
        <PracticeWidget
            tasks={topic.tasks}
            taskTypes={[TaskTypes.COMPOSE, TaskTypes.COMPOSE_REVERT]}
            onCheckReaded={async (id) => { await checkReadedTask(id) }}
            renderFooter={renderFooter}
            onLastStep={() => { }}
            isAlphabet={isAlphabet}
        />
    </>
}