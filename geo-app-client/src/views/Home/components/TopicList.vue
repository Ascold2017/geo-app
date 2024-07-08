<template>
    <v-row>
        <v-col v-for="topic in homeTopicsStore.topics" :key="topic.id" cols="12" md="6" lg="4">
            <TopicCard :topic="topic" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import TopicCard from './TopicCard.vue'
import { useHomeTopics } from '@/stores/home/topics';
import { onMounted, onUnmounted } from 'vue';

const homeTopicsStore = useHomeTopics();

onMounted(() => {
    homeTopicsStore.getTopics()
})

onUnmounted(() => {
    homeTopicsStore.$reset()
})
</script>