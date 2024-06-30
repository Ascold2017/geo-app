<template>
    <v-container>
        <v-data-table-virtual :headers="headers" :items="sectionsStore.sections">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Секции</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>

        </v-data-table-virtual>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSectionsStore } from '@/stores/sections'

const sectionsStore = useSectionsStore()

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

]
</script>