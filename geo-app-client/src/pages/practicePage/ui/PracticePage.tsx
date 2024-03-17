import { useState } from "react";
import { usePracticeModel } from "@entities/practice";
import { PracticeTypes, SelectPracticeType } from "@features/repeatTasks";
import { PracticeWidget } from "@widgets/practiceWidget";
import { AppSpin, useLoading, formatDDHHMM } from "@shared";


export function PracticePage() {

    const { practiceTasks, nextRepeat, getPractice } = usePracticeModel();
    const [selectedTaskTypes, setSelectedTaskTypes] = useState<PracticeTypes[]>([])

    const { loading, error } = useLoading(getPractice)

    if (loading) return <AppSpin spinning />;
    if (error) return <p className="app-text-1 text-center">Произошла ошибка: {error?.message}</p>

    const renderNoTasks = () => {
        return (
            <>
                <h4 className="app-title-2 text-center">У вас пока нет упражнений на повтор. Возвращайтесь позже :)</h4>
                {nextRepeat && <p className="app-text-1 text-center">Ближайший повтор: {formatDDHHMM(nextRepeat, true)}</p>}
            </>
        )
    }

    return (
        <>
            <AppSpin spinning={loading} />
            <section className="max-w-3xl mx-auto">
                {
                    practiceTasks.length
                        ? selectedTaskTypes.length
                            ? <PracticeWidget tasks={practiceTasks} practiceTypes={selectedTaskTypes} />
                            : <SelectPracticeType
                                headerSlot={<>
                                    <h3 className="app-title-2 text-center mb-6">Выберите вид тренировки</h3>
                                    <p className="app-text-1 text-center mb-6">У вас {practiceTasks.length} слов и упраженений на повтор</p>
                                </>}
                                onSelectedTaskTypes={setSelectedTaskTypes}
                            />
                        : renderNoTasks()
                }
            </section>
        </>
    )
}