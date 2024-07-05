import { defineStore, storeToRefs } from "pinia";
import { useTrainingStore } from "./training";
import { TrainingTypes } from "@/models/training.model";
import { isMatchQA } from "@/utils/stringUtils";
import { computed, ref } from "vue";

export const useWritingTrainingStore = defineStore('training/writing', () => {
    const trainingStore = useTrainingStore();
    const { currentTask, tasks, currentTrainingType } = storeToRefs(trainingStore)

    const answerString = ref<string>('')

    const isRevert = computed(() => currentTrainingType.value === TrainingTypes.WRITING_REVERT);
    const parsedCurrentTask = computed(() => currentTask.value)

    const isSuccess = computed(() => isMatchQA(answerString.value, isRevert.value ? parsedCurrentTask.value?.ka || '' : parsedCurrentTask.value?.ru || ''))

    function next() {
        if (!isSuccess.value) return;
        trainingStore.nextTask()
        answerString.value = ''
    }

    function $reset() {
        answerString.value = ''
    }

    return {
        isRevert,
        parsedCurrentTask,
        answerString,
        isSuccess,
        next,
        $reset
    }
})