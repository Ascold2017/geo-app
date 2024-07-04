<template>
    <v-container>
        <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>

        <v-btn class="d-flex w-100 justify-start mb-4" v-for="button in buttons" :to="button.to">
            <v-icon class="mr-3">{{ button.icon }}</v-icon> {{ button.title}}
        </v-btn>

    </v-container>
</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/topic/topic';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const topicStore = useTopicStore()
const { topicWithTasks } = storeToRefs(topicStore)

const buttons = computed(() => {
    const list = []

    if (topicWithTasks.value.text) {
        list.push({
            icon: 'mdi-human-male-board',
            title: 'Лекция',
            to: { name: 'topicLecture', params: { id: route.params.id } }
        })
    }

    if (topicWithTasks.value.videoId) {
        list.push({
            icon: 'mdi-youtube',
            title: 'Видео-урок',
            to: { name: 'topicVideo', params: { id: route.params.id } }
        })
    }

    if (topicWithTasks.value.tasks.every(t => t.type === 'letter')) {
        list.push({
            icon: 'mdi-format-letter-case',
            title: 'Новые буквы',
            to: { name: 'topicLetters', params: { id: route.params.id } }
        })
    }

    if (topicWithTasks.value.tasks.some(t => t.type === 'word')) {
        list.push({
            icon: 'mdi-file-word-box-outline',
            title: 'Новые слова',
            to: { name: 'topicWords', params: { id: route.params.id } }
        })
    }

    list.push({
        icon: 'mdi-history',
        title: 'Практика',
        to: { name: 'topicTraining', params: { id: route.params.id } }
    })

    return list;
})
onMounted(() => {
    topicStore.getTopic(+route.params.id as number)
})
</script>