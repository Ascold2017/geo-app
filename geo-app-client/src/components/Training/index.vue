<template>
    <v-card variant="tonal" height="350" class="mb-6" hoverable>
        <div class="card">
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="card-title">{{ parsedCurrentTask.ka }}</pre>
        </div>
        <v-card-actions>
            <v-spacer/>
            <v-btn @click="trainingStore.nextTask" :disabled="!isHasNextTask">Далее</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useTrainingStore } from '@/stores/training';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const trainingStore = useTrainingStore();
const { parsedCurrentTask, isHasNextTask } = storeToRefs(trainingStore)

watch(parsedCurrentTask, () => {
    playAudio();
    
})

function playAudio() {
    const audio = new Audio(parsedCurrentTask.value?.soundUrl);
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
}
</script>

<style scoped>
.card {
    position: relative;
    height: 300px;
}

.card-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>