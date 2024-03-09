import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTopicRequest } from "@api/sections";
import { usePostCheckReadedTask } from "@api/users";
import AppSpin from "@common/components/ui/AppSpin";
import { TOPIC_PATH_GEN, TOPIC_PRACTICE_PATH_GEN } from "./constants";
import { TaskTypesEnum } from "@app/common/constants/types";
import TaskCarousel from "./components/TaskCarousel";

export default function TopicLettersPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loading: loadingTopic, data: topic, error: topicError } = useRequest(useGetTopicRequest(id!));
    const { loading: loadingCheckReaded, error: checkReadedError, runAsync: checkReaded } = useRequest(usePostCheckReadedTask(), { manual: true })

    if (loadingTopic && !topic) return <AppSpin spinning />
    if (topicError || checkReadedError) return <p className="app-title-2 text-center">Произошла ошибка: {topicError?.message || checkReadedError?.message}</p>
    return <><AppSpin spinning={loadingTopic || loadingCheckReaded} />
        <h3 className="app-title-2 text-center mb-3">Прослушайте и запомните новые буквы</h3>
        <TaskCarousel
            tasks={topic?.tasks?.filter(task => task.type === TaskTypesEnum.LETTER) || []}
            checkReaded={async (id) => { await checkReaded(id) } }
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