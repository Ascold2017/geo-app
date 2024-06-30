import { httpClient } from "@/adapters/httpClient";
import type { BaseSection } from "@/models/sections.model";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import _ from 'lodash'
import type { BaseTopic, BaseTopicWithTasks } from "@/models/topics.model";
const defaultTopic: BaseTopicWithTasks = {
    id: 0,
    title: '',
    text:'',
    videoId: '',
    isPremium: false,
    sectionId: 0,
    tasks: []
    
}

export const useTopicStore = defineStore('topic', () => {
    const isNewTopic = ref(true)
    const topic = ref<BaseSection>(defaultTopic)
    const originalTopic = ref<BaseSection>(defaultTopic)
    const isLoading = ref(false)
    const isChanged = computed(() => !_.isEqual(topic.value, originalTopic.value))

    async function getTopicWithTasks(id: number) {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseTopicWithTasks>({
                url: '/adm/topics/' + id
            })
            topic.value = _.clone(data)
            originalTopic.value = _.clone(data)
            isNewTopic.value = false;
        } finally {
            isLoading.value = false
        }
    }

    function resetTopic() {
        if (!isChanged.value) return;
        topic.value = { ...defaultTopic };
        originalTopic.value = { ...defaultTopic }
        isNewTopic.value = true
    }

    async function saveTopic() {
        isLoading.value = true;
        try {
            if (isNewTopic.value) {
                const data = await httpClient.request<BaseSection, BaseSection>({
                    url: '/adm/topics',
                    method: 'POST',
                    data: {
                        ...topic.value
                    }
                })
                topic.value = _.clone(data)
                originalTopic.value = _.clone(data)
                isNewTopic.value = false;
            } else {
                const data = await httpClient.request<BaseSection, BaseSection>({
                    url: '/adm/topics/' + topic.value.id,
                    method: 'PATCH',
                    data: {
                        ...topic.value
                    }
                })
                originalTopic.value = _.clone(data)
            }

        } finally {
            isLoading.value = false
        }
    }

    async function deleteTopic(topicId: number) {
        isLoading.value = true;
        try {

                await httpClient.request<undefined, undefined>({
                    url: '/adm/topics/' + topicId,
                    method: 'DELETE'
                })

        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        isChanged,
        isNewTopic,
        topic,
        getTopicWithTasks,
        saveTopic,
        resetTopic,
        deleteTopic
    }
})