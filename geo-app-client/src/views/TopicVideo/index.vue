<template>
     <v-container>
        <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>

        <iframe
            class="mb-6"
            width="100%"
            height="450"
            :src="videoSrc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
        </iframe>

        <div class="d-flex ga-2 justify-center">
            <v-btn :to="{ name: 'topicIndex', params: { id: route.params.id } }">
                <v-icon>mdi-arrow-left</v-icon>
                Покинуть урок
            </v-btn>
            <v-btn :to="{ name: 'topicWords', params: { id: route.params.id } }">
                Новые слова
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </div>
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

const videoSrc = computed(() => `https://www.youtube.com/embed/${topicWithTasks.value.videoId}`)

onMounted(() => {
    topicStore.getTopic(+route.params.id as number)
})
</script>