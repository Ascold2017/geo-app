<template>
    <CommonCard ref="commonCard" @next="listeningTrainingStore.next" :isSuccess="isSuccess" :disabled="!isHasNextTask || !isSuccess">
        <template v-slot:card-content>
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="title">Что вы услышали?</pre>
        </template>
        <template v-slot:['card-bottom']>
            <div class="d-flex ga-2 flex-wrap align-center mb-2">
                Ответ:
                <v-btn
                    v-for="(block, i) in answerBlocks"
                    class="text-none"
                    size="small"
                    density="comfortable"
                    @click="listeningTrainingStore.removeBlock(i)">
                    {{ block }}
                </v-btn>
            </div>
            <v-divider class="mb-2" />
            <div class="d-flex ga-2 flex-wrap">
                <v-btn
                    v-for="(block, i) in composeBlocks"
                    class="text-none"
                    variant="outlined"
                    density="comfortable"
                    @click="listeningTrainingStore.addBlock(i)">
                    {{ block }}
                </v-btn>
            </div>
        </template>
    </CommonCard>
</template>

<script setup lang="ts">
import CommonCard from './CommonCard.vue'
import { useTrainingStore } from '@/stores/training/training';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useListeningTrainingStore } from '@/stores/training/listeningTraining';

const trainingStore = useTrainingStore();
const listeningTrainingStore = useListeningTrainingStore();

const { isHasNextTask } = storeToRefs(trainingStore);
const { parsedCurrentTask, composeBlocks, answerBlocks, isSuccess } = storeToRefs(listeningTrainingStore)
const commonCard = ref<typeof CommonCard | null>(null)

onUnmounted(() => {
    listeningTrainingStore.$reset()
})


</script>