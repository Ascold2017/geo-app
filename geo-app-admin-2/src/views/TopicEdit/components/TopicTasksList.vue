<template>
    <v-data-table-virtual :headers="headers" :items="topicStore.topic.tasks">
        <template v-slot:item.actions="{ item }">
                <v-icon size="small" @click="topicTasksStore.selectTask(item.id)">
                    mdi-pencil
                </v-icon>
            </template>
    </v-data-table-virtual>
</template>

<script setup lang="ts">
import type { BaseTask } from '@/models/tasks.model';
import { useTopicStore } from '@/stores/topics/topic';
import { useTopicTasksStore } from '@/stores/topics/topicTasks';
const topicStore = useTopicStore()
const topicTasksStore = useTopicTasksStore()

const headers = [
{
        title: 'Тип',
        key: 'type'
    },
    {
        title: 'Грузинский',
        key: 'ka'
    },
    {
        title: 'Русский',
        key: 'ru'
    },
    {
        title: 'Изображение',
        key: 'imageUrl',
        value: (item: BaseTask) => item.imageUrl ? '+' : '-'
    },
    {
        title: 'Озвучка',
        key: 'soundUrl',
        value: (item: BaseTask) => item.soundUrl ? '+' : '-'
    },
    {
        title: '',
        key: 'actions'
    }
]
</script>