import { useState } from "react"
import { TaskTypes } from "../common/components/TaskCard/TaskCard";
import { formatDDHHMM } from "@utils/date";
import PracticeComponent, { RenderFooterProps } from "../common/components/PracticeComponent";
import { useRequest } from "ahooks";
import { AudioOutlined, BuildOutlined, CustomerServiceOutlined, EditOutlined, RadarChartOutlined } from "@ant-design/icons";
import { useGetPracticeRequest, usePostCheckReadedTask } from "@api/users";
import { TaskTypesEnum } from "@common/constants/types";
import AppSpin from "@common/components/ui/AppSpin";


export default function PracticePage() {
    const { loading: loadingPractice, data: practice, error: practiceError, refreshAsync: refreshPractice } = useRequest(useGetPracticeRequest());
    const { loading: loadingCheckReaded, error: checkReadedError, runAsync: checkReaded } = useRequest(usePostCheckReadedTask(), { manual: true })

    const [selectedTaskTypes, setSelectedTaskTypes] = useState<TaskTypes[]>([])

    const renderPractice = () => {
        const renderFooter = ({ isLastStep, isDisabledNext, next }: RenderFooterProps) => {
            if (isLastStep) return (
                <>
                    <h4 className="app-title-2 text-center">Молодец :)</h4>
                    {practice?.nextRepeat && <p className="app-text-1 text-center">Ближайший повтор: {formatDDHHMM(practice.nextRepeat, true)}</p>}
                </>
            )
            return <button className="btn" disabled={isDisabledNext} onClick={next}>Далее</button>
        }

        const isAlphabet = practice?.tasks.some(t => t.type === TaskTypesEnum.LETTER)

        return <PracticeComponent
            tasks={practice!.tasks}
            taskTypes={selectedTaskTypes}
            onCheckReaded={async (id) => { await checkReaded(id) }}
            renderFooter={renderFooter}
            onLastStep={refreshPractice}
            isAlphabet={isAlphabet}
        />
    }


    const renderSelectPracticeType = () => {
        return (<div className="grid grid-cols-2 gap-4">

            <h3 className="app-title-2 text-center col-span-2 mb-6">Выберите вид тренировки</h3>
            <p className="app-text-1 text-center col-span-2 mb-6">У вас {practice!.tasks.length} слов и упраженений на повтор</p>

            <button className="btn col-span-2" onClick={() => setSelectedTaskTypes(Object.values(TaskTypes))}>
                <RadarChartOutlined /> Смешанный
            </button>

            <button className="btn justify-start" onClick={() => setSelectedTaskTypes([TaskTypes.WRITING, TaskTypes.WRITING_REVERT])}>
                <EditOutlined /> Писание
            </button>
            <button className="btn justify-start" onClick={() => setSelectedTaskTypes([TaskTypes.LISTENING])}>
                <CustomerServiceOutlined /> Прослушивание
            </button>
            <button className="btn justify-start" onClick={() => setSelectedTaskTypes([TaskTypes.SPEAKING])}>
                <AudioOutlined /> Говорение
            </button>
            <button className="btn justify-start" onClick={() => setSelectedTaskTypes([TaskTypes.COMPOSE, TaskTypes.COMPOSE_REVERT])}>
                <BuildOutlined /> Простой
            </button>
        </div>)

    }

    const renderNoTasks = () => {
        return (
            <>
                <h4 className="app-title-2 text-center">У вас пока нет упражнений на повтор. Возвращайтесь позже :)</h4>
                {practice?.nextRepeat && <p className="app-text-1 text-center">Ближайший повтор: {formatDDHHMM(practice.nextRepeat, true)}</p>}
            </>
        )
    }

    if (loadingPractice && !practice) return <AppSpin spinning />;
    if (practiceError || checkReadedError) return <p className="app-text-1 text-center">Произошла ошибка: {practiceError?.message || checkReadedError?.message}</p>
    if (!practice) return null;

    return <>
        <AppSpin spinning={loadingPractice || loadingCheckReaded} />
        <section className="max-w-3xl mx-auto">
            {
                practice.tasks.length
                    ? selectedTaskTypes.length
                        ? renderPractice()
                        : renderSelectPracticeType()
                    : renderNoTasks()
            }
        </section>
    </>
}