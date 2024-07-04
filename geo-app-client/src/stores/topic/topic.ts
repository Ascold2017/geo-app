import { httpClient } from "@/adapters/httpClient";
import type { UserTopicWithTasks } from "@/models/topic.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTopicStore = defineStore('topic', () => {
    const loadedId = ref<number | null>(null)
    const isLoading = ref(false)
    const topicWithTasks = ref<UserTopicWithTasks>({
        id: 0,
        title: '',
        sectionId: 0,
        text: '',
        videoId: '',
        completed: false,
        progress: 0,
        isPremium: false,
        tasks: []
    })

    async function getTopic(topicId: number) {
        if (loadedId.value === topicId) return;
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, UserTopicWithTasks>({
                url: '/learn/topics/'+ topicId
            })

            topicWithTasks.value = data;
            loadedId.value = topicId;
        } finally {
            isLoading.value = false;
        }
    }

    async function checkReadedTask(taskId: number) {
        try {
            await httpClient.request({
                url: '/learn/read-task/'+ taskId,
                method: 'POST'
            })
        } catch {
            return Promise.reject(false)
        }
    }

    return {
        loadedId,
        isLoading,
        getTopic,
        checkReadedTask,
        topicWithTasks
    }
})