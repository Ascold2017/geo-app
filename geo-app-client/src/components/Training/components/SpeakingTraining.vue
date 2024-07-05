<template>
    <CommonCard ref="commonCard" @next="speakingTrainingStore.next" :isSuccess="isSuccess" :disabled="!isSuccess">
        <template v-slot:card-content>
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="title">{{ parsedCurrentTask?.ka }}</pre>
        </template>
        <template v-slot:['card-bottom']>
            <div class="d-flex align-center">
                <span>Нажмите и говорите</span>
                <v-spacer />
                <button
                    :loading="isRecording"
                    @mousedown="speakingTrainingStore.startRecording"
                    @mouseup="speakingTrainingStore.stopRecording"
                    @touchstart="speakingTrainingStore.startRecording"
                    @touchend="speakingTrainingStore.stopRecording">
                    <v-icon>mdi-microphone</v-icon>
                </button>
            </div>
            <div>
                <span>Вы сказали: {{ answerString }}</span>
            </div>
        </template>
    </CommonCard>
</template>

<script setup lang="ts">
import CommonCard from './CommonCard.vue'
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useSpeakingTrainingStore } from '@/stores/training/speakingTraining';

const speakingTrainingStore = useSpeakingTrainingStore();

const { parsedCurrentTask, answerString, isSuccess, isRecording } = storeToRefs(speakingTrainingStore)
const commonCard = ref<typeof CommonCard | null>(null)

onUnmounted(() => {
    speakingTrainingStore.$reset()
})


</script>