<template>
    <CommonCard ref="commonCard" @next="composeTrainingStore.next" :isSuccess="isSuccess" :disabled="!isHasNextTask || !isSuccess">
        <template v-slot:card-content>
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="title">{{ isRevert ? splitVariant(parsedCurrentTask?.ru || '') : parsedCurrentTask?.ka }}</pre>
        </template>
        <template v-slot:['card-bottom']>
            <div class="d-flex ga-2 flex-wrap align-center mb-2">
                Ответ: <v-btn v-for="(block, i) in answerBlocks" variant="outlined" @click="composeTrainingStore.removeBlock(i)">{{ block }}</v-btn>
            </div>
            <v-divider class="mb-2" />
            <div class="d-flex ga-2 flex-wrap">
                <v-btn v-for="(block, i) in composeBlocks" variant="outlined" @click="composeTrainingStore.addBlock(i)">{{ block }}</v-btn>
            </div>
        </template>
    </CommonCard>
</template>

<script setup lang="ts">
import CommonCard from './CommonCard.vue'
import { useTrainingStore } from '@/stores/training/training';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useComposeTrainingStore } from '@/stores/training/composeTraining';
import { splitVariant } from '@/utils/stringUtils';

const trainingStore = useTrainingStore();
const composeTrainingStore = useComposeTrainingStore();

const { isHasNextTask } = storeToRefs(trainingStore);
const { parsedCurrentTask, composeBlocks, answerBlocks, isSuccess, isRevert } = storeToRefs(composeTrainingStore)
const commonCard = ref<typeof CommonCard | null>(null)

watch([isSuccess], (v) => {
    if (v) {
        commonCard.value?.playAudio();
    }
})

onUnmounted(() => {
    composeTrainingStore.$reset()
})


</script>