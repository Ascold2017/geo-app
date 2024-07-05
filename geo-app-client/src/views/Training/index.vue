<template>
    <v-container>
        <h3 class="mb-6 text-center">Тренировка</h3>
        <v-progress-linear indeterminate v-show="isLoadingTraining" />
        <template v-if="!isLoadingTraining && tasks.length">
            <SelectTrainingType v-if="!trainingTypes.length" @selectTraining="selectTraining"/>
            <Training v-else />
        </template>
        <template v-if="!isLoadingTraining && tasks.length === 0">
            <p class="mb-3 text-center">У вас пока нет упражнений на повтор. Возвращайтесь позже :) </p>
            <p class="mb-3 text-center">Ближайший повтор: {{ parsedNextRepeat?.format('dddd, HH:mm') }}</p>
        </template>
    </v-container>
</template>

<script setup lang="ts">
import type { TrainingTypes } from '@/models/training.model';
import SelectTrainingType from './components/SelectTrainingType.vue';
import Training from '@/components/Training/index.vue'
import { useTrainingStore } from '@/stores/training/training';
import { useTrainingListStore } from '@/stores/training/trainingList';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';

const trainingStore = useTrainingStore()
const trainingListStore = useTrainingListStore();
const { trainingTypes } = storeToRefs(trainingStore)
const { isLoadingTraining, tasks, parsedNextRepeat } = storeToRefs(trainingListStore)

onMounted(() => {
    trainingListStore.getTrainingList()
})

onUnmounted(() => {
    trainingStore.$reset();
    trainingListStore.$reset();
})

function selectTraining(types: TrainingTypes[]) {
    trainingStore.setTasks(trainingListStore.tasks, types)
}
</script>