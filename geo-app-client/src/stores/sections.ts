import { httpClient } from "@/adapters/httpClient";
import type { UserSection } from "@/models/sections.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSectionsStore = defineStore('sections', () => {
    const isLoading =ref(false);
    const sections = ref<UserSection[]>([])

    async function getSections() {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, UserSection[]>({
                url: '/learn/sections'
            })
            sections.value = data
        } finally {
            isLoading.value = false;
        }
    }

    function $reset() {
        sections.value = []
    }

    return {
        isLoading,
        sections,
        getSections,
        $reset
    }
})