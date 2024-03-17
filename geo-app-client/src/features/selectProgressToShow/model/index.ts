import { TaskTypesEnum, UserTask } from "@entities/task";
import { create } from "zustand";

interface SelectProgressToShowModel {
    isShowCompleted: boolean;
    tasksType: TaskTypesEnum;
    setTasksType: (value: TaskTypesEnum) => void;
    setIsShowCompleted: (value: boolean) => void;
}
export const useSelectProgressToShow = create<SelectProgressToShowModel>((set) => ({
    isShowCompleted: false,
    tasksType: TaskTypesEnum.WORD,
    setTasksType: (value) => set({ tasksType: value }),
    setIsShowCompleted: (value) => set({ isShowCompleted: value })
}));

export const useFilteredTasks = (tasks: UserTask[]) => {
    const { isShowCompleted, tasksType } = useSelectProgressToShow();
    return tasks.filter(task => {
        const completed = isShowCompleted ? task.isCompleted : !task.isCompleted;
        const taskType = task.type === tasksType;
        return completed && taskType;
    });
}