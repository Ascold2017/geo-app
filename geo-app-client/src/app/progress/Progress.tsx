import { useRequest } from "ahooks";
import { useState } from "react";
import ProgressList from "./components/ProgressList";
import { TaskTypesEnum, } from "@common/constants/types";
import { useGetProgressRequest, usePostCheckCompletedTask } from "@api/users";
import AppSpin from "@common/components/ui/AppSpin";
import AppRadioGroup from "@app/common/components/ui/AppRadioGroup";


export default function ProgressPage() {
    const [isShowCompleted, setIsShowCompleted] = useState(false);
    const [tasksType, setTasksType] = useState<TaskTypesEnum>(TaskTypesEnum.WORD)

    const { loading: loadingTasks, data: tasks, error: tasksError, refreshAsync: refreshTasks } = useRequest(useGetProgressRequest())
    const { loading: loadingCheckCompleted, error: checkCompletedError, runAsync: checkCompleted } = useRequest(usePostCheckCompletedTask(), { manual: true });

    const onCheckCompleted = async (id: number, value: boolean) => {
        await checkCompleted(id, value);
        refreshTasks();
    }

    if (loadingTasks && !tasks) return <AppSpin spinning />
    if (tasksError || checkCompletedError) return <p className="app-text-2">{tasksError?.message || checkCompletedError?.message}</p>
    if (!tasks) return null;

    const filteredData = tasks.filter(task => {
        const completed = isShowCompleted ? task.isCompleted : !task.isCompleted;
        const taskType = task.type === tasksType;
        return completed && taskType;
    });

    const completedTasksCount = tasks.filter(task => task.isCompleted && task.type === tasksType).length;
    const uncompletedTasksCount = tasks.filter(task => !task.isCompleted && task.type === tasksType).length;

    return <>
        <section className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-3">

                <AppRadioGroup className="mb-3" buttons items={[
                    {
                        label: 'Буквы',
                        value: TaskTypesEnum.LETTER
                    },
                    {
                        label: 'Слова',
                        value: TaskTypesEnum.WORD
                    },
                    {
                        label: 'Упражнения',
                        value: TaskTypesEnum.SENTENCE
                    }
                ]} value={tasksType} onChanged={setTasksType} />
                <AppRadioGroup value={isShowCompleted} onChanged={setIsShowCompleted} items={[
                    { label: `Вы изучаете ${uncompletedTasksCount}`, value: false },
                    { label: `Изученные ${completedTasksCount}`, value: true },
                ]} />
            </div>


            <AppSpin spinning={loadingTasks || loadingCheckCompleted} />
            {!filteredData.length && <h4 className="app-title-2 text-center">У вас нет пока упражнений/слов</h4>}
            <ProgressList title="Пора повторить" hideRepeatTime hideTitle={isShowCompleted} range={[null, 0]} data={filteredData} checkCompleted={onCheckCompleted} />
            <ProgressList title="В течении получаса" hideTitle={isShowCompleted} range={[0, 0.5]} data={filteredData} checkCompleted={onCheckCompleted} />
            <ProgressList title="В течении дня" hideTitle={isShowCompleted} range={[0.5, 12]} data={filteredData} checkCompleted={onCheckCompleted} />
            <ProgressList title="Завтра" hideTitle={isShowCompleted} range={[12, 24]} data={filteredData} checkCompleted={onCheckCompleted} />
            <ProgressList title="Не скоро" hideTitle={isShowCompleted} range={[24, null]} data={filteredData} checkCompleted={onCheckCompleted} />
        </section>
    </>
}