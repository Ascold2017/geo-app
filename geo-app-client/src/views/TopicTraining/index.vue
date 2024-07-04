<template>
    <v-container>
        <h3 class="text-center mb-6">{{ topicWithTasks.title }}</h3>
        <p class="mb-3 text-center">Практика</p>

        <Training />

        <div class="d-flex ga-2 justify-center">
           <v-btn :to="{ name: 'topicIndex', params: { id: route.params.id } }">
               <v-icon>mdi-arrow-left</v-icon>
               Покинуть урок
           </v-btn>
           <v-btn :to="{ name: 'home' }" :disabled="trainingStore.isHasNextTask">
               Закончить урок
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
import Training from '@/components/Training/index.vue';
import { useTrainingStore } from '@/stores/training/training';
import { TrainingTypes } from '@/models/training.model';

const route = useRoute()
const topicStore = useTopicStore()
const { topicWithTasks } = storeToRefs(topicStore)
const trainingStore = useTrainingStore()

onMounted(async () => {
   await topicStore.getTopic(+route.params.id as number)
   trainingStore.setTasks(topicWithTasks.value.tasks, [
    TrainingTypes.COMPOSE, TrainingTypes.COMPOSE_REVERT
   ])
})

onUnmounted(() => {
    trainingStore.$reset();
})
</script>