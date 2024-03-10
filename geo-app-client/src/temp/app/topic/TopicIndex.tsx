import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from 'ahooks'
import { ReadOutlined, RiseOutlined, TranslationOutlined, YoutubeOutlined } from "@ant-design/icons";
import { useGetTopicRequest } from "@api/sections";
import AppSpin from "@common/components/ui/AppSpin";
import { TaskTypesEnum } from "@app/common/constants/types";
import { TOPIC_VIDEO_PATH_GEN, TOPIC_LECTURE_PATH_GEN, TOPIC_WORDS_PATH_GEN, TOPIC_LETTERS_PATH_GEN, TOPIC_PRACTICE_PATH_GEN } from "./constants";

export default function TopicIndex() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loading, data, error } = useRequest(useGetTopicRequest(id!))
    const list = [
        {
            isShow: !!data?.videoId,
            title: 'Видео урок',
            icon: <YoutubeOutlined />,
            onClick: () => navigate(TOPIC_VIDEO_PATH_GEN(+id!))
        },
        {
            isShow: !!data?.text,
            title: 'Лекция',
            icon: <ReadOutlined />,
            onClick: () => navigate(TOPIC_LECTURE_PATH_GEN(+id!))
        },
        {
            isShow: data?.tasks.some(t => t.type === TaskTypesEnum.WORD),
            title: 'Новые слова',
            icon: <TranslationOutlined />,
            onClick: () => navigate(TOPIC_WORDS_PATH_GEN(+id!))
        },
        {
            isShow: data?.tasks.some(t => t.type === TaskTypesEnum.LETTER),
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

    if (loading && !data) return <AppSpin spinning />
    if (error) return <p className="app-text-1 text-center">Произошла ошибка: {error?.message}</p>
    if (!data) return null;
    return <>
        <AppSpin spinning={loading} />
        <h3 className="app-title-2 text-center mb-3">{data?.title}</h3>
        <section className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {
                list.filter(l => l.isShow).map(link => <button className="btn justify-start" key={link.title} onClick={link.onClick}>{link.icon} {link.title}</button>)
            }
        </section>
    </>
}