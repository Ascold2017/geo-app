<template>
    <CommonCard ref="commonCard" @next="writingTrainingStore.next" :isSuccess="isSuccess" :disabled="!isSuccess">
        <template v-slot:card-content>
            <v-img v-if="parsedCurrentTask?.imageUrl" height="300" :src="parsedCurrentTask?.imageUrl" cover class="w-100" />
            <pre class="title">{{ isRevert ? splitVariant(parsedCurrentTask?.ru || '') : parsedCurrentTask?.ka }}</pre>
        </template>
        <template v-slot:['card-bottom']>
            <v-textarea :label="`Ответ (${isRevert ? 'На грузинском' : 'На русском'})`" v-model="answerString" />
        </template>
    </CommonCard>
</template>

<script setup lang="ts">
import CommonCard from './CommonCard.vue'
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useWritingTrainingStore } from '@/stores/training/writingTraining';
import { splitVariant } from '@/utils/stringUtils';

const writingTrainingStore = useWritingTrainingStore();

const { parsedCurrentTask, answerString, isSuccess, isRevert } = storeToRefs(writingTrainingStore)
const commonCard = ref<typeof CommonCard | null>(null)

onUnmounted(() => {
    writingTrainingStore.$reset()
})


</script>