import { SelectProgressToShow, useFilteredTasks, useSelectProgressToShow } from "@features/selectProgressToShow"
import ProgressListPart from "./ProgressListPart"
import { useProgressModel } from "@entities/task"
import { AppSpin, useLoading } from "@shared";

export function ProgressList() {

    const { progressTasks, getProgress } = useProgressModel();
    const { loading } = useLoading(getProgress);
    const filteredTasks = useFilteredTasks(progressTasks);
    const { isShowCompleted } = useSelectProgressToShow()

    return (
        <section className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-3">
                <SelectProgressToShow />
            </div>
            <AppSpin spinning={loading} />
            {!filteredTasks.length && <h4 className="app-title-2 text-center">У вас нет пока упражнений/слов</h4>}
            <ProgressListPart title="Пора повторить" hideRepeatTime hideTitle={isShowCompleted} range={[null, 0]} data={filteredTasks} onRefresh={getProgress} />
            <ProgressListPart title="В течении получаса" hideTitle={isShowCompleted} range={[0, 0.5]} data={filteredTasks} onRefresh={getProgress} />
            <ProgressListPart title="В течении дня" hideTitle={isShowCompleted} range={[0.5, 12]} data={filteredTasks} onRefresh={getProgress} />
            <ProgressListPart title="Завтра" hideTitle={isShowCompleted} range={[12, 24]} data={filteredTasks} onRefresh={getProgress} />
            <ProgressListPart title="Не скоро" hideTitle={isShowCompleted} range={[24, null]} data={filteredTasks} onRefresh={getProgress} />
        </section>
    )
}