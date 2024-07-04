import type { UserTask } from "@/models/task.model";
import { shuffle } from "@/utils/shuffleArray";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useTopicStore } from "./topic/topic";
import { TrainingTypes } from "@/models/training.model";

export const useTrainingStore = defineStore('training', () => {
    const topicStore = useTopicStore();

    const tasks = ref<UserTask[]>([]);
    const trainingTypes = ref<TrainingTypes[]>([])

    const currentTaskId = ref<number | null>(null)

    const currentTask = computed(() => tasks.value.find(t => t.id === currentTaskId.value))
    const isHasNextTask = computed(() => {
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        return indexOfCurrentTask < tasks.value.length -1
    })

    const parsedCurrentTask = computed(() => {
        return {
            ...currentTask.value,
            trainingType: trainingTypes.value[trainingTypes.value.length * Math.random() << 0]
        }
    })
    
    function setTasks(data: UserTask[], availableTrainingTypes: TrainingTypes[]) {
        tasks.value = shuffle(data)
        trainingTypes.value = availableTrainingTypes;
        currentTaskId.value = data[0]?.id || null;
    }

    async function nextTask() {
        await topicStore.checkReadedTask(currentTask.value!.id)
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        const nextTask = tasks.value[indexOfCurrentTask + 1];
        if (nextTask) {
            currentTaskId.value = nextTask.id;
        }
    }

    function $reset() {
        currentTaskId.value = tasks.value[0]?.id || null;
        tasks.value = []
        trainingTypes.value = []
    }
    
    return {
        parsedCurrentTask,
        isHasNextTask,
        setTasks,
        nextTask,
        $reset
    }
})