import { UserTask } from "@entities/task";
import { create } from "zustand";
import { getProgressRequest } from "../api";

interface ProgressModel {
    progressTasks: UserTask[];
    getProgress: () => Promise<void>;

}
export const useProgressModel = create<ProgressModel>((set) => ({
    progressTasks: [],
    getProgress: async () => {
        const tasks = await getProgressRequest();
        set({ progressTasks: tasks });
    }
}))