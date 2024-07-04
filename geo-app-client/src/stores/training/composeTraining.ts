import { defineStore, storeToRefs } from "pinia";
import { useTrainingStore } from "./training";
import { TrainingTypes } from "@/models/training.model";
import { generateBlocks, isMatchQA } from "@/utils/stringUtils";
import { shuffle } from "lodash";
import { computed, ref, watch } from "vue";

export const useComposeTrainingStore = defineStore('training/compose', () => {
    const trainingStore = useTrainingStore();
    const { currentTask, tasks, currentTrainingType } = storeToRefs(trainingStore)

    const answerBlocks = ref<string[]>([])

    const isRevert = computed(() => currentTrainingType.value === TrainingTypes.COMPOSE_REVERT);
    const parsedCurrentTask = computed(() => currentTask.value)

    const composeBlocks = computed(() => {
        if (!currentTask.value) return []
        const ka = currentTask.value!.ka;
        const ru = currentTask.value!.ru;
        return generateBlocks(isRevert.value ? ka : ru, shuffle(tasks.value).slice(0, 3).map(t => isRevert.value ? t.ka : t.ru))
    })

    const isSuccess = computed(() => isMatchQA(answerBlocks.value, isRevert.value ? parsedCurrentTask.value?.ka || '' : parsedCurrentTask.value?.ru || ''))

    function addBlock(index: number) {
        answerBlocks.value = [...answerBlocks.value, composeBlocks.value[index]];
    }

    function removeBlock(index: number) {
        answerBlocks.value = answerBlocks.value.filter((_, i) => i !== index);
    }

    function next() {
        if (!isSuccess.value) return;
        trainingStore.nextTask()
        answerBlocks.value = []
    }

    return {
        isRevert,
        parsedCurrentTask,
        answerBlocks,
        composeBlocks,
        isSuccess,
        addBlock,
        removeBlock,
        next
    }
})