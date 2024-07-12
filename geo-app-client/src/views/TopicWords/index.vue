<template>
    <v-container>
       <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>
       <p class="mb-3 text-center">Прослушайте и запомните новые слова</p>

        <WordsCard />

       <div class="d-flex ga-2 justify-center">
           <v-btn :to="{ name: 'topicIndex', params: { id: route.params.id } }">
               <v-icon>mdi-arrow-left</v-icon>
               Покинуть урок
           </v-btn>
           <v-btn :to="{ name: 'topicTraining', params: { id: route.params.id } }" :disabled="topicWordsStore.isHasNextTask">
               Практика
               <v-icon>mdi-arrow-right</v-icon>
           </v-btn>
       </div>
    </v-container>
</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/topic/topic';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import WordsCard from './components/WordsCard.vue';
import { useTopicWordsStore } from '@/stores/topic/topicWords';

const route = useRoute()
const topicStore = useTopicStore()
const { topicWithTasks } = storeToRefs(topicStore)
const topicWordsStore = useTopicWordsStore()

onMounted(() => {
   topicStore.getTopic(+route.params.id as number)
})

onUnmounted(() => {
    topicWordsStore.$reset();
})
</script>