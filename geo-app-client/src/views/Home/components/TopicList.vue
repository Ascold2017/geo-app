<template>
    <section class="d-flex ga-2 flex-wrap">
        <TopicCard v-for="topic in homeTopicsStore.topics" :key="topic.id" :topic="topic" class="flex-1-0-100"/>
    </section>
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