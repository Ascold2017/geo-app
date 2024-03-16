import { useEffect, useState } from "react";
import { TaskTypesEnum, UserTask } from "@entities/task";

import { AppSteps } from "@shared";
import { PracticeWidgetTask, TaskTypes } from "./PracticeWidgetTask";

type Props = {
    isAlphabet?: boolean;
    tasks: UserTask[];
    taskTypes: TaskTypes[];
    onCheckReaded: (id: number) => Promise<void>;
    renderFooter: (props: RenderFooterProps) => React.ReactNode;
    onLastStep: () => void;
}
export type RenderFooterProps = {
    isLastStep: boolean,
    next: () => void,
    isDisabledNext: boolean
}
export function PracticeWidget({ isAlphabet, tasks, taskTypes, onCheckReaded, renderFooter, onLastStep }: Props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStepProgress, setCurrentStepProgress] = useState(0);
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null)
    const [isDisabledContinue, setIsDisabledContinue] = useState(true);

    const steps = isAlphabet ? [
        {
            title: 'Буквы',
            taskType: TaskTypesEnum.LETTER
        },
        {
            title: 'Слова',
            taskType: TaskTypesEnum.WORD
        },
    ] : [
        {
            title: 'Слова',
            taskType: TaskTypesEnum.WORD
        },
        {
            title: 'Предложения',
            taskType: TaskTypesEnum.SENTENCE
        },
    ]


    useEffect(() => {
        next()
    }, [currentStep]);


    function next() {
        const currentStepType = steps[currentStep]?.taskType;

        if (currentStep < 2) {
            const tsks = tasks.filter(ex => ex.type === currentStepType).sort((a, b) => a.id >= b.id ? 1 : -1);
            const progressDelta = 100 / tsks.length;
            const index = tsks.findIndex(ex => ex.id === currentTaskId);

            const nextExId = tsks[index + 1]?.id || null;
            if (nextExId) {
                setCurrentTaskId(nextExId);
                setCurrentStepProgress(currentStepProgress + progressDelta);
            } else {
                setCurrentTaskId(null);
                setCurrentStepProgress(0);
                setCurrentStep(currentStep + 1);
            }
            setIsDisabledContinue(true)
        } else {
            onLastStep();
        }
    }

    async function checkReaded(id: number) {
        await onCheckReaded(id)
        setIsDisabledContinue(false);
    }

    const currentTask = tasks.find(ex => ex.id === currentTaskId);

    return <>
        <AppSteps steps={steps.map(step => step.title)} currentStep={currentStep} />
        <div className="mb-3">
            {currentTask &&
                <PracticeWidgetTask id={currentTask.id} tasks={tasks} key={currentTask.id} checkReaded={checkReaded} forcedTaskTypes={taskTypes} />
            }
        </div>
        {renderFooter({ isLastStep: currentStep === 2, next, isDisabledNext: isDisabledContinue })}
    </>
}