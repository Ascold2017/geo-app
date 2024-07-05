import type { UserTask } from "@/models/task.model";
import { shuffle } from "@/utils/shuffleArray";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { TrainingTypes } from "@/models/training.model";
import { httpClient } from "@/adapters/httpClient";

export const useTrainingStore = defineStore('training', () => {

    const tasks = ref<UserTask[]>([]);
    const trainingTypes = ref<TrainingTypes[]>([])

    const currentTaskId = ref<number | null>(null)
    const currentTrainingType = ref<TrainingTypes>(TrainingTypes.COMPOSE)

    const currentTask = computed(() => tasks.value.find(t => t.id === currentTaskId.value))
    const isHasNextTask = computed(() => {
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        return indexOfCurrentTask < tasks.value.length -1
    })
    const isFinished = ref(false);
    
    watch(currentTask, () => {
        playAudio()
    })
    
    function setTasks(data: UserTask[], availableTrainingTypes: TrainingTypes[]) {
        tasks.value = shuffle(data)
        trainingTypes.value = availableTrainingTypes;
        currentTaskId.value = data[0]?.id || null;
        currentTrainingType.value = availableTrainingTypes[availableTrainingTypes.length * Math.random() << 0];
    }

    async function nextTask() {
        await checkReadedTask(currentTask.value!.id)
        const indexOfCurrentTask = tasks.value.findIndex(task => task.id === currentTaskId.value);
        const nextTask = tasks.value[indexOfCurrentTask + 1];
        if (nextTask) {
            currentTaskId.value = nextTask.id;
            currentTrainingType.value = trainingTypes.value[trainingTypes.value.length * Math.random() << 0];
        } else {
            isFinished.value = true;
        }
    }

    function playAudio() {
        const audio = new Audio(currentTask.value?.soundUrl);
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    }
    

    function $reset() {
        currentTaskId.value = tasks.value[0]?.id || null;
        tasks.value = []
        trainingTypes.value = []
        currentTrainingType.value = TrainingTypes.COMPOSE;
        isFinished.value = false;
    }

    async function checkReadedTask(taskId: number) {
        try {
            await httpClient.request({
                url: '/learn/read-task/'+ taskId,
                method: 'POST'
            })
        } catch {
            return Promise.reject(false)
        }
    }

    
    
    return {
        trainingTypes,
        currentTask,
        tasks,
        currentTrainingType,
        isHasNextTask,
        isFinished,
        checkReadedTask,
        setTasks,
        nextTask,
        playAudio,
        $reset
    }
})