<template>
    <v-card variant="tonal" class="training-card mb-6" hoverable>
        <div class="training-card__container">
            <v-icon class="training-card__status" :color="isSuccess ? 'success' : 'warning'">mdi-check-decagram</v-icon>
            <v-btn class="training-card__play" icon="mdi-play" @click="trainingStore.playAudio" />
            <slot name="card-content" />
            <v-btn class="training-card__next" icon="mdi-arrow-right" v-show="!disabled" @click="emit('next')" />
        </div>
        <div class="px-4 py-4">
            <slot name="card-bottom" />
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { useTrainingStore } from '@/stores/training/training';

const props = defineProps<{ isSuccess: boolean; disabled: boolean }>()
const emit = defineEmits<{ next: [] }>()

const trainingStore = useTrainingStore();
</script>

<style>
.training-card__container {
    position: relative;
    height: 300px;
}

.training-card__status {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
}

.training-card__next {
    position: absolute;
    right: 0.5rem;
    top: 50%;
}

.training-card__play {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}

.training-card__container .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>