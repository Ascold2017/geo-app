import { httpClient } from "@/adapters/httpClient";
import type { BaseSection } from "@/models/sections.model";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import _ from 'lodash'
const defaultSection: BaseSection = {
    id: 0,
    title: '',
    imageUrl: ''
}

export const useSectionStore = defineStore('section', () => {
    const isNewSection = ref(true)
    const section = ref<BaseSection>(defaultSection)
    const originalSection = ref<BaseSection>(defaultSection)
    const isLoading = ref(false)
    const isChanged = computed(() => !_.isEqual(section.value, originalSection.value))

    async function getSection(id: number) {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseSection>({
                url: '/adm/sections/' + id
            })
            section.value = _.clone(data)
            originalSection.value = _.clone(data)
            isNewSection.value = false;
        } finally {
            isLoading.value = false
        }
    }

    function resetSection() {
        if (!isChanged.value) return;
        section.value = { ...defaultSection };
        originalSection.value = { ...defaultSection }
        isNewSection.value = true
    }

    async function saveSection() {
        isLoading.value = true;
        try {
            if (isNewSection.value) {
                const data = await httpClient.request<BaseSection, BaseSection>({
                    url: '/adm/sections',
                    method: 'POST',
                    data: {
                        ...section.value
                    }
                })
                section.value = _.clone(data)
                originalSection.value = _.clone(data)
                isNewSection.value = false;
            } else {
                const data = await httpClient.request<BaseSection, BaseSection>({
                    url: '/adm/sections/' + section.value.id,
                    method: 'PATCH',
                    data: {
                        ...section.value
                    }
                })
                originalSection.value = _.clone(data)
            }

        } finally {
            isLoading.value = false
        }
    }

    async function deleteSection(id: number) {
        isLoading.value = true;
        try {
            const data = await httpClient.request<undefined, BaseSection[]>({
                url: '/adm/sections/' + id,
                method: 'DELETE'
            })
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        isChanged,
        isNewSection,
        section,
        getSection,
        saveSection,
        resetSection,
        deleteSection
    }
})