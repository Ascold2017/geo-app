import { httpClient } from "@/adapters/httpClient";
import { type UserTask } from "@/models/task.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProgressStore = defineStore('profile/progress', () => {

    const progress = ref<UserTask[]>([])
    const isLoading = ref(false);

    async function getProgress() {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, UserTask[]>({
                url: '/learn/progress'
            });
            progress.value = data;
        } catch {
            // TODO
        } finally {
            isLoading.value = false;
        }
    }

    return {
        progress,
        isLoading,
        getProgress
    }
})