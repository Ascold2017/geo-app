<template>
    <v-container>
        <v-card :loading="isLoading">
            <TopicTasksForm />
            <TopicTasksList />
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import TopicTasksList from './components/TopicTasksList.vue'
import TopicTasksForm from './components/TopicTasksForm.vue'
import { useTopicTasksStore } from '@/stores/topics/topicTasks';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute<{ id: string }>()
const topicTasksStore = useTopicTasksStore();
const { isLoading } = storeToRefs(topicTasksStore);

onMounted(() => {
    topicTasksStore.getTasks(+route.params.id)
})

onUnmounted(() => {
    topicTasksStore.$reset()
})
</script>