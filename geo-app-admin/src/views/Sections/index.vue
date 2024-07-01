<template>
    <v-container>
        <v-data-table-virtual :headers="headers" :items="sectionsStore.sections" :loading="sectionsStore.isLoading">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Секции</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn :to="{ name: 'sectionNew' }">Создать</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="router.push({ name: 'sectionEdit', params: { id: item.id } })">
                    mdi-pencil
                </v-icon>
            </template>

        </v-data-table-virtual>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSectionsStore } from '@/stores/sections/sections'
import { useRouter } from 'vue-router';

const sectionsStore = useSectionsStore()
const router = useRouter()

onMounted(() => {
    sectionsStore.getSections()
})

const headers = [
    {
        title: 'Название',
        key: 'title'
    },
    {
        title: 'Тем в секции',
        key: 'topicsCount'
    },
    {
        title: 'Действие',
        key: 'actions'
    },

]
</script>