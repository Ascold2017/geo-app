import { BackwardOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { AppSpin, TOPIC_PATH_GEN, useLoading } from "@shared";
import { useTopicModel } from "@entities/topics";
import { PracticeWidget } from "@widgets/practiceWidget";
import { PracticeTypes } from "@features/repeatTasks";

export function TopicPracticePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, getTopic } = useTopicModel()
    const { loading: loadingTopic, error: topicError } = useLoading(() => getTopic(id!));


    if (loadingTopic && !topic) return <AppSpin spinning />
    if (topicError) return <p className="app-text-1 text-center">Произошла ошибка: {topicError?.message}</p>
    if (!topic) return null;


    return <>
        <AppSpin spinning={loadingTopic} />
        <PracticeWidget
            tasks={topic.tasks}
            practiceTypes={[PracticeTypes.WRITING]}
            renderFooter={() => <button onClick={() => navigate(TOPIC_PATH_GEN(+id!))} className="btn"><BackwardOutlined /> Покинуть урок</button>}
        />
    </>
}