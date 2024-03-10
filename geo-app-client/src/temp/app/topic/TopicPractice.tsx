import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTopicRequest } from "@api/sections";
import { usePostCheckReadedTask } from "@api/users";
import AppSpin from "@common/components/ui/AppSpin";
import { TOPIC_PATH_GEN } from "./constants";
import { TaskTypesEnum } from "@app/common/constants/types";
import PracticeComponent, { RenderFooterProps } from "@common/components/PracticeComponent";
import { TaskTypes } from "@common/components/TaskCard/TaskCard";

export default function TopicPracticePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loading: loadingTopic, data: topic, error: topicError } = useRequest(useGetTopicRequest(id!));
    const { loading: loadingCheckReaded, error: checkReadedError, runAsync: checkReaded } = useRequest(usePostCheckReadedTask(), { manual: true })


    if (loadingTopic && !topic) return <AppSpin spinning />
    if (topicError || checkReadedError) return <p className="app-text-1 text-center">Произошла ошибка: {topicError?.message || checkReadedError?.message}</p>
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
        <AppSpin spinning={loadingTopic || loadingCheckReaded} />
        <PracticeComponent
            tasks={topic.tasks}
            taskTypes={[TaskTypes.COMPOSE, TaskTypes.COMPOSE_REVERT]}
            onCheckReaded={async (id) => { await checkReaded(id) }}
            renderFooter={renderFooter}
            onLastStep={() => { }}
            isAlphabet={isAlphabet}
        />
    </>
}