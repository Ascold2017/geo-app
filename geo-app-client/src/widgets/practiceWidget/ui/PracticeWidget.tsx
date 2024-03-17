import { UserTask } from "@entities/task";

import { AppSteps } from "@shared";
import { PracticeWidgetTask } from "./PracticeWidgetTask";
import { PracticeTypes, useRepeatTasks } from "@features/repeatTasks";
import { useCheckReadedTask } from "@features/checkReadedTask";
import { ForwardOutlined } from "@ant-design/icons";

type Props = {
    tasks: UserTask[];
    practiceTypes: PracticeTypes[];
    renderFooter: () => React.ReactNode;
}

export function PracticeWidget({ tasks, practiceTypes, renderFooter }: Props) {
    const { steps, currentStep, isLastStep, currentTask, practiceType, isDisabledNext, next, enableNext } = useRepeatTasks(tasks, practiceTypes)
    const { checkReadedTask } = useCheckReadedTask()

    async function onSuccess() {
        await checkReadedTask(currentTask.id)
        enableNext();
    }

    return <>
        <AppSteps steps={steps.map(step => step.title)} currentStep={currentStep} />
        <div className="mb-3">
            {currentTask &&
                <PracticeWidgetTask id={currentTask.id} tasks={tasks} key={currentTask.id} onSuccess={onSuccess} practiceType={practiceType} />
            }
        </div>
        <div className="grid grid-cols-2 gap-4">
            {renderFooter()}
            {isLastStep ? <span className="app-text-2">Ты прошел урок. Молодец :) </span>
                : <button className="btn" disabled={isDisabledNext} onClick={next}>Далее <ForwardOutlined /></button>}
        </div>
    </>
}