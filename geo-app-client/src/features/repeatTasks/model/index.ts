import { useEffect, useState } from "react";
import { TaskTypesEnum, UserTask } from "@entities/task";

// eslint-disable-next-line react-refresh/only-export-components
export enum PracticeTypes {
    COMPOSE = 'compose',
    COMPOSE_REVERT = 'compose_revert',
    WRITING = 'writing',
    WRITING_REVERT = 'writing_revert',
    LISTENING = 'listening',
    SPEAKING = 'speaking'
}

export const useRepeatTasks = (tasks: UserTask[], forcedTaskTypes: PracticeTypes[]) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStepProgress, setCurrentStepProgress] = useState(0);
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null)
    const [isDisabledNext, setIsDisabledNext] = useState(true);
    const [practiceType, setPracticeType] = useState<PracticeTypes>(PracticeTypes.COMPOSE);

    useEffect(() => {
        if (forcedTaskTypes) {
            // Pick one of forcedTaskTypes
            setPracticeType(forcedTaskTypes[forcedTaskTypes.length * Math.random() << 0])
        } else {
            const keys = Object.keys(PracticeTypes);
            const type = PracticeTypes[keys[keys.length * Math.random() << 0]];
            setPracticeType(type)
        }
    }, [currentTaskId])

    
    useEffect(() => {
        next()
    }, [currentStep]);

    const allSteps = [
        {
            isShow: tasks.some(t => t.type === TaskTypesEnum.LETTER),
            title: 'Буквы',
            taskType: TaskTypesEnum.LETTER
        },
        {
            isShow: tasks.some(t => t.type === TaskTypesEnum.WORD),
            title: 'Слова',
            taskType: TaskTypesEnum.WORD
        },
        {
            isShow: tasks.some(t => t.type === TaskTypesEnum.SENTENCE),
            title: 'Предложения',
            taskType: TaskTypesEnum.SENTENCE
        },
    ]


    function next() {
        const currentStepType = allSteps[currentStep]?.taskType;

        if (currentStep < steps.length) {
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
            setIsDisabledNext(true)
        } else {
            // onLastStep();
        }
    }

    const currentTask = tasks.find(ex => ex.id === currentTaskId);
    const steps = allSteps.filter(s => s.isShow);
    return {
        steps,
        currentStep,
        isLastStep: currentStep === steps.length,
        practiceType,
        currentTask,
        isDisabledNext,
        enableNext: () => setIsDisabledNext(false),
        next
    }

}