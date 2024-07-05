<template>
    <CommonCard ref="commonCard" @next="composeTrainingStore.next" :isSuccess="isSuccess" :disabled="!isSuccess">
        <template v-slot:card-content>
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="title">{{ isRevert ? splitVariant(parsedCurrentTask?.ru || '') : parsedCurrentTask?.ka }}</pre>
        </template>
        <template v-slot:['card-bottom']>
            <div class="d-flex ga-1 flex-wrap align-center mb-2">
                Ответ:
                <v-btn
                    v-for="(block, i) in answerBlocks"
                    class="text-none"
                    size="small"
                    density="comfortable"
                    @click="composeTrainingStore.removeBlock(i)">
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
                    @click="composeTrainingStore.addBlock(i)">
                    {{ block }}
                </v-btn>
            </div>
        </template>
    </CommonCard>
</template>

<script setup lang="ts">
import CommonCard from './CommonCard.vue'
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useComposeTrainingStore } from '@/stores/training/composeTraining';
import { splitVariant } from '@/utils/stringUtils';

const composeTrainingStore = useComposeTrainingStore();

const { parsedCurrentTask, composeBlocks, answerBlocks, isSuccess, isRevert } = storeToRefs(composeTrainingStore)
const commonCard = ref<typeof CommonCard | null>(null)

onUnmounted(() => {
    composeTrainingStore.$reset()
})


</script>