<template>
    <template v-if="!isFinished">
        <CompositionTraining v-if="[TrainingTypes.COMPOSE, TrainingTypes.COMPOSE_REVERT].includes(currentTrainingType)" />
        <WritingTraining v-if="[TrainingTypes.WRITING, TrainingTypes.WRITING_REVERT].includes(currentTrainingType)" />
        <ListeningTraining v-if="currentTrainingType === TrainingTypes.LISTENING" />
        <SpeakingTraining v-if="currentTrainingType === TrainingTypes.SPEAKING" />
    </template>
    <FinishCard v-else />
</template>

<script setup lang="ts">
import { useTrainingStore } from '@/stores/training/training';
import FinishCard from './components/FinishCard.vue'
import SpeakingTraining from './components/SpeakingTraining.vue'
import ListeningTraining from './components/ListeningTraining.vue'
import CompositionTraining from './components/CompositionTraining.vue'
import WritingTraining from './components/WritingTraining.vue'
import { storeToRefs } from 'pinia';
import { TrainingTypes } from '@/models/training.model';

const trainingStore = useTrainingStore()
const { currentTrainingType, currentTask, isFinished } = storeToRefs(trainingStore)

</script>