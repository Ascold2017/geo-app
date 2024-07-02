import { TaskTypesEnum } from "@entities/task";
import { AppRadioGroup } from "@shared";
import { useSelectProgressToShow } from "../model";

export function SelectProgressToShow() {

    const { tasksType, setTasksType, isShowCompleted, setIsShowCompleted } = useSelectProgressToShow()
    return (
        <>
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
                { label: `Вы изучаете`, value: false },
                { label: `Изученные`, value: true },
            ]} />
        </>
    )
}