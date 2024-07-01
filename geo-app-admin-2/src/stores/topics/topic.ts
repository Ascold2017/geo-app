import { httpClient } from "@/adapters/httpClient";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import _ from 'lodash'
import type { BaseTopic, BaseTopicPayload } from "@/models/topics.model";

const defaultTopic: BaseTopic = {
    id: 0,
    title: '',
    text:'',
    videoId: '',
    isPremium: false,
    sectionId: 0,
}

export const useTopicStore = defineStore('topic', () => {
    const isNewTopic = ref(true)
    const topic = ref<BaseTopic>(_.cloneDeep(defaultTopic))
    const originalTopic = ref<BaseTopic>(_.cloneDeep(defaultTopic))
    const isLoading = ref(false)
    const isChanged = computed(() => !_.isEqual(topic.value, originalTopic.value))

    async function getTopic(id: number) {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseTopic>({
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
        topic.value = _.cloneDeep(defaultTopic)
        originalTopic.value = _.cloneDeep(defaultTopic)
        isNewTopic.value = true
    }

    async function saveTopic() {
        isLoading.value = true;
        try {
            if (isNewTopic.value) {
                const data = await httpClient.request<BaseTopicPayload, BaseTopic>({
                    url: '/adm/topics',
                    method: 'POST',
                    data: {
                        title: topic.value.title,
                        text: topic.value.text!,
                        sectionId: topic.value.sectionId,
                        isPremium: topic.value.isPremium,
                        videoId: topic.value.videoId,
                        order: 999
                    }
                })
                topic.value = _.cloneDeep(data)
                originalTopic.value = _.cloneDeep(data)
                isNewTopic.value = false;
            } else {
                const data = await httpClient.request<BaseTopicPayload, BaseTopic>({
                    url: '/adm/topics/' + topic.value.id,
                    method: 'PATCH',
                    data: {
                        title: topic.value.title,
                        text: topic.value.text!,
                        sectionId: topic.value.sectionId,
                        isPremium: topic.value.isPremium,
                        videoId: topic.value.videoId,
                        order: 999
                    }
                })
                originalTopic.value = _.cloneDeep(data)
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

    function $reset() {
        resetTopic();
    }

    return {
        isLoading,
        isChanged,
        isNewTopic,
        topic,
        getTopic,
        saveTopic,
        resetTopic,
        deleteTopic,
        $reset
    }
})