<template>
    <v-container>
        <v-card :loading="isLoading">
            <v-toolbar flat>
                <v-btn :to="{ name: 'sections' }">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>{{ sectionStore.isNewSection ? 'Создание секции' : 'Изменение секции'
                    }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="sectionStore.saveSection" :disabled="!isChanged">Сохранить</v-btn>
                <v-btn @click="deleteSection" v-if="!sectionStore.isNewSection">Удалить</v-btn>
            </v-toolbar>
            <div class="px-3 py-3">
                <v-text-field label="Название секции" v-model="section.title" />
                <ImageUploader label="Обложка" :value="section.imageUrl!" @change="section.imageUrl = $event!" />
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/sections/section';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ImageUploader from '@/components/ImageUploader/index.vue';

const sectionStore = useSectionStore()
// @ts-ignore
const route = useRoute<{ id?: string }>()
const router = useRouter()
const { section, isChanged, isLoading } = storeToRefs(sectionStore)
onMounted(() => {
    if (route.params.id) {
        sectionStore.getSection(+route.params.id)
    }
})

function deleteSection() {
    if (sectionStore.isNewSection) return
    sectionStore.deleteSection(+route.params.id)
    router.push({ name: 'sections' })
}
</script>