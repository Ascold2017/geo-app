import { useNavigate, useParams } from "react-router-dom";
import { AppSpin, TOPIC_PATH_GEN, TOPIC_PRACTICE_PATH_GEN, useLoading } from '@shared'
import { useTopicModel } from "@entities/topics";
import { TaskCarousel } from "@widgets/taskCarousel";
import { TaskTypesEnum } from "@entities/task";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";

export function TopicWordsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, getTopic } = useTopicModel()
    const { loading: loadingTopic, error: topicError } = useLoading(() => getTopic(id!));

    if (loadingTopic && !topic) return <AppSpin spinning />
    if (topicError) return <p className="app-text-1 text-center">Произошла ошибка: {topicError?.message}</p>
    return <>
        <AppSpin spinning={loadingTopic} />
        <h3 className="app-title-2 text-center mb-3">Прослушайте и запомните новые слова</h3>
        <TaskCarousel
            tasks={topic?.tasks?.filter(task => task.type === TaskTypesEnum.WORD) || []}
            renderFooter={(next, isLastTask) => (
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => navigate(TOPIC_PATH_GEN(+id!))} className="btn"><BackwardOutlined /> Покинуть урок</button>
                    {isLastTask ? <button onClick={() => navigate(TOPIC_PRACTICE_PATH_GEN(+id!))} className="btn">Практика <ForwardOutlined /></button>
                        : <button className="btn" onClick={next}>Далее <ForwardOutlined /></button>}
                </div>
            )}
        />
    </>
}