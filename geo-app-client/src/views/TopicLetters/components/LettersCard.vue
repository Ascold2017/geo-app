<template>
    <v-card variant="tonal" height="350" class="mb-6" hoverable >
        <div class="card">
            <v-img v-if="currentTask?.imageUrl" height="300" :src="currentTask?.imageUrl" cover class="w-100" />
            <pre class="card-title" v-if="currentTask">{{ currentTask.ka }} [{{currentTask.transcription}}]</pre>
        </div>
        <v-card-actions>
            <v-spacer/>
            <v-btn @click="topicLettersStore.nextWord" :disabled="!isHasNextTask">Далее</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useTopicLettersStore } from '@/stores/topic/topicLetters';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const topicLettersStore = useTopicLettersStore();
const { currentTask, isHasNextTask } = storeToRefs(topicLettersStore)

watch(currentTask, () => {
    playAudio();
})

function playAudio() {
    const audio = new Audio(currentTask.value?.soundUrl);
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