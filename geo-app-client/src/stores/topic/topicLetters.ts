import { TaskTypesEnum, } from "@/models/task.model";
import _ from "lodash";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useTopicStore } from "./topic";
import { useTrainingStore } from "../training/training";

export const useTopicLettersStore = defineStore('topic/letters', () => {
    const topicStore = useTopicStore();
    const trainingStore = useTrainingStore()
    const { topicWithTasks } = storeToRefs(topicStore)

    const tasks = computed(() => topicWithTasks.value.tasks.filter(task => task.type === TaskTypesEnum.LETTER))

    const currentTaskId = ref<number | null>(null)

    const currentTask = computed(() => tasks.value.find(t => t.id === currentTaskId.value))
    const isHasNextTask = computed(() => {
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        return indexOfCurrentTask < tasks.value.length -1
    })

    $reset()

    watch(tasks, () => {
        $reset()
    })

    async function nextWord() {
        await trainingStore.checkReadedTask(currentTask.value!.id)
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        const nextTask = tasks.value[indexOfCurrentTask + 1];
        if (nextTask) {
            currentTaskId.value = nextTask.id;
        }
    }

    function $reset() {
        currentTaskId.value = tasks.value[0]?.id || null;
    }

    return {
        currentTask,
        isHasNextTask,
        nextWord,
        $reset
    }
})