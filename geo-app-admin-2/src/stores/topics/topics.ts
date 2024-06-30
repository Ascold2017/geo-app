import { httpClient } from "@/adapters/httpClient";
import type { ParsedTopic, BaseTopic } from "@/models/topics.model";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useSectionsStore } from "../sections/sections";
import type { BaseSection } from "@/models/sections.model";

export const useTopicsStore = defineStore('topics', () => {
    const sectionsStore = useSectionsStore();

    const topics = ref<BaseTopic[]>([]);
    const isLoading = ref(false);

    const parsedTopics = computed<ParsedTopic[]>(() => {
        const sectionsByIds = sectionsStore.sections.reduce<Record<number, BaseSection>>((acc, section) => {
            if (!acc[section.id]) {
                acc[section.id] = section
            }
            return acc;
        }, {});

        return topics.value.map(topic => ({
            ...topic,
            section: sectionsByIds[topic.sectionId]
        }));
    })

    async function getTopicsAndSections() {
        isLoading.value = true;
        try {
            const [data] = await Promise.all([
                await httpClient.request<undefined, BaseTopic[]>({
                    url: '/adm/topics'
                }),
                sectionsStore.getSections()
            ])

            topics.value = data;
        } finally {
            isLoading.value = false
        }
    }

    
    return {
        parsedTopics,
        getTopicsAndSections
    }
})