<template>
    <v-container>
       <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>
       <p class="mb-3 text-center">Прослушайте и запомните новые буквы</p>

        <LettersCard />

       <div class="d-flex ga-2 justify-center">
           <v-btn :to="{ name: 'topicIndex', params: { id: route.params.id } }">
               <v-icon>mdi-arrow-left</v-icon>
               Покинуть урок
           </v-btn>
           <v-btn :to="{ name: 'topicTraining', params: { id: route.params.id } }" :disabled="topicLettersStore.isHasNextTask">
               Практика
               <v-icon>mdi-arrow-right</v-icon>
           </v-btn>
       </div>
    </v-container>
</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/topic/topic';
import { storeToRefs } from 'pinia';
import {  onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import LettersCard from './components/LettersCard.vue';
import { useTopicLettersStore } from '@/stores/topic/topicLetters';

const route = useRoute()
const topicStore = useTopicStore()
const { topicWithTasks } = storeToRefs(topicStore)
const topicLettersStore = useTopicLettersStore()

onMounted(() => {
   topicStore.getTopic(+route.params.id as number)
})

onUnmounted(() => {
    topicLettersStore.$reset();
})
</script>