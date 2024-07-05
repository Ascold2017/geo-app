import { httpClient } from "@/adapters/httpClient";
import type { TasksToRepeatResponse, UserTask } from "@/models/task.model";
import dayjs from "dayjs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTrainingListStore = defineStore('training/list', () => {
    const isLoadingTraining = ref(false);
    const tasks = ref<UserTask[]>([]);
    const nextRepeat = ref<number | null>(null)

    const parsedNextRepeat = computed(() => nextRepeat.value ? dayjs(nextRepeat.value) : null)

    async function getTrainingList() {
        isLoadingTraining.value = true;
        try {
            const data = await httpClient.request<undefined, TasksToRepeatResponse>({
                url: '/learn/tasks-to-repeat',
                method: 'GET'
            })
            tasks.value = data.tasks;
            nextRepeat.value = data.nextRepeat || null;
        } catch {
            return Promise.reject(false)
        } finally {
            isLoadingTraining.value = false;
        }
    }

    function $reset() {
        tasks.value = []
    }

    return {
        isLoadingTraining,
        tasks,
        parsedNextRepeat,
        getTrainingList,
        $reset
    }
})