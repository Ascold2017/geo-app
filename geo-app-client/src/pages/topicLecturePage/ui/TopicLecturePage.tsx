import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useParams, useNavigate } from "react-router-dom";
import { useTopicModel } from '@entities/topics'
import { AppSpin, TOPIC_PATH_GEN, TOPIC_WORDS_PATH_GEN } from "@shared";


export function TopicLecturePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, getTopic } = useTopicModel()
    const { loading, error } = useRequest(() => getTopic(id!))

    if (loading && !topic) return <AppSpin spinning />
    if (error) return <p className="app-text-1 text-center">Произошла ошибка: {error?.message}</p>
    if (!topic) return null;
    return (<>
        <AppSpin spinning={loading} />
        <h3 className="app-title-2 text-center mb-3">{topic?.title}</h3>

        <article className="card card-body bg-base-100 shadow-xl mb-3">{topic.text}</article>


        <div className="grid grid-cols-2 gap-4">
            <button className="btn" onClick={() => navigate(TOPIC_PATH_GEN(+id!))}><BackwardOutlined /> Покинуть урок</button>
            <button className="btn" onClick={() => navigate(TOPIC_WORDS_PATH_GEN(+id!))}>Новые слова <ForwardOutlined /></button>
        </div>
    </>
    )
}