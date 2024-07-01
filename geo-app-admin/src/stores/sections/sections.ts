import { httpClient } from "@/adapters/httpClient";
import type { BaseSection } from "@/models/sections.model";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useSectionsStore = defineStore('sections', () => {
    const sections = ref<BaseSection[]>([])
    const isLoading = ref(false)

    async function getSections() {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseSection[]>({
                url: '/adm/sections'
            })
            sections.value = data;
        } finally {
            isLoading.value = false
        }
    }

  

    return {
        sections,
        isLoading,
        getSections,
    }
})