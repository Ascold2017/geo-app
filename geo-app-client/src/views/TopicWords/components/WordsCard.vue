<template>
    <v-card variant="tonal" height="350" class="mb-6" hoverable >
        <div class="card" @click="onTap">
            <v-img v-if="currentTask?.imageUrl" height="300" :src="currentTask?.imageUrl" cover class="w-100" />
            <pre class="card-title">{{ title }}</pre>
        </div>
        <v-card-actions>
            <v-spacer/>
            <v-btn @click="topicWordsStore.nextWord" :disabled="!isHasNextTask">Далее</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useTopicWordsStore } from '@/stores/topic/topicWords';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const topicWordsStore = useTopicWordsStore();
const { currentTask, isHasNextTask } = storeToRefs(topicWordsStore)
const isTapped = ref(false);
const title = computed(() => isTapped.value
    ? currentTask.value?.ru
    : `${currentTask.value?.ka}\n[${currentTask.value?.transcription}]`
);

watch(currentTask, () => {
    isTapped.value = false;
    playAudio();
    
})

function onTap() {
    isTapped.value = !isTapped.value;
    playAudio()
}
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