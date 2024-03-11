import { useNavigate, useParams } from "react-router-dom";
import { ReadOutlined, RiseOutlined, TranslationOutlined, YoutubeOutlined } from "@ant-design/icons";

import { useTopicModel } from "@entities/topics";
import { AppSpin, TOPIC_VIDEO_PATH_GEN, TOPIC_LECTURE_PATH_GEN, TOPIC_WORDS_PATH_GEN, TOPIC_LETTERS_PATH_GEN, TOPIC_PRACTICE_PATH_GEN, useLoading } from "@shared";
import { TaskTypesEnum } from "@entities/task";

export function TopicIndexPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, getTopic } = useTopicModel()
    const { loading, error } = useLoading(() => getTopic(id!))
    const list = [
        {
            isShow: !!topic?.videoId,
            title: 'Видео урок',
            icon: <YoutubeOutlined />,
            onClick: () => navigate(TOPIC_VIDEO_PATH_GEN(+id!))
        },
        {
            isShow: !!topic?.text,
            title: 'Лекция',
            icon: <ReadOutlined />,
            onClick: () => navigate(TOPIC_LECTURE_PATH_GEN(+id!))
        },
        {
            isShow: topic?.tasks.some(t => t.type === TaskTypesEnum.WORD),
            title: 'Новые слова',
            icon: <TranslationOutlined />,
            onClick: () => navigate(TOPIC_WORDS_PATH_GEN(+id!))
        },
        {
            isShow: topic?.tasks.some(t => t.type === TaskTypesEnum.LETTER),
            title: 'Буквы',
            icon: <TranslationOutlined />,
            onClick: () => navigate(TOPIC_LETTERS_PATH_GEN(+id!))
        },
        {
            isShow: true,
            title: 'Практика',
            icon: <RiseOutlined />,
            onClick: () => navigate(TOPIC_PRACTICE_PATH_GEN(+id!))
        }
    ]

    if (loading && !topic) return <AppSpin spinning />
    if (error) return <p className="app-text-1 text-center">Произошла ошибка: {error?.message}</p>
    if (!topic) return null;
    return <>
        <AppSpin spinning={loading} />
        <h3 className="app-title-2 text-center mb-3">{topic.title}</h3>
        <section className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {
                list.filter(l => l.isShow).map(link => <button className="btn justify-start" key={link.title} onClick={link.onClick}>{link.icon} {link.title}</button>)
            }
        </section>
    </>
}