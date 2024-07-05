import { httpClient } from "@/adapters/httpClient";
import { type UserTopic } from "@/models/topic.model";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useProfileStore } from "../profile/profile";

export const useHomeTopics = defineStore('home/topics', () => {
    const profileStore = useProfileStore();

    const isLoading = ref(false);
    const topics = ref<UserTopic[]>([])

    watch(() => profileStore.currentSectionId, (v) => {
        if (v && topics.value.length) {
            getTopics();
        }
    });

    async function getTopics() {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, UserTopic[]>({
                url: '/learn/topics'
            })
            topics.value = data
        } finally {
            isLoading.value = false;
        }
    }

    function $reset() {
        topics.value = []
    }

    return {
        isLoading,
        topics,
        getTopics,
        $reset
    }
})