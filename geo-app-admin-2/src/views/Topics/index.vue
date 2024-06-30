<template>
    <v-container>
        <v-data-table-virtual :headers="headers" :items="topicsStore.parsedTopics">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Темы</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn :to="{ name: 'topicEditNew' }">Создать</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="router.push({ name: 'topicEdit', params: { id: item.id } })">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="topicsStore.deleteTopic(item.id)">
                    mdi-delete
                </v-icon>
            </template>

        </v-data-table-virtual>
    </v-container>
</template>

<script setup lang="ts">
import type { ParsedTopic } from '@/models/topics.model';
import { useTopicsStore } from '@/stores/topics/topics';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const topicsStore = useTopicsStore()

onMounted(() => {
    topicsStore.getTopicsAndSections()
})

const headers = [
    {
        title: 'Название',
        key: 'title'
    },
    {
        title: 'Секция',
        key: 'section',
        value: (item: ParsedTopic) => item.section.title
    },
    {
        title: 'Премиум',
        key: 'isPremium',
        value: (item: ParsedTopic) => item.isPremium ? '+' : '-'
    },
    {
        title: 'Действие',
        key: 'actions',
    },

]
</script>