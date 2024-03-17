import { UserTask } from "@entities/task";
import { create } from "zustand";
import { getPracticeRequest } from "../api";

interface PracticeModel {
    practiceTasks: UserTask[];
    nextRepeat: Date | null;
    getPractice: () => Promise<void>;

}
export const usePracticeModel = create<PracticeModel>((set) => ({
    practiceTasks: [],
    nextRepeat: null,
    getPractice: async () => {
        const { tasks, nextRepeat } = await getPracticeRequest();
        set({ practiceTasks: tasks, nextRepeat });
    }
}))