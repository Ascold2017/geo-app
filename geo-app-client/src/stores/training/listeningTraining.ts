import { defineStore, storeToRefs } from "pinia";
import { useTrainingStore } from "./training";
import { generateBlocks, isMatchQA } from "@/utils/stringUtils";
import { shuffle } from "lodash";
import { computed, ref, watch } from "vue";

export const useListeningTrainingStore = defineStore('training/listening', () => {
    const trainingStore = useTrainingStore();
    const { currentTask, tasks } = storeToRefs(trainingStore)

    const answerBlocks = ref<string[]>([])
    const parsedCurrentTask = computed(() => currentTask.value)

    const composeBlocks = computed(() => {
        if (!currentTask.value) return []
        const ka = currentTask.value!.ka;
        return generateBlocks(ka, shuffle(tasks.value).slice(0, 3).map(t => t.ka))
    })

    const isSuccess = computed(() => isMatchQA(answerBlocks.value, parsedCurrentTask.value?.ka || ''))

    watch(isSuccess, (v) => {
        if (v) {
            trainingStore.playAudio();
        }
    })
    
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

    function $reset() {
        answerBlocks.value = []
    }

    return {
        parsedCurrentTask,
        answerBlocks,
        composeBlocks,
        isSuccess,
        addBlock,
        removeBlock,
        next,
        $reset
    }
})